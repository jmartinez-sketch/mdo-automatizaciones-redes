#!/usr/bin/env node
// Convierte una placa del kit en un video corto de marca (MP4 H.264 + pista de audio muda).
//
// Uso (mismos slots que render.js):
//   node scripts/video.js --template po-32 --out posts/2026-10-02-4.mp4 --slots '{...}'
//
// Opcionales:
//   --formato reel|placa   reel (por defecto): 1080×1920, la placa 4:5 centrada en la zona segura y
//                          el fondo extendido arriba y abajo. placa: el tamaño nativo de la plantilla.
//   --estilo editorial|institucional|secuencial   (por defecto lo elige según la plantilla)
//   --segundos N           (por defecto se calcula por cantidad de texto)
//   --portada ruta.png     (por defecto, junto al MP4 con -portada.png): el cuadro con la placa
//                          completa, para usar de tapa del Reel (videoThumbnailUrl).
//   --fps 30|60
//   --tira ruta.png        además, una tira de 14 cuadros clave para revisar, y al lado dos cuadros a
//                          tamaño real (-entrada.png, -completa.png). Con --solo-tira no codifica el
//                          video: sirve para probar rápido
//   --cuadros 9000,12000   además, esos cuadros a tamaño real (ms), para mirar detalles
//
// Recursos del Manual de Marca 2026 (design system «MDO - Diseño»):
//   1. Apertura: el isotipo se traza y se llena, y se vuelve marca de agua gigante (Novedades /
//      Servicios) o firma chica (Institucional, con persianas al ritmo de la grilla de 64 px). Si la
//      placa ya trae su isotipo, se convierte exactamente en ése.
//   2. La placa real: los textos entran línea por línea con máscara (los titulares, palabra por
//      palabra), los filetes se dibujan, los rótulos en Chivo abren el tracking, la foto se acerca.
//   3. Salida: el texto se retira hacia arriba y sobre el mismo fondo se traza el logo principal,
//      con la web debajo. En Institucional, las persianas se cierran antes del logo.
// Sin blur, sin rebotes, sin contadores (manual, sección 6).
//
// La placa es la misma que fotografía render.js: el texto se parte en palabras sólo si el armado
// queda idéntico (se compara línea por línea antes y después); si no, ese bloque entra entero.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const FFMPEG = require('ffmpeg-static');

const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k.startsWith('--')) {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[k.slice(2)] = true;
      else out[k.slice(2)] = argv[++i];
    }
  }
  return out;
}

function tamano(id) {
  try {
    const jsx = fs.readFileSync(path.join(ROOT, 'mdo-templates', 'templates-kit-manual.jsx'), 'utf8');
    const m = jsx.match(/const KIT_MANUAL_SIZE = (\{[^;]*\});/);
    const s = m ? JSON.parse(m[1])[id] : null;
    if (s) return s;
  } catch { /* cae al prefijo */ }
  if (id.startsWith('st-')) return [1080, 1920];
  if (id.startsWith('li-')) return [1200, 628];
  return [1080, 1350];
}

function estiloPorDefecto(id) {
  if (id.startsWith('st-') || id.startsWith('in-') || id.startsWith('mn-07') || id.startsWith('mn-08')) return 'institucional';
  if (/^po-3[1-5]$/.test(id) || id.startsWith('cb-')) return 'secuencial';
  return 'editorial';
}

const svg = (f) => fs.readFileSync(path.join(ROOT, 'mdo-templates', 'assets', f), 'utf8').replace(/<\?xml[^>]*>/, '');

async function video({ template, slots, outPath, estilo, segundos, formato = 'reel', portada, fps = 30, tira, soloTira = false, cuadros = [] }) {
  const [W, H] = tamano(template);
  if (H < 1000) throw new Error('Las placas horizontales (li-*) no se animan: LinkedIn lleva la imagen.');
  const HO = formato === 'placa' ? H : Math.max(H, 1920);
  estilo = estilo || estiloPorDefecto(template);
  fps = +fps || 30;
  portada = portada === false ? null : (portada || outPath.replace(/\.mp4$/i, '') + '-portada.png');
  const logos = {
    isoClaro: svg('logo-mdo-iso-white.svg'), isoOscuro: svg('logo-mdo-iso.svg'),
    logoClaro: svg('logo-mdo-principal-white.svg'), logoOscuro: svg('logo-mdo-principal.svg'),
  };

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none', '--ignore-certificate-errors',
      '--disable-web-security', '--allow-file-access-from-files'],
    ignoreHTTPSErrors: true,
    defaultViewport: { width: W, height: HO, deviceScaleFactor: 1 },
  });
  try {
    const page = await browser.newPage();
    page.on('pageerror', (e) => console.error('pageerror:', e.message));
    await page.goto('file://' + path.join(ROOT, 'mdo-templates', 'render.html') + '#t=' + encodeURIComponent(template),
      { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForFunction(() => window.__mdoReady === true, { timeout: 30000 });
    if (await page.evaluate(() => window.__mdoTemplateFaltante)) throw new Error(`La plantilla "${template}" no existe.`);

    // Mismos controles que render.js: ni un slot de más ni uno de menos.
    const presentes = await page.evaluate(() => [...new Set(document.getElementById('stage').innerHTML.match(/\[[A-Z][A-Z0-9_]*\]/g) || [])].map((m) => m.slice(1, -1)));
    const pasados = Object.keys(slots || {});
    const sobran = pasados.filter((k) => !presentes.includes(k));
    const faltan = presentes.filter((k) => !pasados.includes(k));
    if (sobran.length || faltan.length) {
      throw new Error(`Slots de "${template}": ` + (sobran.length ? `sobran ${sobran.join(', ')}. ` : '') +
        (faltan.length ? `faltan ${faltan.join(', ')}. ` : '') + `Válidos: ${presentes.join(', ')}.`);
    }
    await page.evaluate((data) => {
      const st = document.getElementById('stage');
      st.innerHTML = Object.entries(data).reduce((h, [k, v]) => h.replaceAll('[' + k + ']', v), st.innerHTML);
    }, slots);
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((ok) => { i.onload = ok; i.onerror = ok; }))));

    // Tono de la placa medido sobre la imagen real (no sobre los colores del CSS): un degradé gris
    // azulado con zonas oscuras promediaba "oscuro" y el logo final salía blanco sobre fondo claro.
    const caja = await page.evaluate(() => {
      const st = document.getElementById('stage');
      const w = st.querySelector('.__scaled') || st.firstElementChild;
      const r = (w.querySelector(':scope > div > div') || w.firstElementChild).getBoundingClientRect();
      return { x: Math.max(0, r.left), y: Math.max(0, r.top), width: r.width, height: r.height };
    });
    const muestra = await page.screenshot({ type: 'jpeg', quality: 60, clip: caja, encoding: 'base64' });
    const lumPix = await page.evaluate(async (b64) => {
      const img = new Image();
      await new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; img.src = 'data:image/jpeg;base64,' + b64; });
      const c = document.createElement('canvas'); c.width = 60; c.height = Math.round(img.naturalHeight * 60 / img.naturalWidth);
      const x = c.getContext('2d'); x.drawImage(img, 0, 0, c.width, c.height);
      const d = x.getImageData(0, 0, c.width, c.height).data; let s = 0;
      for (let i = 0; i < d.length; i += 4) s += (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
      return s / (d.length / 4);
    }, muestra);

    const plan = await page.evaluate(({ estilo, segundos, W, H, HO, logos, lumPix }) => {
      // Todas las formas del SVG, no sólo <path>: el logo principal dibuja la L, la T y la E de
      // CONSULTORES con <polygon>, y sin esto quedaban visibles todo el video.
      const FORMAS = 'path,polygon,polyline,rect,circle,ellipse,line';
      const salida = 'cubic-bezier(.16,1,.3,1)', suave = 'cubic-bezier(.2,0,.2,1)', trazo = 'cubic-bezier(.45,0,.25,1)';
      const anims = [];
      // Entradas: fill 'both' (esperan ocultas y quedan en su lugar). Salidas: fill 'forwards', si no,
      // su primer cuadro taparía la entrada durante todo el video.
      const A = (el, kf, o) => { anims.push(el.animate(kf, Object.assign({ fill: 'both', easing: suave }, o))); };
      const S = (el, kf, o) => { anims.push(el.animate(kf, Object.assign({ fill: 'forwards', easing: suave }, o))); };

      const st = document.getElementById('stage');
      const wrap = st.querySelector('.__scaled') || st.firstElementChild;
      const placa = wrap.querySelector(':scope > div > div') || wrap.firstElementChild;
      const off = Math.round((HO - H) / 2);
      document.body.style.width = W + 'px'; document.body.style.height = HO + 'px';
      st.style.position = 'relative'; st.style.overflow = 'hidden'; st.style.width = W + 'px'; st.style.height = HO + 'px';
      if (off > 0) { wrap.style.position = 'absolute'; wrap.style.left = '0'; wrap.style.top = off + 'px'; }
      const capa = (z, css) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:' + z + ';' + (css || ''); st.appendChild(d); return d; };

      const fotos = [...placa.querySelectorAll('img')].filter((im) => /fotos\//.test(im.getAttribute('src') || ''));
      const conFoto = fotos.length > 0;
      const isoPropio = [...placa.querySelectorAll('img')].find((im) => /logo-mdo-iso/.test(im.getAttribute('src') || ''));
      const inst = estilo === 'institucional';

      // ---------- Tono y fondo ----------
      const cs0 = getComputedStyle(placa);
      const bgImg = cs0.backgroundImage && cs0.backgroundImage !== 'none' ? cs0.backgroundImage : '';
      const bgCol = cs0.backgroundColor;
      // Claro u oscuro: manda la imagen medida. En la zona dudosa (degradés de gris a papel) decide la
      // tinta del texto más grande: si el diseñador lo escribió en navy, el fondo es claro.
      const lumDe = (c) => { const v = (c.match(/[\d.]+/g) || [0, 0, 0]).map(Number); return (0.299 * v[0] + 0.587 * v[1] + 0.114 * v[2]) / 255; };
      let mayor = null;
      placa.querySelectorAll('*').forEach((el) => {
        if (!(el.textContent || '').trim() || el.children.length) return;
        const f = parseFloat(getComputedStyle(el).fontSize) || 0;
        if (!mayor || f > mayor.f) mayor = { f, lum: lumDe(getComputedStyle(el).color) };
      });
      const claro = !conFoto && (lumPix > 0.62 || (lumPix >= 0.38 && !!mayor && mayor.lum < 0.5));
      const TINTA = claro ? '#06162d' : '#f8f6f6';
      const NAVY = 'linear-gradient(to top right,#00081d 0%,#0a1a36 55%,#273f63 100%)';
      const FONDO = conFoto || !bgImg ? (claro ? '#f8f6f6' : NAVY) : bgImg;
      const ISO = isoPropio ? (/white/.test(isoPropio.getAttribute('src')) ? logos.isoClaro : logos.isoOscuro) : (claro ? logos.isoOscuro : logos.isoClaro);
      const LOGO = claro ? logos.logoOscuro : logos.logoClaro;

      const fondos = [...placa.children].filter((c) => getComputedStyle(c).position === 'absolute');

      // Formato Reel: el fondo pasa al lienzo entero y las capas a sangre (foto, velos) se estiran
      // arriba y abajo. La placa queda donde estaba; lo que se agrega es fondo, no diseño.
      let fondoVivo = placa;
      if (off > 0) {
        st.style.backgroundImage = bgImg || 'none';
        st.style.backgroundColor = bgCol;
        placa.style.background = 'transparent';
        placa.style.overflow = 'visible';
        fondoVivo = st;
        const pr = placa.getBoundingClientRect();
        fondos.forEach((f) => {
          const r = f.getBoundingClientRect();
          if (Math.abs(r.top - pr.top) < 2 && Math.abs(r.height - pr.height) < 2 && Math.abs(r.width - pr.width) < 2) {
            f.style.top = (-off) + 'px'; f.style.bottom = (-off) + 'px'; f.style.height = 'auto';
          }
        });
      }

      // ---------- Bloques de texto, en orden de lectura ----------
      const esInline = (el) => getComputedStyle(el).display === 'inline';
      const fuera = (el) => fondos.some((f) => f.contains(el)) || el.closest('svg') || el.tagName === 'IMG';
      const todos = [...placa.querySelectorAll('*')].filter((el) => !fuera(el));
      const conTexto = (el) => (el.innerText || el.textContent || '').trim().length > 0;
      const bloques = todos.filter((el) => {
        if (esInline(el) || !conTexto(el)) return false;
        // El bloque más profundo: ningún descendiente no-inline tiene texto propio.
        return ![...el.querySelectorAll('*')].some((d) => !esInline(d) && conTexto(d));
      });
      const filetes = todos.filter((el) => {
        if (el.children.length || conTexto(el)) return false;
        const r = el.getBoundingClientRect();
        return (r.width <= 3 || r.height <= 3) && r.width * r.height > 0;
      });
      const orden = [...bloques, ...filetes].sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1);

      // Parte un bloque en palabras (inline-block) y agrupa por renglón. Si el armado cambia en algo,
      // deshace: la placa tiene que quedar idéntica al PNG.
      const renglonesDe = (tops, tol) => {
        const out = [];
        tops.forEach((t) => { if (!out.some((x) => Math.abs(x - t) < tol)) out.push(t); });
        return out.sort((a, b) => a - b);
      };
      let revertidos = 0; const enteros = [];
      function partir(el) {
        const fs0 = parseFloat(getComputedStyle(el).fontSize) || 20;
        const rg = document.createRange(); rg.selectNodeContents(el);
        const antes = renglonesDe([...rg.getClientRects()].filter((r) => r.width > 0.5).map((r) => r.top), fs0 * 0.4);
        const r0 = el.getBoundingClientRect();
        const original = el.innerHTML;
        const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const nodos = []; while (tw.nextNode()) nodos.push(tw.currentNode);
        const palabras = [];
        nodos.forEach((n) => {
          const partes = n.textContent.split(/(\s+)/);
          if (partes.length === 1 && !partes[0].trim()) return;
          const frag = document.createDocumentFragment();
          partes.forEach((p) => {
            if (!p) return;
            if (!p.trim()) { frag.appendChild(document.createTextNode(p)); return; }
            const s = document.createElement('span');
            s.textContent = p; s.style.display = 'inline-block';
            frag.appendChild(s); palabras.push(s);
          });
          n.parentNode.replaceChild(frag, n);
        });
        const r1 = el.getBoundingClientRect();
        // Se compara letra contra letra (el rectángulo del texto, no el de la caja de la palabra):
        // con interlineado apretado la caja de un inline-block queda varios píxeles más abajo que
        // la letra, y eso no es un cambio de armado.
        const glifo = (sp) => { const r = document.createRange(); r.selectNodeContents(sp); return r.getBoundingClientRect(); };
        const rects = palabras.map(glifo);
        const tops = rects.map((r) => r.top);
        const despues = renglonesDe(tops, fs0 * 0.4);
        const igual = palabras.length && despues.length === antes.length &&
          despues.every((t, i) => Math.abs(t - antes[i]) < 2.5) &&
          Math.abs(r1.height - r0.height) < 1.5 && Math.abs(r1.width - r0.width) < 1.5;
        if (!igual) {
          el.innerHTML = original; revertidos++;
          enteros.push({ texto: (el.innerText || '').slice(0, 50), antes: antes.length, despues: despues.length,
            dAlto: +(r1.height - r0.height).toFixed(1), dAncho: +(r1.width - r0.width).toFixed(1) });
          return null;
        }
        // Renglones como listas de palabras, en orden.
        return despues.map((t) => palabras.filter((s, i) => Math.abs(tops[i] - t) < fs0 * 0.4));
      }

      const palabrasTotal = (placa.innerText || '').split(/\s+/).filter(Boolean).length;

      // ---------- Tiempos ----------
      // En Institucional el texto espera a que las persianas terminen de abrirse: si entra antes, se
      // ve cortado en tiras.
      const t0 = 80, tTrazo = 850, tSale = 1250, tMorf = 900, tPlaca = inst ? 2000 : 1400;
      const ritmo = estilo === 'secuencial' ? 0.75 : inst ? 1.35 : 1;
      let t = tPlaca;
      const salidas = []; // [el, orden] para la retirada
      const MASC_IN = (dy) => [
        { opacity: 0, transform: 'translateY(' + dy + ')', clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, offset: 0.35 },
        { opacity: 1, transform: 'none', clipPath: 'inset(0 0 -30% 0)' }
      ];
      let tFin = tPlaca;
      // Ritmo de lectura: antes del bloque siguiente se espera una parte de lo que lleva leer éste
      // (~3,3 palabras por segundo). El texto aparece al paso de quien lee, en vez de entrar todo
      // junto y quedarse quieto hasta el final.
      const kLeer = estilo === 'secuencial' ? 0.65 : inst ? 0.55 : 0.5;
      const pausa = (el) => Math.min(2800, (el.innerText || '').split(/\s+/).filter(Boolean).length / 3.3 * 1000 * kLeer);

      const inicio = new Map(); // bloque -> cuándo empieza a entrar
      orden.forEach((el) => {
        inicio.set(el, t);
        const cs = getComputedStyle(el);
        if (filetes.includes(el)) {
          const r = el.getBoundingClientRect(), vert = r.height > r.width;
          A(el, [{ transform: vert ? 'scaleY(0)' : 'scaleX(0)', transformOrigin: vert ? 'top' : 'left' },
                 { transform: 'none', transformOrigin: vert ? 'top' : 'left' }], { duration: 900, delay: t, easing: salida });
          salidas.push(el); tFin = Math.max(tFin, t + 900); t += 200 * ritmo; return;
        }
        const tamLetra = parseFloat(cs.fontSize) || 20;
        const esRotulo = cs.textTransform === 'uppercase' && parseFloat(cs.letterSpacing) > 2 && tamLetra < 40;
        // Abrir el tracking cambia el ancho del rótulo: si con el tracking cerrado el rótulo cabe en menos
        // renglones, todo lo de abajo saltaría a mitad de la animación y las líneas quedarían corridas.
        // En ese caso entra con la máscara, como el resto del texto.
        let trackingSeguro = false;
        const tracking = cs.letterSpacing; // el valor final (cs es un estilo vivo: leerlo antes de tocar nada)
        if (esRotulo) {
          const enLinea = el.style.letterSpacing; // el del kit va en línea: hay que devolverlo tal cual
          const h0 = el.getBoundingClientRect().height, p0 = el.parentElement.getBoundingClientRect();
          el.style.letterSpacing = '0.02em';
          const h1 = el.getBoundingClientRect().height, p1 = el.parentElement.getBoundingClientRect();
          el.style.letterSpacing = enLinea;
          trackingSeguro = Math.abs(h1 - h0) < 1 && Math.abs(p1.height - p0.height) < 1 && Math.abs(p1.width - p0.width) < 1;
        }
        if (esRotulo && trackingSeguro) {
          A(el, [{ opacity: 0, letterSpacing: '0.02em' }, { opacity: 1, letterSpacing: tracking }], { duration: 1100, delay: t, easing: salida });
          salidas.push(el); tFin = Math.max(tFin, t + 1100); t += 380 * ritmo + pausa(el); return;
        }
        const grande = tamLetra >= 50;
        const renglones = partir(el);
        if (!renglones) {
          // No se pudo partir sin mover nada: entra el bloque entero, con la misma máscara.
          A(el, MASC_IN(grande ? '46px' : '28px'), { duration: grande ? 1100 : 900, delay: t, easing: salida });
          salidas.push(el); tFin = Math.max(tFin, t + 1000); t += (grande ? 420 : 340) * ritmo + pausa(el); return;
        }
        let tl = t;
        renglones.forEach((ws, li) => {
          ws.forEach((w, wi) => {
            // Titulares: palabra por palabra. Texto corrido: renglón por renglón.
            const d = grande ? tl + wi * 55 : tl;
            A(w, MASC_IN('105%'), { duration: grande ? 900 : 800, delay: d, easing: salida });
            salidas.push(w); tFin = Math.max(tFin, d + (grande ? 900 : 800));
          });
          tl += (grande ? 110 + ws.length * 40 : 95) * ritmo;
        });
        t = tl + (grande ? 180 : 230) * ritmo + pausa(el);
      });

      // Las líneas que separan filas en el kit son bordes de la caja de la fila (border-top/bottom), no
      // elementos propios: se dibujan como filetes, con una línea encima idéntica al borde, al ritmo del
      // primer texto de la fila. El borde real queda transparente mientras dura el video.
      const capaLineas = capa(15);
      const rsLin = st.getBoundingClientRect();
      const primerInicio = (el) => {
        let mejor = null;
        for (const [b, tb] of inicio) {
          if (el === b || el.contains(b) || (el.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)) {
            if (mejor === null || tb < mejor) mejor = tb;
            if (el.contains(b) || el === b) break;
          }
        }
        return mejor === null ? tPlaca : mejor;
      };
      const lineasBorde = [];
      todos.forEach((el) => {
        const cs = getComputedStyle(el);
        const lados = [['Top', 'h'], ['Bottom', 'h'], ['Left', 'v'], ['Right', 'v']].filter(([l]) =>
          parseFloat(cs['border' + l + 'Width']) > 0 && cs['border' + l + 'Style'] !== 'none' &&
          !/rgba\([^)]*,\s*0\)|transparent/.test(cs['border' + l + 'Color']));
        if (!lados.length) return;
        const r = el.getBoundingClientRect();
        const tb = primerInicio(el);
        lados.forEach(([l, o], k) => {
          const bw = parseFloat(cs['border' + l + 'Width']);
          const d = document.createElement('div');
          const x = r.left - rsLin.left, y = r.top - rsLin.top;
          const pos = l === 'Top' ? [x, y, r.width, bw] : l === 'Bottom' ? [x, y + r.height - bw, r.width, bw]
            : l === 'Left' ? [x, y, bw, r.height] : [x + r.width - bw, y, bw, r.height];
          d.style.cssText = 'position:absolute;left:' + pos[0] + 'px;top:' + pos[1] + 'px;width:' + pos[2] + 'px;height:' + pos[3] +
            'px;background:' + cs['border' + l + 'Color'] + ';transform-origin:' + (o === 'h' ? 'left center' : 'center top');
          capaLineas.appendChild(d);
          el.style['border' + l + 'Color'] = 'transparent';
          A(d, [{ transform: o === 'h' ? 'scaleX(0)' : 'scaleY(0)' }, { transform: 'none' }],
            { duration: 900, delay: Math.max(tPlaca, tb - 120 + k * 60), easing: salida });
          lineasBorde.push(d);
        });
      });
      lineasBorde.forEach((d) => salidas.push(d));

      // Lo que falta leer cuando ya entró todo: el tiempo de lectura de la placa (~3,2 palabras por
      // segundo) menos lo que se fue leyendo mientras entraba, con un piso para verla completa.
      const lectura = Math.min(12000, Math.max(3200, palabrasTotal / 3.2 * 1000 - (tFin - tPlaca)));
      // Retirada del texto (~0,7 s) + trazo del logo (1,4 s) + web + la firma quieta ~1,4 s al final.
      const cierreDur = inst ? 4300 : 4100;
      let T = Math.min(32000, Math.ceil((tFin + lectura + cierreDur) / 500) * 500);
      if (segundos) T = segundos * 1000;
      const tSalida = T - cierreDur;
      const tPortada = Math.max(tFin, tSalida - 250);

      // ---------- 1. Apertura ----------
      const tapa = capa(20, 'background:' + FONDO);
      const envIso = capa(30);
      envIso.innerHTML = ISO;
      const iso = envIso.querySelector('svg');
      const ar = 261.09 / 219.5;
      let fw, fx, fy, fo;
      if (isoPropio) {
        const rs = st.getBoundingClientRect(), ri = isoPropio.getBoundingClientRect();
        fw = ri.width; fx = ri.left - rs.left; fy = ri.top - rs.top; fo = parseFloat(getComputedStyle(isoPropio).opacity) || 1;
        isoPropio.style.visibility = 'hidden';
      } else if (inst) { fw = 92; fx = W - 130 - fw; fy = (off > 0 ? off + H - 130 : HO - 300) - fw * ar; fo = 0.85; }
      else { fw = 1.7 * W; fx = (W - fw) / 2 + 0.16 * W; fy = (HO - fw * ar) / 2 - 0.04 * HO; fo = claro ? 0.05 : 0.08; }
      const grandeFinal = fw > W * 0.6;
      iso.setAttribute('width', fw); iso.setAttribute('height', fw * ar);
      iso.style.cssText = 'position:absolute;left:' + fx + 'px;top:' + fy + 'px;transform-origin:0 0;overflow:visible';
      const iw = 0.24 * W, s = iw / fw;
      const ix = (W - iw) / 2, iy = (HO - iw * ar) / 2 - 0.03 * HO;
      const desdeCentro = 'translate(' + (ix - fx) + 'px,' + (iy - fy) + 'px) scale(' + s + ')';
      [...iso.querySelectorAll(FORMAS)].forEach((pa) => {
        const L = pa.getTotalLength();
        pa.style.stroke = TINTA; pa.style.strokeWidth = String(2.1 * 219.5 / iw); pa.style.strokeDasharray = L;
        A(pa, [{ strokeDashoffset: L, fillOpacity: 0, strokeOpacity: 1 },
               { strokeDashoffset: 0, fillOpacity: 0, strokeOpacity: 1, offset: (tTrazo - t0) / (tSale - t0) },
               { strokeDashoffset: 0, fillOpacity: 1, strokeOpacity: 0 }], { duration: tSale - t0, delay: t0, easing: trazo });
      });
      A(iso, !grandeFinal
        ? [{ transform: desdeCentro, opacity: 1 }, { transform: 'none', opacity: fo }]
        : [{ transform: desdeCentro, opacity: 1 }, { opacity: 0.3, offset: 0.08 }, { opacity: Math.min(0.12, fo * 1.6), offset: 0.22 },
           { opacity: fo, offset: 0.5 }, { transform: 'none', opacity: fo }],
        { duration: tMorf, delay: tSale, easing: salida });

      const n = 17, bw = W / n;
      const persianas = (alAbrir) => {
        const cont = capa(alAbrir ? 20 : 35);
        for (let i = 0; i < n; i++) {
          const f = document.createElement('div');
          f.style.cssText = 'position:absolute;top:0;bottom:0;left:' + (i * bw - 0.5) + 'px;width:' + (bw + 1) + 'px;background:' + (conFoto ? NAVY : FONDO) +
            ';background-size:' + W + 'px ' + HO + 'px;background-position:' + (-i * bw) + 'px 0;transform-origin:' + (alAbrir ? 'left' : 'right');
          cont.appendChild(f);
          if (alAbrir) A(f, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: 560, delay: tSale + i * 26, easing: 'cubic-bezier(.7,0,.3,1)' });
          else A(f, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 600, delay: tSalida + 150 + (n - 1 - i) * 30, easing: 'cubic-bezier(.7,0,.3,1)' });
        }
        return cont;
      };
      if (inst) {
        tapa.style.background = 'none';
        persianas(true);
        const g = capa(5, 'background:linear-gradient(to right,' + (claro ? 'rgba(6,22,45,.06)' : 'rgba(248,246,246,.07)') + ' 1px,transparent 1px);background-size:64px 100%');
        A(g, [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, delay: tPlaca });
      } else {
        A(tapa, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, delay: tSale });
        if (grandeFinal) A(envIso, [{ transform: 'translate(0,0)' }, { transform: 'translate(-46px,-28px)' }], { duration: T, easing: 'linear' });
      }

      // ---------- 2. La placa, viva mientras se lee ----------
      fotos.forEach((im) => A(im, [{ transform: 'scale(1.16)' }, { transform: 'scale(1)' }], { duration: T, easing: 'linear' }));
      if (!conFoto && bgImg) {
        fondoVivo.style.backgroundSize = '170% 170%';
        A(fondoVivo, [{ backgroundPosition: '100% 0%' }, { backgroundPosition: '0% 100%' }], { duration: T, easing: 'linear' });
      }

      // ---------- 3. Salida y firma ----------
      salidas.forEach((el, i) => S(el, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-16px)' }],
        { duration: 420, delay: tSalida + Math.min(i, 30) * 9, easing: 'cubic-bezier(.4,0,.6,1)' }));
      if (inst) {
        persianas(false);
        S(envIso, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: tSalida + 200 });
      }
      const tLogo = tSalida + (inst ? 900 : 650);
      const fin = capa(40, 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:' + Math.round(HO * 0.035) + 'px');
      const lw = 0.5 * W, env = document.createElement('div'); env.innerHTML = LOGO;
      const lg = env.querySelector('svg'); lg.setAttribute('width', lw); lg.setAttribute('height', lw * 191.41 / 456.52);
      fin.appendChild(env);
      A(fin, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, delay: tLogo - 60 });
      [...lg.querySelectorAll(FORMAS)].forEach((pa, i) => {
        const L = pa.getTotalLength();
        pa.style.stroke = TINTA; pa.style.strokeWidth = String(1.6 * 456.52 / lw); pa.style.strokeDasharray = L;
        A(pa, [{ strokeDashoffset: L, fillOpacity: 0, strokeOpacity: 1 }, { strokeDashoffset: 0, fillOpacity: 0, strokeOpacity: 1, offset: 0.65 },
               { strokeDashoffset: 0, fillOpacity: 1, strokeOpacity: 0 }], { duration: 1400, delay: tLogo + Math.min(i, 6) * 40, easing: trazo });
      });
      const web = document.createElement('div');
      web.textContent = 'mdo-consultores.com.ar';
      web.style.cssText = "font-family:'Chivo',sans-serif;font-weight:700;font-size:" + Math.round(W * 0.024) +
        'px;letter-spacing:.2em;text-transform:uppercase;color:' + (claro ? '#5c677f' : '#8f96a1');
      fin.appendChild(web);
      A(web, [{ opacity: 0, letterSpacing: '.04em' }, { opacity: 1, letterSpacing: '.2em' }], { duration: 1100, delay: tLogo + 900, easing: salida });

      anims.forEach((a) => a.pause());
      window.__anims = anims;
      return { T, tPortada, tPlaca, tLogo, bloques: bloques.length, revertidos, enteros, palabras: palabrasTotal, claro, lumPix, tFin, tSalida, off };
    }, { estilo, segundos: segundos ? +segundos : 0, W, H, HO, logos, lumPix });

    if (plan.tFin > plan.tSalida - 2500) {
      console.error(`AVISO: el texto termina de entrar a los ${(plan.tFin / 1000).toFixed(1)} s y se retira a los ` +
        `${(plan.tSalida / 1000).toFixed(1)} s: queda poco tiempo para leerlo. Subí --segundos o acortá el texto.`);
    }
    if (plan.revertidos) {
      console.error(`AVISO: ${plan.revertidos} bloque(s) no se pudieron partir en renglones sin mover el armado: entran enteros.`);
      if (process.env.VIDEO_DEBUG) console.error(JSON.stringify(plan.enteros));
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const clip = { x: 0, y: 0, width: W, height: HO };
    const enCuadro = (ms) => page.evaluate((m) => window.__anims.forEach((a) => { a.currentTime = m; }), ms);

    // Tira de control: 14 cuadros en los momentos que importan (apertura, entrada, placa completa,
    // salida, firma), achicados y en dos filas. Es lo que se mira antes de dar el video por bueno.
    if (tira) {
      const T = plan.T, tS = plan.tSalida;
      const entrada = [1, 2, 3, 4, 5].map((k) => plan.tPlaca + (plan.tFin - plan.tPlaca) * k / 6);
      const momentos = [300, 700, 1100, plan.tPlaca, ...entrada, plan.tFin, plan.tPortada, tS + 350, plan.tLogo + 700, T - 60]
        .map((m) => Math.max(0, Math.min(T - 1, Math.round(m)))).sort((a, b) => a - b);
      const ft = spawn(FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', '1', '-c:v', 'png', '-i', '-',
        '-vf', 'scale=270:-1,tile=7x2:padding=6:color=white', '-frames:v', '1', tira], { stdio: ['pipe', 'ignore', 'pipe'] });
      let e2 = ''; ft.stderr.on('data', (d) => { e2 += d; });
      for (const m of momentos) { await enCuadro(m); ft.stdin.write(await page.screenshot({ type: 'png', clip })); }
      ft.stdin.end();
      await new Promise((ok, ko) => ft.on('close', (c) => (c === 0 ? ok() : ko(new Error('ffmpeg (tira): ' + e2.slice(-300))))));
      // Y dos cuadros a tamaño real, que la tira no deja ver en detalle: a mitad de la entrada y la
      // placa completa (el mismo cuadro de la portada).
      for (const [nombre, ms] of [['entrada', (plan.tPlaca + plan.tFin) / 2], ['completa', plan.tPortada]]) {
        await enCuadro(Math.round(ms));
        await page.screenshot({ type: 'png', clip, path: tira.replace(/\.png$/i, '') + '-' + nombre + '.png' });
      }
    }
    // Cuadros sueltos a tamaño real (--cuadros 9000,12000): junto a la tira, o junto al MP4.
    const sueltos = [];
    for (const ms of cuadros) {
      const ruta = (tira || outPath).replace(/\.(png|mp4)$/i, '') + '-' + ms + 'ms.png';
      await enCuadro(Math.max(0, Math.min(plan.T - 1, ms)));
      await page.screenshot({ type: 'png', clip, path: ruta });
      sueltos.push(ruta);
    }
    if (tira && soloTira) return { ...plan, estilo, W, H: HO, outPath: null, portada: null, tira, fps, sueltos };

    const ff = spawn(FFMPEG, ['-y',
      '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
      '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
      '-map', '0:v', '-map', '1:a',
      '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', '17',
      '-g', String(fps * 2), '-r', String(fps),
      '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', outPath], { stdio: ['pipe', 'ignore', 'pipe'] });
    let err = ''; ff.stderr.on('data', (d) => { err += d; });
    const nCuadros = Math.round(plan.T / 1000 * fps);
    for (let f = 0; f < nCuadros; f++) {
      await enCuadro(f * 1000 / fps);
      const buf = await page.screenshot({ type: 'png', clip, optimizeForSpeed: true });
      if (!ff.stdin.write(buf)) await new Promise((ok) => ff.stdin.once('drain', ok));
    }
    ff.stdin.end();
    await new Promise((ok, ko) => ff.on('close', (c) => (c === 0 ? ok() : ko(new Error('ffmpeg: ' + err.slice(-500))))));

    if (portada) {
      await enCuadro(plan.tPortada);
      await page.screenshot({ type: 'png', clip, path: portada });
    }
    return { ...plan, estilo, W, H: HO, outPath, portada, fps, sueltos };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  const a = parseArgs(process.argv);
  if (!a.template || !a.out) {
    console.error('Uso: node scripts/video.js --template <id> --out posts/AAAA-MM-DD-N.mp4 --slots \'{...}\' ' +
      '[--formato reel|placa] [--estilo ...] [--segundos N] [--portada ruta.png] [--fps 30|60] [--tira ruta.png [--solo-tira]]');
    process.exit(1);
  }
  const slots = a.slots ? JSON.parse(a.slots) : {};
  video({
    template: a.template, slots, outPath: path.resolve(a.out), estilo: a.estilo, segundos: a.segundos,
    formato: a.formato || 'reel', portada: a.portada ? path.resolve(a.portada) : undefined, fps: a.fps || 30,
    tira: a.tira ? path.resolve(a.tira) : undefined, soloTira: !!a['solo-tira'],
    cuadros: typeof a.cuadros === 'string' ? a.cuadros.split(',').map(Number).filter((n) => n >= 0) : [],
  })
    .then((r) => r.outPath === null ? console.log(`Tira → ${r.tira} · ${(r.T / 1000).toFixed(1)} s · ${r.claro ? "placa clara" : "placa oscura"} (lum ${r.lumPix.toFixed(2)}) · ${r.bloques} bloques (${r.revertidos} enteros)`) : console.log(`OK → ${r.outPath} · ${(r.T / 1000).toFixed(1)} s · ${r.W}×${r.H} · ${r.fps} fps · estilo ${r.estilo}` +
      ` · ${r.claro ? 'placa clara' : 'placa oscura'} · ${r.bloques} bloques (${r.revertidos} enteros)` +
      ` · ${Math.round(fs.statSync(r.outPath).size / 1024)} KB` + (r.portada ? ` · portada → ${r.portada}` : '') + (r.tira ? ` · tira → ${r.tira}` : '')))
    .catch((e) => { console.error('ERROR:', e.message || e); process.exit(1); });
}

module.exports = { video };

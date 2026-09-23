#!/usr/bin/env node
// Convierte una placa del kit en un video corto de marca (MP4 H.264, 30 fps).
//
// Uso (mismos slots que render.js):
//   node scripts/video.js --template po-13d --out posts/2026-09-30-2.mp4 \
//     --slots '{"FECHA":"30.09.2026","TITULAR_1":"...","TITULAR_2":"...","BAJADA":"...","CIERRE":"..."}'
//
// Opcionales:
//   --estilo editorial|institucional|secuencial   (por defecto lo elige según la plantilla)
//   --segundos N                                 (por defecto se calcula por cantidad de texto)
//
// Qué hace, con recursos del Manual de Marca 2026 (design system «MDO - Diseño»):
//   1. Apertura: el isotipo se traza y se llena sobre el fondo de la placa, y después se vuelve
//      marca de agua gigante (Novedades / Servicios) o firma chica abajo a la derecha (Institucional,
//      con persianas al ritmo de la grilla de líneas verticales de 64 px).
//   2. La placa real, entrando por partes: textos con máscara, filetes que se dibujan, rótulos en
//      Chivo que abren el tracking. La foto se acerca muy despacio.
//   3. Cierre: el logo principal centrado y la web.
// Sin blur, sin rebotes, sin contadores (manual, sección 6). La placa es la misma que fotografía
// render.js, así que el último cuadro de la parte 2 coincide con el PNG.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const FFMPEG = require('ffmpeg-static');

const ROOT = path.resolve(__dirname, '..');
const FPS = 30;

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

async function video({ template, slots, outPath, estilo, segundos }) {
  const [W, H] = tamano(template);
  if (H < 1000) throw new Error('Las placas horizontales (li-*) no se animan: LinkedIn lleva la imagen.');
  estilo = estilo || estiloPorDefecto(template);
  const logos = {
    isoClaro: svg('logo-mdo-iso-white.svg'), isoOscuro: svg('logo-mdo-iso.svg'),
    logoClaro: svg('logo-mdo-principal-white.svg'), logoOscuro: svg('logo-mdo-principal.svg'),
  };

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none', '--ignore-certificate-errors',
      '--disable-web-security', '--allow-file-access-from-files'],
    ignoreHTTPSErrors: true,
    defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
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

    const plan = await page.evaluate(({ estilo, segundos, W, H, logos }) => {
      const suave = 'cubic-bezier(.2,0,.2,1)', salida = 'cubic-bezier(.16,1,.3,1)', trazo = 'cubic-bezier(.45,0,.25,1)';
      const anims = [];
      const A = (el, kf, o) => { anims.push(el.animate(kf, Object.assign({ fill: 'both', easing: suave }, o))); };
      const st = document.getElementById('stage');
      st.style.position = 'relative'; st.style.overflow = 'hidden';
      const capa = (z, css) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:' + z + ';' + (css || ''); st.appendChild(d); return d; };
      const placa = st.querySelector('.__scaled > div > div') || st.firstElementChild;
      // Fotos de verdad (las del kit viven en assets/fotos/); el isotipo propio de la placa es otra cosa.
      const fotos = [...placa.querySelectorAll('img')].filter((im) => /fotos\//.test(im.getAttribute('src') || ''));
      const conFoto = fotos.length > 0;
      const isoPropio = [...placa.querySelectorAll('img')].find((im) => /logo-mdo-iso/.test(im.getAttribute('src') || ''));
      const inst = estilo === 'institucional';

      // Tono de la placa: claro (papel, degradé de servicios) u oscuro (navy, foto).
      const cs0 = getComputedStyle(placa);
      const colores = (cs0.backgroundImage + ' ' + cs0.backgroundColor).match(/#[0-9a-f]{6}|rgba?\([^)]*\)/gi) || [];
      const lum = colores.map((c) => {
        let r, g, b;
        if (c[0] === '#') { r = parseInt(c.slice(1, 3), 16); g = parseInt(c.slice(3, 5), 16); b = parseInt(c.slice(5, 7), 16); }
        else { [r, g, b] = c.match(/[\d.]+/g).map(Number); }
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      });
      const claro = !conFoto && lum.length && lum.reduce((a, b) => a + b, 0) / lum.length > 0.55;
      const TINTA = claro ? '#06162d' : '#f8f6f6';
      const FONDO = conFoto || !cs0.backgroundImage || cs0.backgroundImage === 'none'
        ? (claro ? '#f8f6f6' : 'linear-gradient(to top right,#00081d 0%,#0a1a36 55%,#273f63 100%)')
        : cs0.backgroundImage;
      const ISO = isoPropio ? (/white/.test(isoPropio.getAttribute('src')) ? logos.isoClaro : logos.isoOscuro) : (claro ? logos.isoOscuro : logos.isoClaro);
      const LOGO = claro ? logos.logoOscuro : logos.logoClaro;

      // ---------- Textos de la placa, en orden de lectura ----------
      const fondos = [...placa.children].filter((c) => getComputedStyle(c).position === 'absolute');
      const hojas = [...placa.querySelectorAll('*')].filter((el) => {
        if (fondos.some((f) => f.contains(el))) return false;
        if (el.closest('svg') || el.tagName === 'IMG') return false;
        const propio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        const r = el.getBoundingClientRect();
        const linea = !propio && !el.children.length && (r.width <= 3 || r.height <= 3) && r.width * r.height > 0;
        return propio || linea;
      });
      const palabras = placa.innerText.split(/\s+/).filter(Boolean).length;

      // ---------- Tiempos ----------
      const t0 = 150, tTrazo = 1150, tSale = 1750, tPlaca = 2500;
      let t = tPlaca - 150;
      const pasos = hojas.map((el) => {
        const esLinea = !el.textContent.trim();
        if (esLinea) return 260;
        if (inst) return 650;
        return estilo === 'secuencial' ? 300 : 420;
      });
      const entrada = pasos.reduce((a, b) => a + b, 0) + 900;
      // Tiempo para leer lo que quedó en pantalla: ~3,3 palabras por segundo, con piso y techo.
      const lectura = Math.min(14000, Math.max(3200, palabras / 3.3 * 1000));
      const cierreDur = 2900;
      const T = segundos ? segundos * 1000 : Math.min(30000, Math.ceil((tPlaca + entrada + lectura + cierreDur) / 500) * 500);
      const tc = T - cierreDur;

      // ---------- 1. Apertura ----------
      const tapa = capa(20, 'background:' + FONDO);
      const envIso = capa(30);
      envIso.innerHTML = ISO;
      const iso = envIso.querySelector('svg');
      const ar = 261.09 / 219.5;
      let fw, fx, fy, fo;
      if (isoPropio) {
        // La placa ya trae su isotipo (marca de agua de Servicios, firma chica): el de la apertura se
        // convierte exactamente en ése, y el original queda oculto para que no haya dos.
        const rs = st.getBoundingClientRect(), ri = isoPropio.getBoundingClientRect();
        fw = ri.width; fx = ri.left - rs.left; fy = ri.top - rs.top; fo = parseFloat(getComputedStyle(isoPropio).opacity) || 1;
        isoPropio.style.visibility = 'hidden';
      } else if (inst) { fw = 92; fx = W - 130 - fw; fy = H - (H > 1600 ? 300 : 130) - fw * ar; fo = 0.85; }
      else { fw = 1.7 * W; fx = (W - fw) / 2 + 0.16 * W; fy = (H - fw * ar) / 2 - 0.04 * H; fo = claro ? 0.05 : 0.08; }
      const grandeFinal = fw > W * 0.6;
      iso.setAttribute('width', fw); iso.setAttribute('height', fw * ar);
      iso.style.cssText = 'position:absolute;left:' + fx + 'px;top:' + fy + 'px;transform-origin:0 0;overflow:visible';
      const iw = 0.24 * W, s = iw / fw;
      const ix = (W - iw) / 2, iy = (H - iw * ar) / 2 - 0.03 * H;
      const desdeCentro = 'translate(' + (ix - fx) + 'px,' + (iy - fy) + 'px) scale(' + s + ')';
      [...iso.querySelectorAll('path')].forEach((pa) => {
        const L = pa.getTotalLength();
        pa.style.stroke = TINTA; pa.style.strokeWidth = String(2.1 * 219.5 / iw); pa.style.strokeDasharray = L;
        A(pa, [{ strokeDashoffset: L, fillOpacity: 0, strokeOpacity: 1 },
               { strokeDashoffset: 0, fillOpacity: 0, strokeOpacity: 1, offset: (tTrazo - t0) / (tSale - t0) },
               { strokeDashoffset: 0, fillOpacity: 1, strokeOpacity: 0 }], { duration: tSale - t0, delay: t0, easing: trazo });
      });
      // Al crecer se apaga antes de agrandarse del todo: no cruza la pantalla como un logo gigante.
      A(iso, !grandeFinal
        ? [{ transform: desdeCentro, opacity: 1 }, { transform: 'none', opacity: fo }]
        : [{ transform: desdeCentro, opacity: 1 }, { opacity: 0.35, offset: 0.12 }, { opacity: fo * 1.4, offset: 0.4 }, { transform: 'none', opacity: fo }],
        { duration: tPlaca - tSale + 250, delay: tSale, easing: salida });
      if (inst) {
        tapa.style.background = 'none';
        const n = 17, bw = W / n;
        for (let i = 0; i < n; i++) {
          const f = document.createElement('div');
          f.style.cssText = 'position:absolute;top:0;bottom:0;left:' + (i * bw - 0.5) + 'px;width:' + (bw + 1) + 'px;background:' + FONDO +
            ';background-size:' + W + 'px ' + H + 'px;background-position:' + (-i * bw) + 'px 0;transform-origin:left';
          tapa.appendChild(f);
          A(f, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: 650, delay: tSale + i * 38, easing: 'cubic-bezier(.7,0,.3,1)' });
        }
        const g = capa(5, 'background:linear-gradient(to right,' + (claro ? 'rgba(6,22,45,.06)' : 'rgba(248,246,246,.07)') + ' 1px,transparent 1px);background-size:64px 100%');
        A(g, [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, delay: tPlaca });
      } else {
        A(tapa, [{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: tSale + 100 });
        if (grandeFinal) A(envIso, [{ transform: 'translate(0,0)' }, { transform: 'translate(-46px,-28px)' }], { duration: T, easing: 'linear' });
      }

      // ---------- 2. La placa ----------
      fotos.forEach((im) => A(im, [{ transform: 'scale(1.16)' }, { transform: 'scale(1)' }], { duration: T, easing: 'linear' }));
      if (!conFoto && cs0.backgroundImage && cs0.backgroundImage !== 'none') {
        placa.style.backgroundSize = '170% 170%';
        A(placa, [{ backgroundPosition: '100% 0%' }, { backgroundPosition: '0% 100%' }], { duration: T, easing: 'linear' });
      }
      hojas.forEach((el, i) => {
        const cs = getComputedStyle(el);
        if (cs.display === 'inline') el.style.display = 'inline-block';
        const r = el.getBoundingClientRect();
        const esLinea = !el.textContent.trim();
        const esRotulo = cs.textTransform === 'uppercase' && parseFloat(cs.letterSpacing) > 2;
        const grande = parseFloat(cs.fontSize) >= 50;
        if (esLinea) {
          const vert = r.height > r.width;
          A(el, [{ transform: vert ? 'scaleY(0)' : 'scaleX(0)', transformOrigin: vert ? 'top' : 'left' }, { transform: 'none', transformOrigin: vert ? 'top' : 'left' }], { duration: 900, delay: t, easing: salida });
        } else if (esRotulo) {
          A(el, [{ opacity: 0, letterSpacing: '0.02em' }, { opacity: 1, letterSpacing: cs.letterSpacing }], { duration: 1100, delay: t, easing: salida });
        } else if (inst) {
          const der = cs.textAlign === 'right' || getComputedStyle(el.parentElement).textAlign === 'right';
          A(el, [{ opacity: 0, clipPath: der ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', transform: 'translateX(' + (der ? 30 : -30) + 'px)' },
                 { opacity: 1, clipPath: 'inset(0 0 0 0)', transform: 'none' }], { duration: 1150, delay: t, easing: salida });
        } else if (estilo === 'secuencial' && !grande) {
          A(el, [{ opacity: 0, transform: 'translateX(-34px)' }, { opacity: 1, transform: 'none' }], { duration: 750, delay: t, easing: salida });
        } else {
          A(el, [{ opacity: 0, clipPath: 'inset(0 0 100% 0)', transform: 'translateY(' + (grande ? 46 : 28) + 'px)' },
                 { opacity: 1, clipPath: 'inset(0 0 -20% 0)', transform: 'none' }], { duration: grande ? 1100 : 900, delay: t, easing: salida });
        }
        t += pasos[i];
      });

      // ---------- 3. Cierre: el logo principal centrado ----------
      const cierre = capa(40, 'background:' + FONDO + ';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:' + Math.round(H * 0.045) + 'px');
      A(cierre, [{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: tc });
      const agua = document.createElement('div'); agua.innerHTML = ISO;
      const ag = agua.querySelector('svg'); ag.setAttribute('width', 1.7 * W); ag.setAttribute('height', 1.7 * W * ar);
      agua.style.cssText = 'position:absolute;left:' + ((W - 1.7 * W) / 2 - 0.16 * W) + 'px;top:' + ((H - 1.7 * W * ar) / 2 + 0.05 * H) + 'px;opacity:' + (claro ? 0.04 : 0.06);
      cierre.appendChild(agua);
      const lw = 0.5 * W, env = document.createElement('div'); env.innerHTML = LOGO; env.style.position = 'relative';
      const lg = env.querySelector('svg'); lg.setAttribute('width', lw); lg.setAttribute('height', lw * 191.41 / 456.52);
      cierre.appendChild(env);
      [...lg.querySelectorAll('path')].forEach((pa, i) => {
        const L = pa.getTotalLength();
        pa.style.stroke = TINTA; pa.style.strokeWidth = String(1.6 * 456.52 / lw); pa.style.strokeDasharray = L;
        A(pa, [{ strokeDashoffset: L, fillOpacity: 0, strokeOpacity: 1 }, { strokeDashoffset: 0, fillOpacity: 0, strokeOpacity: 1, offset: 0.65 }, { strokeDashoffset: 0, fillOpacity: 1, strokeOpacity: 0 }],
          { duration: 1500, delay: tc + 350 + Math.min(i, 6) * 40, easing: trazo });
      });
      const web = document.createElement('div');
      web.textContent = 'mdo-consultores.com.ar';
      web.style.cssText = "position:relative;font-family:'Chivo',sans-serif;font-weight:700;font-size:" + Math.round(W * 0.024) +
        'px;letter-spacing:.2em;text-transform:uppercase;color:' + (claro ? '#5c677f' : '#8f96a1');
      cierre.appendChild(web);
      A(web, [{ opacity: 0, letterSpacing: '.04em' }, { opacity: 1, letterSpacing: '.2em' }], { duration: 1200, delay: tc + 1300, easing: salida });

      anims.forEach((a) => a.pause());
      window.__anims = anims;
      return { T, hojas: hojas.length, palabras, claro, textoListo: t + 900, cierre: tc };
    }, { estilo, segundos: segundos ? +segundos : 0, W, H, logos });

    if (plan.textoListo > plan.cierre - 2500) {
      console.error(`AVISO: el texto termina de entrar a los ${(plan.textoListo / 1000).toFixed(1)} s y el cierre arranca a los ` +
        `${(plan.cierre / 1000).toFixed(1)} s: queda poco tiempo para leerlo. Subí --segundos o acortá el texto.`);
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const ff = spawn(FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-preset', 'medium', '-crf', '18',
      '-r', String(FPS), '-movflags', '+faststart', outPath], { stdio: ['pipe', 'ignore', 'pipe'] });
    let err = ''; ff.stderr.on('data', (d) => { err += d; });
    const cuadros = Math.round(plan.T / 1000 * FPS);
    for (let f = 0; f < cuadros; f++) {
      await page.evaluate((ms) => window.__anims.forEach((a) => { a.currentTime = ms; }), f * 1000 / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 95, clip: { x: 0, y: 0, width: W, height: H } });
      if (!ff.stdin.write(buf)) await new Promise((ok) => ff.stdin.once('drain', ok));
    }
    ff.stdin.end();
    await new Promise((ok, ko) => ff.on('close', (c) => (c === 0 ? ok() : ko(new Error('ffmpeg: ' + err.slice(-500))))));
    return { ...plan, estilo, W, H, outPath };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  const a = parseArgs(process.argv);
  if (!a.template || !a.out) {
    console.error('Uso: node scripts/video.js --template <id> --out posts/AAAA-MM-DD-N.mp4 --slots \'{...}\' [--estilo ...] [--segundos N]');
    process.exit(1);
  }
  const slots = a.slots ? JSON.parse(a.slots) : {};
  video({ template: a.template, slots, outPath: path.resolve(a.out), estilo: a.estilo, segundos: a.segundos })
    .then((r) => console.log(`OK → ${r.outPath} · ${(r.T / 1000).toFixed(1)} s · ${r.W}×${r.H} · estilo ${r.estilo}` +
      ` · ${r.claro ? 'placa clara' : 'placa oscura'} · ${Math.round(fs.statSync(r.outPath).size / 1024)} KB`))
    .catch((e) => { console.error('ERROR:', e.message || e); process.exit(1); });
}

module.exports = { video };

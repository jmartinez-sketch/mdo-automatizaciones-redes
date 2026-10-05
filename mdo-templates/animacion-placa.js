// La animación de una placa del kit: la misma para el video (scripts/video.js, que la carga en
// Puppeteer y la graba cuadro por cuadro) y para la vista previa del panel de Dirección MDO (que la
// carga en un iframe y la reproduce en loop cuando Juan regenera un post con video). Una sola fuente:
// si se cambia algo de la animación, se cambia acá y se vuelve a publicar este archivo con el panel
// (paso 7c de la skill).
//
// Espera la placa ya armada adentro de #stage (como la deja render.html) y devuelve el plan. Deja
// las animaciones en pausa en window.__anims: quien la usa decide en qué momento mostrar.
(function (raiz) {
  'use strict';

  function estiloPorDefecto(id) {
    if (id.startsWith('st-') || id.startsWith('in-') || id.startsWith('mn-07') || id.startsWith('mn-08')) return 'institucional';
    if (/^po-3[1-5]$/.test(id) || id.startsWith('cb-')) return 'secuencial';
    return 'editorial';
  }

  function animarPlaca({ estilo, segundos, W, H, HO, logos, lumPix }) {
    // Todas las formas del SVG, no sólo <path>: el logo principal dibuja la L, la T y la E de
    // CONSULTORES con <polygon>, y sin esto quedaban visibles todo el video.
    const FORMAS = 'path,polygon,polyline,rect,circle,ellipse,line';
    // dibujo: para las líneas que se trazan. Con la curva de salida la punta de una línea de 900 px
    // saltaba 160 px en el primer cuadro; ésta arranca a un tercio de esa velocidad.
    const salida = 'cubic-bezier(.16,1,.3,1)', dibujo = 'cubic-bezier(.33,.66,.2,1)', suave = 'cubic-bezier(.2,0,.2,1)', trazo = 'cubic-bezier(.45,0,.25,1)';
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
    // Sin la medición sobre la imagen (el panel no puede sacar una captura), se estima con los
    // colores del fondo: el de la placa y los de sus capas a sangre, degradés incluidos.
    if (lumPix == null) {
      const cols = [];
      [placa, ...[...placa.children].filter((c) => getComputedStyle(c).position === 'absolute')].forEach((el) => {
        const c = getComputedStyle(el);
        const enImg = (c.backgroundImage || '').match(/rgba?\([^)]*\)/g) || [];
        enImg.concat(/rgba?\([^)]*\)/.test(c.backgroundColor) ? [c.backgroundColor] : []).forEach((x) => {
          const v = (x.match(/[\d.]+/g) || []).map(Number);
          if (v.length === 4 && v[3] < 0.35) return;
          cols.push(lumDe(x));
        });
      });
      lumPix = cols.length ? cols.reduce((a, b) => a + b, 0) / cols.length : 0;
    }
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
    const t0 = 80, tTrazo = 850, tSale = 1250, tMorf = 900, tPlaca = inst ? 1800 : 1400;
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
               { transform: 'none', transformOrigin: vert ? 'top' : 'left' }], { duration: 1000, delay: t, easing: dibujo });
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
          { duration: 1000, delay: Math.max(tPlaca, tb - 120 + k * 60), easing: dibujo });
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
      // Marca de agua: crece arrancando despacio y frenando al final (tiene peso, sin rebote), y se
      // apaga en medio segundo parejo. Antes pasaba de blanco a gris en un cuadro: un parpadeo.
      : [{ transform: desdeCentro }, { transform: 'none' }],
      // Las dos (marca de agua y firma chica) con la misma curva de peso: con la de salida, el isotipo
      // que viaja a la firma de las historias saltaba 166 px en un cuadro.
      { duration: tMorf + 400, delay: tSale, easing: 'cubic-bezier(.5,0,.2,1)' });
    if (grandeFinal) A(iso, [{ opacity: 1 }, { opacity: fo }], { duration: 520, delay: tSale, easing: 'cubic-bezier(.3,0,.3,1)' });

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

    // Velocidad por cuadro: cuánto se corre lo visible de un cuadro al siguiente. Sin desenfoque de
    // movimiento (el manual no lo admite), pasar de ~80 px por cuadro a 30 fps en una pantalla de
    // 1920 se ve a saltos. Se pondera por opacidad: lo que viaja casi transparente no se nota.
    const seguidos = [['isotipo', iso], ['logo', lg], ...salidas.slice(0, 80).map((el) => [(el.innerText || el.tagName).trim().slice(0, 24), el])];
    const opac = (el) => { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity); return o; };
    window.__velocidad = (fps) => {
      const k = 1920 / Math.max(W, HO);
      let prev = null, pico = { px: 0, t: 0, que: '' };
      const porEl = seguidos.map(() => ({ px: 0, t: 0 }));
      for (let f = 0; f * 1000 / fps < T; f++) {
        const ms = f * 1000 / fps;
        anims.forEach((a) => { a.currentTime = ms; });
        const ahora = seguidos.map(([, el]) => { const r = el.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom, opac(el)]; });
        if (prev) ahora.forEach((r, i) => {
          const p = prev[i], o = Math.min(r[4], p[4]);
          if (o < 0.05) return;
          const d = Math.max(Math.hypot(r[0] - p[0], r[1] - p[1]), Math.hypot(r[2] - p[2], r[3] - p[3])) * k * o;
          if (d > pico.px) pico = { px: d, t: ms, que: seguidos[i][0] };
          if (d > porEl[i].px) porEl[i] = { px: d, t: ms };
        });
        prev = ahora;
      }
      pico.top = porEl.map((v, i) => ({ ...v, que: seguidos[i][0] })).sort((a, b) => b.px - a.px).slice(0, 8)
        .map((v) => v.que + ' ' + Math.round(v.px) + '@' + (v.t / 1000).toFixed(2));
      return pico;
    };
    return { T, tPortada, tPlaca, tLogo, bloques: bloques.length, revertidos, enteros, palabras: palabrasTotal, claro, lumPix, tFin, tSalida, off };
  }

  const api = { animarPlaca, estiloPorDefecto };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else Object.assign(raiz, api);
})(typeof window !== 'undefined' ? window : globalThis);

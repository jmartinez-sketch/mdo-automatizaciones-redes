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
// Sin blur, sin rebotes, sin contadores (manual, sección 6). Como no hay desenfoque de movimiento, se
// mide la velocidad de todo lo que se mueve y se avisa si algo salta más de 80 px entre cuadros.
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

const { estiloPorDefecto } = require('../mdo-templates/animacion-placa.js');

const svg = (f) => fs.readFileSync(path.join(ROOT, 'mdo-templates', 'assets', f), 'utf8').replace(/<\?xml[^>]*>/, '');

// Cuadros que cambian mucho más que los de al lado (medido por ffmpeg sobre el MP4 ya codificado).
async function saltos(mp4, fps) {
  const out = await new Promise((ok) => {
    const p = spawn(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-i', mp4, '-an',
      '-vf', "scale=270:-1,select='gte(scene,0)',metadata=print:file=-", '-f', 'null', '-'], { stdio: ['ignore', 'pipe', 'ignore'] });
    let s = ''; p.stdout.on('data', (d) => { s += d; }); p.on('close', () => ok(s));
  });
  const v = [...out.matchAll(/scene_score=([\d.]+)/g)].map((m) => +m[1]);
  const res = [];
  for (let i = 2; i < v.length - 2; i++) {
    const vec = (v[i - 2] + v[i - 1] + v[i + 1] + v[i + 2]) / 4;
    if (v[i] > 0.02 && v[i] > 4 * vec) res.push({ t: i / fps, veces: Math.round(v[i] / Math.max(vec, 1e-4)) });
  }
  return res;
}

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

    // La animación vive en mdo-templates/animacion-placa.js: la misma que reproduce el panel cuando
    // Juan regenera un post con video.
    await page.addScriptTag({ path: path.join(ROOT, 'mdo-templates', 'animacion-placa.js') });
    const plan = await page.evaluate((a) => window.animarPlaca(a),
      { estilo, segundos: segundos ? +segundos : 0, W, H, HO, logos, lumPix });

    if (plan.tFin > plan.tSalida - 2500) {
      console.error(`AVISO: el texto termina de entrar a los ${(plan.tFin / 1000).toFixed(1)} s y se retira a los ` +
        `${(plan.tSalida / 1000).toFixed(1)} s: queda poco tiempo para leerlo. Subí --segundos o acortá el texto.`);
    }
    const vel = await page.evaluate((f) => window.__velocidad(f), fps);
    plan.velocidad = vel;
    if (vel.px > 80) {
      console.error(`AVISO: «${vel.que}» se mueve ${Math.round(vel.px)} px por cuadro a los ${(vel.t / 1000).toFixed(2)} s ` +
        `(más de 80 se ve a saltos): alargar ese movimiento o suavizar la curva.`);
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
    // Una hoja de cuadros: los momentos (ms) achicados a `ancho` px, en `cols` columnas.
    const hoja = async (ruta, momentos, ancho, cols) => {
      const filas = Math.ceil(momentos.length / cols);
      const ft = spawn(FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', '1', '-c:v', 'png', '-i', '-',
        '-vf', `scale=${ancho}:-1,tile=${cols}x${filas}:padding=6:color=white`, '-frames:v', '1', ruta], { stdio: ['pipe', 'ignore', 'pipe'] });
      let e2 = ''; ft.stderr.on('data', (d) => { e2 += d; });
      for (const m of momentos) { await enCuadro(Math.max(0, Math.min(plan.T - 1, Math.round(m)))); ft.stdin.write(await page.screenshot({ type: 'png', clip })); }
      ft.stdin.end();
      await new Promise((ok, ko) => ft.on('close', (c) => (c === 0 ? ok() : ko(new Error('ffmpeg (hoja): ' + e2.slice(-300))))));
    };
    if (tira) {
      const T = plan.T, tS = plan.tSalida;
      const entrada = [1, 2, 3, 4, 5].map((k) => plan.tPlaca + (plan.tFin - plan.tPlaca) * k / 6);
      const momentos = [300, 700, 1100, plan.tPlaca, ...entrada, plan.tFin, plan.tPortada, tS + 350, plan.tLogo + 700, T - 60]
        .map((m) => Math.max(0, Math.min(T - 1, Math.round(m)))).sort((a, b) => a - b);
      await hoja(tira, momentos, 270, 7);
      // Para puntuar el video entero (paso 4c): un cuadro cada medio segundo, y uno por segundo al ancho
      // de un celular (360 px), que es donde se ve si el texto se lee.
      const base = tira.replace(/\.png$/i, '');
      const cada = (ms) => Array.from({ length: Math.floor((T - 1) / ms) + 1 }, (_, i) => i * ms);
      await hoja(base + '-contacto.png', cada(500), 180, 10);
      await hoja(base + '-celular.png', cada(1000), 360, 6);
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
      // Color: la captura es sRGB; se pasa a BT.709 en rango TV y se etiqueta, así los teléfonos no
      // corren el navy de la marca (sin etiqueta, cada reproductor adivina la matriz).
      '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
      '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
      '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '17',
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

    // Saltos en el video terminado: un cuadro que cambia mucho más que sus vecinos es un parpadeo o un
    // corte que nadie diseñó (el isotipo que se apagaba de golpe lo encontró esto).
    plan.saltos = await saltos(outPath, fps);
    for (const x of plan.saltos) {
      console.error(`AVISO: salto a los ${x.t.toFixed(2)} s (el cuadro cambia ${x.veces}× más que sus vecinos): mirarlo con --cuadros ${Math.round(x.t * 1000 - 70)},${Math.round(x.t * 1000)}.`);
    }

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

module.exports = { video, saltos };

#!/usr/bin/env node
// Video de la semana en Motion (desde el 26/10/2026): dibuja un film y lo graba a MP4 sin abrir
// la página de Motion, con el mismo reproductor que usa esa página.
//
// Un film es una carpeta (posts/AAAA-MM-DD-N-motion/) con:
//   scenes.json          la lista de escenas (id, nombre, segundos), como en Motion
//   scene-<id>.js        una por escena: kit.scene('<id>', { init(kit) {…}, render(t) {…} })
//   shared.js            (opcional) ayudas propias: Object.assign(window.MDO, { … })
//   film.css             (opcional) clases propias, que se suman a motion/base/base.css
//   assets/              (opcional) fotos del banco del design system (jpg, png, webp)
// La marca la pone este script: motion/base (base.css, shared.js con window.MDO, las letras),
// los logos de mdo-templates/assets como logo.html, logo-navy.html, iso.html, iso-navy.html, y
// los íconos del design system como iconos.json. Cómo se escribe un film: motion/LEEME.md.
//
// El reproductor (index.html + artifact-type/app.js + app.css) es código del tipo Motion: no se
// commitea. La rutina lo baja con la herramienta Artifact y lo instala con --instalar-player.
//
// Uso:
//   node scripts/motion-video.js --instalar-player <carpeta bajada con Artifact>
//   node scripts/motion-video.js --film <carpeta> --validar
//   node scripts/motion-video.js --film <carpeta> --hoja out/motion-hoja.png [--cada 1]
//   node scripts/motion-video.js --film <carpeta> --cuadros 1.2,8.5 [--dir out]
//   node scripts/motion-video.js --film <carpeta> --out posts/AAAA-MM-DD-N.mp4 [--portada 2.4]
//                                [--fps 30] [--escala 2] [--hilos 3]
// --out deja también <out sin .mp4>-portada.png (el cuadro de --portada, tapa del Reel).

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');
const puppeteer = require('puppeteer');
const FFMPEG = require('ffmpeg-static');
const { saltos } = require('./video.js');

const ROOT = path.resolve(__dirname, '..');
const BASE = path.join(ROOT, 'motion', 'base');
const PLAYER_DEF = path.join(ROOT, 'out', 'motion-player');
const PLAYER_FILES = ['index.html', 'artifact-type/app.js', 'artifact-type/app.css'];
const KIND = { '.css': 'css', '.html': 'html', '.js': 'js', '.json': 'json', '.txt': 'text' };
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function parseArgs(argv) {
  const a = {};
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i].replace(/^--/, '');
    const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    a[k] = v;
  }
  return a;
}

// El logo del design system como markup: sin la declaración XML ni el id (puede ir dos veces).
function logo(archivo) {
  return fs.readFileSync(path.join(ROOT, 'mdo-templates', 'assets', archivo), 'utf8')
    .replace(/<\?xml[^>]*\?>\s*/, '').replace(/<svg\b([^>]*?)\s+id="[^"]*"/, '<svg$1').replace(/<svg\b/, '<svg class="logo-svg"');
}

// Todo lo que el reproductor recibe con __animation.load(files).
function armarFilm(dir) {
  const leer = (f) => fs.readFileSync(f, 'utf8');
  const de = (f) => path.join(dir, f);
  if (!fs.existsSync(de('scenes.json'))) throw new Error(`${dir} no tiene scenes.json`);
  const lista = JSON.parse(leer(de('scenes.json')));
  if (!Array.isArray(lista.scenes) || !lista.scenes.length) throw new Error('scenes.json no tiene escenas');
  const modules = [];
  const add = (name, text) => modules.push({ name, kind: KIND[path.extname(name)], text });
  add('base.css', leer(path.join(BASE, 'base.css')) + (fs.existsSync(de('film.css')) ? '\n' + leer(de('film.css')) : ''));
  add('shared.js', leer(path.join(BASE, 'shared.js')) + (fs.existsSync(de('shared.js')) ? '\n' + leer(de('shared.js')) : ''));
  add('scenes.json', leer(de('scenes.json')));
  for (const s of lista.scenes) {
    const f = de('scene-' + s.id + '.js');
    if (!fs.existsSync(f)) throw new Error(`falta ${path.relative(ROOT, f)} (la escena «${s.id}» está en scenes.json)`);
    add('scene-' + s.id + '.js', leer(f));
  }
  add('logo.html', logo('logo-mdo-principal-white.svg'));
  add('logo-navy.html', logo('logo-mdo-principal.svg'));
  add('iso.html', logo('logo-mdo-iso-white.svg'));
  add('iso-navy.html', logo('logo-mdo-iso.svg'));
  add('iconos.json', JSON.stringify(require(path.join(ROOT, 'mdo-templates', 'iconos-mdo.json')).iconos));
  // Otros módulos del film (textos, datos, un HTML suelto), si los hay.
  for (const f of fs.readdirSync(dir)) {
    if (/^(scenes\.json|shared\.js|film\.css|scene-.*\.js)$/.test(f) || !KIND[path.extname(f)] || modules.some((m) => m.name === f)) continue;
    if (fs.statSync(de(f)).isFile()) add(f, leer(de(f)));
  }
  const assets = [];
  for (const f of fs.readdirSync(path.join(BASE, 'fuentes')).filter((x) => x.endsWith('.woff2'))) {
    assets.push({ name: f, mime: 'font/woff2', base64: fs.readFileSync(path.join(BASE, 'fuentes', f)).toString('base64') });
  }
  if (fs.existsSync(de('assets'))) {
    for (const f of fs.readdirSync(de('assets'))) {
      const mime = MIME[path.extname(f).toLowerCase()];
      if (mime) assets.push({ name: f, mime, base64: fs.readFileSync(path.join(dir, 'assets', f)).toString('base64') });
    }
  }
  return { files: { title: path.basename(dir), script: 'window.CUT = kit.scenes();', modules, assets }, lista };
}

// El reproductor de Motion no termina de cargar en el Chrome 148 que trae puppeteer (26/10/2026:
// «did not finish loading within 20 s»), y sí en el Chromium 141 que viene instalado en el entorno
// (/opt/pw-browsers, el mismo que usa la guía de Motion para dibujar sin abrir la página).
// MOTION_CHROME manda si está definido.
function chromium() {
  if (process.env.MOTION_CHROME) return process.env.MOTION_CHROME;
  const base = '/opt/pw-browsers';
  if (!fs.existsSync(base)) return undefined;
  return fs.readdirSync(base).filter((x) => x.startsWith('chromium-')).sort().reverse()
    .map((x) => path.join(base, x, 'chrome-linux', 'chrome')).find((x) => fs.existsSync(x));
}

async function lanzar() {
  const exe = chromium();
  if (!exe) console.error('AVISO: no está el Chromium de /opt/pw-browsers; con el Chrome de puppeteer el reproductor de Motion puede no cargar (definir MOTION_CHROME).');
  return puppeteer.launch({
    headless: true,
    executablePath: exe,
    // Sin red: el film no carga nada de afuera (además de la intercepción de abrir()).
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none', '--force-color-profile=srgb',
      '--disable-lcd-text', '--allow-file-access-from-files', '--host-resolver-rules=MAP * ^NOTFOUND',
      '--proxy-server=http://127.0.0.1:9', '--proxy-bypass-list=<-loopback>'],
  });
}

// Una página con el reproductor y el film cargado. Sin red: sólo los tres archivos del
// reproductor y data:/blob: (el film llega por load()).
async function abrir(browser, player, files) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setRequestInterception(true);
  const permitidos = new Set(PLAYER_FILES.map((f) => pathToFileURL(path.join(player, f)).href));
  page.on('request', (r) => {
    const u = r.url().split(/[?#]/)[0];
    return permitidos.has(u) || /^(data|blob):/.test(u) ? r.continue() : r.abort();
  });
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e.message || e)));
  await page.goto(pathToFileURL(path.join(player, 'index.html')).href + '#tools');
  await page.waitForFunction(() => typeof window.__animation === 'object', { timeout: 60000 });
  const res = await page.evaluate((f) => window.__animation.load(f), files);
  if (res.error) throw new Error('el film no carga: ' + String(res.error.message || res.error));
  return { page, meta: res.meta, errores };
}

async function cuadro(page, t, escala) {
  const url = await page.evaluate(([tt, k]) => window.__animation.frame(tt, { scale: k }), [t, escala]);
  return Buffer.from(url.split(',')[1], 'base64');
}

// Lo que el reproductor dejó en su consola (errores de una escena, raster-safety, …).
async function problemas(page, errores) {
  const log = await page.evaluate(() => window.__animation.consoleLog());
  return errores.concat(log.filter((l) => l.level === 'error' || l.level === 'warn' || l.level === 'warning')
    .map((l) => `${l.level}: ${l.text}`));
}

function ffmpeg(args) {
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', ...args], { stdio: ['pipe', 'ignore', 'pipe'] });
  let err = '';
  ff.stderr.on('data', (d) => { err += d; });
  const fin = new Promise((ok, ko) => ff.on('close', (c) => (c === 0 ? ok() : ko(new Error('ffmpeg: ' + err.slice(-400))))));
  return { ff, fin };
}

async function escribir(ff, buf) {
  if (!ff.stdin.write(buf)) await new Promise((ok) => ff.stdin.once('drain', ok));
}

async function motionVideo(a) {
  const player = path.resolve(a.player || process.env.MOTION_PLAYER || PLAYER_DEF);
  const falta = PLAYER_FILES.filter((f) => !fs.existsSync(path.join(player, f)));
  if (falta.length) {
    throw new Error(`falta el reproductor de Motion en ${path.relative(ROOT, player) || player} (${falta.join(', ')}). ` +
      'Bajarlo con la herramienta Artifact (read · paths index.html, artifact-type/app.js, artifact-type/app.css) ' +
      'de cualquier film de Motion e instalarlo con --instalar-player (ver motion/LEEME.md).');
  }
  const dir = path.resolve(a.film);
  const { files, lista } = armarFilm(dir);
  const browser = await lanzar();
  try {
    const { page, meta, errores } = await abrir(browser, player, files);
    const rotas = (meta.scenes || []).filter((s) => s.state !== 'final');
    const dur = meta.duration;
    const resumen = `${dur.toFixed(1)} s · ${meta.width}×${meta.height} · escenas: ` +
      lista.scenes.map((s) => `${s.id} ${s.dur}s`).join(', ');
    // Un render que tira error no frena la página: la escena sale como un cartel con su nombre.
    // Por eso se revisan varios momentos de cada escena antes de dar el film por bueno.
    let t0 = 0;
    for (const s of lista.scenes) {
      for (const f of [0.02, 0.5, 0.98]) await cuadro(page, t0 + s.dur * f, 0.25);
      t0 += s.dur;
    }
    const prob = (await problemas(page, errores)).filter((x) => !/is not in use: it is fetched/.test(x));
    for (const s of rotas) prob.unshift(`la escena «${s.id}» está en estado ${s.state}`);
    if (a.validar) return { resumen, prob };

    const sal = {};
    if (a.hoja) {
      const cada = +a.cada || 1;
      const tiempos = [];
      for (let t = 0; t < dur - 0.01; t += cada) tiempos.push(+t.toFixed(3));
      tiempos.push(+(dur - 0.05).toFixed(3));
      const cols = 6, filas = Math.ceil(tiempos.length / cols);
      const { ff, fin } = ffmpeg(['-f', 'image2pipe', '-c:v', 'png', '-i', '-',
        '-vf', `scale=270:480,tile=${cols}x${filas}:padding=6:color=white`, '-frames:v', '1', path.resolve(a.hoja)]);
      for (const t of tiempos) await escribir(ff, await cuadro(page, t, 0.5));
      ff.stdin.end();
      await fin;
      sal.hoja = { ruta: path.resolve(a.hoja), tiempos };
    }
    if (a.cuadros) {
      const carpeta = path.resolve(a.dir || path.join(ROOT, 'out'));
      fs.mkdirSync(carpeta, { recursive: true });
      sal.cuadros = [];
      for (const t of String(a.cuadros).split(',').map(Number).filter((x) => x >= 0)) {
        const ruta = path.join(carpeta, `motion-cuadro-${t.toFixed(2)}.png`);
        fs.writeFileSync(ruta, await cuadro(page, t, 1));
        sal.cuadros.push(ruta);
      }
    }
    if (a.out) {
      const out = path.resolve(a.out);
      const fps = +a.fps || 30, escala = +a.escala || 2;
      const n = Math.round(dur * fps);
      const hilos = Math.max(1, Math.min(+a.hilos || 3, n));
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'motion-'));
      const inicio = Date.now();
      // Cada hilo es otra página con el mismo film: graba su tramo de cuadros, y los tramos se
      // pegan sin volver a codificar (todos con los mismos parámetros y arrancando en un cuadro clave).
      const tramos = Array.from({ length: hilos }, (_, k) => [Math.floor(n * k / hilos), Math.floor(n * (k + 1) / hilos)]);
      await Promise.all(tramos.map(async ([desde, hasta], k) => {
        const pg = k === 0 ? page : (await abrir(browser, player, files)).page;
        const { ff, fin } = ffmpeg(['-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
          // Color: el cuadro es sRGB; se pasa a BT.709 en rango TV y se etiqueta (igual que video-animado.js).
          '-vf', `scale=${meta.width}:${meta.height}:flags=lanczos:out_color_matrix=bt709:out_range=tv,format=yuv420p`,
          '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
          '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '17', '-g', String(fps * 2), '-r', String(fps),
          path.join(tmp, `tramo-${k}.mp4`)]);
        for (let i = desde; i < hasta; i++) await escribir(ff, await cuadro(pg, i / fps, escala));
        ff.stdin.end();
        await fin;
      }));
      fs.writeFileSync(path.join(tmp, 'lista.txt'), tramos.map((_, k) => `file '${path.join(tmp, `tramo-${k}.mp4`)}'`).join('\n') + '\n');
      // Sin sonido (Juan, 28/09/2026), pero con una pista muda, como los videos de antes.
      const { fin } = ffmpeg(['-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'lista.txt'),
        '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000', '-map', '0:v', '-map', '1:a',
        '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out]);
      await fin;
      fs.rmSync(tmp, { recursive: true, force: true });
      const portada = out.replace(/\.mp4$/i, '') + '-portada.png';
      fs.writeFileSync(portada, await cuadro(page, a.portada != null && a.portada !== true ? +a.portada : Math.min(2.4, dur / 2), 1));
      sal.video = { out, portada, cuadros: n, fps, segundos: ((Date.now() - inicio) / 1000).toFixed(0), saltos: await saltos(out, fps) };
    }
    return { resumen, prob, ...sal };
  } finally {
    await browser.close();
  }
}

function instalarPlayer(origen, destino) {
  for (const f of PLAYER_FILES) {
    const src = path.join(origen, f);
    if (!fs.existsSync(src)) throw new Error(`falta ${f} en ${origen}`);
    fs.mkdirSync(path.dirname(path.join(destino, f)), { recursive: true });
    fs.copyFileSync(src, path.join(destino, f));
  }
}

if (require.main === module) {
  const a = parseArgs(process.argv);
  if (a['instalar-player']) {
    try {
      instalarPlayer(path.resolve(a['instalar-player']), path.resolve(a.player || PLAYER_DEF));
      console.log(`Reproductor de Motion instalado en ${path.relative(ROOT, path.resolve(a.player || PLAYER_DEF))}`);
    } catch (e) { console.error('ERROR: ' + e.message); process.exit(1); }
    process.exit(0);
  }
  if (!a.film || !(a.validar || a.hoja || a.cuadros || a.out)) {
    console.error('Uso: node scripts/motion-video.js --film <carpeta> (--validar | --hoja ruta.png [--cada 1] | ' +
      '--cuadros 1.2,8.5 [--dir out] | --out posts/AAAA-MM-DD-N.mp4 [--portada 2.4] [--fps 30] [--escala 2] [--hilos 3])');
    process.exit(1);
  }
  motionVideo(a)
    .then((r) => {
      console.log(r.resumen);
      for (const p of r.prob) console.error('ERROR: ' + p);
      if (r.hoja) console.log(`Hoja → ${r.hoja.ruta} · un cuadro cada ${+a.cada || 1} s, de izquierda a derecha: ${r.hoja.tiempos.join(', ')}`);
      if (r.cuadros) r.cuadros.forEach((c) => console.log('Cuadro → ' + c));
      if (r.video) {
        for (const x of r.video.saltos) console.error(`AVISO: salto a los ${x.t.toFixed(2)} s (el cuadro cambia ${x.veces}× más que sus vecinos): mirarlo con --cuadros.`);
        console.log(`OK → ${r.video.out} · ${r.video.cuadros} cuadros a ${r.video.fps} fps en ${r.video.segundos} s · ` +
          `${Math.round(fs.statSync(r.video.out).size / 1024)} KB · portada → ${r.video.portada}`);
      }
      if (r.prob.length) process.exit(1);
    })
    .catch((e) => { console.error('ERROR:', e.message || e); process.exit(1); });
}

module.exports = { motionVideo, armarFilm };

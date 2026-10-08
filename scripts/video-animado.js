#!/usr/bin/env node
// Graba un video animado de redes a partir de una receta JSON. Una sola pantalla 9:16 que se arma
// delante de quien mira, con la gramática de las historias del Manual de Marca 2026 tal como está en
// el design system «MDO - Diseño» (familias novedades y servicios), y con fichas, flechas, ventanas,
// casilleros e íconos dibujados con su mismo trazo fino. La escena vive en
// mdo-templates/video-animado.js; acá se la recorre cuadro por cuadro y se graba.
//
// Uso:
//   node scripts/video-animado.js --spec posts/2026-10-16-4-video.json --out posts/2026-10-16-4.mp4
//   (--spec acepta también el JSON directo, entre comillas simples)
//
// Opcionales:
//   --tira ruta.png      hojas para la revisión del paso 4c: la tira (cuadros clave), la hoja de
//                        contacto (-contacto.png, uno cada medio segundo), la de celular
//                        (-celular.png, uno por segundo a 360 px) y dos cuadros a tamaño real
//                        (-entrada.png, -completa.png). Con --solo-tira no graba el MP4.
//   --cuadros 9000,12000 esos momentos (ms) a tamaño real, para mirar detalles
//   --portada ruta.png   (por defecto, junto al MP4 con -portada.png): la pantalla completa, antes
//                        de que el contenido se retire para la firma. Es la tapa del Reel (videoThumbnailUrl).
//   --fps 30|60
//   --validar            sólo revisa la receta (sin abrir el navegador) y sale
//
// Qué lleva la receta: ver validarSpec en mdo-templates/video-animado.js y la regla del video en la
// skill de la rutina. Un error en la receta frena el render; un aviso se informa y se sigue.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const FFMPEG = require('ffmpeg-static');
const { validarSpec, W, H } = require('../mdo-templates/video-animado.js');
const { saltos } = require('./video.js');

const ROOT = path.resolve(__dirname, '..');
const MT = path.join(ROOT, 'mdo-templates');

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

const leerSpec = (s) => JSON.parse(/^\s*\{/.test(s) ? s : fs.readFileSync(path.resolve(s), 'utf8'));
const iconos = () => JSON.parse(fs.readFileSync(path.join(MT, 'iconos-mdo.json'), 'utf8')).iconos;
const svg = (f) => fs.readFileSync(path.join(MT, 'assets', f), 'utf8');

async function videoAnimado({ spec, outPath, portada, fps = 30, tira, soloTira = false, cuadros = [] }) {
  const recursos = { iconos: iconos(), isotipo: svg('logo-mdo-iso.svg'),
    logoClaro: svg('logo-mdo-principal-white.svg'), logoOscuro: svg('logo-mdo-principal.svg') };
  const v = validarSpec(spec, recursos.iconos);
  if (v.errores.length) throw new Error('La receta tiene errores:\n  · ' + v.errores.join('\n  · '));
  fps = +fps || 30;
  portada = portada === false || !outPath ? null : (portada || outPath.replace(/\.mp4$/i, '') + '-portada.png');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none', '--ignore-certificate-errors',
      '--allow-file-access-from-files'],
    ignoreHTTPSErrors: true,
    defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
  });
  try {
    const page = await browser.newPage();
    const errores = [];
    page.on('pageerror', (e) => errores.push(e.message));
    await page.goto('file://' + path.join(MT, 'video-animado.html'), { waitUntil: 'networkidle0', timeout: 60000 });
    // Las tipografías se bajan recién cuando algo las usa: se piden antes de armar, porque el armado
    // mide los textos para que entren (con la tipografía de reemplazo mediría otra cosa).
    const fuentes = await page.evaluate(async () => {
      const caras = ['300 40px "Open Sans"', '400 40px "Open Sans"', '700 40px "Open Sans"', '400 40px "Chivo"', '700 40px "Chivo"', 'italic 300 40px "Chivo"'];
      await Promise.all(caras.map((c) => document.fonts.load(c).catch(() => null)));
      await document.fonts.ready;
      return caras.filter((c) => !document.fonts.check(c));
    });
    if (fuentes.length) throw new Error('No cargaron las tipografías del manual (' + fuentes.join(', ') + '): ¿hay red hacia fonts.googleapis.com?');
    if (errores.length) throw new Error('Error en la página: ' + errores[0]);

    const plan = await page.evaluate((s, r) => {
      const x = window.armarVideoAnimado(s, r);
      delete x.anims;
      return x;
    }, spec, recursos);
    if (errores.length) throw new Error('Error al armar la escena: ' + errores[0]);
    plan.avisos = [...v.avisos, ...plan.avisos];
    plan.palabras = v.palabras;

    if (outPath) fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const clip = { x: 0, y: 0, width: W, height: H };
    const enCuadro = (ms) => page.evaluate((m) => window.__anims.forEach((a) => { a.currentTime = m; }), ms);
    const T = plan.T;
    const recorte = (ms) => Math.max(0, Math.min(T - 1, Math.round(ms)));

    // Una hoja de cuadros: los momentos (ms) achicados a `ancho` px, en `cols` columnas.
    const hoja = async (ruta, momentos, ancho, cols) => {
      const filas = Math.ceil(momentos.length / cols);
      const ft = spawn(FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', '1', '-c:v', 'png', '-i', '-',
        '-vf', `scale=${ancho}:-1,tile=${cols}x${filas}:padding=6:color=white`, '-frames:v', '1', ruta], { stdio: ['pipe', 'ignore', 'pipe'] });
      let e2 = ''; ft.stderr.on('data', (d) => { e2 += d; });
      for (const m of momentos) { await enCuadro(recorte(m)); ft.stdin.write(await page.screenshot({ type: 'png', clip })); }
      ft.stdin.end();
      await new Promise((ok, ko) => ft.on('close', (c) => (c === 0 ? ok() : ko(new Error('ffmpeg (hoja): ' + e2.slice(-300))))));
    };
    if (tira) {
      // Tira: la apertura, cada bloque a mitad de su entrada y ya armado, la pantalla completa, la
      // banda subiendo y el final.
      const momentos = [300, 1300];
      plan.marcas.forEach((m) => momentos.push((m.t + m.listo) / 2, m.listo));
      momentos.push(plan.tPortada, plan.tLogo + 700, T - 60);
      const unicos = [...new Set(momentos.map(recorte))].sort((a, b) => a - b);
      await hoja(tira, unicos, 270, 7);
      const base = tira.replace(/\.png$/i, '');
      const cada = (ms) => Array.from({ length: Math.floor((T - 1) / ms) + 1 }, (_, i) => i * ms);
      await hoja(base + '-contacto.png', cada(500), 180, 10);
      await hoja(base + '-celular.png', cada(1000), 360, 6);
      const medio = plan.marcas.length > 1 ? plan.marcas[Math.ceil(plan.marcas.length / 2)] : plan.marcas[0];
      for (const [nombre, ms] of [['entrada', medio ? (medio.t + medio.listo) / 2 : T / 2], ['completa', plan.tPortada]]) {
        await enCuadro(recorte(ms));
        await page.screenshot({ type: 'png', clip, path: base + '-' + nombre + '.png' });
      }
    }
    const sueltos = [];
    for (const ms of cuadros) {
      const ruta = (tira || outPath).replace(/\.(png|mp4)$/i, '') + '-' + ms + 'ms.png';
      await enCuadro(recorte(ms));
      await page.screenshot({ type: 'png', clip, path: ruta });
      sueltos.push(ruta);
    }
    if (soloTira || !outPath) return { ...plan, outPath: null, portada: null, tira, fps, sueltos };

    const ff = spawn(FFMPEG, ['-y',
      '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
      '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
      '-map', '0:v', '-map', '1:a',
      // Color: la captura es sRGB; se pasa a BT.709 en rango TV y se etiqueta, así los teléfonos no
      // corren el azul noche de la marca.
      '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
      '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
      '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '17',
      '-g', String(fps * 2), '-r', String(fps),
      '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', outPath], { stdio: ['pipe', 'ignore', 'pipe'] });
    let err = ''; ff.stderr.on('data', (d) => { err += d; });
    const nCuadros = Math.round(T / 1000 * fps);
    for (let f = 0; f < nCuadros; f++) {
      await enCuadro(f * 1000 / fps);
      const buf = await page.screenshot({ type: 'png', clip, optimizeForSpeed: true });
      if (!ff.stdin.write(buf)) await new Promise((ok) => ff.stdin.once('drain', ok));
    }
    ff.stdin.end();
    await new Promise((ok, ko) => ff.on('close', (c) => (c === 0 ? ok() : ko(new Error('ffmpeg: ' + err.slice(-500))))));

    plan.saltos = await saltos(outPath, fps);
    for (const x of plan.saltos) {
      plan.avisos.push(`salto a los ${x.t.toFixed(2)} s (el cuadro cambia ${x.veces}× más que sus vecinos): mirarlo con --cuadros ${Math.round(x.t * 1000 - 70)},${Math.round(x.t * 1000)}.`);
    }
    if (portada) {
      await enCuadro(plan.tPortada);
      await page.screenshot({ type: 'png', clip, path: portada });
    }
    return { ...plan, outPath, portada, tira, fps, sueltos };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  const a = parseArgs(process.argv);
  if (!a.spec || (!a.out && !a.tira && !a.validar)) {
    console.error('Uso: node scripts/video-animado.js --spec receta.json --out posts/AAAA-MM-DD-N.mp4 ' +
      '[--tira ruta.png [--solo-tira]] [--cuadros ms,ms] [--portada ruta.png] [--fps 30|60] [--validar]');
    process.exit(1);
  }
  let spec;
  try { spec = leerSpec(a.spec); } catch (e) { console.error('ERROR: la receta no es un JSON válido: ' + e.message); process.exit(1); }
  if (a.validar) {
    const v = validarSpec(spec, iconos());
    v.errores.forEach((e) => console.error('ERROR: ' + e));
    v.avisos.forEach((e) => console.error('AVISO: ' + e));
    console.log(v.errores.length ? 'La receta no sirve.' : `Receta OK · ${v.palabras} palabras.`);
    process.exit(v.errores.length ? 1 : 0);
  }
  videoAnimado({
    spec, outPath: a.out ? path.resolve(a.out) : null, portada: a.portada ? path.resolve(a.portada) : undefined, fps: a.fps || 30,
    tira: a.tira ? path.resolve(a.tira) : undefined, soloTira: !!a['solo-tira'],
    cuadros: typeof a.cuadros === 'string' ? a.cuadros.split(',').map(Number).filter((n) => n >= 0) : [],
  })
    .then((r) => {
      r.avisos.forEach((x) => console.error('AVISO: ' + x));
      const datos = `${(r.T / 1000).toFixed(1)} s · ${r.familia} · ${r.palabras} palabras · escala ${r.k} · contenido hasta ${r.alto} px`;
      if (!r.outPath) console.log(`Tira → ${r.tira} · ${datos}`);
      else console.log(`OK → ${r.outPath} · ${datos} · ${Math.round(fs.statSync(r.outPath).size / 1024)} KB` +
        (r.portada ? ` · portada → ${r.portada}` : '') + (r.tira ? ` · tira → ${r.tira}` : ''));
    })
    .catch((e) => { console.error('ERROR:', e.message || e); process.exit(1); });
}

module.exports = { videoAnimado };

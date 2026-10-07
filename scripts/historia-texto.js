#!/usr/bin/env node
// Historia en video de texto: UNA pantalla con toda la info, que aparece de a una línea, suave, como
// una historia nativa (formato aprobado por Juan el 07/10/2026, en lugar de animar placas o encuestas).
//
// Uso:
//   node scripts/historia-texto.js --out posts/2026-10-08-historia.mp4 --texto '{
//     "ceja": "Laboral · RG 5907",
//     "titular": "ARCA reglamentó el Fondo de Asistencia Laboral",
//     "parrafos": ["El Formulario 931 suma una contribución nueva.",
//                  "La alícuota depende del encuadre de cada empresa, y un error ahí **se arrastraría todos los meses**.",
//                  "Antes de la próxima liquidación, revisaríamos el encuadre."]}'
// Opcionales: --fondo st-08|st-08b|st-08c (la foto de la placa del kit; por defecto st-08), --segundos N.
// Deja además <out>.png con el último cuadro (tapa para el panel). **texto** va en semibold.
const fs = require('fs');
const path = require('path');
const { spawn, execFileSync } = require('child_process');
const puppeteer = require('puppeteer');
const FFMPEG = require('ffmpeg-static');

const ROOT = path.resolve(__dirname, '..');
const args = {};
for (let i = 2; i < process.argv.length; i++) if (process.argv[i].startsWith('--')) args[process.argv[i].slice(2)] = process.argv[++i];
if (!args.out || !args.texto) { console.error('Faltan --out y --texto.'); process.exit(1); }
const t = JSON.parse(args.texto);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const negrita = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

(async () => {
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'historia-'));
  // El fondo es la foto de la placa del kit, sin texto: así la historia queda dentro del design system.
  execFileSync('node', [path.join(ROOT, 'scripts/render.js'), '--template', args.fondo || 'st-08', '--out', path.join(tmp, 'fondo.png'),
    '--slots', JSON.stringify({ TITULAR_1: ' ', TITULAR_2: ' ', TITULAR_3: ' ' })], { stdio: 'ignore' });
  const parrafos = t.parrafos || [];
  // Ritmo de lectura: cada línea espera lo que lleva leer la anterior (~3,3 palabras por segundo, a medias).
  const tiempos = [300, 700]; let at = 2300;
  for (const p of parrafos) { tiempos.push(at); at += Math.max(1600, p.split(/\s+/).length / 3.3 * 1000 * 0.75); }
  tiempos.push(at);
  const T = args.segundos ? +args.segundos * 1000 : Math.ceil((at + 900 + Math.max(4500, parrafos.join(' ').split(/\s+/).length / 3.3 * 1000 * 0.6)) / 500) * 500;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Chivo:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="file://${ROOT}/mdo-templates/mdo-brand.css">
<style>html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#06162d}
#fondo{position:absolute;inset:0;background:url(fondo.png) center/cover}
#texto{position:absolute;left:110px;right:110px;top:560px;color:#f8f6f6;font-family:'Open Sans',sans-serif}
.ceja{font-family:'Chivo',sans-serif;font-weight:700;font-size:30px;letter-spacing:.18em;text-transform:uppercase;color:#8f96a1;margin-bottom:34px}
h1{font-size:72px;line-height:1.12;font-weight:700;margin:0 0 54px}
p{font-size:42px;line-height:1.45;margin:0 0 36px;color:#dfe2e8} p b{color:#f8f6f6;font-weight:600}
#firma{position:absolute;left:110px;bottom:330px;display:flex;align-items:center;gap:26px} #firma img{width:190px}
#firma span{font-family:'Chivo',sans-serif;font-weight:700;font-size:26px;letter-spacing:.18em;text-transform:uppercase;color:#8f96a1}</style></head><body>
<div id="fondo"></div><div id="texto"><div class="ceja a">${esc(t.ceja || '')}</div><h1 class="a">${esc(t.titular)}</h1>
${parrafos.map((p) => `<p class="a">${negrita(p)}</p>`).join('')}</div>
<div id="firma" class="a"><img src="file://${ROOT}/mdo-templates/assets/logo-mdo-principal-white.svg" alt=""><span>mdo-consultores.com.ar</span></div></body></html>`;
  fs.writeFileSync(path.join(tmp, 'h.html'), html);
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--allow-file-access-from-files', '--ignore-certificate-errors'] });
  const pg = await b.newPage(); await pg.setViewport({ width: 1080, height: 1920 });
  await pg.goto('file://' + path.join(tmp, 'h.html'), { waitUntil: 'networkidle0' }); await pg.evaluate(() => document.fonts.ready);
  const alto = await pg.evaluate(() => document.getElementById('texto').getBoundingClientRect().bottom);
  if (alto > 1920 - 420) console.error(`AVISO: el texto baja hasta ${Math.round(alto)} px y pisa la firma o la zona de la UI: acortalo.`);
  await pg.evaluate(({ T, tiempos }) => {
    const anims = [document.getElementById('fondo').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.045)' }], { duration: T, easing: 'linear', fill: 'both' })];
    document.querySelectorAll('.a').forEach((el, i) => anims.push(el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
      { duration: 900, delay: tiempos[i], easing: 'cubic-bezier(.2,0,.2,1)', fill: 'both' })));
    anims.forEach((a) => a.pause()); window.__anims = anims;
  }, { T, tiempos });
  const out = path.resolve(args.out); fs.mkdirSync(path.dirname(out), { recursive: true });
  const fps = 30, n = Math.round(T / 1000 * fps);
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo',
    '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', '-c:a', 'aac', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  let ultimo;
  for (let f = 0; f < n; f++) { await pg.evaluate((m) => window.__anims.forEach((a) => { a.currentTime = m; }), f * 1000 / fps); ultimo = await pg.screenshot({ type: 'png' }); ff.stdin.write(ultimo); }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r)); await b.close();
  fs.writeFileSync(out.replace(/\.mp4$/i, '') + '.png', ultimo);
  console.log(`OK → ${out} · ${(T / 1000).toFixed(1)} s`);
})().catch((e) => { console.error('ERROR:', e.message || e); process.exit(1); });

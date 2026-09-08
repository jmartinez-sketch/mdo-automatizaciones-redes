#!/usr/bin/env node
// Arma el documento `paneles/publicaciones` de la base del artifact
// "Dirección MDO" a partir de posts/aprobacion-semana-NN.json. Es lo que lee
// el panel Marketing → Publicaciones para mostrar las placas de la semana con
// el botón "Aprobar y programar".
//
// Uso:
//   node scripts/aprobacion-doc.js posts/aprobacion-semana-37.json out/paneles-publicaciones.json
//
// Después, la rutina lo guarda con la herramienta Artifact:
//   action: write_db · db_op: set · collection: "paneles" · doc_id: "publicaciones"
//   url: <URL de Dirección MDO> · file_path: out/paneles-publicaciones.json
//
// Las placas van adentro del documento como JPEG chicos (540 px de ancho) en
// base64: la página no puede cargar imágenes de otros dominios, y un documento
// de la base no puede ser enorme. Cuatro posts entran en ~300 KB.

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error('Uso: node scripts/aprobacion-doc.js <aprobacion-semana-NN.json> <salida.json>');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const spec = JSON.parse(fs.readFileSync(inPath, 'utf8'));

const CAMPOS_INFO = ['draft', 'autoPublish', 'shortener', 'hasNotReadNotes', 'descendants',
  'smartLinkData', 'media', 'mediaAltText', 'providers', 'publicationDate', 'text',
  'firstCommentText', 'instagramData', 'linkedinData'];

function limpiarInfo(info) {
  const out = {};
  for (const k of CAMPOS_INFO) if (info[k] !== undefined) out[k] = info[k];
  out.descendants = out.descendants || [];
  out.smartLinkData = out.smartLinkData || { ids: [] };
  out.firstCommentText = out.firstCommentText || '';
  if (Array.isArray(out.providers)) out.providers = out.providers.map((p) => ({ network: p.network }));
  if (Array.isArray(out.mediaAltText)) out.mediaAltText = out.mediaAltText.map((t) => t || '');
  return out;
}

// Achica cada PNG a JPEG de 540 px de ancho con el navegador (no hay otra
// herramienta de imagen en el entorno).
async function achicar(rutas, ancho) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setContent('<canvas id="c"></canvas>');
    const out = [];
    for (const rel of rutas) {
      const abs = path.isAbsolute(rel) ? rel : path.join(root, rel);
      const b64 = fs.readFileSync(abs).toString('base64');
      const jpeg = await page.evaluate(async (src, w) => {
        const img = new Image();
        await new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; img.src = src; });
        const c = document.getElementById('c');
        const esc = w / img.naturalWidth;
        c.width = w; c.height = Math.round(img.naturalHeight * esc);
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL('image/jpeg', 0.82);
      }, 'data:image/png;base64,' + b64, ancho);
      out.push(jpeg);
    }
    return out;
  } finally {
    await browser.close();
  }
}

(async () => {
  const posts = [];
  for (const p of spec.posts) {
    const esHorizontal = (p.redes || []).join(' ').toLowerCase().includes('linkedin')
      && !(p.redes || []).join(' ').toLowerCase().includes('instagram');
    const imagenes = await achicar(p.imagenes || [], esHorizontal ? 720 : 540);
    posts.push({
      dia: p.dia, hora: p.hora, redes: p.redes || [], plantilla: p.plantilla || '',
      nota: p.nota || '', esStory: !!p.esStory,
      id: p.id, uuid: String(p.uuid), plannerUrl: p.plannerUrl || '',
      blogId: String(p.blogId || spec.blogId),
      info: limpiarInfo(p.info || {}),
      imagenes,
    });
  }
  const doc = {
    semana: spec.semana,
    rango: spec.rango || '',
    blogId: String(spec.blogId),
    generado: new Date().toISOString(),
    posts,
  };
  fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(doc));
  const kb = Math.round(Buffer.byteLength(JSON.stringify(doc)) / 1024);
  console.log(`OK → ${path.resolve(outPath)} (${posts.length} posts, ${kb} KB)`);
  if (kb > 800) console.error('⚠️ El documento pasa los 800 KB: bajar la calidad o el ancho de las placas.');
})().catch((e) => { console.error('ERROR:', e.message || e); process.exit(1); });

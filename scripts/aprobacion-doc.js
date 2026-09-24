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
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const { render } = require('./render');

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
  // Metricool devuelve al crear un bloque de datos por red aunque la red no
  // esté en el post (ej. instagramData vacío en un post solo de LinkedIn), y
  // después rechaza el update si se lo mandan de vuelta: "networkData contains
  // data for network 'instagram' not listed in providers". Se descartan.
  const redes = new Set((out.providers || []).map((p) => p.network));
  if (!redes.has('instagram')) delete out.instagramData;
  if (!redes.has('linkedin')) delete out.linkedinData;
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

// Clave local de un post que todavía no está en Metricool: el nombre de su
// primera placa (posts/2026-09-30-2.png → 2026-09-30-2), que es único por semana.
function claveDe(p) {
  const f = (p.imagenes || [])[0] || (p.video && p.video.archivo) || '';
  return path.basename(String(f)).replace(/\.[a-z0-9]+$/i, '') || String(p.dia || 'post').replace(/\W+/g, '-');
}

// Qué plantilla corresponde a cada imagen del post. Un post normal tiene una
// sola; un carrusel tiene una por slide y las declara en `plantillas`.
function plantillasDe(p) {
  if (Array.isArray(p.plantillas) && p.plantillas.length) return p.plantillas;
  const ids = String(p.plantilla || '').split(/[\s,+]+/).filter(Boolean);
  const n = (p.imagenes || []).length || 1;
  if (!ids.length) return [];
  // Si faltan ids, se repite el último: un carrusel mal declarado no debería
  // frenar el documento entero.
  return Array.from({ length: n }, (_, i) => ids[Math.min(i, ids.length - 1)]);
}

// El HTML de cada placa, con los marcadores [SLOT] todavía puestos: es lo que
// le permite al panel volver a dibujarla en el navegador cuando Juan pide
// regenerar. Se pide una sola vez por plantilla y se cachea.
const cacheHtml = new Map();
async function placaDe(templateId) {
  if (cacheHtml.has(templateId)) return cacheHtml.get(templateId);
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'mdo-placa-')), 'dump.json');
  let out = null;
  try {
    await render({ template: templateId, slots: {}, outPath: tmp + '.png', dumpHtml: tmp });
    const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
    out = { id: templateId, w: d.w, h: d.h, slots: d.slots, html: d.html };
  } catch (e) {
    console.error(`AVISO: no pude volcar el HTML de "${templateId}" (${e.message}). ` +
      'Ese post va a quedar sin botón de regenerar.');
  }
  cacheHtml.set(templateId, out);
  return out;
}

(async () => {
  const posts = [];
  for (const p of spec.posts) {
    const esHorizontal = (p.redes || []).join(' ').toLowerCase().includes('linkedin')
      && !(p.redes || []).join(' ').toLowerCase().includes('instagram');
    const imagenes = await achicar(p.imagenes || [], esHorizontal ? 720 : 540);
    const ids = plantillasDe(p);
    // Una entrada por imagen, en el mismo orden: si una falla va `null` y el
    // panel esconde el botón de esa placa, sin correr las demás de lugar.
    const placas = [];
    for (const id of ids) placas.push(await placaDe(id));
    // Los slots con los que se renderizó cada placa: el panel se los pasa a
    // Claude como punto de partida cuando Juan pide regenerar. Si la rutina no
    // los anotó, el panel regenera igual, con el copy del posteo como contexto.
    const slots = Array.isArray(p.slots) ? p.slots : (p.slots ? [p.slots] : []);
    posts.push({
      dia: p.dia, hora: p.hora, redes: p.redes || [], plantilla: p.plantilla || '',
      nota: p.nota || '', esStory: !!p.esStory,
      // Desde el 24/09/2026 la rutina no crea nada en Metricool: el post llega sin
      // id y el panel lo crea recién cuando Juan lo aprueba. `uuid` queda como
      // clave local (el nombre de la placa); el uuid de Metricool se guarda en
      // `mcUuid` al crearlo. Los posts viejos traen id y uuid de Metricool.
      id: p.id != null ? p.id : null,
      uuid: String(p.uuid || claveDe(p)),
      plannerUrl: p.plannerUrl || '',
      aprobado: !!p.aprobado,
      blogId: String(p.blogId || spec.blogId),
      info: limpiarInfo(p.info || {}),
      imagenes,
      placas,
      slots,
      // Semana con video: el MP4 va como asset del artifact (la página no puede cargar
      // archivos de otros dominios). `imagenes` sigue siendo la placa fija: es la tapa
      // del video en el panel y el respaldo si Metricool no acepta el video.
      ...(p.video && p.video.asset ? { video: { asset: String(p.video.asset), archivo: p.video.archivo || '' } } : {}),
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

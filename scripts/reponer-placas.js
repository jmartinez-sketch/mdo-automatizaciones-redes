#!/usr/bin/env node
// Prepara la reposición de las placas que Juan regeneró desde el panel.
//
// Cuando Juan acepta una versión nueva en Dirección MDO → Publicaciones, el panel
// anota en el documento `paneles/publicaciones` el campo `pendienteImagen` con los
// slots nuevos (y si el post ya estaba en Metricool, le cambia el texto y lo deja
// en pausa). Si Juan lo aprueba, queda `aprobado: true` esperando la placa.
// La imagen no puede viajar sola desde la página. Este script hace la parte local:
//
//   node scripts/reponer-placas.js <panel.json> <salida-plan.json>
//
// Para cada post con `pendienteImagen` que todavía no salió:
//   - renderiza el PNG nuevo (y el MP4 si el post era el video de la semana),
//     con un nombre nuevo para que Metricool no use la copia vieja de su caché;
//   - arma la miniatura JPEG que muestra el panel.
// Escribe un plan con lo que falta hacer afuera (push, Metricool, base del panel).
// Lo usa la rutina "MDO - Automatizaciones Redes" en cada pasada (paso 7c de la skill).
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { render } = require('./render');

const [, , docPath, planPath] = process.argv;
if (!docPath || !planPath) {
  console.error('Uso: node scripts/reponer-placas.js <panel.json> <salida-plan.json>');
  process.exit(1);
}
const ROOT = path.resolve(__dirname, '..');
const doc = JSON.parse(fs.readFileSync(docPath, 'utf8'));
const ahora = Date.now();

async function miniatura(browser, abs, ancho) {
  const page = await browser.newPage();
  try {
    await page.setContent('<canvas id="c"></canvas>');
    const b64 = fs.readFileSync(abs).toString('base64');
    return await page.evaluate(async (src, w) => {
      const img = new Image();
      await new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; img.src = src; });
      const c = document.getElementById('c');
      c.width = w; c.height = Math.round(img.naturalHeight * w / img.naturalWidth);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', 0.82);
    }, 'data:image/png;base64,' + b64, ancho);
  } finally { await page.close(); }
}

(async () => {
  const plan = { generado: new Date().toISOString(), reponer: [], saltados: [] };
  const pendientes = (doc.posts || []).filter((p) => p.pendienteImagen);
  if (!pendientes.length) {
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
    console.log('Nada para reponer.');
    return;
  }
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    for (const p of pendientes) {
      const f = p.info && p.info.publicationDate && p.info.publicationDate.dateTime;
      const sale = f ? new Date(f + '-03:00').getTime() : 0;
      if (sale && sale < ahora) {
        plan.saltados.push({ uuid: p.uuid, dia: p.dia, motivo: 'ya salió: Metricool no deja cambiar lo publicado' });
        continue;
      }
      const pi = p.pendienteImagen;
      const fecha = (f || '').slice(0, 10) || 'sin-fecha';
      const sello = new Date().toISOString().slice(5, 16).replace(/[-:T]/g, '');
      const archivos = [], miniaturas = [];
      const redes = (p.redes || []).join(' ').toLowerCase();
      const ancho = redes.includes('linkedin') && !redes.includes('instagram') ? 720 : 540;
      for (let i = 0; i < (pi.plantillas || []).length; i++) {
        const rel = `posts/${fecha}-${pi.plantillas[i]}-regen-${sello}${pi.plantillas.length > 1 ? '-' + (i + 1) : ''}.png`;
        await render({ template: pi.plantillas[i], slots: pi.slots[i], outPath: path.join(ROOT, rel) });
        archivos.push(rel);
        miniaturas.push(await miniatura(browser, path.join(ROOT, rel), ancho));
      }
      let video = null;
      if (p.video && p.video.asset) {
        const { video: grabar } = require('./video');
        const rel = archivos[0].replace(/\.png$/, '.mp4');
        const r = await grabar({ template: pi.plantillas[0], slots: pi.slots[0], outPath: path.join(ROOT, rel) });
        // La portada (el cuadro 9:16 con la placa completa) es la tapa del Reel: videoThumbnailUrl.
        video = { archivo: rel, portada: r.portada ? path.relative(ROOT, r.portada) : null, assetViejo: p.video.asset };
      }
      plan.reponer.push({
        uuid: p.uuid, id: p.id, mcUuid: p.mcUuid || (p.id != null ? p.uuid : null),
        blogId: p.blogId, dia: p.dia, esStory: !!p.esStory,
        // Qué hacer en Metricool (paso 7c de la skill):
        //   enMetricool false + aprobado true  → createScheduledPost, ya programado
        //   enMetricool false + aprobado false → nada: sólo se actualiza el panel
        //   enMetricool true                   → updateScheduledPost con la media nueva,
        //                                        programado si aprobado, borrador si no
        enMetricool: p.id != null && p.id !== '',
        aprobado: !!(p.aprobado || pi.estabaAprobado),
        publicacion: f || null,
        archivos, miniaturas, video,
      });
      console.log(`${p.dia} (${pi.plantillas.join(', ')}) → ${archivos.join(', ')}${video ? ' + ' + video.archivo + (video.portada ? ' + ' + video.portada : '') : ''}`);
    }
  } finally { await browser.close(); }
  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
  console.log(`Plan → ${path.resolve(planPath)} · ${plan.reponer.length} para reponer, ${plan.saltados.length} ya salidos`);
})().catch((e) => { console.error('ERROR:', e.message || e); process.exit(1); });

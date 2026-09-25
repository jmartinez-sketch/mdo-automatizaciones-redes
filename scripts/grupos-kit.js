#!/usr/bin/env node
// Plantillas del kit que son LA MISMA placa con otro nombre.
//
// El kit 4.4 del design system trae 79 ids, pero varios apuntan al mismo HTML (ej. po-24,
// po-26, po-28, po-31 y po-33 son idénticas). Para la regla de variedad eso importa: usar
// po-31 una semana y po-24 la siguiente es repetir el diseño. Este script agrupa los ids
// que dan exactamente la misma placa y responde qué queda bloqueado por el historial.
//
//   node scripts/grupos-kit.js                 → regenera mdo-templates/kit-grupos.json
//   node scripts/grupos-kit.js --bloqueadas    → qué plantillas quedan bloqueadas esta semana
//                                                (lo usado en las 4 semanas anteriores, con
//                                                todos sus equivalentes; paso 0 de la skill).
//                                                Para probar otra semana: --semana-del AAAA-MM-DD (un lunes)
//   node scripts/grupos-kit.js --grupo po-31   → con qué otros ids es la misma placa
//
// sincronizar-diseno.js lo corre solo después de traer el kit: no editar kit-grupos.json a mano.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSX = path.join(ROOT, 'mdo-templates', 'templates-kit-manual.jsx');
const SALIDA = path.join(ROOT, 'mdo-templates', 'kit-grupos.json');
const HISTORIAL = path.join(ROOT, 'posts', 'historial-plantillas.json');
// La ancla de la noticia no se bloquea nunca (paso 2b de la skill), ni ella ni sus equivalentes.
const ANCLA = 'po-13d';

function placasDelKit() {
  const jsx = fs.readFileSync(JSX, 'utf8');
  const i = jsx.indexOf('{', jsx.indexOf('const KIT_MANUAL_HTML'));
  // El objeto son pares "id": "html" en JSON: se busca la llave que lo cierra salteando strings.
  let prof = 0, enStr = false, fin = -1;
  for (let k = i; k < jsx.length; k++) {
    const c = jsx[k];
    if (enStr) { if (c === '\\') k++; else if (c === '"') enStr = false; continue; }
    if (c === '"') enStr = true;
    else if (c === '{') prof++;
    else if (c === '}' && --prof === 0) { fin = k; break; }
  }
  if (fin < 0) throw new Error('No encontré KIT_MANUAL_HTML en ' + JSX);
  return JSON.parse(jsx.slice(i, fin + 1).replace(/,\s*}$/, '}'));
}

function armarGrupos() {
  const porHtml = new Map();
  for (const [id, html] of Object.entries(placasDelKit())) {
    if (!porHtml.has(html)) porHtml.set(html, []);
    porHtml.get(html).push(id);
  }
  const grupos = [...porHtml.values()].filter((g) => g.length > 1);
  const total = [...porHtml.values()].reduce((n, g) => n + g.length, 0);
  return { ids: total, distintas: porHtml.size, grupos };
}

function escribir() {
  const g = armarGrupos();
  const doc = {
    _leeme: 'GENERADO por scripts/grupos-kit.js desde templates-kit-manual.jsx: no editar. ' +
      'Cada grupo es una misma placa con varios ids. Para la variedad cuenta el grupo, no el id.',
    ids: g.ids, placas_distintas: g.distintas, grupos: g.grupos,
  };
  fs.writeFileSync(SALIDA, JSON.stringify(doc, null, 2) + '\n');
  console.log(`kit-grupos.json → ${g.ids} ids, ${g.distintas} placas distintas, ${g.grupos.length} grupos con más de un id`);
  return doc;
}

function equivalentes(id, grupos) {
  return grupos.find((g) => g.includes(id)) || [id];
}

// Lunes de la semana ISO en curso, en hora de Argentina, como AAAA-MM-DD.
function lunesActual() {
  const hoy = new Date(Date.now() - 3 * 3600 * 1000); // UTC-3, sin horario de verano
  const dia = (hoy.getUTCDay() + 6) % 7; // 0 = lunes
  hoy.setUTCDate(hoy.getUTCDate() - dia);
  return hoy.toISOString().slice(0, 10);
}

// El historial a veces anota un carrusel abreviado ("cb-tip1/2/3"): se expande a cb-tip1, cb-tip2, cb-tip3.
function idsDe(texto) {
  const out = [];
  String(texto).split(/[\s,+/]+/).filter(Boolean).forEach((tok) => {
    const prev = out[out.length - 1];
    if (/^\d+$/.test(tok) && prev && /\d+$/.test(prev)) out.push(prev.replace(/\d+$/, tok));
    else out.push(tok);
  });
  return out;
}

function bloqueadas(lunesPedido) {
  const { grupos } = fs.existsSync(SALIDA) ? JSON.parse(fs.readFileSync(SALIDA, 'utf8')) : escribir();
  const hist = fs.existsSync(HISTORIAL) ? JSON.parse(fs.readFileSync(HISTORIAL, 'utf8')).historial || [] : [];
  const lunes = lunesPedido || lunesActual();
  const desde = new Date(Date.parse(lunes + 'T00:00:00Z') - 28 * 86400000).toISOString().slice(0, 10);
  const ancla = equivalentes(ANCLA, grupos);
  const usadas = new Map(); // id usado → fechas
  hist.filter((e) => e.fecha >= desde && e.fecha < lunes).forEach((e) => {
    // Sólo la plantilla de Instagram: la horizontal de LinkedIn (li-02) se repite a propósito todas
    // las semanas de story.
    [e.template].filter(Boolean).forEach((t) => idsDe(t).forEach((id) => {
      if (!usadas.has(id)) usadas.set(id, []);
      usadas.get(id).push(e.fecha);
    }));
  });
  const bloq = new Map(); // id bloqueado → por qué
  for (const [id, fechas] of usadas) if (!ancla.includes(id)) bloq.set(id, `usada ${fechas.join(', ')}`);
  for (const [id, fechas] of usadas) {
    if (ancla.includes(id)) continue;
    for (const eq of equivalentes(id, grupos)) {
      if (!bloq.has(eq)) bloq.set(eq, eq === id ? `usada ${fechas.join(', ')}` : `misma placa que ${id} (${fechas.join(', ')})`);
    }
  }
  console.log(`Semana del ${lunes}: bloqueado lo usado del ${desde} al día anterior, con sus equivalentes.`);
  console.log(`Libre siempre: la ancla ${ancla.join(' = ')}.`);
  if (!bloq.size) { console.log('Nada bloqueado.'); return; }
  [...bloq].sort(([a], [b]) => a.localeCompare(b)).forEach(([id, motivo]) => console.log(`  ${id.padEnd(10)} ${motivo}`));
}

const args = process.argv.slice(2);
if (args[0] === '--bloqueadas') bloqueadas(args[1] === '--semana-del' ? args[2] : null);
else if (args[0] === '--grupo') {
  const { grupos } = armarGrupos();
  const g = equivalentes(args[1], grupos);
  console.log(g.length > 1 ? g.join(' = ') : `${args[1]} no tiene equivalentes: es una placa única.`);
} else escribir();

#!/usr/bin/env node
// Sincroniza el repo con el design system "MDO - Diseño"
// (https://claude.ai/code/artifact/44406cc7-a5b6-4e92-8bc3-ba5e9090747b),
// que es la ÚNICA fuente de la marca: plantillas, colores, tipografías y logos
// se leen de ahí y se cambian ahí. Este repo guarda una copia para renderizar.
//
// Uso:
//   node scripts/sincronizar-diseno.js <carpeta-bajada>
//
// <carpeta-bajada> es donde la herramienta Artifact dejó los archivos del
// design system: la carpeta que contiene `project/` (por ejemplo
// <scratchpad>/artifact-files/44406cc7-a5b6-4e92-8bc3-ba5e9090747b) o `project/` directo.
// Qué archivos hay que bajar antes, y cómo, está en mdo-templates/LEEME-kit-manual.md.
//
// Qué hace, en orden, y sólo si el archivo bajado existe:
//   1. Kit 4.4  project/templates/kit-redes-manual/KitRedesManual.dc.html
//               → mdo-templates/templates-kit-manual.jsx (vía extraer-kit-manual.js)
//   2. CSS      project/ui_kits/redes/mdo-brand.css → mdo-templates/mdo-brand.css
//   3. Logos    project/components/assets/logos/*.svg → mdo-templates/assets/*.svg
//               (+ el secundario en papel, que en el design system es un asset
//               suelto: se busca como project/assets/logos/logo-secundario-paper.svg
//               o como <carpeta-bajada>/49b43af7d306c5f26383c300225b5816.svg)
// Escribe únicamente lo que cambió y lo informa. No borra nada. No hace git.
// Sale con código 0 si sincronizó (haya o no cambios) y 2 si no encontró el kit.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const arg = process.argv[2];
if (!arg) {
  console.error('Uso: node scripts/sincronizar-diseno.js <carpeta-bajada-del-design-system>');
  process.exit(1);
}
let bajada = path.resolve(arg);
let project = fs.existsSync(path.join(bajada, 'project')) ? path.join(bajada, 'project') : bajada;
if (path.basename(project) !== 'project') {
  console.error(`ERROR: en ${arg} no hay una carpeta project/ del design system.`);
  process.exit(1);
}
bajada = path.dirname(project);

const ASSET_SECUNDARIO_PAPER = '49b43af7d306c5f26383c300225b5816';

// Nombre en el design system → nombre en el repo (mismo archivo, otro lugar).
const LOGOS = [
  ['isotipo-navy.svg', 'logo-mdo-iso.svg'],
  ['isotipo-paper.svg', 'logo-mdo-iso-white.svg'],
  ['logo-principal-navy.svg', 'logo-mdo-principal.svg'],
  ['logo-principal-paper.svg', 'logo-mdo-principal-white.svg'],
  ['logo-secundario-navy.svg', 'logo-mdo-secundario.svg'],
  ['logo-secundario-paper.svg', 'logo-mdo-secundario-white.svg'],
];

const cambios = [];
const iguales = [];
const faltan = [];

function copiarSiCambio(origen, destinoRel, etiqueta) {
  if (!origen || !fs.existsSync(origen)) { faltan.push(etiqueta); return; }
  const destino = path.join(root, destinoRel);
  const nuevo = fs.readFileSync(origen);
  const viejo = fs.existsSync(destino) ? fs.readFileSync(destino) : null;
  if (viejo && viejo.equals(nuevo)) { iguales.push(etiqueta); return; }
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, nuevo);
  cambios.push(etiqueta + (viejo ? '' : ' (nuevo)'));
}

// Metadatos del design system, para el reporte y el mensaje de commit.
let lastChange = null;
const indice = path.join(project, 'design-system.json');
if (fs.existsSync(indice)) {
  try {
    const j = JSON.parse(fs.readFileSync(indice, 'utf8'));
    lastChange = j.lastChange || null;
    console.log(`Design system: "${j.title}"` + (lastChange ? ` · último cambio ${lastChange.at} por ${lastChange.by}: ${lastChange.note || ''}` : ''));
  } catch (e) { console.log('(design-system.json no se pudo leer: ' + e.message + ')'); }
}

// 1. Kit 4.4
const kit = path.join(project, 'templates', 'kit-redes-manual', 'KitRedesManual.dc.html');
if (!fs.existsSync(kit)) {
  console.error(`ERROR: falta ${path.relative(bajada, kit)}. Sin el kit no hay nada que sincronizar.`);
  process.exit(2);
}
const jsxDestino = path.join(root, 'mdo-templates', 'templates-kit-manual.jsx');
const jsxTmp = jsxDestino + '.sync-tmp';
execFileSync('node', [path.join(__dirname, 'extraer-kit-manual.js'), kit, jsxTmp], { stdio: ['ignore', 'pipe', 'inherit'] });
copiarSiCambio(jsxTmp, 'mdo-templates/templates-kit-manual.jsx', 'kit 4.4 → templates-kit-manual.jsx');
fs.unlinkSync(jsxTmp);
// Qué ids del kit son la misma placa (para la regla de variedad): se recalcula con el kit nuevo.
execFileSync('node', [path.join(__dirname, 'grupos-kit.js')], { stdio: ['ignore', 'inherit', 'inherit'] });

// 2. CSS de marca
copiarSiCambio(path.join(project, 'ui_kits', 'redes', 'mdo-brand.css'), 'mdo-templates/mdo-brand.css', 'mdo-brand.css');

// 3. Logos
for (const [ds, repo] of LOGOS) {
  const candidatos = [
    path.join(project, 'components', 'assets', 'logos', ds),
    path.join(project, 'assets', 'logos', ds),
  ];
  if (ds === 'logo-secundario-paper.svg') candidatos.push(path.join(bajada, ASSET_SECUNDARIO_PAPER + '.svg'));
  const origen = candidatos.find((c) => fs.existsSync(c));
  copiarSiCambio(origen, 'mdo-templates/assets/' + repo, `logo ${ds} → ${repo}`);
}

console.log('');
if (cambios.length) { console.log('ACTUALIZADO:'); cambios.forEach((c) => console.log('  · ' + c)); }
if (iguales.length) { console.log('Sin cambios: ' + iguales.join(', ')); }
if (faltan.length) { console.log('No estaba en la bajada (se conserva la copia del repo): ' + faltan.join(', ')); }
console.log('');
if (cambios.length) {
  console.log('Siguiente: renderizar una placa de prueba de lo que cambió y mirarla; después commitear con');
  console.log(`  git commit -am "diseño: sincronizado con MDO - Diseño${lastChange ? ' (' + lastChange.at + ')' : ''}"`);
} else {
  console.log('El repo ya estaba al día con el design system.');
}

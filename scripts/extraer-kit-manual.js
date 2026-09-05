// Extrae las placas nuevas del kit 4.4 de Claude Design, tal cual vienen,
// y arma mdo-templates/templates-kit-manual.jsx.
const fs = require('fs');
const path = require('path');

const [, , rawPath, outPath] = process.argv;
const s = JSON.parse(fs.readFileSync(rawPath, 'utf8')).content;

const IDS = [
  ...Array.from({ length: 10 }, (_, i) => 'nv-' + String(i + 1).padStart(2, '0')),
  ...Array.from({ length: 8 }, (_, i) => 'sv-' + String(i + 1).padStart(2, '0')),
  ...Array.from({ length: 6 }, (_, i) => 'in-' + String(i + 1).padStart(2, '0')),
];

// Corta el div de la placa contando llaves de apertura/cierre de <div>.
function extraer(id) {
  const marca = 'id="' + id + '"';
  const i = s.indexOf(marca);
  if (i < 0) return null;
  // El contenedor exterior es <div id="..."> ... </div>; adentro está el lienzo.
  const abre = s.lastIndexOf('<div', i);
  let j = s.indexOf('>', i) + 1;
  let prof = 1;
  while (prof > 0 && j < s.length) {
    const sig = s.indexOf('<div', j);
    const cie = s.indexOf('</div>', j);
    if (cie < 0) break;
    if (sig >= 0 && sig < cie) { prof++; j = s.indexOf('>', sig) + 1; }
    else { prof--; j = cie + 6; }
  }
  const bloque = s.slice(abre, j);
  // Nos quedamos con el lienzo de 1080x1350, sin el wrapper con el id.
  const k = bloque.indexOf('<div', bloque.indexOf('>') + 1);
  const lienzo = bloque.slice(k, bloque.lastIndexOf('</div>'));
  return lienzo;
}

// Los logos: en Claude Design viven en assets/logos/ con los nombres del manual;
// en el repo están en mdo-templates/assets/ con los nombres de siempre. Es el
// mismo archivo, sólo cambia dónde está guardado.
const LOGOS = {
  '../../assets/logos/isotipo-navy.svg': 'assets/logo-mdo-iso.svg',
  '../../assets/logos/isotipo-paper.svg': 'assets/logo-mdo-iso-white.svg',
  '../../assets/logos/logo-principal-navy.svg': 'assets/logo-mdo-principal.svg',
  '../../assets/logos/logo-principal-paper.svg': 'assets/logo-mdo-principal-white.svg',
  '../../assets/logos/logo-secundario-navy.svg': 'assets/logo-mdo-secundario.svg',
  '../../assets/logos/logo-secundario-paper.svg': 'assets/logo-mdo-secundario-white.svg',  // Fotos de las placas institucionales (in-*): mismas imágenes, misma regla.
  '../../assets/redes/fotos/calle-corporativa.jpg': 'assets/fotos/calle-corporativa.jpg',
  '../../assets/redes/fotos/arquitectura-navy.jpg': 'assets/fotos/arquitectura-navy.jpg',
  '../../assets/redes/fotos/torres-cielo.jpg': 'assets/fotos/torres-cielo.jpg',
  '../../assets/redes/fotos/manos-teclado.jpg': 'assets/fotos/manos-teclado.jpg',
};

const placas = {};
const faltan = [];
const sinMapear = new Set();
for (const id of IDS) {
  let html = extraer(id);
  if (!html || !html.includes('1350px')) { faltan.push(id); continue; }
  for (const [de, a] of Object.entries(LOGOS)) html = html.split(de).join(a);
  for (const m of html.matchAll(/src="([^"]*)"/g)) {
    if (!m[1].startsWith('assets/')) sinMapear.add(m[1]);
  }
  placas[id] = html;
}

if (sinMapear.size) {
  console.error('RUTAS SIN MAPEAR: ' + [...sinMapear].join(' '));
  process.exit(1);
}

if (faltan.length) {
  console.error('NO EXTRAIDAS: ' + faltan.join(' '));
  process.exit(1);
}

const cabecera = `// templates-kit-manual.jsx — las 24 placas nuevas del kit 4.4 de Claude Design
// ("Kit de redes — según el manual"), copiadas TAL CUAL del proyecto MDO - Diseño.
//
// Tres familias, según la guía de redes de la página 23 del Manual de Marca 2026:
//   nv-01..nv-10  A · Novedades impositivas / ARCA   — fondo navy con degradé diagonal
//   sv-01..sv-08  B · Servicios                      — degradés claros, isotipo gigante
//   in-01..in-06  D · Institucional / Marca          — foto con velo navy, o papel
//
// Se diferencian del resto del catálogo en tres cosas, y son del manual:
//   · no llevan lockup arriba, ni chip, ni pie con @handle;
//   · están maquetadas directo a 1080×1350, no en base 540 escalada;
//   · el margen es de 130 px en los cuatro lados y no se baja.
//
// El HTML va literal, con los estilos en línea que trae Claude Design: así la
// placa es idéntica a la del design system, sin reinterpretación. El texto que
// viene es el de ejemplo del kit; la rutina lo reemplaza por find/replace, igual
// que con el resto de las plantillas (ver PLACEHOLDERS.md).
//
// Para regenerar este archivo desde Claude Design, ver LEEME-kit-manual.md.

const KIT_MANUAL_HTML = {
`;

const cuerpo = Object.entries(placas)
  .map(([id, html]) => '  ' + JSON.stringify(id) + ': ' + JSON.stringify(html) + ',')
  .join('\n');

const pie = `
};

// Cada placa ya viene maquetada a 1080×1350: se inyecta tal cual, sin escalar.
function KitManualPlate({ id }) {
  const html = KIT_MANUAL_HTML[id];
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

const KIT_MANUAL_IDS = Object.keys(KIT_MANUAL_HTML);

Object.assign(window, { KitManualPlate, KIT_MANUAL_IDS, KIT_MANUAL_HTML });
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, cabecera + cuerpo + pie);
console.log('placas extraidas: ' + Object.keys(placas).length);
console.log('bytes: ' + fs.statSync(outPath).size);

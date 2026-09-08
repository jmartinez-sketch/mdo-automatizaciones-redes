// Extrae el kit 4.4 completo de Claude Design, tal cual vienen,
// y arma mdo-templates/templates-kit-manual.jsx.
const fs = require('fs');
const path = require('path');

const [, , rawPath, outPath] = process.argv;
const s = JSON.parse(fs.readFileSync(rawPath, 'utf8')).content;

// Descartadas el 2026-09-05 (decisión de Juan): dependen de fotos que superan el
// tope de lectura de DesignSync (192 KiB) y llegan truncadas. Si algún día se
// suben esas fotos a mdo-templates/assets/fotos/, sacar el id de esta lista.
const DESCARTADAS = new Set(['in-01', 'in-05', 'in-06', 'mn-06', 'sq-02b']);

const IDS = [
  ...Array.from({ length: 10 }, (_, i) => 'nv-' + String(i + 1).padStart(2, '0')),
  ...Array.from({ length: 8 }, (_, i) => 'sv-' + String(i + 1).padStart(2, '0')),
  ...Array.from({ length: 6 }, (_, i) => 'in-' + String(i + 1).padStart(2, '0')),
].filter((id) => !DESCARTADAS.has(id));

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

// Slots por placa: mdo-templates/kit-slots.json (generado por rol tipográfico
// desde el kit y editable a mano). Cada entrada es {texto, slot} en orden de
// aparición; el extractor reemplaza el texto de ejemplo por [SLOT] avanzando un
// cursor, así que los textos repetidos dentro de una placa no se confunden.
const SLOTEADAS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mdo-templates', 'kit-slots.json'), 'utf8'));

function tamano(html) {
  const m = html.match(/width:(\d+)px;height:(\d+)px;overflow:hidden/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

const placas = {};
const tamanos = {};
const slotsPorPlaca = {};
const faltan = [];
const sinMapear = new Set();
// Todas las placas del kit (el catálogo entero rehecho + las nuevas), menos las descartadas.
const TODAS = Object.keys(SLOTEADAS).filter((id) => !DESCARTADAS.has(id));
for (const id of TODAS) {
  let html = extraer(id);
  const tam = html && tamano(html);
  if (!html || !tam) { faltan.push(id); continue; }
  for (const [de, a] of Object.entries(LOGOS)) html = html.split(de).join(a);
  for (const m of html.matchAll(/src="([^"]*)"/g)) {
    if (!m[1].startsWith('assets/')) sinMapear.add(m[1]);
  }
  if (SLOTEADAS[id] && SLOTEADAS[id].length) {
    let cursor = 0;
    for (const { texto, slot } of SLOTEADAS[id]) {
      const at = html.indexOf(texto, cursor);
      if (at < 0) { console.error(`SLOT ${slot} en ${id}: no encuentro el texto: ${texto}`); process.exit(1); }
      html = html.slice(0, at) + '[' + slot + ']' + html.slice(at + texto.length);
      cursor = at + slot.length + 2;
    }
    slotsPorPlaca[id] = SLOTEADAS[id].map((s) => ({ slot: s.slot, ejemplo: s.texto }));
  }
  placas[id] = html;
  tamanos[id] = tam;
}

if (sinMapear.size) {
  console.error('RUTAS SIN MAPEAR: ' + [...sinMapear].join(' '));
  process.exit(1);
}

if (faltan.length) {
  console.error('NO EXTRAIDAS: ' + faltan.join(' '));
  process.exit(1);
}

const cabecera = `// templates-kit-manual.jsx — el kit 4.4 completo de Claude Design
// ("Kit de redes — según el manual"), copiadas TAL CUAL del proyecto MDO - Diseño.
//
// Tres familias, según la guía de redes de la página 23 del Manual de Marca 2026:
//   nv-01..nv-10  A · Novedades impositivas / ARCA   — fondo navy con degradé diagonal
//   sv-01..sv-08  B · Servicios                      — degradés claros, isotipo gigante
//   in-02..in-04  D · Institucional / Marca          — foto con velo navy, o papel
//                 (in-01, in-05 e in-06 descartadas: ver DESCARTADAS más abajo)
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
// Tamaño de salida por placa (ancho, alto). Vienen maquetadas a tamaño final.
const KIT_MANUAL_SIZE = ${JSON.stringify(tamanos)};
// Placas del kit que ya tienen [SLOTS] y por lo tanto la rutina puede llenar.
// Las demás traen el texto de ejemplo del kit.
const KIT_MANUAL_SLOTS = ${JSON.stringify(slotsPorPlaca)};

Object.assign(window, { KitManualPlate, KIT_MANUAL_IDS, KIT_MANUAL_HTML, KIT_MANUAL_SIZE, KIT_MANUAL_SLOTS });
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, cabecera + cuerpo + pie);
console.log('placas extraidas: ' + Object.keys(placas).length);
console.log('bytes: ' + fs.statSync(outPath).size);

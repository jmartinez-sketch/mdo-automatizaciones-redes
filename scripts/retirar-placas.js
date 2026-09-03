// Retira del catálogo las 6 placas que el kit 4.4 del manual ya no incluye.
// De cada una borra: la función del template, su entrada en EXAMPLES_*, su
// exportación a window y su artboard en el canvas de vista previa (app.jsx).
// Si al final queda alguna referencia suelta, aborta sin escribir nada.
const fs = require('fs');
const path = require('path');

const DIR = process.argv[2];

// id de placa → [archivo del template, nombre del componente]
const RETIRADAS = {
  'po-06': ['templates-portrait.jsx', 'PoEquipo'],
  'po-06b': ['templates-variants-light.jsx', 'PoEquipoNoPhoto'],
  'po-13': ['templates-news.jsx', 'PoNoticia'],
  'po-37': ['templates-utilidad.jsx', 'PoVencimientosFeed'],
  'st-07': ['templates-story.jsx', 'StVencimientos'],
  'st-07b': ['templates-variants-light.jsx', 'StVencimientosLight'],
};

// Corta desde la línea `desde` hasta la primera que cumpla `fin`, y se lleva
// también el comentario que la encabeza y las líneas en blanco que la siguen.
function cortar(lineas, arranca, fin) {
  const i = lineas.findIndex(arranca);
  if (i < 0) return null;
  let j = i;
  while (j < lineas.length && !fin(lineas[j], j, i)) j++;
  if (j >= lineas.length) return null;
  let desde = i;
  while (desde > 0 && /^\s*(\/\*|\/\/|\*)/.test(lineas[desde - 1])) desde--;
  let hasta = j;
  while (hasta + 1 < lineas.length && lineas[hasta + 1].trim() === '') hasta++;
  return { lineas: [...lineas.slice(0, desde), ...lineas.slice(hasta + 1)], n: hasta - desde + 1 };
}

// Un template: `function X(` … hasta la `}` a columna 0.
const borrarFuncion = (L, fn) =>
  cortar(L, (l) => l.startsWith('function ' + fn + '('), (l, j, i) => j > i && l === '}');

// Una entrada de EXAMPLES. Hay de dos formas:
//   X: { … },
//   X: Object.assign({}, otro, { … }),
// No alcanza con buscar el `},`: la segunda forma cierra con `}),` y puede
// tener llaves anidadas. Se cuenta la profundidad de llaves y paréntesis desde
// la línea de apertura, y termina cuando vuelve a cero.
function borrarEjemplo(L, fn) {
  const i = L.findIndex((l) => new RegExp('^\\s{2}' + fn + ':\\s*[{O]').test(l));
  if (i < 0) return null;
  let prof = 0;
  let j = i;
  for (; j < L.length; j++) {
    const sinTexto = L[j].replace(/'[^']*'|"[^"]*"/g, '');
    for (const ch of sinTexto) {
      if (ch === '{' || ch === '(') prof++;
      else if (ch === '}' || ch === ')') prof--;
    }
    if (prof <= 0) break;
  }
  if (j >= L.length) return null;
  let hasta = j;
  while (hasta + 1 < L.length && L[hasta + 1].trim() === '') hasta++;
  return { lineas: [...L.slice(0, i), ...L.slice(hasta + 1)], n: hasta - i + 1 };
}

// Un artboard del canvas: `<DCArtboard id="po-06"` … hasta `</DCArtboard>`.
const borrarArtboard = (L, id) =>
  cortar(L, (l) => l.includes('<DCArtboard id="' + id + '"'), (l) => l.includes('</DCArtboard>'));

function quitarExport(texto, fn) {
  return texto.replace(/Object\.assign\(window,\s*\{([\s\S]*?)\}\)/g, (m, dentro) => {
    const nombres = dentro.split(',').map((s) => s.trim()).filter(Boolean);
    const quedan = nombres.filter((n) => n !== fn);
    return quedan.length === nombres.length ? m : 'Object.assign(window, { ' + quedan.join(', ') + ' })';
  });
}

const cambios = new Map();
const leer = (f) => {
  if (!cambios.has(f)) cambios.set(f, fs.readFileSync(path.join(DIR, f), 'utf8'));
  return cambios.get(f);
};
const guardar = (f, t) => cambios.set(f, t);

for (const [id, [archivo, fn]] of Object.entries(RETIRADAS)) {
  let texto = leer(archivo);
  const eol = texto.includes('\r\n') ? '\r\n' : '\n';

  for (const paso of [borrarFuncion, borrarEjemplo]) {
    const r = paso(texto.split(/\r?\n/), fn);
    if (r) texto = r.lineas.join(eol);
  }
  guardar(archivo, quitarExport(texto, fn));

  // El artboard vive en app.jsx, que es sólo el canvas de vista previa.
  const app = leer('app.jsx');
  const ra = borrarArtboard(app.split(/\r?\n/), id);
  if (ra) guardar('app.jsx', ra.lineas.join(app.includes('\r\n') ? '\r\n' : '\n'));

  // preview-nuevas.html es la otra galería: una línea por placa.
  const prev = leer('preview-nuevas.html');
  guardar('preview-nuevas.html', prev.split(/\r?\n/)
    .filter((l) => !l.includes("id: '" + id + "'"))
    .join(prev.includes('\r\n') ? '\r\n' : '\n'));
}

// Nada puede quedar apuntando a una placa retirada. Los comentarios no cuentan:
// varios explican justamente por qué una placa ya no está.
const sinComentarios = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const sueltas = [];
for (const [archivo, texto] of cambios) {
  const limpio = sinComentarios(texto);
  for (const [, fn] of Object.values(RETIRADAS)) {
    if (new RegExp('\\b' + fn + '\\b').test(limpio)) sueltas.push(archivo + ' → ' + fn);
  }
}
if (sueltas.length) {
  console.error('QUEDAN REFERENCIAS:\n  ' + [...new Set(sueltas)].join('\n  '));
  process.exit(1);
}

for (const [archivo, texto] of cambios) {
  fs.writeFileSync(path.join(DIR, archivo), texto);
  console.log('  ' + archivo);
}
console.log('placas retiradas: ' + Object.keys(RETIRADAS).length);

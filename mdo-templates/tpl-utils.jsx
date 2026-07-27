// tpl-utils.jsx — utilidades compartidas para las plantillas MDO.
// Cargar ANTES de los templates-*.jsx que las usan.
//
// Resuelve tres defectos que aparecían en las placas publicadas:
//   1. fitSize()      → el título ya no queda chico o desbordado: el cuerpo
//                       tipográfico se calcula según el largo del texto.
//   2. SourceFooter   → la fuente larga se trunca en vez de partirse en dos
//                       líneas, y la fecha nunca se comprime.
//   3. HandleFooter   → el handle recupera su propia línea (antes quedaba
//                       pegado a la fecha).
// El cálculo es sincrónico (por largo de texto, sin medir el DOM) para que
// el screenshot headless capture siempre el tamaño final ya resuelto.

// Devuelve un font-size que decrece por tramos según cuántos caracteres tiene
// el texto. `steps` = [[maxChars, size], ...] de menor a mayor cantidad.
function fitSize(text, steps, fallback) {
  const n = String(text == null ? '' : text).length;
  for (let i = 0; i < steps.length; i++) {
    if (n <= steps[i][0]) return steps[i][1];
  }
  return fallback != null ? fallback : steps[steps.length - 1][1];
}

// Fila de atribución: FUENTE — medio (truncado) ······ fecha (nunca se parte)
function SourceFooter({ fuente, fecha, mode = 'dark', label = 'Fuente' }) {
  const muted = mode === 'light' ? 'rgba(247,249,252,0.55)' : 'var(--ink-55)';
  const strong = mode === 'light' ? 'var(--paper)' : 'var(--navy)';
  const rule = mode === 'light' ? 'rgba(247,249,252,0.20)' : 'var(--hair)';
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingTop: 14,
      borderTop: '1px solid ' + rule }}>
      <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9.5, letterSpacing: '0.18em',
        color: muted, textTransform: 'uppercase', flexShrink: 0 }}>{label}</span>
      <span className="truncate" style={{ flex: 1, fontFamily: 'Montserrat, sans-serif',
        fontSize: 12.5, fontWeight: 600, color: strong }}>{fuente}</span>
      <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.06em',
        color: muted, flexShrink: 0 }}>{fecha}</span>
    </div>
  );
}

// Pie de marca: handle a la izquierda, sitio a la derecha, en su propia línea.
function HandleFooter({ handle, right = 'mdo-consultores.com.ar', mode = 'dark', style = {} }) {
  const muted = mode === 'light' ? 'rgba(247,249,252,0.55)' : 'var(--ink-55)';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      marginTop: 10, fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em',
      color: muted, ...style }}>
      <span style={{ whiteSpace: 'nowrap' }}>{handle}</span>
      <span style={{ whiteSpace: 'nowrap' }}>{right}</span>
    </div>
  );
}

// Encabezado estándar: lockup + chip. Unifica el header de todas las placas.
function TplHeader({ chip, mode = 'dark', size = 26 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <Lockup mode={mode === 'light' ? 'light' : 'dark'} size={size} />
      {chip ? <div className="chip">{chip}</div> : null}
    </div>
  );
}

Object.assign(window, { fitSize, SourceFooter, HandleFooter, TplHeader });

// templates-marketing.jsx — 3 plantillas de marketing / autoridad (po-34..po-36).
// Construidas con el estilo corregido: fitSize, footers robustos, sin huecos
// muertos. Requiere brand.jsx + tpl-utils.jsx. Regla: ARCA, nunca AFIP.

// ── po-34 · Mito vs. realidad ────────────────────────────────────────
// Distinta de po-32 (comparativa): ahí se eligen dos opciones válidas,
// acá se corrige una creencia equivocada.
// Slots: COPETE, TITULO, MITO, REALIDAD, CTA, HANDLE
function PoMitoRealidad(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', mito: '[MITO]',
    realidad: '[REALIDAD]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titulo, [[26, 38], [42, 33], [60, 28]], 25);
  const mSize = fitSize(p.mito, [[70, 17], [110, 15.5]], 14);
  const rSize = fitSize(p.realidad, [[70, 17], [110, 15.5]], 14);

  return (
    <div className="tpl white" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={26} />

      <div className="display" style={{ marginTop: 24, fontSize: tSize, fontWeight: 700,
        color: 'var(--navy-ink)', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '92%' }}>
        {p.titulo}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 16 }}>
        {/* Mito — apagado, tachado */}
        <div style={{ padding: '20px 22px', background: 'var(--blue-tint)',
          border: '1px solid var(--hair)', borderRadius: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid var(--ink-35)',
              color: 'var(--ink-35)', fontFamily: 'var(--font-body)', fontSize: 11,
              fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0 }}>✕</span>
            <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 9.5, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--ink-35)' }}>El mito</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: mSize, fontWeight: 500,
            color: 'var(--ink-55)', lineHeight: 1.38, textDecoration: 'line-through',
            textDecorationColor: 'var(--ink-15)' }}>
            {p.mito}
          </div>
        </div>

        {/* Realidad — navy, protagonista */}
        <div style={{ padding: '22px 24px', background: 'var(--navy)', borderRadius: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--blue-lt)',
              color: 'var(--navy)', fontFamily: 'var(--font-body)', fontSize: 11,
              fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0 }}>✓</span>
            <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 9.5, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--blue-lt)' }}>La realidad</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: rSize, fontWeight: 600,
            color: 'var(--paper)', lineHeight: 1.38 }}>
            {p.realidad}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12, borderTop: '1px solid var(--hair)', paddingTop: 16 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
          color: 'var(--navy)' }}>{p.cta}</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10, letterSpacing: '0.08em',
          color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{p.handle}</span>
      </div>
    </div>
  );
}

// ── po-35 · Errores frecuentes (autoridad) ───────────────────────────
// Slots: COPETE, TITULO, ERROR_1, FIX_1, ERROR_2, FIX_2, ERROR_3, FIX_3, CTA, HANDLE
function PoErrores(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]',
    error_1: '[ERROR_1]', fix_1: '[FIX_1]',
    error_2: '[ERROR_2]', fix_2: '[FIX_2]',
    error_3: '[ERROR_3]', fix_3: '[FIX_3]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const items = [
    { e: p.error_1, f: p.fix_1 },
    { e: p.error_2, f: p.fix_2 },
    { e: p.error_3, f: p.fix_3 },
  ];
  const tSize = fitSize(p.titulo, [[28, 38], [44, 33], [62, 29]], 25);

  return (
    <div className="tpl tint" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={26} />

      <div className="display" style={{ marginTop: 24, fontSize: tSize, fontWeight: 700,
        color: 'var(--navy-ink)', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '92%' }}>
        {p.titulo}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 12, marginTop: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--hair)', borderRadius: 4,
            padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
              background: 'var(--navy)', color: 'var(--paper)', fontFamily: 'var(--font-accent)', fontWeight: 700,
              fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 1 }}>{i + 1}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700,
                color: 'var(--navy-ink)', lineHeight: 1.28 }}>{it.e}</div>
              <div style={{ marginTop: 5, display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, marginTop: 7, width: 9, height: 1,
                  background: 'var(--blue)' }}></span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5,
                  color: 'var(--ink-55)', lineHeight: 1.4 }}>{it.f}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)',
        fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{p.cta}</span>
        <span style={{ color: 'var(--blue-lt)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-36 · Testimonio de cliente (prueba social) ────────────────────
// Sin nombre propio: sector + tamaño, para no exponer al cliente.
// Slots: COPETE, TESTIMONIO, CLIENTE_TIPO, CLIENTE_DETALLE, SERVICIO, HANDLE
function PoTestimonio(props) {
  const p = Object.assign({
    copete: '[COPETE]', testimonio: '[TESTIMONIO]', cliente_tipo: '[CLIENTE_TIPO]',
    cliente_detalle: '[CLIENTE_DETALLE]', servicio: '[SERVICIO]', handle: '[HANDLE]',
  }, props);

  const qSize = fitSize(p.testimonio, [[70, 34], [110, 29], [160, 25]], 22);

  return (
    <div className="tpl navy" style={{ padding: 52, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={300} opacity={0.06}
        style={{ position: 'absolute', right: -95, bottom: 60 }} />

      <TplHeader chip={p.copete} mode="light" size={26} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="quote-mark" style={{ fontSize: 96, color: 'var(--blue-lt)',
          opacity: 0.55, marginBottom: 4, marginLeft: -6 }}>“</div>
        <div className="display-serif" style={{ fontSize: qSize, color: 'var(--paper)',
          lineHeight: 1.2 }}>
          <em>{p.testimonio}</em>
        </div>

        <div style={{ marginTop: 32, display: 'flex', alignItems: 'flex-start', gap: 13 }}>
          <span style={{ flexShrink: 0, marginTop: 8, width: 26, height: 1,
            background: 'var(--blue-lt)' }}></span>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 700,
              color: 'var(--paper)' }}>{p.cliente_tipo}</div>
            <div style={{ marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'rgba(247,249,252,0.65)' }}>{p.cliente_detalle}</div>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', gap: 12, borderTop: '1px solid rgba(247,249,252,0.20)',
        paddingTop: 16 }}>
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 9.5, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--blue-lt)' }}>{p.servicio}</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10, letterSpacing: '0.08em',
          color: 'rgba(247,249,252,0.55)', whiteSpace: 'nowrap' }}>{p.handle}</span>
      </div>
    </div>
  );
}

const EXAMPLES_MARKETING = {
  PoMitoRealidad: {
    copete: 'Mitos',
    titulo: 'Sobre facturar con Monotributo',
    mito: 'Si facturo poco, no hace falta que lleve ningún registro.',
    realidad: 'Todo monotributista debe respaldar sus operaciones: si te excedés del tope sin registro, la recategorización te encuentra sin papeles.',
    cta: 'Ordenamos tu situación',
    handle: '@mdoconsultores',
  },
  PoErrores: {
    copete: 'Gestión PyME',
    titulo: '3 errores que vemos todos los meses',
    error_1: 'Mezclar la cuenta personal con la de la empresa',
    fix_1: 'Una cuenta para cada cosa: sin eso, ningún balance refleja la realidad.',
    error_2: 'Guardar los comprobantes sin ordenar',
    fix_2: 'Un criterio simple por mes alcanza para no perder crédito fiscal.',
    error_3: 'Mirar los números sólo cuando vence algo',
    fix_3: 'Un reporte mensual convierte la contabilidad en una herramienta de decisión.',
    cta: 'Te ayudamos a ordenarlo',
    handle: '@mdoconsultores',
  },
  PoTestimonio: {
    copete: 'Clientes',
    testimonio: 'Dejamos de enterarnos de los problemas cuando ya eran urgencias.',
    cliente_tipo: 'PyME industrial',
    cliente_detalle: 'Buenos Aires · 40 empleados · cliente desde 2019',
    servicio: 'Contabilidad + Impuestos',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoMitoRealidad, PoErrores, PoTestimonio, EXAMPLES_MARKETING });

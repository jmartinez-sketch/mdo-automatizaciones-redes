// templates-linkedin.jsx — formato LinkedIn (li-01, li-02).
// Landscape 1.91:1 — base 600×314 → salida 1200×628, la medida de la
// tarjeta de LinkedIn. Más ancho y menos alto que IG: el texto es más
// corto y la jerarquía más horizontal.
// Requiere brand.jsx + tpl-utils.jsx. Regla: ARCA, nunca AFIP.

// ── li-01 · Noticia / novedad normativa (papel) ──────────────────────
// Slots: CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE
function LiNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[32, 34], [50, 29], [70, 25]], 22);

  return (
    <div className="tpl white" style={{ padding: 38, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark size={210} opacity={0.05}
        style={{ position: 'absolute', right: -52, bottom: -30 }} />

      {/* Filete de marca al tope */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 4,
        background: 'var(--gradient-brand-h)' }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Lockup size={22} />
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1, paddingRight: 60 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--navy-ink)',
          lineHeight: 1.08, letterSpacing: '-0.022em' }}>
          {p.titular}
        </div>
        <div className="lede" style={{ marginTop: 12, fontSize: 13, maxWidth: '92%' }}>
          {p.bajada}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SourceFooter fuente={p.fuente} fecha={p.fecha} />
        <HandleFooter handle={p.handle} right="mdo-consultores.com.ar" style={{ marginTop: 8 }} />
      </div>
    </div>
  );
}

// ── li-02 · Claim institucional / marketing (navy) ───────────────────
// Slots: COPETE, CLAIM, SERVICIO_1, SERVICIO_2, SERVICIO_3, CTA, HANDLE
function LiClaim(props) {
  const p = Object.assign({
    copete: '[COPETE]', claim: '[CLAIM]',
    servicio_1: '[SERVICIO_1]', servicio_2: '[SERVICIO_2]', servicio_3: '[SERVICIO_3]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.claim, [[34, 36], [54, 31], [76, 26]], 23);
  const servicios = [p.servicio_1, p.servicio_2, p.servicio_3];

  return (
    <div className="tpl navy bg-grid-navy" style={{ padding: 38, display: 'flex', gap: 30,
      position: 'relative', overflow: 'hidden' }}>

      {/* Columna de contenido */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span className="eyebrow">{p.copete}</span>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="display" style={{ fontSize: cSize, fontWeight: 700, color: 'var(--paper)',
            lineHeight: 1.1, letterSpacing: '-0.022em' }}>
            {p.claim}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {servicios.map((s, i) => (
            <span key={i} style={{ padding: '5px 12px', borderRadius: 999,
              border: '1px solid rgba(247,249,252,0.30)', fontFamily: 'var(--font-accent)', fontWeight: 700,
              fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(247,249,252,0.85)', whiteSpace: 'nowrap' }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Panel derecho: marca + CTA */}
      <div style={{ flexShrink: 0, width: 172, borderLeft: '1px solid rgba(247,249,252,0.20)',
        paddingLeft: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Lockup mode="light" size={24} stacked={true} />
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
            color: 'var(--paper)', lineHeight: 1.3 }}>{p.cta}</div>
          <div style={{ marginTop: 10, fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 9.5,
            letterSpacing: '0.08em', color: 'rgba(247,249,252,0.55)' }}>{p.handle}</div>
        </div>
      </div>
    </div>
  );
}

const EXAMPLES_LINKEDIN = {
  LiNoticia: {
    categoria: 'Laboral · ARCA',
    titular: 'ARCA abre la Moratoria Laboral para empleadores',
    bajada: 'Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse.',
    fuente: 'Errepar · ARCA · Resolución',
    fecha: '11 jun 2026',
    handle: '@mdoconsultores',
  },
  LiClaim: {
    copete: 'Martinez, De Orta & Gutierrez Taboada',
    claim: 'Más de 50 años ordenando los números de empresas argentinas.',
    servicio_1: 'Impuestos',
    servicio_2: 'Contabilidad',
    servicio_3: 'Sueldos',
    cta: 'Conversemos sobre tu empresa',
    handle: 'mdo-consultores.com.ar',
  },
};

Object.assign(window, { LiNoticia, LiClaim, EXAMPLES_LINKEDIN });

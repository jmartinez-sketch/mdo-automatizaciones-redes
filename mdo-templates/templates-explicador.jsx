// templates-explicador.jsx — 3 plantillas nuevas (po-31, po-32, po-33).
// po-31 Explicador  → concepto en 3 pasos CON cuerpo (po-28 sólo tiene una
//                     línea por paso; ésta explica de verdad).
// po-32 Comparativa → opción A vs. opción B, hueco que no existía.
// po-33 Elegí tu caso → placa de engagement/marketing: invita a comentar.
// Portrait 4:5 (base 540×675 → 1080×1350). Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx cargados antes.

// ── po-31 · Explicador en 3 pasos ───────────────────────────────────
// Slots: COPETE, TITULO, PASO_1_TIT, PASO_1_TXT, PASO_2_TIT, PASO_2_TXT,
//        PASO_3_TIT, PASO_3_TXT, CTA, HANDLE
function PoExplicador(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]',
    paso_1_tit: '[PASO_1_TIT]', paso_1_txt: '[PASO_1_TXT]',
    paso_2_tit: '[PASO_2_TIT]', paso_2_txt: '[PASO_2_TXT]',
    paso_3_tit: '[PASO_3_TIT]', paso_3_txt: '[PASO_3_TXT]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const pasos = [
    { t: p.paso_1_tit, d: p.paso_1_txt },
    { t: p.paso_2_tit, d: p.paso_2_txt },
    { t: p.paso_3_tit, d: p.paso_3_txt },
  ];
  const tSize = fitSize(p.titulo, [[28, 40], [44, 35], [62, 30]], 26);

  return (
    <div className="tpl white" style={{ padding: 52, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={26} />

      <div className="display" style={{ marginTop: 26, fontSize: tSize, fontWeight: 700,
        color: 'var(--navy-ink)', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '92%' }}>
        {p.titulo}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: 6 }}>
        {pasos.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start',
            padding: '20px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hair)' }}>
            <div className="display-serif" style={{ flexShrink: 0, width: 44, fontSize: 40,
              color: 'var(--blue)', lineHeight: 0.9, paddingTop: 2 }}>
              <em>{'0' + (i + 1)}</em>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16.5, fontWeight: 700,
                color: 'var(--navy)', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{s.t}</div>
              <div className="lede" style={{ marginTop: 6, fontSize: 13,
                color: 'var(--ink-55)' }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)',
        fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, fontWeight: 600,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{p.cta}</span>
        <span style={{ color: 'var(--blue-lt)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-32 · Comparativa A vs. B ─────────────────────────────────────
// Slots: COPETE, TITULO, A_LABEL, A_TITULO, A_1, A_2, A_3,
//        B_LABEL, B_TITULO, B_1, B_2, B_3, VEREDICTO, HANDLE
function PoComparativa(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]',
    a_label: '[A_LABEL]', a_titulo: '[A_TITULO]', a_1: '[A_1]', a_2: '[A_2]', a_3: '[A_3]',
    b_label: '[B_LABEL]', b_titulo: '[B_TITULO]', b_1: '[B_1]', b_2: '[B_2]', b_3: '[B_3]',
    veredicto: '[VEREDICTO]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titulo, [[26, 38], [42, 33], [60, 28]], 25);

  function Col({ label, titulo, items, dark }) {
    const bd = dark ? 'none' : '1px solid var(--hair)';
    return (
      <div style={{ flex: 1, minWidth: 0, border: bd, borderRadius: 4, padding: '20px 18px',
        background: dark ? 'var(--navy)' : '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9.5, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: dark ? 'var(--blue-lt)' : 'var(--blue-mid)' }}>
          {label}
        </div>
        <div style={{ marginTop: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 19,
          fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15,
          color: dark ? 'var(--paper)' : 'var(--navy-ink)' }}>
          {titulo}
        </div>
        <div style={{ height: 1, background: dark ? 'rgba(247,249,252,0.22)' : 'var(--hair)',
          margin: '14px 0 12px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, marginTop: 6, width: 10, height: 1,
                background: dark ? 'var(--blue-lt)' : 'var(--blue)' }}></span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12.5, lineHeight: 1.4,
                color: dark ? 'rgba(247,249,252,0.85)' : 'var(--ink-70)' }}>{it}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tpl tint" style={{ padding: 46, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={26} />

      <div className="display" style={{ marginTop: 24, fontSize: tSize, fontWeight: 700,
        color: 'var(--navy-ink)', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '94%' }}>
        {p.titulo}
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', gap: 14, marginTop: 24 }}>
        <Col label={p.a_label} titulo={p.a_titulo} items={[p.a_1, p.a_2, p.a_3]} dark={false} />
        <div style={{ flexShrink: 0, alignSelf: 'center', fontFamily: 'Geist Mono, monospace',
          fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-35)',
          textTransform: 'uppercase' }}>vs</div>
        <Col label={p.b_label} titulo={p.b_titulo} items={[p.b_1, p.b_2, p.b_3]} dark={true} />
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'flex-start',
        borderTop: '1px solid var(--hair)', paddingTop: 16 }}>
        <span className="asterisk" style={{ fontSize: 24, color: 'var(--blue)', flexShrink: 0 }}>*</span>
        <div className="display-serif" style={{ fontSize: 18, color: 'var(--navy)', lineHeight: 1.22 }}>
          <em>{p.veredicto}</em>
        </div>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-33 · Elegí tu caso (engagement / marketing) ──────────────────
// Slots: COPETE, PREGUNTA, OPCION_1, OPCION_2, OPCION_3, CTA, HANDLE
function PoElegiTuCaso(props) {
  const p = Object.assign({
    copete: '[COPETE]', pregunta: '[PREGUNTA]',
    opcion_1: '[OPCION_1]', opcion_2: '[OPCION_2]', opcion_3: '[OPCION_3]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const opciones = [p.opcion_1, p.opcion_2, p.opcion_3];
  const qSize = fitSize(p.pregunta, [[30, 44], [48, 38], [70, 32]], 27);

  return (
    <div className="tpl navy" style={{ padding: 52, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={300} opacity={0.06}
        style={{ position: 'absolute', right: -90, top: 150 }} />

      <TplHeader chip={p.copete} mode="light" size={26} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="display" style={{ fontSize: qSize, fontWeight: 700, color: 'var(--paper)',
          lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '95%' }}>
          {p.pregunta}
        </div>

        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {opciones.map((o, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px', border: '1px solid rgba(247,249,252,0.30)', borderRadius: 999,
              background: 'rgba(247,249,252,0.05)' }}>
              <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%',
                border: '1px solid var(--blue-lt)', color: 'var(--blue-lt)',
                fontFamily: 'Geist Mono, monospace', fontSize: 11, display: 'flex',
                alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 500,
                color: 'var(--paper)', lineHeight: 1.3 }}>{o}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '15px 20px', background: 'var(--paper)', color: 'var(--navy)',
          fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, fontWeight: 700,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span>{p.cta}</span>
          <span style={{ color: 'var(--blue-mid)', flexShrink: 0 }}>→</span>
        </div>
        <HandleFooter handle={p.handle} mode="light" />
      </div>
    </div>
  );
}

const EXAMPLES_EXPLICADOR = {
  PoExplicador: {
    copete: 'Explicador',
    titulo: '¿Qué es una conciliación bancaria?',
    paso_1_tit: 'Se comparan dos registros',
    paso_1_txt: 'Por un lado tus movimientos contables, por el otro el extracto del banco.',
    paso_2_tit: 'Se detectan las diferencias',
    paso_2_txt: 'Cheques no cobrados, depósitos en tránsito, gastos que el banco debitó y no registraste.',
    paso_3_tit: 'Queda un saldo confiable',
    paso_3_txt: 'Recién ahí sabés cuánta plata tenés de verdad disponible para operar.',
    cta: 'Conciliamos tus cuentas todos los meses',
    handle: '@mdoconsultores',
  },
  PoComparativa: {
    copete: 'Comparativa',
    titulo: 'Monotributo o Responsable Inscripto',
    a_label: 'Opción A',
    a_titulo: 'Monotributo',
    a_1: 'Cuota fija mensual, simple de liquidar',
    a_2: 'No discrimina IVA en tus facturas',
    a_3: 'Tiene topes de facturación anual',
    b_label: 'Opción B',
    b_titulo: 'Responsable Inscripto',
    b_1: 'Liquidás IVA y Ganancias por separado',
    b_2: 'Podés computar el IVA de tus compras',
    b_3: 'Sin tope: acompaña el crecimiento',
    veredicto: 'No hay una mejor: hay una que le sirve a tu estructura de costos.',
    handle: '@mdoconsultores',
  },
  PoElegiTuCaso: {
    copete: 'Tu caso',
    pregunta: '¿Cuál de estas tres te está pasando hoy?',
    opcion_1: 'No sé si estoy pagando más impuestos de los que debería',
    opcion_2: 'Tengo la contabilidad atrasada y no puedo decidir',
    opcion_3: 'Crecí y mi estructura administrativa quedó chica',
    cta: 'Comentá el número y te orientamos',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoExplicador, PoComparativa, PoElegiTuCaso, EXAMPLES_EXPLICADOR });

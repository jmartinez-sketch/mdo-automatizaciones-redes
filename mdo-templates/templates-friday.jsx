// templates-friday.jsx — 5 templates para el posteo de los viernes (Gestión PyME).
// Todos portrait 4:5 (base 540×675 → 1080×1350). On-brand MDO.
// NUNCA usar la etiqueta "Tip": el copete va con "Gestión PyME" o el servicio.

// ─────────────────────────────────────────────────────────────────────
// po-21 — Pregunta hero (navy): una pregunta gancho en serif, respuesta breve, CTA.
// Slots: COPETE, PREGUNTA, RESPUESTA, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoPreguntaHero(props) {
  const p = Object.assign({
    copete: '[COPETE]', pregunta: '[PREGUNTA]', respuesta: '[RESPUESTA]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);
  return (
    <div className="tpl navy" style={{ padding: 64, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <IsoWatermark mode="light" size={360} opacity={0.06} style={{ position: 'absolute', right: -90, top: -70 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Lockup mode="light" size={26} />
        <div className="chip">{p.copete}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div className="display-serif" style={{ fontSize: 60, color: 'var(--paper)', lineHeight: 1.04 }}>
          <em>{p.pregunta}</em>
        </div>
        <div className="lede" style={{ marginTop: 26, fontSize: 18, color: 'rgba(247,249,252,0.82)', maxWidth: '92%' }}>
          {p.respuesta}
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'inline-block', background: 'var(--paper)', color: 'var(--navy)', padding: '14px 22px',
          borderRadius: 2, fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600, marginBottom: 22 }}>
          {p.cta} →
        </div>
        <div className="footer-row"><span>{p.handle}</span><span>mdo-consultores.com.ar</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-22 — Antes / Después (split papel arriba, navy abajo): contraste sin/con MDO.
// Slots: COPETE, SIN_LABEL, SIN_TEXTO, CON_LABEL, CON_TEXTO, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoAntesDespues(props) {
  const p = Object.assign({
    copete: '[COPETE]', sin_label: '[SIN_LABEL]', sin_texto: '[SIN_TEXTO]',
    con_label: '[CON_LABEL]', con_texto: '[CON_TEXTO]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);
  return (
    <div className="tpl" style={{ padding: 0, display: 'flex', flexDirection: 'column', background: 'var(--paper-warm)' }}>
      <div style={{ padding: '56px 60px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <div className="chip">{p.copete}</div>
      </div>
      <div style={{ flex: 1, padding: '28px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ color: 'var(--ink-55)', marginBottom: 14 }}>{p.sin_label}</div>
        <div className="display" style={{ fontSize: 29, color: 'var(--ink-35)', lineHeight: 1.18, fontWeight: 600 }}>{p.sin_texto}</div>
      </div>
      <div style={{ background: 'var(--navy)', color: 'var(--paper)', flex: 1, padding: '34px 60px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div className="eyebrow" style={{ color: 'var(--blue-lt)', marginBottom: 14 }}>{p.con_label}</div>
        <div className="display" style={{ fontSize: 33, color: 'var(--paper)', lineHeight: 1.14, fontWeight: 700 }}>{p.con_texto}</div>
        <div style={{ marginTop: 22, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--blue-lt)' }}>{p.cta} →</div>
        <div className="footer-row" style={{ marginTop: 20, color: 'rgba(247,249,252,0.55)' }}>
          <span>{p.handle}</span><span>mdo-consultores.com.ar</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-23 — Declaración / manifiesto (papel): una afirmación fuerte + firma.
// Slots: COPETE, DECLARACION, APOYO, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoDeclaracion(props) {
  const p = Object.assign({
    copete: '[COPETE]', declaracion: '[DECLARACION]', apoyo: '[APOYO]', handle: '[HANDLE]',
  }, props);
  return (
    <div className="tpl" style={{ padding: 64, display: 'flex', flexDirection: 'column', background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <div className="mono">{p.copete}</div>
      </div>
      <div className="hair-navy" style={{ width: 56, marginTop: 40, marginBottom: 36 }}></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <div className="display" style={{ fontSize: 46, fontWeight: 700, color: 'var(--navy-ink)',
          lineHeight: 1.08, letterSpacing: '-0.02em' }}>
          {p.declaracion}
        </div>
        <div className="lede" style={{ marginTop: 24, fontSize: 17, maxWidth: '92%' }}>{p.apoyo}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--navy)' }}></span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>Estudio MDO · Consultores</span>
      </div>
      <div className="footer-row"><span>{p.handle}</span><span>mdo-consultores.com.ar</span></div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-24 — Checklist (blanco): "¿Tenés esto resuelto?" con 3 ítems tildados.
// Slots: COPETE, TITULO, ITEM_1, ITEM_2, ITEM_3, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoChecklist(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', item_1: '[ITEM_1]', item_2: '[ITEM_2]',
    item_3: '[ITEM_3]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);
  const items = [p.item_1, p.item_2, p.item_3];
  return (
    <div className="tpl white" style={{ padding: 60, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <div className="chip">{p.copete}</div>
      </div>
      <div className="display" style={{ marginTop: 34, fontSize: 40, fontWeight: 700, color: 'var(--navy-ink)', lineHeight: 1.08 }}>{p.titulo}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22, marginTop: 38 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: 'var(--navy)',
              color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, marginTop: 1 }}>✓</span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35 }}>{it}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 20px', background: 'var(--navy)', color: 'var(--paper)', borderRadius: 2,
        fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, fontWeight: 600, marginBottom: 16 }}>{p.cta}</div>
      <div className="footer-row"><span>{p.handle}</span><span>mdo-consultores.com.ar</span></div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-25 — Foco / una idea (navy-deep con grilla): una idea fuerte, minimal.
// Slots: COPETE, IDEA, DETALLE, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoFoco(props) {
  const p = Object.assign({
    copete: '[COPETE]', idea: '[IDEA]', detalle: '[DETALLE]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);
  return (
    <div className="tpl navy-deep" style={{ padding: 64, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="bg-grid-navy" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Lockup mode="light" size={26} />
        <div className="chip">{p.copete}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div className="asterisk" style={{ fontSize: 66, marginBottom: 6 }}>*</div>
        <div className="display" style={{ fontSize: 50, fontWeight: 700, color: 'var(--paper)', lineHeight: 1.06, letterSpacing: '-0.02em' }}>{p.idea}</div>
        <div className="lede" style={{ marginTop: 22, fontSize: 17, color: 'rgba(247,249,252,0.82)', maxWidth: '90%' }}>{p.detalle}</div>
      </div>
      <div style={{ position: 'relative' }}>
        <div className="hair" style={{ marginBottom: 18 }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--blue-lt)' }}>{p.cta} →</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(247,249,252,0.55)' }}>{p.handle}</span>
        </div>
      </div>
    </div>
  );
}

const EXAMPLES_FRIDAY = {
  PoPreguntaHero: {
    copete: 'Contabilidad',
    pregunta: '¿Sabés cómo viene tu mes antes de que termine?',
    respuesta: 'Con la contabilidad al día dejás de manejar tu PyME mirando por el espejo retrovisor.',
    cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores',
  },
  PoAntesDespues: {
    copete: 'Contabilidad',
    sin_label: 'Sin orden contable',
    sin_texto: 'Números a fin de año, decisiones a las apuradas y sorpresas con ARCA.',
    con_label: 'Con MDO',
    con_texto: 'Información al día para decidir tranquilo, todo el año.',
    cta: 'Ordenamos tu contabilidad', handle: '@mdoconsultores',
  },
  PoDeclaracion: {
    copete: 'Gestión PyME',
    declaracion: 'La contabilidad no es un gasto. Es la base de toda buena decisión.',
    apoyo: 'Llevada al día y bien leída, te dice dónde ganás, dónde perdés y hacia dónde conviene crecer.',
    handle: '@mdoconsultores',
  },
  PoChecklist: {
    copete: 'Contabilidad',
    titulo: '¿Tu PyME tiene esto resuelto?',
    item_1: 'Balances y libros al día, sin corridas',
    item_2: 'Cuentas conciliadas todos los meses',
    item_3: 'Reportes claros para tomar decisiones',
    cta: 'Si te falta alguno, consultanos.', handle: '@mdoconsultores',
  },
  PoFoco: {
    copete: 'Gestión PyME',
    idea: 'Lo que no se registra, no se puede mejorar.',
    detalle: 'Una contabilidad ordenada es lo que convierte tus números en decisiones.',
    cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoPreguntaHero, PoAntesDespues, PoDeclaracion, PoChecklist, PoFoco, EXAMPLES_FRIDAY });

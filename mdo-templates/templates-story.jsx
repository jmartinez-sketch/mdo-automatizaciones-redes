// templates-story.jsx — 3 Story (9:16) IG templates.
// Artboard size: 480 × 853 (real IG = 1080×1920).
// Defaults use [PLACEHOLDER] literals; EXAMPLES_STORY provides realistic data.

// ─────────────────────────────────────────────────────────────────────
// 07 — Vencimientos de la semana
// Slots: COPETE, SEMANA, item rows (FECHA_N, IMPUESTO_N, PERIODO_N, HORA_N), CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function StVencimientos(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    semana: '[SEMANA]',
    fecha_1: '[FECHA_1]', impuesto_1: '[IMPUESTO_1]', periodo_1: '[PERIODO_1]', hora_1: '[HORA_1]',
    fecha_2: '[FECHA_2]', impuesto_2: '[IMPUESTO_2]', periodo_2: '[PERIODO_2]', hora_2: '[HORA_2]',
    fecha_3: '[FECHA_3]', impuesto_3: '[IMPUESTO_3]', periodo_3: '[PERIODO_3]', hora_3: '[HORA_3]',
    fecha_4: '[FECHA_4]', impuesto_4: '[IMPUESTO_4]', periodo_4: '[PERIODO_4]', hora_4: '[HORA_4]',
    cta: '[CTA]',
    handle: '[HANDLE]',
  }, props);

  const items = [
    { date: p.fecha_1, tax: p.impuesto_1, period: p.periodo_1, due_time: p.hora_1 },
    { date: p.fecha_2, tax: p.impuesto_2, period: p.periodo_2, due_time: p.hora_2 },
    { date: p.fecha_3, tax: p.impuesto_3, period: p.periodo_3, due_time: p.hora_3 },
    { date: p.fecha_4, tax: p.impuesto_4, period: p.periodo_4, due_time: p.hora_4 },
  ].filter(it => it.date && it.tax);

  return (
    <div className="tpl navy" style={{ padding: 40, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="bg-grid-navy" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup mode="light" size={24} />
        <div className="chip" style={{ borderColor: 'rgba(247,249,252,0.30)' }}>Agenda · JUN</div>
      </div>

      <div style={{ position: 'relative', marginTop: 50 }}>
        <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--blue-lt)' }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: 70, color: 'var(--paper)' }}>
          <em>{p.semana}</em>
        </div>
      </div>

      <div style={{ position: 'relative', marginTop: 42, display: 'flex', flexDirection: 'column' }}>
        <div className="hair" style={{ background: 'rgba(247,249,252,0.30)' }}></div>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '78px 1fr 80px',
            alignItems: 'center', padding: '18px 0', borderBottom: '1px solid rgba(247,249,252,0.20)' }}>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 14, letterSpacing: '0.06em',
              color: 'var(--blue-lt)', fontWeight: 500 }}>{it.date}</div>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 19, fontWeight: 600,
                color: 'var(--paper)', letterSpacing: '-0.01em' }}>{it.tax}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 400,
                color: 'rgba(247,249,252,0.62)', marginTop: 2 }}>{it.period}</div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'Geist Mono, monospace', fontSize: 12,
              letterSpacing: '0.06em', color: 'rgba(247,249,252,0.62)' }}>{it.due_time} h</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}></div>

      <div style={{ position: 'relative' }}>
        <div className="display-serif" style={{ fontSize: 28, color: 'var(--blue-lt)', marginBottom: 22 }}>
          <em>{p.cta}</em>
        </div>
        <div className="footer-row" style={{ color: 'rgba(247,249,252,0.55)' }}>
          <span>{p.handle}</span>
          <span>mdo-consultores.com.ar</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 08 — Cita vertical
// Slots: COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE
// ─────────────────────────────────────────────────────────────────────
function StCita(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    cita: '[CITA]',
    autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl" style={{ padding: 40, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="mono">06 · 2026</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div className="quote-mark" style={{ fontSize: 180, color: 'var(--blue-pale)',
          position: 'absolute', top: -40, left: -10, zIndex: 0 }}>“</div>

        <div className="eyebrow" style={{ marginBottom: 30, position: 'relative' }}>{p.copete}</div>

        <div className="display-serif" style={{ fontSize: 52, color: 'var(--navy-ink)',
          position: 'relative', lineHeight: 1.05 }}>
          <em>{p.cita}</em>
        </div>

        <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <span style={{ display: 'inline-block', width: 36, height: 1, background: 'var(--navy)' }}></span>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600,
              color: 'var(--navy-ink)' }}>{p.autor}</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12,
              color: 'var(--ink-55)', marginTop: 2 }}>{p.rol_autor}</div>
          </div>
        </div>
      </div>

      <div className="footer-row">
        <span>{p.handle}</span>
        <span>Reflexión · 2026</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 09 — CTA / Consultanos
// Slots: COPETE, TITULAR_1, TITULAR_2, TITULAR_3, BAJADA, canales, HANDLE
// ─────────────────────────────────────────────────────────────────────
function StCTA(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    titular_1: '[TITULAR_1]',
    titular_2: '[TITULAR_2]',
    titular_3: '[TITULAR_3]',
    bajada: '[BAJADA]',
    canal_1_label: '[CANAL_1_LABEL]', canal_1_valor: '[CANAL_1_VALOR]',
    canal_2_label: '[CANAL_2_LABEL]', canal_2_valor: '[CANAL_2_VALOR]',
    canal_3_label: '[CANAL_3_LABEL]', canal_3_valor: '[CANAL_3_VALOR]',
    handle: '[HANDLE]',
  }, props);

  const channels = [
    { label: p.canal_1_label, value: p.canal_1_valor },
    { label: p.canal_2_label, value: p.canal_2_valor },
    { label: p.canal_3_label, value: p.canal_3_valor },
  ].filter(c => c.label && c.value);

  return (
    <div className="tpl" style={{ padding: 40, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)', position: 'relative' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="mono">Consultanos</div>
      </div>

      <div style={{ marginTop: 60 }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>{p.copete}</div>

        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 72, fontWeight: 700,
          color: 'var(--navy-ink)', letterSpacing: '-0.025em', lineHeight: 0.95 }}>
          {p.titular_1}
        </div>
        <div className="display-serif" style={{ fontSize: 92, color: 'var(--blue-mid)', lineHeight: 0.9,
          marginTop: -4 }}>
          <em>{p.titular_2}</em>
        </div>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 72, fontWeight: 700,
          color: 'var(--navy-ink)', letterSpacing: '-0.025em', lineHeight: 0.95, marginTop: -4 }}>
          {p.titular_3}
        </div>
      </div>

      <div className="lede" style={{ marginTop: 30, fontSize: 16, maxWidth: '88%' }}>
        {p.bajada}
      </div>

      <div style={{ flex: 1 }}></div>

      <div style={{ background: 'var(--navy)', color: 'var(--paper)', padding: '14px 22px', borderRadius: 2 }}>
        {channels.map((c, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '6px 0', borderBottom: i < channels.length - 1 ? '1px solid rgba(247,249,252,0.20)' : 'none' }}>
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.16em',
              color: 'var(--blue-lt)', textTransform: 'uppercase' }}>{c.label}</span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, fontWeight: 500 }}>{c.value}</span>
          </div>
        ))}
      </div>

      <div className="footer-row" style={{ marginTop: 18 }}>
        <span>{p.handle}</span>
        <span>Buenos Aires, Argentina</span>
      </div>
    </div>
  );
}

const EXAMPLES_STORY = {
  StVencimientos: {
    copete: 'Agenda · Semana del',
    semana: '16 al 20 · Junio',
    fecha_1: '17/06', impuesto_1: 'Monotributo', periodo_1: 'Cuota mensual',     hora_1: '23:59',
    fecha_2: '18/06', impuesto_2: 'IVA',         periodo_2: 'Posición 05/2026',  hora_2: '23:59',
    fecha_3: '19/06', impuesto_3: 'SICORE',      periodo_3: 'Retenciones 05/26', hora_3: '15:00',
    fecha_4: '20/06', impuesto_4: 'Sueldos',     periodo_4: 'F.931 · 05/2026',   hora_4: '23:59',
    cta: 'Recordá agendar.',
    handle: '@mdoconsultores',
  },
  StCita: {
    copete: 'Pensamiento',
    cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores',
  },
  StCTA: {
    copete: 'Estás pensando en armar tu empresa',
    titular_1: 'Hablemos',
    titular_2: 'antes',
    titular_3: 'de firmar.',
    bajada: 'Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo.',
    canal_1_label: 'Web',      canal_1_valor: 'mdo-consultores.com.ar',
    canal_2_label: 'WhatsApp', canal_2_valor: '+54 11 4000 0000',
    canal_3_label: 'Email',    canal_3_valor: 'contacto@mdo-consultores.com.ar',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { StVencimientos, StCita, StCTA, EXAMPLES_STORY });

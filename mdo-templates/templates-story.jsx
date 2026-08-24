// templates-story.jsx — 3 plantillas Story (9:16) para MDO. CORREGIDO.
// Artboard 480×853 (IG = 1080×1920).
//
// Correcciones respecto de la versión anterior (mismos IDs y slots):
//   · ZONA SEGURA: el padding era 40 en todos los lados, pero Instagram tapa
//     ~111 px arriba y ~147 px abajo (en unidades de diseño) con su propia
//     interfaz — el lockup y el pie quedaban debajo de los botones de IG.
//     Ahora el padding es 120 arriba y 155 abajo. Verificable con ?safe=1.
//   · st-07 y st-09 tenían un <div style={{flex:1}}/> que abría un hueco muerto.
//   · Titulares de 70px / 92px / 52px fijos que desbordaban con textos largos
//     → fitSize().
//   · Pies unificados con HandleFooter.
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

// Padding de zona segura para stories (base 480×853)
const ST_PAD = '120px 40px 155px';

// ── st-07 · Vencimientos de la semana ───────────────────────────────
// Slots: COPETE, SEMANA, FECHA_1..4, IMPUESTO_1..4, PERIODO_1..4, HORA_1..4, CTA, HANDLE
function StVencimientos(props) {
  const p = Object.assign({
    copete: '[COPETE]', semana: '[SEMANA]',
    fecha_1: '[FECHA_1]', impuesto_1: '[IMPUESTO_1]', periodo_1: '[PERIODO_1]', hora_1: '[HORA_1]',
    fecha_2: '[FECHA_2]', impuesto_2: '[IMPUESTO_2]', periodo_2: '[PERIODO_2]', hora_2: '[HORA_2]',
    fecha_3: '[FECHA_3]', impuesto_3: '[IMPUESTO_3]', periodo_3: '[PERIODO_3]', hora_3: '[HORA_3]',
    fecha_4: '[FECHA_4]', impuesto_4: '[IMPUESTO_4]', periodo_4: '[PERIODO_4]', hora_4: '[HORA_4]',
    cta: '[CTA]', handle: '[HANDLE]', chip: 'Agenda',
  }, props);

  const items = [1, 2, 3, 4].map(i => ({
    date: p['fecha_' + i], tax: p['impuesto_' + i], period: p['periodo_' + i], due: p['hora_' + i],
  })).filter(it => it.date && it.tax);

  const sSize = fitSize(p.semana, [[16, 60], [24, 50], [34, 42]], 34);

  return (
    <div className="tpl navy" style={{ padding: ST_PAD, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <div className="bg-grid-navy" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TplHeader chip={p.chip} mode="light" size={24} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: sSize, color: 'var(--paper)',
          lineHeight: 1.0 }}>
          <em>{p.semana}</em>
        </div>

        <div style={{ marginTop: 30 }}>
          <div className="hair" style={{ background: 'rgba(247,249,252,0.30)' }}></div>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr 64px',
              alignItems: 'center', gap: 8, padding: '15px 0',
              borderBottom: '1px solid rgba(247,249,252,0.20)' }}>
              <div style={{ fontFamily: 'var(--font-accent)', fontSize: 13.5,
                letterSpacing: '0.06em', color: 'var(--blue-lt)', fontWeight: 500 }}>{it.date}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, fontWeight: 600,
                  color: 'var(--paper)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{it.tax}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5,
                  color: 'rgba(247,249,252,0.62)', marginTop: 2 }}>{it.period}</div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11.5,
                letterSpacing: '0.04em', color: 'rgba(247,249,252,0.62)',
                whiteSpace: 'nowrap' }}>{it.due} h</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="display-serif" style={{ fontSize: 26, color: 'var(--blue-lt)' }}>
          <em>{p.cta}</em>
        </div>
        <HandleFooter handle={p.handle} mode="light" style={{ marginTop: 16 }} />
      </div>
    </div>
  );
}

// ── st-08 · Cita vertical ───────────────────────────────────────────
// Slots: COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE
function StCita(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 52], [95, 44], [140, 37]], 30);

  return (
    <div className="tpl" style={{ padding: ST_PAD, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="chip">Pensamiento</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative' }}>
        <div className="quote-mark" style={{ fontSize: 180, color: 'var(--blue-pale)',
          position: 'absolute', top: -50, left: -10, zIndex: 0 }}>“</div>

        <div className="eyebrow" style={{ marginBottom: 26, position: 'relative' }}>{p.copete}</div>

        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--navy-ink)',
          position: 'relative', lineHeight: 1.08 }}>
          <em>{p.cita}</em>
        </div>

        <div style={{ marginTop: 32, display: 'flex', alignItems: 'flex-start', gap: 12,
          position: 'relative' }}>
          <span style={{ display: 'inline-block', width: 36, height: 1, background: 'var(--navy)',
            marginTop: 9, flexShrink: 0 }}></span>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              color: 'var(--navy-ink)' }}>{p.autor}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--ink-55)', marginTop: 2 }}>{p.rol_autor}</div>
          </div>
        </div>
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── st-09 · CTA / Consultanos ───────────────────────────────────────
// Slots: COPETE, TITULAR_1..3, BAJADA, CANAL_1..3_LABEL/VALOR, HANDLE
function StCTA(props) {
  const p = Object.assign({
    copete: '[COPETE]', titular_1: '[TITULAR_1]', titular_2: '[TITULAR_2]',
    titular_3: '[TITULAR_3]', bajada: '[BAJADA]',
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

  // El titular son tres líneas: el cuerpo lo manda la línea más larga
  const maxLen = Math.max(
    String(p.titular_1).length, String(p.titular_2).length, String(p.titular_3).length);
  const hSize = fitSize('x'.repeat(maxLen), [[9, 70], [13, 56], [19, 44]], 36);
  const bSize = fitSize(p.bajada, [[95, 16], [140, 14.5]], 13.5);

  return (
    <div className="tpl" style={{ padding: ST_PAD, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="chip">Consultanos</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>{p.copete}</div>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: hSize, fontWeight: 700,
          color: 'var(--navy-ink)', letterSpacing: '-0.025em', lineHeight: 0.98 }}>
          {p.titular_1}
        </div>
        <div className="display-serif" style={{ fontSize: Math.round(hSize * 1.28),
          color: 'var(--blue-mid)', lineHeight: 0.92 }}>
          <em>{p.titular_2}</em>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: hSize, fontWeight: 700,
          color: 'var(--navy-ink)', letterSpacing: '-0.025em', lineHeight: 0.98 }}>
          {p.titular_3}
        </div>

        <div className="lede" style={{ marginTop: 24, fontSize: bSize, maxWidth: '90%' }}>
          {p.bajada}
        </div>
      </div>

      <div>
        <div style={{ background: 'var(--navy)', color: 'var(--paper)', padding: '20px 22px' }}>
          {channels.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', gap: 12, padding: '9px 0',
              borderBottom: i < channels.length - 1 ? '1px solid rgba(247,249,252,0.20)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10, letterSpacing: '0.16em',
                color: 'var(--blue-lt)', textTransform: 'uppercase', flexShrink: 0 }}>{c.label}</span>
              <span className="truncate" style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                fontWeight: 500, textAlign: 'right' }}>{c.value}</span>
            </div>
          ))}
        </div>
        <HandleFooter handle={p.handle} style={{ marginTop: 14 }} />
      </div>
    </div>
  );
}

const EXAMPLES_STORY = {
  StVencimientos: {
    copete: 'Agenda · Semana del',
    semana: '16 al 20 · Junio',
    chip: 'Agenda · JUN',
    fecha_1: '17/06', impuesto_1: 'Monotributo', periodo_1: 'Cuota mensual',     hora_1: '23:59',
    fecha_2: '18/06', impuesto_2: 'IVA',         periodo_2: 'Posición 05/2026',  hora_2: '23:59',
    fecha_3: '19/06', impuesto_3: 'SiCoRe',      periodo_3: 'Retenciones 05/26', hora_3: '15:00',
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
    canal_2_label: 'WhatsApp', canal_2_valor: '+54 11 4406-7354',
    canal_3_label: 'Email',    canal_3_valor: 'info@mdo-consultores.com.ar',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { StVencimientos, StCita, StCTA, EXAMPLES_STORY });

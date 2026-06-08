// templates-news.jsx — 2 news post templates for the Gmail-newsletter automation.
// 12 — Square noticia (1080×1080, base 540×540)
// 13 — Portrait noticia (1080×1350, base 540×675)
// Both default to [PLACEHOLDER] literals; EXAMPLES_NEWS has realistic data.

// ─────────────────────────────────────────────────────────────────────
// 12 — Noticia · Square (single news post, compact)
// Slots:
//   CATEGORIA  — eyebrow (e.g. "Impuestos · AFIP")
//   TITULAR    — headline (3-5 lines max)
//   BAJADA     — 1-2 line summary (optional but recommended)
//   FUENTE     — source medium (e.g. "Cronista", "Infobae")
//   FECHA      — publication date (e.g. "19 jun 2026")
//   HANDLE
// ─────────────────────────────────────────────────────────────────────
function SqNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]',
    titular: '[TITULAR]',
    bajada: '[BAJADA]',
    fuente: '[FUENTE]',
    fecha: '[FECHA]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl" style={{ padding: 54, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)', position: 'relative' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="chip">Noticia</div>
      </div>

      {/* Category line under header */}
      <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--blue-mid)' }}></span>
        <span className="eyebrow">{p.categoria}</span>
      </div>

      {/* Main: title + summary */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingRight: 8 }}>
        <div className="display" style={{ fontSize: 34, fontWeight: 700, color: 'var(--navy-ink)',
          letterSpacing: '-0.018em', lineHeight: 1.1 }}>
          {p.titular}
        </div>
        <div className="lede" style={{ marginTop: 16, fontSize: 14.5, maxWidth: '94%' }}>
          {p.bajada}
        </div>
      </div>

      {/* Source attribution row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 18,
        borderTop: '1px solid var(--hair)' }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.18em',
          color: 'var(--ink-55)', textTransform: 'uppercase' }}>Fuente</span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600,
          color: 'var(--navy)' }}>{p.fuente}</span>
        <span style={{ flex: 1 }}></span>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.08em',
          color: 'var(--ink-55)' }}>{p.fecha}</span>
      </div>

      <div className="footer-row" style={{ marginTop: 12 }}>
        <span>{p.handle}</span>
        <span>mdo-consultores.com.ar</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 13 — Noticia · Portrait (single news post, expanded with MDO take)
// Slots:
//   CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE
//   QUE_SABER_LABEL — label on the take callout (e.g. "Qué tenés que saber")
//   QUE_SABER       — MDO's take, 1-2 short sentences
// ─────────────────────────────────────────────────────────────────────
function PoNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]',
    titular: '[TITULAR]',
    bajada: '[BAJADA]',
    fuente: '[FUENTE]',
    fecha: '[FECHA]',
    que_saber_label: '[QUE_SABER_LABEL]',
    que_saber: '[QUE_SABER]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl" style={{ padding: 54, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <div className="chip">Noticia · MDO</div>
      </div>

      {/* Category */}
      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--blue-mid)' }}></span>
        <span className="eyebrow">{p.categoria}</span>
      </div>

      {/* Title */}
      <div className="display" style={{ marginTop: 14, fontSize: 38, fontWeight: 700, color: 'var(--navy-ink)',
        letterSpacing: '-0.02em', lineHeight: 1.08 }}>
        {p.titular}
      </div>

      {/* Lead paragraph */}
      <div className="lede" style={{ marginTop: 18, fontSize: 15.5, maxWidth: '96%' }}>
        {p.bajada}
      </div>

      <div style={{ flex: 1 }}></div>

      {/* MDO take — call-out box, navy with paper text */}
      <div style={{ marginTop: 22, marginBottom: 18, padding: '18px 22px',
        background: 'var(--navy)', color: 'var(--paper)', borderRadius: 2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
          <span className="asterisk" style={{ fontSize: 22, color: 'var(--blue-lt)', fontStyle: 'italic',
            fontFamily: 'Instrument Serif, serif' }}>*</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--blue-lt)' }}>{p.que_saber_label}</span>
        </div>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 22,
          lineHeight: 1.22, color: 'var(--paper)' }}>
          {p.que_saber}
        </div>
      </div>

      {/* Source row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 14,
        borderTop: '1px solid var(--hair)' }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.18em',
          color: 'var(--ink-55)', textTransform: 'uppercase' }}>Fuente</span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600,
          color: 'var(--navy)' }}>{p.fuente}</span>
        <span style={{ flex: 1 }}></span>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.08em',
          color: 'var(--ink-55)' }}>{p.fecha}</span>
      </div>

      <div className="footer-row" style={{ marginTop: 12 }}>
        <span>{p.handle}</span>
        <span>mdo-consultores.com.ar</span>
      </div>
    </div>
  );
}

const EXAMPLES_NEWS = {
  SqNoticia: {
    categoria: 'Impuestos · AFIP',
    titular: 'AFIP extiende el plazo para presentar la DDJJ de Ganancias.',
    bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.',
    fuente: 'AFIP Comunicado oficial',
    fecha: '19 jun 2026',
    handle: '@mdoconsultores',
  },
  PoNoticia: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios.',
    bajada: 'A partir del 1° de julio, las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties. Antes el acceso era a 90 días con autorización previa.',
    que_saber_label: 'Qué tenés que saber',
    que_saber: 'Si pagás servicios al exterior, conviene anticipar las facturas de julio para entrar al nuevo plazo más corto.',
    fuente: 'BCRA · Comunicación "A" 7984',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { SqNoticia, PoNoticia, EXAMPLES_NEWS });

// templates-variants-light.jsx — light/white-bg variants prioritising minimal
// editorial compositions. All use [PLACEHOLDER] literals; EXAMPLES_VARIANTS_LIGHT
// provides preview data for the canvas.

// ─────────────────────────────────────────────────────────────────────
// sq-01b — SqVencimientoLight
// Vencimiento en papel (light) — contraparte de sq-01 navy
// ─────────────────────────────────────────────────────────────────────
function SqVencimientoLight(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    dia: '[DIA]',
    mes: '[MES]',
    anio: '[ANIO]',
    impuesto: '[IMPUESTO]',
    descripcion: '[DESCRIPCION_VENC]',
    horario: '[HORARIO]',
    chip_mes: '[CHIP_MES]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <div className="chip">{p.chip_mes}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 22 }}>{p.copete}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 14 }}>
          <div className="number-xl" style={{ fontSize: 180, color: 'var(--navy)' }}>{p.dia}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 14, letterSpacing: '0.22em',
              color: 'var(--blue-mid)', fontWeight: 500 }}>{p.mes}</div>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
              color: 'var(--ink-55)' }}>{p.anio}</div>
          </div>
        </div>

        <div className="hair-navy" style={{ margin: '6px 0 18px' }}></div>

        <div className="display" style={{ fontSize: 56, color: 'var(--navy-ink)', fontWeight: 600, marginBottom: 10 }}>
          {p.impuesto}
        </div>
        <div className="lede" style={{ fontSize: 16, maxWidth: '85%' }}>{p.descripcion}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
          <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
            background: 'var(--blue-mid)' }}></span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11.5, letterSpacing: '0.1em',
            color: 'var(--blue-mid)' }}>{p.horario}</span>
        </div>
      </div>

      <div className="footer-row">
        <span>{p.handle}</span>
        <span>mdo-consultores.com.ar</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// sq-02c — SqCitaMinimal
// Cita pura blanco, sin comilla decorativa, tipografía única
// ─────────────────────────────────────────────────────────────────────
function SqCitaMinimal(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    cita: '[CITA]',
    autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl white" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="mono">Reflexión</div>
      </div>

      <div className="hair" style={{ marginTop: 32 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 20, color: 'var(--ink-55)' }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: 40, color: 'var(--navy-ink)', lineHeight: 1.12 }}>
          <em>{p.cita}</em>
        </div>
      </div>

      <div className="hair" style={{ marginBottom: 18 }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12.5, fontWeight: 600,
            color: 'var(--navy-ink)' }}>{p.autor}</div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.12em',
            color: 'var(--ink-55)', marginTop: 3, textTransform: 'uppercase' }}>{p.rol_autor}</div>
        </div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em',
          color: 'var(--ink-55)' }}>{p.handle}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// sq-03c — SqNumeroLight
// Número en blanco puro, sans light grande, sin tint
// ─────────────────────────────────────────────────────────────────────
function SqNumeroLight(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    numero: '[NUMERO]',
    unidad: '[UNIDAD]',
    descripcion: '[DESCRIPCION]',
    pie: '[PIE]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <div className="mono">{p.pie}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{p.copete}</div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 22 }}>
          <div className="number-xl" style={{ fontSize: 200, color: 'var(--navy)' }}>{p.numero}</div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 170,
            paddingBottom: 14 }}>
            <div className="display-serif" style={{ fontSize: 44, color: 'var(--blue-mid)' }}>
              <em>{p.unidad}</em>
            </div>
          </div>
        </div>

        <div className="hair" style={{ width: 64, marginBottom: 18 }}></div>

        <div className="lede" style={{ fontSize: 17, maxWidth: '90%' }}>{p.descripcion}</div>
      </div>

      <div className="footer-row">
        <span>{p.handle}</span>
        <span>mdo-consultores.com.ar</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// sq-12c — SqNoticiaMinimal
// Noticia square pura blanca, ultra clean, sin chip, tipografía protagonista
// ─────────────────────────────────────────────────────────────────────
function SqNoticiaMinimal(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]',
    titular: '[TITULAR]',
    bajada: '[BAJADA]',
    fuente: '[FUENTE]',
    fecha: '[FECHA]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Lockup size={22} />
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div className="hair-navy" style={{ marginTop: 24, marginBottom: 24 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="display" style={{ fontSize: 34, fontWeight: 700, color: 'var(--navy-ink)',
          letterSpacing: '-0.018em', lineHeight: 1.1 }}>
          {p.titular}
        </div>
        <div className="lede" style={{ marginTop: 16, fontSize: 15, maxWidth: '94%' }}>
          {p.bajada}
        </div>
      </div>

      <div className="hair" style={{ marginTop: 20, marginBottom: 14 }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600,
          color: 'var(--navy)' }}>{p.fuente}</span>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.1em',
          color: 'var(--ink-55)' }}>{p.fecha} · {p.handle}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-06b — PoEquipoNoPhoto
// Voz experta sin foto — papel bg, serif italic grande del nombre
// ─────────────────────────────────────────────────────────────────────
function PoEquipoNoPhoto(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    nombre: '[NOMBRE]',
    rol: '[ROL]',
    bio: '[BIO]',
    tag_1: '[TAG_1]',
    tag_2: '[TAG_2]',
    tag_3: '[TAG_3]',
    tag_4: '[TAG_4]',
    handle: '[HANDLE]',
  }, props);

  const tags = [p.tag_1, p.tag_2, p.tag_3, p.tag_4].filter(Boolean);

  return (
    <div className="tpl white" style={{ padding: 40, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <span className="chip">{p.copete}</span>
      </div>

      <div style={{ marginTop: 50 }}>
        <div className="display-serif" style={{ fontSize: 62, color: 'var(--navy-ink)', lineHeight: 0.95 }}>
          <em>{p.nombre}</em>
        </div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, letterSpacing: '0.2em',
          color: 'var(--blue-mid)', textTransform: 'uppercase', fontWeight: 500, marginTop: 14 }}>
          {p.rol}
        </div>
      </div>

      <div className="hair-navy" style={{ width: 56, marginTop: 28, marginBottom: 22 }}></div>

      <div className="lede" style={{ fontSize: 16, lineHeight: 1.5, flex: 1 }}>{p.bio}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
        {tags.map((a, i) => (
          <span key={i} style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.1em',
            padding: '4px 8px', border: '1px solid var(--hair-2)', borderRadius: 2,
            textTransform: 'uppercase', color: 'var(--navy)' }}>{a}</span>
        ))}
      </div>

      <div className="footer-row" style={{ marginTop: 16 }}>
        <span>{p.handle}</span>
        <span>Equipo · MDO</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-13c — PoNoticiaMinimal
// Noticia portrait en blanco puro, sin "take MDO" — para noticias neutras
// ─────────────────────────────────────────────────────────────────────
function PoNoticiaMinimal(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]',
    titular: '[TITULAR]',
    bajada: '[BAJADA]',
    cierre: '[CIERRE]',
    fuente: '[FUENTE]',
    fecha: '[FECHA]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl white" style={{ padding: 56, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Lockup size={26} />
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div className="hair-navy" style={{ marginTop: 26, marginBottom: 30 }}></div>

      <div className="display" style={{ fontSize: 42, fontWeight: 700, color: 'var(--navy-ink)',
        letterSpacing: '-0.02em', lineHeight: 1.05 }}>
        {p.titular}
      </div>

      <div className="lede" style={{ marginTop: 22, fontSize: 16, maxWidth: '96%' }}>
        {p.bajada}
      </div>

      <div style={{ flex: 1 }}></div>

      {/* Tipographic closing in serif italic */}
      <div className="display-serif" style={{ fontSize: 22, color: 'var(--blue-mid)', lineHeight: 1.25,
        marginTop: 24, marginBottom: 22, maxWidth: '88%' }}>
        <em>{p.cierre}</em>
      </div>

      <div className="hair" style={{ marginBottom: 14 }}></div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.18em',
            color: 'var(--ink-55)', textTransform: 'uppercase' }}>Fuente</span>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600,
            color: 'var(--navy)' }}>{p.fuente}</span>
        </div>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.08em',
          color: 'var(--ink-55)' }}>{p.fecha} · {p.handle}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// st-07b — StVencimientosLight
// Vencimientos semana en papel — contraparte de st-07 navy
// ─────────────────────────────────────────────────────────────────────
function StVencimientosLight(props) {
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

  const items = [1, 2, 3, 4].map(i => ({
    date: p['fecha_' + i], tax: p['impuesto_' + i], period: p['periodo_' + i], due: p['hora_' + i],
  })).filter(it => it.date && it.tax);

  return (
    <div className="tpl white" style={{ padding: 40, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="chip">Agenda · JUN</div>
      </div>

      <div style={{ marginTop: 50 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: 70, color: 'var(--navy-ink)' }}>
          <em>{p.semana}</em>
        </div>
      </div>

      <div style={{ marginTop: 42, display: 'flex', flexDirection: 'column' }}>
        <div className="hair-navy"></div>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '78px 1fr 80px',
            alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--hair)' }}>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 14, letterSpacing: '0.06em',
              color: 'var(--blue-mid)', fontWeight: 500 }}>{it.date}</div>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 19, fontWeight: 600,
                color: 'var(--navy-ink)', letterSpacing: '-0.01em' }}>{it.tax}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: 'var(--ink-55)',
                marginTop: 2 }}>{it.period}</div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'Geist Mono, monospace', fontSize: 12,
              letterSpacing: '0.06em', color: 'var(--ink-55)' }}>{it.due} h</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}></div>

      <div>
        <div className="display-serif" style={{ fontSize: 28, color: 'var(--blue-mid)', marginBottom: 22 }}>
          <em>{p.cta}</em>
        </div>
        <div className="footer-row">
          <span>{p.handle}</span>
          <span>mdo-consultores.com.ar</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// st-08c — StCitaMinimal
// Cita story blanco puro, sin decoración, full tipografía
// ─────────────────────────────────────────────────────────────────────
function StCitaMinimal(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    cita: '[CITA]',
    autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl white" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={24} />
        <div className="mono">Reflexión</div>
      </div>

      <div className="hair" style={{ marginTop: 36 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 30 }}>{p.copete}</div>

        <div className="display-serif" style={{ fontSize: 54, color: 'var(--navy-ink)', lineHeight: 1.06 }}>
          <em>{p.cita}</em>
        </div>
      </div>

      <div className="hair" style={{ marginBottom: 22 }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600,
            color: 'var(--navy-ink)' }}>{p.autor}</div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.14em',
            color: 'var(--ink-55)', marginTop: 4, textTransform: 'uppercase' }}>{p.rol_autor}</div>
        </div>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.08em',
          color: 'var(--ink-55)' }}>{p.handle}</span>
      </div>
    </div>
  );
}

const EXAMPLES_VARIANTS_LIGHT = {
  SqVencimientoLight: { ...EXAMPLES_SQUARE.SqVencimiento },
  SqCitaMinimal: { ...EXAMPLES_SQUARE.SqCita },
  SqNumeroLight: { ...EXAMPLES_SQUARE.SqNumero },
  SqNoticiaMinimal: { ...EXAMPLES_NEWS.SqNoticia },
  PoEquipoNoPhoto: {
    copete: 'Voz experta',
    nombre: 'Lucía Martínez',
    rol: 'Socia · Impuestos',
    bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual — AFIP cruza CBU, MercadoPago y tarjetas en la misma consulta.',
    tag_1: 'Ganancias', tag_2: 'IVA', tag_3: 'Bienes personales', tag_4: 'Fiscalizaciones AFIP',
    handle: '@mdoconsultores',
  },
  PoNoticiaMinimal: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios.',
    bajada: 'A partir del 1° de julio, las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.',
    cierre: 'Una medida que acompaña la apertura gradual del mercado de cambios.',
    fuente: 'BCRA · Comunicación "A" 7984',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores',
  },
  StVencimientosLight: { ...EXAMPLES_STORY.StVencimientos },
  StCitaMinimal: { ...EXAMPLES_STORY.StCita },
};

Object.assign(window, {
  SqVencimientoLight, SqCitaMinimal, SqNumeroLight, SqNoticiaMinimal,
  PoEquipoNoPhoto, PoNoticiaMinimal,
  StVencimientosLight, StCitaMinimal,
  EXAMPLES_VARIANTS_LIGHT,
});

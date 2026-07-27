// templates-variants-light.jsx — variantes light / minimal. CORREGIDO.
// Mismos IDs y slots que la versión anterior.
//
// Correcciones:
//   · po-13c era la plantilla que generó las placas de junio con el hueco
//     vertical: tenía un <div style={{flex:1}}/> que empujaba el título arriba
//     y el cierre abajo. Ahora el contenido es un único grupo centrado.
//     (Para las noticias nuevas conviene usar po-13d de templates-noticia-v2.jsx.)
//   · st-07b tenía el mismo flex:1 suelto.
//   · st-07b y st-08c: padding 40/50 dejaba el lockup y el pie DEBAJO de la
//     interfaz de Instagram. Ahora usan el padding de zona segura.
//   · Titulares y números fijos (180, 200, 70, 62, 54, 42, 40, 34 px) → fitSize().
//   · sq-03c: se eliminó el hack de height:170 para alinear la unidad.
//   · sq-12c y po-13c apretaban fecha y handle en un mismo texto; ahora van
//     en filas separadas (SourceFooter + HandleFooter).
//   · Ejemplos: "AFIP" → "ARCA".
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

const ST_PAD_L = '120px 40px 155px';

// ── sq-01b · Vencimiento en papel ───────────────────────────────────
function SqVencimientoLight(props) {
  const p = Object.assign({
    copete: '[COPETE]', dia: '[DIA]', mes: '[MES]', anio: '[ANIO]',
    impuesto: '[IMPUESTO]', descripcion: '[DESCRIPCION_VENC]', horario: '[HORARIO]',
    chip_mes: '[CHIP_MES]', handle: '[HANDLE]',
  }, props);

  const dSize = fitSize(p.dia, [[2, 180], [3, 140]], 108);
  const iSize = fitSize(p.impuesto, [[6, 58], [13, 46], [22, 36]], 30);
  const descSize = fitSize(p.descripcion, [[46, 16], [70, 14.5]], 13.5);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.chip_mes} size={26} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>{p.copete}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12 }}>
          <div className="number-xl" style={{ fontSize: dSize, color: 'var(--navy)' }}>{p.dia}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 14, letterSpacing: '0.22em',
              color: 'var(--blue-mid)', fontWeight: 500 }}>{p.mes}</div>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
              color: 'var(--ink-55)' }}>{p.anio}</div>
          </div>
        </div>

        <div className="hair-navy" style={{ margin: '6px 0 16px' }}></div>

        <div className="display" style={{ fontSize: iSize, color: 'var(--navy-ink)', fontWeight: 600,
          marginBottom: 10, lineHeight: 1.05 }}>
          {p.impuesto}
        </div>
        <div className="lede" style={{ fontSize: descSize, maxWidth: '88%' }}>{p.descripcion}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
            background: 'var(--blue-mid)', flexShrink: 0 }}></span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11.5, letterSpacing: '0.1em',
            color: 'var(--blue-mid)' }}>{p.horario}</span>
        </div>
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── sq-02c · Cita minimal ───────────────────────────────────────────
function SqCitaMinimal(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 40], [95, 34], [140, 29]], 25);

  return (
    <div className="tpl white" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup size={24} />
        <div className="mono" style={{ whiteSpace: 'nowrap' }}>Reflexión</div>
      </div>

      <div className="hair" style={{ marginTop: 28 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 18, color: 'var(--ink-55)' }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--navy-ink)',
          lineHeight: 1.14 }}>
          <em>{p.cita}</em>
        </div>
      </div>

      <div className="hair" style={{ marginBottom: 16 }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12.5, fontWeight: 700,
            color: 'var(--navy-ink)' }}>{p.autor}</div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.12em',
            color: 'var(--ink-55)', marginTop: 3, textTransform: 'uppercase' }}>{p.rol_autor}</div>
        </div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em',
          color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{p.handle}</div>
      </div>
    </div>
  );
}

// ── sq-03c · Número en blanco puro ──────────────────────────────────
function SqNumeroLight(props) {
  const p = Object.assign({
    copete: '[COPETE]', numero: '[NUMERO]', unidad: '[UNIDAD]',
    descripcion: '[DESCRIPCION]', pie: '[PIE]', handle: '[HANDLE]',
  }, props);

  const nSize = fitSize(p.numero, [[2, 200], [3, 172], [4, 142]], 116);
  const uSize = Math.round(nSize * 0.22 + 22);
  const dSize = fitSize(p.descripcion, [[70, 17], [110, 15.5]], 14);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup size={26} />
        <div className="mono" style={{ whiteSpace: 'nowrap' }}>{p.pie}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{p.copete}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <div className="number-xl" style={{ fontSize: nSize, color: 'var(--navy)' }}>{p.numero}</div>
          <div className="display-serif" style={{ fontSize: uSize, color: 'var(--blue-mid)' }}>
            <em>{p.unidad}</em>
          </div>
        </div>

        <div className="hair" style={{ width: 64, marginBottom: 18 }}></div>

        <div className="lede" style={{ fontSize: dSize, maxWidth: '90%' }}>{p.descripcion}</div>
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── sq-12c · Noticia square minimal ─────────────────────────────────
function SqNoticiaMinimal(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[30, 38], [46, 33], [66, 28]], 24);
  const bSize = fitSize(p.bajada, [[80, 15], [130, 13.5]], 12.5);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <Lockup size={22} />
        <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{p.categoria}</span>
      </div>

      <div className="hair-navy" style={{ marginTop: 22, marginBottom: 22 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--navy-ink)',
          letterSpacing: '-0.018em', lineHeight: 1.1 }}>
          {p.titular}
        </div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '94%' }}>
          {p.bajada}
        </div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} />
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-06b · Voz experta sin foto ───────────────────────────────────
function PoEquipoNoPhoto(props) {
  const p = Object.assign({
    copete: '[COPETE]', nombre: '[NOMBRE]', rol: '[ROL]', bio: '[BIO]',
    tag_1: '[TAG_1]', tag_2: '[TAG_2]', tag_3: '[TAG_3]', tag_4: '[TAG_4]',
    handle: '[HANDLE]',
  }, props);

  const tags = [p.tag_1, p.tag_2, p.tag_3, p.tag_4].filter(Boolean);
  const nSize = fitSize(p.nombre, [[16, 62], [26, 50], [36, 41]], 34);
  const bioSize = fitSize(p.bio, [[150, 16], [220, 14.5]], 13.5);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={26} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="display-serif" style={{ fontSize: nSize, color: 'var(--navy-ink)',
          lineHeight: 0.98 }}>
          <em>{p.nombre}</em>
        </div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, letterSpacing: '0.2em',
          color: 'var(--blue-mid)', textTransform: 'uppercase', fontWeight: 500, marginTop: 14 }}>
          {p.rol}
        </div>

        <div className="hair-navy" style={{ width: 56, marginTop: 26, marginBottom: 22 }}></div>

        <div className="lede" style={{ fontSize: bioSize, lineHeight: 1.5 }}>{p.bio}</div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
        {tags.map((a, i) => (
          <span key={i} style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10,
            letterSpacing: '0.1em', padding: '4px 8px', border: '1px solid var(--hair-2)',
            textTransform: 'uppercase', color: 'var(--navy)', whiteSpace: 'nowrap' }}>{a}</span>
        ))}
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-13c · Noticia portrait minimal ───────────────────────────────
function PoNoticiaMinimal(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    cierre: '[CIERRE]', fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[34, 44], [52, 38], [72, 33]], 28);
  const bSize = fitSize(p.bajada, [[90, 16], [140, 14.5]], 13.5);
  const cSize = fitSize(p.cierre, [[55, 23], [95, 20]], 18);

  return (
    <div className="tpl white" style={{ padding: 52, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <Lockup size={26} />
        <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{p.categoria}</span>
      </div>

      <div className="hair-navy" style={{ marginTop: 22 }}></div>

      {/* Antes: título arriba, flex:1, cierre abajo → hueco muerto en el medio */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--navy-ink)',
          letterSpacing: '-0.02em', lineHeight: 1.07 }}>
          {p.titular}
        </div>

        <div className="lede" style={{ marginTop: 18, fontSize: bSize, maxWidth: '96%' }}>
          {p.bajada}
        </div>

        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--blue-mid)',
          lineHeight: 1.25, marginTop: 26, maxWidth: '90%' }}>
          <em>{p.cierre}</em>
        </div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} />
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── st-07b · Vencimientos story en papel ────────────────────────────
function StVencimientosLight(props) {
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
    <div className="tpl white" style={{ padding: ST_PAD_L, display: 'flex',
      flexDirection: 'column', overflow: 'hidden' }}>
      <TplHeader chip={p.chip} size={24} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: sSize, color: 'var(--navy-ink)',
          lineHeight: 1.0 }}>
          <em>{p.semana}</em>
        </div>

        <div style={{ marginTop: 30 }}>
          <div className="hair-navy"></div>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr 64px',
              alignItems: 'center', gap: 8, padding: '15px 0',
              borderBottom: '1px solid var(--hair)' }}>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13.5,
                letterSpacing: '0.06em', color: 'var(--blue-mid)', fontWeight: 500 }}>{it.date}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 600,
                  color: 'var(--navy-ink)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{it.tax}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11.5,
                  color: 'var(--ink-55)', marginTop: 2 }}>{it.period}</div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'Geist Mono, monospace', fontSize: 11.5,
                letterSpacing: '0.04em', color: 'var(--ink-55)',
                whiteSpace: 'nowrap' }}>{it.due} h</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="display-serif" style={{ fontSize: 26, color: 'var(--blue-mid)' }}>
          <em>{p.cta}</em>
        </div>
        <HandleFooter handle={p.handle} style={{ marginTop: 16 }} />
      </div>
    </div>
  );
}

// ── st-08c · Cita story minimal ─────────────────────────────────────
function StCitaMinimal(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 54], [95, 45], [140, 38]], 31);

  return (
    <div className="tpl white" style={{ padding: ST_PAD_L, display: 'flex',
      flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup size={24} />
        <div className="mono" style={{ whiteSpace: 'nowrap' }}>Reflexión</div>
      </div>

      <div className="hair" style={{ marginTop: 30 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 26 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--navy-ink)',
          lineHeight: 1.08 }}>
          <em>{p.cita}</em>
        </div>
      </div>

      <div className="hair" style={{ marginBottom: 20 }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700,
            color: 'var(--navy-ink)' }}>{p.autor}</div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.14em',
            color: 'var(--ink-55)', marginTop: 4, textTransform: 'uppercase' }}>{p.rol_autor}</div>
        </div>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.08em',
          color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{p.handle}</span>
      </div>
    </div>
  );
}

const EXAMPLES_VARIANTS_LIGHT = {
  SqVencimientoLight: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqVencimiento),
  SqCitaMinimal: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqCita),
  SqNumeroLight: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqNumero),
  SqNoticiaMinimal: {
    categoria: 'Impuestos · ARCA',
    titular: 'ARCA extiende el plazo para presentar Ganancias',
    bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.',
    fuente: 'ARCA · Comunicado oficial',
    fecha: '19 jun 2026',
    handle: '@mdoconsultores',
  },
  PoEquipoNoPhoto: {
    copete: 'Voz experta',
    nombre: 'Lucía Martínez',
    rol: 'Socia · Impuestos',
    bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual — ARCA cruza CBU, billeteras y tarjetas en la misma consulta.',
    tag_1: 'Ganancias', tag_2: 'IVA', tag_3: 'Bienes personales', tag_4: 'Fiscalizaciones ARCA',
    handle: '@mdoconsultores',
  },
  PoNoticiaMinimal: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios',
    bajada: 'A partir del 1° de julio, las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.',
    cierre: 'Una medida que acompaña la apertura gradual del mercado de cambios.',
    fuente: 'BCRA · Comunicación "A" 7984',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores',
  },
  StVencimientosLight: Object.assign({}, (window.EXAMPLES_STORY || {}).StVencimientos),
  StCitaMinimal: Object.assign({}, (window.EXAMPLES_STORY || {}).StCita),
};

Object.assign(window, {
  SqVencimientoLight, SqCitaMinimal, SqNumeroLight, SqNoticiaMinimal,
  PoEquipoNoPhoto, PoNoticiaMinimal,
  StVencimientosLight, StCitaMinimal,
  EXAMPLES_VARIANTS_LIGHT,
});

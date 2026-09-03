// templates-variants-light.jsx — variantes light / minimal. MARCA v2.0.
// Va al repo como mdo-templates/templates-variants-light.jsx (reemplaza el actual).
//
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
// Regla: ARCA, nunca AFIP.
//
// LA FAMILIA «LIGHT» es la versión editorial del catálogo: fondo blanco, filete
// arriba y abajo del contenido, y el recurso tipográfico en itálica en lugar de
// número grande. Se usa cuando la semana ya tuvo dos placas navy seguidas.
//
// QUÉ CAMBIÓ — mismos IDs y mismos slots:
//   Montserrat → var(--font-body) · Instrument Serif italic → var(--font-accent)
//   oblicua · Geist Mono → var(--font-accent) versalitas · hex → variables.

// ⚠️ Zona segura para stories. NO reemplazar por un número más chico.
const ST_PAD_L = '120px 40px 155px';

// ── sq-01b · Vencimiento en papel (variante de sq-01) ───────────────
// Slots: COPETE, DIA, MES, ANIO, IMPUESTO, DESCRIPCION_VENC, HORARIO, CHIP_MES, HANDLE
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
      <TplHeader chip={p.chip_mes} size={40} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>{p.copete}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12 }}>
          <div className="number-xl" style={{ fontSize: dSize, color: 'var(--navy)' }}>{p.dia}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 14,
              letterSpacing: '0.22em', color: 'var(--blue-mid)' }}>{p.mes}</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 11,
              letterSpacing: '0.18em', color: 'var(--ink-55)' }}>{p.anio}</div>
          </div>
        </div>

        <div className="hair-navy" style={{ margin: '6px 0 16px' }}></div>

        <div className="display" style={{ fontSize: iSize, fontWeight: 600, marginBottom: 10,
          lineHeight: 1.05 }}>{p.impuesto}</div>
        <div className="lede" style={{ fontSize: descSize, maxWidth: '88%' }}>{p.descripcion}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue-mid)',
            flexShrink: 0 }}></span>
          <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 11.5,
            letterSpacing: '0.1em', color: 'var(--blue-mid)' }}>{p.horario}</span>
        </div>
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── sq-02c · Cita minimal (variante de sq-02) ───────────────────────
// Sin comilla decorativa: el filete arriba y abajo hace todo el trabajo.
// Slots: COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE
function SqCitaMinimal(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 40], [95, 34], [140, 29]], 25);

  return (
    <div className="tpl white" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup size={40} />
        <div className="mono" style={{ whiteSpace: 'nowrap' }}>Reflexión</div>
      </div>

      <div className="hair" style={{ marginTop: 28 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--ink)',
          lineHeight: 1.14 }}><em>{p.cita}</em></div>
      </div>

      <div className="hair" style={{ marginBottom: 16 }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 700,
            color: 'var(--ink)' }}>{p.autor}</div>
          <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10,
            letterSpacing: '0.12em', color: 'var(--ink-55)', marginTop: 3,
            textTransform: 'uppercase' }}>{p.rol_autor}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em',
          color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{p.handle}</div>
      </div>
    </div>
  );
}

// ── sq-03c · Número en blanco puro (variante de sq-03) ──────────────
// Número recto y unidad en itálica.
// Slots: COPETE, NUMERO, UNIDAD, DESCRIPCION, PIE, HANDLE
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
        <Lockup size={40} />
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

// ── sq-12c · Noticia square minimal (variante de sq-12) ─────────────
// Filete navy debajo del encabezado y nada más. La más sobria del catálogo.
// Slots: CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE
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
        <Lockup size={40} />
        <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{p.categoria}</span>
      </div>

      <div className="hair-navy" style={{ marginTop: 22, marginBottom: 22 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700,
          letterSpacing: '-0.018em', lineHeight: 1.1 }}>{p.titular}</div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '94%' }}>
          {p.bajada}
        </div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} />
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-13c · Noticia portrait minimal ───────────────────────────────
// ⚠️ ÉSTA es la que generó las placas de junio con el hueco vertical en el
// medio: tenía un flex:1 suelto que empujaba el título arriba y el cierre
// abajo. Ya está arreglada — el contenido es un único grupo centrado — pero
// para noticias NUEVAS conviene po-13d (templates-noticia-v2.jsx), que es la v2.
// Slots: CATEGORIA, TITULAR, BAJADA, CIERRE, FUENTE, FECHA, HANDLE
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
        <Lockup size={40} />
        <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{p.categoria}</span>
      </div>

      <div className="hair-navy" style={{ marginTop: 22 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.07 }}>{p.titular}</div>

        <div className="lede" style={{ marginTop: 18, fontSize: bSize, maxWidth: '96%' }}>
          {p.bajada}
        </div>

        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--blue-mid)',
          lineHeight: 1.25, marginTop: 26, maxWidth: '90%' }}><em>{p.cierre}</em></div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} />
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── st-08c · Cita story minimal (variante de st-08) ─────────────────
// Slots: COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE
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
        <Lockup size={40} />
        <div className="mono" style={{ whiteSpace: 'nowrap' }}>Reflexión</div>
      </div>

      <div className="hair" style={{ marginTop: 30 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 26 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--ink)',
          lineHeight: 1.08 }}><em>{p.cita}</em></div>
      </div>

      <div className="hair" style={{ marginBottom: 20 }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
            color: 'var(--ink)' }}>{p.autor}</div>
          <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10.5,
            letterSpacing: '0.14em', color: 'var(--ink-55)', marginTop: 4,
            textTransform: 'uppercase' }}>{p.rol_autor}</div>
        </div>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10.5, letterSpacing: '0.08em',
          color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{p.handle}</span>
      </div>
    </div>
  );
}

const EXAMPLES_VARIANTS_LIGHT = {
  SqVencimientoLight: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqVencimiento),
  SqCitaMinimal: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqCita),
  SqNumeroLight: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqNumero, { pie: 'Est. 1972' }),
  SqNoticiaMinimal: {
    categoria: 'Impuestos · ARCA',
    titular: 'ARCA extiende el plazo para presentar Ganancias',
    bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.',
    fuente: 'ARCA · Comunicado oficial', fecha: '19 jun 2026', handle: '@mdoconsultores',
  },
  PoNoticiaMinimal: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios',
    bajada: 'A partir del 1° de julio, las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.',
    cierre: 'Una medida que acompaña la apertura gradual del mercado de cambios.',
    fuente: 'BCRA · Comunicación «A» 7984', fecha: '20 jun 2026', handle: '@mdoconsultores',
  },
  StCitaMinimal: Object.assign({}, (window.EXAMPLES_STORY || {}).StCita),
};

Object.assign(window, { SqVencimientoLight, SqCitaMinimal, SqNumeroLight, SqNoticiaMinimal, PoNoticiaMinimal, StCitaMinimal, EXAMPLES_VARIANTS_LIGHT });

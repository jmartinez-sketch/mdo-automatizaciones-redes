// templates-square.jsx — 3 plantillas square (1:1) para MDO. CORREGIDO.
// Artboard 540×540 (IG = 1080×1080).
//
// Correcciones respecto de la versión anterior (mismos IDs y slots):
//   · Titulares y números con fitSize(): antes eran cuerpos fijos (56px, 180px)
//     que desbordaban con textos largos ("Ingresos Brutos" en sq-01).
//   · Pie unificado con HandleFooter (no se parte en dos líneas).
//   · sq-03: se eliminó el hack de height:170 para alinear la unidad.
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

// ── sq-01 · Vencimiento impositivo ──────────────────────────────────
// Slots: COPETE, DIA, MES, ANIO, IMPUESTO, DESCRIPCION_VENC, HORARIO, CHIP_MES, HANDLE
function SqVencimiento(props) {
  const p = Object.assign({
    copete: '[COPETE]', dia: '[DIA]', mes: '[MES]', anio: '[ANIO]',
    impuesto: '[IMPUESTO]', descripcion: '[DESCRIPCION_VENC]', horario: '[HORARIO]',
    chip_mes: '[CHIP_MES]', handle: '[HANDLE]',
  }, props);

  const dSize = fitSize(p.dia, [[2, 180], [3, 140]], 108);
  const iSize = fitSize(p.impuesto, [[6, 58], [13, 46], [22, 36]], 30);
  const descSize = fitSize(p.descripcion, [[46, 16], [70, 14.5]], 13.5);

  return (
    <div className="tpl navy" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.chip_mes} mode="light" size={26} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>{p.copete}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12 }}>
          <div className="number-xl" style={{ fontSize: dSize, color: 'var(--paper)' }}>{p.dia}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: 14, letterSpacing: '0.22em',
              color: 'var(--blue-lt)', fontWeight: 500 }}>{p.mes}</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em',
              color: 'rgba(247,249,252,0.55)' }}>{p.anio}</div>
          </div>
        </div>

        <div className="hair" style={{ margin: '6px 0 16px', background: 'rgba(247,249,252,0.30)' }}></div>

        <div className="display" style={{ fontSize: iSize, color: 'var(--paper)', fontWeight: 600,
          marginBottom: 10, lineHeight: 1.05 }}>
          {p.impuesto}
        </div>
        <div className="lede" style={{ fontSize: descSize, maxWidth: '88%' }}>{p.descripcion}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
            background: 'var(--blue-lt)', flexShrink: 0 }}></span>
          <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11.5, letterSpacing: '0.1em',
            color: 'var(--blue-lt)' }}>{p.horario}</span>
        </div>
      </div>

      <HandleFooter handle={p.handle} mode="light" />
    </div>
  );
}

// ── sq-02 · Cita / reflexión ────────────────────────────────────────
// Slots: COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE
function SqCita(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 40], [95, 34], [140, 29]], 25);

  return (
    <div className="tpl" style={{ padding: 44, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Lockup size={26} />
        <div className="quote-mark" style={{ fontSize: 96, marginTop: -16, marginRight: -6,
          color: 'var(--blue)' }}>“</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingRight: 8 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--navy-ink)',
          lineHeight: 1.14 }}>
          <em>{p.cita}</em>
        </div>
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--navy)',
            marginTop: 8, flexShrink: 0 }}></span>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
            letterSpacing: '0.04em', color: 'var(--ink)' }}>
            {p.autor}
            <div style={{ fontWeight: 400, color: 'var(--ink-55)', fontSize: 11.5, marginTop: 2,
              letterSpacing: 0 }}>{p.rol_autor}</div>
          </div>
        </div>
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── sq-03 · Número clave / stat ─────────────────────────────────────
// Slots: COPETE, NUMERO, UNIDAD, DESCRIPCION, PIE, HANDLE
function SqNumero(props) {
  const p = Object.assign({
    copete: '[COPETE]', numero: '[NUMERO]', unidad: '[UNIDAD]',
    descripcion: '[DESCRIPCION]', pie: '[PIE]', handle: '[HANDLE]',
  }, props);

  const nSize = fitSize(p.numero, [[2, 200], [3, 172], [4, 142]], 116);
  const uSize = Math.round(nSize * 0.22 + 22);
  const dSize = fitSize(p.descripcion, [[70, 17], [110, 15.5]], 14);

  return (
    <div className="tpl tint" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip="Est. 1972" size={26} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{p.copete}</div>

        {/* Alineación por baseline — sin el hack de altura fija */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <div className="number-xl" style={{ fontSize: nSize, color: 'var(--navy)' }}>{p.numero}</div>
          <div className="display-serif" style={{ fontSize: uSize, color: 'var(--blue-mid)' }}>
            <em>{p.unidad}</em>
          </div>
        </div>

        <div className="hair-navy" style={{ width: 64, marginBottom: 18 }}></div>

        <div className="lede" style={{ fontSize: dSize, maxWidth: '90%', color: 'var(--ink-70)' }}>
          {p.descripcion}
        </div>
      </div>

      <HandleFooter handle={p.handle} right={p.pie} />
    </div>
  );
}

const EXAMPLES_SQUARE = {
  SqVencimiento: {
    copete: 'Calendario ARCA · Vencimiento',
    dia: '21', mes: 'JUN', anio: '2026',
    impuesto: 'IVA',
    descripcion: 'Posición mensual · Período 05/2026',
    horario: 'Hasta las 23:59 h',
    chip_mes: 'Calendario · 06/26',
    handle: '@mdoconsultores',
  },
  SqCita: {
    copete: 'Pensamiento',
    cita: 'La planificación impositiva no es un costo, es la primera decisión estratégica del año.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores',
  },
  SqNumero: {
    copete: 'En cifras · MDO Consultores',
    numero: '+50', unidad: 'años',
    descripcion: 'acompañando empresas argentinas en la gestión impositiva, contable y previsional.',
    pie: 'Desde 1972 · Buenos Aires',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { SqVencimiento, SqCita, SqNumero, EXAMPLES_SQUARE });

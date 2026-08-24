// templates-square.jsx — placas cuadradas 1:1, MARCA v2.0 (Manual de Marca 2026).
// Va al repo como mdo-templates/templates-square.jsx (reemplaza el actual).
//
// Base 540×540 → 1080×1080. Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
//
// QUÉ CAMBIÓ respecto de la versión anterior — mismos IDs y mismos slots:
//   · Montserrat → var(--font-body) (Open Sans). El manual (pág. 15) pone
//     Open Sans en TODO, títulos incluidos.
//   · Instrument Serif italic → var(--font-accent) en oblicua (Chivo 300).
//     El manual no define serif, pero sí usa itálica.
//   · Geist Mono → var(--font-accent) en versalitas (Chivo 700). El manual
//     define dos familias y nada más: no se agrega una mono de afuera.
//   · Los hex viejos salen: todo sale de las variables del CSS v2.
//   · El lockup no baja de 40 (base 540): abajo de eso «CONSULTORES» se pierde.

// ── sq-01 · Vencimiento impositivo (navy) ───────────────────────────
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
      <TplHeader chip={p.chip_mes} mode="light" size={40} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: 18 }}>
        <span className="eyebrow" style={{ marginBottom: 20 }}>{p.copete}</span>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12 }}>
          <div className="number-xl" style={{ fontSize: dSize, color: 'var(--paper)' }}>{p.dia}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 14,
              letterSpacing: '0.22em', color: 'var(--grey)' }}>{p.mes}</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.18em',
              color: 'var(--ink-40)' }}>{p.anio}</div>
          </div>
        </div>

        <div className="hair" style={{ margin: '6px 0 16px' }}></div>

        <div className="display" style={{ fontSize: iSize, fontWeight: 700, color: 'var(--paper)',
          lineHeight: 1.05, marginBottom: 10 }}>{p.impuesto}</div>
        <div className="lede" style={{ fontSize: descSize, maxWidth: '88%' }}>{p.descripcion}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--grey)',
            flexShrink: 0 }}></span>
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11.5, letterSpacing: '0.1em',
            color: 'var(--grey)' }}>{p.horario}</span>
        </div>
      </div>

      <HandleFooter handle={p.handle} mode="light" />
    </div>
  );
}

// ── sq-02 · Cita / reflexión (blanco) ───────────────────────────────
// La comilla de apertura cuelga fuera del margen a propósito: alineación óptica.
// Slots: COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE
function SqCita(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 40], [95, 34], [140, 29]], 25);

  return (
    <div className="tpl white" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Lockup size={40} />
        <span className="quote-mark" style={{ fontSize: 96, marginTop: 4, marginRight: -6 }}>“</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingRight: 8 }}>
        <span className="eyebrow" style={{ marginBottom: 20 }}>{p.copete}</span>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--navy)',
          lineHeight: 1.14 }}><em>{p.cita}</em></div>

        <div style={{ marginTop: 26, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ width: 28, height: 1, background: 'var(--navy)', marginTop: 8,
            flexShrink: 0 }}></span>
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

// ── sq-03 · Número clave (tint) ─────────────────────────────────────
// Chivo 300, no 900: el número pesa por tamaño, no por grosor.
// Slots: COPETE, NUMERO, UNIDAD, DESCRIPCION, PIE, HANDLE
function SqNumero(props) {
  const p = Object.assign({
    copete: '[COPETE]', numero: '[NUMERO]', unidad: '[UNIDAD]',
    descripcion: '[DESCRIPCION]', pie: '[PIE]', handle: '[HANDLE]',
  }, props);

  const nSize = fitSize(p.numero, [[2, 200], [3, 172], [4, 142]], 116);
  const dSize = fitSize(p.descripcion, [[70, 17], [110, 15.5]], 14);

  return (
    <div className="tpl tint" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip="Est. 1972" size={40} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="eyebrow" style={{ marginBottom: 14 }}>{p.copete}</span>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <div className="number-xl" style={{ fontSize: nSize, color: 'var(--navy)' }}>{p.numero}</div>
          <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 300,
            fontSize: Math.round(nSize * 0.22 + 22), color: 'var(--slate)' }}>{p.unidad}</div>
        </div>

        <div className="hair-navy" style={{ width: 64, margin: '20px 0 18px' }}></div>

        <div className="lede" style={{ fontSize: dSize, maxWidth: '90%' }}>{p.descripcion}</div>
      </div>

      <HandleFooter handle={p.handle} right={p.pie} />
    </div>
  );
}

// ── sq-12 · Noticia square (la del newsletter de Gmail) ─────────────
// Margen mínimo 72: es el más alto de todo el catálogo. NO bajarlo.
// Slots: CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE
function SqNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[30, 38], [46, 33], [66, 28]], 24);
  const bSize = fitSize(p.bajada, [[80, 14.5], [130, 13.5]], 12.5);

  return (
    <div className="tpl white" style={{ padding: 72, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip="Noticia" size={40} />

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 24, height: 1, background: 'var(--blue-mid)', flexShrink: 0 }}></span>
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingRight: 8 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700,
          letterSpacing: '-0.018em', lineHeight: 1.1 }}>{p.titular}</div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '94%' }}>{p.bajada}</div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} />
      <HandleFooter handle={p.handle} style={{ marginTop: 8 }} />
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
    cita: 'La planificación impositiva no es un costo: es la primera decisión estratégica del año.',
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
  SqNoticia: {
    categoria: 'Impuestos · ARCA',
    titular: 'ARCA extiende el plazo para presentar la DDJJ de Ganancias',
    bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.',
    fuente: 'ARCA · Comunicado oficial',
    fecha: '19 jun 2026',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { SqVencimiento, SqCita, SqNumero, SqNoticia, EXAMPLES_SQUARE });

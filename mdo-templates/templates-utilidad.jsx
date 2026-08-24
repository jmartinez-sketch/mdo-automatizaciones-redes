// templates-utilidad.jsx — plantillas de servicio al seguidor, MARCA v2.0.
// Va al repo como mdo-templates/templates-utilidad.jsx (reemplaza el actual).
//
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
// Regla: ARCA, nunca AFIP.
//
// QUÉ CAMBIÓ — mismos IDs y mismos slots:
//   Montserrat → var(--font-body) · Geist Mono → var(--font-accent) versalitas
//   · hex → variables · el lockup no baja de 40.
//
// NOTA: st-10 y li-03 ya están en templates-story.jsx y templates-linkedin.jsx.
// Este archivo queda sólo con po-37 para no duplicar definiciones.

// ── po-37 · Vencimientos de la semana · versión feed ────────────────
// La de st-07 es story y se va en 24 h; ésta queda en el feed como referencia.
// Cada fila: día grande + mes en versalitas, filete vertical, impuesto y período.
// Slots: COPETE, SEMANA, DIA_1..4, MES_1..4, IMPUESTO_1..4, PERIODO_1..4, CTA, HANDLE
function PoVencimientosFeed(props) {
  const p = Object.assign({
    copete: '[COPETE]', semana: '[SEMANA]',
    dia_1: '[DIA_1]', mes_1: '[MES_1]', impuesto_1: '[IMPUESTO_1]', periodo_1: '[PERIODO_1]',
    dia_2: '[DIA_2]', mes_2: '[MES_2]', impuesto_2: '[IMPUESTO_2]', periodo_2: '[PERIODO_2]',
    dia_3: '[DIA_3]', mes_3: '[MES_3]', impuesto_3: '[IMPUESTO_3]', periodo_3: '[PERIODO_3]',
    dia_4: '[DIA_4]', mes_4: '[MES_4]', impuesto_4: '[IMPUESTO_4]', periodo_4: '[PERIODO_4]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const filas = [1, 2, 3, 4].map(i => ({
    d: p['dia_' + i], m: p['mes_' + i], t: p['impuesto_' + i], per: p['periodo_' + i],
  })).filter(f => f.d && f.t);

  return (
    <div className="tpl white" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={40} />

      <div style={{ marginTop: 24 }}>
        <div className="display" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.06,
          letterSpacing: '-0.022em' }}>
          Vencimientos<br />de la semana
        </div>
        <div style={{ marginTop: 10, fontFamily: 'var(--font-accent)', fontWeight: 700,
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--blue-mid)' }}>{p.semana}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: 6 }}>
        {filas.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 0',
            borderTop: '1px solid var(--hair)' }}>
            <div style={{ flexShrink: 0, width: 54, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 30, fontWeight: 700,
                color: 'var(--navy)', lineHeight: 1, letterSpacing: '-0.03em',
                fontVariantNumeric: 'tabular-nums' }}>{f.d}</div>
              <div style={{ marginTop: 3, fontFamily: 'var(--font-accent)', fontWeight: 700,
                fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--blue-mid)' }}>{f.m}</div>
            </div>
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--hair)',
              flexShrink: 0 }}></div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 700,
                color: 'var(--ink)', lineHeight: 1.2 }}>{f.t}</div>
              <div style={{ marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 12,
                color: 'var(--ink-55)' }}>{f.per}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 20px', background: 'var(--grey-pale)',
        border: '1px solid var(--hair)', fontFamily: 'var(--font-body)', fontSize: 13,
        fontWeight: 600, color: 'var(--navy)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 12 }}>
        <span>{p.cta}</span>
        <span style={{ color: 'var(--blue-mid)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

const EXAMPLES_UTILIDAD = {
  PoVencimientosFeed: {
    copete: 'Calendario · 07/26',
    semana: 'Semana del 20 al 24 de julio',
    dia_1: '20', mes_1: 'jul', impuesto_1: 'SiCoRe', periodo_1: 'Retenciones · 06/2026',
    dia_2: '21', mes_2: 'jul', impuesto_2: 'IVA', periodo_2: 'Posición mensual · 06/2026',
    dia_3: '22', mes_3: 'jul', impuesto_3: 'Ingresos Brutos', periodo_3: 'Convenio Multilateral · 06/2026',
    dia_4: '24', mes_4: 'jul', impuesto_4: 'Cargas sociales', periodo_4: 'F.931 · 06/2026',
    cta: 'Guardá el post para tenerlo a mano',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoVencimientosFeed, EXAMPLES_UTILIDAD });

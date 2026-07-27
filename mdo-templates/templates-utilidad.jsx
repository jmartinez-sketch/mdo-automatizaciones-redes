// templates-utilidad.jsx — 3 plantillas de servicio al seguidor (po-37, st-10, li-03).
// Requiere brand.jsx + tpl-utils.jsx. Regla: ARCA, nunca AFIP.

// ── po-37 · Vencimientos de la semana · versión feed ─────────────────
// La de st-07 es story (se va en 24 h); ésta queda en el feed como referencia.
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

  const filas = [
    { d: p.dia_1, m: p.mes_1, i: p.impuesto_1, per: p.periodo_1 },
    { d: p.dia_2, m: p.mes_2, i: p.impuesto_2, per: p.periodo_2 },
    { d: p.dia_3, m: p.mes_3, i: p.impuesto_3, per: p.periodo_3 },
    { d: p.dia_4, m: p.mes_4, i: p.impuesto_4, per: p.periodo_4 },
  ];

  return (
    <div className="tpl white" style={{ padding: 50, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={26} />

      <div style={{ marginTop: 24 }}>
        <div className="display" style={{ fontSize: 36, fontWeight: 700, color: 'var(--navy-ink)',
          lineHeight: 1.06, letterSpacing: '-0.022em' }}>
          Vencimientos<br />de la semana
        </div>
        <div style={{ marginTop: 10, fontFamily: 'Geist Mono, monospace', fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-mid)' }}>
          {p.semana}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: 6 }}>
        {filas.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 0',
            borderTop: '1px solid var(--hair)' }}>
            <div style={{ flexShrink: 0, width: 54, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 30, fontWeight: 700,
                color: 'var(--navy)', lineHeight: 1, letterSpacing: '-0.03em',
                fontVariantNumeric: 'tabular-nums' }}>{f.d}</div>
              <div style={{ marginTop: 3, fontFamily: 'Geist Mono, monospace', fontSize: 9.5,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--blue-mid)' }}>{f.m}</div>
            </div>
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--hair)', flexShrink: 0 }}></div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 700,
                color: 'var(--navy-ink)', lineHeight: 1.2 }}>{f.i}</div>
              <div style={{ marginTop: 3, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                color: 'var(--ink-55)' }}>{f.per}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 20px', background: 'var(--blue-tint)',
        border: '1px solid var(--hair)', fontFamily: 'Montserrat, sans-serif', fontSize: 13,
        fontWeight: 600, color: 'var(--navy)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 12 }}>
        <span>{p.cta}</span>
        <span style={{ color: 'var(--blue-mid)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── st-10 · Story encuesta (base 480×853 → 1080×1920) ────────────────
// Padding generoso arriba y abajo: respeta las zonas donde IG pisa con su UI.
// Slots: COPETE, PREGUNTA, OPCION_A, OPCION_B, PIE, HANDLE
function StEncuesta(props) {
  const p = Object.assign({
    copete: '[COPETE]', pregunta: '[PREGUNTA]', opcion_a: '[OPCION_A]',
    opcion_b: '[OPCION_B]', pie: '[PIE]', handle: '[HANDLE]',
  }, props);

  const qSize = fitSize(p.pregunta, [[28, 44], [46, 38], [66, 32]], 27);

  function Opt({ letra, texto }) {
    return (
      <div style={{ padding: '22px 24px', border: '1px solid rgba(247,249,252,0.32)',
        borderRadius: 6, background: 'rgba(247,249,252,0.06)', display: 'flex', gap: 16,
        alignItems: 'center' }}>
        <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
          background: 'var(--blue-lt)', color: 'var(--navy)', fontFamily: 'Montserrat, sans-serif',
          fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center',
          justifyContent: 'center' }}>{letra}</span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 600,
          color: 'var(--paper)', lineHeight: 1.3 }}>{texto}</span>
      </div>
    );
  }

  return (
    <div className="tpl navy bg-grid-navy" style={{ padding: '120px 44px 160px',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={340} opacity={0.05}
        style={{ position: 'absolute', right: -110, top: 300 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Lockup mode="light" size={26} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <span className="eyebrow">{p.copete}</span>
        <div className="display" style={{ marginTop: 16, fontSize: qSize, fontWeight: 700,
          color: 'var(--paper)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {p.pregunta}
        </div>
        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Opt letra="A" texto={p.opcion_a} />
          <Opt letra="B" texto={p.opcion_b} />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600,
          color: 'var(--blue-lt)' }}>{p.pie}</div>
        <HandleFooter handle={p.handle} mode="light" style={{ marginTop: 12 }} />
      </div>
    </div>
  );
}

// ── li-03 · LinkedIn · dato clave (base 600×314 → 1200×628) ──────────
// Slots: CATEGORIA, NUMERO, UNIDAD, DESCRIPCION, FUENTE, HANDLE
function LiDato(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', numero: '[NUMERO]', unidad: '[UNIDAD]',
    descripcion: '[DESCRIPCION]', fuente: '[FUENTE]', handle: '[HANDLE]',
  }, props);

  const nSize = fitSize(p.numero, [[3, 104], [5, 84]], 66);

  return (
    <div className="tpl white" style={{ padding: 38, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 4,
        background: 'linear-gradient(90deg,#1f4e79,#2e75b6)' }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Lockup size={22} />
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 30 }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <span className="number-xl" style={{ fontSize: nSize, color: 'var(--navy)' }}>{p.numero}</span>
          <span className="display-serif" style={{ fontSize: 26, color: 'var(--blue-mid)',
            paddingBottom: 10 }}><em>{p.unidad}</em></span>
        </div>
        <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--hair)', margin: '10px 0' }}></div>
        <div className="lede" style={{ fontSize: 14.5, color: 'var(--ink-70)', minWidth: 0 }}>
          {p.descripcion}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          gap: 12, borderTop: '1px solid var(--hair)', paddingTop: 13 }}>
          <span className="truncate" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12,
            fontWeight: 600, color: 'var(--navy)' }}>{p.fuente}</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em',
            color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{p.handle}</span>
        </div>
      </div>
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
  StEncuesta: {
    copete: 'Tu opinión',
    pregunta: '¿Qué te quita más tiempo cada mes?',
    opcion_a: 'Ordenar comprobantes y facturas',
    opcion_b: 'Entender qué impuestos me vencen',
    pie: 'Respondé en la encuesta y te contamos cómo lo resolvemos.',
    handle: '@mdoconsultores',
  },
  LiDato: {
    categoria: 'En cifras · MDO',
    numero: '+50',
    unidad: 'años',
    descripcion: 'acompañando a empresas argentinas en su gestión impositiva, contable y previsional. La experiencia también se mide en años de continuidad.',
    fuente: 'MDO Consultores · Desde 1972',
    handle: 'mdo-consultores.com.ar',
  },
};

Object.assign(window, { PoVencimientosFeed, StEncuesta, LiDato, EXAMPLES_UTILIDAD });

// templates-story.jsx — historias 9:16, MARCA v2.0 (Manual de Marca 2026).
// Va al repo como mdo-templates/templates-story.jsx (reemplaza el actual).
//
// Base 480×853 → 1080×1920. Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
//
// QUÉ CAMBIÓ — mismos IDs y mismos slots:
//   Montserrat → var(--font-body) · Instrument Serif italic → var(--font-accent)
//   oblicua · Geist Mono → var(--font-accent) versalitas · hex → variables.
//
// ⚠️ ZONA SEGURA — la regla más importante de este archivo. Instagram tapa
// ~111px arriba (avatar, nombre, barra de progreso) y ~147px abajo (campo de
// respuesta) en unidades de diseño. TODAS las stories usan ST_PAD. No lo bajes,
// no lo reemplaces por un número más chico: el lockup y el pie quedan tapados.
const ST_PAD = '120px 40px 155px';

// ── st-07 · Vencimientos de la semana (navy) ────────────────────────
// Slots: COPETE, SEMANA, FECHA_1..4, IMPUESTO_1..4, PERIODO_1..4, HORA_1..4, CTA, HANDLE
function StVencimientos(props) {
  const p = Object.assign({
    copete: '[COPETE]', semana: '[SEMANA]',
    fecha_1: '[FECHA_1]', impuesto_1: '[IMPUESTO_1]', periodo_1: '[PERIODO_1]', hora_1: '[HORA_1]',
    fecha_2: '[FECHA_2]', impuesto_2: '[IMPUESTO_2]', periodo_2: '[PERIODO_2]', hora_2: '[HORA_2]',
    fecha_3: '[FECHA_3]', impuesto_3: '[IMPUESTO_3]', periodo_3: '[PERIODO_3]', hora_3: '[HORA_3]',
    fecha_4: '[FECHA_4]', impuesto_4: '[IMPUESTO_4]', periodo_4: '[PERIODO_4]', hora_4: '[HORA_4]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const items = [1, 2, 3, 4].map(i => ({
    d: p['fecha_' + i], t: p['impuesto_' + i], per: p['periodo_' + i], h: p['hora_' + i],
  })).filter(it => it.d && it.t);

  return (
    <div className="tpl navy" style={{ padding: ST_PAD, display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <TplHeader chip={p.semana} mode="light" size={40} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 26 }}>
        <span className="eyebrow">{p.copete}</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 18,
              padding: '18px 0', borderTop: '1px solid rgba(248,246,246,0.15)' }}>
              <span className="number-xl" style={{ fontSize: 46, color: 'var(--paper)',
                minWidth: 78, lineHeight: 0.9 }}>{f.d}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 21,
                  color: 'var(--paper)', lineHeight: 1.15 }}>{f.t}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                  color: 'var(--slate-40)', marginTop: 3 }}>{f.per}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 12, letterSpacing: '0.1em',
                color: 'var(--grey)', whiteSpace: 'nowrap' }}>{f.h}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ padding: '16px 20px', background: 'var(--paper)', color: 'var(--navy)',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span>{p.cta}</span>
          <span>→</span>
        </div>
        <HandleFooter handle={p.handle} mode="light" style={{ marginTop: 14 }} />
      </div>
    </div>
  );
}

// ── st-08 · Cita vertical (blanco) ──────────────────────────────────
// La comilla de apertura cuelga fuera del margen a propósito.
// Slots: COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE
function StCita(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 52], [95, 44], [140, 37]], 30);

  return (
    <div className="tpl white" style={{ padding: ST_PAD, display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={40} />
        <span className="chip">Pensamiento</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative' }}>
        <span className="quote-mark" style={{ fontSize: 180, color: 'var(--grey)',
          position: 'absolute', top: -50, left: -10, zIndex: 0 }}>“</span>

        <span className="eyebrow" style={{ marginBottom: 26, position: 'relative' }}>{p.copete}</span>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--navy)',
          lineHeight: 1.08, position: 'relative' }}><em>{p.cita}</em></div>

        <div style={{ marginTop: 32, display: 'flex', alignItems: 'flex-start', gap: 12,
          position: 'relative' }}>
          <span style={{ width: 36, height: 1, background: 'var(--navy)', marginTop: 9,
            flexShrink: 0 }}></span>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              color: 'var(--navy)' }}>{p.autor}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-55)',
              marginTop: 2 }}>{p.rol_autor}</div>
          </div>
        </div>
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── st-09 · CTA / Consultanos (blanco) ──────────────────────────────
// Titular de tres líneas: el cuerpo lo manda la línea MÁS LARGA (si no, las
// tres quedan de tamaño distinto), y la del medio va en itálica un 28% mayor.
// Slots: COPETE, TITULAR_1..3, BAJADA, CANAL_1..3_LABEL, CANAL_1..3_VALOR, HANDLE
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
    { l: p.canal_1_label, v: p.canal_1_valor },
    { l: p.canal_2_label, v: p.canal_2_valor },
    { l: p.canal_3_label, v: p.canal_3_valor },
  ].filter(c => c.l && c.v);

  const maxLen = Math.max(String(p.titular_1).length, String(p.titular_2).length,
    String(p.titular_3).length);
  const hSize = fitSize('x'.repeat(maxLen), [[9, 70], [13, 56], [19, 44]], 36);
  const bSize = fitSize(p.bajada, [[95, 16], [140, 14.5]], 13.5);
  const sans = { fontFamily: 'var(--font-body)', fontSize: hSize, fontWeight: 700,
    color: 'var(--navy)', letterSpacing: '-0.025em', lineHeight: 0.98 };

  return (
    <div className="tpl white" style={{ padding: ST_PAD, display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={40} />
        <span className="chip">Consultanos</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="eyebrow" style={{ marginBottom: 16 }}>{p.copete}</span>
        <div style={sans}>{p.titular_1}</div>
        <div className="display-serif" style={{ fontSize: Math.round(hSize * 1.28),
          color: 'var(--blue-mid)', lineHeight: 0.92 }}><em>{p.titular_2}</em></div>
        <div style={sans}>{p.titular_3}</div>
        <div className="lede" style={{ marginTop: 24, fontSize: bSize, maxWidth: '90%' }}>{p.bajada}</div>
      </div>

      <div>
        <div style={{ background: 'var(--navy)', color: 'var(--paper)', padding: '20px 22px' }}>
          {channels.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', gap: 12, padding: '9px 0',
              borderBottom: i < channels.length - 1 ? '1px solid rgba(248,246,246,0.15)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)',
                flexShrink: 0 }}>{c.l}</span>
              <span className="truncate" style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                fontWeight: 600, textAlign: 'right' }}>{c.v}</span>
            </div>
          ))}
        </div>
        <HandleFooter handle={p.handle} style={{ marginTop: 14 }} />
      </div>
    </div>
  );
}

// ── st-10 · Encuesta A/B (blanco) ───────────────────────────────────
// Slots: COPETE, PREGUNTA, OPCION_A, OPCION_B, PIE, HANDLE
function StEncuesta(props) {
  const p = Object.assign({
    copete: '[COPETE]', pregunta: '[PREGUNTA]', opcion_a: '[OPCION_A]',
    opcion_b: '[OPCION_B]', pie: '[PIE]', handle: '[HANDLE]',
  }, props);

  const qSize = fitSize(p.pregunta, [[28, 46], [46, 39], [66, 33]], 28);
  const opts = [{ k: 'A', t: p.opcion_a }, { k: 'B', t: p.opcion_b }];

  return (
    <div className="tpl white" style={{ padding: ST_PAD, display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <TplHeader chip={p.copete} size={40} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 30 }}>
        <div className="display" style={{ fontSize: qSize, fontWeight: 700, lineHeight: 1.1,
          letterSpacing: '-0.02em' }}>{p.pregunta}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {opts.map((o, i) => (
            <div key={i} style={{ border: '1px solid var(--hair-2)', borderRadius: 2,
              padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16,
              background: i === 0 ? 'var(--grey-pale)' : 'transparent' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 20,
                color: 'var(--slate)', flexShrink: 0 }}>{o.k}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 17,
                color: 'var(--ink)' }}>{o.t}</span>
            </div>
          ))}
        </div>

        <div className="lede" style={{ fontSize: 14, color: 'var(--ink-55)' }}>{p.pie}</div>
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

const EXAMPLES_STORY = {
  StVencimientos: {
    copete: 'Vencimientos de la semana', semana: 'Semana 34 · 2026',
    fecha_1: '18', impuesto_1: 'IVA', periodo_1: 'Posición mensual 07/2026', hora_1: '23:59',
    fecha_2: '19', impuesto_2: 'SUSS · F.931', periodo_2: 'Cargas sociales 07/2026', hora_2: '23:59',
    fecha_3: '21', impuesto_3: 'Ingresos Brutos', periodo_3: 'Convenio Multilateral', hora_3: '23:59',
    fecha_4: '22', impuesto_4: 'Ganancias', periodo_4: 'Anticipo sociedades', hora_4: '23:59',
    cta: 'Te lo presentamos nosotros', handle: '@mdoconsultores',
  },
  StCita: {
    copete: 'Pensamiento',
    cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.',
    autor: 'Estudio MDO', rol_autor: 'Consultores en gestión', handle: '@mdoconsultores',
  },
  StCTA: {
    copete: 'Estás pensando en armar tu empresa',
    titular_1: 'Hablemos', titular_2: 'antes', titular_3: 'de firmar.',
    bajada: 'Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo.',
    canal_1_label: 'Web', canal_1_valor: 'mdo-consultores.com.ar',
    canal_2_label: 'WhatsApp', canal_2_valor: '+54 9 11 3566 7985',
    canal_3_label: 'Email', canal_3_valor: 'info@mdo-consultores.com.ar',
    handle: '@mdoconsultores',
  },
  StEncuesta: {
    copete: 'Encuesta', pregunta: '¿Cómo llevás hoy la facturación?',
    opcion_a: 'En una planilla propia', opcion_b: 'Directo en el portal de ARCA',
    pie: 'Respondé en la encuesta y te contamos qué conviene.', handle: '@mdoconsultores',
  },
};

Object.assign(window, { StVencimientos, StCita, StCTA, StEncuesta, EXAMPLES_STORY });

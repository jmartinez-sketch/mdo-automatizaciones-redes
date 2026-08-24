// templates-variants.jsx — variantes de color / composición de las plantillas base. CORREGIDO.
// Mismos IDs y slots que la versión anterior.
//
// Correcciones:
//   · Titulares fijos que desbordaban → fitSize(). El peor caso era
//     sq-03b con el número serif a 220px.
//   · po-13b y st-09b tenían un <div style={{flex:1}}/> que abría un hueco muerto.
//   · st-08b y st-09b: padding 40 dejaba el lockup y el pie DEBAJO de la interfaz
//     de Instagram (tapa ~111px arriba y ~147px abajo en unidades de diseño).
//     Ahora usan el padding de zona segura, igual que las stories base.
//   · po-04b: el título ya no depende de un \n manual y los bullets se centran.
//   · Filas de fuente y pies unificados (SourceFooter / HandleFooter).
//   · Ejemplos: "AFIP" → "ARCA".
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

// Zona segura para stories (base 480×853), igual que en templates-story.jsx
const ST_PAD_V = '120px 40px 155px';

// ── sq-02b · Cita en navy ───────────────────────────────────────────
function SqCitaNavy(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 40], [95, 34], [140, 29]], 25);

  return (
    <div className="tpl navy" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Lockup mode="light" size={26} />
        <div className="quote-mark" style={{ fontSize: 96, marginTop: -16, marginRight: -6,
          color: 'var(--blue-lt)' }}>“</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingRight: 8 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>{p.copete}</div>
        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--paper)',
          lineHeight: 1.14 }}>
          <em>{p.cita}</em>
        </div>
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--paper)',
            marginTop: 8, flexShrink: 0 }}></span>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
            letterSpacing: '0.04em', color: 'var(--paper)' }}>
            {p.autor}
            <div style={{ fontWeight: 400, color: 'rgba(247,249,252,0.65)', fontSize: 11.5,
              marginTop: 2, letterSpacing: 0 }}>{p.rol_autor}</div>
          </div>
        </div>
      </div>

      <HandleFooter handle={p.handle} mode="light" />
    </div>
  );
}

// ── sq-03b · Número en serif italic ─────────────────────────────────
function SqNumeroSerif(props) {
  const p = Object.assign({
    copete: '[COPETE]', numero: '[NUMERO]', unidad: '[UNIDAD]',
    descripcion: '[DESCRIPCION]', pie: '[PIE]', handle: '[HANDLE]',
  }, props);

  const nSize = fitSize(p.numero, [[2, 220], [3, 182], [4, 148]], 120);
  const dSize = fitSize(p.descripcion, [[70, 15], [110, 13.5]], 12.5);

  return (
    <div className="tpl pale" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip="Est. 1972" size={26} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>{p.copete}</div>

        <div className="display-serif" style={{ fontSize: nSize, color: 'var(--navy)',
          lineHeight: 0.86, letterSpacing: '-0.02em' }}>
          <em>{p.numero}</em>
        </div>

        <div style={{ marginTop: 16, fontFamily: 'var(--font-body)', fontSize: 24,
          fontWeight: 500, color: 'var(--navy)', letterSpacing: '-0.01em' }}>
          {p.unidad}
        </div>

        <div className="hair-navy" style={{ width: 64, marginTop: 20, marginBottom: 16 }}></div>

        <div className="lede" style={{ fontSize: dSize, maxWidth: '90%' }}>{p.descripcion}</div>
      </div>

      <HandleFooter handle={p.handle} right={p.pie} />
    </div>
  );
}

// ── sq-12b · Noticia "Último momento" (navy + tira) ─────────────────
function SqNoticiaBreaking(props) {
  const p = Object.assign({
    badge: '[BADGE]', categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[32, 38], [50, 33], [72, 28]], 24);
  const bSize = fitSize(p.bajada, [[85, 14.5], [130, 13.5]], 12.5);

  return (
    <div className="tpl navy" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--blue-lt)', color: 'var(--navy-deep)', padding: '12px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.24em',
          fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{p.badge}</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.12em',
          fontWeight: 500, whiteSpace: 'nowrap' }}>{p.fecha}</span>
      </div>

      <div style={{ padding: '30px 40px 36px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 12 }}>
          <Lockup mode="light" size={24} />
          <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{p.categoria}</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          marginTop: 8 }}>
          <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--paper)',
            letterSpacing: '-0.018em', lineHeight: 1.08 }}>
            {p.titular}
          </div>
          <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '95%' }}>
            {p.bajada}
          </div>
        </div>

        <SourceFooter fuente={p.fuente} fecha={p.fecha} mode="light" />
        <HandleFooter handle={p.handle} mode="light" />
      </div>
    </div>
  );
}

// ── po-04b · Guía / Servicio en navy ────────────────────────────────
function PoServicioNavy(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', bajada: '[BAJADA]',
    bullet_1: '[BULLET_1]', bullet_2: '[BULLET_2]', bullet_3: '[BULLET_3]',
    bullet_4: '[BULLET_4]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const bullets = [p.bullet_1, p.bullet_2, p.bullet_3, p.bullet_4].filter(Boolean);
  const tSize = fitSize(p.titulo, [[16, 52], [28, 44], [40, 37]], 31);
  const bSize = fitSize(p.bajada, [[70, 16], [110, 14.5]], 13.5);

  return (
    <div className="tpl navy" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} mode="light" size={26} />

      <div style={{ marginTop: 28 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 600, color: 'var(--paper)',
          whiteSpace: 'pre-line', lineHeight: 1.06 }}>
          {p.titulo}
        </div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '90%' }}>{p.bajada}</div>
      </div>

      <div className="hair" style={{ width: 56, marginTop: 24, background: 'var(--paper)' }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 13 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, color: 'var(--blue-lt)',
              minWidth: 22, fontWeight: 500, letterSpacing: '0.04em', flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--paper)',
              lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 18px', background: 'var(--paper)', color: 'var(--navy)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700 }}>{p.cta}</span>
        <span style={{ color: 'var(--blue-mid)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} mode="light" />
    </div>
  );
}

// ── po-05b · Anuncio en papel ───────────────────────────────────────
function PoAnuncioLight(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', subtitulo: '[SUBTITULO]', tema: '[TEMA]',
    bloque_1: '[BLOQUE_1]', bloque_2: '[BLOQUE_2]', bloque_3: '[BLOQUE_3]',
    fecha_hora: '[FECHA_HORA]', handle: '[HANDLE]',
  }, props);

  const bloques = [p.bloque_1, p.bloque_2, p.bloque_3].filter(Boolean);
  const tSize = fitSize(p.titulo, [[16, 66], [28, 52], [42, 42]], 34);

  const rowLabel = {
    color: 'var(--ink-55)', fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10.5,
    letterSpacing: '0.1em', textTransform: 'uppercase',
  };

  return (
    <div className="tpl" style={{ padding: 44, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)', position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="dark" size={360} opacity={0.05}
        style={{ position: 'absolute', right: -100, bottom: -60 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TplHeader chip={p.copete} size={26} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Anuncio</div>

        <div className="display-serif" style={{ fontSize: tSize, color: 'var(--navy-ink)',
          lineHeight: 1.0 }}>
          <em>{p.titulo}</em>
        </div>
        <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 13, letterSpacing: '0.18em',
          color: 'var(--ink-55)', marginTop: 10, textTransform: 'uppercase' }}>
          {p.subtitulo}
        </div>

        <div className="hair-navy" style={{ marginTop: 24, marginBottom: 20, width: '60%' }}></div>

        <div style={{ display: 'grid', gridTemplateColumns: '104px 1fr', rowGap: 12, columnGap: 16,
          fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)',
          alignItems: 'start' }}>
          <div style={rowLabel}>Tema</div>
          <div>{p.tema}</div>
          <div style={rowLabel}>Bloques</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {bloques.map((b, i) => (
              <span key={i} className="chip" style={{ fontSize: 9.5 }}>{b}</span>
            ))}
          </div>
          <div style={rowLabel}>Cuándo</div>
          <div>{p.fecha_hora}</div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <HandleFooter handle={p.handle} />
      </div>
    </div>
  );
}

// ── po-13b · Noticia portrait en navy con take invertido ────────────
function PoNoticiaNavy(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]',
    que_saber_label: '[QUE_SABER_LABEL]', que_saber: '[QUE_SABER]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[34, 40], [52, 35], [72, 30]], 26);
  const bSize = fitSize(p.bajada, [[90, 15.5], [140, 14.5]], 13.5);
  const qSize = fitSize(p.que_saber, [[75, 22], [115, 19]], 17);

  return (
    <div className="tpl navy" style={{ padding: 44, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip="Noticia · MDO" mode="light" size={26} />

      {/* Antes un flex:1 suelto separaba el texto del callout dejando un vacío */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1,
            background: 'var(--blue-lt)', flexShrink: 0 }}></span>
          <span className="eyebrow">{p.categoria}</span>
        </div>

        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--paper)',
          letterSpacing: '-0.02em', lineHeight: 1.08 }}>
          {p.titular}
        </div>

        <div className="lede" style={{ marginTop: 16, fontSize: bSize, maxWidth: '96%' }}>
          {p.bajada}
        </div>

        <div style={{ marginTop: 22, padding: '18px 22px', background: 'var(--paper)',
          color: 'var(--navy-ink)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
            <span className="asterisk" style={{ fontSize: 22, color: 'var(--blue-mid)' }}>*</span>
            <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--blue-mid)' }}>{p.que_saber_label}</span>
          </div>
          <div className="display-serif" style={{ fontSize: qSize, lineHeight: 1.22,
            color: 'var(--navy-ink)' }}>
            <em>{p.que_saber}</em>
          </div>
        </div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} mode="light" />
      <HandleFooter handle={p.handle} mode="light" />
    </div>
  );
}

// ── st-08b · Cita story en navy ─────────────────────────────────────
function StCitaNavy(props) {
  const p = Object.assign({
    copete: '[COPETE]', cita: '[CITA]', autor: '[AUTOR]',
    rol_autor: '[ROL_AUTOR]', handle: '[HANDLE]',
  }, props);

  const cSize = fitSize(p.cita, [[58, 52], [95, 44], [140, 37]], 30);

  return (
    <div className="tpl navy" style={{ padding: ST_PAD_V, display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup mode="light" size={24} />
        <div className="chip">Pensamiento</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative' }}>
        <div className="quote-mark" style={{ fontSize: 200, color: 'rgba(140,196,234,0.20)',
          position: 'absolute', top: -55, left: -16, zIndex: 0 }}>“</div>

        <div className="eyebrow" style={{ marginBottom: 26, position: 'relative' }}>{p.copete}</div>

        <div className="display-serif" style={{ fontSize: cSize, color: 'var(--paper)',
          position: 'relative', lineHeight: 1.08 }}>
          <em>{p.cita}</em>
        </div>

        <div style={{ marginTop: 32, display: 'flex', alignItems: 'flex-start', gap: 12,
          position: 'relative' }}>
          <span style={{ display: 'inline-block', width: 36, height: 1, background: 'var(--paper)',
            marginTop: 9, flexShrink: 0 }}></span>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              color: 'var(--paper)' }}>{p.autor}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'rgba(247,249,252,0.65)', marginTop: 2 }}>{p.rol_autor}</div>
          </div>
        </div>
      </div>

      <HandleFooter handle={p.handle} mode="light" />
    </div>
  );
}

// ── st-09b · CTA story en navy ──────────────────────────────────────
function StCTANavy(props) {
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

  const maxLen = Math.max(
    String(p.titular_1).length, String(p.titular_2).length, String(p.titular_3).length);
  const hSize = fitSize('x'.repeat(maxLen), [[9, 70], [13, 56], [19, 44]], 36);
  const bSize = fitSize(p.bajada, [[95, 16], [140, 14.5]], 13.5);

  return (
    <div className="tpl navy" style={{ padding: ST_PAD_V, display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup mode="light" size={24} />
        <div className="chip">Consultanos</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>{p.copete}</div>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: hSize, fontWeight: 700,
          color: 'var(--paper)', letterSpacing: '-0.025em', lineHeight: 0.98 }}>
          {p.titular_1}
        </div>
        <div className="display-serif" style={{ fontSize: Math.round(hSize * 1.28),
          color: 'var(--blue-lt)', lineHeight: 0.92 }}>
          <em>{p.titular_2}</em>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: hSize, fontWeight: 700,
          color: 'var(--paper)', letterSpacing: '-0.025em', lineHeight: 0.98 }}>
          {p.titular_3}
        </div>

        <div className="lede" style={{ marginTop: 24, fontSize: bSize, maxWidth: '90%' }}>
          {p.bajada}
        </div>
      </div>

      <div>
        <div style={{ background: 'var(--paper)', color: 'var(--navy-ink)', padding: '20px 22px' }}>
          {channels.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', gap: 12, padding: '9px 0',
              borderBottom: i < channels.length - 1 ? '1px solid var(--hair)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10, letterSpacing: '0.16em',
                color: 'var(--blue-mid)', textTransform: 'uppercase', flexShrink: 0 }}>{c.label}</span>
              <span className="truncate" style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                fontWeight: 500, color: 'var(--navy-ink)', textAlign: 'right' }}>{c.value}</span>
            </div>
          ))}
        </div>
        <HandleFooter handle={p.handle} mode="light" style={{ marginTop: 14 }} />
      </div>
    </div>
  );
}

const EXAMPLES_VARIANTS = {
  SqCitaNavy: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqCita),
  SqNumeroSerif: Object.assign({}, (window.EXAMPLES_SQUARE || {}).SqNumero),
  SqNoticiaBreaking: {
    badge: 'Último momento',
    categoria: 'ARCA · Normativa',
    titular: 'Régimen simplificado para PyMEs: cambios desde julio',
    bajada: 'Las pequeñas y medianas empresas tendrán nuevo umbral de facturación y categorías ampliadas.',
    fuente: 'Ámbito Financiero',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores',
  },
  PoServicioNavy: Object.assign({}, (window.EXAMPLES_PORTRAIT || {}).PoServicio),
  PoAnuncioLight: Object.assign({}, (window.EXAMPLES_PORTRAIT || {}).PoAltaCliente),
  PoNoticiaNavy: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios',
    bajada: 'Desde el 1° de julio las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.',
    que_saber_label: 'Qué tenés que saber',
    que_saber: 'Si pagás servicios al exterior, conviene anticipar las facturas de julio.',
    fuente: 'BCRA · Comunicación "A" 7984',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores',
  },
  StCitaNavy: Object.assign({}, (window.EXAMPLES_STORY || {}).StCita),
  StCTANavy: Object.assign({}, (window.EXAMPLES_STORY || {}).StCTA),
};

Object.assign(window, {
  SqCitaNavy, SqNumeroSerif, SqNoticiaBreaking,
  PoServicioNavy, PoAnuncioLight, PoNoticiaNavy,
  StCitaNavy, StCTANavy,
  EXAMPLES_VARIANTS,
});

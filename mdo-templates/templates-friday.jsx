// templates-friday.jsx — 5 plantillas del viernes (Gestión PyME). CORREGIDO.
// Portrait 4:5 (base 540×675 → 1080×1350). NUNCA usar la etiqueta "Tip":
// el copete va con "Gestión PyME" o el nombre del servicio. Regla: ARCA, nunca AFIP.
//
// Correcciones respecto de la versión anterior (mismos IDs y slots):
//   · po-23: tenía justifyContent flex-start con flex:1 → el texto quedaba
//     arriba y el vacío abajo. Ahora el bloque se centra.
//   · po-24: los ítems quedaban pegados al título con un vacío abajo. Ahora
//     se distribuyen en el espacio disponible.
//   · po-21 / po-25: titulares de 60px y 50px fijos que desbordaban con textos
//     largos → fitSize().
//   · po-22: los cuerpos de las dos mitades también se ajustan al texto.
//   · Pies unificados con HandleFooter (no se parten en dos líneas).
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

// ── po-21 · Pregunta hero (navy) ────────────────────────────────────
// Slots: COPETE, PREGUNTA, RESPUESTA, CTA, HANDLE
function PoPreguntaHero(props) {
  const p = Object.assign({
    copete: '[COPETE]', pregunta: '[PREGUNTA]', respuesta: '[RESPUESTA]',
    cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const qSize = fitSize(p.pregunta, [[30, 60], [48, 50], [70, 41]], 34);
  const rSize = fitSize(p.respuesta, [[85, 18], [130, 16.5]], 15);

  return (
    <div className="tpl navy" style={{ padding: 60, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={360} opacity={0.06}
        style={{ position: 'absolute', right: -90, top: -70 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TplHeader chip={p.copete} mode="light" size={26} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="display-serif" style={{ fontSize: qSize, color: 'var(--paper)',
          lineHeight: 1.06 }}>
          <em>{p.pregunta}</em>
        </div>
        <div className="lede" style={{ marginTop: 24, fontSize: rSize,
          color: 'rgba(247,249,252,0.82)', maxWidth: '92%' }}>
          {p.respuesta}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--paper)',
          color: 'var(--navy)', padding: '13px 20px', fontFamily: 'var(--font-body)',
          fontSize: 13.5, fontWeight: 700 }}>
          <span>{p.cta}</span>
          <span style={{ color: 'var(--blue-mid)' }}>→</span>
        </div>
        <HandleFooter handle={p.handle} mode="light" style={{ marginTop: 16 }} />
      </div>
    </div>
  );
}

// ── po-22 · Antes / Después (split papel + navy) ─────────────────────
// Slots: COPETE, SIN_LABEL, SIN_TEXTO, CON_LABEL, CON_TEXTO, CTA, HANDLE
function PoAntesDespues(props) {
  const p = Object.assign({
    copete: '[COPETE]', sin_label: '[SIN_LABEL]', sin_texto: '[SIN_TEXTO]',
    con_label: '[CON_LABEL]', con_texto: '[CON_TEXTO]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const sSize = fitSize(p.sin_texto, [[60, 29], [95, 25]], 22);
  const cSize = fitSize(p.con_texto, [[55, 33], [90, 28]], 24);

  return (
    <div className="tpl" style={{ padding: 0, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <div style={{ padding: '52px 56px 0' }}>
        <TplHeader chip={p.copete} size={26} />
      </div>

      <div style={{ flex: 1, padding: '26px 56px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center' }}>
        <div className="eyebrow" style={{ color: 'var(--ink-55)', marginBottom: 14 }}>{p.sin_label}</div>
        <div className="display" style={{ fontSize: sSize, color: 'var(--ink-35)', lineHeight: 1.18,
          fontWeight: 600 }}>{p.sin_texto}</div>
      </div>

      <div style={{ background: 'var(--navy)', color: 'var(--paper)', flex: 1, padding: '32px 56px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div className="eyebrow" style={{ color: 'var(--blue-lt)', marginBottom: 14 }}>{p.con_label}</div>
        <div className="display" style={{ fontSize: cSize, color: 'var(--paper)', lineHeight: 1.14,
          fontWeight: 700 }}>{p.con_texto}</div>
        <div style={{ marginTop: 20, fontFamily: 'var(--font-body)', fontSize: 13,
          fontWeight: 700, color: 'var(--blue-lt)' }}>{p.cta} →</div>
        <HandleFooter handle={p.handle} mode="light" style={{ marginTop: 18 }} />
      </div>
    </div>
  );
}

// ── po-23 · Declaración / manifiesto (papel) ─────────────────────────
// Slots: COPETE, DECLARACION, APOYO, HANDLE
function PoDeclaracion(props) {
  const p = Object.assign({
    copete: '[COPETE]', declaracion: '[DECLARACION]', apoyo: '[APOYO]', handle: '[HANDLE]',
  }, props);

  const dSize = fitSize(p.declaracion, [[45, 46], [70, 39], [100, 33]], 28);
  const aSize = fitSize(p.apoyo, [[95, 17], [140, 15.5]], 14);

  return (
    <div className="tpl" style={{ padding: 60, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <TplHeader chip={p.copete} size={26} />

      {/* Antes: flex-start dejaba todo el vacío abajo. Ahora se centra. */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hair-navy" style={{ width: 56, marginBottom: 30 }}></div>
        <div className="display" style={{ fontSize: dSize, fontWeight: 700, color: 'var(--navy-ink)',
          lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {p.declaracion}
        </div>
        <div className="lede" style={{ marginTop: 22, fontSize: aSize, maxWidth: '92%' }}>{p.apoyo}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16,
        borderTop: '1px solid var(--hair)' }}>
        <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--navy)',
          flexShrink: 0 }}></span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
          color: 'var(--navy)' }}>Estudio MDO · Consultores</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-24 · Checklist (blanco) ──────────────────────────────────────
// Slots: COPETE, TITULO, ITEM_1, ITEM_2, ITEM_3, CTA, HANDLE
function PoChecklist(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', item_1: '[ITEM_1]', item_2: '[ITEM_2]',
    item_3: '[ITEM_3]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const items = [p.item_1, p.item_2, p.item_3].filter(Boolean);
  const tSize = fitSize(p.titulo, [[28, 40], [44, 34], [62, 29]], 26);

  return (
    <div className="tpl white" style={{ padding: 56, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={26} />

      <div className="display" style={{ marginTop: 28, fontSize: tSize, fontWeight: 700,
        color: 'var(--navy-ink)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>{p.titulo}</div>

      {/* Antes los ítems quedaban arriba con un vacío abajo */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 20 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%',
              background: 'var(--navy)', color: 'var(--paper)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700,
              marginTop: 1 }}>✓</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 500,
              color: 'var(--ink)', lineHeight: 1.35 }}>{it}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)',
        fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{p.cta}</span>
        <span style={{ color: 'var(--blue-lt)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-25 · Foco / una idea (navy-deep con grilla) ───────────────────
// Slots: COPETE, IDEA, DETALLE, CTA, HANDLE
function PoFoco(props) {
  const p = Object.assign({
    copete: '[COPETE]', idea: '[IDEA]', detalle: '[DETALLE]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const iSize = fitSize(p.idea, [[36, 50], [56, 42], [80, 35]], 30);
  const dSize = fitSize(p.detalle, [[85, 17], [130, 15.5]], 14);

  return (
    <div className="tpl navy-deep" style={{ padding: 60, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <div className="bg-grid-navy" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TplHeader chip={p.copete} mode="light" size={26} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="asterisk" style={{ fontSize: 66, marginBottom: 6,
          color: 'var(--blue-lt)' }}>*</div>
        <div className="display" style={{ fontSize: iSize, fontWeight: 700, color: 'var(--paper)',
          lineHeight: 1.08, letterSpacing: '-0.02em' }}>{p.idea}</div>
        <div className="lede" style={{ marginTop: 20, fontSize: dSize,
          color: 'rgba(247,249,252,0.82)', maxWidth: '90%' }}>{p.detalle}</div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="hair" style={{ marginBottom: 16 }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
            color: 'var(--blue-lt)' }}>{p.cta} →</span>
          <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10, letterSpacing: '0.08em',
            color: 'rgba(247,249,252,0.55)', whiteSpace: 'nowrap' }}>{p.handle}</span>
        </div>
      </div>
    </div>
  );
}

const EXAMPLES_FRIDAY = {
  PoPreguntaHero: {
    copete: 'Contabilidad',
    pregunta: '¿Sabés cómo viene tu mes antes de que termine?',
    respuesta: 'Con la contabilidad al día dejás de manejar tu PyME mirando por el espejo retrovisor.',
    cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores',
  },
  PoAntesDespues: {
    copete: 'Contabilidad',
    sin_label: 'Sin orden contable',
    sin_texto: 'Números a fin de año, decisiones a las apuradas y sorpresas con ARCA.',
    con_label: 'Con MDO',
    con_texto: 'Información al día para decidir tranquilo, todo el año.',
    cta: 'Ordenamos tu contabilidad', handle: '@mdoconsultores',
  },
  PoDeclaracion: {
    copete: 'Gestión PyME',
    declaracion: 'La contabilidad no es un gasto. Es la base de toda buena decisión.',
    apoyo: 'Llevada al día y bien leída, te dice dónde ganás, dónde perdés y hacia dónde conviene crecer.',
    handle: '@mdoconsultores',
  },
  PoChecklist: {
    copete: 'Contabilidad',
    titulo: '¿Tu PyME tiene esto resuelto?',
    item_1: 'Balances y libros al día, sin corridas',
    item_2: 'Cuentas conciliadas todos los meses',
    item_3: 'Reportes claros para tomar decisiones',
    cta: 'Si te falta alguno, consultanos', handle: '@mdoconsultores',
  },
  PoFoco: {
    copete: 'Gestión PyME',
    idea: 'Lo que no se registra, no se puede mejorar.',
    detalle: 'Una contabilidad ordenada es lo que convierte tus números en decisiones.',
    cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoPreguntaHero, PoAntesDespues, PoDeclaracion, PoChecklist, PoFoco, EXAMPLES_FRIDAY });

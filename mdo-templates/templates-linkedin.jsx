// templates-linkedin.jsx — placas de LinkedIn 1.91:1, MARCA v2.0.
// Va al repo como mdo-templates/templates-linkedin.jsx (reemplaza el actual).
//
// Base 600×314 → 1200×628. Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
//
// QUÉ CAMBIÓ — mismos IDs y mismos slots:
//   Montserrat → var(--font-body) · Instrument Serif italic → var(--font-accent)
//   oblicua · Geist Mono → var(--font-accent) versalitas · hex → variables.
//   El lockup pasa a ISOTIPO: en 314px de alto, el lockup completo se come el
//   13% de la placa y «CONSULTORES» queda ilegible. En LinkedIn firma el iso.

// ── li-01 · Noticia normativa (blanco) ──────────────────────────────
// Slots: CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE
function LiNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[32, 34], [50, 29], [70, 25]], 22);

  return (
    <div className="tpl white" style={{ padding: 38, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="dark" size={210} opacity={0.05}
        style={{ position: 'absolute', right: -52, bottom: -30 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 4,
        background: 'var(--gradient-brand-h)' }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <IsoWatermark mode="dark" size={28} opacity={1} style={{ position: 'static' }} />
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1, paddingRight: 60 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700,
          letterSpacing: '-0.022em', lineHeight: 1.1 }}>{p.titular}</div>
        <div className="lede" style={{ marginTop: 12, fontSize: 13, maxWidth: '92%' }}>{p.bajada}</div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SourceFooter fuente={p.fuente} fecha={p.fecha} />
        <HandleFooter handle={p.handle} style={{ marginTop: 8 }} />
      </div>
    </div>
  );
}

// ── li-02 · Claim institucional (navy) ──────────────────────────────
// Dos columnas: el claim a la izquierda con los servicios en chips, y el
// lockup SECUNDARIO (los tres apellidos) a la derecha con el CTA.
// Slots: COPETE, CLAIM, SERVICIO_1..3, CTA, HANDLE
function LiClaim(props) {
  const p = Object.assign({
    copete: '[COPETE]', claim: '[CLAIM]', servicio_1: '[SERVICIO_1]',
    servicio_2: '[SERVICIO_2]', servicio_3: '[SERVICIO_3]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const servicios = [p.servicio_1, p.servicio_2, p.servicio_3].filter(Boolean);
  const cSize = fitSize(p.claim, [[34, 36], [54, 31], [76, 26]], 23);

  return (
    <div className="tpl navy bg-grid-navy" style={{ padding: 38, display: 'flex',
      flexDirection: 'row', gap: 30 }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* 1px menos y tracking mas corto que .eyebrow: los tres apellidos
            tienen que entrar en UNA linea en la columna angosta de 600px */}
        <span className="eyebrow" style={{ fontSize: 9, letterSpacing: '0.18em',
          whiteSpace: 'nowrap' }}>{p.copete}</span>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="display" style={{ fontSize: cSize, fontWeight: 700, color: 'var(--paper)',
            letterSpacing: '-0.022em', lineHeight: 1.1 }}>{p.claim}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {servicios.map((s, i) => <span key={i} className="chip">{s}</span>)}
        </div>
      </div>

      <div style={{ flexShrink: 0, width: 172, borderLeft: '1px solid rgba(248,246,246,0.15)',
        paddingLeft: 26, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between' }}>
        <LockupSecundario mode="light" size={34} />
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
            color: 'var(--paper)', lineHeight: 1.3 }}>{p.cta}</div>
          <div style={{ marginTop: 10, fontFamily: 'var(--font-accent)', fontSize: 9.5,
            letterSpacing: '0.08em', color: 'var(--ink-40)' }}>{p.handle}</div>
        </div>
      </div>
    </div>
  );
}

// ── li-03 · Dato clave (papel) ──────────────────────────────────────
// El número cede ancho, no la atribución: en 600×314 la columna derecha es
// angosta y la fila de FUENTE se trunca si el número crece. Por eso el pie de
// esta placa lleva SOLO el handle: la atribución ya la da la fila de FUENTE.
// Slots: CATEGORIA, NUMERO, UNIDAD, DESCRIPCION, FUENTE, HANDLE
function LiDato(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', numero: '[NUMERO]', unidad: '[UNIDAD]',
    descripcion: '[DESCRIPCION]', fuente: '[FUENTE]', handle: '[HANDLE]',
  }, props);

  const nSize = fitSize(p.numero, [[3, 76], [5, 62]], 50);

  return (
    <div className="tpl" style={{ padding: 38, display: 'flex', flexDirection: 'row', gap: 22,
      alignItems: 'stretch', background: 'var(--paper)' }}>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="number-xl" style={{ fontSize: nSize, color: 'var(--navy)' }}>{p.numero}</span>
          <span className="display-serif" style={{ fontSize: Math.round(nSize * 0.3),
            color: 'var(--blue-mid)' }}><em>{p.unidad}</em></span>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0, borderLeft: '1px solid var(--hair)', paddingLeft: 22,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span className="eyebrow">{p.categoria}</span>
          <IsoWatermark mode="dark" size={24} opacity={1} style={{ position: 'static' }} />
        </div>
        <div className="lede" style={{ fontSize: 14 }}>{p.descripcion}</div>
        <div>
          <SourceFooter fuente={p.fuente} fecha="" />
          <HandleFooter handle={p.handle} right="" style={{ marginTop: 6 }} />
        </div>
      </div>
    </div>
  );
}

const EXAMPLES_LINKEDIN = {
  LiNoticia: {
    categoria: 'Laboral · ARCA',
    titular: 'ARCA abre la Moratoria Laboral para empleadores',
    bajada: 'Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse.',
    fuente: 'Errepar · ARCA · Resolución', fecha: '11 jun 2026', handle: '@mdoconsultores',
  },
  LiClaim: {
    copete: 'Martinez · De Orta · Gutierrez Taboada',
    claim: 'Más de 50 años ordenando los números de empresas argentinas.',
    servicio_1: 'Impuestos', servicio_2: 'Contabilidad', servicio_3: 'Sueldos',
    cta: 'Conversemos sobre tu empresa', handle: 'mdo-consultores.com.ar',
  },
  LiDato: {
    categoria: 'En cifras', numero: '128', unidad: 'libros',
    descripcion: 'societarios y contables bajo control del estudio, con folios y custodia relevados uno por uno.',
    fuente: 'Panel de libros MDO', handle: '@mdoconsultores',
  },
};

Object.assign(window, { LiNoticia, LiClaim, LiDato, EXAMPLES_LINKEDIN });

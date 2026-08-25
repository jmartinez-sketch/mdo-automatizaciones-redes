// templates-noticia-v2.jsx — noticias 4:5, MARCA v2.0. La v2 de las noticias.
// Va al repo como mdo-templates/templates-noticia-v2.jsx (reemplaza el actual).
//
// Base 540×675 → 1080×1350. Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
//
// Éstas son las que hay que usar para noticias nuevas: po-13c (en
// templates-variants-light.jsx) es la vieja, la que dejaba el hueco vertical.
//
// QUÉ CAMBIÓ — mismos IDs y mismos slots:
//   Montserrat → var(--font-body) · Geist Mono → var(--font-accent) versalitas
//   · hex → variables · el lockup no baja de 40.

// ── po-13d · Noticia + cierre (papel) ───────────────────────────────
// Marca de agua del isotipo sangrando por la derecha, y el cierre en negrita
// abajo: la bajada informa, el cierre dice qué hacer.
// Slots: CATEGORIA, TITULAR, BAJADA, CIERRE, FUENTE, FECHA, HANDLE
function PoNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    cierre: '[CIERRE]', fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
    tone: 'paper',
  }, props);

  const inv = p.tone === 'navy';
  const tSize = fitSize(p.titular, [[34, 44], [54, 38], [76, 32]], 28);

  return (
    <div className={'tpl' + (inv ? ' navy' : '')} style={{ padding: 56, display: 'flex',
      flexDirection: 'column', position: 'relative', overflow: 'hidden',
      background: inv ? 'var(--navy)' : 'var(--paper)' }}>
      <IsoWatermark mode={inv ? 'light' : 'dark'} size={260} opacity={inv ? 0.08 : 0.05}
        style={{ position: 'absolute', right: -70, bottom: 40 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 12, position: 'relative', zIndex: 1 }}>
        <Lockup mode={inv ? 'light' : 'dark'} size={40} />
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700,
          color: inv ? 'var(--paper)' : 'var(--ink)', letterSpacing: '-0.022em',
          lineHeight: 1.08 }}>{p.titular}</div>
        <div className="lede" style={{ marginTop: 14, fontSize: 15, maxWidth: '92%' }}>{p.bajada}</div>
        <div className="hair-navy" style={{ width: 64, margin: '22px 0 14px',
          background: inv ? 'var(--paper)' : 'var(--navy)' }}></div>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 17,
          lineHeight: 1.3, color: inv ? 'var(--grey)' : 'var(--navy)',
          maxWidth: '86%' }}>{p.cierre}</div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SourceFooter fuente={p.fuente} fecha={p.fecha} mode={inv ? 'light' : 'dark'} />
        <HandleFooter handle={p.handle} mode={inv ? 'light' : 'dark'} style={{ marginTop: 8 }} />
      </div>
    </div>
  );
}

// ── po-13e · Noticia + cierre en navy ───────────────────────────────
// Misma composición que po-13d. Existe para que dos noticias de la misma
// semana se distingan de un vistazo en la grilla del perfil.
// Slots: idénticos a po-13d
function PoNoticiaNavyV2(props) {
  return <PoNoticia {...props} tone="navy" />;
}

const EXAMPLES_NOTICIA_V2 = {
  PoNoticia: {
    categoria: 'Laboral · ARCA',
    titular: 'ARCA abre la Moratoria Laboral para empleadores',
    bajada: 'Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse.',
    cierre: 'Si tenés personal sin registrar, ésta es la ventana.',
    fuente: 'Errepar · ARCA · Resolución', fecha: '11 jun 2026', handle: '@mdoconsultores',
  },
  PoNoticiaNavyV2: {
    categoria: 'Impuestos · ARCA',
    titular: 'Nuevo régimen de facturación para responsables inscriptos',
    bajada: 'Cambia el plazo de emisión y el detalle obligatorio del comprobante.',
    cierre: 'Revisamos tu circuito de facturación antes de que aplique.',
    fuente: 'ARCA · Resolución General', fecha: '19 ago 2026', handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoNoticia, PoNoticiaNavyV2, EXAMPLES_NOTICIA_V2 });

// templates-news.jsx — 2 plantillas de noticia para la automatización del
// newsletter de Gmail. CORREGIDO. Mismos IDs y slots.
//   sq-12 — Noticia square (base 540×540 → 1080×1080)
//   po-13 — Noticia portrait con take MDO (base 540×675 → 1080×1350)
//
// Correcciones:
//   · po-13 tenía un <div style={{flex:1}}/> que separaba el texto del callout
//     dejando un hueco muerto en el medio.
//   · Titulares de 34px y 38px fijos → fitSize().
//   · La fila de fuente usaba un <span style={{flex:1}}/> como separador y la
//     fuente larga ("Errepar · ARCA · Resolución") se partía en dos líneas.
//     Ahora se trunca con elipsis y la fecha nunca se comprime.
//   · Ejemplos: "AFIP" → "ARCA".
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

// ── sq-12 · Noticia square ──────────────────────────────────────────
// Slots: CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE
function SqNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[30, 38], [46, 33], [66, 28]], 24);
  const bSize = fitSize(p.bajada, [[80, 14.5], [130, 13.5]], 12.5);

  return (
    <div className="tpl" style={{ padding: 72, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)', position: 'relative' }}>
      <TplHeader chip="Noticia" size={24} />

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--blue-mid)',
          flexShrink: 0 }}></span>
        <span className="eyebrow">{p.categoria}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingRight: 8 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--navy-ink)',
          letterSpacing: '-0.018em', lineHeight: 1.1 }}>
          {p.titular}
        </div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '94%' }}>
          {p.bajada}
        </div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} />
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-13 · Noticia portrait con take MDO ───────────────────────────
// Slots: CATEGORIA, TITULAR, BAJADA, QUE_SABER_LABEL, QUE_SABER, FUENTE, FECHA, HANDLE
function PoNoticia(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    que_saber_label: '[QUE_SABER_LABEL]', que_saber: '[QUE_SABER]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[34, 40], [52, 35], [72, 30]], 26);
  const bSize = fitSize(p.bajada, [[90, 15.5], [140, 14.5]], 13.5);
  const qSize = fitSize(p.que_saber, [[75, 22], [115, 19]], 17);

  return (
    <div className="tpl" style={{ padding: 52, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <TplHeader chip="Noticia · MDO" size={26} />

      {/* Antes un flex:1 suelto abría un hueco entre la bajada y el callout */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--blue-mid)',
            flexShrink: 0 }}></span>
          <span className="eyebrow">{p.categoria}</span>
        </div>

        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--navy-ink)',
          letterSpacing: '-0.02em', lineHeight: 1.08 }}>
          {p.titular}
        </div>

        <div className="lede" style={{ marginTop: 16, fontSize: bSize, maxWidth: '96%' }}>
          {p.bajada}
        </div>

        <div style={{ marginTop: 22, padding: '18px 22px', background: 'var(--navy)',
          color: 'var(--paper)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
            <span className="asterisk" style={{ fontSize: 22, color: 'var(--blue-lt)' }}>*</span>
            <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--blue-lt)' }}>{p.que_saber_label}</span>
          </div>
          <div className="display-serif" style={{ fontSize: qSize, lineHeight: 1.22,
            color: 'var(--paper)' }}>
            <em>{p.que_saber}</em>
          </div>
        </div>
      </div>

      <SourceFooter fuente={p.fuente} fecha={p.fecha} />
      <HandleFooter handle={p.handle} />
    </div>
  );
}

const EXAMPLES_NEWS = {
  SqNoticia: {
    categoria: 'Impuestos · ARCA',
    titular: 'ARCA extiende el plazo para presentar la DDJJ de Ganancias',
    bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.',
    fuente: 'ARCA · Comunicado oficial',
    fecha: '19 jun 2026',
    handle: '@mdoconsultores',
  },
  PoNoticia: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios',
    bajada: 'A partir del 1° de julio, las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties. Antes el acceso era a 90 días con autorización previa.',
    que_saber_label: 'Qué tenés que saber',
    que_saber: 'Si pagás servicios al exterior, conviene anticipar las facturas de julio para entrar al nuevo plazo más corto.',
    fuente: 'BCRA · Comunicación "A" 7984',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores',
  },
};

// SqNoticia y PoNoticia YA NO se exportan desde acá: las versiones rediseñadas
// (marca v2.0) viven en templates-square.jsx y templates-noticia-v2.jsx. Este
// archivo se quedó en el branding anterior y, al cargarse después de
// templates-square.jsx, las pisaba. Solo aporta sus ejemplos.
Object.assign(window, { EXAMPLES_NEWS });

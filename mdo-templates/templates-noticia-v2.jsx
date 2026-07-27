// templates-noticia-v2.jsx — noticia corregida (po-13d / sq-12d).
// Reemplaza a po-13c y sq-12c en la rutina. Qué se arregló respecto de las
// placas publicadas en junio:
//   · El hueco muerto vertical: título + bajada + cierre son ahora UN grupo
//     centrado; el flex:1 dejó de separar el contenido en dos extremos.
//   · El pie que se partía en dos líneas ("Errepar · ARCA · Resolución"):
//     ahora la fuente se trunca y la fecha nunca se comprime (SourceFooter).
//   · El handle pegado a la fecha: recuperó su línea propia (HandleFooter).
//   · Título de cuerpo fijo: ahora se ajusta al largo del texto (fitSize).
//   · Espacio vacío sin uso: marca de agua del iso en la esquina.
// Requiere tpl-utils.jsx y brand.jsx cargados antes. Regla: ARCA, nunca AFIP.

// ── po-13d · Noticia portrait (base 540×675 → 1080×1350) ────────────
function PoNoticiaV2(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    cierre: '[CIERRE]', fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[34, 46], [52, 40], [72, 35], [96, 30]], 26);
  const bSize = fitSize(p.bajada, [[90, 15.5], [140, 14.5], [200, 13.5]], 12.5);
  const cSize = fitSize(p.cierre, [[55, 23], [95, 20]], 18);

  return (
    <div className="tpl white" style={{ padding: 52, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>

      <IsoWatermark size={280} opacity={0.045}
        style={{ position: 'absolute', right: -70, bottom: 84 }} />

      <TplHeader chip="Noticia" size={26} />
      <div className="hair-navy" style={{ marginTop: 20, opacity: 0.55 }}></div>

      {/* Bloque de contenido: un solo grupo centrado — sin hueco muerto */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--blue-mid)' }}></span>
          <span className="eyebrow">{p.categoria}</span>
        </div>

        <div className="display" style={{ fontSize: tSize, fontWeight: 700,
          color: 'var(--navy-ink)', letterSpacing: '-0.022em', lineHeight: 1.07 }}>
          {p.titular}
        </div>

        <div className="lede" style={{ marginTop: 16, fontSize: bSize, maxWidth: '95%' }}>
          {p.bajada}
        </div>

        {/* Cierre editorial — anclado al contenido, con filete de color */}
        <div style={{ marginTop: 26, paddingLeft: 18, borderLeft: '2px solid var(--blue)' }}>
          <div className="display-serif" style={{ fontSize: cSize, color: 'var(--blue-mid)',
            lineHeight: 1.18 }}>
            <em>{p.cierre}</em>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SourceFooter fuente={p.fuente} fecha={p.fecha} />
        <HandleFooter handle={p.handle} />
      </div>
    </div>
  );
}

// ── sq-12d · Noticia square (base 540×540 → 1080×1080) ──────────────
function SqNoticiaV2(props) {
  const p = Object.assign({
    categoria: '[CATEGORIA]', titular: '[TITULAR]', bajada: '[BAJADA]',
    fuente: '[FUENTE]', fecha: '[FECHA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titular, [[30, 42], [46, 36], [66, 31], [90, 27]], 24);
  const bSize = fitSize(p.bajada, [[80, 14.5], [130, 13.5]], 12.5);

  return (
    <div className="tpl white" style={{ padding: 52, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>

      <IsoWatermark size={240} opacity={0.045}
        style={{ position: 'absolute', right: -60, bottom: 70 }} />

      <TplHeader chip="Noticia" size={24} />
      <div className="hair-navy" style={{ marginTop: 18, opacity: 0.55 }}></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--blue-mid)' }}></span>
          <span className="eyebrow">{p.categoria}</span>
        </div>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--navy-ink)',
          letterSpacing: '-0.02em', lineHeight: 1.08 }}>
          {p.titular}
        </div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '94%' }}>
          {p.bajada}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SourceFooter fuente={p.fuente} fecha={p.fecha} />
        <HandleFooter handle={p.handle} />
      </div>
    </div>
  );
}

const EXAMPLES_NOTICIA_V2 = {
  PoNoticiaV2: {
    categoria: 'Laboral · ARCA',
    titular: 'ARCA abre la Moratoria Laboral para empleadores',
    bajada: 'Empleadores privados pueden regularizar personal no registrado y deudas laborales con importantes beneficios.',
    cierre: 'Una oportunidad para ponerse al día en condiciones que no abundan.',
    fuente: 'Errepar · ARCA · Resolución',
    fecha: '11 jun 2026',
    handle: '@mdoconsultores',
  },
  SqNoticiaV2: {
    categoria: 'Sociedades · Reforma',
    titular: 'Nuevo proyecto de Ley General de Sociedades',
    bajada: 'El Poder Ejecutivo envió al Senado un proyecto para modernizar la constitución y disolución de sociedades.',
    fuente: 'Proyecto de ley · Senado',
    fecha: '24 jun 2026',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoNoticiaV2, SqNoticiaV2, EXAMPLES_NOTICIA_V2 });

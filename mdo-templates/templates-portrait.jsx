// templates-portrait.jsx — placas 4:5, MARCA v2.0 (Manual de Marca 2026).
// Va al repo como mdo-templates/templates-portrait.jsx (reemplaza el actual).
//
// Base 540×675 → 1080×1350. Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
//
// QUÉ CAMBIÓ — mismos IDs y mismos slots:
//   Montserrat → var(--font-body) · Instrument Serif italic → var(--font-accent)
//   oblicua · Geist Mono → var(--font-accent) versalitas · hex → variables.
//   El lockup no baja de 40 (base 540).
//
// MÁRGENES MÍNIMOS — son reglas de negocio, no gusto: Instagram recorta los
// bordes en la grilla del perfil. po-04 mínimo 68, po-16 mínimo 64. Se
// mantienen o suben, NUNCA bajan.
//
// Las del viernes (po-21 a po-25) están en templates-friday.jsx, igual que antes.

// ── po-04 · Guía rápida / Servicio (blanco) ─────────────────────────
// Slots: COPETE, TITULO, BAJADA, BULLET_1..4, CTA, HANDLE
function PoServicio(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', bajada: '[BAJADA]',
    bullet_1: '[BULLET_1]', bullet_2: '[BULLET_2]', bullet_3: '[BULLET_3]',
    bullet_4: '[BULLET_4]', cta: '[CTA]', handle: '[HANDLE]',
  }, props);

  const bullets = [p.bullet_1, p.bullet_2, p.bullet_3, p.bullet_4].filter(Boolean);
  const tSize = fitSize(p.titulo, [[16, 52], [28, 44], [40, 37]], 31);
  const bSize = fitSize(p.bajada, [[70, 16], [110, 14.5]], 13.5);

  return (
    <div className="tpl white" style={{ padding: 68, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={40} />

      <div style={{ marginTop: 28 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700, lineHeight: 1.06,
          whiteSpace: 'pre-line' }}>{p.titulo}</div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '90%' }}>{p.bajada}</div>
      </div>

      <div className="hair-navy" style={{ width: 56, marginTop: 24 }}></div>

      {/* Los bullets se centran: sin vacío abajo cuando hay menos de 4 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 13 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11,
              letterSpacing: '0.04em', color: 'var(--blue-mid)', minWidth: 22,
              flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)',
              lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 18px', background: 'var(--navy)', color: 'var(--paper)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700 }}>{p.cta}</span>
        <span style={{ color: 'var(--grey)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-05 · Anuncio institucional (navy) ────────────────────────────
// La grilla de rótulo/valor es de dos columnas fijas (104px).
// Slots: COPETE, TITULO, SUBTITULO, TEMA, BLOQUE_1..3, FECHA_HORA, HANDLE
function PoAnuncio(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', subtitulo: '[SUBTITULO]', tema: '[TEMA]',
    bloque_1: '[BLOQUE_1]', bloque_2: '[BLOQUE_2]', bloque_3: '[BLOQUE_3]',
    fecha_hora: '[FECHA_HORA]', handle: '[HANDLE]',
  }, props);

  const bloques = [p.bloque_1, p.bloque_2, p.bloque_3].filter(Boolean);
  const tSize = fitSize(p.titulo, [[16, 66], [28, 52], [42, 42]], 34);
  const rowLabel = { fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10.5,
    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-40)' };

  return (
    <div className="tpl navy" style={{ padding: 44, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={360} opacity={0.06}
        style={{ position: 'absolute', right: -100, bottom: -60 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TplHeader chip={p.copete} mode="light" size={40} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <span className="eyebrow" style={{ marginBottom: 20 }}>Anuncio</span>

        <div className="display-serif" style={{ fontSize: tSize, color: 'var(--paper)',
          lineHeight: 1.0 }}><em>{p.titulo}</em></div>
        <div style={{ marginTop: 10, fontFamily: 'var(--font-accent)', fontWeight: 700,
          fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--ink-40)' }}>{p.subtitulo}</div>

        <div className="hair" style={{ marginTop: 24, marginBottom: 20, width: '60%' }}></div>

        <div style={{ display: 'grid', gridTemplateColumns: '104px 1fr', rowGap: 12, columnGap: 16,
          fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--paper)',
          alignItems: 'start' }}>
          <div style={rowLabel}>Tema</div>
          <div>{p.tema}</div>
          <div style={rowLabel}>Bloques</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {bloques.map((b, i) => <span key={i} className="chip" style={{ fontSize: 9.5 }}>{b}</span>)}
          </div>
          <div style={rowLabel}>Cuándo</div>
          <div>{p.fecha_hora}</div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <HandleFooter handle={p.handle} mode="light" />
      </div>
    </div>
  );
}

// ── po-06 · Voz experta / Equipo (blanco) ───────────────────────────
// La única con foto en el bloque superior (320px). La bio se estira y los
// tags quedan pegados al pie.
// Slots: COPETE, NOMBRE, ROL, BIO, TAG_1..4, FOTO_CAPTION, HANDLE
function PoEquipo(props) {
  const p = Object.assign({
    copete: '[COPETE]', nombre: '[NOMBRE]', rol: '[ROL]', bio: '[BIO]',
    tag_1: '[TAG_1]', tag_2: '[TAG_2]', tag_3: '[TAG_3]', tag_4: '[TAG_4]',
    foto_caption: '[FOTO_CAPTION]', handle: '[HANDLE]',
  }, props);

  const tags = [p.tag_1, p.tag_2, p.tag_3, p.tag_4].filter(Boolean);
  const nSize = fitSize(p.nombre, [[16, 44], [26, 37], [36, 31]], 27);
  const bioSize = fitSize(p.bio, [[130, 14.5], [190, 13.5]], 12.5);

  return (
    <div className="tpl white" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 320, position: 'relative', flexShrink: 0 }}>
        <div className="slot" style={{ width: '100%', height: '100%', border: 'none' }}></div>
        <span className="slot-cap" style={{ left: 'auto', right: 12, top: 12, bottom: 'auto' }}>
          {p.foto_caption}
        </span>
        <div style={{ position: 'absolute', left: 36, top: 24 }}><Lockup size={40} /></div>
        <div style={{ position: 'absolute', left: 36, bottom: 18 }}>
          <span className="chip solid">{p.copete}</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '26px 40px 28px', display: 'flex', flexDirection: 'column',
        minHeight: 0 }}>
        <div className="display-serif" style={{ fontSize: nSize, color: 'var(--navy)',
          lineHeight: 1.02 }}><em>{p.nombre}</em></div>
        <div style={{ marginTop: 6, fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--blue-mid)' }}>{p.rol}</div>

        <div className="hair" style={{ marginTop: 16, marginBottom: 14, width: '40%' }}></div>

        <div className="lede" style={{ flex: 1, fontSize: bioSize }}>{p.bio}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {tags.map((a, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10,
              letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px',
              border: '1px solid var(--hair-2)', color: 'var(--navy)',
              whiteSpace: 'nowrap' }}>{a}</span>
          ))}
        </div>
        <HandleFooter handle={p.handle} />
      </div>
    </div>
  );
}

// ── po-16 · Spotlight de servicio (navy) ────────────────────────────
// Margen mínimo 64. Es la placa de marca: navy, título grande y nada más.
// Slots: COPETE, TITULO, BAJADA, HANDLE
function PoSpotlight(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', bajada: '[BAJADA]', handle: '[HANDLE]',
  }, props);

  const tSize = fitSize(p.titulo, [[16, 64], [26, 54], [38, 44]], 36);
  const bSize = fitSize(p.bajada, [[80, 17], [125, 15.5]], 14);

  return (
    <div className="tpl navy" style={{ padding: 64, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={420} opacity={0.07}
        style={{ position: 'absolute', right: -120, bottom: -80 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TplHeader chip={p.copete} mode="light" size={40} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="display-serif" style={{ fontSize: tSize, color: 'var(--paper)',
          lineHeight: 1.02 }}><em>{p.titulo}</em></div>
        <div className="lede" style={{ marginTop: 22, fontSize: bSize, maxWidth: '86%',
          lineHeight: 1.45 }}>{p.bajada}</div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <HandleFooter handle={p.handle} mode="light" />
      </div>
    </div>
  );
}

const EXAMPLES_PORTRAIT = {
  PoServicio: {
    copete: 'Servicio · MDO', titulo: 'Auditoría externa',
    bajada: 'Estados contables auditados con criterio profesional y normativa vigente.',
    bullet_1: 'Auditoría de estados contables anuales',
    bullet_2: 'Revisión limitada de información intermedia',
    bullet_3: 'Informes especiales sobre patrimonio y resultados',
    bullet_4: 'Atención de requerimientos ARCA / IGJ / CNV',
    cta: 'Consultanos', handle: '@mdoconsultores',
  },
  PoAnuncio: {
    copete: 'Anuncio', titulo: 'Reforma fiscal', subtitulo: 'Webinar gratuito',
    tema: 'Análisis ejecutivo de los cambios 2026',
    bloque_1: 'Impuestos', bloque_2: 'Sociedades', bloque_3: 'Sueldos',
    fecha_hora: 'Jueves 19 · 19:00 h', handle: '@mdoconsultores',
  },
  PoEquipo: {
    copete: 'Voz experta · MDO', nombre: 'Lucía Martínez', rol: 'Socia · Impuestos',
    bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual.',
    tag_1: 'Ganancias', tag_2: 'IVA', tag_3: 'Bienes personales', tag_4: 'Fiscalizaciones ARCA',
    foto_caption: 'Retrato · 4:5', handle: '@mdoconsultores',
  },
  PoSpotlight: {
    copete: 'Servicios', titulo: 'Asesoramiento Impositivo',
    bajada: 'Planificamos la carga fiscal de tu PyME para que pagues lo justo, sin sorpresas.',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoServicio, PoAnuncio, PoEquipo, PoSpotlight, EXAMPLES_PORTRAIT });

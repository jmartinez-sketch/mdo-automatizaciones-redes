// templates-portrait.jsx — 4 plantillas portrait (4:5) para MDO. CORREGIDO.
// Artboard 540×675 (IG = 1080×1350).
//
// Correcciones respecto de la versión anterior (mismos IDs y slots):
//   · po-04: el título ya no depende de un \n manual (whiteSpace pre-line se
//     mantiene por compatibilidad, pero el cuerpo se ajusta solo con fitSize);
//     los bullets se centran en su bloque en vez de quedar arriba con vacío
//     abajo; el pie dice el sitio, como el resto de las placas.
//   · po-05 / po-16: los titulares serif (68px y 64px fijos) desbordaban con
//     nombres largos — ahora se ajustan al largo del texto.
//   · po-06: los tags dejaron de empujar el pie con un flex:1 fantasma.
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

// ── po-04 · Guía rápida / Servicio ──────────────────────────────────
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
    <div className="tpl" style={{ padding: 68, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <TplHeader chip={p.copete} size={26} />

      <div style={{ marginTop: 28 }}>
        <div className="display" style={{ fontSize: tSize, fontWeight: 600, color: 'var(--navy)',
          whiteSpace: 'pre-line', lineHeight: 1.06 }}>
          {p.titulo}
        </div>
        <div className="lede" style={{ marginTop: 14, fontSize: bSize, maxWidth: '90%' }}>{p.bajada}</div>
      </div>

      <div className="hair-navy" style={{ width: 56, marginTop: 24 }}></div>

      {/* Los bullets se centran en el espacio disponible: sin vacío abajo */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 13 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, color: 'var(--blue-mid)',
              minWidth: 22, fontWeight: 500, letterSpacing: '0.04em', flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)',
              lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 18px', background: 'var(--navy)', color: 'var(--paper)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>{p.cta}</span>
        <span style={{ color: 'var(--blue-lt)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-05 · Anuncio institucional ───────────────────────────────────
// Slots: COPETE, TITULO, SUBTITULO, TEMA, BLOQUE_1..3, FECHA_HORA, HANDLE
function PoAltaCliente(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo: '[TITULO]', subtitulo: '[SUBTITULO]', tema: '[TEMA]',
    bloque_1: '[BLOQUE_1]', bloque_2: '[BLOQUE_2]', bloque_3: '[BLOQUE_3]',
    fecha_hora: '[FECHA_HORA]', handle: '[HANDLE]',
  }, props);

  const bloques = [p.bloque_1, p.bloque_2, p.bloque_3].filter(Boolean);
  const tSize = fitSize(p.titulo, [[16, 66], [28, 52], [42, 42]], 34);

  const rowLabel = {
    color: 'rgba(247,249,252,0.55)', fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10.5,
    letterSpacing: '0.1em', textTransform: 'uppercase',
  };

  return (
    <div className="tpl navy" style={{ padding: 44, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={360} opacity={0.06}
        style={{ position: 'absolute', right: -100, bottom: -60 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TplHeader chip={p.copete} mode="light" size={26} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Anuncio</div>

        <div className="display-serif" style={{ fontSize: tSize, color: 'var(--paper)',
          lineHeight: 1.0 }}>
          <em>{p.titulo}</em>
        </div>
        <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 13, letterSpacing: '0.18em',
          color: 'rgba(247,249,252,0.55)', marginTop: 10, textTransform: 'uppercase' }}>
          {p.subtitulo}
        </div>

        <div className="hair" style={{ background: 'rgba(247,249,252,0.20)', marginTop: 24,
          marginBottom: 20, width: '60%' }}></div>

        <div style={{ display: 'grid', gridTemplateColumns: '104px 1fr', rowGap: 12, columnGap: 16,
          fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--paper)',
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
        <HandleFooter handle={p.handle} mode="light" />
      </div>
    </div>
  );
}

// ── po-06 · Voz experta / Equipo ────────────────────────────────────
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
    <div className="tpl" style={{ padding: 0, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <div style={{ height: 320, position: 'relative' }}>
        <div className="slot" style={{ position: 'absolute', inset: 0, borderLeft: 'none',
          borderRight: 'none', borderTop: 'none' }}>
          <div style={{ position: 'absolute', right: 12, top: 12, fontFamily: 'var(--font-accent)', fontWeight: 700,
            fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--ink-55)' }}>{p.foto_caption}</div>
        </div>
        <div style={{ position: 'absolute', left: 36, bottom: 18 }}>
          <span className="chip solid">{p.copete}</span>
        </div>
        <div style={{ position: 'absolute', left: 36, top: 24 }}>
          <Lockup size={24} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '26px 40px 28px', display: 'flex', flexDirection: 'column' }}>
        <div className="display-serif" style={{ fontSize: nSize, color: 'var(--navy-ink)',
          marginBottom: 6, lineHeight: 1.02 }}>
          <em>{p.nombre}</em>
        </div>
        <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.18em',
          color: 'var(--blue-mid)', textTransform: 'uppercase', fontWeight: 500 }}>
          {p.rol}
        </div>

        <div className="hair" style={{ marginTop: 16, marginBottom: 14, width: '40%' }}></div>

        {/* La bio ocupa el espacio libre; los tags quedan pegados al pie */}
        <div className="lede" style={{ flex: 1, fontSize: bioSize }}>{p.bio}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {tags.map((a, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10,
              letterSpacing: '0.1em', padding: '4px 8px', border: '1px solid var(--hair-2)',
              textTransform: 'uppercase', color: 'var(--navy)', whiteSpace: 'nowrap' }}>{a}</span>
          ))}
        </div>

        <HandleFooter handle={p.handle} />
      </div>
    </div>
  );
}

// ── po-16 · Spotlight de servicio (marca) ───────────────────────────
// Slots: COPETE, TITULO, BAJADA, HANDLE
function PoServicioSpotlight(props) {
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
        <TplHeader chip={p.copete} mode="light" size={26} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="display-serif" style={{ fontSize: tSize, color: 'var(--paper)',
          lineHeight: 1.02 }}>
          <em>{p.titulo}</em>
        </div>
        <div className="lede" style={{ marginTop: 22, fontSize: bSize,
          color: 'rgba(247,249,252,0.78)', maxWidth: '86%', lineHeight: 1.45 }}>
          {p.bajada}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <HandleFooter handle={p.handle} mode="light" />
      </div>
    </div>
  );
}

const EXAMPLES_PORTRAIT = {
  PoServicio: {
    copete: 'Servicio · MDO',
    titulo: 'Auditoría externa',
    bajada: 'Estados contables auditados con criterio profesional y normativa vigente.',
    bullet_1: 'Auditoría de estados contables anuales',
    bullet_2: 'Revisión limitada de información intermedia',
    bullet_3: 'Informes especiales sobre patrimonio y resultados',
    bullet_4: 'Atención de requerimientos ARCA / IGJ / CNV',
    cta: 'Consultanos',
    handle: '@mdoconsultores',
  },
  PoAltaCliente: {
    copete: 'Anuncio',
    titulo: 'Reforma fiscal',
    subtitulo: 'Webinar gratuito',
    tema: 'Análisis ejecutivo de los cambios 2026',
    bloque_1: 'Impuestos', bloque_2: 'Sociedades', bloque_3: 'Sueldos',
    fecha_hora: 'Jueves 19 · 19:00 h',
    handle: '@mdoconsultores',
  },
  PoEquipo: {
    copete: 'Voz experta · MDO',
    nombre: 'Lucía Martínez',
    rol: 'Socia · Impuestos',
    bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual.',
    tag_1: 'Ganancias', tag_2: 'IVA', tag_3: 'Bienes personales', tag_4: 'Fiscalizaciones ARCA',
    foto_caption: 'Retrato · 4:5',
    handle: '@mdoconsultores',
  },
  PoServicioSpotlight: {
    copete: 'Servicios',
    titulo: 'Asesoramiento Impositivo',
    bajada: 'Planificamos la carga fiscal de tu PyME para que pagues lo justo, sin sorpresas.',
    handle: '@mdoconsultores',
  },
};

Object.assign(window, { PoServicio, PoAltaCliente, PoEquipo, PoServicioSpotlight, EXAMPLES_PORTRAIT });

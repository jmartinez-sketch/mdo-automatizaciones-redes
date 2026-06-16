// templates-portrait.jsx — 3 portrait (4:5) IG post templates.
// Artboard size: 540 × 675 (real IG = 1080×1350).
// Defaults use [PLACEHOLDER] literals; EXAMPLES_PORTRAIT provides realistic
// preview data for the canvas.

// ─────────────────────────────────────────────────────────────────────
// 04 — Guía rápida / Servicio
// Slots: COPETE, TITULO, BAJADA, BULLET_1..BULLET_4, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoServicio(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    titulo: '[TITULO]',
    bajada: '[BAJADA]',
    bullet_1: '[BULLET_1]',
    bullet_2: '[BULLET_2]',
    bullet_3: '[BULLET_3]',
    bullet_4: '[BULLET_4]',
    cta: '[CTA]',
    handle: '[HANDLE]',
  }, props);

  const bullets = [p.bullet_1, p.bullet_2, p.bullet_3, p.bullet_4].filter(Boolean);

  return (
    <div className="tpl" style={{ padding: 68, display: 'flex', flexDirection: 'column', background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} />
        <div className="mono">{p.copete}</div>
      </div>

      <div style={{ marginTop: 30 }}>
        <div className="display" style={{ fontSize: 52, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'pre-line' }}>
          {p.titulo}
        </div>
        <div className="lede" style={{ marginTop: 14, fontSize: 16, maxWidth: '88%' }}>{p.bajada}</div>
      </div>

      <div className="hair-navy" style={{ width: 56, marginTop: 26, marginBottom: 18 }}></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: 'var(--blue-mid)',
              minWidth: 22, fontWeight: 500, letterSpacing: '0.04em' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15.5, color: 'var(--ink)',
              lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, padding: '14px 18px', background: 'var(--navy)', color: 'var(--paper)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2 }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500,
          letterSpacing: '0.02em' }}>{p.cta}</span>
        <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, fontStyle: 'italic' }}>→</span>
      </div>

      <div className="footer-row" style={{ marginTop: 14 }}>
        <span>{p.handle}</span>
        <span>Buenos Aires</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 05 — Anuncio institucional
// Slots: COPETE, TITULO, SUBTITULO, TEMA, BLOQUE_1..3, FECHA_HORA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoAltaCliente(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    titulo: '[TITULO]',
    subtitulo: '[SUBTITULO]',
    tema: '[TEMA]',
    bloque_1: '[BLOQUE_1]',
    bloque_2: '[BLOQUE_2]',
    bloque_3: '[BLOQUE_3]',
    fecha_hora: '[FECHA_HORA]',
    handle: '[HANDLE]',
  }, props);

  const bloques = [p.bloque_1, p.bloque_2, p.bloque_3].filter(Boolean);

  return (
    <div className="tpl navy" style={{ padding: 40, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <IsoWatermark mode="light" size={360} opacity={0.06}
        style={{ position: 'absolute', right: -100, bottom: -60 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Lockup mode="light" size={26} />
        <div className="chip">{p.copete}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 22, color: 'var(--blue-lt)' }}>
          Anuncio
        </div>

        <div className="display-serif" style={{ fontSize: 68, color: 'var(--paper)', lineHeight: 0.98 }}>
          <em>{p.titulo}</em>
        </div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 14, letterSpacing: '0.18em',
          color: 'rgba(247,249,252,0.55)', marginTop: 10, textTransform: 'uppercase' }}>
          {p.subtitulo}
        </div>

        <div className="hair" style={{ background: 'rgba(247,249,252,0.20)', marginTop: 26, marginBottom: 20,
          width: '60%' }}></div>

        <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: 12, columnGap: 16,
          fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: 'var(--paper)' }}>
          <div style={{ color: 'rgba(247,249,252,0.55)', fontFamily: 'Geist Mono, monospace', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tema</div>
          <div>{p.tema}</div>
          <div style={{ color: 'rgba(247,249,252,0.55)', fontFamily: 'Geist Mono, monospace', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase' }}>Bloques</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {bloques.map((b, i) => (
              <span key={i} className="chip" style={{ fontSize: 9.5 }}>{b}</span>
            ))}
          </div>
          <div style={{ color: 'rgba(247,249,252,0.55)', fontFamily: 'Geist Mono, monospace', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cuándo</div>
          <div>{p.fecha_hora}</div>
        </div>
      </div>

      <div className="footer-row" style={{ color: 'rgba(247,249,252,0.55)', position: 'relative' }}>
        <span>{p.handle}</span>
        <span>mdo-consultores.com.ar</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 06 — Voz experta / Equipo
// Slots: COPETE, NOMBRE, ROL, BIO, TAG_1..TAG_4, FOTO_CAPTION, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoEquipo(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    nombre: '[NOMBRE]',
    rol: '[ROL]',
    bio: '[BIO]',
    tag_1: '[TAG_1]',
    tag_2: '[TAG_2]',
    tag_3: '[TAG_3]',
    tag_4: '[TAG_4]',
    foto_caption: '[FOTO_CAPTION]',
    handle: '[HANDLE]',
  }, props);

  const tags = [p.tag_1, p.tag_2, p.tag_3, p.tag_4].filter(Boolean);

  return (
    <div className="tpl" style={{ padding: 0, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <div style={{ height: 320, position: 'relative', margin: 0 }}>
        <div className="slot" style={{ position: 'absolute', inset: 0, borderLeft: 'none', borderRight: 'none',
          borderTop: 'none' }}>
          {/* Slot caption pinned top-right so it doesn't clash with the chip */}
          <div style={{ position: 'absolute', right: 12, top: 12,
            fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--ink-55)' }}>{p.foto_caption}</div>
        </div>
        <div style={{ position: 'absolute', left: 36, bottom: 18 }}>
          <span className="chip solid">{p.copete}</span>
        </div>
        <div style={{ position: 'absolute', left: 36, top: 24 }}>
          <Lockup size={24} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '28px 40px 30px', display: 'flex', flexDirection: 'column' }}>
        <div className="display-serif" style={{ fontSize: 44, color: 'var(--navy-ink)', marginBottom: 6 }}>
          <em>{p.nombre}</em>
        </div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11.5, letterSpacing: '0.18em',
          color: 'var(--blue-mid)', textTransform: 'uppercase', fontWeight: 500 }}>
          {p.rol}
        </div>

        <div className="hair" style={{ marginTop: 18, marginBottom: 16, width: '40%' }}></div>

        <div className="lede" style={{ fontSize: 14.5, marginBottom: 14 }}>{p.bio}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
          {tags.map((a, i) => (
            <span key={i} style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.1em',
              padding: '4px 8px', border: '1px solid var(--hair-2)', borderRadius: 2,
              textTransform: 'uppercase', color: 'var(--navy)' }}>{a}</span>
          ))}
        </div>

        <div className="footer-row" style={{ marginTop: 14 }}>
          <span>{p.handle}</span>
          <span>Equipo · MDO</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 16 — Spotlight de servicio (marca + 1 servicio)
// Brand-forward: logo + isologo grande de fondo, nombre del servicio en
// serif y UNA línea de beneficio. Sin listas ni grillas. Post institucional
// quincenal para variar el formato del feed.
// Slots: COPETE, TITULO, BAJADA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoServicioSpotlight(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    titulo: '[TITULO]',
    bajada: '[BAJADA]',
    handle: '[HANDLE]',
  }, props);

  return (
    <div className="tpl navy" style={{ padding: 64, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <IsoWatermark mode="light" size={420} opacity={0.07}
        style={{ position: 'absolute', right: -120, bottom: -80 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Lockup mode="light" size={26} />
        <div className="chip">{p.copete}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative' }}>
        <div className="display-serif" style={{ fontSize: 64, color: 'var(--paper)', lineHeight: 1.0 }}>
          <em>{p.titulo}</em>
        </div>
        <div className="lede" style={{ marginTop: 24, fontSize: 17, color: 'rgba(247,249,252,0.78)',
          maxWidth: '84%', lineHeight: 1.45 }}>
          {p.bajada}
        </div>
      </div>

      <div className="footer-row" style={{ color: 'rgba(247,249,252,0.55)', position: 'relative' }}>
        <span>{p.handle}</span>
        <span>mdo-consultores.com.ar</span>
      </div>
    </div>
  );
}

const EXAMPLES_PORTRAIT = {
  PoServicio: {
    copete: 'Servicio · MDO',
    titulo: 'Auditoría\nexterna',
    bajada: 'Estados contables auditados con criterio profesional y normativa vigente.',
    bullet_1: 'Auditoría de estados contables anuales',
    bullet_2: 'Revisión limitada de información intermedia',
    bullet_3: 'Informes especiales sobre patrimonio y resultados',
    bullet_4: 'Atención de requerimientos AFIP / IGJ / CNV',
    cta: 'Consultanos · mdo-consultores.com.ar',
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
    tag_1: 'Ganancias', tag_2: 'IVA', tag_3: 'Bienes personales', tag_4: 'Fiscalizaciones AFIP',
    foto_caption: 'RETRATO · 4:5',
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

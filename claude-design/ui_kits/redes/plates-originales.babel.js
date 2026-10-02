// plates-originales.jsx — TANDA 1: las 7 plantillas "originales" del repo que
// faltaban. Recreadas leyendo el JSX de mdo-automatizaciones-redes
// (templates-portrait.jsx, templates-news.jsx, templates-story.jsx), valor por
// valor: paddings, alturas, saltos de fitSize y margenes minimos.
//
// Adaptaciones de marca (v2.0), las mismas en las tres tandas:
//   Montserrat        → Open Sans  (--font-display / --font-body)
//   Geist Mono        → Chivo 700 versalitas (--font-accent)
//   Instrument Serif  → Chivo 300 italica (--font-accent, fontStyle italic)
//   #1f4e79 y cia     → tokens de la paleta oficial
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, PlateHeader, Chip, HandleFooter, SourceFooter, Slot,
  Eyebrow, Display, Lede, Rule, IsoWatermark, Lockup } = NS;
const BO = '../../assets/logos';
const fitO = (t, s, f) => window.fitSize(t, s, f);

// El rol que en el repo cumplia Instrument Serif italic. El manual no define
// serif, pero SI usa italica: Chivo 300 oblicua.
const acentoIta = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300,
  fontSize: size, lineHeight: lh || 1.02, color, letterSpacing: '-0.015em',
});
// El rol que cumplia Geist Mono: rotulo corto en versalitas.
const rotulo = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: size,
  letterSpacing: ls || '0.1em', textTransform: 'uppercase', color,
});

/* ── sq-12 · Noticia square (la del newsletter de Gmail) ────────────
   Margen minimo 72: es el mas alto de todo el catalogo. */
function SqNoticia({ categoria, titular, bajada, fuente, fecha, handle, scale }) {
  return (
    <Plate format="square" tone="white" pad={72} scale={scale}>
      <PlateHeader chip="Noticia" base={BO} />
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 24, height: 1, background: 'var(--navy-lift)', flexShrink: 0 }} />
        <Eyebrow>{categoria}</Eyebrow>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 8 }}>
        <Display level={2} style={{ fontSize: fitO(titular, [[30, 38], [46, 33], [66, 28]], 24), fontWeight: 700, letterSpacing: '-0.018em', lineHeight: 1.1 }}>{titular}</Display>
        <Lede size="body" style={{ marginTop: 14, fontSize: fitO(bajada, [[80, 14.5], [130, 13.5]], 12.5), maxWidth: '94%' }}>{bajada}</Lede>
      </div>
      <SourceFooter fuente={fuente} fecha={fecha} />
      <HandleFooter handle={handle} style={{ marginTop: 8 }} />
    </Plate>
  );
}

/* ── po-04 · Guia rapida / Servicio ────────────────────────────────
   Margen minimo 68. Los bullets van numerados y centrados en su bloque. */
function PoServicio({ copete, titulo, bajada, bullet_1, bullet_2, bullet_3, bullet_4, cta, handle, scale }) {
  const bullets = [bullet_1, bullet_2, bullet_3, bullet_4].filter(Boolean);
  return (
    <Plate format="portrait" tone="white" pad={68} scale={scale}>
      <PlateHeader chip={copete} base={BO} />
      <div style={{ marginTop: 28 }}>
        <Display level={2} style={{ fontSize: fitO(titulo, [[16, 52], [28, 44], [40, 37]], 31), fontWeight: 700, lineHeight: 1.06, whiteSpace: 'pre-line' }}>{titulo}</Display>
        <Lede size="body" style={{ marginTop: 14, fontSize: fitO(bajada, [[70, 16], [110, 14.5]], 13.5), maxWidth: '90%' }}>{bajada}</Lede>
      </div>
      <div style={{ width: 56, height: 1, background: 'var(--navy)', marginTop: 24 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 13 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ ...rotulo(11, 'var(--navy-lift)', '0.04em'), minWidth: 22, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 18px', background: 'var(--navy)', color: 'var(--paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700 }}>{cta}</span>
        <span style={{ color: 'var(--grey)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-05 · Anuncio institucional ─────────────────────────────────
   Navy con marca de agua y una grilla de dos columnas: rotulo / valor. */
function PoAnuncio({ copete, titulo, subtitulo, tema, bloque_1, bloque_2, bloque_3, fecha_hora, handle, scale }) {
  const bloques = [bloque_1, bloque_2, bloque_3].filter(Boolean);
  const lbl = rotulo(10.5, 'var(--text-muted-on-inverse)');
  return (
    <Plate format="portrait" tone="navy" pad={44} scale={scale}>
      <IsoWatermark size={360} opacity={0.06} tone="paper" base={BO} style={{ right: -100, bottom: -60 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PlateHeader chip={copete} onInverse base={BO} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Eyebrow onInverse style={{ marginBottom: 20 }}>Anuncio</Eyebrow>
        <div style={acentoIta(fitO(titulo, [[16, 66], [28, 52], [42, 42]], 34), 'var(--paper)', 1.0)}>{titulo}</div>
        <div style={{ ...rotulo(13, 'var(--text-muted-on-inverse)', '0.18em'), marginTop: 10 }}>{subtitulo}</div>
        <Rule onInverse strong style={{ marginTop: 24, marginBottom: 20, width: '60%' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '104px 1fr', rowGap: 12, columnGap: 16, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--paper)', alignItems: 'start' }}>
          <div style={lbl}>Tema</div><div>{tema}</div>
          <div style={lbl}>Bloques</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{bloques.map((b, i) => <Chip key={i} onInverse style={{ fontSize: 9.5 }}>{b}</Chip>)}</div>
          <div style={lbl}>Cuándo</div><div>{fecha_hora}</div>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HandleFooter handle={handle} onInverse />
      </div>
    </Plate>
  );
}

/* ── po-06 · Voz experta / Equipo ──────────────────────────────────
   Foto de 320 arriba, ficha abajo. La bio se estira y los tags quedan al pie. */
function PoEquipo({ copete, nombre, rol, bio, tag_1, tag_2, tag_3, tag_4, foto_caption, handle, scale }) {
  const tags = [tag_1, tag_2, tag_3, tag_4].filter(Boolean);
  return (
    <Plate format="portrait" tone="white" pad={0} scale={scale}>
      <div style={{ height: 320, position: 'relative', flexShrink: 0 }}>
        <Slot caption="" height="100%" style={{ border: 'none', borderRadius: 0 }} />
        <div style={{ position: 'absolute', right: 12, top: 12, ...rotulo(10, 'var(--ink-55)', '0.06em') }}>{foto_caption}</div>
        <div style={{ position: 'absolute', left: 36, top: 24 }}><Lockup variant="principal" height={40} base={BO} /></div>
        <div style={{ position: 'absolute', left: 36, bottom: 18 }}><Chip solid>{copete}</Chip></div>
      </div>
      <div style={{ flex: 1, padding: '26px 40px 28px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={acentoIta(fitO(nombre, [[16, 44], [26, 37], [36, 31]], 27), 'var(--navy)', 1.02)}>{nombre}</div>
        <div style={{ ...rotulo(11, 'var(--navy-lift)', '0.18em'), marginTop: 6 }}>{rol}</div>
        <Rule style={{ marginTop: 16, marginBottom: 14, width: '40%' }} />
        <Lede size="body" style={{ flex: 1, fontSize: fitO(bio, [[130, 14.5], [190, 13.5]], 12.5) }}>{bio}</Lede>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {tags.map((a, i) => (
            <span key={i} style={{ ...rotulo(10, 'var(--navy)'), padding: '4px 8px', border: '1px solid var(--hair-2)', whiteSpace: 'nowrap' }}>{a}</span>
          ))}
        </div>
        <HandleFooter handle={handle} />
      </div>
    </Plate>
  );
}

/* ── po-16 · Spotlight de servicio ─────────────────────────────────
   Margen minimo 64. Navy, titulo en italica grande y nada mas. */
function PoSpotlight({ copete, titulo, bajada, handle, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={64} scale={scale}>
      <IsoWatermark size={420} opacity={0.07} tone="paper" base={BO} style={{ right: -120, bottom: -80 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PlateHeader chip={copete} onInverse base={BO} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={acentoIta(fitO(titulo, [[16, 64], [26, 54], [38, 44]], 36), 'var(--paper)', 1.02)}>{titulo}</div>
        <Lede size="body" onInverse style={{ marginTop: 22, fontSize: fitO(bajada, [[80, 17], [125, 15.5]], 14), maxWidth: '86%', lineHeight: 1.45 }}>{bajada}</Lede>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HandleFooter handle={handle} onInverse />
      </div>
    </Plate>
  );
}

/* ── st-08 · Cita vertical ─────────────────────────────────────────
   Story: padding de zona segura 120/40/155. La comilla cuelga a proposito. */
function StCita({ copete, cita, autor, rol_autor, handle, scale }) {
  return (
    <Plate format="story" tone="white" scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup variant="principal" height={40} base={BO} />
        <Chip>Pensamiento</Chip>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div aria-hidden="true" style={{ fontFamily: 'var(--font-accent)', fontWeight: 300, fontSize: 180, lineHeight: 0.7, color: 'var(--grey)', position: 'absolute', top: -50, left: -10, zIndex: 0 }}>“</div>
        <Eyebrow style={{ marginBottom: 26, position: 'relative' }}>{copete}</Eyebrow>
        <div style={{ ...acentoIta(fitO(cita, [[58, 52], [95, 44], [140, 37]], 30), 'var(--navy)', 1.08), position: 'relative' }}>{cita}</div>
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
          <span style={{ width: 36, height: 1, background: 'var(--navy)', marginTop: 9, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{autor}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-55)', marginTop: 2 }}>{rol_autor}</div>
          </div>
        </div>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── st-09 · CTA / Consultanos ─────────────────────────────────────
   Titular de tres lineas: el cuerpo lo manda la linea mas larga, y la del
   medio va en italica y un 28% mas grande. Canales en tabla navy. */
function StCTA({ copete, titular_1, titular_2, titular_3, bajada,
  canal_1_label, canal_1_valor, canal_2_label, canal_2_valor, canal_3_label, canal_3_valor, handle, scale }) {
  const canales = [
    { l: canal_1_label, v: canal_1_valor }, { l: canal_2_label, v: canal_2_valor }, { l: canal_3_label, v: canal_3_valor },
  ].filter((c) => c.l && c.v);
  const maxLen = Math.max(String(titular_1 || '').length, String(titular_2 || '').length, String(titular_3 || '').length);
  const h = fitO('x'.repeat(maxLen), [[9, 70], [13, 56], [19, 44]], 36);
  const sans = { fontFamily: 'var(--font-display)', fontSize: h, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.025em', lineHeight: 0.98 };
  return (
    <Plate format="story" tone="white" scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup variant="principal" height={40} base={BO} />
        <Chip>Consultanos</Chip>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 16 }}>{copete}</Eyebrow>
        <div style={sans}>{titular_1}</div>
        <div style={acentoIta(Math.round(h * 1.28), 'var(--navy-lift)', 0.92)}>{titular_2}</div>
        <div style={sans}>{titular_3}</div>
        <Lede size="body" style={{ marginTop: 24, fontSize: fitO(bajada, [[95, 16], [140, 14.5]], 13.5), maxWidth: '90%' }}>{bajada}</Lede>
      </div>
      <div>
        <div style={{ background: 'var(--navy)', color: 'var(--paper)', padding: '20px 22px' }}>
          {canales.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '9px 0', borderBottom: i < canales.length - 1 ? '1px solid var(--rule-on-inverse)' : 'none' }}>
              <span style={{ ...rotulo(10, 'var(--grey)', '0.16em'), flexShrink: 0 }}>{c.l}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{c.v}</span>
            </div>
          ))}
        </div>
        <HandleFooter handle={handle} style={{ marginTop: 14 }} />
      </div>
    </Plate>
  );
}

Object.assign(window, { SqNoticia, PoServicio, PoAnuncio, PoEquipo, PoSpotlight, StCita, StCTA });

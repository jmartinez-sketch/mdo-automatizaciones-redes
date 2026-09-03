// plates-variants.jsx — TANDA 6: las 8 variantes de color y composición de
// las plantillas base. Recreadas leyendo templates-variants.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// Una variante no es una plantilla nueva: es la MISMA composición con otro
// fondo o otro recurso tipográfico, y existe para que dos posts seguidos de la
// misma familia no se vean iguales en la grilla del perfil.
//
// Zona segura de stories: el padding 40 dejaba el lockup y el pie DEBAJO de la
// interfaz de Instagram (tapa ~111px arriba y ~147px abajo en unidades de
// diseño). Las dos stories de acá usan el padding de zona segura.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, PlateHeader, Chip, HandleFooter, SourceFooter, Eyebrow, Display, Lede, IsoWatermark, Lockup } = NS;
const BV = '../../assets/logos';
const fitV = (t, s, f) => window.fitSize(t, s, f);

const rotV = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: size,
  letterSpacing: ls || '0.1em', textTransform: 'uppercase', color,
});
const itaV = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300,
  fontSize: size, lineHeight: lh || 1.1, color,
});

/* ── sq-02b · Cita en navy (variante de sq-02) ─────────────────────── */
function SqCitaNavy({ copete, cita, autor, rol_autor, handle, scale }) {
  return (
    <Plate format="square" tone="navy" pad={44} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Lockup variant="principal" tone="paper" height={40} base={BV} />
        <div aria-hidden="true" style={{ ...itaV(96, 'var(--grey)', 0.7), marginTop: -16, marginRight: -6 }}>“</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 8 }}>
        <Eyebrow onInverse style={{ marginBottom: 20 }}>{copete}</Eyebrow>
        <div style={itaV(fitV(cita, [[58, 40], [95, 34], [140, 29]], 25), 'var(--paper)', 1.14)}>{cita}</div>
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ width: 28, height: 1, background: 'var(--paper)', marginTop: 8, flexShrink: 0 }} />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--paper)' }}>
            {autor}
            <div style={{ fontWeight: 400, color: 'var(--text-muted-on-inverse)', fontSize: 11.5, marginTop: 2, letterSpacing: 0 }}>{rol_autor}</div>
          </div>
        </div>
      </div>
      <HandleFooter handle={handle} onInverse />
    </Plate>
  );
}

/* ── sq-03b · Número en itálica (variante de sq-03) ────────────────────
   La base usa Chivo 300 recto; esta lo pone en oblicua y sobre gris claro. */
function SqNumeroSerif({ copete, numero, unidad, descripcion, pie, handle, scale }) {
  return (
    <Plate format="square" tone="pale" pad={44} scale={scale}>
      <PlateHeader chip="Est. 1972" base={BV} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 16 }}>{copete}</Eyebrow>
        <div style={{ ...itaV(fitV(numero, [[2, 220], [3, 182], [4, 148]], 120), 'var(--navy)', 0.86), letterSpacing: '-0.02em' }}>{numero}</div>
        <div style={{ marginTop: 16, fontFamily: 'var(--font-body)', fontSize: 24, fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.01em' }}>{unidad}</div>
        <div style={{ height: 1, width: 64, background: 'var(--navy)', marginTop: 20, marginBottom: 16 }} />
        <Lede size="body" style={{ fontSize: fitV(descripcion, [[70, 15], [110, 13.5]], 12.5), maxWidth: '90%' }}>{descripcion}</Lede>
      </div>
      <HandleFooter handle={handle} right={pie} />
    </Plate>
  );
}

/* ── sq-12b · Noticia «Último momento» (variante de sq-12) ─────────────
   La única placa con tira superior a sangre: badge a la izquierda y fecha a
   la derecha, sobre gris claro. El resto va en navy. */
function SqNoticiaBreaking({ badge, categoria, titular, bajada, fuente, fecha, handle, scale }) {
  return (
    <Plate format="square" tone="navy" pad={0} scale={scale}>
      <div style={{ background: 'var(--grey)', color: 'var(--navy)', padding: '12px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ ...rotV(11, 'var(--navy)', '0.24em'), whiteSpace: 'nowrap' }}>{badge}</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 11, letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>{fecha}</span>
      </div>
      <div style={{ padding: '30px 40px 36px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <Lockup variant="principal" tone="paper" height={40} base={BV} />
          <Eyebrow onInverse style={{ whiteSpace: 'nowrap' }}>{categoria}</Eyebrow>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 8 }}>
          <Display level={2} onInverse style={{ fontSize: fitV(titular, [[32, 38], [50, 33], [72, 28]], 24), fontWeight: 700, letterSpacing: '-0.018em', lineHeight: 1.08 }}>{titular}</Display>
          <Lede size="body" onInverse style={{ marginTop: 14, fontSize: fitV(bajada, [[85, 14.5], [130, 13.5]], 12.5), maxWidth: '95%' }}>{bajada}</Lede>
        </div>
        <SourceFooter fuente={fuente} fecha={fecha} onInverse />
        <HandleFooter handle={handle} onInverse />
      </div>
    </Plate>
  );
}

/* ── po-04b · Guía / Servicio en navy (variante de po-04) ──────────── */
function PoServicioNavy({ copete, titulo, bajada, bullets, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={44} scale={scale}>
      <PlateHeader chip={copete} onInverse base={BV} />
      <div style={{ marginTop: 28 }}>
        <Display level={2} onInverse style={{ fontSize: fitV(titulo, [[16, 52], [28, 44], [40, 37]], 31), fontWeight: 600, whiteSpace: 'pre-line', lineHeight: 1.06 }}>{titulo}</Display>
        <Lede size="body" onInverse style={{ marginTop: 14, fontSize: fitV(bajada, [[70, 16], [110, 14.5]], 13.5), maxWidth: '90%' }}>{bajada}</Lede>
      </div>
      <div style={{ height: 1, width: 56, background: 'var(--paper)', marginTop: 24 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 13 }}>
        {(bullets || []).map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ ...rotV(11, 'var(--grey)', '0.04em'), minWidth: 22, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--paper)', lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 18px', background: 'var(--paper)', color: 'var(--navy)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700 }}>{cta}</span>
        <span style={{ color: 'var(--navy-lift)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={handle} onInverse />
    </Plate>
  );
}

/* ── po-05b · Anuncio en papel (variante de po-05) ─────────────────── */
function PoAnuncioLight({ copete, titulo, subtitulo, tema, bloques, fecha_hora, handle, scale }) {
  const lbl = rotV(10.5, 'var(--ink-55)');
  return (
    <Plate format="portrait" tone="white" pad={44} scale={scale}>
      <IsoWatermark size={360} opacity={0.05} tone="navy" base={BV} style={{ right: -100, bottom: -60 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PlateHeader chip={copete} base={BV} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Eyebrow style={{ marginBottom: 20 }}>Anuncio</Eyebrow>
        <div style={itaV(fitV(titulo, [[16, 66], [28, 52], [42, 42]], 34), 'var(--ink)', 1.0)}>{titulo}</div>
        <div style={{ ...rotV(13, 'var(--ink-55)', '0.18em'), marginTop: 10 }}>{subtitulo}</div>
        <div style={{ height: 1, width: '60%', background: 'var(--navy)', marginTop: 24, marginBottom: 20 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '104px 1fr', rowGap: 12, columnGap: 16, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)', alignItems: 'start' }}>
          <div style={lbl}>Tema</div><div>{tema}</div>
          <div style={lbl}>Bloques</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{(bloques || []).map((b, i) => <Chip key={i} style={{ fontSize: 9.5 }}>{b}</Chip>)}</div>
          <div style={lbl}>Cuándo</div><div>{fecha_hora}</div>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HandleFooter handle={handle} />
      </div>
    </Plate>
  );
}

/* ── po-13b · Noticia navy con take invertido (variante de po-13d) ─────
   El «qué tenés que saber» va en una caja de papel dentro de la placa navy:
   es el único bloque invertido del catálogo. */
function PoNoticiaNavy({ categoria, titular, bajada, que_saber_label, que_saber, fuente, fecha, handle, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={44} scale={scale}>
      <PlateHeader chip="Noticia · MDO" onInverse base={BV} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 28, height: 1, background: 'var(--grey)', flexShrink: 0 }} />
          <Eyebrow onInverse>{categoria}</Eyebrow>
        </div>
        <Display level={2} onInverse style={{ fontSize: fitV(titular, [[34, 40], [52, 35], [72, 30]], 26), fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08 }}>{titular}</Display>
        <Lede size="body" onInverse style={{ marginTop: 16, fontSize: fitV(bajada, [[90, 15.5], [140, 14.5]], 13.5), maxWidth: '96%' }}>{bajada}</Lede>
        <div style={{ marginTop: 22, padding: '18px 22px', background: 'var(--paper)', color: 'var(--ink)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
            <span style={itaV(22, 'var(--navy-lift)', 0.7)}>*</span>
            <span style={rotV(10, 'var(--navy-lift)', '0.2em')}>{que_saber_label}</span>
          </div>
          <div style={itaV(fitV(que_saber, [[75, 22], [115, 19]], 17), 'var(--ink)', 1.22)}>{que_saber}</div>
        </div>
      </div>
      <SourceFooter fuente={fuente} fecha={fecha} onInverse />
      <HandleFooter handle={handle} onInverse />
    </Plate>
  );
}

/* ── st-08b · Cita story en navy (variante de st-08) ───────────────── */
function StCitaNavy({ copete, cita, autor, rol_autor, handle, scale }) {
  return (
    <Plate format="story" tone="navy" scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup variant="principal" tone="paper" height={40} base={BV} />
        <Chip onInverse>Pensamiento</Chip>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div aria-hidden="true" style={{ ...itaV(200, 'rgba(217,217,217,0.20)', 0.7), position: 'absolute', top: -55, left: -16, zIndex: 0 }}>“</div>
        <Eyebrow onInverse style={{ marginBottom: 26, position: 'relative' }}>{copete}</Eyebrow>
        <div style={{ ...itaV(fitV(cita, [[58, 52], [95, 44], [140, 37]], 30), 'var(--paper)', 1.08), position: 'relative' }}>{cita}</div>
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
          <span style={{ width: 36, height: 1, background: 'var(--paper)', marginTop: 9, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: 'var(--paper)' }}>{autor}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted-on-inverse)', marginTop: 2 }}>{rol_autor}</div>
          </div>
        </div>
      </div>
      <HandleFooter handle={handle} onInverse />
    </Plate>
  );
}

/* ── st-09b · CTA story en navy (variante de st-09) ────────────────── */
function StCTANavy({ copete, titular_1, titular_2, titular_3, bajada,
  canal_1_label, canal_1_valor, canal_2_label, canal_2_valor, canal_3_label, canal_3_valor, handle, scale }) {
  const canales = [
    { l: canal_1_label, v: canal_1_valor }, { l: canal_2_label, v: canal_2_valor }, { l: canal_3_label, v: canal_3_valor },
  ].filter((c) => c.l && c.v);
  const maxLen = Math.max(String(titular_1 || '').length, String(titular_2 || '').length, String(titular_3 || '').length);
  const h = fitV('x'.repeat(maxLen), [[9, 70], [13, 56], [19, 44]], 36);
  const sans = { fontFamily: 'var(--font-display)', fontSize: h, fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.025em', lineHeight: 0.98 };
  return (
    <Plate format="story" tone="navy" scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup variant="principal" tone="paper" height={40} base={BV} />
        <Chip onInverse>Consultanos</Chip>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow onInverse style={{ marginBottom: 16 }}>{copete}</Eyebrow>
        <div style={sans}>{titular_1}</div>
        <div style={itaV(Math.round(h * 1.28), 'var(--grey)', 0.92)}>{titular_2}</div>
        <div style={sans}>{titular_3}</div>
        <Lede size="body" onInverse style={{ marginTop: 24, fontSize: fitV(bajada, [[95, 16], [140, 14.5]], 13.5), maxWidth: '90%' }}>{bajada}</Lede>
      </div>
      <div>
        <div style={{ background: 'var(--paper)', color: 'var(--ink)', padding: '20px 22px' }}>
          {canales.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '9px 0', borderBottom: i < canales.length - 1 ? '1px solid var(--hair)' : 'none' }}>
              <span style={{ ...rotV(10, 'var(--navy-lift)', '0.16em'), flexShrink: 0 }}>{c.l}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400, color: 'var(--ink)', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{c.v}</span>
            </div>
          ))}
        </div>
        <HandleFooter handle={handle} onInverse style={{ marginTop: 14 }} />
      </div>
    </Plate>
  );
}

Object.assign(window, { SqCitaNavy, SqNumeroSerif, SqNoticiaBreaking, PoServicioNavy, PoAnuncioLight, PoNoticiaNavy, StCitaNavy, StCTANavy });

// plates-variants-light.jsx — TANDA 7 (última): las 8 variantes light / minimal.
// Recreadas leyendo templates-variants-light.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// La familia "light" es la versión editorial del catálogo: fondo blanco, filete
// arriba y abajo del contenido, y el recurso tipográfico en itálica en lugar de
// número grande. Se usa cuando la semana ya tuvo dos placas navy seguidas.
//
// Dos arreglos del repo que se conservan acá:
//   · po-13c fue la plantilla que generó las placas de junio con el hueco
//     vertical: tenía un <div style={{flex:1}}/> que empujaba el título arriba
//     y el cierre abajo. El contenido es un único grupo centrado.
//     (Para noticias nuevas conviene po-13d, que es la v2.)
//   · st-07b y st-08c usaban padding 40/50, que dejaba el lockup y el pie
//     DEBAJO de la interfaz de Instagram. Ahora usan el padding de zona segura.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, PlateHeader, HandleFooter, SourceFooter, Eyebrow, Display, Lede, Lockup } = NS;
const BL2 = '../../assets/logos';
const fitL = (t, s, f) => window.fitSize(t, s, f);

const rotL = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: size,
  letterSpacing: ls || '0.12em', textTransform: 'uppercase', color,
});
const itaL = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300,
  fontSize: size, lineHeight: lh || 1.1, color,
});
const HAIR = { height: 1, background: 'var(--hair)' };
const HAIR_NAVY = { height: 1, background: 'var(--navy)' };

/* ── sq-01b · Vencimiento en papel (variante de sq-01) ─────────────── */
function SqVencimientoLight({ copete, dia, mes, anio, impuesto, descripcion, horario, chip_mes, handle, scale }) {
  return (
    <Plate format="square" tone="white" pad={44} scale={scale}>
      <PlateHeader chip={chip_mes} base={BL2} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 18 }}>
        <Eyebrow style={{ marginBottom: 20 }}>{copete}</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 300, fontSize: fitL(dia, [[2, 180], [3, 140]], 108), letterSpacing: '-0.04em', lineHeight: 0.85, fontVariantNumeric: 'tabular-nums', color: 'var(--navy)' }}>{dia}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ ...rotL(14, 'var(--navy-lift)', '0.22em'), fontWeight: 400 }}>{mes}</div>
            <div style={{ ...rotL(11, 'var(--ink-55)', '0.18em'), fontWeight: 400 }}>{anio}</div>
          </div>
        </div>
        <div style={{ ...HAIR_NAVY, margin: '6px 0 16px' }} />
        <Display level={2} style={{ fontSize: fitL(impuesto, [[6, 58], [13, 46], [22, 36]], 30), fontWeight: 600, marginBottom: 10, lineHeight: 1.05 }}>{impuesto}</Display>
        <Lede size="body" style={{ fontSize: fitL(descripcion, [[46, 16], [70, 14.5]], 13.5), maxWidth: '88%' }}>{descripcion}</Lede>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--navy-lift)', flexShrink: 0 }} />
          <span style={{ ...rotL(11.5, 'var(--navy-lift)', '0.1em'), fontWeight: 400 }}>{horario}</span>
        </div>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── sq-02c · Cita minimal (variante de sq-02) ─────────────────────────
   Sin comilla decorativa: el filete arriba y abajo hace todo el trabajo. */
function SqCitaMinimal({ copete, cita, autor, rol_autor, handle, scale }) {
  return (
    <Plate format="square" tone="white" pad={50} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup variant="principal" height={40} base={BL2} />
        <div style={{ ...rotL(11, 'var(--ink-55)', '0.1em'), whiteSpace: 'nowrap' }}>Reflexión</div>
      </div>
      <div style={{ ...HAIR, marginTop: 28 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 18 }}>{copete}</Eyebrow>
        <div style={itaL(fitL(cita, [[58, 40], [95, 34], [140, 29]], 25), 'var(--ink)', 1.14)}>{cita}</div>
      </div>
      <div style={{ ...HAIR, marginBottom: 16 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>{autor}</div>
          <div style={{ ...rotL(10, 'var(--ink-55)'), marginTop: 3 }}>{rol_autor}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{handle}</div>
      </div>
    </Plate>
  );
}

/* ── sq-03c · Número en blanco puro (variante de sq-03) ────────────── */
function SqNumeroLight({ copete, numero, unidad, descripcion, pie, handle, scale }) {
  const n = fitL(numero, [[2, 200], [3, 172], [4, 142]], 116);
  return (
    <Plate format="square" tone="white" pad={44} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup variant="principal" height={40} base={BL2} />
        <div style={{ ...rotL(11, 'var(--ink-55)', '0.1em'), whiteSpace: 'nowrap' }}>{pie}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 14 }}>{copete}</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 300, fontSize: n, letterSpacing: '-0.04em', lineHeight: 0.85, fontVariantNumeric: 'tabular-nums', color: 'var(--navy)' }}>{numero}</div>
          <div style={itaL(Math.round(n * 0.22 + 22), 'var(--navy-lift)', 1)}>{unidad}</div>
        </div>
        <div style={{ ...HAIR, width: 64, marginBottom: 18 }} />
        <Lede size="body" style={{ fontSize: fitL(descripcion, [[70, 17], [110, 15.5]], 14), maxWidth: '90%' }}>{descripcion}</Lede>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── sq-12c · Noticia square minimal (variante de sq-12) ───────────── */
function SqNoticiaMinimal({ categoria, titular, bajada, fuente, fecha, handle, scale }) {
  return (
    <Plate format="square" tone="white" pad={44} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <Lockup variant="principal" height={40} base={BL2} />
        <Eyebrow style={{ whiteSpace: 'nowrap' }}>{categoria}</Eyebrow>
      </div>
      <div style={{ ...HAIR_NAVY, marginTop: 22, marginBottom: 22 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Display level={2} style={{ fontSize: fitL(titular, [[30, 38], [46, 33], [66, 28]], 24), fontWeight: 700, letterSpacing: '-0.018em', lineHeight: 1.1 }}>{titular}</Display>
        <Lede size="body" style={{ marginTop: 14, fontSize: fitL(bajada, [[80, 15], [130, 13.5]], 12.5), maxWidth: '94%' }}>{bajada}</Lede>
      </div>
      <SourceFooter fuente={fuente} fecha={fecha} />
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-06b · Voz experta sin foto (variante de po-06) ─────────────────
   Cuando no hay retrato disponible: el nombre en itálica grande ocupa el
   lugar que tenía la foto. Mejor esto que un hueco rotulado. */
function PoEquipoNoPhoto({ copete, nombre, rol, bio, tags, handle, scale }) {
  return (
    <Plate format="portrait" tone="white" pad={44} scale={scale}>
      <PlateHeader chip={copete} base={BL2} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={itaL(fitL(nombre, [[16, 62], [26, 50], [36, 41]], 0.98), 'var(--ink)', 0.98)}>{nombre}</div>
        <div style={{ ...rotL(12, 'var(--navy-lift)', '0.2em'), marginTop: 14 }}>{rol}</div>
        <div style={{ ...HAIR_NAVY, width: 56, marginTop: 26, marginBottom: 22 }} />
        <Lede size="body" style={{ fontSize: fitL(bio, [[150, 16], [220, 14.5]], 13.5), lineHeight: 1.5 }}>{bio}</Lede>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
        {(tags || []).map((a, i) => (
          <span key={i} style={{ ...rotL(10, 'var(--navy)', '0.1em'), padding: '4px 8px', border: '1px solid var(--hair-2)', whiteSpace: 'nowrap' }}>{a}</span>
        ))}
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-13c · Noticia portrait minimal (variante de po-13d) ────────────
   Ésta es la que generó las placas de junio con el hueco vertical. Ya está
   arreglada, pero para noticias nuevas conviene po-13d, que es la v2. */
function PoNoticiaMinimal({ categoria, titular, bajada, cierre, fuente, fecha, handle, scale }) {
  return (
    <Plate format="portrait" tone="white" pad={52} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <Lockup variant="principal" height={40} base={BL2} />
        <Eyebrow style={{ whiteSpace: 'nowrap' }}>{categoria}</Eyebrow>
      </div>
      <div style={{ ...HAIR_NAVY, marginTop: 22 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Display level={2} style={{ fontSize: fitL(titular, [[34, 44], [52, 38], [72, 33]], 28), fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.07 }}>{titular}</Display>
        <Lede size="body" style={{ marginTop: 18, fontSize: fitL(bajada, [[90, 16], [140, 14.5]], 13.5), maxWidth: '96%' }}>{bajada}</Lede>
        <div style={{ ...itaL(fitL(cierre, [[55, 23], [95, 20]], 18), 'var(--navy-lift)', 1.25), marginTop: 26, maxWidth: '90%' }}>{cierre}</div>
      </div>
      <SourceFooter fuente={fuente} fecha={fecha} />
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── st-07b · Vencimientos story en papel (variante de st-07) ──────────
   Tres columnas fijas: fecha 72, impuesto flexible, hora 64. La hora nunca
   se comprime; el impuesto es el que cede. */
function StVencimientosLight({ copete, semana, filas, cta, handle, chip, scale }) {
  return (
    <Plate format="story" tone="white" scale={scale}>
      <PlateHeader chip={chip || 'Agenda'} base={BL2} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 12 }}>{copete}</Eyebrow>
        <div style={itaL(fitL(semana, [[16, 60], [24, 50], [34, 42]], 34), 'var(--ink)', 1.0)}>{semana}</div>
        <div style={{ marginTop: 30 }}>
          <div style={HAIR_NAVY} />
          {(filas || []).map((f, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr 64px', alignItems: 'center', gap: 8, padding: '15px 0', borderBottom: '1px solid var(--hair)' }}>
              <div style={{ ...rotL(13.5, 'var(--navy-lift)', '0.06em'), fontWeight: 400 }}>{f.fecha}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{f.impuesto}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--ink-55)', marginTop: 2 }}>{f.periodo}</div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-accent)', fontSize: 11.5, letterSpacing: '0.04em', color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{f.hora} h</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={itaL(26, 'var(--navy-lift)', 1.15)}>{cta}</div>
        <HandleFooter handle={handle} style={{ marginTop: 16 }} />
      </div>
    </Plate>
  );
}

/* ── st-08c · Cita story minimal (variante de st-08) ───────────────── */
function StCitaMinimal({ copete, cita, autor, rol_autor, handle, scale }) {
  return (
    <Plate format="story" tone="white" scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup variant="principal" height={40} base={BL2} />
        <div style={{ ...rotL(11, 'var(--ink-55)', '0.1em'), whiteSpace: 'nowrap' }}>Reflexión</div>
      </div>
      <div style={{ ...HAIR, marginTop: 30 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 26 }}>{copete}</Eyebrow>
        <div style={itaL(fitL(cita, [[58, 54], [95, 45], [140, 38]], 31), 'var(--ink)', 1.08)}>{cita}</div>
      </div>
      <div style={{ ...HAIR, marginBottom: 20 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{autor}</div>
          <div style={{ ...rotL(10.5, 'var(--ink-55)', '0.14em'), marginTop: 4 }}>{rol_autor}</div>
        </div>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{handle}</span>
      </div>
    </Plate>
  );
}

Object.assign(window, { SqVencimientoLight, SqCitaMinimal, SqNumeroLight, SqNoticiaMinimal, PoEquipoNoPhoto, PoNoticiaMinimal, StVencimientosLight, StCitaMinimal });

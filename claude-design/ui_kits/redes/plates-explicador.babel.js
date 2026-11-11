// plates-explicador.jsx — TANDA 2: las plantillas de utilidad y explicador.
// Recreadas leyendo templates-utilidad.jsx y templates-explicador.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// Adaptaciones de marca v2.0 (iguales en todas las tandas):
//   Montserrat        → Open Sans  (--font-display / --font-body)
//   Geist Mono        → Chivo 700 versalitas (--font-accent)
//   Instrument Serif  → Chivo 300 italica
//   #1f4e79 y cia     → tokens de la paleta oficial
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, PlateHeader, Chip, HandleFooter, Eyebrow, Display, Lede, Rule, IsoWatermark, Lockup } = NS;
const BE = '../../assets/logos';
const fitE = (t, s, f) => window.fitSize(t, s, f);

const rotE = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: size,
  letterSpacing: ls || '0.14em', textTransform: 'uppercase', color,
});
const itaE = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300,
  fontSize: size, lineHeight: lh || 1.02, color,
});

/* ── po-37 · Vencimientos de la semana, version feed ────────────────
   La de st-07 es story y se va en 24 h; esta queda en el feed como
   referencia. Cada fila: dia grande + mes, filete vertical, impuesto y periodo. */
function PoVencimientosFeed({ copete, semana, filas, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="white" pad={50} scale={scale}>
      <PlateHeader chip={copete} base={BE} />
      <div style={{ marginTop: 24 }}>
        <Display level={2} style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.022em' }}>
          Vencimientos<br />de la semana
        </Display>
        <div style={{ ...rotE(11, 'var(--navy-lift)'), marginTop: 10 }}>{semana}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 6 }}>
        {(filas || []).map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 0', borderTop: '1px solid var(--hair)' }}>
            <div style={{ flexShrink: 0, width: 54, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--navy)', lineHeight: 1, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{f.dia}</div>
              <div style={{ ...rotE(9.5, 'var(--navy-lift)', '0.16em'), marginTop: 3 }}>{f.mes}</div>
            </div>
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--hair)', flexShrink: 0 }} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>{f.impuesto}</div>
              <div style={{ marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-55)' }}>{f.periodo}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 20px', background: 'var(--grey-pale)', border: '1px solid var(--hair)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--navy)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{cta}</span>
        <span style={{ color: 'var(--navy-lift)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-31 · Explicador en 3 pasos ─────────────────────────────────
   A diferencia de po-28 (una linea por paso), esta explica de verdad:
   cada paso lleva titulo y cuerpo. El numero va en italica. */
function PoExplicador({ copete, titulo, pasos, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="white" pad={52} scale={scale}>
      <PlateHeader chip={copete} base={BE} />
      <Display level={2} style={{ marginTop: 26, fontSize: fitE(titulo, [[28, 40], [44, 35], [62, 30]], 26), fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '92%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 6 }}>
        {(pasos || []).map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '20px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hair)' }}>
            <div style={{ ...itaE(40, 'var(--slate)', 0.9), flexShrink: 0, width: 44, paddingTop: 2 }}>{'0' + (i + 1)}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16.5, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{s.titulo}</div>
              <Lede size="note" style={{ marginTop: 6, fontSize: 13 }}>{s.texto}</Lede>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)', fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{cta}</span>
        <span style={{ color: 'var(--grey)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-32 · Comparativa A vs B ────────────────────────────────────
   Dos columnas de igual peso, la B en navy. El veredicto abajo, en italica
   y con asterisco: no dice cual gana, dice de que depende. */
function PoComparativa({ copete, titulo, a_label, a_titulo, a_items, b_label, b_titulo, b_items, veredicto, handle, scale }) {
  const Col = ({ label, titulo: tit, items, dark }) => (
    <div style={{ flex: 1, minWidth: 0, border: dark ? 'none' : '1px solid var(--hair)', borderRadius: 4, padding: '20px 18px', background: dark ? 'var(--navy)' : '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={rotE(9.5, dark ? 'var(--grey)' : 'var(--navy-lift)', '0.18em')}>{label}</div>
      <div style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15, color: dark ? 'var(--paper)' : 'var(--ink)' }}>{tit}</div>
      <div style={{ height: 1, background: dark ? 'var(--rule-on-inverse-strong)' : 'var(--hair)', margin: '14px 0 12px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(items || []).map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, marginTop: 6, width: 10, height: 1, background: dark ? 'var(--grey)' : 'var(--slate)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.4, color: dark ? 'var(--text-body-on-inverse)' : 'var(--ink-70)' }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <Plate format="portrait" tone="tint" pad={46} scale={scale}>
      <PlateHeader chip={copete} base={BE} />
      <Display level={2} style={{ marginTop: 24, fontSize: fitE(titulo, [[26, 38], [42, 33], [60, 28]], 25), fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '94%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', gap: 14, marginTop: 24 }}>
        <Col label={a_label} titulo={a_titulo} items={a_items} dark={false} />
        <div style={{ ...rotE(10, 'var(--ink-35)'), flexShrink: 0, alignSelf: 'center' }}>vs</div>
        <Col label={b_label} titulo={b_titulo} items={b_items} dark={true} />
      </div>
      <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'flex-start', borderTop: '1px solid var(--hair)', paddingTop: 16 }}>
        <span style={{ ...itaE(24, 'var(--slate)', 0.7), flexShrink: 0 }}>*</span>
        <div style={itaE(18, 'var(--navy)', 1.22)}>{veredicto}</div>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-33 · Elegi tu caso ─────────────────────────────────────────
   Placa de engagement: tres opciones en pastillas y un CTA que pide comentar
   el numero. Es la unica que usa radio pill en las opciones. */
function PoElegiTuCaso({ copete, pregunta, opciones, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={52} scale={scale}>
      <IsoWatermark size={300} opacity={0.06} tone="paper" base={BE} style={{ right: -90, top: 150 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PlateHeader chip={copete} onInverse base={BE} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Display level={2} onInverse style={{ fontSize: fitE(pregunta, [[30, 44], [48, 38], [70, 32]], 27), fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '95%' }}>{pregunta}</Display>
        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(opciones || []).map((o, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: '1px solid var(--rule-on-inverse-strong)', borderRadius: 999, background: 'rgba(248,246,246,0.05)' }}>
              <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', border: '1px solid var(--grey)', color: 'var(--grey)', fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 400, color: 'var(--paper)', lineHeight: 1.3 }}>{o}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '15px 20px', background: 'var(--paper)', color: 'var(--navy)', fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span>{cta}</span>
          <span style={{ color: 'var(--navy-lift)', flexShrink: 0 }}>→</span>
        </div>
        <HandleFooter handle={handle} onInverse />
      </div>
    </Plate>
  );
}

Object.assign(window, { PoVencimientosFeed, PoExplicador, PoComparativa, PoElegiTuCaso });

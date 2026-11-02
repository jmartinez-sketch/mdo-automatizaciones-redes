// plates-carousel.jsx — TANDA 5: los dos sets de carrusel (7 slides).
//   Set A · Calendario impositivo — 3 slides square, base 420x420 → 1080x1080
//   Set B · Tips PyME             — 4 slides portrait, base 420x525 → 1080x1350
// Recreados leyendo templates-carousel.jsx del repo mdo-automatizaciones-redes.
//
// Dos reglas de contenido que vienen del repo y se conservan:
//   · NO se usa la palabra "Tip" en la placa: dice "Punto 01". Los slots
//     siguen llamandose TIP_* para no romper la rutina.
//   · Las filas de calendario se CENTRAN en el espacio disponible: con menos
//     de 5 items no queda un vacio abajo.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, Lockup, IsoWatermark, Eyebrow, Display, Lede, PageIndex } = NS;
const BC = '../../assets/logos';
const fitC = (t, s, f) => window.fitSize(t, s, f);

const rotC = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: size,
  letterSpacing: ls || '0.16em', textTransform: 'uppercase', color,
});
const itaC = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300,
  fontSize: size, lineHeight: lh || 1.0, color,
});

// Pie de carrusel: etiqueta a la izquierda, indice a la derecha.
function CarChrome({ idx, total, label, onInverse }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 10,
      fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 9,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--ink-55)' }}>
      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      <PageIndex current={idx} total={total} onInverse={onInverse} style={{ fontSize: 9, flexShrink: 0 }} />
    </div>
  );
}

// Fila de vencimiento, compartida por ca-q1 y ca-q2.
function CalRow({ date, tax, period, compact }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', alignItems: 'baseline', gap: 6,
      padding: compact ? '8px 0' : '10px 0', borderBottom: '1px solid var(--hair)' }}>
      <div style={itaC(compact ? 26 : 28, 'var(--navy)', 0.8)}>{date}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: compact ? 12.5 : 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{tax}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: compact ? 10.5 : 11, color: 'var(--ink-55)', marginTop: 1 }}>{period}</div>
      </div>
    </div>
  );
}

/* ══ Set A · Calendario impositivo ══════════════════════════════════ */

/* ── ca-cover · Tapa del calendario ─────────────────────────────── */
function CalCover({ copete, mes, anio, bajada, swipe, chrome_label, scale }) {
  return (
    <Plate format="carouselSq" tone="navy" pad={28} scale={scale}>
      <IsoWatermark size={240} opacity={0.06} tone="paper" base={BC} style={{ right: -80, bottom: -40 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
        <Lockup variant="principal" tone="paper" height={40} base={BC} />
        <div style={{ ...rotC(9, 'var(--text-muted-on-inverse)', '0.1em'), whiteSpace: 'nowrap' }}>{copete}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={itaC(fitC(mes, [[7, 72], [10, 60], [14, 50]], 42), 'var(--paper)', 0.95)}>{mes}</div>
        <div style={{ ...rotC(17, 'var(--grey)'), fontWeight: 400, marginTop: 4 }}>{anio}</div>
        <Lede size="body" onInverse style={{ marginTop: 16, fontSize: 12.5, maxWidth: '90%' }}>{bajada}</Lede>
        <div style={{ ...rotC(11, 'var(--grey)'), marginTop: 20 }}>{swipe}</div>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CarChrome idx={1} total={3} label={chrome_label} onInverse />
      </div>
    </Plate>
  );
}

/* ── ca-q1 · Primera quincena ───────────────────────────────────── */
function CalQ1({ copete, items, chrome_label, scale }) {
  return (
    <Plate format="carouselSq" tone="white" pad={28} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup variant="principal" height={40} base={BC} />
        <Eyebrow style={{ whiteSpace: 'nowrap' }}>{copete}</Eyebrow>
      </div>
      <div style={{ marginTop: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ height: 1, width: 36, background: 'var(--navy)', marginBottom: 12 }} />
        {(items || []).map((it, i) => <CalRow key={i} date={it.fecha} tax={it.impuesto} period={it.periodo} />)}
      </div>
      <CarChrome idx={2} total={3} label={chrome_label} />
    </Plate>
  );
}

/* ── ca-q2 · Segunda quincena, con CTA ──────────────────────────── */
function CalQ2({ copete, items, cta, chrome_label, scale }) {
  return (
    <Plate format="carouselSq" tone="white" pad={28} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup variant="principal" height={40} base={BC} />
        <Eyebrow style={{ whiteSpace: 'nowrap' }}>{copete}</Eyebrow>
      </div>
      <div style={{ marginTop: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ height: 1, width: 36, background: 'var(--navy)', marginBottom: 12 }} />
        {(items || []).map((it, i) => <CalRow key={i} date={it.fecha} tax={it.impuesto} period={it.periodo} compact />)}
        <div style={{ marginTop: 12, padding: '11px 14px', background: 'var(--navy)', color: 'var(--paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 600 }}>{cta}</span>
          <span style={{ color: 'var(--grey)', flexShrink: 0 }}>→</span>
        </div>
      </div>
      <CarChrome idx={3} total={3} label={chrome_label} />
    </Plate>
  );
}

/* ══ Set B · Tips PyME ══════════════════════════════════════════════ */

/* ── cb-cover · Tapa, titular en dos partes (sans + italica) ────── */
function TipCover({ copete, titulo_sans, titulo_serif, bajada, swipe, chrome_label, scale }) {
  return (
    <Plate format="carouselPo" tone="tint" pad={28} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup variant="principal" height={40} base={BC} />
        <div style={{ ...rotC(9, 'var(--ink-55)', '0.1em'), whiteSpace: 'nowrap' }}>{copete}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 16 }}>{copete}</Eyebrow>
        <Display level={2} style={{ fontSize: fitC(titulo_sans, [[12, 36], [20, 30], [28, 25]], 21), fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.02 }}>{titulo_sans}</Display>
        <div style={{ ...itaC(fitC(titulo_serif, [[8, 56], [14, 46], [20, 38]], 32), 'var(--navy-lift)', 0.94), marginTop: 4 }}>{titulo_serif}</div>
        <Lede size="body" style={{ marginTop: 20, fontSize: 13.5, maxWidth: '92%' }}>{bajada}</Lede>
        <div style={{ ...rotC(10.5, 'var(--navy-lift)'), marginTop: 24 }}>{swipe}</div>
      </div>
      <CarChrome idx={1} total={4} label={chrome_label} />
    </Plate>
  );
}

/* ── cb-tip1..3 · Slide de punto ────────────────────────────────────
   Numero gigante en italica, filete vertical, rotulo, titular, cuerpo y el
   takeaway al pie con asterisco. Los impares en papel, el 2 en navy. */
function TipSlide({ idx, total = 4, tip_num, titular, cuerpo, takeaway, chrome_label, tone = 'paper', scale }) {
  const inv = tone === 'navy';
  const accent = inv ? 'var(--grey)' : 'var(--navy-lift)';
  return (
    <Plate format="carouselPo" tone={inv ? 'navy' : 'white'} pad={28} scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup variant="principal" tone={inv ? 'paper' : 'navy'} height={40} base={BC} />
        <div style={{ ...rotC(9, inv ? 'var(--text-muted-on-inverse)' : 'var(--ink-55)', '0.1em'), whiteSpace: 'nowrap' }}>
          Punto {String(tip_num).padStart(2, '0')}
        </div>
      </div>
      <div style={{ marginTop: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 14, marginBottom: 14 }}>
          <div style={{ ...itaC(92, accent, 0.78), flexShrink: 0 }}>{tip_num}</div>
          <div style={{ width: 1, background: inv ? 'var(--rule-on-inverse-strong)' : 'var(--hair-2)', margin: '8px 0', flexShrink: 0 }} />
          <div style={{ ...rotC(9.5, accent, '0.18em'), alignSelf: 'center' }}>{'Punto ' + tip_num + ' de ' + (total - 1)}</div>
        </div>
        <Display level={2} onInverse={inv} style={{ fontSize: fitC(titular, [[34, 22], [52, 19], [72, 17]], 15.5), fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.1, marginBottom: 12 }}>{titular}</Display>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: fitC(cuerpo, [[150, 12.5], [220, 11.5]], 10.5), lineHeight: 1.5, color: inv ? 'var(--text-body-on-inverse)' : 'var(--ink-70)' }}>{cuerpo}</div>
        {takeaway ? (
          <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ ...itaC(32, accent, 0.7), flexShrink: 0 }}>*</span>
            <div style={itaC(fitC(takeaway, [[42, 18], [64, 16]], 14), inv ? 'var(--paper)' : 'var(--ink)', 1.22)}>{takeaway}</div>
          </div>
        ) : null}
      </div>
      <CarChrome idx={idx} total={total} label={chrome_label} onInverse={inv} />
    </Plate>
  );
}

const TipSlide2 = (p) => <TipSlide {...p} idx={2} tip_num={1} tone={p.tone || 'paper'} />;
const TipSlide3 = (p) => <TipSlide {...p} idx={3} tip_num={2} tone={p.tone || 'navy'} />;
const TipSlide4 = (p) => <TipSlide {...p} idx={4} tip_num={3} tone={p.tone || 'paper'} />;

Object.assign(window, { CarChrome, CalRow, CalCover, CalQ1, CalQ2, TipCover, TipSlide, TipSlide2, TipSlide3, TipSlide4 });

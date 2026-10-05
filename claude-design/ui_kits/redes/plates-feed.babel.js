// plates-feed.jsx — placas de feed (1:1 y 4:5) recreadas con la marca v2.0.
// Composicion, paddings y jerarquia salen de mdo-automatizaciones-redes
// (templates-square.jsx, templates-noticia-v2.jsx, templates-friday*.jsx).
// Lo unico que cambia respecto del original es la paleta y las tipografias:
// el original todavia usa el branding anterior (#1f4e79, Montserrat).
// Los componentes del design system se resuelven en render (no al evaluar el
// módulo): así este archivo es inofensivo si se evalúa antes que el bundle.
const DS = (n) => function DSComp(props) {
  const C = (window.MDOConsultoresDesignSystem_cc21de || {})[n];
  return C ? React.createElement(C, props) : null;
};
const Plate = DS('Plate'), PlateHeader = DS('PlateHeader'), Chip = DS('Chip'),
  HandleFooter = DS('HandleFooter'), SourceFooter = DS('SourceFooter'),
  BigNumber = DS('BigNumber'), Eyebrow = DS('Eyebrow'), Display = DS('Display'),
  Lede = DS('Lede'), Rule = DS('Rule'), IsoWatermark = DS('IsoWatermark'),
  Icon = DS('Icon'), Lockup = DS('Lockup');
const B = '../../assets/logos';

// El cuerpo del titular se calcula por largo de texto, no midiendo el DOM:
// asi el render headless captura siempre el tamano final ya resuelto.
function fitSize(text, steps, fallback) {
  const n = String(text == null ? '' : text).length;
  for (let i = 0; i < steps.length; i++) if (n <= steps[i][0]) return steps[i][1];
  return fallback != null ? fallback : steps[steps.length - 1][1];
}

/* ── sq-01 · Vencimiento impositivo (navy) ─────────────────────────── */
function SqVencimiento({ copete, dia, mes, anio, impuesto, descripcion, horario, chip_mes, handle, scale }) {
  return (
    <Plate format="square" tone="navy" scale={scale}>
      <PlateHeader chip={chip_mes} onInverse base={B} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 18 }}>
        <Eyebrow onInverse style={{ marginBottom: 20 }}>{copete}</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12 }}>
          <BigNumber size={fitSize(dia, [[2, 180], [3, 140]], 108)} onInverse>{dia}</BigNumber>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 14, letterSpacing: '0.22em', color: 'var(--grey)' }}>{mes}</span>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-muted-on-inverse)' }}>{anio}</span>
          </div>
        </div>
        <Rule onInverse strong style={{ margin: '6px 0 16px' }} />
        <Display level={2} onInverse style={{ fontSize: fitSize(impuesto, [[6, 58], [13, 46], [22, 36]], 30) }}>{impuesto}</Display>
        <Lede onInverse size="body" style={{ marginTop: 10, fontSize: fitSize(descripcion, [[46, 16], [70, 14.5]], 13.5), maxWidth: '88%' }}>{descripcion}</Lede>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--grey)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11.5, letterSpacing: '0.1em', color: 'var(--grey)' }}>{horario}</span>
        </div>
      </div>
      <HandleFooter handle={handle} onInverse />
    </Plate>
  );
}

/* ── sq-02 · Cita / reflexion (papel) ─────────────────────────────── */
function SqCita({ copete, cita, autor, rol_autor, handle, scale }) {
  return (
    <Plate format="square" tone="white" scale={scale}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Lockup variant="principal" height={40} base={B} />
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 300, fontSize: 96, lineHeight: 0.7, color: 'var(--slate)', marginTop: 4, marginRight: -6 }}>“</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 8 }}>
        <Eyebrow style={{ marginBottom: 20 }}>{copete}</Eyebrow>
        <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300, fontSize: fitSize(cita, [[58, 40], [95, 34], [140, 29]], 25), lineHeight: 1.14, letterSpacing: '-0.015em', color: 'var(--navy)' }}>{cita}</div>
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ width: 28, height: 1, background: 'var(--navy)', marginTop: 8, flexShrink: 0 }} />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--ink)' }}>
            {autor}
            <div style={{ fontWeight: 400, color: 'var(--ink-55)', fontSize: 11.5, marginTop: 2, letterSpacing: 0 }}>{rol_autor}</div>
          </div>
        </div>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── sq-03 · Numero clave (tint) ──────────────────────────────────── */
function SqNumero({ copete, numero, unidad, descripcion, pie, handle, scale }) {
  return (
    <Plate format="square" tone="tint" scale={scale}>
      <PlateHeader chip="Est. 1972" base={B} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 14 }}>{copete}</Eyebrow>
        <BigNumber size={fitSize(numero, [[2, 200], [3, 172], [4, 142]], 116)} unit={unidad}>{numero}</BigNumber>
        <Rule width={64} strong style={{ margin: '20px 0 18px' }} />
        <Lede size="body" style={{ fontSize: fitSize(descripcion, [[70, 17], [110, 15.5]], 14), maxWidth: '90%' }}>{descripcion}</Lede>
      </div>
      <HandleFooter handle={handle} right={pie} />
    </Plate>
  );
}

/* ── po-13d · Noticia con marca de agua y cierre (papel) ──────────── */
function PoNoticia({ categoria, titular, bajada, cierre, fuente, fecha, handle, tone = 'paper', scale }) {
  const inv = tone === 'navy';
  return (
    <Plate format="portrait" tone={tone} scale={scale}>
      <IsoWatermark size={260} opacity={inv ? 0.08 : 0.05} tone={inv ? 'paper' : 'navy'} base={B} style={{ right: -70, bottom: 40 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Lockup variant="principal" height={40} base={B} tone={inv ? 'paper' : 'navy'} />
        <Eyebrow onInverse={inv}>{categoria}</Eyebrow>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Display level={1} onInverse={inv} style={{ fontSize: fitSize(titular, [[34, 44], [54, 38], [76, 32]], 28), letterSpacing: '-0.022em' }}>{titular}</Display>
        <Lede onInverse={inv} size="body" style={{ marginTop: 14, fontSize: 15, maxWidth: '92%' }}>{bajada}</Lede>
        <Rule onInverse={inv} width={64} strong style={{ margin: '22px 0 14px' }} />
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.3, color: inv ? 'var(--grey)' : 'var(--navy)', maxWidth: '86%' }}>{cierre}</div>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SourceFooter fuente={fuente} fecha={fecha} onInverse={inv} />
        <HandleFooter handle={handle} onInverse={inv} style={{ marginTop: 8 }} />
      </div>
    </Plate>
  );
}

/* ── po-24 · Checklist (blanco) ───────────────────────────────────── */
function PoChecklist({ copete, titulo, item_1, item_2, item_3, cta, handle, scale }) {
  const items = [item_1, item_2, item_3];
  return (
    <Plate format="portrait" tone="white" scale={scale}>
      <PlateHeader chip={copete} base={B} />
      <Display level={1} style={{ marginTop: 30, fontSize: fitSize(titulo, [[30, 38], [46, 33], [64, 28]], 25), maxWidth: '92%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ color: 'var(--navy)', flexShrink: 0, marginTop: 2 }}><Icon name="tilde" size={30} /></span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 16.5, fontWeight: 400, lineHeight: 1.35, color: 'var(--ink)' }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{cta}</span><span style={{ color: 'var(--grey)' }}>→</span>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-26 · Tres iconos en fila (papel) ──────────────────────────── */
function PoTresIconos({ copete, titulo, label_1, label_2, label_3, cta, handle, scale }) {
  const cols = [{ ic: 'reloj', l: label_1 }, { ic: 'grafico', l: label_2 }, { ic: 'escudo', l: label_3 }];
  return (
    <Plate format="portrait" tone="paper" scale={scale}>
      <PlateHeader chip={copete} base={B} />
      <Display level={1} style={{ marginTop: 30, fontSize: fitSize(titulo, [[30, 36], [46, 31], [64, 27]], 24), maxWidth: '90%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, width: '100%' }}>
          {cols.map((c, i) => (
            <div key={i} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
              <span style={{ width: 86, height: 86, borderRadius: '50%', background: 'var(--grey)', color: 'var(--navy)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name={c.ic} size={38} />
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{c.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{cta}</span><span style={{ color: 'var(--grey)' }}>→</span>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-21 · Pregunta hero (navy) ─────────────────────────────────── */
function PoPreguntaHero({ copete, pregunta, respuesta, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="navy" scale={scale}>
      <PlateHeader chip={copete} onInverse base={B} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: fitSize(pregunta, [[38, 46], [58, 39], [82, 33]], 28), lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--paper)' }}>{pregunta}</div>
        <Rule onInverse strong width={64} style={{ margin: '26px 0 18px' }} />
        <Lede onInverse size="body" style={{ fontSize: 16, maxWidth: '90%' }}>{respuesta}</Lede>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--grey)' }}>{cta} →</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted-on-inverse)', whiteSpace: 'nowrap' }}>{handle}</span>
      </div>
    </Plate>
  );
}

Object.assign(window, { fitSize, SqVencimiento, SqCita, SqNumero, PoNoticia, PoChecklist, PoTresIconos, PoPreguntaHero });

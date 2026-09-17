// plates-story-linkedin.jsx — historias 9:16 y placas de LinkedIn 1.91:1.
// Composicion tomada de templates-story.jsx y templates-linkedin.jsx del repo
// mdo-automatizaciones-redes, con la paleta y las tipografias de la marca v2.0.
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
const BL = '../../assets/logos';

/* ── st-07 · Vencimientos de la semana (story navy) ────────────────── */
function StVencimientos({ copete, semana, filas, cta, handle, scale }) {
  return (
    <Plate format="story" tone="navy" scale={scale}>
      <PlateHeader chip={semana} onInverse base={BL} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
        <Eyebrow onInverse>{copete}</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(filas || []).map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 18, padding: '18px 0', borderTop: '1px solid var(--rule-on-inverse)' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 300, fontSize: 46, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--paper)', minWidth: 78, fontVariantNumeric: 'tabular-nums' }}>{f.fecha}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, color: 'var(--paper)', lineHeight: 1.15 }}>{f.impuesto}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-body-on-inverse)', marginTop: 3 }}>{f.periodo}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--grey)', whiteSpace: 'nowrap' }}>{f.hora}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ padding: '16px 20px', background: 'var(--paper)', color: 'var(--navy)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span>{cta}</span><span>→</span>
        </div>
        <HandleFooter handle={handle} onInverse style={{ marginTop: 14 }} />
      </div>
    </Plate>
  );
}

/* ── st-10 · Encuesta A/B (story papel) ────────────────────────────── */
function StEncuesta({ copete, pregunta, opcion_a, opcion_b, pie, handle, scale }) {
  return (
    <Plate format="story" tone="paper" scale={scale}>
      <PlateHeader chip={copete} base={BL} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30 }}>
        <Display level={1} style={{ fontSize: 46 }}>{pregunta}</Display>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[opcion_a, opcion_b].map((o, i) => (
            <div key={i} style={{ border: '1px solid var(--hair-2)', borderRadius: 'var(--r-xs)', padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16, background: i === 0 ? 'var(--grey-pale)' : 'transparent' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 900, fontSize: 20, color: 'var(--slate)' }}>{i === 0 ? 'A' : 'B'}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink)' }}>{o}</span>
            </div>
          ))}
        </div>
        <Lede size="note" style={{ fontSize: 14 }}>{pie}</Lede>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── li-01 · Noticia normativa (LinkedIn, blanco) ─────────────────── */
function LiNoticia({ categoria, titular, bajada, fuente, fecha, handle, scale }) {
  return (
    <Plate format="linkedin" tone="white" scale={scale}>
      <IsoWatermark size={210} opacity={0.05} tone="navy" base={BL} style={{ right: -52, bottom: -30 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 4, background: 'var(--gradient-navy-h)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Lockup variant="isotipo" height={28} base={BL} />
        <Eyebrow>{categoria}</Eyebrow>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1, paddingRight: 60 }}>
        <Display level={2} style={{ fontSize: window.fitSize(titular, [[32, 34], [50, 29], [70, 25]], 22), letterSpacing: '-0.022em' }}>{titular}</Display>
        <Lede size="body" style={{ marginTop: 12, fontSize: 13, maxWidth: '92%' }}>{bajada}</Lede>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SourceFooter fuente={fuente} fecha={fecha} />
        <HandleFooter handle={handle} style={{ marginTop: 8 }} />
      </div>
    </Plate>
  );
}

/* ── li-02 · Claim institucional (LinkedIn, navy) ─────────────────── */
function LiClaim({ copete, claim, servicio_1, servicio_2, servicio_3, cta, handle, scale }) {
  return (
    <Plate format="linkedin" tone="navy" scale={scale} style={{ flexDirection: 'row', gap: 30, backgroundImage: 'linear-gradient(to right,rgba(248,246,246,0.06) 1px,transparent 1px)', backgroundSize: '64px 64px' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Eyebrow onInverse>{copete}</Eyebrow>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Display level={2} onInverse style={{ fontSize: window.fitSize(claim, [[34, 36], [54, 31], [76, 26]], 23), letterSpacing: '-0.022em' }}>{claim}</Display>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[servicio_1, servicio_2, servicio_3].map((s, i) => <Chip key={i} onInverse>{s}</Chip>)}
        </div>
      </div>
      <div style={{ flexShrink: 0, width: 172, borderLeft: '1px solid var(--rule-on-inverse)', paddingLeft: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Lockup variant="secundario" tone="paper" height={40} base={BL} style={{ width: '100%', height: 'auto' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--paper)', lineHeight: 1.3 }}>{cta}</div>
          <div style={{ marginTop: 10, fontFamily: 'var(--font-accent)', fontSize: 9.5, letterSpacing: '0.08em', color: 'var(--text-muted-on-inverse)' }}>{handle}</div>
        </div>
      </div>
    </Plate>
  );
}

/* ── li-03 · Dato clave (LinkedIn, papel) ─────────────────────────── */
function LiDato({ categoria, numero, unidad, descripcion, fuente, handle, scale }) {
  return (
    <Plate format="linkedin" tone="paper" scale={scale} style={{ flexDirection: 'row', gap: 22, alignItems: 'stretch' }}>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <BigNumber size={76} unit={unidad}>{numero}</BigNumber>
      </div>
      <div style={{ flex: 1, minWidth: 0, borderLeft: '1px solid var(--hair)', paddingLeft: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <Eyebrow>{categoria}</Eyebrow>
          <Lockup variant="isotipo" height={24} base={BL} />
        </div>
        <Lede size="body" style={{ fontSize: 14 }}>{descripcion}</Lede>
        <div>
          <SourceFooter fuente={fuente} fecha="" label="Fuente" />
          <HandleFooter handle={handle} right="" style={{ marginTop: 6 }} />
        </div>
      </div>
    </Plate>
  );
}

Object.assign(window, { StVencimientos, StEncuesta, LiNoticia, LiClaim, LiDato });

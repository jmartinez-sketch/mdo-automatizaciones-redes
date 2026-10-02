// plates-marketing.jsx — TANDA 3: las 3 plantillas de marketing y autoridad
// (po-34, po-35, po-36). Recreadas leyendo templates-marketing.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// Adaptaciones de marca v2.0 (iguales en todas las tandas):
//   Montserrat        → Open Sans  (--font-display / --font-body)
//   Geist Mono        → Chivo 700 versalitas (--font-accent)
//   Instrument Serif  → Chivo 300 italica
//   #1f4e79 y cia     → tokens de la paleta oficial
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, PlateHeader, HandleFooter, Display, Lede, IsoWatermark } = NS;
const BK = '../../assets/logos';
const fitK = (t, s, f) => window.fitSize(t, s, f);

const rotK = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: size,
  letterSpacing: ls || '0.2em', textTransform: 'uppercase', color,
});
const itaK = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300,
  fontSize: size, lineHeight: lh || 1.2, color,
});

/* ── po-34 · Mito vs realidad ──────────────────────────────────────
   Distinta de po-32: ahi se eligen dos opciones validas, aca se corrige una
   creencia equivocada. El mito va apagado y tachado; la realidad en navy. */
function PoMitoRealidad({ copete, titulo, mito, realidad, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="white" pad={50} scale={scale}>
      <PlateHeader chip={copete} base={BK} />
      <Display level={2} style={{ marginTop: 24, fontSize: fitK(titulo, [[26, 38], [42, 33], [60, 28]], 25), fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '92%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        <div style={{ padding: '20px 22px', background: 'var(--grey-pale)', border: '1px solid var(--hair)', borderRadius: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid var(--ink-35)', color: 'var(--ink-35)', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</span>
            <span style={rotK(9.5, 'var(--ink-35)')}>El mito</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: fitK(mito, [[70, 17], [110, 15.5]], 14), fontWeight: 400, color: 'var(--ink-55)', lineHeight: 1.38, textDecoration: 'line-through', textDecorationColor: 'var(--ink-15)' }}>{mito}</div>
        </div>
        <div style={{ padding: '22px 24px', background: 'var(--navy)', borderRadius: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--grey)', color: 'var(--navy)', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</span>
            <span style={rotK(9.5, 'var(--grey)')}>La realidad</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: fitK(realidad, [[70, 17], [110, 15.5]], 14), fontWeight: 600, color: 'var(--paper)', lineHeight: 1.38 }}>{realidad}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, borderTop: '1px solid var(--hair)', paddingTop: 16 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{cta}</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-55)', whiteSpace: 'nowrap' }}>{handle}</span>
      </div>
    </Plate>
  );
}

/* ── po-35 · Errores frecuentes ────────────────────────────────────
   Tres fichas blancas sobre fondo tint. Cada una: numero en circulo navy,
   el error en negrita y la correccion debajo con guion. */
function PoErrores({ copete, titulo, items, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="tint" pad={50} scale={scale}>
      <PlateHeader chip={copete} base={BK} />
      <Display level={2} style={{ marginTop: 24, fontSize: fitK(titulo, [[28, 38], [44, 33], [62, 29]], 25), fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '92%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, marginTop: 8 }}>
        {(items || []).map((it, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--hair)', borderRadius: 4, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--navy)', color: 'var(--paper)', fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.28 }}>{it.error}</div>
              <div style={{ marginTop: 5, display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, marginTop: 7, width: 9, height: 1, background: 'var(--slate)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--ink-55)', lineHeight: 1.4 }}>{it.fix}</span>
              </div>
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

/* ── po-36 · Testimonio de cliente ─────────────────────────────────
   Prueba social SIN nombre propio: sector + tamano, para no exponer al
   cliente. Es criterio del estudio, no una limitacion de la plantilla. */
function PoTestimonio({ copete, testimonio, cliente_tipo, cliente_detalle, servicio, handle, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={52} scale={scale}>
      <IsoWatermark size={300} opacity={0.06} tone="paper" base={BK} style={{ right: -95, bottom: 60 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PlateHeader chip={copete} onInverse base={BK} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div aria-hidden="true" style={{ fontFamily: 'var(--font-accent)', fontWeight: 300, fontSize: 96, lineHeight: 0.7, color: 'var(--grey)', opacity: 0.55, marginBottom: 4, marginLeft: -6 }}>“</div>
        <div style={itaK(fitK(testimonio, [[70, 34], [110, 29], [160, 25]], 22), 'var(--paper)', 1.2)}>{testimonio}</div>
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'flex-start', gap: 13 }}>
          <span style={{ flexShrink: 0, marginTop: 8, width: 26, height: 1, background: 'var(--grey)' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 700, color: 'var(--paper)' }}>{cliente_tipo}</div>
            <div style={{ marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted-on-inverse)' }}>{cliente_detalle}</div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, borderTop: '1px solid var(--rule-on-inverse)', paddingTop: 16 }}>
        <span style={rotK(9.5, 'var(--grey)', '0.18em')}>{servicio}</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted-on-inverse)', whiteSpace: 'nowrap' }}>{handle}</span>
      </div>
    </Plate>
  );
}

Object.assign(window, { PoMitoRealidad, PoErrores, PoTestimonio });

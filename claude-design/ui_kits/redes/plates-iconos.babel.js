// plates-iconos.jsx — TANDA 4: las 4 plantillas icon-forward del viernes que
// faltaban (po-27, po-28, po-29, po-30). La quinta, po-26, ya estaba.
// Recreadas leyendo templates-friday-b.jsx del repo mdo-automatizaciones-redes.
//
// Los iconos NO se redibujan aca: se usan los nueve del design system
// (components/iconos/Icon.jsx), que tienen el path data copiado de ese mismo
// archivo. Mismo trazo 1.7, mismo viewBox 24.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, PlateHeader, HandleFooter, Display, Lede, Icon } = NS;
const BI = '../../assets/logos';
const fitI = (t, s, f) => window.fitSize(t, s, f);

/* ── po-27 · Icono grande central ──────────────────────────────────
   Navy, todo centrado: aro de 128 con el icono, titular y bajada.
   El aro va con borde de 2px, no relleno. */
function PoIconoHero({ copete, titulo, bajada, cta, handle, icono, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={60} scale={scale}>
      <PlateHeader chip={copete} onInverse base={BI} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: 128, height: 128, borderRadius: '50%', border: '2px solid var(--grey)', color: 'var(--grey)', display: 'grid', placeItems: 'center', marginBottom: 32, flexShrink: 0 }}>
          <Icon name={icono || 'grafico'} size={62} />
        </div>
        <Display level={2} onInverse style={{ fontSize: fitI(titulo, [[26, 42], [42, 36], [60, 30]], 26), fontWeight: 700, lineHeight: 1.1, maxWidth: '94%' }}>{titulo}</Display>
        <Lede size="body" onInverse style={{ marginTop: 16, fontSize: fitI(bajada, [[80, 17], [125, 15.5]], 14), maxWidth: '84%' }}>{bajada}</Lede>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--grey)' }}>{cta} →</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted-on-inverse)', whiteSpace: 'nowrap' }}>{handle}</span>
      </div>
    </Plate>
  );
}

/* ── po-28 · Proceso en 3 pasos con iconos ─────────────────────────
   Una linea por paso (la que explica de verdad es po-31). Cuadrado de 62
   con radio 14 y el numero en un circulo que sobresale arriba a la izquierda. */
function PoProcesoIconos({ copete, titulo, pasos, cta, handle, scale }) {
  const ICOS = ['documento', 'calculadora', 'grafico'];
  return (
    <Plate format="portrait" tone="white" pad={56} scale={scale}>
      <PlateHeader chip={copete} base={BI} />
      <Display level={2} style={{ marginTop: 28, fontSize: fitI(titulo, [[28, 36], [44, 31], [62, 27]], 24), fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '90%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        {(pasos || []).map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ flexShrink: 0, width: 62, height: 62, borderRadius: 14, background: 'var(--grey)', color: 'var(--navy)', display: 'grid', placeItems: 'center', position: 'relative' }}>
              <Icon name={ICOS[i] || 'tilde'} size={30} />
              <span style={{ position: 'absolute', top: -8, left: -8, width: 24, height: 24, borderRadius: '50%', background: 'var(--navy)', color: 'var(--paper)', fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11, display: 'grid', placeItems: 'center' }}>{i + 1}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 16.5, fontWeight: 400, color: 'var(--ink)', lineHeight: 1.32, minWidth: 0 }}>{s}</div>
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

/* ── po-29 · Icono lateral + frase ─────────────────────────────────
   Navy. El icono va a 80, suelto (sin aro ni caja) y corrido 14 a la
   izquierda del margen: alineacion optica contra el texto. */
function PoIconoFrase({ copete, frase, cta, handle, icono, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={60} scale={scale}>
      <PlateHeader chip={copete} onInverse base={BI} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: 'var(--grey)', marginBottom: 28, marginLeft: -14 }}>
          <Icon name={icono || 'escudo'} size={80} />
        </div>
        <Display level={2} onInverse style={{ fontSize: fitI(frase, [[38, 40], [58, 34], [82, 29]], 25), fontWeight: 700, lineHeight: 1.14, letterSpacing: '-0.01em' }}>{frase}</Display>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--grey)' }}>{cta} →</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted-on-inverse)', whiteSpace: 'nowrap' }}>{handle}</span>
      </div>
    </Plate>
  );
}

/* ── po-30 · Grid 2x2 de iconos ────────────────────────────────────
   Cuatro fichas con filete y radio 10. Icono arriba, etiqueta abajo, con el
   espacio repartido: las cuatro quedan de igual alto aunque el texto no. */
function PoGridIconos({ copete, titulo, labels, handle, scale }) {
  const ICOS = ['documento', 'balanza', 'equipo', 'buscar'];
  return (
    <Plate format="portrait" tone="white" pad={56} scale={scale}>
      <PlateHeader chip={copete} base={BI} />
      <Display level={2} style={{ marginTop: 28, fontSize: fitI(titulo, [[30, 34], [46, 30], [64, 26]], 23), fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '90%' }}>{titulo}</Display>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28, marginBottom: 16 }}>
        {(labels || []).map((l, i) => (
          <div key={i} style={{ border: '1px solid var(--hair)', borderRadius: 10, padding: '20px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ color: 'var(--navy)' }}><Icon name={ICOS[i] || 'tilde'} size={34} /></div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{l}</div>
          </div>
        ))}
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

Object.assign(window, { PoIconoHero, PoProcesoIconos, PoIconoFrase, PoGridIconos });

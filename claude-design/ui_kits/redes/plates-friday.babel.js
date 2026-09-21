// plates-friday.jsx — TANDA 8 (última): las 3 del viernes que faltaban
// (po-22, po-23, po-25). Las otras dos del archivo, po-21 y po-24, ya estaban.
// Recreadas leyendo templates-friday.jsx del repo mdo-automatizaciones-redes.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const { Plate, PlateHeader, HandleFooter, Eyebrow, Display, Lede } = NS;
const BF = '../../assets/logos';
const fitF = (t, s, f) => window.fitSize(t, s, f);

const itaF = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300,
  fontSize: size, lineHeight: lh || 1.1, color,
});

/* ── po-22 · Antes / Después ───────────────────────────────────────────
   Placa partida en dos mitades de igual alto: arriba el problema en gris
   apagado, abajo la solución en navy. El contraste ES el mensaje. */
function PoAntesDespues({ copete, sin_label, sin_texto, con_label, con_texto, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="white" pad={0} scale={scale}>
      <div style={{ padding: '52px 56px 0' }}>
        <PlateHeader chip={copete} base={BF} />
      </div>
      <div style={{ flex: 1, padding: '26px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 14 }}>{sin_label}</Eyebrow>
        <Display level={2} style={{ fontSize: fitF(sin_texto, [[60, 29], [95, 25]], 22), color: 'var(--ink-35)', lineHeight: 1.18, fontWeight: 600 }}>{sin_texto}</Display>
      </div>
      <div style={{ background: 'var(--navy)', color: 'var(--paper)', flex: 1, padding: '32px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow onInverse style={{ marginBottom: 14 }}>{con_label}</Eyebrow>
        <Display level={2} onInverse style={{ fontSize: fitF(con_texto, [[55, 33], [90, 28]], 24), lineHeight: 1.14, fontWeight: 700 }}>{con_texto}</Display>
        <div style={{ marginTop: 20, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--grey)' }}>{cta} →</div>
        <HandleFooter handle={handle} onInverse style={{ marginTop: 18 }} />
      </div>
    </Plate>
  );
}

/* ── po-23 · Declaración / manifiesto ──────────────────────────────────
   La única placa firmada «Estudio MDO · Consultores» en el pie, arriba del
   handle: es una declaración, así que lleva firma. */
function PoDeclaracion({ copete, declaracion, apoyo, handle, scale }) {
  return (
    <Plate format="portrait" tone="white" pad={60} scale={scale}>
      <PlateHeader chip={copete} base={BF} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ height: 1, width: 56, background: 'var(--navy)', marginBottom: 30 }} />
        <Display level={2} style={{ fontSize: fitF(declaracion, [[45, 46], [70, 39], [100, 33]], 28), fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{declaracion}</Display>
        <Lede size="body" style={{ marginTop: 22, fontSize: fitF(apoyo, [[95, 17], [140, 15.5]], 14), maxWidth: '92%' }}>{apoyo}</Lede>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid var(--hair)' }}>
        <span style={{ width: 32, height: 1, background: 'var(--navy)', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>Estudio MDO · Consultores</span>
      </div>
      <HandleFooter handle={handle} />
    </Plate>
  );
}

/* ── po-25 · Foco / una idea ───────────────────────────────────────────
   La única que usa la grilla de líneas sobre navy, y el asterisco gigante
   como recurso de apertura. Una idea sola, sin lista ni bullets. */
function PoFoco({ copete, idea, detalle, cta, handle, scale }) {
  return (
    <Plate format="portrait" tone="navy" pad={60} scale={scale}
      style={{ backgroundImage: 'linear-gradient(to right,rgba(248,246,246,0.06) 1px,transparent 1px)', backgroundSize: '64px 64px' }}>
      <PlateHeader chip={copete} onInverse base={BF} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ ...itaF(66, 'var(--grey)', 0.7), marginBottom: 6 }}>*</div>
        <Display level={2} onInverse style={{ fontSize: fitF(idea, [[36, 50], [56, 42], [80, 35]], 30), fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em' }}>{idea}</Display>
        <Lede size="body" onInverse style={{ marginTop: 20, fontSize: fitF(detalle, [[85, 17], [130, 15.5]], 14), maxWidth: '90%' }}>{detalle}</Lede>
      </div>
      <div>
        <div style={{ height: 1, background: 'var(--rule-on-inverse)', marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--grey)' }}>{cta} →</span>
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted-on-inverse)', whiteSpace: 'nowrap' }}>{handle}</span>
        </div>
      </div>
    </Plate>
  );
}

Object.assign(window, { PoAntesDespues, PoDeclaracion, PoFoco });

// templates-friday-b.jsx — plantillas icon-forward del viernes, MARCA v2.0.
// Va al repo como mdo-templates/templates-friday-b.jsx (reemplaza el actual).
//
// Portrait 4:5 (base 540×675 → 1080×1350). Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx + mdo-brand.css v2.0 cargados ANTES.
//
// QUÉ CAMBIÓ — mismos IDs y mismos slots:
//   Montserrat → var(--font-body) · Geist Mono → var(--font-accent) versalitas
//   · hex → variables · el lockup no baja de 40.
//
// LOS ÍCONOS NO CAMBIAN. Son los mismos nueve, con el mismo path data y el
// mismo trazo 1.7: es el set propio del estudio y sigue siendo válido con la
// marca nueva. No hay librería externa ni icon-font: si falta un glifo se
// dibuja con el mismo trazo y se agrega acá. Nunca mezclar con otro set.

// ── Set de íconos line-style (stroke currentColor) ──────────────────
function Svg({ s = 32, children }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block' }}>{children}</svg>
  );
}
const IcoClock  = (p) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
const IcoChart  = (p) => <Svg {...p}><path d="M4 4v16h16" /><path d="M7 14l3-3 3 2 4-6" /></Svg>;
const IcoShield = (p) => <Svg {...p}><path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z" /><path d="M9 12l2 2 4-4" /></Svg>;
const IcoDoc    = (p) => <Svg {...p}><path d="M14 3H7a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V7z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 16.5h4" /></Svg>;
const IcoCalc   = (p) => <Svg {...p}><rect x="6" y="3" width="12" height="18" rx="1.5" /><path d="M9 7h6" /><path d="M9.5 12h.01M12 12h.01M14.5 12h.01M9.5 15h.01M12 15h.01M14.5 15h.01M9.5 18h.01M12 18h.01" /></Svg>;
const IcoScale  = (p) => <Svg {...p}><path d="M12 4v16" /><path d="M7 20h10" /><path d="M4 7h16" /><path d="M4 7l-2 4.5h4z" /><path d="M20 7l-2 4.5h4z" /></Svg>;
const IcoUsers  = (p) => <Svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0111 0" /><path d="M16 6a2.6 2.6 0 010 5" /><path d="M17 15.2c2.2.4 3.8 2.3 3.8 4.8" /></Svg>;
const IcoSearch = (p) => <Svg {...p}><circle cx="11" cy="11" r="6" /><path d="M15.5 15.5L20 20" /></Svg>;
const IcoCheck  = (p) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></Svg>;

// ── po-26 · 3 columnas con íconos (papel) ───────────────────────────
// Las etiquetas se alinean arriba: así los tres íconos quedan a la misma altura
// aunque un texto ocupe dos líneas.
// Slots: COPETE, TITULO, LABEL_1..3, CTA, HANDLE
function PoTresIconos(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', label_1: '[LABEL_1]',
    label_2: '[LABEL_2]', label_3: '[LABEL_3]', cta: '[CTA]', handle: '[HANDLE]' }, props);

  const cols = [{ Ic: IcoClock, l: p.label_1 }, { Ic: IcoChart, l: p.label_2 },
    { Ic: IcoShield, l: p.label_3 }];
  const tSize = fitSize(p.titulo, [[30, 36], [46, 31], [64, 27]], 24);

  return (
    <div className="tpl" style={{ padding: 56, display: 'flex', flexDirection: 'column',
      background: 'var(--paper)' }}>
      <TplHeader chip={p.copete} size={40} />

      <div className="display" style={{ marginTop: 30, fontSize: tSize, fontWeight: 700,
        lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '90%' }}>{p.titulo}</div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, width: '100%' }}>
          {cols.map((c, i) => (
            <div key={i} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center', gap: 14 }}>
              <div style={{ width: 86, height: 86, borderRadius: '50%', background: 'var(--grey)',
                color: 'var(--navy)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0 }}><c.Ic s={38} /></div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 600,
                color: 'var(--ink)', lineHeight: 1.3 }}>{c.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)',
        fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{p.cta}</span>
        <span style={{ color: 'var(--grey)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-27 · Ícono grande central (navy) ─────────────────────────────
// El aro va con borde de 2px, no relleno.
// Slots: COPETE, TITULO, BAJADA, CTA, HANDLE
function PoIconoHero(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', bajada: '[BAJADA]',
    cta: '[CTA]', handle: '[HANDLE]' }, props);

  const tSize = fitSize(p.titulo, [[26, 42], [42, 36], [60, 30]], 26);
  const bSize = fitSize(p.bajada, [[80, 17], [125, 15.5]], 14);

  return (
    <div className="tpl navy" style={{ padding: 60, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} mode="light" size={40} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: 128, height: 128, borderRadius: '50%',
          border: '2px solid var(--grey)', color: 'var(--grey)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: 32,
          flexShrink: 0 }}><IcoChart s={62} /></div>
        <div className="display" style={{ fontSize: tSize, fontWeight: 700, color: 'var(--paper)',
          lineHeight: 1.1, maxWidth: '94%' }}>{p.titulo}</div>
        <div className="lede" style={{ marginTop: 16, fontSize: bSize, maxWidth: '84%' }}>{p.bajada}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
          color: 'var(--grey)' }}>{p.cta} →</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em',
          color: 'var(--ink-40)', whiteSpace: 'nowrap' }}>{p.handle}</span>
      </div>
    </div>
  );
}

// ── po-28 · Proceso en 3 pasos con íconos (papel) ───────────────────
// Una línea por paso (la que explica de verdad es po-31). Cuadrado de 62 con
// radio 14 y el número en un círculo que sobresale arriba a la izquierda.
// Slots: COPETE, TITULO, PASO_1..3, CTA, HANDLE
function PoProcesoIconos(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', paso_1: '[PASO_1]',
    paso_2: '[PASO_2]', paso_3: '[PASO_3]', cta: '[CTA]', handle: '[HANDLE]' }, props);

  const pasos = [{ Ic: IcoDoc, t: p.paso_1 }, { Ic: IcoCalc, t: p.paso_2 },
    { Ic: IcoChart, t: p.paso_3 }];
  const tSize = fitSize(p.titulo, [[28, 36], [44, 31], [62, 27]], 24);

  return (
    <div className="tpl" style={{ padding: 56, display: 'flex', flexDirection: 'column',
      background: 'var(--paper)' }}>
      <TplHeader chip={p.copete} size={40} />

      <div className="display" style={{ marginTop: 28, fontSize: tSize, fontWeight: 700,
        lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '90%' }}>{p.titulo}</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 24 }}>
        {pasos.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ flexShrink: 0, width: 62, height: 62, borderRadius: 14,
              background: 'var(--grey)', color: 'var(--navy)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <s.Ic s={30} />
              <span style={{ position: 'absolute', top: -8, left: -8, width: 24, height: 24,
                borderRadius: '50%', background: 'var(--navy)', color: 'var(--paper)',
                fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11, display: 'flex',
                alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 16.5, fontWeight: 400,
              color: 'var(--ink)', lineHeight: 1.32, minWidth: 0 }}>{s.t}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)',
        fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{p.cta}</span>
        <span style={{ color: 'var(--grey)', flexShrink: 0 }}>→</span>
      </div>
      <HandleFooter handle={p.handle} />
    </div>
  );
}

// ── po-29 · Ícono lateral + frase (navy) ────────────────────────────
// El ícono va suelto a 80, sin aro ni caja, y corrido 14 a la izquierda del
// margen: es alineación óptica contra el texto.
// Slots: COPETE, FRASE, CTA, HANDLE
function PoIconoFrase(props) {
  const p = Object.assign({ copete: '[COPETE]', frase: '[FRASE]', cta: '[CTA]',
    handle: '[HANDLE]' }, props);

  const fSize = fitSize(p.frase, [[38, 40], [58, 34], [82, 29]], 25);

  return (
    <div className="tpl navy" style={{ padding: 60, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} mode="light" size={40} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: 'var(--grey)', marginBottom: 28, marginLeft: -14 }}>
          <IcoShield s={80} />
        </div>
        <div className="display" style={{ fontSize: fSize, fontWeight: 700, color: 'var(--paper)',
          lineHeight: 1.14, letterSpacing: '-0.01em' }}>{p.frase}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
          color: 'var(--grey)' }}>{p.cta} →</span>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, letterSpacing: '0.08em',
          color: 'var(--ink-40)', whiteSpace: 'nowrap' }}>{p.handle}</span>
      </div>
    </div>
  );
}

// ── po-30 · Grid 2×2 de íconos (blanco) ─────────────────────────────
// El espacio se reparte con space-between, así las cuatro fichas quedan de
// igual alto aunque el texto no lo sea.
// Slots: COPETE, TITULO, LABEL_1..4, HANDLE
function PoGridIconos(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', label_1: '[LABEL_1]',
    label_2: '[LABEL_2]', label_3: '[LABEL_3]', label_4: '[LABEL_4]', handle: '[HANDLE]' }, props);

  const tiles = [{ Ic: IcoDoc, l: p.label_1 }, { Ic: IcoScale, l: p.label_2 },
    { Ic: IcoUsers, l: p.label_3 }, { Ic: IcoSearch, l: p.label_4 }];
  const tSize = fitSize(p.titulo, [[30, 34], [46, 30], [64, 26]], 23);

  return (
    <div className="tpl white" style={{ padding: 56, display: 'flex', flexDirection: 'column' }}>
      <TplHeader chip={p.copete} size={40} />

      <div className="display" style={{ marginTop: 28, fontSize: tSize, fontWeight: 700,
        lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '90%' }}>{p.titulo}</div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        marginTop: 28, marginBottom: 16 }}>
        {tiles.map((t, i) => (
          <div key={i} style={{ border: '1px solid var(--hair)', borderRadius: 10,
            padding: '20px 18px', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', gap: 16 }}>
            <div style={{ color: 'var(--navy)' }}><t.Ic s={34} /></div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
              color: 'var(--ink)', lineHeight: 1.25 }}>{t.l}</div>
          </div>
        ))}
      </div>

      <HandleFooter handle={p.handle} />
    </div>
  );
}

const EXAMPLES_FRIDAY_B = {
  PoTresIconos: { copete: 'Contabilidad', titulo: 'Llevar la contabilidad al día te da:',
    label_1: 'Números al día', label_2: 'Mejores decisiones', label_3: 'Tranquilidad con ARCA',
    cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores' },
  PoIconoHero: { copete: 'Gestión PyME', titulo: 'Ordená hoy para crecer mañana',
    bajada: 'Una PyME con la contabilidad clara toma mejores decisiones y crece más tranquila.',
    cta: 'Empecemos', handle: '@mdoconsultores' },
  PoProcesoIconos: { copete: 'Cómo trabajamos', titulo: 'Tu contabilidad, en 3 pasos',
    paso_1: 'Ordenamos y registramos tus operaciones',
    paso_2: 'Conciliamos y armamos tus balances',
    paso_3: 'Te damos reportes claros para decidir',
    cta: 'Consultanos', handle: '@mdoconsultores' },
  PoIconoFrase: { copete: 'Gestión PyME', frase: 'Dormí tranquilo: tus números, en orden y al día.',
    cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores' },
  PoGridIconos: { copete: 'Servicios', titulo: 'Todo lo que tu PyME necesita, en un solo equipo',
    label_1: 'Contabilidad', label_2: 'Impuestos', label_3: 'Sueldos', label_4: 'Auditoría',
    handle: '@mdoconsultores' },
};

Object.assign(window, {
  Svg, IcoClock, IcoChart, IcoShield, IcoDoc, IcoCalc, IcoScale, IcoUsers, IcoSearch, IcoCheck,
  PoTresIconos, PoIconoHero, PoProcesoIconos, PoIconoFrase, PoGridIconos, EXAMPLES_FRIDAY_B,
});

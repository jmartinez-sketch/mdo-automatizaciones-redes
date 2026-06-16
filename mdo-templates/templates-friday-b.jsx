// templates-friday-b.jsx — 5 templates icon-forward para el viernes (po-26..po-30).
// Menos texto, más íconos. Íconos SVG inline (line-style) en paleta MDO.
// Portrait 4:5 (base 540×675 → 1080×1350). Regla: ARCA nunca AFIP.

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

// ─────────────────────────────────────────────────────────────────────
// po-26 — 3 columnas con íconos (papel). Íconos fijos: al día / decisiones / tranquilidad
// Slots: COPETE, TITULO, LABEL_1, LABEL_2, LABEL_3, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoTresIconos(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', label_1: '[LABEL_1]',
    label_2: '[LABEL_2]', label_3: '[LABEL_3]', cta: '[CTA]', handle: '[HANDLE]' }, props);
  const cols = [{ Ic: IcoClock, l: p.label_1 }, { Ic: IcoChart, l: p.label_2 }, { Ic: IcoShield, l: p.label_3 }];
  return (
    <div className="tpl" style={{ padding: 60, display: 'flex', flexDirection: 'column', background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} /><div className="chip">{p.copete}</div>
      </div>
      <div className="display" style={{ marginTop: 32, fontSize: 36, fontWeight: 700, color: 'var(--navy-ink)', lineHeight: 1.1, maxWidth: '88%' }}>{p.titulo}</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 18 }}>
        {cols.map((c, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--blue-pale)', color: 'var(--navy)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}><c.Ic s={40} /></div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{c.l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)', borderRadius: 2,
        fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, fontWeight: 600, marginBottom: 16 }}>{p.cta}</div>
      <div className="footer-row"><span>{p.handle}</span><span>mdo-consultores.com.ar</span></div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-27 — Ícono grande central (navy). Ícono fijo: crecimiento (chart)
// Slots: COPETE, TITULO, BAJADA, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoIconoHero(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', bajada: '[BAJADA]', cta: '[CTA]', handle: '[HANDLE]' }, props);
  return (
    <div className="tpl navy" style={{ padding: 64, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup mode="light" size={26} /><div className="chip">{p.copete}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: 132, height: 132, borderRadius: '50%', border: '2px solid var(--blue-lt)', color: 'var(--blue-lt)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36 }}><IcoChart s={64} /></div>
        <div className="display" style={{ fontSize: 42, fontWeight: 700, color: 'var(--paper)', lineHeight: 1.08, maxWidth: '94%' }}>{p.titulo}</div>
        <div className="lede" style={{ marginTop: 18, fontSize: 17, color: 'rgba(247,249,252,0.82)', maxWidth: '82%' }}>{p.bajada}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--blue-lt)' }}>{p.cta} →</span>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(247,249,252,0.55)' }}>{p.handle}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-28 — Proceso en 3 pasos con íconos (papel). Íconos fijos: doc / calc / chart
// Slots: COPETE, TITULO, PASO_1, PASO_2, PASO_3, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoProcesoIconos(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', paso_1: '[PASO_1]', paso_2: '[PASO_2]',
    paso_3: '[PASO_3]', cta: '[CTA]', handle: '[HANDLE]' }, props);
  const pasos = [{ Ic: IcoDoc, t: p.paso_1 }, { Ic: IcoCalc, t: p.paso_2 }, { Ic: IcoChart, t: p.paso_3 }];
  return (
    <div className="tpl" style={{ padding: 60, display: 'flex', flexDirection: 'column', background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} /><div className="chip">{p.copete}</div>
      </div>
      <div className="display" style={{ marginTop: 30, fontSize: 36, fontWeight: 700, color: 'var(--navy-ink)', lineHeight: 1.1, maxWidth: '90%' }}>{p.titulo}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
        {pasos.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 14, background: 'var(--blue-pale)', color: 'var(--navy)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <s.Ic s={32} />
              <span style={{ position: 'absolute', top: -8, left: -8, width: 24, height: 24, borderRadius: '50%', background: 'var(--navy)',
                color: 'var(--paper)', fontFamily: 'Geist Mono, monospace', fontSize: 11, fontWeight: 500,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 17, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>{s.t}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '15px 20px', background: 'var(--navy)', color: 'var(--paper)', borderRadius: 2,
        fontFamily: 'Montserrat, sans-serif', fontSize: 13.5, fontWeight: 600, marginBottom: 16 }}>{p.cta}</div>
      <div className="footer-row"><span>{p.handle}</span><span>mdo-consultores.com.ar</span></div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-29 — Ícono grande lateral + frase (navy). Ícono fijo: shield-check
// Slots: COPETE, FRASE, CTA, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoIconoFrase(props) {
  const p = Object.assign({ copete: '[COPETE]', frase: '[FRASE]', cta: '[CTA]', handle: '[HANDLE]' }, props);
  return (
    <div className="tpl navy" style={{ padding: 64, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup mode="light" size={26} /><div className="chip">{p.copete}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: 'var(--blue-lt)', marginBottom: 30 }}><IcoShield s={84} /></div>
        <div className="display" style={{ fontSize: 40, fontWeight: 700, color: 'var(--paper)', lineHeight: 1.12, letterSpacing: '-0.01em' }}>{p.frase}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--blue-lt)' }}>{p.cta} →</span>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(247,249,252,0.55)' }}>{p.handle}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// po-30 — Grid 2×2 de íconos "lo que hacemos" (papel). Íconos fijos por área
// Slots: COPETE, TITULO, LABEL_1, LABEL_2, LABEL_3, LABEL_4, HANDLE
// ─────────────────────────────────────────────────────────────────────
function PoGridIconos(props) {
  const p = Object.assign({ copete: '[COPETE]', titulo: '[TITULO]', label_1: '[LABEL_1]', label_2: '[LABEL_2]',
    label_3: '[LABEL_3]', label_4: '[LABEL_4]', handle: '[HANDLE]' }, props);
  const tiles = [{ Ic: IcoDoc, l: p.label_1 }, { Ic: IcoScale, l: p.label_2 }, { Ic: IcoUsers, l: p.label_3 }, { Ic: IcoSearch, l: p.label_4 }];
  return (
    <div className="tpl white" style={{ padding: 60, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup size={26} /><div className="chip">{p.copete}</div>
      </div>
      <div className="display" style={{ marginTop: 30, fontSize: 34, fontWeight: 700, color: 'var(--navy-ink)', lineHeight: 1.1, maxWidth: '90%' }}>{p.titulo}</div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 32, marginBottom: 18 }}>
        {tiles.map((t, i) => (
          <div key={i} style={{ border: '1px solid var(--hair)', borderRadius: 12, padding: '22px 20px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
            <div style={{ color: 'var(--navy)' }}><t.Ic s={36} /></div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{t.l}</div>
          </div>
        ))}
      </div>
      <div className="footer-row"><span>{p.handle}</span><span>mdo-consultores.com.ar</span></div>
    </div>
  );
}

const EXAMPLES_FRIDAY_B = {
  PoTresIconos: { copete: 'Contabilidad', titulo: 'Llevar la contabilidad al día te da:',
    label_1: 'Números al día', label_2: 'Mejores decisiones', label_3: 'Tranquilidad con ARCA',
    cta: 'Llevamos tu contabilidad. Consultanos.', handle: '@mdoconsultores' },
  PoIconoHero: { copete: 'Gestión PyME', titulo: 'Ordená hoy para crecer mañana',
    bajada: 'Una PyME con la contabilidad clara toma mejores decisiones y crece más tranquila.',
    cta: 'Empecemos', handle: '@mdoconsultores' },
  PoProcesoIconos: { copete: 'Cómo trabajamos', titulo: 'Tu contabilidad, en 3 pasos',
    paso_1: 'Ordenamos y registramos tus operaciones', paso_2: 'Conciliamos y armamos tus balances',
    paso_3: 'Te damos reportes claros para decidir', cta: 'Consultanos', handle: '@mdoconsultores' },
  PoIconoFrase: { copete: 'Gestión PyME', frase: 'Dormí tranquilo: tus números, en orden y al día.',
    cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores' },
  PoGridIconos: { copete: 'Servicios', titulo: 'Todo lo que tu PyME necesita, en un solo equipo',
    label_1: 'Contabilidad', label_2: 'Impuestos', label_3: 'Sueldos', label_4: 'Auditoría', handle: '@mdoconsultores' },
};

Object.assign(window, { PoTresIconos, PoIconoHero, PoProcesoIconos, PoIconoFrase, PoGridIconos, EXAMPLES_FRIDAY_B });

// brand.jsx — shared MDO brand primitives used across templates.

const ISO_DARK = 'assets/logo-mdo-iso.svg';      // isotipo navy — para fondos claros
const ISO_WHITE = 'assets/logo-mdo-iso-white.svg'; // isotipo paper — para fondos navy

// Logo principal (MDO + CONSULTORES) y secundario (los tres apellidos).
// Son los SVG del manual, no texto: el nombre nunca se escribe a mano.
const LOGO_DARK = 'assets/logo-mdo-principal.svg';
const LOGO_WHITE = 'assets/logo-mdo-principal-white.svg';
const LOGO2_DARK = 'assets/logo-mdo-secundario.svg';
const LOGO2_WHITE = 'assets/logo-mdo-secundario-white.svg';

// Logo principal: el SVG del manual (isotipo + MDO + CONSULTORES).
// Modo 'dark' (navy, para fondos claros) o 'light' (paper, para navy).
// `hideWordmark` deja sólo el isotipo, para cajas muy chicas.
function Lockup({ mode = 'dark', size = 28, hideWordmark = false }) {
  const light = mode === 'light';
  const src = hideWordmark ? (light ? ISO_WHITE : ISO_DARK)
                           : (light ? LOGO_WHITE : LOGO_DARK);
  return (
    <img src={src} alt="MDO Consultores"
      style={{ height: size, width: 'auto', display: 'block' }} />
  );
}

// Bottom rule + handle/url
function FooterBar({ mode = 'dark', url = '@mdoconsultores', side = null }) {
  const txt = mode === 'light' ? 'rgba(247,249,252,0.6)' : 'var(--ink-55)';
  return (
    <div className="footer-row" style={{ color: txt }}>
      <span>{url}</span>
      <span>{side || 'mdo-consultores.com.ar'}</span>
    </div>
  );
}

// Iso watermark — large faded mark for corner use
function IsoWatermark({ mode = 'dark', size = 200, opacity = 0.08, style = {} }) {
  const src = mode === 'light' ? ISO_WHITE : ISO_DARK;
  return (
    <img src={src} alt="" aria-hidden="true"
      style={{ width: size, height: 'auto', opacity, pointerEvents: 'none', ...style }} />
  );
}


// ── Lockup secundario ──────────────────────────────────────────────
// El SVG del manual: isotipo, filete vertical y los tres apellidos.
// Va sólo donde hace falta reforzar la identificación institucional
// (mn-08 y li-02). Mínimo 30 mm / 140 px: por debajo de eso el manual
// pide usar sólo el isologo.
function LockupSecundario({ mode = 'light', size = 48 }) {
  const src = mode === 'light' ? LOGO2_WHITE : LOGO2_DARK;
  return (
    <img src={src} alt="Martinez · De Orta · Gutierrez Taboada"
      style={{ height: size, width: 'auto', display: 'block' }} />
  );
}

Object.assign(window, { Lockup, LockupSecundario, FooterBar, IsoWatermark,
  ISO_DARK, ISO_WHITE, LOGO_DARK, LOGO_WHITE, LOGO2_DARK, LOGO2_WHITE });

// brand.jsx — shared MDO brand primitives used across templates.

const ISO_DARK = 'assets/logo-mdo-iso.svg';      // blue M on transparent — for light bg
const ISO_WHITE = 'assets/logo-mdo-iso-white.svg'; // white M on transparent — for navy bg

// Wordmark + iso lockup. Modes: 'dark' (default, blue iso + navy wordmark)
// or 'light' (white iso + paper wordmark) for navy backgrounds.
function Lockup({ mode = 'dark', size = 28, stacked = false, hideWordmark = false }) {
  const src = mode === 'light' ? ISO_WHITE : ISO_DARK;
  if (stacked) {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <img src={src} alt="MDO" style={{ height: size, width: 'auto', display: 'block' }} />
        {!hideWordmark && (
          <div className="wm" style={{
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: size * 0.34,
            letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'center',
            color: mode === 'light' ? 'var(--paper)' : 'var(--navy)', lineHeight: 1.2,
          }}>
            Martinez, De Orta
            <div style={{ fontWeight: 500, fontSize: size * 0.26, letterSpacing: '0.22em',
              color: mode === 'light' ? 'rgba(247,249,252,0.65)' : 'var(--ink-55)', marginTop: 2 }}>
              Gutierrez Taboada
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="lockup">
      <img className="iso" src={src} alt="MDO" style={{ height: size }} />
      {!hideWordmark && (
        <div className="wm" style={{ color: mode === 'light' ? 'var(--paper)' : 'var(--navy)' }}>
          Martinez, De Orta
          <small style={{ color: mode === 'light' ? 'rgba(247,249,252,0.65)' : 'var(--ink-55)' }}>
            Gutierrez Taboada
          </small>
        </div>
      )}
    </div>
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

Object.assign(window, { Lockup, FooterBar, IsoWatermark, ISO_DARK, ISO_WHITE });

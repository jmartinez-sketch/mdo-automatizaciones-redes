import React from 'react';

// Set de iconos de MDO: line-style, trazo 1.7, viewBox 24, sin relleno.
// Son los nueve que usan las placas icon-forward del estudio.
// No hay libreria externa ni icon-font: este es el set completo.
const PATHS = {
  reloj:   [<circle key="a" cx="12" cy="12" r="9" />, <path key="b" d="M12 7v5l3 2" />],
  grafico: [<path key="a" d="M4 4v16h16" />, <path key="b" d="M7 14l3-3 3 2 4-6" />],
  escudo:  [<path key="a" d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z" />, <path key="b" d="M9 12l2 2 4-4" />],
  documento: [<path key="a" d="M14 3H7a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V7z" />, <path key="b" d="M14 3v4h4" />, <path key="c" d="M9 13h6M9 16.5h4" />],
  calculadora: [<rect key="a" x="6" y="3" width="12" height="18" rx="1.5" />, <path key="b" d="M9 7h6" />, <path key="c" d="M9.5 12h.01M12 12h.01M14.5 12h.01M9.5 15h.01M12 15h.01M14.5 15h.01M9.5 18h.01M12 18h.01" />],
  balanza: [<path key="a" d="M12 4v16" />, <path key="b" d="M7 20h10" />, <path key="c" d="M4 7h16" />, <path key="d" d="M4 7l-2 4.5h4z" />, <path key="e" d="M20 7l-2 4.5h4z" />],
  equipo:  [<circle key="a" cx="9" cy="8" r="3" />, <path key="b" d="M3.5 20a5.5 5.5 0 0111 0" />, <path key="c" d="M16 6a2.6 2.6 0 010 5" />, <path key="d" d="M17 15.2c2.2.4 3.8 2.3 3.8 4.8" />],
  buscar:  [<circle key="a" cx="11" cy="11" r="6" />, <path key="b" d="M15.5 15.5L20 20" />],
  tilde:   [<circle key="a" cx="12" cy="12" r="9" />, <path key="b" d="M8 12l3 3 5-6" />],
};

export const ICON_NAMES = Object.keys(PATHS);

export function Icon({ name = 'tilde', size = 32, style = {}, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ display: 'block', ...style }} {...rest}>
      {PATHS[name] || PATHS.tilde}
    </svg>
  );
}

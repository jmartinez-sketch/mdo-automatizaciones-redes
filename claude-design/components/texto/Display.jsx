import React from 'react';

// Titular en Chivo. level 1 = 900 (titular de pagina o placa), 2 = 700,
// 3 = 700 chico. Sobre navy pasa a papel.
const LEVELS = {
  1: { fontSize: 'var(--fs-h1)', fontWeight: 900, letterSpacing: 'var(--ls-h1)' },
  2: { fontSize: 'var(--fs-h2)', fontWeight: 700, letterSpacing: 'var(--ls-h2)' },
  3: { fontSize: 'var(--fs-h3)', fontWeight: 700, letterSpacing: '-0.005em' },
};

export function Display({ children, level = 1, onInverse = false, as, style = {}, ...rest }) {
  const Tag = as || 'h' + level;
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        lineHeight: 'var(--lh-display)',
        textWrap: 'balance',
        color: onInverse ? 'var(--text-on-inverse)' : 'var(--text-title)',
        ...LEVELS[level],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

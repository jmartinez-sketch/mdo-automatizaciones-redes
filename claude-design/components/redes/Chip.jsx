import React from 'react';

// Capsula de categoria. Chivo 700 en versalitas, borde de 1px, radio pill.
export function Chip({ children, solid = false, onInverse = false, style = {}, ...rest }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 'var(--r-pill)',
    fontFamily: 'var(--font-accent)',
    fontWeight: 700,
    fontSize: 9.5,
    letterSpacing: 'var(--ls-chip)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    border: '1px solid',
  };
  let tone;
  if (onInverse) {
    tone = solid
      ? { background: 'var(--paper)', color: 'var(--navy)', borderColor: 'var(--paper)' }
      : { background: 'transparent', color: 'var(--paper)', borderColor: 'var(--rule-on-inverse-strong)' };
  } else {
    tone = solid
      ? { background: 'var(--navy)', color: 'var(--paper)', borderColor: 'var(--navy)' }
      : { background: 'rgba(255,255,255,0.5)', color: 'var(--navy)', borderColor: 'var(--hair-2)' };
  }
  return <span style={{ ...base, ...tone, ...style }} {...rest}>{children}</span>;
}

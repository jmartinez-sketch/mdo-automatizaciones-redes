import React from 'react';

// Indice de carrusel: 01 — 03. Va en el pie de las placas ca-* y cb-*.
export function PageIndex({ current = 1, total = 3, onInverse = false, style = {} }) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10,
      letterSpacing: '0.16em', textTransform: 'uppercase',
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)',
      ...style,
    }}>
      <span style={{ color: onInverse ? 'var(--paper)' : 'var(--navy)' }}>{pad(current)}</span>
      <span style={{ width: 10, height: 1, background: 'currentColor', opacity: 0.4 }} />
      <span>{pad(total)}</span>
    </div>
  );
}

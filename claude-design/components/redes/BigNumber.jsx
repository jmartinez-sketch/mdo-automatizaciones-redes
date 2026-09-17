import React from 'react';

// Numero protagonista: Chivo 300, tracking muy negativo, cifras tabulares.
// Es el recurso de las placas de dato (sq-03, li-03) y de dia de vencimiento.
export function BigNumber({ children, size = 180, unit, onInverse = false, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
      <div style={{
        fontFamily: 'var(--font-accent)', fontWeight: 300, fontSize: size,
        letterSpacing: '-0.04em', lineHeight: 0.85, fontVariantNumeric: 'tabular-nums',
        color: onInverse ? 'var(--paper)' : 'var(--navy)', ...style,
      }}>{children}</div>
      {unit ? (
        <div style={{
          fontFamily: 'var(--font-accent)', fontWeight: 300,
          fontSize: Math.round(size * 0.22 + 22),
          color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--slate)',
        }}>{unit}</div>
      ) : null}
    </div>
  );
}

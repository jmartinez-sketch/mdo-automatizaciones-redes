import React from 'react';

// Filete. La marca separa con lineas de 1px, no con sombras ni cajas.
export function Rule({ width = '100%', strong = false, onInverse = false, style = {}, ...rest }) {
  return (
    <div
      role="separator"
      style={{
        height: 1,
        width,
        background: onInverse
          ? (strong ? 'var(--rule-on-inverse-strong)' : 'var(--rule-on-inverse)')
          : (strong ? 'var(--rule-strong)' : 'var(--rule)'),
        ...style,
      }}
      {...rest}
    />
  );
}

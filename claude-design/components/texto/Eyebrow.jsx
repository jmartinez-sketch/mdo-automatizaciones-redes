import React from 'react';

// Volanta: Chivo 700, versalitas con mucho tracking. Es el rotulo que abre
// casi todos los bloques de MDO (secciones, placas, fichas de panel).
export function Eyebrow({ children, onInverse = false, as = 'span', style = {}, ...rest }) {
  const Tag = as;
  return (
    <Tag
      style={{
        fontFamily: 'var(--font-accent)',
        fontWeight: 700,
        fontSize: 'var(--fs-eyebrow)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

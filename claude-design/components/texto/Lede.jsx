import React from 'react';

// Bajada / cuerpo en Open Sans. size 'lede' para la bajada de un titular,
// 'body' para texto corrido, 'note' para la letra chica.
const SIZES = {
  lede: { fontSize: 'var(--fs-lede)', maxWidth: '60ch' },
  body: { fontSize: 'var(--fs-body)', maxWidth: '66ch' },
  note: { fontSize: 'var(--fs-note)', maxWidth: '66ch' },
};

export function Lede({ children, size = 'lede', onInverse = false, as = 'p', style = {}, ...rest }) {
  const Tag = as;
  const muted = size === 'note';
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: 'var(--font-body)',
        lineHeight: 'var(--lh-body)',
        textWrap: 'pretty',
        color: onInverse
          ? (muted ? 'var(--text-muted-on-inverse)' : 'var(--text-body-on-inverse)')
          : (muted ? 'var(--text-muted)' : 'var(--text-body)'),
        ...SIZES[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

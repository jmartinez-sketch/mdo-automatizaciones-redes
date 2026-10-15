import React from 'react';

// Pie de marca: handle a la izquierda, sitio a la derecha, en su propia linea.
// Los dos con white-space:nowrap para que el pie no se parta en dos lineas.
export function HandleFooter({
  handle = '@mdoconsultores',
  right = 'mdo-consultores.com.ar',
  onInverse = false,
  style = {},
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      marginTop: 10, fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 10,
      letterSpacing: '0.08em',
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)',
      ...style,
    }}>
      <span style={{ whiteSpace: 'nowrap' }}>{handle}</span>
      <span style={{ whiteSpace: 'nowrap' }}>{right}</span>
    </div>
  );
}

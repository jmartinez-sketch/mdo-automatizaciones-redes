import React from 'react';

// Fila de atribucion de noticia: FUENTE — medio (se trunca) ····· fecha (nunca
// se comprime). Va arriba del HandleFooter en las placas de noticia.
export function SourceFooter({ fuente, fecha, label = 'Fuente', onInverse = false, style = {} }) {
  const muted = onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)';
  const strong = onInverse ? 'var(--paper)' : 'var(--navy)';
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 12, paddingTop: 14,
      borderTop: '1px solid ' + (onInverse ? 'var(--rule-on-inverse)' : 'var(--rule)'),
      ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 9.5,
        letterSpacing: '0.18em', color: muted, textTransform: 'uppercase', flexShrink: 0,
      }}>{label}</span>
      <span style={{
        flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, color: strong,
      }}>{fuente}</span>
      <span style={{
        fontFamily: 'var(--font-accent)', fontSize: 10.5, letterSpacing: '0.06em',
        color: muted, flexShrink: 0,
      }}>{fecha}</span>
    </div>
  );
}

import React from 'react';

// Hueco de imagen. Nunca dibujar una ilustracion: se deja el slot rotulado
// para que el material real lo ponga el estudio.
export function Slot({ caption = 'Imagen', height = 200, style = {}, ...rest }) {
  return (
    <div style={{
      position: 'relative', height, overflow: 'hidden',
      border: '1px solid var(--rule)', color: 'var(--text-muted)',
      background: 'repeating-linear-gradient(135deg,rgba(6,22,45,0.05) 0 8px,rgba(6,22,45,0.10) 8px 16px), var(--grey-pale)',
      ...style,
    }} {...rest}>
      <span style={{
        position: 'absolute', left: 12, bottom: 10, fontFamily: 'var(--font-accent)',
        fontWeight: 700, fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>{caption}</span>
    </div>
  );
}

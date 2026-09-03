import React from 'react';
import { Lockup } from './Lockup.jsx';

// Marca de agua: el isotipo en grande y muy bajo de opacidad, en una esquina.
// Se usa en las placas de noticia (po-13d, li-01) para llenar el aire.
export function IsoWatermark({
  size = 210,
  opacity = 0.05,
  tone = 'navy',
  base = 'assets/logos',
  style = {},
}) {
  return (
    <span aria-hidden="true" style={{ position: 'absolute', opacity, pointerEvents: 'none', ...style }}>
      <Lockup variant="isotipo" tone={tone} height={size} base={base} alt="" />
    </span>
  );
}

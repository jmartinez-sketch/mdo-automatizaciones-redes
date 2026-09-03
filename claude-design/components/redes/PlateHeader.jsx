import React from 'react';
import { Lockup } from '../marca/Lockup.jsx';
import { Chip } from './Chip.jsx';

// Encabezado estandar de placa: lockup a la izquierda, chip de categoria a la
// derecha. Unifica el header de las 58 plantillas.
// El lockup no baja de 40px: es una sola imagen y por debajo de eso la linea
// «CONSULTORES» deja de leerse. Para un header mas chico va el isotipo.
export function PlateHeader({ chip, onInverse = false, height = 40, base = 'assets/logos', style = {} }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, ...style }}>
      <Lockup variant="principal" height={height} base={base} tone={onInverse ? 'paper' : 'navy'} />
      {chip ? <Chip onInverse={onInverse}>{chip}</Chip> : null}
    </div>
  );
}

import React from 'react';

// Los SVG originales del Manual de Marca 2026 viven en assets/logos/.
// De cada logo hay tres tintes planos (navy, paper, slate) y la version con
// fondo solido del manual, pensada como placa cuadrada para redes.
const PREFIX = { isotipo: 'isotipo', principal: 'logo-principal', secundario: 'logo-secundario' };
const PLATES = {
  isotipo: { navy: 'isotipo-fondo-navy', claro: 'isotipo-fondo-claro' },
  principal: { navy: 'logo-principal-fondo-navy', claro: 'logo-principal-fondo-claro' },
  secundario: { navy: 'logo-secundario-fondo-gris', claro: 'logo-secundario-fondo-gris' },
};

export function Lockup({
  variant = 'principal',
  tone = 'navy',
  plate = null,
  height = 44,
  base = 'assets/logos',
  alt = 'MDO Consultores',
  style = {},
  ...rest
}) {
  const dir = base.replace(/\/$/, '');
  const file = plate
    ? (PLATES[variant] || PLATES.principal)[plate === true ? 'navy' : plate]
    : (PREFIX[variant] || PREFIX.principal) + '-' + tone;
  return (
    <img
      src={dir + '/' + file + '.svg'}
      alt={alt}
      style={{ height, width: 'auto', display: 'block', ...style }}
      {...rest}
    />
  );
}

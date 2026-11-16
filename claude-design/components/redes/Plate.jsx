import React from 'react';

// Artboard de placa de redes. Cada plantilla se disena a un tamano base y se
// escala al tamano de salida real (Instagram / LinkedIn) con transform:scale,
// igual que hace render.html en el repo de automatizaciones.
export const PLATE_FORMATS = {
  square:      { w: 540, h: 540, out: '1080x1080', pad: 44 },
  portrait:    { w: 540, h: 675, out: '1080x1350', pad: 56 },
  story:       { w: 480, h: 853, out: '1080x1920', pad: '120px 40px 155px' },
  linkedin:    { w: 600, h: 314, out: '1200x628', pad: 38 },
  carouselSq:  { w: 420, h: 420, out: '1080x1080', pad: 36 },
  carouselPo:  { w: 420, h: 525, out: '1080x1350', pad: 36 },
};

const TONES = {
  paper: { background: 'var(--paper)', color: 'var(--ink)' },
  white: { background: '#ffffff', color: 'var(--ink)' },
  tint:  { background: 'var(--grey-pale)', color: 'var(--ink)' },
  pale:  { background: 'var(--grey)', color: 'var(--ink)' },
  navy:  { background: 'var(--navy)', color: 'var(--paper)' },
};

export function Plate({
  format = 'square',
  tone = 'paper',
  scale = 1,
  pad,
  children,
  style = {},
  ...rest
}) {
  const fmt = PLATE_FORMATS[format] || PLATE_FORMATS.square;
  const padding = pad != null ? pad : fmt.pad;
  return (
    <div
      style={{
        width: fmt.w * scale,
        height: fmt.h * scale,
        overflow: 'hidden',
        flex: 'none',
      }}
      {...rest}
    >
      <div
        style={{
          width: fmt.w,
          height: fmt.h,
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          padding,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-body)',
          WebkitFontSmoothing: 'antialiased',
          ...TONES[tone],
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}

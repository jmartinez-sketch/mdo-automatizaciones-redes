/* @ds-bundle: {"format":4,"namespace":"MDOConsultoresDesignSystem_cc21de","components":[{"name":"ICON_NAMES","sourcePath":"components/iconos/Icon.jsx"},{"name":"Icon","sourcePath":"components/iconos/Icon.jsx"},{"name":"IsoWatermark","sourcePath":"components/marca/IsoWatermark.jsx"},{"name":"Lockup","sourcePath":"components/marca/Lockup.jsx"},{"name":"BigNumber","sourcePath":"components/redes/BigNumber.jsx"},{"name":"Chip","sourcePath":"components/redes/Chip.jsx"},{"name":"HandleFooter","sourcePath":"components/redes/HandleFooter.jsx"},{"name":"PageIndex","sourcePath":"components/redes/PageIndex.jsx"},{"name":"PLATE_FORMATS","sourcePath":"components/redes/Plate.jsx"},{"name":"Plate","sourcePath":"components/redes/Plate.jsx"},{"name":"PlateHeader","sourcePath":"components/redes/PlateHeader.jsx"},{"name":"Slot","sourcePath":"components/redes/Slot.jsx"},{"name":"SourceFooter","sourcePath":"components/redes/SourceFooter.jsx"},{"name":"Display","sourcePath":"components/texto/Display.jsx"},{"name":"Eyebrow","sourcePath":"components/texto/Eyebrow.jsx"},{"name":"Lede","sourcePath":"components/texto/Lede.jsx"},{"name":"Rule","sourcePath":"components/texto/Rule.jsx"}],"sourceHashes":{"components/iconos/Icon.jsx":"dfdc892c9cbf","components/marca/IsoWatermark.jsx":"ebca2bc15fc0","components/marca/Lockup.jsx":"62eadaaca0a9","components/redes/BigNumber.jsx":"c2aafdbf0b7f","components/redes/Chip.jsx":"c9bf05a02bb6","components/redes/HandleFooter.jsx":"91e87e336cef","components/redes/PageIndex.jsx":"0f27db36261c","components/redes/Plate.jsx":"23628bc0227f","components/redes/PlateHeader.jsx":"136cbb7ea8ed","components/redes/Slot.jsx":"b03a9e589692","components/redes/SourceFooter.jsx":"fbc6e3c17bc7","components/texto/Display.jsx":"6e74d4671219","components/texto/Eyebrow.jsx":"ebea4eac187e","components/texto/Lede.jsx":"c15852f02b8f","components/texto/Rule.jsx":"4bc2c5f51b6d","ui_kits/redes/app-v2.babel.js":"ac33704082a6","ui_kits/redes/hoja.babel.js":"0427957a145c","ui_kits/redes/plates-carousel.babel.js":"3329e5d03ea2","ui_kits/redes/plates-explicador.babel.js":"470c04e708a5","ui_kits/redes/plates-feed.babel.js":"f803603d0c69","ui_kits/redes/plates-friday.babel.js":"881ad637f1ce","ui_kits/redes/plates-iconos.babel.js":"2de9a56adbfe","ui_kits/redes/plates-manual-v2.babel.js":"f4f163c42691","ui_kits/redes/plates-marketing.babel.js":"e2849d38d944","ui_kits/redes/plates-originales.babel.js":"8c811d1c3914","ui_kits/redes/plates-story-linkedin.babel.js":"b90c08dd7bdf","ui_kits/redes/plates-variants-light.babel.js":"614193ae4ddc","ui_kits/redes/plates-variants.babel.js":"20911e6a2b41"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MDOConsultoresDesignSystem_cc21de = window.MDOConsultoresDesignSystem_cc21de || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/iconos/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Set de iconos de MDO: line-style, trazo 1.7, viewBox 24, sin relleno.
// Son los nueve que usan las placas icon-forward del estudio.
// No hay libreria externa ni icon-font: este es el set completo.
const PATHS = {
  reloj: [/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M12 7v5l3 2"
  })],
  grafico: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M4 4v16h16"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M7 14l3-3 3 2 4-6"
  })],
  escudo: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M9 12l2 2 4-4"
  })],
  documento: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M14 3H7a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V7z"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M14 3v4h4"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M9 13h6M9 16.5h4"
  })],
  calculadora: [/*#__PURE__*/React.createElement("rect", {
    key: "a",
    x: "6",
    y: "3",
    width: "12",
    height: "18",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M9 7h6"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M9.5 12h.01M12 12h.01M14.5 12h.01M9.5 15h.01M12 15h.01M14.5 15h.01M9.5 18h.01M12 18h.01"
  })],
  balanza: [/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12 4v16"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M7 20h10"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M4 7h16"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M4 7l-2 4.5h4z"
  }), /*#__PURE__*/React.createElement("path", {
    key: "e",
    d: "M20 7l-2 4.5h4z"
  })],
  equipo: [/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "9",
    cy: "8",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M3.5 20a5.5 5.5 0 0111 0"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M16 6a2.6 2.6 0 010 5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M17 15.2c2.2.4 3.8 2.3 3.8 4.8"
  })],
  buscar: [/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "11",
    cy: "11",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M15.5 15.5L20 20"
  })],
  tilde: [/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M8 12l3 3 5-6"
  })]
};
const ICON_NAMES = Object.keys(PATHS);
function Icon({
  name = 'tilde',
  size = 32,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: 'block',
      ...style
    }
  }, rest), PATHS[name] || PATHS.tilde);
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iconos/Icon.jsx", error: String((e && e.message) || e) }); }

// components/marca/Lockup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Los SVG originales del Manual de Marca 2026 viven en assets/logos/.
// De cada logo hay tres tintes planos (navy, paper, slate) y la version con
// fondo solido del manual, pensada como placa cuadrada para redes.
const PREFIX = {
  isotipo: 'isotipo',
  principal: 'logo-principal',
  secundario: 'logo-secundario'
};
const PLATES = {
  isotipo: {
    navy: 'isotipo-fondo-navy',
    claro: 'isotipo-fondo-claro'
  },
  principal: {
    navy: 'logo-principal-fondo-navy',
    claro: 'logo-principal-fondo-claro'
  },
  secundario: {
    navy: 'logo-secundario-fondo-gris',
    claro: 'logo-secundario-fondo-gris'
  }
};
function Lockup({
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
  const file = plate ? (PLATES[variant] || PLATES.principal)[plate === true ? 'navy' : plate] : (PREFIX[variant] || PREFIX.principal) + '-' + tone;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: dir + '/' + file + '.svg',
    alt: alt,
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Lockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marca/Lockup.jsx", error: String((e && e.message) || e) }); }

// components/marca/IsoWatermark.jsx
try { (() => {
// Marca de agua: el isotipo en grande y muy bajo de opacidad, en una esquina.
// Se usa en las placas de noticia (po-13d, li-01) para llenar el aire.
function IsoWatermark({
  size = 210,
  opacity = 0.05,
  tone = 'navy',
  base = 'assets/logos',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      opacity,
      pointerEvents: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Lockup, {
    variant: "isotipo",
    tone: tone,
    height: size,
    base: base,
    alt: ""
  }));
}
Object.assign(__ds_scope, { IsoWatermark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marca/IsoWatermark.jsx", error: String((e && e.message) || e) }); }

// components/redes/BigNumber.jsx
try { (() => {
// Numero protagonista: Chivo 300, tracking muy negativo, cifras tabulares.
// Es el recurso de las placas de dato (sq-03, li-03) y de dia de vencimiento.
function BigNumber({
  children,
  size = 180,
  unit,
  onInverse = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: size,
      letterSpacing: '-0.04em',
      lineHeight: 0.85,
      fontVariantNumeric: 'tabular-nums',
      color: onInverse ? 'var(--paper)' : 'var(--navy)',
      ...style
    }
  }, children), unit ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: Math.round(size * 0.22 + 22),
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--slate)'
    }
  }, unit) : null);
}
Object.assign(__ds_scope, { BigNumber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/BigNumber.jsx", error: String((e && e.message) || e) }); }

// components/redes/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Capsula de categoria. Chivo 700 en versalitas, borde de 1px, radio pill.
function Chip({
  children,
  solid = false,
  onInverse = false,
  style = {},
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 'var(--r-pill)',
    fontFamily: 'var(--font-accent)',
    fontWeight: 700,
    fontSize: 9.5,
    letterSpacing: 'var(--ls-chip)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    border: '1px solid'
  };
  let tone;
  if (onInverse) {
    tone = solid ? {
      background: 'var(--paper)',
      color: 'var(--navy)',
      borderColor: 'var(--paper)'
    } : {
      background: 'transparent',
      color: 'var(--paper)',
      borderColor: 'var(--rule-on-inverse-strong)'
    };
  } else {
    tone = solid ? {
      background: 'var(--navy)',
      color: 'var(--paper)',
      borderColor: 'var(--navy)'
    } : {
      background: 'rgba(255,255,255,0.5)',
      color: 'var(--navy)',
      borderColor: 'var(--hair-2)'
    };
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...tone,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/Chip.jsx", error: String((e && e.message) || e) }); }

// components/redes/HandleFooter.jsx
try { (() => {
// Pie de marca: handle a la izquierda, sitio a la derecha, en su propia linea.
// Los dos con white-space:nowrap para que el pie no se parta en dos lineas.
function HandleFooter({
  handle = '@mdoconsultores',
  right = 'mdo-consultores.com.ar',
  onInverse = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 10,
      fontFamily: 'var(--font-accent)',
      fontWeight: 400,
      fontSize: 10,
      letterSpacing: '0.08em',
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, handle), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, right));
}
Object.assign(__ds_scope, { HandleFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/HandleFooter.jsx", error: String((e && e.message) || e) }); }

// components/redes/PageIndex.jsx
try { (() => {
// Indice de carrusel: 01 — 03. Va en el pie de las placas ca-* y cb-*.
function PageIndex({
  current = 1,
  total = 3,
  onInverse = false,
  style = {}
}) {
  const pad = n => String(n).padStart(2, '0');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: onInverse ? 'var(--paper)' : 'var(--navy)'
    }
  }, pad(current)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 1,
      background: 'currentColor',
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("span", null, pad(total)));
}
Object.assign(__ds_scope, { PageIndex });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/PageIndex.jsx", error: String((e && e.message) || e) }); }

// components/redes/Plate.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Artboard de placa de redes. Cada plantilla se disena a un tamano base y se
// escala al tamano de salida real (Instagram / LinkedIn) con transform:scale,
// igual que hace render.html en el repo de automatizaciones.
const PLATE_FORMATS = {
  square: {
    w: 540,
    h: 540,
    out: '1080x1080',
    pad: 44
  },
  portrait: {
    w: 540,
    h: 675,
    out: '1080x1350',
    pad: 56
  },
  story: {
    w: 480,
    h: 853,
    out: '1080x1920',
    pad: '120px 40px 155px'
  },
  linkedin: {
    w: 600,
    h: 314,
    out: '1200x628',
    pad: 38
  },
  carouselSq: {
    w: 420,
    h: 420,
    out: '1080x1080',
    pad: 36
  },
  carouselPo: {
    w: 420,
    h: 525,
    out: '1080x1350',
    pad: 36
  }
};
const TONES = {
  paper: {
    background: 'var(--paper)',
    color: 'var(--ink)'
  },
  white: {
    background: '#ffffff',
    color: 'var(--ink)'
  },
  tint: {
    background: 'var(--grey-pale)',
    color: 'var(--ink)'
  },
  pale: {
    background: 'var(--grey)',
    color: 'var(--ink)'
  },
  navy: {
    background: 'var(--navy)',
    color: 'var(--paper)'
  }
};
function Plate({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: fmt.w * scale,
      height: fmt.h * scale,
      overflow: 'hidden',
      flex: 'none'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
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
      ...style
    }
  }, children));
}
Object.assign(__ds_scope, { PLATE_FORMATS, Plate });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/Plate.jsx", error: String((e && e.message) || e) }); }

// components/redes/PlateHeader.jsx
try { (() => {
// Encabezado estandar de placa: lockup a la izquierda, chip de categoria a la
// derecha. Unifica el header de las 58 plantillas.
// El lockup no baja de 40px: es una sola imagen y por debajo de eso la linea
// «CONSULTORES» deja de leerse. Para un header mas chico va el isotipo.
function PlateHeader({
  chip,
  onInverse = false,
  height = 40,
  base = 'assets/logos',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Lockup, {
    variant: "principal",
    height: height,
    base: base,
    tone: onInverse ? 'paper' : 'navy'
  }), chip ? /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    onInverse: onInverse
  }, chip) : null);
}
Object.assign(__ds_scope, { PlateHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/PlateHeader.jsx", error: String((e && e.message) || e) }); }

// components/redes/Slot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Hueco de imagen. Nunca dibujar una ilustracion: se deja el slot rotulado
// para que el material real lo ponga el estudio.
function Slot({
  caption = 'Imagen',
  height = 200,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      height,
      overflow: 'hidden',
      border: '1px solid var(--rule)',
      color: 'var(--text-muted)',
      background: 'repeating-linear-gradient(135deg,rgba(6,22,45,0.05) 0 8px,rgba(6,22,45,0.10) 8px 16px), var(--grey-pale)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      bottom: 10,
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, caption));
}
Object.assign(__ds_scope, { Slot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/Slot.jsx", error: String((e && e.message) || e) }); }

// components/redes/SourceFooter.jsx
try { (() => {
// Fila de atribucion de noticia: FUENTE — medio (se trunca) ····· fecha (nunca
// se comprime). Va arriba del HandleFooter en las placas de noticia.
function SourceFooter({
  fuente,
  fecha,
  label = 'Fuente',
  onInverse = false,
  style = {}
}) {
  const muted = onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)';
  const strong = onInverse ? 'var(--paper)' : 'var(--navy)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      paddingTop: 14,
      borderTop: '1px solid ' + (onInverse ? 'var(--rule-on-inverse)' : 'var(--rule)'),
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 9.5,
      letterSpacing: '0.18em',
      color: muted,
      textTransform: 'uppercase',
      flexShrink: 0
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      color: strong
    }
  }, fuente), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10.5,
      letterSpacing: '0.06em',
      color: muted,
      flexShrink: 0
    }
  }, fecha));
}
Object.assign(__ds_scope, { SourceFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/redes/SourceFooter.jsx", error: String((e && e.message) || e) }); }

// components/texto/Display.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Titular en Chivo. level 1 = 900 (titular de pagina o placa), 2 = 700,
// 3 = 700 chico. Sobre navy pasa a papel.
const LEVELS = {
  1: {
    fontSize: 'var(--fs-h1)',
    fontWeight: 900,
    letterSpacing: 'var(--ls-h1)'
  },
  2: {
    fontSize: 'var(--fs-h2)',
    fontWeight: 700,
    letterSpacing: 'var(--ls-h2)'
  },
  3: {
    fontSize: 'var(--fs-h3)',
    fontWeight: 700,
    letterSpacing: '-0.005em'
  }
};
function Display({
  children,
  level = 1,
  onInverse = false,
  as,
  style = {},
  ...rest
}) {
  const Tag = as || 'h' + level;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      lineHeight: 'var(--lh-display)',
      textWrap: 'balance',
      color: onInverse ? 'var(--text-on-inverse)' : 'var(--text-title)',
      ...LEVELS[level],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Display });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/texto/Display.jsx", error: String((e && e.message) || e) }); }

// components/texto/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Volanta: Chivo 700, versalitas con mucho tracking. Es el rotulo que abre
// casi todos los bloques de MDO (secciones, placas, fichas de panel).
function Eyebrow({
  children,
  onInverse = false,
  as = 'span',
  style = {},
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--text-muted)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/texto/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/texto/Lede.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Bajada / cuerpo en Open Sans. size 'lede' para la bajada de un titular,
// 'body' para texto corrido, 'note' para la letra chica.
const SIZES = {
  lede: {
    fontSize: 'var(--fs-lede)',
    maxWidth: '60ch'
  },
  body: {
    fontSize: 'var(--fs-body)',
    maxWidth: '66ch'
  },
  note: {
    fontSize: 'var(--fs-note)',
    maxWidth: '66ch'
  }
};
function Lede({
  children,
  size = 'lede',
  onInverse = false,
  as = 'p',
  style = {},
  ...rest
}) {
  const Tag = as;
  const muted = size === 'note';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      lineHeight: 'var(--lh-body)',
      textWrap: 'pretty',
      color: onInverse ? muted ? 'var(--text-muted-on-inverse)' : 'var(--text-body-on-inverse)' : muted ? 'var(--text-muted)' : 'var(--text-body)',
      ...SIZES[size],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Lede });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/texto/Lede.jsx", error: String((e && e.message) || e) }); }

// components/texto/Rule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Filete. La marca separa con lineas de 1px, no con sombras ni cajas.
function Rule({
  width = '100%',
  strong = false,
  onInverse = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    style: {
      height: 1,
      width,
      background: onInverse ? strong ? 'var(--rule-on-inverse-strong)' : 'var(--rule-on-inverse)' : strong ? 'var(--rule-strong)' : 'var(--rule)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Rule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/texto/Rule.jsx", error: String((e && e.message) || e) }); }

// ui_kits/redes/app-v2.babel.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// app.jsx — Estudio de placas: el catalogo de plantillas de redes de MDO,
// con el mismo contrato que render.html del repo de automatizaciones
// (una plantilla por id, contenido de ejemplo o placeholders, zona segura).
// Los componentes del design system se resuelven en render (no al evaluar el
// módulo): así este archivo es inofensivo si se evalúa antes que el bundle.
const DS = n => function DSComp(props) {
  const C = (window.MDOConsultoresDesignSystem_cc21de || {})[n];
  return C ? React.createElement(C, props) : null;
};
const Plate = DS('Plate'),
  PlateHeader = DS('PlateHeader'),
  Chip = DS('Chip'),
  HandleFooter = DS('HandleFooter'),
  SourceFooter = DS('SourceFooter'),
  BigNumber = DS('BigNumber'),
  Eyebrow = DS('Eyebrow'),
  Display = DS('Display'),
  Lede = DS('Lede'),
  Rule = DS('Rule'),
  IsoWatermark = DS('IsoWatermark'),
  Icon = DS('Icon'),
  Lockup = DS('Lockup');

// Controles del estudio. No son parte del design system: son el chrome de esta
// herramienta, con los valores del sistema aplicados a mano.
function Btn({
  on,
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      font: 'inherit',
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      fontWeight: on ? 700 : 400,
      borderRadius: 'var(--r-lg)',
      padding: '8px 16px',
      cursor: 'pointer',
      color: on ? 'var(--paper)' : 'var(--ink-70)',
      background: on ? 'var(--navy)' : 'var(--surface-card)',
      border: on ? 'none' : '1px solid var(--rule)',
      whiteSpace: 'nowrap'
    }
  }, children);
}
function Nota({
  title,
  tone = 'warn',
  children
}) {
  const c = tone === 'bad' ? ['var(--state-bad)', 'var(--state-bad-bg)'] : ['var(--state-warn)', 'var(--state-warn-bg)'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '3px solid ' + c[0],
      background: c[1],
      padding: '1.05rem 1.25rem',
      borderRadius: '0 var(--r-sm) var(--r-sm) 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '0.95rem',
      lineHeight: 1.25
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem',
      lineHeight: 1.55,
      color: 'var(--text-body)'
    }
  }, children));
}
function Tag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      padding: '1px 7px',
      borderRadius: 'var(--r-md)',
      background: 'var(--chip-bg)',
      color: 'var(--navy)',
      whiteSpace: 'nowrap'
    }
  }, children);
}
const {
  useState,
  useMemo
} = React;
const PH = s => '[' + s + ']';
const CATALOGO = [{
  id: 'mn-01',
  label: 'Apertura de marca',
  grupo: 'Manual 4:5',
  comp: 'MnApertura',
  out: '1080×1350',
  base: '540×675',
  slots: ['— sin texto —'],
  nota: 'Oficial del Manual de Marca 2026. Original en assets/referencia-feed/logo-apertura.jpg',
  ejemplo: {},
  ph: {},
  modo: 'feed'
}, {
  id: 'mn-02',
  label: 'Noticia normativa',
  grupo: 'Manual 4:5',
  comp: 'MnNoticia',
  out: '1080×1350',
  base: '540×675',
  slots: ['FECHA', 'TITULAR_1', 'TITULAR_2', 'CUERPO', 'CIERRE'],
  nota: 'Oficial del manual, y la más usada. El titular va en DOS TONOS: la primera parte en blanco y negrita, la segunda en gris y peso normal — es una sola frase partida. Original: referencia-feed/noticias.jpg',
  ejemplo: {
    fecha: '28.07.2026',
    titular_1: 'ARCA pide informar',
    titular_2: 'socios, directores y beneficiarios',
    cuerpo: 'Las sociedades deberán informar ante ARCA a los titulares de participaciones, directores y beneficiarios finales, conforme al régimen vigente y con vencimientos escalonados durante el mes.',
    cierre: 'Confirmá que tu sociedad se encuentre al día con esta obligación.'
  },
  ph: {
    fecha: PH('FECHA'),
    titular_1: PH('TITULAR_1'),
    titular_2: PH('TITULAR_2'),
    cuerpo: PH('CUERPO'),
    cierre: PH('CIERRE')
  },
  modo: 'feed'
}, {
  id: 'mn-03',
  label: 'Pregunta al lector',
  grupo: 'Manual 4:5',
  comp: 'MnExplica',
  out: '1080×1350',
  base: '540×675',
  slots: ['VOLANTA', 'TITULAR_1', 'TITULAR_2', 'TITULAR_3', 'BAJADA_1', 'BAJADA_2'],
  nota: 'Oficial del manual. Tres niveles de titular alineados a la DERECHA: negrita en mayúsculas, negrita, e itálica. Original: referencia-feed/mdo-explica.jpg',
  ejemplo: {
    volanta: 'Gestión PyME',
    titular_1: 'Tu empresa está',
    titular_2: 'tomando decisiones',
    titular_3: 'con información actualizada?',
    bajada_1: 'La información contable no solo registra lo que pasó.',
    bajada_2: 'También ayuda a decidir lo que sigue.'
  },
  ph: {
    volanta: PH('VOLANTA'),
    titular_1: PH('TITULAR_1'),
    titular_2: PH('TITULAR_2'),
    titular_3: PH('TITULAR_3'),
    bajada_1: PH('BAJADA_1'),
    bajada_2: PH('BAJADA_2')
  },
  modo: 'feed'
}, {
  id: 'mn-04',
  label: 'Servicios',
  grupo: 'Manual 4:5',
  comp: 'MnServicio',
  out: '1080×1350',
  base: '540×675',
  slots: ['VOLANTA', 'TITULO', 'CUERPO'],
  nota: 'Oficial del manual. Única placa sobre el degradé claro. Original: referencia-feed/servicios-mdo.jpg',
  ejemplo: {
    volanta: 'Servicios',
    titulo: 'Liquidación de sueldos',
    cuerpo: 'Nos encargamos de tus sueldos y cargas sociales para que vos te enfoques en tu negocio.'
  },
  ph: {
    volanta: PH('VOLANTA'),
    titulo: PH('TITULO'),
    cuerpo: PH('CUERPO')
  },
  modo: 'feed'
}, {
  id: 'mn-05',
  label: 'Frase de marca',
  grupo: 'Manual 4:5',
  comp: 'MnFrase',
  out: '1080×1350',
  base: '540×675',
  slots: ['CLAIM_1', 'CLAIM_2'],
  nota: 'Oficial del manual. Es la única placa donde el claim va en gris cálido y no en navy. Original: referencia-feed/frases-mdo.jpg',
  ejemplo: {
    claim_1: 'Better decisions.',
    claim_2: 'Stronger businesses.'
  },
  ph: {
    claim_1: PH('CLAIM_1'),
    claim_2: PH('CLAIM_2')
  },
  modo: 'feed'
}, {
  id: 'mn-06',
  label: 'Frase sobre foto',
  grupo: 'Manual 4:5',
  comp: 'MnFraseFoto',
  out: '1080×1350',
  base: '540×675',
  slots: ['CLAIM_1', 'CLAIM_2', 'FOTO'],
  nota: 'Oficial del manual. Foto a sangre, sin logo. Original: referencia-feed/frases.jpg',
  ejemplo: {
    claim_1: 'Decisiones claras.',
    claim_2: 'Negocios más sólidos.',
    foto: 'Edificios desde abajo'
  },
  ph: {
    claim_1: PH('CLAIM_1'),
    claim_2: PH('CLAIM_2'),
    foto: PH('FOTO')
  },
  modo: 'feed'
}, {
  id: 'mn-07',
  label: 'Claim sobre foto',
  grupo: 'Manual 4:5',
  comp: 'MnClaimFoto',
  out: '1080×1350',
  base: '540×675',
  slots: ['CLAIM_1', 'CLAIM_2', 'CLAIM_3', 'DESTACADO', 'FOTO'],
  nota: 'Oficial del manual. Claim de tres líneas a la derecha, con la del medio en itálica y una palabra final en mayúsculas. Original: referencia-feed/marca-mdo.jpg',
  ejemplo: {
    claim_1: 'Transformamos',
    claim_2: 'la complejidad tributaria y contable',
    claim_3: 'en decisiones',
    destacado: 'estratégicas.',
    foto: 'Edificios en contrapicado'
  },
  ph: {
    claim_1: PH('CLAIM_1'),
    claim_2: PH('CLAIM_2'),
    claim_3: PH('CLAIM_3'),
    destacado: PH('DESTACADO'),
    foto: PH('FOTO')
  },
  modo: 'feed'
}, {
  id: 'mn-08',
  label: 'Institucional',
  grupo: 'Manual 4:5',
  comp: 'MnInstitucional',
  out: '1080×1350',
  base: '540×675',
  slots: ['RUBRO', 'FOTO'],
  nota: 'Oficial del manual. Usa el lockup secundario (los tres apellidos). Original: referencia-feed/feed-11.jpg',
  ejemplo: {
    rubro: 'Estudio contable',
    foto: 'Manos en el teclado'
  },
  ph: {
    rubro: PH('RUBRO'),
    foto: PH('FOTO')
  },
  modo: 'feed'
}, {
  id: 'sq-01',
  label: 'Vencimiento impositivo',
  grupo: 'Square 1:1',
  comp: 'SqVencimiento',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'DIA', 'MES', 'ANIO', 'IMPUESTO', 'DESCRIPCION_VENC', 'HORARIO', 'CHIP_MES', 'HANDLE'],
  ejemplo: {
    copete: 'Calendario ARCA · Vencimiento',
    dia: '21',
    mes: 'JUN',
    anio: '2026',
    impuesto: 'IVA',
    descripcion: 'Posición mensual · Período 05/2026',
    horario: 'Hasta las 23:59 h',
    chip_mes: 'Calendario · 06/26',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    dia: PH('DIA'),
    mes: PH('MES'),
    anio: PH('ANIO'),
    impuesto: PH('IMPUESTO'),
    descripcion: PH('DESCRIPCION_VENC'),
    horario: PH('HORARIO'),
    chip_mes: PH('CHIP_MES'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-02',
  label: 'Cita / reflexión',
  grupo: 'Square 1:1',
  comp: 'SqCita',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
  ejemplo: {
    copete: 'Pensamiento',
    cita: 'La planificación impositiva no es un costo: es la primera decisión estratégica del año.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    cita: PH('CITA'),
    autor: PH('AUTOR'),
    rol_autor: PH('ROL_AUTOR'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-03',
  label: 'Número clave',
  grupo: 'Square 1:1',
  comp: 'SqNumero',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'PIE', 'HANDLE'],
  ejemplo: {
    copete: 'En cifras · MDO Consultores',
    numero: '+50',
    unidad: 'años',
    descripcion: 'acompañando empresas argentinas en la gestión impositiva, contable y previsional.',
    pie: 'Desde 1972 · Buenos Aires',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    numero: PH('NUMERO'),
    unidad: PH('UNIDAD'),
    descripcion: PH('DESCRIPCION'),
    pie: PH('PIE'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-13d',
  label: 'Noticia + cierre',
  grupo: 'Portrait 4:5',
  comp: 'PoNoticia',
  out: '1080×1350',
  base: '540×675',
  slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'CIERRE', 'FUENTE', 'FECHA', 'HANDLE'],
  ejemplo: {
    categoria: 'Laboral · ARCA',
    titular: 'ARCA abre la Moratoria Laboral para empleadores',
    bajada: 'Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse.',
    cierre: 'Si tenés personal sin registrar, ésta es la ventana.',
    fuente: 'Errepar · ARCA · Resolución',
    fecha: '11 jun 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    cierre: PH('CIERRE'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-13e',
  label: 'Noticia + cierre (navy)',
  grupo: 'Portrait 4:5',
  comp: 'PoNoticia',
  out: '1080×1350',
  base: '540×675',
  slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'CIERRE', 'FUENTE', 'FECHA', 'HANDLE'],
  nota: 'Misma composición que po-13d en navy. Existe para que dos noticias de la misma semana se distingan de un vistazo en la grilla.',
  ejemplo: {
    tone: 'navy',
    categoria: 'Impuestos · ARCA',
    titular: 'Nuevo régimen de facturación para responsables inscriptos',
    bajada: 'Cambia el plazo de emisión y el detalle obligatorio del comprobante.',
    cierre: 'Revisamos tu circuito de facturación antes de que aplique.',
    fuente: 'ARCA · Resolución General',
    fecha: '19 ago 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    tone: 'navy',
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    cierre: PH('CIERRE'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-24',
  label: 'Checklist',
  grupo: 'Portrait 4:5',
  comp: 'PoChecklist',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'ITEM_1', 'ITEM_2', 'ITEM_3', 'CTA', 'HANDLE'],
  ejemplo: {
    copete: 'Gestión PyME',
    titulo: 'Tres cosas que conviene tener al día',
    item_1: 'Los comprobantes del mes, cargados y conciliados',
    item_2: 'Los libros societarios con folios disponibles',
    item_3: 'Las altas y bajas de personal, informadas',
    cta: 'Lo ordenamos con vos',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    item_1: PH('ITEM_1'),
    item_2: PH('ITEM_2'),
    item_3: PH('ITEM_3'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-26',
  label: 'Tres iconos',
  grupo: 'Portrait 4:5',
  comp: 'PoTresIconos',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'LABEL_1', 'LABEL_2', 'LABEL_3', 'CTA', 'HANDLE'],
  ejemplo: {
    copete: 'Contabilidad',
    titulo: 'Llevar la contabilidad al día te da:',
    label_1: 'Números al día',
    label_2: 'Mejores decisiones',
    label_3: 'Tranquilidad con ARCA',
    cta: 'Llevamos tu contabilidad',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    label_1: PH('LABEL_1'),
    label_2: PH('LABEL_2'),
    label_3: PH('LABEL_3'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-21',
  label: 'Pregunta hero',
  grupo: 'Portrait 4:5',
  comp: 'PoPreguntaHero',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'PREGUNTA', 'RESPUESTA', 'CTA', 'HANDLE'],
  ejemplo: {
    copete: 'Gestión PyME',
    pregunta: '¿Sabés cuánto te cuesta cerrar el mes tarde?',
    respuesta: 'Cerrar a tiempo no es prolijidad: es la única forma de decidir con datos que todavía sirven.',
    cta: 'Conversemos',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    pregunta: PH('PREGUNTA'),
    respuesta: PH('RESPUESTA'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'st-07',
  label: 'Vencimientos de la semana',
  grupo: 'Story 9:16',
  comp: 'StVencimientos',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'SEMANA', 'FECHA_1..4', 'IMPUESTO_1..4', 'PERIODO_1..4', 'HORA_1..4', 'CTA', 'HANDLE'],
  ejemplo: {
    copete: 'Vencimientos de la semana',
    semana: 'Semana 34 · 2026',
    cta: 'Te lo presentamos nosotros',
    handle: '@mdoconsultores',
    filas: [{
      fecha: '18',
      impuesto: 'IVA',
      periodo: 'Posición mensual 07/2026',
      hora: '23:59'
    }, {
      fecha: '19',
      impuesto: 'SUSS · F.931',
      periodo: 'Cargas sociales 07/2026',
      hora: '23:59'
    }, {
      fecha: '21',
      impuesto: 'Ingresos Brutos',
      periodo: 'Convenio Multilateral',
      hora: '23:59'
    }, {
      fecha: '22',
      impuesto: 'Ganancias',
      periodo: 'Anticipo sociedades',
      hora: '23:59'
    }]
  },
  ph: {
    copete: PH('COPETE'),
    semana: PH('SEMANA'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    filas: [1, 2, 3, 4].map(n => ({
      fecha: PH('FECHA_' + n),
      impuesto: PH('IMPUESTO_' + n),
      periodo: PH('PERIODO_' + n),
      hora: PH('HORA_' + n)
    }))
  },
  modo: 'story'
}, {
  id: 'st-10',
  label: 'Encuesta A/B',
  grupo: 'Story 9:16',
  comp: 'StEncuesta',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'PREGUNTA', 'OPCION_A', 'OPCION_B', 'PIE', 'HANDLE'],
  ejemplo: {
    copete: 'Encuesta',
    pregunta: '¿Cómo llevás hoy la facturación?',
    opcion_a: 'En una planilla propia',
    opcion_b: 'Directo en el portal de ARCA',
    pie: 'Respondé en la encuesta y te contamos qué conviene.',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    pregunta: PH('PREGUNTA'),
    opcion_a: PH('OPCION_A'),
    opcion_b: PH('OPCION_B'),
    pie: PH('PIE'),
    handle: PH('HANDLE')
  },
  modo: 'story'
}, {
  id: 'li-01',
  label: 'Noticia normativa',
  grupo: 'LinkedIn 1.91:1',
  comp: 'LiNoticia',
  out: '1200×628',
  base: '600×314',
  slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
  ejemplo: {
    categoria: 'Laboral · ARCA',
    titular: 'ARCA abre la Moratoria Laboral para empleadores',
    bajada: 'Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse.',
    fuente: 'Errepar · ARCA · Resolución',
    fecha: '11 jun 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'li-02',
  label: 'Claim institucional',
  grupo: 'LinkedIn 1.91:1',
  comp: 'LiClaim',
  out: '1200×628',
  base: '600×314',
  slots: ['COPETE', 'CLAIM', 'SERVICIO_1', 'SERVICIO_2', 'SERVICIO_3', 'CTA', 'HANDLE'],
  ejemplo: {
    copete: 'Martinez · De Orta · Gutierrez Taboada',
    claim: 'Más de 50 años ordenando los números de empresas argentinas.',
    servicio_1: 'Impuestos',
    servicio_2: 'Contabilidad',
    servicio_3: 'Sueldos',
    cta: 'Conversemos sobre tu empresa',
    handle: 'mdo-consultores.com.ar'
  },
  ph: {
    copete: PH('COPETE'),
    claim: PH('CLAIM'),
    servicio_1: PH('SERVICIO_1'),
    servicio_2: PH('SERVICIO_2'),
    servicio_3: PH('SERVICIO_3'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'li-03',
  label: 'Dato clave',
  grupo: 'LinkedIn 1.91:1',
  comp: 'LiDato',
  out: '1200×628',
  base: '600×314',
  slots: ['CATEGORIA', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'FUENTE', 'HANDLE'],
  ejemplo: {
    categoria: 'En cifras',
    numero: '128',
    unidad: 'libros',
    descripcion: 'societarios y contables bajo control del estudio, con folios y custodia relevados uno por uno.',
    fuente: 'Panel de libros MDO',
    handle: '@mdoconsultores'
  },
  ph: {
    categoria: PH('CATEGORIA'),
    numero: PH('NUMERO'),
    unidad: PH('UNIDAD'),
    descripcion: PH('DESCRIPCION'),
    fuente: PH('FUENTE'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-12',
  label: 'Noticia (newsletter)',
  grupo: 'Square 1:1',
  comp: 'SqNoticia',
  out: '1080×1080',
  base: '540×540',
  slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
  nota: 'La que alimenta la automatización del newsletter de Gmail. Margen mínimo 72 — el más alto del catálogo.',
  ejemplo: {
    categoria: 'Impuestos · ARCA',
    titular: 'ARCA extiende el plazo para presentar la DDJJ de Ganancias',
    bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.',
    fuente: 'ARCA · Comunicado oficial',
    fecha: '19 jun 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-04',
  label: 'Guía rápida / Servicio',
  grupo: 'Portrait 4:5',
  comp: 'PoServicio',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'BAJADA', 'BULLET_1..4', 'CTA', 'HANDLE'],
  nota: 'Margen mínimo 68. Los bullets van numerados y centrados en su bloque: antes quedaban arriba con un vacío abajo.',
  ejemplo: {
    copete: 'Servicio · MDO',
    titulo: 'Auditoría externa',
    bajada: 'Estados contables auditados con criterio profesional y normativa vigente.',
    bullet_1: 'Auditoría de estados contables anuales',
    bullet_2: 'Revisión limitada de información intermedia',
    bullet_3: 'Informes especiales sobre patrimonio y resultados',
    bullet_4: 'Atención de requerimientos ARCA / IGJ / CNV',
    cta: 'Consultanos',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    bajada: PH('BAJADA'),
    bullet_1: PH('BULLET_1'),
    bullet_2: PH('BULLET_2'),
    bullet_3: PH('BULLET_3'),
    bullet_4: PH('BULLET_4'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-05',
  label: 'Anuncio institucional',
  grupo: 'Portrait 4:5',
  comp: 'PoAnuncio',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'SUBTITULO', 'TEMA', 'BLOQUE_1..3', 'FECHA_HORA', 'HANDLE'],
  nota: 'Para webinars y anuncios con datos. La grilla de rótulo/valor es de dos columnas fijas (104px).',
  ejemplo: {
    copete: 'Anuncio',
    titulo: 'Reforma fiscal',
    subtitulo: 'Webinar gratuito',
    tema: 'Análisis ejecutivo de los cambios 2026',
    bloque_1: 'Impuestos',
    bloque_2: 'Sociedades',
    bloque_3: 'Sueldos',
    fecha_hora: 'Jueves 19 · 19:00 h',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    subtitulo: PH('SUBTITULO'),
    tema: PH('TEMA'),
    bloque_1: PH('BLOQUE_1'),
    bloque_2: PH('BLOQUE_2'),
    bloque_3: PH('BLOQUE_3'),
    fecha_hora: PH('FECHA_HORA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-06',
  label: 'Voz experta / Equipo',
  grupo: 'Portrait 4:5',
  comp: 'PoEquipo',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'NOMBRE', 'ROL', 'BIO', 'TAG_1..4', 'FOTO_CAPTION', 'HANDLE'],
  nota: 'La única con foto en el bloque superior (320px de alto). La bio se estira y los tags quedan pegados al pie.',
  ejemplo: {
    copete: 'Voz experta · MDO',
    nombre: 'Lucía Martínez',
    rol: 'Socia · Impuestos',
    bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual.',
    tag_1: 'Ganancias',
    tag_2: 'IVA',
    tag_3: 'Bienes personales',
    tag_4: 'Fiscalizaciones ARCA',
    foto_caption: 'Retrato · 4:5',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    nombre: PH('NOMBRE'),
    rol: PH('ROL'),
    bio: PH('BIO'),
    tag_1: PH('TAG_1'),
    tag_2: PH('TAG_2'),
    tag_3: PH('TAG_3'),
    tag_4: PH('TAG_4'),
    foto_caption: PH('FOTO_CAPTION'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-16',
  label: 'Spotlight de servicio',
  grupo: 'Portrait 4:5',
  comp: 'PoSpotlight',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'BAJADA', 'HANDLE'],
  nota: 'Margen mínimo 64. Es la placa de marca: navy, título grande y nada más.',
  ejemplo: {
    copete: 'Servicios',
    titulo: 'Asesoramiento Impositivo',
    bajada: 'Planificamos la carga fiscal de tu PyME para que pagues lo justo, sin sorpresas.',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    bajada: PH('BAJADA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'st-08',
  label: 'Cita vertical',
  grupo: 'Story 9:16',
  comp: 'StCita',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
  nota: 'La comilla de apertura cuelga fuera del margen a propósito: es alineación óptica.',
  ejemplo: {
    copete: 'Pensamiento',
    cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    cita: PH('CITA'),
    autor: PH('AUTOR'),
    rol_autor: PH('ROL_AUTOR'),
    handle: PH('HANDLE')
  },
  modo: 'story'
}, {
  id: 'st-09',
  label: 'CTA / Consultanos',
  grupo: 'Story 9:16',
  comp: 'StCTA',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'TITULAR_1..3', 'BAJADA', 'CANAL_1..3_LABEL', 'CANAL_1..3_VALOR', 'HANDLE'],
  nota: 'Titular de tres líneas: el cuerpo lo manda la línea más larga, y la del medio va en itálica un 28% más grande.',
  ejemplo: {
    copete: 'Estás pensando en armar tu empresa',
    titular_1: 'Hablemos',
    titular_2: 'antes',
    titular_3: 'de firmar.',
    bajada: 'Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo.',
    canal_1_label: 'Web',
    canal_1_valor: 'mdo-consultores.com.ar',
    canal_2_label: 'WhatsApp',
    canal_2_valor: '+54 9 11 3566 7985',
    canal_3_label: 'Email',
    canal_3_valor: 'info@mdo-consultores.com.ar',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titular_1: PH('TITULAR_1'),
    titular_2: PH('TITULAR_2'),
    titular_3: PH('TITULAR_3'),
    bajada: PH('BAJADA'),
    canal_1_label: PH('CANAL_1_LABEL'),
    canal_1_valor: PH('CANAL_1_VALOR'),
    canal_2_label: PH('CANAL_2_LABEL'),
    canal_2_valor: PH('CANAL_2_VALOR'),
    canal_3_label: PH('CANAL_3_LABEL'),
    canal_3_valor: PH('CANAL_3_VALOR'),
    handle: PH('HANDLE')
  },
  modo: 'story'
}, {
  id: 'po-37',
  label: 'Vencimientos (feed)',
  grupo: 'Portrait 4:5',
  comp: 'PoVencimientosFeed',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'SEMANA', 'DIA_1..4', 'MES_1..4', 'IMPUESTO_1..4', 'PERIODO_1..4', 'CTA', 'HANDLE'],
  nota: 'La versión feed de st-07: la story se va en 24 h, ésta queda como referencia. Cada fila lleva el día grande, el mes en versalitas y un filete vertical.',
  ejemplo: {
    copete: 'Calendario · 07/26',
    semana: 'Semana del 20 al 24 de julio',
    cta: 'Guardá el post para tenerlo a mano',
    handle: '@mdoconsultores',
    filas: [{
      dia: '20',
      mes: 'jul',
      impuesto: 'SiCoRe',
      periodo: 'Retenciones · 06/2026'
    }, {
      dia: '21',
      mes: 'jul',
      impuesto: 'IVA',
      periodo: 'Posición mensual · 06/2026'
    }, {
      dia: '22',
      mes: 'jul',
      impuesto: 'Ingresos Brutos',
      periodo: 'Convenio Multilateral · 06/2026'
    }, {
      dia: '24',
      mes: 'jul',
      impuesto: 'Cargas sociales',
      periodo: 'F.931 · 06/2026'
    }]
  },
  ph: {
    copete: PH('COPETE'),
    semana: PH('SEMANA'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    filas: [1, 2, 3, 4].map(n => ({
      dia: PH('DIA_' + n),
      mes: PH('MES_' + n),
      impuesto: PH('IMPUESTO_' + n),
      periodo: PH('PERIODO_' + n)
    }))
  },
  modo: 'feed'
}, {
  id: 'po-31',
  label: 'Explicador en 3 pasos',
  grupo: 'Portrait 4:5',
  comp: 'PoExplicador',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'PASO_1..3_TIT', 'PASO_1..3_TXT', 'CTA', 'HANDLE'],
  nota: 'A diferencia de po-28 (una línea por paso), ésta explica de verdad: cada paso lleva título y cuerpo. El número va en itálica.',
  ejemplo: {
    copete: 'Explicador',
    titulo: '¿Qué es una conciliación bancaria?',
    cta: 'Conciliamos tus cuentas todos los meses',
    handle: '@mdoconsultores',
    pasos: [{
      titulo: 'Se comparan dos registros',
      texto: 'Por un lado tus movimientos contables, por el otro el extracto del banco.'
    }, {
      titulo: 'Se detectan las diferencias',
      texto: 'Cheques no cobrados, depósitos en tránsito, gastos que el banco debitó y no registraste.'
    }, {
      titulo: 'Queda un saldo confiable',
      texto: 'Recién ahí sabés cuánta plata tenés de verdad disponible para operar.'
    }]
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    pasos: [1, 2, 3].map(n => ({
      titulo: PH('PASO_' + n + '_TIT'),
      texto: PH('PASO_' + n + '_TXT')
    }))
  },
  modo: 'feed'
}, {
  id: 'po-32',
  label: 'Comparativa A vs B',
  grupo: 'Portrait 4:5',
  comp: 'PoComparativa',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'A_LABEL', 'A_TITULO', 'A_1..3', 'B_LABEL', 'B_TITULO', 'B_1..3', 'VEREDICTO', 'HANDLE'],
  nota: 'Dos columnas de igual peso, la B en navy. El veredicto va abajo en itálica con asterisco: no dice cuál gana, dice de qué depende. Muy en tono MDO.',
  ejemplo: {
    copete: 'Comparativa',
    titulo: 'Monotributo o Responsable Inscripto',
    a_label: 'Opción A',
    a_titulo: 'Monotributo',
    a_items: ['Cuota fija mensual, simple de liquidar', 'No discrimina IVA en tus facturas', 'Tiene topes de facturación anual'],
    b_label: 'Opción B',
    b_titulo: 'Responsable Inscripto',
    b_items: ['Liquidás IVA y Ganancias por separado', 'Podés computar el IVA de tus compras', 'Sin tope: acompaña el crecimiento'],
    veredicto: 'No hay una mejor: hay una que le sirve a tu estructura de costos.',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    a_label: PH('A_LABEL'),
    a_titulo: PH('A_TITULO'),
    a_items: [PH('A_1'), PH('A_2'), PH('A_3')],
    b_label: PH('B_LABEL'),
    b_titulo: PH('B_TITULO'),
    b_items: [PH('B_1'), PH('B_2'), PH('B_3')],
    veredicto: PH('VEREDICTO'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-33',
  label: 'Elegí tu caso',
  grupo: 'Portrait 4:5',
  comp: 'PoElegiTuCaso',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'PREGUNTA', 'OPCION_1..3', 'CTA', 'HANDLE'],
  nota: 'Placa de engagement: tres opciones en pastillas y un CTA que pide comentar el número. La única que usa radio pill en las opciones.',
  ejemplo: {
    copete: 'Tu caso',
    pregunta: '¿Cuál de estas tres te está pasando hoy?',
    opciones: ['No sé si estoy pagando más impuestos de los que debería', 'Tengo la contabilidad atrasada y no puedo decidir', 'Crecí y mi estructura administrativa quedó chica'],
    cta: 'Comentá el número y te orientamos',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    pregunta: PH('PREGUNTA'),
    opciones: [PH('OPCION_1'), PH('OPCION_2'), PH('OPCION_3')],
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-34',
  label: 'Mito vs realidad',
  grupo: 'Portrait 4:5',
  comp: 'PoMitoRealidad',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'MITO', 'REALIDAD', 'CTA', 'HANDLE'],
  nota: 'Distinta de po-32: ahí se eligen dos opciones válidas, acá se corrige una creencia equivocada. El mito va apagado y tachado; la realidad en navy.',
  ejemplo: {
    copete: 'Mitos',
    titulo: 'Sobre facturar con Monotributo',
    mito: 'Si facturo poco, no hace falta que lleve ningún registro.',
    realidad: 'Todo monotributista debe respaldar sus operaciones: si te excedés del tope sin registro, la recategorización te encuentra sin papeles.',
    cta: 'Ordenamos tu situación',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    mito: PH('MITO'),
    realidad: PH('REALIDAD'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-35',
  label: 'Errores frecuentes',
  grupo: 'Portrait 4:5',
  comp: 'PoErrores',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'ERROR_1..3', 'FIX_1..3', 'CTA', 'HANDLE'],
  nota: 'Placa de autoridad: cada ficha lleva el error en negrita y la corrección debajo. No señala culpables, muestra la salida.',
  ejemplo: {
    copete: 'Gestión PyME',
    titulo: '3 errores que vemos todos los meses',
    cta: 'Te ayudamos a ordenarlo',
    handle: '@mdoconsultores',
    items: [{
      error: 'Mezclar la cuenta personal con la de la empresa',
      fix: 'Una cuenta para cada cosa: sin eso, ningún balance refleja la realidad.'
    }, {
      error: 'Guardar los comprobantes sin ordenar',
      fix: 'Un criterio simple por mes alcanza para no perder crédito fiscal.'
    }, {
      error: 'Mirar los números sólo cuando vence algo',
      fix: 'Un reporte mensual convierte la contabilidad en una herramienta de decisión.'
    }]
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    items: [1, 2, 3].map(n => ({
      error: PH('ERROR_' + n),
      fix: PH('FIX_' + n)
    }))
  },
  modo: 'feed'
}, {
  id: 'po-36',
  label: 'Testimonio de cliente',
  grupo: 'Portrait 4:5',
  comp: 'PoTestimonio',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TESTIMONIO', 'CLIENTE_TIPO', 'CLIENTE_DETALLE', 'SERVICIO', 'HANDLE'],
  nota: 'Prueba social SIN nombre propio: sector y tamaño, nunca la razón social. Es criterio del estudio para no exponer al cliente, no una limitación de la plantilla.',
  ejemplo: {
    copete: 'Clientes',
    testimonio: 'Dejamos de enterarnos de los problemas cuando ya eran urgencias.',
    cliente_tipo: 'PyME industrial',
    cliente_detalle: 'Buenos Aires · 40 empleados · cliente desde 2019',
    servicio: 'Contabilidad + Impuestos',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    testimonio: PH('TESTIMONIO'),
    cliente_tipo: PH('CLIENTE_TIPO'),
    cliente_detalle: PH('CLIENTE_DETALLE'),
    servicio: PH('SERVICIO'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-27',
  label: 'Ícono grande central',
  grupo: 'Portrait 4:5',
  comp: 'PoIconoHero',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'BAJADA', 'CTA', 'HANDLE'],
  nota: 'Todo centrado, con un aro de 128px de borde (no relleno) alrededor del ícono.',
  ejemplo: {
    copete: 'Gestión PyME',
    titulo: 'Ordená hoy para crecer mañana',
    bajada: 'Una PyME con la contabilidad clara toma mejores decisiones y crece más tranquila.',
    cta: 'Empecemos',
    handle: '@mdoconsultores',
    icono: 'grafico'
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    bajada: PH('BAJADA'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    icono: 'grafico'
  },
  modo: 'feed'
}, {
  id: 'po-28',
  label: 'Proceso en 3 pasos',
  grupo: 'Portrait 4:5',
  comp: 'PoProcesoIconos',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'PASO_1..3', 'CTA', 'HANDLE'],
  nota: 'Una línea por paso. La que explica de verdad es po-31. Cuadrado de 62px radio 14, con el número en un círculo que sobresale.',
  ejemplo: {
    copete: 'Cómo trabajamos',
    titulo: 'Tu contabilidad, en 3 pasos',
    cta: 'Consultanos',
    handle: '@mdoconsultores',
    pasos: ['Ordenamos y registramos tus operaciones', 'Conciliamos y armamos tus balances', 'Te damos reportes claros para decidir']
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    pasos: [PH('PASO_1'), PH('PASO_2'), PH('PASO_3')]
  },
  modo: 'feed'
}, {
  id: 'po-29',
  label: 'Ícono lateral + frase',
  grupo: 'Portrait 4:5',
  comp: 'PoIconoFrase',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'FRASE', 'CTA', 'HANDLE'],
  nota: 'El ícono va suelto a 80px, sin aro ni caja, corrido 14px a la izquierda del margen: alineación óptica contra el texto.',
  ejemplo: {
    copete: 'Gestión PyME',
    frase: 'Dormí tranquilo: tus números, en orden y al día.',
    cta: 'Llevamos tu contabilidad',
    handle: '@mdoconsultores',
    icono: 'escudo'
  },
  ph: {
    copete: PH('COPETE'),
    frase: PH('FRASE'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    icono: 'escudo'
  },
  modo: 'feed'
}, {
  id: 'po-30',
  label: 'Grid 2×2 de íconos',
  grupo: 'Portrait 4:5',
  comp: 'PoGridIconos',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'LABEL_1..4', 'HANDLE'],
  nota: 'Cuatro fichas con filete y radio 10. El espacio se reparte, así las cuatro quedan de igual alto aunque el texto no lo sea.',
  ejemplo: {
    copete: 'Servicios',
    titulo: 'Todo lo que tu PyME necesita, en un solo equipo',
    handle: '@mdoconsultores',
    labels: ['Contabilidad', 'Impuestos', 'Sueldos', 'Auditoría']
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    handle: PH('HANDLE'),
    labels: [PH('LABEL_1'), PH('LABEL_2'), PH('LABEL_3'), PH('LABEL_4')]
  },
  modo: 'feed'
}, {
  id: 'ca-cover',
  label: 'Calendario · tapa',
  grupo: 'Carrusel A · Calendario',
  comp: 'CalCover',
  out: '1080×1080',
  base: '420×420',
  slots: ['COPETE', 'MES', 'ANIO', 'BAJADA', 'SWIPE_CTA', 'CHROME_LABEL'],
  nota: 'Slide 1 de 3. El mes va en itálica grande; el año en versalitas debajo.',
  ejemplo: {
    copete: 'Calendario impositivo',
    mes: 'Junio',
    anio: '2026',
    bajada: 'Vencimientos de ARCA, IGJ y previsionales del mes en un solo lugar.',
    swipe: 'Deslizá →',
    chrome_label: 'Cover'
  },
  ph: {
    copete: PH('COPETE'),
    mes: PH('MES'),
    anio: PH('ANIO'),
    bajada: PH('BAJADA'),
    swipe: PH('SWIPE_CTA'),
    chrome_label: PH('CHROME_LABEL')
  },
  modo: 'feed'
}, {
  id: 'ca-q1',
  label: 'Calendario · 1ª quincena',
  grupo: 'Carrusel A · Calendario',
  comp: 'CalQ1',
  out: '1080×1080',
  base: '420×420',
  slots: ['COPETE', 'FECHA_1..5', 'IMPUESTO_1..5', 'PERIODO_1..5', 'CHROME_LABEL'],
  nota: 'Slide 2 de 3. Las filas se centran en el espacio disponible: con menos de 5 ítems no queda un vacío abajo.',
  ejemplo: {
    copete: 'Primera quincena',
    chrome_label: '07 al 14 · Junio 2026',
    items: [{
      fecha: "07",
      impuesto: "Aportes autónomos",
      periodo: "Cat. I-V · 05/26"
    }, {
      fecha: "11",
      impuesto: "Ingresos Brutos",
      periodo: "CABA · Anticipo 05/26"
    }, {
      fecha: "12",
      impuesto: "Convenio Multilateral",
      periodo: "CM05 · 05/26"
    }, {
      fecha: "13",
      impuesto: "IVA",
      periodo: "Posición 05/2026"
    }, {
      fecha: "14",
      impuesto: "Sueldos · F.931",
      periodo: "Devengado 05/2026"
    }]
  },
  ph: {
    copete: PH('COPETE'),
    chrome_label: PH('CHROME_LABEL'),
    items: [1, 2, 3, 4, 5].map(n => ({
      fecha: PH('FECHA_' + n),
      impuesto: PH('IMPUESTO_' + n),
      periodo: PH('PERIODO_' + n)
    }))
  },
  modo: 'feed'
}, {
  id: 'ca-q2',
  label: 'Calendario · 2ª quincena',
  grupo: 'Carrusel A · Calendario',
  comp: 'CalQ2',
  out: '1080×1080',
  base: '420×420',
  slots: ['COPETE', 'FECHA_1..5', 'IMPUESTO_1..5', 'PERIODO_1..5', 'CTA', 'CHROME_LABEL'],
  nota: 'Slide 3 de 3: igual que ca-q1 pero en versión compacta, para hacerle lugar al CTA final.',
  ejemplo: {
    copete: 'Segunda quincena',
    cta: '¿Tu equipo tiene esto cubierto?',
    chrome_label: '17 al 26 · Junio 2026',
    items: [{
      fecha: "17",
      impuesto: "Monotributo",
      periodo: "Cuota mensual"
    }, {
      fecha: "18",
      impuesto: "SiCoRe",
      periodo: "Retenciones 05/26"
    }, {
      fecha: "20",
      impuesto: "Ganancias · Personas",
      periodo: "Anticipo · Junio"
    }, {
      fecha: "22",
      impuesto: "Bienes Personales",
      periodo: "Anticipo · Junio"
    }, {
      fecha: "26",
      impuesto: "IVA · Grandes contr.",
      periodo: "Posición 05/2026"
    }]
  },
  ph: {
    copete: PH('COPETE'),
    cta: PH('CTA'),
    chrome_label: PH('CHROME_LABEL'),
    items: [1, 2, 3, 4, 5].map(n => ({
      fecha: PH('FECHA_' + n),
      impuesto: PH('IMPUESTO_' + n),
      periodo: PH('PERIODO_' + n)
    }))
  },
  modo: 'feed'
}, {
  id: 'cb-cover',
  label: 'Tips PyME · tapa',
  grupo: 'Carrusel B · Tips PyME',
  comp: 'TipCover',
  out: '1080×1350',
  base: '420×525',
  slots: ['COPETE', 'TITULO_SANS', 'TITULO_SERIF', 'BAJADA', 'SWIPE_CTA', 'CHROME_LABEL'],
  nota: 'Slide 1 de 4. El titular va partido: una parte en Open Sans negrita y la otra en itálica, más grande.',
  ejemplo: {
    copete: 'Gestión PyME · Monotributo',
    titulo_sans: 'Monotributo',
    titulo_serif: '2026',
    bajada: 'Cuatro cosas que tu contador quisiera que entiendas antes de fin de año.',
    swipe: 'Deslizá →',
    chrome_label: 'Cover · 06/2026'
  },
  ph: {
    copete: PH('COPETE'),
    titulo_sans: PH('TITULO_SANS'),
    titulo_serif: PH('TITULO_SERIF'),
    bajada: PH('BAJADA'),
    swipe: PH('SWIPE_CTA'),
    chrome_label: PH('CHROME_LABEL')
  },
  modo: 'feed'
}, {
  id: 'cb-tip1',
  label: 'Tips PyME · punto 1',
  grupo: 'Carrusel B · Tips PyME',
  comp: 'TipSlide2',
  out: '1080×1350',
  base: '420×525',
  slots: ['TITULAR', 'CUERPO', 'TAKEAWAY', 'CHROME_LABEL'],
  nota: 'Slide 2 de 4. Regla de contenido del repo: la placa NO dice «Tip», dice «Punto 01». Los slots siguen llamándose TIP_* para no romper la rutina.',
  ejemplo: {
    titular: 'La categoría no es para siempre.',
    cuerpo: 'ARCA revisa cada seis meses tu facturación, alquileres y consumos. Si te corrés de la escala, hay que recategorizar — sino llega la baja de oficio.',
    takeaway: 'Revisalo en enero y en julio.',
    chrome_label: 'Recategorización semestral'
  },
  ph: {
    titular: PH('TITULAR'),
    cuerpo: PH('CUERPO'),
    takeaway: PH('TAKEAWAY'),
    chrome_label: PH('CHROME_LABEL')
  },
  modo: 'feed'
}, {
  id: 'cb-tip2',
  label: 'Tips PyME · punto 2',
  grupo: 'Carrusel B · Tips PyME',
  comp: 'TipSlide3',
  out: '1080×1350',
  base: '420×525',
  slots: ['TITULAR', 'CUERPO', 'TAKEAWAY', 'CHROME_LABEL'],
  nota: 'Slide 3 de 4, el único en navy: alterna con los de papel para que el carrusel tenga ritmo.',
  ejemplo: {
    titular: 'Tu obra social también suma.',
    cuerpo: 'El componente de obra social del monotributo cubre el grupo familiar primario, pero por cada integrante adicional pagás un aporte extra. Revisalo antes de incluir nuevos beneficiarios.',
    takeaway: 'Pedí el detalle a tu contador.',
    chrome_label: 'Componente OS'
  },
  ph: {
    titular: PH('TITULAR'),
    cuerpo: PH('CUERPO'),
    takeaway: PH('TAKEAWAY'),
    chrome_label: PH('CHROME_LABEL')
  },
  modo: 'feed'
}, {
  id: 'cb-tip3',
  label: 'Tips PyME · punto 3',
  grupo: 'Carrusel B · Tips PyME',
  comp: 'TipSlide4',
  out: '1080×1350',
  base: '420×525',
  slots: ['TITULAR', 'CUERPO', 'TAKEAWAY', 'CHROME_LABEL'],
  nota: 'Slide 4 de 4. Cierra el carrusel: el takeaway es la acción concreta.',
  ejemplo: {
    titular: 'Facturación + medios de pago.',
    cuerpo: 'Los topes incluyen ingresos por todo concepto: ventas, alquileres, intereses. Y ARCA cruza tu CBU, billeteras y tarjetas. Lo que ves no es necesariamente lo que ellos ven.',
    takeaway: 'Conciliá todos tus canales.',
    chrome_label: 'Topes y cruces'
  },
  ph: {
    titular: PH('TITULAR'),
    cuerpo: PH('CUERPO'),
    takeaway: PH('TAKEAWAY'),
    chrome_label: PH('CHROME_LABEL')
  },
  modo: 'feed'
}, {
  id: 'sq-02b',
  label: 'Cita en navy',
  grupo: 'Square 1:1',
  comp: 'SqCitaNavy',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
  nota: 'Variante de sq-02. Una variante no es una plantilla nueva: es la misma composición con otro fondo, para que dos posts seguidos de la misma familia no se vean iguales en la grilla.',
  ejemplo: {
    copete: 'Pensamiento',
    cita: 'La planificación impositiva no es un costo: es la primera decisión estratégica del año.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    cita: PH('CITA'),
    autor: PH('AUTOR'),
    rol_autor: PH('ROL_AUTOR'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-03b',
  label: 'Número en itálica',
  grupo: 'Square 1:1',
  comp: 'SqNumeroSerif',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'PIE', 'HANDLE'],
  nota: 'Variante de sq-03: el número pasa a oblicua y el fondo a gris claro. Con 2 dígitos llega a 220px — el cuerpo más grande de todo el catálogo.',
  ejemplo: {
    copete: 'En cifras · MDO Consultores',
    numero: '+50',
    unidad: 'años',
    descripcion: 'acompañando empresas argentinas en la gestión impositiva, contable y previsional.',
    pie: 'Desde 1972 · Buenos Aires',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    numero: PH('NUMERO'),
    unidad: PH('UNIDAD'),
    descripcion: PH('DESCRIPCION'),
    pie: PH('PIE'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-12b',
  label: 'Noticia · último momento',
  grupo: 'Square 1:1',
  comp: 'SqNoticiaBreaking',
  out: '1080×1080',
  base: '540×540',
  slots: ['BADGE', 'CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
  nota: 'Variante de sq-12 y la única placa con tira superior a sangre: badge a la izquierda, fecha a la derecha. Reservada para normativa que sale ese día.',
  ejemplo: {
    badge: 'Último momento',
    categoria: 'ARCA · Normativa',
    titular: 'Régimen simplificado para PyMEs: cambios desde julio',
    bajada: 'Las pequeñas y medianas empresas tendrán nuevo umbral de facturación y categorías ampliadas.',
    fuente: 'Ámbito Financiero',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    badge: PH('BADGE'),
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-04b',
  label: 'Guía / Servicio en navy',
  grupo: 'Portrait 4:5',
  comp: 'PoServicioNavy',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'BAJADA', 'BULLET_1..4', 'CTA', 'HANDLE'],
  nota: 'Variante de po-04. El CTA se invierte: caja de papel sobre navy.',
  ejemplo: {
    copete: 'Servicio · MDO',
    titulo: 'Auditoría externa',
    bajada: 'Estados contables auditados con criterio profesional y normativa vigente.',
    cta: 'Consultanos',
    handle: '@mdoconsultores',
    bullets: ['Auditoría de estados contables anuales', 'Revisión limitada de información intermedia', 'Informes especiales sobre patrimonio y resultados', 'Atención de requerimientos ARCA / IGJ / CNV']
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    bajada: PH('BAJADA'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    bullets: [PH('BULLET_1'), PH('BULLET_2'), PH('BULLET_3'), PH('BULLET_4')]
  },
  modo: 'feed'
}, {
  id: 'po-05b',
  label: 'Anuncio en papel',
  grupo: 'Portrait 4:5',
  comp: 'PoAnuncioLight',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'TITULO', 'SUBTITULO', 'TEMA', 'BLOQUE_1..3', 'FECHA_HORA', 'HANDLE'],
  nota: 'Variante de po-05: mismo anuncio sobre papel, con el título en itálica.',
  ejemplo: {
    copete: 'Anuncio',
    titulo: 'Reforma fiscal',
    subtitulo: 'Webinar gratuito',
    tema: 'Análisis ejecutivo de los cambios 2026',
    fecha_hora: 'Jueves 19 · 19:00 h',
    handle: '@mdoconsultores',
    bloques: ['Impuestos', 'Sociedades', 'Sueldos']
  },
  ph: {
    copete: PH('COPETE'),
    titulo: PH('TITULO'),
    subtitulo: PH('SUBTITULO'),
    tema: PH('TEMA'),
    fecha_hora: PH('FECHA_HORA'),
    handle: PH('HANDLE'),
    bloques: [PH('BLOQUE_1'), PH('BLOQUE_2'), PH('BLOQUE_3')]
  },
  modo: 'feed'
}, {
  id: 'po-13b',
  label: 'Noticia navy · take invertido',
  grupo: 'Portrait 4:5',
  comp: 'PoNoticiaNavy',
  out: '1080×1350',
  base: '540×675',
  slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'QUE_SABER_LABEL', 'QUE_SABER', 'FUENTE', 'FECHA', 'HANDLE'],
  nota: 'Variante de po-13d. El «qué tenés que saber» va en una caja de papel dentro de la placa navy: es el único bloque invertido del catálogo.',
  ejemplo: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios',
    bajada: 'Desde el 1° de julio las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.',
    que_saber_label: 'Qué tenés que saber',
    que_saber: 'Si pagás servicios al exterior, conviene anticipar las facturas de julio.',
    fuente: 'BCRA · Comunicación «A» 7984',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    que_saber_label: PH('QUE_SABER_LABEL'),
    que_saber: PH('QUE_SABER'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'st-08b',
  label: 'Cita story en navy',
  grupo: 'Story 9:16',
  comp: 'StCitaNavy',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
  nota: 'Variante de st-08. Antes usaba padding 40, que dejaba el lockup y el pie DEBAJO de la interfaz de Instagram (tapa ~111px arriba y ~147px abajo). Ahora usa el padding de zona segura.',
  ejemplo: {
    copete: 'Pensamiento',
    cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    cita: PH('CITA'),
    autor: PH('AUTOR'),
    rol_autor: PH('ROL_AUTOR'),
    handle: PH('HANDLE')
  },
  modo: 'story'
}, {
  id: 'st-09b',
  label: 'CTA story en navy',
  grupo: 'Story 9:16',
  comp: 'StCTANavy',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'TITULAR_1..3', 'BAJADA', 'CANAL_1..3_LABEL', 'CANAL_1..3_VALOR', 'HANDLE'],
  nota: 'Variante de st-09, con el mismo arreglo de zona segura que st-08b. La tabla de canales se invierte a papel.',
  ejemplo: {
    copete: 'Estás pensando en armar tu empresa',
    titular_1: 'Hablemos',
    titular_2: 'antes',
    titular_3: 'de firmar.',
    bajada: 'Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo.',
    canal_1_label: 'Web',
    canal_1_valor: 'mdo-consultores.com.ar',
    canal_2_label: 'WhatsApp',
    canal_2_valor: '+54 9 11 3566 7985',
    canal_3_label: 'Email',
    canal_3_valor: 'info@mdo-consultores.com.ar',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    titular_1: PH('TITULAR_1'),
    titular_2: PH('TITULAR_2'),
    titular_3: PH('TITULAR_3'),
    bajada: PH('BAJADA'),
    canal_1_label: PH('CANAL_1_LABEL'),
    canal_1_valor: PH('CANAL_1_VALOR'),
    canal_2_label: PH('CANAL_2_LABEL'),
    canal_2_valor: PH('CANAL_2_VALOR'),
    canal_3_label: PH('CANAL_3_LABEL'),
    canal_3_valor: PH('CANAL_3_VALOR'),
    handle: PH('HANDLE')
  },
  modo: 'story'
}, {
  id: 'sq-01b',
  label: 'Vencimiento en papel',
  grupo: 'Square 1:1',
  comp: 'SqVencimientoLight',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'DIA', 'MES', 'ANIO', 'IMPUESTO', 'DESCRIPCION_VENC', 'HORARIO', 'CHIP_MES', 'HANDLE'],
  nota: 'Variante light de sq-01. La familia «light» es la versión editorial: fondo blanco y filetes en lugar de fondo navy. Se usa cuando la semana ya tuvo dos placas navy seguidas.',
  ejemplo: {
    copete: 'Calendario ARCA · Vencimiento',
    dia: '21',
    mes: 'JUN',
    anio: '2026',
    impuesto: 'IVA',
    descripcion: 'Posición mensual · Período 05/2026',
    horario: 'Hasta las 23:59 h',
    chip_mes: 'Calendario · 06/26',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    dia: PH('DIA'),
    mes: PH('MES'),
    anio: PH('ANIO'),
    impuesto: PH('IMPUESTO'),
    descripcion: PH('DESCRIPCION_VENC'),
    horario: PH('HORARIO'),
    chip_mes: PH('CHIP_MES'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-02c',
  label: 'Cita minimal',
  grupo: 'Square 1:1',
  comp: 'SqCitaMinimal',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
  nota: 'Variante light de sq-02, sin comilla decorativa: el filete arriba y abajo hace todo el trabajo.',
  ejemplo: {
    copete: 'Pensamiento',
    cita: 'La planificación impositiva no es un costo: es la primera decisión estratégica del año.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    cita: PH('CITA'),
    autor: PH('AUTOR'),
    rol_autor: PH('ROL_AUTOR'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-03c',
  label: 'Número en blanco',
  grupo: 'Square 1:1',
  comp: 'SqNumeroLight',
  out: '1080×1080',
  base: '540×540',
  slots: ['COPETE', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'PIE', 'HANDLE'],
  nota: 'Variante light de sq-03: número recto y unidad en itálica, sobre blanco puro.',
  ejemplo: {
    copete: 'En cifras · MDO Consultores',
    numero: '+50',
    unidad: 'años',
    descripcion: 'acompañando empresas argentinas en la gestión impositiva, contable y previsional.',
    pie: 'Est. 1972',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    numero: PH('NUMERO'),
    unidad: PH('UNIDAD'),
    descripcion: PH('DESCRIPCION'),
    pie: PH('PIE'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'sq-12c',
  label: 'Noticia minimal',
  grupo: 'Square 1:1',
  comp: 'SqNoticiaMinimal',
  out: '1080×1080',
  base: '540×540',
  slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
  nota: 'Variante light de sq-12: filete navy debajo del encabezado y nada más. La más sobria del catálogo.',
  ejemplo: {
    categoria: 'Impuestos · ARCA',
    titular: 'ARCA extiende el plazo para presentar Ganancias',
    bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.',
    fuente: 'ARCA · Comunicado oficial',
    fecha: '19 jun 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-06b',
  label: 'Voz experta sin foto',
  grupo: 'Portrait 4:5',
  comp: 'PoEquipoNoPhoto',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'NOMBRE', 'ROL', 'BIO', 'TAG_1..4', 'HANDLE'],
  nota: 'Variante de po-06 para cuando no hay retrato disponible: el nombre en itálica grande ocupa el lugar de la foto. Mejor esto que un hueco rotulado.',
  ejemplo: {
    copete: 'Voz experta',
    nombre: 'Lucía Martínez',
    rol: 'Socia · Impuestos',
    bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual — ARCA cruza CBU, billeteras y tarjetas en la misma consulta.',
    handle: '@mdoconsultores',
    tags: ['Ganancias', 'IVA', 'Bienes personales', 'Fiscalizaciones ARCA']
  },
  ph: {
    copete: PH('COPETE'),
    nombre: PH('NOMBRE'),
    rol: PH('ROL'),
    bio: PH('BIO'),
    handle: PH('HANDLE'),
    tags: [PH('TAG_1'), PH('TAG_2'), PH('TAG_3'), PH('TAG_4')]
  },
  modo: 'feed'
}, {
  id: 'po-13c',
  label: 'Noticia portrait minimal',
  grupo: 'Portrait 4:5',
  comp: 'PoNoticiaMinimal',
  out: '1080×1350',
  base: '540×675',
  slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'CIERRE', 'FUENTE', 'FECHA', 'HANDLE'],
  nota: 'Ésta es la que generó las placas de junio con el hueco vertical en el medio (tenía un flex:1 suelto que empujaba el título arriba y el cierre abajo). Ya está arreglada, pero para noticias nuevas conviene po-13d, que es la v2.',
  ejemplo: {
    categoria: 'Económico · Indicadores',
    titular: 'El BCRA modifica el régimen de pago para importaciones de servicios',
    bajada: 'A partir del 1° de julio, las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.',
    cierre: 'Una medida que acompaña la apertura gradual del mercado de cambios.',
    fuente: 'BCRA · Comunicación «A» 7984',
    fecha: '20 jun 2026',
    handle: '@mdoconsultores'
  },
  ph: {
    categoria: PH('CATEGORIA'),
    titular: PH('TITULAR'),
    bajada: PH('BAJADA'),
    cierre: PH('CIERRE'),
    fuente: PH('FUENTE'),
    fecha: PH('FECHA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'st-07b',
  label: 'Vencimientos en papel',
  grupo: 'Story 9:16',
  comp: 'StVencimientosLight',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'SEMANA', 'FECHA_1..4', 'IMPUESTO_1..4', 'PERIODO_1..4', 'HORA_1..4', 'CTA', 'HANDLE'],
  nota: 'Variante light de st-07. Tres columnas fijas: fecha 72, impuesto flexible, hora 64. La hora nunca se comprime; el impuesto es el que cede.',
  ejemplo: {
    copete: 'Vencimientos de la semana',
    semana: 'Semana 34 · 2026',
    cta: 'Te lo presentamos nosotros',
    handle: '@mdoconsultores',
    chip: 'Agenda',
    filas: [{
      fecha: '18 ago',
      impuesto: 'IVA',
      periodo: 'Posición mensual 07/2026',
      hora: '23:59'
    }, {
      fecha: '19 ago',
      impuesto: 'SUSS · F.931',
      periodo: 'Cargas sociales 07/2026',
      hora: '23:59'
    }, {
      fecha: '21 ago',
      impuesto: 'Ingresos Brutos',
      periodo: 'Convenio Multilateral',
      hora: '23:59'
    }, {
      fecha: '22 ago',
      impuesto: 'Ganancias',
      periodo: 'Anticipo sociedades',
      hora: '23:59'
    }]
  },
  ph: {
    copete: PH('COPETE'),
    semana: PH('SEMANA'),
    cta: PH('CTA'),
    handle: PH('HANDLE'),
    chip: 'Agenda',
    filas: [1, 2, 3, 4].map(n => ({
      fecha: PH('FECHA_' + n),
      impuesto: PH('IMPUESTO_' + n),
      periodo: PH('PERIODO_' + n),
      hora: PH('HORA_' + n)
    }))
  },
  modo: 'story'
}, {
  id: 'st-08c',
  label: 'Cita story minimal',
  grupo: 'Story 9:16',
  comp: 'StCitaMinimal',
  out: '1080×1920',
  base: '480×853',
  slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
  nota: 'Variante light de st-08. Antes usaba padding 50, que dejaba el pie debajo de la interfaz de Instagram; ahora usa el padding de zona segura.',
  ejemplo: {
    copete: 'Pensamiento',
    cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.',
    autor: 'Estudio MDO',
    rol_autor: 'Consultores en gestión',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    cita: PH('CITA'),
    autor: PH('AUTOR'),
    rol_autor: PH('ROL_AUTOR'),
    handle: PH('HANDLE')
  },
  modo: 'story'
}, {
  id: 'po-22',
  label: 'Antes / Después',
  grupo: 'Portrait 4:5',
  comp: 'PoAntesDespues',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'SIN_LABEL', 'SIN_TEXTO', 'CON_LABEL', 'CON_TEXTO', 'CTA', 'HANDLE'],
  nota: 'Placa partida en dos mitades de igual alto: arriba el problema en gris apagado, abajo la solución en navy. El contraste ES el mensaje.',
  ejemplo: {
    copete: 'Contabilidad',
    sin_label: 'Sin orden contable',
    sin_texto: 'Números a fin de año, decisiones a las apuradas y sorpresas con ARCA.',
    con_label: 'Con MDO',
    con_texto: 'Información al día para decidir tranquilo, todo el año.',
    cta: 'Ordenamos tu contabilidad',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    sin_label: PH('SIN_LABEL'),
    sin_texto: PH('SIN_TEXTO'),
    con_label: PH('CON_LABEL'),
    con_texto: PH('CON_TEXTO'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-23',
  label: 'Declaración / manifiesto',
  grupo: 'Portrait 4:5',
  comp: 'PoDeclaracion',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'DECLARACION', 'APOYO', 'HANDLE'],
  nota: 'La única placa firmada «Estudio MDO · Consultores» arriba del handle: es una declaración, así que lleva firma.',
  ejemplo: {
    copete: 'Gestión PyME',
    declaracion: 'La contabilidad no es un gasto. Es la base de toda buena decisión.',
    apoyo: 'Llevada al día y bien leída, te dice dónde ganás, dónde perdés y hacia dónde conviene crecer.',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    declaracion: PH('DECLARACION'),
    apoyo: PH('APOYO'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}, {
  id: 'po-25',
  label: 'Foco / una idea',
  grupo: 'Portrait 4:5',
  comp: 'PoFoco',
  out: '1080×1350',
  base: '540×675',
  slots: ['COPETE', 'IDEA', 'DETALLE', 'CTA', 'HANDLE'],
  nota: 'La única que usa la grilla de líneas sobre navy, y el asterisco gigante como apertura. Una idea sola, sin lista ni bullets.',
  ejemplo: {
    copete: 'Gestión PyME',
    idea: 'Lo que no se registra, no se puede mejorar.',
    detalle: 'Una contabilidad ordenada es lo que convierte tus números en decisiones.',
    cta: 'Llevamos tu contabilidad',
    handle: '@mdoconsultores'
  },
  ph: {
    copete: PH('COPETE'),
    idea: PH('IDEA'),
    detalle: PH('DETALLE'),
    cta: PH('CTA'),
    handle: PH('HANDLE')
  },
  modo: 'feed'
}];
window.CATALOGO = CATALOGO;
const FORMATOS = {
  'Manual 4:5': {
    w: 540,
    h: 675
  },
  'Square 1:1': {
    w: 540,
    h: 540
  },
  'Portrait 4:5': {
    w: 540,
    h: 675
  },
  'Story 9:16': {
    w: 480,
    h: 853
  },
  'LinkedIn 1.91:1': {
    w: 600,
    h: 314
  },
  'Carrusel A · Calendario': {
    w: 420,
    h: 420
  },
  'Carrusel B · Tips PyME': {
    w: 420,
    h: 525
  }
};
const GRUPOS = Object.keys(FORMATOS);
window.FORMATOS = FORMATOS;
window.GRUPOS = GRUPOS;
function SafeZone({
  modo
}) {
  const top = modo === 'story' ? '13.0%' : '23.1%';
  const bot = modo === 'story' ? '17.2%' : '18.5%';
  const banda = {
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'repeating-linear-gradient(45deg,rgba(156,59,50,0.16) 0 14px,rgba(156,59,50,0.05) 14px 28px)',
    border: '1px dashed rgba(156,59,50,0.55)'
  };
  const rot = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 9,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--no)',
    background: 'rgba(255,255,255,0.9)',
    padding: '2px 7px',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...banda,
      top: 0,
      height: top
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...banda,
      bottom: 0,
      height: bot
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...rot,
      top: 8
    }
  }, "UI superior \u2014 evitar texto"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...rot,
      bottom: 8
    }
  }, "UI inferior \u2014 evitar texto"));
}
function Rail({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 210,
      flexShrink: 0,
      borderRight: '1px solid var(--rule)',
      background: 'var(--surface-card)',
      overflowY: 'auto',
      padding: '18px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px 16px'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 26,
    base: "../../assets/logos"
  })), GRUPOS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 18px 6px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, g), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: 'var(--ink-55)',
      marginTop: 2
    }
  }, g === 'Manual 4:5' ? 'del manual' : 'del repo de plantillas')), CATALOGO.filter(t => t.grupo === g).map(t => {
    const on = t.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      type: "button",
      onClick: () => onChange(t.id),
      style: {
        display: 'flex',
        width: '100%',
        textAlign: 'left',
        gap: 10,
        alignItems: 'baseline',
        font: 'inherit',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        cursor: 'pointer',
        padding: '7px 18px',
        border: 'none',
        borderLeft: '2px solid ' + (on ? 'var(--navy)' : 'transparent'),
        background: on ? 'var(--grey-pale)' : 'transparent',
        color: on ? 'var(--ink)' : 'var(--ink-70)',
        fontWeight: on ? 600 : 400
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 10.5,
        letterSpacing: '0.06em',
        color: 'var(--ink-55)',
        minWidth: 42
      }
    }, t.id), /*#__PURE__*/React.createElement("span", null, t.label));
  }))));
}
function App() {
  const [id, setId] = useState('mn-02');
  const [ejemplo, setEjemplo] = useState(true);
  const [safe, setSafe] = useState(false);
  const tpl = useMemo(() => CATALOGO.find(t => t.id === id), [id]);
  const fmt = FORMATOS[tpl.grupo];
  const scale = Math.min(1, 540 / fmt.h, 620 / fmt.w);
  const Comp = window[tpl.comp];
  const props = ejemplo ? tpl.ejemplo : tpl.ph;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      background: 'var(--ground)'
    }
  }, /*#__PURE__*/React.createElement(Rail, {
    value: id,
    onChange: setId
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
      padding: '14px 24px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 240px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 3
  }, tpl.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10.5,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      color: 'var(--ink-55)',
      marginTop: 2
    }
  }, tpl.id, " \xB7 base ", tpl.base, " \xB7 salida ", tpl.out)), /*#__PURE__*/React.createElement(Btn, {
    on: ejemplo,
    onClick: () => setEjemplo(true)
  }, "Contenido de ejemplo"), /*#__PURE__*/React.createElement(Btn, {
    on: !ejemplo,
    onClick: () => setEjemplo(false)
  }, "Placeholders"), /*#__PURE__*/React.createElement(Btn, {
    on: safe,
    onClick: () => setSafe(!safe)
  }, "Zona segura")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      display: 'grid',
      placeItems: 'center',
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      border: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement(Comp, _extends({}, props, {
    scale: scale
  })), safe ? /*#__PURE__*/React.createElement(SafeZone, {
    modo: tpl.modo
  }) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 248,
      flexShrink: 0,
      borderLeft: '1px solid var(--rule)',
      background: 'var(--surface-card)',
      overflowY: 'auto',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Slots"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, tpl.slots.map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s
  }, s)))), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "C\xF3mo se rellena"), /*#__PURE__*/React.createElement(Lede, {
    size: "note",
    style: {
      fontSize: 12
    }
  }, "La rutina abre la plantilla, reemplaza cada ", /*#__PURE__*/React.createElement("code", null, "[SLOT]"), " por su texto y saca el PNG al tama\xF1o de salida. El artboard se dise\xF1a al tama\xF1o base y se escala.")), tpl.nota ? /*#__PURE__*/React.createElement(Nota, {
    title: "Por qu\xE9 existe esta variante"
  }, tpl.nota) : null, /*#__PURE__*/React.createElement(Nota, {
    tone: "bad",
    title: "Regla dura: ARCA, nunca AFIP"
  }, "El organismo ya no se llama AFIP. En t\xEDtulos, copys, im\xE1genes y hashtags va siempre ", /*#__PURE__*/React.createElement("b", null, "ARCA"), ". Si la fuente dice AFIP, se traduce al redactar."), /*#__PURE__*/React.createElement(Nota, {
    title: "Margen de seguridad"
  }, "Instagram recorta los bordes en la grilla del perfil. El padding de cada formato es el m\xEDnimo: se mantiene o sube, nunca baja. Verificable con \xABZona segura\xBB.")));
}

// El montaje NO va aca: este archivo lo empaqueta el compilador dentro de
// _ds_bundle.js, asi que se evalua dos veces por carga. Solo se expone el
// componente; el createRoot vive inline en index.html.
window.MdoRedesApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/app-v2.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/hoja.babel.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// hoja.babel.js — renderiza las 65 placas de una, cada una con un id estable
// (#p-<id>) para poder capturarlas individualmente.
const CAT = window.CATALOGO || [];
const FMT = window.FORMATOS || {};
function Hoja() {
  const grupos = [];
  CAT.forEach(t => {
    let g = grupos.find(x => x.nombre === t.grupo);
    if (!g) {
      g = {
        nombre: t.grupo,
        items: []
      };
      grupos.push(g);
    }
    g.items.push(t);
  });
  return /*#__PURE__*/React.createElement("div", null, grupos.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.nombre
  }, /*#__PURE__*/React.createElement("h2", null, g.nombre, " \xB7 ", g.items.length, " placas"), /*#__PURE__*/React.createElement("div", {
    className: "grid"
  }, g.items.map(t => {
    const Comp = window[t.comp];
    const f = FMT[t.grupo] || {
      w: 540,
      h: 675
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "cell",
      key: t.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "cap"
    }, /*#__PURE__*/React.createElement("span", null, t.id), /*#__PURE__*/React.createElement("span", null, t.out)), /*#__PURE__*/React.createElement("div", {
      className: "shot",
      id: 'p-' + t.id,
      style: {
        width: f.w,
        height: f.h
      }
    }, Comp ? /*#__PURE__*/React.createElement(Comp, _extends({}, t.ejemplo || {}, {
      scale: 1
    })) : null), /*#__PURE__*/React.createElement("div", {
      className: "cap",
      style: {
        color: '#707b89'
      }
    }, /*#__PURE__*/React.createElement("span", null, t.label)));
  })))));
}
(() => {
  const el = document.getElementById('hoja');
  if (!el) return;
  el.__root = el.__root || ReactDOM.createRoot(el);
  el.__root.render(/*#__PURE__*/React.createElement(Hoja, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/hoja.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-carousel.babel.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// plates-carousel.jsx — TANDA 5: los dos sets de carrusel (7 slides).
//   Set A · Calendario impositivo — 3 slides square, base 420x420 → 1080x1080
//   Set B · Tips PyME             — 4 slides portrait, base 420x525 → 1080x1350
// Recreados leyendo templates-carousel.jsx del repo mdo-automatizaciones-redes.
//
// Dos reglas de contenido que vienen del repo y se conservan:
//   · NO se usa la palabra "Tip" en la placa: dice "Punto 01". Los slots
//     siguen llamandose TIP_* para no romper la rutina.
//   · Las filas de calendario se CENTRAN en el espacio disponible: con menos
//     de 5 items no queda un vacio abajo.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  Lockup,
  IsoWatermark,
  Eyebrow,
  Display,
  Lede,
  PageIndex
} = NS;
const BC = '../../assets/logos';
const fitC = (t, s, f) => window.fitSize(t, s, f);
const rotC = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)',
  fontWeight: 700,
  fontSize: size,
  letterSpacing: ls || '0.16em',
  textTransform: 'uppercase',
  color
});
const itaC = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)',
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: size,
  lineHeight: lh || 1.0,
  color
});

// Pie de carrusel: etiqueta a la izquierda, indice a la derecha.
function CarChrome({
  idx,
  total,
  label,
  onInverse
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 10,
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 9,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: onInverse ? 'var(--text-muted-on-inverse)' : 'var(--ink-55)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement(PageIndex, {
    current: idx,
    total: total,
    onInverse: onInverse,
    style: {
      fontSize: 9,
      flexShrink: 0
    }
  }));
}

// Fila de vencimiento, compartida por ca-q1 y ca-q2.
function CalRow({
  date,
  tax,
  period,
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '40px 1fr',
      alignItems: 'baseline',
      gap: 6,
      padding: compact ? '8px 0' : '10px 0',
      borderBottom: '1px solid var(--hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: itaC(compact ? 26 : 28, 'var(--navy)', 0.8)
  }, date), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: compact ? 12.5 : 13,
      fontWeight: 600,
      color: 'var(--ink)',
      lineHeight: 1.2
    }
  }, tax), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: compact ? 10.5 : 11,
      color: 'var(--ink-55)',
      marginTop: 1
    }
  }, period)));
}

/* ══ Set A · Calendario impositivo ══════════════════════════════════ */

/* ── ca-cover · Tapa del calendario ─────────────────────────────── */
function CalCover({
  copete,
  mes,
  anio,
  bajada,
  swipe,
  chrome_label,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "carouselSq",
    tone: "navy",
    pad: 28,
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 240,
    opacity: 0.06,
    tone: "paper",
    base: BC,
    style: {
      right: -80,
      bottom: -40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    tone: "paper",
    height: 40,
    base: BC
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotC(9, 'var(--text-muted-on-inverse)', '0.1em'),
      whiteSpace: 'nowrap'
    }
  }, copete)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: itaC(fitC(mes, [[7, 72], [10, 60], [14, 50]], 42), 'var(--paper)', 0.95)
  }, mes), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotC(17, 'var(--grey)'),
      fontWeight: 400,
      marginTop: 4
    }
  }, anio), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 16,
      fontSize: 12.5,
      maxWidth: '90%'
    }
  }, bajada), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotC(11, 'var(--grey)'),
      marginTop: 20
    }
  }, swipe)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(CarChrome, {
    idx: 1,
    total: 3,
    label: chrome_label,
    onInverse: true
  })));
}

/* ── ca-q1 · Primera quincena ───────────────────────────────────── */
function CalQ1({
  copete,
  items,
  chrome_label,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "carouselSq",
    tone: "white",
    pad: 28,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BC
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      whiteSpace: 'nowrap'
    }
  }, copete)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 36,
      background: 'var(--navy)',
      marginBottom: 12
    }
  }), (items || []).map((it, i) => /*#__PURE__*/React.createElement(CalRow, {
    key: i,
    date: it.fecha,
    tax: it.impuesto,
    period: it.periodo
  }))), /*#__PURE__*/React.createElement(CarChrome, {
    idx: 2,
    total: 3,
    label: chrome_label
  }));
}

/* ── ca-q2 · Segunda quincena, con CTA ──────────────────────────── */
function CalQ2({
  copete,
  items,
  cta,
  chrome_label,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "carouselSq",
    tone: "white",
    pad: 28,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BC
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      whiteSpace: 'nowrap'
    }
  }, copete)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 36,
      background: 'var(--navy)',
      marginBottom: 12
    }
  }), (items || []).map((it, i) => /*#__PURE__*/React.createElement(CalRow, {
    key: i,
    date: it.fecha,
    tax: it.impuesto,
    period: it.periodo,
    compact: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: '11px 14px',
      background: 'var(--navy)',
      color: 'var(--paper)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      fontWeight: 600
    }
  }, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey)',
      flexShrink: 0
    }
  }, "\u2192"))), /*#__PURE__*/React.createElement(CarChrome, {
    idx: 3,
    total: 3,
    label: chrome_label
  }));
}

/* ══ Set B · Tips PyME ══════════════════════════════════════════════ */

/* ── cb-cover · Tapa, titular en dos partes (sans + italica) ────── */
function TipCover({
  copete,
  titulo_sans,
  titulo_serif,
  bajada,
  swipe,
  chrome_label,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "carouselPo",
    tone: "tint",
    pad: 28,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BC
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotC(9, 'var(--ink-55)', '0.1em'),
      whiteSpace: 'nowrap'
    }
  }, copete)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 16
    }
  }, copete), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitC(titulo_sans, [[12, 36], [20, 30], [28, 25]], 21),
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.02
    }
  }, titulo_sans), /*#__PURE__*/React.createElement("div", {
    style: {
      ...itaC(fitC(titulo_serif, [[8, 56], [14, 46], [20, 38]], 32), 'var(--navy-lift)', 0.94),
      marginTop: 4
    }
  }, titulo_serif), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 20,
      fontSize: 13.5,
      maxWidth: '92%'
    }
  }, bajada), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotC(10.5, 'var(--navy-lift)'),
      marginTop: 24
    }
  }, swipe)), /*#__PURE__*/React.createElement(CarChrome, {
    idx: 1,
    total: 4,
    label: chrome_label
  }));
}

/* ── cb-tip1..3 · Slide de punto ────────────────────────────────────
   Numero gigante en italica, filete vertical, rotulo, titular, cuerpo y el
   takeaway al pie con asterisco. Los impares en papel, el 2 en navy. */
function TipSlide({
  idx,
  total = 4,
  tip_num,
  titular,
  cuerpo,
  takeaway,
  chrome_label,
  tone = 'paper',
  scale
}) {
  const inv = tone === 'navy';
  const accent = inv ? 'var(--grey)' : 'var(--navy-lift)';
  return /*#__PURE__*/React.createElement(Plate, {
    format: "carouselPo",
    tone: inv ? 'navy' : 'white',
    pad: 28,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    tone: inv ? 'paper' : 'navy',
    height: 40,
    base: BC
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotC(9, inv ? 'var(--text-muted-on-inverse)' : 'var(--ink-55)', '0.1em'),
      whiteSpace: 'nowrap'
    }
  }, "Punto ", String(tip_num).padStart(2, '0'))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...itaC(92, accent, 0.78),
      flexShrink: 0
    }
  }, tip_num), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: inv ? 'var(--rule-on-inverse-strong)' : 'var(--hair-2)',
      margin: '8px 0',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotC(9.5, accent, '0.18em'),
      alignSelf: 'center'
    }
  }, 'Punto ' + tip_num + ' de ' + (total - 1))), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: inv,
    style: {
      fontSize: fitC(titular, [[34, 22], [52, 19], [72, 17]], 15.5),
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.1,
      marginBottom: 12
    }
  }, titular), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: fitC(cuerpo, [[150, 12.5], [220, 11.5]], 10.5),
      lineHeight: 1.5,
      color: inv ? 'var(--text-body-on-inverse)' : 'var(--ink-70)'
    }
  }, cuerpo), takeaway ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 16,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...itaC(32, accent, 0.7),
      flexShrink: 0
    }
  }, "*"), /*#__PURE__*/React.createElement("div", {
    style: itaC(fitC(takeaway, [[42, 18], [64, 16]], 14), inv ? 'var(--paper)' : 'var(--ink)', 1.22)
  }, takeaway)) : null), /*#__PURE__*/React.createElement(CarChrome, {
    idx: idx,
    total: total,
    label: chrome_label,
    onInverse: inv
  }));
}
const TipSlide2 = p => /*#__PURE__*/React.createElement(TipSlide, _extends({}, p, {
  idx: 2,
  tip_num: 1,
  tone: p.tone || 'paper'
}));
const TipSlide3 = p => /*#__PURE__*/React.createElement(TipSlide, _extends({}, p, {
  idx: 3,
  tip_num: 2,
  tone: p.tone || 'navy'
}));
const TipSlide4 = p => /*#__PURE__*/React.createElement(TipSlide, _extends({}, p, {
  idx: 4,
  tip_num: 3,
  tone: p.tone || 'paper'
}));
Object.assign(window, {
  CarChrome,
  CalRow,
  CalCover,
  CalQ1,
  CalQ2,
  TipCover,
  TipSlide,
  TipSlide2,
  TipSlide3,
  TipSlide4
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-carousel.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-explicador.babel.js
try { (() => {
// plates-explicador.jsx — TANDA 2: las plantillas de utilidad y explicador.
// Recreadas leyendo templates-utilidad.jsx y templates-explicador.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// Adaptaciones de marca v2.0 (iguales en todas las tandas):
//   Montserrat        → Open Sans  (--font-display / --font-body)
//   Geist Mono        → Chivo 700 versalitas (--font-accent)
//   Instrument Serif  → Chivo 300 italica
//   #1f4e79 y cia     → tokens de la paleta oficial
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  PlateHeader,
  Chip,
  HandleFooter,
  Eyebrow,
  Display,
  Lede,
  Rule,
  IsoWatermark,
  Lockup
} = NS;
const BE = '../../assets/logos';
const fitE = (t, s, f) => window.fitSize(t, s, f);
const rotE = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)',
  fontWeight: 700,
  fontSize: size,
  letterSpacing: ls || '0.14em',
  textTransform: 'uppercase',
  color
});
const itaE = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)',
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: size,
  lineHeight: lh || 1.02,
  color
});

/* ── po-37 · Vencimientos de la semana, version feed ────────────────
   La de st-07 es story y se va en 24 h; esta queda en el feed como
   referencia. Cada fila: dia grande + mes, filete vertical, impuesto y periodo. */
function PoVencimientosFeed({
  copete,
  semana,
  filas,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 50,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BE
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.06,
      letterSpacing: '-0.022em'
    }
  }, "Vencimientos", /*#__PURE__*/React.createElement("br", null), "de la semana"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotE(11, 'var(--navy-lift)'),
      marginTop: 10
    }
  }, semana)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 6
    }
  }, (filas || []).map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '15px 0',
      borderTop: '1px solid var(--hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 54,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 700,
      color: 'var(--navy)',
      lineHeight: 1,
      letterSpacing: '-0.03em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, f.dia), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotE(9.5, 'var(--navy-lift)', '0.16em'),
      marginTop: 3
    }
  }, f.mes)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: 'stretch',
      background: 'var(--hair)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--ink)',
      lineHeight: 1.2
    }
  }, f.impuesto), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--ink-55)'
    }
  }, f.periodo))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      background: 'var(--grey-pale)',
      border: '1px solid var(--hair)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--navy)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--navy-lift)',
      flexShrink: 0
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-31 · Explicador en 3 pasos ─────────────────────────────────
   A diferencia de po-28 (una linea por paso), esta explica de verdad:
   cada paso lleva titulo y cuerpo. El numero va en italica. */
function PoExplicador({
  copete,
  titulo,
  pasos,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 52,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BE
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      marginTop: 26,
      fontSize: fitE(titulo, [[28, 40], [44, 35], [62, 30]], 26),
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      maxWidth: '92%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 6
    }
  }, (pasos || []).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'flex-start',
      padding: '20px 0',
      borderTop: i === 0 ? 'none' : '1px solid var(--hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...itaE(40, 'var(--slate)', 0.9),
      flexShrink: 0,
      width: 44,
      paddingTop: 2
    }
  }, '0' + (i + 1)), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16.5,
      fontWeight: 700,
      color: 'var(--navy)',
      lineHeight: 1.25,
      letterSpacing: '-0.01em'
    }
  }, s.titulo), /*#__PURE__*/React.createElement(Lede, {
    size: "note",
    style: {
      marginTop: 6,
      fontSize: 13
    }
  }, s.texto))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 20px',
      background: 'var(--navy)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey)',
      flexShrink: 0
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-32 · Comparativa A vs B ────────────────────────────────────
   Dos columnas de igual peso, la B en navy. El veredicto abajo, en italica
   y con asterisco: no dice cual gana, dice de que depende. */
function PoComparativa({
  copete,
  titulo,
  a_label,
  a_titulo,
  a_items,
  b_label,
  b_titulo,
  b_items,
  veredicto,
  handle,
  scale
}) {
  const Col = ({
    label,
    titulo: tit,
    items,
    dark
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      border: dark ? 'none' : '1px solid var(--hair)',
      borderRadius: 4,
      padding: '20px 18px',
      background: dark ? 'var(--navy)' : '#fff',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: rotE(9.5, dark ? 'var(--grey)' : 'var(--navy-lift)', '0.18em')
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.15,
      color: dark ? 'var(--paper)' : 'var(--ink)'
    }
  }, tit), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: dark ? 'var(--rule-on-inverse-strong)' : 'var(--hair)',
      margin: '14px 0 12px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, (items || []).map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 6,
      width: 10,
      height: 1,
      background: dark ? 'var(--grey)' : 'var(--slate)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      lineHeight: 1.4,
      color: dark ? 'var(--text-body-on-inverse)' : 'var(--ink-70)'
    }
  }, it)))));
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "tint",
    pad: 46,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BE
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      marginTop: 24,
      fontSize: fitE(titulo, [[26, 38], [42, 33], [60, 28]], 25),
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      maxWidth: '94%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'stretch',
      gap: 14,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Col, {
    label: a_label,
    titulo: a_titulo,
    items: a_items,
    dark: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotE(10, 'var(--ink-35)'),
      flexShrink: 0,
      alignSelf: 'center'
    }
  }, "vs"), /*#__PURE__*/React.createElement(Col, {
    label: b_label,
    titulo: b_titulo,
    items: b_items,
    dark: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      borderTop: '1px solid var(--hair)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...itaE(24, 'var(--slate)', 0.7),
      flexShrink: 0
    }
  }, "*"), /*#__PURE__*/React.createElement("div", {
    style: itaE(18, 'var(--navy)', 1.22)
  }, veredicto)), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-33 · Elegi tu caso ─────────────────────────────────────────
   Placa de engagement: tres opciones en pastillas y un CTA que pide comentar
   el numero. Es la unica que usa radio pill en las opciones. */
function PoElegiTuCaso({
  copete,
  pregunta,
  opciones,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 52,
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 300,
    opacity: 0.06,
    tone: "paper",
    base: BE,
    style: {
      right: -90,
      top: 150
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BE
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitE(pregunta, [[30, 44], [48, 38], [70, 32]], 27),
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      maxWidth: '95%'
    }
  }, pregunta), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, (opciones || []).map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 18px',
      border: '1px solid var(--rule-on-inverse-strong)',
      borderRadius: 999,
      background: 'rgba(248,246,246,0.05)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 26,
      height: 26,
      borderRadius: '50%',
      border: '1px solid var(--grey)',
      color: 'var(--grey)',
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 400,
      color: 'var(--paper)',
      lineHeight: 1.3
    }
  }, o))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 20px',
      background: 'var(--paper)',
      color: 'var(--navy)',
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      fontWeight: 700,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--navy-lift)',
      flexShrink: 0
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  })));
}
Object.assign(window, {
  PoVencimientosFeed,
  PoExplicador,
  PoComparativa,
  PoElegiTuCaso
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-explicador.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-feed.babel.js
try { (() => {
// plates-feed.jsx — placas de feed (1:1 y 4:5) recreadas con la marca v2.0.
// Composicion, paddings y jerarquia salen de mdo-automatizaciones-redes
// (templates-square.jsx, templates-noticia-v2.jsx, templates-friday*.jsx).
// Lo unico que cambia respecto del original es la paleta y las tipografias:
// el original todavia usa el branding anterior (#1f4e79, Montserrat).
// Los componentes del design system se resuelven en render (no al evaluar el
// módulo): así este archivo es inofensivo si se evalúa antes que el bundle.
const DS = n => function DSComp(props) {
  const C = (window.MDOConsultoresDesignSystem_cc21de || {})[n];
  return C ? React.createElement(C, props) : null;
};
const Plate = DS('Plate'),
  PlateHeader = DS('PlateHeader'),
  Chip = DS('Chip'),
  HandleFooter = DS('HandleFooter'),
  SourceFooter = DS('SourceFooter'),
  BigNumber = DS('BigNumber'),
  Eyebrow = DS('Eyebrow'),
  Display = DS('Display'),
  Lede = DS('Lede'),
  Rule = DS('Rule'),
  IsoWatermark = DS('IsoWatermark'),
  Icon = DS('Icon'),
  Lockup = DS('Lockup');
const B = '../../assets/logos';

// El cuerpo del titular se calcula por largo de texto, no midiendo el DOM:
// asi el render headless captura siempre el tamano final ya resuelto.
function fitSize(text, steps, fallback) {
  const n = String(text == null ? '' : text).length;
  for (let i = 0; i < steps.length; i++) if (n <= steps[i][0]) return steps[i][1];
  return fallback != null ? fallback : steps[steps.length - 1][1];
}

/* ── sq-01 · Vencimiento impositivo (navy) ─────────────────────────── */
function SqVencimiento({
  copete,
  dia,
  mes,
  anio,
  impuesto,
  descripcion,
  horario,
  chip_mes,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "navy",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: chip_mes,
    onInverse: true,
    base: B
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true,
    style: {
      marginBottom: 20
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 18,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(BigNumber, {
    size: fitSize(dia, [[2, 180], [3, 140]], 108),
    onInverse: true
  }, dia), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.22em',
      color: 'var(--grey)'
    }
  }, mes), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 11,
      letterSpacing: '0.18em',
      color: 'var(--text-muted-on-inverse)'
    }
  }, anio))), /*#__PURE__*/React.createElement(Rule, {
    onInverse: true,
    strong: true,
    style: {
      margin: '6px 0 16px'
    }
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitSize(impuesto, [[6, 58], [13, 46], [22, 36]], 30)
    }
  }, impuesto), /*#__PURE__*/React.createElement(Lede, {
    onInverse: true,
    size: "body",
    style: {
      marginTop: 10,
      fontSize: fitSize(descripcion, [[46, 16], [70, 14.5]], 13.5),
      maxWidth: '88%'
    }
  }, descripcion), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--grey)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 11.5,
      letterSpacing: '0.1em',
      color: 'var(--grey)'
    }
  }, horario))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  }));
}

/* ── sq-02 · Cita / reflexion (papel) ─────────────────────────────── */
function SqCita({
  copete,
  cita,
  autor,
  rol_autor,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "white",
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: B
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: 96,
      lineHeight: 0.7,
      color: 'var(--slate)',
      marginTop: 4,
      marginRight: -6
    }
  }, "\u201C")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: fitSize(cita, [[58, 40], [95, 34], [140, 29]], 25),
      lineHeight: 1.14,
      letterSpacing: '-0.015em',
      color: 'var(--navy)'
    }
  }, cita), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'var(--navy)',
      marginTop: 8,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: 'var(--ink)'
    }
  }, autor, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 400,
      color: 'var(--ink-55)',
      fontSize: 11.5,
      marginTop: 2,
      letterSpacing: 0
    }
  }, rol_autor)))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── sq-03 · Numero clave (tint) ──────────────────────────────────── */
function SqNumero({
  copete,
  numero,
  unidad,
  descripcion,
  pie,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "tint",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: "Est. 1972",
    base: B
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, copete), /*#__PURE__*/React.createElement(BigNumber, {
    size: fitSize(numero, [[2, 200], [3, 172], [4, 142]], 116),
    unit: unidad
  }, numero), /*#__PURE__*/React.createElement(Rule, {
    width: 64,
    strong: true,
    style: {
      margin: '20px 0 18px'
    }
  }), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      fontSize: fitSize(descripcion, [[70, 17], [110, 15.5]], 14),
      maxWidth: '90%'
    }
  }, descripcion)), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    right: pie
  }));
}

/* ── po-13d · Noticia con marca de agua y cierre (papel) ──────────── */
function PoNoticia({
  categoria,
  titular,
  bajada,
  cierre,
  fuente,
  fecha,
  handle,
  tone = 'paper',
  scale
}) {
  const inv = tone === 'navy';
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: tone,
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 260,
    opacity: inv ? 0.08 : 0.05,
    tone: inv ? 'paper' : 'navy',
    base: B,
    style: {
      right: -70,
      bottom: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: B,
    tone: inv ? 'paper' : 'navy'
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: inv
  }, categoria)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 1,
    onInverse: inv,
    style: {
      fontSize: fitSize(titular, [[34, 44], [54, 38], [76, 32]], 28),
      letterSpacing: '-0.022em'
    }
  }, titular), /*#__PURE__*/React.createElement(Lede, {
    onInverse: inv,
    size: "body",
    style: {
      marginTop: 14,
      fontSize: 15,
      maxWidth: '92%'
    }
  }, bajada), /*#__PURE__*/React.createElement(Rule, {
    onInverse: inv,
    width: 64,
    strong: true,
    style: {
      margin: '22px 0 14px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 17,
      lineHeight: 1.3,
      color: inv ? 'var(--grey)' : 'var(--navy)',
      maxWidth: '86%'
    }
  }, cierre)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: fecha,
    onInverse: inv
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: inv,
    style: {
      marginTop: 8
    }
  })));
}

/* ── po-24 · Checklist (blanco) ───────────────────────────────────── */
function PoChecklist({
  copete,
  titulo,
  item_1,
  item_2,
  item_3,
  cta,
  handle,
  scale
}) {
  const items = [item_1, item_2, item_3];
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: B
  }), /*#__PURE__*/React.createElement(Display, {
    level: 1,
    style: {
      marginTop: 30,
      fontSize: fitSize(titulo, [[30, 38], [46, 33], [64, 28]], 25),
      maxWidth: '92%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 20
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--navy)',
      flexShrink: 0,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tilde",
    size: 30
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16.5,
      fontWeight: 400,
      lineHeight: 1.35,
      color: 'var(--ink)'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 20px',
      background: 'var(--navy)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13.5,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey)'
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-26 · Tres iconos en fila (papel) ──────────────────────────── */
function PoTresIconos({
  copete,
  titulo,
  label_1,
  label_2,
  label_3,
  cta,
  handle,
  scale
}) {
  const cols = [{
    ic: 'reloj',
    l: label_1
  }, {
    ic: 'grafico',
    l: label_2
  }, {
    ic: 'escudo',
    l: label_3
  }];
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "paper",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: B
  }), /*#__PURE__*/React.createElement(Display, {
    level: 1,
    style: {
      marginTop: 30,
      fontSize: fitSize(titulo, [[30, 36], [46, 31], [64, 27]], 24),
      maxWidth: '90%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      width: '100%'
    }
  }, cols.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 86,
      height: 86,
      borderRadius: '50%',
      background: 'var(--grey)',
      color: 'var(--navy)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.ic,
    size: 38
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--ink)',
      lineHeight: 1.3
    }
  }, c.l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 20px',
      background: 'var(--navy)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13.5,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey)'
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-21 · Pregunta hero (navy) ─────────────────────────────────── */
function PoPreguntaHero({
  copete,
  pregunta,
  respuesta,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: B
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: fitSize(pregunta, [[38, 46], [58, 39], [82, 33]], 28),
      lineHeight: 1.12,
      letterSpacing: '-0.02em',
      color: 'var(--paper)'
    }
  }, pregunta), /*#__PURE__*/React.createElement(Rule, {
    onInverse: true,
    strong: true,
    width: 64,
    style: {
      margin: '26px 0 18px'
    }
  }), /*#__PURE__*/React.createElement(Lede, {
    onInverse: true,
    size: "body",
    style: {
      fontSize: 16,
      maxWidth: '90%'
    }
  }, respuesta)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13,
      color: 'var(--grey)'
    }
  }, cta, " \u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10,
      letterSpacing: '0.08em',
      color: 'var(--text-muted-on-inverse)',
      whiteSpace: 'nowrap'
    }
  }, handle)));
}
Object.assign(window, {
  fitSize,
  SqVencimiento,
  SqCita,
  SqNumero,
  PoNoticia,
  PoChecklist,
  PoTresIconos,
  PoPreguntaHero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-feed.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-friday.babel.js
try { (() => {
// plates-friday.jsx — TANDA 8 (última): las 3 del viernes que faltaban
// (po-22, po-23, po-25). Las otras dos del archivo, po-21 y po-24, ya estaban.
// Recreadas leyendo templates-friday.jsx del repo mdo-automatizaciones-redes.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  PlateHeader,
  HandleFooter,
  Eyebrow,
  Display,
  Lede
} = NS;
const BF = '../../assets/logos';
const fitF = (t, s, f) => window.fitSize(t, s, f);
const itaF = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)',
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: size,
  lineHeight: lh || 1.1,
  color
});

/* ── po-22 · Antes / Después ───────────────────────────────────────────
   Placa partida en dos mitades de igual alto: arriba el problema en gris
   apagado, abajo la solución en navy. El contraste ES el mensaje. */
function PoAntesDespues({
  copete,
  sin_label,
  sin_texto,
  con_label,
  con_texto,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 0,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '52px 56px 0'
    }
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BF
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '26px 56px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, sin_label), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitF(sin_texto, [[60, 29], [95, 25]], 22),
      color: 'var(--ink-35)',
      lineHeight: 1.18,
      fontWeight: 600
    }
  }, sin_texto)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy)',
      color: 'var(--paper)',
      flex: 1,
      padding: '32px 56px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true,
    style: {
      marginBottom: 14
    }
  }, con_label), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitF(con_texto, [[55, 33], [90, 28]], 24),
      lineHeight: 1.14,
      fontWeight: 700
    }
  }, con_texto), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--grey)'
    }
  }, cta, " \u2192"), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true,
    style: {
      marginTop: 18
    }
  })));
}

/* ── po-23 · Declaración / manifiesto ──────────────────────────────────
   La única placa firmada «Estudio MDO · Consultores» en el pie, arriba del
   handle: es una declaración, así que lleva firma. */
function PoDeclaracion({
  copete,
  declaracion,
  apoyo,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 60,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BF
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 56,
      background: 'var(--navy)',
      marginBottom: 30
    }
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitF(declaracion, [[45, 46], [70, 39], [100, 33]], 28),
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em'
    }
  }, declaracion), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 22,
      fontSize: fitF(apoyo, [[95, 17], [140, 15.5]], 14),
      maxWidth: '92%'
    }
  }, apoyo)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      paddingTop: 16,
      borderTop: '1px solid var(--hair)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: 'var(--navy)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--navy)'
    }
  }, "Estudio MDO \xB7 Consultores")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-25 · Foco / una idea ───────────────────────────────────────────
   La única que usa la grilla de líneas sobre navy, y el asterisco gigante
   como recurso de apertura. Una idea sola, sin lista ni bullets. */
function PoFoco({
  copete,
  idea,
  detalle,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 60,
    scale: scale,
    style: {
      backgroundImage: 'linear-gradient(to right,rgba(248,246,246,0.06) 1px,transparent 1px)',
      backgroundSize: '64px 64px'
    }
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BF
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...itaF(66, 'var(--grey)', 0.7),
      marginBottom: 6
    }
  }, "*"), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitF(idea, [[36, 50], [56, 42], [80, 35]], 30),
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: '-0.02em'
    }
  }, idea), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 20,
      fontSize: fitF(detalle, [[85, 17], [130, 15.5]], 14),
      maxWidth: '90%'
    }
  }, detalle)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--rule-on-inverse)',
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--grey)'
    }
  }, cta, " \u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10,
      letterSpacing: '0.08em',
      color: 'var(--text-muted-on-inverse)',
      whiteSpace: 'nowrap'
    }
  }, handle))));
}
Object.assign(window, {
  PoAntesDespues,
  PoDeclaracion,
  PoFoco
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-friday.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-iconos.babel.js
try { (() => {
// plates-iconos.jsx — TANDA 4: las 4 plantillas icon-forward del viernes que
// faltaban (po-27, po-28, po-29, po-30). La quinta, po-26, ya estaba.
// Recreadas leyendo templates-friday-b.jsx del repo mdo-automatizaciones-redes.
//
// Los iconos NO se redibujan aca: se usan los nueve del design system
// (components/iconos/Icon.jsx), que tienen el path data copiado de ese mismo
// archivo. Mismo trazo 1.7, mismo viewBox 24.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  PlateHeader,
  HandleFooter,
  Display,
  Lede,
  Icon
} = NS;
const BI = '../../assets/logos';
const fitI = (t, s, f) => window.fitSize(t, s, f);

/* ── po-27 · Icono grande central ──────────────────────────────────
   Navy, todo centrado: aro de 128 con el icono, titular y bajada.
   El aro va con borde de 2px, no relleno. */
function PoIconoHero({
  copete,
  titulo,
  bajada,
  cta,
  handle,
  icono,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 60,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BI
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      height: 128,
      borderRadius: '50%',
      border: '2px solid var(--grey)',
      color: 'var(--grey)',
      display: 'grid',
      placeItems: 'center',
      marginBottom: 32,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icono || 'grafico',
    size: 62
  })), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitI(titulo, [[26, 42], [42, 36], [60, 30]], 26),
      fontWeight: 700,
      lineHeight: 1.1,
      maxWidth: '94%'
    }
  }, titulo), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 16,
      fontSize: fitI(bajada, [[80, 17], [125, 15.5]], 14),
      maxWidth: '84%'
    }
  }, bajada)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--grey)'
    }
  }, cta, " \u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10,
      letterSpacing: '0.08em',
      color: 'var(--text-muted-on-inverse)',
      whiteSpace: 'nowrap'
    }
  }, handle)));
}

/* ── po-28 · Proceso en 3 pasos con iconos ─────────────────────────
   Una linea por paso (la que explica de verdad es po-31). Cuadrado de 62
   con radio 14 y el numero en un circulo que sobresale arriba a la izquierda. */
function PoProcesoIconos({
  copete,
  titulo,
  pasos,
  cta,
  handle,
  scale
}) {
  const ICOS = ['documento', 'calculadora', 'grafico'];
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 56,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BI
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      marginTop: 28,
      fontSize: fitI(titulo, [[28, 36], [44, 31], [62, 27]], 24),
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      maxWidth: '90%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 24
    }
  }, (pasos || []).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 62,
      height: 62,
      borderRadius: 14,
      background: 'var(--grey)',
      color: 'var(--navy)',
      display: 'grid',
      placeItems: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ICOS[i] || 'tilde',
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -8,
      left: -8,
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--navy)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 11,
      display: 'grid',
      placeItems: 'center'
    }
  }, i + 1)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16.5,
      fontWeight: 400,
      color: 'var(--ink)',
      lineHeight: 1.32,
      minWidth: 0
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 20px',
      background: 'var(--navy)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey)',
      flexShrink: 0
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-29 · Icono lateral + frase ─────────────────────────────────
   Navy. El icono va a 80, suelto (sin aro ni caja) y corrido 14 a la
   izquierda del margen: alineacion optica contra el texto. */
function PoIconoFrase({
  copete,
  frase,
  cta,
  handle,
  icono,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 60,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BI
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--grey)',
      marginBottom: 28,
      marginLeft: -14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icono || 'escudo',
    size: 80
  })), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitI(frase, [[38, 40], [58, 34], [82, 29]], 25),
      fontWeight: 700,
      lineHeight: 1.14,
      letterSpacing: '-0.01em'
    }
  }, frase)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--grey)'
    }
  }, cta, " \u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10,
      letterSpacing: '0.08em',
      color: 'var(--text-muted-on-inverse)',
      whiteSpace: 'nowrap'
    }
  }, handle)));
}

/* ── po-30 · Grid 2x2 de iconos ────────────────────────────────────
   Cuatro fichas con filete y radio 10. Icono arriba, etiqueta abajo, con el
   espacio repartido: las cuatro quedan de igual alto aunque el texto no. */
function PoGridIconos({
  copete,
  titulo,
  labels,
  handle,
  scale
}) {
  const ICOS = ['documento', 'balanza', 'equipo', 'buscar'];
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 56,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BI
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      marginTop: 28,
      fontSize: fitI(titulo, [[30, 34], [46, 30], [64, 26]], 23),
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      maxWidth: '90%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginTop: 28,
      marginBottom: 16
    }
  }, (labels || []).map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      border: '1px solid var(--hair)',
      borderRadius: 10,
      padding: '20px 18px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--navy)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ICOS[i] || 'tilde',
    size: 34
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink)',
      lineHeight: 1.25
    }
  }, l)))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}
Object.assign(window, {
  PoIconoHero,
  PoProcesoIconos,
  PoIconoFrase,
  PoGridIconos
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-iconos.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-manual-v2.babel.js
try { (() => {
// plates-manual.jsx — LAS OCHO PLANTILLAS DE FEED DEL MANUAL DE MARCA 2026.
//
// Estas son las placas oficiales, recreadas midiendo los JPG originales
// (Manual de Marca 2026 / REDES / Feed, 1080x1350). Los originales quedaron
// en assets/referencia-feed/ para comparar.
//
// Todas son 4:5. Diferencias con las plantillas del repo de automatizaciones:
//   · el papel es #f0edee, un punto mas calido que el de documento;
//   · la marca de agua es GIGANTE y recortada, no un detalle de esquina;
//   · el titular puede ir en dos tonos dentro de la misma frase;
//   · se usa italica (Chivo oblicua) como tercer nivel del titular;
//   · NO hay chips, ni capsulas, ni pie con @handle. Ninguna de las ocho.
//   · se usa foto a sangre, oscurecida y en tono frio.
// Los componentes del design system se resuelven en render (no al evaluar el
// módulo): así este archivo es inofensivo si se evalúa antes que el bundle.
const DS = n => function DSComp(props) {
  const C = (window.MDOConsultoresDesignSystem_cc21de || {})[n];
  return C ? React.createElement(C, props) : null;
};
const Plate = DS('Plate'),
  Lockup = DS('Lockup'),
  IsoWatermark = DS('IsoWatermark'),
  Slot = DS('Slot');
const BM = '../../assets/logos';
const fit = (t, steps, fb) => window.fitSize(t, steps, fb);

// Padding real de las placas del manual: 130px sobre 1080 = 64 en base 540.
const PAD = 64;

// La marca de agua del manual: el isotipo a ~1.7 veces el lienzo, recortado.
// A 0.05 sobre #f0edee da el #e6e3e4 medido en el original.
function Watermark({
  variant = 'a'
}) {
  const pos = variant === 'a' ? {
    top: -70,
    left: -150
  } : {
    top: -40,
    right: -170
  };
  return /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 900,
    opacity: 0.05,
    tone: "navy",
    base: BM,
    style: pos
  });
}

// Foto a sangre. El manual usa foto real (edificios, manos, oficina) siempre
// oscurecida y con velo navy: nunca la foto cruda.
function Photo({
  caption,
  src,
  dark = 0.52
}) {
  if (!src) {
    return /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: 'var(--gradient-navy)'
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: caption || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--navy)',
      opacity: dark
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top,rgba(0,8,29,0.55),transparent 60%)'
    }
  }));
}
const Z = {
  position: 'relative',
  zIndex: 1
};

/* ── mn-01 · Apertura de marca ─────────────────────────────────────
   Degrade navy y el lockup centrado. Abre carrusel o presenta la cuenta. */
function MnApertura({
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: 0,
    scale: scale,
    style: {
      background: 'var(--gradient-navy)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    tone: "paper",
    height: 82,
    base: BM
  })));
}

/* ── mn-02 · Noticia normativa ─────────────────────────────────────
   Degrade navy · fecha en italica · titular en dos tonos · filete vertical
   · cuerpo · cierre en negrita. Es la plantilla mas usada del manual. */
function MnNoticia({
  fecha,
  titular_1,
  titular_2,
  cuerpo,
  cierre,
  scale
}) {
  const largo = String(titular_1 || '').length + String(titular_2 || '').length;
  const cuerpoTit = largo <= 40 ? 37 : largo <= 62 ? 32 : largo <= 84 ? 27 : 23;
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: PAD,
    scale: scale,
    style: {
      background: 'var(--gradient-navy)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 15,
      letterSpacing: '0.02em',
      color: 'var(--feed-meta)'
    }
  }, fecha), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: cuerpoTit,
      lineHeight: 1.06,
      letterSpacing: '-0.015em',
      color: 'var(--paper)',
      textWrap: 'balance'
    }
  }, titular_1), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: cuerpoTit,
      lineHeight: 1.06,
      letterSpacing: '-0.015em',
      color: 'var(--feed-title-2)',
      textWrap: 'balance'
    }
  }, titular_2)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 58,
      background: 'rgba(248,246,246,0.38)',
      margin: '30px 0 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: fit(cuerpo, [[130, 15], [200, 14]], 13),
      lineHeight: 1.5,
      color: '#b8c0ca',
      maxWidth: '94%',
      textWrap: 'pretty'
    }
  }, cuerpo)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14.5,
      lineHeight: 1.4,
      color: 'var(--paper)',
      maxWidth: '88%'
    }
  }, cierre));
}

/* ── mn-03 · MDO Explica ───────────────────────────────────────────
   Papel, marca de agua gigante, volanta con barra vertical, y el titular
   alineado a la DERECHA en tres pesos: negrita mayusculas, negrita, italica. */
function MnExplica({
  volanta,
  titular_1,
  titular_2,
  titular_3,
  bajada_1,
  bajada_2,
  scale
}) {
  const largo = [titular_1, titular_2, titular_3].join('').length;
  const t = largo <= 54 ? 25 : largo <= 76 ? 22 : 19;
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: PAD,
    tone: "paper",
    scale: scale,
    style: {
      background: 'var(--paper-feed)'
    }
  }, /*#__PURE__*/React.createElement(Watermark, {
    variant: "a"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 26,
      background: 'var(--navy)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: '0.19em',
      textTransform: 'uppercase',
      color: 'var(--navy)'
    }
  }, volanta)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      textAlign: 'right',
      paddingBottom: 46
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: t,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: 'var(--feed-ink)'
    }
  }, titular_1), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: t,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      color: 'var(--feed-ink)'
    }
  }, titular_2), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: t,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      color: 'var(--feed-ink)'
    }
  }, titular_3), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 0',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.45,
      color: 'var(--feed-sub)'
    }
  }, bajada_1, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--feed-ink)',
      fontWeight: 700
    }
  }, bajada_2))));
}

/* ── mn-04 · Servicios ─────────────────────────────────────────────
   Degrade claro (blanco abajo a la izquierda, gris frio a la derecha),
   marca de agua, volanta, titulo en mayusculas y filete CORTO debajo. */
function MnServicio({
  volanta,
  titulo,
  cuerpo,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: PAD,
    scale: scale,
    style: {
      background: 'var(--gradient-light)'
    }
  }, /*#__PURE__*/React.createElement(Watermark, {
    variant: "b"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--navy)'
    }
  }, volanta), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: fit(titulo, [[18, 24], [26, 21], [36, 18]], 16),
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      lineHeight: 1.14,
      color: 'var(--navy)'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 1,
      background: 'var(--navy)',
      margin: '16px 0 16px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--feed-body-light)',
      maxWidth: '80%',
      textWrap: 'pretty'
    }
  }, cuerpo)));
}

/* ── mn-05 · Frase de marca ────────────────────────────────────────
   Papel, marca de agua gigante, isotipo y el claim en gris calido.
   Es la unica placa donde el claim NO va en navy. */
function MnFrase({
  claim_1,
  claim_2,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: PAD,
    tone: "paper",
    scale: scale,
    style: {
      background: 'var(--paper-feed)'
    }
  }, /*#__PURE__*/React.createElement(Watermark, {
    variant: "a"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: 136
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "isotipo",
    tone: "navy",
    height: 30,
    base: BM,
    style: {
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: fit(claim_1 + claim_2, [[36, 23], [52, 20]], 18),
      lineHeight: 1.2,
      letterSpacing: '-0.005em',
      color: 'var(--feed-claim)'
    }
  }, claim_1, /*#__PURE__*/React.createElement("br", null), claim_2)));
}

/* ── mn-06 · Frase sobre foto ──────────────────────────────────────
   Foto a sangre y el claim centrado en blanco. Sin logo. */
function MnFraseFoto({
  claim_1,
  claim_2,
  foto,
  foto_src,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: PAD,
    scale: scale,
    style: {
      background: 'var(--navy)'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    caption: foto,
    src: foto_src,
    dark: 0.34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: fit(claim_1 + claim_2, [[40, 21], [56, 18]], 16),
      lineHeight: 1.25,
      color: 'var(--paper)',
      textShadow: '0 1px 14px rgba(0,8,29,0.5)'
    }
  }, claim_1, /*#__PURE__*/React.createElement("br", null), claim_2)));
}

/* ── mn-07 · Claim institucional sobre foto ────────────────────────
   Foto oscura, claim de tres lineas a la derecha (negrita / italica /
   negrita con una palabra en mayusculas) e isotipo abajo a la derecha. */
function MnClaimFoto({
  claim_1,
  claim_2,
  claim_3,
  destacado,
  foto,
  foto_src,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: PAD,
    scale: scale,
    style: {
      background: 'var(--navy)'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    caption: foto,
    src: foto_src,
    dark: 0.55
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 25,
      lineHeight: 1.12,
      color: 'var(--paper)'
    }
  }, claim_1), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 1.3,
      color: 'var(--paper)',
      marginTop: 3
    }
  }, claim_2), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      lineHeight: 1.3,
      color: 'var(--paper)',
      marginTop: 3
    }
  }, claim_3, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'uppercase'
    }
  }, destacado))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "isotipo",
    tone: "paper",
    height: 36,
    base: BM
  })));
}

/* ── mn-08 · Institucional con lockup secundario ───────────────────
   Foto oscura, el lockup de los tres apellidos arriba a la izquierda y el
   rubro abajo a la derecha en versalitas muy abiertas. */
function MnInstitucional({
  rubro,
  foto,
  foto_src,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    pad: PAD,
    scale: scale,
    style: {
      background: 'var(--navy)'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    caption: foto,
    src: foto_src,
    dark: 0.58
  }), /*#__PURE__*/React.createElement("div", {
    style: Z
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "secundario",
    tone: "paper",
    height: 48,
    base: BM
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...Z,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--paper)'
    }
  }, rubro)));
}
Object.assign(window, {
  MnApertura,
  MnNoticia,
  MnExplica,
  MnServicio,
  MnFrase,
  MnFraseFoto,
  MnClaimFoto,
  MnInstitucional
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-manual-v2.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-marketing.babel.js
try { (() => {
// plates-marketing.jsx — TANDA 3: las 3 plantillas de marketing y autoridad
// (po-34, po-35, po-36). Recreadas leyendo templates-marketing.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// Adaptaciones de marca v2.0 (iguales en todas las tandas):
//   Montserrat        → Open Sans  (--font-display / --font-body)
//   Geist Mono        → Chivo 700 versalitas (--font-accent)
//   Instrument Serif  → Chivo 300 italica
//   #1f4e79 y cia     → tokens de la paleta oficial
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  PlateHeader,
  HandleFooter,
  Display,
  Lede,
  IsoWatermark
} = NS;
const BK = '../../assets/logos';
const fitK = (t, s, f) => window.fitSize(t, s, f);
const rotK = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)',
  fontWeight: 700,
  fontSize: size,
  letterSpacing: ls || '0.2em',
  textTransform: 'uppercase',
  color
});
const itaK = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)',
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: size,
  lineHeight: lh || 1.2,
  color
});

/* ── po-34 · Mito vs realidad ──────────────────────────────────────
   Distinta de po-32: ahi se eligen dos opciones validas, aca se corrige una
   creencia equivocada. El mito va apagado y tachado; la realidad en navy. */
function PoMitoRealidad({
  copete,
  titulo,
  mito,
  realidad,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 50,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BK
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      marginTop: 24,
      fontSize: fitK(titulo, [[26, 38], [42, 33], [60, 28]], 25),
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      maxWidth: '92%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px',
      background: 'var(--grey-pale)',
      border: '1px solid var(--hair)',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      border: '1px solid var(--ink-35)',
      color: 'var(--ink-35)',
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("span", {
    style: rotK(9.5, 'var(--ink-35)')
  }, "El mito")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: fitK(mito, [[70, 17], [110, 15.5]], 14),
      fontWeight: 400,
      color: 'var(--ink-55)',
      lineHeight: 1.38,
      textDecoration: 'line-through',
      textDecorationColor: 'var(--ink-15)'
    }
  }, mito)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 24px',
      background: 'var(--navy)',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--grey)',
      color: 'var(--navy)',
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: rotK(9.5, 'var(--grey)')
  }, "La realidad")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: fitK(realidad, [[70, 17], [110, 15.5]], 14),
      fontWeight: 600,
      color: 'var(--paper)',
      lineHeight: 1.38
    }
  }, realidad))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      borderTop: '1px solid var(--hair)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--navy)'
    }
  }, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10,
      letterSpacing: '0.08em',
      color: 'var(--ink-55)',
      whiteSpace: 'nowrap'
    }
  }, handle)));
}

/* ── po-35 · Errores frecuentes ────────────────────────────────────
   Tres fichas blancas sobre fondo tint. Cada una: numero en circulo navy,
   el error en negrita y la correccion debajo con guion. */
function PoErrores({
  copete,
  titulo,
  items,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "tint",
    pad: 50,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BK
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      marginTop: 24,
      fontSize: fitK(titulo, [[28, 38], [44, 33], [62, 29]], 25),
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      maxWidth: '92%'
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 12,
      marginTop: 8
    }
  }, (items || []).map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#fff',
      border: '1px solid var(--hair)',
      borderRadius: 4,
      padding: '16px 18px',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--navy)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-accent)',
      fontWeight: 700,
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--ink)',
      lineHeight: 1.28
    }
  }, it.error), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      display: 'flex',
      gap: 7,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 7,
      width: 9,
      height: 1,
      background: 'var(--slate)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--ink-55)',
      lineHeight: 1.4
    }
  }, it.fix)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 20px',
      background: 'var(--navy)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey)',
      flexShrink: 0
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-36 · Testimonio de cliente ─────────────────────────────────
   Prueba social SIN nombre propio: sector + tamano, para no exponer al
   cliente. Es criterio del estudio, no una limitacion de la plantilla. */
function PoTestimonio({
  copete,
  testimonio,
  cliente_tipo,
  cliente_detalle,
  servicio,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 52,
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 300,
    opacity: 0.06,
    tone: "paper",
    base: BK,
    style: {
      right: -95,
      bottom: 60
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BK
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: 96,
      lineHeight: 0.7,
      color: 'var(--grey)',
      opacity: 0.55,
      marginBottom: 4,
      marginLeft: -6
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("div", {
    style: itaK(fitK(testimonio, [[70, 34], [110, 29], [160, 25]], 22), 'var(--paper)', 1.2)
  }, testimonio), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 8,
      width: 26,
      height: 1,
      background: 'var(--grey)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      fontWeight: 700,
      color: 'var(--paper)'
    }
  }, cliente_tipo), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted-on-inverse)'
    }
  }, cliente_detalle)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      borderTop: '1px solid var(--rule-on-inverse)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: rotK(9.5, 'var(--grey)', '0.18em')
  }, servicio), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10,
      letterSpacing: '0.08em',
      color: 'var(--text-muted-on-inverse)',
      whiteSpace: 'nowrap'
    }
  }, handle)));
}
Object.assign(window, {
  PoMitoRealidad,
  PoErrores,
  PoTestimonio
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-marketing.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-originales.babel.js
try { (() => {
// plates-originales.jsx — TANDA 1: las 7 plantillas "originales" del repo que
// faltaban. Recreadas leyendo el JSX de mdo-automatizaciones-redes
// (templates-portrait.jsx, templates-news.jsx, templates-story.jsx), valor por
// valor: paddings, alturas, saltos de fitSize y margenes minimos.
//
// Adaptaciones de marca (v2.0), las mismas en las tres tandas:
//   Montserrat        → Open Sans  (--font-display / --font-body)
//   Geist Mono        → Chivo 700 versalitas (--font-accent)
//   Instrument Serif  → Chivo 300 italica (--font-accent, fontStyle italic)
//   #1f4e79 y cia     → tokens de la paleta oficial
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  PlateHeader,
  Chip,
  HandleFooter,
  SourceFooter,
  Slot,
  Eyebrow,
  Display,
  Lede,
  Rule,
  IsoWatermark,
  Lockup
} = NS;
const BO = '../../assets/logos';
const fitO = (t, s, f) => window.fitSize(t, s, f);

// El rol que en el repo cumplia Instrument Serif italic. El manual no define
// serif, pero SI usa italica: Chivo 300 oblicua.
const acentoIta = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)',
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: size,
  lineHeight: lh || 1.02,
  color,
  letterSpacing: '-0.015em'
});
// El rol que cumplia Geist Mono: rotulo corto en versalitas.
const rotulo = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)',
  fontWeight: 700,
  fontSize: size,
  letterSpacing: ls || '0.1em',
  textTransform: 'uppercase',
  color
});

/* ── sq-12 · Noticia square (la del newsletter de Gmail) ────────────
   Margen minimo 72: es el mas alto de todo el catalogo. */
function SqNoticia({
  categoria,
  titular,
  bajada,
  fuente,
  fecha,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "white",
    pad: 72,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: "Noticia",
    base: BO
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: 'var(--navy-lift)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, null, categoria)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitO(titular, [[30, 38], [46, 33], [66, 28]], 24),
      fontWeight: 700,
      letterSpacing: '-0.018em',
      lineHeight: 1.1
    }
  }, titular), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 14,
      fontSize: fitO(bajada, [[80, 14.5], [130, 13.5]], 12.5),
      maxWidth: '94%'
    }
  }, bajada)), /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: fecha
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    style: {
      marginTop: 8
    }
  }));
}

/* ── po-04 · Guia rapida / Servicio ────────────────────────────────
   Margen minimo 68. Los bullets van numerados y centrados en su bloque. */
function PoServicio({
  copete,
  titulo,
  bajada,
  bullet_1,
  bullet_2,
  bullet_3,
  bullet_4,
  cta,
  handle,
  scale
}) {
  const bullets = [bullet_1, bullet_2, bullet_3, bullet_4].filter(Boolean);
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 68,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BO
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitO(titulo, [[16, 52], [28, 44], [40, 37]], 31),
      fontWeight: 700,
      lineHeight: 1.06,
      whiteSpace: 'pre-line'
    }
  }, titulo), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 14,
      fontSize: fitO(bajada, [[70, 16], [110, 14.5]], 13.5),
      maxWidth: '90%'
    }
  }, bajada)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 1,
      background: 'var(--navy)',
      marginTop: 24
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 13
    }
  }, bullets.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...rotulo(11, 'var(--navy-lift)', '0.04em'),
      minWidth: 22,
      flexShrink: 0
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--ink)',
      lineHeight: 1.4
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      background: 'var(--navy)',
      color: 'var(--paper)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700
    }
  }, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey)',
      flexShrink: 0
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-05 · Anuncio institucional ─────────────────────────────────
   Navy con marca de agua y una grilla de dos columnas: rotulo / valor. */
function PoAnuncio({
  copete,
  titulo,
  subtitulo,
  tema,
  bloque_1,
  bloque_2,
  bloque_3,
  fecha_hora,
  handle,
  scale
}) {
  const bloques = [bloque_1, bloque_2, bloque_3].filter(Boolean);
  const lbl = rotulo(10.5, 'var(--text-muted-on-inverse)');
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 360,
    opacity: 0.06,
    tone: "paper",
    base: BO,
    style: {
      right: -100,
      bottom: -60
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BO
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true,
    style: {
      marginBottom: 20
    }
  }, "Anuncio"), /*#__PURE__*/React.createElement("div", {
    style: acentoIta(fitO(titulo, [[16, 66], [28, 52], [42, 42]], 34), 'var(--paper)', 1.0)
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotulo(13, 'var(--text-muted-on-inverse)', '0.18em'),
      marginTop: 10
    }
  }, subtitulo), /*#__PURE__*/React.createElement(Rule, {
    onInverse: true,
    strong: true,
    style: {
      marginTop: 24,
      marginBottom: 20,
      width: '60%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '104px 1fr',
      rowGap: 12,
      columnGap: 16,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--paper)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Tema"), /*#__PURE__*/React.createElement("div", null, tema), /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Bloques"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, bloques.map((b, i) => /*#__PURE__*/React.createElement(Chip, {
    key: i,
    onInverse: true,
    style: {
      fontSize: 9.5
    }
  }, b))), /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Cu\xE1ndo"), /*#__PURE__*/React.createElement("div", null, fecha_hora))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  })));
}

/* ── po-06 · Voz experta / Equipo ──────────────────────────────────
   Foto de 320 arriba, ficha abajo. La bio se estira y los tags quedan al pie. */
function PoEquipo({
  copete,
  nombre,
  rol,
  bio,
  tag_1,
  tag_2,
  tag_3,
  tag_4,
  foto_caption,
  handle,
  scale
}) {
  const tags = [tag_1, tag_2, tag_3, tag_4].filter(Boolean);
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 0,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 320,
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Slot, {
    caption: "",
    height: "100%",
    style: {
      border: 'none',
      borderRadius: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 12,
      top: 12,
      ...rotulo(10, 'var(--ink-55)', '0.06em')
    }
  }, foto_caption), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 36,
      top: 24
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BO
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 36,
      bottom: 18
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    solid: true
  }, copete))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '26px 40px 28px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: acentoIta(fitO(nombre, [[16, 44], [26, 37], [36, 31]], 27), 'var(--navy)', 1.02)
  }, nombre), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotulo(11, 'var(--navy-lift)', '0.18em'),
      marginTop: 6
    }
  }, rol), /*#__PURE__*/React.createElement(Rule, {
    style: {
      marginTop: 16,
      marginBottom: 14,
      width: '40%'
    }
  }), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      flex: 1,
      fontSize: fitO(bio, [[130, 14.5], [190, 13.5]], 12.5)
    }
  }, bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 14
    }
  }, tags.map((a, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      ...rotulo(10, 'var(--navy)'),
      padding: '4px 8px',
      border: '1px solid var(--hair-2)',
      whiteSpace: 'nowrap'
    }
  }, a))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  })));
}

/* ── po-16 · Spotlight de servicio ─────────────────────────────────
   Margen minimo 64. Navy, titulo en italica grande y nada mas. */
function PoSpotlight({
  copete,
  titulo,
  bajada,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 64,
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 420,
    opacity: 0.07,
    tone: "paper",
    base: BO,
    style: {
      right: -120,
      bottom: -80
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BO
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: acentoIta(fitO(titulo, [[16, 64], [26, 54], [38, 44]], 36), 'var(--paper)', 1.02)
  }, titulo), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 22,
      fontSize: fitO(bajada, [[80, 17], [125, 15.5]], 14),
      maxWidth: '86%',
      lineHeight: 1.45
    }
  }, bajada)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  })));
}

/* ── st-08 · Cita vertical ─────────────────────────────────────────
   Story: padding de zona segura 120/40/155. La comilla cuelga a proposito. */
function StCita({
  copete,
  cita,
  autor,
  rol_autor,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "white",
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BO
  }), /*#__PURE__*/React.createElement(Chip, null, "Pensamiento")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: 180,
      lineHeight: 0.7,
      color: 'var(--grey)',
      position: 'absolute',
      top: -50,
      left: -10,
      zIndex: 0
    }
  }, "\u201C"), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 26,
      position: 'relative'
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      ...acentoIta(fitO(cita, [[58, 52], [95, 44], [140, 37]], 30), 'var(--navy)', 1.08),
      position: 'relative'
    }
  }, cita), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 1,
      background: 'var(--navy)',
      marginTop: 9,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--navy)'
    }
  }, autor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--ink-55)',
      marginTop: 2
    }
  }, rol_autor)))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── st-09 · CTA / Consultanos ─────────────────────────────────────
   Titular de tres lineas: el cuerpo lo manda la linea mas larga, y la del
   medio va en italica y un 28% mas grande. Canales en tabla navy. */
function StCTA({
  copete,
  titular_1,
  titular_2,
  titular_3,
  bajada,
  canal_1_label,
  canal_1_valor,
  canal_2_label,
  canal_2_valor,
  canal_3_label,
  canal_3_valor,
  handle,
  scale
}) {
  const canales = [{
    l: canal_1_label,
    v: canal_1_valor
  }, {
    l: canal_2_label,
    v: canal_2_valor
  }, {
    l: canal_3_label,
    v: canal_3_valor
  }].filter(c => c.l && c.v);
  const maxLen = Math.max(String(titular_1 || '').length, String(titular_2 || '').length, String(titular_3 || '').length);
  const h = fitO('x'.repeat(maxLen), [[9, 70], [13, 56], [19, 44]], 36);
  const sans = {
    fontFamily: 'var(--font-display)',
    fontSize: h,
    fontWeight: 700,
    color: 'var(--navy)',
    letterSpacing: '-0.025em',
    lineHeight: 0.98
  };
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "white",
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BO
  }), /*#__PURE__*/React.createElement(Chip, null, "Consultanos")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 16
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: sans
  }, titular_1), /*#__PURE__*/React.createElement("div", {
    style: acentoIta(Math.round(h * 1.28), 'var(--navy-lift)', 0.92)
  }, titular_2), /*#__PURE__*/React.createElement("div", {
    style: sans
  }, titular_3), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 24,
      fontSize: fitO(bajada, [[95, 16], [140, 14.5]], 13.5),
      maxWidth: '90%'
    }
  }, bajada)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy)',
      color: 'var(--paper)',
      padding: '20px 22px'
    }
  }, canales.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      padding: '9px 0',
      borderBottom: i < canales.length - 1 ? '1px solid var(--rule-on-inverse)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...rotulo(10, 'var(--grey)', '0.16em'),
      flexShrink: 0
    }
  }, c.l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      textAlign: 'right',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      minWidth: 0
    }
  }, c.v)))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    style: {
      marginTop: 14
    }
  })));
}
Object.assign(window, {
  SqNoticia,
  PoServicio,
  PoAnuncio,
  PoEquipo,
  PoSpotlight,
  StCita,
  StCTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-originales.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-story-linkedin.babel.js
try { (() => {
// plates-story-linkedin.jsx — historias 9:16 y placas de LinkedIn 1.91:1.
// Composicion tomada de templates-story.jsx y templates-linkedin.jsx del repo
// mdo-automatizaciones-redes, con la paleta y las tipografias de la marca v2.0.
// Los componentes del design system se resuelven en render (no al evaluar el
// módulo): así este archivo es inofensivo si se evalúa antes que el bundle.
const DS = n => function DSComp(props) {
  const C = (window.MDOConsultoresDesignSystem_cc21de || {})[n];
  return C ? React.createElement(C, props) : null;
};
const Plate = DS('Plate'),
  PlateHeader = DS('PlateHeader'),
  Chip = DS('Chip'),
  HandleFooter = DS('HandleFooter'),
  SourceFooter = DS('SourceFooter'),
  BigNumber = DS('BigNumber'),
  Eyebrow = DS('Eyebrow'),
  Display = DS('Display'),
  Lede = DS('Lede'),
  Rule = DS('Rule'),
  IsoWatermark = DS('IsoWatermark'),
  Icon = DS('Icon'),
  Lockup = DS('Lockup');
const BL = '../../assets/logos';

/* ── st-07 · Vencimientos de la semana (story navy) ────────────────── */
function StVencimientos({
  copete,
  semana,
  filas,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "navy",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: semana,
    onInverse: true,
    base: BL
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, (filas || []).map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 18,
      padding: '18px 0',
      borderTop: '1px solid var(--rule-on-inverse)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: 46,
      letterSpacing: '-0.04em',
      lineHeight: 0.9,
      color: 'var(--paper)',
      minWidth: 78,
      fontVariantNumeric: 'tabular-nums'
    }
  }, f.fecha), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 21,
      color: 'var(--paper)',
      lineHeight: 1.15
    }
  }, f.impuesto), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-body-on-inverse)',
      marginTop: 3
    }
  }, f.periodo)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 12,
      letterSpacing: '0.1em',
      color: 'var(--grey)',
      whiteSpace: 'nowrap'
    }
  }, f.hora))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      background: 'var(--paper)',
      color: 'var(--navy)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", null, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true,
    style: {
      marginTop: 14
    }
  })));
}

/* ── st-10 · Encuesta A/B (story papel) ────────────────────────────── */
function StEncuesta({
  copete,
  pregunta,
  opcion_a,
  opcion_b,
  pie,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "paper",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BL
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 30
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 1,
    style: {
      fontSize: 46
    }
  }, pregunta), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [opcion_a, opcion_b].map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      border: '1px solid var(--hair-2)',
      borderRadius: 'var(--r-xs)',
      padding: '20px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      background: i === 0 ? 'var(--grey-pale)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 900,
      fontSize: 20,
      color: 'var(--slate)'
    }
  }, i === 0 ? 'A' : 'B'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      color: 'var(--ink)'
    }
  }, o)))), /*#__PURE__*/React.createElement(Lede, {
    size: "note",
    style: {
      fontSize: 14
    }
  }, pie)), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── li-01 · Noticia normativa (LinkedIn, blanco) ─────────────────── */
function LiNoticia({
  categoria,
  titular,
  bajada,
  fuente,
  fecha,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "linkedin",
    tone: "white",
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 210,
    opacity: 0.05,
    tone: "navy",
    base: BL,
    style: {
      right: -52,
      bottom: -30
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 4,
      background: 'var(--gradient-navy-h)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "isotipo",
    height: 28,
    base: BL
  }), /*#__PURE__*/React.createElement(Eyebrow, null, categoria)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
      paddingRight: 60
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: window.fitSize(titular, [[32, 34], [50, 29], [70, 25]], 22),
      letterSpacing: '-0.022em'
    }
  }, titular), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 12,
      fontSize: 13,
      maxWidth: '92%'
    }
  }, bajada)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: fecha
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    style: {
      marginTop: 8
    }
  })));
}

/* ── li-02 · Claim institucional (LinkedIn, navy) ─────────────────── */
function LiClaim({
  copete,
  claim,
  servicio_1,
  servicio_2,
  servicio_3,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "linkedin",
    tone: "navy",
    scale: scale,
    style: {
      flexDirection: 'row',
      gap: 30,
      backgroundImage: 'linear-gradient(to right,rgba(248,246,246,0.06) 1px,transparent 1px)',
      backgroundSize: '64px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: window.fitSize(claim, [[34, 36], [54, 31], [76, 26]], 23),
      letterSpacing: '-0.022em'
    }
  }, claim)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, [servicio_1, servicio_2, servicio_3].map((s, i) => /*#__PURE__*/React.createElement(Chip, {
    key: i,
    onInverse: true
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 172,
      borderLeft: '1px solid var(--rule-on-inverse)',
      paddingLeft: 26,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "secundario",
    tone: "paper",
    height: 40,
    base: BL,
    style: {
      width: '100%',
      height: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13,
      color: 'var(--paper)',
      lineHeight: 1.3
    }
  }, cta), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--font-accent)',
      fontSize: 9.5,
      letterSpacing: '0.08em',
      color: 'var(--text-muted-on-inverse)'
    }
  }, handle))));
}

/* ── li-03 · Dato clave (LinkedIn, papel) ─────────────────────────── */
function LiDato({
  categoria,
  numero,
  unidad,
  descripcion,
  fuente,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "linkedin",
    tone: "paper",
    scale: scale,
    style: {
      flexDirection: 'row',
      gap: 22,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(BigNumber, {
    size: 76,
    unit: unidad
  }, numero)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      borderLeft: '1px solid var(--hair)',
      paddingLeft: 22,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, categoria), /*#__PURE__*/React.createElement(Lockup, {
    variant: "isotipo",
    height: 24,
    base: BL
  })), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      fontSize: 14
    }
  }, descripcion), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: "",
    label: "Fuente"
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    right: "",
    style: {
      marginTop: 6
    }
  }))));
}
Object.assign(window, {
  StVencimientos,
  StEncuesta,
  LiNoticia,
  LiClaim,
  LiDato
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-story-linkedin.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-variants-light.babel.js
try { (() => {
// plates-variants-light.jsx — TANDA 7 (última): las 8 variantes light / minimal.
// Recreadas leyendo templates-variants-light.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// La familia "light" es la versión editorial del catálogo: fondo blanco, filete
// arriba y abajo del contenido, y el recurso tipográfico en itálica en lugar de
// número grande. Se usa cuando la semana ya tuvo dos placas navy seguidas.
//
// Dos arreglos del repo que se conservan acá:
//   · po-13c fue la plantilla que generó las placas de junio con el hueco
//     vertical: tenía un <div style={{flex:1}}/> que empujaba el título arriba
//     y el cierre abajo. El contenido es un único grupo centrado.
//     (Para noticias nuevas conviene po-13d, que es la v2.)
//   · st-07b y st-08c usaban padding 40/50, que dejaba el lockup y el pie
//     DEBAJO de la interfaz de Instagram. Ahora usan el padding de zona segura.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  PlateHeader,
  HandleFooter,
  SourceFooter,
  Eyebrow,
  Display,
  Lede,
  Lockup
} = NS;
const BL2 = '../../assets/logos';
const fitL = (t, s, f) => window.fitSize(t, s, f);
const rotL = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)',
  fontWeight: 700,
  fontSize: size,
  letterSpacing: ls || '0.12em',
  textTransform: 'uppercase',
  color
});
const itaL = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)',
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: size,
  lineHeight: lh || 1.1,
  color
});
const HAIR = {
  height: 1,
  background: 'var(--hair)'
};
const HAIR_NAVY = {
  height: 1,
  background: 'var(--navy)'
};

/* ── sq-01b · Vencimiento en papel (variante de sq-01) ─────────────── */
function SqVencimientoLight({
  copete,
  dia,
  mes,
  anio,
  impuesto,
  descripcion,
  horario,
  chip_mes,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "white",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: chip_mes,
    base: BL2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 18,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: fitL(dia, [[2, 180], [3, 140]], 108),
      letterSpacing: '-0.04em',
      lineHeight: 0.85,
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--navy)'
    }
  }, dia), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(14, 'var(--navy-lift)', '0.22em'),
      fontWeight: 400
    }
  }, mes), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(11, 'var(--ink-55)', '0.18em'),
      fontWeight: 400
    }
  }, anio))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR_NAVY,
      margin: '6px 0 16px'
    }
  }), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitL(impuesto, [[6, 58], [13, 46], [22, 36]], 30),
      fontWeight: 600,
      marginBottom: 10,
      lineHeight: 1.05
    }
  }, impuesto), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      fontSize: fitL(descripcion, [[46, 16], [70, 14.5]], 13.5),
      maxWidth: '88%'
    }
  }, descripcion), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--navy-lift)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...rotL(11.5, 'var(--navy-lift)', '0.1em'),
      fontWeight: 400
    }
  }, horario))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── sq-02c · Cita minimal (variante de sq-02) ─────────────────────────
   Sin comilla decorativa: el filete arriba y abajo hace todo el trabajo. */
function SqCitaMinimal({
  copete,
  cita,
  autor,
  rol_autor,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "white",
    pad: 50,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BL2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(11, 'var(--ink-55)', '0.1em'),
      whiteSpace: 'nowrap'
    }
  }, "Reflexi\xF3n")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR,
      marginTop: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 18
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: itaL(fitL(cita, [[58, 40], [95, 34], [140, 29]], 25), 'var(--ink)', 1.14)
  }, cita)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--ink)'
    }
  }, autor), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(10, 'var(--ink-55)'),
      marginTop: 3
    }
  }, rol_autor)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10,
      letterSpacing: '0.08em',
      color: 'var(--ink-55)',
      whiteSpace: 'nowrap'
    }
  }, handle)));
}

/* ── sq-03c · Número en blanco puro (variante de sq-03) ────────────── */
function SqNumeroLight({
  copete,
  numero,
  unidad,
  descripcion,
  pie,
  handle,
  scale
}) {
  const n = fitL(numero, [[2, 200], [3, 172], [4, 142]], 116);
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "white",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BL2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(11, 'var(--ink-55)', '0.1em'),
      whiteSpace: 'nowrap'
    }
  }, pie)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 300,
      fontSize: n,
      letterSpacing: '-0.04em',
      lineHeight: 0.85,
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--navy)'
    }
  }, numero), /*#__PURE__*/React.createElement("div", {
    style: itaL(Math.round(n * 0.22 + 22), 'var(--navy-lift)', 1)
  }, unidad)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR,
      width: 64,
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      fontSize: fitL(descripcion, [[70, 17], [110, 15.5]], 14),
      maxWidth: '90%'
    }
  }, descripcion)), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── sq-12c · Noticia square minimal (variante de sq-12) ───────────── */
function SqNoticiaMinimal({
  categoria,
  titular,
  bajada,
  fuente,
  fecha,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "white",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BL2
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      whiteSpace: 'nowrap'
    }
  }, categoria)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR_NAVY,
      marginTop: 22,
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitL(titular, [[30, 38], [46, 33], [66, 28]], 24),
      fontWeight: 700,
      letterSpacing: '-0.018em',
      lineHeight: 1.1
    }
  }, titular), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 14,
      fontSize: fitL(bajada, [[80, 15], [130, 13.5]], 12.5),
      maxWidth: '94%'
    }
  }, bajada)), /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: fecha
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-06b · Voz experta sin foto (variante de po-06) ─────────────────
   Cuando no hay retrato disponible: el nombre en itálica grande ocupa el
   lugar que tenía la foto. Mejor esto que un hueco rotulado. */
function PoEquipoNoPhoto({
  copete,
  nombre,
  rol,
  bio,
  tags,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BL2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: itaL(fitL(nombre, [[16, 62], [26, 50], [36, 41]], 0.98), 'var(--ink)', 0.98)
  }, nombre), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(12, 'var(--navy-lift)', '0.2em'),
      marginTop: 14
    }
  }, rol), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR_NAVY,
      width: 56,
      marginTop: 26,
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      fontSize: fitL(bio, [[150, 16], [220, 14.5]], 13.5),
      lineHeight: 1.5
    }
  }, bio)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 4
    }
  }, (tags || []).map((a, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      ...rotL(10, 'var(--navy)', '0.1em'),
      padding: '4px 8px',
      border: '1px solid var(--hair-2)',
      whiteSpace: 'nowrap'
    }
  }, a))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── po-13c · Noticia portrait minimal (variante de po-13d) ────────────
   Ésta es la que generó las placas de junio con el hueco vertical. Ya está
   arreglada, pero para noticias nuevas conviene po-13d, que es la v2. */
function PoNoticiaMinimal({
  categoria,
  titular,
  bajada,
  cierre,
  fuente,
  fecha,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 52,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BL2
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      whiteSpace: 'nowrap'
    }
  }, categoria)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR_NAVY,
      marginTop: 22
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    style: {
      fontSize: fitL(titular, [[34, 44], [52, 38], [72, 33]], 28),
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.07
    }
  }, titular), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      marginTop: 18,
      fontSize: fitL(bajada, [[90, 16], [140, 14.5]], 13.5),
      maxWidth: '96%'
    }
  }, bajada), /*#__PURE__*/React.createElement("div", {
    style: {
      ...itaL(fitL(cierre, [[55, 23], [95, 20]], 18), 'var(--navy-lift)', 1.25),
      marginTop: 26,
      maxWidth: '90%'
    }
  }, cierre)), /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: fecha
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  }));
}

/* ── st-07b · Vencimientos story en papel (variante de st-07) ──────────
   Tres columnas fijas: fecha 72, impuesto flexible, hora 64. La hora nunca
   se comprime; el impuesto es el que cede. */
function StVencimientosLight({
  copete,
  semana,
  filas,
  cta,
  handle,
  chip,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "white",
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: chip || 'Agenda',
    base: BL2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 12
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: itaL(fitL(semana, [[16, 60], [24, 50], [34, 42]], 34), 'var(--ink)', 1.0)
  }, semana), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: HAIR_NAVY
  }), (filas || []).map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '72px 1fr 64px',
      alignItems: 'center',
      gap: 8,
      padding: '15px 0',
      borderBottom: '1px solid var(--hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(13.5, 'var(--navy-lift)', '0.06em'),
      fontWeight: 400
    }
  }, f.fecha), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--ink)',
      letterSpacing: '-0.01em',
      lineHeight: 1.2
    }
  }, f.impuesto), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      color: 'var(--ink-55)',
      marginTop: 2
    }
  }, f.periodo)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontFamily: 'var(--font-accent)',
      fontSize: 11.5,
      letterSpacing: '0.04em',
      color: 'var(--ink-55)',
      whiteSpace: 'nowrap'
    }
  }, f.hora, " h"))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: itaL(26, 'var(--navy-lift)', 1.15)
  }, cta), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    style: {
      marginTop: 16
    }
  })));
}

/* ── st-08c · Cita story minimal (variante de st-08) ───────────────── */
function StCitaMinimal({
  copete,
  cita,
  autor,
  rol_autor,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "white",
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    height: 40,
    base: BL2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(11, 'var(--ink-55)', '0.1em'),
      whiteSpace: 'nowrap'
    }
  }, "Reflexi\xF3n")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR,
      marginTop: 30
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 26
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: itaL(fitL(cita, [[58, 54], [95, 45], [140, 38]], 31), 'var(--ink)', 1.08)
  }, cita)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...HAIR,
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--ink)'
    }
  }, autor), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotL(10.5, 'var(--ink-55)', '0.14em'),
      marginTop: 4
    }
  }, rol_autor)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontSize: 10.5,
      letterSpacing: '0.08em',
      color: 'var(--ink-55)',
      whiteSpace: 'nowrap'
    }
  }, handle)));
}
Object.assign(window, {
  SqVencimientoLight,
  SqCitaMinimal,
  SqNumeroLight,
  SqNoticiaMinimal,
  PoEquipoNoPhoto,
  PoNoticiaMinimal,
  StVencimientosLight,
  StCitaMinimal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-variants-light.babel.js", error: String((e && e.message) || e) }); }

// ui_kits/redes/plates-variants.babel.js
try { (() => {
// plates-variants.jsx — TANDA 6: las 8 variantes de color y composición de
// las plantillas base. Recreadas leyendo templates-variants.jsx del repo
// mdo-automatizaciones-redes, valor por valor.
//
// Una variante no es una plantilla nueva: es la MISMA composición con otro
// fondo o otro recurso tipográfico, y existe para que dos posts seguidos de la
// misma familia no se vean iguales en la grilla del perfil.
//
// Zona segura de stories: el padding 40 dejaba el lockup y el pie DEBAJO de la
// interfaz de Instagram (tapa ~111px arriba y ~147px abajo en unidades de
// diseño). Las dos stories de acá usan el padding de zona segura.
const NS = window.MDOConsultoresDesignSystem_cc21de;
const {
  Plate,
  PlateHeader,
  Chip,
  HandleFooter,
  SourceFooter,
  Eyebrow,
  Display,
  Lede,
  IsoWatermark,
  Lockup
} = NS;
const BV = '../../assets/logos';
const fitV = (t, s, f) => window.fitSize(t, s, f);
const rotV = (size, color, ls) => ({
  fontFamily: 'var(--font-accent)',
  fontWeight: 700,
  fontSize: size,
  letterSpacing: ls || '0.1em',
  textTransform: 'uppercase',
  color
});
const itaV = (size, color, lh) => ({
  fontFamily: 'var(--font-accent)',
  fontStyle: 'italic',
  fontWeight: 300,
  fontSize: size,
  lineHeight: lh || 1.1,
  color
});

/* ── sq-02b · Cita en navy (variante de sq-02) ─────────────────────── */
function SqCitaNavy({
  copete,
  cita,
  autor,
  rol_autor,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "navy",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    tone: "paper",
    height: 40,
    base: BV
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      ...itaV(96, 'var(--grey)', 0.7),
      marginTop: -16,
      marginRight: -6
    }
  }, "\u201C")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true,
    style: {
      marginBottom: 20
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: itaV(fitV(cita, [[58, 40], [95, 34], [140, 29]], 25), 'var(--paper)', 1.14)
  }, cita), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'var(--paper)',
      marginTop: 8,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: 'var(--paper)'
    }
  }, autor, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 400,
      color: 'var(--text-muted-on-inverse)',
      fontSize: 11.5,
      marginTop: 2,
      letterSpacing: 0
    }
  }, rol_autor)))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  }));
}

/* ── sq-03b · Número en itálica (variante de sq-03) ────────────────────
   La base usa Chivo 300 recto; esta lo pone en oblicua y sobre gris claro. */
function SqNumeroSerif({
  copete,
  numero,
  unidad,
  descripcion,
  pie,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "pale",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: "Est. 1972",
    base: BV
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 16
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      ...itaV(fitV(numero, [[2, 220], [3, 182], [4, 148]], 120), 'var(--navy)', 0.86),
      letterSpacing: '-0.02em'
    }
  }, numero), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: 'var(--font-body)',
      fontSize: 24,
      fontWeight: 400,
      color: 'var(--navy)',
      letterSpacing: '-0.01em'
    }
  }, unidad), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 64,
      background: 'var(--navy)',
      marginTop: 20,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    style: {
      fontSize: fitV(descripcion, [[70, 15], [110, 13.5]], 12.5),
      maxWidth: '90%'
    }
  }, descripcion)), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    right: pie
  }));
}

/* ── sq-12b · Noticia «Último momento» (variante de sq-12) ─────────────
   La única placa con tira superior a sangre: badge a la izquierda y fecha a
   la derecha, sobre gris claro. El resto va en navy. */
function SqNoticiaBreaking({
  badge,
  categoria,
  titular,
  bajada,
  fuente,
  fecha,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "square",
    tone: "navy",
    pad: 0,
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--grey)',
      color: 'var(--navy)',
      padding: '12px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...rotV(11, 'var(--navy)', '0.24em'),
      whiteSpace: 'nowrap'
    }
  }, badge), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontWeight: 400,
      fontSize: 11,
      letterSpacing: '0.12em',
      whiteSpace: 'nowrap'
    }
  }, fecha)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '30px 40px 36px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    tone: "paper",
    height: 40,
    base: BV
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true,
    style: {
      whiteSpace: 'nowrap'
    }
  }, categoria)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitV(titular, [[32, 38], [50, 33], [72, 28]], 24),
      fontWeight: 700,
      letterSpacing: '-0.018em',
      lineHeight: 1.08
    }
  }, titular), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 14,
      fontSize: fitV(bajada, [[85, 14.5], [130, 13.5]], 12.5),
      maxWidth: '95%'
    }
  }, bajada)), /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: fecha,
    onInverse: true
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  })));
}

/* ── po-04b · Guía / Servicio en navy (variante de po-04) ──────────── */
function PoServicioNavy({
  copete,
  titulo,
  bajada,
  bullets,
  cta,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    onInverse: true,
    base: BV
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitV(titulo, [[16, 52], [28, 44], [40, 37]], 31),
      fontWeight: 600,
      whiteSpace: 'pre-line',
      lineHeight: 1.06
    }
  }, titulo), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 14,
      fontSize: fitV(bajada, [[70, 16], [110, 14.5]], 13.5),
      maxWidth: '90%'
    }
  }, bajada)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 56,
      background: 'var(--paper)',
      marginTop: 24
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 13
    }
  }, (bullets || []).map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...rotV(11, 'var(--grey)', '0.04em'),
      minWidth: 22,
      flexShrink: 0
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--paper)',
      lineHeight: 1.4
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      background: 'var(--paper)',
      color: 'var(--navy)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 700
    }
  }, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--navy-lift)',
      flexShrink: 0
    }
  }, "\u2192")), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  }));
}

/* ── po-05b · Anuncio en papel (variante de po-05) ─────────────────── */
function PoAnuncioLight({
  copete,
  titulo,
  subtitulo,
  tema,
  bloques,
  fecha_hora,
  handle,
  scale
}) {
  const lbl = rotV(10.5, 'var(--ink-55)');
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "white",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement(IsoWatermark, {
    size: 360,
    opacity: 0.05,
    tone: "navy",
    base: BV,
    style: {
      right: -100,
      bottom: -60
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: copete,
    base: BV
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, "Anuncio"), /*#__PURE__*/React.createElement("div", {
    style: itaV(fitV(titulo, [[16, 66], [28, 52], [42, 42]], 34), 'var(--ink)', 1.0)
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rotV(13, 'var(--ink-55)', '0.18em'),
      marginTop: 10
    }
  }, subtitulo), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: '60%',
      background: 'var(--navy)',
      marginTop: 24,
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '104px 1fr',
      rowGap: 12,
      columnGap: 16,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--ink)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Tema"), /*#__PURE__*/React.createElement("div", null, tema), /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Bloques"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, (bloques || []).map((b, i) => /*#__PURE__*/React.createElement(Chip, {
    key: i,
    style: {
      fontSize: 9.5
    }
  }, b))), /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Cu\xE1ndo"), /*#__PURE__*/React.createElement("div", null, fecha_hora))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle
  })));
}

/* ── po-13b · Noticia navy con take invertido (variante de po-13d) ─────
   El «qué tenés que saber» va en una caja de papel dentro de la placa navy:
   es el único bloque invertido del catálogo. */
function PoNoticiaNavy({
  categoria,
  titular,
  bajada,
  que_saber_label,
  que_saber,
  fuente,
  fecha,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "portrait",
    tone: "navy",
    pad: 44,
    scale: scale
  }, /*#__PURE__*/React.createElement(PlateHeader, {
    chip: "Noticia \xB7 MDO",
    onInverse: true,
    base: BV
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'var(--grey)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true
  }, categoria)), /*#__PURE__*/React.createElement(Display, {
    level: 2,
    onInverse: true,
    style: {
      fontSize: fitV(titular, [[34, 40], [52, 35], [72, 30]], 26),
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.08
    }
  }, titular), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 16,
      fontSize: fitV(bajada, [[90, 15.5], [140, 14.5]], 13.5),
      maxWidth: '96%'
    }
  }, bajada), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      padding: '18px 22px',
      background: 'var(--paper)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: itaV(22, 'var(--navy-lift)', 0.7)
  }, "*"), /*#__PURE__*/React.createElement("span", {
    style: rotV(10, 'var(--navy-lift)', '0.2em')
  }, que_saber_label)), /*#__PURE__*/React.createElement("div", {
    style: itaV(fitV(que_saber, [[75, 22], [115, 19]], 17), 'var(--ink)', 1.22)
  }, que_saber))), /*#__PURE__*/React.createElement(SourceFooter, {
    fuente: fuente,
    fecha: fecha,
    onInverse: true
  }), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  }));
}

/* ── st-08b · Cita story en navy (variante de st-08) ───────────────── */
function StCitaNavy({
  copete,
  cita,
  autor,
  rol_autor,
  handle,
  scale
}) {
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "navy",
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    tone: "paper",
    height: 40,
    base: BV
  }), /*#__PURE__*/React.createElement(Chip, {
    onInverse: true
  }, "Pensamiento")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      ...itaV(200, 'rgba(217,217,217,0.20)', 0.7),
      position: 'absolute',
      top: -55,
      left: -16,
      zIndex: 0
    }
  }, "\u201C"), /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true,
    style: {
      marginBottom: 26,
      position: 'relative'
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: {
      ...itaV(fitV(cita, [[58, 52], [95, 44], [140, 37]], 30), 'var(--paper)', 1.08),
      position: 'relative'
    }
  }, cita), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 1,
      background: 'var(--paper)',
      marginTop: 9,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--paper)'
    }
  }, autor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted-on-inverse)',
      marginTop: 2
    }
  }, rol_autor)))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true
  }));
}

/* ── st-09b · CTA story en navy (variante de st-09) ────────────────── */
function StCTANavy({
  copete,
  titular_1,
  titular_2,
  titular_3,
  bajada,
  canal_1_label,
  canal_1_valor,
  canal_2_label,
  canal_2_valor,
  canal_3_label,
  canal_3_valor,
  handle,
  scale
}) {
  const canales = [{
    l: canal_1_label,
    v: canal_1_valor
  }, {
    l: canal_2_label,
    v: canal_2_valor
  }, {
    l: canal_3_label,
    v: canal_3_valor
  }].filter(c => c.l && c.v);
  const maxLen = Math.max(String(titular_1 || '').length, String(titular_2 || '').length, String(titular_3 || '').length);
  const h = fitV('x'.repeat(maxLen), [[9, 70], [13, 56], [19, 44]], 36);
  const sans = {
    fontFamily: 'var(--font-display)',
    fontSize: h,
    fontWeight: 700,
    color: 'var(--paper)',
    letterSpacing: '-0.025em',
    lineHeight: 0.98
  };
  return /*#__PURE__*/React.createElement(Plate, {
    format: "story",
    tone: "navy",
    scale: scale
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "principal",
    tone: "paper",
    height: 40,
    base: BV
  }), /*#__PURE__*/React.createElement(Chip, {
    onInverse: true
  }, "Consultanos")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    onInverse: true,
    style: {
      marginBottom: 16
    }
  }, copete), /*#__PURE__*/React.createElement("div", {
    style: sans
  }, titular_1), /*#__PURE__*/React.createElement("div", {
    style: itaV(Math.round(h * 1.28), 'var(--grey)', 0.92)
  }, titular_2), /*#__PURE__*/React.createElement("div", {
    style: sans
  }, titular_3), /*#__PURE__*/React.createElement(Lede, {
    size: "body",
    onInverse: true,
    style: {
      marginTop: 24,
      fontSize: fitV(bajada, [[95, 16], [140, 14.5]], 13.5),
      maxWidth: '90%'
    }
  }, bajada)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      color: 'var(--ink)',
      padding: '20px 22px'
    }
  }, canales.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      padding: '9px 0',
      borderBottom: i < canales.length - 1 ? '1px solid var(--hair)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...rotV(10, 'var(--navy-lift)', '0.16em'),
      flexShrink: 0
    }
  }, c.l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 400,
      color: 'var(--ink)',
      textAlign: 'right',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      minWidth: 0
    }
  }, c.v)))), /*#__PURE__*/React.createElement(HandleFooter, {
    handle: handle,
    onInverse: true,
    style: {
      marginTop: 14
    }
  })));
}
Object.assign(window, {
  SqCitaNavy,
  SqNumeroSerif,
  SqNoticiaBreaking,
  PoServicioNavy,
  PoAnuncioLight,
  PoNoticiaNavy,
  StCitaNavy,
  StCTANavy
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/redes/plates-variants.babel.js", error: String((e && e.message) || e) }); }

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IsoWatermark = __ds_scope.IsoWatermark;

__ds_ns.Lockup = __ds_scope.Lockup;

__ds_ns.BigNumber = __ds_scope.BigNumber;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.HandleFooter = __ds_scope.HandleFooter;

__ds_ns.PageIndex = __ds_scope.PageIndex;

__ds_ns.PLATE_FORMATS = __ds_scope.PLATE_FORMATS;

__ds_ns.Plate = __ds_scope.Plate;

__ds_ns.PlateHeader = __ds_scope.PlateHeader;

__ds_ns.Slot = __ds_scope.Slot;

__ds_ns.SourceFooter = __ds_scope.SourceFooter;

__ds_ns.Display = __ds_scope.Display;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Lede = __ds_scope.Lede;

__ds_ns.Rule = __ds_scope.Rule;

})();

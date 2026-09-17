Isotipo gigante translucido, para la esquina de una placa de redes.

```jsx
<IsoWatermark size={210} opacity={0.05} tone="navy" style={{ right: -52, bottom: -30 }} base="../../assets/logos" />
```

- Va dentro de un contenedor con `position:relative` y `overflow:hidden`.
- Opacidad tipica: 0.05 sobre papel, 0.08 sobre navy (con `tone="paper"`).
- **En las placas del manual va GIGANTE**: `size` de ~1,7 veces el lado del lienzo, posicionada para que se recorte por los bordes (ver `Watermark` en `ui_kits/redes/plates-manual-v2.babel.js`). El detalle de esquina chico es de las plantillas del repo del estudio, no del manual.

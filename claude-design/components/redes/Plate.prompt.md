Artboard de placa de redes: tamano base + fondo + padding minimo.

```jsx
<Plate format="portrait" tone="navy" scale={0.6}>
  <PlateHeader chip="Gestion PyME" onInverse />
  …
  <HandleFooter handle="@mdoconsultores" onInverse />
</Plate>
```

- Tamanos base y salida: square 540→1080x1080 · portrait 540x675→1080x1350 · story 480x853→1080x1920 · linkedin 600x314→1200x628.
- El padding por defecto ya es el margen de seguridad de Instagram. **Nunca lo bajes**: IG recorta los bordes en la grilla del perfil (sq-12 min 72, po-04 min 68, po-16 min 64; historias `120px 40px 155px`).
- `tone="navy"` es el modo institucional; `paper`/`white` el editorial. Una sola de las dos por semana en la grilla, para que dos posts seguidos se distingan.

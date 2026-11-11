Encabezado de placa: lockup a la izquierda, chip a la derecha.

```jsx
<PlateHeader chip="Calendario · 06/26" onInverse base="../../assets/logos" />
```

Va siempre primero dentro de `<Plate>`. El lockup no baja de **40px** de alto: es una sola imagen y mas chico la linea «CONSULTORES» no se lee. Si el header tiene que ser mas bajo, poner el isotipo (`<Lockup variant="isotipo" height={26} />`) en lugar del lockup completo.

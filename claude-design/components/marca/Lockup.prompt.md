Logo de MDO en sus tres formas y tres tintes.

```jsx
<Lockup variant="principal" tone="navy" height={40} base="../../assets/logos" />
<Lockup variant="isotipo" tone="paper" height={56} base="../../assets/logos" />
<Lockup variant="principal" plate="navy" height={120} base="../../assets/logos" />
```

- `variant`: `isotipo` (el monograma solo) · `principal` (MDO / CONSULTORES) · `secundario` (los tres apellidos).
- `tone`: `navy` sobre fondo claro · `paper` sobre navy · `slate` para el lockup principal sobre navy, que es como lo trae el manual.
- `plate` devuelve el archivo con fondo solido tal cual viene del manual: lienzo cuadrado 1080x1080, para foto de perfil o placa.
- `base` es la ruta a `assets/logos` desde la pagina que lo usa.
- **Tamano minimo.** El lockup es una sola imagen: por debajo de ~40px de alto la linea «CONSULTORES» queda ilegible. `principal` y `secundario` **no bajan de 40px**; para un espacio chico (cabecera de app, avatar, favicon) va el `isotipo`, a 26-34px. Es lo que hace la pagina de marca del estudio, que en su slot chico usa el isotipo y no el lockup.
- En `PlateHeader` el lockup va a 26px porque el original de las placas armaba el isotipo mas el wordmark tipografiado aparte. Con el lockup de una pieza: o subis a 40px, o pasas a `variant="isotipo"`.
- Nunca redibujar el logo ni escribir "MDO" a mano donde va la marca: siempre uno de estos archivos. Tampoco escribir «& Asociados»: el lockup vigente dice «Gutierrez Taboada».

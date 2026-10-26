# Videos en Motion

Desde el lunes 02/11/2026 el video de la semana se hace con **Motion**, el tipo de artifact de claude.ai que arma películas por escenas: cámara que recorre, objetos que se transforman, trazos que se dibujan. Juan lo eligió el 26/10/2026 después de compararlo con el formato de receta («me gusta más esta versión»). Quiere **que varíe mucho de una semana a otra**, sin salirse del manual de marca.

La rutina escribe el film como código (una escena por archivo) y lo graba a MP4 sin abrir la página de Motion, con `scripts/motion-video.js`. Este usa el reproductor del propio tipo Motion, así que el video es el mismo que se vería en la página. El MP4 sigue el mismo camino que antes: panel de aprobación, asset del artifact y Metricool al aprobar.

**Ejemplo aprobado:** `motion/ejemplos/reel-laboral/` (Reel del viernes 30/10/2026, «Las tareas cambiaron y la categoría del recibo quedó igual»). Leelo antes de escribir el primer film de la semana: muestra cámara, continuidad entre escenas, trazos y firma. Es una referencia de cómo se construye, **no un molde**: las escenas, la forma y los recursos cambian cada semana.

## Lo que no se negocia

- **Marca**: colores, letras, logos e íconos del design system, y nada más. `motion/base/base.css` ya trae todo eso.
  - En las escenas, nada de hex nuevos: usar las variables (`var(--ground)` navy, `var(--second)` papel, `var(--main)` gris azulado, `var(--accent)` gris, `var(--tinta)`, `var(--suave)`, `var(--tono2)`) o un `color-mix` de ellas.
  - **Un solo acento.**
- **Íconos del design system** (`MDO.icono`). **Nunca emojis**: la guía de voz los excluye y Juan lo confirmó el 26/10/2026.
- **Lo que ya se descartó**:
  - sonido (va una pista muda);
  - encuestas;
  - gente (fotos sin personas);
  - rebotes y desenfoque (nada de `eob` ni `spring`);
  - flashes (nada que parpadee o corte más de 3 veces por segundo).
- **Formas**: esquinas rectas. Sin cápsulas, sin @handle ni web en el video.
- **Firma**: la última escena es el logo principal (`MDO.logo`) y una línea corta, el servicio o el tema. Dura 3 s o más.
- **Texto**: va con la guía de voz (`.claude/brand-voice-guidelines.md`).
  - ARCA, nunca AFIP.
  - Viernes y sábado, sin números ni fechas. Los datos de la fuente sólo van en la noticia.
  - Pasar cada texto por `node scripts/revisar-textos.js --texto "…"`.
- **Zona segura (1080×1920)**: Instagram tapa la franja de arriba de y = 250, la de abajo de y = 1500 y la de la derecha de x = 960. Ahí no va nada que haya que leer. El margen izquierdo es de 60 px o más.
- **Tamaños**: titulares de 72 a 110 px; ningún texto por debajo de 40 px en pantalla (con cámara cuenta el tamaño por el zoom).

## Variedad: cada semana, otro video

Cada film usa **2 o 3 recursos** de esta lista, distintos de los de las últimas 4 semanas. Se miran en el campo `video` del historial y se anotan ahí al terminar (paso 8 de la skill), por ejemplo `motion · camara+trazos+casilleros`.

| Recurso | Qué es |
|---|---|
| `camara` | la cámara recorre un mundo de objetos: empuja a un detalle, panea, se aleja (como el ejemplo) |
| `transformacion` | un objeto se vuelve la idea siguiente: un corchete que se acuesta y es una línea de tiempo, una ficha que se abre en ventana |
| `trazos` | rodear, subrayar, tachar o señalar con flechas que se dibujan (`MDO.ovalo`, `MDO.trazo`) |
| `grafico` | barras que crecen, una línea que se dibuja, una cifra que cuenta. **Sólo con datos de la fuente y sólo en la noticia** (nunca viernes ni sábado) |
| `tipografia` | tipografía cinética: palabras que entran, una frase que se parte para dejar pasar la siguiente, una palabra que queda y pasa a ser el título |
| `papeles` | documentos que se completan, se tildan o se sellan (recibo, F.931, declaración jurada, contrato, balance) |
| `ventana` | una pantalla de sistema estilizada, con campos que se llenan (sin logos de terceros) |
| `casilleros` | línea de tiempo o calendario: casilleros que se encienden, una fecha que avanza, meses hacia atrás |
| `diagrama` | fichas unidas por flechas, un flujo A → B, una balanza, un árbol de decisión |
| `foto` | una foto del banco del design system (`mdo-templates/assets/fotos`, sin gente), con un paneo lento del 1 al 3 % |
| `iconos` | íconos grandes del design system que se dibujan trazo a trazo |
| `cortina` | una banda del color del texto barre la pantalla y deja la escena siguiente |

También varían:

- **El fondo**: navy (`.ground`, familia novedades) o claro (`.ground claro`, familia servicios, con el isotipo grande recortado: `MDO.logo(kit, 'iso', true)`). Se pueden alternar dentro del mismo video si ayuda a contar.
- **Los pasos entre escenas**: transformación, corte en movimiento, cortina, zoom a un detalle, vuelta a plano general.

## Cómo se cuenta

El video cuenta **lo mismo que el post de ese día** (la placa y el texto), con otra forma. Ni otro tema ni otro dato.

El arco: un gancho (el titular, que ya se lee en el primer cuadro), el sujeto (el objeto, el papel, el sistema), lo que pasa, el riesgo o el dato y lo que haría el estudio (en condicional). Al final, la firma.

En total, de 20 a 30 s y de 4 a 6 escenas, con un sujeto y una acción por escena. Algo nuevo cada 2 a 4 s, y después de cada movimiento grande, de 0,6 a 1 s para ubicarse.

## El film: una carpeta

`posts/AAAA-MM-DD-N-motion/` (mismo `N` que el post):

- **`scenes.json`**: la lista de escenas.
  ```json
  {"v":1,"stage":"final","width":1080,"height":1920,"fps":60,"background":"#06162D",
   "look":"en una línea, el estilo de este film",
   "scenes":[{"id":"titulo","name":"El titular","dur":3.2,"desc":"qué pasa, en una oración"}, …]}
  ```
  El `id` va en minúsculas, dígitos y guiones, y empieza con una letra.
- **`scene-<id>.js`**: una escena por archivo.
  ```js
  const { seg, eo, ei, eio, lerp, TextFx } = kit;
  kit.scene('titulo', {
    init(kit) {
      kit.stage.append(kit.h('<div class="ground"><div class="words" style="left:110px;top:640px;width:860px">' +
        '<h1 class="line titulo-a">Las tareas cambiaron</h1></div></div>'));
      this.a = kit.stage.querySelector('.titulo-a');
    },
    render(t) {
      TextFx.fadeFromRight(this.a, t, -0.5);
    },
  });
  ```
- **`shared.js`** (opcional): lo que comparten dos escenas, por ejemplo el encuadre en que termina una y arranca la otra. Se escribe siempre con `Object.assign(window.MDO, { … })`, porque la base ya definió `window.MDO`.
- **`film.css`** (opcional): clases propias de este film.
- **`assets/`** (opcional): las fotos que use, copiadas de `mdo-templates/assets/fotos/`. En la escena van con `kit.assets.url('archivo.jpg')`.

### Reglas del kit

Si no se cumplen, la escena sale como un cartel con su nombre, o el video no queda igual al de la página.

- `render(t)` es **puro**: todo lo que cambia sale de `t`, que son los segundos desde que empezó la escena (puede ser negativo o pasarse del final). Prohibido:
  - transiciones o animaciones CSS;
  - timers;
  - `Math.random` (usar `kit.rng(semilla)`);
  - medir el layout dentro de `render`.
- `init` arma el DOM una sola vez y ahí se puede medir. `this` lleva lo de `init` a `render`.
- Un archivo, un `kit.scene` con su `id`. Las clases propias llevan el prefijo del `id` (`papeles-cam`).
- El markup va en strings con comillas simples, y `style="…"` con comillas dobles y sin comillas adentro.
- **Una línea de texto es un string en un elemento HTML** (nunca `<text>` de SVG). Las líneas que van juntas se ponen en un `.words`, que es una columna: si una se parte en dos renglones, empuja a la de abajo.
- Para animar palabra por palabra: `TextFx.fadeFromRight(el, t, t0, { stagger, dur, dx })` y `TextFx.fadeOutLeft(el, t, t0)`.
- Un `.words` posicionado lleva siempre `width`. Si no, cada palabra cae en su renglón.
- `kit.h` devuelve **un** elemento: hay que envolver todo en una raíz. Cada escena trae su propio fondo (`<div class="ground">` o `ground claro`).
- **Continuidad**: cuando un objeto sigue de una escena a la otra, la segunda arranca con el mismo encuadre y el objeto donde quedó. Ver `MDO.END` en el ejemplo.
- Los trazos con punta redondeada dejan un punto antes de dibujarse: usar `MDO.trazo(path)`, que lo oculta mientras p = 0.

### Ayudas y clases

- **`window.MDO`** (`motion/base/shared.js`):
  - `camAt(claves, t, eio)` y `applyCam(capa, …)`: cámara sobre una capa `.cam`. El punto `(cx, cy)` queda en el centro con zoom `z`.
  - `icono(kit, nombre, px, 'fino')`: los nombres salen de `mdo-templates/iconos-mdo.json`.
  - `logo(kit, 'principal' | 'iso', navy)`.
  - `ovalo(cx, cy, rx, ry)`.
  - `trazo(path)`.
- **Kit**:
  - `seg(t, a, b)`: de 0 a 1 entre `a` y `b`.
  - `lerp` y `clamp01`.
  - `eo` (sale suave), `ei` (entra suave), `eio` (las dos) y `eox` (rápido).
  - `kit.rng(semilla)`, `kit.css(texto)`, `kit.module(nombre)`, `kit.json(nombre)` y `kit.assets.url(nombre)`.
  - ❌ `eob` y `spring`: rebotan.
- **Clases de `base.css`**:
  - texto: `.words`, `.line` (96 px, negrita), `.line2` (segundo tono, peso 300), `.sub` (44 px), `.fuerte`, `.cifra` (240 px, peso 300), `.vol` (volanta en Chivo), `.tag` (rótulo en Chivo), `.fecha` (Chivo itálica);
  - capas y dibujo: `.ground`, `.claro`, `.cam`, `.art` (SVG a pantalla completa), `.ink` / `.ink-dark` (trazos sobre fondo y sobre papel), `.filete`, `.icono`, `.logo-svg`;
  - objetos: `.paper` (con `.paper-hd`, `.row`, `.bar`), `.task` (ficha), `.lvl` (nivel punteado), `.box` (casillero).
- Si hace falta algo del kit que no está acá (cursor, marcas, máscaras), la referencia completa es `artifact-type/reference/film-api.md` de cualquier film de Motion (`Artifact` · `read` · `path`).

## Grabar y revisar

1. **El reproductor**, una vez por sesión: si falta `out/motion-player/`, bajarlo con `Artifact` · `read` · `url` `https://claude.ai/artifact/DPA8ejHSTpJWs8geFXifKY` · `paths` `["index.html", "artifact-type/app.js", "artifact-type/app.css"]`. Después instalarlo con `node scripts/motion-video.js --instalar-player <carpeta donde quedaron>`. Es código del tipo Motion: no se commitea.
2. **Validar**: `node scripts/motion-video.js --film posts/…-motion --validar`. Carga el film, pasa por cada escena y lista los errores.
3. **Hoja de contacto**: `--hoja out/motion-hoja.png` arma un cuadro por segundo; con `--cada 0.5`, dos. Mirarla con Read.
4. **Detalles**: `--cuadros 3.2,7.5` saca esos cuadros a tamaño real en `out/`.
5. **Revisar** con la tabla y el puntaje del paso 4c de la skill:
   - gancho;
   - lectura en el celular;
   - zona segura;
   - nada montado ni cortado;
   - ritmo;
   - exactitud;
   - firma.

   Corregir y volver a mirar **hasta que todo tenga 8 o más**.
6. **Grabar**: `--out posts/AAAA-MM-DD-N.mp4 --portada <segundo en que se lee el titular entero>`. Deja el MP4 (1080×1920, 30 fps, H.264 en BT.709, con pista muda) y la portada (`-portada.png`, la tapa del Reel). Tarda unos minutos.

   Si avisa un salto, mirar en qué momento cae:
   - **en medio de un movimiento grande** (un papel claro que cruza rápido): es el movimiento mismo. Si molesta, suavizar el arranque con `eio` (`eo` arranca a toda velocidad);
   - **en un momento quieto, o de más de ~10×**: es un salto de verdad. Corregirlo antes de subir.

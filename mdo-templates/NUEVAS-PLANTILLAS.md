# Plantillas MDO redes — 58 plantillas corregidas y nuevas

Paquete para copiar dentro de `mdo-templates/` del repo
`jmartinez-sketch/mdo-automatizaciones-redes`.

| | Cantidad |
|---|---|
| Plantillas originales corregidas | **45** (los 9 archivos `templates-*.jsx` completos) |
| Plantillas nuevas | **13** |
| **Total** | **58** |

---

## ⚠️ Orden de carga (imprescindible)

`tpl-utils.jsx` tiene que cargar **antes que todos los `templates-*.jsx`**: las
plantillas corregidas usan `fitSize()`, `SourceFooter`, `HandleFooter` y
`TplHeader` de ahí. Si falta, todo tira error.

El bloque de scripts de `render.html` queda así:

```html
<script type="text/babel" src="brand.jsx"></script>
<script type="text/babel" src="tpl-utils.jsx"></script>          <!-- NUEVO, primero -->
<script type="text/babel" src="templates-square.jsx"></script>
<script type="text/babel" src="templates-portrait.jsx"></script>
<script type="text/babel" src="templates-story.jsx"></script>
<script type="text/babel" src="templates-carousel.jsx"></script>
<script type="text/babel" src="templates-news.jsx"></script>
<script type="text/babel" src="templates-variants.jsx"></script>
<script type="text/babel" src="templates-variants-light.jsx"></script>
<script type="text/babel" src="templates-friday.jsx"></script>
<script type="text/babel" src="templates-friday-b.jsx"></script>
<script type="text/babel" src="templates-noticia-v2.jsx"></script>  <!-- NUEVO -->
<script type="text/babel" src="templates-explicador.jsx"></script>  <!-- NUEVO -->
<script type="text/babel" src="templates-marketing.jsx"></script>   <!-- NUEVO -->
<script type="text/babel" src="templates-utilidad.jsx"></script>    <!-- NUEVO -->
<script type="text/babel" src="templates-linkedin.jsx"></script>    <!-- NUEVO -->
```

`templates-variants*.jsx` leen los ejemplos de square/portrait/story desde
`window`, así que deben ir **después** de esos tres (como en el orden de arriba).

---

## 1. Unificación de marca

`mdo-brand.css` reemplaza el bloque `<style>` de `render.html`:

```html
<link rel="stylesheet" href="mdo-brand.css">
```

La paleta pasa al azul institucional MDO (**#1f4e79**), el mismo de los emails y
las propuestas. Antes las placas usaban `#1a3a6e` y los documentos `#1f4e79`: no
se veían de la misma marca. Los nombres de variables no cambiaron.

Incluye el arreglo global del pie (`.footer-row > span { white-space: nowrap }`)
y la clase `.truncate`.

> Las placas ya publicadas quedan con el azul viejo. Si hay posts agendados sin
> publicar, conviene re-renderizarlos.

---

## 2. Los 5 defectos sistemáticos que se corrigieron

| Defecto | Dónde estaba | Solución |
|---|---|---|
| **Hueco muerto vertical** — un `<div style={{flex:1}}/>` suelto empujaba el contenido a los dos extremos | po-13, po-13b, **po-13c** (la que generó las placas de junio), st-07, st-07b, st-09, st-09b, po-23, po-24 | El contenido pasa a ser un único grupo centrado |
| **Zona segura de Instagram** — el padding de 40 dejaba lockup y pie debajo de la interfaz de IG (tapa ~111 px arriba y ~147 px abajo en unidades de diseño) | **las 7 stories** (st-07, st-07b, st-08, st-08b, st-08c, st-09, st-09b) | Padding `120px 40px 155px`. Verificable con `?safe=1` |
| **Cuerpo tipográfico fijo** — un título largo desbordaba y uno corto dejaba aire | casi todas (los peores: 220px en sq-03b, 200px en sq-03/sq-03c, 92px en st-09, 72px en ca-cover, 68px en po-05) | `fitSize()`: el cuerpo se calcula por tramos según el largo del texto |
| **Pie que se partía en dos líneas** — "Errepar · ARCA · Resolución" + fecha + handle en una fila | todas las que muestran fuente | `SourceFooter` trunca la fuente con elipsis y fija la fecha; `HandleFooter` le devuelve al handle su línea |
| **Hacks de alineación** — `height:170` fijo para alinear la unidad del número | sq-03, sq-03c | Alineación por `baseline` |

Además: "AFIP" → "ARCA" en todos los ejemplos, y se quitó la etiqueta visible
"Tip" del carrusel B (la regla de marca del proyecto es no usarla) — dice
"Punto 01". Los slots no cambiaron.

### Utilidades de `tpl-utils.jsx`

| Utilidad | Para qué |
|---|---|
| `fitSize(texto, tramos, fallback)` | Cuerpo tipográfico según el largo del texto. Cálculo sincrónico (sin medir el DOM) para que el screenshot headless capture el tamaño ya resuelto |
| `SourceFooter` | Fuente truncada + fecha que no se comprime |
| `HandleFooter` | Handle y sitio en su propia línea |
| `TplHeader` | Lockup + chip: unifica el encabezado |

---

## 3. Archivos corregidos (mismos IDs y slots — la rutina no se toca)

| Archivo | IDs | Cantidad |
|---|---|---|
| `templates-square.jsx` | sq-01, sq-02, sq-03 | 3 |
| `templates-portrait.jsx` | po-04, po-05, po-06, po-16 | 4 |
| `templates-story.jsx` | st-07, st-08, st-09 | 3 |
| `templates-carousel.jsx` | ca-cover, ca-q1, ca-q2, cb-cover, cb-tip1..3 | 7 |
| `templates-news.jsx` | sq-12, po-13 | 2 |
| `templates-variants.jsx` | sq-02b, sq-03b, sq-12b, po-04b, po-05b, po-13b, st-08b, st-09b | 8 |
| `templates-variants-light.jsx` | sq-01b, sq-02c, sq-03c, sq-12c, po-06b, po-13c, st-07b, st-08c | 8 |
| `templates-friday.jsx` | po-21 … po-25 | 5 |
| `templates-friday-b.jsx` | po-26 … po-30 | 5 |
| | | **45** |

---

## 4. Plantillas nuevas (13)

### Noticia rearmada
- **po-13d / sq-12d** (`templates-noticia-v2.jsx`) — noticia con marca de agua del
  iso y cierre editorial anclado. Recomendadas para la rutina en lugar de po-13c / sq-12c.
  `CATEGORIA`, `TITULAR`, `BAJADA`, `CIERRE` (sólo po-13d), `FUENTE`, `FECHA`, `HANDLE`

### Instagram 4:5 — contenido (`templates-explicador.jsx`, `templates-marketing.jsx`)
- **po-31 · Explicador en 3 pasos** — cada paso con **título + cuerpo** (po-28 sólo
  tiene una línea por paso).
  `COPETE`, `TITULO`, `PASO_1_TIT`, `PASO_1_TXT`, `PASO_2_TIT`, `PASO_2_TXT`, `PASO_3_TIT`, `PASO_3_TXT`, `CTA`, `HANDLE`
- **po-32 · Comparativa A vs. B** — dos columnas (papel vs. navy) + veredicto.
  `COPETE`, `TITULO`, `A_LABEL`, `A_TITULO`, `A_1..3`, `B_LABEL`, `B_TITULO`, `B_1..3`, `VEREDICTO`, `HANDLE`
- **po-34 · Mito vs. realidad** — corrige una creencia equivocada; el mito va tachado.
  `COPETE`, `TITULO`, `MITO`, `REALIDAD`, `CTA`, `HANDLE`
- **po-35 · Errores frecuentes** — 3 errores con su corrección.
  `COPETE`, `TITULO`, `ERROR_1`, `FIX_1`, `ERROR_2`, `FIX_2`, `ERROR_3`, `FIX_3`, `CTA`, `HANDLE`

### Instagram 4:5 — marketing y engagement
- **po-33 · Elegí tu caso** — pregunta + 3 opciones tipo encuesta + CTA a comentar.
  `COPETE`, `PREGUNTA`, `OPCION_1..3`, `CTA`, `HANDLE`
- **po-36 · Testimonio de cliente** — prueba social sin nombre propio (sector + tamaño).
  `COPETE`, `TESTIMONIO`, `CLIENTE_TIPO`, `CLIENTE_DETALLE`, `SERVICIO`, `HANDLE`

### Instagram — utilidad (`templates-utilidad.jsx`)
- **po-37 · Vencimientos de la semana (feed)** — la de st-07 se va en 24 h; ésta queda
  en el feed para guardar.
  `COPETE`, `SEMANA`, `DIA_1..4`, `MES_1..4`, `IMPUESTO_1..4`, `PERIODO_1..4`, `CTA`, `HANDLE`
- **st-10 · Story encuesta** — dos opciones A/B, con zona segura respetada.
  `COPETE`, `PREGUNTA`, `OPCION_A`, `OPCION_B`, `PIE`, `HANDLE`

### LinkedIn 1.91:1 — 1200×628 (`templates-linkedin.jsx`)
- **li-01 · Noticia / novedad normativa.** `CATEGORIA`, `TITULAR`, `BAJADA`, `FUENTE`, `FECHA`, `HANDLE`
- **li-02 · Claim institucional.** `COPETE`, `CLAIM`, `SERVICIO_1..3`, `CTA`, `HANDLE`
- **li-03 · Dato clave.** `CATEGORIA`, `NUMERO`, `UNIDAD`, `DESCRIPCION`, `FUENTE`, `HANDLE`

---

## 5. Entradas nuevas del registry `TEMPLATES`

```js
'po-13d': { c: PoNoticiaV2,       baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'sq-12d': { c: SqNoticiaV2,       baseW: 540, baseH: 540, outW: 1080, outH: 1080, mode: 'feed' },
'po-31':  { c: PoExplicador,      baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'po-32':  { c: PoComparativa,     baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'po-33':  { c: PoElegiTuCaso,     baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'po-34':  { c: PoMitoRealidad,    baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'po-35':  { c: PoErrores,         baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'po-36':  { c: PoTestimonio,      baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'po-37':  { c: PoVencimientosFeed,baseW: 540, baseH: 675, outW: 1080, outH: 1350, mode: 'feed' },
'st-10':  { c: StEncuesta,        baseW: 480, baseH: 853, outW: 1080, outH: 1920, mode: 'story' },
'li-01':  { c: LiNoticia,         baseW: 600, baseH: 314, outW: 1200, outH: 628,  mode: 'feed' },
'li-02':  { c: LiClaim,           baseW: 600, baseH: 314, outW: 1200, outH: 628,  mode: 'feed' },
'li-03':  { c: LiDato,            baseW: 600, baseH: 314, outW: 1200, outH: 628,  mode: 'feed' },
```

Y en el spread de `EXAMPLES`:

```js
...EXAMPLES_NOTICIA_V2, ...EXAMPLES_EXPLICADOR, ...EXAMPLES_MARKETING,
...EXAMPLES_UTILIDAD, ...EXAMPLES_LINKEDIN,
```

---

## 6. Qué NO viene en este paquete

`render.html`, `vendor/`, `scripts/`, `PLACEHOLDERS.md` y 3 de los 5 logos: ya
están en el repo y no cambiaron (salvo `render.html`, que hay que editar según
los puntos 1, 2 y 5). `PLACEHOLDERS.md` conviene actualizarlo con las 13 nuevas.

## 7. Preview

`preview-nuevas.html` muestra las 58 con datos de ejemplo. Usa React por CDN (no
el `vendor/` local), así que sirve para revisar diseño, no para producción.

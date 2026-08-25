# MDO Consultores · IG Templates — Render API

Plantillas de Instagram para Martinez, De Orta & Gutierrez Taboada. Diseñadas
para automatización vía Claude Code: cada plantilla acepta contenido por
**placeholders literales** entre corchetes `[CORCHETES]` que se reemplazan
por find/replace en el HTML antes de renderizar a PNG.

## Cómo usar desde Claude Code

```js
// 1. Abrir render.html con el ID de plantilla
//    Usar URL con query string (?t=...) o hash (#t=...) — el hash sobrevive
//    cualquier rewrite de host.
await page.goto('file:///path/render.html?t=sq-12');

// 2. Esperar a que renderice
await page.waitForFunction(() => window.__mdoReady === true);

// 3. Inyectar el contenido haciendo find/replace en el HTML
await page.evaluate((data) => {
  document.body.innerHTML = Object.entries(data).reduce(
    (html, [k, v]) => html.replaceAll(`[${k}]`, v),
    document.body.innerHTML
  );
}, {
  CATEGORIA: 'Impuestos · AFIP',
  TITULAR: 'AFIP extiende el plazo de Ganancias',
  BAJADA: 'Personas humanas tienen tiempo hasta el 30 de junio.',
  FUENTE: 'AFIP · Comunicado oficial',
  FECHA: '19 jun 2026',
  HANDLE: '@mdoconsultores',
});

// 4. Screenshot al elemento #stage (es exactamente 1080×W × 1080×H)
await page.screenshot({
  path: 'output.png',
  clip: { x: 0, y: 0, width: 1080, height: 1080 },
});

// 5. Subir a Postiz API
await fetch('https://postiz.../api/v1/posts', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ' + token },
  body: form, // multipart con la imagen + caption + scheduled_at
});
```

## URL params

| Param       | Valor                           | Default     |
|-------------|---------------------------------|-------------|
| `t`         | template id (ver tabla abajo)   | `sq-01`     |
| `example=1` | mostrar contenido de ejemplo    | `0` (placeholders) |
| `safe=1`    | overlay de zona segura IG       | `0`         |

## Catálogo de plantillas

### Square · 1:1 (output 1080×1080)

| ID      | Uso                  | Slots                                                                |
|---------|----------------------|----------------------------------------------------------------------|
| `sq-01` | Vencimiento AFIP     | `COPETE`, `DIA`, `MES`, `ANIO`, `IMPUESTO`, `DESCRIPCION_VENC`, `HORARIO`, `CHIP_MES`, `HANDLE` |
| `sq-02` | Cita / reflexión     | `COPETE`, `CITA`, `AUTOR`, `ROL_AUTOR`, `HANDLE`                     |
| `sq-03` | Número / stat        | `COPETE`, `NUMERO`, `UNIDAD`, `DESCRIPCION`, `PIE`, `HANDLE`         |
| `sq-12` | **Noticia (Gmail)**  | `CATEGORIA`, `TITULAR`, `BAJADA`, `FUENTE`, `FECHA`, `HANDLE`        |

### Portrait · 4:5 (output 1080×1350)

| ID      | Uso                       | Slots                                                                |
|---------|---------------------------|----------------------------------------------------------------------|
| `po-04` | Guía rápida / Servicio    | `COPETE`, `TITULO`, `BAJADA`, `BULLET_1..4`, `CTA`, `HANDLE`         |
| `po-05` | Anuncio institucional     | `COPETE`, `TITULO`, `SUBTITULO`, `TEMA`, `BLOQUE_1..3`, `FECHA_HORA`, `HANDLE` |
| `po-06` | Voz experta / Equipo      | `COPETE`, `NOMBRE`, `ROL`, `BIO`, `TAG_1..4`, `FOTO_CAPTION`, `HANDLE` |
| `po-13` | **Noticia + take MDO**    | `CATEGORIA`, `TITULAR`, `BAJADA`, `QUE_SABER_LABEL`, `QUE_SABER`, `FUENTE`, `FECHA`, `HANDLE` |
| `po-16` | **Spotlight de servicio** (marca, navy) | `COPETE`, `TITULO`, `BAJADA`, `HANDLE` |

### Story · 9:16 (output 1080×1920)

| ID      | Uso                            | Slots                                                                |
|---------|--------------------------------|----------------------------------------------------------------------|
| `st-07` | Vencimientos de la semana      | `COPETE`, `SEMANA`, `FECHA_1..4`, `IMPUESTO_1..4`, `PERIODO_1..4`, `HORA_1..4`, `CTA`, `HANDLE` |
| `st-08` | Cita vertical                  | `COPETE`, `CITA`, `AUTOR`, `ROL_AUTOR`, `HANDLE`                     |
| `st-09` | CTA / "Consultanos"            | `COPETE`, `TITULAR_1..3`, `BAJADA`, `CANAL_1..3_LABEL/VALOR`, `HANDLE` |

### Carousel A · Calendario impositivo (3 slides 1080×1080)

| ID         | Uso                  | Slots                                                                |
|------------|----------------------|----------------------------------------------------------------------|
| `ca-cover` | Tapa del calendario  | `COPETE`, `MES`, `ANIO`, `BAJADA`, `SWIPE_CTA`, `CHROME_LABEL`       |
| `ca-q1`    | Primera quincena     | `COPETE`, `FECHA_1..5`, `IMPUESTO_1..5`, `PERIODO_1..5`, `CHROME_LABEL` |
| `ca-q2`    | Segunda quincena+CTA | `COPETE`, `FECHA_1..5`, `IMPUESTO_1..5`, `PERIODO_1..5`, `CTA`, `CHROME_LABEL` |

### Carousel B · Tips PyME (4 slides 1080×1350)

| ID         | Uso                | Slots                                                                  |
|------------|--------------------|------------------------------------------------------------------------|
| `cb-cover` | Tapa de la guía    | `COPETE`, `TITULO_SANS`, `TITULO_SERIF`, `BAJADA`, `SWIPE_CTA`, `CHROME_LABEL` |
| `cb-tip1`  | Tip 1 (papel)      | `TITULAR`, `CUERPO`, `TAKEAWAY`, `CHROME_LABEL`                        |
| `cb-tip2`  | Tip 2 (navy)       | `TITULAR`, `CUERPO`, `TAKEAWAY`, `CHROME_LABEL`                        |
| `cb-tip3`  | Tip 3 (papel)      | `TITULAR`, `CUERPO`, `TAKEAWAY`, `CHROME_LABEL`                        |

### Variantes alternativas

Mismos slots que su versión original; cambian color mode / composición.

| ID        | Variante de | Cambio                                              |
|-----------|-------------|-----------------------------------------------------|
| `sq-02b`  | `sq-02`     | Cita en navy (era papel)                            |
| `sq-03b`  | `sq-03`     | Número en serif italic editorial (era sans light)   |
| `sq-12b`  | `sq-12`     | Noticia "Último momento" — navy + tira `BADGE` superior |
| `po-04b`  | `po-04`     | Guía/Servicio en navy (era papel)                   |
| `po-05b`  | `po-05`     | Anuncio en papel (era navy)                         |
| `po-13b`  | `po-13`     | Noticia portrait en navy con take callout invertido |
| `st-08b`  | `st-08`     | Cita story en navy                                  |
| `st-09b`  | `st-09`     | CTA story en navy                                   |

> **Nota sobre `sq-12b`:** agrega un slot extra `BADGE` (ej. `"Último momento"`, `"Urgente"`, `"Importante"`) en la tira superior celeste. Todos los demás slots son idénticos a `sq-12`.

### Variantes light / minimal (fondo blanco/papel priorizado)

Composiciones limpias con tipografía protagonista. Pensadas para feed editorial o noticias neutras.

| ID        | Variante de | Cambio                                                       |
|-----------|-------------|--------------------------------------------------------------|
| `sq-01b`  | `sq-01`     | Vencimiento en papel/blanco — contraparte del navy           |
| `sq-02c`  | `sq-02`     | Cita minimal — pura blanca, sin comilla decorativa, rules    |
| `sq-03c`  | `sq-03`     | Número en blanco puro — unidad en serif italic celeste       |
| `sq-12c`  | `sq-12`     | Noticia minimal — pura blanca, sin chip, ultra clean         |
| `po-06b`  | `po-06`     | Voz experta **sin foto** — nombre serif italic grande        |
| `po-13c`  | `po-13`     | Noticia portrait minimal — **sin take MDO**, agrega slot `CIERRE` (frase de cierre tipográfica) |
| `st-07b`  | `st-07`     | Vencimientos story en papel/blanco                           |
| `st-08c`  | `st-08`     | Cita story minimal — blanca pura, rules en lugar de fondo decorado |

> **`po-13c`** reemplaza el callout "Qué tenés que saber" por un slot `CIERRE` (frase corta editorial). Usar cuando la noticia se publica neutra, sin opinión del estudio.

## Plantillas nuevas (paquete de julio 2026)

Ver [NUEVAS-PLANTILLAS.md](NUEVAS-PLANTILLAS.md) para el detalle de qué se corrigió en las 45
originales (zona segura de Instagram en las historias, tipografía que se adapta al largo del
texto, pie que ya no se parte en dos líneas, y el azul unificado con el de los mails: `#1f4e79`).

### Noticia rearmada — reemplazan a `po-13c` / `sq-12c`

| ID | Uso | Slots |
|---|---|---|
| `po-13d` | Noticia 4:5 con marca de agua del iso y cierre anclado | `CATEGORIA`, `TITULAR`, `BAJADA`, `CIERRE`, `FUENTE`, `FECHA`, `HANDLE` |
| `po-13e` | **Misma que `po-13d`, en navy.** Existe para que dos noticias de la misma semana se distingan de un vistazo en la grilla | idénticos a `po-13d` |

> **`po-13e`** es `po-13d` con el modo de color invertido — misma composición, mismos 7 slots, mismos límites de texto. Para alternar solo hay que cambiar el id del template: el contenido no se toca.

### Portrait 4:5 — pool del viernes, texto-driven (`templates-friday.jsx`)

Diseñadas para el post de Gestión PyME del viernes, pero sirven para cualquier contenido propio del estudio.

| ID | Uso | Slots |
|---|---|---|
| `po-21` | Pregunta hero (navy) — gancho en pregunta serif | `COPETE`, `PREGUNTA`, `RESPUESTA`, `CTA`, `HANDLE` |
| `po-22` | Antes/Después (split papel→navy) | `COPETE`, `SIN_LABEL`, `SIN_TEXTO`, `CON_LABEL`, `CON_TEXTO`, `CTA`, `HANDLE` |
| `po-23` | Declaración / manifiesto (papel) + firma | `COPETE`, `DECLARACION`, `APOYO`, `HANDLE` |
| `po-24` | Checklist (blanco) — 3 ítems tildados | `COPETE`, `TITULO`, `ITEM_1..3`, `CTA`, `HANDLE` |
| `po-25` | Foco / una sola idea (navy) minimal | `COPETE`, `IDEA`, `DETALLE`, `CTA`, `HANDLE` |

### Portrait 4:5 — pool del viernes, icon-forward (`templates-friday-b.jsx`)

Menos texto, más íconos SVG line-style. El set de íconos vive en el mismo archivo.

| ID | Uso | Slots |
|---|---|---|
| `po-26` | 3 íconos en fila (papel) | `COPETE`, `TITULO`, `LABEL_1..3`, `CTA`, `HANDLE` |
| `po-27` | Ícono grande central (navy) | `COPETE`, `TITULO`, `BAJADA`, `CTA`, `HANDLE` |
| `po-28` | Proceso en 3 pasos con íconos (papel) — una línea por paso | `COPETE`, `TITULO`, `PASO_1..3`, `CTA`, `HANDLE` |
| `po-29` | Ícono + frase (navy) | `COPETE`, `FRASE`, `CTA`, `HANDLE` |
| `po-30` | Grid 2×2 de servicios (blanco), casi sin texto | `COPETE`, `TITULO`, `LABEL_1..4`, `HANDLE` |

### Portrait 4:5 — contenido y marketing

| ID | Uso | Slots |
|---|---|---|
| `po-31` | Explicador en 3 pasos (título + cuerpo por paso) | `COPETE`, `TITULO`, `PASO_1_TIT`, `PASO_1_TXT`, `PASO_2_TIT`, `PASO_2_TXT`, `PASO_3_TIT`, `PASO_3_TXT`, `CTA`, `HANDLE` |
| `po-32` | Comparativa A vs. B con veredicto | `COPETE`, `TITULO`, `A_LABEL`, `A_TITULO`, `A_1..3`, `B_LABEL`, `B_TITULO`, `B_1..3`, `VEREDICTO`, `HANDLE` |
| `po-33` | Elegí tu caso (encuesta + CTA a comentar) | `COPETE`, `PREGUNTA`, `OPCION_1..3`, `CTA`, `HANDLE` |
| `po-34` | Mito vs. realidad (el mito va tachado) | `COPETE`, `TITULO`, `MITO`, `REALIDAD`, `CTA`, `HANDLE` |
| `po-35` | Errores frecuentes con su corrección | `COPETE`, `TITULO`, `ERROR_1`, `FIX_1`, `ERROR_2`, `FIX_2`, `ERROR_3`, `FIX_3`, `CTA`, `HANDLE` |
| `po-36` | Testimonio de cliente (sin nombre propio) | `COPETE`, `TESTIMONIO`, `CLIENTE_TIPO`, `CLIENTE_DETALLE`, `SERVICIO`, `HANDLE` |
| `po-37` | Vencimientos de la semana **en el feed** (la story se va en 24 h; ésta queda para guardar) | `COPETE`, `SEMANA`, `DIA_1..4`, `MES_1..4`, `IMPUESTO_1..4`, `PERIODO_1..4`, `CTA`, `HANDLE` |

### Story 9:16

| ID | Uso | Slots |
|---|---|---|
| `st-10` | Encuesta A/B, con zona segura respetada | `COPETE`, `PREGUNTA`, `OPCION_A`, `OPCION_B`, `PIE`, `HANDLE` |

### LinkedIn 1.91:1 — output 1200×628

| ID | Uso | Slots |
|---|---|---|
| `li-01` | Noticia / novedad normativa | `CATEGORIA`, `TITULAR`, `BAJADA`, `FUENTE`, `FECHA`, `HANDLE` |
| `li-02` | Claim institucional | `COPETE`, `CLAIM`, `SERVICIO_1..3`, `CTA`, `HANDLE` |
| `li-03` | Dato clave | `CATEGORIA`, `NUMERO`, `UNIDAD`, `DESCRIPCION`, `FUENTE`, `HANDLE` |

> `scripts/render.js` ya conoce el tamaño de LinkedIn (1200×628). Los `li-*` no van a Instagram.

## ⚠️ Margen exterior mínimo (no bajar)

Instagram recorta los bordes en la grilla del perfil, así que el contenido pegado al margen se
ve cortado aunque el PNG esté bien. Márgenes mínimos sobre base 540:

| Plantilla | Mínimo |
|---|---|
| `sq-12` | 72 |
| `po-04` | 68 |
| `po-16` | 64 |
| Historias (`st-*`) | `120px 40px 155px` — deja libre la franja de la UI de Instagram |

El paquete de julio 2026 venía con esos tres en 60; **se restauraron** a sus mínimos. Si se toca
un template, mantener el margen o subirlo, nunca bajarlo. Verificable con `?safe=1`.

## Mapeo sugerido — Gmail newsletter → slots

Si el label de Gmail recibe noticias con estos campos (extraíbles del mail):

| Campo del email          | Slot de plantilla   |
|--------------------------|---------------------|
| Asunto / título nota     | `TITULAR`           |
| Primer párrafo / resumen | `BAJADA`            |
| Medio (extraído del FROM o asunto) | `FUENTE`  |
| Fecha del mail           | `FECHA`             |
| Tag/label secundario     | `CATEGORIA`         |
| Análisis generado (LLM)  | `QUE_SABER` (solo en `po-13`) |

## Archivos del proyecto

```
Canva IG Templates.html   ← preview canvas (panea, zoom, focus mode)
render.html               ← endpoint para automatización (1 plantilla por URL)
brand.jsx                 ← Lockup + watermarks
templates-square.jsx      ← sq-01, sq-02, sq-03
templates-portrait.jsx    ← po-04, po-05, po-06
templates-story.jsx       ← st-07, st-08, st-09
templates-carousel.jsx    ← ca-* y cb-*
templates-news.jsx        ← sq-12, po-13
templates-noticia-v2.jsx  ← po-13d, po-13e
templates-variants.jsx    ← variantes navy (sq-02b, po-13b, st-09b, …)
templates-variants-light.jsx ← variantes light/minimal (sq-12c, po-13c, st-08c, …)
templates-friday.jsx      ← po-21 a po-25
templates-friday-b.jsx    ← po-26 a po-30 (+ set de íconos SVG line-style)
templates-explicador.jsx  ← po-31, po-32, po-33
templates-marketing.jsx   ← po-34, po-35, po-36
templates-utilidad.jsx    ← po-37, st-10, li-03
templates-linkedin.jsx    ← li-01, li-02
tpl-utils.jsx             ← fitSize, SourceFooter, HandleFooter, TplHeader
assets/logo-mdo*.png      ← logo en 4 variantes (con/sin texto, claro/oscuro)
```

## Notas de diseño

- **Fuentes:** Montserrat (sans), Instrument Serif (italic display), Geist Mono (etiquetas). Vienen de Google Fonts; en producción conviene preloadearlas.
- **Paleta:** navy `#1a3a6e`, azul medio `#3a6db8`, celeste `#7eb3f7`, papel `#f7f9fc`, tinta `#1a1a2e`.
- **Output size:** todos los templates renderizan a la dimensión IG exacta. Internamente usan `transform: scale()` para escalar desde el tamaño base de diseño — el screenshot del headless browser captura la versión final, nítida.
- **Safe zones:** pasar `?safe=1` para ver overlays de las zonas donde IG superpone su UI (banner superior y barra inferior en stories).

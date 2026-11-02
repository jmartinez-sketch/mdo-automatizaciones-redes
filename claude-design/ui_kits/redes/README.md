# UI kit · Placas de redes

Recreación del sistema de placas de Instagram y LinkedIn del estudio, con la marca **v2.0** (Manual de Marca 2026).

## Qué es esto

El estudio publica en Instagram y LinkedIn con una rutina automática: un lunes lee el newsletter, arma el contenido y genera los PNG desde plantillas HTML. Las plantillas viven en el repo `jmartinez-sketch/mdo-automatizaciones-redes` (58 en total, catálogo completo en `mdo-templates/PLACEHOLDERS.md`).

## Dos orígenes distintos, no mezclarlos

| Grupo en el estudio | Qué es | Autoridad |
|---|---|---|
| **Manual 4:5** (`mn-01`…`mn-08`) | Las 8 placas de feed del **Manual de Marca 2026**, recreadas midiendo los JPG originales | **Es la marca.** Ante cualquier duda, mandan estas |
| El resto (`sq-*`, `po-*`, `st-*`, `li-*`) | 13 plantillas del repo de automatizaciones del estudio, re-skineadas | Son del estudio, no del manual |

Los 8 originales quedaron en `assets/referencia-feed/` para comparar.

### Lo que las 8 del manual hacen distinto

- Todas son **4:5**. No hay ninguna cuadrada.
- El papel es **`#f0edee`**, no el `#f8f6f6` de documento.
- La **marca de agua es gigante** (~1,7× el lienzo) y recortada, no un detalle de esquina.
- El **titular va en dos tonos** dentro de la misma frase: primera parte blanca y negrita, segunda gris y peso normal.
- Se usa **itálica** (Chivo oblicua) como tercer nivel del titular, y en la fecha.
- Hay **foto a sangre**, siempre con velo navy encima (34–58% según cuánto texto lleve).
- **No hay chips, ni cápsulas, ni pie con @handle.** En ninguna de las ocho.

## Las del repo del estudio

| Formato | Base | Salida | Plantillas |
|---|---|---|---|
| Square 1:1 | 540×540 | 1080×1080 | `sq-01` vencimiento · `sq-02` cita · `sq-03` número clave |
| Portrait 4:5 | 540×675 | 1080×1350 | `po-13d` / `po-13e` noticia · `po-24` checklist · `po-26` tres iconos · `po-21` pregunta hero |
| Story 9:16 | 480×853 | 1080×1920 | `st-07` vencimientos de la semana · `st-10` encuesta A/B |
| LinkedIn 1.91:1 | 600×314 | 1200×628 | `li-01` noticia · `li-02` claim · `li-03` dato clave |

## Cómo funciona

- Cada plantilla se diseña al **tamaño base** y se escala con `transform: scale()` al tamaño de salida real: el screenshot headless captura la versión final, nítida.
- El contenido entra por **placeholders literales** entre corchetes (`[TITULAR]`, `[FECHA]`) que la rutina reemplaza por find/replace antes de renderizar. El botón «Placeholders» del estudio muestra exactamente eso.
- El cuerpo de los titulares se calcula por **largo de texto** (`fitSize`), no midiendo el DOM: así el render headless captura siempre el tamaño ya resuelto.
- «Zona segura» superpone las bandas donde Instagram tapa el contenido con su propia interfaz.

## Diferencias respecto del original — leer antes de copiar

El repo de automatizaciones todavía usa el **branding anterior**: azul `#1f4e79`, Montserrat + Instrument Serif + Geist Mono, y el nombre «Martinez, De Orta / & Asociados». Este kit está armado con la marca vigente:

| En el repo de plantillas | Acá |
|---|---|
| `#1f4e79` / `#2e75b6` / `#4a9fd8` | `--navy #06162d`, `--slate #7c8392`, `--grey #d9d9d9` |
| Montserrat (sans) | **Chivo** (`--font-display`) |
| Instrument Serif italic (citas, números, unidades) | **Chivo 300**, mismo rol pero sin serif: el manual v2 no define una |
| Geist Mono (etiquetas, pies) | **Chivo 700** en versalitas |
| «Martinez, De Orta / & Asociados» | Lockup **MDO / CONSULTORES**, secundario **MARTINEZ · DE ORTA · GUTIERREZ TABOADA** |

La composición, los paddings, los saltos de cuerpo tipográfico y los márgenes mínimos son los del original, valor por valor.

## Archivos

- `index.html` — el estudio: rail de plantillas, canvas y panel de slots.
- `app.babel.js` — catálogo (id, slots, contenido de ejemplo y placeholders) + shell.
- `plates-feed.babel.js` — las placas 1:1 y 4:5.
- `plates-story-linkedin.babel.js` — historias 9:16 y LinkedIn 1.91:1.

Los tres van con extensión `.babel.js` a propósito: son el chrome de esta herramienta, no componentes del design system, y así el compilador no los empaqueta dentro de `_ds_bundle.js`.

Todas las placas se componen con los primitivos del design system (`Plate`, `PlateHeader`, `Chip`, `BigNumber`, `SourceFooter`, `HandleFooter`, `Icon`, `Eyebrow`, `Display`, `Lede`, `Rule`, `IsoWatermark`, `Lockup`). No reimplementan nada.

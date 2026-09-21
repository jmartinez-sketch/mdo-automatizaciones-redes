# MDO Consultores — Design System

La marca del estudio **MDO Consultores** (antes «Martinez, De Orta & Asociados»), hecha sistema: colores, tipografías, logos, primitivos de interfaz y recreaciones de los dos productos digitales del estudio.

Versión de marca: **v2.0, vigente**, del **Manual de Marca 2026**. No queda nada del branding anterior.

---

## 1. Quién es MDO

Estudio contable e impositivo argentino, con más de 50 años de trayectoria (desde 1972), en Buenos Aires. Atiende PyMEs y empresas: impuestos, contabilidad, sueldos, auditoría, societario. El usuario interno de referencia es **Juan Martinez**, contador y dueño del estudio — no es programador: la documentación del estudio está escrita para que la entienda él, en castellano rioplatense y sin jerga.

Identidad, textual:

| | |
|---|---|
| Nombre corto | **MDO** |
| Nombre comercial | **MDO Consultores** |
| Logo principal | **MDO / CONSULTORES** |
| Lockup secundario | **MARTINEZ · DE ORTA · GUTIERREZ TABOADA** |
| Razón social | MARTINEZ, DE ORTA Y ASOCIADOS S.R.L. *(a confirmar: no figura en el manual)* |
| Web | mdo-consultores.com.ar |
| Redes | @mdoconsultores |

> **El nombre cambió.** Donde antes decía «& Asociados» ahora va «Gutierrez Taboada». Hay material publicado (las 58 plantillas de redes) que todavía dice el anterior.

### Los productos digitales

1. **Placas de redes** — 58 plantillas de Instagram y LinkedIn que una rutina automática rellena y publica todas las semanas (miércoles, jueves, viernes, y sábado en semanas pares). Es el producto de marca de mayor volumen del estudio. → UI kit `ui_kits/redes/`
2. **Panel de Libros Societarios** — herramienta interna: control de folios, reposición y custodia física de los libros de cada cliente. Vista pública, datos en repo privado, permisos por GitHub. → UI kit `ui_kits/panel-libros/`
3. **Documentos del estudio** — propuestas de honorarios, cartas, onboarding. Existen, pero **no había fuente disponible** para recrearlos: no hay UI kit de documentos. Ver «Lo que falta».
4. **Google Ads / la web** — todavía sin armar o sin fuente accesible.

---

## 2. Fuentes de este design system

Todo lo que hay acá sale de material del estudio. Nada está inventado; lo derivado está marcado como derivado.

**Repositorios de GitHub**

- <https://github.com/jmartinez-sketch/mdo-brand> — **el original de la marca.** `actual/brand.json` (la marca como datos), `actual/tokens.css`, `actual/fonts.css`, los 8 SVG de logo, y `design-system/plantilla.html` (la página de marca, de donde salen la escala tipográfica y los alias semánticos de este sistema).
- <https://github.com/jmartinez-sketch/mdo-automatizaciones-redes> — las 58 plantillas de redes: `mdo-templates/mdo-brand.css` (primitivas de placa), `brand.jsx`, `tpl-utils.jsx`, `templates-*.jsx`, y `PLACEHOLDERS.md` (el catálogo completo con sus slots).
- <https://github.com/MDO-Consultores/panel-libros> — el panel de libros societarios (`index.html`).

Vale la pena leerlos: **están mejor documentados que la mayoría de los design systems**, y explican no sólo qué valor va, sino por qué.

**Carpeta local** `Manual de Marca 2026/` (espejo de la carpeta de Drive `1J5jGZC2tDzCyrtI2nSQ6k_H6jymKUw8f`)

- `Manual de marca/manual de marca MDO.pdf` (102 MB) y `.ai` (274 MB) — los maestros; quedan en Drive.
- `Logos/` — SVG, PNG y JPG del isotipo, logotipo primario y secundario, incluidas las versiones con degradé.
- `Tipografias/chivo.zip`, `open-sans.zip` — las dos tipografías, tal como las entrega el manual.
- `REDES/Destacadas/` — 4 portadas de historias destacadas con degradé celeste.
- `FIRMA ELECTRONICA/Scene (4).gif` — firma de correo animada.

---

## 3. Content fundamentals — cómo se escribe

La voz de MDO es la de un contador explicándole algo a un cliente PyME sin hacerlo sentir tonto. Es la característica más distintiva de la marca, más incluso que el color.

**Idioma y persona.** Castellano rioplatense, voseo. Se le habla al lector de **vos** («Dormí tranquilo», «Ordená hoy», «¿Sabés cuánto te cuesta cerrar el mes tarde?»). El estudio habla de sí en **nosotros** («Llevamos tu contabilidad», «Lo ordenamos con vos»), nunca en tercera persona corporativa.

**Frases cortas, sin adorno.** «El color de MDO se escribe en un solo lugar, y es acá.» El sujeto va temprano y el verbo enseguida. Casi nunca hay subordinadas anidadas.

**Se dice lo que falta, en voz alta.** Es el rasgo más fuerte del tono. La documentación del estudio nombra sus propios agujeros sin maquillarlos: «Los degradés — es lo único importante que falta», «Las 58 plantillas todavía no leen de acá», «PENDIENTE», «a confirmar». Un documento MDO que finge estar completo está fuera de tono. Por eso el design system tiene un componente `Callout` y tarjetas que dicen «provisorio».

**Se explica el por qué, no sólo el qué.** «Git guarda todas las versiones para siempre. Si metemos el `.ai` de 274 MB, el repo carga con esos 274 MB para siempre.» Cada regla viene con su motivo, y el motivo es concreto y con números.

**Cero jerga sin traducir.** Si aparece un término técnico, se explica en la misma frase: «Un robot de GitHub (una "Action")». Cuando hay que ofrecer opciones, **no más de 3 o 4, y la recomendación primero**.

**Títulos en pregunta o en frase.** «¿El usuario de redes y la web siguen igual?», «Dónde vive cada cosa», «Cómo se llama el estudio». No hay títulos-etiqueta tipo «Overview».

**Mayúsculas.** Sólo en volantas y chips (`CALENDARIO ARCA · VENCIMIENTO`). Los títulos van en capitalización de oración: «Los cinco colores del manual», nunca «Los Cinco Colores Del Manual».

**Números y unidades.** Formato es-AR: coma decimal y punto de miles (`92,4%`, `3,59:1`, `1.077 folios`). Los rangos con guion. Las fechas cortas en las placas: `11 jun 2026`; en el panel, `dd/mm/aaaa`.

**Separador de marca:** el punto medio ` · `. Aparece en volantas, chips, pies y lockups («Impuestos · ARCA», «Desde 1972 · Buenos Aires», «MARTINEZ · DE ORTA · GUTIERREZ TABOADA»).

**Emoji: no.** No hay emoji en material publicado. (En documentación interna aparecen ✅/❌ como marcas de decisión; nunca en una placa, un documento de cliente ni una interfaz.)

**Dos reglas duras de contenido, no negociables:**

1. **ARCA, nunca AFIP.** El organismo recaudador se llama **ARCA** (Agencia de Recaudación y Control Aduanero). En títulos, copys, imágenes y hashtags va siempre ARCA. Si la fuente dice AFIP, se traduce al redactar.
2. **En contenido generado (el tip PyME de los viernes): nunca números específicos** — montos de monotributo, alícuotas, topes —, **nunca fechas ni plazos de vencimiento**, **nunca consejos legales concretos**. Sólo tips atemporales de gestión y hábitos contables. Si el borrador tiene un dato específico, se descarta y se regenera.

Ejemplos reales del tono:

> «La planificación impositiva no es un costo: es la primera decisión estratégica del año.»
> «Dormí tranquilo: tus números, en orden y al día.»
> «Más de 50 años ordenando los números de empresas argentinas.»
> «Ordená hoy para crecer mañana.»

---

## 4. Visual foundations

### Color

Cinco colores oficiales, y **ninguno es un azul brillante**: la marca es casi monocroma, de azul noche y grises.

Los hex y su CMYK salen de la página de paleta del manual, no de los SVG: son la especificación de imprenta.

| Token | Hex | CMYK | Uso |
|---|---|---|---|
| `--navy` | `#06162d` | C100 M87 Y49 K67 | **Principal.** Azul noche, casi negro: fondos, títulos, lockup |
| `--slate` | `#7c8392` | C55 M40 Y29 K12 | Gris azulado: acentos, logo sobre fondo oscuro |
| `--warm-grey` | `#6e6a6f` | C54 M48 Y40 K28 | Gris cálido: segunda familia neutra |
| `--grey` | `#d9d9d9` | C18 M12 Y14 K0 | Gris claro: fondos suaves |
| `--paper` | `#f8f6f6` | — | Blanco roto: fondo de página. **No está en la página de paleta**: sale de los SVG, falta confirmarlo |
| `--paper-feed` | `#f0edee` | — | El papel de las placas de feed: un punto más cálido y oscuro |

**El manual sí trae una escala de tintas**: siete pasos hacia el blanco por cada color de marca, en la misma página de paleta (`--navy-10` … `--navy-70`, y lo mismo para slate, grey y warm-grey). Los alias por función (`--ink-70`, `--ink-55`, `--ink-15`, `--grey-pale`…) **ya no son mezclas calculadas a ojo**: cada uno apunta a una tinta real de esa escala, elegida por contraste sobre el papel.

**Accesibilidad:** `--slate #7c8392` da **3,53:1** sobre papel. No alcanza para texto chico (mínimo AA: 4,5:1). Para cuerpo de texto va `--ink-70 #384557` — la tinta 2 del navy — que da **9,04:1**. Está en la tarjeta «Contraste sobre papel».

**Semáforo** (`--ok #2f6b56`, `--warn #8a6320`, `--no #9c3b32`): verdes, ámbares y rojos desaturados, siempre en pareja color + fondo al 11-12%. Informan estado; no decoran.

**Degradés.** El manual (página 14) define las **reglas** pero no da los hex, y los SVG traen la malla rasterizada. Hay dos juegos, medidos por separado:

*Los del manual*, medidos sobre sus PNG:

- `--gradient-azul` — `#010719` → `#294166`. El principal.
- `--gradient-gris` — `#647083` → `#d8d8d8`.
- `--gradient-celeste` — `#647083` → `#d9d8d8`. **Prácticamente idéntico al gris:** o son el mismo con dos nombres, o el celeste real no está en esos archivos. Falta confirmarlo.
- «BLANCA» **no es un degradé**: es la marca en color plano sobre fondo blanco.

Las tres reglas del manual: se construyen **sólo** con colores de la paleta, con transición suave y sin saturaciones excesivas, y el degradé es **soporte** del contenido, nunca protagonista.

*Los de las placas de feed*, medidos sobre las 8 originales — **diagonales**, con el eje de la esquina inferior izquierda a la superior derecha y el punto medio corrido hacia el extremo oscuro:

- `--gradient-navy` — `#00081d` → `#0a1a36` (55%) → `#273f63`. Fondo de las placas institucionales y de noticia.
- `--gradient-light` — brillo blanco en la esquina inferior izquierda que abre a `#c2c6ce`. Sólo en las placas de servicios.

`--gradient-provisorio` sigue existiendo como alias, apuntando al real, porque las 58 plantillas lo nombran así.

**Temas.** Hay un modo oscuro definido (`:root[data-theme="dark"]`): el fondo pasa a `--navy` y las superficies a `#0a2039` / `#12293f`.

### Tipografía

Dos familias, las dos libres de Google Fonts. **El reparto es contraintuitivo y el manual (página 15) es explícito:**

- **Open Sans** (300 · 400 · 600 · 700 · 800) — **la principal, y va en TODO**: títulos incluidos, texto corrido, tablas y formularios. `--font-body` y `--font-display` apuntan las dos acá.
- **Chivo** (300 · 400 · 700 · 900) — **sólo acento**, para palabras y frases cortas: volantas, chips, rótulos, cifras y pies. Nunca texto corrido, nunca un titular. `--font-accent`.

> Hasta agosto de 2026 este sistema lo tenía al revés (Chivo en títulos), porque es el criterio estándar para ese par de fuentes. El manual dice lo contrario. Ya está corregido en tokens, componentes, placas y tarjetas.

Se cargan por CDN (`tokens/fonts.css`), igual que en `mdo-brand/actual/fonts.css`.

Rasgos: títulos con **tracking negativo** (`-0.025em` en h1) y `line-height: 1.1`; cuerpo generoso a `1.65`; volantas con **tracking muy abierto** (`0.16em`) en mayúsculas. Los números siempre con `font-variant-numeric: tabular-nums`.

**El par de display es sans, no serif** — pero la itálica sí existe. El sistema anterior usaba Instrument Serif italic para citas, números y unidades. El manual v2 no define una serif: ese rol lo cumple **Chivo 300**. Lo que sí usa el manual es **Chivo oblicua**, y con un rol preciso: es el **tercer nivel del titular**, debajo de la negrita en mayúsculas y de la negrita normal ("TU EMPRESA ESTÁ / tomando decisiones / *con información actualizada?*"), y también la fecha de las placas de noticia.

**Titular en dos tonos.** Recurso propio del manual: una sola frase partida en dos, la primera parte en blanco y negrita y la segunda en gris y peso normal ("**ARCA pide informar** / socios, directores y beneficiarios"). No son dos líneas distintas: es una oración con dos pesos.

### Espacio y medida

Escala de 10 pasos (4 · 8 · 11 · 14 · 18 · 22 · 28 · 38 · 44 · 56), tomada de los paddings reales de las plantillas y del panel. Medida de texto: 60-66 caracteres. Ancho de página editorial `74rem`; de aplicación, `1500px`.

Los **márgenes de placa son reglas de negocio, no gusto**: Instagram recorta los bordes en la grilla del perfil, así que hay mínimos por plantilla (sq-12: 72, po-04: 68, po-16: 64; historias `120px 40px 155px` para dejar libre la UI de IG). Si se toca una plantilla, el margen se mantiene o sube. Nunca baja.

### Forma, profundidad y movimiento

- **Radios chicos y calibrados por contexto:** 0 en placas de redes, 2px en chips, 3px en tarjetas editoriales, 4px en pastillas de tabla, 6px en inputs y botones, 7px en contenedores de panel, 8px en fichas, 10px en diálogos, pill sólo en chips y contadores. Nada de 16px ni 24px: no hay tarjetas blandas en esta marca.
- **No hay sistema de sombras.** La profundidad se hace con **filete de 1px + cambio de superficie**. La única sombra de la marca es el velo del diálogo (`rgba(15,18,21,.45)`).
- **Filetes:** `--hair rgba(6,22,45,.14)` y `--hair-2 rgba(6,22,45,.28)`; sobre navy, `rgba(248,246,246,.15)`. El separador de la marca es una línea de 1px, a veces cortada a 64px debajo de un número.
- **Tarjetas:** superficie papel, filete de 1px, radio 3 (editorial) u 8 (ficha de panel), sin sombra, sin borde de color de un solo lado — **excepto** el `Callout`, que sí lleva filete lateral de 3px y es el único.
- **Hover:** los sólidos bajan a opacidad `.9`; los de superficie cambian el fondo a la superficie hundida; los links de texto pasan de `--navy` a `--navy-lift`. **Press:** no hay escalado, ni rebote, ni sombra: sólo el cambio de color.
- **Foco:** `outline: 2px solid var(--navy)` con offset 2 (1 en controles de panel). Siempre visible; nunca se quita.
- **Movimiento:** transiciones de 180ms `cubic-bezier(.2,0,.2,1)` en color y opacidad, y nada más. No hay entradas animadas, ni parallax, ni contadores que suben. `prefers-reduced-motion` apaga todo — está respetado en las dos fuentes originales.
- **Transparencia y blur:** transparencia sí, en filetes y textos sobre navy (`rgba(248,246,246,.55)`) y en el velo del diálogo. **Blur: no.** No hay glassmorphism en ninguna parte del material.

### Fondos e imágenes

Los fondos son planos: papel, navy, gris o gris pálido. Como texturas hay exactamente dos, las dos sutiles:

- una **grilla de líneas verticales** sobre navy (`linear-gradient` a 64px) en placas institucionales;
- el **rayado diagonal** del hueco de imagen (`Slot`).

Y el recurso de fondo más característico: el **isotipo gigante**. En las placas del manual no es un detalle de esquina — es una marca de agua a **~1,7 veces el lienzo**, recortada por los bordes, en `#e6e3e4` sobre `#f0edee`: apenas 4% más oscura que el papel. Se ve una arcada arriba a la izquierda y la contracurva abajo a la derecha. En placas navy va al 8%.

**Sí se usa fotografía, y con una receta fija.** Tres de las ocho placas de feed del manual son foto a sangre: arquitectura en contrapicado, y manos sobre un teclado. Siempre **oscurecida con un velo navy** (entre 34% y 58% de opacidad, según cuánto texto lleve encima) y con un degradé extra desde abajo, para que el texto blanco se lea. Nunca la foto cruda, nunca una foto cálida o saturada: el tono es frío y sobrio.

**No hay ilustración.** Ni dibujos, ni íconos decorativos grandes, ni figuras. Cuando falta una foto se deja un `Slot` rotulado diciendo qué va ahí, nunca un dibujo inventado.

El resto del material de imagen del manual: las 4 portadas de historias destacadas con degradé celeste y el GIF de firma de correo. Las ocho placas de feed originales quedaron en `assets/referencia-feed/` para comparar contra las recreaciones.

---

## 5. Iconografía

**El estudio tiene un set propio y chico: nueve iconos line-style.** Están definidos como SVG inline en `templates-friday-b.jsx` del repo de plantillas, y acá viven en el componente `Icon`, con el path data copiado tal cual.

- Trazo **1.7**, `viewBox 0 0 24 24`, `fill: none`, `stroke: currentColor`, puntas y uniones redondeadas.
- Los nueve: `reloj`, `grafico`, `escudo`, `documento`, `calculadora`, `balanza`, `equipo`, `buscar`, `tilde`.
- Se usan de tres formas: sueltos a 30-38px, dentro de un círculo de 86px con fondo `--grey`, o dentro de un cuadrado de 62px con radio 14.
- **No hay librería de iconos, ni icon-font, ni PNG de icono.** No se linkea Lucide ni Heroicons: si hace falta un glifo que no está, se dibuja con el mismo trazo y se agrega al componente. Nunca se mezcla con otro set.
- **Emoji: no** en material publicado (ver Content fundamentals).
- Caracteres Unicode usados como signo, y son sólo estos: la flecha `→` en las barras de CTA, el punto medio `·` como separador, las flechas de orden `▲ ▼` en las cabeceras de tabla, el guion largo `—` para «sin dato», el lápiz `✎` en el botón de editar del panel, y las comillas tipográficas `" "` en las placas de cita.

**El isotipo no es una "M".** Es un monograma de trazo fino y monolineal que encadena las tres letras de MDO en una sola figura continua, con las curvas abiertas. Se lee como marca, no como inicial; no hay que describirlo como una M ni redibujarlo a partir de una letra.

**Lo que las placas del manual NO tienen.** Ninguna de las ocho lleva chip, cápsula, pastilla redondeada, ni pie con `@mdoconsultores` o la web. La marca se firma con el logo o el isotipo, y nada más. Los componentes `Chip` y `HandleFooter` existen porque los usan las 58 plantillas del repo del estudio, no el manual.

**Logos.** En `assets/logos/` están los 8 SVG originales del manual más 9 tintes planos derivados (navy / paper / slate de cada logo), porque `currentColor` no llega a un `<img>`.

**Tamaño mínimo del logo.** El lockup es una sola imagen: por debajo de ~40px de alto la línea «CONSULTORES» deja de leerse. `principal` y `secundario` no bajan de **40px**; en un espacio chico (cabecera de app, avatar, favicon) va el **isotipo**, a 26-34px — es lo que hace la página de marca del estudio en su slot chico. Los archivos `*-fondo-*.svg` son las placas cuadradas 1080×1080 tal como vienen del manual. No hay ningún logo dibujado a mano acá.

---

## 6. Índice del repositorio

**Raíz**

| Archivo | Qué es |
|---|---|
| `readme.md` | esto |
| `SKILL.md` | el mismo sistema, empaquetado como Agent Skill |
| `github.md` | de qué repo salió cada cosa y cuándo se sincronizó |
| `styles.css` | la hoja global: sólo `@import` |
| `thumbnail.html` | el ícono del design system |

**`tokens/`** — `fonts.css` (carga de Chivo y Open Sans) · `colors.css` · `typography.css` · `spacing.css` · `effects.css` (radios, filetes, foco, movimiento) · `semantic.css` (alias de uso y tema oscuro).

**`assets/logos/`** — 17 SVG: los 8 originales del manual y 9 tintes derivados.

**`guidelines/`** — 21 tarjetas de fundamentos: paleta del manual, escala de tinta, semáforo, contraste, degradé provisorio, superficies · Chivo, Open Sans, volanta, escala editorial, escala de aplicación, números · escala de espacio, margen de seguridad de placas · radios, filetes, estados · isotipo, logo principal, logo secundario, nombre del estudio.

**`components/`** — 25 componentes en 4 grupos:

- `marca/` — **Lockup**, **IsoWatermark**
- `texto/` — **Eyebrow**, **Display**, **Lede**, **Rule**
- `redes/` — **Plate**, **PlateHeader**, **Chip**, **HandleFooter**, **SourceFooter**, **BigNumber**, **Slot**, **PageIndex**
- `panel/` — **Icon**, **Button**, **Field**, **StatCard**, **Pill**, **Tabs**, **DataTable** (+ **Cell**), **UsageMeter**, **StatusBar**, **Callout**, **Modal**

Cada uno con su `.d.ts` (contrato de props) y su `.prompt.md` (cuándo usarlo y con qué valores).

**`ui_kits/`**

- `redes/` — estudio de placas: **las 8 oficiales del manual** (grupo «Manual 4:5», ids `mn-*`) más 13 del repo del estudio, con contenido de ejemplo, placeholders y zona segura.
- `redes/mdo-brand.css` — la versión 2.0 del CSS de marca de las 58 placas, para commitear en `mdo-automatizaciones-redes`: mismos nombres de variables y clases, valores nuevos.

**`templates/`** — los documentos del estudio y los puntos de partida:

| Template | Qué es | Formato |
|---|---|---|
| `propuesta-honorarios/` | Presupuesto largo, módulos de alcance colapsables, aceptación por email. Con `PROMPT.md` y `tarifas.json` | HTML / PDF |
| `presupuesto-simple/` | La versión corta: un área con sus sub-áreas. Con `PROMPT.md` | PDF A4, 1–2 hojas |
| `manifestacion-bienes/` | F.762 + activo/pasivo + detalle de inmuebles + firma. Con `PROMPT.md` | PDF A4 |
| `carta-presentacion/` | Presentación institucional: servicios, socios, clientes, tecnología | Email |
| `onboarding-bienvenida/` | Alta de cliente: áreas, referentes y próximos pasos | Email |
| `onboarding-impuestos/` | Alta del sector Impuestos: modalidad operativa | Email |
| `notificacion-interna/` | Aviso interno de alta de cliente: legajo, servicios, referentes | Email |
| `placa-redes/` | Artboard 1080×1080 con la marca puesta | Placa de redes |

Los siete documentos vienen del proyecto **MDO Design System** (id `25cdebbe-d283-4be8-8d5e-a171bcfb7c7a`): se conservaron estructura, textos fijos, cuestionarios y reglas de paginado, y se reemplazó sólo la piel (color, tipografía y logo). Las reglas de uso obligatorias están en `CLAUDE.md`.

> Los dos UI kits y las 4 tarjetas de componentes cargan `_ds_bundle.js`, que el compilador genera solo. Los templates y las 21 tarjetas de fundamentos no dependen de él.

### Componentes que son adición intencional

El inventario sale de las fuentes (`mdo-brand.css`, `brand.jsx`, `tpl-utils.jsx`, el CSS del panel). Tres piezas son agregados nuestros, y por qué:

- **`Icon`** — envoltorio para el set de nueve glifos, que en el original estaban sueltos dentro de un archivo de plantillas.
- **`Field`** — unifica en un componente el `input` / `search` / `select` / `textarea` del panel, que en el original son reglas CSS sobre elementos nativos.
- **`Cell`** — el patrón «dato principal + aclaración chica» que el original repite a mano en cada celda.

No se agregaron primitivos que el material no define (Avatar, Toast, Tooltip, Accordion…): no existen en ningún producto de MDO.

---

## 7. Lo que falta

1. **No hay monoespaciada, y es una decisión.** El manual define dos familias y nada más; meter una tercera de afuera rompería esa regla. Lo que en las 58 plantillas iba en Geist Mono quedó en **Chivo 700 con versalitas y tracking abierto**, que es el recurso de acento del manual. La clase `.mono` se mantiene con ese nombre para no tocar las plantillas. `--font-mono` sigue existiendo en los tokens, pero sólo para código dentro de interfaces internas, nunca en material de marca.
2. **Los archivos de tipografía.** El manual los entrega como ZIP; acá las dos se cargan por CDN de Google Fonts porque son libres. Si el estudio quiere hostearlas, hay que descomprimir esos ZIP y escribir los `@font-face` — hoy no hay ningún binario de fuente en el proyecto.
3. **El degradé celeste.** Midió casi igual que el gris. Falta confirmar contra la página de degradés si son el mismo o si el celeste real no está en esos archivos.
4. **El blanco roto `#f8f6f6`.** Sale del logo, **no** de la página de paleta, y no tiene CMYK. Es el único color del sistema sin especificación directa.
5. **La errata de la hoja membretada.** El manual (página 18) imprime la web y el mail **sin guion** (`mdoconsultores.com.ar`), y la correcta es `mdo-consultores.com.ar`. Si esa hoja va a imprenta tal cual, quedan hojas con una web que no es la del estudio. La tarjeta personal (página 19) sí la tiene bien.
5. **UI kit de documentos** (propuestas de honorarios, cartas, onboarding). No hay fuente accesible: no se recreó nada. Si aparece una propuesta real, se arma.
6. **El PDF del manual.** No se pudo leer (102 MB, y el wordmark viene trazado a curvas). Todo lo tipográfico de acá viene del código del estudio, no del PDF.

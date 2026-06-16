---
name: mdo-rutina-semanal
model: opus
description: Rutina semanal de posteos MDO Consultores. Lee el Gmail del usuario (label MDO/AUTOMATIZACIONES/Claude/Newsletter, últimos 7 días), elige las 2 noticias más impactantes, arma un tip PyME genérico, renderiza 4 imágenes branded con los templates Claude Design, y crea 4 drafts en Metricool programados Lun/Mié/Jue/Vie 9hs Argentina para la cuenta IG+LinkedIn @mdoconsultores. El jueves alterna semanas: semana impar = story st-09 (CTA), semana par = carrusel cb-* (slides según noticia). Usar cuando el usuario diga "corré la rutina semanal", "armá los posts de la semana", "ejecutá rutina MDO", o cuando se dispare por trigger los lunes 9am Argentina.
---

# Rutina semanal de posteos MDO Consultores

Ejecutar **todos los lunes 9hs Argentina (UTC-3)** para armar los 4 posteos de la semana como drafts en Metricool.

## Contexto del negocio

- **Estudio**: Martinez, De Orta & Asociados (MDO Consultores) — Argentina
- **Audiencia IG**: dueños de PyMEs, profesionales independientes, monotributistas
- **Tono**: profesional pero accesible, español rioplatense, NO jerga contable cerrada
- **Cuenta IG**: `@mdoconsultores` · mdo-consultores.com.ar

## Output esperado

4 drafts en Metricool por semana (5 en semanas pares — ver el sábado), todos para la cuenta IG+LinkedIn "Martinez, De Orta & Asociados" (`blogId: 6267636`, networks `instagram` + `linkedin`, timezone `America/Argentina/Buenos_Aires`):

| # | Día/Hora (ARG) | Tipo | Template | Fuente del contenido |
|---|---|---|---|---|
| 1 | Lunes 9hs     | Noticia destacada #1         | `po-13c` (Portrait 1080×1350) | Gmail newsletter |
| 2 | Miércoles 9hs | Noticia destacada #2         | `po-13c` (Portrait 1080×1350) | Gmail newsletter |
| 3 | Jueves 9hs    | Story CTA **o** Carrusel (*) | `st-09` (Story 1080×1920) **o** `cb-*` (1080×1350) | Basado en noticias de la semana |
| 4 | Viernes 9hs   | Gestión PyME (foco en un servicio)  | `po-04` (Portrait 1080×1350) | Generado por LLM |
| 5 | Sábado 11hs (**) | Spotlight de servicio (quincenal) | `po-16` (Portrait 1080×1350) | Generado por LLM · **solo Instagram** |

(*) **Jueves — alternancia por semana ISO**: `$(( $(date +%V) % 2 ))` → `1` = semana impar → **story `st-09`** · `0` = semana par → **carrusel `cb-*`**

(**) **Sábado — solo semanas pares** (`$(( $(date +%V) % 2 )) == 0`): post institucional de marca para variar el formato del feed. **Solo Instagram, NO LinkedIn.** Ver sección 3c.

### ⚠️ Formatos correctos de imagen (regla dura — Instagram 2026)

Instagram dejó de priorizar el cuadrado: **la grilla del perfil ahora muestra todo en vertical 3:4 y recorta los cuadrados**. Por eso TODOS los posts de feed van en **vertical**, nunca en cuadrado (1:1).

| Destino | Ratio | Píxeles | Templates |
|---|---|---|---|
| **Feed (post)** | **4:5 vertical** | **1080 × 1350** | `po-13c`, `po-04`, `po-16`, carrusel `cb-*` |
| **Historia (story)** | **9:16 vertical** | **1080 × 1920** | `st-09` |

- ❌ **NUNCA usar `sq-12` ni ningún template cuadrado (1080×1080) para el feed** — se recorta en la grilla.
- **Zona segura**: logo, titular y CTA lejos de los bordes superior e inferior (la grilla 3:4 le recorta ~12% arriba/abajo a un post 4:5). Los templates ya traen padding generoso; si se edita uno, no bajar de ese margen.
- En las **historias**, además, dejar libre el ~15% superior e inferior (ahí Instagram superpone su UI). Renderizar con `?safe=1` para ver los overlays de zona segura.
- (Opción cero-recorte: 3:4 → 1080×1440, pero requiere rediseñar la altura de los templates. El 4:5 es el estándar y ya está validado en producción.)

## Paso a paso

### 1. Leer Gmail

Usar la MCP de Gmail. Query:
```
label:mdo-automatizaciones-claude-newsletter newer_than:7d
```
(labelId alternativo: `Label_6047302680017632381`)

Levantar todos los threads y leer el primer mensaje de cada uno (asunto + cuerpo).

### 2. Elegir 2 noticias

Criterios de selección (en orden de prioridad):

1. **Impacto normativo**: cambios AFIP/ARCA, decretos, resoluciones nuevas
2. **Vencimientos próximos**: impuestos, presentaciones, prórrogas
3. **Macro/tributario**: tipo de cambio, blanqueo, regímenes especiales
4. **Análisis tributario relevante** para PyMEs

Reglas:

- Las **2 noticias elegidas deben ser temáticamente distintas** (no las dos sobre lo mismo)
- Preferir noticias con fuente clara y verificable
- Evitar opinión política partidaria

Para cada noticia extraer (slots del template `po-13c` — Noticia vertical 4:5):
- `CATEGORIA` — eyebrow corto, ej: "Impuestos · ARCA", "Régimen Simplificado", "PyMEs"
- `TITULAR` — máximo 70 caracteres, redactado por nosotros (no copiar el del medio)
- `BAJADA` — 1-2 líneas (máx 180 chars) que expliquen la novedad concreta
- `CIERRE` — frase de cierre editorial breve en serif (máx ~90 chars), ej: "Un cambio que conviene resolver con tiempo." (en noticias SÍ se pueden mencionar datos/plazos reales — la regla dura de no-números aplica solo al tip del viernes y al spotlight del sábado)
- `FUENTE` — medio + tipo de comunicación, ej: "Cronista · Nota", "ARCA · Resolución oficial"
- `FECHA` — fecha de la noticia, formato "21 may 2026"
- `HANDLE` — siempre `@mdoconsultores`

### 3. Generar tip PyME (3er post)

**PASO 0 — Determinar el servicio de la semana (rotación fija)**:

El servicio sobre el que se enfoca el tip del viernes NO se elige a criterio: se calcula por semana ISO para garantizar cobertura pareja de los 5 servicios PyME-relevantes (Precios de Transferencia queda fuera del ciclo: no aplica a audiencia PyME).

```bash
SERVICIO_IDX=$(( $(date +%V) % 5 ))
# 0 = Contabilidad
# 1 = Tributario
# 2 = Laboral
# 3 = Societario
# 4 = Auditoría
```

El tip y el CTA deben girar en torno al servicio que toque esa semana. El **ángulo creativo y la redacción siguen siendo libres** (ver regla de creatividad abajo), pero el servicio queda fijado por el cálculo. Ver la lista completa de tareas de cada servicio en la sección "Servicios de MDO Consultores".

| IDX | Servicio | CTA sugerido |
|---|---|---|
| 0 | Contabilidad | "Llevamos la contabilidad de tu PyME. Consultanos." |
| 1 | Tributario | "Asesoramiento impositivo para tu empresa. Consultanos." |
| 2 | Laboral | "Liquidamos los sueldos de tu empresa. Consultanos." |
| 3 | Societario | "Te ayudamos a constituir tu sociedad. Consultanos." |
| 4 | Auditoría | "Auditamos los estados contables de tu empresa. Consultanos." |

**REGLAS DURAS — no negociables**:

1. ❌ **NO** mencionar números específicos: montos de monotributo, alícuotas, topes de facturación, importes mínimos no imponibles, etc. (cambian con la normativa)
2. ❌ **NO** mencionar fechas de vencimiento ni plazos específicos
3. ❌ **NO** dar consejos legales o de derecho tributario específicos
4. ✅ **SÍ**: tips genéricos atemporales sobre gestión PyME, hábitos contables, organización financiera

**REGLA DE CREATIVIDAD — obligatoria**:

Cada semana el tip debe ser **distinto en ángulo y estructura**. Los viernes son el post de mayor potencial de engagement (guardados, comentarios). Usar ángulos que generen reacción:

- **Pregunta provocadora**: "¿Por qué el mes en que más vendiste fue el que menos ganaste?"
- **Error común**: "El error de caja que cometen el 80% de las PyMEs (y cómo evitarlo)"
- **Contraintuitivo**: "Facturar más no siempre significa ganar más. Acá el porqué"
- **Perspectiva del contador**: "Lo que tu contador ve en 5 minutos que vos no ves en un año"
- **Mito vs. realidad**: "Mito: 'Si facturo menos no pago impuestos.' Realidad: ..."
- **Decisión concreta**: "Antes de contratar tu primer empleado, hacé estas 3 cosas"
- **Comparación de escenarios**: "PyME A vs PyME B: igual facturación, resultado opuesto. La diferencia estaba en..."

Rotar entre estos ángulos. **Nunca repetir la misma estructura dos semanas seguidas**. Los ejemplos de abajo son de referencia para el tono, NO para copiar literalmente:

- "Separá cuenta personal de cuenta empresa" ← ya usado como referencia, NO reutilizar
- "Reservá un % de cada cobro para impuestos antes de tocar la plata"
- "Tu contador no es un mal necesario, es un asesor — usalo para decisiones, no solo para cumplir"
- "Documentá los gastos el día mismo en una app o planilla: la memoria al cierre miente"

Si el tip generado contiene cualquier número específico o referencia normativa con fecha, **descartarlo y generar otro**.

Mapear a slots de `po-04`:
- `COPETE` — ❌ **NUNCA decir "Tip" / "Tip semanal".** Usar `"Gestión PyME"` o el nombre del servicio de la semana, ej: "Gestión PyME", "Contabilidad", "Asesoramiento impositivo"
- `TITULO` — headline corto del hook (máx 50 chars). Que entre en **máximo 3 líneas** en el render
- `BAJADA` — explicación breve (máx 150 chars)
- `BULLET_1`..`BULLET_4` — **siempre los 4** (si pasás menos, el template muestra el placeholder `[BULLET_N]`). Cada bullet **de 1 línea** (máx ~36 chars): si son de 2 líneas, el contenido desborda y **se corta el pie**
- `CTA` — frase de cierre que referencia un servicio real de MDO. Ver lista completa abajo. Ej: "Llevamos la contabilidad de tu PyME. Consultanos." / "Asesoramiento impositivo para tu empresa. Consultanos." — ❌ NO inventar servicios que MDO no presta
- `HANDLE` — `@mdoconsultores`

⚠️ **Al renderizar `po-04`, verificar SIEMPRE que el pie (`@mdoconsultores · Buenos Aires`) quede visible.** Si no se ve, el texto desbordó: acortar bullets a 1 línea cada uno y/o el título.

### 3b. Generar contenido del jueves

Determinar el tipo según semana ISO del lunes de la semana en curso:

```bash
SEMANA_TIPO=$(( $(date +%V) % 2 ))
# 1 = semana impar → story st-09
# 0 = semana par  → carrusel cb-*
```

**Opción A — Story `st-09` (semana impar)**

Slots del template:
- `COPETE` — ej: "Consultanos"
- `TITULAR_1` — beneficio clave, **máx 10 chars** (1 palabra o 2 muy cortas), ej: "Ordená", "Crecé", "Hablemos"
- `TITULAR_2` — segundo punto, **máx 10 chars** (el serif es 92px, el más grande del template), ej: "tu PyME", "con MDO", "antes"
- `TITULAR_3` — remate, **máx 12 chars** con punto, ej: "con MDO.", "hoy mismo.", "de firmar."
- `BAJADA` — cierre breve, ej: "Contabilidad, impuestos y nómina. Un solo equipo."
- `CANAL_1_LABEL` / `CANAL_1_VALOR` — ej: "Web" / "mdo-consultores.com.ar"
- `CANAL_2_LABEL` / `CANAL_2_VALOR` — ej: "IG" / "@mdoconsultores"
- `CANAL_3_LABEL` / `CANAL_3_VALOR` — ej: "Mail" / "info@mdo-consultores.com.ar"
- `HANDLE` — `@mdoconsultores`

⚠️ **CONSTRAINT CRÍTICO st-09**: El template usa 72px (TITULAR_1/3) y 92px (TITULAR_2) sobre un artboard de 480px (→ 400px útiles con padding). Frases largas DESBORDAN el borde derecho y se cortan. Usar SIEMPRE palabras sueltas o frases de máximo 2-3 palabras muy cortas. Verificar mentalmente: ~40px por carácter bold a 72px.

Contenido: institucional/CTA, NO atado a ninguna noticia puntual.

**Opción B — Carrusel `cb-*` (semana par)**

Usar siempre `cb-cover` como tapa + tantos slides de contenido como necesite la noticia (mínimo 2, máximo 3: `cb-tip1`, `cb-tip2`, `cb-tip3`).

El contenido debe profundizar en **una de las 2 noticias de la semana** (la más compleja o con más puntos a explicar).

Slots de `cb-cover`:
- `COPETE` — ej: "Impuestos · ARCA"
- `TITULO_SANS` — primera línea del título (sin serif)
- `TITULO_SERIF` — segunda línea en serif italic
- `BAJADA` — subtítulo breve
- `SWIPE_CTA` — ej: "Deslizá para entender el cambio"
- `CHROME_LABEL` — ej: "MDO Consultores"

Slots de cada slide de contenido (`cb-tip1`, `cb-tip2`, `cb-tip3`):
- `TITULAR` — punto o pregunta clave del slide
- `CUERPO` — explicación (2-3 líneas)
- `TAKEAWAY` — frase de cierre del slide, la idea que se lleva el lector
- `CHROME_LABEL` — ej: "MDO Consultores"

Renderizar cada slide por separado con su template ID correspondiente. Los archivos del carrusel llevan sufijo `-a`, `-b`, `-c`:
- `posts/YYYY-MM-DD-3-cover.png` → `cb-cover`
- `posts/YYYY-MM-DD-3-s1.png` → `cb-tip1`
- `posts/YYYY-MM-DD-3-s2.png` → `cb-tip2`
- (si hay 3er slide) `posts/YYYY-MM-DD-3-s3.png` → `cb-tip3`

En Metricool, el carrusel se crea como un único post con todas las imágenes en el array `media` en orden.

### 3c. Generar spotlight de servicio del sábado (SOLO semanas pares)

Este post es **quincenal**: solo se genera cuando la semana ISO es par (`$(( $(date +%V) % 2 )) == 0`). En semanas impares, **omitir este paso** (la rutina genera 4 posts, no 5).

Objetivo: variar el formato del feed con un post **institucional de marca**, no de noticias ni de tips. Logo con presencia + un servicio + una sola línea de beneficio.

- **Template**: `po-16` (spotlight de servicio, navy con isologo grande de fondo)
- **Día/hora**: sábado de esa semana, 11hs Argentina (`-03:00`)
- **Red**: **SOLO Instagram** (NO LinkedIn — es un post liviano de marca)
- **Servicio**: el **mismo que tocó el tip del viernes de esa semana** → reutilizar `SERVICIO_IDX=$(( $(date +%V) % 5 ))` (ver tabla en sección 3). El sábado refuerza el servicio de la quincena.

Slots de `po-16`:
- `COPETE` — siempre "Servicios"
- `TITULO` — nombre del servicio en grande (máx ~24 chars/línea, entra en 2 líneas serif). Ej: "Asesoramiento Impositivo", "Liquidación de Sueldos", "Contabilidad para PyMEs"
- `BAJADA` — **UNA** línea de beneficio (máx ~110 chars). NO listar tareas ni repetir el título. Hablar del beneficio para el cliente, no del "qué hacemos".
- `HANDLE` — `@mdoconsultores`

Líneas de beneficio de referencia (escribir una nueva en ese estilo, NO copiar literal):
- **Tributario**: "Planificamos la carga fiscal de tu PyME para que pagues lo justo, sin sorpresas."
- **Contabilidad**: "Tus balances y tu gestión al día, para decidir con números reales."
- **Laboral**: "Liquidamos los sueldos de tu equipo y te sacamos el peso de encima."
- **Societario**: "Te acompañamos desde la constitución de tu sociedad hasta cada trámite en IGJ."
- **Auditoría**: "Auditamos tus estados contables con la mirada que tu empresa necesita."

Nombre del archivo: `posts/YYYY-MM-DD-5.png` (fecha = sábado de publicación).

⚠️ Aplican las mismas reglas duras que el tip del viernes: NO números específicos, NO fechas/plazos, NO consejo legal puntual.

### 4. Renderizar las 4 imágenes (o más, si el jueves es carrusel o hay spotlight de sábado)

Para cada post:

```bash
node scripts/render.js \
  --template po-13c \
  --out posts/YYYY-MM-DD-N.png \
  --slots '{"CATEGORIA":"...","TITULAR":"...","BAJADA":"...","CIERRE":"...","FUENTE":"...","FECHA":"...","HANDLE":"@mdoconsultores"}'
```

Templates por día (todos verticales — ver "Formatos correctos de imagen"):
- Lunes y miércoles: `--template po-13c` (noticia vertical 4:5 · 1080×1350)
- Jueves (story): `--template st-09` (9:16 · 1080×1920)
- Jueves (carrusel): renderizar cada slide con su template (`cb-cover`, `cb-tip1`, etc.)
- Viernes: `--template po-04` (4:5 · 1080×1350)
- Sábado (solo semanas pares): `--template po-16` (4:5 · 1080×1350)

Nombrado: `posts/YYYY-MM-DD-N.png` donde:
- `YYYY-MM-DD` = fecha de publicación
- `N` = 1 (lunes), 2 (miércoles), 3 (jueves), 4 (viernes), 5 (sábado)
- Carrusel del jueves: `posts/YYYY-MM-DD-3-cover.png`, `posts/YYYY-MM-DD-3-s1.png`, etc.

⚠️ **VERIFICACIÓN VISUAL OBLIGATORIA — antes de crear cualquier draft**:

Después de renderizar, **abrir cada PNG y mirarlo** (tool Read sobre el archivo). NO crear el draft en Metricool sin haber visto la imagen. Chequear:
- El texto NO se sale ni se corta en ningún borde.
- El titular entra completo (en `st-09` los titulares son cortísimos, ver constraint).
- Hay margen de seguridad amplio en los 4 bordes → **Instagram recorta los bordes en la grilla del feed**, así que el contenido pegado al margen se ve cortado en el perfil aunque el PNG esté bien. Los templates ya usan padding generoso (`sq-12`=72, `po-04`=68, `po-16`=64 sobre base 540); si se toca un template, mantener ese margen o más.

Si una imagen tiene texto cortado o pegado al borde, **NO crear el draft**: acortar el texto o ajustar el template y volver a renderizar. Un post mal renderizado que ya se publicó NO se puede corregir.

### 5. Commitear y pushear los PNGs a GitHub

Antes de crear los drafts en Metricool, los PNGs deben estar en GitHub para que Metricool los descargue y los copie a su CDN:

```bash
git add posts/
git commit -m "posts: rutina semanal $(date +%Y-%m-%d)"
git push origin <branch>
```

URL pública de cada imagen:
```
https://raw.githubusercontent.com/jmartinez-sketch/mdo-automatizaciones-redes/main/posts/YYYY-MM-DD-N.png
```

> **Cache busting**: si se **actualiza** un PNG ya referenciado en un draft (ej: corregir márgenes), Metricool tiene cacheada la versión vieja en su CDN. Al llamar `updateScheduledPost`, agregar un query param a la URL (`...-N.png?v=2`) para forzar que Metricool re-descargue la imagen nueva. `raw.githubusercontent.com` ignora el query param y sirve el archivo igual.

### 6. Crear los drafts en Metricool (4 por semana, 5 en semanas pares)

Usar la MCP de Metricool: `createScheduledPost`.

> **Recordatorios de red por post:**
> - Posts 1, 2, 4 (noticias + tip viernes): `providers` con `instagram` **y** `linkedin`.
> - Post 3 (jueves): si es **story `st-09`**, Instagram NO admite texto en stories → crear 2 posts separados (IG Story sin texto + LinkedIn con texto). Si es **carrusel**, IG + LinkedIn normal.
> - Post 5 (sábado spotlight, solo semanas pares): `providers` con **solo `instagram`**.

Para cada post:

```jsonc
{
  "blogId": "6267636",
  "date": "<ISO con offset ART, ej: 2026-05-25T09:00:00-03:00>",
  "info": {
    "text": "<texto plano del posteo, ver sección 7>",
    "draft": true,
    "autoPublish": false,
    "providers": [{"network": "instagram"}, {"network": "linkedin"}],
    "publicationDate": {
      "dateTime": "<YYYY-MM-DDTHH:mm:ss, ej: 2026-05-25T09:00:00>",
      "timezone": "America/Argentina/Buenos_Aires"
    },
    "media": ["https://raw.githubusercontent.com/jmartinez-sketch/mdo-automatizaciones-redes/main/posts/YYYY-MM-DD-N.png"],
    "mediaAltText": [""],
    "shortener": false,
    "smartLinkData": {"ids": []},
    "firstCommentText": "",
    "hasNotReadNotes": false,
    "descendants": [],
    "instagramData": {"type": "POST", "showReelOnFeed": true, "collaborators": []},
    "linkedinData": {"type": "post", "previewIncluded": true}
  }
}
```

Notas:
- `draft: true` deja el post como borrador → el usuario lo aprueba a mano desde Metricool antes de que salga
- `autoPublish: false` es red de seguridad extra (no publica solo aunque la fecha llegue)
- Metricool descarga la imagen del repo y la copia a su CDN al crear el post, así que aunque el repo se vuelva privado después, la imagen ya queda hospedada por Metricool
- Guardar el `id` y `uuid` de cada post creado por si hay que actualizarlo después con `updateScheduledPost`

### 7. Texto del posteo (campo `text` de Metricool)

Instagram NO soporta HTML — usar texto plano con saltos de línea (`\n` reales en el JSON, o `\n\n` para párrafo).

Estructura recomendada para noticias:

```
Hook directo (1 línea con la noticia clave)

Detalle: qué cambió, a quién afecta, desde cuándo (2-3 líneas).

Impacto: qué significa esto en la práctica para vos / tu PyME.

—

📞 Consultanos: mdo-consultores.com.ar

#MDOConsultores #Impuestos #Contabilidad #PyMEs #Argentina #AFIP #ARCA
```

Estructura para tip PyME:

```
Gestión PyME

[Tip principal en 1-2 líneas]

Por qué importa: [breve explicación].

—

📞 Auditá tu setup contable con nosotros: mdo-consultores.com.ar

#MDOConsultores #GestiónPyME #Contabilidad #Argentina
```

Reglas de texto:

- Largo total: entre 600-1200 caracteres
- Español rioplatense, "vos" no "tú"
- Sin emojis salvo el 📞 al CTA
- Hashtags al final, máximo 8
- Siempre incluir `#MDOConsultores`

## Servicios de MDO Consultores (fuente: archivo web oficial)

Usar exclusivamente estos servicios para los CTAs del viernes y cualquier referencia a lo que hace el estudio. ❌ NO mencionar servicios fuera de esta lista (ej: monotributo, análisis de rentabilidad, consultoría financiera).

### 1. Tributario — Asesoramiento Impositivo y Previsional
Liquidación de IVA, Portal IVA, Ingresos Brutos / Convenio Multilateral, Ganancias, Bienes Personales, DDJJ mensuales y anuales, reintegros IVA por exportaciones, recupero de créditos fiscales, exenciones, exclusión de regímenes de retención/percepción, planes de pago y moratorias, planificación fiscal, due diligence impositivo y previsional, ajuste por inflación impositivo, reorganización de empresas, inspecciones AFIP/ARCA/ARBA/AGIP, patrocinio ante el Tribunal Fiscal.

### 2. Precios de Transferencia
Estudios de precios de transferencia, transacciones entre partes vinculadas, Master File, Country by Country Report (CbCR), documentación y DDJJ, defensa ante ARCA (auditorías, APAs y ajustes).

### 3. Auditoría — Estados Contables
Auditoría de estados contables, revisiones limitadas, auditoría operativa y de procesos, auditoría interna, control interno y gestión de riesgos, procedimientos acordados, certificaciones contables, informes periciales (pericia contable), implementación de NIIF/IFRS, prevención de lavado de activos, valuación de empresas.

### 4. Societario
Constitución de sociedades (SA, SRL, SAS), trámites IGJ y registros provinciales, actas societarias, aumento de capital, reforma de estatutos, designación de autoridades / cambio de sede, fusiones y adquisiciones, escisiones y transformaciones, transferencia de fondo de comercio, contratos comerciales.

### 5. Contabilidad y Gestión para PyMEs
Balances, estados contables, asesoría contable, registración de operaciones, conciliaciones de cuentas, libros de comercio, reportes de gestión, gestión de pagos y cobranzas, control presupuestario económico y financiero, ajuste por inflación contable, certificación de ingresos, certificación de origen de fondos.

### 6. Laboral — Liquidación de Sueldos
Liquidación de sueldos y jornales, recibos de sueldos, alta de empleados, cargas sociales, convenios colectivos de trabajo, ART y Seguro de Vida Obligatorio, cálculo de indemnizaciones, asesoramiento laboral, inspecciones laborales.

---

**CTAs válidos por servicio** (ejemplos):
- Tributario: "Asesoramiento impositivo para tu empresa. Consultanos."
- Auditoría: "Auditamos los estados contables de tu empresa. Consultanos."
- Contabilidad: "Llevamos la contabilidad de tu PyME. Consultanos."
- Laboral: "Liquidamos los sueldos de tu empresa. Consultanos."
- Societario: "Te ayudamos a constituir tu sociedad. Consultanos."
- Precios de Transferencia: solo relevante para empresas con operaciones entre vinculadas — no usar en posts genéricos de PyME.

## Tareas de cierre

Cuando los 4 drafts estén creados:

1. Reportar al usuario en chat (si la sesión es interactiva) o por log:
   - Las noticias/contenidos elegidos para cada día (lunes, miércoles, jueves, viernes)
   - URLs de las imágenes en GitHub
   - `id` y `uuid` de los 4 drafts en Metricool
   - Recordatorio: "Revisá los drafts en https://app.metricool.com/planner y aprobalos antes de que llegue cada fecha de publicación"
2. Si algo falló (Gmail vacío, render falló, Metricool rechazó), reportar específicamente qué y NO crear drafts a medias.

## Notas técnicas

- **Setup**: si la sesión es fresca, correr primero `bash scripts/setup.sh` para instalar Node modules + Chromium.
- **Branch**: la rutina automática corre sobre `main` (default branch). Las sesiones manuales pueden trabajar sobre branches `claude/*` efímeras, pero al final todo se mergea a `main`.
- **Timezone**: Argentina = UTC-3. Sin DST. Lunes 9hs ARG = Lunes 12:00 UTC.
- **Templates disponibles**: ver `mdo-templates/PLACEHOLDERS.md` para el catálogo completo.
- **Metricool**: la autenticación viene del MCP, no hardcodear nada. brand `blogId: 6267636`.
- **Repo público**: las URLs `raw.githubusercontent.com/...` deben responder 200 al momento de crear el post (Metricool descarga la imagen una vez y la copia a su CDN). Si el repo es privado, el paso 6 falla.

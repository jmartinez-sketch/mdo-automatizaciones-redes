---
name: mdo-rutina-semanal
model: opus
description: Rutina semanal de posteos MDO Consultores. Corre los lunes pero NO publica ese día. Lee el Gmail del usuario (label MDO/AUTOMATIZACIONES/Claude/Newsletter, últimos 7 días), elige la noticia más impactante, arma un post de gestión PyME, renderiza las imágenes branded con los templates Claude Design y crea 4 drafts en Metricool programados Mié/Jue/Vie 9hs Argentina (+ sábado 11hs en semanas pares), cada uno con Instagram y LinkedIn juntos salvo el jueves de story para la cuenta IG+LinkedIn @mdoconsultores. Rota plantillas usando posts/historial-plantillas.json para no repetir las de las últimas 4 semanas. Usar cuando el usuario diga "corré la rutina semanal", "armá los posts de la semana", "ejecutá rutina MDO", o cuando se dispare por trigger los lunes 9am Argentina.
---

# Rutina semanal de posteos MDO Consultores

Ejecutar **todos los lunes 9hs Argentina (UTC-3)** para armar los posteos de la semana como drafts en Metricool.

⚠️ **REGLA DURA — el lunes NO se publica nada.** El lunes es solo el día en que *corre* la rutina: lee el Gmail, arma el contenido y crea los drafts. El primer post de la semana sale el **miércoles**. ❌ Nunca crear un draft con fecha de lunes.

## ⚠️ Marca 2026 — regla dura

El estudio **rebrandeó**. Todo lo que se publique tiene que salir con la marca nueva:

- **Nombre**: el logo dice **MDO CONSULTORES**. El lockup secundario es **MARTINEZ · DE ORTA · GUTIERREZ TABOADA**. ❌ "& Asociados" es el nombre **anterior** y no puede aparecer en nada publicado.
- **Color**: azul noche `#06162D`. ❌ Nunca el azul viejo `#1f4e79`.
- **Tipografías**: **Open Sans** en todo (títulos incluidos) y **Chivo** solo como acento en palabras o frases cortas. ❌ No hay monoespaciada: lo que antes iba en Geist Mono va en Chivo 700 con versalitas.
- **Nunca escribir hex a mano** en una plantilla: usar las variables de `mdo-brand.css`. Los nombres de variable no cambiaron, así que una plantilla bien escrita adopta la marca sola.

La fuente de verdad es el repo **`jmartinez-sketch/mdo-brand`** (`actual/tokens.css` y `actual/brand.json`). Si hay una duda de marca, se resuelve ahí, no acá.

⚠️ **Placas renderizadas antes del 19/08/2026 llevan la marca vieja.** Si hay que reprogramar un post viejo, re-renderizar la imagen primero.

## Contexto del negocio

- **Estudio**: Martinez, De Orta & Gutierrez Taboada (MDO Consultores) — Argentina
- **Audiencia IG**: dueños de PyMEs, profesionales independientes, monotributistas
- **Tono**: profesional pero accesible, español rioplatense, NO jerga contable cerrada
- **Cuenta IG**: `@mdoconsultores` · mdo-consultores.com.ar

⚠️ **REGLA DURA — ARCA, nunca AFIP**: el organismo recaudador hoy se llama **ARCA** (Agencia de Recaudación y Control Aduanero). Usar SIEMPRE "ARCA" en títulos, copys, imágenes y hashtags. ❌ Nunca escribir "AFIP", aunque la fuente lo diga — traducirlo a "ARCA".

## Output esperado

**4 drafts por semana** (5 solo cuando la semana ISO cae en `%4==2`, que junta story del jueves con spotlight del sábado), para la cuenta IG+LinkedIn de **MDO Consultores** (`blogId: 6267636`, timezone `America/Argentina/Buenos_Aires`).

**Cada draft lleva Instagram y LinkedIn juntos**, salvo el jueves de story — ver la regla dura del paso 6.

`N` = el número que lleva el archivo PNG (ver paso 4). Va atado al día, no al orden: el `1` era el lunes y queda libre.

| N | Día/Hora (ARG) | Tipo | Plantilla Instagram | Plantilla LinkedIn | Fuente |
|---|---|---|---|---|---|
| ~~1~~ | **Lunes** | **NO se publica** — solo corre la rutina | — | — | — |
| 2 | Miércoles 9hs | Noticia de la semana | `po-13d` (ancla) | comparte la vertical | Gmail newsletter |
| 3 | Jueves 9hs    | Story / carrusel — **ciclo de 4** (*) | según ciclo | `li-02` (solo si es story) | Noticias de la semana |
| 4 | Viernes 9hs   | Gestión PyME (foco en un servicio) | pool de 18 (**) | comparte la vertical | Generado por LLM |
| 5 | Sábado 11hs (***) | Spotlight de servicio (quincenal) | pool de 6 | — (solo IG) | Generado por LLM |

(*) **Jueves — ciclo de 4 semanas**, ver sección 3b. Ya NO es "par/impar": rota entre carrusel, encuesta, CTA y cita.

(**) **Viernes — el template lo elige la IA** entre 18 opciones, **descartando las de las últimas 4 semanas** según el historial (paso 0).

(***) **Sábado — solo semanas pares** (`$(( $(date +%V) % 2 )) == 0`): post institucional de marca. **Solo Instagram, NO LinkedIn.** Ver sección 3c.

### ⚠️ Regla dura — NO repetir contenido de los últimos 3 meses

Además de las plantillas (regla siguiente), **el CONTENIDO no se repite**. Antes de elegir la noticia, el ángulo del jueves, el tip del viernes o el spotlight:

1. Leer las **notas** de TODAS las entradas de `historial` y la lista `temas_previos` de `posts/historial-plantillas.json`.
2. Todo tema publicado en las **últimas 13 semanas (3 meses)** queda **descartado**: mismo hecho normativo, mismo organismo+tema, mismo consejo o el mismo texto de CTA. No alcanza con redactarlo distinto — si un seguidor diría "esto ya lo vi", está repetido.
3. Si la noticia más fuerte del newsletter ya se publicó (ej: una prórroga que vuelve a salir en los medios), elegir la siguiente. Si TODAS las candidatas están repetidas, profundizar un ángulo nuevo de una (qué cambió desde entonces) y decirlo explícitamente en la placa ("Actualización").
4. En el reporte final, indicar para cada post qué se descartó por repetido, si hubo.

Esto no es teórico — pasó de verdad (auditoría del 17/08/2026 sobre 3 meses de placas):
- La prórroga de balances de ARCA salió **2 veces** (29/06 y 08/07).
- IGJ digital salió **3 veces** (06/07, carrusel del 09/07 y 15/07).
- La story CTA "Ordená tu PyME con MDO" salió **4 veces con el mismo texto** (19/06, 16/07, 30/07 y 20/08) — la última el usuario la borró del planificador porque ya la había visto demasiado.

**Para que esta regla funcione mañana**: la `nota` de cada entrada nueva del historial (paso 8) DEBE describir el tema con precisión ("Moratoria Laboral ARCA empleadores"), no en genérico ("noticia impositiva").

⚠️ En las **stories CTA** (`st-09`/`st-09b`) la regla aplica al TEXTO: los titulares y la bajada deben ser distintos de los de las últimas 13 semanas. La plantilla puede repetirse (el ciclo la trae cada 4 semanas), las palabras no.

### ⚠️ Regla dura — variedad de plantillas

La rutina tiene **76 plantillas disponibles** y el riesgo real es caer siempre en las mismas 5-6. Por eso:

1. **Antes de elegir cualquier plantilla, leer `posts/historial-plantillas.json`** (paso 0). Lo usado en las últimas 4 semanas queda **descartado**, salvo la ancla `po-13d`.
2. **Al terminar, escribir el historial** (paso 8). Si no se escribe, la próxima corrida no tiene memoria y la variedad se rompe.
3. Si un pool se agotó (todas sus plantillas usadas en las últimas 4 semanas), reiniciar ese pool y elegir la **menos reciente**, no la primera de la lista.
4. **Nunca** elegir una plantilla "porque es la que siempre funciona". El catálogo existe para usarse.

### ⚠️ Formatos correctos de imagen (regla dura — Instagram 2026)

Instagram dejó de priorizar el cuadrado: **la grilla del perfil ahora muestra todo en vertical 3:4 y recorta los cuadrados**. Por eso TODOS los posts de feed van en **vertical**, nunca en cuadrado (1:1).

| Destino | Ratio | Píxeles | Templates |
|---|---|---|---|
| **Feed Instagram (post)** | **4:5 vertical** | **1080 × 1350** | `po-13d`, `po-13e`, `po-04`, `po-16`, `po-2x`, `po-3x`, carrusel `cb-*` |
| **Historia Instagram (story)** | **9:16 vertical** | **1080 × 1920** | `st-08`, `st-09`, `st-10` |
| **Feed LinkedIn** | **1.91:1 horizontal** | **1200 × 628** | `li-01`, `li-02`, `li-03` |

- ❌ **NUNCA usar `sq-12` ni ningún template cuadrado (1080×1080) para el feed** — se recorta en la grilla.

⚠️ **LinkedIn comparte la imagen vertical de Instagram.** LinkedIn muestra las verticales 4:5 sin romperlas — no están optimizadas para su feed, pero se ven bien. Como un post de Metricool tiene una sola imagen para todas sus redes, la alternativa era duplicar los drafts, y **el usuario la rechazó explícitamente** (ver la regla dura del paso 6). Así que:

- **Miércoles y viernes**: un solo draft con IG + LinkedIn, imagen vertical compartida. **No** renderizar `-li`.
- **Jueves de story**: es el único día que necesita una horizontal `li-02`, porque LinkedIn no tiene stories y no hay forma de meterlas en el mismo post.
- **Jueves de carrusel**: el carrusel `cb-*` va tal cual a las dos redes — LinkedIn soporta carruseles verticales sin recortarlos.
- **Zona segura**: logo, titular y CTA lejos de los bordes superior e inferior (la grilla 3:4 le recorta ~12% arriba/abajo a un post 4:5). Los templates ya traen padding generoso; si se edita uno, no bajar de ese margen.
- En las **historias**, además, dejar libre el ~15% superior e inferior (ahí Instagram superpone su UI). Renderizar con `?safe=1` para ver los overlays de zona segura.
- (Opción cero-recorte: 3:4 → 1080×1440, pero requiere rediseñar la altura de los templates. El 4:5 es el estándar y ya está validado en producción.)

## Paso a paso

### 0. Leer el historial de plantillas (SIEMPRE primero)

⚠️ **Ojo con de dónde se lee.** Cada corrida semanal trabaja en su propia rama efímera (`claude/*`) que **no se mergea a `main`**. Por eso el historial más nuevo puede estar en `main` **o** en la rama de una corrida anterior. Buscar el más completo de los dos:

```bash
git fetch origin --prune -q

# 1) el de main
git show origin/main:posts/historial-plantillas.json 2>/dev/null > /tmp/hist-main.json

# 2) el de la rama de la corrida más reciente que lo tenga
for b in $(git for-each-ref --sort=-committerdate --format='%(refname:short)' refs/remotes/origin | head -12); do
  if git cat-file -e "$b:posts/historial-plantillas.json" 2>/dev/null; then
    git show "$b:posts/historial-plantillas.json" > /tmp/hist-branch.json
    echo "historial encontrado en $b"
    break
  fi
done
```

Quedarse con el que tenga **más entradas en `historial`** y usar ese como base. Copiarlo a `posts/historial-plantillas.json` en la rama de trabajo antes de seguir.

Si ninguno de los dos existe o los dos están vacíos, no hay nada bloqueado: elegir libremente y crear el archivo en el paso 8.

Después, leer las entradas:

```bash
cat posts/historial-plantillas.json
```

Del array `historial`, quedarse con las entradas de las **últimas 4 semanas ISO** y armar la lista de plantillas **bloqueadas** para esta corrida.

```bash
SEMANA=$(date +%V)   # semana ISO actual
```

Reglas de bloqueo:

| Slot | Se bloquea lo usado en… | Excepción |
|---|---|---|
| `noticia` | últimas 4 semanas | `po-13d` es la **ancla**: nunca se bloquea (ver 2b) |
| `jueves` | lo define el ciclo, ver 3b | — |
| `gestion` | últimas 4 semanas | si el pool se agota, usar la **menos reciente** |
| `spotlight` | últimas 4 corridas quincenales | si el pool se agota, usar la **menos reciente** |

Si el archivo no existe o `historial` está vacío (primera corrida), no hay nada bloqueado: elegir libremente y crear el archivo en el paso 8.

⚠️ **No saltear este paso.** Sin leer el historial no hay forma de cumplir las reglas de variedad, y la rutina vuelve a repetir siempre las mismas plantillas.

### 1. Leer Gmail

Usar la MCP de Gmail. Query — **usar exactamente esta forma**, con el nombre del label entre comillas:
```
label:"MDO/AUTOMATIZACIONES/Claude/Newsletter" newer_than:7d
```

⚠️ **Verificado el 11/08/2026**: la forma `label:Label_6047302680017632381` (el ID) y la forma en minúsculas con guiones (`label:mdo-automatizaciones-claude-newsletter`) **devuelven vacío** aunque el label existe y tiene mails. Solo funciona el nombre completo entre comillas. Si la búsqueda vuelve vacía, NO asumir que no hay newsletters: probar de nuevo con esta sintaxis antes de reportar Gmail vacío.

⚠️ **Los mails de Errepar hay que leerlos en HTML.** Pedir `messageFormat: FULL_CONTENT` y leer `htmlBody`: el `plaintextBody` trae solo un stub del tipo "tu software de correo no puede desplegar correos en formato HTML" y **no contiene ninguna noticia**. Con `PLAIN_TEXT` pasa lo mismo. Cada novedad viene en un bloque con `pSeccion` (la categoría), `pTitulo` (el titular) y `pSumario` (el resumen).

Ignorar los bloques que son publicidad de Errepar y no noticias: `CAPACITACIONES`, `ENTRENAMIENTOS`, `BENEFICIOS Y PROMOCIONES` y `CONTENIDO DESTACADO` cuando promociona un producto propio.

Levantar todos los threads y leer el primer mensaje de cada uno (asunto + cuerpo).

### 2. Elegir la noticia de la semana

Criterios de selección (en orden de prioridad):

1. **Impacto normativo**: cambios ARCA, decretos, resoluciones nuevas
2. **Vencimientos próximos**: impuestos, presentaciones, prórrogas
3. **Macro/tributario**: tipo de cambio, blanqueo, regímenes especiales
4. **Análisis tributario relevante** para PyMEs

Reglas:

- Preferir noticias con fuente clara y verificable
- Evitar opinión política partidaria

**Cuántas noticias elegir:**

- **Siempre 1** noticia principal → post del **miércoles**.
- **En semanas de carrusel** (ciclo jueves = `0`, ver 3b) elegir además una **segunda noticia temáticamente distinta** para desarrollar en el carrusel del jueves. Si el newsletter no trae una segunda noticia que valga, usar la principal y profundizarla en el carrusel.

Para cada noticia extraer (slots del template `po-13d` — Noticia vertical 4:5):
- `CATEGORIA` — eyebrow corto, ej: "Impuestos · ARCA", "Régimen Simplificado", "PyMEs"
- `TITULAR` — máximo 70 caracteres, redactado por nosotros (no copiar el del medio)
- `BAJADA` — 1-2 líneas (máx 180 chars) que expliquen la novedad concreta
- `CIERRE` — frase de cierre editorial breve en serif (máx ~90 chars), ej: "Un cambio que conviene resolver con tiempo." (en noticias SÍ se pueden mencionar datos/plazos reales — la regla dura de no-números aplica solo al tip del viernes y al spotlight del sábado)
- `FUENTE` — medio + tipo de comunicación, ej: "Cronista · Nota", "ARCA · Resolución oficial"
- `FECHA` — fecha de la noticia, formato "21 may 2026"
- `HANDLE` — siempre `@mdoconsultores`

### 2b. Elegir la plantilla de la noticia

**`po-13d` es la ancla.** Es la plantilla que hace que el feed sea reconocible: el seguidor ve la placa en la grilla y sabe de una que es una novedad normativa del estudio. Por eso **no rota como los otros slots** y no se bloquea nunca por historial.

Regla de alternancia de color (para que no se fosilice):

- Por defecto: **`po-13d`** (papel/blanco).
- Si las **últimas 2 noticias** del historial fueron `po-13d` → usar **`po-13e`** (misma composición exacta, en navy). Anotarlo en el historial como `po-13e`.

> Este umbral era 3 y se bajó a 2 el 11/08/2026: con una sola noticia por semana, esperar 3 dejaba tres semanas seguidas de placas idénticas en la grilla, que es justo lo que la rotación tiene que evitar. Con 2 alterna cada dos semanas y el feed respira.
- `po-13e` tiene **los mismos 7 slots** que `po-13d` (`CATEGORIA`, `TITULAR`, `BAJADA`, `CIERRE`, `FUENTE`, `FECHA`, `HANDLE`) — no hay que cambiar nada del contenido, solo el id del template.

**Cuándo salirse de la ancla** (opcional, solo si el contenido lo pide con claridad): si la noticia de la semana encaja mucho mejor en otra forma, usar una de éstas en lugar de `po-13d`. Ojo: son la excepción, no la norma — como máximo **una vez cada 4 semanas**.

| Si la noticia… | Conviene | Slots |
|---|---|---|
| Corrige una creencia equivocada muy difundida | `po-34` mito vs. realidad | COPETE, TITULO, MITO, REALIDAD, CTA, HANDLE |
| Compara dos regímenes o dos caminos | `po-32` comparativa A/B | COPETE, TITULO, A_*, B_*, VEREDICTO, HANDLE |
| Trae pasos concretos a seguir | `po-31` explicador 3 pasos | COPETE, TITULO, PASO_N_TIT, PASO_N_TXT, CTA, HANDLE |
| Advierte sobre errores que se van a cometer | `po-35` errores + corrección | COPETE, TITULO, ERROR_N, FIX_N, CTA, HANDLE |

⚠️ En estos 4 casos **se pierden los slots `FUENTE` y `FECHA`**, así que la fuente tiene que ir en el texto del posteo (campo `text` de Metricool). Para noticias normativas duras, preferir siempre la ancla `po-13d`/`po-13e`, que muestra la fuente en la placa.

### 3. Generar el post de Gestión PyME (viernes)

> Internamente lo llamamos "el tip", pero ⚠️ **la palabra "Tip" NUNCA aparece en la placa ni en el texto publicado** (ver regla del `COPETE` más abajo).

**3.1 — Determinar el servicio de la semana (rotación fija)**:

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

#### Catálogo de templates del viernes (referencia — se pueden variar)

El viernes NO está atado a `po-04`. Hay **18 templates disponibles**, todos verticales 4:5 (1080×1350). **Son referencias y puntos de partida**, no una lista cerrada.

**Cómo se decide el template del viernes (NO es rotación ciega):**
- El **servicio** lo fija la rotación por semana ISO (`SERVICIO_IDX`, ver arriba).
- **Descartar primero las plantillas bloqueadas por el historial** (paso 0): todo lo usado en slot `gestion` en las últimas 4 semanas queda fuera. Esto es obligatorio, no una sugerencia.
- Del pool que queda, el **template y el ángulo los elige la IA según el contenido de esa semana**: qué querés decir y cómo se comunica mejor. Elegir el template cuya estructura potencie el mensaje (ver guía abajo).
- Si el pool quedó vacío (las 18 usadas en 4 semanas — improbable), elegir la **menos reciente** del historial.
- Si ningún template existente encaja bien con el ángulo, **crear uno nuevo** usando estos como referencia de estilo (mismo sistema de marca).

⚠️ **Los 18 templates del viernes son un pool real, no una lista decorativa.** Con 18 opciones y bloqueo de 4 semanas, cada viernes hay como mínimo 14 plantillas disponibles: no hay excusa para repetir. Si te encontrás eligiendo `po-04` por default, revisá el historial de nuevo.

**Texto-driven:**
| ID | Estilo | Slots |
|---|---|---|
| `po-04` | Guía/tip: título + 4 bullets (1 línea c/u) + CTA | COPETE, TITULO, BULLET_1..4, CTA, HANDLE |
| `po-21` | Pregunta hero (navy): gancho en pregunta serif | COPETE, PREGUNTA, RESPUESTA, CTA, HANDLE |
| `po-22` | Antes/Después (split papel→navy) | COPETE, SIN_LABEL, SIN_TEXTO, CON_LABEL, CON_TEXTO, CTA, HANDLE |
| `po-23` | Declaración/manifiesto (papel) + firma | COPETE, DECLARACION, APOYO, HANDLE |
| `po-24` | Checklist (blanco): 3 ítems tildados | COPETE, TITULO, ITEM_1..3, CTA, HANDLE |
| `po-25` | Foco/una idea (navy) minimal | COPETE, IDEA, DETALLE, CTA, HANDLE |

**Icon-forward (menos texto, más íconos SVG):**
| ID | Estilo | Slots |
|---|---|---|
| `po-26` | 3 íconos en fila (papel) | COPETE, TITULO, LABEL_1..3, CTA, HANDLE |
| `po-27` | Ícono grande central (navy) | COPETE, TITULO, BAJADA, CTA, HANDLE |
| `po-28` | Proceso en 3 pasos con íconos (papel) | COPETE, TITULO, PASO_1..3, CTA, HANDLE |
| `po-29` | Ícono + frase (navy) | COPETE, FRASE, CTA, HANDLE |
| `po-30` | Grid 2×2 de servicios (blanco), casi sin texto | COPETE, TITULO, LABEL_1..4, HANDLE |

**Contenido y engagement (paquete jul 2026):**
| ID | Estilo | Slots |
|---|---|---|
| `po-31` | Explicador en 3 pasos, cada uno con título **y** cuerpo (po-28 sólo tiene una línea por paso) | COPETE, TITULO, PASO_1_TIT, PASO_1_TXT, PASO_2_TIT, PASO_2_TXT, PASO_3_TIT, PASO_3_TXT, CTA, HANDLE |
| `po-32` | Comparativa A vs. B en dos columnas + veredicto | COPETE, TITULO, A_LABEL, A_TITULO, A_1..3, B_LABEL, B_TITULO, B_1..3, VEREDICTO, HANDLE |
| `po-33` | Elegí tu caso: pregunta + 3 opciones + CTA a comentar | COPETE, PREGUNTA, OPCION_1..3, CTA, HANDLE |
| `po-34` | Mito vs. realidad (el mito va tachado) | COPETE, TITULO, MITO, REALIDAD, CTA, HANDLE |
| `po-35` | 3 errores frecuentes con su corrección | COPETE, TITULO, ERROR_1, FIX_1, ERROR_2, FIX_2, ERROR_3, FIX_3, CTA, HANDLE |
| `po-36` | Testimonio de cliente (sin nombre propio: sector + tamaño) | COPETE, TESTIMONIO, CLIENTE_TIPO, CLIENTE_DETALLE, SERVICIO, HANDLE |
| `po-37` | Vencimientos de la semana **en el feed** — la story se va en 24 h, ésta queda para guardar | COPETE, SEMANA, DIA_1..4, MES_1..4, IMPUESTO_1..4, PERIODO_1..4, CTA, HANDLE |

**Guía ángulo → template (orientativa, no obligatoria):**
| Si el mensaje es… | Conviene |
|---|---|
| Un gancho/pregunta que abre curiosidad | `po-21` |
| Mostrar el contraste problema vs. solución | `po-22` |
| Una postura o frase con autoridad | `po-23`, `po-25`, `po-29` |
| Un autodiagnóstico ("¿tenés esto resuelto?") | `po-24` |
| Enumerar beneficios concretos | `po-04`, `po-26` |
| Explicar cómo trabajamos / un proceso | `po-28` (una línea por paso) o `po-31` (título + cuerpo por paso) |
| Una sola idea fuerte y limpia | `po-25`, `po-27`, `po-29` |
| Mostrar la amplitud de servicios | `po-30` |
| Tip con varios puntos prácticos | `po-04` |
| Corregir una creencia equivocada del cliente | `po-34` |
| Advertir sobre errores que se cometen seguido | `po-35` |
| Comparar dos caminos (hacerlo solo vs. tercerizar, monotributo vs. RI) | `po-32` |
| Buscar comentarios / conversación | `po-33` |
| Prueba social sin exponer al cliente | `po-36` |
| Los vencimientos del mes, para que los guarden | `po-37` |

→ Si nada encaja, **diseñar un template nuevo** inspirado en estos y registrarlo (ver "Dónde vive el código").

**Reglas que aplican a TODOS los templates del viernes:**
- `COPETE` NUNCA dice "Tip". Usar "Gestión PyME" o el nombre del servicio de la semana.
- **ARCA, nunca AFIP.**
- Anclar al servicio de la semana (rotación `SERVICIO_IDX`, ver 3.1).
- **Verificar siempre la imagen renderizada**: pie/footer visible, nada cortado, márgenes ok.

**Dónde vive el código (por si hay que crear uno nuevo o variar):**
- `po-04` → `mdo-templates/templates-portrait.jsx`
- `po-21`–`po-25` → `mdo-templates/templates-friday.jsx`
- `po-26`–`po-30` → `mdo-templates/templates-friday-b.jsx` (incluye el set de íconos SVG line-style)
- Para un template nuevo: escribir el componente reusando el sistema de marca **v2.0** (variables de `mdo-brand.css` — NUNCA hex a mano; `var(--font-body)` Open Sans para todo, `var(--font-accent)` Chivo solo para acentos cortos; `Lockup`, `IsoWatermark`, clases `.tpl`/`.navy`) y registrarlo en `render.html` (`TEMPLATES`). Mantener padding generoso (margen seguro de grilla).

### 3b. Generar contenido del jueves

**Ciclo de 4 semanas** (antes era un simple par/impar que dejaba el jueves siempre igual):

```bash
JUEVES_TIPO=$(( $(date +%V) % 4 ))
# 0 → Carrusel cb-*        (noticia profunda)  → opción B
# 1 → Story st-10          (encuesta A/B)      → opción C
# 2 → Story st-09 / st-09b (CTA institucional) → opción A
# 3 → Story st-08 / st-08c (cita)              → opción D
```

Dentro de las opciones con variante de color (`st-09`/`st-09b`, `st-08`/`st-08c`), elegir la que **no** figure en el historial del slot `jueves` en las últimas 4 semanas. Si ninguna figura, empezar por la versión base.

> Las historias de Instagram duran 24 h. Si en alguna semana querés que el contenido del jueves quede en el feed, `po-37` (vencimientos en el feed) es la alternativa vertical: se guarda y se comparte.

**Opción A — Story `st-09` / `st-09b` (ciclo = 2)**

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

**Opción C — Story encuesta `st-10` (ciclo = 1)**

El formato de mayor interacción: Instagram permite pegarle el sticker de encuesta encima. Slots:

- `COPETE` — ej: "Gestión PyME", "Contanos"
- `PREGUNTA` — la pregunta, **máx ~50 chars**. El cuerpo se ajusta solo por tramos (44px hasta 28 chars · 38px hasta 46 · 32px hasta 66), así que ~35 chars ocupan 3 líneas y entran cómodas. Ej: "¿Cómo llevás la caja de tu empresa?"
- `OPCION_A` — primera opción, **máx ~30 chars**. Ej: "Planilla de Excel"
- `OPCION_B` — segunda opción, **máx ~30 chars**. Ej: "Sistema de gestión"
- `PIE` — cierre breve. Ej: "Respondé en la encuesta 👆"
- `HANDLE` — `@mdoconsultores`

Contenido: una pregunta de gestión real, sin datos normativos. Anclarla al servicio de la semana (`SERVICIO_IDX`). Las 2 opciones tienen que ser ambas **razonables** — no una obviamente mala, o nadie vota.

⚠️ Al crear el draft, avisar al usuario en el reporte final que **le tiene que pegar el sticker de encuesta a mano en Instagram** (Metricool sube la imagen, el sticker interactivo se agrega en la app).

**Opción D — Story cita `st-08` / `st-08c` (ciclo = 3)**

Slots (los mismos en las 3 variantes de color):

- `COPETE` — ej: "Pensamiento", "Nuestra mirada"
- `CITA` — frase propia del estudio sobre gestión o asesoramiento, **máx ~110 chars**. NO citar a terceros ni inventar autores célebres.
- `AUTOR` — `"Estudio MDO"`
- `ROL_AUTOR` — ej: "Consultores en gestión"
- `HANDLE` — `@mdoconsultores`

Variantes: `st-08` (base), `st-08b` (navy), `st-08c` (minimal blanca). Elegir la que no esté en el historial.

**Opción B — Carrusel `cb-*` (ciclo = 0)**

Usar siempre `cb-cover` como tapa + tantos slides de contenido como necesite la noticia (mínimo 2, máximo 3: `cb-tip1`, `cb-tip2`, `cb-tip3`).

El contenido debe profundizar en la **segunda noticia de la semana** (la que no salió el miércoles — ver paso 2). Si el newsletter no trajo una segunda noticia que valga, profundizar la del miércoles desde otro ángulo, sin repetir el mismo titular.

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

Este post es **quincenal**: solo se genera cuando la semana ISO es par (`$(( $(date +%V) % 2 )) == 0`). En semanas impares, **omitir este paso** (la rutina genera 3 posts, no 4).

Objetivo: variar el formato del feed con un post **institucional de marca**, no de noticias ni de tips. Logo con presencia + un servicio + una sola línea de beneficio.

- **Día/hora**: sábado de esa semana, 11hs Argentina (`-03:00`)
- **Red**: **SOLO Instagram** (NO LinkedIn — es un post liviano de marca)
- **Servicio**: el **mismo que tocó el tip del viernes de esa semana** → reutilizar `SERVICIO_IDX=$(( $(date +%V) % 5 ))` (ver tabla en sección 3). El sábado refuerza el servicio de la quincena.

**Template — pool de 6, descartando las últimas 4 del historial** (slot `spotlight`):

| ID | Estilo | Slots |
|---|---|---|
| `po-16` | Spotlight de servicio (navy, isologo grande de fondo) | COPETE, TITULO, BAJADA, HANDLE |
| `po-23` | Declaración/manifiesto (papel) + firma | COPETE, DECLARACION, APOYO, HANDLE |
| `po-25` | Foco / una sola idea (navy) minimal | COPETE, IDEA, DETALLE, CTA, HANDLE |
| `po-29` | Ícono + frase (navy) | COPETE, FRASE, CTA, HANDLE |
| `po-30` | Grid 2×2 de servicios (blanco), casi sin texto | COPETE, TITULO, LABEL_1..4, HANDLE |
| `po-36` | Testimonio de cliente (sin nombre propio) | COPETE, TESTIMONIO, CLIENTE_TIPO, CLIENTE_DETALLE, SERVICIO, HANDLE |

Notas del pool:
- `po-30` (grid de servicios) es el único que **no** se ancla a un solo servicio: muestra la amplitud del estudio. Usarlo como máximo **1 vez cada 2 meses**.
- `po-36` (testimonio) requiere un testimonio **real o claramente genérico**. ❌ Nunca inventar una cita atribuida a un cliente identificable. Describir al cliente por sector y tamaño ("PyME textil, 12 empleados"), nunca por nombre.

Slots de `po-16` (el más usado del pool):
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

### 4. Renderizar las imágenes de Instagram

Para cada post:

```bash
node scripts/render.js \
  --template po-13d \
  --out posts/YYYY-MM-DD-N.png \
  --slots '{"CATEGORIA":"...","TITULAR":"...","BAJADA":"...","CIERRE":"...","FUENTE":"...","FECHA":"...","HANDLE":"@mdoconsultores"}'
```

Templates por día (todos verticales — ver "Formatos correctos de imagen"):

| Día | Template | Tamaño |
|---|---|---|
| ~~Lunes~~ | **no se publica** | — |
| Miércoles | `po-13d` / `po-13e` (o excepción de 2b) | 1080×1350 |
| Jueves, ciclo 0 | `cb-cover` + `cb-tip1..3` (un render por slide) | 1080×1350 |
| Jueves, ciclo 1 | `st-10` | 1080×1920 |
| Jueves, ciclo 2 | `st-09` / `st-09b` | 1080×1920 |
| Jueves, ciclo 3 | `st-08` / `st-08b` / `st-08c` | 1080×1920 |
| Viernes | el elegido del pool de 18 | 1080×1350 |
| Sábado (semanas pares) | el elegido del pool de 6 | 1080×1350 |

Nombrado: `posts/YYYY-MM-DD-N.png` donde:
- `YYYY-MM-DD` = fecha de publicación
- `N` = **2** (miércoles), **3** (jueves), **4** (viernes), **5** (sábado). El `1` queda libre: era el lunes, que ya no se publica. No renumerar — mantener el `N` atado al día evita confundir posts viejos con nuevos.
- Carrusel del jueves: `posts/YYYY-MM-DD-3-cover.png`, `posts/YYYY-MM-DD-3-s1.png`, etc.

### 4b. Renderizar las imágenes de LinkedIn

⚠️ **Solo hace falta UNA imagen horizontal por semana, y solo cuando el jueves es story.** El resto de los días comparten la vertical con Instagram (ver la regla del paso 6). No renderizar `-li` para el miércoles ni el viernes: esas imágenes quedarían sin usar.

| Post | Template LinkedIn | Cuándo |
|---|---|---|
| Miércoles (noticia) | — | Comparte la vertical con Instagram |
| Jueves (story) | **`li-02`** | **Único caso.** La story no existe en LinkedIn, así que LinkedIn recibe un claim institucional en horizontal |
| Jueves (carrusel) | — | El carrusel `cb-*` va tal cual a LinkedIn |
| Viernes (gestión) | — | Comparte la vertical con Instagram |
| Sábado (spotlight) | — | No va a LinkedIn |

Las tres plantillas horizontales siguen disponibles por si en alguna semana se justifica (`li-01` noticia, `li-02` claim, `li-03` dato), pero la rutina normal solo usa `li-02` los jueves de story.

```bash
node scripts/render.js \
  --template li-01 \
  --out posts/YYYY-MM-DD-N-li.png \
  --slots '{"CATEGORIA":"...","TITULAR":"...","BAJADA":"...","FUENTE":"...","FECHA":"...","HANDLE":"@mdoconsultores"}'
```

Nombrado: **mismo nombre que la vertical + sufijo `-li`** → `posts/YYYY-MM-DD-3-li.png` (el `3` es el jueves, el único día que la usa).

Slots de los templates LinkedIn:
- `li-01` (noticia): `CATEGORIA`, `TITULAR`, `BAJADA`, `FUENTE`, `FECHA`, `HANDLE`
- `li-02` (claim institucional): `COPETE`, `CLAIM`, `SERVICIO_1..3`, `CTA`, `HANDLE`
- `li-03` (dato clave): `CATEGORIA`, `NUMERO`, `UNIDAD`, `DESCRIPCION`, `FUENTE`, `HANDLE`

⚠️ `li-03` lleva un **número**. Si el post es el de gestión PyME del viernes, aplica la regla dura: el número **no puede** ser un monto, alícuota o tope normativo. Solo sirve para cantidades atemporales (ej: "3 hábitos", "12 meses"). Si no hay un número legítimo, usar `li-02`.

⚠️ Los `li-*` son **horizontales y más chicos**: el titular entra en menos líneas que en la vertical. Si `TITULAR` es largo, acortarlo para LinkedIn — no hace falta que sea idéntico al de Instagram.

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
https://raw.githubusercontent.com/jmartinez-sketch/mdo-automatizaciones-redes/main/posts/YYYY-MM-DD-3-li.png
```

⚠️ Verificar que **cada imagen que se va a referenciar** esté commiteada y responda 200 **antes** de crear los drafts. Normalmente son 3 o 4 verticales más la `-li` del jueves cuando toca story. Si una URL da 404, el draft se crea sin imagen.

> **Cache busting**: si se **actualiza** un PNG ya referenciado en un draft (ej: corregir márgenes), Metricool tiene cacheada la versión vieja en su CDN. Al llamar `updateScheduledPost`, agregar un query param a la URL (`...-N.png?v=2`) para forzar que Metricool re-descargue la imagen nueva. `raw.githubusercontent.com` ignora el query param y sirve el archivo igual.

### 6. Crear los drafts en Metricool (4 por semana, 5 si el jueves es story)

Usar la MCP de Metricool: `createScheduledPost`.

⚠️ **REGLA DURA — un draft por día, con las dos redes. NO duplicar.**

**Decisión del usuario (11/08/2026, no revisitar):** el miércoles y el viernes van en **un solo draft con `instagram` y `linkedin` juntos**, compartiendo la imagen vertical y el texto. Se probó una semana con drafts separados por red y el usuario lo rechazó: le duplicaba las tarjetas a revisar en el planificador y le parecían posts repetidos.

Un post de Metricool tiene **un solo array `media` y un solo `text`** compartidos por todos sus `providers`. Eso significa que juntarlos tiene un costo aceptado: **LinkedIn recibe la vertical 4:5 y el mismo texto que Instagram**. Está bien — LinkedIn muestra las verticales sin romperlas, solo no están optimizadas.

**El jueves es la excepción obligatoria**, y no por elección: en Instagram es una **story** (9:16, sin caption) y LinkedIn no tiene stories, así que no hay forma de meterlas en el mismo post. Cuando el jueves toca **carrusel** (ciclo 0), sí va en un solo draft con las dos redes.

**Cuántos drafts crear por semana:**

| Día | Drafts | Detalle |
|---|---|---|
| Miércoles (noticia) | **1** | IG + LinkedIn, imagen vertical compartida |
| Jueves ciclo 0 (carrusel) | **1** | IG + LinkedIn, mismos slides |
| Jueves ciclo 1/2/3 (story) | **2** | IG Story (`text` vacío) + LinkedIn con texto e imagen `-li` |
| Viernes (gestión) | **1** | IG + LinkedIn, imagen vertical compartida |
| Sábado (semanas pares) | **1** | Solo Instagram |

→ **Semana impar: 4 drafts.** **Semana par con carrusel: 4.** **Semana par con story: 5.**

**Hashtags del texto compartido**: como el texto va a las dos redes, usar **5 hashtags** — suficiente para Instagram y no spammeado para LinkedIn. (La tabla de diferencias del paso 7 aplica solo al draft de LinkedIn del jueves, que sí tiene texto propio.)

> **Recordatorio de stories**: en el draft de IG Story, `instagramData.type` va como `STORY` y el campo `text` queda **vacío** (Instagram no admite caption en stories). El texto va solo en el draft de LinkedIn de ese día.

> ⚠️ **Metricool no tiene herramienta para borrar posts.** Si una corrida crea un draft de más, NO se puede eliminar desde acá: hay que avisarle al usuario cuál borrar a mano y pasarle el link (`plannerUrl` de la respuesta). Mejor no crearlo.

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
- ⚠️ **REGLA DURA — `draft: true` y `autoPublish: false` van SIEMPRE, explícitos, en cada draft.** Los defaults de la API de Metricool son **los contrarios** (`draft: false`, `autoPublish: true`): si se omiten, el post queda programado para **publicarse solo, sin aprobación del usuario**. Pasó el 17/08/2026 — la corrida los omitió y los 4 posts de la semana quedaron con publicación automática; hubo que corregirlos a mano. Nunca confiar en los defaults.
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

#MDOConsultores #Impuestos #Contabilidad #PyMEs #Argentina #ARCA
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
- ❌ **Nunca el hashtag `#AFIP`** — solo `#ARCA` (aplica la regla dura de arriba también a los hashtags)

**Diferencias entre el texto de Instagram y el de LinkedIn** (son drafts separados, así que pueden diferir):

| | Instagram | LinkedIn |
|---|---|---|
| Hashtags | hasta 8, al final | **máximo 3** — en LinkedIn más de 3 se ve spam |
| Tono | directo, cercano | un punto más formal, sin perder el "vos" |
| Largo | 600-1200 chars | puede ir más largo; LinkedIn premia el desarrollo |
| Emojis | solo 📞 en el CTA | mejor ninguno |
| Story de IG | `text` **vacío** (Instagram no admite caption en stories) | acá va el texto completo |

### 8. Escribir el historial de plantillas (OBLIGATORIO)

Una vez creados todos los drafts, **agregar una entrada al array `historial` de `posts/historial-plantillas.json` por cada post** (no por cada draft: el post del miércoles es una sola entrada aunque haya generado 2 drafts).

```jsonc
{
  "fecha": "2026-08-05",        // fecha de publicación
  "semana_iso": 32,             // date +%V de la corrida
  "slot": "noticia",            // noticia | jueves | gestion | spotlight
  "template": "po-13d",         // plantilla de Instagram
  "linkedin": "li-01",          // plantilla de LinkedIn, o null
  "nota": "Percepción IVA · régimen unificado"
}
```

Después commitear el archivo junto con los PNGs en la rama de trabajo:

```bash
git add posts/
git commit -m "posts: rutina semanal $(date +%Y-%m-%d)"
git push -u origin <branch>
```

#### ⚠️ Y ADEMÁS: llevar el historial a `main`

**Esto es obligatorio y es distinto de lo anterior.** La rama de trabajo semanal nunca se mergea, así que un historial que quede solo ahí **se pierde**: la corrida siguiente arranca de `main`, encuentra el archivo viejo y la rotación de plantillas deja de funcionar — sin dar ningún error.

Los PNGs pueden quedarse en la rama efímera (a Metricool le alcanza con que la URL responda al momento de crear el post, porque copia la imagen a su propio CDN). **El historial, no**: es el único archivo que tiene que sobrevivir a la corrida.

```bash
# commit de un solo archivo, directo sobre main
git fetch origin main -q
git checkout -B hist-sync origin/main
cp posts/historial-plantillas.json /tmp/hist-nuevo.json   # el recién escrito
git checkout origin/main -- . 2>/dev/null || true
cp /tmp/hist-nuevo.json posts/historial-plantillas.json
git add posts/historial-plantillas.json
git commit -m "historial: plantillas usadas semana $(date +%V)"
git push origin HEAD:main
```

Es un archivo con un solo escritor (esta rutina), así que no hay riesgo de conflicto.

**Si el push a `main` falla** (permisos, protección de rama): **NO seguir como si nada.** Dejar el historial commiteado en la rama de trabajo y **avisarlo explícitamente en el reporte final**, con esta frase: *"No pude guardar el historial en main — la rotación de plantillas de la semana que viene puede repetir. Hay que mergear la rama a mano."* El paso 0 tiene un plan B que busca el historial en las ramas recientes, pero es más frágil que tenerlo en `main`.

⚠️ **Si este paso se saltea, la rutina de la semana que viene arranca sin memoria y vuelve a elegir las mismas plantillas.** Es el paso que sostiene toda la variedad: no omitirlo aunque los drafts ya estén creados.

Para que el archivo no crezca sin control, si `historial` pasa de **80 entradas**, borrar las más viejas hasta dejar 80 — pero **nunca borrar entradas de menos de 14 semanas**, porque la regla de contenido necesita 13 semanas de memoria. Lo mismo para `temas_previos`: se pueden podar las entradas de más de 14 semanas (el historial nuevo ya las cubre con sus notas).

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

### 9. Verificación final en Metricool (OBLIGATORIA)

Después de crear todo, llamar a `getScheduledPosts` con el rango de la semana (miércoles a sábado) y verificar contra la tabla del paso 6:

1. **Están todos los drafts esperados.** El 17/08/2026 la corrida escribió el historial pero el draft del viernes nunca llegó a Metricool y nadie lo notó — por eso existe este paso. Si falta uno, crearlo ahí mismo.
2. **Cada uno tiene `"draft": true` y `"autoPublish": false`** en la respuesta. Si alguno vino con otros valores, corregirlo con `updateScheduledPost` antes de terminar.
3. **Ninguno tiene fecha de lunes.**

No dar la rutina por terminada sin este chequeo: es la única forma de detectar un draft perdido o un flag mal puesto antes de que el usuario se entere por Instagram.

## Tareas de cierre

Cuando todos los drafts estén creados y el historial escrito:

1. Reportar al usuario en chat (si la sesión es interactiva) o por log:
   - **Aclarar primero que el lunes no se publica nada** — solo corrió la rutina.
   - Los contenidos elegidos, **agrupados por día** (miércoles, jueves, viernes, y sábado si es semana par), indicando para cada uno **qué plantilla se usó y por qué se eligió** (qué había bloqueado el historial).
   - URLs de las imágenes en GitHub (vertical y `-li` de cada post).
   - `id` y `uuid` de cada draft en Metricool, agrupados por día y aclarando cuál es el de Instagram y cuál el de LinkedIn.
   - Si el jueves fue **encuesta `st-10`**: recordarle que **el sticker de encuesta se agrega a mano en Instagram**.
   - Recordatorio: "Revisá los drafts en https://app.metricool.com/planner y aprobalos antes de que llegue cada fecha de publicación"
2. Si algo falló (Gmail vacío, render falló, Metricool rechazó), reportar específicamente qué y NO crear drafts a medias.

### Chequeo final de variedad

Antes de cerrar, comparar las plantillas de esta corrida contra las 4 semanas anteriores del historial:

- ¿Alguna plantilla se repite respecto de las últimas 4 semanas (fuera de la ancla `po-13d`/`po-13e`)? → **es un error**: volver a elegir y re-renderizar.
- ¿Los posts de la semana se ven distintos entre sí en la grilla (modo de color, composición)? Si los 3-4 quedaron todos en navy o todos en papel, cambiar uno.

## Notas técnicas

- **Setup**: si la sesión es fresca, correr primero `bash scripts/setup.sh` para instalar Node modules + Chromium.
- **Branch**: la rutina automática corre sobre `main` (default branch). Las sesiones manuales pueden trabajar sobre branches `claude/*` efímeras, pero al final todo se mergea a `main`.
- **Timezone**: Argentina = UTC-3. Sin DST. Lunes 9hs ARG = Lunes 12:00 UTC.
- **Templates disponibles**: **76 en total** (incluye las `mn-*` del manual y las `hl-*` de destacadas). Ver `mdo-templates/PLACEHOLDERS.md` para el catálogo completo con todos los slots. La rutina pone ~35 en rotación real; el resto son variantes cuadradas (excluidas a propósito del feed) o superadas por versiones nuevas.
- **Historial de plantillas**: `posts/historial-plantillas.json`. Es lo que le da memoria a la rutina entre semanas. Se lee en el paso 0 y se escribe en el paso 8.
- **Metricool**: la autenticación viene del MCP, no hardcodear nada. brand `blogId: 6267636`.
- **Repo público**: las URLs `raw.githubusercontent.com/...` deben responder 200 al momento de crear el post (Metricool descarga la imagen una vez y la copia a su CDN). Si el repo es privado, el paso 6 falla.

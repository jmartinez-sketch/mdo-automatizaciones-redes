---
name: mdo-rutina-semanal
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

4 drafts en Metricool, todos para la cuenta IG+LinkedIn "Martinez, De Orta & Asociados" (`blogId: 6267636`, networks `instagram` + `linkedin`, timezone `America/Argentina/Buenos_Aires`):

| # | Día/Hora (ARG) | Tipo | Template | Fuente del contenido |
|---|---|---|---|---|
| 1 | Lunes 9hs     | Noticia destacada #1         | `sq-12` (Square 1080×1080)   | Gmail newsletter |
| 2 | Miércoles 9hs | Noticia destacada #2         | `sq-12` (Square 1080×1080)   | Gmail newsletter |
| 3 | Jueves 9hs    | Story CTA **o** Carrusel (*) | `st-09` **o** `cb-*`         | Basado en noticias de la semana |
| 4 | Viernes 9hs   | Gestión PyME (tip genérico)  | `po-04` (Portrait 1080×1350) | Generado por LLM |

(*) **Jueves — alternancia por semana ISO**: `$(( $(date +%V) % 2 ))` → `1` = semana impar → **story `st-09`** · `0` = semana par → **carrusel `cb-*`**

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

Para cada noticia extraer:
- `CATEGORIA` — eyebrow corto, ej: "Impuestos · ARCA", "Régimen Simplificado", "PyMEs"
- `TITULAR` — máximo 70 caracteres, redactado por nosotros (no copiar el del medio)
- `BAJADA` — 1-2 líneas (máx 180 chars) que expliquen la novedad concreta
- `FUENTE` — medio + tipo de comunicación, ej: "Cronista · Nota", "ARCA · Resolución oficial"
- `FECHA` — fecha de la noticia, formato "21 may 2026"
- `HANDLE` — siempre `@mdoconsultores`

### 3. Generar tip PyME (3er post)

**REGLAS DURAS — no negociables**:

1. ❌ **NO** mencionar números específicos: montos de monotributo, alícuotas, topes de facturación, importes mínimos no imponibles, etc. (cambian con la normativa)
2. ❌ **NO** mencionar fechas de vencimiento ni plazos específicos
3. ❌ **NO** dar consejos legales o de derecho tributario específicos
4. ✅ **SÍ**: tips genéricos atemporales sobre gestión PyME, hábitos contables, organización financiera

Ejemplos de tips OK:

- "Separá cuenta personal de cuenta empresa: la mezcla es la #1 razón de líos contables"
- "Pedí siempre factura A cuando podés deducir: te ahorra IVA"
- "Reservá un % de cada cobro para impuestos antes de tocar la plata"
- "Llevá control semanal de caja, no mensual: detectás desvíos antes"
- "Conciliá bancos cada 15 días, no a fin de mes"
- "Tu contador no es un mal necesario, es un asesor — usalo para decisiones, no solo para cumplir"
- "Documentá los gastos del día mismo en una app o planilla: la memoria al cierre miente"

Si el tip generado contiene cualquier número específico o referencia normativa con fecha, **descartarlo y generar otro**.

Mapear a slots de `po-04`:
- `COPETE` — categoría del tip, ej: "Gestión PyME · Tip semanal"
- `TITULO` — headline corto del tip (máx 50 chars), ej: "Separá lo personal de lo de la empresa"
- `BAJADA` — explicación breve (máx 150 chars)
- `BULLET_1`..`BULLET_4` — 4 puntos prácticos
- `CTA` — frase de cierre, ej: "Consultanos para auditar tu setup contable"
- `HANDLE` — `@mdoconsultores`

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
- `TITULAR_1` — beneficio clave, ej: "Ordenamos tu contabilidad"
- `TITULAR_2` — segundo punto, ej: "Optimizamos tu carga impositiva"
- `TITULAR_3` — llamada a la acción, ej: "Acompañamos el crecimiento de tu PyME"
- `BAJADA` — cierre breve, ej: "Contadores con experiencia en PyMEs argentinas"
- `CANAL_1_LABEL` / `CANAL_1_VALOR` — ej: "Web" / "mdo-consultores.com.ar"
- `CANAL_2_LABEL` / `CANAL_2_VALOR` — ej: "IG" / "@mdoconsultores"
- `CANAL_3_LABEL` / `CANAL_3_VALOR` — ej: "Mail" / "info@mdo-consultores.com.ar"
- `HANDLE` — `@mdoconsultores`

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

### 4. Renderizar las 4 imágenes (o más, si el jueves es carrusel)

Para cada post:

```bash
node scripts/render.js \
  --template sq-12 \
  --out posts/YYYY-MM-DD-N.png \
  --slots '{"CATEGORIA":"...","TITULAR":"...",...}'
```

Templates por día:
- Lunes y miércoles: `--template sq-12`
- Jueves (story): `--template st-09`
- Jueves (carrusel): renderizar cada slide con su template (`cb-cover`, `cb-tip1`, etc.)
- Viernes: `--template po-04`

Nombrado: `posts/YYYY-MM-DD-N.png` donde:
- `YYYY-MM-DD` = fecha de publicación
- `N` = 1 (lunes), 2 (miércoles), 3 (jueves), 4 (viernes)
- Carrusel del jueves: `posts/YYYY-MM-DD-3-cover.png`, `posts/YYYY-MM-DD-3-s1.png`, etc.

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

### 6. Crear los 3 drafts en Metricool

Usar la MCP de Metricool: `mcp__7d9da2c2-8ef9-4d07-bd69-a1376309827a__createScheduledPost`

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

## Tareas de cierre

Cuando los 3 drafts estén creados:

1. Reportar al usuario en chat (si la sesión es interactiva) o por log:
   - Las 3 noticias/temas elegidos
   - URLs de las 3 imágenes en GitHub
   - `id` y `uuid` de los 3 drafts en Metricool
   - Recordatorio: "Revisá los drafts en https://app.metricool.com/planner y aprobalos antes del lunes/miércoles/viernes 9hs"
2. Si algo falló (Gmail vacío, render falló, Metricool rechazó), reportar específicamente qué y NO crear drafts a medias.

## Notas técnicas

- **Setup**: si la sesión es fresca, correr primero `bash scripts/setup.sh` para instalar Node modules + Chromium.
- **Branch**: la rutina automática corre sobre `main` (default branch). Las sesiones manuales pueden trabajar sobre branches `claude/*` efímeras, pero al final todo se mergea a `main`.
- **Timezone**: Argentina = UTC-3. Sin DST. Lunes 9hs ARG = Lunes 12:00 UTC.
- **Templates disponibles**: ver `mdo-templates/PLACEHOLDERS.md` para el catálogo completo.
- **Metricool**: la autenticación viene del MCP, no hardcodear nada. brand `blogId: 6267636`.
- **Repo público**: las URLs `raw.githubusercontent.com/...` deben responder 200 al momento de crear el post (Metricool descarga la imagen una vez y la copia a su CDN). Si el repo es privado, el paso 6 falla.

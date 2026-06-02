---
name: mdo-rutina-semanal
description: Rutina semanal de posteos MDO Consultores. Lee el Gmail del usuario (label MDO/AUTOMATIZACIONES/Claude/Newsletter, últimos 7 días), elige las 3 noticias más impactantes, renderiza 3 imágenes branded con los templates Claude Design, y crea 3 drafts en Metricool programados Lun/Mié/Vie 9hs Argentina para Instagram + LinkedIn de @mdoconsultores. Usar cuando el usuario diga "corré la rutina semanal", "armá los posts de la semana", "ejecutá rutina MDO", o cuando se dispare por trigger los lunes 9am Argentina.
---

# Rutina semanal de posteos MDO Consultores

Ejecutar **todos los lunes 9hs Argentina (UTC-3)** para armar los 3 posteos de la semana como drafts en Metricool.

## Contexto del negocio

- **Estudio**: Martinez, De Orta & Asociados (MDO Consultores) — Argentina
- **Audiencia IG**: dueños de PyMEs, profesionales independientes, monotributistas
- **Tono**: profesional pero accesible, español rioplatense, NO jerga contable cerrada
- **Cuenta IG**: `@mdoconsultores` · mdo-consultores.com.ar

## Output esperado

3 drafts en Metricool, todos para la cuenta "Martinez, De Orta & Asociados" (`blogId: 6267636`, networks `instagram` + `linkedin`, timezone `America/Argentina/Buenos_Aires`):

| # | Día/Hora (ARG) | Tipo | Template | Fuente del contenido |
|---|---|---|---|---|
| 1 | Lunes 9hs    | Noticia destacada #1 | `sq-12` (Square 1080×1080) | Gmail newsletter |
| 2 | Miércoles 9hs | Noticia destacada #2 | `sq-12` (Square 1080×1080) | Gmail newsletter |
| 3 | Viernes 9hs   | Noticia destacada #3 | `sq-12` (Square 1080×1080) | Gmail newsletter |

**IMPORTANTE**: NO usar tip PyME genérico. Los 3 posts son siempre noticias reales de los newsletters.

## Paso a paso

### 1. Leer Gmail

Usar la MCP de Gmail. Query:
```
label:mdo-automatizaciones-claude-newsletter newer_than:7d
```
(labelId alternativo: `Label_6047302680017632381`)

Levantar todos los threads y leer el primer mensaje de cada uno (asunto + cuerpo).

### 2. Elegir 3 noticias

Criterios de selección (en orden de prioridad):

1. **Impacto normativo**: cambios AFIP/ARCA, decretos, resoluciones nuevas
2. **Vencimientos próximos**: impuestos, presentaciones, prórrogas
3. **Macro/tributario**: tipo de cambio, blanqueo, regímenes especiales
4. **Análisis tributario relevante** para PyMEs

Reglas:

- Las **3 noticias elegidas deben ser temáticamente distintas** (no dos sobre lo mismo)
- Preferir noticias con fuente clara y verificable
- Evitar opinión política partidaria

Para cada noticia extraer:
- `CATEGORIA` — eyebrow corto, ej: "Impuestos · ARCA", "Régimen Simplificado", "PyMEs"
- `TITULAR` — máximo 70 caracteres, redactado por nosotros (no copiar el del medio)
- `BAJADA` — 1-2 líneas (máx 180 chars) que expliquen la novedad concreta
- `FUENTE` — medio + tipo de comunicación, ej: "Cronista · Nota", "ARCA · Resolución oficial"
- `FECHA` — fecha de la noticia, formato "21 may 2026"
- `HANDLE` — siempre `@mdoconsultores`

### 3. Preparar la 3ra noticia (viernes)

Igual que las dos anteriores: elegir una 3ra noticia del Gmail, temáticamente distinta de las otras dos.

Mapear a slots de `sq-12` igual que las otras noticias:
- `CATEGORIA`, `TITULAR`, `BAJADA`, `FUENTE`, `FECHA`, `HANDLE`

**NO generar tips PyME** — el viernes es siempre una noticia real de los newsletters.

### 4. Renderizar las 3 imágenes

Para cada post:

```bash
node scripts/render.js \
  --template sq-12 \
  --out posts/YYYY-MM-DD-N.png \
  --slots '{"CATEGORIA":"...","TITULAR":"...",...}'
```

(Para el viernes: `--template po-04`)

Nombrado: `posts/YYYY-MM-DD-N.png` donde:
- `YYYY-MM-DD` = fecha de publicación (lunes, miércoles, viernes correspondientes)
- `N` = 1, 2, 3

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
    "instagramData": {"type": "POST", "showReelOnFeed": true, "collaborators": []}
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
Tip PyME · [categoría]

[Tip principal en 1-2 líneas]

Por qué importa: [breve explicación].

—

📞 Auditá tu setup contable con nosotros: mdo-consultores.com.ar

#MDOConsultores #TipPyME #GestiónPyME #Contabilidad #Argentina
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

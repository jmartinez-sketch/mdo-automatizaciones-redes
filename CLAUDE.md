# MDO Consultores — Rutina semanal de posteos IG

Proyecto para automatizar los posteos de Instagram (y a futuro LinkedIn) del estudio **Martinez, De Orta & Asociados**.

## Quién es el usuario

- **Juan Martinez** — contador, dueño del estudio. NO es programador.
- Habla español rioplatense. **Cero jerga técnica sin explicar**.
- Cuando le ofrezcas opciones, **NO más de 3-4** y dale tu recomendación primero.

## Setup en sesiones frescas

Antes de hacer cualquier render o ejecutar la rutina, correr:

```bash
bash scripts/setup.sh
```

Esto instala `node_modules` + Chromium (lleva ~30-60s la primera vez).

## Cómo se dispara la rutina

**Trigger automático**: los lunes 9hs Argentina (12:00 UTC), configurado desde la interfaz web de Claude Code on the Web.

**Trigger manual**: cualquiera de estos prompts dispara la skill `mdo-rutina-semanal`:

- "Corré la rutina semanal MDO"
- "Armá los posts de la semana"
- "Ejecutá la rutina"

La skill vive en `.claude/skills/mdo-rutina-semanal/SKILL.md` y describe el flujo completo paso a paso.

## Estructura del repo

```
mdo-templates/          Templates IG (HTML+JSX+assets) diseñados en Claude Design
  render.html           Punto de entrada para renderizar UN template a PNG
  templates-*.jsx       Componentes React de cada plantilla
  assets/               Logos MDO
  vendor/               React + Babel locales (CDN unpkg está bloqueado en cloud)
  PLACEHOLDERS.md       Catálogo completo de templates y sus slots

scripts/
  render.js             Renderiza cualquier template a PNG via Puppeteer
  setup.sh              Instalación de deps + Chromium para sesiones frescas

posts/                  PNGs generados por la rutina (commiteados a git → URL pública)
out/                    PNGs de prueba locales (en .gitignore)

.claude/skills/
  mdo-rutina-semanal/   Skill de la rutina automática
```

## MCPs disponibles (verificar al inicio de cada sesión)

- **Gmail** — para leer el label `MDO/AUTOMATIZACIONES/Claude/Newsletter`
- **Metricool** — para crear drafts en el planificador. Brand `Martinez, De Orta & Asociados`, `blogId: 6267636`, IG `@mdoconsultores`, timezone `America/Argentina/Buenos_Aires`. Tools clave: `createScheduledPost`, `getScheduledPosts`, `updateScheduledPost`.
- **GitHub** — para commitear PNGs (historial / auditoría). Metricool ya descarga la imagen a su propio CDN al crear el post, así que la URL pública del repo solo se usa como fuente, no como hosting permanente.
- **Canva** — disponible pero no se usa en esta rutina (descartado, ver brief)

## Decisiones cerradas (NO revisitar)

- ❌ Postiz descartado (los posts quedaban trabados en DRAFT y nunca pasaban a SCHEDULED — bug conocido issue #818 gitroomhq/postiz-app, y el MCP no permite leer/actualizar/borrar posts existentes)
- ❌ Canva-IA descartado para diseño (no respeta hex codes ni edita colores en free)
- ❌ Vercel descartado (el render corre dentro de la sesión cloud)
- ✅ Render local en sesión cloud con Puppeteer + render.html (anduvo, ver `scripts/render.js`)
- ✅ Templates HTML+JSX de Claude Design (Anthropic Labs) como base de diseño
- ✅ Metricool como planificador (validado 22/05/2026 — `createScheduledPost` deja el post como SCHEDULED de verdad, no se traba)

## Regla dura sobre el tip PyME (viernes)

El tip lo genera la IA. Para evitar imprecisiones técnicas:

- ❌ NUNCA mencionar números específicos (montos monotributo, alícuotas, topes)
- ❌ NUNCA mencionar fechas/plazos de vencimientos
- ❌ NUNCA dar consejos legales específicos
- ✅ SOLO tips genéricos atemporales sobre gestión y hábitos contables

Si el draft generado contiene cualquier dato específico, descartarlo y regenerar.

## Branch de trabajo

La rama activa para este proyecto: ver `git branch --show-current`. Las imágenes commiteadas a esa rama son accesibles vía:

```
https://raw.githubusercontent.com/jmartinez-sketch/mdo-automatizaciones-redes/main/posts/<archivo>.png
```

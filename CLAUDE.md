# MDO Consultores — Rutina semanal de posteos IG

Proyecto para automatizar los posteos de Instagram (y a futuro LinkedIn) del estudio **Martinez, De Orta & Gutierrez Taboada**.

## Quién es el usuario

- **Juan Martinez** — contador, dueño del estudio. NO es programador.
- Habla español rioplatense. **Cero jerga técnica sin explicar**.
- Cuando le ofrezcas opciones, **NO más de 3-4** y dale tu recomendación primero.

### Cómo contestarle (regla dura)

**Lo más corto posible.** Juan pidió expresamente respuestas mucho más concisas, siempre.

- Por defecto: **2 a 4 líneas**. Lo que hiciste y qué le toca a él. Nada más.
- ❌ Nada de recapitular el proceso, listar los archivos que tocaste, explicar cómo lo resolviste ni contar lo que probaste. Si anduvo, anduvo.
- ❌ Nada de encabezados, negritas decorativas ni listas si entra en una frase.
- ✅ Sí decir, en una línea, lo que **no** funcionó o lo que él tiene que hacer a mano.
- Se extiende **sólo** cuando pregunta algo que necesita explicación, cuando hay que elegir entre opciones, o cuando el reporte es el entregable (ej: el cierre de la rutina semanal).

## Fuente de diseño: el design system «MDO - Diseño» (regla dura)

**Desde el 17/09/2026, todo lo de marca se lee y se cambia en un solo lugar:** el design system **«MDO - Diseño»**, https://claude.ai/code/artifact/44406cc7-a5b6-4e92-8bc3-ba5e9090747b. Plantillas de redes, colores, tipografías y logos viven ahí. Este repo **no es dueño del diseño**: guarda una copia sincronizada para poder renderizar las placas.

- **Qué archivo del design system alimenta qué archivo del repo:**
  - `project/templates/kit-redes-manual/KitRedesManual.dc.html` (kit 4.4, las 79 placas) → `mdo-templates/templates-kit-manual.jsx`
  - `project/ui_kits/redes/mdo-brand.css` (colores, tipografías) → `mdo-templates/mdo-brand.css`
  - `project/components/assets/logos/*.svg` (+ el asset `49b43af7d306c5f26383c300225b5816`, secundario en papel) → `mdo-templates/assets/logo-mdo-*.svg`
- **Cómo se sincroniza:** se bajan esos archivos con la herramienta `Artifact` (action `read`) y se corre `node scripts/sincronizar-diseno.js <carpeta bajada>`. La rutina semanal lo hace sola en su paso 0b. El detalle está en `mdo-templates/LEEME-kit-manual.md`.
- **Dónde leer la marca:** `project/README.md` (brand book), `project/tokens.json` (tokens), `project/assets/manual/SALVEDADES.md` (decisiones del estudio que se apartan del manual; hoy la principal para redes: **no se usa la familia «MDO Explica»**, el contenido educativo va como Novedades o Servicios).
- ❌ **Nunca editar a mano** `templates-kit-manual.jsx`, `mdo-brand.css`, `iconos-mdo.json` ni los SVG de `mdo-templates/assets/`: la próxima sincronización los pisa. Un cambio de diseño se pide **en el design system** y después se sincroniza.
- Fuentes anteriores que **ya no mandan**: el repo `jmartinez-sketch/mdo-brand` y el proyecto viejo de Claude Design (`cc21dedf-…`). El design system los absorbió.

## Setup en sesiones frescas

Antes de hacer cualquier render o ejecutar la rutina, correr:

```bash
bash scripts/setup.sh
```

Esto instala `node_modules` + Chromium (lleva ~30-60s la primera vez).

## Cómo se dispara la rutina

**Trigger automático**: una sola rutina, **«MDO - Automatizaciones Redes»** (Claude Code on the Web), que corre **cada hora, de 7:50 a 19:50 hs Argentina, de lunes a sábado** (desde el 05/10/2026; antes 3 veces por día), y decide sola qué toca:

- **Lunes** (o martes, si el lunes no llegó a cargar el panel): arma la semana completa.
- **Las demás pasadas**: repone las placas que Juan regeneró en el panel y manda a Metricool las que ya aprobó (paso 7c de la skill). Si no hay nada, termina en una línea.

Hasta el 25/09/2026 eran dos rutinas (la semanal y «MDO - Reponer placas regeneradas»); Juan pidió juntarlas.

⚠️ **El lunes la rutina corre pero NO publica nada, y tampoco manda nada a Metricool.** Lee el Gmail, arma el contenido y lo carga en el panel de Dirección MDO. Juan aprueba o regenera ahí, y **recién al aprobar** el post se crea en Metricool, programado (decisión de Juan, 24/09/2026). Los posts salen **miércoles, jueves, viernes** (y sábado en semanas pares). Nunca un post con fecha de lunes.

**Trigger manual**: cualquiera de estos prompts dispara la skill `mdo-rutina-semanal`:

- "Corré la rutina semanal MDO"
- "Armá los posts de la semana"
- "Ejecutá la rutina"

La skill vive en `.claude/skills/mdo-rutina-semanal/SKILL.md` y describe el flujo completo paso a paso.

## Estructura del repo

```
mdo-templates/          Copia sincronizada del diseño (la fuente es el design system, ver arriba)
  render.html           Punto de entrada para renderizar UN template a PNG
  templates-kit-manual.jsx  Las 79 placas del kit 4.4 — GENERADO por sincronizar-diseno.js, no editar
  mdo-brand.css         Colores y tipografías de las placas — copia del design system, no editar
  assets/               Logos MDO (SVG) y fotos — copia del design system, no editar
  kit-slots.json        Qué texto de ejemplo de cada placa es cada slot [NOMBRE]
  templates-*.jsx       Catálogo viejo (pisado por el kit para todo lo que usa la rutina)
  vendor/               React + Babel locales (CDN unpkg está bloqueado en cloud)
  PLACEHOLDERS-kit.md   Slots de cada placa del kit (la fuente viva es --list-slots)
  LEEME-kit-manual.md   Cómo se sincroniza el kit desde el design system
  iconos-mdo.json       Íconos oficiales (Icon.jsx) — GENERADO por sincronizar-diseno.js, no editar
  video-animado.js      Motor de los videos: arma la escena animada de una receta JSON
                        (lo usan scripts/video-animado.js y el panel, que lo publica a su lado)
  video-animado.html    Punto de entrada para grabarlo
  videos-ejemplo/       Recetas de ejemplo (la historia del FAL que aprobó Juan, …)

scripts/
  render.js             Renderiza cualquier template a PNG (--dump-html vuelca el HTML de la placa) via Puppeteer
  sincronizar-diseno.js Trae kit, CSS y logos desde la bajada del design system
  extraer-kit-manual.js Corta las placas del kit y les pone los slots (lo llama el sincronizador)
  video-animado.js      Graba la escena de una receta a MP4 (el video semanal, desde el 07/10/2026)
  video.js              Formato anterior: anima una placa del kit y la graba a MP4
                        (la animación está en mdo-templates/animacion-placa.js; queda para
                        regenerar los posts viejos que la usaban)
  revisar-textos.js     Control de la voz del estudio sobre placas, copys y recetas
  reponer-placas.js     Re-renderiza lo que Juan regeneró en el panel (paso 7c)
  grupos-kit.js         Qué ids del kit son la misma placa, y qué queda bloqueado por el historial
  aprobacion-doc.js     Arma el documento del panel de aprobación (Dirección MDO),
                        con el HTML de cada placa para el botón "Regenerar"
  setup.sh              Instalación de deps + Chromium para sesiones frescas

posts/                  PNGs generados por la rutina (commiteados a git → URL pública)
  aprendizaje.json      Lo que Juan aprueba, regenera, rechaza o borra, y las
                        lecciones que deja. La rutina lo lee antes de elegir (paso 0c).
  historial-plantillas.json   Memoria de qué plantilla se usó cada semana.
                              La rutina lo lee para NO repetir plantillas de las
                              últimas 4 semanas. Si se borra, la variedad se rompe.
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
- ✅ El diseño vive en el design system «MDO - Diseño» (artifact); el repo sólo sincroniza (decisión de Juan, 17/09/2026). Antes: templates HTML+JSX de Claude Design copiados a mano.
- ✅ Metricool como planificador (validado 22/05/2026 — `createScheduledPost` deja el post como SCHEDULED de verdad, no se traba)
- ✅ Botón "Regenerar" en el panel Publicaciones de Dirección MDO (22/09/2026). **La imagen no puede viajar sola** desde el panel (Metricool sólo acepta URLs públicas y una página publicada no puede publicar una): la placa nueva la publica la rutina de reposición leyendo `pendienteImagen`. Ver el paso 7c de la skill.
- ✅ Aprobar primero, Metricool después (24/09/2026): la rutina no crea posts en Metricool; los crea el panel al aprobar. El 24/09 dos posts regenerados salieron con la imagen vieja porque ya estaban en Metricool: esto lo evita.

## Video semanal (desde el 23/09/2026; formato nuevo desde el 07/10/2026)

Todas las semanas sale **un video**, alternando: semana ISO **impar** → la historia del jueves; semana **par** → el post del viernes en el feed (Reel 9:16 + LinkedIn). Desde el 07/10/2026 es **una escena animada de una sola pantalla** que arma `scripts/video-animado.js` a partir de una receta JSON (`posts/…-video.json`): el titular entra palabra por palabra y aparecen gráficos que explican el tema (tarjetas unidas por flechas, ventanas, listas con íconos, casilleros que se pintan, un número grande), con **un solo color de acento, el azul noche**, y sólo los íconos del design system. Es el estilo que Juan aprobó el 07/10/2026 («me gusta mucho más el último video», «ese mismo criterio para las próximas generaciones de video»; «no meter muchos colores… pero sí con las animaciones, las ventanas, flechitas, cuadritos, iconos»). Pasa por el panel de aprobación como el resto, y el botón Regenerar rehace también la receta. Las historias se agregan a **Destacadas a mano** desde la app (no hay API para eso). Detalle en la regla del video de la skill.

Juan pidió **esfuerzo de dirección de arte** en los videos (25/09/2026): antes del render final se revisan las hojas de cuadros (la tira, la de contacto y la de celular) con la tabla y el puntaje del paso 4c, y se corrige lo que falle (hasta 8 o más en todo). El Reel lleva de tapa la portada 9:16 que arma el script (`-portada.png`). El script avisa si algo salta en el MP4. Los videos van **sin sonido** (28/09/2026), **sin encuestas** (06/10/2026: «muy básico, muy inteligencia artificial, poco profesional») y **sin gente**. Se evaluaron dos guías de motion: `onetake` (feitangyuan/onetake, licencia no comercial: sólo ideas) y `claude-motion-design` (howseen-ai, MIT); de ahí salen la revisión con puntaje, el control de saltos y el color BT.709. No se usan su desenfoque, sus resortes con rebote ni su sonido: el manual y Juan los descartan.

**La voz** (06/10/2026): Juan coincidió en que lo que suena a IA es el texto, no el diseño. Afirmar en vez de preguntar, mostrar lo que sabe el estudio (la norma, el formulario, qué se revisaría) y cerrar con lo que haría el estudio. `scripts/revisar-textos.js` atrapa lo mecánico (AFIP, «llamanos», preguntas, aforismos, frases de manual) antes de renderizar.

## Estrategia de contenido (desde el 25/09/2026)

La estrategia de las redes vive en `.claude/skills/mdo-rutina-semanal/CONTEXTO-PUBLICIDAD.md` y la rutina la lee en cada armado. Sale del análisis de la pauta de Meta y Google (`jmartinez-sketch/mdo-publicidad`), de las páginas de servicio de la web (`jmartinez-sketch/mdo-web`) y del rendimiento orgánico en Metricool.

- El estudio trabaja **sólo para empresas**.
- El orgánico es la vidriera para quien llega desde un anuncio, y la noticia del miércoles se publica como nota en la web.
- Ejes por peso comercial: Ingresos Brutos, IVA/MiPyME, sociedades, auditoría, empleadores, contabilidad.
- Cada post cierra con la página de su servicio. Nunca se invita a llamar.
- Es contenido; el diseño sigue siendo el del design system.
- **Variedad visual** (05/10/2026): cada semana al menos una placa con foto o número grande, nunca dos de texto sobre navy seguidas en la grilla, el miércoles con número grande si la noticia lo trae, y carrusel de calendario la primera semana del mes. Detalle en la regla «Variedad visual» de la skill.

## Regla dura sobre el tip PyME (viernes)

El tip lo genera la IA. Para evitar imprecisiones técnicas:

- ❌ NUNCA mencionar números específicos (montos monotributo, alícuotas, topes)
- ❌ NUNCA mencionar fechas/plazos de vencimientos
- ❌ NUNCA dar consejos legales específicos
- ✅ SOLO tips genéricos atemporales sobre gestión y hábitos contables

Si el draft generado contiene cualquier dato específico, descartarlo y regenerar.

## Regla dura: ARCA, nunca AFIP

El organismo recaudador **ya no se llama AFIP**: es **ARCA** (Agencia de Recaudación y Control Aduanero). En TODO el contenido (títulos, copys, imágenes, hashtags) usar siempre **ARCA**. ❌ Nunca escribir "AFIP". Si una fuente/newsletter dice "AFIP", traducirlo a "ARCA" al redactar.

## Branch de trabajo

La rama activa para este proyecto: ver `git branch --show-current`. Las imágenes commiteadas a esa rama son accesibles vía:

```
https://raw.githubusercontent.com/jmartinez-sketch/mdo-automatizaciones-redes/main/posts/<archivo>.png
```

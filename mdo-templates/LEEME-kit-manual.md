# Kit de redes según el manual — el catálogo entero, sincronizado desde el design system

Estas placas vienen del design system **«MDO - Diseño»**
(https://claude.ai/code/artifact/44406cc7-a5b6-4e92-8bc3-ba5e9090747b), plantilla
**4.4 · Kit de redes — según el manual** (`project/templates/kit-redes-manual/KitRedesManual.dc.html`).
Están copiadas **tal cual**: el HTML es el mismo que genera el design system, con
sus estilos en línea. No se reinterpretó nada, así que la placa del repo es
idéntica a la del design system. **El design system es la única fuente**: acá no
se edita nada de diseño, se sincroniza (ver «Cómo se sincroniza», abajo).

Viven en [`templates-kit-manual.jsx`](templates-kit-manual.jsx). Son **79 placas**: las 53 heredadas del catálogo rehechas con la gramática del manual (mismo id, **pisan a la versión vieja**) más las nuevas `nv-`/`sv-`/`in-`. Los slots de cada una están en [PLACEHOLDERS-kit.md](PLACEHOLDERS-kit.md) y se definen en `kit-slots.json`.

## Las tres familias

Salen de la guía de redes de la página 23 del Manual de Marca 2026.

| Familia | IDs | Fondo | Para |
|---|---|---|---|
| **A · Novedades impositivas / ARCA** | `nv-01` … `nv-10` | navy con degradé diagonal | Novedades normativas, vencimientos, ARCA y ANSES |
| **B · Servicios** | `sv-01` … `sv-08` | degradé claro con el isotipo gigante | Lo comercial: qué hace el estudio |
| **D · Institucional / Marca** | `in-02`, `in-03`, `in-04` | foto con velo navy, o papel | Posicionamiento, filosofía, valores |

El manual define una cuarta familia, **MDO Explica / contenido educativo**. El
estudio decidió **no usarla**: el contenido educativo se publica como Novedades
o como Servicios.

## En qué se diferencian del resto del catálogo

Son reglas del manual, no gusto:

- **No llevan lockup arriba, ni chip, ni pie con `@mdoconsultores`.** La marca se
  firma con el logo centrado, el isotipo chico, el lockup secundario o la marca
  de agua gigante.
- **Están maquetadas directo a 1080×1350**, no en base 540 escalada como el resto
  del catálogo. Por eso en el registry de `render.html` van con `baseW`/`baseH`
  iguales a `outW`/`outH`: no se escalan.
- **El margen es de 130 px en los cuatro lados** y no se baja.
- Sin íconos ni ilustración. Sin emojis. **ARCA, nunca AFIP.**

## Cómo se renderiza una

Igual que cualquier otra:

```bash
node scripts/render.js --template nv-01 --out out/nv-01.png
```

El texto que traen es el de ejemplo del kit. La rutina lo reemplaza por
find/replace, igual que con el resto de las plantillas (ver
[PLACEHOLDERS.md](PLACEHOLDERS.md)).

## Cómo se sincroniza desde el design system

Si el diseño cambia, **cambia en el design system** y después se trae al repo. No
se editan estas placas, ni el CSS, ni los logos a mano: la próxima sincronización
los pisa. La rutina semanal lo hace sola en su paso 0b; a mano son dos pasos:

1. **Bajar los archivos** con la herramienta `Artifact` de Claude Code (`action: read`,
   `url` = https://claude.ai/code/artifact/44406cc7-a5b6-4e92-8bc3-ba5e9090747b,
   `path` = cada uno de éstos). Quedan en `<scratchpad>/artifact-files/44406cc7-a5b6-4e92-8bc3-ba5e9090747b/…`:

   | Archivo del design system | Va a | Qué es |
   |---|---|---|
   | `project/design-system.json` | — (sólo se lee) | El índice: fecha y nota del último cambio |
   | `project/templates/kit-redes-manual/KitRedesManual.dc.html` | `templates-kit-manual.jsx` | El kit 4.4, las 79 placas |
   | `project/ui_kits/redes/mdo-brand.css` | `mdo-brand.css` | Colores, tipografías, primitivas |
   | `project/components/assets/logos/isotipo-navy.svg` | `assets/logo-mdo-iso.svg` | Isotipo navy |
   | `project/components/assets/logos/isotipo-paper.svg` | `assets/logo-mdo-iso-white.svg` | Isotipo papel |
   | `project/components/assets/logos/logo-principal-navy.svg` | `assets/logo-mdo-principal.svg` | Logo principal navy |
   | `project/components/assets/logos/logo-principal-paper.svg` | `assets/logo-mdo-principal-white.svg` | Logo principal papel |
   | `project/components/assets/logos/logo-secundario-navy.svg` | `assets/logo-mdo-secundario.svg` | Logo secundario navy |
   | asset `49b43af7d306c5f26383c300225b5816` (`assets/logos/logo-secundario-paper.svg`) | `assets/logo-mdo-secundario-white.svg` | Logo secundario papel. Es un asset suelto: se baja por id, no por ruta |

2. **Correr el sincronizador** sobre esa carpeta:

```bash
node scripts/sincronizar-diseno.js <scratchpad>/artifact-files/44406cc7-a5b6-4e92-8bc3-ba5e9090747b
```

Compara cada archivo con el del repo, escribe **sólo lo que cambió** y lo lista.
Para el kit llama a `scripts/extraer-kit-manual.js`, que corta cada placa por su
`id`, mapea las rutas de logo del design system a las de `mdo-templates/assets/`
(tabla `LOGOS` del script; si aparece una ruta nueva, falla y hay que agregarla),
pone los slots según `kit-slots.json` y aplica los ajustes de la tabla `AJUSTES`.
Después: renderizar una placa de prueba de lo que cambió, mirarla, y commitear a
`main` con `diseño: sincronizado con MDO - Diseño (<fecha del último cambio>)`.

### Dos cosas que el kit trae y el repo adapta

- **Fotos.** El kit pone las fotos con `<image-slot src fit shape>`, un elemento
  propio de Claude Design. `render.html` lo define como una `<img>` que llena su
  caja; sin eso, `mn-07`, `mn-08`, `st-08`/`st-08b`/`st-08c` e `in-02` salían con
  fondo navy liso (pasó hasta el 17/09/2026). Las fotos están en
  `mdo-templates/assets/fotos/` (`arquitectura-navy.jpg`, `manos-teclado.jpg`).
- **Slots parciales.** En las historias de cita (`st-08*`) la tercera línea del kit
  es «es la primera decisión **estratégica** del año.», con el slot sólo sobre la
  palabra destacada. La rutina llena la línea entera, así que el extractor deja
  `[TITULAR_3]` como línea completa (tabla `AJUSTES`). Si el kit cambia y el ajuste
  ya no matchea, el extractor avisa.

### Fotos que faltan (in-01, in-05, in-06)

Están descartadas porque dependen de `calle-corporativa.jpg` y `torres-cielo.jpg`,
que en su momento no se pudieron bajar. Hoy están en el design system como assets
del grupo `redes` (ids en `project/api/assets/redes.md`: `8c3b92674fca5f0c689bf0ac8eafb151`
y `4609976d11d0f9f77b9df9c71bb039a7`). Para recuperarlas: bajarlas por id a
`mdo-templates/assets/fotos/` con esos nombres, sacar los tres ids de `DESCARTADAS`
en `scripts/extraer-kit-manual.js`, sincronizar y mirar los renders. Es una
decisión de Juan, no de la rutina.

## Lo que este kit retira

Estas seis **ya no están**: se sacaron del registry, del canvas de vista previa y
de la rutina semanal.

| ID | Qué era | Por qué se cae | Qué usar en su lugar |
|---|---|---|---|
| `po-06`, `po-06b` | Voz experta / equipo | El kit nuevo no lleva voz experta | `in-02` … `in-04`, la familia institucional |
| `po-13` | Noticia, versión vieja | Ya renderizaba lo mismo que `po-13d`: las dos apuntaban al mismo componente | `po-13d` o `po-13e` |
| `po-37`, `st-07`, `st-07b` | Vencimientos de la semana | El kit nuevo no lleva vencimientos de la semana | el carrusel de calendario (`ca-cover` + `ca-q1` + `ca-q2`), o `sq-01` para un vencimiento puntual |

| `in-01`, `in-05`, `in-06` | Institucional con foto | Dependen de `calle-corporativa.jpg` y `torres-cielo.jpg`, que en su momento no se pudieron bajar completas. Descartadas el 2026-09-05; hoy recuperables, ver «Fotos que faltan» | `in-02`, `in-03`, `in-04` |

Pedir una de éstas ahora **falla**, con el id que no existe en el mensaje. Antes
no: `render.html` caía en `sq-01` sin avisar, así que un id retirado o mal
escrito salía como un PNG de otra placa. `scripts/render.js` ahora frena.

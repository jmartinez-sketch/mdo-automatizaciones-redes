# Kit de redes según el manual — las 21 placas nuevas

Estas placas vienen del proyecto de Claude Design **MDO - Diseño**, plantilla
**4.4 · Kit de redes — según el manual**. Están copiadas **tal cual**: el HTML es
el mismo que genera Claude Design, con sus estilos en línea. No se reinterpretó
nada, así que la placa del repo es idéntica a la del design system.

Viven en [`templates-kit-manual.jsx`](templates-kit-manual.jsx).

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

## Cómo se regenera desde Claude Design

Si el kit cambia en Claude Design, no se editan estas placas a mano: se vuelven a
extraer. Hace falta una sesión de Claude Code con acceso al design system
(`/design-login` una vez por máquina).

1. Bajar `templates/kit-redes-manual/KitRedesManual.dc.html` del proyecto
   `cc21dedf-8438-4e6c-85bf-eba9b0ba2fc5` con la herramienta DesignSync.
2. Correr el extractor sobre ese archivo:

```bash
node scripts/extraer-kit-manual.js <archivo-bajado.json> mdo-templates/templates-kit-manual.jsx
```

El extractor corta cada placa por su `id`, mapea las rutas de logo de Claude
Design a las de `mdo-templates/assets/`, y falla si aparece una ruta que no sabe
mapear. Si eso pasa, hay que agregarla a la tabla `LOGOS` del script.

## Lo que este kit retira

Estas seis **ya no están**: se sacaron del registry, del canvas de vista previa y
de la rutina semanal.

| ID | Qué era | Por qué se cae | Qué usar en su lugar |
|---|---|---|---|
| `po-06`, `po-06b` | Voz experta / equipo | El kit nuevo no lleva voz experta | `in-02` … `in-04`, la familia institucional |
| `po-13` | Noticia, versión vieja | Ya renderizaba lo mismo que `po-13d`: las dos apuntaban al mismo componente | `po-13d` o `po-13e` |
| `po-37`, `st-07`, `st-07b` | Vencimientos de la semana | El kit nuevo no lleva vencimientos de la semana | el carrusel de calendario (`ca-cover` + `ca-q1` + `ca-q2`), o `sq-01` para un vencimiento puntual |

| `in-01`, `in-05`, `in-06` | Institucional con foto | Dependen de `calle-corporativa.jpg` y `torres-cielo.jpg`, que superan el tope de lectura de DesignSync (192 KiB) y no se pueden bajar completas. Descartadas el 2026-09-05 | `in-02`, `in-03`, `in-04` |

Pedir una de éstas ahora **falla**, con el id que no existe en el mensaje. Antes
no: `render.html` caía en `sq-01` sin avisar, así que un id retirado o mal
escrito salía como un PNG de otra placa. `scripts/render.js` ahora frena.

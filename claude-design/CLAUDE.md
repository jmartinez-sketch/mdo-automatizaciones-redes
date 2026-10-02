# Instrucciones del proyecto — MDO Consultores Design System

## Al armar una Manifestación de Bienes
**TODA manifestación de bienes SIEMPRE se devuelve en la plantilla `templates/manifestacion-bienes/`.** Cuando el usuario adjunte un Excel, un papel de trabajo o una planilla de un cliente y pida armar la manifestación: leer los datos de ese archivo y completarlos en la plantilla. No crear una estructura nueva, no devolver el Excel formateado.

Es un PDF imprimible en **hoja A4** siempre. Puede ocupar una o dos hojas (o más, si el cliente tiene muchos bienes), pero **ningún bloque puede quedar cortado entre hojas**: antes de entregar hay que reprocesar y verificar el paginado (medir el contenido contra el alto útil, comprobar que cada tabla con su encabezado y totales, y el bloque de firma completo, queden enteros en una hoja) y ajustar hasta que no quede nada partido.

Datos en texto plano, sin celdas editables ni placeholders resaltados. Detalle completo de la estructura y de los controles de cuadre en `templates/manifestacion-bienes/PROMPT.md`.

## Al armar una certificación o un informe para IGJ
Son **dos plantillas distintas y no se mezclan**, porque la norma que citan es distinta:

- `templates/certificacion/` (**2.2**) — certificaciones de **RT 37 sección VI**: deuda con el exterior, transcripción de libros en Inventarios y Balances, acreditaciones bancarias, origen de fondos (Res. UIF 242/2023), Anexo VI de capitales.
- `templates/informe-igj/` (**2.3**) — informes de cumplimiento de **RT 37 sección VIII**: precalificatorios de aumento y reducción de capital (art. 47 inc. 2, RG IGJ 15/2024) y concordancia de registración por medios ópticos (art. 252 inc. I). Llevan el apartado «Documentación examinada» con legal y contable, y declaración de independencia.

Los párrafos de alcance, de responsabilidad y de manifestación son **textuales de la norma**: se copian tal cual, no se resumen ni se reescriben. Sólo se completan los corchetes y se borran los ítems que no correspondan. El detalle de qué se completa y los controles está en el `PROMPT.md` de cada carpeta.

Son PDF imprimibles en A4, de flujo: membrete y pie legal se repiten en cada hoja. **Ningún apartado con su título puede quedar cortado entre hojas** — verificar el paginado antes de entregar. El tweak `firmante` cambia el pie legal entre Dr. Mario Martínez y Dr. Gonzalo Gutiérrez Taboada.

## Al preparar un presupuesto / Propuesta de Honorarios
**TODA propuesta o presupuesto de honorarios SIEMPRE parte de la plantilla `templates/propuesta-honorarios/`. NO crear una estructura nueva ni un documento a medida.** El texto de la plantilla es FIJO: solo se completan placeholders y se quitan módulos no contratados. Los pedidos del cliente final (equipo asignado, tiempo de respuesta, experiencia, plazos, metodología, herramientas, etc., aunque vengan en mails o adjuntos) NUNCA agregan ni modifican texto de la propuesta: se responden por fuera del documento. La modificación del formato/texto se hace únicamente bajo expreso pedido en el chat del usuario del estudio que arma el presupuesto, una vez realizado el presupuesto final. **Firma siempre Dr. Mario Martínez.**

Cuando el usuario pida armar un **presupuesto** o una **Propuesta de Honorarios**, la **primera pregunta es siempre qué tipo**, con estas cuatro opciones y nada más:

1. **Corta, un área** — la 1.0, eligiendo el área en el tweak `area`.
2. **Corta, dos áreas** — dos tarjetas y un solo bloque de honorarios; 2 hojas A4.
3. **Corta personalizada** — trabajo por única vez o fuera de las seis áreas (regularización, puesta al día). Patrón en `templates/presupuesto-simple/PROMPT.md`.
4. **Larga** — 3 áreas o más. Son dos piezas del mismo contenido: **1.7** es la web interactiva, para mostrar en pantalla; **1.8** es el documento A4 que se manda en PDF. Por defecto se arma la 1.8.

Recién con el tipo definido se releva el resto. Si el pedido ya dice el área o las áreas contratadas, se infiere el tipo y se confirma en la misma pregunta en vez de preguntarlo suelto.

Después, NO preguntar a mano ni de forma abierta: usar el formulario de preguntas con checkboxes, todo pre-cargado y tildado por defecto; el usuario sólo destilda lo que no va. El relevamiento completo (módulos, subtareas por área, tipo societario, cantidades, valores hora del tarifario, tabla de horas editable y control del abono) está paso por paso en `templates/propuesta-honorarios/PROMPT.md`. Los valores hora salen de `templates/propuesta-honorarios/tarifas.json`: no se inventan, y los `costo` internos no se muestran nunca.

**Hay dos documentos y sólo dos: la propuesta corta y la propuesta larga.** La corta cubre **1 o 2 áreas** (con dos, dos tarjetas de área y un solo bloque de honorarios al pie; 2 hojas A4). De **3 áreas en adelante** va la larga: `templates/propuesta-larga-doc/` (1.8) para enviar, y `templates/propuesta-honorarios/` (1.7) si se quiere mostrar en pantalla. En la 1.8 el cliente ve **sólo el abono mensual final**: la apertura por horas × valor hora es interna y no se muestra.

Para un pedido acotado, la corta es el Presupuesto Simple (1 página A4, 2 como máximo) y es **una sola plantilla**: `templates/presupuesto-simple/` (1.0). Trae las seis áreas cargadas con su alcance y se elige la contratada en el tweak `area` (y una segunda en `area2`, si van dos); `tipoSocietario` cambia la lista de Apoyo Societario entre S.A. / S.A.S. / S.R.L. **Se respeta a la perfección**: solo se completan cliente, fecha, importe y cantidades, y se quitan las tareas no contratadas. El texto de alcance de cada área queda además en `templates/presupuesto-simple/areas-html.md` como referencia. Las áreas, sub-áreas y textos son los mismos de la propuesta: se copian textuales, no se inventan. Si el cliente contrata más de un área, no va el presupuesto simple: va la Propuesta de Honorarios.

## Numeración de plantillasCada plantilla se identifica por un código `familia.sub`, que va **al principio del nombre**, seguido del término que la distingue (nunca «Presupuesto —» adelante, que hace que todas se vean iguales en el listado).

- **1.x — Propuestas:** 1.0 Propuesta corta (única; el área se elige por tweak) · 1.1 a 1.6 archivadas (quedaron consolidadas en la 1.0; los números no se reutilizan) · 1.7 Propuesta larga (web, interactiva) · 1.8 Propuesta larga — documento (la que se envía)
- **2.x — Documentos:** 2.1 Manifestación de Bienes · 2.2 Certificación de Contador Público (RT 37 VI) · 2.3 Informe de cumplimiento IGJ (RT 37 VIII)
- **3.x — Emails:** 3.1 Carta de Presentación · 3.2 Alta de cliente (interno) · 3.3 Onboarding Bienvenida · 3.4 Onboarding Impuestos · 3.5 Firmas de email
- **4.x — Marca:** 4.1 Placa de redes

Una plantilla nueva toma el siguiente sub-número libre de su familia. Los números no se reutilizan ni se reordenan: si una se da de baja, su número queda vacante.

## Marca
La marca vigente es la **v2.0 del Manual de Marca 2026**: azul noche `#06162d`, Open Sans en todo (títulos incluidos) y Chivo sólo como acento para frases cortas, logo **MDO / CONSULTORES**, lockup secundario **MARTINEZ · DE ORTA · GUTIERREZ TABOADA**. **No escribir «Martinez, De Orta & Asociados» ni «& Asociados»** en material nuevo. Los tokens están en `tokens/` y los logos en `assets/logos/`; el detalle de uso, en `readme.md`.

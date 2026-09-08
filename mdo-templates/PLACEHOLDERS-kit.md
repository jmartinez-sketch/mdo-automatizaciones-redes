# Slots del kit 4.4 — placas de Claude Design

Generado por `scripts/extraer-kit-manual.js` a partir de `kit-slots.json`. **No editar a mano**: si un slot está mal, corregí `kit-slots.json` y volvé a correr el extractor.

Estas placas son el catálogo entero rehecho en Claude Design con la gramática del Manual de Marca 2026, y **pisan a las versiones viejas del mismo id**. Vocabulario:

- `FECHA` — dd.mm.aaaa, fecha de la noticia. `VOLANTA` — línea chica arriba (categoría/contexto).
- `TITULAR_1` + `TITULAR_2` — el titular va en **dos tonos**: la primera parte blanca y negrita, la segunda gris y normal. Cortar la frase donde tenga sentido. (`TITULAR_3` cuando hay tercera línea.)
- `BAJADA` — párrafo. `CIERRE` — remate en negrita al pie (reemplaza al CTA). `ITEM_n` — ítems de lista; la numeración 01/02/03 es fija.
- `NUMERO` + `UNIDAD` — placas de dato/vencimiento. `DIA_n` + `ITEM_n_TITULO` + `ITEM_n_DETALLE` — filas del calendario. `OPCION_A/B` — encuesta. `LABEL_n` + `LABEL_n_ITEM_k` — comparativas. `MITO`/`REALIDAD`, `ANTES`/`DESPUES`. `CITA` + `AUTOR` + `AUTOR_DETALLE` — testimonio.
- **No hay** `CATEGORIA`, `FUENTE` ni `HANDLE`: el kit no lleva chip, fuente ni pie con @handle. `@mdoconsultores`, la web y "MDO Consultores" quedan fijos donde el kit los trae.

Reglas duras del kit: sin emojis, sin íconos, **ARCA nunca AFIP**, margen de 130 px. Descartadas (fotos que no se pueden bajar del DS): `in-01`, `in-05`, `in-06`, `mn-06`, `sq-02b`.


## A · Novedades impositivas / ARCA

### `mn-02` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 28.07.2026 |
| `TITULAR_1` | ARCA pide informar |
| `TITULAR_2` | socios, directores y beneficiarios |
| `BAJADA` | Las sociedades deberán informar ante ARCA a los titulares de participaciones, directores y beneficiarios finales, conforme al régimen vigente y con vencimientos escalonados durante el mes. |
| `CIERRE` | Confirmá que tu sociedad se encuentre al día con esta obligación. |

### `sq-01` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Vencimiento · junio 2026 |
| `NUMERO` | 21 |
| `UNIDAD` | jun |
| `TITULAR_1` | IVA |
| `TITULAR_2` | posición mensual 05/2026 |
| `CIERRE` | Hasta las 23:59. Te lo presentamos nosotros. |

### `sq-03` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | En cifras · 2026 |
| `TITULAR_1` | libros societarios y contables |
| `TITULAR_2` | bajo control del estudio |
| `CIERRE` | Folios y custodia relevados uno por uno. |

### `po-13d` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 19.08.2026 |
| `TITULAR_1` | Nuevo régimen de facturación |
| `TITULAR_2` | para responsables inscriptos |
| `BAJADA` | Cambia el plazo de emisión y el detalle obligatorio del comprobante. |
| `CIERRE` | Revisamos tu circuito de facturación antes de que aplique. |

### `po-13e` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 19.08.2026 |
| `TITULAR_1` | Nuevo régimen de facturación |
| `TITULAR_2` | para responsables inscriptos |
| `BAJADA` | Cambia el plazo de emisión y el detalle obligatorio del comprobante. |
| `CIERRE` | Revisamos tu circuito de facturación antes de que aplique. |

### `po-24` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Contabilidad |
| `TITULAR_1` | ¿Tu PyME tiene |
| `TITULAR_2` | esto resuelto? |
| `ITEM_1` | Balances y libros al día, sin corridas. |
| `ITEM_2` | Cuentas conciliadas todos los meses. |
| `ITEM_3` | Reportes claros para tomar decisiones. |
| `CIERRE` | Si te falta alguno, hablemos. |

### `po-26` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios · tres frentes |
| `TITULAR_1` | Un solo equipo |
| `TITULAR_2` | para tres frentes |
| `ITEM_1` | Impuestos: liquidación y planificación. |
| `ITEM_2` | Contabilidad: registración y balances. |
| `ITEM_3` | Laboral: sueldos y cargas sociales. |
| `CIERRE` | Todo con un mismo interlocutor. |

### `po-21` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Pregunta |
| `TITULAR_1` | ¿Sabés cuánto te cuesta |
| `TITULAR_2` | cada empleado por mes? |
| `BAJADA` | El sueldo bruto es sólo una parte: cargas sociales, ART, sindicato y provisión de aguinaldo suman. |
| `CIERRE` | Lo calculamos con vos, sin compromiso. |

### `st-10` · 1080×1920 · story 9:16
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Encuesta |
| `TITULAR_1` | ¿Cómo llevás hoy |
| `TITULAR_2` | la facturación? |
| `OPCION_A` | En una planilla propia |
| `OPCION_B` | Directo en el portal de ARCA |
| `CIERRE` | Respondé en la encuesta y te contamos qué conviene. |

### `li-01` · 1200×628 · LinkedIn 1.91:1
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 11.06.2026 |
| `TITULAR_1` | ARCA abre la Moratoria Laboral |
| `TITULAR_2` | para empleadores |
| `CIERRE` | Permite regularizar personal no registrado con condiciones que no suelen repetirse. |

### `li-03` · 1200×628 · LinkedIn 1.91:1
| Slot | Ejemplo en el kit |
|---|---|
| `NUMERO` | 128 |
| `BAJADA` | En cifras · 2026 |
| `TITULAR_1` | libros societarios y contables |
| `TITULAR_2` | bajo control del estudio |
| `CIERRE` | Folios y custodia relevados uno por uno. |

### `sq-12` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 19.06.2026 |
| `TITULAR_1` | ARCA extiende el plazo |
| `TITULAR_2` | para presentar la DDJJ de Ganancias |
| `BAJADA` | La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio. |
| `CIERRE` | Si todavía no presentaste, hay tiempo. Consultanos. |

### `po-31` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Impuestos · guía |
| `TITULAR_1` | Cómo recategorizarte |
| `TITULAR_2` | en tres pasos |
| `ITEM_1` | Sumá la facturación de los últimos doce meses. |
| `ITEM_2` | Compará con la escala vigente de ARCA. |
| `ITEM_3` | Confirmá la categoría nueva antes del día 20. |
| `CIERRE` | Lo revisamos con vos antes de confirmar. |

### `po-32` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Comparativa |
| `TITULAR_1` | Monotributo |
| `TITULAR_2` | o Responsable Inscripto |
| `LABEL_1` | Monotributo |
| `LABEL_1_ITEM_1` | Cuota fija mensual, simple de liquidar. |
| `LABEL_1_ITEM_2` | No discrimina IVA en tus facturas. |
| `LABEL_1_ITEM_3` | Tiene topes de facturación anual. |
| `LABEL_2` | Responsable inscripto |
| `LABEL_2_ITEM_1` | Liquidás IVA y Ganancias por separado. |
| `LABEL_2_ITEM_2` | Podés computar el IVA de tus compras. |
| `LABEL_2_ITEM_3` | Sin tope: acompaña el crecimiento. |
| `CIERRE` | No hay una mejor: hay una que le sirve a tu estructura de costos. |

### `po-33` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Elegí tu caso |
| `TITULAR_1` | ¿Qué te describe |
| `TITULAR_2` | mejor hoy? |
| `ITEM_1` | Facturo solo y estoy en monotributo. |
| `ITEM_2` | Tengo empleados y soy responsable inscripto. |
| `ITEM_3` | Tengo una sociedad con socios. |
| `CIERRE` | Cada caso tiene su plan. Escribinos. |

### `po-34` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Mito y realidad |
| `MITO` | «Si soy monotributista, no tengo que llevar contabilidad.» |
| `REALIDAD` | Sin registros no hay forma de saber si la categoría sigue siendo la correcta. |

### `po-35` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Laboral · errores frecuentes |
| `TITULAR_1` | Cinco errores |
| `TITULAR_2` | al liquidar sueldos |
| `ITEM_1` | No actualizar los topes previsionales del mes. |
| `ITEM_2` | Omitir el F.572 de los empleados. |
| `ITEM_3` | Liquidar vacaciones sin el plus correspondiente. |
| `ITEM_4` | Presentar el F.931 fuera de término. |
| `CIERRE` | Revisamos tu liquidación antes de pagar. |

### `po-27` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Pregunta |
| `TITULAR_1` | ¿Sabés cuánto te cuesta |
| `TITULAR_2` | cada empleado por mes? |
| `BAJADA` | El sueldo bruto es sólo una parte: cargas sociales, ART, sindicato y provisión de aguinaldo suman. |
| `CIERRE` | Lo calculamos con vos, sin compromiso. |

### `po-28` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Societario · proceso |
| `TITULAR_1` | Constituir una S.A.S. |
| `TITULAR_2` | en tres pasos |
| `ITEM_1` | Reservá el nombre y definí el instrumento constitutivo. |
| `ITEM_2` | Firmá digitalmente e integrá el capital mínimo. |
| `ITEM_3` | Inscribí en el Registro Público y obtené el CUIT. |
| `CIERRE` | Acompañamos todo el trámite. |

### `po-29` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Pregunta |
| `TITULAR_1` | ¿Sabés cuánto te cuesta |
| `TITULAR_2` | cada empleado por mes? |
| `BAJADA` | El sueldo bruto es sólo una parte: cargas sociales, ART, sindicato y provisión de aguinaldo suman. |
| `CIERRE` | Lo calculamos con vos, sin compromiso. |

### `po-30` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Cuatro cosas que |
| `TITULAR_2` | resolvemos por vos |
| `ITEM_1` | Vencimientos y presentaciones ante ARCA. |
| `ITEM_2` | Libros societarios y trámites en IGJ. |
| `ITEM_3` | Sueldos, F.931 y convenios. |
| `ITEM_4` | Balances y certificaciones. |
| `CIERRE` | Consultanos. |

### `ca-cover` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Calendario impositivo |
| `TITULAR_1` | Junio |
| `TITULAR_2` | 2026 |
| `BAJADA` | Vencimientos de ARCA, IGJ y previsionales del mes en un solo lugar. |
| `DESTACADO` | Deslizá |

### `ca-q1` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Primera quincena · junio 2026 |
| `TITULAR_1` | Vencimientos |
| `TITULAR_2` | del 7 al 14 |
| `DIA_1` | 07 |
| `ITEM_1_TITULO` | Aportes autónomos |
| `ITEM_1_DETALLE` | Cat. I-V · 05/26 |
| `DIA_2` | 11 |
| `ITEM_2_TITULO` | Ingresos Brutos |
| `ITEM_2_DETALLE` | CABA · Anticipo 05/26 |
| `DIA_3` | 12 |
| `ITEM_3_TITULO` | Convenio Multilateral |
| `ITEM_3_DETALLE` | CM05 · 05/26 |
| `DIA_4` | 13 |
| `ITEM_4_TITULO` | IVA |
| `ITEM_4_DETALLE` | Posición 05/2026 |
| `DIA_5` | 14 |
| `ITEM_5_TITULO` | Sueldos · F.931 |
| `ITEM_5_DETALLE` | Devengado 05/2026 |
| `DESTACADO` | Guardá el post para tenerlo a mano. |

### `ca-q2` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Segunda quincena · junio 2026 |
| `TITULAR_1` | Vencimientos |
| `TITULAR_2` | del 15 al 30 |
| `DIA_1` | 18 |
| `ITEM_1_TITULO` | Ganancias · PH |
| `ITEM_1_DETALLE` | DDJJ anual 2025 |
| `DIA_2` | 20 |
| `ITEM_2_TITULO` | IVA |
| `ITEM_2_DETALLE` | Posición 05/2026 |
| `DIA_3` | 22 |
| `ITEM_3_TITULO` | Bienes Personales |
| `ITEM_3_DETALLE` | DDJJ anual 2025 |
| `DIA_4` | 26 |
| `ITEM_4_TITULO` | SiCoRe |
| `ITEM_4_DETALLE` | Retenciones · 05/26 |
| `DIA_5` | 30 |
| `ITEM_5_TITULO` | Ganancias · Sociedades |
| `ITEM_5_DETALLE` | Anticipo |
| `DESTACADO` | Te lo presentamos nosotros. |

### `cb-cover` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Gestión PyME · Monotributo |
| `TITULAR_1` | Monotributo 2026 |
| `TITULAR_2` | cuatro cosas que conviene entender |
| `BAJADA` | Antes de fin de año, revisá estos puntos con tu contador. |
| `DESTACADO` | Deslizá |

### `cb-tip1` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Punto 1 de 3 |
| `TITULAR_1` | La categoría |
| `TITULAR_2` | no es para siempre. |
| `ITEM_1` | ARCA revisa cada seis meses tu facturación, alquileres y consumos. Si te corrés de la escala, hay que recategorizar; si no, llega la baja de oficio. |
| `DESTACADO` | Revisalo en enero y en julio. |

### `cb-tip2` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Punto 2 de 3 |
| `TITULAR_1` | Tu obra social |
| `TITULAR_2` | también suma. |
| `ITEM_1` | El componente de obra social cubre el grupo familiar primario, pero por cada integrante adicional pagás un aporte extra. |
| `DESTACADO` | Pedí el detalle a tu contador. |

### `cb-tip3` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Punto 3 de 3 |
| `TITULAR_1` | Facturá |
| `TITULAR_2` | todo lo que cobrás. |
| `ITEM_1` | Los pagos por billetera virtual también cuentan para la escala. ARCA cruza esa información con tu categoría. |
| `DESTACADO` | Sin sorpresas en la recategorización. |

### `sq-03b` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | En cifras · 2026 |
| `TITULAR_1` | libros societarios y contables |
| `TITULAR_2` | bajo control del estudio |
| `CIERRE` | Folios y custodia relevados uno por uno. |

### `sq-12b` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | Último momento · 19.06.2026 |
| `TITULAR_1` | ARCA extiende el plazo |
| `TITULAR_2` | para Ganancias |
| `CIERRE` | Nuevo vencimiento: 30 de junio. |

### `po-13b` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 19.08.2026 |
| `TITULAR_1` | Cambia el plazo de emisión |
| `TITULAR_2` | y el detalle del comprobante |
| `BAJADA` | Nuevo régimen de facturación para responsables inscriptos: ARCA fija el nuevo alcance por resolución general. |
| `CIERRE` | Revisamos tu circuito antes de que aplique. |

### `sq-01b` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Vencimiento · junio 2026 |
| `NUMERO` | 21 |
| `UNIDAD` | jun |
| `TITULAR_1` | IVA |
| `TITULAR_2` | posición mensual 05/2026 |
| `CIERRE` | Hasta las 23:59. Te lo presentamos nosotros. |

### `sq-03c` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | En cifras · 2026 |
| `TITULAR_1` | libros societarios y contables |
| `TITULAR_2` | bajo control del estudio |
| `CIERRE` | Folios y custodia relevados uno por uno. |

### `sq-12c` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 19.06.2026 |
| `TITULAR_1` | ARCA extiende el plazo |
| `TITULAR_2` | para presentar la DDJJ de Ganancias |
| `BAJADA` | La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio. |
| `CIERRE` | Si todavía no presentaste, hay tiempo. Consultanos. |

### `po-13c` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 11.06.2026 |
| `TITULAR_1` | ARCA abre la Moratoria Laboral |
| `TITULAR_2` | para empleadores |
| `BAJADA` | Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse. |
| `CIERRE` | Evaluamos si a tu empresa le conviene entrar. |

### `po-22` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Antes / después |
| `TITULAR_1` | Cerrar el balance |
| `TITULAR_2` | sin correr en marzo |
| `ANTES` | Comprobantes sueltos, conciliaciones a último momento y el balance firmado el día del vencimiento. |
| `DESPUES` | Registración mensual, cierres trimestrales y el balance listo un mes antes. |
| `CIERRE` | El orden no es un gasto: es tiempo que recuperás. |

### `nv-01` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 05.09.2026 |
| `TITULAR_1` | ARCA prorroga Ganancias |
| `TITULAR_2` | y Bienes Personales de sociedades |
| `BAJADA` | El nuevo cronograma corre los vencimientos de septiembre según terminación de CUIT. |
| `CIERRE` | Confirmá tu fecha antes de programar el pago. |

### `nv-02` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 02.09.2026 |
| `TITULAR_1` | Nuevo régimen de información |
| `TITULAR_2` | para operaciones con billeteras virtuales |
| `BAJADA` | Las plataformas informan a ARCA saldos y movimientos mensuales por titular a partir de octubre. |
| `CIERRE` | Ordená tus cobros antes de que cruce la información. |

### `nv-03` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 01.09.2026 |
| `TITULAR_1` | Actualizan la escala |
| `TITULAR_2` | del impuesto a las Ganancias |
| `BAJADA` | Los tramos se ajustan por IPC. Cambia la retención mensual de los empleados en relación de dependencia. |
| `CIERRE` | Revisá tu recibo de este mes. |

### `nv-04` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 28.08.2026 |
| `TITULAR_1` | IGJ exige balances |
| `TITULAR_2` | en formato digital |
| `BAJADA` | Desde octubre las presentaciones se hacen sólo por trámite a distancia, con firma digital del representante. |
| `CIERRE` | Adecuamos tus libros y presentaciones. |

### `nv-05` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `FECHA` | 27.08.2026 |
| `TITULAR_1` | Nuevo tope |
| `TITULAR_2` | para las asignaciones familiares |
| `BAJADA` | ANSES actualizó rangos y montos con un incremento del 2,11 %. Impacta en la liquidación de septiembre. |
| `CIERRE` | Revisá que tu liquidación tome los valores nuevos. |

### `nv-06` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Vencimiento anual · 2026 |
| `NUMERO` | 30 |
| `UNIDAD` | sep |
| `TITULAR_1` | Ganancias sociedades |
| `TITULAR_2` | cierre de ejercicio 05/2026 |
| `CIERRE` | Presentación y pago. Te lo gestionamos. |

### `nv-07` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Cierre 31.12 |
| `TITULAR_1` | Cerrás ejercicio |
| `TITULAR_2` | el 31 de diciembre |
| `BAJADA` | Los balances se presentan en IGJ y ARCA dentro de los plazos legales. Empezá el inventario en noviembre. |
| `CIERRE` | Planificamos el cierre con vos. |

### `nv-08` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Monotributo · julio y enero |
| `TITULAR_1` | Recategorización |
| `TITULAR_2` | semestral del monotributo |
| `BAJADA` | ARCA compara tu facturación de los últimos doce meses con la escala vigente. Si cambiás de tramo, tenés hasta el 20. |
| `CIERRE` | Lo revisamos y confirmamos por vos. |

### `nv-09` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Pregunta |
| `TITULAR_1` | ¿Tu sociedad tiene |
| `TITULAR_2` | los libros al día? |
| `BAJADA` | Actas, registro de accionistas, inventarios y balances. IGJ los pide en cada trámite. |
| `CIERRE` | Hacemos el relevamiento sin costo. |

### `nv-10` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Dato clave |
| `UNIDAD` | días |
| `TITULAR_1` | para responder |
| `TITULAR_2` | una intimación de ARCA |
| `CIERRE` | Si te llegó una, escribinos hoy. |


## B · Servicios

### `mn-04` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Liquidación de sueldos |
| `BAJADA` | Nos encargamos de tus sueldos y cargas sociales para que vos te enfoques en tu negocio. |

### `li-02` · 1200×628 · LinkedIn 1.91:1
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | Mejores decisiones. |
| `TITULAR_2` | Negocios más sólidos. |

### `po-04` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Auditoría externa |
| `ITEM_1` | Auditoría de estados contables anuales |
| `ITEM_2` | Revisión limitada de información intermedia |
| `ITEM_3` | Informes especiales sobre patrimonio y resultados |
| `ITEM_4` | Atención de requerimientos ARCA / IGJ / CNV |

### `po-05` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Novedad del estudio |
| `TITULAR_1` | Nueva oficina en Núñez |
| `BAJADA` | Desde septiembre atendemos también en Av. del Libertador. Misma gente, más cerca. |

### `po-16` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Asesoramiento impositivo |
| `BAJADA` | Planificamos la carga fiscal de tu PyME para que pagues lo justo, sin sorpresas. |

### `st-09` · 1080×1920 · story 9:16
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Estás pensando en armar tu empresa |
| `TITULAR_1` | Hablemos |
| `TITULAR_2` | antes |
| `TITULAR_3` | de firmar. |
| `BAJADA` | Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo. |


## A · Novedades impositivas / ARCA

### `po-36` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Clientes |
| `CITA` | «Con MDO dejamos de correr detrás de los vencimientos. Ahora planificamos.» |
| `AUTOR` | Gerente de Administración |
| `AUTOR_DETALLE` | Empresa de logística · cliente desde 2019 |


## B · Servicios

### `po-04b` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Auditoría externa |
| `ITEM_1` | Auditoría de estados contables anuales |
| `ITEM_2` | Revisión limitada de información intermedia |
| `ITEM_3` | Informes especiales sobre patrimonio y resultados |
| `ITEM_4` | Atención de requerimientos ARCA / IGJ / CNV |

### `po-05b` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Novedad del estudio |
| `TITULAR_1` | Nueva oficina en Núñez |
| `BAJADA` | Desde septiembre atendemos también en Av. del Libertador. Misma gente, más cerca. |

### `st-09b` · 1080×1920 · story 9:16
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Estás pensando en armar tu empresa |
| `TITULAR_1` | Hablemos |
| `TITULAR_2` | antes |
| `TITULAR_3` | de firmar. |
| `BAJADA` | Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo. |


## A · Novedades impositivas / ARCA

### `po-23` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Asesoramiento impositivo |
| `TITULAR_1` | Elegiste cómo tributar |
| `TITULAR_2` | cuando tu empresa era otra. |
| `BAJADA` | La estructura fiscal se define al arrancar y después nadie la vuelve a mirar. Revisarla no es un trámite: es lo que define cuánto te cuesta crecer. |

### `po-25` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Una idea |
| `TITULAR_1` | Planificar impuestos |
| `TITULAR_2` | no es pagar menos. |
| `TITULAR_3` | Es pagar bien. |


## B · Servicios

### `sv-01` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Apoyo societario |
| `BAJADA` | Actas, asambleas, libros digitales y trámites ante IGJ, al día y sin demoras. |

### `sv-02` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Registración contable |
| `BAJADA` | Registramos tus operaciones mes a mes y armamos el balance con ajuste por inflación. |

### `sv-03` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Outsourcing administrativo |
| `BAJADA` | Conciliaciones, pagos, cobranzas y reporting mensual. Tu back office, llevado por nosotros. |

### `sv-04` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Precios de transferencia |
| `BAJADA` | Estudio, Master File e informe local para tus operaciones con el exterior. |

### `sv-05` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Laboral y previsional |
| `ITEM_1` | Liquidación mensual de haberes |
| `ITEM_2` | F.931 y cargas sociales |
| `ITEM_3` | Altas, bajas y Libro de Sueldos Digital |
| `ITEM_4` | Liquidaciones finales e indemnizaciones |

### `sv-06` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Impositivo |
| `ITEM_1` | IVA, Ingresos Brutos y Convenio Multilateral |
| `ITEM_2` | Ganancias y Bienes Personales |
| `ITEM_3` | Regímenes de retención y percepción |
| `ITEM_4` | Planificación fiscal y trámites ante ARCA |

### `sv-07` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | Todo lo que hacemos por tu empresa |
| `ITEM_1` | Impositivo |
| `ITEM_2` | Societario |
| `ITEM_3` | Contabilidad |
| `ITEM_4` | Auditoría |
| `ITEM_5` | Laboral |
| `ITEM_6` | Outsourcing administrativo |

### `sv-08` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `VOLANTA` | Servicios |
| `TITULAR_1` | ¿Hablamos |
| `TITULAR_2` | de tu empresa? |
| `TITULAR_3` | Sin compromiso. |
| `BAJADA` | Escribinos por mensaje directo y coordinamos una primera reunión. |


## D · Institucional / Marca

### `mn-01` · 1080×1350 · feed 4:5
_Sin texto variable (sólo marca/foto)._

### `mn-03` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | ¿Tu empresa está tomando decisiones |
| `TITULAR_2` | con información actualizada? |

### `mn-05` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | Mejores decisiones. |
| `TITULAR_2` | Negocios más sólidos. |

### `mn-07` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | Transformamos |
| `CITA` | la complejidad tributaria y contable |
| `TITULAR_2` | estratégicas. |

### `mn-08` · 1080×1350 · feed 4:5
_Sin texto variable (sólo marca/foto)._

### `sq-02` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | La planificación impositiva no es un costo: |
| `TITULAR_2` | es la primera decisión estratégica del año. |

### `st-08` · 1080×1920 · story 9:16
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | La planificación impositiva |
| `TITULAR_2` | no es un costo: |
| `TITULAR_3` | estratégica |

### `st-08b` · 1080×1920 · story 9:16
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | La planificación impositiva |
| `TITULAR_2` | no es un costo: |
| `TITULAR_3` | estratégica |

### `sq-02c` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | La planificación impositiva no es un costo: |
| `TITULAR_2` | es la primera decisión estratégica del año. |

### `st-08c` · 1080×1920 · story 9:16
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | La planificación impositiva |
| `TITULAR_2` | no es un costo: |
| `TITULAR_3` | estratégica |

### `in-02` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | Anticipamos |
| `CITA` | los desafíos de tu negocio |
| `TITULAR_2` | claridad. |

### `in-03` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | Más de treinta años |
| `TITULAR_2` | acompañando empresas. |

### `in-04` · 1080×1350 · feed 4:5
| Slot | Ejemplo en el kit |
|---|---|
| `TITULAR_1` | Estratégico. Claro. |
| `TITULAR_2` | Seguro. Cercano. |


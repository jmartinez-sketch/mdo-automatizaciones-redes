# Estrategia de contenido de redes (alineada con MDO Publicidad y la web)

Análisis del **25/09/2026**, pedido de Juan: *"que leas MDO Publicidad, Meta y Google, que hagas el análisis… para focalizar las próximas ejecuciones"*. Fuentes:

- El repo `jmartinez-sketch/mdo-publicidad`: `CLAUDE.md`, `BITACORA.md`, `plan/`, `google/` y el manual `captacion-empresas`.
- Las páginas de servicio de la web (`jmartinez-sketch/mdo-web`, `src/data/services.ts`).
- Las métricas orgánicas de Instagram en Metricool, del 16/06 al 19/09/2026.

Es **contenido**. El diseño sigue saliendo del design system «MDO - Diseño».

**Cómo mantenerlo al día.** Si en la sesión están clonados `/home/user/mdo-publicidad` y `/home/user/mdo-web`, al armar la semana:

1. `git fetch --depth 1 origin` en los dos.
2. Leer lo nuevo de `BITACORA.md` y `CLAUDE.md` de publicidad desde la fecha de este análisis (la rama de trabajo más reciente, no necesariamente `main`).
3. Revisar si cambió `src/data/services.ts` de la web.

Si algo contradice lo de abajo, manda lo más nuevo: actualizar este archivo y decirlo en el reporte. Si los repos no están, usar esto tal cual.

## 1. Diagnóstico

**Qué dice la pauta paga** (Meta y Google, julio a septiembre):

- **El estudio trabaja para empresas.** No atiende personas físicas, y la publicidad lo confirmó con plata.
  - Saldos a favor trajo 13 consultas baratas, todas de personas: el texto nunca decía "empresa".
  - En Google, la agencia gastó $2.069.021 en búsquedas de monotributo, trámites y otros estudios, y trajo **una sola** consulta.
  - Desde que placa, texto y mensaje dicen "para empresas", la primera consulta fue de una empresa.
- **Lo que trae consultas es un problema de plata concreto de la empresa**, contado por un estudio que lo resuelve.
  - Ejemplo: "tu empresa puede estar financiando al fisco" (Ingresos Brutos) es la campaña que mejor anda.
  - No traen consultas la noticia pura ni el "nos ocupamos de tus impuestos".
- **El comprador ya tiene contador.** Se le habla al que siente que su contador "le presenta, pero no lo asesora": algo concreto que nadie le mostró.

**Qué dicen los números del orgánico** (Instagram, 16/06 → 19/09/2026):

| Tipo de post | Alcance promedio | Los mejores | Los peores |
|---|---|---|---|
| Noticia: obligación o cambio normativo para empresas | **~60 personas** | CABA elimina la rúbrica laboral (91) · ARCA pide informar socios y beneficiario final (89, el único que se compartió) · RG 5824 de facturación (80) · IGJ domicilio electrónico (78) · Decreto 612 de aportes sindicales (75) | ANSES domicilio electrónico (31) |
| Servicio o consejo de gestión (viernes y sábado) | **~46 personas** | Liquidación de sueldos (65) · Contabilidad para PyMEs (60) | **"Asesoramiento impositivo." (24)** · Societario errores (33) · Asesoramiento societario (41) |

Lectura:

- **El orgánico es chico**: 30 a 90 personas por post, casi sin guardados, compartidos ni seguidores nuevos. Solo, no trae clientes.
- Rinde más **la obligación nueva que le cae a la empresa** (empleador, sociedad, facturación) contada con qué hacer.
- Rinde menos **el aviso del estudio que describe sus servicios**. Los dos peores de septiembre son del sábado.

**Para qué sirve entonces lo orgánico** (en este orden):

1. **Es la vidriera que mira el que viene de un anuncio.** La consulta llega por WhatsApp desde Meta o Google, y antes de escribir o de contratar mira el perfil. El perfil tiene que mostrar, sin dudas, un estudio para empresas que domina los temas del anuncio: Ingresos Brutos, MiPyME, impuestos, sociedades, auditoría.
2. **La noticia del miércoles se publica sola en la web** como nota (rutina «MDO - Novedades web»): la primera oración del texto es el título de la nota y el resto, el cuerpo. Es SEO: cada nota tiene que enlazar a la página de su servicio (regla del manual de publicidad).
3. **Cualquier post puede terminar promocionado** con la campaña «Publicaciones IG». Tiene que cumplir las mismas reglas que un anuncio.

## 2. Reglas de contenido

- **Para empresas, siempre.** Encuadrar desde "tu empresa", "tu sociedad", "si tu empresa tiene empleados". ❌ Nada de contenido para personas físicas: monotributo, recategorización, Bienes Personales o Ganancias personales, jubilación, ANSES personal, clave fiscal, empleada doméstica. ❌ Tampoco "trabajamos con profesionales independientes".
  - Si la noticia más fuerte del newsletter es de ese tipo, **se elige otra**.
  - Si una noticia toca a las dos, se cuenta sólo lo que cambia para la empresa.
- **Hablamos como el estudio que hace el trabajo** ("revisamos", "lo tramitamos", "liquidamos"). ❌ Nada de tutoriales de "cómo hacerlo vos": atraen al que se autogestiona.
- **El gancho es un problema de plata o de riesgo concreto de la empresa**, en la primera línea. Vender la plata, no el trámite.
- **Nunca invitar a llamar.** Juan, 25/09/2026: *"la idea es que no llame nadie"*.
  - Contacto por **WhatsApp, correo o la web**. ❌ "llamanos", ❌ 📞.
  - Si una placa muestra el +54 9 11 3566-7985, es el WhatsApp: decirlo así.
- **Datos fiscales en condicional**: "si tu empresa…", "según la actividad…", "puede…". Juan: *"no quiero generar un falso anuncio"*. Un porcentaje, plazo o vigencia que no esté en la fuente no se pone. Ante la duda, el dato se saca.
- **Ingresos Brutos es provincial**: ahí se dice **"el fisco"**, no ARCA. Para lo nacional, ARCA (y nunca AFIP).
- **MiPyME:**
  - Decir "pagar el IVA a 90 días **en lugar de al mes siguiente**", nunca "90 días antes". El viernes y el sábado, sin el número: "diferir el pago del IVA sin costo".
  - El beneficio es para micro y pequeñas, no para las medianas, y hay que elegir la opción.
  - Del cheque a cuenta de Ganancias se dice "una parte", sin porcentaje.
  - El certificado **no vence: se renueva solo**.
- **No prometer "pagar menos"**: la promesa es un beneficio legal vigente que quizás no se usa, o plata inmovilizada que se puede recuperar.
- **Tono profesional.** Sin "gratis", sin "con lupa", sin giros de más. Sirven "financiamiento sin costo" y "segunda opinión técnica".
- **Datos del estudio aprobados**: "Más de 30 años", "Equipo de más de 25 profesionales", "Un socio en cada cuenta", "Para empresas y PyMEs".
- ❌ No nombrar otros estudios ni software.
- ❌ No copiar el mensaje precargado de WhatsApp de las campañas ("Hola, les escribo por mi empresa…"): es el que le dice a Juan de qué anuncio viene cada consulta.

## 3. Ejes de contenido (qué publicar)

Por orden de peso comercial:

| Eje | Temas que funcionan | Página |
|---|---|---|
| **Ingresos Brutos** (campaña Meta al aire) | Retenciones y percepciones que superan el impuesto, saldo a favor que inmoviliza capital de trabajo, jurisdicciones donde corresponde o no estar inscripto, Convenio Multilateral y coeficientes, exclusiones y certificados de no retención | `/servicios/analisis-ingresos-brutos` |
| **IVA, MiPyME y planificación** (campaña Meta al aire) | IVA diferido, cheque a cuenta de Ganancias, saldos de IVA, anticipos calculados sobre un año que ya no existe, planificación fiscal antes de decidir | `/servicios/certificado-mipyme` · `/servicios/impuestos-nacionales` |
| **Sociedades** (Google) | Obligaciones ante IGJ y ARCA (actas, balances, autoridades, beneficiario final, domicilio electrónico), constitución y tipo de sociedad (SA, SRL, SAS), reformas, aumentos de capital | `/servicios/societario-igj` |
| **Auditoría y due diligence** (Google) | Cuando el banco, un socio nuevo, un comprador o un inversor piden los números; certificación vs. auditoría; due diligence antes de comprar o invertir | `/servicios/auditoria-de-empresas` · `/servicios/fusiones-adquisiciones-reorganizaciones` |
| **Empleadores** (buen orgánico) | Cambios que afectan la liquidación de sueldos, convenios, cargas sociales, inspecciones laborales, altas | `/servicios/liquidacion-de-sueldos` |
| **Contabilidad y back office** | Balances para decidir, outsourcing administrativo-contable (cuentas a pagar y cobrar, conciliaciones, tesorería, reporting) | `/servicios/contabilidad-pymes` · `/servicios/outsourcing-administrativo` |
| Nichos (de vez en cuando, si hay noticia) | Comercio exterior, impuestos internacionales, precios de transferencia, representación de empresas extranjeras, prevención de lavado, tasas municipales, certificaciones | su página, ver la sección 5 |

**Ganchos aprobados** del banco de publicidad. Sirven de ángulo; no copiarlos igual todas las semanas.

- "Si tu empresa arrastra saldo a favor hace más de un año, eso no es un trámite pendiente: es capital de trabajo financiando al fisco."
- "El impuesto al cheque no es un costo perdido: si tu empresa es MiPyME, una parte puede volver como pago a cuenta de Ganancias."
- "¿Tu empresa vende a varias provincias? Puede estar pagando Ingresos Brutos donde no corresponde." Es el diferencial técnico del estudio.
- "Si este año tu empresa factura menos que el anterior, puede estar pagando anticipos calculados sobre un año que ya no existe." Es estacional y es el candidato del próximo ciclo de pauta.
- "Hay beneficios fiscales vigentes hace años que tu PyME puede no estar usando."
- **Descartados**: el susto de la intimación y "nos ocupamos de tus impuestos".

**Calendario de la pauta:**

- Meta, Ingresos Brutos y Certificado MiPyME: **del 24/09 al 24/10/2026**.
- Google, Impuestos, Sociedades y Auditoría: prueba hasta ~22/10.
- Mientras duren, los ejes de Ingresos Brutos y de IVA/MiPyME van primero cuando la semana lo permite (ver la rotación del paso 3.1 de la skill).

## 4. Cómo se traduce en cada día

- **Miércoles (noticia).**
  - Elegir la novedad que le cambia algo a una **empresa**. Entre dos de peso parecido, la que toque un eje de la tabla.
  - El texto es también la nota de la web:
    - la **primera oración es el titular** (clara, con el tema, sin emoji, hasta ~90 caracteres);
    - el cuerpo cuenta qué cambió, a quién le toca y qué conviene hacer;
    - cierra con la página del servicio.
- **Jueves.**
  - Carrusel: la segunda noticia o la del miércoles en profundidad.
  - Encuesta: una pregunta de gestión de la empresa sobre algo que el estudio hace.
  - CTA: invita a escribir por WhatsApp, para empresas.
  - Cita: una frase del estudio sobre un problema de empresa.
- **Viernes (gestión PyME).** El eje lo fija la rotación. Mejor una situación concreta de la empresa que una moraleja. Sin números ni plazos.
- **Sábado (servicio).** ❌ No describir el servicio con su lista de tareas: fueron los peores posts de septiembre. ✅ **Un problema concreto + el servicio que lo resuelve**, en una línea, como un anuncio. Ejemplo: "Tu empresa puede estar pagando Ingresos Brutos donde no corresponde → Análisis integral de Ingresos Brutos". Mientras dure la pauta, preferir los dos servicios de campaña.

## 5. Servicios del estudio y su página

Fuente: la web (`src/data/services.ts`). Son los **únicos** servicios que se nombran.

| Categoría | Servicio | Página (`mdo-consultores.com.ar/servicios/…`) |
|---|---|---|
| Campaña | Análisis Integral de Ingresos Brutos | `analisis-ingresos-brutos` |
| Campaña | Certificado MiPyME | `certificado-mipyme` |
| Impuestos | Impuestos Nacionales: IVA, Ganancias, Ingresos Brutos / Convenio Multilateral, planificación fiscal, planes de pago y moratorias, ajuste por inflación impositivo, exclusión de retenciones y percepciones, inspecciones ARCA/ARBA/AGIP, Tribunal Fiscal | `impuestos-nacionales` |
| Impuestos | Impuestos y Tasas Municipales (Seguridad e Higiene, habilitaciones) | `impuestos-tasas-municipales` |
| Impuestos | Impuestos Internacionales (doble imposición, rentas del exterior, pagos al exterior) | `impuestos-internacionales` |
| Impuestos | Precios de Transferencia (para grupos económicos) | `precios-de-transferencia` |
| Impuestos | Comercio Exterior (importadores y exportadores, reintegros de IVA) | `comercio-exterior` |
| Auditoría | Auditoría de Empresas (estados contables, NIIF, auditoría interna y operativa, control interno, revisiones limitadas, certificaciones, pericias, valuación) | `auditoria-de-empresas` |
| Auditoría | Pymes (auditoría, outsourcing contable y fiscal, reporting, start-ups) | `pymes` |
| Consultoría | Asesoramiento Estratégico y Financiero (presupuestos, control de gestión) | `asesoramiento-estrategico-financiero` |
| Consultoría | Fusiones, Adquisiciones y Reorganizaciones (y due diligence) | `fusiones-adquisiciones-reorganizaciones` |
| Consultoría | Servicios Societarios (SA, SRL, SAS, IGJ, actas, reformas, aumentos de capital, contratos) | `societario-igj` |
| Consultoría | Representación de Empresas Extranjeras | `representacion-empresas-extranjeras` |
| Consultoría | Prevención de Lavado de Activos (sujetos obligados) | `prevencion-lavado-activos` |
| Outsourcing | Contabilidad y Gestión para Pymes (balances, libros, ajuste por inflación contable) | `contabilidad-pymes` |
| Outsourcing | Outsourcing Administrativo y Contable (back office, cuentas a pagar y cobrar, conciliaciones, tesorería, reporting) | `outsourcing-administrativo` |
| Outsourcing | Liquidación de Sueldos y Asesoramiento Laboral | `liquidacion-de-sueldos` |
| Outsourcing | Certificaciones de Ingresos y Origen de Fondos | `certificaciones-ingresos-fondos` |

Si el tema no tiene página propia: `mdo-consultores.com.ar/servicios` o `/contacto`. En LinkedIn el link se puede tocar; en Instagram no, pero igual sirve y en la nota de la web queda como link.

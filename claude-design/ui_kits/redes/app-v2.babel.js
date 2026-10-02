// app.jsx — Estudio de placas: el catalogo de plantillas de redes de MDO,
// con el mismo contrato que render.html del repo de automatizaciones
// (una plantilla por id, contenido de ejemplo o placeholders, zona segura).
// Los componentes del design system se resuelven en render (no al evaluar el
// módulo): así este archivo es inofensivo si se evalúa antes que el bundle.
const DS = (n) => function DSComp(props) {
  const C = (window.MDOConsultoresDesignSystem_cc21de || {})[n];
  return C ? React.createElement(C, props) : null;
};
const Plate = DS('Plate'), PlateHeader = DS('PlateHeader'), Chip = DS('Chip'),
  HandleFooter = DS('HandleFooter'), SourceFooter = DS('SourceFooter'),
  BigNumber = DS('BigNumber'), Eyebrow = DS('Eyebrow'), Display = DS('Display'),
  Lede = DS('Lede'), Rule = DS('Rule'), IsoWatermark = DS('IsoWatermark'),
  Icon = DS('Icon'), Lockup = DS('Lockup');

// Controles del estudio. No son parte del design system: son el chrome de esta
// herramienta, con los valores del sistema aplicados a mano.
function Btn({ on, children, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      font: 'inherit', fontFamily: 'var(--font-body)', fontSize: 13.5,
      fontWeight: on ? 700 : 400, borderRadius: 'var(--r-lg)', padding: '8px 16px', cursor: 'pointer',
      color: on ? 'var(--paper)' : 'var(--ink-70)', background: on ? 'var(--navy)' : 'var(--surface-card)',
      border: on ? 'none' : '1px solid var(--rule)', whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}
function Nota({ title, tone = 'warn', children }) {
  const c = tone === 'bad' ? ['var(--state-bad)', 'var(--state-bad-bg)'] : ['var(--state-warn)', 'var(--state-warn-bg)'];
  return (
    <div style={{ borderLeft: '3px solid ' + c[0], background: c[1], padding: '1.05rem 1.25rem', borderRadius: '0 var(--r-sm) var(--r-sm) 0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.25 }}>{title}</h3>
      <div style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--text-body)' }}>{children}</div>
    </div>
  );
}
function Tag({ children }) {
  return <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 'var(--r-md)', background: 'var(--chip-bg)', color: 'var(--navy)', whiteSpace: 'nowrap' }}>{children}</span>;
}
const { useState, useMemo } = React;

const PH = (s) => '[' + s + ']';

const CATALOGO = [
  {
    id: 'mn-01', label: 'Apertura de marca', grupo: 'Manual 4:5', comp: 'MnApertura',
    out: '1080×1350', base: '540×675', slots: ['— sin texto —'],
    nota: 'Oficial del Manual de Marca 2026. Original en assets/referencia-feed/logo-apertura.jpg',
    ejemplo: {}, ph: {}, modo: 'feed',
  },
  {
    id: 'mn-02', label: 'Noticia normativa', grupo: 'Manual 4:5', comp: 'MnNoticia',
    out: '1080×1350', base: '540×675', slots: ['FECHA', 'TITULAR_1', 'TITULAR_2', 'CUERPO', 'CIERRE'],
    nota: 'Oficial del manual, y la más usada. El titular va en DOS TONOS: la primera parte en blanco y negrita, la segunda en gris y peso normal — es una sola frase partida. Original: referencia-feed/noticias.jpg',
    ejemplo: { fecha: '28.07.2026', titular_1: 'ARCA pide informar', titular_2: 'socios, directores y beneficiarios', cuerpo: 'Las sociedades deberán informar ante ARCA a los titulares de participaciones, directores y beneficiarios finales, conforme al régimen vigente y con vencimientos escalonados durante el mes.', cierre: 'Confirmá que tu sociedad se encuentre al día con esta obligación.' },
    ph: { fecha: PH('FECHA'), titular_1: PH('TITULAR_1'), titular_2: PH('TITULAR_2'), cuerpo: PH('CUERPO'), cierre: PH('CIERRE') },
    modo: 'feed',
  },
  {
    id: 'mn-03', label: 'Pregunta al lector', grupo: 'Manual 4:5', comp: 'MnExplica',
    out: '1080×1350', base: '540×675', slots: ['VOLANTA', 'TITULAR_1', 'TITULAR_2', 'TITULAR_3', 'BAJADA_1', 'BAJADA_2'],
    nota: 'Oficial del manual. Tres niveles de titular alineados a la DERECHA: negrita en mayúsculas, negrita, e itálica. Original: referencia-feed/mdo-explica.jpg',
    ejemplo: { volanta: 'Gestión PyME', titular_1: 'Tu empresa está', titular_2: 'tomando decisiones', titular_3: 'con información actualizada?', bajada_1: 'La información contable no solo registra lo que pasó.', bajada_2: 'También ayuda a decidir lo que sigue.' },
    ph: { volanta: PH('VOLANTA'), titular_1: PH('TITULAR_1'), titular_2: PH('TITULAR_2'), titular_3: PH('TITULAR_3'), bajada_1: PH('BAJADA_1'), bajada_2: PH('BAJADA_2') },
    modo: 'feed',
  },
  {
    id: 'mn-04', label: 'Servicios', grupo: 'Manual 4:5', comp: 'MnServicio',
    out: '1080×1350', base: '540×675', slots: ['VOLANTA', 'TITULO', 'CUERPO'],
    nota: 'Oficial del manual. Única placa sobre el degradé claro. Original: referencia-feed/servicios-mdo.jpg',
    ejemplo: { volanta: 'Servicios', titulo: 'Liquidación de sueldos', cuerpo: 'Nos encargamos de tus sueldos y cargas sociales para que vos te enfoques en tu negocio.' },
    ph: { volanta: PH('VOLANTA'), titulo: PH('TITULO'), cuerpo: PH('CUERPO') },
    modo: 'feed',
  },
  {
    id: 'mn-05', label: 'Frase de marca', grupo: 'Manual 4:5', comp: 'MnFrase',
    out: '1080×1350', base: '540×675', slots: ['CLAIM_1', 'CLAIM_2'],
    nota: 'Oficial del manual. Es la única placa donde el claim va en gris cálido y no en navy. Original: referencia-feed/frases-mdo.jpg',
    ejemplo: { claim_1: 'Better decisions.', claim_2: 'Stronger businesses.' },
    ph: { claim_1: PH('CLAIM_1'), claim_2: PH('CLAIM_2') },
    modo: 'feed',
  },
  {
    id: 'mn-06', label: 'Frase sobre foto', grupo: 'Manual 4:5', comp: 'MnFraseFoto',
    out: '1080×1350', base: '540×675', slots: ['CLAIM_1', 'CLAIM_2', 'FOTO'],
    nota: 'Oficial del manual. Foto a sangre, sin logo. Original: referencia-feed/frases.jpg',
    ejemplo: { claim_1: 'Decisiones claras.', claim_2: 'Negocios más sólidos.', foto: 'Edificios desde abajo' },
    ph: { claim_1: PH('CLAIM_1'), claim_2: PH('CLAIM_2'), foto: PH('FOTO') },
    modo: 'feed',
  },
  {
    id: 'mn-07', label: 'Claim sobre foto', grupo: 'Manual 4:5', comp: 'MnClaimFoto',
    out: '1080×1350', base: '540×675', slots: ['CLAIM_1', 'CLAIM_2', 'CLAIM_3', 'DESTACADO', 'FOTO'],
    nota: 'Oficial del manual. Claim de tres líneas a la derecha, con la del medio en itálica y una palabra final en mayúsculas. Original: referencia-feed/marca-mdo.jpg',
    ejemplo: { claim_1: 'Transformamos', claim_2: 'la complejidad tributaria y contable', claim_3: 'en decisiones', destacado: 'estratégicas.', foto: 'Edificios en contrapicado' },
    ph: { claim_1: PH('CLAIM_1'), claim_2: PH('CLAIM_2'), claim_3: PH('CLAIM_3'), destacado: PH('DESTACADO'), foto: PH('FOTO') },
    modo: 'feed',
  },
  {
    id: 'mn-08', label: 'Institucional', grupo: 'Manual 4:5', comp: 'MnInstitucional',
    out: '1080×1350', base: '540×675', slots: ['RUBRO', 'FOTO'],
    nota: 'Oficial del manual. Usa el lockup secundario (los tres apellidos). Original: referencia-feed/feed-11.jpg',
    ejemplo: { rubro: 'Estudio contable', foto: 'Manos en el teclado' },
    ph: { rubro: PH('RUBRO'), foto: PH('FOTO') },
    modo: 'feed',
  },
  {
    id: 'sq-01', label: 'Vencimiento impositivo', grupo: 'Square 1:1', comp: 'SqVencimiento',
    out: '1080×1080', base: '540×540',
    slots: ['COPETE', 'DIA', 'MES', 'ANIO', 'IMPUESTO', 'DESCRIPCION_VENC', 'HORARIO', 'CHIP_MES', 'HANDLE'],
    ejemplo: { copete: 'Calendario ARCA · Vencimiento', dia: '21', mes: 'JUN', anio: '2026', impuesto: 'IVA', descripcion: 'Posición mensual · Período 05/2026', horario: 'Hasta las 23:59 h', chip_mes: 'Calendario · 06/26', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), dia: PH('DIA'), mes: PH('MES'), anio: PH('ANIO'), impuesto: PH('IMPUESTO'), descripcion: PH('DESCRIPCION_VENC'), horario: PH('HORARIO'), chip_mes: PH('CHIP_MES'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-02', label: 'Cita / reflexión', grupo: 'Square 1:1', comp: 'SqCita',
    out: '1080×1080', base: '540×540', slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
    ejemplo: { copete: 'Pensamiento', cita: 'La planificación impositiva no es un costo: es la primera decisión estratégica del año.', autor: 'Estudio MDO', rol_autor: 'Consultores en gestión', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), cita: PH('CITA'), autor: PH('AUTOR'), rol_autor: PH('ROL_AUTOR'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-03', label: 'Número clave', grupo: 'Square 1:1', comp: 'SqNumero',
    out: '1080×1080', base: '540×540', slots: ['COPETE', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'PIE', 'HANDLE'],
    ejemplo: { copete: 'En cifras · MDO Consultores', numero: '+50', unidad: 'años', descripcion: 'acompañando empresas argentinas en la gestión impositiva, contable y previsional.', pie: 'Desde 1972 · Buenos Aires', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), numero: PH('NUMERO'), unidad: PH('UNIDAD'), descripcion: PH('DESCRIPCION'), pie: PH('PIE'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-13d', label: 'Noticia + cierre', grupo: 'Portrait 4:5', comp: 'PoNoticia',
    out: '1080×1350', base: '540×675', slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'CIERRE', 'FUENTE', 'FECHA', 'HANDLE'],
    ejemplo: { categoria: 'Laboral · ARCA', titular: 'ARCA abre la Moratoria Laboral para empleadores', bajada: 'Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse.', cierre: 'Si tenés personal sin registrar, ésta es la ventana.', fuente: 'Errepar · ARCA · Resolución', fecha: '11 jun 2026', handle: '@mdoconsultores' },
    ph: { categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), cierre: PH('CIERRE'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-13e', label: 'Noticia + cierre (navy)', grupo: 'Portrait 4:5', comp: 'PoNoticia',
    out: '1080×1350', base: '540×675', slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'CIERRE', 'FUENTE', 'FECHA', 'HANDLE'],
    nota: 'Misma composición que po-13d en navy. Existe para que dos noticias de la misma semana se distingan de un vistazo en la grilla.',
    ejemplo: { tone: 'navy', categoria: 'Impuestos · ARCA', titular: 'Nuevo régimen de facturación para responsables inscriptos', bajada: 'Cambia el plazo de emisión y el detalle obligatorio del comprobante.', cierre: 'Revisamos tu circuito de facturación antes de que aplique.', fuente: 'ARCA · Resolución General', fecha: '19 ago 2026', handle: '@mdoconsultores' },
    ph: { tone: 'navy', categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), cierre: PH('CIERRE'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-24', label: 'Checklist', grupo: 'Portrait 4:5', comp: 'PoChecklist',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'ITEM_1', 'ITEM_2', 'ITEM_3', 'CTA', 'HANDLE'],
    ejemplo: { copete: 'Gestión PyME', titulo: 'Tres cosas que conviene tener al día', item_1: 'Los comprobantes del mes, cargados y conciliados', item_2: 'Los libros societarios con folios disponibles', item_3: 'Las altas y bajas de personal, informadas', cta: 'Lo ordenamos con vos', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), item_1: PH('ITEM_1'), item_2: PH('ITEM_2'), item_3: PH('ITEM_3'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-26', label: 'Tres iconos', grupo: 'Portrait 4:5', comp: 'PoTresIconos',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'LABEL_1', 'LABEL_2', 'LABEL_3', 'CTA', 'HANDLE'],
    ejemplo: { copete: 'Contabilidad', titulo: 'Llevar la contabilidad al día te da:', label_1: 'Números al día', label_2: 'Mejores decisiones', label_3: 'Tranquilidad con ARCA', cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), label_1: PH('LABEL_1'), label_2: PH('LABEL_2'), label_3: PH('LABEL_3'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-21', label: 'Pregunta hero', grupo: 'Portrait 4:5', comp: 'PoPreguntaHero',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'PREGUNTA', 'RESPUESTA', 'CTA', 'HANDLE'],
    ejemplo: { copete: 'Gestión PyME', pregunta: '¿Sabés cuánto te cuesta cerrar el mes tarde?', respuesta: 'Cerrar a tiempo no es prolijidad: es la única forma de decidir con datos que todavía sirven.', cta: 'Conversemos', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), pregunta: PH('PREGUNTA'), respuesta: PH('RESPUESTA'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'st-07', label: 'Vencimientos de la semana', grupo: 'Story 9:16', comp: 'StVencimientos',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'SEMANA', 'FECHA_1..4', 'IMPUESTO_1..4', 'PERIODO_1..4', 'HORA_1..4', 'CTA', 'HANDLE'],
    ejemplo: { copete: 'Vencimientos de la semana', semana: 'Semana 34 · 2026', cta: 'Te lo presentamos nosotros', handle: '@mdoconsultores', filas: [
      { fecha: '18', impuesto: 'IVA', periodo: 'Posición mensual 07/2026', hora: '23:59' },
      { fecha: '19', impuesto: 'SUSS · F.931', periodo: 'Cargas sociales 07/2026', hora: '23:59' },
      { fecha: '21', impuesto: 'Ingresos Brutos', periodo: 'Convenio Multilateral', hora: '23:59' },
      { fecha: '22', impuesto: 'Ganancias', periodo: 'Anticipo sociedades', hora: '23:59' },
    ] },
    ph: { copete: PH('COPETE'), semana: PH('SEMANA'), cta: PH('CTA'), handle: PH('HANDLE'), filas: [1, 2, 3, 4].map((n) => ({ fecha: PH('FECHA_' + n), impuesto: PH('IMPUESTO_' + n), periodo: PH('PERIODO_' + n), hora: PH('HORA_' + n) })) },
    modo: 'story',
  },
  {
    id: 'st-10', label: 'Encuesta A/B', grupo: 'Story 9:16', comp: 'StEncuesta',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'PREGUNTA', 'OPCION_A', 'OPCION_B', 'PIE', 'HANDLE'],
    ejemplo: { copete: 'Encuesta', pregunta: '¿Cómo llevás hoy la facturación?', opcion_a: 'En una planilla propia', opcion_b: 'Directo en el portal de ARCA', pie: 'Respondé en la encuesta y te contamos qué conviene.', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), pregunta: PH('PREGUNTA'), opcion_a: PH('OPCION_A'), opcion_b: PH('OPCION_B'), pie: PH('PIE'), handle: PH('HANDLE') },
    modo: 'story',
  },
  {
    id: 'li-01', label: 'Noticia normativa', grupo: 'LinkedIn 1.91:1', comp: 'LiNoticia',
    out: '1200×628', base: '600×314', slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
    ejemplo: { categoria: 'Laboral · ARCA', titular: 'ARCA abre la Moratoria Laboral para empleadores', bajada: 'Permite regularizar personal no registrado y deudas laborales con condiciones que no suelen repetirse.', fuente: 'Errepar · ARCA · Resolución', fecha: '11 jun 2026', handle: '@mdoconsultores' },
    ph: { categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'li-02', label: 'Claim institucional', grupo: 'LinkedIn 1.91:1', comp: 'LiClaim',
    out: '1200×628', base: '600×314', slots: ['COPETE', 'CLAIM', 'SERVICIO_1', 'SERVICIO_2', 'SERVICIO_3', 'CTA', 'HANDLE'],
    ejemplo: { copete: 'Martinez · De Orta · Gutierrez Taboada', claim: 'Más de 50 años ordenando los números de empresas argentinas.', servicio_1: 'Impuestos', servicio_2: 'Contabilidad', servicio_3: 'Sueldos', cta: 'Conversemos sobre tu empresa', handle: 'mdo-consultores.com.ar' },
    ph: { copete: PH('COPETE'), claim: PH('CLAIM'), servicio_1: PH('SERVICIO_1'), servicio_2: PH('SERVICIO_2'), servicio_3: PH('SERVICIO_3'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'li-03', label: 'Dato clave', grupo: 'LinkedIn 1.91:1', comp: 'LiDato',
    out: '1200×628', base: '600×314', slots: ['CATEGORIA', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'FUENTE', 'HANDLE'],
    ejemplo: { categoria: 'En cifras', numero: '128', unidad: 'libros', descripcion: 'societarios y contables bajo control del estudio, con folios y custodia relevados uno por uno.', fuente: 'Panel de libros MDO', handle: '@mdoconsultores' },
    ph: { categoria: PH('CATEGORIA'), numero: PH('NUMERO'), unidad: PH('UNIDAD'), descripcion: PH('DESCRIPCION'), fuente: PH('FUENTE'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-12', label: 'Noticia (newsletter)', grupo: 'Square 1:1', comp: 'SqNoticia',
    out: '1080×1080', base: '540×540', slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
    nota: 'La que alimenta la automatización del newsletter de Gmail. Margen mínimo 72 — el más alto del catálogo.',
    ejemplo: { categoria: 'Impuestos · ARCA', titular: 'ARCA extiende el plazo para presentar la DDJJ de Ganancias', bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.', fuente: 'ARCA · Comunicado oficial', fecha: '19 jun 2026', handle: '@mdoconsultores' },
    ph: { categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-04', label: 'Guía rápida / Servicio', grupo: 'Portrait 4:5', comp: 'PoServicio',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'BAJADA', 'BULLET_1..4', 'CTA', 'HANDLE'],
    nota: 'Margen mínimo 68. Los bullets van numerados y centrados en su bloque: antes quedaban arriba con un vacío abajo.',
    ejemplo: { copete: 'Servicio · MDO', titulo: 'Auditoría externa', bajada: 'Estados contables auditados con criterio profesional y normativa vigente.', bullet_1: 'Auditoría de estados contables anuales', bullet_2: 'Revisión limitada de información intermedia', bullet_3: 'Informes especiales sobre patrimonio y resultados', bullet_4: 'Atención de requerimientos ARCA / IGJ / CNV', cta: 'Consultanos', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), bajada: PH('BAJADA'), bullet_1: PH('BULLET_1'), bullet_2: PH('BULLET_2'), bullet_3: PH('BULLET_3'), bullet_4: PH('BULLET_4'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-05', label: 'Anuncio institucional', grupo: 'Portrait 4:5', comp: 'PoAnuncio',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'SUBTITULO', 'TEMA', 'BLOQUE_1..3', 'FECHA_HORA', 'HANDLE'],
    nota: 'Para webinars y anuncios con datos. La grilla de rótulo/valor es de dos columnas fijas (104px).',
    ejemplo: { copete: 'Anuncio', titulo: 'Reforma fiscal', subtitulo: 'Webinar gratuito', tema: 'Análisis ejecutivo de los cambios 2026', bloque_1: 'Impuestos', bloque_2: 'Sociedades', bloque_3: 'Sueldos', fecha_hora: 'Jueves 19 · 19:00 h', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), subtitulo: PH('SUBTITULO'), tema: PH('TEMA'), bloque_1: PH('BLOQUE_1'), bloque_2: PH('BLOQUE_2'), bloque_3: PH('BLOQUE_3'), fecha_hora: PH('FECHA_HORA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-06', label: 'Voz experta / Equipo', grupo: 'Portrait 4:5', comp: 'PoEquipo',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'NOMBRE', 'ROL', 'BIO', 'TAG_1..4', 'FOTO_CAPTION', 'HANDLE'],
    nota: 'La única con foto en el bloque superior (320px de alto). La bio se estira y los tags quedan pegados al pie.',
    ejemplo: { copete: 'Voz experta · MDO', nombre: 'Lucía Martínez', rol: 'Socia · Impuestos', bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual.', tag_1: 'Ganancias', tag_2: 'IVA', tag_3: 'Bienes personales', tag_4: 'Fiscalizaciones ARCA', foto_caption: 'Retrato · 4:5', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), nombre: PH('NOMBRE'), rol: PH('ROL'), bio: PH('BIO'), tag_1: PH('TAG_1'), tag_2: PH('TAG_2'), tag_3: PH('TAG_3'), tag_4: PH('TAG_4'), foto_caption: PH('FOTO_CAPTION'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-16', label: 'Spotlight de servicio', grupo: 'Portrait 4:5', comp: 'PoSpotlight',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'BAJADA', 'HANDLE'],
    nota: 'Margen mínimo 64. Es la placa de marca: navy, título grande y nada más.',
    ejemplo: { copete: 'Servicios', titulo: 'Asesoramiento Impositivo', bajada: 'Planificamos la carga fiscal de tu PyME para que pagues lo justo, sin sorpresas.', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), bajada: PH('BAJADA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'st-08', label: 'Cita vertical', grupo: 'Story 9:16', comp: 'StCita',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
    nota: 'La comilla de apertura cuelga fuera del margen a propósito: es alineación óptica.',
    ejemplo: { copete: 'Pensamiento', cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.', autor: 'Estudio MDO', rol_autor: 'Consultores en gestión', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), cita: PH('CITA'), autor: PH('AUTOR'), rol_autor: PH('ROL_AUTOR'), handle: PH('HANDLE') },
    modo: 'story',
  },
  {
    id: 'st-09', label: 'CTA / Consultanos', grupo: 'Story 9:16', comp: 'StCTA',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'TITULAR_1..3', 'BAJADA', 'CANAL_1..3_LABEL', 'CANAL_1..3_VALOR', 'HANDLE'],
    nota: 'Titular de tres líneas: el cuerpo lo manda la línea más larga, y la del medio va en itálica un 28% más grande.',
    ejemplo: { copete: 'Estás pensando en armar tu empresa', titular_1: 'Hablemos', titular_2: 'antes', titular_3: 'de firmar.', bajada: 'Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo.', canal_1_label: 'Web', canal_1_valor: 'mdo-consultores.com.ar', canal_2_label: 'WhatsApp', canal_2_valor: '+54 9 11 3566 7985', canal_3_label: 'Email', canal_3_valor: 'info@mdo-consultores.com.ar', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titular_1: PH('TITULAR_1'), titular_2: PH('TITULAR_2'), titular_3: PH('TITULAR_3'), bajada: PH('BAJADA'), canal_1_label: PH('CANAL_1_LABEL'), canal_1_valor: PH('CANAL_1_VALOR'), canal_2_label: PH('CANAL_2_LABEL'), canal_2_valor: PH('CANAL_2_VALOR'), canal_3_label: PH('CANAL_3_LABEL'), canal_3_valor: PH('CANAL_3_VALOR'), handle: PH('HANDLE') },
    modo: 'story',
  },
  {
    id: 'po-37', label: 'Vencimientos (feed)', grupo: 'Portrait 4:5', comp: 'PoVencimientosFeed',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'SEMANA', 'DIA_1..4', 'MES_1..4', 'IMPUESTO_1..4', 'PERIODO_1..4', 'CTA', 'HANDLE'],
    nota: 'La versión feed de st-07: la story se va en 24 h, ésta queda como referencia. Cada fila lleva el día grande, el mes en versalitas y un filete vertical.',
    ejemplo: { copete: 'Calendario · 07/26', semana: 'Semana del 20 al 24 de julio', cta: 'Guardá el post para tenerlo a mano', handle: '@mdoconsultores', filas: [
      { dia: '20', mes: 'jul', impuesto: 'SiCoRe', periodo: 'Retenciones · 06/2026' },
      { dia: '21', mes: 'jul', impuesto: 'IVA', periodo: 'Posición mensual · 06/2026' },
      { dia: '22', mes: 'jul', impuesto: 'Ingresos Brutos', periodo: 'Convenio Multilateral · 06/2026' },
      { dia: '24', mes: 'jul', impuesto: 'Cargas sociales', periodo: 'F.931 · 06/2026' },
    ] },
    ph: { copete: PH('COPETE'), semana: PH('SEMANA'), cta: PH('CTA'), handle: PH('HANDLE'), filas: [1,2,3,4].map((n) => ({ dia: PH('DIA_' + n), mes: PH('MES_' + n), impuesto: PH('IMPUESTO_' + n), periodo: PH('PERIODO_' + n) })) },
    modo: 'feed',
  },
  {
    id: 'po-31', label: 'Explicador en 3 pasos', grupo: 'Portrait 4:5', comp: 'PoExplicador',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'PASO_1..3_TIT', 'PASO_1..3_TXT', 'CTA', 'HANDLE'],
    nota: 'A diferencia de po-28 (una línea por paso), ésta explica de verdad: cada paso lleva título y cuerpo. El número va en itálica.',
    ejemplo: { copete: 'Explicador', titulo: '¿Qué es una conciliación bancaria?', cta: 'Conciliamos tus cuentas todos los meses', handle: '@mdoconsultores', pasos: [
      { titulo: 'Se comparan dos registros', texto: 'Por un lado tus movimientos contables, por el otro el extracto del banco.' },
      { titulo: 'Se detectan las diferencias', texto: 'Cheques no cobrados, depósitos en tránsito, gastos que el banco debitó y no registraste.' },
      { titulo: 'Queda un saldo confiable', texto: 'Recién ahí sabés cuánta plata tenés de verdad disponible para operar.' },
    ] },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), cta: PH('CTA'), handle: PH('HANDLE'), pasos: [1,2,3].map((n) => ({ titulo: PH('PASO_' + n + '_TIT'), texto: PH('PASO_' + n + '_TXT') })) },
    modo: 'feed',
  },
  {
    id: 'po-32', label: 'Comparativa A vs B', grupo: 'Portrait 4:5', comp: 'PoComparativa',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'A_LABEL', 'A_TITULO', 'A_1..3', 'B_LABEL', 'B_TITULO', 'B_1..3', 'VEREDICTO', 'HANDLE'],
    nota: 'Dos columnas de igual peso, la B en navy. El veredicto va abajo en itálica con asterisco: no dice cuál gana, dice de qué depende. Muy en tono MDO.',
    ejemplo: { copete: 'Comparativa', titulo: 'Monotributo o Responsable Inscripto', a_label: 'Opción A', a_titulo: 'Monotributo', a_items: ['Cuota fija mensual, simple de liquidar', 'No discrimina IVA en tus facturas', 'Tiene topes de facturación anual'], b_label: 'Opción B', b_titulo: 'Responsable Inscripto', b_items: ['Liquidás IVA y Ganancias por separado', 'Podés computar el IVA de tus compras', 'Sin tope: acompaña el crecimiento'], veredicto: 'No hay una mejor: hay una que le sirve a tu estructura de costos.', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), a_label: PH('A_LABEL'), a_titulo: PH('A_TITULO'), a_items: [PH('A_1'), PH('A_2'), PH('A_3')], b_label: PH('B_LABEL'), b_titulo: PH('B_TITULO'), b_items: [PH('B_1'), PH('B_2'), PH('B_3')], veredicto: PH('VEREDICTO'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-33', label: 'Elegí tu caso', grupo: 'Portrait 4:5', comp: 'PoElegiTuCaso',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'PREGUNTA', 'OPCION_1..3', 'CTA', 'HANDLE'],
    nota: 'Placa de engagement: tres opciones en pastillas y un CTA que pide comentar el número. La única que usa radio pill en las opciones.',
    ejemplo: { copete: 'Tu caso', pregunta: '¿Cuál de estas tres te está pasando hoy?', opciones: ['No sé si estoy pagando más impuestos de los que debería', 'Tengo la contabilidad atrasada y no puedo decidir', 'Crecí y mi estructura administrativa quedó chica'], cta: 'Comentá el número y te orientamos', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), pregunta: PH('PREGUNTA'), opciones: [PH('OPCION_1'), PH('OPCION_2'), PH('OPCION_3')], cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-34', label: 'Mito vs realidad', grupo: 'Portrait 4:5', comp: 'PoMitoRealidad',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'MITO', 'REALIDAD', 'CTA', 'HANDLE'],
    nota: 'Distinta de po-32: ahí se eligen dos opciones válidas, acá se corrige una creencia equivocada. El mito va apagado y tachado; la realidad en navy.',
    ejemplo: { copete: 'Mitos', titulo: 'Sobre facturar con Monotributo', mito: 'Si facturo poco, no hace falta que lleve ningún registro.', realidad: 'Todo monotributista debe respaldar sus operaciones: si te excedés del tope sin registro, la recategorización te encuentra sin papeles.', cta: 'Ordenamos tu situación', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), mito: PH('MITO'), realidad: PH('REALIDAD'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-35', label: 'Errores frecuentes', grupo: 'Portrait 4:5', comp: 'PoErrores',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'ERROR_1..3', 'FIX_1..3', 'CTA', 'HANDLE'],
    nota: 'Placa de autoridad: cada ficha lleva el error en negrita y la corrección debajo. No señala culpables, muestra la salida.',
    ejemplo: { copete: 'Gestión PyME', titulo: '3 errores que vemos todos los meses', cta: 'Te ayudamos a ordenarlo', handle: '@mdoconsultores', items: [
      { error: 'Mezclar la cuenta personal con la de la empresa', fix: 'Una cuenta para cada cosa: sin eso, ningún balance refleja la realidad.' },
      { error: 'Guardar los comprobantes sin ordenar', fix: 'Un criterio simple por mes alcanza para no perder crédito fiscal.' },
      { error: 'Mirar los números sólo cuando vence algo', fix: 'Un reporte mensual convierte la contabilidad en una herramienta de decisión.' },
    ] },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), cta: PH('CTA'), handle: PH('HANDLE'), items: [1,2,3].map((n) => ({ error: PH('ERROR_' + n), fix: PH('FIX_' + n) })) },
    modo: 'feed',
  },
  {
    id: 'po-36', label: 'Testimonio de cliente', grupo: 'Portrait 4:5', comp: 'PoTestimonio',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TESTIMONIO', 'CLIENTE_TIPO', 'CLIENTE_DETALLE', 'SERVICIO', 'HANDLE'],
    nota: 'Prueba social SIN nombre propio: sector y tamaño, nunca la razón social. Es criterio del estudio para no exponer al cliente, no una limitación de la plantilla.',
    ejemplo: { copete: 'Clientes', testimonio: 'Dejamos de enterarnos de los problemas cuando ya eran urgencias.', cliente_tipo: 'PyME industrial', cliente_detalle: 'Buenos Aires · 40 empleados · cliente desde 2019', servicio: 'Contabilidad + Impuestos', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), testimonio: PH('TESTIMONIO'), cliente_tipo: PH('CLIENTE_TIPO'), cliente_detalle: PH('CLIENTE_DETALLE'), servicio: PH('SERVICIO'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-27', label: 'Ícono grande central', grupo: 'Portrait 4:5', comp: 'PoIconoHero',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'BAJADA', 'CTA', 'HANDLE'],
    nota: 'Todo centrado, con un aro de 128px de borde (no relleno) alrededor del ícono.',
    ejemplo: { copete: 'Gestión PyME', titulo: 'Ordená hoy para crecer mañana', bajada: 'Una PyME con la contabilidad clara toma mejores decisiones y crece más tranquila.', cta: 'Empecemos', handle: '@mdoconsultores', icono: 'grafico' },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), bajada: PH('BAJADA'), cta: PH('CTA'), handle: PH('HANDLE'), icono: 'grafico' },
    modo: 'feed',
  },
  {
    id: 'po-28', label: 'Proceso en 3 pasos', grupo: 'Portrait 4:5', comp: 'PoProcesoIconos',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'PASO_1..3', 'CTA', 'HANDLE'],
    nota: 'Una línea por paso. La que explica de verdad es po-31. Cuadrado de 62px radio 14, con el número en un círculo que sobresale.',
    ejemplo: { copete: 'Cómo trabajamos', titulo: 'Tu contabilidad, en 3 pasos', cta: 'Consultanos', handle: '@mdoconsultores', pasos: ['Ordenamos y registramos tus operaciones', 'Conciliamos y armamos tus balances', 'Te damos reportes claros para decidir'] },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), cta: PH('CTA'), handle: PH('HANDLE'), pasos: [PH('PASO_1'), PH('PASO_2'), PH('PASO_3')] },
    modo: 'feed',
  },
  {
    id: 'po-29', label: 'Ícono lateral + frase', grupo: 'Portrait 4:5', comp: 'PoIconoFrase',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'FRASE', 'CTA', 'HANDLE'],
    nota: 'El ícono va suelto a 80px, sin aro ni caja, corrido 14px a la izquierda del margen: alineación óptica contra el texto.',
    ejemplo: { copete: 'Gestión PyME', frase: 'Dormí tranquilo: tus números, en orden y al día.', cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores', icono: 'escudo' },
    ph: { copete: PH('COPETE'), frase: PH('FRASE'), cta: PH('CTA'), handle: PH('HANDLE'), icono: 'escudo' },
    modo: 'feed',
  },
  {
    id: 'po-30', label: 'Grid 2×2 de íconos', grupo: 'Portrait 4:5', comp: 'PoGridIconos',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'LABEL_1..4', 'HANDLE'],
    nota: 'Cuatro fichas con filete y radio 10. El espacio se reparte, así las cuatro quedan de igual alto aunque el texto no lo sea.',
    ejemplo: { copete: 'Servicios', titulo: 'Todo lo que tu PyME necesita, en un solo equipo', handle: '@mdoconsultores', labels: ['Contabilidad', 'Impuestos', 'Sueldos', 'Auditoría'] },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), handle: PH('HANDLE'), labels: [PH('LABEL_1'), PH('LABEL_2'), PH('LABEL_3'), PH('LABEL_4')] },
    modo: 'feed',
  },
  {
    id: 'ca-cover', label: 'Calendario · tapa', grupo: 'Carrusel A · Calendario', comp: 'CalCover',
    out: '1080×1080', base: '420×420', slots: ['COPETE', 'MES', 'ANIO', 'BAJADA', 'SWIPE_CTA', 'CHROME_LABEL'],
    nota: 'Slide 1 de 3. El mes va en itálica grande; el año en versalitas debajo.',
    ejemplo: { copete: 'Calendario impositivo', mes: 'Junio', anio: '2026', bajada: 'Vencimientos de ARCA, IGJ y previsionales del mes en un solo lugar.', swipe: 'Deslizá →', chrome_label: 'Cover' },
    ph: { copete: PH('COPETE'), mes: PH('MES'), anio: PH('ANIO'), bajada: PH('BAJADA'), swipe: PH('SWIPE_CTA'), chrome_label: PH('CHROME_LABEL') },
    modo: 'feed',
  },
  {
    id: 'ca-q1', label: 'Calendario · 1ª quincena', grupo: 'Carrusel A · Calendario', comp: 'CalQ1',
    out: '1080×1080', base: '420×420', slots: ['COPETE', 'FECHA_1..5', 'IMPUESTO_1..5', 'PERIODO_1..5', 'CHROME_LABEL'],
    nota: 'Slide 2 de 3. Las filas se centran en el espacio disponible: con menos de 5 ítems no queda un vacío abajo.',
    ejemplo: { copete: 'Primera quincena', chrome_label: '07 al 14 · Junio 2026', items: [{ fecha: "07", impuesto: "Aportes autónomos", periodo: "Cat. I-V · 05/26" }, { fecha: "11", impuesto: "Ingresos Brutos", periodo: "CABA · Anticipo 05/26" }, { fecha: "12", impuesto: "Convenio Multilateral", periodo: "CM05 · 05/26" }, { fecha: "13", impuesto: "IVA", periodo: "Posición 05/2026" }, { fecha: "14", impuesto: "Sueldos · F.931", periodo: "Devengado 05/2026" }] },
    ph: { copete: PH('COPETE'), chrome_label: PH('CHROME_LABEL'), items: [1,2,3,4,5].map((n) => ({ fecha: PH('FECHA_' + n), impuesto: PH('IMPUESTO_' + n), periodo: PH('PERIODO_' + n) })) },
    modo: 'feed',
  },
  {
    id: 'ca-q2', label: 'Calendario · 2ª quincena', grupo: 'Carrusel A · Calendario', comp: 'CalQ2',
    out: '1080×1080', base: '420×420', slots: ['COPETE', 'FECHA_1..5', 'IMPUESTO_1..5', 'PERIODO_1..5', 'CTA', 'CHROME_LABEL'],
    nota: 'Slide 3 de 3: igual que ca-q1 pero en versión compacta, para hacerle lugar al CTA final.',
    ejemplo: { copete: 'Segunda quincena', cta: '¿Tu equipo tiene esto cubierto?', chrome_label: '17 al 26 · Junio 2026', items: [{ fecha: "17", impuesto: "Monotributo", periodo: "Cuota mensual" }, { fecha: "18", impuesto: "SiCoRe", periodo: "Retenciones 05/26" }, { fecha: "20", impuesto: "Ganancias · Personas", periodo: "Anticipo · Junio" }, { fecha: "22", impuesto: "Bienes Personales", periodo: "Anticipo · Junio" }, { fecha: "26", impuesto: "IVA · Grandes contr.", periodo: "Posición 05/2026" }] },
    ph: { copete: PH('COPETE'), cta: PH('CTA'), chrome_label: PH('CHROME_LABEL'), items: [1,2,3,4,5].map((n) => ({ fecha: PH('FECHA_' + n), impuesto: PH('IMPUESTO_' + n), periodo: PH('PERIODO_' + n) })) },
    modo: 'feed',
  },
  {
    id: 'cb-cover', label: 'Tips PyME · tapa', grupo: 'Carrusel B · Tips PyME', comp: 'TipCover',
    out: '1080×1350', base: '420×525', slots: ['COPETE', 'TITULO_SANS', 'TITULO_SERIF', 'BAJADA', 'SWIPE_CTA', 'CHROME_LABEL'],
    nota: 'Slide 1 de 4. El titular va partido: una parte en Open Sans negrita y la otra en itálica, más grande.',
    ejemplo: { copete: 'Gestión PyME · Monotributo', titulo_sans: 'Monotributo', titulo_serif: '2026', bajada: 'Cuatro cosas que tu contador quisiera que entiendas antes de fin de año.', swipe: 'Deslizá →', chrome_label: 'Cover · 06/2026' },
    ph: { copete: PH('COPETE'), titulo_sans: PH('TITULO_SANS'), titulo_serif: PH('TITULO_SERIF'), bajada: PH('BAJADA'), swipe: PH('SWIPE_CTA'), chrome_label: PH('CHROME_LABEL') },
    modo: 'feed',
  },
  {
    id: 'cb-tip1', label: 'Tips PyME · punto 1', grupo: 'Carrusel B · Tips PyME', comp: 'TipSlide2',
    out: '1080×1350', base: '420×525', slots: ['TITULAR', 'CUERPO', 'TAKEAWAY', 'CHROME_LABEL'],
    nota: 'Slide 2 de 4. Regla de contenido del repo: la placa NO dice «Tip», dice «Punto 01». Los slots siguen llamándose TIP_* para no romper la rutina.',
    ejemplo: { titular: 'La categoría no es para siempre.', cuerpo: 'ARCA revisa cada seis meses tu facturación, alquileres y consumos. Si te corrés de la escala, hay que recategorizar — sino llega la baja de oficio.', takeaway: 'Revisalo en enero y en julio.', chrome_label: 'Recategorización semestral' },
    ph: { titular: PH('TITULAR'), cuerpo: PH('CUERPO'), takeaway: PH('TAKEAWAY'), chrome_label: PH('CHROME_LABEL') },
    modo: 'feed',
  },
  {
    id: 'cb-tip2', label: 'Tips PyME · punto 2', grupo: 'Carrusel B · Tips PyME', comp: 'TipSlide3',
    out: '1080×1350', base: '420×525', slots: ['TITULAR', 'CUERPO', 'TAKEAWAY', 'CHROME_LABEL'],
    nota: 'Slide 3 de 4, el único en navy: alterna con los de papel para que el carrusel tenga ritmo.',
    ejemplo: { titular: 'Tu obra social también suma.', cuerpo: 'El componente de obra social del monotributo cubre el grupo familiar primario, pero por cada integrante adicional pagás un aporte extra. Revisalo antes de incluir nuevos beneficiarios.', takeaway: 'Pedí el detalle a tu contador.', chrome_label: 'Componente OS' },
    ph: { titular: PH('TITULAR'), cuerpo: PH('CUERPO'), takeaway: PH('TAKEAWAY'), chrome_label: PH('CHROME_LABEL') },
    modo: 'feed',
  },
  {
    id: 'cb-tip3', label: 'Tips PyME · punto 3', grupo: 'Carrusel B · Tips PyME', comp: 'TipSlide4',
    out: '1080×1350', base: '420×525', slots: ['TITULAR', 'CUERPO', 'TAKEAWAY', 'CHROME_LABEL'],
    nota: 'Slide 4 de 4. Cierra el carrusel: el takeaway es la acción concreta.',
    ejemplo: { titular: 'Facturación + medios de pago.', cuerpo: 'Los topes incluyen ingresos por todo concepto: ventas, alquileres, intereses. Y ARCA cruza tu CBU, billeteras y tarjetas. Lo que ves no es necesariamente lo que ellos ven.', takeaway: 'Conciliá todos tus canales.', chrome_label: 'Topes y cruces' },
    ph: { titular: PH('TITULAR'), cuerpo: PH('CUERPO'), takeaway: PH('TAKEAWAY'), chrome_label: PH('CHROME_LABEL') },
    modo: 'feed',
  },
  {
    id: 'sq-02b', label: 'Cita en navy', grupo: 'Square 1:1', comp: 'SqCitaNavy',
    out: '1080×1080', base: '540×540', slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
    nota: 'Variante de sq-02. Una variante no es una plantilla nueva: es la misma composición con otro fondo, para que dos posts seguidos de la misma familia no se vean iguales en la grilla.',
    ejemplo: { copete: 'Pensamiento', cita: 'La planificación impositiva no es un costo: es la primera decisión estratégica del año.', autor: 'Estudio MDO', rol_autor: 'Consultores en gestión', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), cita: PH('CITA'), autor: PH('AUTOR'), rol_autor: PH('ROL_AUTOR'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-03b', label: 'Número en itálica', grupo: 'Square 1:1', comp: 'SqNumeroSerif',
    out: '1080×1080', base: '540×540', slots: ['COPETE', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'PIE', 'HANDLE'],
    nota: 'Variante de sq-03: el número pasa a oblicua y el fondo a gris claro. Con 2 dígitos llega a 220px — el cuerpo más grande de todo el catálogo.',
    ejemplo: { copete: 'En cifras · MDO Consultores', numero: '+50', unidad: 'años', descripcion: 'acompañando empresas argentinas en la gestión impositiva, contable y previsional.', pie: 'Desde 1972 · Buenos Aires', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), numero: PH('NUMERO'), unidad: PH('UNIDAD'), descripcion: PH('DESCRIPCION'), pie: PH('PIE'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-12b', label: 'Noticia · último momento', grupo: 'Square 1:1', comp: 'SqNoticiaBreaking',
    out: '1080×1080', base: '540×540', slots: ['BADGE', 'CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
    nota: 'Variante de sq-12 y la única placa con tira superior a sangre: badge a la izquierda, fecha a la derecha. Reservada para normativa que sale ese día.',
    ejemplo: { badge: 'Último momento', categoria: 'ARCA · Normativa', titular: 'Régimen simplificado para PyMEs: cambios desde julio', bajada: 'Las pequeñas y medianas empresas tendrán nuevo umbral de facturación y categorías ampliadas.', fuente: 'Ámbito Financiero', fecha: '20 jun 2026', handle: '@mdoconsultores' },
    ph: { badge: PH('BADGE'), categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-04b', label: 'Guía / Servicio en navy', grupo: 'Portrait 4:5', comp: 'PoServicioNavy',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'BAJADA', 'BULLET_1..4', 'CTA', 'HANDLE'],
    nota: 'Variante de po-04. El CTA se invierte: caja de papel sobre navy.',
    ejemplo: { copete: 'Servicio · MDO', titulo: 'Auditoría externa', bajada: 'Estados contables auditados con criterio profesional y normativa vigente.', cta: 'Consultanos', handle: '@mdoconsultores', bullets: ['Auditoría de estados contables anuales', 'Revisión limitada de información intermedia', 'Informes especiales sobre patrimonio y resultados', 'Atención de requerimientos ARCA / IGJ / CNV'] },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), bajada: PH('BAJADA'), cta: PH('CTA'), handle: PH('HANDLE'), bullets: [PH('BULLET_1'), PH('BULLET_2'), PH('BULLET_3'), PH('BULLET_4')] },
    modo: 'feed',
  },
  {
    id: 'po-05b', label: 'Anuncio en papel', grupo: 'Portrait 4:5', comp: 'PoAnuncioLight',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'TITULO', 'SUBTITULO', 'TEMA', 'BLOQUE_1..3', 'FECHA_HORA', 'HANDLE'],
    nota: 'Variante de po-05: mismo anuncio sobre papel, con el título en itálica.',
    ejemplo: { copete: 'Anuncio', titulo: 'Reforma fiscal', subtitulo: 'Webinar gratuito', tema: 'Análisis ejecutivo de los cambios 2026', fecha_hora: 'Jueves 19 · 19:00 h', handle: '@mdoconsultores', bloques: ['Impuestos', 'Sociedades', 'Sueldos'] },
    ph: { copete: PH('COPETE'), titulo: PH('TITULO'), subtitulo: PH('SUBTITULO'), tema: PH('TEMA'), fecha_hora: PH('FECHA_HORA'), handle: PH('HANDLE'), bloques: [PH('BLOQUE_1'), PH('BLOQUE_2'), PH('BLOQUE_3')] },
    modo: 'feed',
  },
  {
    id: 'po-13b', label: 'Noticia navy · take invertido', grupo: 'Portrait 4:5', comp: 'PoNoticiaNavy',
    out: '1080×1350', base: '540×675', slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'QUE_SABER_LABEL', 'QUE_SABER', 'FUENTE', 'FECHA', 'HANDLE'],
    nota: 'Variante de po-13d. El «qué tenés que saber» va en una caja de papel dentro de la placa navy: es el único bloque invertido del catálogo.',
    ejemplo: { categoria: 'Económico · Indicadores', titular: 'El BCRA modifica el régimen de pago para importaciones de servicios', bajada: 'Desde el 1° de julio las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.', que_saber_label: 'Qué tenés que saber', que_saber: 'Si pagás servicios al exterior, conviene anticipar las facturas de julio.', fuente: 'BCRA · Comunicación «A» 7984', fecha: '20 jun 2026', handle: '@mdoconsultores' },
    ph: { categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), que_saber_label: PH('QUE_SABER_LABEL'), que_saber: PH('QUE_SABER'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'st-08b', label: 'Cita story en navy', grupo: 'Story 9:16', comp: 'StCitaNavy',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
    nota: 'Variante de st-08. Antes usaba padding 40, que dejaba el lockup y el pie DEBAJO de la interfaz de Instagram (tapa ~111px arriba y ~147px abajo). Ahora usa el padding de zona segura.',
    ejemplo: { copete: 'Pensamiento', cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.', autor: 'Estudio MDO', rol_autor: 'Consultores en gestión', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), cita: PH('CITA'), autor: PH('AUTOR'), rol_autor: PH('ROL_AUTOR'), handle: PH('HANDLE') },
    modo: 'story',
  },
  {
    id: 'st-09b', label: 'CTA story en navy', grupo: 'Story 9:16', comp: 'StCTANavy',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'TITULAR_1..3', 'BAJADA', 'CANAL_1..3_LABEL', 'CANAL_1..3_VALOR', 'HANDLE'],
    nota: 'Variante de st-09, con el mismo arreglo de zona segura que st-08b. La tabla de canales se invierte a papel.',
    ejemplo: { copete: 'Estás pensando en armar tu empresa', titular_1: 'Hablemos', titular_2: 'antes', titular_3: 'de firmar.', bajada: 'Constitución de sociedades, planificación impositiva, contabilidad y nómina, en un solo equipo.', canal_1_label: 'Web', canal_1_valor: 'mdo-consultores.com.ar', canal_2_label: 'WhatsApp', canal_2_valor: '+54 9 11 3566 7985', canal_3_label: 'Email', canal_3_valor: 'info@mdo-consultores.com.ar', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), titular_1: PH('TITULAR_1'), titular_2: PH('TITULAR_2'), titular_3: PH('TITULAR_3'), bajada: PH('BAJADA'), canal_1_label: PH('CANAL_1_LABEL'), canal_1_valor: PH('CANAL_1_VALOR'), canal_2_label: PH('CANAL_2_LABEL'), canal_2_valor: PH('CANAL_2_VALOR'), canal_3_label: PH('CANAL_3_LABEL'), canal_3_valor: PH('CANAL_3_VALOR'), handle: PH('HANDLE') },
    modo: 'story',
  },
  {
    id: 'sq-01b', label: 'Vencimiento en papel', grupo: 'Square 1:1', comp: 'SqVencimientoLight',
    out: '1080×1080', base: '540×540', slots: ['COPETE', 'DIA', 'MES', 'ANIO', 'IMPUESTO', 'DESCRIPCION_VENC', 'HORARIO', 'CHIP_MES', 'HANDLE'],
    nota: 'Variante light de sq-01. La familia «light» es la versión editorial: fondo blanco y filetes en lugar de fondo navy. Se usa cuando la semana ya tuvo dos placas navy seguidas.',
    ejemplo: { copete: 'Calendario ARCA · Vencimiento', dia: '21', mes: 'JUN', anio: '2026', impuesto: 'IVA', descripcion: 'Posición mensual · Período 05/2026', horario: 'Hasta las 23:59 h', chip_mes: 'Calendario · 06/26', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), dia: PH('DIA'), mes: PH('MES'), anio: PH('ANIO'), impuesto: PH('IMPUESTO'), descripcion: PH('DESCRIPCION_VENC'), horario: PH('HORARIO'), chip_mes: PH('CHIP_MES'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-02c', label: 'Cita minimal', grupo: 'Square 1:1', comp: 'SqCitaMinimal',
    out: '1080×1080', base: '540×540', slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
    nota: 'Variante light de sq-02, sin comilla decorativa: el filete arriba y abajo hace todo el trabajo.',
    ejemplo: { copete: 'Pensamiento', cita: 'La planificación impositiva no es un costo: es la primera decisión estratégica del año.', autor: 'Estudio MDO', rol_autor: 'Consultores en gestión', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), cita: PH('CITA'), autor: PH('AUTOR'), rol_autor: PH('ROL_AUTOR'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-03c', label: 'Número en blanco', grupo: 'Square 1:1', comp: 'SqNumeroLight',
    out: '1080×1080', base: '540×540', slots: ['COPETE', 'NUMERO', 'UNIDAD', 'DESCRIPCION', 'PIE', 'HANDLE'],
    nota: 'Variante light de sq-03: número recto y unidad en itálica, sobre blanco puro.',
    ejemplo: { copete: 'En cifras · MDO Consultores', numero: '+50', unidad: 'años', descripcion: 'acompañando empresas argentinas en la gestión impositiva, contable y previsional.', pie: 'Est. 1972', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), numero: PH('NUMERO'), unidad: PH('UNIDAD'), descripcion: PH('DESCRIPCION'), pie: PH('PIE'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'sq-12c', label: 'Noticia minimal', grupo: 'Square 1:1', comp: 'SqNoticiaMinimal',
    out: '1080×1080', base: '540×540', slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'FUENTE', 'FECHA', 'HANDLE'],
    nota: 'Variante light de sq-12: filete navy debajo del encabezado y nada más. La más sobria del catálogo.',
    ejemplo: { categoria: 'Impuestos · ARCA', titular: 'ARCA extiende el plazo para presentar Ganancias', bajada: 'La prórroga aplica a personas humanas. Nuevo vencimiento: 30 de junio.', fuente: 'ARCA · Comunicado oficial', fecha: '19 jun 2026', handle: '@mdoconsultores' },
    ph: { categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-06b', label: 'Voz experta sin foto', grupo: 'Portrait 4:5', comp: 'PoEquipoNoPhoto',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'NOMBRE', 'ROL', 'BIO', 'TAG_1..4', 'HANDLE'],
    nota: 'Variante de po-06 para cuando no hay retrato disponible: el nombre en itálica grande ocupa el lugar de la foto. Mejor esto que un hueco rotulado.',
    ejemplo: { copete: 'Voz experta', nombre: 'Lucía Martínez', rol: 'Socia · Impuestos', bio: 'Sobre la reforma del monotributo: los nuevos topes corren desde julio y obligan a recategorizar antes de fin de mes. Cuidado con los pagos por billetera virtual — ARCA cruza CBU, billeteras y tarjetas en la misma consulta.', handle: '@mdoconsultores', tags: ['Ganancias', 'IVA', 'Bienes personales', 'Fiscalizaciones ARCA'] },
    ph: { copete: PH('COPETE'), nombre: PH('NOMBRE'), rol: PH('ROL'), bio: PH('BIO'), handle: PH('HANDLE'), tags: [PH('TAG_1'), PH('TAG_2'), PH('TAG_3'), PH('TAG_4')] },
    modo: 'feed',
  },
  {
    id: 'po-13c', label: 'Noticia portrait minimal', grupo: 'Portrait 4:5', comp: 'PoNoticiaMinimal',
    out: '1080×1350', base: '540×675', slots: ['CATEGORIA', 'TITULAR', 'BAJADA', 'CIERRE', 'FUENTE', 'FECHA', 'HANDLE'],
    nota: 'Ésta es la que generó las placas de junio con el hueco vertical en el medio (tenía un flex:1 suelto que empujaba el título arriba y el cierre abajo). Ya está arreglada, pero para noticias nuevas conviene po-13d, que es la v2.',
    ejemplo: { categoria: 'Económico · Indicadores', titular: 'El BCRA modifica el régimen de pago para importaciones de servicios', bajada: 'A partir del 1° de julio, las empresas podrán acceder al MULC a 30 días para servicios de software, consultoría y royalties.', cierre: 'Una medida que acompaña la apertura gradual del mercado de cambios.', fuente: 'BCRA · Comunicación «A» 7984', fecha: '20 jun 2026', handle: '@mdoconsultores' },
    ph: { categoria: PH('CATEGORIA'), titular: PH('TITULAR'), bajada: PH('BAJADA'), cierre: PH('CIERRE'), fuente: PH('FUENTE'), fecha: PH('FECHA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'st-07b', label: 'Vencimientos en papel', grupo: 'Story 9:16', comp: 'StVencimientosLight',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'SEMANA', 'FECHA_1..4', 'IMPUESTO_1..4', 'PERIODO_1..4', 'HORA_1..4', 'CTA', 'HANDLE'],
    nota: 'Variante light de st-07. Tres columnas fijas: fecha 72, impuesto flexible, hora 64. La hora nunca se comprime; el impuesto es el que cede.',
    ejemplo: { copete: 'Vencimientos de la semana', semana: 'Semana 34 · 2026', cta: 'Te lo presentamos nosotros', handle: '@mdoconsultores', chip: 'Agenda', filas: [
      { fecha: '18 ago', impuesto: 'IVA', periodo: 'Posición mensual 07/2026', hora: '23:59' },
      { fecha: '19 ago', impuesto: 'SUSS · F.931', periodo: 'Cargas sociales 07/2026', hora: '23:59' },
      { fecha: '21 ago', impuesto: 'Ingresos Brutos', periodo: 'Convenio Multilateral', hora: '23:59' },
      { fecha: '22 ago', impuesto: 'Ganancias', periodo: 'Anticipo sociedades', hora: '23:59' },
    ] },
    ph: { copete: PH('COPETE'), semana: PH('SEMANA'), cta: PH('CTA'), handle: PH('HANDLE'), chip: 'Agenda', filas: [1,2,3,4].map((n) => ({ fecha: PH('FECHA_' + n), impuesto: PH('IMPUESTO_' + n), periodo: PH('PERIODO_' + n), hora: PH('HORA_' + n) })) },
    modo: 'story',
  },
  {
    id: 'st-08c', label: 'Cita story minimal', grupo: 'Story 9:16', comp: 'StCitaMinimal',
    out: '1080×1920', base: '480×853', slots: ['COPETE', 'CITA', 'AUTOR', 'ROL_AUTOR', 'HANDLE'],
    nota: 'Variante light de st-08. Antes usaba padding 50, que dejaba el pie debajo de la interfaz de Instagram; ahora usa el padding de zona segura.',
    ejemplo: { copete: 'Pensamiento', cita: 'Un buen asesor no responde preguntas: ayuda a formular las correctas.', autor: 'Estudio MDO', rol_autor: 'Consultores en gestión', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), cita: PH('CITA'), autor: PH('AUTOR'), rol_autor: PH('ROL_AUTOR'), handle: PH('HANDLE') },
    modo: 'story',
  },
  {
    id: 'po-22', label: 'Antes / Después', grupo: 'Portrait 4:5', comp: 'PoAntesDespues',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'SIN_LABEL', 'SIN_TEXTO', 'CON_LABEL', 'CON_TEXTO', 'CTA', 'HANDLE'],
    nota: 'Placa partida en dos mitades de igual alto: arriba el problema en gris apagado, abajo la solución en navy. El contraste ES el mensaje.',
    ejemplo: { copete: 'Contabilidad', sin_label: 'Sin orden contable', sin_texto: 'Números a fin de año, decisiones a las apuradas y sorpresas con ARCA.', con_label: 'Con MDO', con_texto: 'Información al día para decidir tranquilo, todo el año.', cta: 'Ordenamos tu contabilidad', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), sin_label: PH('SIN_LABEL'), sin_texto: PH('SIN_TEXTO'), con_label: PH('CON_LABEL'), con_texto: PH('CON_TEXTO'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-23', label: 'Declaración / manifiesto', grupo: 'Portrait 4:5', comp: 'PoDeclaracion',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'DECLARACION', 'APOYO', 'HANDLE'],
    nota: 'La única placa firmada «Estudio MDO · Consultores» arriba del handle: es una declaración, así que lleva firma.',
    ejemplo: { copete: 'Gestión PyME', declaracion: 'La contabilidad no es un gasto. Es la base de toda buena decisión.', apoyo: 'Llevada al día y bien leída, te dice dónde ganás, dónde perdés y hacia dónde conviene crecer.', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), declaracion: PH('DECLARACION'), apoyo: PH('APOYO'), handle: PH('HANDLE') },
    modo: 'feed',
  },
  {
    id: 'po-25', label: 'Foco / una idea', grupo: 'Portrait 4:5', comp: 'PoFoco',
    out: '1080×1350', base: '540×675', slots: ['COPETE', 'IDEA', 'DETALLE', 'CTA', 'HANDLE'],
    nota: 'La única que usa la grilla de líneas sobre navy, y el asterisco gigante como apertura. Una idea sola, sin lista ni bullets.',
    ejemplo: { copete: 'Gestión PyME', idea: 'Lo que no se registra, no se puede mejorar.', detalle: 'Una contabilidad ordenada es lo que convierte tus números en decisiones.', cta: 'Llevamos tu contabilidad', handle: '@mdoconsultores' },
    ph: { copete: PH('COPETE'), idea: PH('IDEA'), detalle: PH('DETALLE'), cta: PH('CTA'), handle: PH('HANDLE') },
    modo: 'feed',
  },
];

window.CATALOGO = CATALOGO;

const FORMATOS = { 'Manual 4:5': { w: 540, h: 675 }, 'Square 1:1': { w: 540, h: 540 }, 'Portrait 4:5': { w: 540, h: 675 }, 'Story 9:16': { w: 480, h: 853 }, 'LinkedIn 1.91:1': { w: 600, h: 314 }, 'Carrusel A · Calendario': { w: 420, h: 420 }, 'Carrusel B · Tips PyME': { w: 420, h: 525 } };
const GRUPOS = Object.keys(FORMATOS);
window.FORMATOS = FORMATOS;
window.GRUPOS = GRUPOS;

function SafeZone({ modo }) {
  const top = modo === 'story' ? '13.0%' : '23.1%';
  const bot = modo === 'story' ? '17.2%' : '18.5%';
  const banda = { position: 'absolute', left: 0, right: 0, background: 'repeating-linear-gradient(45deg,rgba(156,59,50,0.16) 0 14px,rgba(156,59,50,0.05) 14px 28px)', border: '1px dashed rgba(156,59,50,0.55)' };
  const rot = { position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--no)', background: 'rgba(255,255,255,0.9)', padding: '2px 7px', whiteSpace: 'nowrap' };
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
      <div style={{ ...banda, top: 0, height: top }} />
      <div style={{ ...banda, bottom: 0, height: bot }} />
      <span style={{ ...rot, top: 8 }}>UI superior — evitar texto</span>
      <span style={{ ...rot, bottom: 8 }}>UI inferior — evitar texto</span>
    </div>
  );
}

function Rail({ value, onChange }) {
  return (
    <div style={{ width: 210, flexShrink: 0, borderRight: '1px solid var(--rule)', background: 'var(--surface-card)', overflowY: 'auto', padding: '18px 0 24px' }}>
      <div style={{ padding: '0 18px 16px' }}>
        <Lockup variant="principal" height={26} base="../../assets/logos" />
      </div>
      {GRUPOS.map((g) => (
        <div key={g} style={{ marginBottom: 14 }}>
          <div style={{ padding: '8px 18px 6px' }}>
            <Eyebrow>{g}</Eyebrow>
            <div style={{ fontSize: 10.5, color: 'var(--ink-55)', marginTop: 2 }}>{g === 'Manual 4:5' ? 'del manual' : 'del repo de plantillas'}</div>
          </div>
          {CATALOGO.filter((t) => t.grupo === g).map((t) => {
            const on = t.id === value;
            return (
              <button key={t.id} type="button" onClick={() => onChange(t.id)}
                style={{ display: 'flex', width: '100%', textAlign: 'left', gap: 10, alignItems: 'baseline',
                  font: 'inherit', fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer',
                  padding: '7px 18px', border: 'none', borderLeft: '2px solid ' + (on ? 'var(--navy)' : 'transparent'),
                  background: on ? 'var(--grey-pale)' : 'transparent', color: on ? 'var(--ink)' : 'var(--ink-70)',
                  fontWeight: on ? 600 : 400 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.06em', color: 'var(--ink-55)', minWidth: 42 }}>{t.id}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [id, setId] = useState('mn-02');
  const [ejemplo, setEjemplo] = useState(true);
  const [safe, setSafe] = useState(false);
  const tpl = useMemo(() => CATALOGO.find((t) => t.id === id), [id]);
  const fmt = FORMATOS[tpl.grupo];
  const scale = Math.min(1, 540 / fmt.h, 620 / fmt.w);
  const Comp = window[tpl.comp];
  const props = ejemplo ? tpl.ejemplo : tpl.ph;

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--ground)' }}>
      <Rail value={id} onChange={setId} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', padding: '14px 24px', borderBottom: '1px solid var(--rule)', background: 'var(--surface-card)' }}>
          <div style={{ flex: '1 1 240px', minWidth: 0 }}>
            <Display level={3}>{tpl.label}</Display>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--ink-55)', marginTop: 2 }}>
              {tpl.id} · base {tpl.base} · salida {tpl.out}
            </div>
          </div>
          <Btn on={ejemplo} onClick={() => setEjemplo(true)}>Contenido de ejemplo</Btn>
          <Btn on={!ejemplo} onClick={() => setEjemplo(false)}>Placeholders</Btn>
          <Btn on={safe} onClick={() => setSafe(!safe)}>Zona segura</Btn>
        </div>

        <div style={{ flex: 1, overflow: 'auto', display: 'grid', placeItems: 'center', padding: 28 }}>
          <div style={{ position: 'relative', border: '1px solid var(--rule)' }}>
            <Comp {...props} scale={scale} />
            {safe ? <SafeZone modo={tpl.modo} /> : null}
          </div>
        </div>
      </div>

      <div style={{ width: 248, flexShrink: 0, borderLeft: '1px solid var(--rule)', background: 'var(--surface-card)', overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Eyebrow>Slots</Eyebrow>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tpl.slots.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
        <Rule />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Eyebrow>Cómo se rellena</Eyebrow>
          <Lede size="note" style={{ fontSize: 12 }}>
            La rutina abre la plantilla, reemplaza cada <code>[SLOT]</code> por su texto y saca el PNG al tamaño de salida. El artboard se diseña al tamaño base y se escala.
          </Lede>
        </div>
        {tpl.nota ? <Nota title="Por qué existe esta variante">{tpl.nota}</Nota> : null}
        <Nota tone="bad" title="Regla dura: ARCA, nunca AFIP">
          El organismo ya no se llama AFIP. En títulos, copys, imágenes y hashtags va siempre <b>ARCA</b>. Si la fuente dice AFIP, se traduce al redactar.
        </Nota>
        <Nota title="Margen de seguridad">
          Instagram recorta los bordes en la grilla del perfil. El padding de cada formato es el mínimo: se mantiene o sube, nunca baja. Verificable con «Zona segura».
        </Nota>
      </div>
    </div>
  );
}

// El montaje NO va aca: este archivo lo empaqueta el compilador dentro de
// _ds_bundle.js, asi que se evalua dos veces por carga. Solo se expone el
// componente; el createRoot vive inline en index.html.
window.MdoRedesApp = App;

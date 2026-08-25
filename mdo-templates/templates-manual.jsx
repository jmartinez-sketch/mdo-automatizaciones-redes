// templates-manual.jsx — LAS 8 PLACAS DE FEED DEL MANUAL DE MARCA 2026.
// Van al repo como mdo-templates/templates-manual.jsx
//
// Estas ocho NO existían en el repo: son las placas oficiales que entregó la
// diseñadora con el manual. Recreadas midiendo los JPG originales, en formato
// de este repo (className="tpl", TplHeader, HandleFooter, fitSize).
//
// Portrait 4:5 (base 540×675 → 1080×1350). Regla: ARCA, nunca AFIP.
// Requiere brand.jsx + tpl-utils.jsx + el mdo-brand.css v2.0 cargados ANTES.
//
// LO QUE ESTAS OCHO HACEN DISTINTO al resto del catálogo — es a propósito,
// son la marca:
//   · Todas son 4:5. Ninguna cuadrada.
//   · El papel es #F0EDEE, un punto más cálido que el --paper de documento.
//   · La marca de agua es GIGANTE (~1,7× el lienzo) y recortada por los bordes,
//     no un detalle de esquina.
//   · El titular puede ir en DOS TONOS dentro de la misma frase: la primera
//     parte en blanco y negrita, la segunda en gris y peso normal.
//   · Se usa itálica (Chivo oblicua) como tercer nivel del titular.
//   · Hay foto a sangre, siempre con velo navy encima (34-58% según texto).
//   · NO llevan chip, ni cápsula, ni pie con @handle. Ninguna de las ocho.
//     La marca se firma con el logo y nada más. No agregarles el pie.

// Padding del manual: 130px sobre 1080 = 64 en base 540.
const MAN_PAD = 64;

// Marca de agua del manual: isotipo a ~1.7 veces el lienzo, recortado.
// A 0.05 sobre #F0EDEE da el #E6E3E4 medido en el original.
function ManWatermark({ variant = 'a' }) {
  const pos = variant === 'a'
    ? { position: 'absolute', top: -70, left: -150 }
    : { position: 'absolute', top: -40, right: -170 };
  return <IsoWatermark mode="dark" size={900} opacity={0.05} style={pos} />;
}

// Foto a sangre. El manual usa foto real (edificios en contrapicado, manos en
// el teclado) SIEMPRE oscurecida con velo navy: nunca la foto cruda, nunca una
// foto cálida o saturada.
// `src` es la ruta de la foto real; sin src queda el slot rayado de placeholder.
// Las fotos institucionales salen del propio manual (assets/fotos/): la de
// edificios está incrustada limpia en el PDF y la de manos es un recorte sin
// texto de la pieza original de redes.
function ManPhoto({ caption, src, dark = 0.52, position = 'center' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {src ? (
        <img src={src} alt="" style={{ width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: position, display: 'block' }} />
      ) : (
        <div className="slot" style={{ width: '100%', height: '100%', border: 'none' }}>
          <span className="slot-cap">{caption}</span>
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--navy)', opacity: dark }}></div>
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(to top,rgba(0,8,29,0.55),transparent 60%)' }}></div>
    </div>
  );
}

const FOTO_EDIFICIOS = 'assets/fotos/edificios-contrapicado.jpg';
// La foto de manos en el teclado NO tiene version en alta (el recorte de la
// pieza de redes quedaba pixelado estirado a 1080x1350, y las fotos nunca se
// escalan por encima del 100%). Hasta conseguirla, mn-08 cae al degrade de
// marca, como mn-01.

const MAN_Z = { position: 'relative', zIndex: 1 };

// ── mn-01 · Apertura de marca ───────────────────────────────────────
// Degradé navy y el lockup centrado. Abre carrusel o presenta la cuenta.
// Slots: — (sin texto)
function ManApertura() {
  return (
    <div className="tpl" style={{ padding: 0, display: 'flex', flexDirection: 'column',
      background: 'var(--gradient-brand)' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Lockup mode="light" size={82} />
      </div>
    </div>
  );
}

// ── mn-02 · Noticia normativa ───────────────────────────────────────
// La más usada del manual. El titular va en DOS TONOS: es UNA frase partida,
// no dos líneas distintas.
// Slots: FECHA, TITULAR_1, TITULAR_2, CUERPO, CIERRE
function ManNoticia(props) {
  const p = Object.assign({
    fecha: '[FECHA]', titular_1: '[TITULAR_1]', titular_2: '[TITULAR_2]',
    cuerpo: '[CUERPO]', cierre: '[CIERRE]',
  }, props);

  const largo = String(p.titular_1).length + String(p.titular_2).length;
  const tSize = fitSize('x'.repeat(largo), [[40, 37], [62, 32], [84, 27]], 23);
  const cSize = fitSize(p.cuerpo, [[130, 15], [200, 14]], 13);

  return (
    <div className="tpl" style={{ padding: MAN_PAD, display: 'flex', flexDirection: 'column',
      background: 'var(--gradient-brand)', color: 'var(--paper)' }}>
      <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 400,
        fontSize: 15, letterSpacing: '0.02em', color: 'var(--ink-40)' }}>
        {p.fecha}
      </div>

      <div style={{ marginTop: 52 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: tSize,
          lineHeight: 1.06, letterSpacing: '-0.015em', color: 'var(--paper)',
          textWrap: 'balance' }}>
          {p.titular_1}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: tSize,
          lineHeight: 1.06, letterSpacing: '-0.015em', color: 'var(--slate-30)',
          textWrap: 'balance' }}>
          {p.titular_2}
        </div>
      </div>

      <div style={{ width: 1, height: 58, background: 'rgba(248,246,246,0.38)', margin: '30px 0 0' }}></div>

      <div style={{ flex: 1, marginTop: 34 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: cSize, lineHeight: 1.5,
          color: 'var(--slate-40)', maxWidth: '94%', textWrap: 'pretty' }}>
          {p.cuerpo}
        </div>
      </div>

      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14.5,
        lineHeight: 1.4, color: 'var(--paper)', maxWidth: '88%' }}>
        {p.cierre}
      </div>
    </div>
  );
}

// ── mn-03 · Pregunta al lector ──────────────────────────────────────
// Papel, marca de agua gigante, volanta con barra vertical, y el titular
// alineado a la DERECHA en tres niveles: mayúsculas, negrita, itálica.
// Slots: VOLANTA, TITULAR_1, TITULAR_2, TITULAR_3, BAJADA_1, BAJADA_2
function ManPregunta(props) {
  const p = Object.assign({
    volanta: '[VOLANTA]', titular_1: '[TITULAR_1]', titular_2: '[TITULAR_2]',
    titular_3: '[TITULAR_3]', bajada_1: '[BAJADA_1]', bajada_2: '[BAJADA_2]',
  }, props);

  const largo = [p.titular_1, p.titular_2, p.titular_3].join('').length;
  const tSize = fitSize('x'.repeat(largo), [[54, 25], [76, 22]], 19);
  const tBase = { fontFamily: 'var(--font-body)', fontSize: tSize, lineHeight: 1.16,
    letterSpacing: '0.02em', color: 'var(--navy-ink)' };

  return (
    <div className="tpl" style={{ padding: MAN_PAD, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-feed)', position: 'relative', overflow: 'hidden' }}>
      <ManWatermark variant="a" />

      <div style={Object.assign({ display: 'flex', alignItems: 'center', gap: 14 }, MAN_Z)}>
        <span style={{ width: 1, height: 26, background: 'var(--navy)', flexShrink: 0 }}></span>
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 16,
          letterSpacing: '0.19em', textTransform: 'uppercase', color: 'var(--navy)' }}>
          {p.volanta}
        </span>
      </div>

      <div style={Object.assign({ flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', textAlign: 'right', paddingBottom: 46 }, MAN_Z)}>
        <div style={Object.assign({}, tBase, { fontWeight: 700, textTransform: 'uppercase' })}>
          {p.titular_1}
        </div>
        <div style={Object.assign({}, tBase, { fontWeight: 700 })}>{p.titular_2}</div>
        <div style={Object.assign({}, tBase, { fontFamily: 'var(--font-accent)',
          fontStyle: 'italic', fontWeight: 400 })}>{p.titular_3}</div>

        <div style={{ margin: '20px 0 0', fontFamily: 'var(--font-body)', fontSize: 15,
          lineHeight: 1.45, color: 'var(--ink-25)' }}>
          {p.bajada_1}
          <br />
          <b style={{ color: 'var(--navy-ink)', fontWeight: 700 }}>{p.bajada_2}</b>
        </div>
      </div>
    </div>
  );
}

// ── mn-04 · Servicios ───────────────────────────────────────────────
// La única sobre el degradé claro. Volanta, título en mayúsculas y filete
// CORTO debajo (52px, no ancho completo).
// Slots: VOLANTA, TITULO, CUERPO
function ManServicio(props) {
  const p = Object.assign({
    volanta: '[VOLANTA]', titulo: '[TITULO]', cuerpo: '[CUERPO]',
  }, props);

  const tSize = fitSize(p.titulo, [[18, 24], [26, 21], [36, 18]], 16);

  return (
    <div className="tpl" style={{ padding: MAN_PAD, display: 'flex', flexDirection: 'column',
      background: 'var(--gradient-light)', position: 'relative', overflow: 'hidden' }}>
      <ManWatermark variant="b" />

      <div style={Object.assign({ flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center' }, MAN_Z)}>
        <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 13,
          letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--navy)' }}>
          {p.volanta}
        </div>

        <div style={{ marginTop: 28, fontFamily: 'var(--font-body)', fontWeight: 700,
          fontSize: tSize, letterSpacing: '0.03em', textTransform: 'uppercase',
          lineHeight: 1.14, color: 'var(--navy)' }}>
          {p.titulo}
        </div>

        <div style={{ width: 52, height: 1, background: 'var(--navy)', margin: '16px 0' }}></div>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.5,
          color: 'var(--navy-20)', maxWidth: '80%', textWrap: 'pretty' }}>
          {p.cuerpo}
        </div>
      </div>
    </div>
  );
}

// ── mn-05 · Frase de marca ──────────────────────────────────────────
// Papel, marca de agua gigante, isotipo y el claim en GRIS CÁLIDO — es la
// única placa donde el claim no va en navy.
// Slots: CLAIM_1, CLAIM_2
function ManFrase(props) {
  const p = Object.assign({ claim_1: '[CLAIM_1]', claim_2: '[CLAIM_2]' }, props);
  const cSize = fitSize(p.claim_1 + p.claim_2, [[36, 23], [52, 20]], 18);

  return (
    <div className="tpl" style={{ padding: MAN_PAD, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-feed)', position: 'relative', overflow: 'hidden' }}>
      <ManWatermark variant="a" />

      <div style={Object.assign({ flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', paddingBottom: 136 }, MAN_Z)}>
        <div style={{ marginBottom: 18 }}>
          <IsoWatermark mode="dark" size={30} opacity={1} style={{ position: 'static' }} />
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: cSize,
          lineHeight: 1.2, letterSpacing: '-0.005em', color: 'var(--warm-grey-20)' }}>
          {p.claim_1}
          <br />
          {p.claim_2}
        </div>
      </div>
    </div>
  );
}

// ── mn-06 · Frase sobre foto ────────────────────────────────────────
// Foto a sangre y el claim centrado en blanco. Sin logo.
// Slots: CLAIM_1, CLAIM_2, FOTO
function ManFraseFoto(props) {
  const p = Object.assign({
    claim_1: '[CLAIM_1]', claim_2: '[CLAIM_2]', foto: '[FOTO]',
    foto_src: FOTO_EDIFICIOS, foto_pos: 'left center',
  }, props);
  const cSize = fitSize(p.claim_1 + p.claim_2, [[40, 21], [56, 18]], 16);

  return (
    <div className="tpl navy" style={{ padding: MAN_PAD, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <ManPhoto caption={p.foto} src={p.foto_src} position={p.foto_pos} dark={0.34} />

      <div style={Object.assign({ flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center' }, MAN_Z)}>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: cSize,
          lineHeight: 1.25, color: 'var(--paper)',
          textShadow: '0 1px 14px rgba(0,8,29,0.5)' }}>
          {p.claim_1}
          <br />
          {p.claim_2}
        </div>
      </div>
    </div>
  );
}

// ── mn-07 · Claim sobre foto ────────────────────────────────────────
// Foto oscura, claim de tres líneas a la DERECHA: negrita, itálica, y negrita
// con la última palabra en mayúsculas. Isotipo abajo a la derecha.
// Slots: CLAIM_1, CLAIM_2, CLAIM_3, DESTACADO, FOTO
function ManClaimFoto(props) {
  const p = Object.assign({
    claim_1: '[CLAIM_1]', claim_2: '[CLAIM_2]', claim_3: '[CLAIM_3]',
    destacado: '[DESTACADO]', foto: '[FOTO]',
    foto_src: FOTO_EDIFICIOS, foto_pos: 'right center',
  }, props);

  return (
    <div className="tpl navy" style={{ padding: MAN_PAD, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <ManPhoto caption={p.foto} src={p.foto_src} position={p.foto_pos} dark={0.55} />

      <div style={Object.assign({ flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right' }, MAN_Z)}>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 25,
          lineHeight: 1.12, color: 'var(--paper)' }}>{p.claim_1}</div>
        <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 18, lineHeight: 1.3, color: 'var(--paper)', marginTop: 3 }}>{p.claim_2}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18,
          lineHeight: 1.3, color: 'var(--paper)', marginTop: 3 }}>
          {p.claim_3} <span style={{ textTransform: 'uppercase' }}>{p.destacado}</span>
        </div>
      </div>

      <div style={Object.assign({ display: 'flex', justifyContent: 'flex-end' }, MAN_Z)}>
        <IsoWatermark mode="light" size={36} opacity={1} style={{ position: 'static' }} />
      </div>
    </div>
  );
}

// ── mn-08 · Institucional ───────────────────────────────────────────
// Foto oscura, el lockup SECUNDARIO (los tres apellidos) arriba a la izquierda
// y el rubro abajo a la derecha en versalitas muy abiertas.
// Slots: RUBRO, FOTO
function ManInstitucional(props) {
  const p = Object.assign({ rubro: '[RUBRO]', foto: '[FOTO]',
    foto_src: null, foto_pos: 'center' }, props);

  return (
    <div className="tpl navy" style={{ padding: MAN_PAD, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      background: p.foto_src ? undefined : 'var(--gradient-brand)' }}>
      {p.foto_src ? <ManPhoto caption={p.foto} src={p.foto_src} position={p.foto_pos} dark={0.58} /> : null}

      <div style={MAN_Z}>
        <LockupSecundario mode="light" size={48} />
      </div>

      <div style={Object.assign({ flex: 1 }, MAN_Z)}></div>

      <div style={Object.assign({ display: 'flex', justifyContent: 'flex-end' }, MAN_Z)}>
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 16,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--paper)' }}>
          {p.rubro}
        </span>
      </div>
    </div>
  );
}

const EXAMPLES_MANUAL = {
  ManApertura: {},
  ManNoticia: {
    fecha: '28.07.2026',
    titular_1: 'ARCA pide informar',
    titular_2: 'socios, directores y beneficiarios',
    cuerpo: 'Las sociedades deberán informar ante ARCA a los titulares de participaciones, directores y beneficiarios finales, conforme al régimen vigente y con vencimientos escalonados durante el mes.',
    cierre: 'Confirmá que tu sociedad se encuentre al día con esta obligación.',
  },
  ManPregunta: {
    volanta: 'Gestión PyME',
    titular_1: 'Tu empresa está',
    titular_2: 'tomando decisiones',
    titular_3: 'con información actualizada?',
    bajada_1: 'La información contable no solo registra lo que pasó.',
    bajada_2: 'También ayuda a decidir lo que sigue.',
  },
  ManServicio: {
    volanta: 'Servicios',
    titulo: 'Liquidación de sueldos',
    cuerpo: 'Nos encargamos de tus sueldos y cargas sociales para que vos te enfoques en tu negocio.',
  },
  ManFrase: {
    claim_1: 'Better decisions.',
    claim_2: 'Stronger businesses.',
  },
  ManFraseFoto: {
    claim_1: 'Decisiones claras.',
    claim_2: 'Negocios más sólidos.',
    foto: 'Edificios desde abajo',
  },
  ManClaimFoto: {
    claim_1: 'Transformamos',
    claim_2: 'la complejidad tributaria y contable',
    claim_3: 'en decisiones',
    destacado: 'estratégicas.',
    foto: 'Edificios en contrapicado',
  },
  ManInstitucional: {
    rubro: 'Estudio contable',
    foto: 'Manos en el teclado',
  },
};

Object.assign(window, {
  ManWatermark, ManPhoto,
  ManApertura, ManNoticia, ManPregunta, ManServicio,
  ManFrase, ManFraseFoto, ManClaimFoto, ManInstitucional,
  EXAMPLES_MANUAL,
});

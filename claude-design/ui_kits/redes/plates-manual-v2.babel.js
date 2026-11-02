// plates-manual.jsx — LAS OCHO PLANTILLAS DE FEED DEL MANUAL DE MARCA 2026.
//
// Estas son las placas oficiales, recreadas midiendo los JPG originales
// (Manual de Marca 2026 / REDES / Feed, 1080x1350). Los originales quedaron
// en assets/referencia-feed/ para comparar.
//
// Todas son 4:5. Diferencias con las plantillas del repo de automatizaciones:
//   · el papel es #f0edee, un punto mas calido que el de documento;
//   · la marca de agua es GIGANTE y recortada, no un detalle de esquina;
//   · el titular puede ir en dos tonos dentro de la misma frase;
//   · se usa italica (Chivo oblicua) como tercer nivel del titular;
//   · NO hay chips, ni capsulas, ni pie con @handle. Ninguna de las ocho.
//   · se usa foto a sangre, oscurecida y en tono frio.
// Los componentes del design system se resuelven en render (no al evaluar el
// módulo): así este archivo es inofensivo si se evalúa antes que el bundle.
const DS = (n) => function DSComp(props) {
  const C = (window.MDOConsultoresDesignSystem_cc21de || {})[n];
  return C ? React.createElement(C, props) : null;
};
const Plate = DS('Plate'), Lockup = DS('Lockup'),
  IsoWatermark = DS('IsoWatermark'), Slot = DS('Slot');
const BM = '../../assets/logos';
const fit = (t, steps, fb) => window.fitSize(t, steps, fb);

// Padding real de las placas del manual: 130px sobre 1080 = 64 en base 540.
const PAD = 64;

// La marca de agua del manual: el isotipo a ~1.7 veces el lienzo, recortado.
// A 0.05 sobre #f0edee da el #e6e3e4 medido en el original.
function Watermark({ variant = 'a' }) {
  const pos = variant === 'a'
    ? { top: -70, left: -150 }
    : { top: -40, right: -170 };
  return <IsoWatermark size={900} opacity={0.05} tone="navy" base={BM} style={pos} />;
}

// Foto a sangre. El manual usa foto real (edificios, manos, oficina) siempre
// oscurecida y con velo navy: nunca la foto cruda.
function Photo({ caption, src, dark = 0.52 }) {
  if (!src) {
    return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'var(--gradient-navy)' }} />;
  }
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <img src={src} alt={caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--navy)', opacity: dark }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,8,29,0.55),transparent 60%)' }} />
    </div>
  );
}

const Z = { position: 'relative', zIndex: 1 };

/* ── mn-01 · Apertura de marca ─────────────────────────────────────
   Degrade navy y el lockup centrado. Abre carrusel o presenta la cuenta. */
function MnApertura({ scale }) {
  return (
    <Plate format="portrait" pad={0} scale={scale} style={{ background: 'var(--gradient-navy)' }}>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <Lockup variant="principal" tone="paper" height={82} base={BM} />
      </div>
    </Plate>
  );
}

/* ── mn-02 · Noticia normativa ─────────────────────────────────────
   Degrade navy · fecha en italica · titular en dos tonos · filete vertical
   · cuerpo · cierre en negrita. Es la plantilla mas usada del manual. */
function MnNoticia({ fecha, titular_1, titular_2, cuerpo, cierre, scale }) {
  const largo = String(titular_1 || '').length + String(titular_2 || '').length;
  const cuerpoTit = largo <= 40 ? 37 : largo <= 62 ? 32 : largo <= 84 ? 27 : 23;
  return (
    <Plate format="portrait" pad={PAD} scale={scale} style={{ background: 'var(--gradient-navy)' }}>
      <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 400, fontSize: 15, letterSpacing: '0.02em', color: 'var(--feed-meta)' }}>{fecha}</div>
      <div style={{ marginTop: 52 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: cuerpoTit, lineHeight: 1.06, letterSpacing: '-0.015em', color: 'var(--paper)', textWrap: 'balance' }}>{titular_1}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: cuerpoTit, lineHeight: 1.06, letterSpacing: '-0.015em', color: 'var(--feed-title-2)', textWrap: 'balance' }}>{titular_2}</div>
      </div>
      <div style={{ width: 1, height: 58, background: 'rgba(248,246,246,0.38)', margin: '30px 0 0' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 34 }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: fit(cuerpo, [[130, 15], [200, 14]], 13), lineHeight: 1.5, color: '#b8c0ca', maxWidth: '94%', textWrap: 'pretty' }}>{cuerpo}</p>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14.5, lineHeight: 1.4, color: 'var(--paper)', maxWidth: '88%' }}>{cierre}</div>
    </Plate>
  );
}

/* ── mn-03 · MDO Explica ───────────────────────────────────────────
   Papel, marca de agua gigante, volanta con barra vertical, y el titular
   alineado a la DERECHA en tres pesos: negrita mayusculas, negrita, italica. */
function MnExplica({ volanta, titular_1, titular_2, titular_3, bajada_1, bajada_2, scale }) {
  const largo = [titular_1, titular_2, titular_3].join('').length;
  const t = largo <= 54 ? 25 : largo <= 76 ? 22 : 19;
  return (
    <Plate format="portrait" pad={PAD} tone="paper" scale={scale} style={{ background: 'var(--paper-feed)' }}>
      <Watermark variant="a" />
      <div style={{ ...Z, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ width: 1, height: 26, background: 'var(--navy)', flex: 'none' }} />
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 16, letterSpacing: '0.19em', textTransform: 'uppercase', color: 'var(--navy)' }}>{volanta}</span>
      </div>
      <div style={{ ...Z, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'right', paddingBottom: 46 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: t, lineHeight: 1.16, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--feed-ink)' }}>{titular_1}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: t, lineHeight: 1.16, letterSpacing: '0.02em', color: 'var(--feed-ink)' }}>{titular_2}</div>
        <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 400, fontSize: t, lineHeight: 1.16, letterSpacing: '0.02em', color: 'var(--feed-ink)' }}>{titular_3}</div>
        <p style={{ margin: '20px 0 0', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.45, color: 'var(--feed-sub)' }}>
          {bajada_1}
          <br />
          <b style={{ color: 'var(--feed-ink)', fontWeight: 700 }}>{bajada_2}</b>
        </p>
      </div>
    </Plate>
  );
}

/* ── mn-04 · Servicios ─────────────────────────────────────────────
   Degrade claro (blanco abajo a la izquierda, gris frio a la derecha),
   marca de agua, volanta, titulo en mayusculas y filete CORTO debajo. */
function MnServicio({ volanta, titulo, cuerpo, scale }) {
  return (
    <Plate format="portrait" pad={PAD} scale={scale} style={{ background: 'var(--gradient-light)' }}>
      <Watermark variant="b" />
      <div style={{ ...Z, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 13, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--navy)' }}>{volanta}</div>
        <div style={{ marginTop: 28, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: fit(titulo, [[18, 24], [26, 21], [36, 18]], 16), letterSpacing: '0.03em', textTransform: 'uppercase', lineHeight: 1.14, color: 'var(--navy)' }}>{titulo}</div>
        <div style={{ width: 52, height: 1, background: 'var(--navy)', margin: '16px 0 16px' }} />
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.5, color: 'var(--feed-body-light)', maxWidth: '80%', textWrap: 'pretty' }}>{cuerpo}</p>
      </div>
    </Plate>
  );
}

/* ── mn-05 · Frase de marca ────────────────────────────────────────
   Papel, marca de agua gigante, isotipo y el claim en gris calido.
   Es la unica placa donde el claim NO va en navy. */
function MnFrase({ claim_1, claim_2, scale }) {
  return (
    <Plate format="portrait" pad={PAD} tone="paper" scale={scale} style={{ background: 'var(--paper-feed)' }}>
      <Watermark variant="a" />
      <div style={{ ...Z, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 136 }}>
        <Lockup variant="isotipo" tone="navy" height={30} base={BM} style={{ marginBottom: 18 }} />
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: fit(claim_1 + claim_2, [[36, 23], [52, 20]], 18), lineHeight: 1.2, letterSpacing: '-0.005em', color: 'var(--feed-claim)' }}>
          {claim_1}
          <br />
          {claim_2}
        </div>
      </div>
    </Plate>
  );
}

/* ── mn-06 · Frase sobre foto ──────────────────────────────────────
   Foto a sangre y el claim centrado en blanco. Sin logo. */
function MnFraseFoto({ claim_1, claim_2, foto, foto_src, scale }) {
  return (
    <Plate format="portrait" pad={PAD} scale={scale} style={{ background: 'var(--navy)' }}>
      <Photo caption={foto} src={foto_src} dark={0.34} />
      <div style={{ ...Z, flex: 1, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: fit(claim_1 + claim_2, [[40, 21], [56, 18]], 16), lineHeight: 1.25, color: 'var(--paper)', textShadow: '0 1px 14px rgba(0,8,29,0.5)' }}>
          {claim_1}
          <br />
          {claim_2}
        </div>
      </div>
    </Plate>
  );
}

/* ── mn-07 · Claim institucional sobre foto ────────────────────────
   Foto oscura, claim de tres lineas a la derecha (negrita / italica /
   negrita con una palabra en mayusculas) e isotipo abajo a la derecha. */
function MnClaimFoto({ claim_1, claim_2, claim_3, destacado, foto, foto_src, scale }) {
  return (
    <Plate format="portrait" pad={PAD} scale={scale} style={{ background: 'var(--navy)' }}>
      <Photo caption={foto} src={foto_src} dark={0.55} />
      <div style={{ ...Z, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 25, lineHeight: 1.12, color: 'var(--paper)' }}>{claim_1}</div>
        <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 400, fontSize: 18, lineHeight: 1.3, color: 'var(--paper)', marginTop: 3 }}>{claim_2}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.3, color: 'var(--paper)', marginTop: 3 }}>
          {claim_3} <span style={{ textTransform: 'uppercase' }}>{destacado}</span>
        </div>
      </div>
      <div style={{ ...Z, display: 'flex', justifyContent: 'flex-end' }}>
        <Lockup variant="isotipo" tone="paper" height={36} base={BM} />
      </div>
    </Plate>
  );
}

/* ── mn-08 · Institucional con lockup secundario ───────────────────
   Foto oscura, el lockup de los tres apellidos arriba a la izquierda y el
   rubro abajo a la derecha en versalitas muy abiertas. */
function MnInstitucional({ rubro, foto, foto_src, scale }) {
  return (
    <Plate format="portrait" pad={PAD} scale={scale} style={{ background: 'var(--navy)' }}>
      <Photo caption={foto} src={foto_src} dark={0.58} />
      <div style={Z}>
        <Lockup variant="secundario" tone="paper" height={48} base={BM} />
      </div>
      <div style={{ ...Z, flex: 1 }} />
      <div style={{ ...Z, display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 400, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--paper)' }}>{rubro}</span>
      </div>
    </Plate>
  );
}

Object.assign(window, { MnApertura, MnNoticia, MnExplica, MnServicio, MnFrase, MnFraseFoto, MnClaimFoto, MnInstitucional });

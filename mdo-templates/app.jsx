// app.jsx — mounts the DesignCanvas with all 11 IG templates.
// Templates default to [PLACEHOLDER] literals; here we override with realistic
// example data via the EXAMPLES_* maps from each template file so the canvas
// preview is readable.

const E = {
  ...EXAMPLES_SQUARE,
  ...EXAMPLES_PORTRAIT,
  ...EXAMPLES_STORY,
  ...EXAMPLES_CAROUSEL,
  ...EXAMPLES_NEWS,
  ...EXAMPLES_VARIANTS,
  ...EXAMPLES_VARIANTS_LIGHT,
};

function App() {
  return (
    <DesignCanvas>

      {/* ─── SQUARE 1:1 — 1080×1080 ────────────────────────── */}
      <DCSection
        id="square"
        title="Square · 1:1"
        subtitle="1080 × 1080 px · feed grid posts">

        <DCArtboard id="sq-01" label="01 · Vencimiento · [COPETE, DIA, MES, ANIO, IMPUESTO, DESCRIPCION_VENC, HORARIO, CHIP_MES, HANDLE]"
          width={540} height={540}>
          <SqVencimiento {...E.SqVencimiento} />
        </DCArtboard>

        <DCArtboard id="sq-02" label="02 · Cita · [COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE]"
          width={540} height={540}>
          <SqCita {...E.SqCita} />
        </DCArtboard>

        <DCArtboard id="sq-03" label="03 · Número clave · [COPETE, NUMERO, UNIDAD, DESCRIPCION, PIE, HANDLE]"
          width={540} height={540}>
          <SqNumero {...E.SqNumero} />
        </DCArtboard>
      </DCSection>

      {/* ─── PORTRAIT 4:5 — 1080×1350 ────────────────────── */}
      <DCSection
        id="portrait"
        title="Portrait · 4:5"
        subtitle="1080 × 1350 px · ideal feed (más alto, más visible)">

        <DCArtboard id="po-04" label="04 · Guía rápida / Servicio · [COPETE, TITULO, BAJADA, BULLET_1..4, CTA, HANDLE]"
          width={540} height={675}>
          <PoServicio {...E.PoServicio} />
        </DCArtboard>

        <DCArtboard id="po-05" label="05 · Anuncio institucional · [COPETE, TITULO, SUBTITULO, TEMA, BLOQUE_1..3, FECHA_HORA, HANDLE]"
          width={540} height={675}>
          <PoAltaCliente {...E.PoAltaCliente} />
        </DCArtboard>

      </DCSection>

      {/* ─── STORY 9:16 — 1080×1920 ────────────────────── */}
      <DCSection
        id="story"
        title="Story · 9:16"
        subtitle="1080 × 1920 px · stories y reels covers">

        <DCArtboard id="st-08" label="08 · Cita vertical · [COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE]"
          width={480} height={853}>
          <StCita {...E.StCita} />
        </DCArtboard>

        <DCArtboard id="st-09" label="09 · CTA / Consultanos · [COPETE, TITULAR_1..3, BAJADA, CANAL_1..3 (LABEL+VALOR), HANDLE]"
          width={480} height={853}>
          <StCTA {...E.StCTA} />
        </DCArtboard>
      </DCSection>

      {/* ─── CAROUSEL A — Calendario impositivo (3 square slides) ─── */}
      <DCSection
        id="carousel-a"
        title="Carousel A · Calendario impositivo"
        subtitle="3 slides cuadradas · 1080×1080 c/u · uso mensual">

        <DCArtboard id="ca-cover" label="10.1 · Cover · [COPETE, MES, ANIO, BAJADA, SWIPE_CTA, CHROME_LABEL]"
          width={420} height={420}>
          <CalCover {...E.CalCover} />
        </DCArtboard>

        <DCArtboard id="ca-q1" label="10.2 · Primera quincena · [COPETE, FECHA_1..5, IMPUESTO_1..5, PERIODO_1..5, CHROME_LABEL]"
          width={420} height={420}>
          <CalQ1 {...E.CalQ1} />
        </DCArtboard>

        <DCArtboard id="ca-q2" label="10.3 · Segunda quincena · [COPETE, FECHA_1..5, IMPUESTO_1..5, PERIODO_1..5, CTA, CHROME_LABEL]"
          width={420} height={420}>
          <CalQ2 {...E.CalQ2} />
        </DCArtboard>
      </DCSection>

      {/* ─── CAROUSEL B — Tips PyME (4 portrait slides) ─── */}
      <DCSection
        id="carousel-b"
        title="Carousel B · Tips PyME"
        subtitle="4 slides verticales 4:5 · educativo / engagement">

        <DCArtboard id="cb-cover" label="11.1 · Cover · [COPETE, TITULO_SANS, TITULO_SERIF, BAJADA, SWIPE_CTA, CHROME_LABEL]"
          width={420} height={525}>
          <TipCover {...E.TipCover} />
        </DCArtboard>

        <DCArtboard id="cb-tip1" label="11.2 · Tip 01 · [TITULAR, CUERPO, TAKEAWAY, CHROME_LABEL]"
          width={420} height={525}>
          <TipSlide2 {...E.TipSlide2} />
        </DCArtboard>

        <DCArtboard id="cb-tip2" label="11.3 · Tip 02 (navy) · [TITULAR, CUERPO, TAKEAWAY, CHROME_LABEL]"
          width={420} height={525}>
          <TipSlide3 {...E.TipSlide3} />
        </DCArtboard>

        <DCArtboard id="cb-tip3" label="11.4 · Tip 03 · [TITULAR, CUERPO, TAKEAWAY, CHROME_LABEL]"
          width={420} height={525}>
          <TipSlide4 {...E.TipSlide4} />
        </DCArtboard>
      </DCSection>

      {/* ─── NOTICIAS ─ caso principal de la automatización Gmail ─ */}
      <DCSection
        id="noticias"
        title="Noticias · automatización Gmail"
        subtitle="Single post de noticia, conectado al label de Newsletter">

        <DCArtboard id="sq-12" label="12 · Noticia Square · [CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE]"
          width={540} height={540}>
          <SqNoticia {...E.SqNoticia} />
        </DCArtboard>

      </DCSection>

      {/* ─── VARIANTES ─ alternative color modes / compositions ─ */}
      <DCSection
        id="variantes"
        title="Variantes"
        subtitle="Versiones alternativas (navy / light / serif) de las plantillas principales">

        <DCArtboard id="sq-02b" label="sq-02b · Cita Navy · [COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE]"
          width={540} height={540}>
          <SqCitaNavy {...E.SqCitaNavy} />
        </DCArtboard>

        <DCArtboard id="sq-03b" label="sq-03b · Número serif editorial · [COPETE, NUMERO, UNIDAD, DESCRIPCION, PIE, HANDLE]"
          width={540} height={540}>
          <SqNumeroSerif {...E.SqNumeroSerif} />
        </DCArtboard>

        <DCArtboard id="sq-12b" label="sq-12b · Noticia Breaking (navy) · [BADGE, CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE]"
          width={540} height={540}>
          <SqNoticiaBreaking {...E.SqNoticiaBreaking} />
        </DCArtboard>

        <DCArtboard id="po-04b" label="po-04b · Guía navy · [COPETE, TITULO, BAJADA, BULLET_1..4, CTA, HANDLE]"
          width={540} height={675}>
          <PoServicioNavy {...E.PoServicioNavy} />
        </DCArtboard>

        <DCArtboard id="po-05b" label="po-05b · Anuncio light · [COPETE, TITULO, SUBTITULO, TEMA, BLOQUE_1..3, FECHA_HORA, HANDLE]"
          width={540} height={675}>
          <PoAnuncioLight {...E.PoAnuncioLight} />
        </DCArtboard>

        <DCArtboard id="po-13b" label="po-13b · Noticia Portrait Navy · [CATEGORIA, TITULAR, BAJADA, QUE_SABER_LABEL, QUE_SABER, FUENTE, FECHA, HANDLE]"
          width={540} height={675}>
          <PoNoticiaNavy {...E.PoNoticiaNavy} />
        </DCArtboard>

        <DCArtboard id="st-08b" label="st-08b · Cita Story Navy · [COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE]"
          width={480} height={853}>
          <StCitaNavy {...E.StCitaNavy} />
        </DCArtboard>

        <DCArtboard id="st-09b" label="st-09b · CTA Story Navy · [COPETE, TITULAR_1..3, BAJADA, CANAL_1..3 (LABEL+VALOR), HANDLE]"
          width={480} height={853}>
          <StCTANavy {...E.StCTANavy} />
        </DCArtboard>
      </DCSection>

      {/* ─── VARIANTES LIGHT ─ fondo blanco / minimalistas ─ */}
      <DCSection
        id="variantes-light"
        title="Variantes · fondo blanco / minimal"
        subtitle="Composiciones limpias con papel/blanco protagónico">

        <DCArtboard id="sq-01b" label="sq-01b · Vencimiento Light · [COPETE, DIA, MES, ANIO, IMPUESTO, DESCRIPCION_VENC, HORARIO, CHIP_MES, HANDLE]"
          width={540} height={540}>
          <SqVencimientoLight {...E.SqVencimientoLight} />
        </DCArtboard>

        <DCArtboard id="sq-02c" label="sq-02c · Cita Minimal · [COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE]"
          width={540} height={540}>
          <SqCitaMinimal {...E.SqCitaMinimal} />
        </DCArtboard>

        <DCArtboard id="sq-03c" label="sq-03c · Número Light · [COPETE, NUMERO, UNIDAD, DESCRIPCION, PIE, HANDLE]"
          width={540} height={540}>
          <SqNumeroLight {...E.SqNumeroLight} />
        </DCArtboard>

        <DCArtboard id="sq-12c" label="sq-12c · Noticia Minimal · [CATEGORIA, TITULAR, BAJADA, FUENTE, FECHA, HANDLE]"
          width={540} height={540}>
          <SqNoticiaMinimal {...E.SqNoticiaMinimal} />
        </DCArtboard>

        <DCArtboard id="po-13c" label="po-13c · Noticia Portrait Minimal · [CATEGORIA, TITULAR, BAJADA, CIERRE, FUENTE, FECHA, HANDLE]"
          width={540} height={675}>
          <PoNoticiaMinimal {...E.PoNoticiaMinimal} />
        </DCArtboard>

        <DCArtboard id="st-08c" label="st-08c · Cita Story Minimal · [COPETE, CITA, AUTOR, ROL_AUTOR, HANDLE]"
          width={480} height={853}>
          <StCitaMinimal {...E.StCitaMinimal} />
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.body.appendChild(document.createElement('div')))
  .render(<App />);

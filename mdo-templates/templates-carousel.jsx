// templates-carousel.jsx — 2 sets de carrusel. CORREGIDO.
// Set A — Calendario impositivo (3 slides square, base 420×420 → 1080×1080)
// Set B — Tips PyME (4 slides portrait, base 420×525 → 1080×1350)
//
// Correcciones respecto de la versión anterior (mismos IDs y slots):
//   · Titulares fijos (72px el mes, 56px la tapa de tips, 22px los titulares
//     de cada slide) que desbordaban con textos largos → fitSize().
//   · ca-q1 / ca-q2: las filas quedaban arriba con un vacío abajo cuando había
//     menos de 5 ítems; ahora se centran en el espacio disponible.
//   · Se quitó la etiqueta visible "Tip · 01" de los slides del set B: la regla
//     de marca del proyecto es no usar la palabra "Tip" en las placas. Ahora
//     dice "Punto 01". (Los slots NO cambiaron.)
//   · CarChrome tenía un gridColumn sin grilla contenedora (sin efecto).
//   · Ejemplos: "AFIP" → "ARCA".
// Requiere brand.jsx + tpl-utils.jsx cargados ANTES de este archivo.

function CarChrome({ idx, total, label, mode = 'dark' }) {
  return (
    <div className="footer-row" style={{
      color: mode === 'light' ? 'rgba(247,249,252,0.55)' : 'var(--ink-55)',
    }}>
      <span style={{ textTransform: 'uppercase' }}>{label}</span>
      <span className="pgindex">
        <span className="num" style={{ color: mode === 'light' ? 'var(--paper)' : 'var(--navy)' }}>
          {String(idx).padStart(2, '0')}
        </span>
        <span className="bar"></span>
        <span>{String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
}

// Fila de vencimiento reutilizada por ca-q1 y ca-q2
function CalRow({ date, tax, period, compact }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', alignItems: 'baseline',
      gap: 6, padding: compact ? '8px 0' : '10px 0', borderBottom: '1px solid var(--hair)' }}>
      <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300, fontStyle: 'italic',
        fontSize: compact ? 26 : 28, color: 'var(--navy)', lineHeight: 0.8 }}>{date}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: compact ? 12.5 : 13,
          fontWeight: 600, color: 'var(--navy-ink)', lineHeight: 1.2 }}>{tax}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: compact ? 10.5 : 11,
          color: 'var(--ink-55)', marginTop: 1 }}>{period}</div>
      </div>
    </div>
  );
}

// ───── Set A · Calendario impositivo ─────

// ca-cover · Slots: COPETE, MES, ANIO, BAJADA, SWIPE_CTA, CHROME_LABEL
function CalCover(props) {
  const p = Object.assign({
    copete: '[COPETE]', mes: '[MES]', anio: '[ANIO]', bajada: '[BAJADA]',
    swipe: '[SWIPE_CTA]', chrome_label: '[CHROME_LABEL]',
  }, props);

  const mSize = fitSize(p.mes, [[7, 72], [10, 60], [14, 50]], 42);

  return (
    <div className="tpl navy" style={{ padding: 28, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden' }}>
      <IsoWatermark mode="light" size={240} opacity={0.06}
        style={{ position: 'absolute', right: -80, bottom: -40 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', zIndex: 1, gap: 10 }}>
        <Lockup mode="light" size={20} />
        <div className="mono" style={{ color: 'rgba(247,249,252,0.55)',
          whiteSpace: 'nowrap' }}>{p.copete}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', zIndex: 1 }}>
        <div className="display-serif" style={{ fontSize: mSize, color: 'var(--paper)',
          lineHeight: 0.95 }}>
          <em>{p.mes}</em>
        </div>
        <div style={{ fontFamily: 'var(--font-accent)', fontSize: 17, color: 'var(--blue-lt)',
          letterSpacing: '0.16em', marginTop: 4, fontWeight: 500 }}>{p.anio}</div>
        <div className="lede" style={{ marginTop: 16, fontSize: 12.5, maxWidth: '90%' }}>{p.bajada}</div>
        <div style={{ marginTop: 20, fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.16em', color: 'var(--blue-lt)', textTransform: 'uppercase' }}>
          {p.swipe}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <CarChrome idx={1} total={3} label={p.chrome_label} mode="light" />
      </div>
    </div>
  );
}

// ca-q1 · Slots: COPETE, FECHA_1..5, IMPUESTO_1..5, PERIODO_1..5, CHROME_LABEL
function CalQ1(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    fecha_1: '[FECHA_1]', impuesto_1: '[IMPUESTO_1]', periodo_1: '[PERIODO_1]',
    fecha_2: '[FECHA_2]', impuesto_2: '[IMPUESTO_2]', periodo_2: '[PERIODO_2]',
    fecha_3: '[FECHA_3]', impuesto_3: '[IMPUESTO_3]', periodo_3: '[PERIODO_3]',
    fecha_4: '[FECHA_4]', impuesto_4: '[IMPUESTO_4]', periodo_4: '[PERIODO_4]',
    fecha_5: '[FECHA_5]', impuesto_5: '[IMPUESTO_5]', periodo_5: '[PERIODO_5]',
    chrome_label: '[CHROME_LABEL]',
  }, props);

  const items = [1, 2, 3, 4, 5].map(i => ({
    date: p['fecha_' + i], tax: p['impuesto_' + i], period: p['periodo_' + i],
  })).filter(it => it.date && it.tax);

  return (
    <div className="tpl" style={{ padding: 28, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup size={20} />
        <div className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{p.copete}</div>
      </div>

      {/* Las filas se centran: sin vacío abajo cuando hay menos de 5 */}
      <div style={{ marginTop: 16, flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center' }}>
        <div className="hair-navy" style={{ width: 36, marginBottom: 12 }}></div>
        {items.map((it, i) => (
          <CalRow key={i} date={it.date} tax={it.tax} period={it.period} />
        ))}
      </div>

      <CarChrome idx={2} total={3} label={p.chrome_label} />
    </div>
  );
}

// ca-q2 · Slots: COPETE, FECHA_1..5, IMPUESTO_1..5, PERIODO_1..5, CTA, CHROME_LABEL
function CalQ2(props) {
  const p = Object.assign({
    copete: '[COPETE]',
    fecha_1: '[FECHA_1]', impuesto_1: '[IMPUESTO_1]', periodo_1: '[PERIODO_1]',
    fecha_2: '[FECHA_2]', impuesto_2: '[IMPUESTO_2]', periodo_2: '[PERIODO_2]',
    fecha_3: '[FECHA_3]', impuesto_3: '[IMPUESTO_3]', periodo_3: '[PERIODO_3]',
    fecha_4: '[FECHA_4]', impuesto_4: '[IMPUESTO_4]', periodo_4: '[PERIODO_4]',
    fecha_5: '[FECHA_5]', impuesto_5: '[IMPUESTO_5]', periodo_5: '[PERIODO_5]',
    cta: '[CTA]', chrome_label: '[CHROME_LABEL]',
  }, props);

  const items = [1, 2, 3, 4, 5].map(i => ({
    date: p['fecha_' + i], tax: p['impuesto_' + i], period: p['periodo_' + i],
  })).filter(it => it.date && it.tax);

  return (
    <div className="tpl" style={{ padding: 28, display: 'flex', flexDirection: 'column',
      background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup size={20} />
        <div className="eyebrow" style={{ whiteSpace: 'nowrap' }}>{p.copete}</div>
      </div>

      <div style={{ marginTop: 16, flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center' }}>
        <div className="hair-navy" style={{ width: 36, marginBottom: 12 }}></div>
        {items.map((it, i) => (
          <CalRow key={i} date={it.date} tax={it.tax} period={it.period} compact={true} />
        ))}
        <div style={{ marginTop: 12, padding: '11px 14px', background: 'var(--navy)',
          color: 'var(--paper)', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 600 }}>
            {p.cta}
          </span>
          <span style={{ color: 'var(--blue-lt)', flexShrink: 0 }}>→</span>
        </div>
      </div>

      <CarChrome idx={3} total={3} label={p.chrome_label} />
    </div>
  );
}

// ───── Set B · Tips PyME ─────

// cb-cover · Slots: COPETE, TITULO_SANS, TITULO_SERIF, BAJADA, SWIPE_CTA, CHROME_LABEL
function TipCover(props) {
  const p = Object.assign({
    copete: '[COPETE]', titulo_sans: '[TITULO_SANS]', titulo_serif: '[TITULO_SERIF]',
    bajada: '[BAJADA]', swipe: '[SWIPE_CTA]', chrome_label: '[CHROME_LABEL]',
  }, props);

  const sansSize = fitSize(p.titulo_sans, [[12, 36], [20, 30], [28, 25]], 21);
  const serifSize = fitSize(p.titulo_serif, [[8, 56], [14, 46], [20, 38]], 32);

  return (
    <div className="tpl tint" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup size={20} />
        <div className="mono" style={{ whiteSpace: 'nowrap' }}>{p.copete}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>{p.copete}</div>
        <div className="display" style={{ fontSize: sansSize, fontWeight: 700,
          color: 'var(--navy-ink)', letterSpacing: '-0.025em', lineHeight: 1.02 }}>
          {p.titulo_sans}
        </div>
        <div className="display-serif" style={{ fontSize: serifSize, color: 'var(--blue-mid)',
          lineHeight: 0.94, marginTop: 4 }}>
          <em>{p.titulo_serif}</em>
        </div>
        <div className="lede" style={{ marginTop: 20, fontSize: 13.5, maxWidth: '92%' }}>{p.bajada}</div>
        <div style={{ marginTop: 24, fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 10.5,
          letterSpacing: '0.16em', color: 'var(--blue-mid)', textTransform: 'uppercase' }}>{p.swipe}</div>
      </div>

      <CarChrome idx={1} total={4} label={p.chrome_label} />
    </div>
  );
}

function TipSlide({ idx, total = 4, tip_num, titular, cuerpo, takeaway, chrome_label, mode = 'paper' }) {
  const isNavy = mode === 'navy';
  const tSize = fitSize(titular, [[34, 22], [52, 19], [72, 17]], 15.5);
  const cSize = fitSize(cuerpo, [[150, 12.5], [220, 11.5]], 10.5);
  const kSize = fitSize(takeaway, [[42, 18], [64, 16]], 14);
  const accent = isNavy ? 'var(--blue-lt)' : 'var(--blue-mid)';

  return (
    <div className={'tpl ' + (isNavy ? 'navy' : '')} style={{ padding: 28, display: 'flex',
      flexDirection: 'column', background: isNavy ? 'var(--navy)' : 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <Lockup mode={isNavy ? 'light' : 'dark'} size={20} />
        <div className="mono" style={{ color: isNavy ? 'rgba(247,249,252,0.55)' : 'var(--ink-55)',
          whiteSpace: 'nowrap' }}>
          Punto {String(tip_num).padStart(2, '0')}
        </div>
      </div>

      <div style={{ marginTop: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 14, marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300, fontStyle: 'italic', fontSize: 92,
            color: accent, lineHeight: 0.78, flexShrink: 0 }}>
            {tip_num}
          </div>
          <div style={{ width: 1, background: isNavy ? 'rgba(247,249,252,0.25)' : 'var(--hair-2)',
            margin: '8px 0', flexShrink: 0 }}></div>
          <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: 9.5, letterSpacing: '0.18em',
            color: accent, textTransform: 'uppercase', alignSelf: 'center' }}>
            {'Punto ' + tip_num + ' de ' + (total - 1)}
          </div>
        </div>

        <div className="display" style={{ fontSize: tSize, fontWeight: 700,
          color: isNavy ? 'var(--paper)' : 'var(--navy-ink)', letterSpacing: '-0.015em',
          lineHeight: 1.1, marginBottom: 12 }}>
          {titular}
        </div>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: cSize, lineHeight: 1.5,
          color: isNavy ? 'rgba(247,249,252,0.78)' : 'var(--ink-70)' }}>
          {cuerpo}
        </div>

        {takeaway ? (
          <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex',
            alignItems: 'flex-start', gap: 10 }}>
            <span className="asterisk" style={{ fontSize: 32, color: accent, flexShrink: 0 }}>*</span>
            <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 300, fontStyle: 'italic', fontSize: kSize,
              lineHeight: 1.22, color: isNavy ? 'var(--paper)' : 'var(--navy-ink)' }}>
              {takeaway}
            </div>
          </div>
        ) : null}
      </div>

      <CarChrome idx={idx} total={total} label={chrome_label} mode={isNavy ? 'light' : 'dark'} />
    </div>
  );
}

// cb-tip1..3 · Slots: TITULAR, CUERPO, TAKEAWAY, CHROME_LABEL
function TipSlide2(props) {
  return <TipSlide idx={2} tip_num={1}
    titular={props.titular || '[TITULAR]'} cuerpo={props.cuerpo || '[CUERPO]'}
    takeaway={props.takeaway || '[TAKEAWAY]'} chrome_label={props.chrome_label || '[CHROME_LABEL]'}
    mode={props.mode || 'paper'} />;
}
function TipSlide3(props) {
  return <TipSlide idx={3} tip_num={2}
    titular={props.titular || '[TITULAR]'} cuerpo={props.cuerpo || '[CUERPO]'}
    takeaway={props.takeaway || '[TAKEAWAY]'} chrome_label={props.chrome_label || '[CHROME_LABEL]'}
    mode={props.mode || 'navy'} />;
}
function TipSlide4(props) {
  return <TipSlide idx={4} tip_num={3}
    titular={props.titular || '[TITULAR]'} cuerpo={props.cuerpo || '[CUERPO]'}
    takeaway={props.takeaway || '[TAKEAWAY]'} chrome_label={props.chrome_label || '[CHROME_LABEL]'}
    mode={props.mode || 'paper'} />;
}

const EXAMPLES_CAROUSEL = {
  CalCover: {
    copete: 'Calendario impositivo',
    mes: 'Junio', anio: '2026',
    bajada: 'Vencimientos de ARCA, IGJ y previsionales del mes en un solo lugar.',
    swipe: 'Deslizá →',
    chrome_label: 'Cover',
  },
  CalQ1: {
    copete: 'Primera quincena',
    fecha_1: '07', impuesto_1: 'Aportes autónomos',     periodo_1: 'Cat. I-V · 05/26',
    fecha_2: '11', impuesto_2: 'Ingresos Brutos',       periodo_2: 'CABA · Anticipo 05/26',
    fecha_3: '12', impuesto_3: 'Convenio Multilateral', periodo_3: 'CM05 · 05/26',
    fecha_4: '13', impuesto_4: 'IVA',                   periodo_4: 'Posición 05/2026',
    fecha_5: '14', impuesto_5: 'Sueldos · F.931',       periodo_5: 'Devengado 05/2026',
    chrome_label: '07 al 14 · Junio 2026',
  },
  CalQ2: {
    copete: 'Segunda quincena',
    fecha_1: '17', impuesto_1: 'Monotributo',          periodo_1: 'Cuota mensual',
    fecha_2: '18', impuesto_2: 'SiCoRe',               periodo_2: 'Retenciones 05/26',
    fecha_3: '20', impuesto_3: 'Ganancias · Personas', periodo_3: 'Anticipo · Junio',
    fecha_4: '22', impuesto_4: 'Bienes Personales',    periodo_4: 'Anticipo · Junio',
    fecha_5: '26', impuesto_5: 'IVA · Grandes contr.', periodo_5: 'Posición 05/2026',
    cta: '¿Tu equipo tiene esto cubierto?',
    chrome_label: '17 al 26 · Junio 2026',
  },
  TipCover: {
    copete: 'Gestión PyME · Monotributo',
    titulo_sans: 'Monotributo',
    titulo_serif: '2026',
    bajada: 'Cuatro cosas que tu contador quisiera que entiendas antes de fin de año.',
    swipe: 'Deslizá →',
    chrome_label: 'Cover · 06/2026',
  },
  TipSlide2: {
    titular: 'La categoría no es para siempre.',
    cuerpo: 'ARCA revisa cada seis meses tu facturación, alquileres y consumos. Si te corrés de la escala, hay que recategorizar — sino llega la baja de oficio.',
    takeaway: 'Revisalo en enero y en julio.',
    chrome_label: 'Recategorización semestral',
    mode: 'paper',
  },
  TipSlide3: {
    titular: 'Tu obra social también suma.',
    cuerpo: 'El componente de obra social del monotributo cubre el grupo familiar primario, pero por cada integrante adicional pagás un aporte extra. Revisalo antes de incluir nuevos beneficiarios.',
    takeaway: 'Pedí el detalle a tu contador.',
    chrome_label: 'Componente OS',
    mode: 'navy',
  },
  TipSlide4: {
    titular: 'Facturación + medios de pago.',
    cuerpo: 'Los topes incluyen ingresos por todo concepto: ventas, alquileres, intereses. Y ARCA cruza tu CBU, billeteras y tarjetas. Lo que ves no es necesariamente lo que ellos ven.',
    takeaway: 'Conciliá todos tus canales.',
    chrome_label: 'Topes y cruces',
    mode: 'paper',
  },
};

Object.assign(window, {
  CarChrome, CalRow, CalCover, CalQ1, CalQ2,
  TipCover, TipSlide, TipSlide2, TipSlide3, TipSlide4,
  EXAMPLES_CAROUSEL,
});

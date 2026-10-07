// Videos animados de redes (formato aprobado por Juan el 07/10/2026).
//
// Una sola pantalla 9:16 (1080 × 1920) que se arma delante de quien mira: el titular entra palabra
// por palabra y abajo aparecen, al ritmo de lectura, gráficos que explican el tema (ventanas,
// tarjetas unidas por flechas, listas con íconos, una línea de tiempo, un número grande). Al final
// sube una banda azul noche con el logo y la web.
//
// Reglas que el código hace cumplir (pedidos de Juan y manual de marca):
//   · Colores: sólo los del manual, leídos de mdo-brand.css (papel de fondo, azul noche como único
//     acento, grises para lo secundario). Nada de hex a mano ni de un segundo color de acento:
//     «no meter muchos colores en un mismo video» (Juan, 07/10/2026).
//   · Íconos: sólo el set oficial del design system (mdo-templates/iconos-mdo.json, lo trae
//     sincronizar-diseno.js desde Icon.jsx). Flechas, cuadros y la cruz son formas, no íconos.
//   · Movimiento sin desenfoque, sin rebotes y sin contadores de números (manual, sección 6). Sin
//     sonido. Sin gente: es un video de texto y gráficos.
//   · Todo dentro de la zona segura de la historia y del Reel (ver ZONA).
//
// Lo usan scripts/video-animado.js (Puppeteer: arma la escena, la recorre cuadro por cuadro y
// la graba a MP4) y el panel de Dirección MDO (la misma escena en un iframe, para ver un video
// regenerado antes de que la rutina lo grabe; el panel lo publica junto a su página). La receta
// de cada video es un JSON («spec»): ver guiaReceta y validarSpec más abajo, y la regla del video
// en la skill de la rutina.
(function (raiz) {
  'use strict';

  const W = 1080, H = 1920;
  // Zona segura común a la historia y al Reel: arriba, la barra de progreso y el nombre de la
  // cuenta (~15 %); abajo, la barra de respuesta de la historia y el recorte 4:5 del Reel en el
  // feed (de 285 a 1635); a la derecha, la columna de botones del Reel (x > 960 desde la mitad).
  const ZONA = { izq: 120, ancho: 840, arriba: 300, limite: 1400, banda: 1440 };

  const TIPOS = ['texto', 'flujo', 'lista', 'comparacion', 'numero', 'ventana', 'linea', 'nota', 'cierre'];
  const GRAFICOS = ['flujo', 'lista', 'comparacion', 'numero', 'ventana', 'linea', 'nota'];
  const MESES = 'EFMAMJJASOND'.split('');

  // ---------- Cómo se escribe una receta (lo leen la rutina y el panel al pedirle una a Claude) ----------

  function guiaReceta(nombresIconos) {
    return [
      'Receta de un video animado de MDO Consultores: una sola pantalla 9:16 que se arma delante de quien mira.',
      'Forma: {"ceja": "…", "titular": "…", "bajada": "… (opcional)", "bloques": [ … ]}',
      '- ceja: rótulo corto del tema, hasta 34 caracteres. Ej.: "Laboral · RG 5907".',
      '- titular: hasta 70 caracteres. Afirma algo concreto; nunca es una pregunta.',
      '- bloques: de 1 a 5, en el orden en que aparecen, y al menos uno gráfico (cualquiera menos texto y cierre).',
      'Tipos de bloque:',
      '- {"tipo":"texto","texto":"hasta 170 caracteres"}: un párrafo. **Así** se resalta una frase (una o dos por video).',
      '- {"tipo":"flujo","pasos":[{"rotulo":"hasta 16","valor":"hasta 12","icono":"opcional","destacado":true}]}: 2 o 3 tarjetas unidas por flechas; "destacado" en la que importa, que va en azul noche.',
      '- {"tipo":"lista","marca":"tilde|cruz|numero|icono","items":["hasta 70", …]}: de 2 a 4 ítems; con marca "icono", cada ítem es {"texto":"…","icono":"…"}.',
      '- {"tipo":"comparacion","a":{"rotulo":"hasta 18","titulo":"hasta 26","lineas":["hasta 28", …]},"b":{…}}: dos columnas de hasta 3 líneas; "b" va resaltada.',
      '- {"tipo":"numero","antes":"opcional, hasta 10","valor":"hasta 8","despues":"opcional, hasta 12","texto":"hasta 110"}: un número grande. Sólo con un número que esté en la fuente.',
      '- {"tipo":"ventana","titulo":"hasta 26","icono":"opcional","filas":[{"etiqueta":"hasta 24","valor":"hasta 14","nuevo":true}]}: una ventana de sistema con 2 a 4 filas; "nuevo" en la fila que cambia.',
      '- {"tipo":"linea","etiquetas":"meses" o de 3 a 12 rótulos,"marcar":"todos" o [índices],"texto":"opcional, hasta 110"}: casilleros que se van pintando.',
      '- {"tipo":"nota","icono":"opcional","texto":"hasta 120"}: un recuadro con un dato a tener en cuenta.',
      '- {"tipo":"cierre","texto":"hasta 90","icono":"opcional"}: la última frase, qué haría el estudio, en condicional.',
      'Íconos válidos (sólo éstos): ' + (nombresIconos && nombresIconos.length ? nombresIconos.join(', ') : 'los del set del manual') + '.',
      'En total, no más de 60 palabras. Sin colores (los pone el diseño), sin emojis, sin signos de exclamación y sin preguntas al lector.',
    ].join('\n');
  }

  // ---------- Validación (sin DOM: corre también en Node antes de abrir el navegador) ----------

  const sinMarcas = (s) => String(s == null ? '' : s).replace(/\*\*/g, '');
  const palabras = (s) => sinMarcas(s).split(/\s+/).filter(Boolean).length;

  function textosDe(spec) {
    const out = [];
    const push = (donde, s) => { if (s != null && String(s).trim()) out.push({ donde, texto: sinMarcas(s) }); };
    push('ceja', spec.ceja); push('titular', spec.titular); push('bajada', spec.bajada);
    (spec.bloques || []).forEach((b, i) => {
      const d = 'bloque ' + (i + 1) + ' (' + b.tipo + ')';
      push(d, b.texto); push(d, b.titulo);
      (b.pasos || []).forEach((p) => { push(d, p.rotulo); push(d, p.valor); });
      (b.items || []).forEach((it) => push(d, typeof it === 'string' ? it : it.texto));
      (b.filas || []).forEach((f) => { push(d, f.etiqueta); push(d, f.valor); });
      ['a', 'b'].forEach((k) => { if (b[k]) { push(d, b[k].rotulo); push(d, b[k].titulo); (b[k].lineas || []).forEach((l) => push(d, l)); } });
      if (Array.isArray(b.etiquetas)) b.etiquetas.forEach((e) => push(d, e));
      push(d, b.antes); push(d, b.valor); push(d, b.despues);
    });
    return out;
  }

  // Devuelve { errores, avisos }. Un error frena el render; un aviso se informa.
  function validarSpec(spec, iconos) {
    const errores = [], avisos = [];
    const nombresIconos = Object.keys(iconos || {});
    const icono = (n, d) => { if (n != null && nombresIconos.length && !nombresIconos.includes(n)) errores.push(`${d}: el ícono «${n}» no está en el set del manual (${nombresIconos.join(', ')}).`); };
    const largo = (s, max, d) => { if (s != null && sinMarcas(s).length > max) errores.push(`${d}: «${sinMarcas(s).slice(0, 40)}…» tiene ${sinMarcas(s).length} caracteres (máximo ${max}).`); };
    if (!spec || typeof spec !== 'object') return { errores: ['La receta del video tiene que ser un objeto JSON.'], avisos };
    if (!spec.titular) errores.push('Falta el titular.');
    largo(spec.titular, 70, 'titular'); largo(spec.ceja, 34, 'ceja'); largo(spec.bajada, 110, 'bajada');
    const bloques = Array.isArray(spec.bloques) ? spec.bloques : [];
    if (bloques.length < 1 || bloques.length > 5) errores.push(`Van de 1 a 5 bloques (hay ${bloques.length}).`);
    if (!bloques.some((b) => GRAFICOS.includes(b && b.tipo))) errores.push('Falta al menos un bloque gráfico (flujo, lista, comparacion, numero, ventana, linea o nota): el video no es sólo texto.');
    bloques.forEach((b, i) => {
      const d = 'bloque ' + (i + 1);
      if (!b || !TIPOS.includes(b.tipo)) { errores.push(`${d}: tipo «${b && b.tipo}» desconocido (${TIPOS.join(', ')}).`); return; }
      if (b.tipo === 'texto') { if (!b.texto) errores.push(`${d}: falta «texto».`); largo(b.texto, 170, d); }
      if (b.tipo === 'cierre') { if (!b.texto) errores.push(`${d}: falta «texto».`); largo(b.texto, 90, d); icono(b.icono, d); }
      if (b.tipo === 'nota') { if (!b.texto) errores.push(`${d}: falta «texto».`); largo(b.texto, 120, d); icono(b.icono || 'buscar', d); }
      if (b.tipo === 'flujo') {
        const p = b.pasos || [];
        if (p.length < 2 || p.length > 3) errores.push(`${d}: el flujo lleva 2 o 3 pasos.`);
        p.forEach((x) => { if (!x || !x.valor) errores.push(`${d}: cada paso lleva «valor».`); largo(x && x.valor, 12, d); largo(x && x.rotulo, 16, d); icono(x && x.icono, d); });
      }
      if (b.tipo === 'lista') {
        const it = b.items || [];
        if (it.length < 2 || it.length > 4) errores.push(`${d}: la lista lleva de 2 a 4 ítems.`);
        if (b.marca && !['tilde', 'cruz', 'numero', 'icono'].includes(b.marca)) errores.push(`${d}: «marca» es tilde, cruz, numero o icono.`);
        it.forEach((x) => { largo(typeof x === 'string' ? x : x && x.texto, 70, d); if (b.marca === 'icono') icono(x && x.icono, d); });
      }
      if (b.tipo === 'comparacion') {
        ['a', 'b'].forEach((k) => {
          const c = b[k];
          if (!c || !c.titulo) { errores.push(`${d}: la comparación lleva «${k}» con «titulo».`); return; }
          largo(c.titulo, 26, d); largo(c.rotulo, 18, d);
          if ((c.lineas || []).length > 3) errores.push(`${d}: cada lado lleva hasta 3 líneas.`);
          (c.lineas || []).forEach((l) => largo(l, 28, d));
        });
      }
      if (b.tipo === 'numero') { if (!b.valor) errores.push(`${d}: falta «valor».`); largo(b.valor, 8, d); largo(b.antes, 10, d); largo(b.despues, 12, d); largo(b.texto, 110, d); }
      if (b.tipo === 'ventana') {
        if (!b.titulo) errores.push(`${d}: la ventana lleva «titulo».`);
        largo(b.titulo, 26, d); icono(b.icono, d);
        const f = b.filas || [];
        if (f.length < 2 || f.length > 4) errores.push(`${d}: la ventana lleva de 2 a 4 filas.`);
        f.forEach((x) => { largo(x && x.etiqueta, 24, d); largo(x && x.valor, 14, d); });
      }
      if (b.tipo === 'linea') {
        const e = b.etiquetas === 'meses' ? MESES : b.etiquetas;
        if (!Array.isArray(e) || e.length < 3 || e.length > 12) errores.push(`${d}: «etiquetas» es "meses" o una lista de 3 a 12.`);
        else if (e.length > 6) e.forEach((x) => largo(x, 3, d)); else e.forEach((x) => largo(x, 10, d));
        if (Array.isArray(b.marcar) && Array.isArray(e) && b.marcar.some((i) => !(i >= 0 && i < e.length))) errores.push(`${d}: «marcar» tiene posiciones que no existen (van de 0 a ${Array.isArray(e) ? e.length - 1 : 0}).`);
        largo(b.texto, 110, d);
      }
    });
    const total = textosDe(spec).reduce((a, x) => a + palabras(x.texto), 0);
    if (total > 90) errores.push(`Tiene ${total} palabras: no entra en una pantalla que se lea en el celular. Sacá un bloque.`);
    else if (total > 60) avisos.push(`Tiene ${total} palabras: para que se lea en el celular conviene no pasar de 60 (el armado achica la letra).`);
    if (/\?\s*$/.test(sinMarcas(spec.titular))) avisos.push('El titular es una pregunta: afirmar suele sonar más a estudio que preguntar.');
    return { errores, avisos, palabras: total };
  }

  // ---------- La escena ----------

  const CSS = `
#mdo-video{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:var(--paper);color:var(--navy);font-family:var(--font-body);-webkit-font-smoothing:antialiased;--k:1}
#mdo-video *{box-sizing:border-box}
#mdo-video .iso{position:absolute;right:-250px;top:110px;width:820px;opacity:.065;color:var(--navy)}
#mdo-video .iso svg{display:block;width:100%;height:auto;overflow:visible}
#mdo-video .cont{position:absolute;left:${ZONA.izq}px;width:${ZONA.ancho}px;top:${ZONA.arriba}px}
#mdo-video .chip{display:inline-block;background:var(--navy);color:var(--paper);font-family:var(--font-accent);font-weight:900;font-size:calc(var(--k)*27px);letter-spacing:.16em;text-transform:uppercase;padding:calc(var(--k)*13px) calc(var(--k)*24px);border-radius:999px;margin-bottom:calc(var(--k)*34px)}
#mdo-video h1{margin:0;font-size:calc(var(--k)*76px);line-height:1.08;font-weight:800;letter-spacing:-.012em;color:var(--navy);text-wrap:balance}
#mdo-video h1 .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.09em;margin-bottom:-.09em}
#mdo-video h1 .w>span{display:inline-block}
#mdo-video .bajada{margin-top:calc(var(--k)*22px);font-size:calc(var(--k)*40px);line-height:1.4;color:var(--ink-70);text-wrap:pretty}
#mdo-video .bloque{margin-top:calc(var(--k)*52px)}
#mdo-video b{font-weight:700;color:var(--navy)}
#mdo-video svg.ico{display:block;flex:none;overflow:visible}
#mdo-video .texto{margin:0;font-size:calc(var(--k)*42px);line-height:1.42;color:var(--ink-70);text-wrap:pretty}
#mdo-video .flujo{display:flex;align-items:center}
#mdo-video .card{position:relative;flex:1 1 0;min-width:0;height:calc(var(--k)*176px);border-radius:calc(var(--k)*22px);display:flex;flex-direction:column;justify-content:center;padding:0 calc(var(--k)*30px);background:var(--paper-warm);border:3px solid var(--grey)}
#mdo-video .card small{font-family:var(--font-accent);font-weight:700;font-size:calc(var(--k)*23px);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-40);white-space:nowrap;overflow:hidden}
#mdo-video .card strong{font-size:calc(var(--k)*54px);font-weight:800;line-height:1.1;white-space:nowrap;overflow:hidden;color:var(--navy)}
#mdo-video .card.dest{background:var(--navy);border-color:var(--navy)}
#mdo-video .card.dest small{color:var(--ink-25)} #mdo-video .card.dest strong{color:var(--paper)}
#mdo-video .card svg.ico{position:absolute;right:calc(var(--k)*24px);top:calc(var(--k)*22px);width:calc(var(--k)*40px);height:calc(var(--k)*40px);color:var(--ink-40)}
#mdo-video .card.dest svg.ico{color:var(--ink-25)}
#mdo-video .flecha{flex:none;width:calc(var(--k)*84px);height:calc(var(--k)*6px);margin:0 calc(var(--k)*8px) 0 calc(var(--k)*6px);background:var(--navy);position:relative;transform-origin:left center}
#mdo-video .flecha:after{content:'';position:absolute;right:calc(var(--k)*-8px);top:calc(var(--k)*-13px);border-style:solid;border-color:transparent transparent transparent var(--navy);border-width:calc(var(--k)*16px) 0 calc(var(--k)*16px) calc(var(--k)*22px)}
#mdo-video .lista{display:flex;flex-direction:column;gap:calc(var(--k)*24px)}
#mdo-video .fila{display:flex;align-items:center;gap:calc(var(--k)*28px)}
#mdo-video .marca{flex:none;width:calc(var(--k)*76px);height:calc(var(--k)*76px);display:flex;align-items:center;justify-content:center;color:var(--navy)}
#mdo-video .marca svg.ico{width:calc(var(--k)*66px);height:calc(var(--k)*66px)}
#mdo-video .marca.num{border-radius:calc(var(--k)*18px);background:var(--grey-pale);font-family:var(--font-accent);font-weight:900;font-size:calc(var(--k)*34px)}
#mdo-video .fila span{font-size:calc(var(--k)*40px);line-height:1.32;color:var(--ink-70);text-wrap:pretty}
#mdo-video .comp{display:flex;gap:calc(var(--k)*24px)}
#mdo-video .lado{flex:1 1 0;min-width:0;border-radius:calc(var(--k)*24px);padding:calc(var(--k)*32px);background:var(--paper-warm);border:3px solid var(--grey)}
#mdo-video .lado small{display:block;font-family:var(--font-accent);font-weight:700;font-size:calc(var(--k)*23px);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-40);margin-bottom:calc(var(--k)*10px)}
#mdo-video .lado strong{display:block;font-size:calc(var(--k)*42px);line-height:1.15;font-weight:800;color:var(--navy);margin-bottom:calc(var(--k)*16px);text-wrap:balance}
#mdo-video .lado p{margin:calc(var(--k)*10px) 0 0;font-size:calc(var(--k)*33px);line-height:1.3;text-wrap:balance;color:var(--ink-70);padding-left:calc(var(--k)*26px);position:relative}
#mdo-video .lado p:before{content:'';position:absolute;left:0;top:.62em;width:calc(var(--k)*12px);height:calc(var(--k)*4px);background:currentColor;opacity:.5}
#mdo-video .lado.dest{background:var(--navy);border-color:var(--navy)}
#mdo-video .lado.dest small{color:var(--ink-25)} #mdo-video .lado.dest strong{color:var(--paper)} #mdo-video .lado.dest p{color:var(--slate-60)}
#mdo-video .numero .cifra{display:flex;align-items:baseline;gap:calc(var(--k)*18px);overflow:hidden;padding-bottom:calc(var(--k)*6px)}
#mdo-video .numero .cifra>div{display:flex;align-items:baseline;gap:calc(var(--k)*18px)}
#mdo-video .numero .cifra em{font-style:normal;font-family:var(--font-accent);font-weight:900;font-size:calc(var(--k)*40px);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-40)}
#mdo-video .numero .cifra strong{font-size:calc(var(--k)*190px);line-height:.95;font-weight:800;letter-spacing:-.03em;color:var(--navy);font-variant-numeric:tabular-nums}
#mdo-video .numero .regla{height:calc(var(--k)*6px);background:var(--navy);width:calc(var(--k)*120px);margin:calc(var(--k)*18px) 0 calc(var(--k)*22px);transform-origin:left}
#mdo-video .numero p{margin:0;font-size:calc(var(--k)*40px);line-height:1.38;color:var(--ink-70);text-wrap:pretty}
#mdo-video .ventana{border-radius:calc(var(--k)*24px);background:var(--paper-warm);border:3px solid var(--grey);overflow:hidden}
#mdo-video .ventana .barra{height:calc(var(--k)*66px);background:var(--grey-pale);display:flex;align-items:center;gap:calc(var(--k)*12px);padding:0 calc(var(--k)*26px);border-bottom:3px solid var(--grey)}
#mdo-video .ventana .punto{width:calc(var(--k)*15px);height:calc(var(--k)*15px);border-radius:50%;background:var(--grey)}
#mdo-video .ventana .barra small{margin-left:calc(var(--k)*14px);flex:1;font-family:var(--font-accent);font-weight:700;font-size:calc(var(--k)*23px);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-55)}
#mdo-video .ventana .barra svg.ico{width:calc(var(--k)*38px);height:calc(var(--k)*38px);color:var(--ink-55)}
#mdo-video .vfila{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--k)*20px);padding:calc(var(--k)*20px) calc(var(--k)*32px);border-top:2px solid var(--grey-pale);position:relative}
#mdo-video .vfila:first-of-type{border-top:0}
#mdo-video .vfila span{font-size:calc(var(--k)*34px);color:var(--ink-70);white-space:nowrap;overflow:hidden}
#mdo-video .vfila strong{font-size:calc(var(--k)*34px);font-weight:800;color:var(--navy);white-space:nowrap}
#mdo-video .vfila.nuevo{background:var(--grey-pale)}
#mdo-video .vfila.nuevo span{color:var(--navy);font-weight:700}
#mdo-video .vfila.nuevo:before{content:'';position:absolute;left:0;top:0;bottom:0;width:calc(var(--k)*8px);background:var(--navy)}
#mdo-video .linea{display:flex;gap:calc(var(--k)*12px)}
#mdo-video .caja{flex:1 1 0;min-width:0;height:calc(var(--k)*68px);border-radius:calc(var(--k)*14px);background:var(--grey-pale);display:flex;align-items:center;justify-content:center;font-family:var(--font-accent);font-weight:900;font-size:calc(var(--k)*25px);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-40);white-space:nowrap;overflow:hidden}
#mdo-video .linea.palabras .caja{height:calc(var(--k)*96px);font-size:calc(var(--k)*24px)}
#mdo-video .linea-texto{margin:calc(var(--k)*20px) 0 0;font-size:calc(var(--k)*38px);line-height:1.35;color:var(--ink-70);text-wrap:pretty}
#mdo-video .nota{display:flex;gap:calc(var(--k)*26px);align-items:flex-start;padding:calc(var(--k)*30px) calc(var(--k)*34px);border-radius:calc(var(--k)*20px);background:var(--grey-pale);position:relative;overflow:hidden}
#mdo-video .nota:before{content:'';position:absolute;left:0;top:0;bottom:0;width:calc(var(--k)*8px);background:var(--navy)}
#mdo-video .nota svg.ico{width:calc(var(--k)*58px);height:calc(var(--k)*58px);color:var(--navy);margin-top:calc(var(--k)*2px)}
#mdo-video .nota p{margin:0;font-size:calc(var(--k)*38px);line-height:1.38;color:var(--ink-85);text-wrap:pretty}
#mdo-video .cierre{display:flex;gap:calc(var(--k)*26px);align-items:flex-start}
#mdo-video .cierre svg.ico{width:calc(var(--k)*84px);height:calc(var(--k)*84px);color:var(--navy);margin-top:calc(var(--k)*-4px)}
#mdo-video .cierre p{margin:0;font-size:calc(var(--k)*44px);line-height:1.3;font-weight:700;color:var(--navy);text-wrap:pretty}
#mdo-video .banda{position:absolute;left:0;right:0;top:${ZONA.banda}px;bottom:0;background:var(--navy);transform-origin:bottom center}
#mdo-video .firma{position:absolute;left:${ZONA.izq}px;right:${W - ZONA.izq - ZONA.ancho}px;top:${ZONA.banda + 52}px;height:108px;display:flex;align-items:center;justify-content:space-between;gap:30px}
#mdo-video .firma svg{display:block;width:250px;height:auto}
#mdo-video .firma span{font-family:var(--font-accent);font-weight:700;font-size:26px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-25);white-space:nowrap}
`;

  function armarVideoAnimado(spec, recursos, opciones) {
    const op = Object.assign({ raiz: document.body }, opciones || {});
    const iconos = (recursos && recursos.iconos) || {};
    const avisos = [];
    const doc = op.raiz.ownerDocument || document;
    const el = (tag, clase, padre) => { const n = doc.createElement(tag); if (clase) n.className = clase; if (padre) padre.appendChild(n); return n; };
    // **negrita** → <b>, sin innerHTML: el texto puede venir de Claude (Regenerar del panel).
    const conMarcas = (nodo, s) => {
      String(s == null ? '' : s).split(/\*\*(.+?)\*\*/).forEach((parte, i) => {
        if (!parte) return;
        if (i % 2) el('b', null, nodo).textContent = parte; else nodo.appendChild(doc.createTextNode(parte));
      });
      return nodo;
    };
    const SVGNS = 'http://www.w3.org/2000/svg';
    const icono = (nombre, padre) => {
      const s = doc.createElementNS(SVGNS, 'svg');
      s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
      s.setAttribute('stroke-width', '1.7'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
      s.setAttribute('class', 'ico');
      // La cruz no está en el set del manual: se dibuja como el tilde (círculo y trazo), con el mismo trazo.
      s.innerHTML = nombre === 'cruz' ? '<circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" />' : (iconos[nombre] || iconos.tilde || '');
      if (padre) padre.appendChild(s);
      return s;
    };

    // ---------- armado ----------
    op.raiz.querySelectorAll('#mdo-video, style[data-mdo-video]').forEach((n) => n.remove());
    const estilo = el('style', null, doc.head || op.raiz); estilo.setAttribute('data-mdo-video', ''); estilo.textContent = CSS;
    const escena = el('div', null, op.raiz); escena.id = 'mdo-video';
    const iso = el('div', 'iso', escena); iso.innerHTML = String((recursos && recursos.isotipo) || '').replace(/<\?xml[^>]*>/, '');
    const cont = el('div', 'cont', escena);
    const chip = spec.ceja ? el('div', 'chip', cont) : null; if (chip) chip.textContent = sinMarcas(spec.ceja);
    const h1 = el('h1', null, cont);
    const pals = sinMarcas(spec.titular).split(/\s+/).filter(Boolean);
    pals.forEach((w, i) => { const sp = el('span', 'w', h1); el('span', null, sp).textContent = w; if (i < pals.length - 1) h1.appendChild(doc.createTextNode(' ')); });
    const bajada = spec.bajada ? conMarcas(el('div', 'bajada', cont), spec.bajada) : null;

    const armados = (spec.bloques || []).map((b) => {
      const caja = el('div', 'bloque', cont);
      const r = { b, caja, partes: {} };
      if (b.tipo === 'texto') r.partes.p = conMarcas(el('p', 'texto', caja), b.texto);
      if (b.tipo === 'flujo') {
        const fila = el('div', 'flujo', caja); r.partes.cards = []; r.partes.flechas = [];
        (b.pasos || []).forEach((p, i) => {
          if (i) r.partes.flechas.push(el('div', 'flecha', fila));
          const c = el('div', 'card' + (p.destacado ? ' dest' : ''), fila);
          if (p.rotulo) el('small', null, c).textContent = sinMarcas(p.rotulo);
          el('strong', null, c).textContent = sinMarcas(p.valor);
          if (p.icono) icono(p.icono, c);
          r.partes.cards.push(c);
        });
      }
      if (b.tipo === 'lista') {
        const l = el('div', 'lista', caja); r.partes.filas = [];
        (b.items || []).forEach((it, i) => {
          const f = el('div', 'fila', l);
          const marca = b.marca || 'tilde';
          const m = el('div', 'marca' + (marca === 'numero' ? ' num' : ''), f);
          if (marca === 'numero') m.textContent = String(i + 1);
          else icono(marca === 'icono' ? (it.icono || 'tilde') : marca, m);
          conMarcas(el('span', null, f), typeof it === 'string' ? it : it.texto);
          r.partes.filas.push(f);
        });
      }
      if (b.tipo === 'comparacion') {
        const c = el('div', 'comp', caja); r.partes.lados = [];
        ['a', 'b'].forEach((k, i) => {
          const d = b[k] || {};
          const lado = el('div', 'lado' + ((d.destacado != null ? d.destacado : i === 1) ? ' dest' : ''), c);
          if (d.rotulo) el('small', null, lado).textContent = sinMarcas(d.rotulo);
          el('strong', null, lado).textContent = sinMarcas(d.titulo);
          (d.lineas || []).forEach((t) => conMarcas(el('p', null, lado), t));
          r.partes.lados.push(lado);
        });
      }
      if (b.tipo === 'numero') {
        const n = el('div', 'numero', caja);
        const cifra = el('div', 'cifra', n); const dentro = el('div', null, cifra);
        if (b.antes) el('em', null, dentro).textContent = sinMarcas(b.antes);
        el('strong', null, dentro).textContent = sinMarcas(b.valor);
        if (b.despues) el('em', null, dentro).textContent = sinMarcas(b.despues);
        r.partes.dentro = dentro;
        r.partes.regla = el('div', 'regla', n);
        if (b.texto) r.partes.p = conMarcas(el('p', null, n), b.texto);
      }
      if (b.tipo === 'ventana') {
        const v = el('div', 'ventana', caja); r.partes.ventana = v;
        const barra = el('div', 'barra', v);
        for (let i = 0; i < 3; i++) el('div', 'punto', barra);
        el('small', null, barra).textContent = sinMarcas(b.titulo);
        if (b.icono) r.partes.ico = icono(b.icono, barra);
        r.partes.filas = (b.filas || []).map((f) => {
          const fila = el('div', 'vfila' + (f.nuevo ? ' nuevo' : ''), v);
          el('span', null, fila).textContent = sinMarcas(f.etiqueta);
          if (f.valor) el('strong', null, fila).textContent = sinMarcas(f.valor);
          return fila;
        });
      }
      if (b.tipo === 'linea') {
        const et = b.etiquetas === 'meses' ? MESES : (b.etiquetas || []);
        const l = el('div', 'linea' + (et.length <= 6 ? ' palabras' : ''), caja);
        r.partes.cajas = et.map((e) => { const c = el('div', 'caja', l); c.textContent = sinMarcas(e); return c; });
        if (b.texto) r.partes.p = conMarcas(el('p', 'linea-texto', caja), b.texto);
      }
      if (b.tipo === 'nota') {
        const n = el('div', 'nota', caja); r.partes.nota = n;
        r.partes.ico = icono(b.icono || 'buscar', n);
        conMarcas(el('p', null, n), b.texto);
      }
      if (b.tipo === 'cierre') {
        const c = el('div', 'cierre', caja); r.partes.cierre = c;
        r.partes.ico = icono(b.icono || 'tilde', c);
        conMarcas(el('p', null, c), b.texto);
      }
      return r;
    });

    const banda = el('div', 'banda', escena);
    const firma = el('div', 'firma', escena);
    const logo = el('div', null, firma); logo.innerHTML = String((recursos && recursos.logo) || '').replace(/<\?xml[^>]*>/, '');
    el('span', null, firma).textContent = spec.web || 'mdo-consultores.com.ar';

    // ---------- que entre: textos que no caben en su caja y alto total ----------
    const achicar = (nodo, min) => {
      let f = parseFloat(getComputedStyle(nodo).fontSize);
      while (nodo.scrollWidth > nodo.clientWidth + 1 && f > min) { f -= 2; nodo.style.fontSize = f + 'px'; }
      if (nodo.scrollWidth > nodo.clientWidth + 1) avisos.push(`«${nodo.textContent.slice(0, 30)}» no entra en su caja: acortalo.`);
    };
    const ajustar = () => {
      escena.querySelectorAll('.card strong, .card small, .vfila span, .vfila strong, .caja').forEach((n) => { n.style.fontSize = ''; });
      escena.querySelectorAll('.card strong').forEach((n) => achicar(n, 30));
      escena.querySelectorAll('.card small, .caja').forEach((n) => achicar(n, 16));
      escena.querySelectorAll('.vfila span').forEach((n) => achicar(n, 24));
    };
    let k = 1;
    ajustar();
    while (cont.getBoundingClientRect().bottom > ZONA.limite && k > 0.8) {
      k = Math.round((k - 0.03) * 100) / 100; escena.style.setProperty('--k', k); ajustar();
    }
    const alto = Math.round(cont.getBoundingClientRect().bottom);
    if (alto > ZONA.limite) avisos.push(`El contenido baja hasta ${alto} px y la banda del logo empieza en ${ZONA.banda}: no entra. Sacá un bloque o acortá el texto.`);
    if (h1.getClientRects && Math.round(h1.getBoundingClientRect().height / (parseFloat(getComputedStyle(h1).lineHeight) || 80)) > 3) avisos.push('El titular ocupa más de 3 renglones: acortalo.');

    // ---------- tiempos ----------
    const salida = 'cubic-bezier(.16,1,.3,1)', suave = 'cubic-bezier(.2,0,.2,1)', dibujo = 'cubic-bezier(.33,.66,.2,1)', trazo = 'cubic-bezier(.45,0,.25,1)';
    const anims = [];
    const A = (n, kf, o) => { anims.push(n.animate(kf, Object.assign({ fill: 'both', easing: suave }, o))); };
    const sube = (n, t, dur, dy) => A(n, [{ opacity: 0, transform: `translateY(${dy == null ? 24 : dy}px)` }, { opacity: 1, transform: 'none' }], { duration: dur || 850, delay: t, easing: salida });
    const trazar = (svg, t, dur) => {
      svg.querySelectorAll('path,circle,rect,line,polyline,polygon,ellipse').forEach((f) => {
        const L = f.getTotalLength ? f.getTotalLength() : 0;
        if (!(L > 0)) return;
        f.style.strokeDasharray = L + ' ' + L;
        A(f, [{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: dur || 700, delay: t, easing: trazo });
      });
    };
    // Ritmo: quien mira lee a unas 3,3 palabras por segundo mientras la pantalla se sigue armando.
    // Cada bloque entra cuando terminó de armarse el anterior (más una pausa), sin dejar al lector
    // más de DEUDA ms atrás; la banda del logo sube recién cuando alcanzó a leer todo. Así no hay
    // pantallas quietas esperando y tampoco texto que se tapa antes de leerlo.
    const RITMO = 3.3, PAUSA = 500, DEUDA = 2500;
    const lee = (n) => n / RITMO * 1000;

    // Isotipo de fondo: se traza y queda como marca de agua que se corre despacio.
    const isoSvg = iso.querySelector('svg');
    if (isoSvg) {
      isoSvg.querySelectorAll('path,polygon').forEach((f) => {
        const L = f.getTotalLength(); f.style.stroke = 'currentColor'; f.style.strokeWidth = '3'; f.style.strokeDasharray = L + ' ' + L;
        A(f, [{ strokeDashoffset: L, fillOpacity: 0 }, { strokeDashoffset: 0, fillOpacity: 0, offset: 0.7 }, { strokeDashoffset: 0, fillOpacity: 1 }], { duration: 1800, delay: 100, easing: trazo });
      });
    }
    if (chip) A(chip, [{ opacity: 0, transform: 'translateX(-40px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 400, easing: salida });
    h1.querySelectorAll('.w>span').forEach((s, i) => A(s, [{ transform: 'translateY(105%)' }, { transform: 'none' }], { duration: 800, delay: 900 + i * 70, easing: salida }));
    let listoAnt = 900 + pals.length * 70 + 800, lectura = 900 + lee(pals.length), totalPalabras = pals.length;
    const marcas = [{ que: 'titular', t: 900, listo: listoAnt }];
    if (bajada) {
      const t = Math.max(listoAnt + 300, lectura - DEUDA), n = palabras(spec.bajada);
      sube(bajada, t, 900, 16);
      listoAnt = t + 900; lectura = Math.max(lectura, t) + lee(n); totalPalabras += n;
      marcas.push({ que: 'bajada', t, listo: listoAnt });
    }

    let fin = listoAnt;
    armados.forEach((r) => {
      const t = Math.max(listoAnt + PAUSA, lectura - DEUDA), b = r.b, P = r.partes;
      let listo = t + 900, pal = 0;
      if (b.tipo === 'texto') { sube(P.p, t, 900, 16); pal = palabras(b.texto); }
      if (b.tipo === 'flujo') {
        let u = t;
        P.cards.forEach((c, i) => {
          if (i) { A(P.flechas[i - 1], [{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: 650, delay: u, easing: dibujo }); u += 600; }
          A(c, i ? [{ opacity: 0, transform: 'translateX(-30px) scale(.96)' }, { opacity: 1, transform: 'none' }] : [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: u, easing: salida });
          const ic = c.querySelector('svg.ico'); if (ic) trazar(ic, u + 250, 700);
          u += 650;
        });
        listo = u + 300; pal = (b.pasos || []).reduce((a, p) => a + palabras(p.rotulo) + palabras(p.valor), 0);
      }
      if (b.tipo === 'lista') {
        let u = t;
        P.filas.forEach((f, i) => {
          A(f, [{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'none' }], { duration: 750, delay: u, easing: salida });
          const ic = f.querySelector('svg.ico'); if (ic) trazar(ic, u + 200, 650);
          const it = (b.items || [])[i]; const n = palabras(typeof it === 'string' ? it : it && it.texto);
          pal += n; u += Math.max(700, lee(n) * 0.5);
        });
        listo = u + 200;
      }
      if (b.tipo === 'comparacion') {
        sube(P.lados[0], t, 850, 26);
        A(P.lados[1], [{ opacity: 0, transform: 'translateX(30px)' }, { opacity: 1, transform: 'none' }], { duration: 850, delay: t + 700, easing: salida });
        let u = t + 1100;
        P.lados[1].querySelectorAll('p').forEach((p) => { A(p, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: u }); u += 260; });
        listo = u + 400;
        ['a', 'b'].forEach((k2) => { const d = b[k2] || {}; pal += palabras(d.titulo) + (d.lineas || []).reduce((a, l) => a + palabras(l), 0); });
      }
      if (b.tipo === 'numero') {
        A(P.dentro, [{ transform: 'translateY(105%)' }, { transform: 'none' }], { duration: 1000, delay: t, easing: salida });
        A(P.regla, [{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: 700, delay: t + 500, easing: dibujo });
        if (P.p) sube(P.p, t + 800, 900, 14);
        listo = t + 1700; pal = palabras(b.texto) + 1;
      }
      if (b.tipo === 'ventana') {
        A(P.ventana, [{ opacity: 0, transform: 'translateY(26px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 850, delay: t, easing: salida });
        if (P.ico) trazar(P.ico, t + 300, 700);
        let u = t + 650;
        P.filas.forEach((f, i) => {
          const nuevo = ((b.filas || [])[i] || {}).nuevo;
          if (nuevo) u += 450;
          A(f, [{ opacity: 0, transform: nuevo ? 'translateX(-40px)' : 'translateX(-14px)' }, { opacity: 1, transform: 'none' }], { duration: nuevo ? 800 : 600, delay: u, easing: salida });
          u += nuevo ? 700 : 330;
        });
        listo = u + 300; pal = (b.filas || []).reduce((a, f) => a + palabras(f.etiqueta) + palabras(f.valor), 0) + palabras(b.titulo);
      }
      if (b.tipo === 'linea') {
        P.cajas.forEach((c, i) => A(c, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: t + i * 45, easing: salida }));
        const n = P.cajas.length;
        const marcar = b.marcar === 'todos' || b.marcar == null ? P.cajas.map((_, i) => i) : (Array.isArray(b.marcar) ? b.marcar : []);
        let u = t + 500 + n * 45;
        const paso = n > 6 ? 150 : 380;
        marcar.forEach((i) => { const c = P.cajas[i]; if (!c) return; A(c, [{ background: 'var(--grey-pale)', color: 'var(--ink-40)' }, { background: 'var(--navy)', color: 'var(--paper)' }], { duration: 260, delay: u }); u += paso; });
        if (P.p) { sube(P.p, u + 100, 900, 14); u += 600; }
        listo = u + 200; pal = palabras(b.texto) + (n <= 6 ? n : 0);
      }
      if (b.tipo === 'nota') {
        sube(P.nota, t, 850, 20);
        trazar(P.ico, t + 250, 750);
        listo = t + 1000; pal = palabras(b.texto);
      }
      if (b.tipo === 'cierre') {
        sube(P.cierre, t, 900, 18);
        trazar(P.ico, t + 250, 800);
        listo = t + 1100; pal = palabras(b.texto);
      }
      totalPalabras += pal;
      marcas.push({ que: b.tipo, t, listo });
      fin = Math.max(fin, listo);
      listoAnt = listo; lectura = Math.max(lectura, t) + lee(pal);
    });

    const tBanda = Math.max(fin + 1800, lectura + 600);
    // La banda es una superficie grande: arranca de a poco (con la curva de salida saltaba ~100 px en
    // el primer cuadro y el control de saltos lo marcaba).
    A(banda, [{ transform: 'scaleY(0)' }, { transform: 'none' }], { duration: 1000, delay: tBanda, easing: trazo });
    A(firma, [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: tBanda + 650, easing: salida });
    const T = Math.ceil((tBanda + 650 + 900 + 2300) / 100) * 100;
    if (T > 30000) avisos.push(`Dura ${(T / 1000).toFixed(1)} s: conviene menos texto (ideal, de 14 a 24 s).`);
    // La marca de agua se corre despacio durante todo el video: la pantalla nunca queda quieta.
    A(iso, [{ transform: 'none' }, { transform: 'translate(-40px,30px)' }], { duration: T, easing: 'linear' });

    anims.forEach((a) => a.pause());
    if (typeof window !== 'undefined') window.__anims = anims;
    return { T, tPortada: Math.round(tBanda - 300), tBanda: Math.round(tBanda), k, alto, palabras: totalPalabras, marcas, avisos, anims };
  }

  // Para el panel: arma la escena y la repite en bucle. Con «reducir movimiento» queda quieta en la
  // pantalla completa (el cuadro de la portada).
  function reproducirVideoAnimado(spec, recursos, opciones) {
    const plan = armarVideoAnimado(spec, recursos, opciones);
    const ir = (ms) => plan.anims.forEach((a) => { a.currentTime = ms; });
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) { ir(plan.tPortada); return plan; }
    const vuelta = plan.T + 800, t0 = performance.now();
    const paso = (ahora) => { ir(Math.min((ahora - t0) % vuelta, plan.T - 1)); requestAnimationFrame(paso); };
    requestAnimationFrame(paso);
    return plan;
  }

  const api = { armarVideoAnimado, reproducirVideoAnimado, validarSpec, guiaReceta, textosDe, TIPOS, ZONA, W, H };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  // En el navegador, todo bajo un solo nombre (el panel lo carga en su propia página).
  else { raiz.MDOVideo = api; raiz.armarVideoAnimado = armarVideoAnimado; }
})(typeof window !== 'undefined' ? window : globalThis);

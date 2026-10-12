// Videos animados de redes, con la gramática del Manual de Marca 2026 tal como está en el design
// system «MDO - Diseño» (plantilla «4.5 · Historias de redes» y kit 4.4).
//
// Una sola pantalla 9:16 (1080 × 1920) que se arma delante de quien mira, en una de las dos familias
// del manual que usa el estudio para estos videos:
//   · novedades — fondo navy con degradé diagonal; fecha en Chivo itálica; titular en dos tonos
//     (primera parte en negrita clara, segunda en gris y peso normal); filete vertical de 1 px;
//     desarrollo; destacado en negrita abajo. Es la historia HA1 del design system.
//   · servicios — degradé claro con el isotipo gigante (~1,7 veces el lienzo) recortado por el borde;
//     volanta en Chivo con tracking; titular en mayúsculas con un segundo nivel en Chivo itálica;
//     regla horizontal de 104 px. Es la historia HB1.
// Sobre esa base entran, al ritmo de lectura, gráficos que explican el tema (fichas unidas por
// flechas, una ventana de sistema, listas numeradas o con íconos, casilleros, una cifra grande, dos
// columnas), dibujados con el mismo trazo fino de las placas. Al final el contenido se va y se traza
// el logo principal centrado: así firma la marca en el manual (sin chip, sin @handle, sin web).
//
// Reglas que el código hace cumplir:
//   · Colores y medidas: los de las plantillas del design system (citados abajo). Ninguno lo elige
//     la receta. Un solo acento: el azul noche (o el papel sobre navy). Juan, 07/10/2026: «no meter
//     muchos colores en un mismo video».
//   · Esquinas rectas (radio 0 en placas de redes), filetes de 1 px, sin sombras, sin bordes de color
//     de un solo lado, sin cápsulas. Cifras en peso 300, nunca en negrita.
//   · Íconos: sólo el set oficial (mdo-templates/iconos-mdo.json, sincronizado desde Icon.jsx).
//   · Movimiento sin desenfoque, sin rebotes y sin contadores. Sin sonido. Sin gente.
//   · Todo dentro de la zona segura de la historia y del Reel (ver ZONA).
//
// Lo usan scripts/video-animado.js (Puppeteer: arma la escena, la recorre cuadro por cuadro y la
// graba a MP4) y el panel de Dirección MDO (la misma escena en un iframe, para ver un video
// regenerado antes de que la rutina lo grabe; el panel lo publica junto a su página). La receta de
// cada video es un JSON («spec»): ver guiaReceta y validarSpec más abajo, y la regla del video en
// la skill de la rutina.
(function (raiz) {
  'use strict';

  const W = 1080, H = 1920;
  // Zona segura: la de «4.5 · Historias de redes» (250 px arriba, 320 abajo, 130 a los costados),
  // con el borde de arriba en 290 para que el Reel también entre en el recorte 4:5 del feed (285).
  const ZONA = { izq: 130, der: 130, arriba: 290, abajo: 320 };
  const FAMILIAS = ['novedades', 'servicios'];
  // Cómo se arma la pantalla: diseño y animación. Cada semana uno distinto (ver «tiempos»).
  const ESTILOS = ['armado', 'cortina', 'foco', 'trazo'];
  const TIPOS = ['texto', 'flujo', 'lista', 'comparacion', 'numero', 'ventana', 'linea', 'nota', 'cierre'];
  const GRAFICOS = ['flujo', 'lista', 'comparacion', 'numero', 'ventana', 'linea', 'nota'];
  const MESES = 'EFMAMJJASOND'.split('');

  const sinMarcas = (s) => String(s == null ? '' : s).replace(/\*\*/g, '');
  const palabras = (s) => sinMarcas(s).split(/\s+/).filter(Boolean).length;
  const estiloDe = (spec) => (ESTILOS.includes(spec && spec.estilo) ? spec.estilo : 'armado');
  const familiaDe = (spec) => (FAMILIAS.includes(spec && spec.familia) ? spec.familia : (spec && spec.fecha ? 'novedades' : 'servicios'));

  // ---------- Cómo se escribe una receta (lo leen la rutina y el panel al pedirle una a Claude) ----------

  function guiaReceta(nombresIconos) {
    return [
      'Receta de un video animado de MDO Consultores: una sola pantalla 9:16 con la gramática de las historias del Manual de Marca 2026 (design system «MDO - Diseño»).',
      'Forma: {"familia": "novedades" | "servicios", "fecha": "…", "volanta": "…", "titular": "…", "titular2": "…", "bajada": "… (opcional)", "bloques": [ … ]}',
      '- familia "novedades" (noticias, fondo navy): lleva "fecha" (ej. "08.10.2026", hasta 40 caracteres). familia "servicios" (gestión y servicios, fondo claro con el isotipo gigante): lleva "volanta" (ej. "Servicios · Outsourcing", hasta 34).',
      '- estilo: "armado", "cortina", "foco" o "trazo" (el diseño y la animación). armado: las palabras suben y los gráficos se dibujan. cortina: una banda tapa y destapa cada renglón y cada caja. foco: el titular arranca grande al centro y se acomoda, y los bloques se acercan (en servicios, fondo gris azulado con el texto en papel). trazo: primero las guías de la página, el titular letra por letra y el resto se desenrolla. Cada semana uno distinto del de la semana anterior; al regenerar, el mismo de la receta original salvo que el pedido diga otro.',
      '- titular: la primera parte de la frase, en negrita (hasta 52 caracteres). titular2: la continuación, en el segundo tono (hasta 52). Es UNA oración partida en dos pesos, no dos frases. Afirma algo concreto; nunca es una pregunta.',
      '- bloques: de 1 a 5, en el orden en que aparecen, y al menos uno gráfico (cualquiera menos texto y cierre).',
      'Tipos de bloque:',
      '- {"tipo":"texto","texto":"hasta 170 caracteres"}: el desarrollo. **Así** se marca en negrita una frase (una o dos por video).',
      '- {"tipo":"flujo","pasos":[{"rotulo":"hasta 16","valor":"hasta 10","icono":"opcional","destacado":true}]}: 2 o 3 fichas unidas por flechas; "destacado" en la que importa, que va rellena.',
      '- {"tipo":"lista","marca":"numero|icono|tilde|cruz","items":["hasta 64", …]}: de 2 a 4 renglones separados por filetes; con marca "icono", cada ítem es {"texto":"…","icono":"…"}.',
      '- {"tipo":"comparacion","a":{"rotulo":"hasta 18","titulo":"hasta 22","lineas":["hasta 26", …]},"b":{…}}: dos columnas de hasta 3 líneas; "b" va resaltada.',
      '- {"tipo":"numero","antes":"opcional, hasta 10","valor":"hasta 6","despues":"opcional, hasta 10","texto":"hasta 110"}: una cifra grande en peso fino. Sólo con un número que esté en la fuente.',
      '- {"tipo":"ventana","titulo":"hasta 26","icono":"opcional","filas":[{"etiqueta":"hasta 22","valor":"hasta 14","nuevo":true}]}: una ventana de sistema con 2 a 4 filas; "nuevo" en la fila que cambia.',
      '- {"tipo":"linea","etiquetas":"meses" o de 3 a 12 rótulos,"marcar":"todos" o [índices],"texto":"opcional, hasta 110"}: casilleros que se van pintando.',
      '- {"tipo":"nota","icono":"opcional","texto":"hasta 120"}: un recuadro con un dato a tener en cuenta.',
      '- {"tipo":"cierre","texto":"hasta 90","icono":"opcional"}: el destacado final, qué haría el estudio, en condicional.',
      'Íconos válidos (sólo éstos): ' + (nombresIconos && nombresIconos.length ? nombresIconos.join(', ') : 'los del set del manual') + '.',
      'En total, no más de 55 palabras. Sin colores (los pone el diseño), sin emojis, sin signos de exclamación y sin preguntas al lector.',
    ].join('\n');
  }

  // ---------- Validación (sin DOM: corre también en Node antes de abrir el navegador) ----------

  function textosDe(spec) {
    const out = [];
    const push = (donde, s) => { if (s != null && String(s).trim()) out.push({ donde, texto: sinMarcas(s) }); };
    push('fecha', spec.fecha); push('volanta', spec.volanta || spec.ceja);
    push('titular', spec.titular); push('titular2', spec.titular2); push('bajada', spec.bajada);
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

  // Devuelve { errores, avisos, palabras }. Un error frena el render; un aviso se informa.
  function validarSpec(spec, iconos) {
    const errores = [], avisos = [];
    const nombresIconos = Object.keys(iconos || {});
    const icono = (n, d) => { if (n != null && nombresIconos.length && !nombresIconos.includes(n)) errores.push(`${d}: el ícono «${n}» no está en el set del manual (${nombresIconos.join(', ')}).`); };
    const largo = (s, max, d) => { if (s != null && sinMarcas(s).length > max) errores.push(`${d}: «${sinMarcas(s).slice(0, 40)}…» tiene ${sinMarcas(s).length} caracteres (máximo ${max}).`); };
    if (!spec || typeof spec !== 'object') return { errores: ['La receta del video tiene que ser un objeto JSON.'], avisos, palabras: 0 };
    if (spec.familia != null && !FAMILIAS.includes(spec.familia)) errores.push(`«familia» es ${FAMILIAS.join(' o ')}.`);
    if (spec.estilo != null && !ESTILOS.includes(spec.estilo)) errores.push(`«estilo» es ${ESTILOS.join(', ')}.`);
    const fam = familiaDe(spec);
    if (!spec.titular) errores.push('Falta el titular.');
    largo(spec.titular, 52, 'titular'); largo(spec.titular2, 52, 'titular2');
    largo(spec.fecha, 40, 'fecha'); largo(spec.volanta || spec.ceja, 34, 'volanta'); largo(spec.bajada, 120, 'bajada');
    if (fam === 'novedades' && !spec.fecha && !(spec.volanta || spec.ceja)) avisos.push('Una novedad lleva fecha arriba (ej. "08.10.2026").');
    if (fam === 'servicios' && !(spec.volanta || spec.ceja)) avisos.push('Un video de servicios lleva volanta arriba (ej. "Servicios · Outsourcing").');
    const bloques = Array.isArray(spec.bloques) ? spec.bloques : [];
    if (bloques.length < 1 || bloques.length > 5) errores.push(`Van de 1 a 5 bloques (hay ${bloques.length}).`);
    if (!bloques.some((b) => GRAFICOS.includes(b && b.tipo))) errores.push('Falta al menos un bloque gráfico (flujo, lista, comparacion, numero, ventana, linea o nota): el video no es sólo texto.');
    bloques.forEach((b, i) => {
      const d = 'bloque ' + (i + 1);
      if (!b || !TIPOS.includes(b.tipo)) { errores.push(`${d}: tipo «${b && b.tipo}» desconocido (${TIPOS.join(', ')}).`); return; }
      if (b.tipo === 'texto') { if (!b.texto) errores.push(`${d}: falta «texto».`); largo(b.texto, 170, d); }
      if (b.tipo === 'cierre') { if (!b.texto) errores.push(`${d}: falta «texto».`); largo(b.texto, 90, d); icono(b.icono, d); }
      if (b.tipo === 'nota') { if (!b.texto) errores.push(`${d}: falta «texto».`); largo(b.texto, 120, d); icono(b.icono, d); }
      if (b.tipo === 'flujo') {
        const p = b.pasos || [];
        if (p.length < 2 || p.length > 3) errores.push(`${d}: el flujo lleva 2 o 3 pasos.`);
        p.forEach((x) => { if (!x || !x.valor) errores.push(`${d}: cada paso lleva «valor».`); largo(x && x.valor, p.length > 2 ? 8 : 10, d); largo(x && x.rotulo, 16, d); icono(x && x.icono, d); });
      }
      if (b.tipo === 'lista') {
        const it = b.items || [];
        if (it.length < 2 || it.length > 4) errores.push(`${d}: la lista lleva de 2 a 4 ítems.`);
        if (b.marca && !['tilde', 'cruz', 'numero', 'icono'].includes(b.marca)) errores.push(`${d}: «marca» es numero, icono, tilde o cruz.`);
        it.forEach((x) => { largo(typeof x === 'string' ? x : x && x.texto, 64, d); if (b.marca === 'icono') icono(x && x.icono, d); });
      }
      if (b.tipo === 'comparacion') {
        ['a', 'b'].forEach((k) => {
          const c = b[k];
          if (!c || !c.titulo) { errores.push(`${d}: la comparación lleva «${k}» con «titulo».`); return; }
          largo(c.titulo, 22, d); largo(c.rotulo, 18, d);
          if ((c.lineas || []).length > 3) errores.push(`${d}: cada lado lleva hasta 3 líneas.`);
          (c.lineas || []).forEach((l) => largo(l, 26, d));
        });
      }
      if (b.tipo === 'numero') { if (!b.valor) errores.push(`${d}: falta «valor».`); largo(b.valor, 6, d); largo(b.antes, 10, d); largo(b.despues, 10, d); largo(b.texto, 110, d); }
      if (b.tipo === 'ventana') {
        if (!b.titulo) errores.push(`${d}: la ventana lleva «titulo».`);
        largo(b.titulo, 26, d); icono(b.icono, d);
        const f = b.filas || [];
        if (f.length < 2 || f.length > 4) errores.push(`${d}: la ventana lleva de 2 a 4 filas.`);
        f.forEach((x) => { largo(x && x.etiqueta, 22, d); largo(x && x.valor, 14, d); });
      }
      if (b.tipo === 'linea') {
        const e = b.etiquetas === 'meses' ? MESES : b.etiquetas;
        if (!Array.isArray(e) || e.length < 3 || e.length > 12) errores.push(`${d}: «etiquetas» es "meses" o una lista de 3 a 12.`);
        else if (e.length > 6) e.forEach((x) => largo(x, 3, d)); else e.forEach((x) => largo(x, 10, d));
        if (Array.isArray(b.marcar) && Array.isArray(e) && b.marcar.some((i2) => !(i2 >= 0 && i2 < e.length))) errores.push(`${d}: «marcar» tiene posiciones que no existen (van de 0 a ${Array.isArray(e) ? e.length - 1 : 0}).`);
        largo(b.texto, 110, d);
      }
    });
    const total = textosDe(spec).reduce((a, x) => a + palabras(x.texto), 0);
    if (total > 85) errores.push(`Tiene ${total} palabras: no entra en una pantalla que se lea en el celular. Sacá un bloque.`);
    else if (total > 55) avisos.push(`Tiene ${total} palabras: para que se lea en el celular conviene no pasar de 55 (el armado achica la letra).`);
    if (/\?\s*$/.test(sinMarcas(spec.titular2 || spec.titular))) avisos.push('El titular es una pregunta: afirmar suele sonar más a estudio que preguntar.');
    return { errores, avisos, palabras: total };
  }

  // ---------- La escena ----------
  // Valores de las historias del design system: HA1 (novedades) y HB1/HB2 (servicios) de
  // «4.5 · Historias de redes». Donde mdo-brand.css tiene la variable exacta, se usa la variable.
  const CSS = `
#mdo-video{position:relative;width:${W}px;height:${H}px;overflow:hidden;font-family:var(--font-body);-webkit-font-smoothing:antialiased;--k:1}
#mdo-video *{box-sizing:border-box}
#mdo-video.novedades{background:linear-gradient(to top right,#00081d 0%,#091730 52%,#1b3055 100%);
  --tit:var(--paper);--tit2:#8f96a1;--cuerpo:#b8c0ca;--suave:#8a929d;--linea:rgba(248,246,246,.38);--linea-suave:rgba(248,246,246,.15);
  --trazo:rgba(248,246,246,.6);--relleno:var(--paper);--sobre-relleno:var(--navy);--sobre-relleno-suave:#515c6c;--cifra:#8f96a1}
#mdo-video.servicios{background:var(--gradient-light);
  --tit:var(--navy);--tit2:var(--navy);--cuerpo:#2b3f51;--suave:var(--ink-70);--linea:var(--navy);--linea-suave:rgba(6,22,45,.18);
  --trazo:rgba(6,22,45,.6);--relleno:var(--navy);--sobre-relleno:var(--paper);--sobre-relleno-suave:#9ba2ab;--cifra:var(--ink-70)}
#mdo-video .iso{position:absolute;top:-120px;right:-380px;width:1836px;opacity:.05;color:var(--navy)}
#mdo-video .iso svg{display:block;width:100%;height:auto;overflow:visible}
#mdo-video .cont{position:absolute;left:${ZONA.izq}px;right:${ZONA.der}px;top:${ZONA.arriba}px;bottom:${ZONA.abajo}px;display:flex;flex-direction:column}
#mdo-video.servicios .cont{justify-content:center}
/* Nada se achica para entrar: si no entra, se achica todo junto (--k). Sin esto, el filete o la
   regla de 1 px quedaban en 0 px cuando el contenido llegaba justo. */
#mdo-video .cont>*{flex-shrink:0}
#mdo-video .fecha{font-family:var(--font-accent);font-style:italic;font-weight:300;font-size:calc(var(--k)*32px);letter-spacing:.02em;color:var(--suave)}
#mdo-video .volanta{font-family:var(--font-accent);font-weight:700;font-size:calc(var(--k)*28px);letter-spacing:.24em;text-transform:uppercase;color:var(--tit)}
#mdo-video .t1,#mdo-video .t2{margin:0;text-wrap:balance}
#mdo-video.novedades .t1{margin-top:calc(var(--k)*100px);font-weight:700;font-size:calc(var(--k)*76px);line-height:1.06;letter-spacing:-.015em;color:var(--tit)}
#mdo-video.novedades .t2{font-weight:400;font-size:calc(var(--k)*76px);line-height:1.06;letter-spacing:-.015em;color:var(--tit2)}
#mdo-video.servicios .t1{margin-top:calc(var(--k)*60px);font-weight:700;font-size:calc(var(--k)*58px);line-height:1.14;letter-spacing:.03em;text-transform:uppercase;color:var(--tit)}
#mdo-video.servicios .t2{font-family:var(--font-accent);font-style:italic;font-weight:300;font-size:calc(var(--k)*58px);line-height:1.14;color:var(--tit2)}
#mdo-video .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-bottom:-.1em}
#mdo-video .w>span{display:inline-block}
#mdo-video .filete{width:1px;height:calc(var(--k)*130px);background:var(--linea);margin-top:calc(var(--k)*60px);transform-origin:top}
#mdo-video .regla{width:104px;height:1px;background:var(--linea);margin:calc(var(--k)*36px) 0 0;transform-origin:left}
#mdo-video .bajada{margin:calc(var(--k)*56px) 0 0;font-size:calc(var(--k)*34px);line-height:1.5;color:var(--cuerpo);max-width:92%;text-wrap:pretty}
#mdo-video .bloque{margin-top:calc(var(--k)*60px)}
#mdo-video.novedades .bloque.al-pie{margin-top:auto;padding-top:calc(var(--k)*48px)}
#mdo-video b{font-weight:700;color:var(--tit)}
#mdo-video svg.ico{display:block;flex:none;overflow:visible}
#mdo-video svg.marco{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
#mdo-video .rotulo{font-family:var(--font-accent);font-weight:400;font-size:calc(var(--k)*24px);letter-spacing:.2em;text-transform:uppercase;color:var(--suave);white-space:nowrap;overflow:hidden}
#mdo-video .texto{margin:0;font-size:calc(var(--k)*34px);line-height:1.5;color:var(--cuerpo);max-width:94%;text-wrap:pretty}
#mdo-video .flujo{display:flex;align-items:center}
#mdo-video .ficha{position:relative;flex:1 1 0;min-width:0;height:calc(var(--k)*170px);display:flex;flex-direction:column;justify-content:center;gap:calc(var(--k)*10px);padding:0 calc(var(--k)*28px)}
#mdo-video .ficha .fondo{position:absolute;inset:0;background:var(--relleno)}
#mdo-video .ficha .rotulo,#mdo-video .ficha strong{position:relative}
#mdo-video .ficha strong{font-size:calc(var(--k)*50px);font-weight:700;line-height:1.05;letter-spacing:-.015em;color:var(--tit);white-space:nowrap;overflow:hidden}
#mdo-video .ficha svg.ico{position:absolute;right:calc(var(--k)*22px);top:calc(var(--k)*20px);width:calc(var(--k)*38px);height:calc(var(--k)*38px);color:var(--suave)}
#mdo-video .ficha.con-ico .rotulo{margin-right:calc(var(--k)*44px)}
#mdo-video .ficha.dest strong{color:var(--sobre-relleno)} #mdo-video .ficha.dest .rotulo,#mdo-video .ficha.dest svg.ico{color:var(--sobre-relleno-suave)}
#mdo-video svg.flecha{flex:none;width:calc(var(--k)*92px);height:calc(var(--k)*28px);overflow:visible;color:var(--trazo)}
#mdo-video .lista{display:flex;flex-direction:column}
#mdo-video .fila{position:relative;display:flex;align-items:baseline;gap:calc(var(--k)*34px);padding:calc(var(--k)*26px) 0}
#mdo-video .fila .sep{position:absolute;left:0;right:0;top:0;height:1px;background:var(--linea-suave);transform-origin:left}
#mdo-video .fila .sep.abajo{top:auto;bottom:0}
#mdo-video .fila .num{flex:none;width:calc(var(--k)*86px);font-weight:300;font-size:calc(var(--k)*56px);line-height:1;letter-spacing:-.02em;color:var(--cifra);font-variant-numeric:tabular-nums}
#mdo-video .fila .marca{flex:none;width:calc(var(--k)*56px);align-self:center;color:var(--tit)}
#mdo-video .fila .marca svg.ico{width:calc(var(--k)*52px);height:calc(var(--k)*52px)}
#mdo-video .fila span.tx{font-size:calc(var(--k)*34px);line-height:1.38;color:var(--cuerpo);text-wrap:pretty}
#mdo-video .comp{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--k)*56px)}
#mdo-video .lado .cab{position:relative;padding-bottom:calc(var(--k)*16px)}
#mdo-video .lado .cab .sep{position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--linea);transform-origin:left}
#mdo-video .lado strong{display:block;margin-top:calc(var(--k)*20px);font-size:calc(var(--k)*40px);line-height:1.12;font-weight:700;letter-spacing:-.01em;color:var(--tit2);text-wrap:balance}
#mdo-video .lado p{position:relative;margin:0;padding:calc(var(--k)*18px) 0;font-size:calc(var(--k)*29px);line-height:1.38;color:var(--cuerpo);text-wrap:balance}
#mdo-video .lado p .sep{position:absolute;left:0;right:0;top:0;height:1px;background:var(--linea-suave);transform-origin:left}
#mdo-video .lado.dest .rotulo{color:var(--tit)} #mdo-video .lado.dest strong{color:var(--tit)}
#mdo-video .numero .cifra{display:flex;align-items:baseline;gap:calc(var(--k)*32px);overflow:hidden;padding-bottom:calc(var(--k)*8px)}
#mdo-video .numero .cifra>div{display:flex;align-items:baseline;gap:calc(var(--k)*32px)}
#mdo-video .numero .cifra strong{font-weight:300;font-size:calc(var(--k)*300px);line-height:.86;letter-spacing:-.04em;color:var(--tit);font-variant-numeric:tabular-nums}
#mdo-video .numero .cifra em{font-style:normal;font-family:var(--font-accent);font-weight:400;font-size:calc(var(--k)*38px);letter-spacing:.2em;text-transform:uppercase;color:var(--suave)}
#mdo-video .numero .filete{height:calc(var(--k)*100px);margin-top:calc(var(--k)*40px)}
#mdo-video .numero p{margin:calc(var(--k)*44px) 0 0;font-size:calc(var(--k)*34px);line-height:1.5;color:var(--cuerpo);text-wrap:pretty}
#mdo-video .ventana{position:relative}
#mdo-video .ventana .barra{position:relative;display:flex;align-items:center;gap:calc(var(--k)*18px);padding:calc(var(--k)*24px) calc(var(--k)*30px)}
#mdo-video .ventana .barra .rotulo{flex:1}
#mdo-video .ventana .barra svg.ico{width:calc(var(--k)*36px);height:calc(var(--k)*36px);color:var(--suave)}
#mdo-video .ventana .sep{position:absolute;left:0;right:0;height:1px;background:var(--linea-suave);transform-origin:left}
#mdo-video .vfila{position:relative;display:flex;justify-content:space-between;align-items:baseline;gap:calc(var(--k)*20px);padding:calc(var(--k)*22px) calc(var(--k)*30px)}
#mdo-video .vfila .sep{top:0}
#mdo-video .vfila .tinte{position:absolute;inset:0;background:var(--linea-suave)}
#mdo-video .vfila span,#mdo-video .vfila strong{position:relative}
#mdo-video .vfila span{font-size:calc(var(--k)*32px);color:var(--cuerpo);white-space:nowrap;overflow:hidden}
#mdo-video .vfila strong{font-size:calc(var(--k)*32px);font-weight:700;color:var(--tit);white-space:nowrap}
#mdo-video .vfila.nuevo span{color:var(--tit);font-weight:700}
#mdo-video .linea{display:flex;gap:calc(var(--k)*12px)}
#mdo-video .caja{position:relative;flex:1 1 0;min-width:0;height:calc(var(--k)*62px);display:flex;align-items:center;justify-content:center;font-family:var(--font-accent);font-weight:700;font-size:calc(var(--k)*24px);letter-spacing:.06em;text-transform:uppercase;color:var(--suave);white-space:nowrap;overflow:hidden}
#mdo-video .linea.palabras .caja{height:calc(var(--k)*92px);font-size:calc(var(--k)*22px);letter-spacing:.12em}
#mdo-video .caja .fondo{position:absolute;inset:0;background:var(--linea-suave)}
#mdo-video .caja i{position:relative;font-style:normal}
#mdo-video .linea-texto{margin:calc(var(--k)*24px) 0 0;font-size:calc(var(--k)*32px);line-height:1.45;color:var(--cuerpo);text-wrap:pretty}
#mdo-video .nota{position:relative;display:flex;gap:calc(var(--k)*26px);align-items:flex-start;padding:calc(var(--k)*30px) calc(var(--k)*32px)}
#mdo-video .nota svg.ico{width:calc(var(--k)*50px);height:calc(var(--k)*50px);color:var(--tit)}
#mdo-video .nota p{margin:0;font-size:calc(var(--k)*32px);line-height:1.45;color:var(--cuerpo);text-wrap:pretty}
#mdo-video .cierre{display:flex;gap:calc(var(--k)*24px);align-items:flex-start}
#mdo-video .cierre svg.ico{width:calc(var(--k)*50px);height:calc(var(--k)*50px);color:var(--tit)}
#mdo-video .cierre p{margin:0;font-weight:700;font-size:calc(var(--k)*34px);line-height:1.4;color:var(--tit);max-width:90%;text-wrap:pretty}
#mdo-video .firma{position:absolute;left:50%;top:50%;width:460px;transform:translate(-50%,-50%);color:var(--tit)}
#mdo-video .firma svg{display:block;width:100%;height:auto;overflow:visible}
/* Estilos: además de moverse distinto, cada uno toma otra historia de «4.5 · Historias de redes»
   (servicios: armado HB1, cortina HB3, foco HB4, trazo HB2; novedades: HA1 en los cuatro). */
#mdo-video{--telon:var(--navy)}
#mdo-video.novedades{--telon:#00081d}
#mdo-video .velo{position:absolute;background:var(--tit);transform:scaleX(0);pointer-events:none}
#mdo-video .velo.telon{background:var(--telon)}
#mdo-video .guia{position:absolute;background:var(--linea-suave);pointer-events:none}
#mdo-video.servicios.e-cortina{background:linear-gradient(135deg,#6d788a 0%,#a3a8b1 30%,#e8e6e3 52%,#a3a8b1 76%,#647083 100%)}
#mdo-video.servicios.e-cortina .iso,#mdo-video.servicios.e-foco .iso{top:-180px;left:-340px;right:auto;opacity:.06}
#mdo-video.servicios.e-trazo{background:radial-gradient(95% 85% at 8% 82%,#ffffff 0%,#eef3ea 22%,#c6cbce 48%,#8a94a0 76%,#5c677f 100%)}
#mdo-video.servicios.e-trazo .iso{opacity:.06}
#mdo-video.servicios.e-foco{background:#7c8392;--tit:var(--paper);--tit2:var(--paper);--cuerpo:#f0f0f0;--suave:rgba(248,246,246,.78);--linea:var(--paper);--linea-suave:rgba(248,246,246,.3);
  --trazo:rgba(248,246,246,.75);--relleno:var(--paper);--sobre-relleno:var(--navy);--sobre-relleno-suave:#515c6c;--cifra:rgba(248,246,246,.82)}
#mdo-video.servicios.e-foco .iso{filter:brightness(0) invert(1);opacity:.08}
#mdo-video.servicios.e-foco .cont{justify-content:flex-end}
#mdo-video.servicios.e-foco .t1{margin-top:calc(var(--k)*48px);font-size:calc(var(--k)*72px);line-height:1.08;letter-spacing:-.01em;text-transform:none}
#mdo-video.servicios.e-foco .t2{font-size:calc(var(--k)*72px);line-height:1.08}
`;

  function armarVideoAnimado(spec, recursos, opciones) {
    const op = Object.assign({ raiz: document.body }, opciones || {});
    const rec = recursos || {};
    const iconos = rec.iconos || {};
    const avisos = [];
    const fam = familiaDe(spec);
    const est = estiloDe(spec);
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
    const svgEl = (tag, attrs, padre) => { const n = doc.createElementNS(SVGNS, tag); Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, v)); if (padre) padre.appendChild(n); return n; };
    const icono = (nombre, padre) => {
      const s = svgEl('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'ico' });
      // La cruz no está en el set del manual: se dibuja como el tilde (círculo y trazo), con el mismo trazo.
      s.innerHTML = nombre === 'cruz' ? '<circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" />' : (iconos[nombre] || iconos.tilde || '');
      if (padre) padre.appendChild(s);
      return s;
    };
    // El contorno de una ficha, una ventana, un casillero o una nota: un rectángulo de trazo fino que
    // se puede dibujar (pathLength normaliza el largo para el dasharray).
    const marco = (padre, grosor) => {
      const s = svgEl('svg', { class: 'marco', 'aria-hidden': 'true' }, padre);
      return svgEl('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'none', stroke: 'currentColor', 'stroke-width': String(grosor || 2), pathLength: '100' }, s);
    };
    const palabrasEn = (nodo, texto) => {
      const ws = sinMarcas(texto).split(/\s+/).filter(Boolean);
      ws.forEach((w, i) => { const sp = el('span', 'w', nodo); el('span', null, sp).textContent = w; if (i < ws.length - 1) nodo.appendChild(doc.createTextNode(' ')); });
      return ws.length;
    };

    // ---------- armado ----------
    op.raiz.querySelectorAll('#mdo-video, style[data-mdo-video]').forEach((n) => n.remove());
    const estilo = el('style', null, doc.head || op.raiz); estilo.setAttribute('data-mdo-video', ''); estilo.textContent = CSS;
    const escena = el('div', fam + ' e-' + est, op.raiz); escena.id = 'mdo-video';
    let iso = null;
    if (fam === 'servicios' && rec.isotipo) { iso = el('div', 'iso', escena); iso.innerHTML = String(rec.isotipo).replace(/<\?xml[^>]*>/, ''); }
    const cont = el('div', 'cont', escena);
    let arriba = null;
    if (fam === 'novedades' && (spec.fecha || spec.volanta || spec.ceja)) { arriba = el('div', 'fecha', cont); arriba.textContent = sinMarcas(spec.fecha || spec.volanta || spec.ceja); }
    if (fam === 'servicios' && (spec.volanta || spec.ceja)) { arriba = el('div', 'volanta', cont); arriba.textContent = sinMarcas(spec.volanta || spec.ceja); }
    const t1 = el('h1', 't1', cont); const n1 = palabrasEn(t1, spec.titular);
    let t2 = null, n2 = 0;
    if (spec.titular2) { t2 = el('h2', 't2', cont); n2 = palabrasEn(t2, spec.titular2); }
    const raya = fam === 'novedades' ? el('div', 'filete', cont) : el('div', 'regla', cont);
    // trazo: el titular (y la volanta o la fecha) se escriben letra por letra.
    if (est === 'trazo') {
      [arriba, t1, t2].forEach((n) => {
        if (!n) return;
        const destinos = n.querySelectorAll('.w>span');
        (destinos.length ? [...destinos] : [n]).forEach((d) => { const tx = d.textContent; d.textContent = ''; [...tx].forEach((ch) => { el('span', 'l', d).textContent = ch; }); });
      });
    }
    const bajada = spec.bajada ? conMarcas(el('p', 'bajada', cont), spec.bajada) : null;

    const bloquesSpec = spec.bloques || [];
    const armados = bloquesSpec.map((b, ib) => {
      const caja = el('div', 'bloque', cont);
      if (b.tipo === 'cierre' && ib === bloquesSpec.length - 1) caja.classList.add('al-pie');
      const r = { b, caja, partes: {} };
      if (b.tipo === 'texto') r.partes.p = conMarcas(el('p', 'texto', caja), b.texto);
      if (b.tipo === 'flujo') {
        const fila = el('div', 'flujo', caja); r.partes.fichas = []; r.partes.flechas = [];
        (b.pasos || []).forEach((p, i) => {
          if (i) {
            const f = svgEl('svg', { class: 'flecha', viewBox: '0 0 92 28', 'aria-hidden': 'true' }, fila);
            const linea = svgEl('path', { d: 'M4 14H84', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', pathLength: '100' }, f);
            const punta = svgEl('path', { d: 'M74 5l10 9-10 9', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: '100' }, f);
            r.partes.flechas.push({ linea, punta });
          }
          const c = el('div', 'ficha' + (p.destacado ? ' dest' : '') + (p.icono ? ' con-ico' : ''), fila);
          const fondo = p.destacado ? el('div', 'fondo', c) : null;
          const borde = marco(c, 2); borde.style.color = 'var(--trazo)';
          const rot = p.rotulo ? el('div', 'rotulo', c) : null; if (rot) rot.textContent = sinMarcas(p.rotulo);
          const val = el('strong', null, c); val.textContent = sinMarcas(p.valor);
          const ic = p.icono ? icono(p.icono, c) : null;
          r.partes.fichas.push({ c, fondo, borde, rot, val, ic });
        });
      }
      if (b.tipo === 'lista') {
        const l = el('div', 'lista', caja); r.partes.filas = [];
        const marca = b.marca || 'numero';
        const items = b.items || [];
        items.forEach((it, i) => {
          const f = el('div', 'fila', l);
          const sep = el('div', 'sep', f);
          const sepAbajo = i === items.length - 1 ? el('div', 'sep abajo', f) : null;
          let m;
          if (marca === 'numero') { m = el('span', 'num', f); m.textContent = String(i + 1).padStart(2, '0'); }
          else { m = el('span', 'marca', f); icono(marca === 'icono' ? ((it && it.icono) || 'tilde') : marca, m); }
          const tx = conMarcas(el('span', 'tx', f), typeof it === 'string' ? it : it && it.texto);
          r.partes.filas.push({ f, sep, sepAbajo, m, tx });
        });
      }
      if (b.tipo === 'comparacion') {
        const c = el('div', 'comp', caja); r.partes.lados = [];
        ['a', 'b'].forEach((k, i) => {
          const d = b[k] || {};
          const lado = el('div', 'lado' + ((d.destacado != null ? d.destacado : i === 1) ? ' dest' : ''), c);
          const cab = el('div', 'cab', lado);
          const rot = el('div', 'rotulo', cab); rot.textContent = sinMarcas(d.rotulo || '');
          const sep = el('div', 'sep', cab);
          const tit = el('strong', null, lado); tit.textContent = sinMarcas(d.titulo);
          const lineas = (d.lineas || []).map((t) => { const p = el('p', null, lado); const s2 = el('span', 'sep', p); conMarcas(p, t); return { p, sep: s2 }; });
          r.partes.lados.push({ lado, rot, sep, tit, lineas });
        });
      }
      if (b.tipo === 'numero') {
        const n = el('div', 'numero', caja);
        const cifra = el('div', 'cifra', n); const dentro = el('div', null, cifra);
        if (b.antes) el('em', null, dentro).textContent = sinMarcas(b.antes);
        el('strong', null, dentro).textContent = sinMarcas(b.valor);
        const despues = b.despues ? el('em', null, dentro) : null; if (despues) despues.textContent = sinMarcas(b.despues);
        r.partes.dentro = dentro;
        r.partes.raya = el('div', 'filete', n);
        if (b.texto) r.partes.p = conMarcas(el('p', null, n), b.texto);
      }
      if (b.tipo === 'ventana') {
        const v = el('div', 'ventana', caja);
        const borde = marco(v, 2); borde.style.color = 'var(--trazo)';
        const barra = el('div', 'barra', v);
        const rot = el('div', 'rotulo', barra); rot.textContent = sinMarcas(b.titulo);
        const ic = b.icono ? icono(b.icono, barra) : null;
        const filas = (b.filas || []).map((f) => {
          const fila = el('div', 'vfila' + (f.nuevo ? ' nuevo' : ''), v);
          const tinte = f.nuevo ? el('div', 'tinte', fila) : null;
          const sep = el('div', 'sep', fila);
          el('span', null, fila).textContent = sinMarcas(f.etiqueta);
          if (f.valor) el('strong', null, fila).textContent = sinMarcas(f.valor);
          return { fila, tinte, sep, nuevo: !!f.nuevo };
        });
        r.partes = { v, borde, barra, rot, ic, filas };
      }
      if (b.tipo === 'linea') {
        const et = b.etiquetas === 'meses' ? MESES : (b.etiquetas || []);
        const l = el('div', 'linea' + (et.length <= 6 ? ' palabras' : ''), caja);
        r.partes.cajas = et.map((e) => {
          const c = el('div', 'caja', l);
          const fondo = el('div', 'fondo', c);
          const borde = marco(c, 2); borde.style.color = 'var(--trazo)';
          const letra = el('i', null, c); letra.textContent = sinMarcas(e);
          return { c, fondo, borde, letra };
        });
        if (b.texto) r.partes.p = conMarcas(el('p', 'linea-texto', caja), b.texto);
      }
      if (b.tipo === 'nota') {
        const n = el('div', 'nota', caja);
        const borde = marco(n, 1.5); borde.style.color = 'var(--linea)';
        const ic = icono(b.icono || 'buscar', n);
        const p = conMarcas(el('p', null, n), b.texto);
        r.partes = { n, borde, ic, p };
      }
      if (b.tipo === 'cierre') {
        const c = el('div', 'cierre', caja);
        const ic = b.icono ? icono(b.icono, c) : null;
        const p = conMarcas(el('p', null, c), b.texto);
        r.partes = { c, ic, p };
      }
      return r;
    });

    // La firma: el logo principal centrado (papel sobre navy, navy sobre el degradé claro).
    const firma = el('div', 'firma', escena);
    firma.innerHTML = String((fam === 'novedades' || est === 'foco' ? rec.logoClaro : rec.logoOscuro) || rec.logo || '').replace(/<\?xml[^>]*>/, '');

    // ---------- que entre: textos que no caben en su caja y alto total ----------
    const achicar = (nodo, min) => {
      let f = parseFloat(getComputedStyle(nodo).fontSize);
      while (nodo.scrollWidth > nodo.clientWidth + 1 && f > min) { f -= 2; nodo.style.fontSize = f + 'px'; }
      if (nodo.scrollWidth > nodo.clientWidth + 1) avisos.push(`«${nodo.textContent.slice(0, 30)}» no entra en su caja: acortalo.`);
    };
    const ajustar = () => {
      escena.querySelectorAll('.ficha strong, .ficha .rotulo, .vfila span, .vfila strong, .caja').forEach((n) => { n.style.fontSize = ''; });
      escena.querySelectorAll('.ficha strong').forEach((n) => achicar(n, 28));
      escena.querySelectorAll('.ficha .rotulo, .caja').forEach((n) => achicar(n, 16));
      escena.querySelectorAll('.vfila span').forEach((n) => achicar(n, 22));
    };
    // Lo que ocupa el contenido (sin el aire que empuja el destacado al pie).
    const ocupado = () => {
      let tot = 0;
      [...cont.children].forEach((c) => {
        const cs = getComputedStyle(c);
        tot += c.getBoundingClientRect().height + (c.classList.contains('al-pie') ? 0 : parseFloat(cs.marginTop) + parseFloat(cs.marginBottom));
      });
      return tot;
    };
    const disponible = H - ZONA.arriba - ZONA.abajo;
    let k = 1;
    ajustar();
    while (ocupado() > disponible && k > 0.8) { k = Math.round((k - 0.03) * 100) / 100; escena.style.setProperty('--k', k); ajustar(); }
    const alto = Math.round(ZONA.arriba + ocupado());
    if (ocupado() > disponible) avisos.push(`El contenido ocupa ${Math.round(ocupado())} px y la zona segura deja ${disponible}: no entra. Sacá un bloque o acortá el texto.`);
    const renglones = (n) => Math.round(n.getBoundingClientRect().height / (parseFloat(getComputedStyle(n).lineHeight) || 80));
    if (renglones(t1) + (t2 ? renglones(t2) : 0) > 4) avisos.push('El titular ocupa más de 4 renglones: acortalo.');

    // ---------- tiempos ----------
    // Cuatro estilos (spec.estilo), para que el video no se vea igual todas las semanas (Juan,
    // 13/10/2026: «que los videos varíen en diseño cada semana, que no sean siempre las mismas
    // animaciones»). Todos con la gramática del manual: sin desenfoque, sin rebotes, un solo acento.
    //   armado  — las palabras suben con máscara y los gráficos se dibujan (el que aprobó Juan el 08/10).
    //   cortina — una banda del color del titular tapa cada renglón o cada caja y la destapa ya escrita.
    //   foco    — el titular arranca grande en el centro de la pantalla y se acomoda; los bloques se acercan.
    //   trazo   — primero las guías de la página; el titular se escribe letra por letra y el resto se desenrolla.
    const salida = 'cubic-bezier(.16,1,.3,1)', suave = 'cubic-bezier(.2,0,.2,1)', dibujo = 'cubic-bezier(.33,.66,.2,1)', trazo = 'cubic-bezier(.45,0,.25,1)';
    const telon = 'cubic-bezier(.7,0,.3,1)', camara = 'cubic-bezier(.65,0,.35,1)';
    const anims = [];
    const A = (n, kf, o) => { anims.push(n.animate(kf, Object.assign({ fill: 'both', easing: suave }, o))); };
    const aparece = (n, t, dur, dy) => A(n, [{ opacity: 0, transform: `translateY(${dy == null ? 18 : dy}px)` }, { opacity: 1, transform: 'none' }], { duration: dur || 850, delay: t, easing: salida });
    const funde = (n, t, dur) => A(n, [{ opacity: 0 }, { opacity: 1 }], { duration: dur || 600, delay: t });
    const traza = (rect, t, dur) => A(rect, [{ strokeDasharray: '100 100', strokeDashoffset: 100 }, { strokeDasharray: '100 100', strokeDashoffset: 0 }], { duration: dur || 800, delay: t, easing: trazo });
    const regla = (n, t, dur, eje) => A(n, [{ transform: eje === 'y' ? 'scaleY(0)' : 'scaleX(0)' }, { transform: 'none' }], { duration: dur || 700, delay: t, easing: dibujo });
    const trazarIcono = (svg, t, dur) => {
      if (!svg) return;
      svg.querySelectorAll('path,circle,rect,line,polyline,polygon,ellipse').forEach((f) => {
        const L = f.getTotalLength ? f.getTotalLength() : 0;
        if (!(L > 0)) return;
        f.style.strokeDasharray = L + ' ' + L;
        A(f, [{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: dur || 700, delay: t, easing: trazo });
      });
    };
    // Las palabras suben desde abajo de su renglón, con máscara (el estilo que aprobó Juan).
    const subenPalabras = (nodo, t, paso) => { nodo.querySelectorAll('.w>span').forEach((s, i) => A(s, [{ transform: 'translateY(108%)' }, { transform: 'none' }], { duration: 800, delay: t + i * (paso || 70), easing: salida })); };
    // Ritmo: quien mira lee a unas 3,3 palabras por segundo mientras la pantalla se sigue armando.
    // Cada bloque entra cuando terminó de armarse el anterior (más una pausa), sin dejar al lector
    // más de DEUDA ms atrás; el contenido se va recién cuando alcanzó a leer todo.
    const RITMO = 3.3, PAUSA = 500, DEUDA = 2500;
    const lee = (n) => n / RITMO * 1000;

    // Medidas dentro de la escena, divididas por su escala (el panel la muestra achicada). Se toman
    // antes de que una animación mueva la caja medida.
    const marcoEscena = escena.getBoundingClientRect(), fx = marcoEscena.width / W || 1;
    const medir = (n) => { const r = n.getBoundingClientRect(); return { x: (r.left - marcoEscena.left) / fx, y: (r.top - marcoEscena.top) / fx, w: r.width / fx, h: r.height / fx }; };
    // Los renglones de un texto (para que la cortina tape renglón por renglón y no la caja entera).
    const lineasDe = (n) => {
      const rg = doc.createRange(); rg.selectNodeContents(n);
      const filas = [];
      [...rg.getClientRects()].filter((r) => r.width > 1 && r.height > 1).forEach((r) => {
        const x = (r.left - marcoEscena.left) / fx, y = (r.top - marcoEscena.top) / fx, w = r.width / fx, h = r.height / fx;
        const fila = filas.find((q) => Math.abs((q.y + q.h / 2) - (y + h / 2)) < Math.max(q.h, h) * 0.45);
        if (fila) { const x2 = Math.max(fila.x + fila.w, x + w), y2 = Math.max(fila.y + fila.h, y + h); fila.x = Math.min(fila.x, x); fila.y = Math.min(fila.y, y); fila.w = x2 - fila.x; fila.h = y2 - fila.y; }
        else filas.push({ x, y, w, h });
      });
      return filas.sort((a, b) => a.y - b.y);
    };
    const holgura = (r, px, py) => ({ x: r.x - px, y: r.y - py, w: r.w + 2 * px, h: r.h + 2 * py });

    // cortina: la banda tapa de izquierda a derecha, el contenido aparece debajo y la banda se retira
    // hacia la derecha. Devuelve cuándo quedó todo tapado y cuándo se destapó.
    const velo = (r, clase) => { const v = el('div', clase || 'velo', escena); Object.assign(v.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' }); return v; };
    const cortina = (rects, t, paso, clase) => {
      const C = 360, U = 440, st = paso == null ? 90 : paso;
      const F = t + Math.max(0, rects.length - 1) * st + C;
      rects.forEach((r, i) => {
        const v = velo(r, clase), s = t + i * st, D = F + 80 + U - s;
        A(v, [
          { transform: 'scaleX(0)', transformOrigin: '0% 50%', easing: telon },
          { transform: 'scaleX(1)', transformOrigin: '0% 50%', offset: C / D, easing: 'linear' },
          { transform: 'scaleX(1)', transformOrigin: '100% 50%', offset: (F + 80 - s) / D, easing: telon },
          { transform: 'scaleX(0)', transformOrigin: '100% 50%' },
        ], { duration: D, delay: s, easing: 'linear' });
      });
      return { tapado: F + 40, fin: F + 80 + U };
    };
    const destapa = (nodos, t) => nodos.forEach((n) => { if (n) A(n, [{ opacity: 0 }, { opacity: 1 }], { duration: 1, delay: t }); });
    const conCortina = (nodo, t, comoTexto) => {
      const rs = comoTexto ? lineasDe(nodo).map((r) => holgura(r, 8, 4)) : [medir(nodo)];
      const c = cortina(rs.length ? rs : [medir(nodo)], t);
      destapa([nodo], c.tapado);
      return c;
    };
    // foco: la caja se acerca desde un poco más chica, sin moverse de su lugar.
    const acerca = (n, t, dur, desde) => { n.style.transformOrigin = '0% 50%'; A(n, [{ opacity: 0, transform: `scale(${desde || 0.94})` }, { opacity: 1, transform: 'none' }], { duration: dur || 850, delay: t, easing: salida }); };
    // trazo: letra por letra (sin cursor) y el texto que se desenrolla de arriba abajo.
    const tipea = (nodo, t, paso) => { const ls = nodo.querySelectorAll('.l'); ls.forEach((l, i) => A(l, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: t + i * paso })); return t + ls.length * paso + 160; };
    const desenrolla = (n, t, dur) => A(n, [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], { duration: dur || 900, delay: t, easing: suave });

    // Lo que se lee de cada bloque (para el ritmo).
    const palDe = (b) => {
      if (b.tipo === 'flujo') return (b.pasos || []).reduce((a, p) => a + palabras(p.rotulo) + palabras(p.valor), 0);
      if (b.tipo === 'lista') return (b.items || []).reduce((a, it) => a + palabras(typeof it === 'string' ? it : it && it.texto), 0);
      if (b.tipo === 'comparacion') return ['a', 'b'].reduce((a, k2) => { const d = b[k2] || {}; return a + palabras(d.rotulo) + palabras(d.titulo) + (d.lineas || []).reduce((x, l) => x + palabras(l), 0); }, 0);
      if (b.tipo === 'numero') return palabras(b.texto) + 1;
      if (b.tipo === 'ventana') return (b.filas || []).reduce((a, f) => a + palabras(f.etiqueta) + palabras(f.valor), 0) + palabras(b.titulo);
      if (b.tipo === 'linea') { const n = (b.etiquetas === 'meses' ? MESES : (b.etiquetas || [])).length; return palabras(b.texto) + (n <= 6 ? n : 0); }
      return palabras(b.texto);
    };
    // Los casilleros que se encienden (igual en todos los estilos: es el dato, no el efecto).
    const enciende = (b, P, u) => {
      const n = P.cajas.length;
      const marcar = b.marcar === 'todos' || b.marcar == null ? P.cajas.map((_, i) => i) : (Array.isArray(b.marcar) ? b.marcar : []);
      const marcadas = new Set(marcar);
      P.cajas.forEach((c, i) => { if (!marcadas.has(i)) c.fondo.style.opacity = '0'; });
      const paso = n > 6 ? 150 : 380;
      marcar.forEach((i) => {
        const c = P.cajas[i]; if (!c) return;
        A(c.fondo, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: u });
        A(c.borde, [{ stroke: 'var(--trazo)' }, { stroke: 'var(--tit)' }], { duration: 300, delay: u });
        A(c.letra, [{ color: 'var(--suave)' }, { color: 'var(--tit)' }], { duration: 300, delay: u });
        u += paso;
      });
      return u;
    };

    // ---------- entrada de cada bloque, según el estilo (devuelve cuándo quedó armado) ----------
    const entradas = {
      armado(r, t) {
        const b = r.b, P = r.partes;
        let listo = t + 900;
        if (b.tipo === 'texto') aparece(P.p, t, 900, 16);
        if (b.tipo === 'flujo') {
          let u = t;
          P.fichas.forEach((f, i) => {
            if (i) { const fl = P.flechas[i - 1]; traza(fl.linea, u, 500); traza(fl.punta, u + 380, 320); u += 560; }
            traza(f.borde, u, 800);
            if (f.fondo) A(f.fondo, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: u + 600 });
            if (f.rot) funde(f.rot, u + 350, 600);
            aparece(f.val, u + 420, 700, 12);
            if (f.ic) trazarIcono(f.ic, u + 500, 700);
            u += 700;
          });
          listo = u + 500;
        }
        if (b.tipo === 'lista') {
          let u = t;
          P.filas.forEach((f, i) => {
            regla(f.sep, u, 600, 'x');
            if (f.sepAbajo) regla(f.sepAbajo, u + 300, 600, 'x');
            if (f.m.classList.contains('num')) funde(f.m, u + 150, 700); else trazarIcono(f.m.querySelector('svg'), u + 150, 700);
            aparece(f.tx, u + 220, 750, 12);
            const it = (b.items || [])[i]; const n = palabras(typeof it === 'string' ? it : it && it.texto);
            u += Math.max(700, lee(n) * 0.5);
          });
          listo = u + 300;
        }
        if (b.tipo === 'comparacion') {
          P.lados.forEach((L, i) => {
            const u = t + i * 650;
            funde(L.rot, u, 600); regla(L.sep, u + 100, 700, 'x');
            aparece(L.tit, u + 300, 800, 14);
            L.lineas.forEach((ln, j) => { regla(ln.sep, u + 600 + j * 220, 500, 'x'); funde(ln.p, u + 650 + j * 220, 500); });
          });
          const ultimo = P.lados[1] ? P.lados[1].lineas.length : 0;
          listo = t + 650 + 650 + ultimo * 220 + 400;
        }
        if (b.tipo === 'numero') {
          A(P.dentro, [{ transform: 'translateY(105%)' }, { transform: 'none' }], { duration: 1100, delay: t, easing: salida });
          regla(P.raya, t + 700, 800, 'y');
          if (P.p) aparece(P.p, t + 1100, 900, 14);
          listo = t + 1900;
        }
        if (b.tipo === 'ventana') {
          traza(P.borde, t, 1000);
          funde(P.rot, t + 400, 600);
          if (P.ic) trazarIcono(P.ic, t + 500, 700);
          let u = t + 800;
          P.filas.forEach((f) => {
            if (f.nuevo) u += 400;
            regla(f.sep, u, 500, 'x');
            A(f.fila, [{ opacity: 0, transform: f.nuevo ? 'translateX(-30px)' : 'none' }, { opacity: 1, transform: 'none' }], { duration: f.nuevo ? 800 : 500, delay: u + 120, easing: salida });
            if (f.tinte) A(f.tinte, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: u + 700 });
            u += f.nuevo ? 800 : 330;
          });
          listo = u + 300;
        }
        if (b.tipo === 'linea') {
          const n = P.cajas.length;
          P.cajas.forEach((c, i) => { traza(c.borde, t + i * 50, 500); funde(c.letra, t + 200 + i * 50, 400); });
          let u = enciende(b, P, t + 600 + n * 50);
          if (P.p) { aparece(P.p, u + 100, 900, 14); u += 600; }
          listo = u + 200;
        }
        if (b.tipo === 'nota') {
          traza(P.borde, t, 900);
          trazarIcono(P.ic, t + 300, 750);
          aparece(P.p, t + 350, 800, 10);
          listo = t + 1100;
        }
        if (b.tipo === 'cierre') {
          aparece(P.p, t, 900, 16);
          if (P.ic) trazarIcono(P.ic, t + 250, 800);
          listo = t + 1000;
        }
        return listo;
      },
      cortina(r, t) {
        const b = r.b, P = r.partes;
        if (b.tipo === 'texto') return conCortina(P.p, t, true).fin;
        if (b.tipo === 'cierre') return conCortina(P.c, t, true).fin;
        if (b.tipo === 'nota') return conCortina(P.n, t, false).fin;
        if (b.tipo === 'flujo') {
          let u = t, fin = t;
          P.fichas.forEach((f, i) => {
            if (i) { const fl = P.flechas[i - 1]; traza(fl.linea, u - 120, 420); traza(fl.punta, u + 200, 260); }
            const c = cortina([medir(f.c)], u, 0); destapa([f.c], c.tapado);
            fin = c.fin; u += 560;
          });
          return fin + 200;
        }
        if (b.tipo === 'lista') {
          let u = t, fin = t;
          P.filas.forEach((f, i) => {
            const c = cortina([medir(f.f)], u, 0); destapa([f.f], c.tapado); fin = c.fin;
            const it = (b.items || [])[i]; u += Math.max(520, lee(palabras(typeof it === 'string' ? it : it && it.texto)) * 0.5);
          });
          return fin + 200;
        }
        if (b.tipo === 'comparacion') {
          let fin = t;
          P.lados.forEach((L, i) => { const c = cortina([medir(L.lado)], t + i * 600, 0); destapa([L.lado], c.tapado); fin = c.fin; });
          return fin + 300;
        }
        if (b.tipo === 'numero') {
          const c = cortina([medir(P.dentro)], t, 0); destapa([P.dentro], c.tapado);
          regla(P.raya, c.fin - 100, 800, 'y');
          return P.p ? conCortina(P.p, c.fin + 300, true).fin : c.fin + 600;
        }
        if (b.tipo === 'ventana') {
          const c = cortina([medir(P.v)], t, 0); destapa([P.v], c.tapado);
          let u = c.fin + 200;
          P.filas.forEach((f) => { if (f.tinte) { A(f.tinte, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: u }); u += 500; } });
          return u + 300;
        }
        if (b.tipo === 'linea') {
          const fila = P.cajas[0] ? P.cajas[0].c.parentNode : null;
          const c = cortina([medir(fila)], t, 0); destapa([fila], c.tapado);
          let u = enciende(b, P, c.fin + 200);
          if (P.p) u = conCortina(P.p, u + 100, true).fin;
          return u + 200;
        }
        return t + 900;
      },
      foco(r, t) {
        const b = r.b, P = r.partes;
        if (b.tipo === 'texto' || b.tipo === 'cierre' || b.tipo === 'nota') { acerca(r.caja, t, 900); return t + 950; }
        if (b.tipo === 'flujo') {
          let u = t;
          P.fichas.forEach((f, i) => {
            if (i) { const fl = P.flechas[i - 1]; funde(fl.linea.parentNode, u - 200, 400); }
            acerca(f.c, u, 750, 0.88); u += 420;
          });
          return u + 450;
        }
        if (b.tipo === 'lista') {
          let u = t;
          P.filas.forEach((f, i) => {
            acerca(f.f, u, 700, 0.95);
            const it = (b.items || [])[i]; u += Math.max(450, lee(palabras(typeof it === 'string' ? it : it && it.texto)) * 0.5);
          });
          return u + 350;
        }
        if (b.tipo === 'comparacion') { P.lados.forEach((L, i) => acerca(L.lado, t + i * 450, 850, 0.92)); return t + 450 * P.lados.length + 600; }
        if (b.tipo === 'numero') {
          P.dentro.style.transformOrigin = '0% 100%';
          A(P.dentro, [{ opacity: 0, transform: 'scale(1.12)' }, { opacity: 1, transform: 'none' }], { duration: 1200, delay: t, easing: camara });
          regla(P.raya, t + 800, 800, 'y');
          if (P.p) acerca(P.p, t + 1100, 850);
          return t + 1950;
        }
        if (b.tipo === 'ventana') {
          acerca(P.v, t, 900, 0.93);
          let u = t + 500;
          P.filas.forEach((f) => {
            A(f.fila, [{ opacity: 0 }, { opacity: 1 }], { duration: 450, delay: u });
            if (f.tinte) A(f.tinte, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: u + 350 });
            u += f.nuevo ? 650 : 280;
          });
          return u + 400;
        }
        if (b.tipo === 'linea') {
          const fila = P.cajas[0] ? P.cajas[0].c.parentNode : null;
          if (fila) acerca(fila, t, 800, 0.94);
          let u = enciende(b, P, t + 700);
          if (P.p) { acerca(P.p, u + 100, 850); u += 700; }
          return u + 200;
        }
        return t + 900;
      },
      trazo(r, t) {
        const b = r.b, P = r.partes;
        if (b.tipo === 'texto') { desenrolla(P.p, t, 1000); return t + 1000; }
        if (b.tipo === 'cierre') { desenrolla(P.p, t, 900); if (P.ic) trazarIcono(P.ic, t + 200, 800); return t + 1000; }
        if (b.tipo === 'nota') { traza(P.borde, t, 1100); trazarIcono(P.ic, t + 300, 800); desenrolla(P.p, t + 450, 900); return t + 1400; }
        if (b.tipo === 'flujo') {
          let u = t;
          P.fichas.forEach((f, i) => {
            if (i) { const fl = P.flechas[i - 1]; traza(fl.linea, u, 600); traza(fl.punta, u + 480, 360); u += 640; }
            traza(f.borde, u, 1000);
            if (f.fondo) A(f.fondo, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: u + 800 });
            if (f.rot) desenrolla(f.rot, u + 300, 600);
            desenrolla(f.val, u + 450, 700);
            if (f.ic) trazarIcono(f.ic, u + 500, 800);
            u += 850;
          });
          return u + 450;
        }
        if (b.tipo === 'lista') {
          let u = t;
          P.filas.forEach((f, i) => {
            regla(f.sep, u, 800, 'x');
            if (f.sepAbajo) regla(f.sepAbajo, u + 300, 800, 'x');
            if (f.m.classList.contains('num')) desenrolla(f.m, u + 200, 600); else trazarIcono(f.m.querySelector('svg'), u + 200, 700);
            desenrolla(f.tx, u + 260, 800);
            const it = (b.items || [])[i]; u += Math.max(700, lee(palabras(typeof it === 'string' ? it : it && it.texto)) * 0.5);
          });
          return u + 350;
        }
        if (b.tipo === 'comparacion') {
          P.lados.forEach((L, i) => {
            const u = t + i * 650;
            regla(L.sep, u, 800, 'x'); desenrolla(L.rot, u + 150, 500); desenrolla(L.tit, u + 300, 800);
            L.lineas.forEach((ln, j) => { regla(ln.sep, u + 600 + j * 220, 500, 'x'); desenrolla(ln.p, u + 650 + j * 220, 600); });
          });
          const ultimo = P.lados[1] ? P.lados[1].lineas.length : 0;
          return t + 650 + 700 + ultimo * 220 + 400;
        }
        if (b.tipo === 'numero') { desenrolla(P.dentro, t, 1100); regla(P.raya, t + 700, 800, 'y'); if (P.p) desenrolla(P.p, t + 1100, 900); return t + 2000; }
        if (b.tipo === 'ventana') {
          traza(P.borde, t, 1200);
          desenrolla(P.rot, t + 450, 600);
          if (P.ic) trazarIcono(P.ic, t + 550, 800);
          let u = t + 900;
          P.filas.forEach((f) => {
            regla(f.sep, u, 600, 'x');
            desenrolla(f.fila, u + 120, f.nuevo ? 800 : 500);
            if (f.tinte) A(f.tinte, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: u + 700 });
            u += f.nuevo ? 850 : 360;
          });
          return u + 300;
        }
        if (b.tipo === 'linea') {
          const n = P.cajas.length;
          P.cajas.forEach((c, i) => { traza(c.borde, t + i * 70, 600); funde(c.letra, t + 250 + i * 70, 400); });
          let u = enciende(b, P, t + 700 + n * 70);
          if (P.p) { desenrolla(P.p, u + 100, 900); u += 700; }
          return u + 200;
        }
        return t + 900;
      },
    };

    // ---------- el principio: el fondo, la volanta o la fecha y el titular ----------
    const isoOp = iso ? parseFloat(getComputedStyle(iso).opacity) || 0.05 : 0;
    // foco: dónde arranca el titular (grande y al centro). Se mide ahora, antes de animar.
    let focoTit = null;
    if (est === 'foco') {
      const nodos = [t1, t2].filter(Boolean);
      const lineas = nodos.reduce((a, n) => a.concat(lineasDe(n)), []);
      if (lineas.length) {
        const izq = Math.min(...lineas.map((l) => l.x)), der = Math.max(...lineas.map((l) => l.x + l.w));
        const arr = Math.min(...lineas.map((l) => l.y)), aba = Math.max(...lineas.map((l) => l.y + l.h));
        const s = Math.max(1, Math.min(1.3, (W - 120) / Math.max(1, der - izq)));
        const C = { x: (izq + der) / 2, y: (arr + aba) / 2 }, D = { x: W / 2, y: H / 2 - 40 };
        focoTit = nodos.map((n) => { const r = medir(n), c = { x: r.x + r.w / 2, y: r.y + r.h / 2 }; return { n, desde: `translate(${(D.x + s * (c.x - C.x) - c.x).toFixed(1)}px,${(D.y + s * (c.y - C.y) - c.y).toFixed(1)}px) scale(${s.toFixed(3)})` }; });
      }
    }
    // trazo: las guías de la página (el margen y un renglón por bloque), medidas antes de animar.
    const guiasBloque = new Map();
    let guiaMargen = null;
    if (est === 'trazo') {
      const hijos = [...cont.children];
      const arr = Math.min(...hijos.map((h) => medir(h).y)), aba = Math.max(...hijos.map((h) => { const r = medir(h); return r.y + r.h; }));
      guiaMargen = velo({ x: ZONA.izq - 44, y: arr - 36, w: 1, h: aba - arr + 72 }, 'guia');
      guiaMargen.style.transformOrigin = '50% 0';
      armados.forEach((r) => { const m = medir(r.caja); const g = velo({ x: ZONA.izq - 44, y: m.y - 26, w: W - ZONA.izq - ZONA.der + 44, h: 1 }, 'guia'); g.style.transformOrigin = '0 50%'; guiasBloque.set(r, g); });
    }

    let listoAnt = 0, lectura = 0;
    let totalPalabras = n1 + n2;
    const marcas = [];
    const raEje = fam === 'novedades' ? 'y' : 'x', raDur = fam === 'novedades' ? 900 : 700;
    if (est === 'cortina') {
      if (iso) A(iso, [{ opacity: 0 }, { opacity: isoOp }], { duration: 1400, delay: 0 });
      let u = 400;
      if (arriba) { const c = conCortina(arriba, u, true); u = c.tapado + 160; }
      const c1 = conCortina(t1, u, true);
      let fin1 = c1.fin;
      if (t2) fin1 = conCortina(t2, c1.tapado + 160, true).fin;
      regla(raya, fin1 - 200, raDur, raEje);
      listoAnt = fin1 + 300; lectura = u + lee(n1 + n2);
      marcas.push({ que: 'titular', t: u, listo: listoAnt });
    } else if (est === 'foco') {
      if (iso) A(iso, [{ opacity: 0 }, { opacity: isoOp }], { duration: 1800, delay: 0 });
      const u = 350;
      const ws = [...t1.querySelectorAll('.w>span'), ...(t2 ? t2.querySelectorAll('.w>span') : [])];
      ws.forEach((s, i) => A(s, [{ opacity: 0 }, { opacity: 1 }], { duration: 520, delay: u + i * 110 }));
      const tMueve = u + ws.length * 110 + Math.max(900, lee(n1 + n2) * 0.55);
      (focoTit || []).forEach((o) => A(o.n, [{ transform: o.desde }, { transform: 'none' }], { duration: 1250, delay: tMueve, easing: camara }));
      if (arriba) A(arriba, [{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: tMueve + 650 });
      regla(raya, tMueve + 900, raDur, raEje);
      listoAnt = tMueve + 1450; lectura = Math.max(u + lee(n1 + n2), tMueve);
      marcas.push({ que: 'titular', t: u, listo: listoAnt });
    } else if (est === 'trazo') {
      if (iso) A(iso, [{ opacity: 0, transform: 'translate(-30px,20px)' }, { opacity: isoOp, transform: 'none' }], { duration: 1800, delay: 0, easing: suave });
      A(guiaMargen, [{ transform: 'scaleY(0)' }, { transform: 'none' }], { duration: 1400, delay: 150, easing: dibujo });
      let u = 650;
      if (arriba) u = tipea(arriba, u, 28) + 220;
      const f1 = tipea(t1, u, 30);
      const f2 = t2 ? tipea(t2, f1 + 140, 26) : f1;
      regla(raya, f2 - 120, raDur, raEje);
      listoAnt = f2 + 500; lectura = u + lee(n1 + n2);
      marcas.push({ que: 'titular', t: u, listo: listoAnt });
    } else {
      // armado: el isotipo gigante (servicios) entra despacio y queda respirando.
      if (iso) A(iso, [{ opacity: 0, transform: 'translate(40px,-30px)' }, { opacity: isoOp, transform: 'none' }], { duration: 1600, delay: 0, easing: suave });
      if (arriba) {
        A(arriba, fam === 'servicios'
          ? [{ opacity: 0, letterSpacing: '.08em' }, { opacity: 1, letterSpacing: '.24em' }]
          : [{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'none' }], { duration: 1000, delay: 300, easing: salida });
      }
      subenPalabras(t1, 800);
      listoAnt = 800 + n1 * 70 + 800;
      if (t2) { subenPalabras(t2, 800 + n1 * 70 + 250, 60); listoAnt = 800 + n1 * 70 + 250 + n2 * 60 + 800; }
      regla(raya, listoAnt - 250, raDur, raEje);
      listoAnt += 400; lectura = 800 + lee(n1 + n2);
      marcas.push({ que: 'titular', t: 800, listo: listoAnt });
    }
    if (bajada) {
      const t = Math.max(listoAnt + 200, lectura - DEUDA), n = palabras(spec.bajada);
      let fin = t + 900;
      if (est === 'cortina') fin = conCortina(bajada, t, true).fin;
      else if (est === 'foco') acerca(bajada, t, 900);
      else if (est === 'trazo') desenrolla(bajada, t, 1000);
      else aparece(bajada, t, 900, 16);
      listoAnt = fin; lectura = Math.max(lectura, t) + lee(n); totalPalabras += n;
      marcas.push({ que: 'bajada', t, listo: listoAnt });
    }

    let fin = listoAnt;
    armados.forEach((r) => {
      const t = Math.max(listoAnt + PAUSA, lectura - DEUDA);
      const g = guiasBloque.get(r);
      if (g) A(g, [{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: 700, delay: Math.max(0, t - 450), easing: dibujo });
      const listo = (entradas[est] || entradas.armado)(r, t);
      if (g) A(g, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, delay: listo + 300 });
      const pal = palDe(r.b);
      totalPalabras += pal;
      marcas.push({ que: r.b.tipo, t, listo });
      fin = Math.max(fin, listo);
      listoAnt = listo; lectura = Math.max(lectura, t) + lee(pal);
    });

    // ---------- el final: el contenido se retira y firma el logo principal, al centro ----------
    const tSalida = Math.max(fin + 1800, lectura + 600);
    const firmaSvg = firma.querySelector('svg');
    let tLogo = tSalida + 500, T;
    if (est === 'cortina') {
      // Un telón a pantalla completa tapa todo y, al retirarse, ya está el logo.
      const c = cortina([{ x: 0, y: 0, w: W, h: H }], tSalida, 0, 'velo telon');
      destapa([firma], c.tapado);
      A(cont, [{ opacity: 1 }, { opacity: 0 }], { duration: 1, delay: c.tapado });
      tLogo = c.tapado;
      T = Math.ceil((c.fin + 2600) / 100) * 100;
    } else if (est === 'foco') {
      cont.style.transformOrigin = '50% 50%';
      A(cont, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.96)' }], { duration: 750, delay: tSalida, easing: suave });
      A(firma, [{ opacity: 0, transform: 'translate(-50%,-50%) scale(1.08)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 1300, delay: tLogo, easing: camara });
      T = Math.ceil((tLogo + 1300 + 2200) / 100) * 100;
    } else {
      if (guiaMargen) A(guiaMargen, [{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: tSalida });
      A(cont, est === 'trazo' ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-24px)' }], { duration: 700, delay: tSalida, easing: suave });
      if (firmaSvg) {
        firmaSvg.querySelectorAll('path,polygon,rect,circle').forEach((f) => {
          const L = f.getTotalLength ? f.getTotalLength() : 0;
          f.style.stroke = 'currentColor'; f.style.strokeWidth = '1.2';
          if (L > 0) f.style.strokeDasharray = L + ' ' + L;
          A(f, [{ strokeDashoffset: L, fillOpacity: 0 }, { strokeDashoffset: 0, fillOpacity: 0, offset: 0.65 }, { strokeDashoffset: 0, fillOpacity: 1 }], { duration: 1800, delay: tLogo, easing: trazo });
        });
      }
      A(firma, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: tLogo });
      T = Math.ceil((tLogo + 1800 + 1700) / 100) * 100;
    }
    if (T > 30000) avisos.push(`Dura ${(T / 1000).toFixed(1)} s: conviene menos texto (ideal, de 14 a 25 s).`);
    if (iso) {
      const isoSvg = iso.querySelector('svg') || iso;
      if (est === 'foco') { isoSvg.style.transformOrigin = '50% 50%'; A(isoSvg, [{ transform: 'none' }, { transform: 'scale(1.08)' }], { duration: T, easing: 'linear' }); }
      else if (est === 'trazo') A(isoSvg, [{ transform: 'none' }, { transform: 'translate(30px,-20px)' }], { duration: T, easing: 'linear' });
      else if (est === 'armado') A(isoSvg, [{ transform: 'none' }, { transform: 'translate(-36px,24px)' }], { duration: T, easing: 'linear' });
    }

    anims.forEach((a) => a.pause());
    if (typeof window !== 'undefined') window.__anims = anims;
    return { T, tPortada: Math.round(tSalida - 300), tSalida: Math.round(tSalida), tLogo: Math.round(tLogo), familia: fam, estilo: est, k, alto, palabras: totalPalabras, marcas, avisos, anims };
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

  const api = { armarVideoAnimado, reproducirVideoAnimado, validarSpec, guiaReceta, textosDe, familiaDe, estiloDe, FAMILIAS, ESTILOS, TIPOS, ZONA, W, H };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  // En el navegador, todo bajo un solo nombre (el panel lo carga en su propia página).
  else { raiz.MDOVideo = api; raiz.armarVideoAnimado = armarVideoAnimado; }
})(typeof window !== 'undefined' ? window : globalThis);

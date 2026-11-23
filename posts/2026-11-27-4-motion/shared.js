// Lo propio de este film (Reel del viernes 27/11/2026): la ventana del sistema, que dibujan
// «ventana» y «multas», y la cortina que pasa de una escena a la otra.
Object.assign(window.MDO, {
  VE: {
    filas: [['Facturación', 'Sin movimientos'], ['Declaraciones juradas', 'Vencen igual'], ['Ingresos Brutos', 'Sigue inscripta'], ['Notificaciones de ARCA', 'Sin revisar']],
    filaH: 178,     // alto fijo de cada fila: «multas» sube la última sin medir nada
    deriva: -14,    // lo que sube la ventana en «ventana»; «multas» arranca desde ahí
  },
  // La ventana: barra con el título y cuerpo de papel con las cuatro filas. llenas = true: los
  // valores ya escritos (así arranca «multas»). extra: markup que va dentro del cuerpo.
  ventanaHTML(pref, llenas, extra) {
    const V = window.MDO.VE;
    let filas = '';
    V.filas.forEach(([lbl, val], i) => {
      filas += '<div class="ve-fila ' + pref + '-fila' + (i ? '' : ' primera') + '" style="top:' + (24 + i * V.filaH) + 'px">' +
        '<p class="ve-lbl">' + lbl + '</p>' +
        '<p class="ve-val"><span class="' + pref + '-txt">' + (llenas ? val : '') + '</span><i class="ve-caret ' + pref + '-caret"></i></p></div>';
    });
    return '<div class="ve-win ' + pref + '-win"><div class="ve-bar"><p class="tag ve-tit">Sociedad sin actividad</p><span class="ve-ctl"><i></i><i></i><i></i></span></div>' +
      '<div class="ve-body">' + filas + (extra || '') + '</div></div>';
  },
  // Cortina: una banda barre la pantalla de izquierda a derecha y deja ver, detrás, la capa
  // de la escena siguiente. p de 0 a 1; capa y banda son los style de esos elementos.
  cortina(capa, banda, p) {
    const x = -160 + 1240 * p;
    capa.clipPath = 'inset(0 ' + Math.min(1080, Math.max(0, 1080 - x)).toFixed(1) + 'px 0 0)';
    capa.opacity = p > 0 ? 1 : 0;
    banda.transform = 'translateX(' + x.toFixed(1) + 'px)';
    banda.opacity = p > 0 && p < 1 ? 1 : 0;
  },
  // Banda que destapa un renglón: crece desde la izquierda, se retira hacia la derecha y deja
  // el texto. Devuelve si el texto ya se ve.
  destapar(kit, banda, t, a) {
    const p1 = kit.eio(kit.seg(t, a, a + 0.32)), p2 = kit.eio(kit.seg(t, a + 0.36, a + 0.72));
    if (t < a + 0.34) { banda.transformOrigin = '0 50%'; banda.transform = 'scaleX(' + p1.toFixed(4) + ')'; }
    else { banda.transformOrigin = '100% 50%'; banda.transform = 'scaleX(' + (1 - p2).toFixed(4) + ')'; }
    return t >= a + 0.34;
  },
});

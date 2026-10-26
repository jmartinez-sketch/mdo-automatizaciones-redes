// Lo propio de este film: el encuadre final de «papeles», que «meses» retoma, y el corchete
// con su rótulo, que dibujan las dos escenas.
Object.assign(window.MDO, {
  END: { cx: 1833, cy: 712, z: 1.6 },
  bracket(kit) {
    return kit.h('<svg class="art" viewBox="0 0 1080 1920"><path class="ink mdo-br" d="M1630 550 H1660 V874 H1630"/></svg>');
  },
  label(kit) {
    return kit.h('<div class="words" style="left:1700px;top:682px;width:600px"><p class="line mdo-lbl" style="font-size:56px">La diferencia</p></div>');
  },
});

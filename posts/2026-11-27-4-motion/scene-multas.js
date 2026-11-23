const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('multas', {
  init(kit) {
    const M = this.M = window.MDO;
    const V = M.VE;
    let avisos = '';
    ['Intimación', 'Intimación', 'Multa'].forEach((a, k) => {
      avisos += '<div class="ve-aviso multas-av" style="top:' + (24 + (k + 1) * V.filaH) + 'px;opacity:0"><i></i><p>' + a + '</p></div>';
    });
    kit.stage.append(kit.h('<div class="ground claro"><div class="ve-iso">' + M.logo(kit, 'iso', true) + '</div>' + M.ventanaHTML('multas', true, avisos) +
      '<div class="words" style="left:110px;top:282px;width:860px;gap:4px">' +
      '<p class="line multas-h" style="font-size:72px">Lo que no se presenta</p>' +
      '<p class="line line2 multas-h" style="font-size:72px">puede generar multas.</p></div>' +
      '<div class="ground multas-capa" style="opacity:0"></div><div class="ve-banda oscura multas-banda"></div></div>'));
    const q = (s) => kit.stage.querySelector('.multas-' + s);
    this.win = q('win').style;
    this.filas = [...kit.stage.querySelectorAll('.multas-fila')].map((e) => e.style);
    this.av = [...kit.stage.querySelectorAll('.multas-av')].map((e) => e.style);
    this.h = [...kit.stage.querySelectorAll('.multas-h')];
    this.capa = q('capa').style;
    this.banda = q('banda').style;
  },
  render(t) {
    const V = this.M.VE;
    // Arranca donde terminó «ventana» y sigue subiendo apenas.
    this.win.transform = 'translateY(' + (V.deriva + V.deriva * eio(seg(t, 0, 5.6))).toFixed(1) + 'px)';
    // Las tres primeras filas se van; la de las notificaciones sube al primer lugar.
    const fuera = eio(seg(t, 0.1, 0.4));
    for (let i = 0; i < 3; i++) {
      this.filas[i].opacity = (1 - fuera).toFixed(3);
      this.filas[i].transform = 'translateY(' + (-30 * fuera).toFixed(1) + 'px)';
    }
    const sube = eio(seg(t, 0.35, 0.95));
    this.filas[3].transform = 'translateY(' + (-3 * V.filaH * sube).toFixed(1) + 'px)';
    // Arriba de todo, la fila ya no lleva el filete de separación.
    this.filas[3].borderTopColor = 'color-mix(in srgb, color-mix(in srgb, var(--ground) 12%, var(--second)) ' + (100 * (1 - sube)).toFixed(1) + '%, transparent)';
    // Debajo llegan los avisos sin abrir, de a uno.
    this.av.forEach((s, k) => {
      const p = eo(seg(t, 1.05 + k * 0.6, 1.45 + k * 0.6));
      s.opacity = p.toFixed(3);
      s.transform = 'translateY(' + lerp(-40, 0, p).toFixed(1) + 'px)';
    });
    this.h.forEach((el, i) => TextFx.fadeFromRight(el, t, 1.7 + i * 0.35, { stagger: 0.06, dur: 0.5, dx: 30 }));
    // Cortina azul: deja el fondo azul noche de la escena siguiente.
    this.M.cortina(this.capa, this.banda, eio(seg(t, 4.85, 5.55)));
  },
});

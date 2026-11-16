const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('titulo', {
  init(kit) {
    // Un <p> por renglón: así el corte de cada línea es el que se eligió.
    kit.stage.append(kit.h('<div class="ground claro"><div class="co-iso titulo-iso">' + MDO.logo(kit, 'iso', true) + '</div>' +
      '<div class="words" style="left:110px;top:500px;width:850px;gap:10px">' +
      '<p class="fecha titulo-x" style="margin-bottom:14px">10.11.2026 · Laboral</p>' +
      '<p class="line titulo-x" style="font-size:96px">Comercio:</p>' +
      '<p class="line line2 titulo-x" style="font-size:86px">el aporte solidario</p>' +
      '<p class="line line2 titulo-x" style="font-size:86px">del 2,5 % sigue</p>' +
      '<p class="line titulo-x" style="font-size:86px">seis meses más</p></div></div>'));
    this.els = [...kit.stage.querySelectorAll('.titulo-x')];
    this.iso = kit.stage.querySelector('.titulo-iso').style;
  },
  render(t) {
    // El titular entra antes del primer cuadro: a t = 0 ya se lee entero.
    this.els.forEach((el, i) => TextFx.fadeFromRight(el, t, -1.4 + i * 0.1, { stagger: 0.05, dur: 0.55, dx: 30 }));
    if (t > 2.75) this.els.forEach((el, i) => TextFx.fadeOutLeft(el, t, 2.75 + i * 0.06));
    // El isotipo deriva apenas, para que el cuadro no quede quieto.
    this.iso.transform = 'translateX(' + lerp(0, -24, eio(seg(t, -1, 3.4))).toFixed(1) + 'px)';
  },
});

const { seg, eo, ei, eio, lerp } = kit;
kit.scene('realidad', {
  init(kit) {
    const B = MDO.BLOQUE;
    const franjas = ['Devoluciones', 'Descuentos y notas de crédito', 'Incobrables, según la provincia'];
    let fr = '';
    franjas.forEach((s, i) => {
      fr += '<div class="ib-slice realidad-f" style="left:' + B.x + 'px;top:' + (B.top + i * B.franja) + 'px;width:' + B.w + 'px;height:' + B.franja + 'px"><span class="realidad-ft">' + s + '</span></div>';
    });
    const base = B.top + 3 * B.franja;
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="words" style="left:' + B.x + 'px;top:300px;width:700px"><p class="ib-tag realidad-tag">Realidad</p></div>' +
      '<div class="realidad-blk" style="position:absolute;inset:0">' +
      '<div class="ib-paper realidad-base" style="left:' + B.x + 'px;top:' + base + 'px;width:' + B.w + 'px;height:' + (B.fondo - base) + 'px">' +
      '<div class="realidad-rows" style="position:absolute;left:48px;top:70px;width:604px">' +
      [62, 44, 70, 52].map((w) => '<div class="bar" style="width:' + w + '%;margin:0 0 54px"></div>').join('') + '</div></div>' + fr +
      '<div class="words realidad-hd" style="left:' + B.x + 'px;top:0;width:700px"><p class="ib-tag" style="color:var(--second)"><span class="realidad-h1">Lo facturado</span></p>' +
      '<p class="ib-tag realidad-h2" style="position:absolute;left:0;top:0;color:var(--second)">La base</p></div>' +
      '</div></div>'));
    const q = (s) => kit.stage.querySelector('.realidad-' + s);
    this.B = B;
    this.baseTop = base;
    this.blk = q('blk').style;
    this.tag = q('tag').style;
    this.f = [...kit.stage.querySelectorAll('.realidad-f')].map((e) => e.style);
    this.ft = [...kit.stage.querySelectorAll('.realidad-ft')].map((e) => e.style);
    this.base = q('base').style;
    this.rows = q('rows').style;
    this.hd = q('hd').style;
    this.h1 = q('h1').style;
    this.h2 = q('h2').style;
  },
  render(t) {
    const B = this.B;
    // El bloque sube desde abajo.
    const up = lerp(1000, 0, eio(seg(t, 0, 0.85)));
    this.blk.transform = 'translateY(' + up.toFixed(1) + 'px)';
    this.tag.opacity = eo(seg(t, -0.1, 0.35)) * (1 - ei(seg(t, 4.9, 5.3)));
    this.ft.forEach((s, i) => { s.opacity = eo(seg(t, 0.75 + i * 0.18, 1.2 + i * 0.18)); });
    // Las franjas se recortan y se van hacia la derecha, de arriba hacia abajo.
    let top = B.top;
    this.f.forEach((s, i) => {
      const t0 = 1.9 + i * 0.95, p = eio(seg(t, t0, t0 + 0.75));
      s.transform = 'translateX(' + (p * 820).toFixed(1) + 'px)';
      s.opacity = 1 - ei(seg(t, t0 + 0.25, t0 + 0.75));
      top += B.franja * eio(seg(t, t0 + 0.35, t0 + 0.85));
    });
    // El rótulo baja con el borde de arriba de lo que queda y pasa de «Lo facturado» a «La base».
    this.hd.transform = 'translateY(' + (top - 76).toFixed(1) + 'px)';
    const c = eio(seg(t, 4.55, 4.95));
    this.h1.opacity = 1 - c;
    this.h2.opacity = c;
    this.hd.opacity = 1 - ei(seg(t, 5.1, 5.45));
    // Lo que queda, la base, se abre hasta ser el fondo de la escena siguiente.
    const x = eio(seg(t, 5.35, 6.35));
    this.rows.opacity = 1 - ei(seg(t, 5.1, 5.45));
    this.base.left = lerp(B.x, 0, x).toFixed(1) + 'px';
    this.base.width = lerp(B.w, 1080, x).toFixed(1) + 'px';
    this.base.top = lerp(this.baseTop, 0, x).toFixed(1) + 'px';
    this.base.height = lerp(B.fondo - this.baseTop, 1920, x).toFixed(1) + 'px';
  },
});

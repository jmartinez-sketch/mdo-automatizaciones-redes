const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('titulo', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="titulo-v" style="position:absolute;left:110px;top:600px;width:2px;height:600px;background:color-mix(in srgb, var(--second) 45%, transparent);transform-origin:50% 0"></div>' +
      '<div class="words titulo-w" style="left:150px;top:640px;width:820px">' +
      '<p class="vol titulo-vol">Servicios · Laboral</p>' +
      '<h1 class="line titulo-a">Las tareas cambiaron</h1>' +
      '<h2 class="line line2 titulo-b">y la categoría del recibo quedó igual</h2></div>' +
      '<div class="paper titulo-p" style="left:160px;top:1700px;width:760px;height:700px"></div></div>'));
    const q = s => kit.stage.querySelector('.titulo-' + s);
    this.a = q('a'); this.b = q('b');
    this.vol = q('vol').style; this.v = q('v').style; this.w = q('w').style; this.p = q('p').style;
  },
  render(t) {
    if (t < 2.45) {
      TextFx.fadeFromRight(this.a, t, -0.5, { stagger: 0.11, dur: 0.5, dx: 30 });
      TextFx.fadeFromRight(this.b, t, 0.6, { stagger: 0.09, dur: 0.55, dx: 30 });
    } else {
      TextFx.fadeOutLeft(this.a, t, 2.45);
      TextFx.fadeOutLeft(this.b, t, 2.55);
    }
    this.vol.opacity = eo(seg(t, -0.6, -0.1)) * (1 - ei(seg(t, 2.4, 2.8)));
    this.v.transform = 'scaleY(' + eo(seg(t, -0.4, 1.1)) + ')';
    this.v.opacity = 1 - ei(seg(t, 2.5, 2.9));
    this.w.transform = 'translateY(' + lerp(0, -16, seg(t, 0, 2.5)) + 'px)';
    this.p.transform = 'translateY(' + lerp(260, 0, eio(seg(t, 2.5, 3.2))) + 'px)';
  },
});

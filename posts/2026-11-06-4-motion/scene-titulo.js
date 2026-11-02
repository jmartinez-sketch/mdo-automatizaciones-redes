const { seg, eo, ei, lerp, TextFx } = kit;
kit.scene('titulo', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground">' + MDO.ddFoto(kit, 'titulo') +
      '<div class="titulo-v" style="position:absolute;left:110px;top:610px;width:2px;height:560px;background:color-mix(in srgb, var(--second) 45%, transparent);transform-origin:50% 0"></div>' +
      '<div class="words titulo-w" style="left:150px;top:640px;width:820px">' +
      '<p class="vol titulo-vol" style="font-size:40px;letter-spacing:.16em">Due diligence</p>' +
      '<h1 class="line titulo-a">Lo que no muestra el balance</h1>' +
      '<h2 class="line line2 titulo-b">de la empresa que vas a comprar</h2></div></div>'));
    const q = (s) => kit.stage.querySelector('.titulo-' + s);
    this.a = q('a'); this.b = q('b');
    this.vol = q('vol').style; this.v = q('v').style; this.w = q('w').style;
    this.img = kit.stage.querySelector('.titulo-f .dd-foto-img').style;
  },
  render(t) {
    if (t < 2.55) {
      TextFx.fadeFromRight(this.a, t, -0.5, { stagger: 0.1, dur: 0.5, dx: 30 });
      TextFx.fadeFromRight(this.b, t, 0.55, { stagger: 0.08, dur: 0.55, dx: 30 });
    } else {
      TextFx.fadeOutLeft(this.a, t, 2.55);
      TextFx.fadeOutLeft(this.b, t, 2.65);
    }
    this.vol.opacity = eo(seg(t, -0.6, -0.1)) * (1 - ei(seg(t, 2.5, 2.9)));
    this.v.transform = 'scaleY(' + eo(seg(t, -0.4, 1.1)) + ')';
    this.v.opacity = 1 - ei(seg(t, 2.6, 3.0));
    this.w.transform = 'translateY(' + lerp(0, -14, seg(t, 0, 2.6)) + 'px)';
    // La foto respira: un 3 % en toda la escena (la escena siguiente sigue desde ahí).
    this.img.transform = 'scale(' + lerp(1, 1.03, seg(t, -0.5, 3.4)) + ')';
  },
});

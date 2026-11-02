const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('titulo', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.stIso(kit) +
      '<div class="titulo-v" style="position:absolute;left:110px;top:610px;width:2px;height:560px;background:color-mix(in srgb, var(--ground) 40%, transparent);transform-origin:50% 0"></div>' +
      MDO.stTitular(kit, 'titulo', false) + '</div>'));
    const q = (s) => kit.stage.querySelector('.titulo-' + s);
    this.a = q('a'); this.b = q('b');
    this.vol = q('vol').style; this.v = q('v').style; this.tit = q('tit').style;
  },
  render(t) {
    TextFx.fadeFromRight(this.a, t, -0.5, { stagger: 0.1, dur: 0.5, dx: 30 });
    TextFx.fadeFromRight(this.b, t, 0.5, { stagger: 0.08, dur: 0.55, dx: 30 });
    this.vol.opacity = eo(seg(t, -0.6, -0.1)) * (1 - ei(seg(t, 2.6, 3.0)));
    this.v.transform = 'scaleY(' + eo(seg(t, -0.4, 1.1)) * (1 - ei(seg(t, 2.6, 3.0))) + ')';
    // El titular sube y se achica: queda de encabezado para el recuento.
    const k = eio(seg(t, 2.65, 3.4));
    this.tit.transform = 'translateY(' + lerp(0, MDO.ST.sube, k) + 'px) scale(' + lerp(1, MDO.ST.escala, k) + ')';
  },
});

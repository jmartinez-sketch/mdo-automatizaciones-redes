const { seg, eo, ei } = kit;
kit.scene('titulo', {
  init(kit) {
    const I = MDO.IB;
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="titulo-v" style="position:absolute;left:110px;top:' + (I.y - 140) + 'px;width:2px;height:600px;background:color-mix(in srgb, var(--second) 45%, transparent);transform-origin:50% 0"></div>' +
      '<div class="words" style="left:' + I.x + 'px;top:' + (I.y - 120) + 'px;width:820px"><p class="ib-tag titulo-vol">Mito y realidad</p></div>' +
      '<div class="words" style="left:' + I.x + 'px;top:' + I.y + 'px;width:820px">' +
      '<p class="line titulo-a" style="font-size:' + I.fs + 'px">' + MDO.ibWords([['Ingresos', 'ib-b'], ['Brutos', 'ib-b']]) + '</p>' +
      '<p class="line titulo-b" style="font-size:' + I.fs + 'px">' + MDO.ibWords([['sobre', 'ib-l'], ['plata', 'ib-l'], ['que', 'ib-l'], ['nunca', 'ib-l'], ['entró', 'ib-l']]) + '</p>' +
      '</div></div>'));
    const q = (s) => kit.stage.querySelector('.titulo-' + s);
    this.a = [...q('a').querySelectorAll('.ib-w')];
    this.b = [...q('b').querySelectorAll('.ib-w')];
    this.vol = q('vol').style;
    this.v = q('v').style;
  },
  render(t) {
    MDO.ibIn(this.a, t, -0.75, eo, { stagger: 0.12, dur: 0.5, dx: 30 });
    if (t < 2.5) MDO.ibIn(this.b, t, 0.25, eo, { stagger: 0.1, dur: 0.5, dx: 30 });
    else MDO.ibOut(this.b, t, 2.5, ei, { stagger: 0.05, dur: 0.45, dx: 26 });
    this.vol.opacity = eo(seg(t, -0.6, -0.1)) * (1 - ei(seg(t, 2.45, 2.85)));
    this.v.transform = 'scaleY(' + eo(seg(t, -0.4, 1.0)) + ')';
    this.v.opacity = 1 - ei(seg(t, 2.5, 2.9));
  },
});

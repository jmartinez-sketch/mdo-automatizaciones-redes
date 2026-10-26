const { seg, eo, lerp, TextFx } = kit;
kit.scene('firma', {
  init(kit) {
    kit.css('.firma-logo-svg { display:block; width:100%; height:auto }');
    kit.stage.append(kit.h('<div class="ground"><div class="firma-g" style="position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:540px 930px">' +
      '<div class="firma-l" style="position:absolute;left:230px;top:770px;width:620px;transform-origin:50% 50%">' + (kit.module('logo.html') || '') + '</div>' +
      '<div class="words" style="left:140px;top:1090px;width:800px;align-items:center;text-align:center"><p class="vol firma-s">Liquidación de sueldos</p></div>' +
      '<div class="firma-u" style="position:absolute;left:470px;top:1150px;width:140px;height:4px;background:var(--accent)"></div></div></div>'));
    const q = s => kit.stage.querySelector('.firma-' + s);
    this.g = q('g').style;
    this.l = q('l').style;
    this.s = q('s');
    this.u = q('u').style;
  },
  render(t) {
    this.l.opacity = eo(seg(t, 0, 0.45));
    this.l.transform = 'scale(' + lerp(0.86, 1, eo(seg(t, 0, 0.8))) + ')';
    TextFx.fadeFromRight(this.s, t, 0.5, { stagger: 0.1 });
    this.u.transform = 'scaleX(' + eo(seg(t, 0.95, 1.45)) + ')';
    this.g.transform = 'scale(' + lerp(1, 1.015, seg(t, 0.8, 3)) + ')';
  },
});

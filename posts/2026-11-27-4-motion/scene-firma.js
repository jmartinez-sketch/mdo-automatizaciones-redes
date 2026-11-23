const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('firma', {
  init(kit) {
    const M = this.M = window.MDO;
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="firma-logo" style="position:absolute;left:250px;top:760px;width:580px;opacity:0">' + M.logo(kit, 'principal', false) + '</div>' +
      '<div class="words" style="left:140px;top:1130px;width:800px;align-items:center">' +
      '<div class="ve-it firma-it" style="align-self:center"><p class="vol" style="font-size:42px;letter-spacing:.14em;color:var(--second)">Servicios societarios</p><i class="ve-it-b firma-b"></i></div></div></div>'));
    const q = (s) => kit.stage.querySelector('.firma-' + s);
    this.logo = q('logo').style;
    this.b = q('b').style;
    this.w = q('it').querySelector('p').style;
  },
  render(t) {
    const p = eo(seg(t, 0.15, 0.95));
    this.logo.opacity = p.toFixed(3);
    this.logo.transform = 'scale(' + lerp(0.96, 1, p).toFixed(4) + ')';
    this.w.opacity = this.M.destapar(kit, this.b, t, 0.85) ? 1 : 0;
  },
});

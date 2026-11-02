const { seg, eo, lerp, TextFx } = kit;
kit.scene('fuera', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.ddIso(kit) +
      '<div class="fuera-g" style="position:absolute;inset:0;transform-origin:540px 960px">' + MDO.ddDiagrama(kit, 'fuera') + '</div></div>'));
    const q = (s) => kit.stage.querySelector('.fuera-' + s);
    this.g = q('g').style;
    // Arranca donde terminó «empresa»: caja, balance tildado, separador y rótulos a la vista.
    MDO.trazo(q('box'))(1);
    MDO.ddDibujo(q('ok'))(1);
    [...kit.stage.querySelectorAll('.fuera-k')].forEach((e) => { e.style.opacity = 0; });
    this.ics = [...kit.stage.querySelectorAll('.fuera-i')].map((e) => MDO.ddDibujo(e));
    this.lbls = [...kit.stage.querySelectorAll('.fuera-l')];
  },
  render(t) {
    this.ics.forEach((f, i) => f(eo(seg(t, 0.3 + i * 1.75, 1.2 + i * 1.75))));
    this.lbls.forEach((el, i) => TextFx.fadeFromRight(el, t, 0.65 + i * 1.75, { stagger: 0.06, dur: 0.45, dx: 24 }));
    this.g.transform = 'scale(' + lerp(1, 1.012, seg(t, 0, 9)) + ')';
  },
});

const { seg, eo, eio, lerp, TextFx } = kit;
kit.scene('empresa', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.ddIso(kit) + MDO.ddDiagrama(kit, 'empresa') + MDO.ddFoto(kit, 'empresa') + '</div>'));
    const q = (s) => kit.stage.querySelector('.empresa-' + s);
    this.f = q('f').style;
    this.img = kit.stage.querySelector('.empresa-f .dd-foto-img').style;
    this.box = MDO.trazo(q('box'));
    this.sep = q('sep').style;
    this.t1 = q('t1'); this.t2 = q('t2');
    this.bal = q('bal').style;
    this.bars = [...kit.stage.querySelectorAll('.empresa-bar')].map((e) => e.style);
    this.ok = MDO.ddDibujo(q('ok'));
    [...kit.stage.querySelectorAll('.empresa-c')].forEach((e) => { e.style.opacity = 0; });
  },
  render(t) {
    // La foto del titular se cierra sobre la caja de la empresa y se va: queda el contorno.
    const k = eio(seg(t, 0.1, 0.95));
    const b = MDO.DD.box;
    this.f.clipPath = 'inset(' + lerp(0, b[1], k) + 'px ' + lerp(0, 1080 - b[0] - b[2], k) + 'px ' +
      lerp(0, 1920 - b[1] - b[3], k) + 'px ' + lerp(0, b[0], k) + 'px)';
    this.f.opacity = 1 - eo(seg(t, 0.75, 1.25));
    this.img.transform = 'scale(' + lerp(1.03, 1.05, seg(t, 0, 1.25)) + ')';
    this.box(eo(seg(t, 0.6, 1.4)));
    TextFx.fadeFromRight(this.t1, t, 0.95, { stagger: 0.08 });
    const pb = eo(seg(t, 1.3, 1.9));
    this.bal.opacity = pb;
    this.bal.transform = 'translateY(' + lerp(40, 0, pb) + 'px)';
    this.bars.forEach((s, i) => { s.transform = 'scaleX(' + eo(seg(t, 1.6 + i * 0.12, 2.1 + i * 0.12)) + ')'; });
    this.ok(eo(seg(t, 2.35, 3.05)));
    this.sep.transform = 'scaleX(' + eio(seg(t, 3.0, 3.6)) + ')';
    TextFx.fadeFromRight(this.t2, t, 3.25, { stagger: 0.08 });
  },
});

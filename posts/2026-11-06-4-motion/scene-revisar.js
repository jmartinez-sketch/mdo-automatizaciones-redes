const { seg, eo, eio, lerp, TextFx } = kit;
kit.scene('revisar', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.ddIso(kit) +
      '<div class="revisar-g" style="position:absolute;inset:0;transform-origin:540px 960px">' + MDO.ddDiagrama(kit, 'revisar') +
      '<div class="words" style="left:130px;top:560px;width:800px"><h2 class="line revisar-h" style="font-size:76px">Revisaríamos todo esto antes de firmar.</h2></div></div></div>'));
    const q = (s) => kit.stage.querySelector('.revisar-' + s);
    this.g = q('g').style;
    this.h = q('h');
    // Arranca donde terminó «fuera»: todo a la vista.
    MDO.trazo(q('box'))(1);
    MDO.ddDibujo(q('ok'))(1);
    const items = [...kit.stage.querySelectorAll('.revisar-i')];
    items.forEach((e) => MDO.ddDibujo(e)(1));
    this.is = items.map((e) => e.style);
    this.ks = [...kit.stage.querySelectorAll('.revisar-k')].map((e) => MDO.ddDibujo(e));
    // Lo que se va: el balance con su tilde, los rótulos y el separador.
    this.arriba = ['bal', 'okb', 'tw', 'tw2'].map((s) => q(s).style);
    this.sep = q('sep').style;
  },
  render(t) {
    const out = eo(seg(t, 0, 0.6));
    this.arriba.forEach((s) => { s.opacity = 1 - out; s.transform = 'translateY(' + lerp(0, -30, out) + 'px)'; });
    this.sep.opacity = 1 - out;
    TextFx.fadeFromRight(this.h, t, 0.45, { stagger: 0.07 });
    // Cada punto se tilda: el ícono se va y en su lugar se dibuja el tilde.
    this.is.forEach((s, i) => { s.opacity = 1 - eo(seg(t, 1.4 + i * 0.35, 1.7 + i * 0.35)); });
    this.ks.forEach((f, i) => f(eo(seg(t, 1.55 + i * 0.35, 2.1 + i * 0.35))));
    const x = eio(seg(t, 3.45, 4.2));
    this.g.opacity = 1 - x;
    this.g.transform = 'scale(' + lerp(1.012, 1.02, seg(t, 0, 3.45)) * lerp(1, 0.96, x) + ')';
  },
});

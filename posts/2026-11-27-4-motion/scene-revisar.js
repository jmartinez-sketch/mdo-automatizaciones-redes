const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('revisar', {
  init(kit) {
    const items = ['Qué impuestos siguen\u00a0activos.', 'Qué falta presentar.', 'Si conviene ponerla al\u00a0día\u00a0o\u00a0cerrarla.'];
    let h = '<div class="ground"><div class="words" style="left:110px;top:640px;width:830px;gap:58px">' +
      '<div class="ve-it revisar-it"><p class="vol" style="font-size:40px;color:var(--accent)">Lo que revisaríamos</p><i class="ve-it-b revisar-b"></i></div>';
    items.forEach((s) => { h += '<div class="ve-it revisar-it"><p class="line" style="font-size:74px">' + s + '</p><i class="ve-it-b revisar-b"></i></div>'; });
    kit.stage.append(kit.h(h + '</div></div>'));
    this.M = window.MDO;
    this.its = [...kit.stage.querySelectorAll('.revisar-it')];
    this.b = [...kit.stage.querySelectorAll('.revisar-b')].map((e) => e.style);
    this.tx = this.its.map((it) => it.querySelector('p').style);
  },
  render(t) {
    // Cada renglón lo destapa una banda de papel: la volanta y después los tres controles.
    this.its.forEach((it, k) => {
      const a = k === 0 ? 0.25 : 0.95 + (k - 1) * 1.45;
      const visible = this.M.destapar(kit, this.b[k], t, a);
      const fuera = ei(seg(t, 5.9 + k * 0.08, 6.45 + k * 0.08));
      this.tx[k].opacity = ((visible ? 1 : 0) * (1 - fuera)).toFixed(3);
      this.tx[k].transform = 'translateX(' + (-30 * fuera).toFixed(1) + 'px)';
    });
  },
});

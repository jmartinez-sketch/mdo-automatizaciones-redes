const { seg, eo, ei, eio, lerp } = kit;
kit.scene('mito', {
  init(kit) {
    const I = MDO.IB;
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="words" style="left:' + I.x + 'px;top:' + (I.y - 120) + 'px;width:820px"><p class="ib-tag mito-tag">Mito</p></div>' +
      '<div class="words" style="left:' + I.x + 'px;top:' + I.y + 'px;width:820px">' +
      '<p class="line mito-q" style="position:relative;font-size:' + I.fs + 'px"><span class="ib-gui mito-gui">«</span>' +
      MDO.ibWords([['Ingresos', 'ib-b mito-k'], ['Brutos', 'ib-b mito-k'], ['se', 'ib-l mito-r'], ['paga', 'ib-l mito-r'], ['sobre', 'ib-l mito-r'],
        ['todo', 'ib-b mito-r mito-todo'], ['lo', 'ib-l mito-r'], ['que', 'ib-l mito-r'], ['se', 'ib-l mito-r'], ['facturó.»', 'ib-l mito-r']]) +
      '</p></div></div>'));
    const q = (s) => kit.stage.querySelector('.mito-' + s);
    this.k = [...kit.stage.querySelectorAll('.mito-k')];
    this.r = [...kit.stage.querySelectorAll('.mito-r')];
    this.todo = q('todo');
    this.tag = q('tag').style;
    this.gui = q('gui').style;
    this.q = q('q');
  },
  render(t) {
    // «Ingresos Brutos» llega quieto desde el titular; el resto del mito entra de a una palabra.
    this.k.forEach((s) => { s.style.opacity = 1; s.style.transform = 'none'; });
    this.gui.opacity = eo(seg(t, 0, 0.35));
    if (t < 3.45) MDO.ibIn(this.r, t, 0.1, eo, { stagger: 0.11, dur: 0.45, dx: 26 });
    else MDO.ibOut(this.k.concat(this.r), t, 3.45, ei, { stagger: 0.03, dur: 0.38, dx: 26 });
    if (t >= 3.45) this.gui.opacity = 1 - ei(seg(t, 3.45, 3.8));
    // «todo» se apaga: es lo que no es cierto.
    const d = eio(seg(t, 2.25, 2.85));
    if (t < 3.45) this.todo.style.opacity = (parseFloat(this.todo.style.opacity) * lerp(1, 0.22, d)).toFixed(3);
    this.tag.opacity = eo(seg(t, 0, 0.4)) * (1 - ei(seg(t, 3.4, 3.8)));
  },
});

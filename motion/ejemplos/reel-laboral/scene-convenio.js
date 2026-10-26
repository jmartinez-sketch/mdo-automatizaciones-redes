const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('convenio', {
  init(kit) {
    let rows = '', marks = '';
    ['Administración', 'Caja', 'Ventas'].forEach((s, i) => {
      const y = 932 + i * 102;
      rows += '<div class="row"><b>' + s + '</b></div>';
      marks += '<rect class="ink-dark convenio-k" x="818" y="' + (y - 22) + '" width="44" height="44" style="stroke-width:3px"/>' +
        '<path class="ink-dark convenio-v" d="M826 ' + y + ' L837 ' + (y + 11) + ' L857 ' + (y - 12) + '"/>';
    });
    kit.stage.append(kit.h('<div class="ground"><div class="cam convenio-w" style="transform-origin:540px 960px">' +
      '<div class="words" style="left:110px;top:400px;width:860px"><h2 class="line convenio-h" style="font-size:72px">Revisaríamos cada puesto contra su convenio.</h2></div>' +
      '<div class="cam convenio-d">' +
      '<div class="paper convenio-p" style="left:160px;top:760px;width:760px;height:480px;line-height:56px"><p class="paper-hd">Convenio colectivo</p>' + rows + '</div>' +
      '<svg class="art">' + marks + '</svg></div></div></div>'));
    const q = s => kit.stage.querySelector('.convenio-' + s);
    this.w = q('w').style;
    this.d = q('d').style;
    this.h = q('h');
    this.kids = [...q('p').children].map(e => e.style);
    this.ks = [...kit.stage.querySelectorAll('.convenio-k')].map(e => e.style);
    const vs = [...kit.stage.querySelectorAll('.convenio-v')];
    this.vL = vs[0].getTotalLength();
    vs.forEach(v => { v.style.strokeDasharray = this.vL; });
    this.vs = vs.map(v => v.style);
  },
  render(t) {
    TextFx.fadeFromRight(this.h, t, 0.15, { stagger: 0.09 });
    this.d.transform = 'translateY(' + lerp(1160, 0, eio(seg(t, 0, 0.75))) + 'px)';
    this.kids.forEach((s, i) => { s.opacity = eo(seg(t, 0.45 + i * 0.1, 0.8 + i * 0.1)); });
    this.ks.forEach((s, i) => { s.opacity = eo(seg(t, 0.6 + i * 0.1, 0.95 + i * 0.1)); });
    this.vs.forEach((s, i) => {
      s.strokeDashoffset = this.vL * (1 - eo(seg(t, 1.05 + i * 0.35, 1.3 + i * 0.35)));
      s.opacity = t < 1.05 + i * 0.35 ? 0 : 1;
    });
    const x = ei(seg(t, 3, 3.5));
    this.w.transform = 'scale(' + lerp(1, 1.02, seg(t, 0, 3)) * lerp(1, 0.9, x) + ')';
    this.w.opacity = 1 - x;
  },
});

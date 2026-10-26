const { seg, eo, eio, lerp, TextFx } = kit;
kit.scene('papeles', {
  init(kit) {
    const M = this.M = window.MDO;
    let bars = '';
    for (const w of [46, 34, 52, 40]) bars += '<div style="display:flex;justify-content:space-between"><div class="bar" style="width:' + w + '%"></div><div class="bar" style="width:16%"></div></div>';
    const task = (y, s) => '<div class="task papeles-c" style="left:1080px;top:' + y + 'px;width:520px;height:150px">' + s + '</div>';
    kit.stage.append(kit.h('<div class="ground"><div class="cam papeles-cam"><div class="cam papeles-g">' +
      '<div class="paper papeles-p" style="left:160px;top:600px;width:760px;height:620px;line-height:56px">' +
      '<p class="paper-hd">Recibo de sueldo</p>' +
      '<div class="row"><span>Puesto</span><b>Administración</b></div>' +
      '<div class="row"><span>Categoría</span><b>De ingreso</b></div><div>' + bars + '</div></div>' +
      '<svg class="art"><path class="ink-dark papeles-o"/></svg>' +
      task(882, 'Carga facturas') + task(716, 'Maneja la caja') + task(550, 'Aprueba pagos') +
      '<div class="lvl papeles-la" style="left:912px;top:872px;width:708px"></div>' +
      '<div class="words papeles-tag" style="left:1080px;top:1058px;width:520px"><p class="tag">Lo que hace hoy</p></div>' +
      '</div></div></div>'));
    const q = s => kit.stage.querySelector('.papeles-' + s);
    this.cam = q('cam');
    this.cam.append(M.bracket(kit), M.label(kit));
    this.g = q('g').style;
    this.p = q('p').style;
    this.kids = [...q('p').children].map(e => e.style);
    this.cs = [...kit.stage.querySelectorAll('.papeles-c')].map(e => e.style);
    this.la = q('la').style;
    this.tag = q('tag').style;
    let d = '';
    for (let i = 0; i <= 48; i++) {
      const a = -2.4 + i / 48 * 6.95, k = 1 + 0.05 * Math.sin(i * 0.4);
      d += (i ? 'L' : 'M') + (770 + 138 * k * Math.cos(a)).toFixed(1) + ' ' + (874 + 46 * k * Math.sin(a)).toFixed(1);
    }
    this.o = q('o');
    this.o.setAttribute('d', d);
    this.br = this.cam.querySelector('.mdo-br');
    this.lbl = this.cam.querySelector('.mdo-lbl');
    this.oL = this.o.getTotalLength();
    this.bL = this.br.getTotalLength();
    this.o.style.strokeDasharray = this.oL;
    this.br.style.strokeDasharray = this.bL;
    this.K = [
      { t: 0, cx: 540, cy: 960, z: 1 }, { t: 1.6, cx: 540, cy: 950, z: 1.02 },
      { t: 2.8, cx: 585, cy: 874, z: 1.25 }, { t: 4.3, cx: 588, cy: 872, z: 1.28 },
      { t: 5.8, cx: 1250, cy: 800, z: 1.1 }, { t: 8.4, cx: 1262, cy: 796, z: 1.12 },
      { t: 9.6, cx: 1610, cy: 760, z: 0.83 }, { t: 10.6, cx: 1618, cy: 756, z: 0.85 },
      { t: 12.1, cx: 1830, cy: 712, z: 1.56 }, Object.assign({ t: 13 }, M.END)];
  },
  render(t) {
    const M = this.M;
    M.applyCam(this.cam, M.camAt(this.K, t, eio));
    this.p.transform = 'translateY(' + lerp(1100, 0, eio(seg(t, 0, 1.1))) + 'px)';
    this.kids.forEach((s, i) => { s.opacity = eo(seg(t, 0.8 + i * 0.12, 1.25 + i * 0.12)); });
    this.o.style.strokeDashoffset = this.oL * (1 - eio(seg(t, 2.85, 3.35)));
    this.o.style.opacity = t < 2.85 ? 0 : 1;
    this.la.clipPath = 'inset(0 ' + 100 * (1 - eio(seg(t, 4.4, 5.6))) + '% 0 0)';
    this.cs.forEach((s, i) => {
      const p = seg(t, 6.2 + i * 0.75, 6.75 + i * 0.75);
      s.opacity = eo(seg(p, 0, 0.4));
      s.transform = 'translateY(' + lerp(-700, 0, eo(p)) + 'px)';
    });
    this.tag.opacity = eo(seg(t, 6.6, 7.1));
    this.br.style.strokeDashoffset = this.bL * (1 - eio(seg(t, 8.5, 9)));
    this.br.style.opacity = t < 8.5 ? 0 : 1;
    TextFx.fadeFromRight(this.lbl, t, 8.9, { dx: 30 });
    this.g.opacity = 1 - eio(seg(t, 10.9, 11.9));
  },
});

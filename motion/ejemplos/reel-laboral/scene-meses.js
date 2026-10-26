const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('meses', {
  init(kit) {
    const M = window.MDO;
    let boxes = '';
    for (let i = 0; i < 8; i++) boxes += '<div class="box meses-x" style="left:' + (155 + i * 98) + 'px;top:1110px;width:84px;height:84px"><div class="meses-f" style="position:absolute;inset:8px;background:var(--accent);transform-origin:50% 100%"></div></div>';
    kit.stage.append(kit.h('<div class="ground"><div class="cam meses-cam"></div><div class="cam meses-w" style="transform-origin:540px 960px">' +
      '<div class="words" style="left:110px;top:430px;width:860px"><p class="sub meses-a">Si la tarea es de una categoría superior,</p>' +
      '<h2 class="line meses-b" style="font-size:72px">la diferencia se puede reclamar hacia atrás.</h2></div>' + boxes +
      '<svg class="art"><path class="ink meses-br" style="stroke-width:8px"/></svg>' +
      '<div class="words meses-hoy" style="left:725px;top:1262px;width:200px;align-items:flex-end"><p class="tag">Hoy</p></div>' +
      '</div></div>'));
    const q = s => kit.stage.querySelector('.meses-' + s);
    const cam = q('cam');
    cam.append(M.label(kit));
    M.applyCam(cam, M.END);
    this.lbl = cam.querySelector('.mdo-lbl');
    this.a = q('a');
    this.b = q('b');
    this.br = q('br');
    this.w = q('w').style;
    this.hoy = q('hoy').style;
    const all = s => [...kit.stage.querySelectorAll('.meses-' + s)].map(e => e.style).reverse();
    this.xs = all('x');
    this.fs = all('f');
  },
  render(t) {
    TextFx.fadeOutLeft(this.lbl, t, 0.05);
    const p = eio(seg(t, 0.25, 1.15)), c = Math.cos(p * Math.PI / 2), s = Math.sin(p * Math.PI / 2);
    const L = lerp(259.2, 385, p), k = lerp(48, 36, p), X = lerp(263.2, 540, p), Y = lerp(960, 1236, p);
    const P = (x, y) => (X + x * c - y * s).toFixed(1) + ' ' + (Y + x * s + y * c).toFixed(1);
    this.br.setAttribute('d', 'M' + P(-k, -L) + 'L' + P(0, -L) + 'L' + P(0, L) + 'L' + P(-k, L));
    TextFx.fadeFromRight(this.a, t, 0.5, { stagger: 0.08 });
    TextFx.fadeFromRight(this.b, t, 1, { stagger: 0.09 });
    this.xs.forEach((x, i) => { x.opacity = eo(seg(t, 0.95 + i * 0.05, 1.25 + i * 0.05)); });
    this.fs.forEach((f, i) => { f.transform = 'scaleY(' + eo(seg(t, 1.25 + i * 0.12, 1.6 + i * 0.12)) + ')'; });
    this.hoy.opacity = eo(seg(t, 1.3, 1.7));
    this.w.transform = 'scale(' + lerp(1, 1.025, seg(t, 0, 4.3)) + ')';
    this.w.opacity = 1 - ei(seg(t, 3.75, 4.25));
  },
});

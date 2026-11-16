const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('linea', {
  init(kit) {
    const M = this.M = window.MDO;
    // Tres hitos sobre una línea de 2.780 px que la cámara recorre de izquierda a derecha.
    this.X = [300, 1350, 2400];
    const hito = (i, mes, a, b) =>
      '<div class="words" style="left:' + this.X[i] + 'px;top:820px;width:600px"><p class="tag co-tag linea-m" style="font-size:44px">' + mes + '</p></div>' +
      '<div class="words" style="left:' + this.X[i] + 'px;top:1010px;width:640px;gap:2px">' +
      '<p class="line linea-a" style="font-size:86px">' + a + '</p><p class="line line2 linea-b" style="font-size:86px">' + b + '</p></div>';
    kit.stage.append(kit.h('<div class="ground claro"><div class="co-iso">' + M.logo(kit, 'iso', true) + '</div><div class="cam linea-cam">' +
      '<svg class="art" viewBox="0 0 1080 1920"><path class="ink-dark linea-l" style="stroke-width:6" d="M120 960 H2900"/>' +
      this.X.map((x) => '<path class="ink-dark linea-k" style="stroke-width:6" d="M' + x + ' 920 V1000"/>').join('') +
      '<path class="ink-dark linea-o" style="stroke-width:5"/></svg>' +
      hito(0, 'Marzo', 'Cautelar', 'para Comercio') +
      hito(1, 'Noviembre', 'Prórroga', 'por seis meses') +
      hito(2, 'Después', 'Resuelve', 'la Cámara') +
      '</div></div>'));
    const all = (s) => [...kit.stage.querySelectorAll('.linea-' + s)];
    this.cam = kit.stage.querySelector('.linea-cam');
    this.l = all('l')[0];
    this.L = this.l.getTotalLength();
    this.l.style.strokeDasharray = this.L;
    this.k = all('k').map((el) => M.trazo(el));
    this.m = all('m'); this.a = all('a'); this.b = all('b');
    const o = all('o')[0];
    o.setAttribute('d', M.ovalo(1640, 1110, 370, 150));
    this.o = M.trazo(o);
    this.K = [
      { t: 0, cx: 640, cy: 1000, z: 1 }, { t: 1.9, cx: 666, cy: 998, z: 1.01 },
      { t: 3.0, cx: 1610, cy: 1010, z: 1.0 }, { t: 4.4, cx: 1622, cy: 1014, z: 1.03 },
      { t: 5.5, cx: 2650, cy: 1000, z: 1.0 }, { t: 6.6, cx: 2662, cy: 998, z: 1.02 }];
  },
  render(t) {
    const M = this.M;
    const c = M.camAt(this.K, t, eio);
    M.applyCam(this.cam, c);
    // La línea se dibuja por delante de la cámara: llega hasta el borde derecho del cuadro.
    const borde = c.cx + 540 / c.z + 60;
    const x = t < 0.8 ? lerp(120, 1240, eo(seg(t, 0, 0.8))) : Math.min(2900, Math.max(1240, borde));
    this.l.style.strokeDashoffset = this.L * (1 - (x - 120) / 2780);
    this.l.style.opacity = t > 0 ? 1 : 0;
    this.X.forEach((hx, i) => {
      const t0 = i === 0 ? 0.3 : (i === 1 ? 2.35 : 4.85);
      this.k[i](eo(seg(t, t0, t0 + 0.3)));
      TextFx.fadeFromRight(this.m[i], t, t0 + 0.1, { dur: 0.45, dx: 26 });
      TextFx.fadeFromRight(this.a[i], t, t0 + 0.25, { stagger: 0.08, dur: 0.5, dx: 26 });
      TextFx.fadeFromRight(this.b[i], t, t0 + 0.4, { stagger: 0.08, dur: 0.5, dx: 26 });
    });
    // Se rodea la prórroga: es la noticia.
    this.o(eio(seg(t, 3.25, 3.95)));
    this.cam.style.opacity = (1 - ei(seg(t, 6.05, 6.55))).toFixed(3);
  },
});

const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('revisar', {
  init(kit) {
    const M = this.M = window.MDO;
    const items = [['Liquidación de noviembre', 'con el aporte del 2,5 %'], ['Convenio aplicado', 'como estaba'], ['Si resuelve la Cámara', 'qué cambia desde ese mes']];
    const Y = [620, 870, 1120];
    kit.stage.append(kit.h('<div class="ground claro"><div class="co-iso">' + M.logo(kit, 'iso', true) + '</div>' +
      '<div class="cam revisar-cam">' +
      '<div class="words" style="left:110px;top:400px;width:850px"><p class="line revisar-h" style="font-size:80px">Lo que revisaríamos:</p></div>' +
      items.map((s, i) => '<p class="co-n revisar-n" style="position:absolute;margin:0;left:110px;top:' + (Y[i] + 10) + 'px">0' + (i + 1) + '</p>' +
        '<div class="words revisar-blk" style="left:220px;top:' + Y[i] + 'px;width:740px;gap:2px">' +
        '<p class="co-item revisar-i" style="font-size:54px">' + s[0] + '</p><p class="co-sub revisar-j">' + s[1] + '</p></div>').join('') +
      '<svg class="art" viewBox="0 0 1080 1920">' + Y.map(() => '<path class="ink-dark revisar-u" style="stroke-width:5"/>').join('') + '</svg>' +
      '</div></div>'));
    const all = (s) => [...kit.stage.querySelectorAll('.revisar-' + s)];
    this.cam = kit.stage.querySelector('.revisar-cam');
    this.h = all('h')[0];
    this.n = all('n'); this.i = all('i'); this.j = all('j');
    // Subrayado bajo cada bloque (se mide acá, en init).
    const sr = kit.stage.getBoundingClientRect();
    const sx = 1080 / sr.width;
    const blk = all('blk');
    this.u = all('u').map((el, k) => {
      const r = blk[k].getBoundingClientRect();
      const y = ((r.bottom - sr.top) * sx + 16).toFixed(1);
      el.setAttribute('d', 'M220 ' + y + ' H760');
      return M.trazo(el);
    });
  },
  render(t) {
    const M = this.M;
    M.applyCam(this.cam, M.camAt([{ t: 0, cx: 540, cy: 900, z: 1.0 }, { t: 5.6, cx: 540, cy: 905, z: 1.03 }], t, eio));
    TextFx.fadeFromRight(this.h, t, -0.35, { stagger: 0.07, dur: 0.5, dx: 30 });
    this.i.forEach((el, k) => {
      const t0 = 0.75 + k * 1.05;
      this.n[k].style.opacity = eo(seg(t, t0, t0 + 0.35)).toFixed(3);
      TextFx.fadeFromRight(el, t, t0 + 0.05, { stagger: 0.05, dur: 0.45, dx: 26 });
      TextFx.fadeFromRight(this.j[k], t, t0 + 0.2, { stagger: 0.05, dur: 0.45, dx: 26 });
      this.u[k](eio(seg(t, t0 + 0.5, t0 + 1.0)));
    });
    this.cam.style.opacity = (1 - ei(seg(t, 5.1, 5.6))).toFixed(3);
  },
});

const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('tope', {
  init(kit) {
    const M = this.M = window.MDO;
    // Escala: 1 % = 220 px. Base de las barras en y = 1300.
    kit.stage.append(kit.h('<div class="ground claro"><div class="co-iso">' + M.logo(kit, 'iso', true) + '</div>' +
      '<div class="cam tope-cam">' +
      '<div class="words" style="left:110px;top:330px;width:850px;gap:8px">' +
      '<p class="line tope-h" style="font-size:76px">Aportes al sindicato</p>' +
      '<p class="line line2 tope-s" style="font-size:60px">Suspendido para Comercio</p></div>' +
      '<div class="co-bar tope-ba" style="left:140px;top:860px;width:300px;height:440px"></div>' +
      '<div class="co-bar tope-bb" style="left:540px;top:750px;width:300px;height:550px"></div>' +
      '<p class="co-num tope-na" style="position:absolute;margin:0;left:140px;top:705px;font-size:140px">0 %</p>' +
      '<p class="co-num tope-nb" style="position:absolute;margin:0;left:540px;top:595px;font-size:140px">0 %</p>' +
      '<svg class="art" viewBox="0 0 1080 1920"><path class="ink-dark tope-base" style="stroke-width:3" d="M110 1300 H880"/>' +
      '<path class="ink-dark tope-x" d="M118 815 L430 700"/></svg>' +
      '<div class="lvl tope-lvl" style="left:110px;top:858px;width:770px"></div>' +
      '<div class="words" style="left:140px;top:1325px;width:380px;gap:0"><p class="co-lbl tope-la" style="font-size:52px">Tope</p><p class="co-lbl tope-la" style="font-size:52px">de la ley</p></div>' +
      '<div class="words" style="left:540px;top:1325px;width:380px;gap:0"><p class="co-lbl tope-lb" style="font-size:52px">Aporte</p><p class="co-lbl tope-lb" style="font-size:52px">solidario</p></div>' +
      '</div></div>'));
    const q = (s) => kit.stage.querySelector('.tope-' + s);
    const all = (s) => [...kit.stage.querySelectorAll('.tope-' + s)];
    this.cam = q('cam');
    this.ba = q('ba').style; this.bb = q('bb').style;
    this.na = q('na'); this.nb = q('nb');
    this.base = M.trazo(q('base'));
    this.x = M.trazo(q('x'));
    this.lvl = q('lvl').style;
    this.h = q('h'); this.s = q('s'); this.la = all('la'); this.lb = all('lb');
  },
  render(t) {
    const M = this.M;
    M.applyCam(this.cam, M.camAt([{ t: 0, cx: 540, cy: 980, z: 1 }, { t: 6.4, cx: 540, cy: 990, z: 1.035 }], t, eio));
    TextFx.fadeFromRight(this.h, t, -0.45, { stagger: 0.06, dur: 0.45, dx: 26 });
    this.base(eio(seg(t, 0, 0.5)));
    // Las barras crecen desde la base y la cifra cuenta con ellas.
    const pa = eio(seg(t, 0.35, 1.35)), pb = eio(seg(t, 0.85, 1.95));
    this.ba.transform = 'scaleY(' + pa.toFixed(4) + ')';
    this.bb.transform = 'scaleY(' + pb.toFixed(4) + ')';
    const va = 2 * pa, vb = 2.5 * pb;
    this.na.textContent = (va >= 1.995 ? '2' : va.toFixed(1).replace('.', ',')) + ' %';
    this.nb.textContent = vb.toFixed(1).replace('.', ',') + ' %';
    this.na.style.transform = 'translateY(' + (440 * (1 - pa)).toFixed(1) + 'px)';
    this.nb.style.transform = 'translateY(' + (550 * (1 - pb)).toFixed(1) + 'px)';
    const apaga = eio(seg(t, 3.7, 4.2));
    this.na.style.opacity = Math.min(eo(seg(t, 0.55, 0.9)), 1 - 0.55 * apaga).toFixed(3);
    this.nb.style.opacity = eo(seg(t, 1.05, 1.4)).toFixed(3);
    this.la.forEach((el, i) => TextFx.fadeFromRight(el, t, 1.1 + i * 0.12, { dur: 0.45, dx: 24 }));
    this.lb.forEach((el, i) => TextFx.fadeFromRight(el, t, 1.6 + i * 0.12, { dur: 0.45, dx: 24 }));
    // El tope de la ley se marca a la altura del 2 % y se tacha: para Comercio está suspendido.
    this.lvl.transform = 'scaleX(' + eio(seg(t, 2.3, 2.9)).toFixed(4) + ')';
    this.x(eio(seg(t, 3.35, 3.8)));
    // La barra del tope se apaga con un gris opaco (con opacidad se vería el isotipo detrás).
    this.ba.background = 'color-mix(in srgb, var(--ground) ' + (100 - 58 * apaga).toFixed(1) + '%, var(--second))';
    this.lvl.opacity = (1 - 0.6 * apaga).toFixed(3);
    TextFx.fadeFromRight(this.s, t, 4.0, { stagger: 0.06, dur: 0.5, dx: 26 });
    this.cam.style.opacity = (1 - ei(seg(t, 5.9, 6.4))).toFixed(3);
  },
});

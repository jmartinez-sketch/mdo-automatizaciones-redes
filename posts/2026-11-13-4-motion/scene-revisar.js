const { seg, eo, ei, eio, lerp } = kit;
kit.scene('revisar', {
  init(kit) {
    const fichas = [[640, 140, 'Las ventas del mes'], [920, 170, 'Lo que se resta, documentado'], [1230, 140, 'La base de cada provincia']];
    let fx = '';
    fichas.forEach((f, i) => {
      fx += '<div class="ib-ficha revisar-f" style="left:150px;top:' + f[0] + 'px;width:780px;height:' + f[1] + 'px">' +
        '<span class="revisar-ft">' + f[2] + '</span>' +
        (i === 2 ? '<div class="ib-fill revisar-fill" style="display:flex;align-items:center;padding:0 41px;color:var(--second)"><span>' + f[2] + '</span></div>' : '') + '</div>';
    });
    const flecha = (y0, y1) => '<path class="ink revisar-fl" d="M540 ' + y0 + ' V' + y1 + ' M518 ' + (y1 - 26) + ' L540 ' + y1 + ' L562 ' + (y1 - 26) + '"/>';
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.ibIso(kit) +
      '<div class="ib-paper revisar-p" style="left:0;top:0;width:1080px;height:1920px"></div>' +
      '<div class="revisar-g" style="position:absolute;inset:0">' +
      '<div class="words" style="left:150px;top:430px;width:820px"><h2 class="line revisar-h" style="font-size:84px">' +
      MDO.ibWords([['Lo', ''], ['que', ''], ['revisaríamos:', '']]) + '</h2></div>' + fx +
      '<svg class="art" viewBox="0 0 1080 1920">' + flecha(796, 906) + flecha(1106, 1216) + '</svg></div></div>'));
    const q = (s) => kit.stage.querySelector('.revisar-' + s);
    this.p = q('p').style;
    this.g = q('g').style;
    this.h = [...q('h').querySelectorAll('.ib-w')];
    this.f = [...kit.stage.querySelectorAll('.revisar-f')].map((e) => e.style);
    this.fl = [...kit.stage.querySelectorAll('.revisar-fl')].map((e) => MDO.trazo(e));
    this.fill = q('fill').style;
  },
  render(t) {
    // El papel de la escena anterior se aclara y deja el fondo claro.
    this.p.opacity = 1 - eio(seg(t, 0.1, 0.9));
    MDO.ibIn(this.h, t, 0, eo, { stagger: 0.12, dur: 0.5, dx: 28 });
    const at = [1.25, 2.45, 3.65];
    this.f.forEach((s, i) => {
      const p = eo(seg(t, at[i], at[i] + 0.5));
      s.opacity = p;
      s.transform = 'translateY(' + lerp(36, 0, p).toFixed(1) + 'px)';
    });
    this.fl[0](eio(seg(t, 1.85, 2.4)));
    this.fl[1](eio(seg(t, 3.05, 3.6)));
    // La base de cada provincia queda marcada: la ficha se llena de azul noche.
    const m = eio(seg(t, 4.3, 4.85));
    this.fill.clipPath = 'inset(0 ' + (100 * (1 - m)).toFixed(2) + '% 0 0)';
    this.g.opacity = 1 - ei(seg(t, 5.55, 6));
  },
});

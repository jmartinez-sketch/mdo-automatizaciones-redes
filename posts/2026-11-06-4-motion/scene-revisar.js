const { seg, eo, eio, lerp, TextFx } = kit;
kit.scene('revisar', {
  init(kit) {
    const items = [
      ['reloj', 'Fecha acordada con el auditor'],
      ['balanza', 'Mercadería de terceros, aparte'],
      ['documento', 'Corte de remitos y facturas'],
      ['calculadora', 'Planillas numeradas y firmadas'],
    ];
    let filas = '';
    items.forEach((it, i) => {
      const y = 660 + i * 190;
      filas += MDO.stIcono(kit, it[0], 110, 'revisar-i', 'left:120px;top:' + y + 'px') +
        '<div class="words" style="left:270px;top:' + (y + 24) + 'px;width:680px"><p class="st-lbl revisar-l">' + it[1] + '</p></div>';
    });
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.stIso(kit) +
      '<div class="revisar-g" style="position:absolute;inset:0;transform-origin:540px 960px">' +
      '<div class="words" style="left:120px;top:380px;width:840px"><h2 class="line revisar-h" style="font-size:72px">Antes del recuento, revisaríamos:</h2></div>' +
      filas + '</div></div>'));
    this.g = kit.stage.querySelector('.revisar-g').style;
    this.h = kit.stage.querySelector('.revisar-h');
    this.ics = [...kit.stage.querySelectorAll('.revisar-i')].map((e) => MDO.stDibujo(e));
    this.lbls = [...kit.stage.querySelectorAll('.revisar-l')];
  },
  render(t) {
    TextFx.fadeFromRight(this.h, t, -0.15, { stagger: 0.07 });
    this.ics.forEach((f, i) => f(eo(seg(t, 0.9 + i * 1.15, 1.7 + i * 1.15))));
    this.lbls.forEach((el, i) => TextFx.fadeFromRight(el, t, 1.2 + i * 1.15, { stagger: 0.07, dur: 0.45, dx: 24 }));
    const x = eio(seg(t, 5.8, 6.4));
    this.g.opacity = 1 - x;
    this.g.transform = 'scale(' + lerp(1, 1.012, seg(t, 0, 5.8)) * lerp(1, 0.97, x) + ')';
  },
});

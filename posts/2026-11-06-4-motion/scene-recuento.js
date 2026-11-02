const { seg, eo, ei, lerp, TextFx } = kit;
kit.scene('recuento', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.stIso(kit) + MDO.stTitular(kit, 'recuento', true) +
      MDO.stGrid(kit, 'recuento') + MDO.stFalta(kit, 'recuento') + '</div>'));
    const q = (s) => kit.stage.querySelector('.recuento-' + s);
    this.tag = q('tag');
    this.bx = [...kit.stage.querySelectorAll('.recuento-bx')].map((e) => e.style);
    this.ck = [...kit.stage.querySelectorAll('.recuento-ck')].map((e) => MDO.trazo(e));
    this.falta = q('falta').style;
    this.lupa = MDO.stDibujo(q('lupa'));
    this.sin = q('sin');
  },
  render(t) {
    TextFx.fadeFromRight(this.tag, t, 0.05, { stagger: 0.08 });
    // Los casilleros aparecen y se cuentan de a uno, fila por fila.
    this.bx.forEach((s, i) => {
      s.opacity = eo(seg(t, 0.1 + i * 0.025, 0.5 + i * 0.025));
      const c = eo(seg(t, 0.9 + i * 0.12, 1.15 + i * 0.12));
      s.background = 'color-mix(in srgb, var(--ground) ' + (c * 12).toFixed(1) + '%, color-mix(in srgb, var(--second) 35%, transparent))';
      s.borderColor = 'color-mix(in srgb, var(--ground) ' + (30 + c * 45).toFixed(1) + '%, transparent)';
    });
    this.ck.forEach((f, i) => f(eo(seg(t, 0.95 + i * 0.12, 1.25 + i * 0.12))));
    // Abajo, el lugar del auditor queda vacío.
    this.falta.opacity = eo(seg(t, 3.7, 4.2));
    this.lupa(eo(seg(t, 3.9, 4.6)));
    TextFx.fadeFromRight(this.sin, t, 4.3, { stagger: 0.09 });
  },
});

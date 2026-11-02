const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('informe', {
  init(kit) {
    let bars = '';
    [100, 86, 94, 70, 90, 58].forEach((w) => { bars += '<div class="bar" style="width:' + w + '%"></div>'; });
    kit.stage.append(kit.h('<div class="ground claro">' + MDO.stIso(kit) +
      '<div class="informe-g" style="position:absolute;inset:0;transform-origin:540px 960px">' +
      MDO.stTitular(kit, 'informe', true) +
      '<div class="informe-fondo" style="position:absolute;inset:0">' + MDO.stGrid(kit, 'informe') + MDO.stFalta(kit, 'informe') + '</div>' +
      '<div class="paper informe-p" style="left:160px;top:700px;width:760px;height:640px">' +
      '<p class="paper-hd" style="font-size:40px;letter-spacing:.12em">Informe de auditoría</p>' + bars + '</div>' +
      '<div class="st-sello informe-s" style="left:210px;top:1010px;width:660px"><b>Con salvedad</b><span>sobre el stock</span></div>' +
      '</div></div>'));
    const q = (s) => kit.stage.querySelector('.informe-' + s);
    this.g = q('g').style;
    this.fondo = q('fondo').style;
    this.p = q('p').style;
    this.s = q('s').style;
    // Arranca donde terminó «recuento»: casilleros contados y el lugar vacío a la vista.
    kit.stage.querySelectorAll('.informe-bx').forEach((e) => {
      e.style.background = 'color-mix(in srgb, var(--ground) 12%, color-mix(in srgb, var(--second) 35%, transparent))';
      e.style.borderColor = 'color-mix(in srgb, var(--ground) 75%, transparent)';
    });
    kit.stage.querySelectorAll('.informe-ck').forEach((e) => MDO.trazo(e)(1));
    MDO.stDibujo(q('lupa'))(1);
  },
  render(t) {
    this.fondo.opacity = 1 - 0.85 * eo(seg(t, 0, 0.6));
    const pp = eio(seg(t, 0.2, 1.0));
    this.p.opacity = eo(seg(t, 0.2, 0.7));
    this.p.transform = 'translateY(' + lerp(420, 0, pp) + 'px)';
    // El sello cae sobre el informe: se achica hasta su lugar, sin rebote.
    const ks = eo(seg(t, 1.6, 2.1));
    this.s.opacity = ks;
    this.s.transform = 'rotate(-4deg) scale(' + lerp(1.18, 1, ks) + ')';
    const x = eio(seg(t, 3.9, 4.6));
    this.g.opacity = 1 - x;
    this.g.transform = 'scale(' + lerp(1, 1.015, seg(t, 0, 3.9)) * lerp(1, 0.97, x) + ')';
  },
});

const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('firma', {
  init(kit) {
    const M = this.M = window.MDO;
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="firma-logo" style="position:absolute;left:250px;top:760px;width:580px">' + M.logo(kit, 'principal', false) + '</div>' +
      '<div class="words" style="left:140px;top:1130px;width:800px;align-items:center"><p class="vol firma-w" style="font-size:42px;letter-spacing:.14em;color:var(--second)">Liquidación de sueldos</p></div>' +
      '<svg class="art" viewBox="0 0 1080 1920"><path class="ink firma-u" style="stroke-width:3" d="M390 1218 H690"/></svg>' +
      '<div class="ground claro firma-velo"><div class="co-iso">' + M.logo(kit, 'iso', true) + '</div></div></div>'));
    const q = (s) => kit.stage.querySelector('.firma-' + s);
    this.logo = q('logo').style;
    this.w = q('w');
    this.u = M.trazo(q('u'));
    this.velo = q('velo').style;
  },
  render(t) {
    // Del claro de la escena anterior al azul noche, sin corte brusco.
    this.velo.opacity = (1 - eio(seg(t, 0, 0.6))).toFixed(3);
    const p = eo(seg(t, 0.25, 1.05));
    this.logo.opacity = p.toFixed(3);
    this.logo.transform = 'scale(' + lerp(0.96, 1, p).toFixed(4) + ')';
    TextFx.fadeFromRight(this.w, t, 0.75, { stagger: 0.06, dur: 0.5, dx: 20 });
    this.u(eio(seg(t, 1.2, 1.7)));
  },
});

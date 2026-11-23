const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('titulo', {
  init(kit) {
    const M = this.M = window.MDO;
    // Un <p> por renglón: el corte de cada línea es el que se eligió.
    kit.stage.append(kit.h('<div class="ground">' +
      '<div class="ve-foto titulo-foto"></div><div class="ve-velo"></div>' +
      '<div class="words" style="left:110px;top:830px;width:850px;gap:6px">' +
      '<p class="vol titulo-x" style="font-size:40px;margin-bottom:26px;color:var(--accent)">Servicios societarios</p>' +
      '<p class="line titulo-x" style="font-size:104px">La sociedad</p>' +
      '<p class="line titulo-x" style="font-size:104px">que nadie usa</p>' +
      '<p class="line line2 titulo-x" style="font-size:96px">sigue sumando</p>' +
      '<p class="line line2 titulo-x" style="font-size:96px">vencimientos.</p></div>' +
      '<div class="ground claro titulo-capa"><div class="ve-iso">' + M.logo(kit, 'iso', true) + '</div></div>' +
      '<div class="ve-banda titulo-banda"></div></div>'));
    const q = (s) => kit.stage.querySelector('.titulo-' + s);
    q('foto').style.backgroundImage = 'url("' + kit.assets.url('edificios.jpg') + '")';
    this.foto = q('foto').style;
    this.els = [...kit.stage.querySelectorAll('.titulo-x')];
    this.capa = q('capa').style;
    this.banda = q('banda').style;
  },
  render(t) {
    // El titular entra antes del primer cuadro: a t = 0 ya se lee entero.
    this.els.forEach((el, i) => TextFx.fadeFromRight(el, t, -1.4 + i * 0.1, { stagger: 0.05, dur: 0.55, dx: 30 }));
    // La foto se acerca apenas (3,5 %), para que el cuadro no quede quieto.
    this.foto.transform = 'scale(' + lerp(1, 1.035, eio(seg(t, -1, 3.8))).toFixed(4) + ')';
    // Cortina de papel: barre la pantalla y deja el fondo claro de la escena siguiente.
    this.M.cortina(this.capa, this.banda, eio(seg(t, 3.0, 3.75)));
  },
});

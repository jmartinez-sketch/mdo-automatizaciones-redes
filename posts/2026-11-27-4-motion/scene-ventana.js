const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('ventana', {
  init(kit) {
    const M = this.M = window.MDO;
    kit.stage.append(kit.h('<div class="ground claro"><div class="ve-iso">' + M.logo(kit, 'iso', true) + '</div>' + M.ventanaHTML('ventana', false) + '</div>'));
    this.win = kit.stage.querySelector('.ventana-win').style;
    this.filas = [...kit.stage.querySelectorAll('.ventana-fila')].map((e) => e.style);
    this.txt = [...kit.stage.querySelectorAll('.ventana-txt')];
    this.caret = [...kit.stage.querySelectorAll('.ventana-caret')].map((e) => e.style);
  },
  render(t) {
    const V = this.M.VE;
    // La ventana entra desde abajo (suave al arrancar, sin aparecer de golpe) y después sube
    // apenas, sin quedar quieta.
    const a = eio(seg(t, 0.05, 0.85));
    this.win.opacity = a.toFixed(3);
    this.win.transform = 'translateY(' + (lerp(48, 0, a) + V.deriva * eio(seg(t, 0.85, 7))).toFixed(1) + 'px)';
    // Cada fila: aparece el rótulo y el valor se escribe letra por letra.
    V.filas.forEach(([, val], i) => {
      const t0 = 0.95 + i * 1.15;
      const l = eo(seg(t, t0, t0 + 0.35));
      this.filas[i].opacity = l.toFixed(3);
      this.filas[i].transform = 'translateX(' + lerp(24, 0, l).toFixed(1) + 'px)';
      const fin = t0 + 0.3 + val.length * 0.045;
      this.txt[i].textContent = val.slice(0, Math.round(val.length * seg(t, t0 + 0.3, fin)));
      this.caret[i].opacity = t >= t0 + 0.25 && t < fin + 0.12 ? 1 : 0;
    });
  },
});

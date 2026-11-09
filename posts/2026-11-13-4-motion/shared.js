// Lo propio de este film: dónde queda «Ingresos Brutos» (lo comparten «titulo» y «mito»), el
// bloque de lo facturado (lo usan «realidad» y el corte a «revisar») y las palabras sueltas que
// entran y salen de a una. Todo es función de t: nada de timers ni medidas en render.
Object.assign(window.MDO, {
  IB: { x: 150, y: 780, fs: 92 },
  BLOQUE: { x: 190, w: 700, top: 500, franja: 170, fondo: 1470 },
  ibSeg(t, a, b) { return Math.max(0, Math.min(1, (t - a) / (b - a))); },
  // Un span por palabra: [[palabra, clase], …] → markup separado por espacios.
  ibWords(ws) { return ws.map((w) => '<span class="ib-w ' + (w[1] || '') + '">' + w[0] + '</span>').join(' '); },
  // Las palabras entran desde la derecha de a una (o salen hacia la izquierda con ibOut).
  ibIn(spans, t, t0, ease, o) {
    const st = (o && o.stagger) || 0.09, d = (o && o.dur) || 0.5, dx = o && o.dx != null ? o.dx : 28;
    spans.forEach((s, i) => {
      const p = ease(MDO.ibSeg(t, t0 + i * st, t0 + i * st + d));
      s.style.opacity = p;
      s.style.transform = 'translateX(' + (dx * (1 - p)).toFixed(2) + 'px)';
    });
  },
  ibOut(spans, t, t0, ease, o) {
    const st = (o && o.stagger) || 0.06, d = (o && o.dur) || 0.4, dx = o && o.dx != null ? o.dx : 24;
    spans.forEach((s, i) => {
      const p = ease(MDO.ibSeg(t, t0 + i * st, t0 + i * st + d));
      s.style.opacity = 1 - p;
      s.style.transform = 'translateX(' + (-dx * p).toFixed(2) + 'px)';
    });
  },
  ibIso(kit) { return '<div class="ib-iso">' + MDO.logo(kit, 'iso', true) + '</div>'; },
});

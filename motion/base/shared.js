// Ayudas comunes de los videos de Motion de MDO. scripts/motion-video.js pone este archivo
// primero en el shared.js de cada film; el film suma las suyas con
// Object.assign(window.MDO, { … }) en su propio shared.js (nunca window.MDO = …).
window.MDO = {
  // Cámara sobre una capa .cam: claves { t, cx, cy, z }. El punto (cx, cy) de la escena queda
  // en el centro del cuadro (540, 960) con zoom z; entre clave y clave, `ease` (kit.eio para
  // empujes y paneos). El zoom se interpola en escala logarítmica. Para una pausa con vida,
  // dos claves casi iguales (un 1-3 % de zoom o unos px de diferencia).
  camAt(keys, t, ease) {
    if (t <= keys[0].t) return keys[0];
    for (let i = 1; i < keys.length; i++) {
      const a = keys[i - 1], b = keys[i];
      if (t <= b.t) {
        const p = ease((t - a.t) / (b.t - a.t));
        return { cx: a.cx + (b.cx - a.cx) * p, cy: a.cy + (b.cy - a.cy) * p, z: Math.exp(Math.log(a.z) + (Math.log(b.z) - Math.log(a.z)) * p) };
      }
    }
    return keys[keys.length - 1];
  },
  applyCam(el, c) {
    el.style.transform = 'translate(' + (540 - c.cx * c.z) + 'px,' + (960 - c.cy * c.z) + 'px) scale(' + c.z + ')';
  },
  // Ícono del design system (Icon.jsx: viewBox 24, trazo 1.7, color del texto), como markup
  // para meter en un kit.h. Con clase 'fino' el trazo queda en 4 px a cualquier tamaño.
  // Nombres: los de mdo-templates/iconos-mdo.json (reloj, grafico, escudo, documento, …).
  icono(kit, nombre, px, clase) {
    const set = kit.json('iconos.json') || {};
    return '<svg class="icono' + (clase ? ' ' + clase : '') + '" viewBox="0 0 24 24" width="' + px + '" height="' + px + '">' + (set[nombre] || '') + '</svg>';
  },
  // Logos del design system como markup: cual = 'principal' | 'iso'; navy = true sobre fondo claro.
  logo(kit, cual, navy) {
    return kit.module((cual === 'iso' ? 'iso' : 'logo') + (navy ? '-navy' : '') + '.html') || '';
  },
  // Óvalo a mano alzada (para rodear una palabra): devuelve el `d` de un path que da una
  // vuelta y un poco más, con el radio apenas irregular.
  ovalo(cx, cy, rx, ry) {
    let d = '';
    for (let i = 0; i <= 48; i++) {
      const a = -2.4 + i / 48 * 6.95, k = 1 + 0.05 * Math.sin(i * 0.4);
      d += (i ? 'L' : 'M') + (cx + rx * k * Math.cos(a)).toFixed(1) + ' ' + (cy + ry * k * Math.sin(a)).toFixed(1);
    }
    return d;
  },
  // Trazo que se dibuja: prepara un path (o línea, rect, círculo) y devuelve p => …, con p de
  // 0 a 1. Oculto en 0, así la punta redondeada no deja un punto antes de empezar.
  trazo(el) {
    const L = el.getTotalLength();
    el.style.strokeDasharray = L;
    return (p) => { el.style.strokeDashoffset = L * (1 - p); el.style.opacity = p > 0 ? 1 : 0; };
  },
};

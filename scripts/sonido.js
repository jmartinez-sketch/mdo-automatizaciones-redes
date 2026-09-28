// Sonido del video de marca: pocos toques sintetizados, todos en la misma sala.
//
// Lo llama video.js con los momentos del video (cuándo se traza el isotipo, cuándo entra cada
// titular, cuándo se retira el texto, cuándo se traza el logo) y devuelve un WAV del largo exacto.
// Todo se sintetiza acá, sin muestras ni música de terceros: no hay derechos que cuidar.
//
// Criterio (tono de marca: estratégico, claro, seguro, cercano):
//   - pocos sonidos: menos que movimientos. El texto corrido no suena; suenan los titulares, los
//     rótulos y los cambios grandes (apertura, retirada, firma);
//   - materiales con cuerpo, no tonos puros: un tono puro suena a juguete;
//   - una sola sala para todo, con reverberación corta: es lo que hace que los sonidos sean de una
//     misma pieza y no queden pegados encima de la imagen;
//   - silencio mientras se lee.
const fs = require('fs');

const SR = 48000;

// Ruido reproducible: el mismo video suena igual cada vez que se renderiza.
function azar(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (((t ^ (t >>> 14)) >>> 0) / 4294967296) * 2 - 1;
  };
}

// Filtro de segundo orden (fórmulas de Robert Bristow-Johnson). tipo: 'lp' | 'hp' | 'bp'.
function filtro(tipo, f, q = 0.707) {
  const s = { x1: 0, x2: 0, y1: 0, y2: 0, b0: 0, b1: 0, b2: 0, a1: 0, a2: 0 };
  s.set = (fr, qq = q) => {
    const w = 2 * Math.PI * Math.min(Math.max(fr, 20), SR / 2 - 200) / SR;
    const al = Math.sin(w) / (2 * qq), c = Math.cos(w), a0 = 1 + al;
    if (tipo === 'lp') { s.b0 = (1 - c) / 2 / a0; s.b1 = (1 - c) / a0; s.b2 = s.b0; }
    else if (tipo === 'hp') { s.b0 = (1 + c) / 2 / a0; s.b1 = -(1 + c) / a0; s.b2 = s.b0; }
    else { s.b0 = al / a0; s.b1 = 0; s.b2 = -al / a0; }
    s.a1 = -2 * c / a0; s.a2 = (1 - al) / a0;
  };
  s.paso = (x) => {
    const y = s.b0 * x + s.b1 * s.x1 + s.b2 * s.x2 - s.a1 * s.y1 - s.a2 * s.y2;
    s.x2 = s.x1; s.x1 = x; s.y2 = s.y1; s.y1 = y;
    return y;
  };
  s.set(f);
  return s;
}

// ---------- Materiales (cada uno devuelve una señal mono) ----------

// Aire: ruido por un filtro que se desliza de f0 a f1. Para lo que se mueve grande (el isotipo que
// se expande, el texto que se retira). pico: en qué parte del sonido está lo más fuerte (0 a 1).
function aire(dur, f0, f1, { q = 1.3, pico = 0.5, semilla = 1 } = {}) {
  const n = Math.round(dur * SR), out = new Float32Array(n), r = azar(semilla);
  const bp = filtro('bp', f0, q), lp = filtro('lp', 5500);
  for (let i = 0; i < n; i++) {
    const u = i / n;
    if (i % 64 === 0) bp.set(f0 * Math.pow(f1 / f0, u));
    // Envolvente suave con el máximo en `pico`.
    const e = u < pico ? Math.sin((u / pico) * Math.PI / 2) : Math.cos(((u - pico) / (1 - pico)) * Math.PI / 2);
    out[i] = lp.paso(bp.paso(r())) * e * e * 2.2;
  }
  return out;
}

// Toque: una barra golpeada (parciales 1 · 2,76 · 5,40, los de una barra libre), cada parcial se
// apaga más rápido que el anterior, y un chasquido de ruido muy corto al principio.
function toque(f, dur, { brillo = 0.5, semilla = 2 } = {}) {
  const n = Math.round(dur * SR), out = new Float32Array(n), r = azar(semilla);
  const parciales = [[1, 1, 1], [2.756, 0.32 * brillo, 2.6], [5.404, 0.12 * brillo, 5]];
  const hp = filtro('bp', 2600, 0.9);
  const tau = dur / 4.2;
  for (let i = 0; i < n; i++) {
    const t = i / SR, ataque = Math.min(1, t / 0.0025);
    let v = 0;
    for (const [k, a, rap] of parciales) v += a * Math.sin(2 * Math.PI * f * k * t) * Math.exp(-t * rap / tau);
    const chasquido = t < 0.012 ? hp.paso(r()) * (1 - t / 0.012) * 0.5 * brillo : 0;
    out[i] = (v * ataque + chasquido) * 0.5;
  }
  return out;
}

// Grave: un golpe que se siente más de lo que se oye (seno que cae de afinación, apenas saturado).
function grave(f, dur) {
  const n = Math.round(dur * SR), out = new Float32Array(n);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const fr = f * (1 + 0.6 * Math.exp(-t / 0.035));
    fase += 2 * Math.PI * fr / SR;
    const e = Math.min(1, t / 0.004) * Math.exp(-t / (dur / 4.5));
    out[i] = Math.tanh(Math.sin(fase) * 1.4) / Math.tanh(1.4) * e * 0.8;
  }
  return out;
}

// ---------- La sala ----------
// Reverberación tipo Freeverb (8 peines con amortiguación + 4 pasatodos por canal; el derecho,
// corrido unas muestras para abrir el estéreo), con 12 ms de pre-retardo. Sala chica: ~1 s de cola.
function sala(L, R) {
  const k = SR / 44100;
  const peines = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], pasas = [556, 441, 341, 225];
  const fb = 0.8, amort = 0.3, pre = Math.round(0.012 * SR);
  const canal = (x, corr) => {
    const n = x.length, y = new Float32Array(n);
    const cs = peines.map((d) => ({ b: new Float32Array(Math.round((d + corr) * k)), i: 0, f: 0 }));
    const as = pasas.map((d) => ({ b: new Float32Array(Math.round((d + corr) * k)), i: 0 }));
    for (let i = 0; i < n; i++) {
      const xin = (i >= pre ? x[i - pre] : 0) * 0.015;
      let s = 0;
      for (const c of cs) {
        const o = c.b[c.i];
        c.f = o * (1 - amort) + c.f * amort;
        c.b[c.i] = xin + c.f * fb;
        c.i = (c.i + 1) % c.b.length;
        s += o;
      }
      for (const a of as) {
        const o = a.b[a.i];
        a.b[a.i] = s + o * 0.5;
        a.i = (a.i + 1) % a.b.length;
        s = o - s;
      }
      y[i] = s;
    }
    return y;
  };
  return [canal(L, 0), canal(R, 23)];
}

// ---------- La partitura ----------
// Escala de re pentatónica, en registro medio-grave: cálida, sin sonar a timbre ni a notificación.
const ESCALA = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];

function partitura(eventos, { claro }) {
  const notas = [];
  const pan = (x) => Math.max(-0.5, Math.min(0.5, ((x == null ? 0.5 : x) - 0.5) * 1.1));
  let titular = 0, rotulo = 0;
  const ultimo = {};
  for (const e of [...eventos].sort((a, b) => a.t - b.t)) {
    const s = e.t / 1000;
    // Dos sonidos del mismo tipo a menos de 350 ms: queda uno.
    if (ultimo[e.tipo] != null && s - ultimo[e.tipo] < 0.35) continue;
    ultimo[e.tipo] = s;
    switch (e.tipo) {
      case 'trazo': // el isotipo se dibuja: un aire que sube, largo y bajo
        notas.push({ s, sig: aire(e.dur / 1000 + 0.3, 160, 1300, { q: 1.1, pico: 0.75, semilla: 11 }), g: 0.16, envio: 0.55 });
        break;
      case 'expansion': // el isotipo crece y se vuelve marca de agua
        notas.push({ s: s - 0.05, sig: aire(1.0, 1500, 240, { q: 1.2, pico: 0.22, semilla: 12 }), g: 0.3, envio: 0.5 });
        notas.push({ s, sig: grave(73.42, 1.1), g: 0.12, envio: 0.2 });
        notas.push({ s: s + 0.02, sig: toque(ESCALA[0], 1.6, { brillo: 0.35, semilla: 13 }), g: 0.1, envio: 0.6 });
        break;
      case 'persianas': // Institucional: las persianas se abren de izquierda a derecha
        notas.push({ s, sig: aire(0.85, 900, 3200, { q: 1.6, pico: 0.45, semilla: 14 }), g: 0.2, envio: 0.45, p0: -0.45, p1: 0.45 });
        notas.push({ s: s + 0.05, sig: grave(73.42, 0.9), g: 0.1, envio: 0.2 });
        break;
      case 'rotulo': // el rótulo abre el tracking: un soplo agudo y corto
        if (rotulo++ > 2) break;
        notas.push({ s, sig: aire(0.5, 2200, 6000, { q: 2, pico: 0.3, semilla: 20 + rotulo }), g: 0.07, envio: 0.4, p0: pan(e.x) });
        break;
      case 'titular': { // cada titular, un toque que sube por la escala
        const f = ESCALA[Math.min(titular, ESCALA.length - 1)];
        notas.push({ s, sig: toque(f, 1.4, { brillo: 0.55, semilla: 30 + titular }), g: 0.17 * Math.pow(0.88, titular), envio: 0.45, p0: pan(e.x) });
        titular++;
        break;
      }
      case 'salida': // el texto se retira hacia arriba
        notas.push({ s, sig: aire(0.7, 700, 2400, { q: 1.3, pico: 0.35, semilla: 40 }), g: 0.14, envio: 0.5 });
        break;
      case 'logo': // se traza el logo principal: aire largo que acompaña el trazo y un grave al empezar
        notas.push({ s: s - 0.1, sig: aire(1.6, 220, 1800, { q: 1.1, pico: 0.6, semilla: 50 }), g: 0.15, envio: 0.6 });
        notas.push({ s: s + 0.85, sig: grave(55, 1.6), g: 0.13, envio: 0.25 });
        break;
      case 'web': // la firma: una nota sola que se apaga en la sala
        notas.push({ s, sig: toque(ESCALA[3], 2.4, { brillo: 0.4, semilla: 60 }), g: 0.11, envio: 0.7 });
        notas.push({ s: s + 0.04, sig: toque(ESCALA[0], 2.4, { brillo: 0.2, semilla: 61 }), g: 0.06, envio: 0.7 });
        break;
      default:
    }
  }
  // Sobre fondo claro, un poco menos de aire: el oído lo espera más seco.
  if (claro) notas.forEach((n) => { n.envio *= 0.85; });
  return notas;
}

// Mezcla y escribe el WAV (48 kHz, estéreo, 16 bits). Devuelve el pico en dBFS.
function mezclar({ T, eventos, claro }, ruta) {
  const n = Math.ceil(T / 1000 * SR);
  const L = new Float32Array(n), R = new Float32Array(n), eL = new Float32Array(n), eR = new Float32Array(n);
  for (const nota of partitura(eventos, { claro })) {
    const i0 = Math.round(nota.s * SR), m = nota.sig.length;
    // Cada sonido termina en cero (25 ms de rampa): si la cola se corta en seco, se oye un clic.
    const cola = Math.min(m, Math.round(0.025 * SR));
    const p0 = nota.p0 || 0, p1 = nota.p1 == null ? p0 : nota.p1;
    for (let j = 0; j < m; j++) {
      const i = i0 + j;
      if (i < 0 || i >= n) continue;
      const p = p0 + (p1 - p0) * (j / m);
      // Paneo de potencia constante.
      const a = (p + 1) * Math.PI / 4, gl = Math.cos(a), gr = Math.sin(a);
      const v = nota.sig[j] * nota.g * (j > m - cola ? (m - j) / cola : 1);
      L[i] += v * gl; R[i] += v * gr;
      eL[i] += v * gl * nota.envio; eR[i] += v * gr * nota.envio;
    }
  }
  const [wL, wR] = sala(eL, eR);
  // Pasaaltos a 35 Hz: debajo de eso ningún parlante reproduce nada y sólo se come el margen.
  const hL = filtro('hp', 35), hR = filtro('hp', 35);
  for (let i = 0; i < n; i++) { L[i] = hL.paso(L[i]); R[i] = hR.paso(R[i]); }
  // Techo suave y normalización: el pico queda en -4 dBFS (se oye en el teléfono y deja lugar si en Instagram
  // se le suma música). El último medio segundo se apaga, para que no corte en seco.
  let pico = 0;
  const fin = Math.round(0.5 * SR);
  for (let i = 0; i < n; i++) {
    const f = i > n - fin ? (n - i) / fin : 1;
    L[i] = Math.tanh((L[i] + wL[i] * 0.9) * 1.2) * f;
    R[i] = Math.tanh((R[i] + wR[i] * 0.9) * 1.2) * f;
    pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
  }
  const g = pico > 0 ? Math.pow(10, -4 / 20) / pico : 0;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(ruta, buf);
  return pico > 0 ? -4 : -Infinity;
}

module.exports = { mezclar, partitura };

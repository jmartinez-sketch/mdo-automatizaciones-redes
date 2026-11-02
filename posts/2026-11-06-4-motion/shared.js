// Lo propio de este film: el titular (que «titulo» achica y sube, y «recuento» e «informe»
// retoman como encabezado), los casilleros del depósito y el lugar vacío del auditor.
Object.assign(window.MDO, {
  ST: {
    sube: -350, escala: 0.55,
    grid: { x: 120, y: 760, w: 150, h: 120, gx: 22, gy: 22, cols: 5, rows: 4 },
    falta: [120, 1340, 840, 150],
  },
  stIso(kit) {
    return '<div class="st-iso">' + MDO.logo(kit, 'iso', true) + '</div>';
  },
  stIcono(kit, nombre, px, clases, estilo) {
    return MDO.icono(kit, nombre, px).replace('class="icono"', 'class="icono st-ic ' + clases + '" style="' + estilo + '"');
  },
  // El titular. Con `arriba`, ya chico y sin volanta: el encabezado de «recuento» e «informe».
  stTitular(kit, p, arriba) {
    const S = MDO.ST;
    const tr = arriba ? 'transform:translateY(' + S.sube + 'px) scale(' + S.escala + ');' : '';
    return '<div class="words st-tit ' + p + '-tit" style="left:150px;top:640px;width:820px;' + tr + '">' +
      '<p class="st-vol ' + p + '-vol"' + (arriba ? ' style="opacity:0"' : '') + '>Cierre de ejercicio</p>' +
      '<h1 class="line ' + p + '-a" style="font-size:92px">Stock contado sin el auditor:</h1>' +
      '<h2 class="line line2 ' + p + '-b" style="font-size:92px">el informe puede salir con salvedad</h2></div>';
  },
  // Los casilleros del depósito, con su tilde, y el rótulo del recuento.
  stGrid(kit, p) {
    const G = MDO.ST.grid;
    let boxes = '', checks = '';
    for (let r = 0; r < G.rows; r++) {
      for (let c = 0; c < G.cols; c++) {
        const x = G.x + c * (G.w + G.gx), y = G.y + r * (G.h + G.gy), cx = x + G.w / 2, cy = y + G.h / 2;
        boxes += '<div class="box st-box ' + p + '-bx" style="left:' + x + 'px;top:' + y + 'px;width:' + G.w + 'px;height:' + G.h + 'px"></div>';
        checks += '<path class="ink-dark st-ck ' + p + '-ck" d="M' + (cx - 24) + ' ' + cy + ' L' + (cx - 7) + ' ' + (cy + 17) + ' L' + (cx + 25) + ' ' + (cy - 17) + '"/>';
      }
    }
    return '<div class="' + p + '-grid" style="position:absolute;inset:0">' +
      '<div class="words" style="left:120px;top:675px;width:840px"><p class="st-tag ' + p + '-tag">Recuento del cierre</p></div>' +
      boxes + '<svg class="art" viewBox="0 0 1080 1920">' + checks + '</svg></div>';
  },
  // El lugar vacío del auditor, debajo de los casilleros.
  stFalta(kit, p) {
    const f = MDO.ST.falta;
    return '<div class="' + p + '-falta" style="position:absolute;inset:0">' +
      '<div class="st-falta" style="left:' + f[0] + 'px;top:' + f[1] + 'px;width:' + f[2] + 'px;height:' + f[3] + 'px"></div>' +
      MDO.stIcono(kit, 'buscar', 96, p + '-lupa', 'left:' + (f[0] + 40) + 'px;top:' + (f[1] + 27) + 'px;opacity:.45') +
      '<p class="st-txt ' + p + '-sin" style="left:' + (f[0] + 170) + 'px;top:' + (f[1] + 46) + 'px">Sin el auditor</p></div>';
  },
  // Dibuja un ícono trazo por trazo: devuelve p => … (de 0 a 1).
  stDibujo(svg) {
    const els = [...svg.querySelectorAll('path,circle,rect,line')].map((e) => MDO.trazo(e));
    return (p) => els.forEach((f, i) => f(Math.max(0, Math.min(1, p * els.length - i))));
  },
});

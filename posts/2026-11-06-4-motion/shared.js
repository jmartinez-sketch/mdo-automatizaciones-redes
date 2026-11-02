// Lo propio de este film: la foto del titular y el diagrama «la empresa que comprás» (la caja,
// el balance y lo que queda fuera de él), que las escenas empresa, fuera y revisar arman igual
// para que el paso de una a otra no se note. Cada escena le pone su prefijo a lo que anima.
Object.assign(window.MDO, {
  DD: {
    box: [80, 330, 880, 1150],
    bal: [130, 440, 380, 330],
    sep: 810,
    cells: [[130, 905], [550, 905], [130, 1190], [550, 1190]],
    items: [
      ['equipo', 'Reclamos laborales que todavía no son juicio'],
      ['buscar', 'Impuestos que una inspección puede reclamar'],
      ['documento', 'Contratos que se caen si cambia el dueño'],
      ['escudo', 'Avales que la empresa firmó por terceros'],
    ],
  },
  ddIso(kit) {
    return '<div class="dd-iso">' + MDO.logo(kit, 'iso', true) + '</div>';
  },
  ddFoto(kit, p) {
    return '<div class="dd-foto ' + p + '-f"><img class="dd-foto-img" src="' + kit.assets.url('edificios.jpg') + '"><div class="dd-velo"></div></div>';
  },
  ddIcono(kit, nombre, px, clases) {
    return MDO.icono(kit, nombre, px).replace('class="icono"', 'class="icono dd-ic ' + clases + '"');
  },
  ddDiagrama(kit, p) {
    const D = MDO.DD, b = D.box, a = D.bal;
    let cells = '';
    D.items.forEach((it, i) => {
      const c = D.cells[i];
      cells += '<div class="dd-cell ' + p + '-c" style="left:' + c[0] + 'px;top:' + c[1] + 'px">' +
        '<div class="dd-ic-wrap">' + MDO.ddIcono(kit, it[0], 100, p + '-i') + MDO.ddIcono(kit, 'tilde', 100, p + '-k') + '</div>' +
        '<p class="dd-lbl ' + p + '-l">' + it[1] + '</p></div>';
    });
    return '<div class="dd ' + p + '-dd">' +
      '<svg class="art" viewBox="0 0 1080 1920"><rect class="ink-dark dd-box ' + p + '-box" x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '"/>' +
      '<line class="dd-sep ' + p + '-sep" x1="' + (b[0] + 50) + '" y1="' + D.sep + '" x2="' + (b[0] + b[2] - 50) + '" y2="' + D.sep + '"/></svg>' +
      '<div class="words ' + p + '-tw" style="left:' + (b[0] + 50) + 'px;top:' + (b[1] + 34) + 'px;width:760px"><p class="dd-tag ' + p + '-t1">La empresa que comprás</p></div>' +
      '<div class="paper dd-bal ' + p + '-bal" style="left:' + a[0] + 'px;top:' + a[1] + 'px;width:' + a[2] + 'px;height:' + a[3] + 'px">' +
      '<p class="paper-hd" style="font-size:40px;letter-spacing:.12em">Balance</p>' +
      '<div class="bar dd-bar ' + p + '-bar" style="width:100%"></div><div class="bar dd-bar ' + p + '-bar" style="width:78%"></div>' +
      '<div class="bar dd-bar ' + p + '-bar" style="width:90%"></div><div class="bar dd-bar ' + p + '-bar" style="width:62%"></div></div>' +
      '<div class="dd-okbal ' + p + '-okb">' + MDO.ddIcono(kit, 'tilde', 150, p + '-ok') + '</div>' +
      '<div class="words ' + p + '-tw2" style="left:' + (b[0] + 50) + 'px;top:' + (D.sep + 24) + 'px;width:760px"><p class="dd-tag ' + p + '-t2">Fuera del balance</p></div>' +
      cells + '</div>';
  },
  // Dibuja un ícono trazo por trazo: devuelve p => … (de 0 a 1).
  ddDibujo(svg) {
    const els = [...svg.querySelectorAll('path,circle,rect,line')].map((e) => MDO.trazo(e));
    return (p) => els.forEach((f, i) => f(Math.max(0, Math.min(1, p * els.length - i))));
  },
});

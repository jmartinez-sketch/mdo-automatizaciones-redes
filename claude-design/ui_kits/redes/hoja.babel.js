// hoja.babel.js — renderiza las 65 placas de una, cada una con un id estable
// (#p-<id>) para poder capturarlas individualmente.
const CAT = window.CATALOGO || [];
const FMT = window.FORMATOS || {};

function Hoja() {
  const grupos = [];
  CAT.forEach((t) => {
    let g = grupos.find((x) => x.nombre === t.grupo);
    if (!g) { g = { nombre: t.grupo, items: [] }; grupos.push(g); }
    g.items.push(t);
  });

  return (
    <div>
      {grupos.map((g) => (
        <div key={g.nombre}>
          <h2>{g.nombre} · {g.items.length} placas</h2>
          <div className="grid">
            {g.items.map((t) => {
              const Comp = window[t.comp];
              const f = FMT[t.grupo] || { w: 540, h: 675 };
              return (
                <div className="cell" key={t.id}>
                  <div className="cap"><span>{t.id}</span><span>{t.out}</span></div>
                  <div className="shot" id={'p-' + t.id} style={{ width: f.w, height: f.h }}>
                    {Comp ? <Comp {...(t.ejemplo || {})} scale={1} /> : null}
                  </div>
                  <div className="cap" style={{ color: '#707b89' }}><span>{t.label}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

(() => {
  const el = document.getElementById('hoja');
  if (!el) return;
  el.__root = el.__root || ReactDOM.createRoot(el);
  el.__root.render(<Hoja />);
})();

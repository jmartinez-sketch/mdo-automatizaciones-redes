// templates-destacadas.jsx — portadas de historias destacadas (hl-01).
// Instagram recorta la portada en CÍRCULO desde el centro del 1080×1920, y en
// el perfil se ve a ~64px. Por eso:
//   · Todo el contenido vive dentro de un círculo centrado de ~70% del ancho.
//   · El ícono manda; el texto es opcional y secundario (a ese tamaño casi no
//     se lee — la etiqueta real la pone el NOMBRE de la destacada en Instagram).
// Requiere brand.jsx y mdo-brand.css v2.0 cargados antes.
// Marca 2026: colores por variable (toman el azul noche solos) y la etiqueta
// en Chivo 700 versalitas — el manual eliminó la monoespaciada.

// Ícono SVG propio: templates-friday-b.jsx define uno igual pero no lo exporta
// al window, y el orden de carga no está garantizado.
function HlSvg({ s = 32, children }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block' }}>{children}</svg>
  );
}

const HL_ICONS = {
  balanza:  (p) => <HlSvg {...p}><path d="M12 4v16" /><path d="M7 20h10" /><path d="M4 7h16" /><path d="M4 7l-2 4.5h4z" /><path d="M20 7l-2 4.5h4z" /></HlSvg>,
  grafico:  (p) => <HlSvg {...p}><path d="M4 4v16h16" /><path d="M7 14l3-3 3 2 4-6" /></HlSvg>,
  lupa:     (p) => <HlSvg {...p}><circle cx="11" cy="11" r="6" /><path d="M15.5 15.5L20 20" /></HlSvg>,
  socios:   (p) => <HlSvg {...p}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0111 0" /><path d="M16 6a2.6 2.6 0 010 5" /><path d="M17 15.2c2.2.4 3.8 2.3 3.8 4.8" /></HlSvg>,
  calculadora: (p) => <HlSvg {...p}><rect x="6" y="3" width="12" height="18" rx="1.5" /><path d="M9 7h6" /><path d="M9.5 12h.01M12 12h.01M14.5 12h.01M9.5 15h.01M12 15h.01M14.5 15h.01M9.5 18h.01M12 18h.01" /></HlSvg>,
  recibo:   (p) => <HlSvg {...p}><path d="M14 3H7a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V7z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 16.5h4" /></HlSvg>,
  escudo:   (p) => <HlSvg {...p}><path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z" /><path d="M9 12l2 2 4-4" /></HlSvg>,
  reloj:    (p) => <HlSvg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></HlSvg>,
  tilde:    (p) => <HlSvg {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></HlSvg>,
};

// ── hl-* · Portada de destacada, un id por servicio ─────────────────
// El ícono NO puede venir por slot: scripts/render.js reemplaza texto sobre el
// HTML ya renderizado, así que a esa altura el ícono ya está dibujado. Por eso
// cada servicio es su propio componente, como sq-01/sq-02 en el resto del set.
function HlBase({ Ico, label, light = true }) {
  return (
    <div className={'tpl ' + (light ? 'navy' : '')}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden',
        background: light ? 'var(--navy)' : 'var(--paper)',
        color: light ? 'var(--paper)' : 'var(--navy)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', width: 336 }}>
        <div style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0 }}>
          <Ico s={250} />
        </div>
        {label ? (
          <div style={{ marginTop: 26, fontFamily: 'var(--font-accent)', fontWeight: 700,
            fontSize: 22, letterSpacing: '0.20em', textTransform: 'uppercase',
            textAlign: 'center', lineHeight: 1.35, opacity: 0.92 }}>{label}</div>
        ) : null}
      </div>
    </div>
  );
}

const HlTributario   = () => <HlBase Ico={HL_ICONS.balanza} />;
const HlPrecios      = () => <HlBase Ico={HL_ICONS.grafico} />;
const HlAuditoria    = () => <HlBase Ico={HL_ICONS.lupa} />;
const HlSocietario   = () => <HlBase Ico={HL_ICONS.socios} />;
const HlContabilidad = () => <HlBase Ico={HL_ICONS.calculadora} />;
const HlLaboral      = () => <HlBase Ico={HL_ICONS.recibo} />;
// Variantes con etiqueta (el texto sí entra por slot [LABEL])
const HlTributarioL   = () => <HlBase Ico={HL_ICONS.balanza} label="[LABEL]" />;
const HlAuditoriaL    = () => <HlBase Ico={HL_ICONS.lupa} label="[LABEL]" />;
const HlLaboralL      = () => <HlBase Ico={HL_ICONS.recibo} label="[LABEL]" />;
// Variante fondo claro
const HlAuditoriaPapel  = () => <HlBase Ico={HL_ICONS.lupa} light={false} />;
const HlSocietarioPapel = () => <HlBase Ico={HL_ICONS.socios} light={false} />;

Object.assign(window, { HlBase, HlSvg, HL_ICONS,
  HlTributario, HlPrecios, HlAuditoria, HlSocietario, HlContabilidad, HlLaboral,
  HlTributarioL, HlAuditoriaL, HlLaboralL, HlAuditoriaPapel, HlSocietarioPapel });

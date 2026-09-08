#!/usr/bin/env node
// Genera la página "Publicaciones redes MDO": una tarjeta por post con la
// placa (o el visor de carrusel si hay varias) y el botón "Aprobar y
// programar". La página llama al conector Metricool del que la abre
// (capability `mcp` del Artifact) y pasa el post de borrador a programado con
// autopublicación. Lo que no se aprueba, queda en borrador.
//
// Uso:
//   node scripts/pagina-aprobacion.js posts/aprobacion-semana-37.json out/publicaciones-redes.html
//
// El nombre de la página es FIJO ("Publicaciones redes MDO"): la rutina la
// republica cada semana sobre la misma URL (ver paso 7b de la skill). La
// semana va en el título grande, no en el nombre.
//
// El JSON lo escribe la rutina después de crear los drafts:
// {
//   "semana": 37,
//   "rango": "9 al 13 de septiembre de 2026",
//   "blogId": "6267636",
//   "soloLectura": false,            ← true = muestra sin botones (para ver diseño)
//   "posts": [{
//     "dia": "Miércoles 09/09", "hora": "9:00", "redes": ["Instagram", "LinkedIn"],
//     "plantilla": "po-13d", "imagenes": ["posts/2026-09-09-2.png"],
//     "esStory": false, "nota": "",
//     "id": 372948937, "uuid": "3036042435413101255",
//     "plannerUrl": "https://app.metricool.com/planner/calendar?blogId=...&openWithPostUuid=...",
//     "info": { ...el objeto `data` que devolvió createScheduledPost... }
//   }]
// }
//
// ⚠️ Metricool le cambia el `id` al post en cada actualización (el `uuid` es
// el estable). La página guarda el id nuevo que devuelve cada llamada.
//
// Al publicar con la herramienta Artifact hay que declarar:
//   capabilities: { mcp: { servers: [{ server: "Metricool", tools: ["updateScheduledPost"] }] } }

const fs = require('fs');
const path = require('path');

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error('Uso: node scripts/pagina-aprobacion.js <entrada.json> <salida.html>');
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const root = path.resolve(__dirname, '..');

// Campos del post que Metricool necesita de vuelta en updateScheduledPost.
const CAMPOS_INFO = ['draft', 'autoPublish', 'shortener', 'hasNotReadNotes', 'descendants',
  'smartLinkData', 'media', 'mediaAltText', 'providers', 'publicationDate', 'text',
  'firstCommentText', 'instagramData', 'linkedinData'];

function limpiarInfo(info) {
  const out = {};
  for (const k of CAMPOS_INFO) if (info[k] !== undefined) out[k] = info[k];
  out.descendants = out.descendants || [];
  out.smartLinkData = out.smartLinkData || { ids: [] };
  out.firstCommentText = out.firstCommentText || '';
  if (Array.isArray(out.providers)) out.providers = out.providers.map((p) => ({ network: p.network }));
  if (Array.isArray(out.mediaAltText)) out.mediaAltText = out.mediaAltText.map((t) => t || '');
  return out;
}

function dataUri(rel) {
  const abs = path.isAbsolute(rel) ? rel : path.join(root, rel);
  return 'data:image/png;base64,' + fs.readFileSync(abs).toString('base64');
}

const soloLectura = !!spec.soloLectura;

const posts = spec.posts.map((p) => ({
  dia: p.dia, hora: p.hora, redes: p.redes || [], plantilla: p.plantilla || '',
  nota: p.nota || '', esStory: !!p.esStory,
  id: p.id, uuid: String(p.uuid), plannerUrl: p.plannerUrl || '',
  blogId: String(p.blogId || spec.blogId),
  info: limpiarInfo(p.info || {}),
  imagenes: (p.imagenes || []).map(dataUri),
}));

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const jsonSeguro = JSON.stringify(posts).replace(/</g, '\\u003c');

const html = `<title>Publicaciones redes MDO</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Chivo:ital,wght@0,300;0,700;1,300&display=swap">
<style>
  :root {
    --bg: #F8F6F6; --card: #FFFFFF; --ink: #06162D; --ink-2: #384557; --ink-3: #6A7381;
    --line: #E1E1E1; --line-2: #D9D9D9; --accent: #06162D; --accent-ink: #F8F6F6; --slate: #7C8392;
    --ok-bg: #E4EEE8; --ok-ink: #1F5A3C; --warn-bg: #F4ECDD; --warn-ink: #6B4E12;
    --err-bg: #F6E4E2; --err-ink: #7A2E27; --placa-bg: #ECEBEA;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #06162D; --card: #0F2340; --ink: #F8F6F6; --ink-2: #C9CED6; --ink-3: #9BA2AB;
      --line: #1F2E42; --line-2: #2A3A52; --accent: #F8F6F6; --accent-ink: #06162D;
      --ok-bg: #163B2A; --ok-ink: #BFE3CC; --warn-bg: #4A3A14; --warn-ink: #F1DDA8;
      --err-bg: #5A2620; --err-ink: #F5C7C1; --placa-bg: #0A1B33;
    }
  }
  :root[data-theme="dark"] {
    --bg: #06162D; --card: #0F2340; --ink: #F8F6F6; --ink-2: #C9CED6; --ink-3: #9BA2AB;
    --line: #1F2E42; --line-2: #2A3A52; --accent: #F8F6F6; --accent-ink: #06162D;
    --ok-bg: #163B2A; --ok-ink: #BFE3CC; --warn-bg: #4A3A14; --warn-ink: #F1DDA8;
    --err-bg: #5A2620; --err-ink: #F5C7C1; --placa-bg: #0A1B33;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink);
    font-family: 'Open Sans', system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.5; }
  .wrap { max-width: 980px; margin: 0 auto; padding: 28px 20px 64px; }

  header { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between;
    gap: 12px 24px; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
  .eyebrow { font-family: 'Chivo', 'Open Sans', sans-serif; font-weight: 700; font-size: 12px;
    letter-spacing: .18em; text-transform: uppercase; color: var(--ink-3); }
  h1 { margin: 2px 0 0; font-size: 26px; font-weight: 700; letter-spacing: -.01em; text-wrap: balance; }
  .header-der { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .resumen { font-family: 'Chivo', sans-serif; font-weight: 300; font-style: italic; font-size: 18px; color: var(--ink-2); }

  .aviso { background: var(--card); border: 1px solid var(--line); border-radius: 8px;
    padding: 12px 16px; color: var(--ink-2); font-size: 14px; margin-top: 18px; }
  .aviso[hidden] { display: none; }

  .dia-grupo { margin-top: 28px; }
  .dia-titulo { display: flex; align-items: baseline; gap: 10px; margin: 0 0 10px; }
  .dia-titulo h2 { margin: 0; font-family: 'Chivo', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: -.01em; }
  .dia-titulo span { color: var(--ink-3); font-size: 14px; }
  .dia-grupo .post + .post { margin-top: 12px; }

  .post { display: grid; grid-template-columns: 300px 1fr; gap: 22px;
    background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 18px; }
  @media (max-width: 680px) { .post { grid-template-columns: 1fr; } }

  /* Columna de la placa: alto fijo, la imagen se acomoda adentro */
  .placa { position: relative; background: var(--placa-bg); border-radius: 8px; overflow: hidden;
    height: 375px; display: flex; align-items: center; justify-content: center; }
  .placa img { max-width: 100%; max-height: 100%; width: auto; height: auto; display: block; }
  .placa.horizontal { height: auto; aspect-ratio: 1200 / 628; }
  .placa.horizontal img { width: 100%; }
  .placa.story { height: 400px; }

  /* Visor de carrusel */
  .visor img { display: none; }
  .visor img.activa { display: block; }
  .flecha { position: absolute; top: 50%; transform: translateY(-50%); width: 34px; height: 34px;
    border-radius: 50%; border: 1px solid var(--line-2); background: var(--card); color: var(--ink);
    font-size: 20px; line-height: 1; padding: 0; display: grid; place-items: center; cursor: pointer; opacity: .92; }
  .flecha.prev { left: 8px; } .flecha.next { right: 8px; }
  .flecha:disabled { opacity: .35; cursor: default; }
  .puntos { position: absolute; bottom: 10px; left: 0; right: 0; display: flex; justify-content: center; gap: 6px; }
  .puntos button { width: 8px; height: 8px; border-radius: 50%; padding: 0; border: 0;
    background: rgba(248,246,246,.55); cursor: pointer; }
  .puntos button.activa { background: #F8F6F6; width: 18px; border-radius: 4px; }
  .contador { position: absolute; top: 10px; right: 10px; font-family: 'Chivo', sans-serif; font-size: 12px;
    font-weight: 700; letter-spacing: .06em; background: rgba(6,22,45,.72); color: #F8F6F6;
    padding: 3px 8px; border-radius: 999px; }

  .meta { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
  .titulo { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .titulo strong { font-size: 16px; }
  .chip { font-family: 'Chivo', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; padding: 3px 9px; border: 1px solid var(--line-2); border-radius: 999px; color: var(--ink-2); }
  .chip.suave { border-style: dashed; color: var(--ink-3); }
  .estado { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px;
    padding: 6px 12px; border-radius: 999px; width: fit-content; }
  .estado.borrador { background: var(--warn-bg); color: var(--warn-ink); }
  .estado.programado { background: var(--ok-bg); color: var(--ok-ink); }
  .estado .punto { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
  .nota { background: var(--warn-bg); color: var(--warn-ink); border-radius: 8px; padding: 8px 12px; font-size: 13px; }
  .listo { font-size: 13px; color: var(--ok-ink); }
  details { border-top: 1px solid var(--line); padding-top: 8px; }
  summary { cursor: pointer; color: var(--ink-3); font-size: 13px; }
  .texto { white-space: pre-wrap; font-size: 14px; color: var(--ink-2); margin: 8px 0 0; max-width: 62ch; }
  .acciones { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: auto; padding-top: 6px; }
  button { font: inherit; font-weight: 600; border-radius: 8px; padding: 10px 16px; cursor: pointer;
    border: 1px solid var(--accent); background: var(--accent); color: var(--accent-ink); }
  button.sec { background: transparent; color: var(--ink); border-color: var(--line-2); }
  button:disabled { opacity: .5; cursor: default; }
  button:focus-visible, .puntos button:focus-visible { outline: 3px solid var(--slate); outline-offset: 2px; }
  a.link { color: var(--ink-2); font-size: 13px; }
  .error { background: var(--err-bg); color: var(--err-ink); border-radius: 8px; padding: 10px 12px; font-size: 14px; }
  .error a { color: inherit; }
  footer { margin-top: 32px; color: var(--ink-3); font-size: 13px; max-width: 62ch; }
  @media (prefers-reduced-motion: no-preference) { button { transition: opacity .15s; } }
</style>

<div class="wrap">
  <header>
    <div>
      <div class="eyebrow">MDO Consultores · publicaciones redes</div>
      <h1>Semana ${esc(spec.semana)} · ${esc(spec.rango || '')}</h1>
    </div>
    <div class="header-der">
      <div class="resumen" id="resumen"></div>
      <button id="aprobar-todos" hidden>Aprobar todos los pendientes</button>
    </div>
  </header>

  <div class="aviso" id="aviso-muestra" ${soloLectura ? '' : 'hidden'}>
    Vista de muestra: acá los botones están apagados. Sirve para ver cómo se ve la página.
  </div>
  <div class="aviso" id="aviso-sin-mcp" hidden>
    Esta vista es de solo lectura. Para aprobar, abrí la página desde claude.ai, que es donde está conectado tu Metricool.
  </div>
  <div class="aviso" id="aviso-permiso" hidden>
    La primera vez que toques un botón, claude.ai te va a pedir permiso para que esta página use tu conector de Metricool. Es una sola vez.
  </div>

  <div id="lista"></div>

  <footer>
    Aprobar pasa el post a <strong>programado con autopublicación</strong>: sale solo a la hora indicada.
    Lo que no aprobás queda como borrador en Metricool y no se publica.
  </footer>
</div>

<script>
  const POSTS = ${jsonSeguro};
  const SOLO_LECTURA = ${soloLectura ? 'true' : 'false'};
  const SERVER = 'Metricool';
  const TOOL = 'updateScheduledPost';
  const estado = {};
  for (const p of POSTS) estado[p.uuid] = { id: p.id, draft: !!p.info.draft, autoPublish: !!p.info.autoPublish,
    busy: false, error: null, consentido: false, recien: false, slide: 0 };
  let mcp = null;
  let mcpResuelto = false;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function copiaError(e, p) {
    const code = (e && e.code) || 'upstream_error';
    const msg = e && e.message ? esc(e.message) : '';
    const enMetricool = p.plannerUrl ? ' <a href="' + esc(p.plannerUrl) + '" target="_blank" rel="noopener">Ver el post en Metricool</a>.' : '';
    switch (code) {
      case 'needs_reauth':
        return 'Metricool pide que lo vuelvas a conectar: en claude.ai, Configuración → Conectores → Metricool.';
      case 'server_not_connected': case 'selection_required': case 'server_not_found':
        return 'No encuentro el conector Metricool en tu cuenta de claude.ai. Agregalo en Configuración → Conectores.';
      case 'not_in_manifest': case 'blocked_by_policy': case 'approval_required':
        return 'Esta página no tiene permiso para usar esa herramienta de Metricool.';
      case 'tool_error':
        return 'Metricool rechazó el cambio' + (msg ? ': ' + msg : '.') + enMetricool;
      case 'server_unavailable': case 'upstream_error': case 'cancelled':
        return 'No pude confirmar si el cambio se aplicó. Antes de volver a tocar, fijate cómo quedó.' + enMetricool;
      case 'not_granted': case 'capability_disabled': case 'capability_removed':
        return 'Esta vista no puede usar tu Metricool. Abrí la página desde claude.ai.';
      case 'sin_respuesta':
        return 'Metricool respondió algo que no entendí. Fijate cómo quedó.' + enMetricool;
      default:
        return 'No se pudo aplicar el cambio' + (msg ? ': ' + msg : '.') + enMetricool;
    }
  }

  function subtitulo(p) {
    if (p.esStory) return 'Historia de Instagram';
    const r = p.redes.join(' + ');
    return p.imagenes.length > 1 ? 'Carrusel · ' + r : r;
  }

  function placaHtml(p, s) {
    const n = p.imagenes.length;
    const redes = p.redes.join(' ');
    const horizontal = /linkedin/i.test(redes) && !/instagram/i.test(redes);
    const clase = 'placa' + (p.esStory ? ' story' : '') + (horizontal ? ' horizontal' : '') + (n > 1 ? ' visor' : '');
    let inner = p.imagenes.map((src, i) =>
      '<img src="' + src + '" class="' + (i === s.slide ? 'activa' : '') + '" alt="' + (n > 1 ? 'Slide ' + (i + 1) + ' de ' + n : 'Placa') + ' · ' + esc(p.dia) + '">').join('');
    if (n > 1) {
      inner +=
        '<button class="flecha prev" data-visor="prev" aria-label="Anterior"' + (s.slide === 0 ? ' disabled' : '') + '>&#8249;</button>' +
        '<button class="flecha next" data-visor="next" aria-label="Siguiente"' + (s.slide === n - 1 ? ' disabled' : '') + '>&#8250;</button>' +
        '<div class="contador">' + (s.slide + 1) + ' / ' + n + '</div>' +
        '<div class="puntos">' + p.imagenes.map((_, i) =>
          '<button data-visor="' + i + '" class="' + (i === s.slide ? 'activa' : '') + '" aria-label="Ir al slide ' + (i + 1) + '"></button>').join('') + '</div>';
    }
    return '<div class="' + clase + '">' + inner + '</div>';
  }

  function render() {
    const aprobados = POSTS.filter((p) => !estado[p.uuid].draft && estado[p.uuid].autoPublish).length;
    $('resumen').textContent = POSTS.length + (POSTS.length === 1 ? ' posteo' : ' posteos') + ' · ' + aprobados + (aprobados === 1 ? ' aprobado' : ' aprobados');
    $('aviso-sin-mcp').hidden = SOLO_LECTURA || !(mcpResuelto && !mcp);
    $('aviso-permiso').hidden = SOLO_LECTURA || !(mcp && !Object.values(estado).some((s) => s.consentido));
    const pendientes = POSTS.filter((p) => estado[p.uuid].draft || !estado[p.uuid].autoPublish);
    const ocupado = Object.values(estado).some((s) => s.busy);
    const btnTodos = $('aprobar-todos');
    btnTodos.hidden = SOLO_LECTURA || !(mcp && POSTS.length > 1 && pendientes.length > 1);
    btnTodos.disabled = ocupado;
    btnTodos.textContent = ocupado ? 'Aplicando…' : 'Aprobar todos los pendientes (' + pendientes.length + ')';

    // Agrupar por día, en el orden en que vienen
    const grupos = [];
    for (const p of POSTS) {
      let g = grupos.find((x) => x.dia === p.dia);
      if (!g) { g = { dia: p.dia, hora: p.hora, posts: [] }; grupos.push(g); }
      g.posts.push(p);
    }

    $('lista').innerHTML = grupos.map((g) =>
      '<section class="dia-grupo">' +
        '<div class="dia-titulo"><h2>' + esc(g.dia) + '</h2><span>' + esc(g.hora) + ' hs</span></div>' +
        g.posts.map((p) => {
          const s = estado[p.uuid];
          const programado = !s.draft && s.autoPublish;
          const puedeTocar = !SOLO_LECTURA && mcp && !s.busy;
          return '<article class="post" data-uuid="' + esc(p.uuid) + '">' +
            placaHtml(p, s) +
            '<div class="meta">' +
              '<div class="titulo"><strong>' + esc(subtitulo(p)) + '</strong>' +
                (p.plantilla ? '<span class="chip suave">' + esc(p.plantilla) + '</span>' : '') + '</div>' +
              '<div class="estado ' + (programado ? 'programado' : 'borrador') + '"><span class="punto"></span>' +
                (programado ? 'Programado · sale solo' : 'Borrador · no se publica') + '</div>' +
              (p.nota ? '<div class="nota">' + esc(p.nota) + '</div>' : '') +
              (p.info.text && !p.esStory ? '<details><summary>Texto del posteo</summary><p class="texto">' + esc(p.info.text) + '</p></details>' : '') +
              (programado && s.recien ? '<div class="listo">Listo. Sale el ' + esc(p.dia.toLowerCase()) + ' a las ' + esc(p.hora) + ' hs.</div>' : '') +
              (s.error ? '<div class="error" role="alert">' + copiaError(s.error, p) + '</div>' : '') +
              '<div class="acciones">' +
                (programado
                  ? '<button class="sec" data-accion="borrador"' + (puedeTocar ? '' : ' disabled') + '>' + (s.busy ? 'Aplicando…' : 'Volver a borrador') + '</button>'
                  : '<button data-accion="aprobar"' + (puedeTocar ? '' : ' disabled') + '>' + (s.busy ? 'Aplicando…' : 'Aprobar y programar') + '</button>') +
                (p.plannerUrl ? '<a class="link" href="' + esc(p.plannerUrl) + '" target="_blank" rel="noopener">Abrir en Metricool</a>' : '') +
              '</div>' +
            '</div>' +
          '</article>';
        }).join('') +
      '</section>'
    ).join('');
  }

  async function cambiar(uuid, programar) {
    const p = POSTS.find((x) => x.uuid === uuid);
    const s = estado[uuid];
    if (!p || !mcp || s.busy || SOLO_LECTURA) return;
    const info = JSON.parse(JSON.stringify(p.info));
    info.draft = !programar;
    info.autoPublish = programar;
    if (info.instagramData) info.instagramData.autoPublish = programar;
    s.busy = true; s.error = null; s.recien = false; render();
    try {
      // Sin AbortSignal a propósito: es una acción que no se puede disparar dos veces.
      const res = await mcp.callTool(SERVER, TOOL, {
        blogId: p.blogId, id: String(s.id), uuid: p.uuid, info: JSON.stringify(info),
      });
      s.consentido = true;
      const data = res && res.payload && typeof res.payload === 'object' ? res.payload.data : null;
      if (data && typeof data === 'object') {
        if (data.id != null) s.id = data.id;       // Metricool cambia el id en cada update
        s.draft = !!data.draft;
        s.autoPublish = !!data.autoPublish;
        s.recien = programar && !s.draft && s.autoPublish;
        p.info = Object.assign({}, p.info, info, { media: data.media || info.media });
      } else {
        s.error = { code: 'sin_respuesta' };
      }
    } catch (e) {
      s.error = e || { code: 'upstream_error' };
    }
    s.busy = false; render();
  }

  $('lista').addEventListener('click', (ev) => {
    const art = ev.target.closest('article');
    if (!art) return;
    const uuid = art.dataset.uuid;
    const visor = ev.target.closest('[data-visor]');
    if (visor) {
      const p = POSTS.find((x) => x.uuid === uuid);
      const s = estado[uuid];
      const v = visor.dataset.visor;
      if (v === 'prev') s.slide = Math.max(0, s.slide - 1);
      else if (v === 'next') s.slide = Math.min(p.imagenes.length - 1, s.slide + 1);
      else s.slide = Math.max(0, Math.min(p.imagenes.length - 1, parseInt(v, 10) || 0));
      render();
      return;
    }
    const btn = ev.target.closest('button[data-accion]');
    if (btn) cambiar(uuid, btn.dataset.accion === 'aprobar');
  });

  $('aprobar-todos').addEventListener('click', async () => {
    // Uno por vez, en orden: si uno falla, los demás siguen y cada error queda en su tarjeta.
    for (const p of POSTS) {
      const s = estado[p.uuid];
      if (s.draft || !s.autoPublish) await cambiar(p.uuid, true);
    }
  });

  render();
  if (!SOLO_LECTURA) {
    (window.claude && typeof window.claude.use === 'function' ? window.claude.use('mcp') : Promise.resolve(null))
      .then((ns) => { mcp = ns; mcpResuelto = true; render(); })
      .catch(() => { mcp = null; mcpResuelto = true; render(); });
  }
</script>
`;

fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
fs.writeFileSync(outPath, html);
console.log('OK →', path.resolve(outPath), `(${posts.length} posts, ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);

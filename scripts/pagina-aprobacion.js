#!/usr/bin/env node
// Genera la página de aprobación semanal: una placa por post con el botón
// "Aprobar y programar". La página llama al conector Metricool del que la
// abre (capability `mcp` del Artifact) y pasa el post de borrador a
// programado con autopublicación. Lo que no se aprueba, queda en borrador.
//
// Uso:
//   node scripts/pagina-aprobacion.js posts/aprobacion-semana-37.json out/aprobacion-semana-37.html
//
// El JSON lo escribe la rutina después de crear los drafts (paso 6b de la skill):
// {
//   "semana": 37,
//   "rango": "9 al 13 de septiembre de 2026",
//   "blogId": "6267636",
//   "posts": [{
//     "dia": "Miércoles 09/09", "hora": "9:00", "redes": ["Instagram", "LinkedIn"],
//     "plantilla": "po-13d", "imagenes": ["posts/2026-09-09-2.png"],
//     "id": 372948937, "uuid": "3036042435413101255",
//     "plannerUrl": "https://app.metricool.com/planner/calendar?blogId=...&openWithPostUuid=...",
//     "info": { ...el objeto `data` que devolvió createScheduledPost, sin id/uuid/fechas de creación... }
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
// Se toman del `data` de la creación; lo demás (id, uuid, creationDate,
// providers[].status...) no va.
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
  const buf = fs.readFileSync(abs);
  return 'data:image/png;base64,' + buf.toString('base64');
}

const posts = spec.posts.map((p) => ({
  dia: p.dia, hora: p.hora, redes: p.redes || [], plantilla: p.plantilla || '',
  nota: p.nota || '', esStory: !!p.esStory,
  id: p.id, uuid: String(p.uuid), plannerUrl: p.plannerUrl || '',
  blogId: String(p.blogId || spec.blogId),
  info: limpiarInfo(p.info),
  imagenes: (p.imagenes || []).map(dataUri),
}));

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// El JSON va dentro de un <script>: hay que cortar cualquier "</script>".
const jsonSeguro = JSON.stringify(posts).replace(/</g, '\\u003c');

const html = `<title>Posteos MDO · Semana ${esc(spec.semana)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Chivo:ital,wght@0,300;0,700;1,300&display=swap">
<style>
  :root {
    --navy: #06162D; --navy-20: #384557; --navy-40: #6A7381; --navy-60: #9BA2AB;
    --slate: #7C8392; --grey: #D9D9D9; --paper: #F8F6F6;
    --bg: #F8F6F6; --card: #FFFFFF; --ink: #06162D; --ink-2: #384557; --ink-3: #6A7381;
    --line: #E1E1E1; --accent: #06162D; --accent-ink: #F8F6F6;
    --ok-bg: #E4EEE8; --ok-ink: #1F5A3C; --warn-bg: #F4ECDD; --warn-ink: #6B4E12;
    --err-bg: #F6E4E2; --err-ink: #7A2E27;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #06162D; --card: #0F2340; --ink: #F8F6F6; --ink-2: #C9CED6; --ink-3: #9BA2AB;
      --line: #1F2E42; --accent: #F8F6F6; --accent-ink: #06162D;
      --ok-bg: #163B2A; --ok-ink: #BFE3CC; --warn-bg: #4A3A14; --warn-ink: #F1DDA8;
      --err-bg: #5A2620; --err-ink: #F5C7C1;
    }
  }
  :root[data-theme="dark"] {
    --bg: #06162D; --card: #0F2340; --ink: #F8F6F6; --ink-2: #C9CED6; --ink-3: #9BA2AB;
    --line: #1F2E42; --accent: #F8F6F6; --accent-ink: #06162D;
    --ok-bg: #163B2A; --ok-ink: #BFE3CC; --warn-bg: #4A3A14; --warn-ink: #F1DDA8;
    --err-bg: #5A2620; --err-ink: #F5C7C1;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink);
    font-family: 'Open Sans', system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.5; }
  .wrap { max-width: 1040px; margin: 0 auto; padding: 28px 20px 64px; }
  header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between;
    gap: 8px 20px; padding-bottom: 18px; border-bottom: 1px solid var(--line); margin-bottom: 22px; }
  .eyebrow { font-family: 'Chivo', 'Open Sans', sans-serif; font-weight: 700; font-size: 12px;
    letter-spacing: .18em; text-transform: uppercase; color: var(--ink-3); }
  h1 { margin: 2px 0 0; font-size: 26px; font-weight: 700; letter-spacing: -.01em; text-wrap: balance; }
  .resumen { font-family: 'Chivo', sans-serif; font-weight: 300; font-style: italic; font-size: 18px; color: var(--ink-2); }
  .header-der { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .nota { background: var(--warn-bg); color: var(--warn-ink); border-radius: 8px; padding: 8px 12px; font-size: 13px; }
  .placas.story img { max-width: 220px; }
  .listo { font-size: 13px; color: var(--ok-ink); }
  .aviso { background: var(--card); border: 1px solid var(--line); border-radius: 8px;
    padding: 12px 16px; color: var(--ink-2); font-size: 14px; margin-bottom: 22px; }
  .aviso[hidden] { display: none; }
  .lista { display: grid; gap: 18px; }
  .post { display: grid; grid-template-columns: minmax(180px, 300px) 1fr; gap: 22px;
    background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 18px; }
  @media (max-width: 640px) { .post { grid-template-columns: 1fr; } }
  .placas { display: grid; gap: 8px; }
  .placas img { width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid var(--line); }
  .placas.varias { grid-template-columns: 1fr 1fr; }
  .placas.varias img:first-child { grid-column: 1 / -1; }
  .meta { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
  .dia { font-family: 'Chivo', sans-serif; font-weight: 700; font-size: 22px; letter-spacing: -.01em; }
  .dia small { font-family: 'Open Sans', sans-serif; font-weight: 400; font-size: 15px; color: var(--ink-3); margin-left: 8px; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip { font-family: 'Chivo', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; padding: 4px 9px; border: 1px solid var(--line); border-radius: 999px; color: var(--ink-2); }
  .estado { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px;
    padding: 6px 12px; border-radius: 999px; width: fit-content; }
  .estado.borrador { background: var(--warn-bg); color: var(--warn-ink); }
  .estado.programado { background: var(--ok-bg); color: var(--ok-ink); }
  .estado .punto { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
  details { border-top: 1px solid var(--line); padding-top: 8px; }
  summary { cursor: pointer; color: var(--ink-3); font-size: 13px; }
  .texto { white-space: pre-wrap; font-size: 14px; color: var(--ink-2); margin: 8px 0 0; max-width: 62ch; }
  .acciones { display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto; padding-top: 6px; }
  button { font: inherit; font-weight: 600; border-radius: 8px; padding: 10px 16px; cursor: pointer;
    border: 1px solid var(--accent); background: var(--accent); color: var(--accent-ink); }
  button.sec { background: transparent; color: var(--ink); border-color: var(--line); }
  button:disabled { opacity: .5; cursor: default; }
  button:focus-visible { outline: 3px solid var(--slate); outline-offset: 2px; }
  a.link { color: var(--ink-2); font-size: 13px; }
  .error { background: var(--err-bg); color: var(--err-ink); border-radius: 8px; padding: 10px 12px; font-size: 14px; }
  .error a { color: inherit; }
  footer { margin-top: 28px; color: var(--ink-3); font-size: 13px; max-width: 62ch; }
  @media (prefers-reduced-motion: no-preference) { button { transition: opacity .15s; } }
</style>

<div class="wrap">
  <header>
    <div>
      <div class="eyebrow">MDO Consultores · redes</div>
      <h1>Semana ${esc(spec.semana)} · ${esc(spec.rango || '')}</h1>
    </div>
    <div class="header-der">
      <div class="resumen" id="resumen"></div>
      <button id="aprobar-todos" hidden>Aprobar todos los pendientes</button>
    </div>
  </header>

  <div class="aviso" id="aviso-sin-mcp" hidden>
    Esta vista es de solo lectura. Para aprobar, abrí la página desde claude.ai, que es donde está conectado tu Metricool.
  </div>
  <div class="aviso" id="aviso-permiso" hidden>
    La primera vez que toques un botón, claude.ai te va a pedir permiso para que esta página use tu conector de Metricool. Es una sola vez.
  </div>

  <div class="lista" id="lista"></div>

  <footer>
    Aprobar pasa el post a <strong>programado con autopublicación</strong>: sale solo a la hora indicada.
    Lo que no aprobás queda como borrador en Metricool y no se publica.
  </footer>
</div>

<script>
  const POSTS = ${jsonSeguro};
  const SERVER = 'Metricool';
  const TOOL = 'updateScheduledPost';
  const estado = {};
  for (const p of POSTS) estado[p.uuid] = { id: p.id, draft: !!p.info.draft, autoPublish: !!p.info.autoPublish, busy: false, error: null, consentido: false };
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
      case 'server_not_connected':
      case 'selection_required':
      case 'server_not_found':
        return 'No encuentro el conector Metricool en tu cuenta de claude.ai. Agregalo en Configuración → Conectores.';
      case 'not_in_manifest':
      case 'blocked_by_policy':
      case 'approval_required':
        return 'Esta página no tiene permiso para usar esa herramienta de Metricool.';
      case 'tool_error':
        return 'Metricool rechazó el cambio' + (msg ? ': ' + msg : '.') + enMetricool;
      case 'server_unavailable':
      case 'upstream_error':
      case 'cancelled':
        return 'No pude confirmar si el cambio se aplicó. Antes de volver a tocar, fijate cómo quedó.' + enMetricool;
      case 'not_granted':
      case 'capability_disabled':
      case 'capability_removed':
        return 'Esta vista no puede usar tu Metricool. Abrí la página desde claude.ai.';
      case 'sin_respuesta':
        return 'Metricool respondió algo que no entendí. Fijate cómo quedó.' + enMetricool;
      default:
        return 'No se pudo aplicar el cambio' + (msg ? ': ' + msg : '.') + enMetricool;
    }
  }

  function render() {
    const lista = $('lista');
    const aprobados = POSTS.filter((p) => !estado[p.uuid].draft && estado[p.uuid].autoPublish).length;
    $('resumen').textContent = POSTS.length + (POSTS.length === 1 ? ' posteo' : ' posteos') + ' · ' + aprobados + (aprobados === 1 ? ' aprobado' : ' aprobados');
    $('aviso-sin-mcp').hidden = !(mcpResuelto && !mcp);
    $('aviso-permiso').hidden = !(mcp && !Object.values(estado).some((s) => s.consentido));
    const pendientes = POSTS.filter((p) => estado[p.uuid].draft || !estado[p.uuid].autoPublish);
    const ocupado = Object.values(estado).some((s) => s.busy);
    const btnTodos = $('aprobar-todos');
    btnTodos.hidden = !(mcp && POSTS.length > 1 && pendientes.length > 1);
    btnTodos.disabled = ocupado;
    btnTodos.textContent = ocupado ? 'Aplicando…' : 'Aprobar todos los pendientes (' + pendientes.length + ')';

    lista.innerHTML = POSTS.map((p) => {
      const s = estado[p.uuid];
      const programado = !s.draft && s.autoPublish;
      const varias = p.imagenes.length > 1;
      return '<article class="post" data-uuid="' + esc(p.uuid) + '">' +
        '<div class="placas' + (varias ? ' varias' : '') + (p.esStory ? ' story' : '') + '">' +
          p.imagenes.map((src, i) => '<img src="' + src + '" alt="Placa ' + (i + 1) + ' de ' + esc(p.dia) + '">').join('') +
        '</div>' +
        '<div class="meta">' +
          '<div class="dia">' + esc(p.dia) + '<small>' + esc(p.hora) + ' hs</small></div>' +
          '<div class="chips">' + p.redes.map((r) => '<span class="chip">' + esc(r) + '</span>').join('') +
            (p.plantilla ? '<span class="chip">' + esc(p.plantilla) + '</span>' : '') + '</div>' +
          '<div class="estado ' + (programado ? 'programado' : 'borrador') + '"><span class="punto"></span>' +
            (programado ? 'Programado · sale solo' : 'Borrador · no se publica') + '</div>' +
          (p.nota ? '<div class="nota">' + esc(p.nota) + '</div>' : '') +
          (p.info.text && !p.esStory ? '<details><summary>Texto del posteo</summary><p class="texto">' + esc(p.info.text) + '</p></details>' : '') +
          (programado && s.recien ? '<div class="listo">Listo. Sale el ' + esc(p.dia.toLowerCase()) + ' a las ' + esc(p.hora) + ' hs.</div>' : '') +
          (s.error ? '<div class="error" role="alert">' + copiaError(s.error, p) + '</div>' : '') +
          '<div class="acciones">' +
            (programado
              ? '<button class="sec" data-accion="borrador"' + (mcp && !s.busy ? '' : ' disabled') + '>' + (s.busy ? 'Aplicando…' : 'Volver a borrador') + '</button>'
              : '<button data-accion="aprobar"' + (mcp && !s.busy ? '' : ' disabled') + '>' + (s.busy ? 'Aplicando…' : 'Aprobar y programar') + '</button>') +
            (p.plannerUrl ? '<a class="link" href="' + esc(p.plannerUrl) + '" target="_blank" rel="noopener">Abrir en Metricool</a>' : '') +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  async function cambiar(uuid, programar) {
    const p = POSTS.find((x) => x.uuid === uuid);
    const s = estado[uuid];
    if (!p || !mcp || s.busy) return;
    const info = JSON.parse(JSON.stringify(p.info));
    info.draft = !programar;
    info.autoPublish = programar;
    if (info.instagramData) info.instagramData.autoPublish = programar;
    s.busy = true; s.error = null; render();
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
    const btn = ev.target.closest('button[data-accion]');
    if (!btn) return;
    const uuid = btn.closest('article').dataset.uuid;
    cambiar(uuid, btn.dataset.accion === 'aprobar');
  });

  $('aprobar-todos').addEventListener('click', async () => {
    // Uno por vez, en orden: si uno falla, los demás siguen y cada error queda en su tarjeta.
    for (const p of POSTS) {
      const s = estado[p.uuid];
      if (s.draft || !s.autoPublish) await cambiar(p.uuid, true);
    }
  });

  render();
  (window.claude && typeof window.claude.use === 'function' ? window.claude.use('mcp') : Promise.resolve(null))
    .then((ns) => { mcp = ns; mcpResuelto = true; render(); })
    .catch(() => { mcp = null; mcpResuelto = true; render(); });
</script>
`;

fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
fs.writeFileSync(outPath, html);
console.log('OK →', path.resolve(outPath), `(${posts.length} posts, ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);

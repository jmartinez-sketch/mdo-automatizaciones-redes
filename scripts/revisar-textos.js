#!/usr/bin/env node
// Control de la voz del estudio sobre los textos de un post, antes de renderizar.
//
// Juan coincidió (06/10/2026) en que lo que hacía sonar el contenido a inteligencia artificial era
// el texto: preguntas obvias, nada que mostrara lo que sabe el estudio y cierres de manual. Las
// reglas están en la skill de la rutina («Cómo escribir», paso 3); esto atrapa lo mecánico.
//
// Uso (se pueden combinar):
//   node scripts/revisar-textos.js --slots '{"TITULAR_1": "...", ...}'      (o una lista, una por placa)
//   node scripts/revisar-textos.js --texto 'el copy del posteo'
//   node scripts/revisar-textos.js --spec posts/2026-10-16-4-video.json      (la receta de un video)
//   node scripts/revisar-textos.js --semana posts/aprobacion-semana-42.json  (todos los posts de la semana)
//
// Un ERROR (AFIP, «& Asociados», invitar a llamar, «Tip», la web sin guion) sale con código 1 y hay
// que corregirlo. Un AVISO obliga a releer: a veces se justifica (una noticia con un porcentaje de la
// fuente), casi nunca (una pregunta al lector, un aforismo).
const fs = require('fs');
const path = require('path');
const { textosDe } = require('../mdo-templates/video-animado.js');

const sinTildes = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');

// [expresión sobre el texto sin tildes, mensaje]
const ERRORES = [
  [/\bAFIP\b/i, 'dice AFIP: el organismo se llama ARCA.'],
  [/&\s*asociados/i, '«& Asociados» es el nombre anterior del estudio.'],
  [/\b(llam[ae]nos|llam[ae]n? al|llamar al|nos llames?)\b|📞/i, 'invita a llamar: el cierre es «Escribinos» o la página del servicio.'],
  [/\btips?\b/i, 'la palabra «Tip» no va ni en la placa ni en el texto.'],
  [/(^|[^@\w-])mdoconsultores\.com/i, 'la web va con guion: mdo-consultores.com.ar.'],
];
const AVISOS = [
  [/[¿?]/, 'es una pregunta: afirmar suena más a estudio que preguntar.'],
  [/[¡!]/, 'tiene signos de exclamación.'],
  [/\bno es\b[^.;:]{1,60}[,.;:—–-]\s*(es|sino)\b|\bno se trata de\b/i, 'aforismo de dos tiempos («X no es A, es B»): describir la situación concreta.'],
  [/\d+\s?%/, 'porcentaje: ¿está en la fuente? Si no, sacarlo.'],
  [/elegi tu opcion|dirigir no es hacer todo|no esperes a que sea tarde|que no te agarre|el orden es rentabilidad|la informacion es poder|responde en la encuesta|sabias que/i, 'frase de manual: decir algo que sólo diría el estudio.'],
  [/siguiente nivel|potencia(r|) tu|impulsa(r|) tu|transforma(r|) tu|hace crecer tu negocio/i, 'suena a coach: nombrar la tarea concreta.'],
  [/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, 'tiene emojis.'],
];

function revisar(textos) {
  const out = { errores: [], avisos: [] };
  for (const { donde, texto } of textos) {
    const t = sinTildes(texto);
    for (const [re, msg] of ERRORES) if (re.test(t) || re.test(texto)) out.errores.push(`[${donde}] ${msg} → «${texto.slice(0, 80)}»`);
    for (const [re, msg] of AVISOS) if (re.test(t) || re.test(texto)) out.avisos.push(`[${donde}] ${msg} → «${texto.slice(0, 80)}»`);
  }
  return out;
}

const deSlots = (slots, prefijo) => (Array.isArray(slots) ? slots : [slots]).flatMap((o, i, todos) =>
  Object.entries(o || {}).map(([k, v]) => ({ donde: `${prefijo}${todos.length > 1 ? ' ' + (i + 1) : ''} · ${k}`, texto: String(v == null ? '' : v) })));
// El copy se revisa sin los hashtags: #Pymes o #ARCA no son frases.
const deCopy = (texto, donde) => [{ donde, texto: String(texto || '').replace(/(^|\s)#[\p{L}\p{N}_]+/gu, ' ').trim() }].filter((x) => x.texto);
const deSpec = (spec, prefijo) => textosDe(spec).map((x) => ({ donde: `${prefijo} · ${x.donde}`, texto: x.texto }));
const leerJson = (s) => JSON.parse(/^\s*[[{]/.test(s) ? s : fs.readFileSync(path.resolve(s), 'utf8'));

if (require.main === module) {
  const a = {};
  for (let i = 2; i < process.argv.length; i++) if (process.argv[i].startsWith('--')) a[process.argv[i].slice(2)] = process.argv[++i];
  if (!a.slots && !a.texto && !a.spec && !a.semana) {
    console.error("Uso: node scripts/revisar-textos.js [--slots '<JSON>'] [--texto '<copy>'] [--spec receta.json] [--semana posts/aprobacion-semana-NN.json]");
    process.exit(1);
  }
  const textos = [];
  if (a.slots) textos.push(...deSlots(leerJson(a.slots), 'placa'));
  if (a.texto) textos.push(...deCopy(a.texto, 'texto del posteo'));
  if (a.spec) textos.push(...deSpec(leerJson(a.spec), 'video'));
  if (a.semana) {
    for (const p of leerJson(a.semana).posts || []) {
      const dia = p.dia || 'post';
      if (p.slots) textos.push(...deSlots(p.slots, `${dia} · placa`));
      if (p.info && p.info.text) textos.push(...deCopy(p.info.text, `${dia} · texto`));
      if (p.video && p.video.spec) textos.push(...deSpec(p.video.spec, `${dia} · video`));
    }
  }
  const r = revisar(textos);
  r.errores.forEach((x) => console.error('ERROR ' + x));
  r.avisos.forEach((x) => console.error('AVISO ' + x));
  console.log(`${textos.length} textos · ${r.errores.length} errores · ${r.avisos.length} avisos`);
  process.exit(r.errores.length ? 1 : 0);
}

module.exports = { revisar, deSlots, deCopy, deSpec };

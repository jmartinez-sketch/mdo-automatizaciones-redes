#!/usr/bin/env node
// Control de la voz del estudio sobre los textos de un post, antes de renderizar.
//
// La voz está en la guía de voz que aprobó Juan el 08/10/2026: vive en el design system
// (project/GUIA-DE-VOZ.md) y el repo la copia en .claude/brand-voice-guidelines.md. La rutina
// escribe con esa guía y controla cada texto contra ella (paso 3, «Cómo escribir»); esto atrapa lo
// mecánico: los términos de «No se usa nunca» y «Se evita», y los vicios de «Lenguaje a evitar».
// Antes de la guía, Juan ya había coincidido (06/10/2026) en que lo que sonaba a IA era el texto.
//
// Uso (se pueden combinar):
//   node scripts/revisar-textos.js --slots '{"TITULAR_1": "...", ...}'      (o una lista, una por placa)
//   node scripts/revisar-textos.js --texto 'el copy del posteo'
//   node scripts/revisar-textos.js --spec posts/2026-10-16-4-video.json      (la receta de un video)
//   node scripts/revisar-textos.js --semana posts/aprobacion-semana-42.json  (todos los posts de la semana)
//
// Un ERROR (AFIP, «& Asociados», invitar a llamar, «Tip», la web sin guion, «más de 30 años») sale con
// código 1 y hay que corregirlo. Un AVISO obliga a releer: a veces se justifica (una noticia con un
// porcentaje de la fuente, un dilema real en pregunta), casi nunca (una pregunta al lector, un aforismo).
const fs = require('fs');
const path = require('path');
const { textosDe } = require('../mdo-templates/video-animado.js');

const sinTildes = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// [expresión, mensaje]. Cada una se prueba sobre el texto tal cual y sin tildes («años» → «anos»).
const ERRORES = [
  [/\bAFIP\b/i, 'dice AFIP: el organismo se llama ARCA.'],
  [/&\s*asociados/i, '«& Asociados» es el nombre anterior del estudio.'],
  [/\b(llam[ae]nos|llam[ae]n? al|llamar al|nos llames?)\b|📞/i, 'invita a llamar: el cierre es «Escribinos» y la página del servicio.'],
  [/\btips?\b/i, 'la palabra «Tip» no va ni en la placa ni en el texto.'],
  [/(^|[^@\w-])mdoconsultores\.com/i, 'la web va con guion: mdo-consultores.com.ar.'],
  [/\bmas de (30|treinta) anos\b|\+\s?30 anos\b/i, 'antigüedad: siempre «30 años», sin «más de» ni «+30».'],
];
const AVISOS = [
  [/[¿?]/, 'es una pregunta: se afirma. Sólo vale si es un dilema real que la pieza responde («¿Certificado o auditado?»); nunca encuestas.'],
  [/[¡!]/, 'tiene signos de exclamación.'],
  [/\bno es\b[^.;:]{1,60}[,.;:—–-]\s*(es|sino)\b|\bno se trata de\b/i, 'aforismo de dos tiempos («X no es A, es B»): sólo vale si la segunda parte nombra la plata concreta, una vez por pieza y nunca como cierre.'],
  [/\d+\s?%/, 'porcentaje: ¿está en la fuente? Si no, sacarlo.'],
  [/elegi tu opcion|dirigir no es hacer todo|no esperes a que sea tarde|que no te agarre|el orden es rentabilidad|la informacion es poder|responde en la encuesta|sabias que|en tiempo y forma|a la brevedad/i, 'frase de manual: decir algo que sólo diría el estudio.'],
  [/siguiente nivel|potencia(r|) tu|impulsa(r|) tu|transforma(r|) tu|hace crecer tu negocio|dormi tranquilo|ordena hoy|te concentres en|concentrate en|nos ocupamos de todo|despreocupate/i, 'suena a coach o a agencia: nombrar la tarea concreta que hace el estudio.'],
  [/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, 'tiene emojis.'],
  [/\bPyMEs?\b|\bPYMES?\b/, '«pyme» va en minúscula en el texto, como la web (los hashtags quedan como están).'],
  [/\bemprendedor(a|es|as)?\b|\bmonotribut\w*|\brecategoriza\w*/i, 'el estudio trabaja sólo para empresas: «empresa», «sociedad».'],
  [/\bgratis\b|\bcon lupa\b|\bhacks?\b|\bsecretos?\b/i, 'tono de oferta o de influencer: «segunda opinión técnica», «revisión».'],
  [/\b(simple|faciles?|sin complicaciones)\b/i, 'promesa («simple», «fácil»): decir qué hace el estudio, concreto.'],
  [/\btu negocio\b/i, 'el lector dirige una empresa: «tu empresa» o «tu sociedad».'],
  [/\bconsultanos\b/i, 'el cierre es «Escribinos» y la página del servicio, no «Consultanos».'],
  [/\bMDO( Consultores)? (brinda|ofrece|cuenta con|se especializa|es un estudio|acompana)\b/i, 'tercera persona corporativa: el estudio habla de sí en «nosotros».'],
  [/\b(desde|fundad[oa] en|est\.)\s*19\d\d\b/i, 'si es la antigüedad del estudio, va «30 años», sin el año de fundación.'],
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

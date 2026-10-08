---
# Ajustes del plugin brand-voice (Anthropic) para MDO Consultores.
# La guía está en .claude/brand-voice-guidelines.md: es una copia del design system
# «MDO - Diseño» (project/GUIA-DE-VOZ.md) que escribe scripts/sincronizar-diseno.js.
company_name: "MDO Consultores"
platforms:
  notion: false
  confluence: false
  google-drive: false
  box: false
  microsoft-365: false
  figma: false
  gong: false
  granola: false
  slack: false
discovery:
  search-depth: standard
  max-sources: 15
enforcement:
  strictness: strict        # lo que se publica sale a nombre del estudio: la guía no se flexibiliza
  always-explain: false     # Juan pide respuestas cortas: no agregar notas de marca a cada texto
open-questions:
  share-with-team: false
---
# Brand Context

## Company Name
MDO Consultores (Martinez, De Orta & Gutierrez Taboada). Estudio contable e impositivo de Buenos Aires, 30 años, trabaja sólo para empresas.

## Known Brand Materials
- Design system «MDO - Diseño» (la única fuente de la marca): https://claude.ai/code/artifact/44406cc7-a5b6-4e92-8bc3-ba5e9090747b
  - `project/GUIA-DE-VOZ.md`: la guía de voz (copiada acá en `.claude/brand-voice-guidelines.md`)
  - `project/README.md`: el brand book (sección 2, «Cómo se escribe»)
  - `project/assets/manual/SALVEDADES.md`: decisiones del estudio que se apartan del manual
- Web: repo `jmartinez-sketch/mdo-web` (`messages/es.json`, `src/data/services.ts`, `content/novedades/`)
- Estrategia de contenido de las redes: `.claude/skills/mdo-rutina-semanal/CONTEXTO-PUBLICIDAD.md`
- Lo que Juan aprueba y rechaza: `posts/aprendizaje.json`

## Additional Context
- Quien decide sobre la voz es Juan Martínez (socio). Un cambio de voz se hace en el design system y después se sincroniza; no se edita la copia del repo.
- La rutina semanal de redes (`.claude/skills/mdo-rutina-semanal/SKILL.md`) escribe con esta guía y pasa cada texto por `scripts/revisar-textos.js` antes de cargarlo en el panel de aprobación.
- Reglas duras: ARCA (nunca AFIP), nunca «& Asociados», nunca invitar a llamar, sin números ni plazos en el post de gestión del viernes ni en el de servicio del sábado.

# Fuente de este design system

repo: jmartinez-sketch/mdo-brand
branch: main

Otro repo leído (fuente del UI kit de placas): jmartinez-sketch/mdo-automatizaciones-redes (branch main).

Los documentos del estudio vienen del proyecto de Claude Design **MDO Design System**, id `25cdebbe-d283-4be8-8d5e-a171bcfb7c7a` (no es un repo).

## Last sync

date: 2026-08-20T13:12:00Z

### Updated in this project

- Tokens de color, tipografía, espacio y forma escritos desde `actual/brand.json` + `actual/tokens.css`.
- Los 8 SVG de logo importados y repintados con las tintas del manual (el saneador borra `<style>` dentro del SVG: los colores van por atributo), más 9 tintes planos derivados.
- 27 tarjetas de fundamentos y 15 componentes (marca, texto, placas de redes, iconos).
- 7 templates de documentos migrados del proyecto MDO Design System, con la piel nueva y el paginado A4 remedido.
- `ui_kits/redes/mdo-brand.css`: la v2.0 del CSS de marca de las 58 placas, para commitear en `mdo-automatizaciones-redes`.

## Screen map

| Pantalla / archivo del proyecto | Salió de |
|---|---|
| `tokens/colors.css`, `tokens/fonts.css` | `mdo-brand`: `actual/brand.json`, `actual/tokens.css`, `actual/fonts.css` |
| `tokens/typography.css`, `tokens/semantic.css`, `tokens/effects.css` | `mdo-brand`: `design-system/plantilla.html` |
| `assets/logos/*` | `mdo-brand`: `assets/logos/` (+ tintes derivados acá) |
| `guidelines/*.card.html` | `mdo-brand`: `brand.json`, `design-system/cards/*`, `plantilla.html` |
| `components/marca/*`, `components/texto/*`, `components/redes/*` | `mdo-automatizaciones-redes`: `mdo-templates/brand.jsx`, `tpl-utils.jsx`, `mdo-brand.css` |
| `components/iconos/Icon.jsx` | `mdo-automatizaciones-redes`: `mdo-templates/templates-friday-b.jsx` |
| `ui_kits/redes/*` | `mdo-automatizaciones-redes`: `PLACEHOLDERS.md`, `render.html`, `templates-*.jsx` |
| `ui_kits/redes/mdo-brand.css` | reescritura de `mdo-automatizaciones-redes`: `mdo-templates/mdo-brand.css` |
| `templates/*` (7 documentos) | proyecto MDO Design System `25cdebbe…`: `templates/*` + `MIGRACION.md` |
| `readme.md` (content fundamentals) | `mdo-automatizaciones-redes`: `CLAUDE.md`; `mdo-brand`: `README.md`, `docs/*` |

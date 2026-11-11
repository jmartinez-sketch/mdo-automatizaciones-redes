---
name: mdo-design
description: Use this skill to generate well-branded interfaces and assets for MDO Consultores (estudio contable argentino, marca v2.0 del Manual de Marca 2026), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Atajos para no leer todo:

- Colores, tipografías, espacio, radios y alias semánticos: `tokens/*.css`, cargados desde `styles.css`.
- **Tipografía, ojo:** Open Sans va en TODO, títulos incluidos (`--font-display` apunta ahí). Chivo es SOLO acento para frases cortas (`--font-accent`). El manual es explícito.
- Logos: `assets/logos/` (8 originales del manual + 9 tintes planos). Nunca redibujar el logo.
- Cómo se escribe: sección «Content fundamentals» del readme. Dos reglas duras: **ARCA, nunca AFIP**, y nada de números, fechas ni consejos legales específicos en contenido generado.
- Placas de Instagram y LinkedIn: `ui_kits/redes/` (formatos, márgenes mínimos, slots).
- Interfaz interna: `ui_kits/panel-libros/`.
- Cada componente tiene su `.prompt.md` al lado con el ejemplo de uso y los valores correctos.

El estudio habla español rioplatense, de vos, en frases cortas, y dice en voz alta lo que falta. Si escribís copy para MDO, escribilo así.

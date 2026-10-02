Texto de lectura. Open Sans, line-height 1.65, medida maxima 60-66 caracteres.

```jsx
<Lede>Los colores, las tipografias y los logos del estudio.</Lede>
<Lede size="note">Medido contra el papel #f8f6f6, criterio WCAG 2.1 AA.</Lede>
```

Nunca uses `--slate` (#7c8392) para cuerpo de texto: da 3.53:1 sobre papel y no pasa AA. Para eso esta `--ink-70`, que es lo que aplica `size="body"`.

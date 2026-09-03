/** Atribucion de una noticia: fuente truncada + fecha intacta. */
export interface SourceFooterProps {
  /** Medio u organismo. Se trunca con ellipsis si es largo. */
  fuente?: string;
  /** Fecha corta, ej. '11 jun 2026'. Nunca se comprime ni se parte. */
  fecha?: string;
  /** Rotulo de la izquierda. Default 'Fuente'. */
  label?: string;
  onInverse?: boolean;
  style?: React.CSSProperties;
}
export declare function SourceFooter(props: SourceFooterProps): JSX.Element;

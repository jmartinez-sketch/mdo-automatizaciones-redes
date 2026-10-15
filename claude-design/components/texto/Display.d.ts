/** Titular en Chivo, con la escala de la pagina de marca. */
export interface DisplayProps {
  children?: React.ReactNode;
  /** 1 = Chivo 900 titular; 2 = 700 seccion; 3 = 700 subtitulo. Default 1. */
  level?: 1 | 2 | 3;
  onInverse?: boolean;
  /** Sobreescribe el tag (por defecto h1/h2/h3). */
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Display(props: DisplayProps): JSX.Element;

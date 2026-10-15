/** Indice de slide dentro de un carrusel. */
export interface PageIndexProps {
  current?: number;
  total?: number;
  onInverse?: boolean;
  style?: React.CSSProperties;
}
export declare function PageIndex(props: PageIndexProps): JSX.Element;

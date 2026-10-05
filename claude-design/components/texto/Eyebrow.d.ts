/** Volanta en versalitas: abre secciones, placas y fichas. */
export interface EyebrowProps {
  children?: React.ReactNode;
  /** true sobre fondo navy. */
  onInverse?: boolean;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;

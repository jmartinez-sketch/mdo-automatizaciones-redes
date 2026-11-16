/** Filete de 1px: el separador de la marca. */
export interface RuleProps {
  /** Ancho CSS. Default '100%'. Un filete corto (64px) marca el pie de un numero. */
  width?: string | number;
  strong?: boolean;
  onInverse?: boolean;
  style?: React.CSSProperties;
}
export declare function Rule(props: RuleProps): JSX.Element;

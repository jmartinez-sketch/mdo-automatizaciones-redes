/** Capsula de categoria en versalitas. */
export interface ChipProps {
  children?: React.ReactNode;
  /** Relleno solido navy (o papel sobre navy). Default false: solo borde. */
  solid?: boolean;
  onInverse?: boolean;
  style?: React.CSSProperties;
}
export declare function Chip(props: ChipProps): JSX.Element;

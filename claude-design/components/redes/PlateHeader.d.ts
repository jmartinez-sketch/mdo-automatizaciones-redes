/** Encabezado de placa: lockup + chip de categoria. */
export interface PlateHeaderProps {
  /** Texto del chip de la derecha. Sin chip, solo va el lockup. */
  chip?: React.ReactNode;
  /** true sobre placa navy. */
  onInverse?: boolean;
  /** Alto del lockup en px. Default 40; es el minimo legible del lockup completo. */
  height?: number;
  base?: string;
  style?: React.CSSProperties;
}
export declare function PlateHeader(props: PlateHeaderProps): JSX.Element;

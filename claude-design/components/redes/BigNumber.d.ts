/** Numero grande de placa, alineado por baseline con su unidad. */
export interface BigNumberProps {
  children?: React.ReactNode;
  /** Cuerpo en px. 200 para 2 digitos, 172 para 3, 142 para 4. Default 180. */
  size?: number;
  /** Unidad al lado ('anos', '%'), alineada por baseline. */
  unit?: React.ReactNode;
  onInverse?: boolean;
  style?: React.CSSProperties;
}
export declare function BigNumber(props: BigNumberProps): JSX.Element;

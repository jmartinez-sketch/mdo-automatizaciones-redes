/** Isotipo gigante y translucido para el fondo de una placa. */
export interface IsoWatermarkProps {
  /** Alto en px del isotipo. Default 210. */
  size?: number;
  /** Default 0.05 sobre papel; 0.08 sobre navy. Nunca mas de 0.10. */
  opacity?: number;
  tone?: 'navy' | 'paper' | 'slate';
  base?: string;
  /** Posicionalo con top/right/bottom/left: ya viene position:absolute. */
  style?: React.CSSProperties;
}
export declare function IsoWatermark(props: IsoWatermarkProps): JSX.Element;

/** Hueco rotulado para una foto o imagen real. */
export interface SlotProps {
  /** Que va ahi, en dos o tres palabras. Default 'Imagen'. */
  caption?: string;
  height?: number | string;
  style?: React.CSSProperties;
}
export declare function Slot(props: SlotProps): JSX.Element;

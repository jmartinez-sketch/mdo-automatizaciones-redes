/** Texto en Open Sans: bajada, cuerpo o nota. */
export interface LedeProps {
  children?: React.ReactNode;
  /** 'lede' bajada de titular · 'body' texto corrido · 'note' letra chica. Default 'lede'. */
  size?: 'lede' | 'body' | 'note';
  onInverse?: boolean;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Lede(props: LedeProps): JSX.Element;

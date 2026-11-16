/** Pie de placa: handle de redes y sitio, en una sola linea. */
export interface HandleFooterProps {
  /** Default '@mdoconsultores'. */
  handle?: string;
  /** Default 'mdo-consultores.com.ar'. */
  right?: string;
  onInverse?: boolean;
  style?: React.CSSProperties;
}
export declare function HandleFooter(props: HandleFooterProps): JSX.Element;

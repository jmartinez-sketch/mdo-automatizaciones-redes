/**
 * Artboard de una placa de redes: fija el tamano base, el fondo y el padding
 * de seguridad, y escala al tamano de salida real.
 */
export interface PlateProps {
  /** square 540x540 · portrait 540x675 · story 480x853 · linkedin 600x314 · carouselSq · carouselPo */
  format?: 'square' | 'portrait' | 'story' | 'linkedin' | 'carouselSq' | 'carouselPo';
  /** Fondo. 'navy' invierte el color de texto. Default 'paper'. */
  tone?: 'paper' | 'white' | 'tint' | 'pale' | 'navy';
  /** Factor de escala para previsualizar. 1 = tamano base de diseno. */
  scale?: number;
  /** Padding CSS. Default: el minimo del formato. NUNCA bajarlo. */
  pad?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Plate(props: PlateProps): JSX.Element;
export declare const PLATE_FORMATS: Record<string, { w: number; h: number; out: string; pad: number | string }>;

/** Los nueve iconos line-style del estudio. Trazo 1.7, viewBox 24, currentColor. */
export interface IconProps {
  name?: 'reloj' | 'grafico' | 'escudo' | 'documento' | 'calculadora' | 'balanza' | 'equipo' | 'buscar' | 'tilde';
  /** Lado en px. Default 32. */
  size?: number;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
export declare const ICON_NAMES: string[];

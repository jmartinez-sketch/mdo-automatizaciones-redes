/**
 * Logo de MDO: isotipo, lockup principal (MDO / CONSULTORES) o lockup
 * secundario (MARTINEZ · DE ORTA · GUTIERREZ TABOADA).
 */
export interface LockupProps {
  /** Cual de los tres logos. Default 'principal'. */
  variant?: 'isotipo' | 'principal' | 'secundario';
  /** Tinte plano del trazado. Default 'navy'. Sobre fondo oscuro va 'paper'. */
  tone?: 'navy' | 'paper' | 'slate';
  /** Usa el SVG con fondo solido del manual (lienzo 1080x1080, placa de redes). */
  plate?: null | true | 'navy' | 'claro';
  /** Alto en px; el ancho sale del trazado. Default 44. */
  height?: number;
  /** Ruta a la carpeta de logos desde la pagina. Default 'assets/logos'. */
  base?: string;
  alt?: string;
  style?: React.CSSProperties;
}
export declare function Lockup(props: LockupProps): JSX.Element;

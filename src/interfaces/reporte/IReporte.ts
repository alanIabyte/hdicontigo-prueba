export interface Ubicacion {
  latitud: number;
  longitud: number;
}

export interface IReporte {
  numeroReporte: number;
  numeroSiniestro: string;
  estatusReporte: string;
  descEstatusReporte: string;
  tipoAtencion: number;
  descTipoAtencion: string;
  nombreReporta: string;
  fechaReporte: Date;
  ubicacion: Ubicacion;
  encuestasPend: boolean;
}

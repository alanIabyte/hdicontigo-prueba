import { RespGrl } from "../Graphql/IGraphql";

export interface Ubicacion {
  latitud: number;
  longitud: number;
}

export type Reporte = {
  numeroReporte: number;
  numeroSiniestro: string;
  estatusReporte: string;
  descEstatusReporte: string;
  tipoAtencion: number;
  descTipoAtencion: string;
  nombreReporta: string;
  fechaRepore: string;
  nombreAuto?: string;
  fechaReporte?: string;
  encuestasPend: boolean;
  ubicacion?: Ubicacion;
};

export interface ImagenesVehiculo {
  nombre: string;
  url: string;
}

export interface IPoliza {
  poliza: string;
  numeroCertificado: string;
  numeroEndoso: null;
  fechaInicio: string;
  fechaTermino: string;
  oficina: string;
  numeroDocumento: string;
  estatus: null;
  nombreCompletoAsegurado: null;
  telefonoAsegurado: null;
  tipoAsegurado: null;
  lineaNegocio: string;
  datosVehiculo: string;
  vin: string;
  imagenesVehiculo: ImagenesVehiculo[];
}

export type Poliza = {
  reportes: Reporte[];
  poliza: IPoliza[];
};

export interface IObtenerPolizas {
  obtener_polizas: RespGrl<Poliza[]>;
}

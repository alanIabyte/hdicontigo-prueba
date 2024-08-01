import { IEventosNotificaciones } from "../Graphql/IEventosNotificaciones";

type IDatosGrl = {
  data: string;
};

type IDatosReporteCompleto = {
  numeroReporte: number;
  numeroSiniestro: string;
};

type IContactoReporte = {
  telefono: string;
  email: string;
};

interface IDatosRoboAdicionales {
  caracteristicas: string;
  colorVehiculo: string;
  declaracion: boolean;
  duplicado: boolean;
  folio911: string;
  nombreConductor: string;
  razonDuplicado: string;
  ultimoConductor: boolean;
}

interface Ubicacion {
  direccion?: string;
  lat: number;
  lng: number;
}

interface IDatosReporteRobo {
  atencionLugarRobo: boolean;
  conViolencia: boolean;
  datosRoboAdicionales?: IDatosRoboAdicionales;
  fechaOcurrencia: string;
  horaRobo: string;
  infoContacto: IContactoReporte;
  numeroPoliza: string;
  numeroSerie: string;
  referenciasUbicacionRobo: string;
  tiempoGrabacion: string;
  ubicacionAtencionRobo: Ubicacion;
  ubicacionRobo: Ubicacion;
  nombreCompletoAsegurado: string;
  modeloVehiculo: string;
}

interface IFechasValuacion {
  FechaInicioValuacion: string;
  FechaFinValuacion: string;
}

export interface IRedux {
  datosAjustador: {
    imagen: string;
    nombre: string;
  };
  datosTaller: IDatosGrl;
  datosReporteCompleto: IDatosReporteCompleto;
  datosIngresoTaller: IDatosGrl;
  datosValuacion: IDatosGrl;
  datosValuacionMontos: IDatosGrl;
  datosDeducible?: IDatosGrl;
  datosPagoDeduciblePagado?: IDatosGrl;
  datosReporteRobo: IDatosReporteRobo;
  coordenadasIniciales?: Ubicacion;
  coordenadasInicialesAtencion?: Ubicacion;
  eventoEvaluacionSiniestro: IEventosNotificaciones;
  tipoAtencionIndemnizacion: string;
  fechasValuacion: IFechasValuacion;
  datosVehiculo?: {
    data: string;
  };

  // Datos opcionales
  datosAjusteDigital?: {
    data: IEventosNotificaciones;
  };
  AjusteDigital?: {
    data: IEventosNotificaciones;
  };
  numeroReporte?: string;
  numeroSiniestroReporte?: string;
  numeroSiniestro?: string;
  datosReporte?: any;
  informacionContacto?: {
    email: string;
    telefono: string;
  };
  pagoIndemnizacion: {
    MontoIndemnizacion: string;
    MontoDeducible: string;
    TotalAPagar: string;
    MetodoPago: string;
    NumeroTransferencia: string;
    pagoAplicado: boolean;
  };
}

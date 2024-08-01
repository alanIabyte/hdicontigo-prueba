/* eslint-disable prettier/prettier */
import { RespGrl } from "../Graphql/IGraphql";
// ! Este archivo contiene todas las interfaces necesarias para los tipos de dato de los flujos de indemnizacion por PT, DG, DP o RT
export interface IDatoObtenerDocumentos {
  id: number;
  descripcion: string;
  tipoAtencion: string;
  tipoDocumento: string;
  tipoPersona: string;
  nombre: string;
  url: string;
};

export interface IDatoObtenerDocumentosS3 {
  nombre: string;
  url: string;
  type: string;
};

export interface IDatoGuardarTipoAtencion {
  mensaje: string,
	codigo: string,
	completado: boolean,
	dato: boolean
};

export interface IDatoTipoAtencion {
  id: number;
	tipoAtencion: string;
	numeroSiniestro: string;
	numeroReporte: number;
};

export interface IDatoPreguntasFrecuentes {
  id: number;
  orden: number;
  pregunta: string;
  respuesta: string;
  categoria: string;
};

export interface IDatoObtenerLigaDocumenta {
  coberturaPoliza: string;
	estatus: string;
	fechaAltaClienteUnix: string;
	linkActual: string;
	tipoAsegurado: string;
	tipoTramite: string;
  porcentajeDocumentos: string;
  metodoPago: string;

  fechaCita: string;
  oficinaCita: string;
}


export interface IObtenerLigaDocumenta {
  obtener_documentacion_siniestro: RespGrl<IDatoObtenerLigaDocumenta>;
};

export interface IGuardarTipoAtencion {
  indemnizacion_guardarTipoAtencion: RespGrl<IDatoGuardarTipoAtencion>;
};

export interface IObtenerTipoAtencion {
  indemnizacion_obtenerSeleccionTipoAtencion: RespGrl<IDatoTipoAtencion>;
};

export interface IObtenerPreguntasFrecuentes {
  preguntas_preguntasFrecuentes: RespGrl<IDatoPreguntasFrecuentes[]>;
};

export interface IObtenerDocumentos {
  indemnizacion_obtenerRequisitos: RespGrl<IDatoObtenerDocumentos[]>;
};

export interface IEnviarCorreoDocumentacionHDI {
  enviar_correo_documentacion_hdi: RespGrl<Boolean>;
}


// !Props
export interface IPropsResumenIndemnizacion {
  temaBoton: string;
  montos: {
    MontoIndemnizacion: string;
    MontoDeducible: string;
    TotalAPagar: string;
    MetodoPago: string;
    NumeroTransferencia: string;
  };
  esRobo: boolean;
}
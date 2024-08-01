/* eslint-disable import/extensions */
import { RespGrl } from "../../../../interfaces/Graphql/IGraphql";

export type Dato = {
  encuesta: number;
  evaluado: string;
  lineaNegocio: string;
  siniestro: string;
};

export interface QueryResponse {
  encuesta_obtenerEncuestasPendientes: RespGrl<Dato[]>;
}

export interface CustomLocation {
  reporte: {
    numeroReporte: string;
    numeroSiniestro: string;
  };
}

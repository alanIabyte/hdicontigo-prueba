import { RespGrl } from "../Graphql/IGraphql";

export interface IDatoCristaleras {
  direccion: string;
  colonia: string;
  codigoPostal: string;
  municipio: string;
  estado: string;
  latitud: number;
  longitud: number;
  distanciaKm: number;
}

export interface IRespuestaObtenerCristaleras {
  cristaleras_obtenerCristalerasCercanas: RespGrl<IDatoCristaleras[]>;
}

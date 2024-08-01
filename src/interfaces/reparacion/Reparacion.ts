import { RespGrl } from "../Graphql/IGraphql";

export interface IDatoTalleresCodigoPostal {
  suc_id: number;
  con_nombre_comercial: string;
  suc_asociado: string;
  estado_id: string;
  estado: string;
  ciudad_id: string;
  ciudad: string;
  municipio_id: string;
  municipio: string;
  direccion: string;
  codigo_postal: string;
  telefono: string;
  email: string;
}

export interface IRespuestaObtenerTalleresCP {
  indemnizacion_obtenerTalleresCodigoPostal: RespGrl<
    IDatoTalleresCodigoPostal[]
  >;
}

export interface ICoordenadas {
  lat: number;
  lng: number;
}

import { RespGrl } from "../../../interfaces/Graphql/IGraphql";

export type IResultadoBusqueda = {
  lineaNegocio: string;
  rfc: string;
  agenciaId: string;
  polizaId: string;
  inciso: number;
  numeroSerie: string;
  descripcionVehiculo: string;
  telefonoCasa: string;
  telefonoOficina: string;
};

export interface IBuscarPolizasRespGrl {
  busqueda_buscarPolizas: RespGrl<IResultadoBusqueda[]>;
}

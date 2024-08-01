import { RespGrl } from "../../../../interfaces/Graphql/IGraphql";

export type IDatoEnvioCodigo = {
  codigoId: number;
  minutosExpiracion: number;
};

export interface IRespuestaSMS {
  busqueda_enviarCodigo: RespGrl<IDatoEnvioCodigo>;
}

export interface IValidarCodigo {
  busqueda_validarCodigo: RespGrl<boolean>;
}

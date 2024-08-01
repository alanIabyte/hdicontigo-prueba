/* eslint-disable */
import { loader } from "graphql.macro";
import cliente from "../servicios/apollo";

const getPolizas = async (telefono) => {
    const OBTENER_POLIZAS_COBRANZA = loader(
      "../../../graphQL/query/cobranza/cobranza_consultaPolizasCobranza.graphql"
    );
    const response = await cliente.query({
      query: OBTENER_POLIZAS_COBRANZA,
      variables: {
        telefono,
        token: objetoCookie.access_token,
      },
      fetchPolicy: "cache-first",
    });
    return response;
};

export { getPolizas };

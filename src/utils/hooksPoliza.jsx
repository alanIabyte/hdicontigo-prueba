/* eslint-disable */
import { loader } from "graphql.macro";
import cliente from "../servicios/apollo";

const getPoliza = async (poliza) => {
    const OBTENER_POLIZA = loader(
      "../graphQL/query/cobranza/cobranza_detallePolizaCobranza.graphql"
    );

    const response = await cliente.query({
      query: OBTENER_POLIZA,
      variables: {
        agencia: poliza.oficina,
        inciso: parseInt(poliza.inciso),
        lineaNegocio: poliza.lineaNegocio,
        numeroReporte: 0,
        poliza:
          poliza.lineaNegocio === "AUTR"
            ? poliza.poliza.length == 10
              ? poliza.poliza
              : `${poliza.oficina}${poliza.poliza}`
            : poliza.poliza,
      },
      fetchPolicy: "cache-first",
    });
    return response;
};

export { getPoliza };

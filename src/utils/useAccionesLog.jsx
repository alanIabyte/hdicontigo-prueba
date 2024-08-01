/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

// Helper that re-uses logic to run actions for "LogUsuariosAcciones"
// accion_id corresponds to what the user does
/* action_id:
  1 - entro
  2 - ejecuto
  3 - cancelo
  4 - pago
  5 - descargo
  6 - transaccion no concluida
  7 - acepto
  8 - rechazo
*/

// process_id stands for where (screen) the user is running the action
/*
  1 - domiciliazacion
  2 - pago en linea
  3 - registro
  4 - deducible
  5 - factura o complemento de pago
  6 - forma de pago
  7 - pase medico
  8 - pase taller
  9 - ubicacion
  11 - Llamada a Google Maps API
*/
const useAccionesLog = (telefono = "") => {
  const LOGUSUARIOS_ACCIONES = loader(
    "../graphQL/mutation/log/logUsuarios_acciones.graphql"
  );
  // logUsuario_HDIContigo
  const LOGUSUARIO_HDICONTIGO = loader(
    "../graphQL/mutation/log/logUsuario_HDIContigo.graphql"
  );

  const [runAction] = useMutation(LOGUSUARIOS_ACCIONES);
  const [runActionHDIContigo] = useMutation(LOGUSUARIO_HDICONTIGO);

  // Each function corresponds to a different action with a dynamic process since you can run the same action in a different screen (process)
  const runEnterLog = (proceso) => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 1,
        listaDetalle: [{ "columna": "", "valor": "" }],
      },
    });
  };

  const runSuccesLog = (proceso, listaDetalle) => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 2,
        listaDetalle: listaDetalle || [{ "columna": "", "valor": "" }],
      },
    });
  };

  const runCancelLog = (proceso, listaDetalle) => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 3,
        listaDetalle: listaDetalle || [{ "columna": "", "valor": "" }],
      },
    });
  };

  const runPaymentLog = (proceso, columna = "", valor = "") => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 4,
        listaDetalle: [{ "columna": columna, "valor": valor }],
      },
    });
  };

  const runDownloadLog = (proceso, listaDetalle) => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 5,
        listaDetalle: listaDetalle || [{ "columna": "", "valor": "" }],
      },
    });
  };

  const runNoConcludeTransactionLog = (
    proceso,
    columna = "",
    valor = "",
    arrayListaDetalle
  ) => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 6,
        listaDetalle: arrayListaDetalle || [{ "columna": columna, "valor": valor }],
      },
    });
  };

  const runAcceptLog = (proceso, listaDetalleParam) => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 7,
        listaDetalle: listaDetalleParam || [{ "columna": "", "valor": "" }],
      },
    });
  };

  const runDenialLog = (proceso, listaDetalle) => {
    runAction({
      variables: {
        usuario: `${telefono}`,
        proceso_id: proceso,
        accion_id: 8,
        listaDetalle: listaDetalle || [
          { "columna": "ubicacion", "valor": "denegado" },
        ],
      },
    });
  };

  const runHDIContigoLog = (detalle) => {
    runActionHDIContigo({
      variables: {
        usuario: `${telefono}`,
        detalle
      },
    });
  };

  return {
    runEnterLog,
    runCancelLog,
    runSuccesLog,
    runAcceptLog,
    runDenialLog,
    runDownloadLog,
    runPaymentLog,
    runNoConcludeTransactionLog,
    runHDIContigoLog,
  };
};

export default useAccionesLog;

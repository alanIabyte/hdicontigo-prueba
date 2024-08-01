/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, lazy, Suspense, memo } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import {
  useLazyQuery,
  useMutation,
  useSubscription
} from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { loader } from "graphql.macro";
import { useDispatch, useSelector } from "react-redux";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import moment from "moment";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  MensajePequeno,
  Contenedor,
  ContenedorRegresar,
  NumeroPoliza
} from "./PantallaDetallePoliza.styled";
import Constantes from "../../../recursos/constantes";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import IndicadorCarga from "../../indicador-carga";
import ModalSeccionCobertura from "../modal-seccion-cobertura-componente/ModalSeccionCobertura";
import { AlertaCampo } from "../../alerta";
import {
  validarRFC,
  diccionario,
  configurarAlerta,
  configAlertaCuentaHabiente,
  configAlertaError,
  configAlertaCancelado,
  configAlertaErrorCancelacion,
  configAlertaConfirmarCancelar,
  configAlertaRecibosPendientes,
  configAlertaNoHTC
} from "./utils";
import descargarPDF from "../../../utils/descargarPDF";
import useRedirect from "../../../utils/useRedirect";
import useGeolocation from "../../../utils/useGeolocation";
import useAlerta from "../../../utils/useAlerta";
import useSwitch from "../../../utils/useSwitch";
import DetallePolizaAUTR from "./DetallePolizaAUTR";
import DetallePolizaDAN from "./DetallePolizaDAN";
import DetallePolizaGMM from "./DetallePolizaGMM";
import { asignarCerosAgencia, asignarCerosPoliza } from "../../../helpers";
import useAccionesLog from "../../../utils/useAccionesLog";
import useNotificaciones from "../../../utils/useNotificaciones";

const Alerta = lazy(() => import("../../alerta/alerta-componente/Alerta"));

const nombreCookie = Constantes.nombreDeCookie;

const OBTENER_POLIZA = loader(
  "../../../graphQL/query/cobranza/cobranza_detallePolizaCobranza.graphql"
);

const OBTENER_POLIZA_GMM = loader(
  "../../../graphQL/query/poliza/gmm_consultaPoliza.graphql"
);

const OBTENER_CUENTA_HABIENTE = loader(
  "../../../graphQL/query/cobranza/cobranza_consultaDatosCuentaHabiente.graphql"
);

const OBTENER_POLIZA_PDF = loader(
  "../../../graphQL/query/poliza/obtener_polizaPDF.graphql"
);

const VALIDAR_POLIZA_CONTRATANTE = loader(
  "../../../graphQL/query/poliza/validar_polizaContratante.graphql"
);

const SUSCRIPCION_NOTIFICACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const CONDUCTO_COBRO_AUTOS = loader(
  "../../../graphQL/query/endoso/endoso_condutoCobroAutos.graphql"
);
const CONDUCTO_COBRO_DANOS = loader(
  "../../../graphQL/query/endoso/endoso_condutoCobroDanos.graphql"
);

const VALIDAR_REPORTES_EXISTENTES = loader(
  "../../../graphQL/mutation/reporte/reporte_validarReportesExistentes.graphql"
);

const OBTENER_CREDENCIAL_DIGITAL = loader(
  "../../../graphQL/query/gmm/gmm_ObtCredencialDigital.graphql"
);

// ! new
const OBTENER_FECHA_RECIBO = loader(
  "../../../graphQL/query/domiciliacion/endoso_fechaRecPendiente.graphql"
);

const PantallaDetallePoliza = () => {
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";
  const estadoApp = useSelector((estado) => estado);
  const history = useHistory();
  const dispatch = useDispatch();
  const { redirect: redirectDomiciliacion } = useRedirect("/domiciliacion");
  const { redirect: redirectInfoPagos } = useRedirect("/informacion-pagos");
  const location = useLocation();
  const { runAcceptLog, runDenialLog, runCancelLog } = useAccionesLog(
    usuario || ""
  );
  const { redirectRoot, redirectMisPolizas } = useRedirect();
  const {
    getLocation,
    geolocation,
    error: errorLocation,
    loading: loadingLocation
  } = useGeolocation();
  const switchDomiciliacion = useSwitch(
    diccionario.domiciliarPago,
    false,
    true
  );
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    redirectRoot();
  }

  const [reportesExistentes, { loading: loadingReportes, data: dataReportes }] =
    useMutation(VALIDAR_REPORTES_EXISTENTES);

  const [
    cancelarDomiciliacionDAN,
    {
      data: dataCancelarDAN,
      loading: loadingCancelarDAN,
      error: errorCancelarDAN
    }
  ] = useLazyQuery(CONDUCTO_COBRO_DANOS);

  const [
    cancelarDomiciliacionAUTR,
    {
      data: dataCancelarAUTR,
      loading: loadingCancelarAUTR,
      error: errorCancelarAUTR
    }
  ] = useLazyQuery(CONDUCTO_COBRO_AUTOS);

  const [obtenerPolizaCobranza, { data: detallePoliza, loading, refetch }] =
    useLazyQuery(OBTENER_POLIZA, {
      fetchPolicy: "no-cache"
    });

  const [
    obtenerPolizaGMM,
    { data: dataPolizaGmm, loading: loadingPolizaGMM, error: errorPolizaGMM }
  ] = useLazyQuery(OBTENER_POLIZA_GMM, {
    fetchPolicy: "cache-and-network"
  });

  const { data: eventosSubscripcion, loading: loadingSubscription } =
    useSubscription(SUSCRIPCION_NOTIFICACIONES, {
      variables: { numeroReporte: 0 }
    });

  const [
    validarContratante,
    {
      loading: loadingValidarContratante,
      error: errorValidarContratante,
      data: dataValidarContratante
    }
  ] = useLazyQuery(VALIDAR_POLIZA_CONTRATANTE, {
    fetchPolicy: "cache-and-network"
  });

  const [
    obtenerDatosCuentaHabiente,
    {
      loading: loadingCuentaHabiente,
      error: errorCuentaHabiente,
      data: dataCuentaHabiente
    }
  ] = useLazyQuery(OBTENER_CUENTA_HABIENTE, {
    fetchPolicy: "cache-and-network"
  });

  const [
    obtenerPolizaPDF,
    { loading: loadingPolizaPDF, error: errorPolizaPDF, data: dataPolizaPDF }
  ] = useLazyQuery(OBTENER_POLIZA_PDF, {
    fetchPolicy: "cache-and-network"
  });
  /* eslint-disable */
  const [
    queryCredencial,
    { data: dataCredencial, loading: loadingCredencial, error: errorCredencial }
  ] = useLazyQuery(OBTENER_CREDENCIAL_DIGITAL, {
    fetchPolicy: "cache-and-network"
  });

  // ! new
  const [
    fechaRecibo,
    {
      data: dataFechaRecibo,
      loading: loadingFechaRecibo,
      error: errorFechaRecibo
    }
  ] = useLazyQuery(OBTENER_FECHA_RECIBO);

  const poliza = estadoApp.informacionPolizaDetalle;
  console.log("Poliza:", poliza);
  // console.log("Detalle poliza:", detallePoliza);
  const diasGracia = poliza.diasDeGracia || "no tiene";
  const alerta = useAlerta({});
  const alertaConfirmarCancelar = useAlerta(configAlertaConfirmarCancelar);
  const alertaCampo = useAlerta({});
  const alertaError = useAlerta(configAlertaError);
  const alertaCuentaHabiente = useAlerta(configAlertaCuentaHabiente);
  const alertaErrorCancelacion = useAlerta(configAlertaErrorCancelacion);
  const alertaRecibosPendientes = useAlerta(configAlertaRecibosPendientes);
  const alertaNoHTC = useAlerta(configAlertaNoHTC);
  const alertaCancelado = useAlerta(configAlertaCancelado);
  const [procesoCancelacion, setProcesoCancelacion] = useState(false);
  const [mostrarModalBeneficios, establecerMostrarModalBeneficios] =
    useState(false);
  const [idSeccionState, establecerIdSeccionState] = useState();
  const [cargando, asignarValorCargando] = useState(false);
  const [detalle, asignarValorDetalle] = useState(
    detallePoliza?.cobranza_detallePolizaCobranza.dato || []
  );
  const [mantenerCoberturasAbierto, asignarMantenerCoberturasAbierto] =
    useState(false);
  // const [, setDomiciliadaPorNotificacion] = useState(false);

  const [cuentaHabiente, setCuentaHabiente] = useState(null);
  // Estado para modal
  const [etapaModal, setEtapaModal] = useState(1);

  // Alerta para NO permitir cambiar tarjeta o domiciliar si esta apunto de caducar
  const [mostrarAlertaNoCambios, setMostrarAlertaNoCambios] = useState(false);

  // Alerta para NO permitir cambios en domiciliacion si cuenta con reporte o PT
  const [modalReporteActivo, setModalReporteActivo] = useState(false);

  const [estadoLoading, setEstadoLoading] = useState(false);

  // State para evaluar el proceso de domiciliacion del usuario (cancelar o domiciliar)
  const [processState, setProcessState] = useState("");

  // let totalDomiciliar;
  const [totalDomiciliar, setTotalDomiciliar] = useState(0);
  const [fechaTermino, setFechaTermino] = useState("");
  const { crearNotificacion } = useNotificaciones();

  useEffect(() => {
    if (poliza.lineaNegocio === "AUTR" || poliza.lineaNegocio === "DAN") {
      console.log(objetoCookie);
      const polizaParam =
        // eslint-disable-next-line no-nested-ternary
        poliza.lineaNegocio === "AUTR"
          ? poliza.poliza.length === 10
            ? poliza.poliza
            : `${poliza.oficina}${poliza.poliza}`
          : poliza.poliza;
      obtenerPolizaCobranza({
        variables: {
          agencia: poliza.oficina,
          inciso: parseInt(poliza.inciso, 10),
          lineaNegocio: poliza.lineaNegocio,
          numeroReporte: 0,
          poliza: polizaParam,
          token: objetoCookie.access_token
        }
      });
    } else {
      obtenerPolizaGMM({
        variables: { numeroPoliza: poliza.poliza, numeroTelefono: usuario }
      });
    }
  }, []);

  useEffect(() => {
    fechaRecibo({
      variables: {
        lineaNegocio: poliza.lineaNegocio,
        agencia: poliza.oficina,
        numeroPoliza: poliza.poliza,
        certificado: parseInt(poliza.inciso)
      }
    });
  }, [poliza]);

  useEffect(() => {
    if (!loadingFechaRecibo) {
      if (dataFechaRecibo) {
        let res = dataFechaRecibo?.endoso_fechaRecPendiente;
        console.log("Fecha recibo: ", res?.completado.dato?.inicioVigencia);
        if (res?.dato) {
          if (res.completado) {
            setFechaTermino(res?.dato?.inicioVigencia || "");
          }
        }
      }
    }
  }, [loadingFechaRecibo, errorFechaRecibo, dataFechaRecibo]);

  const verFormasDomiciliacion = () => {
    // Obtener importe no pagado
    redirectDomiciliacion({
      poliza,
      detallePoliza: detalle,
      tipo: "Tarjeta",
      cuentaHabiente,
      totalDomiciliar: totalDomiciliar || "edicion tarjeta",
      fechaTermino: fechaTermino
    });
  };

  // ! validacion RFC
  const validarRFCParaDomiciliar = async () => {
    asignarValorCargando(true);
    // Este es mi cambio
    const data = await estadoApp?.campoAlertaCampo.data;
    var rfc = '';
    if (data) {
      rfc = data;
    }
    rfc = rfc.toUpperCase();
    validarContratante({
      variables: {
        agencia: poliza.oficina,
        cis: parseInt(poliza.inciso, 10),
        lineaNegocio: poliza.lineaNegocio,
        poliza: poliza.poliza,
        rfc
      }
    });
  };

  const validacionesDomiciliacion = (saldoPendiente, accion) => {
    if (accion === "domiciliar") {
      if (
        // estadoApp.funcionesLimitadasDomiciliacion ||
        !switchDomiciliacion.selected &&
        saldoPendiente === "$ 0.00"
      ) {
        return false;
      }
    }
    setTotalDomiciliar(saldoPendiente);
    return true;
  };

  const handleEditarDatosCuentaHabiente = (saldoPendiente) => {
    if (!validacionesDomiciliacion(saldoPendiente, "tarjeta")) {
      return;
    }
    setEtapaModal(1);
    alerta.mostrar();
  };

  let agencia;
  let unicaPoliza;
  let certificado;

  if (poliza.lineaNegocio === "AUTR") {
    agencia = poliza.polizaFormato.split("-")[0].split(" ");
    agencia = asignarCerosAgencia(agencia, agencia.toString().length);
    unicaPoliza = poliza.polizaFormato.split("-")[1].split("");
    unicaPoliza = asignarCerosPoliza(unicaPoliza, unicaPoliza.length);
    // eslint-disable-next-line prefer-destructuring
    certificado = poliza.polizaFormato.split("-")[2];
  }

  const realizarValidaciones = (process = "domiciliar") => {
    setProcessState(process);
    setEstadoLoading(true);
    reportesExistentes({
      variables: {
        lineaNegocio: "AUTR",
        agencia: `${agencia}`,
        certificado: Number(certificado),
        poliza: `${unicaPoliza}`
      }
    });
  };

  /* 
  En esta funcion se valida lo siguiente:
    - (1) La poliza fue domiciliada en HDI Tu Compañía.
  Si esto se cumple, se pregunta si desea cancelar
  */
  const manejarInicioCancelacionDomiciliacion = () => {
    // (1)
    //  alertaConfirmarCancelar.mostrar();
    if (
      detalle?.datosDomiciliacion?.metodoDomiciliacion === "Hdi tu compañía" ||
      detalle?.datosDomiciliacion?.metodoDomiciliacion === "Hdi contigo"
    ) {
      alertaConfirmarCancelar.mostrar();
    } else {
      // Mostrar modal no es HTC
      alertaNoHTC.mostrar();
    }
  };

  const iniciarProcesoCancelarDomiciliacion = () => {
    alertaConfirmarCancelar.cerrar();
    setProcesoCancelacion(true);
    setEtapaModal(1);
    alerta.mostrar();
  };

  // eslint-disable-next-line no-unused-vars
  const iniciarProcesoDomiciliacion = (saldoPendiente) => {
    setTotalDomiciliar(saldoPendiente);
    if (!validacionesDomiciliacion(saldoPendiente, "domiciliar")) {
      return;
    }

    if (switchDomiciliacion.selected) {
      // Esta domiciliada, quiere cancelar
      if (poliza.lineaNegocio === "AUTR") {
        setProcessState("domiciliar");
        setEstadoLoading(true);
        reportesExistentes({
          variables: {
            lineaNegocio: "AUTR",
            agencia: `${agencia}`,
            certificado: Number(certificado),
            poliza: `${unicaPoliza}`
          }
        });
        return;
      }
      manejarInicioCancelacionDomiciliacion();
    } else {
      if (poliza.lineaNegocio === "AUTR") {
        setEstadoLoading(true);
        setProcessState("domiciliar");
        reportesExistentes({
          variables: {
            lineaNegocio: "AUTR",
            agencia: `${agencia}`,
            certificado: Number(certificado),
            poliza: `${unicaPoliza}`
          }
        });
        return;
      }
      setEtapaModal(1);
      alerta.mostrar();
    }
  };

  const obtenerUbicacion = () => {
    asignarValorCargando(true);
    getLocation();
    if (!loadingLocation) {
      asignarValorCargando(false);
      if (geolocation) {
        setEtapaModal(4);
        alerta.mostrar();
        runAcceptLog(9);
      }
    } else {
      asignarValorCargando(true);
      setEtapaModal(1);
      runDenialLog(9);
      alerta.mostrar();
    }
    if (errorLocation) {
      setEtapaModal(5);
      alerta.mostrar();
      runDenialLog(9);
    }
  };
  // *****
  const validarDiasGracia = () => {
    const diasEvaluar = Number(diasGracia.split(" ")[1]);

    if (diasEvaluar <= 1 && diasGracia !== "no tiene") {
      crearNotificacion(
        "No es posible cancelar la domiciliación",
        "Tu póliza esta próxima a cancelarse. No puedes realizar este cambio.",
        "noti/domiciliacion/noCancelarDomiciliacion",
        `{"oficina": "${poliza.oficina}", "inciso": "${poliza.inciso}", "lineaNegocio": "${poliza.lineaNegocio}", "poliza": "${poliza.poliza}", "polizaFormato": "${poliza.polizaFormato}", "estatus": "${poliza.estatus}"}`,
        usuario
      );
      setMostrarAlertaNoCambios(true);
      return;
    }

    if (processState === "domiciliar") {
      if (!switchDomiciliacion.selected) {
        console.log("entro aquí");
        // iniciarProcesoDomiciliacion();
        setEtapaModal(1);
        alerta.mostrar();
        return;
      }
      manejarInicioCancelacionDomiciliacion();
    } else {
      handleEditarDatosCuentaHabiente();
    }
  };

  const LLAMADAS_BOTON = {
    boton1: {
      1: () => {
        obtenerUbicacion();
      },
      2: () => {
        setEtapaModal(4);
      },
      3: () => {
        alerta.cerrar();
      },
      4: () => {
        validarRFCParaDomiciliar();
      },
      5: () => {
        alerta.cerrar();
      },
      6: () => {
        alerta.cerrar();
      },
      7: () => {
        setEtapaModal(4); // * Regresar a que introduzca otra vez su RFC
      },
      8: () => {
        alerta.cerrar();
      }
    },
    boton2: {
      1: () => {
        alerta.cerrar();
        runDenialLog(9, [
          { columna: "ubicacion", valor: "geolocalización no autorizada" }
        ]);
      },
      2: () => {
        setEtapaModal(3);
      },
      3: () => {
        // Esta etapa no tiene segundo boton
        // eslint-disable-next-line lines-around-directive, no-unused-expressions
        null;
      }
    }
  };

  const descargarPoliza = (endoso) => {
    const numeroTelefono = estadoApp?.informacionContacto?.telefono || usuario;
    let tipoReporte = "P";

    if (endoso.movimiento !== "PÓLIZA") {
      tipoReporte = "E";
    }

    obtenerPolizaPDF({
      variables: {
        usuario: numeroTelefono,
        lineaNegocio: poliza.lineaNegocio,
        oficina: poliza.oficina,
        poliza: poliza.poliza,
        certificado: endoso.certificado,
        documento: endoso.endoso,
        tipoReporte,
        token: objetoCookie.access_token
      }
    });
  };

  function realizarCancelacion() {
    const rfc = estadoApp?.campoAlertaCampo?.data;
    const numeroTelefono = estadoApp?.informacionContacto?.telefono || usuario;
    const latitud = estadoApp?.geolocalizacion?.latitud;
    const longitud = estadoApp?.geolocalizacion?.longitud;
    if (poliza.lineaNegocio === "DAN") {
      cancelarDomiciliacionDAN({
        variables: {
          tipoEndoso: "EFECTIVO",
          numeroReporte: 0,
          numeroPoliza: poliza.poliza,
          certificado: parseInt(poliza.inciso, 10),
          lineaNegocio: poliza.lineaNegocio,
          agencia: poliza.oficina,
          nombreTarjetaHabiente: "",
          banco: "0",
          tipoTarjeta: "0",
          numeroTarjeta: "",
          confirmaNumeroTarjeta: "",
          fechaExpiracion: "",
          tipoCuenta: "",
          cuentaClabe: "",
          confirmaClabe: "",
          rfc,
          domiciliarPago: false,
          latitud: `${longitud}`,
          longitud: `${latitud}`,
          numeroTelefono,
          token: objetoCookie.access_token
        }
      });
    } else {
      cancelarDomiciliacionAUTR({
        variables: {
          tipoEndoso: "EFECTIVO",
          numeroReporte: 0,
          numeroPoliza: poliza.poliza,
          certificado: parseInt(poliza.inciso, 10),
          lineaNegocio: poliza.lineaNegocio,
          agencia: poliza.oficina,
          nombreTarjetaHabiente: "",
          banco: "",
          tipoTarjeta: "",
          numeroTarjeta: "",
          confirmaNumeroTarjeta: "",
          fechaExpiracion: "",
          tipoCuenta: "",
          cuentaClabe: "",
          confirmaClabe: "",
          rfc,
          domiciliarPago: false,
          latitud: `${longitud}`,
          longitud: `${latitud}`,
          numeroTelefono,
          token: objetoCookie.access_token
        }
      });
    }
  }

  useEffect(() => {
    if (loadingReportes) {
      asignarValorCargando(true);
    }

    if (
      !loadingReportes &&
      dataReportes &&
      dataReportes?.reporte_validarReportesExistentes
    ) {
      const resp = dataReportes?.reporte_validarReportesExistentes;
      if (resp.dato) {
        setModalReporteActivo(true);
        asignarValorCargando(false);
        setEstadoLoading(false);
        return;
      }

      asignarValorCargando(false);
      setEstadoLoading(false);
      console.log("Aquí ando");
      validarDiasGracia();
    }
  }, [loadingReportes, dataReportes]);

  // eslint-disable-next-line no-unused-vars
  // const domiciliacionLogic = () => {
  //   console.log(eventosSubscripcion);
  //   const evento = eventosSubscripcion?.escucha_evento_actualizacion_reporte;
  //   if (evento.completado && !loadingSubscription) {
  //   }
  // };

  // ! EJEMPLO DE SUSCRIPCION PARA NOTIFICACION
  useEffect(() => {
    if (
      eventosSubscripcion &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      const evento = eventosSubscripcion.escucha_evento_actualizacion_reporte;
      if (
        evento.tipoMensaje === 23 &&
        !loadingSubscription &&
        evento.completado
      ) {
        console.log(evento);
        console.log("[Notificacion]: Llega notificación 23");
        // NOTIFICACION DE DOMICILIACION DAN
        const polizaNotificada = obtenerValorDeArregloDeStrings(
          evento.dato.descripciones,
          "Poliza: "
        );
        console.log("[Notificacion]: Poliza notificada -> ", polizaNotificada);
        console.log("[Notificacion]: Poliza actual -> ", poliza?.poliza);
        // domiciliacionLogic();

        let datos = evento.dato.descripciones ? evento.dato.descripciones : evento.descripciones;
        const respuestaEvento = obtenerValorDeArregloDeStrings(
          datos,
          "Guardado: "
        );

        if (respuestaEvento !== "True") {
          alertaErrorCancelacion.mostrar();
          asignarValorCargando(false);
          return;
        }
        alertaErrorCancelacion.cerrar();
        setProcesoCancelacion(false);
        asignarValorCargando(false);
        // alertaCancelado.mostrar();
        setCuentaHabiente(null);
        // switchDomiciliacion.unselect();
      }
    }
  }, [eventosSubscripcion, loadingSubscription]);

  useEffect(() => {
    if (!loading) {
      if (detallePoliza && detallePoliza.cobranza_detallePolizaCobranza) {
        asignarValorCargando(false);
        const res = detallePoliza.cobranza_detallePolizaCobranza;
        if (res.completado) {
          console.log(res.dato);
          dispatch({
            type: "AGREGAR",
            valor: res.dato.totalRecibos.noPagado,
            indice: "importeDomiciliacion"
          });
          if (
            res.dato?.titularPoliza === "" ||
            res.dato?.titularPoliza === null
          ) {
            asignarValorCargando(true);
            const polizaParam =
              // eslint-disable-next-line no-nested-ternary
              poliza.lineaNegocio === "AUTR"
                ? poliza.poliza.length === 10
                  ? poliza.poliza
                  : `${poliza.oficina}${poliza.poliza}`
                : poliza.poliza;
            refetch({
              variables: {
                agencia: poliza.oficina,
                inciso: parseInt(poliza.inciso, 10),
                lineaNegocio: poliza.lineaNegocio,
                numeroReporte: 0,
                poliza: polizaParam
              }
            });
          } else {
            asignarValorDetalle(res.dato);
          }
          if (res.dato.datosDomiciliacion.domiciliado) {
            // TODO: Obtener datos cuenta habiente
            switchDomiciliacion.select();
            obtenerDatosCuentaHabiente({
              variables: {
                agencia: poliza.oficina,
                cis: parseInt(poliza.inciso, 10),
                lineaNegocio: poliza.lineaNegocio,
                poliza: poliza.poliza,
                token: objetoCookie.access_token
              }
            });
          }
        } else {
          alertaError.mostrar();
        }
      }
    } else {
      asignarValorCargando(true);
    }
  }, [loading, detallePoliza]);

  //!  GMM
  useEffect(() => {
    if (
      !loadingPolizaGMM &&
      dataPolizaGmm &&
      dataPolizaGmm.gmm_consultaPoliza.completado
    ) {
      asignarValorCargando(false);
      const res = dataPolizaGmm.gmm_consultaPoliza;
      if (res.completado) {
        asignarValorDetalle(res.dato);
      } else {
        alertaError.mostrar();
      }
    } else {
      asignarValorCargando(true);
    }
  }, [loadingPolizaGMM, dataPolizaGmm, errorPolizaGMM]);

  //! VALIDACION CUENTAHABIENTE
  useEffect(() => {
    if (!loadingCuentaHabiente) {
      asignarValorCargando(false);
      if (dataCuentaHabiente?.cobranza_consultaDatosCuentaHabiente) {
        if (dataCuentaHabiente?.cobranza_consultaDatosCuentaHabiente?.dato) {
          setCuentaHabiente(
            dataCuentaHabiente?.cobranza_consultaDatosCuentaHabiente?.dato
          );
        } else {
          alertaCuentaHabiente.mostrar();
        }
      }
    } else {
      asignarValorCargando(true);
    }
    if (errorCuentaHabiente) {
      alertaCuentaHabiente.mostrar();
    }
  }, [loadingCuentaHabiente, errorCuentaHabiente, dataCuentaHabiente]);

  useEffect(() => {
    dispatch({
      type: "AGREGAR",
      valor: [],
      indice: "recibosPorPagar"
    });
  }, []);

  useEffect(() => {
    if (location.state) {
      if (
        !location.state.domiciliado &&
        location.state.domiciliado !== undefined &&
        location.state.domiciliado !== null
      ) {
        const listaDetalle = [
          { columna: "importe", valor: totalDomiciliar || "" }
        ];
        runCancelLog(1, listaDetalle);
      }
    }
  }, []);

  // ! GEOLOCALIZACION
  useEffect(() => {
    if (!loadingLocation) {
      asignarValorCargando(false);
      if (geolocation) {
        setEtapaModal(4);
        alerta.mostrar();
      }
    } else {
      asignarValorCargando(true);
      setEtapaModal(1);
      alerta.mostrar();
    }
    if (errorLocation) {
      setEtapaModal(5);
      alerta.mostrar();
    }
  }, [geolocation, errorLocation, loadingLocation]);

  // ! RFC modal
  useEffect(() => {
    if (etapaModal === 4) {
      alerta.cerrar();
      alertaCampo.actualizar(configurarAlerta(etapaModal));
      alertaCampo.mostrar();
      return;
    }
    alertaCampo.cerrar();
    alerta.actualizar(configurarAlerta(etapaModal));
    if (etapaModal !== 1) {
      alerta.mostrar();
    }
    // etapaModal !== 1 ? alerta.mostrar() : null;
  }, [etapaModal]);
  // ! VALIDACION CONTRATANTE (RFC)
  useEffect(() => {
    if (!loadingValidarContratante) {
      asignarValorCargando(false);
      if (dataValidarContratante?.validar_contratantePoliza) {
        const respuesta = dataValidarContratante?.validar_contratantePoliza;
        console.log("Response Contratante:", respuesta);
        if (respuesta.mensaje === "RFC válida.") {
          if (procesoCancelacion) {
            alertaCampo.cerrar();
            realizarCancelacion();
          } else {
            verFormasDomiciliacion();
          }
        } else {
          alertaCampo.cerrar();
          setEtapaModal(7);
          alerta.mostrar();
        }
      } else if (errorValidarContratante) {
        alertaCampo.cerrar();
        setEtapaModal(8);
        alerta.mostrar();
      }
    } else {
      asignarValorCargando(true);
    }
  }, [
    loadingValidarContratante,
    dataValidarContratante,
    errorValidarContratante
  ]);

  // ! DESCARGA DE DOCUMENTOS
  useEffect(() => {
    if (!loadingPolizaPDF) {
      asignarValorCargando(false);
      const respuesta = dataPolizaPDF?.obtener_polizaPDF;
      if (respuesta) {
        if (respuesta.dato) {
          descargarPDF(respuesta.dato, poliza.poliza, "pdf").then((res) => {
            if (res === 200) {
              asignarValorCargando(false);
            } else {
              setEtapaModal(6);
              alerta.mostrar();
            }
          });
        } else {
          setEtapaModal(6);
          alerta.mostrar();
        }
      }
    } else {
      asignarValorCargando(true);
    }
    if (errorPolizaPDF) {
      setEtapaModal(6);
      alerta.mostrar();
    }
  }, [dataPolizaPDF, loadingPolizaPDF, errorPolizaPDF]);

  useEffect(() => {
    asignarValorCargando(true);
  }, []);

  useEffect(() => {
    if (detalle.length === 0) {
      asignarValorCargando(true);
    }
  }, [detalle]);

  const asignarPaquetePolizaGMM = (paquete) => {
    if (paquete === "HDIV") {
      return "Médica Vital";
    }
    return "Médica Total Plus";
  };

  const mostrarModal = (beneficio) => {
    establecerIdSeccionState(beneficio);
    asignarMantenerCoberturasAbierto(true);
    establecerMostrarModalBeneficios(true);
  };

  useEffect(() => {
    if(!loadingCancelarDAN){
      if(dataCancelarDAN){
        asignarValorCargando(false);
        if(dataCancelarDAN?.endoso_condutoCobroDanos?.completado){
          const res = dataCancelarDAN?.endoso_condutoCobroDanos;
          if(res.completado){
            alertaCancelado.mostrar();
            setCuentaHabiente(null);
            const listaDetalle = [{ columna: "importe", valor: totalDomiciliar || "" }];
            runCancelLog(1, listaDetalle);
            switchDomiciliacion.unselect();
          }else{
            alertaErrorCancelacion.mostrar();
          }
        } else {
          alertaErrorCancelacion.mostrar();
        }
      }
    } else {
      asignarValorCargando(true);
    }

    // if (!loadingCancelarDAN || errorCancelarDAN) {
    //   // asignarValorCargando(false);
    //   // if (dataCancelarDAN) {
    //   //   if (dataCancelarDAN?.endoso_condutoCobroDanos?.completado) {
    //   //     const res = dataCancelarDAN?.endoso_condutoCobroDanos;
    //   //     if (res.completado) {
    //   //       alertaCancelado.mostrar();
    //   //       setCuentaHabiente(null);
    //   //       switchDomiciliacion.unselect();
    //   //     } else {
    //   //       alertaErrorCancelacion.mostrar();
    //   //     }
    //   //   } else {
    //   //     alertaErrorCancelacion.mostrar();
    //   //   }
    //   // }
    //   return;
    // }

    // const listaDetalle = [{ columna: "importe", valor: totalDomiciliar || "" }];
    // runCancelLog(1, listaDetalle);
    // asignarValorCargando(true);
  }, [dataCancelarDAN, loadingCancelarDAN, errorCancelarDAN]);

  useEffect(() => {
    if (!loadingCancelarAUTR) {
      if (dataCancelarAUTR) {
        asignarValorCargando(false);
        if (dataCancelarAUTR?.endoso_condutoCobroAutos?.completado) {
          const res = dataCancelarAUTR?.endoso_condutoCobroAutos;
          if (res.completado) {
            alertaCancelado.mostrar();
            setCuentaHabiente(null);
            const listaDetalle = [
              { columna: "importe", valor: totalDomiciliar || "" }
            ];
            runCancelLog(1, listaDetalle);
            switchDomiciliacion.unselect();
          } else {
            alertaErrorCancelacion.mostrar();
          }
        } else {
          alertaErrorCancelacion.mostrar();
        }
      }
    } else {
      asignarValorCargando(true);
    }
  }, [dataCancelarAUTR, loadingCancelarAUTR, errorCancelarAUTR]);

  const recargarDetalle = () => {
    asignarValorCargando(true);
    asignarValorDetalle([]);
    const polizaParam =
      // eslint-disable-next-line no-nested-ternary
      poliza.lineaNegocio === "AUTR"
        ? poliza.poliza.length === 10
          ? poliza.poliza
          : `${poliza.oficina}${poliza.poliza}`
        : poliza.poliza;
    refetch({
      variables: {
        agencia: poliza.oficina,
        inciso: parseInt(poliza.inciso, 10),
        lineaNegocio: poliza.lineaNegocio,
        numeroReporte: 0,
        poliza: polizaParam
      }
    });
  };

  const eliminarCeros = (polizaParam) => polizaParam.slice(4, 10);

  // ! Credencial digital
  /* eslint-disable */
  useEffect(() => {
    // Para obtener la información de la credencial.
    if (Object.keys(poliza).length > 0) {
      queryCredencial({
        variables: {
          numeroPoliza: poliza.poliza,
          anio: moment(poliza.fechaInicio, "MM/DD/YYYY HH:mm:ss").format("YY"),
          documento: "ASEG"
        }
      });
    }
  }, [poliza]);

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Suspense fallback={null}>
        <Alerta
          {...alerta}
          manejarCierre={() => {
            alerta.cerrar();
          }}
          funcionLlamadaBoton={() => {
            LLAMADAS_BOTON.boton1[etapaModal]();
          }}
          funcionLlamadaBoton2={() => {
            LLAMADAS_BOTON.boton2[etapaModal]();
          }}
        />
        <Alerta
          {...alertaConfirmarCancelar}
          manejarCierre={() => {
            alertaConfirmarCancelar.cerrar();
          }}
          funcionLlamadaBoton={() => {
            iniciarProcesoCancelarDomiciliacion();
          }}
          funcionLlamadaBoton2={() => {
            alertaConfirmarCancelar.cerrar();
          }}
        />
        <Alerta
          {...alertaCancelado}
          manejarCierre={() => {
            alertaCancelado.cerrar();
            recargarDetalle();
          }}
          funcionLlamadaBoton={() => {
            alertaCancelado.cerrar();
            recargarDetalle();
          }}
        />
        <Alerta
          {...alertaRecibosPendientes}
          manejarCierre={() => {
            alertaRecibosPendientes.cerrar();
          }}
          funcionLlamadaBoton={() => {
            alertaRecibosPendientes.cerrar();
          }}
        />
        <Alerta
          {...alertaNoHTC}
          manejarCierre={() => {
            alertaNoHTC.cerrar();
          }}
          funcionLlamadaBoton={() => {
            alertaNoHTC.cerrar();
          }}
        />
        <Alerta
          {...alertaErrorCancelacion}
          manejarCierre={() => {
            alertaErrorCancelacion.cerrar();
          }}
          funcionLlamadaBoton={() => {
            alertaErrorCancelacion.cerrar();
          }}
        />
        <AlertaCampo
          {...alertaCampo}
          manejarCierre={() => {
            alertaCampo.cerrar();
          }}
          funcionLlamadaBoton={() => {
            LLAMADAS_BOTON.boton1[etapaModal]();
          }}
          funcionLlamadaBoton2={() => {
            LLAMADAS_BOTON.boton2[etapaModal]();
          }}
          nombreCampo="RFC"
          numCaracteresCampo={13}
          regexCampo={/(^[0-9a-zA-Z&Ññ]+$|^$)/}
          validacionesCampo={validarRFC}
          campoMayusculas
        />
        <Alerta
          {...alertaCuentaHabiente}
          manejarCierre={() => {
            alertaCuentaHabiente.cerrar();
          }}
          funcionLlamadaBoton={() => {
            alertaCuentaHabiente.cerrar();
          }}
        />
        <Alerta
          {...alertaError}
          manejarCierre={() => {
            history.goBack();
          }}
          funcionLlamadaBoton={() => {
            history.goBack();
          }}
        />
        <Alerta
          mostrarModal={mostrarAlertaNoCambios}
          manejarCierre={() => setMostrarAlertaNoCambios(false)}
          textoEncabezado="No se pueden realizar cambios"
          textoCuerpo="Tu póliza esta próxima a cancelarse. No puedes realizar este cambio."
          colorAlerta="rojo"
          funcionLlamadaBoton={() => setMostrarAlertaNoCambios(false)}
          etiquetaBoton="Entiendo"
        />

        <Alerta
          mostrarModal={modalReporteActivo}
          manejarCierre={() => setModalReporteActivo(false)}
          textoEncabezado="No se pueden realizar cambios"
          textoCuerpo="Tienes un reporte activo, no puedes realizar cambios en la domiciliación de tu póliza"
          colorAlerta="amarillo"
          funcionLlamadaBoton={() => setModalReporteActivo(false)}
          etiquetaBoton="Entiendo"
        />
      </Suspense>

      {estadoLoading && <IndicadorCarga />}

      {mostrarModalBeneficios ? (
        <ModalSeccionCobertura
          seccion={idSeccionState}
          coberturas={detalle.coberturas}
          cerrar={() => establecerMostrarModalBeneficios(false)}
          lineaNegocio={poliza.lineaNegocio}
        />
      ) : null}
      <EncabezadoPolizasSiniestradas />
      <PantallaFondoBlanco>
        <Contenedor>
          <ContenedorRegresar
            onClick={() => {
              redirectMisPolizas();
            }}
          >
            <RegresarIcono className="icono-regresar" />
            <MensajePequeno>{diccionario.regresar}</MensajePequeno>
          </ContenedorRegresar>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>
            <NumeroPoliza>{poliza.polizaFormato}</NumeroPoliza>
          <MensajePequeno id="mensajePequeno">
            {diccionario.descripcionPantalla}
          </MensajePequeno>

          {poliza.lineaNegocio === "AUTR" && (
            <DetallePolizaAUTR
              poliza={poliza}
              _detalle={detalle}
              diccionario={diccionario}
              iniciarProcesoDomiciliacion={iniciarProcesoDomiciliacion}
              cuentaHabiente={cuentaHabiente}
              handleEditarDatosCuentaHabiente={() =>
                realizarValidaciones("editar")
              }
              redirectInfoPagos={redirectInfoPagos}
              descargarPoliza={descargarPoliza}
              switchDomiciliacion={switchDomiciliacion}
              diasDeGracia={diasGracia}
            />
          )}

          {poliza.lineaNegocio === "DAN" && (
            <DetallePolizaDAN
              poliza={poliza}
              _detalle={detalle}
              diccionario={diccionario}
              iniciarProcesoDomiciliacion={iniciarProcesoDomiciliacion}
              cuentaHabiente={cuentaHabiente}
              handleEditarDatosCuentaHabiente={handleEditarDatosCuentaHabiente}
              redirectInfoPagos={redirectInfoPagos}
              descargarPoliza={descargarPoliza}
              switchDomiciliacion={switchDomiciliacion}
            />
          )}

          {poliza.lineaNegocio === "GMM" && (
            <DetallePolizaGMM
              poliza={poliza}
              _detalle={detalle}
              diccionario={diccionario}
              asignarPaquetePolizaGMM={asignarPaquetePolizaGMM}
              mantenerCoberturasAbierto={mantenerCoberturasAbierto}
              mostrarModal={mostrarModal}
              asignarMantenerCoberturasAbierto={
                asignarMantenerCoberturasAbierto
              }
              dataCredencial={dataCredencial}
            />
          )}
        </Contenedor>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default memo(PantallaDetallePoliza);

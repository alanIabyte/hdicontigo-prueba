/* eslint-disable */
/* no-else-return */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import { useLazyQuery } from "@apollo/react-hooks";
import date from "date-and-time";
import { loader } from "graphql.macro";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import ReporteSiniestro from "../../reporte-siniestro";
import ReporteSiniestroDigital from "../../reporte-siniestro-digital";
import ContenedorAjusteDigital from "../../contenedor-ajuste-digital";
import AsistenciaLegal from "../../asistencia-legal";
import Declaracion from "../../declaracion";
import Ubicacion from "../../ubicacion";
import Lesionados from "../../lesionados";
import Taller from "../../taller";
import Visualizador from "../../visualizador";
import TipoDeAtencion from "../../tipo-de-atencion";
import Resolucion from "../../resolucion";
import Grua from "../../grua";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
// import Boton from "../../boton";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";

import {
  EnvolvedorReporteAjuste,
  SeparadorReporteAjuste,
  SeparadorSeccionesOpcionales,
  Secciones,
  ContenedorSecciones,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
} from "./ContenedorReporteAjuste.styled";
import Configuraciones from "../../../servicios/encuestas";
import Seccion from "../../seccion-pasos-progreso";
import Constantes from "../../../recursos/constantes";
import showConfig from "../../../utils/configs";
import useNotificaciones from "../../../utils/useNotificaciones";

const EVENTOS_OBTENER_LINEA_AJUSTE = loader(
  "../../../graphQL/query/ajuste/obtener_linea_tiempo_ajuste.graphql"
);
const EVENTOS_OBTENER_LINEA_VALUACION = loader(
  "../../../graphQL/query/valuacion/obtener_linea_tiempo_valuacion.graphql"
);
const VALIDAR_ENCUESTA = loader(
  "../../../graphQL/query/encuesta/validar_encuesta.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;
// let mostrarSecciones = false;

const diccionario = {
  reporteTitulo: "Reporte del siniestro",
  ubicacionTitulo: "Ubicación del accidente",
  ajusteDigital: "Ajuste digital",
  fotosTitulo: "Fotos del accidente",
  documentacionTitulo: "Documentación",
  declaracionTitulo: "Declaración",
  atencionTitulo: "Posible tipo de atención",
  resolucionTitulo: "Resolución",
  legalTitulo: "Asistencia Legal",
  lesionadosTitulo: "Lesionados",
  gruaTitulo: "Grúa",
  centroReparacionTitulo: "Centro de reparación",
  botonEtapa1: "1. Reporte y ajuste",
  botonEtapaDigital1: "1. Reporte y ajuste digital",
  alertaAsistenciaLegal:
    "Tu pase de <b>asistencia legal</b> se ha actualizado y ahora puedes descargarlo.",
  alertaAsistenciaLegalEmail:
    // eslint-disable-next-line max-len
    "Tu pase de <b>asistencia legal</b> se ha actualizado y ahora puedes descargarlo. También lo enviamos a tu dirección de email.",
  alertaAsistenciaMedica:
    "Tu pase de <b>asistencia médica</b> por lesiones se ha actualizado y ahora puedes descargarlo.",
  alertaAsistenciaMedicaEmail:
    // eslint-disable-next-line max-len
    "Tu pase de <b>asistencia médica</b> por lesiones se ha actualizado y ahora puedes descargarlo. También lo enviamos a tu dirección de email.",
  alertaTaller:
    "Tu pase de <b>Asignación de centro de reparación</b> se ha actualizado y ahora puedes descargarlo.",
  alertaTallerEmail:
    // eslint-disable-next-line max-len
    "Tu pase de <b>Asignación de centro de reparación</b> se ha actualizado y ahora puedes descargarlo. También lo enviamos a tu dirección de email.",
  notificacionesEnviadas: "El reporte ya cuenta con notificaciones enviadas",
};

const ContenedorReporteAjuste = (props) => {
  const {
    temaBoton,
    fotosDocumentos,
    fotosSiniestro,
    numeroReportePorDefecto,
    abrirEtapa,
    abrirSeccion,
    eventosPasados,
    eventoNuevo,
  } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const { crearNotificacion } = useNotificaciones();
  const [datosLesionados, asignarValorDatosLesionados] = useState(
    estadoApp.datosLesionados && estadoApp.datosLesionados.data
      ? estadoApp.datosLesionados.data
      : []
  );
  const [datosTaller, asignarValorDatosTaller] = useState(
    estadoApp.datosTaller && estadoApp.datosTaller.data
      ? estadoApp.datosTaller.data
      : []
  );
  const [datosQR, asignarValorDatosQR] = useState(
    estadoApp.datosQR && estadoApp.datosQR.data ? estadoApp.datosQR.data : []
  );
  const [datosReporte, asignarValorDatosReporte] = useState(
    estadoApp.datosReporteSiniestro && estadoApp.datosReporteSiniestro.data
      ? estadoApp.datosReporteSiniestro.data
      : []
  );
  const [numeroReporte, asignarValorNumeroReporte] = useState(
    estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte
      ? estadoApp.datosReporte.numeroReporte
      : null
  );
  const [datosDeclaracion, asignarValorDatosDeclaracion] = useState(
    estadoApp.datosDeclaracion && estadoApp.datosDeclaracion.data
      ? estadoApp.datosDeclaracion.data
      : []
  );
  const [datosUbicacion, asignarValorDatosUbicacion] = useState(
    estadoApp.datosUbicacion && estadoApp.datosUbicacion.data
      ? estadoApp.datosUbicacion.data
      : []
  );
  const [datosTipoDeAtencion, asignarValorDatosTipoDeAtencion] = useState(
    estadoApp.datosTipoDeAtencion && estadoApp.datosTipoDeAtencion.data
      ? estadoApp.datosTipoDeAtencion.data
      : []
  );
  const [datosResolucion, asignarValorDatosResolucion] = useState(
    estadoApp.datosResolucion && estadoApp.datosResolucion.data
      ? estadoApp.datosResolucion.data
      : []
  );
  const [datosGrua, asignarValorDatosGrua] = useState(
    estadoApp.datosGrua && estadoApp.datosGrua.data
      ? estadoApp.datosGrua.data
      : []
  );
  const [datosAjusteDigital, asignarValorDatosAjusteDigital] = useState(
    estadoApp.datosAjusteDigital && estadoApp.datosAjusteDigital.data
      ? estadoApp.datosAjusteDigital.data
      : []
  );
  const [datosAsistenciaLegal, asignarValorDatosAsistendatosAsistenciaLegal] =
    useState(
      estadoApp.datosAsistenciaLegal && estadoApp.datosAsistenciaLegal.data
        ? estadoApp.datosAsistenciaLegal.data
        : []
    );

  let emailContacto;
  if (estadoApp.informacionContacto && estadoApp.informacionContacto.email) {
    emailContacto = estadoApp.informacionContacto.email;
  } else if (objetoCookie && objetoCookie.CorreoElectronico) {
    emailContacto = objetoCookie.CorreoElectronico;
  }

  let telContacto;
  if (estadoApp.informacionContacto && estadoApp.informacionContacto.telefono) {
    telContacto = estadoApp.informacionContacto.telefono;
  }

  const [
    validacionEncuesta,
    { data: validarEncuesta, loading: cargandoValidarEncuesta },
  ] = useLazyQuery(VALIDAR_ENCUESTA, { fetchPolicy: "no-cache" });

  const [
    llamarLineaTiempo,
    { data: respuestaLineaTiempo, loading: cargandoLineaTiempoPeticion },
  ] = useLazyQuery(EVENTOS_OBTENER_LINEA_AJUSTE, {
    fetchPolicy: "no-cache",
  });

  const [
    llamarLineaTiempoValuacionDanios,
    {
      data: respuestaLineaValuacionDaniosTiempo,
      loading: cargandoLineaTiempoValuacionDaniosPeticion,
    },
  ] = useLazyQuery(EVENTOS_OBTENER_LINEA_VALUACION, {
    fetchPolicy: "no-cache",
  });

  // const [llamarLineaTiempo] = useLazyQuery(EVENTOS_OBTENER_LINEA_AJUSTE, {
  //   variables: { numeroReportePorDefecto },
  //   fetchPolicy: "cache-and-network",
  // });

  const [
    mostrarBarraAlertaAsistenciaLegal,
    asignarValorMostrarBarraAlertaAsistenciaLegal,
  ] = useState(false);

  const [
    mostrarBarraAlertaAsistenciaMedica,
    asignarValorMostrarBarraAlertaAsistenciaMedica,
  ] = useState(false);

  const [mostrarBarraAlertaTaller, asignarValorMostrarBarraAlertaTaller] =
    useState(false);

  const [cargando, asignarValorCargando] = useState(false);

  const evaluarMostrarAlertaAsistenciaLegal = (datos) => {
    if (
      estadoApp.datosAsistenciaLegal &&
      JSON.stringify(datos) !==
        JSON.stringify(estadoApp.datosAsistenciaLegal.data)
    ) {
      // asignarValorMostrarBarraAlertaAsistenciaLegal(true);
    }
  };

  const evaluarMostrarBarraAlertaAsistenciaMedica = (orden, datos) => {
    if (
      estadoApp.datosLesionados &&
      estadoApp.datosLesionados.data &&
      estadoApp.datosLesionados.data[orden] &&
      JSON.stringify(datos) !==
        JSON.stringify(estadoApp.datosLesionados.data[orden])
    ) {
      asignarValorMostrarBarraAlertaAsistenciaMedica(true);
    }
  };

  const evaluarMostrarAlertaTaller = (datos) => {
    if (
      estadoApp.datosTaller &&
      JSON.stringify(datos) !== JSON.stringify(estadoApp.datosTaller.data)
    ) {
      asignarValorMostrarBarraAlertaTaller(true);
    }
  };

  useEffect(() => {
    // const { eventosPasados } = props;
    console.log(eventosPasados);
    if (eventosPasados.length) {
      const datosLesionadosTmp =
        datosLesionados.length === 0 ? [] : datosLesionados;
      eventosPasados.forEach((evento) => {
        switch (evento.tipoMensaje) {
          case 2:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosReporteSiniestro",
            });
            asignarValorDatosReporte(evento.descripciones);
            break;
          case 4:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosDeclaracion",
            });
            asignarValorDatosDeclaracion(evento.descripciones);
            break;
          case 5:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosResolucion",
            });
            asignarValorDatosResolucion(evento.descripciones);
            break;
          case 6:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosTipoDeAtencion",
            });
            asignarValorDatosTipoDeAtencion(evento.descripciones);
            break;
          case 7:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosUbicacion",
            });
            asignarValorDatosUbicacion(evento.descripciones);
            break;
          case 8:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosAsistenciaLegal",
            });
            //se crea la notificiacion para la asistencia legal
            if (numeroReporte !== undefined && numeroReporte !== null) {
              crearNotificacion(
                "Aistencia Legal",
                `Da seguimiento a tu asistencia legal. <b>${numeroReporte}</b>`,
                "noti/reporteSiniestro/asistenciaLegal/reporteGenerado",
                `{"numeroReporte": ${numeroReporte}}`,
                telContacto
              );
            }
            evaluarMostrarAlertaAsistenciaLegal(evento.descripciones);
            asignarValorDatosAsistendatosAsistenciaLegal(evento.descripciones);
            break;
          case 9:
            datosLesionadosTmp[evento.orden] = evento.descripciones;
            dispatch({
              type: "AGREGAR",
              valor: {
                data: datosLesionadosTmp,
              },
              indice: "datosLesionados",
            });
            evaluarMostrarBarraAlertaAsistenciaMedica(
              evento.orden,
              evento.descripciones
            );
            asignarValorDatosLesionados(datosLesionadosTmp);
            break;
          case 10:
            dispatch({
              type: "BORRAR",
              indice: "datosQR",
            });
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosTaller",
            });
            evaluarMostrarAlertaTaller(evento.descripciones);
            asignarValorDatosTaller(evento.descripciones);
            sessionStorage.setItem("ShowQR", "true");
            // llamarQR({ variables: { numeroReporte: numeroReportePorDefecto } });
            break;
          case 11:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosGrua",
            });
            asignarValorDatosGrua(evento.descripciones);
            break;
          case 12:
            validacionEncuesta({
              variables: {
                numeroReporte: numeroReportePorDefecto,
                idEncuesta: Configuraciones.evaluacionAjustadorID,
              },
            });
            break;
          case 22:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento,
              },
              indice: "AjusteDigital",
            });
            asignarValorDatosAjusteDigital(evento);
            break;
          case 28:
            // console.log("Case28:Evento", evento);
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosQR",
            });
            asignarValorDatosQR(evento.descripciones);
            break;
          default:
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!cargandoLineaTiempoPeticion) {
      if (respuestaLineaTiempo) {
        asignarValorCargando(false);
      }
    }
  }, [cargandoLineaTiempoPeticion]);

  useEffect(() => {
    if (!cargandoLineaTiempoValuacionDaniosPeticion) {
      if (respuestaLineaValuacionDaniosTiempo) {
        asignarValorCargando(false);
      }
    }
  }, [cargandoLineaTiempoValuacionDaniosPeticion]);

  useEffect(() => {
    // const { eventoNuevo } = props;
    if (eventoNuevo && eventoNuevo.tipoMensaje) {
      asignarValorDesplegarSecciones(true);
      const datosNuevosLesionadosTmp =
        datosLesionados.length === 0 ? [] : datosLesionados;
      const datosNuevoEvento = eventoNuevo;
      switch (datosNuevoEvento.tipoMensaje) {
        case 2:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosReporteSiniestro",
          });
          asignarValorDatosReporte(datosNuevoEvento.dato.descripciones);
          break;
        case 4:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosDeclaracion",
          });
          asignarValorDatosDeclaracion(datosNuevoEvento.dato.descripciones);
          break;
        case 5:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosResolucion",
          });
          asignarValorDatosResolucion(datosNuevoEvento.dato.descripciones);
          break;
        case 6:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosTipoDeAtencion",
          });
          asignarValorDatosTipoDeAtencion(datosNuevoEvento.dato.descripciones);
          break;
        case 7:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosUbicacion",
          });
          asignarValorDatosUbicacion(datosNuevoEvento.dato.descripciones);
          break;
        case 8:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosAsistenciaLegal",
          });
          asignarValorDatosAsistendatosAsistenciaLegal(
            datosNuevoEvento.dato.descripciones
          );
          // asignarValorMostrarBarraAlertaAsistenciaLegal(true);
          break;
        case 9:
          datosNuevosLesionadosTmp[datosNuevoEvento.dato.orden] =
            datosNuevoEvento.dato.descripciones;
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevosLesionadosTmp,
            },
            indice: "datosLesionados",
          });
          asignarValorDatosLesionados(datosNuevosLesionadosTmp);
          asignarValorMostrarBarraAlertaAsistenciaMedica(true);
          break;
        case 10:
          dispatch({
            type: "BORRAR",
            indice: "datosQR",
          });
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosTaller",
          });
          asignarValorDatosTaller(datosNuevoEvento.dato.descripciones);
          console.log("Se va a mostrar alerta");
          asignarValorMostrarBarraAlertaTaller(true);
          sessionStorage.setItem("ShowQR", "true");
          // llamarQR({ variables: { numeroReporte: numeroReportePorDefecto } });
          break;
        case 11:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosGrua",
          });
          asignarValorDatosGrua(datosNuevoEvento.dato.descripciones);
          break;
        case 12:
          validacionEncuesta({
            variables: {
              numeroReporte: numeroReportePorDefecto,
              idEncuesta: Configuraciones.evaluacionAjustadorID,
            },
          });
          break;
        case 22:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato,
            },
            indice: "AjusteDigital",
          });
          asignarValorDatosAjusteDigital(datosNuevoEvento.dato);
          break;
        case 28:
          // console.log("Case28:NuevoEvento", datosNuevoEvento.dato);
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosQR",
          });
          asignarValorDatosQR(datosNuevoEvento.dato.descripciones);
          break;
        default:
      }
    }
  }, []);

  useEffect(() => {
    if (
      !cargandoValidarEncuesta &&
      validarEncuesta &&
      validarEncuesta.validar_encuesta &&
      validarEncuesta.validar_encuesta.mensaje ===
        "La encuesta se encuentra omitida."
    ) {
      return;
    }

    if (
      !cargandoValidarEncuesta &&
      validarEncuesta &&
      validarEncuesta.validar_encuesta &&
      validarEncuesta.validar_encuesta.codigo !== "IDENC100010"
    ) {
      history.push({
        pathname: "/evaluacion-ajustador",
        search: `?numeroReporte=${numeroReportePorDefecto}`,
      });
    }
  }, [validarEncuesta, cargandoValidarEncuesta]);

  const [desplegarSecciones, asignarValorDesplegarSecciones] =
    useState(abrirEtapa);

  const asignarDesplegarSecciones = () => {
    asignarValorDesplegarSecciones(!desplegarSecciones);
    // abrirEtapa = !desplegarSecciones;
    if (!desplegarSecciones) {
      console.log("Llamando linea de tiempo");
      llamarLineaTiempo({
        variables: {
          numeroReporte: numeroReportePorDefecto,
          token: objetoCookie.access_token,
        },
      });
      console.log("Llamando a la linea del tiempo valuación de daños");
      llamarLineaTiempoValuacionDanios({
        variables: {
          numeroReporte: numeroReportePorDefecto.toString(),
          token: objetoCookie.access_token,
        },
      });
    }
  };
  const esTradicional = obtenerValorDeArregloDeStrings(
    datosAjusteDigital.descripciones,
    "EsTradicional: "
  );
  const urlAjusteDigital = obtenerValorDeArregloDeStrings(
    datosAjusteDigital.descripciones,
    "UrlAjustadorDigital: "
  );
  let TextoAjusteDigitalProgreso = "";
  let TextoBotonAjusteDigitalProgreso = "";
  let telCabina = "";
  let redirecAjustadorDigital = "";
  let tradicional = "True";
  if (esTradicional) {
    tradicional = esTradicional === "True" ? "True" : "False";
  }

  let horasConcluir = 0;
  if (datosAjusteDigital.creado) {
    const formatoFechaCreadoReporte = Date.parse(datosAjusteDigital.creado);
    const HoraReporte = new Date(formatoFechaCreadoReporte);
    const FechaActual = new Date();

    const HoraActual = date.format(FechaActual, "YYYY/MM/DD HH:mm:ss");

    const diffDate = Math.abs(new Date(HoraReporte) - new Date(HoraActual)); // hours
    const difHrs = parseInt(Math.abs(diffDate) / (1000 * 60 * 60), 10);
    horasConcluir = 168 - difHrs;
  }

  const usarHorasODias = (horas) => {
    switch (horas) {
      case horas === 168 || horas > 144:
        return `7 días para concluir.`;
      case horas === 144 || horas > 120:
        return `6 días para concluir.`;
      case horas === 120 || horas > 95:
        return `5 días para concluir.`;
      case horas === 95 || horas > 71:
        return `4 días para concluir.`;
      case horas === 71 || horas > 47:
        return `3 días para concluir.`;
      case horas === 47 || horas > 23:
        return `2 días para concluir.`;
      default:
        return `${horas} horas para concluir.`;
    }
  };

  if (estadoApp.estadoReporte) {
    switch (estadoApp.estadoReporte) {
      case "A":
        if (horasConcluir < 0) {
          TextoAjusteDigitalProgreso =
            "El periodo para atención de ajuste a vencido, para reactivar llamar a HDI *434";
          TextoBotonAjusteDigitalProgreso = "Llamar a HDI *434";
          telCabina = "tel: *434";
          redirecAjustadorDigital = "";
        } else {
          TextoAjusteDigitalProgreso =
            "Continua con el proceso de ajuste digital tienes ".concat(
              usarHorasODias(horasConcluir)
            );
          // .concat(" horas para concluir.");

          TextoBotonAjusteDigitalProgreso = "Ir al ajuste digital";
          telCabina = "";
          redirecAjustadorDigital = urlAjusteDigital;
        }
        break;
      case "B":
        TextoAjusteDigitalProgreso = "Tu proceso se encuentra en valuación";
        TextoBotonAjusteDigitalProgreso = "Ir al ajuste digital";
        telCabina = "";
        redirecAjustadorDigital = urlAjusteDigital;
        break;
      case "X":
        TextoAjusteDigitalProgreso = "Tu proceso se encuentra en valuación";
        TextoBotonAjusteDigitalProgreso = "Ir al ajuste digital";
        telCabina = "";
        redirecAjustadorDigital = urlAjusteDigital;
        break;
      case "C":
        TextoAjusteDigitalProgreso =
          "El periodo para atención de ajuste a vencido, para reactivar llamar a HDI *434";
        TextoBotonAjusteDigitalProgreso = "Llamar a HDI *434";
        telCabina = "tel:*434";
        redirecAjustadorDigital = "";
        break;
      case "I":
        TextoAjusteDigitalProgreso =
          "El periodo para atención de ajuste a vencido para reactivar llamar a HDI *434";
        TextoBotonAjusteDigitalProgreso = "Llamar a HDI *434";
        telCabina = "*434";
        redirecAjustadorDigital = "";
        break;
      case "D":
        if (estadoApp.datosTaller) {
          TextoAjusteDigitalProgreso =
            "El proceso de valuación ha concluido, favor de ingresar su vehiculo a centro de reparación asignado";
          TextoBotonAjusteDigitalProgreso = "Ir al ajuste digital";
          telCabina = "";
          redirecAjustadorDigital = urlAjusteDigital;
        } else {
          TextoAjusteDigitalProgreso =
            "La valuación por ajustador digital a concluido, llama a HDI*434 para cualquier aclaracion";
          TextoBotonAjusteDigitalProgreso = "Ir al ajuste digital";
          telCabina = "*434";
          redirecAjustadorDigital = urlAjusteDigital;
        }
        break;
      default:
        break;
    }
  }

  switch (tradicional) {
    case "True":
      return (
        <EnvolvedorReporteAjuste>
          {cargando ? <IndicadorCarga pantallaCompleta /> : null}
          <BarraAlerta
            etiqueta={
              emailContacto
                ? diccionario.alertaAsistenciaLegalEmail
                : diccionario.alertaAsistenciaLegal
            }
            mostrarAlerta={mostrarBarraAlertaAsistenciaLegal}
            estilo="notificacion"
            manejarCierre={() => {
              asignarValorMostrarBarraAlertaAsistenciaLegal(false);
            }}
            fijo
          />
          <BarraAlerta
            etiqueta={
              emailContacto
                ? diccionario.alertaAsistenciaMedicaEmail
                : diccionario.alertaAsistenciaMedica
            }
            mostrarAlerta={mostrarBarraAlertaAsistenciaMedica}
            estilo="notificacion"
            manejarCierre={() => {
              asignarValorMostrarBarraAlertaAsistenciaMedica(false);
            }}
            fijo
          />
          <BarraAlerta
            etiqueta={
              emailContacto
                ? diccionario.alertaTallerEmail
                : diccionario.alertaTaller
            }
            mostrarAlerta={mostrarBarraAlertaTaller}
            estilo="notificacion"
            manejarCierre={() => {
              asignarValorMostrarBarraAlertaTaller(false);
            }}
            fijo
          />

          <div style={{ position: "static" }}>
            <BotonDesplegarSecciones
              desplegado={desplegarSecciones}
              tema={temaBoton}
            >
              <ContenedorElementosMenuDesplegable
                onClick={asignarDesplegarSecciones}
                desplegado={desplegarSecciones}
              >
                {diccionario.botonEtapa1}
                {desplegarSecciones ? (
                  <IconoFlechaArriba />
                ) : (
                  <IconoFlechaAbajo />
                )}
              </ContenedorElementosMenuDesplegable>
            </BotonDesplegarSecciones>
          </div>
          <ContenedorSecciones desplegado={desplegarSecciones}>
            <SeparadorReporteAjuste />
            <Secciones desplegado={desplegarSecciones}>
              <Seccion
                titulo={diccionario.reporteTitulo}
                pendiente={datosReporte.length === 0}
                abrirSeccion={abrirSeccion === "ReporteSiniestro"}
              >
                <ReporteSiniestro datosReporteSiniestro={datosReporte} />
              </Seccion>

              <Seccion
                titulo={diccionario.ubicacionTitulo}
                pendiente={datosUbicacion.length === 0}
                abrirSeccion={abrirSeccion === "UbicacionAccidente"}
              >
                <Ubicacion datosUbicacion={datosUbicacion} />
              </Seccion>

              <Seccion
                titulo={diccionario.fotosTitulo}
                pendiente={fotosSiniestro.length === 0}
                abrirSeccion={abrirSeccion === "FotosAccidente"}
              >
                <Visualizador fotos={fotosSiniestro} />
              </Seccion>

              <Seccion
                titulo={diccionario.documentacionTitulo}
                pendiente={fotosDocumentos.length === 0}
                abrirSeccion={abrirSeccion === "Documentacion"}
              >
                <Visualizador fotos={fotosDocumentos} />
              </Seccion>

              <Seccion
                titulo={diccionario.declaracionTitulo}
                pendiente={datosDeclaracion.length === 0}
                abrirSeccion={abrirSeccion === "Declaracion"}
              >
                <Declaracion datosDeclaracion={datosDeclaracion} />
              </Seccion>

              <Seccion
                titulo={diccionario.atencionTitulo}
                pendiente={datosTipoDeAtencion.length === 0}
                abrirSeccion={abrirSeccion === "PosibleTipoAtencion"}
              >
                <TipoDeAtencion datosTipoDeAtencion={datosTipoDeAtencion} />
              </Seccion>

              <Seccion
                titulo={diccionario.resolucionTitulo}
                pendiente={datosResolucion.length === 0}
                abrirSeccion={abrirSeccion === "Resolucion"}
              >
                <Resolucion datosResolucion={datosResolucion} />
              </Seccion>

              <SeparadorSeccionesOpcionales />

              <Seccion
                titulo={diccionario.legalTitulo}
                pendiente={datosAsistenciaLegal.length === 0}
                opcional={datosAsistenciaLegal.length === 0}
                abrirSeccion={abrirSeccion === "AsistenciaLegal"}
              >
                <AsistenciaLegal datosAsistenciaLegal={datosAsistenciaLegal} />
              </Seccion>

              <Seccion
                titulo={diccionario.lesionadosTitulo}
                pendiente={datosLesionados.length === 0}
                opcional={datosLesionados.length === 0}
                abrirSeccion={abrirSeccion === "Lesionados"}
              >
                <Lesionados lesionados={datosLesionados} />
              </Seccion>

              <Seccion
                titulo={diccionario.gruaTitulo}
                pendiente={datosGrua.length === 0}
                opcional={datosGrua.length === 0}
                abrirSeccion={abrirSeccion === "Grua"}
              >
                <Grua datosGrua={datosGrua} />
              </Seccion>

              <SeparadorSeccionesOpcionales />

              <Seccion
                titulo={diccionario.centroReparacionTitulo}
                pendiente={datosTaller.length === 0}
                abrirSeccion={abrirSeccion === "CentroReparacion"}
              >
                <Taller taller={datosTaller} qr={datosQR} />
              </Seccion>
            </Secciones>
          </ContenedorSecciones>
        </EnvolvedorReporteAjuste>
      );

    case "False":
      return (
        <EnvolvedorReporteAjuste>
          <BarraAlerta
            etiqueta={
              emailContacto
                ? diccionario.alertaAsistenciaLegalEmail
                : diccionario.alertaAsistenciaLegal
            }
            mostrarAlerta={mostrarBarraAlertaAsistenciaLegal}
            estilo="notificacion"
            manejarCierre={() => {
              asignarValorMostrarBarraAlertaAsistenciaLegal(false);
            }}
            fijo
          />
          <BarraAlerta
            etiqueta={
              emailContacto
                ? diccionario.alertaAsistenciaMedicaEmail
                : diccionario.alertaAsistenciaMedica
            }
            mostrarAlerta={mostrarBarraAlertaAsistenciaMedica}
            estilo="notificacion"
            manejarCierre={() => {
              asignarValorMostrarBarraAlertaAsistenciaMedica(false);
            }}
            fijo
          />
          <BarraAlerta
            etiqueta={
              emailContacto
                ? diccionario.alertaTallerEmail
                : diccionario.alertaTaller
            }
            mostrarAlerta={mostrarBarraAlertaTaller}
            estilo="notificacion"
            manejarCierre={() => {
              asignarValorMostrarBarraAlertaTaller(false);
            }}
            fijo
          />
          <BotonDesplegarSecciones
            desplegado={desplegarSecciones}
            tema={temaBoton}
          >
            <ContenedorElementosMenuDesplegable
              onClick={asignarDesplegarSecciones}
            >
              {diccionario.botonEtapaDigital1}
              {desplegarSecciones ? (
                <IconoFlechaArriba />
              ) : (
                <IconoFlechaAbajo />
              )}
            </ContenedorElementosMenuDesplegable>
          </BotonDesplegarSecciones>
          <ContenedorSecciones desplegado={desplegarSecciones}>
            <SeparadorReporteAjuste />
            <Secciones desplegado={desplegarSecciones}>
              <Seccion
                titulo={diccionario.reporteTitulo}
                pendiente={datosReporte.length === 0}
                abrirSeccion={abrirSeccion === "ReporteSiniestro"}
              >
                <ReporteSiniestroDigital datosReporteSiniestro={datosReporte} />
              </Seccion>
              <Seccion
                titulo={diccionario.ajusteDigital}
                abrirSeccion={abrirSeccion === "AjusteDigital"}
              >
                <ContenedorAjusteDigital
                  contenido={TextoAjusteDigitalProgreso}
                  textoBoton={TextoBotonAjusteDigitalProgreso}
                  telCabina={telCabina}
                  redirecAjustadorDigital={redirecAjustadorDigital}
                />
              </Seccion>
              <Seccion
                titulo={diccionario.ubicacionTitulo}
                pendiente={datosUbicacion.length === 0}
                abrirSeccion={abrirSeccion === "UbicacionAccidente"}
              >
                <Ubicacion datosUbicacion={datosUbicacion} />
              </Seccion>

              <Seccion
                titulo={diccionario.declaracionTitulo}
                pendiente={datosDeclaracion.length === 0}
                abrirSeccion={abrirSeccion === "Declaracion"}
              >
                <Declaracion datosDeclaracion={datosDeclaracion} />
              </Seccion>

              <Seccion
                titulo={diccionario.atencionTitulo}
                pendiente={datosTipoDeAtencion.length === 0}
                abrirSeccion={abrirSeccion === "PosibleTipoAtencion"}
              >
                <TipoDeAtencion datosTipoDeAtencion={datosTipoDeAtencion} />
              </Seccion>

              <Seccion
                titulo={diccionario.resolucionTitulo}
                pendiente={datosResolucion.length === 0}
                abrirSeccion={abrirSeccion === "Resolucion"}
              >
                <Resolucion datosResolucion={datosResolucion} />
              </Seccion>

              <Seccion
                titulo={diccionario.centroReparacionTitulo}
                pendiente={datosTaller.length === 0}
                abrirSeccion={abrirSeccion === "CentroReparacion"}
              >
                <Taller taller={datosTaller} qr={datosQR} />
              </Seccion>
            </Secciones>
          </ContenedorSecciones>
        </EnvolvedorReporteAjuste>
      );

    default:
      return <EnvolvedorReporteAjuste />;
  }
};

ContenedorReporteAjuste.defaultProps = {
  eventosPasados: [],
  eventoNuevo: {},
  fotosDocumentos: [],
  fotosSiniestro: [],
  numeroReportePorDefecto: 0,
  temaBoton: "",
  abrirEtapa: false,
  abrirSeccion: "",
};

ContenedorReporteAjuste.propTypes = {
  eventoNuevo: PropTypes.instanceOf(Object),
  eventosPasados: PropTypes.instanceOf(Array),
  fotosDocumentos: PropTypes.instanceOf(Array),
  fotosSiniestro: PropTypes.instanceOf(Array),
  numeroReportePorDefecto: PropTypes.number,
  temaBoton: PropTypes.oneOf(["blanco", ""]),
  abrirEtapa: PropTypes.bool,
  abrirSeccion: PropTypes.string,
};

export default ContenedorReporteAjuste;

/* eslint-disable prettier/prettier */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  FondoBlanco,
  TituloPantallaPasosProgreso,
} from "./PantallaPasosProgreso.styled";
import EncabezadoPasosProgreso from "../../encabezado-pasos-progreso";
import ContenedorReporteAjuste from "../../contenedor-reporte-ajuste";
import ContenedorReparacion from "../../contenedor-reparacion";
import ContenedorPerdidaTotal from "../../contenedor-perdida-total";
import Configuraciones from "../../../servicios/encuestas";
import IndicadorCarga from "../../indicador-carga";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import Constantes from "../../../recursos/constantes";
import { MensajePequeno } from "../../pantalla-registro-poliza/pantalla-registro-poliza-componente/PantallaRegistroPoliza.styled";
import showConfig from "../../../utils/configs";
import ContenedorDaniosGlobales from "../../contenedor-danios-globales";
import ContenedorPerdidaTotalNuevo from "../../contenedor-perdida-total/contenedor-perdida-total-componente/ContenedorPerdidaTotalNuevo";
import ContenedorValuacion from "../../contenedores-linea-tiempo";
import { IObtenerTipoAtencion } from "../../../interfaces/indemnizacion/Iindemnizacion";
import { ContenedorCitaAjustador } from "../../contenedores-linea-tiempo-robo/contenedores-robo/ContenedorCitaAjustador";
import { ContenedorResultado } from "../../contenedores-linea-tiempo-robo/contenedores-robo/ContenedorResultado";
import BarraAlerta from "../../barra-alerta";
import ContenedorResumenIndemnizacion from "../../contenedor-resumen-indemnizacion";
import { ContenedorResumenRobo } from "../../contenedores-linea-tiempo-robo/contenedores-robo/ContenedorResumenRobo";
import ContenedorLocalizacionRobo from "../../contenedores-linea-tiempo-robo/contenedores-robo/ContenedorLocalizacionRobo-Componente";

const EVENTOS_PASADOS = loader(
  "../../../graphQL/query/reporte/listado_actualizaciones_reporte.graphql"
);

const VALIDAR_ENCUESTA = loader(
  "../../../graphQL/query/encuesta/validar_encuesta.graphql"
);

const SUSCRIPCION_NOTIFICACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const OBTENER_IMAGENES_REPORTE = loader(
  "../../../graphQL/query/reporte/obtener_imagenes_reporte.graphql"
);

const OBTENER_TIPO_ATENCION = loader(
  "../../../graphQL/query/indemnizacion/indemnizacion_obtenerSeleccionTipoAtencion.graphql"
);

const OBTENER_DOCUMENTACION_PAGO = loader(
  "../../../graphQL/query/checklist/documentacion.graphql"
);

const OBTENER_LINEA_TIEMPO_INDEMNIZACION = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_obtener_linea_tiempo.graphql"
);

const EVENTOS_OBTENER_LINEA_REPARACION = loader(
  "../../../graphQL/query/reparacion/obtener_linea_tiempo_reparacion.graphql"
);

const EVENTOS_OBTENER_LINEA_AJUSTE = loader(
  "../../../graphQL/query/ajuste/obtener_linea_tiempo_ajuste.graphql"
);

const EVENTOS_OBTENER_LINEA_VALUACION = loader(
  "../../../graphQL/query/valuacion/obtener_linea_tiempo_valuacion.graphql"
);

const OBTENER_AUDIOROBO = loader(
  "../../../graphQL/query/robo/obtener_audioRobo.graphql"
);

const diccionario = {
  titulo: "Etapas de tu siniestro",
  subtitulo:
    "Visualiza el avance de cada etapa de tu siniestro.",
  subtituloLineaTiempo:
    "Da seguimiento al siniestro a través de las siguientes etapas, las cuales se habilitan conforme avance:"
};

const nombreCookie = Constantes.nombreDeCookie;

const ITEMMOSTRARALERTAINDEMNIZACION = "mostrarAlertaIndemnizacion";
const ITEMMOSTRARALERTAREPARACION = "mostrarAlertaReparación";

const expresionValidar = /^https:\/\//;

const PantallaPasosProgreso = () => {
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const [cargando, asignarValorCargando] = useState(false);
  const [mostrarReparacion, asignarValorMostrarReparacion] = useState(false);
  // Para mostrar la seccion 3 PT después de consultar el tipo de indemnización
  const [habilitarSeccionPT, setHabilitarSeccionPT] = useState(false);
  const [mostrarPerdidaTotal, asignarValorMostrarPerdidaTotal] =
    useState(false);
  const [mostrarSeccionPagoDanios, asignarMostarPagoDanios] = useState(false);
  const [mostrarValuacion, setMostrarValuacion] = useState(false);
  const [mostrarResumenIndemnizacion, setMostrarResumenIndemnizacion] = useState(false);
  const [montosIndemnizacion, setMontosIndemnizacion] = useState({});

  const [numeroSiniestroNoti, setNumeroSiniestro] = useState("");
  const [valuacion, setValuacion] = useState("Evaluando");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const { encuestaAjustador } = estadoApp;
  let reporteParams = "";
  let reporteRedux = "";
  const numeroSiniestro = estadoApp.numeroSiniestroReporte || "";
  if (
    location &&
    location.search &&
    location.search.includes("numeroReporte")
  ) {
    const params = new URLSearchParams(location.search);
    reporteParams = parseInt(params.get("numeroReporte"), 10);
  }

  let abrirEtapa = "";
  let abrirSeccion = "";
  // Se valida si viene el parámetro para abrir algún contenedor
  if (location && location.search && location.search.includes("abrirEtapa")) {
    abrirEtapa = new URLSearchParams(location.search).get("abrirEtapa");
  }

  if (location && location.search && location.search.includes("abrirSeccion")) {
    abrirSeccion = new URLSearchParams(location.search).get("abrirSeccion");
  }

  if (estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte) {
    reporteRedux = parseInt(estadoApp.datosReporte.numeroReporte, 10);
  }
  const numeroReporte = reporteParams || reporteRedux;

  if (!numeroReporte) {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }

  const [
    obtenerValidacionDeEncuesta,
    {
      data: validarEncuesta,
      loading: cargandoValidarEncuesta,
      error: errorValidarEncuesta,
    },
  ] = useLazyQuery(VALIDAR_ENCUESTA, {
    fetchPolicy: "no-cache",
  });

  const [
    obtenerEventosPasados,
    {
      data: eventosPasados,
      loading: cargandoEventosPasados,
      error: errorEventosPasados,
    },
  ] = useLazyQuery(EVENTOS_PASADOS, {
    fetchPolicy: "network-only",
  });

  const [
    obtenerImagenesReporte,
    { loading: cargadoImagenesReporte, data: imagenesReporte },
  ] = useLazyQuery(OBTENER_IMAGENES_REPORTE, {
    fetchPolicy: "network-only",
  });

  const [
    obtenerTipoAtencion,
    {
      data: dataTipoAtencion,
      loading: loadingTipoAtencion,
      error: errorTipoAtencion,
    },
  ] = useLazyQuery(OBTENER_TIPO_ATENCION, {
    fetchPolicy: "network-only",
  });

  const [
    obtenerLineaTiempoIndemnizacion,
    {
      data: datoLTIndemnizacion,
      loading: cargandoLTIndemnizacion,
      error: errorLTIndemnizacion,
    },
  ] = useMutation(OBTENER_LINEA_TIEMPO_INDEMNIZACION, {
    fetchPolicy: "network-only",
  });

  const [llamarLineaTiempo] = useLazyQuery(EVENTOS_OBTENER_LINEA_REPARACION, {
    variables: { numeroReporte },
    fetchPolicy: "network-only",
  });

  /**
   * QUERY PARA LLAMAR A LINEA DEL TIEMPO DE AJUSTE
   */
  const [llamarLineaTiempoAjuste,
    { data: respuestaLineaTiempo, loading: cargandoLineaTiempoPeticion },] = useLazyQuery(EVENTOS_OBTENER_LINEA_AJUSTE, {
    fetchPolicy: "network-only",
  });

  // !QUERY PARA LLAMAR A LINEA DEL TIEMPO DE VALUACIÓN
  const [llamarLineaTiempoValuacionDanios,
    { data: respuestaLineaValuacionDaniosTiempo, loading: cargandoLineaTiempoValuacionDaniosPeticion }] = useLazyQuery(EVENTOS_OBTENER_LINEA_VALUACION, {
    fetchPolicy: "network-only",
  });

  // !LAZY QUERY PARA OBTENER ADUIO DE ROBO
  const [
    llamarObtenerAudioRobo,
    { data: dataAudioRobo, loading: loadingAudioRobo, error: errorAudioRobo },
  ] = useLazyQuery(OBTENER_AUDIOROBO, { fetchPolicy: "network-only" });

  const [eventos, asignarValorEventos] = useState();
  const [nuevosEventos, asignarValorNuevosEventos] = useState();
  const { data: nuevosEventosSuscripcion } = useSubscription(
    SUSCRIPCION_NOTIFICACIONES,
    {
      variables: { numeroReporte },
    }
  );

  const [mostrarBarraAlertaProcesoIndemnizacion, setMostrarBarraAlertaProcesoIndemnizacion] = useState(false);
  const [mostrarBarraAlertaProcesoReparacion, setMostrarBarraAlertaProcesoReparacion] = useState(false);
  const [mostrarBarraAlertaPagoRealizado, setMostrarBarraAlertaPagoRealizado] = useState(false);
  const [mostrarBarraAlertaResultadoRobo, setMostrarBarraAlertaResultadoRobo] = useState(false);

  const [fotosSiniestro, asignarValorFotosSiniestro] = useState([]);
  const [fotosDocumentos, asignarValorFotosDocumentos] = useState([]);

  /**
   * Se agrega variable de estado la cual va a definir si se muestra la línea de tiempo
   * de indemnización normal o con robo
   */
  const [lineaTiempoRobo, asignarLineaTiempoRobo] = useState(false);
  const [numValuacionDanios, asignarNumValuacionDanios] = useState(2);
  const [lineaTiempoLocalizacion, setLineaTiempoLocalizacion] = useState(false);

  const [declaracionRobo, setDeclaracionRobo] = useState("");
  const [esAudio, setEsAudio] = useState(false);

  let telefonoContacto;
  if (estadoApp.informacionContacto && estadoApp.informacionContacto.telefono) {
    telefonoContacto = estadoApp.informacionContacto.telefono;
  } else if (objetoCookie && objetoCookie.Telefono) {
    telefonoContacto = objetoCookie.Telefono;
  } else {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }

  const borrarEstado = () => {
    dispatch({
      type: "BORRAR_INDICES",
      indices: [
        "datosLesionados",
        "datosTaller",
        "datosReporteSiniestro",
        "datosAjusteDigital",
        "datosDeclaracion",
        "datosUbicacion",
        "datosTipoDeAtencion",
        "datosResolucion",
        "datosGrua",
        "datosAsistenciaLegal",
        "datosIngresoTaller",
        "datosValuacion",
        "datosPagoDeducible",
        "datosPagoDeduciblePagado",
        "datosReparacionDelVehiculo",
        "datosEntrega",
        "pagoIndemnizacion",
        "datosQR",
        "datosReporteCompleto",
        "datosDeducible",
        "eventoEvaluacionSiniestro",
        "datosValuacionMontos",
      ],
    });
  };

  const validaNumeroSiniestro = (lista = []) => {
    /**
       * MEJORA:
       * Se valida que si venga la notificación 2 Reporte de siniestro de lo contrario se consultará el redux
       * para obtener la info de número de siniestro
       */
    const idx = lista.findIndex(itm => itm.tipoMensaje === 2);
    if (idx < 0) {
      // No esta la notificación 2 por lo que se consulta el número de siniestro desde redux
      setNumeroSiniestro(estadoApp.numeroSiniestroReporte || "");
    }
  }

  // ! Este efecto dispara el query para obtener el tipo de atención que el usuario decidió seleccionar para su proceso de indemnización una vez que obtenemos el numeroSiniestro de la noti 2
  useEffect(() => {
    if (numeroSiniestroNoti) {
      dispatch({
        indice: "datosReporteCompleto",
        valor: {
          numeroSiniestro: numeroSiniestroNoti,
          numeroReporte
        },
        type: "AGREGAR"
      });
    }
  }, [numeroSiniestroNoti]);

  // ! Este efecto habilita una de las 3 secciones en función del tipo de atención que el usuario eligió
  // Este efecto siempre se va a ejecutar por lo tanto siempre habra un tipoAtencionIndemnizacion en redux
  useEffect(() => {
    if (
      !loadingTipoAtencion &&
      dataTipoAtencion &&
      dataTipoAtencion.indemnizacion_obtenerSeleccionTipoAtencion &&
      dataTipoAtencion?.indemnizacion_obtenerSeleccionTipoAtencion?.completado) {
      const resp = dataTipoAtencion?.indemnizacion_obtenerSeleccionTipoAtencion?.dato?.tipoAtencion || "";
      dispatch({
        type: "BORRAR_INDICES",
        indices: ["tipoAtencionIndemnizacion"],
      });

      if (resp === "PT") {
        console.group("RESULTADO DEL TIPO DE INDEMNIZACIÓN ES PT");
        console.groupEnd();
        dispatch({
          type: "AGREGAR",
          indice: "tipoAtencionIndemnizacion",
          valor: resp,
        });
        // !Mostramos la sección 3.Pérdida total
        asignarValorMostrarPerdidaTotal(true);
        return;
      }

      if (resp === "DG") {
        console.group("RESULTADO DEL TIPO DE INDEMNIZACIÓN ES DG");
        console.groupEnd();
        dispatch({
          type: "AGREGAR",
          indice: "tipoAtencionIndemnizacion",
          valor: resp,
        });
        // !Mostramos la sección 3. Daños globales
        asignarValorMostrarPerdidaTotal(true);
        return;
      }

      if (resp === "DP") {
        console.group("RESULTADO DEL TIPO DE INDEMNIZACIÓN ES DP");
        console.groupEnd();
        dispatch({
          type: "AGREGAR",
          indice: "tipoAtencionIndemnizacion",
          valor: resp,
        });
        // !Mostramos el componente de perdidatotalnuevo
        asignarValorMostrarPerdidaTotal(true);
        return;
      }

      if (resp === "RE") {
        console.group("RESULTADO DEL TIPO DE INDEMNIZACIÓN ES RE");
        console.groupEnd();
        dispatch({
          type: "AGREGAR",
          indice: "tipoAtencionIndemnizacion",
          valor: resp,
        });
        // !Mostramos el componente de reparación
        asignarValorMostrarReparacion(true);
        return;
      }

      dispatch({
        type: "AGREGAR",
        indice: "tipoAtencionIndemnizacion",
        valor: "No seleccionado",
      });
      console.log("No hay seleccion de tipo de indemnización por parte del usuario", dataTipoAtencion, errorTipoAtencion);
    }
  }, [dataTipoAtencion, loadingTipoAtencion, errorTipoAtencion]);

  // useEffect(() => {
  //   if (!cargandoLTIndemnizacion && datoLTIndemnizacion && datoLTIndemnizacion?.dato) {
  //     console.log("Se consultó la linea de tiempo indemnización");
  //   }
  // }, [datoLTIndemnizacion, cargandoLTIndemnizacion, errorLTIndemnizacion]);

  useEffect(() => {
    borrarEstado();
    if (reporteParams !== reporteRedux) {
      const nuevoObjetoDatosReporte = JSON.parse(
        JSON.stringify(estadoApp.datosReporte ? estadoApp.datosReporte : {})
      );
      nuevoObjetoDatosReporte.numeroReporte = numeroReporte;
      dispatch({
        type: "AGREGAR",
        valor: nuevoObjetoDatosReporte,
        indice: "datosReporte",
      });

      // Se agregan datos del reporte completo inicial (si hay notificación 1 se sobrescribiran)
      dispatch({
        indice: "datosReporteCompleto",
        valor: {
          numeroSiniestro: estadoApp.numeroSiniestroReporte||"",
          numeroReporte: nuevoObjetoDatosReporte.numeroReporte
        },
        type: "AGREGAR"
      });

      obtenerLineaTiempoIndemnizacion({
        variables: {
          lineaNegocio: "AUTR",
          numeroReporte: nuevoObjetoDatosReporte.numeroReporte||"",
          token: objetoCookie.access_token
        }
      });

      llamarLineaTiempo({
        variables: {
          numeroReporte: nuevoObjetoDatosReporte.numeroReporte||"",
          token: objetoCookie.access_token
        }
      })
    }
    obtenerEventosPasados({ variables: { numeroReporte } });
    obtenerImagenesReporte({
      variables: { numeroReporte, usuario: telefonoContacto },
    });

    obtenerValidacionDeEncuesta({
      variables: {
        numeroReporte,
        idEncuesta: Configuraciones.evaluacionAjustadorID,
      },
    });
  }, []);

  const obtenerDeclaracionAudio = (declaracion) => {
    // !Se va a obtener el audio en caso de que sea un url
    const declaracionLowerCase = declaracion.toLowerCase();
    if (expresionValidar.test(declaracionLowerCase)) {
      /**
       * Es una url entonces vamos a desarmar la url para obtener
       * la el nombre de la grabación
       */
      const regex = /\/grabacion-(.*?)\.mp3/;
      const match = declaracionLowerCase.match(regex);

      if (match) {
          const nombreGrabacion = match[0].replace("/", "");
          console.log("El último path param que comienza con 'grabacion' y termina con '.mp3' es:", nombreGrabacion);

          // Llamar a la lambda para obtener el audio
          llamarObtenerAudioRobo({
            variables: {
              nombreArchivo: nombreGrabacion,
              numeroTelefono: telefonoContacto
            }
          });
      } else {
          console.log("No se encontró ningún path param que coincida con el patrón.");
          setDeclaracionRobo("Sin delcaración");
      }
    } else {
      setDeclaracionRobo(declaracion);
    }
  };

  useEffect(() => {
    if (
      !loadingAudioRobo && dataAudioRobo &&
      dataAudioRobo.obtener_audioRobo &&
      dataAudioRobo.obtener_audioRobo.completado &&
      dataAudioRobo.obtener_audioRobo.codigo === "HDI00001" &&
      dataAudioRobo.obtener_audioRobo.dato
    ) {
      const dataAudio = dataAudioRobo.obtener_audioRobo.dato.url||"";
      if (expresionValidar.test(dataAudio)) {
        setEsAudio(true);
        setDeclaracionRobo(dataAudio);
      }
    } else {
      setDeclaracionRobo("");
    }

    if (errorAudioRobo) {
      console.log("Error al obtener el audio");
      setDeclaracionRobo("");
    }
  }, [dataAudioRobo, loadingAudioRobo, errorAudioRobo]);

  useEffect(() => {
    if (
      !cargandoEventosPasados &&
      eventosPasados &&
      eventosPasados.listado_actualizaciones_reporte &&
      eventosPasados.listado_actualizaciones_reporte.dato &&
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste
    ) {
      asignarValorEventos(
        eventosPasados.listado_actualizaciones_reporte.dato.ajuste
      );
      asignarValorCargando(false);
      console.log(eventosPasados.listado_actualizaciones_reporte.dato);
      validaNumeroSiniestro(eventosPasados.listado_actualizaciones_reporte.dato.ajuste||[]);
      
      dispatch({
        type: "AGREGAR",
        indice: "pagoIndemnizacion",
        valor: null
      });

      /**
       * Validamos si antes que cualquier validación si viene la notificación
       * 31 => Reporte siniestro robo
       */
      const existeRobo = eventosPasados.listado_actualizaciones_reporte.dato.ajuste.findIndex(evento => evento.tipoMensaje === 31);
      if (existeRobo > -1) {

        /**
         * MEJORA TEMPORAL: PARA QUE NO HAGA SOLICITUDES A LA LINEA DE TIEMPO DE AJUSTE Y VALUACIÓN
         * Y NO SE ESTE ABRIENDO Y CERRANDO EL CONTENEDOR
         * EN CASO DE SER REPORTE DE ROBO SE VA A MANDAR LA SOLICITUD SIN NCECESIDAD DE ABRIR
         * Y CERRAR EL CONTENEDOR QUE APLICA PARA OTROS REPORTES
         */
        asignarLineaTiempoRobo(true);
        asignarNumValuacionDanios(3);

        console.log("Llamando a la linea del tiempo de ajuste");
        console.log("Llamando a la linea del tiempo valuación de daños");
        llamarLineaTiempoAjuste({
          variables: {
            numeroReporte,
            token: objetoCookie.access_token,
          },
        });
        llamarLineaTiempoValuacionDanios({
          variables: {
            numeroReporte: numeroReporte.toString(),
            token: objetoCookie.access_token,
          },
        });
      }

      eventosPasados.listado_actualizaciones_reporte.dato.ajuste.forEach(
        (evento) => {
          switch (evento.tipoMensaje) {
            case 1:
              const numeroSiniestroNotificaci =
                obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Siniestro: "
                );
                dispatch({
                  type: "AGREGAR",
                  indice: "datosNumeroSiniestroGlobal",
                  valor: numeroSiniestroNotificaci
                });
              setNumeroSiniestro(numeroSiniestroNotificaci);
              break;

            //  Se agrega la revisión de la notificación 2 debido a que en este punto necesitamos saber si el usuario quiere PT, reparación o daños globales
            case 2:
              const numeroSiniestroNotificacion =
                obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Siniestro: "
                );
                dispatch({
                  type: "AGREGAR",
                  indice: "datosNumeroSiniestroGlobal",
                  valor: numeroSiniestroNotificacion
                });
              setNumeroSiniestro(numeroSiniestroNotificacion);

              break;
              
            // En caso de que haya un evento pasado de tipo 10, hay que revisar
            //   si previamente se contestó la encuesta de ajustador; de ser así,
            //   mostrar la sección de Reparación.
            case 10:
              if (
                validarEncuesta &&
                validarEncuesta.validar_encuesta &&
                validarEncuesta.validar_encuesta.completado &&
                (validarEncuesta.validar_encuesta.codigo === "IDENC100010" ||
                  validarEncuesta.validar_encuesta.codigo === "IMENC100007")
              ) {
                // Se comenta por que la reparación solo se mostrará si no es una PT
                // asignarValorMostrarReparacion(true);
                // dispatch({
                //   type: "AGREGAR",
                //   valor: {
                //     data: evento.descripciones,
                //   },
                //   indice: "datosPagoDeducible",
                // }); 
              } else if (
                validarEncuesta &&
                validarEncuesta.validar_encuesta &&
                validarEncuesta.validar_encuesta.completado &&
                validarEncuesta.validar_encuesta.codigo !== "IDENC100010" &&
                validarEncuesta.validar_encuesta.codigo !== "IDENC100007"
              ) {
                console.log(estadoApp);
                asignarValorCargando(false);
                history.push({
                  pathname: "/evaluacion-ajustador",
                  search: `?numeroReporte=${numeroReporte}`,
                  state: {
                    evaluadoPreviamente: true,
                    numeroSiniestro,
                  },
                });
              }
              break;

            /**
             * Se agrega validación de la notificación de ingreso a taller para agregarla al redux
             */
            case 13:
              dispatch({
                type: "AGREGAR",
                valor: {
                  data: evento
                },
                indice: "datosIngresoTaller",
              });
              break;

            case 15:
              // ! NOTIFICACION para el pago de deducibles
              console.log("Obtenemos los deducibles");
              dispatch({
                type: "AGREGAR",
                valor: {
                  data: evento.descripciones,
                },
                indice: "datosPagoDeducible",
              });
              break;

            case 19:
              // ! NOTIFICACION para el pago de deducibles
              console.log("Obtenemos el pago de deducibles");
              dispatch({
                type: "AGREGAR",
                valor: {
                  data: evento.descripciones,
                },
                indice: "datosPagoDeduciblePagado",
              });
              break;

            case 25:
              /**
               * Se validará si tiene la notificación de robo
               * Si la tiene entonces no se mostrará la valuación
               * se muestra directamente el componente de reparación
              */
              const findNotiRobo = eventosPasados.listado_actualizaciones_reporte.dato.ajuste.find((event) => event.tipoMensaje === 31);
              const valuacionActual = obtenerValorDeArregloDeStrings(
                evento.descripciones,
                "Status: "
              );
              if (findNotiRobo != null && (valuacionActual.toLowerCase().includes("reparacion") || valuacionActual.toLowerCase().includes("reparacion"))) {
                // !Hay notificación de robo y la valuacion es reparación por lo que se va solo a mostrar el contendor de repración
                setMostrarValuacion(false);
                asignarValorMostrarReparacion(true);
              } else {
                setMostrarValuacion(true);
              }
              break;

            case 26:
              let fechas;
              if (evento.descripciones.length > 1) {
                // En caso de que haya 2 fechas, lo que quiere decir que se comenzó y finalizó la valuación, guardamos ambas
                const FechaInicioValuacion = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "FechaInicioValuacion: "
                );
  
                const FechaFinValuacion = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "FechaFinValuacion: "
                );

                fechas = {
                  FechaFinValuacion,
                  FechaInicioValuacion
                }
                // return;
              } else {
                // Caso contrario, solo guardamos la fecha de inicio para mostrarla
                const FechaInicioValuacion = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "FechaInicioValuacion: "
                );
  
                fechas = {
                  FechaInicioValuacion
                }
              }

              dispatch({
                type: "AGREGAR",
                indice: "fechasValuacion",
                valor: fechas
              })
              break;

            case 27:
                // !Se agrega el valor al redux

                const MontoIndemnizacion = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "MontoIndemnizacion: "
                );
                
                const MontoDeducible = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "MontoDeducible: "
                );
                
                const TotalAPagar = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "TotalAPagar: "
                );
                
                const MetodoPago = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "MetodoPago: "
                );
                
                const NumeroTransferencia = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "NumeroTransferencia: "
                );

                const pagoAplicadoObt = obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "PagoAplicado: "
                );

                const pagoAplicado = pagoAplicadoObt.toLowerCase() === "true";

                setMontosIndemnizacion({
                  MontoIndemnizacion,
                  MontoDeducible,
                  TotalAPagar,
                  MetodoPago,
                  NumeroTransferencia,
                  pagoAplicado,
                });

                const montosRedux = {
                  MontoIndemnizacion,
                  MontoDeducible,
                  TotalAPagar,
                  MetodoPago,
                  NumeroTransferencia,
                  pagoAplicado,
                };
      
                dispatch({
                  type: "AGREGAR",
                  indice: "pagoIndemnizacion",
                  valor: montosRedux
                });

                if (pagoAplicado) {
                  setMostrarBarraAlertaPagoRealizado(true);
                }

                if (MontoIndemnizacion > 0 && MontoDeducible > 0 && TotalAPagar > 0) {
                  setMostrarResumenIndemnizacion(true);
                } else {
                  console.log("No se muestra el resumen");
                }

              break;
            
            case 31:
              /**
               * Para mostrar el mensaje "El resultado del robo de tu vehículo ha concluido. Consulta el detalle."
               * Primero se debe validar que exista la notificación 31 "Reporte siniestro robo"
               * Segundo se debe validar que no haya una alerta de valuación en el localstorage con el index "mostrarAlertaIndemnizacion"
               * Tercero validar que el estatus sea diferente de "EVALUANDO"
               */
              const mostrarAlertaIndemnizacion = localStorage.getItem("mostrarAlertaIndemnizacion");
              const existeValuacion = eventosPasados.listado_actualizaciones_reporte.dato.ajuste.find((event) => event.tipoMensaje === 25);
              if (existeValuacion != null && mostrarAlertaIndemnizacion == null) {
                // !Validar que el estatus no sea evaluando
                const statusValuacion = obtenerValorDeArregloDeStrings(
                  existeValuacion.descripciones,
                  "Status: "
                );
                if (statusValuacion !== "" && statusValuacion.toLowerCase() !== "evaluando") {
                  setMostrarBarraAlertaResultadoRobo(true);
                }
              }
              break;
            
            case 33:
              const declaracion = obtenerValorDeArregloDeStrings(
                evento.descripciones,
                "Declaracion: "
              );
              obtenerDeclaracionAudio(declaracion);
              break;

            case 34:
              setLineaTiempoLocalizacion(true);
              break;
            default:
                break;
          }
        }
      );
    } else if (cargandoEventosPasados) {
      asignarValorCargando(true);
    } else if (errorEventosPasados) {
      asignarValorCargando(false);
    }
  }, [eventosPasados, cargandoEventosPasados, errorEventosPasados]);

  useEffect(() => {
    if (
      nuevosEventosSuscripcion &&
      nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte &&
      nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      const evento =
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte;
      switch (evento.tipoMensaje) {
        case 3:
          const esPerdidaTotal = obtenerValorDeArregloDeStrings(
            evento.dato.descripciones,
            "EsPerdidaTotal: "
          );
          asignarValorMostrarPerdidaTotal(
            esPerdidaTotal.toLowerCase() === "true"
          );
          break;

        case 25:
          setMostrarValuacion(true);
          break;

        case 27:
          setMostrarResumenIndemnizacion(true);
          // !Se agrega el valor al redux

          const MontoIndemnizacion = obtenerValorDeArregloDeStrings(
            evento.descripciones,
            "MontoIndemnizacion: "
          );
          
          const MontoDeducible = obtenerValorDeArregloDeStrings(
            evento.descripciones,
            "MontoDeducible: "
          );
          
          const TotalAPagar = obtenerValorDeArregloDeStrings(
            evento.descripciones,
            "TotalAPagar: "
          );
          
          const MetodoPago = obtenerValorDeArregloDeStrings(
            evento.descripciones,
            "MetodoPago: "
          );
          
          const NumeroTransferencia = obtenerValorDeArregloDeStrings(
            evento.descripciones,
            "NumeroTransferencia: "
          );

          const pagoAplicadoObt = obtenerValorDeArregloDeStrings(
            evento.descripciones,
            "PagoAplicado: "
          );

          const pagoAplicado = pagoAplicadoObt.toLowerCase() === "true";

          setMontosIndemnizacion({
            MontoIndemnizacion,
            MontoDeducible,
            TotalAPagar,
            MetodoPago,
            NumeroTransferencia,
            pagoAplicado,
          });

          const montosRedux = {
            MontoIndemnizacion,
            MontoDeducible,
            TotalAPagar,
            MetodoPago,
            NumeroTransferencia,
            pagoAplicado,
          };

          dispatch({
            type: "AGREGAR",
            indice: "pagoIndemnizacion",
            valor: montosRedux
          });

          if (pagoAplicado) {
            setMostrarBarraAlertaPagoRealizado(true);
          }
          break;
        default:
      }
      asignarValorNuevosEventos(
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte
      );
    }
  }, [nuevosEventosSuscripcion]);

  useEffect(() => {
    if (
      validarEncuesta &&
      validarEncuesta.validar_encuesta &&
      validarEncuesta.validar_encuesta.completado &&
      (validarEncuesta.validar_encuesta.codigo === "IDENC100010" ||
        validarEncuesta.validar_encuesta.codigo === "IMENC100007")
    ) {
      asignarValorCargando(false);
      // Al recibir una notificación de que la encuesta de ajustador fue realizada,
      //  confirmar que haya habido un mensaje de tipo 10 en los eventos actuales o
      //  pasados; de ser así, mostrar la sección de Reparación.
      if (
        nuevosEventosSuscripcion &&
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte &&
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte.dato &&
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte.dato
          .ajuste
      ) {
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte.dato.ajuste.forEach(
          (evento) => {
            switch (evento.tipoMensaje) {
              case 10:
                // Se comenta por que la reparación solo se mostrará si no es una PT
                // asignarValorMostrarReparacion(true);
                break;
              default:
            }
          }
        );
      } else if (
        eventosPasados &&
        eventosPasados.listado_actualizaciones_reporte &&
        eventosPasados.listado_actualizaciones_reporte.dato &&
        eventosPasados.listado_actualizaciones_reporte.dato.ajuste
      ) {
        eventosPasados.listado_actualizaciones_reporte.dato.ajuste.forEach(
          (evento) => {
            switch (evento.tipoMensaje) {
              case 10:
                // Se comenta por que la reparación solo se mostrará si no es una PT
                // asignarValorMostrarReparacion(true);
                break;
              default:
            }
          }
        );
      }
    } else if (cargandoValidarEncuesta) {
      asignarValorCargando(true);
    } else if (errorValidarEncuesta) {
      asignarValorCargando(false);
    } else {
      asignarValorCargando(false);
    }
  }, [validarEncuesta, cargandoValidarEncuesta, errorValidarEncuesta]);

  useEffect(() => {
    if (
      !cargadoImagenesReporte &&
      imagenesReporte &&
      imagenesReporte.obtener_imagenes_reporte &&
      imagenesReporte.obtener_imagenes_reporte.completado
    ) {
      const siniestro = imagenesReporte.obtener_imagenes_reporte.dato.filter(
        (foto) =>
          foto.nombre === "frontal-derecha.jpg" ||
          foto.nombre === "frontal-izquierda.jpg" ||
          foto.nombre === "trasera-derecha.jpg" ||
          foto.nombre === "trasera-izquierda.jpg"
      );
      const documentos = imagenesReporte.obtener_imagenes_reporte.dato.filter(
        (foto) =>
          foto.nombre === "licencia-frontal.jpg" ||
          foto.nombre === "licencia-trasera.jpg" ||
          foto.nombre === "tarjeta-circulacion-frontal.jpg" ||
          foto.nombre === "tarjeta-circulacion-trasera.jpg"
      );
      asignarValorFotosSiniestro(siniestro);
      asignarValorFotosDocumentos(documentos);
      asignarValorCargando(false);
    } else if (cargadoImagenesReporte) {
      asignarValorCargando(true);
    } else {
      asignarValorCargando(false);
    }
  }, [
    cargadoImagenesReporte,
    imagenesReporte,
    nuevosEventosSuscripcion,
    eventosPasados,
  ]);

  useEffect(() => {
    setTimeout(() => {
      obtenerTipoAtencion({
        variables: {
          numeroReporte,
          numeroSiniestro: estadoApp.numeroSiniestroReporte||"",
        },
      });
    }, 500);
    /**
     * Validar si hay un item dentro del localstorage llamado ITEMMOSTRARALERTAINDEMNIZACION
     * Si lo hay se mostrará la barra alerta y se eliminará del localstorage
     */
    if (localStorage.getItem(ITEMMOSTRARALERTAINDEMNIZACION)) {
      setTimeout(() => {
        setMostrarBarraAlertaProcesoIndemnizacion(true);
        localStorage.removeItem(ITEMMOSTRARALERTAINDEMNIZACION);
      }, 1000);
    }
    
    if (localStorage.getItem(ITEMMOSTRARALERTAREPARACION)) {
      setTimeout(() => {
        setMostrarBarraAlertaProcesoReparacion(true);
        localStorage.removeItem(ITEMMOSTRARALERTAREPARACION);
      }, 1000);
    }
  }, []);

  return (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <BarraAlerta
        etiqueta="Hemos iniciado tu proceso de indemnización"
        mostrarAlerta={mostrarBarraAlertaProcesoIndemnizacion}
        estilo="notificacion"
        fijo
        manejarCierre={() => {
          setMostrarBarraAlertaProcesoIndemnizacion(false);
        }}
      />
      <BarraAlerta
        etiqueta="Hemos iniciado tu proceso de reparación"
        mostrarAlerta={mostrarBarraAlertaProcesoReparacion}
        estilo="notificacion"
        fijo
        manejarCierre={() => {
          setMostrarBarraAlertaProcesoReparacion(false);
        }}
      />
      <BarraAlerta
        etiqueta="El pago de tu indemnización se ha realizado con éxito"
        mostrarAlerta={mostrarBarraAlertaPagoRealizado}
        estilo="notificacion"
        fijo
        manejarCierre={() => {
          setMostrarBarraAlertaPagoRealizado(false);
        }}
      />
      <BarraAlerta
        etiqueta="El resultado del robo de tu vehículo ha concluido. Consulta el detalle."
        mostrarAlerta={mostrarBarraAlertaResultadoRobo}
        estilo="notificacion"
        fijo
        manejarCierre={() => {
          setMostrarBarraAlertaResultadoRobo(false);
        }}
      />
      <EncabezadoPasosProgreso />
      <FondoBlanco />
      <Pantalla>
        <TituloPantallaPasosProgreso>
          {diccionario.titulo}
        </TituloPantallaPasosProgreso>
        {showConfig.lineaTiempo ? (
          <MensajePequeno style={{ marginBottom: "50px" }}>{diccionario.subtituloLineaTiempo}</MensajePequeno>
        ): (
          <MensajePequeno style={{ marginBottom: "50px" }}>{diccionario.subtitulo}</MensajePequeno>
        )}

        {/* Debido a RT, el ContenedorReporteAjuste se manejara por notificación */}

        {lineaTiempoRobo ? (
          <>
            <ContenedorResumenRobo eventos={eventos} numeroReportePorDefecto={numeroReporte} declaracion={declaracionRobo} esAudio={esAudio}/>
            {lineaTiempoLocalizacion && (
              <ContenedorLocalizacionRobo eventos={eventos} numeroReporte={numeroReporte} />
            )}
            {/* <ContenedorCitaAjustador />
            <ContenedorResultado /> */}
          </>
        ) : (
          <ContenedorReporteAjuste
            temaBoton={mostrarReparacion || mostrarPerdidaTotal ? "blanco" : ""}
            eventosPasados={eventos}
            eventoNuevo={nuevosEventos}
            numeroReportePorDefecto={numeroReporte}
            fotosSiniestro={fotosSiniestro}
            fotosDocumentos={fotosDocumentos}
            abrirEtapa={abrirEtapa === "ReporteAjuste"}
            abrirSeccion={abrirSeccion}
          />
        )}

        {/* {mostrarPerdidaTotal && (
            <ContenedorPerdidaTotal
              eventosPasados={eventos}
              eventoNuevo={nuevosEventos}
              numeroReportePorDefecto={numeroReporte}
            />
          )} */}

        {mostrarValuacion && <ContenedorValuacion numItem={numValuacionDanios} eventos={eventos} />}

        {/* Los siguientes 3 contenedores son RELATIVOS, la valuación puede resultar en reparación, PT, o daños globales */}

        {mostrarReparacion && (
          <ContenedorReparacion
            temaBoton={mostrarPerdidaTotal ? "blanco" : ""}
            eventosPasados={eventos}
            // eventoNuevo={nuevosEventos}
            numeroReportePorDefecto={numeroReporte}
            abierto={!mostrarPerdidaTotal}
            abrirEtapa={abrirEtapa === "Reparacion"}
            abrirSeccion={abrirSeccion}
          />
        )}
        {mostrarPerdidaTotal && <ContenedorPerdidaTotalNuevo esRobo={lineaTiempoRobo} />}
        
        
        {/* {false && mostrarPerdidaTotal && (
          <ContenedorPerdidaTotal
            eventosPasados={eventos}
            eventoNuevo={nuevosEventos}
            numeroReportePorDefecto={numeroReporte}
            abrirEtapa={abrirEtapa === "PerdidaTotal"}
          />
        )} */}

        {/* Contenedor que se muestra cuando llega la notificación de monto de indemnización */}
        {mostrarResumenIndemnizacion && (
          <ContenedorResumenIndemnizacion montos={montosIndemnizacion} esRobo={lineaTiempoRobo}/>
        )}

        {/* Este contenedor corresponde al pago para el usuario sin importar si es DP, PT o DG */}
        {false && mostrarSeccionPagoDanios && (
          <ContenedorDaniosGlobales
            temaBoton={mostrarPerdidaTotal ? "blanco" : ""}
          />
        )}
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaPasosProgreso;

/* eslint-disable */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { loader } from "graphql.macro";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { Alerta, IndicadorCarga } from "../../componentes";
import AcordeonDinamico from "../../componentes/acordeon-dinamico";
import Boton from "../../componentes/boton/boton-componente/Boton";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import {
  PantallaAgilizaProcesoRT,
  PantallaGPS,
} from "../../componentes/opciones-menu-espera-robo";
import PantallaConoceProceso from "../../componentes/opciones-menu-espera-robo/opciones-menu/PantallaConoceProceso";
import { TituloCuestionarioReporte } from "../../componentes/pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import { MensajePequeno } from "../../componentes/pantalla-pruebas/PantallaTransaccionMitec.styled";
import IconoConoceProceso from "../../recursos/iconos/Insumos PT/Conoce el proceso.svg";
import IconoAgilizaProceso from "../../recursos/iconos/RT/Agiliza tu proceso.svg";
import IconoGps from "../../recursos/iconos/RT/Servicio GPS.svg";
import useAlerta from "../../utils/useAlerta";
import PantallaAgendarCita from "./PantallaAgendarCita";
import { useHistory, useLocation } from "react-router-dom";
import Encabezado from "../../componentes/encabezado/encabezado-componente/Encabezado";
import { IContactoProveedor, ILocationPantallaMenuEsperaRobo, IRespuestaProveedores, configFuncionalidadRobo } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { IRedux } from "../../interfaces/Redux/IRedux";
import { asignarCerosAgencia, asignarCerosPoliza } from "../../utils/poliza";
import ContenedorAjustador from "./componentes/contenedor-ajustador";
import PantallaRequisitos from "../../componentes/opciones-menu-espera-robo/opciones-menu/PantallaRequisitos";
import { BotonIcono } from "../../componentes/encabezado/encabezado-componente/Encabezado.styled";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import { IEventosNotificaciones } from "../../interfaces/Graphql/IEventosNotificaciones";
import obtenerValorDeArregloDeStrings from "../../componentes/utilidades-compartidas/obtenerValorDeArregloDeStrings";
import avatar from "../../recursos/imagenes/default-avatar.png";
import { BotonFlotanteEncontreMiVehiculo } from "./PantallaMenuEsperaRobo.styled";
import moment from "moment";
import constantes from "../../recursos/constantes";
import { useCookies } from "react-cookie";

const OBTENER_PROVEEDORES_GPS = loader(
  "../../graphQL/query/poliza/obtener_proveedorGps.graphql"
);

const SUBSCRIPCION_AJUSTADOR = loader(
  "../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const EVENTOS_PASADOS_AJUSTADOR = loader(
  "../../graphQL/query/reporte/listado_actualizaciones_reporte.graphql"
);

const EVENTOS_OBTENER_LINEA_VALUACION = loader(
  "../../graphQL/query/valuacion/obtener_linea_tiempo_valuacion.graphql"
);

const VALIDA_ACCESO_REPORTE = loader(
  "../../graphQL/query/reporte/valida_accesoReporte.graphql"
);

const configAjustadorAsignado = {
  textoEncabezado: "Ajustador asignado",
  textoCuerpo:
    "Te hemos asignado un ajustador para dar atención al robo de tu vehículo",
  tipoIcono: "palomita",
  colorAlerta: "verde",
  etiquetaBoton: "Aceptar",
};

const alertaProveedorGPS = {
  textoEncabezado: "¡Tienes localización GPS!",
  textoCuerpo: "Cuanto antes reportes el robo al proveedor del servicio, más rápido lo podremos encontrar.",
  tipoIcono: "ubicacion",
  etiquetaBoton: "Llamar para localizar",
  temaBoton: "rojo"
};

const configAlertaErrorDatos = {
  textoEncabezado: "Hubo un error",
  // textoCuerpo: "Hubo un error con los datos para consulta del reporte. Por favor intentalo más tarde.",
  tipoIcono: "error",
  colorAlerta: "rojo",
  etiquetaBoton: "Aceptar",
  mostrarCierre: false
}

let polizaInicial = "";
let polizaInicialSinCeros = "";
let certificadoInicial = "";
let agenciaInicial: any = null;

const titulos: any = {
  menu: "Seguimiento a robo total",
  conoce: "Conoce el proceso",
  requisitos: "Conoce el proceso",
  gps: "Localización GPS",
  cita: "Agendar cita",
  agiliza: "Agiliza tu proceso"
};

const TEXTO_A_COMPARAR = "El ajustador ha llegado al lugar del siniestro";

const nombreCookie = constantes.nombreDeCookie;

export const PantallaMenuEsperaRobo = () => {

  /**
   * los datos de Poliza, AgenciaID y Certificado deben venir si o si
   * en el redux ya que hay 2 formas de entrar.
   * 1.- Después de que el usuario generó el reporte
   * 2.- Iniciando sesión entrando a la sección de siniestros y en el reporte correspondiente
   */

  const history = useHistory();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const params = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  const [numeroReporte, setNumeroReporte] = useState<string>(params.get("numeroReporte")||"")
  
  const [pantalla, setPantalla] = useState("menu");
  const [anterior, setAnterior] = useState("");

  const [cargando, asignarValorCargando] = useState<boolean>(false);
  const [agendarCita, setAgendarCita] = useState(false);
  const alertaAjustadorAsignado = useAlerta(configAjustadorAsignado);
  const [mostrarAlertaAjustadorAsignado, setMostrarAlertaAjustadorAsignado] = useState(false);

  const [mostrarAlertaGPS, setMostrarAlertaGPS] = useState<boolean>(false);

  // !Modal para avisar que no hay datos base
  const alertaErrorDatos = useAlerta(configAlertaErrorDatos);
  const [mostrarAlertaErrorDatos, setMostrarAlertaErrorDatos] = useState<boolean>(false);
  const [mensajeErrorDatos, setMensajeErrorDatos] = useState<string>("");

  const location = useLocation<ILocationPantallaMenuEsperaRobo>();
  const estadoApp = useSelector((state: IRedux) => state);

  const reporteParam = params.get("numeroReporte");

  const [obtenerProveedores, {loading, data, error}] = useLazyQuery(
    OBTENER_PROVEEDORES_GPS, {
      fetchPolicy: "network-only"
    }
  );

  const { data: dataSubscripcion } = useSubscription(SUBSCRIPCION_AJUSTADOR, {
    variables: { numeroReporte: reporteParam },
  });

  const [obtenerEventosPasados, { data: eventosPasados }] = useLazyQuery(
    EVENTOS_PASADOS_AJUSTADOR, { fetchPolicy: "network-only" }
  );

  // !QUERY PARA LLAMAR A LINEA DEL TIEMPO DE VALUACIÓN
  const [llamarLineaTiempoValuacionDanios,
    { data: dataLineaTiempoValuacion, loading: cargandoLineaTiempoValuacionDaniosPeticion }] = useLazyQuery(EVENTOS_OBTENER_LINEA_VALUACION, {
    fetchPolicy: "network-only",
  });

  const [
    validarAccesoReporte,
    { data: dataAccesoReporte, loading: loadingAccesoReporte, error: errorAccesoReporte }
  ] = useLazyQuery(VALIDA_ACCESO_REPORTE,{ fetchPolicy: "network-only" })

  const [listaNumerosProveedor, setListaNumerosProveedor] = useState<IContactoProveedor[]>([]);
  const [nombreProveedorGPS, setNombreProveedorGPS] = useState<string>("");

  const imagenAjustadorDeRuta =
    estadoApp.datosAjustador && estadoApp.datosAjustador.imagen
      ? estadoApp.datosAjustador.imagen
      : avatar;
  const [imagenAjustador, asignarValorImagenAjustador] = useState(
    imagenAjustadorDeRuta
  );

  const nombreAjustadorDeRuta =
    estadoApp.datosAjustador && estadoApp.datosAjustador.nombre
      ? estadoApp.datosAjustador.nombre
      : "";
  const [nombreAjustador, asignarValorNombreAjustador] = useState(
    nombreAjustadorDeRuta
  );

  const [mostrarLocalizacionVehiculo, setMostrarLocalizacionVehiculo] = useState<boolean>(true);
  const [mostrarAccesoNoAutorizado, setMostrarAccesoNoAutorizado] = useState<boolean>(false);

  const cambiarPantalla = (pantalla: string = "menu", anterior: string | null = null) => {
    setPantalla(pantalla);
    if (anterior === null) {
      setAnterior("");
    } else {
      setAnterior(anterior);
    }
  };

  const [opciones, setOpciones] = useState([
    {
      icono: IconoAgilizaProceso,
      titulo: "Agiliza tu proceso",
      key: "agiliza-proceso",
      descripcion:
        "Compártenos fotos o documentos necesarios para agilizar tu proceso de indemnización",
      click: () => cambiarPantalla("agiliza"),
    },
    {
      icono: IconoConoceProceso,
      titulo: "Conoce el proceso",
      descripcion:
        "Revisa los pasos para recibir la indemnización de tu vehículo",
      key: "conoce-proceso",
      click: () => cambiarPantalla("conoce"),
    },
  ]);

  /**
   * Función para redireccionar a la pantalla de inicio
   */
  const redireccionarInicio = () => {
    history.push({ pathname: "/inicio" });
  };

  const irReportarVehiculoLocalizado = () => {
    history.push({
      pathname: "/vehiculo-encontrado",
      search: `?numeroReporte=${numeroReporte}`
    });
  };

  /**
   * Función para manejar la respuesta del back sobre los
   * proveedores gps de acuerdo a la póliza
   * 
   * @param response: IRespuestaProveedores
   * 
   * @returns void
   */
  const manejarRespuestaProveedores = (respuesta: IRespuestaProveedores | null) => {
    if (respuesta != null && respuesta.completado) {
      // Mostrar la ventana de que tiene cobertura de proveedores
      setListaNumerosProveedor(respuesta?.dato?.contactos||[]);
      setNombreProveedorGPS(respuesta?.dato?.nombreProveedorGPS||"");
      
      //Validar si se va a mostrar la ventana con el state mostrarVentanaServicioGPS
      if (location.state && location.state.mostrarVentanaServicioGPS) {
        setMostrarAlertaGPS(true);
      }

      // Se agrega opción para gps en caso de que si tenga servicio de gps
      const arrayTemp = [{
        icono: IconoGps,
        titulo: "Servicio de GPS",
        key: "servicio-gps",
        descripcion:
          "Llama a tu proveedor de GPS para intentar localizar tu vehículo",
        click: () => setPantalla("gps"),
      },...opciones];
      setOpciones(arrayTemp);

      asignarValorCargando(false);
    } else {
      // !Respuesta nula
      // No hay proveedores asi que no se mostrará nada
      console.log("no hay proveedores en la póliza");
      asignarValorCargando(false);
    }
  };

  /**
   * Efecto para controlar la respuesta de obtener proveedores
   */
  useEffect(() => {

    if (!loading && data && data.obtenerProveedoresGps && data.obtenerProveedoresGps.completado) {
      manejarRespuestaProveedores(data.obtenerProveedoresGps);
    }

    if (loading) {
      asignarValorCargando(true);
    }

    if (!loading) {
      asignarValorCargando(false);
    }

    if (error) {
      asignarValorCargando(false);
      console.log(error);
      setMensajeErrorDatos("Hubo un error al consultar los proveedores GPS de la póliza. Por favor intentalo más tarde.");
      setMostrarAlertaErrorDatos(true);
    }
  }, [loading, data, error]);

  const validarMinutosArribo = (datos: IEventosNotificaciones) => {
    /**
     * Primero validar la hora del reporte. Si ya pasaron 30min
     * redirifir a la línea del tiempo
     */
    let fechaNotificacionCreado: any = "";
    let fechaActual = moment();;
    // let DiferenciaHoras = 0;
    let milisegundos: any = 0;
    let minutos = 0;
    let segundos = 0;
    fechaNotificacionCreado = moment(datos.creado);

    milisegundos = moment.duration(
      fechaActual.diff(fechaNotificacionCreado)
    );
    segundos = milisegundos / 1000;
    minutos = segundos / 60;
    if (minutos > 30 && configFuncionalidadRobo.menuEsperaRobo.redireccionar30Min) {
      history.push({
        pathname: "/pasos-progreso",
        search: `?numeroReporte=${numeroReporte}`,
      });
    }
  };

  const asignarAjustador = (datos: IEventosNotificaciones) => {
    const { descripciones, imagenes } = datos;

    const nombreAjustadorDeRespuesta = obtenerValorDeArregloDeStrings(
      descripciones,
      "NombreAjustador: "
    );
    if (nombreAjustadorDeRespuesta != "" && !nombreAjustadorDeRespuesta.includes("Sin ajustador asignado")) {
      const nombreSplit = nombreAjustadorDeRespuesta.split("-");
      const imagenAjustadorDeRespuesta = imagenes.length && imagenes[0];
      asignarValorImagenAjustador(imagenAjustadorDeRespuesta || avatar);
  
      if (nombreSplit.length > 1) {
        if (nombreSplit[1] === "") {
          asignarValorNombreAjustador(nombreSplit[0]);
        } else {
          asignarValorNombreAjustador(nombreSplit[1]);
        }
        setMostrarAlertaAjustadorAsignado(true);
      } else {
        asignarValorNombreAjustador(nombreAjustadorDeRespuesta);
        setMostrarAlertaAjustadorAsignado(true);
      }
      dispatch({
        type: "AGREGAR",
        valor: {
          nombre: nombreAjustador,
          imagen: imagenAjustadorDeRespuesta,
        },
        indice: "datosAjustador",
      });
    }
  };

  /**
   * @descripcion
   * Función para redireccionar a la línea del tiempo
   * de robo
   * 
   * @return void
   */
  const redireccionarLineaDelTiempo = () => {
    //  !TODO: agregar en el redux la info para la línea del tiempo
    history.push({
      pathname: "/pasos-progreso",
      search: `?numeroReporte=${reporteParam}`,
    });
  };

  /**
   * @description
   * Función para validar si dentro de las notificaciones hay una fecha y hora
   * de arribo por parte del ajustador. Esta función recibe el evento de la
   * notificación 1 donde viene la fehca y hora del arribo.
   * 
   * @param {object} notificacion
   * 
   * @returns void
   */
  const validarHoraArribo = (notificacion: IEventosNotificaciones) => {
    const { descripciones } = notificacion;
    const horaArribo = obtenerValorDeArregloDeStrings(
      descripciones,
      "HoraArribo: "
    );
    const fechaHoy = moment();
    const separacionFechaArribo = horaArribo.split(".");
    const horaArriboConvertir = separacionFechaArribo.length > 0 ? separacionFechaArribo[0] : horaArribo;
    const esFechaValida = moment(horaArriboConvertir.replace("T", " "), 'YYYY-MM-DD HH:mm:ss', true);
    if (esFechaValida.isValid()) {
      // Es fecha valida. Validar si es menor a la fecha actual quiere decir de ya llegó el ajustador
      if (fechaHoy.isAfter(esFechaValida)) {
        // !La fecha y hora han pasado
        redireccionarLineaDelTiempo();
      }
    } else {
      // No es fecha valida. Validar si hay texto de llegada del ajustador
      if (horaArribo.includes(TEXTO_A_COMPARAR)) {
        // !La notificación indica que el ajustador ya realizó el arribo
        redireccionarLineaDelTiempo();
      }
    }
  };

  /**
   * @description
   * Función para llamar al query de eventos pasados
   * 
   * @param {string} param0
   * 
   * @return void
   */
  const llamarEventosPasados = () => {
    obtenerEventosPasados({ variables: { numeroReporte: reporteParam }});
  };

  /**
   * Efecto para la suscripción de eventos de notificaciones
   */
  useEffect(() => {
    // !Si la notificación nueva que llega es de asignación de ajustador
    if (
      data &&
      data.escucha_evento_actualizacion_reporte &&
      (data.escucha_evento_actualizacion_reporte.tipoMensaje === 0 || data.escucha_evento_actualizacion_reporte.tipoMensaje === 31) &&
      data.escucha_evento_actualizacion_reporte.dato
    ) {
      const {
        escucha_evento_actualizacion_reporte: { evento },
      } = data;
      validarMinutosArribo(evento);
      asignarAjustador(evento);
    }

    // !Si la notificación nueva que llega es de llegada del ajustador
    if (
      data &&
      data.escucha_evento_actualizacion_reporte &&
      data.escucha_evento_actualizacion_reporte.tipoMensaje === 1 &&
      data.escucha_evento_actualizacion_reporte.dato &&
      data.escucha_evento_actualizacion_reporte.dato.orden === 1
    ) {
      const {
        escucha_evento_actualizacion_reporte: { evento },
      } = data;
      validarHoraArribo(evento);
    }
  }, [dataSubscripcion]);

  const validarLicalizacionVehiculo = (evento: IEventosNotificaciones) => {
    const localizado: string = obtenerValorDeArregloDeStrings(
      evento.descripciones,
      "Localizado: "
    );

    if (localizado != "" && localizado.toLowerCase() === "true") {
      setMostrarLocalizacionVehiculo(false);
    }
  };

  /**
   * Efecto para manejar los eventos pasados
   */
  useEffect(() => {
    if (
      eventosPasados &&
      eventosPasados.listado_actualizaciones_reporte &&
      eventosPasados.listado_actualizaciones_reporte.dato &&
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste
    ) {
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste.forEach(
        (evento: IEventosNotificaciones) => {
          switch (evento.tipoMensaje) {
            case 0:
            case 31:
              validarMinutosArribo(evento);
              validarHoraArribo(evento);
              asignarAjustador(evento);
              break;
            case 34:
              // Validar la notificación de localización del robo
              validarLicalizacionVehiculo(evento);
              break;
            default:
              break;
          }
        }
      );
    }
  }, [eventosPasados]);

  useEffect(() => {
    if (
      !cargandoLineaTiempoValuacionDaniosPeticion &&
      dataLineaTiempoValuacion &&
      dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion &&
      dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion.codigo &&
      dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion.mensaje
    ) {
      if (
        dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion.dato === null &&
        dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion.mensaje &&
        dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion.mensaje === "Acceso no autorizado."
      ){
        setMostrarAccesoNoAutorizado(true);
        asignarValorCargando(false);
        return;
      } else if (
        dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion.dato === null &&
        dataLineaTiempoValuacion.obtener_linea_tiempo_valuacion.codigo === "ERR00001"
      ) {
        console.log("Error debe iniciar sesión para poder continuar");
        setMensajeErrorDatos("Hubo un error al consultar el reporte. Intentelo más tarde.");
        setMostrarAlertaErrorDatos(true);
        asignarValorCargando(false);
        return;
      }
      inicial();
    }

    if (cargandoLineaTiempoValuacionDaniosPeticion) {
      asignarValorCargando(true);
    }
  }, [dataLineaTiempoValuacion, cargandoLineaTiempoValuacionDaniosPeticion]);

  useEffect(() => {
    if (
      !loadingAccesoReporte && dataAccesoReporte &&
      dataAccesoReporte.valida_accesoReporte &&
      dataAccesoReporte.valida_accesoReporte.codigo &&
      dataAccesoReporte.valida_accesoReporte.mensaje &&
      dataAccesoReporte.valida_accesoReporte.dato !== null
    ) {
      const data = dataAccesoReporte.valida_accesoReporte;
      if (!data.dato) {
        setMostrarAccesoNoAutorizado(true);
      } else {
        /**
         * SI TIENE ACCESO AUTORIZADO VALIDAMOS SI HAY UNA SESIÓN.
         * SI LA HAY. MANDAMOS LLAMAR LA LINEA DEL TIEMPO DE VALUACIÓN
         * SI NO LA HAY MANDAMOS DIRECTO A LAS CONSULTAS
         */
        if (objetoCookie && objetoCookie.access_token) {
          llamarLineaTiempoValuacionDanios({
            variables: {
              numeroReporte: reporteParam,
              token: objetoCookie.access_token,
            }
          });
        } else {
          inicial();
        }
      }
    }

    if (errorAccesoReporte || (dataAccesoReporte && dataAccesoReporte.valida_accesoReporte === null)) {
      setMensajeErrorDatos("Hubo un error al validar el acceso al reporte. Intentelo más tarde.");
      setMostrarAlertaErrorDatos(true);
      return;
    }

    if (loadingAccesoReporte) {
      asignarValorCargando(true);
    } else {
      asignarValorCargando(false);
    }
  }, [dataAccesoReporte, loadingAccesoReporte, errorAccesoReporte]);

  const inicial = () => {
    let polizaBase = "";
    // let polizaBase = "499-1000010544-1";
    // Aplica la validación de la poliza por medio de redux
    if (polizaBase === "") {
      if (estadoApp.datosReporteRobo && estadoApp.datosReporteRobo.numeroPoliza) {
        polizaBase = estadoApp.datosReporteRobo.numeroPoliza||"";
      } else if (estadoApp.datosReporte && estadoApp.datosReporte.poliza) {
        polizaBase = estadoApp.datosReporte.poliza||"";
      } else if (estadoApp.datosReporteCompleto && estadoApp.datosReporteCompleto.numeroSiniestro) {
        polizaBase = estadoApp.datosReporteCompleto.numeroSiniestro;  
      } else {
        // !No hay datos para continuar por lo que regresamos a la pantalla de inicio
        // !Mostrar ventana para avisar que no hay datos
        history.push({ pathname: "/inicio" });
        return;
      }
    }

    let agencia = polizaBase.split("-")[0].split("");
    agenciaInicial = asignarCerosAgencia(agencia, agencia.toString().length);

    let unicaPoliza = polizaBase.split("-")[1].split("");
    polizaInicialSinCeros = asignarCerosPoliza(unicaPoliza, 0);
    polizaInicial = asignarCerosPoliza(unicaPoliza, unicaPoliza.length);

    certificadoInicial = polizaBase.split("-")[2];


    // Validar si se va a consultar a local o al aws
    if (configFuncionalidadRobo.menuEsperaRobo.validarProveedoresLocal) {
      asignarValorCargando(true);
      setTimeout(() => {
        asignarValorCargando(false);
        const respuesta: any = configFuncionalidadRobo.menuEsperaRobo.respuestaSatisfactoria
          ? configFuncionalidadRobo.menuEsperaRobo.respuestaProveedoresSi
          : configFuncionalidadRobo.menuEsperaRobo.respuestaProveedoreNo;
          manejarRespuestaProveedores(respuesta);
      }, 2000);
    } else { 
      obtenerProveedores({variables: {
        agenciaID: agenciaInicial,
        certificado: certificadoInicial,
        numeroPoliza: polizaInicial
      }});
    }

    obtenerEventosPasados({ variables: { numeroReporte: reporteParam }});
  };

  useEffect(() => {
    /**
     * PRIMERO SE CONSULTA AL SERVICIO DE VALIDAR ACCESO AL REPORTE
     * Y UNA VEZ QUE SE VALIDE SE VA A VALIDAR SI HAY UN ACCESS TOKEN
     * PARA MANDAR LAS NOTIFICACIONES Y DESPUÉS OBTENER LA LISTA
     * DE NOTIFICACIONES
     */
    if (configFuncionalidadRobo.menuEsperaRobo.validaAccesoReporte) {
      // !Obtener el numero de telefono por la cookie de sesión
      // !para usarse en caso de que en el redux no este
      const telefonoSession = estadoApp.informacionContacto?.telefono ?
        estadoApp.informacionContacto?.telefono
        :
        objetoCookie.Telefono||"";
      if (telefonoSession) {
        validarAccesoReporte({
          variables: {
            numeroReporte: reporteParam,
            numeroTelefono: telefonoSession
          }
        });
      } else {
        // !Si no hay un numero de teléfono regresamos al usuario al inicio
        setMensajeErrorDatos("Debe iniciar sesión para continuar. Error al validar acceso al reporte.");
        setMostrarAlertaErrorDatos(true);
        return;
      }
    } else {
      inicial();
    }
  }, []);

  const redirectBack = () => {
    history.push("/inicio");
  };

  return (
    <EnvolvedorPantalla>
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={titulos[pantalla]}
        mostrarBotonCerrar={false}
        mostrarBotonRegresar={pantalla != "menu"}
        funcionRegresar={() => {
          const cambio = anterior!=""?anterior:"menu";
          setPantalla(cambio);
        }}
        />
      {pantalla === "menu" && (
        <>
          <BotonIcono
            type="button"
            onClick={() => {
              history.push({
                pathname: "mis-polizas"
              });
            }}
            >
            <RegresarIcono fontSize="large" id="botonRegresar" />
          </BotonIcono>
          <ContenedorAjustador
            numeroReporte={numeroReporte}
            imagenAjustador={imagenAjustador}
            nombreAjustador={nombreAjustador}
          />
        </>
      )}
      <Pantalla>
        {/* Modal para avisarle al usuario que no hay datos para mostrar */}
        <Alerta
          {...alertaErrorDatos}
          funcionLlamadaBoton={() => {
            redireccionarInicio();
          }}
          mostrarModal={mostrarAlertaErrorDatos}
          textoCuerpo={mensajeErrorDatos}
        />
        <Alerta
          textoEncabezado={"Acceso no autorizado"}
          textoCuerpo={"No cuenta con acceso al reporte"}
          mostrarIcono={true}
          tipoIcono={"trianguloAlerta"}
          mostrarModal={mostrarAccesoNoAutorizado}
          etiquetaBoton={"Aceptar"}
          mostrarCierre={false}
          funcionLlamadaBoton={() => {
            redirectBack();
          }}
        />
        <Alerta
          {...alertaAjustadorAsignado}
          mostrarCierre={false}
          mostrarModal={mostrarAlertaAjustadorAsignado}
          funcionLlamadaBoton={() => {
            setMostrarAlertaAjustadorAsignado(false);
          }}
        />
        {/* Alerta para mostrarle al asegurado que tiene coberturas GPS y se precarga el primero número de teléfono */}
        <Alerta
          {...alertaProveedorGPS}
          manejarCierre={() => {
            setMostrarAlertaGPS(false);
          }}
          mostrarModal={mostrarAlertaGPS}
          funcionLlamadaBoton={() => {
            console.log(`Se abre ventana con => tel:${listaNumerosProveedor[0].numeroTelefono}`);
            window.open(`tel:${listaNumerosProveedor[0].numeroTelefono}`);
          }}
        />

        {/* Si ya hay un ajustador asignado y la pantalla es menu */}
        {/*agendarCita && pantalla === "menu" && (
          <>
            <TituloCuestionarioReporte>
              Reúnete con tu ajustador
            </TituloCuestionarioReporte>

            <Boton
              tema="estandar"
              etiqueta="Agendar cita"
              enClick={() => setPantalla("cita")}
            />
          </>
        )*/}

        {pantalla === "menu" && (
          <>
            <MensajePequeno>
              Considera las siguientes opciones antes de reunirte con tu
              ajustador
            </MensajePequeno>
            <AcordeonDinamico opciones={opciones} />
            {mostrarLocalizacionVehiculo && (
              <div style={{ width: "100%", marginTop: "2.8rem", textAlign: "center" }}>
                <BotonFlotanteEncontreMiVehiculo onClick={irReportarVehiculoLocalizado}>
                  Encontré mi vehiculo
                </BotonFlotanteEncontreMiVehiculo>
              </div>
            )}
          </>
        )}

        {pantalla === "gps" && (
          <PantallaGPS
            setPantalla={setPantalla}
            listaNumerosProveedor={listaNumerosProveedor}
            nombreProveedorGPS={nombreProveedorGPS}
          />
        )}

        {pantalla === "agiliza" && (
          <PantallaAgilizaProcesoRT
            setPantalla={setPantalla}
            numeroReporte={numeroReporte}/>
        )}

        {pantalla === "conoce" && (
          <PantallaConoceProceso cambiarPantalla={cambiarPantalla} setAnterior={setAnterior} />
        )}

        {pantalla === "requisitos" && (
          <PantallaRequisitos cambiarPantalla={cambiarPantalla} setAnterior={setAnterior}/>
        )}

        {pantalla === "cita" && (
          <PantallaAgendarCita setPantalla={setPantalla} />
        )}
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

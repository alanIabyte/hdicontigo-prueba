/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import "moment/locale/es-mx";
import { loader } from "graphql.macro";
import { useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import Constantes from "../../../recursos/constantes";
import codigosError from "../recursos/codigosError.json";
import {
  AlertaImagen,
  MensajePequeno,
  Titulo,
  SeparadorEspacio,
  ContenedorBoton,
} from "./PantallaRegistroPoliza.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import PantallaIngresoDePolizaOcr from "../../pantalla-ingreso-de-poliza-ocr";
// import { Alerta } from "../../alerta";
import IndicadorCarga from "../../indicador-carga";
import "react-dates/lib/css/_datepicker.css";
import "./estilos.scss";
import polizaImg from "../recursos/poliza.png";
import polizaGmm from "../../../recursos/imagenes/img-poliza-gmm.jpg";
import serieImg from "../recursos/serie.png";
import rfcImg from "../recursos/rfc.png";
import rfcImgGmm from "../../../recursos/imagenes/img-rfc-gmm.jpg";
import polizaDanosImg from "../recursos/polizaDanos.png";
import mascaraPoliza1 from "../../../recursos/imagenes/recursos/mascaraPoliza01.jpg";
import mascaraPoliza2 from "../../../recursos/imagenes/recursos/mascaraPoliza02.jpg";
import mascaraPoliza3 from "../../../recursos/imagenes/recursos/mascaraPoliza03.jpg";
import mascaraPolizaDanio1 from "../../../recursos/imagenes/recursos/mascaraPolizaDaños01.jpg";
import mascaraPolizaDanio2 from "../../../recursos/imagenes/recursos/mascaraPolizaDaños02.jpg";
import mascaraPolizaDanio3 from "../../../recursos/imagenes/recursos/mascaraPolizaDaños03.jpg";
import {
  validarPoliza,
  validarSerie,
  validarRFC,
  validarInciso,
} from "../../../helpers";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";

// const CamposRegistroDAN = lazy(() =>
//   import(
//     "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/CamposRegistroDAN"
//   )
// );

import CamposRegistroDAN from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/CamposRegistroDAN";
import useAccionesLog from "../../../utils/useAccionesLog";

// const { ContenedorBoton } = lazy(() =>
//   import("./PantallaRegistroPoliza.styled")
// );

const CamposRegistroGMM = lazy(() =>
  import(
    "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/CamposRegistroGMM"
  )
);
const CamposRegistroAUTR = lazy(() =>
  import(
    "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/CamposRegistroAUTR"
  )
);

const Alerta = lazy(() => import("../../alerta/alerta-componente/Alerta"));

const REGISTRAR_POLIZA = loader(
  "../../../graphQL/query/cobranza/cobranza_registraPolizaCliente.graphql"
);
const OBTENER_POLIZAS_COBRANZA = loader(
  "../../../graphQL/query/cobranza/cobranza_consultaPolizasCobranza.graphql"
);

const SUSCRIPCION_NOTIFICACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const { nombreDeCookie } = Constantes;
const diccionario = {
  encabezado: "Registro",
  // titulo: "Selecciona el tipo de póliza que vas a registrar",
  titulo: "Ingresa los datos de tu póliza",
  etiquetaPoliza: "Número de póliza",
  etiquetaPolizaGMM: "Número de póliza (sin guiones)",
  etiquetaSerie: "Últimos 4 dígitos del número de serie de tu vehículo:",
  etiquetaRFC: "RFC",
  etiquetaInciso: "Inciso",
  marcadorPoliza: "Marcador opcional",
  etiquetaBotonCompletarRegistro: "Completar registro",
  etiquetaValidar: "Verificar campos",
  linkInstruccionesPoliza: "¿Dónde encuentro el número de póliza?",
  linkInstruccionesSerie: "¿Dónde está mi número de serie?",
  linkInstruccionesRFC: "¿Dónde encuentro mi RFC?",
  linkInstruccionesPolizaDAN: "¿Dónde encuentro el número de póliza e inciso?",
  intruccionesPoliza:
    "Localiza tu número de póliza tal como se ve en el ejemplo",
  intruccionesSerie: "Localiza tu número de serie tal como se ve en el ejemplo",
  mensajeDeErrorDefault:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  validarCampos: "Validar campos",
  alerta: {
    titulo: "Póliza no vigente",
    cuerpo:
      // eslint-disable-next-line max-len
      "La póliza que intentas reportar presenta problemas de vigencia.<br /><br />No te preocupes, comunícate con nosotros para continuar tu atención.",
    etiquetaBoton: "Llamar a HDI *434",
  },
  errores: {
    verificarCampos:
      "Favor de verificar tus datos y que estás seleccionando el tipo de póliza correcta.",
    campoRequerido: "Campo requerido para poder continuar.",
    // oficinaIncorrecta:
    //   "Si eres cliente Autocompara - Santander comunicate al *434",
    formatoIncorrecto: "Por favor revisa que el formato sea correcto.",
    contrasenaNoCoincide: "Las contraseñas no coinciden.",
    contrasenaNumCaracteres:
      "La contraseña debe contener al menos 8 caracteres.",
    contrasenaReglas:
      "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales",
    rfcIncompleto: "Tu RFC debe contener al menos 12 caracteres.",
    telefonoIncompleto: "Introduce tu teléfono a 10 dígitos.",
  },
};
const valores = {
  poliza: "",
  inciso: "",
  numeroDeSerie: ["", "", "", ""],
  rfc: "",
  polizaMascara: ["", "", ""],
};
const numSerieCambio = [];
const numPolizaCambio = [];

// !! ======= Definicio del componente
const PantallaRegistroUsuario = (props) => {
  // eslint-disable-next-line react/prop-types
  const { tipoPolizaProps, setMostrarAcordeon } = props;
  const inputRefs = {
    input0: useRef(),
    input1: useRef(),
    input2: useRef(),
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const [cookie] = useCookies([nombreDeCookie]);
  const { runEnterLog, runCancelLog, runSuccesLog } = useAccionesLog(
    estadoApp.informacionContacto ? estadoApp.informacionContacto.telefono : ""
  );
  const objetoCookie = cookie[nombreDeCookie];
  const location = useLocation();
  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";
  const [NumPolizaEstado, asignarValorNumPoliza] = useState(
    estadoApp.datosIngresoPolizaCobranza &&
      estadoApp.datosIngresoPolizaCobranza.poliza
      ? estadoApp.datosIngresoPolizaCobranza.poliza
      : []
  );
  const [validNotif, setValidNotif] = useState(false); // ! Validacion notif => TS y QA (false); PR (true).
  const [NumSerieEstado, asignarValorNumSerie] = useState(
    estadoApp.datosIngresoPolizaCobranza &&
      estadoApp.datosIngresoPolizaCobranza.vin
      ? [
          estadoApp.datosIngresoPolizaCobranza.vin.slice(0, 1),
          estadoApp.datosIngresoPolizaCobranza.vin.slice(1, 2),
          estadoApp.datosIngresoPolizaCobranza.vin.slice(2, 3),
          estadoApp.datosIngresoPolizaCobranza.vin.slice(3, 4),
        ]
      : ["", "", "", ""]
  );
  const [NumPolizaEstadoMascara, asignarValorNumPolizaEstadoMascara] = useState(
    ["", "", ""]
  );

  if (objetoCookie && objetoCookie.Usuario && objetoCookie.access_token) {
    //  NOTE: Puede registrar
  } else {
    history.push("/");
  }
  const params = new URLSearchParams(location.search);
  if (params.get("vin")) {
    const numeroPoliza = params.get("numeroPoliza");
    const vinReq = params.get("vin");
    valores.poliza = numeroPoliza;
    valores.numeroDeSerie[0] = vinReq.substr(13, 1);
    valores.numeroDeSerie[1] = vinReq.substr(14, 1);
    valores.numeroDeSerie[2] = vinReq.substr(15, 1);
    valores.numeroDeSerie[3] = vinReq.substr(16, 1);
    NumSerieEstado[0] = vinReq.substr(13, 1);
    NumSerieEstado[1] = vinReq.substr(14, 1);
    NumSerieEstado[2] = vinReq.substr(15, 1);
    NumSerieEstado[3] = vinReq.substr(16, 1);
  } else {
    valores.poliza = "";
    valores.numeroDeSerie[0] = "";
    valores.numeroDeSerie[1] = "";
    valores.numeroDeSerie[2] = "";
    valores.numeroDeSerie[3] = "";
  }
  const NumSerieEstadoPos0 = NumSerieEstado[0];
  const NumSerieEstadoPos1 = NumSerieEstado[1];
  const NumSerieEstadoPos2 = NumSerieEstado[2];
  const NumSerieEstadoPos3 = NumSerieEstado[3];
  valores.numeroDeSerie[0] = NumSerieEstadoPos0;
  valores.numeroDeSerie[1] = NumSerieEstadoPos1;
  valores.numeroDeSerie[2] = NumSerieEstadoPos2;
  valores.numeroDeSerie[3] = NumSerieEstadoPos3;
  if (
    NumPolizaEstado !== undefined &&
    (valores.poliza === "" || valores.poliza === undefined)
  ) {
    valores.poliza = NumPolizaEstado;
  }
  const [registrarPoliza, { loading, error, data }] = useLazyQuery(
    REGISTRAR_POLIZA,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [obtenerPolizas, { data: polizas, loading: enCarga }] = useLazyQuery(
    OBTENER_POLIZAS_COBRANZA
  );
  const [eventoRegistrar, setEventoRegistrar] = useState(false);
  const [focoPoliza, asignarValorfocoPoliza] = useState("");
  const [focoNumeroDeSerieMascara, asignarValorfocoNumeroDeSerieMascara] =
    useState("");
  const [focoNumeroDeSerie, asignarValorfocoNumeroDeSerie] = useState("");
  const [focoRFC, asignarValorFocoRFC] = useState("");
  const [focoInciso, asignarValorFocoInciso] = useState("");
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [mostrarLectorOcr, asignarValorMostrarLectorOcr] = useState(false);
  const [mostrarModalPoliza, asignarValorMostrarModalPoliza] = useState(false);
  const [mostrarModalSerie, asignarValorMostrarModalSerie] = useState(false);
  const [mostrarModalRFC, asignarValorMostrarModalRFC] = useState(false);
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [mostrarImagen, setMostrarImagen] = useState(false);
  const [imagenMascara, setImagenMascara] = useState("");
  const [cargando, asignarValorCargando] = useState(false);
  const [errorPoliza, asignarErrorPoliza] = useState("");
  const [errorSerie, asignarErrorSerie] = useState("");
  const [errorRFC, asignarErrorRFC] = useState("");
  const [tipoPoliza] = useState(tipoPolizaProps);
  const alCambiarNumeroDePoliza = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.poliza = valor;
    }
    // if (valores.poliza === "034") {
    //   asignarValorMostrarBarraAlerta(true);
    //   asignarValorfocoPoliza("error");
    //   asignarValorMensajeAlerta(diccionario.errores.oficinaIncorrecta);
    //   asignarValorNumPoliza(valores.poliza);
    // }
  };

  const { data: eventosSubscripcion } = useSubscription(
    SUSCRIPCION_NOTIFICACIONES,
    {
      variables: { numeroReporte: 0 },
    }
  );

  function persistirNumSeriePoliza() {
    asignarValorNumPoliza(valores.poliza === "" ? "0" : valores.poliza);
    asignarValorNumPolizaEstadoMascara(valores.polizaMascara);
    if (NumPolizaEstado !== "" && valores.poliza !== "") {
      asignarValorNumPoliza(valores.poliza);
      valores.poliza = NumPolizaEstado;
    }
    if (NumSerieEstado[0] === "" || valores.numeroDeSerie !== NumSerieEstado) {
      numSerieCambio[0] =
        valores.numeroDeSerie[0] !== ""
          ? valores.numeroDeSerie[0]
          : NumSerieEstado[0];
    }
    if (NumSerieEstado[1] === "" || valores.numeroDeSerie !== NumSerieEstado) {
      numSerieCambio[1] =
        valores.numeroDeSerie[1] !== ""
          ? valores.numeroDeSerie[1]
          : NumSerieEstado[1];
    }
    if (NumSerieEstado[2] === "" || valores.numeroDeSerie !== NumSerieEstado) {
      numSerieCambio[2] =
        valores.numeroDeSerie[2] !== ""
          ? valores.numeroDeSerie[2]
          : NumSerieEstado[2];
    }
    if (NumSerieEstado[3] === "" || valores.numeroDeSerie !== NumSerieEstado) {
      numSerieCambio[3] =
        valores.numeroDeSerie[3] !== ""
          ? valores.numeroDeSerie[3]
          : NumSerieEstado[3];
    }
    if (valores.numeroDeSerie !== NumSerieEstado) {
      asignarValorNumSerie(numSerieCambio);
    }
    // ** valores numero poliza mascara
    if (
      NumPolizaEstadoMascara[0] === "" ||
      valores.polizaMascara !== NumPolizaEstadoMascara
    ) {
      numPolizaCambio[0] =
        valores.polizaMascara[0] !== ""
          ? valores.polizaMascara[0]
          : NumPolizaEstadoMascara[0];
    }
    if (
      NumPolizaEstadoMascara[1] === "" ||
      valores.polizaMascara !== NumPolizaEstadoMascara
    ) {
      numPolizaCambio[1] =
        valores.polizaMascara[1] !== ""
          ? valores.polizaMascara[1]
          : NumPolizaEstadoMascara[1];
    }
    if (
      NumPolizaEstadoMascara[2] === "" ||
      valores.polizaMascara !== NumPolizaEstadoMascara
    ) {
      numPolizaCambio[2] =
        valores.polizaMascara[2] !== ""
          ? valores.polizaMascara[2]
          : NumPolizaEstadoMascara[2];
    }
    if (
      NumPolizaEstadoMascara[0] !== "" &&
      NumPolizaEstadoMascara[1] !== "" &&
      NumPolizaEstadoMascara[2] !== ""
    ) {
      if (tipoPoliza === "AUTR") {
        valores.poliza = NumPolizaEstadoMascara.join("-");
        asignarValorNumPoliza(valores.poliza);
      }
      if (tipoPoliza === "DAN") {
        const primeraDosPosiciones = valores.polizaMascara.slice(0, 2);
        valores.poliza = primeraDosPosiciones.join("-");
        // eslint-disable-next-line prefer-destructuring
        valores.inciso = valores.polizaMascara[2];
      }
    }
    // ***
  }

  //------------------------------------------------------------------------------------------
  const alCambiarNumeroDePolizaMascara = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      const { polizaMascara } = valores;
      const indice = Number(evento.target.dataset.indice);
      polizaMascara[indice] = valor;
      valores.polizaMascara = polizaMascara;
      if (
        valores.polizaMascara[0].length >= 1 &&
        valores.polizaMascara[0].length <= 5 &&
        valores.polizaMascara[1].length >= 5 &&
        valores.polizaMascara[1].length <= 10 &&
        valores.polizaMascara[2].length >= 1 &&
        valores.polizaMascara[2].length === 3
      ) {
        persistirNumSeriePoliza();
        asignarValorfocoNumeroDeSerieMascara("");
        asignarErrorSerie("");
      }
    }
  };
  const enFocoPolizaMascara = (evento) => {
    let input = "";
    if (evento) {
      if (tipoPoliza === "AUTR") {
        if (evento.target.id === "campoPolizaMascara-campoDeTexto-0") {
          setImagenMascara(mascaraPoliza1);
          setMostrarImagen(true);
          input = "input0";
        }
        if (evento.target.id === "campoPolizaMascara-campoDeTexto-1") {
          setImagenMascara(mascaraPoliza2);
          setMostrarImagen(true);
          input = "input1";
        }
        if (evento.target.id === "campoPolizaMascara-campoDeTexto-2") {
          setImagenMascara(mascaraPoliza3);
          setMostrarImagen(true);
          input = "input2";
        }
      }

      if (tipoPoliza === "DAN") {
        if (evento.target.id === "campoPolizaMascara-campoDeTexto-0") {
          setImagenMascara(mascaraPolizaDanio1);
          setMostrarImagen(true);
          input = "input0";
        }
        if (evento.target.id === "campoPolizaMascara-campoDeTexto-1") {
          setImagenMascara(mascaraPolizaDanio2);
          setMostrarImagen(true);
          input = "input1";
        }
        if (evento.target.id === "campoPolizaMascara-campoDeTexto-2") {
          setImagenMascara(mascaraPolizaDanio3);
          setMostrarImagen(true);
          input = "input2";
        }
      }
    }

    // Vuelve a enfocar el input después de la actualización del estado
    setTimeout(() => {
      inputRefs[input].current.focus();
    });
  };

  const enDesenfocarMascara = (evento) => {
    if (evento.target.id === "campoPolizaMascara-campoDeTexto-2") {
      setMostrarImagen(false);
      persistirNumSeriePoliza();
    }
    if (tipoPoliza === "GMM") {
      persistirNumSeriePoliza();
    }
  };

  const alDesenfocarRFC = (evento) => {
    if (evento) {
      persistirNumSeriePoliza();
    }
  };
  //------------------------------------------------------------------------------------------

  useEffect(() => {
    persistirNumSeriePoliza();
    runEnterLog(3);
  }, []);

  const alCambiarNumeroDeSerie = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      const { numeroDeSerie } = valores;
      const indice = Number(evento.target.dataset.indice);
      numeroDeSerie[indice] = valor;
      valores.numeroDeSerie = numeroDeSerie;
      if (numeroDeSerie.join("").length === 4) {
        persistirNumSeriePoliza();
        asignarValorfocoNumeroDeSerie("");
        asignarErrorSerie("");
      }
    }
  };
  const alCambiarRFC = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.rfc = valor;
    }
  };
  const alCambiarInciso = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.inciso = valor;
    }
  };
  const irAMisPolizas = () => {
    dispatch({
      type: "AGREGAR",
      valor: { vin: "", poliza: "", rfc: "" },
      indice: "datosIngresoPolizaCobranza",
    });
    obtenerPolizas({
      variables: { telefono: usuario, token: objetoCookie.access_token },
      fetchPolicy: "cache-and-network",
    });
    // Redirect is made once we get the policy
  };

  const limpiarErrores = () => {
    asignarValorFocoRFC("");
    asignarValorfocoNumeroDeSerie("");
    asignarValorFocoInciso("");
    asignarValorfocoPoliza("");
    asignarErrorPoliza("");
    asignarErrorRFC("");
    asignarErrorSerie("");
  };

  const enfocarError = (codigo) => {
    switch (codigosError[codigo]) {
      case "poliza":
        asignarValorfocoPoliza("error");
        break;
      case "RFC":
        asignarValorFocoRFC("error");
        break;
      case "VIN":
        asignarValorfocoNumeroDeSerie("error");
        break;
      case "polizainciso":
        asignarValorfocoPoliza("error");
        asignarValorFocoInciso("error");
        break;
      default:
        asignarValorCargando(false);
        asignarValorMostrarBarraAlerta(true);
        asignarValorMensajeAlerta(diccionario.errores.errorGenerico);
    }
  };

  const enfocarErrorGMM = (response) => {
    switch (response.codigo) {
      case "IDGW10001":
        asignarValorCargando(false);
        asignarValorMostrarBarraAlerta(true);
        asignarValorMensajeAlerta(response.mensaje);
        break;
      default:
        asignarValorCargando(false);
        asignarValorMostrarBarraAlerta(true);
        asignarValorMensajeAlerta(diccionario.errores.errorGenerico);
    }
  };

  useEffect(() => {
    valores.poliza = "";
    valores.inciso = "";
    valores.numeroDeSerie = ["", "", "", ""];
    valores.rfc = "";
    asignarValorNumPoliza("");
    asignarValorNumSerie(["", "", "", ""]);
    dispatch({
      type: "AGREGAR",
      valor: { vin: "", poliza: "", rfc: "" },
      indice: "datosIngresoPolizaCobranza",
    });
    limpiarErrores();
  }, [tipoPoliza]);

  const hacerValidaciones = () => {
    const { poliza, inciso, numeroDeSerie, rfc } = valores;
    persistirNumSeriePoliza();

    validarPoliza(poliza, diccionario.errores, tipoPoliza).then((respuesta) => {
      asignarValorfocoPoliza(respuesta.foco);
      asignarErrorPoliza(respuesta.error);
    });

    if (tipoPoliza === "AUTR") {
      validarSerie(numeroDeSerie.join(""), diccionario.errores).then(
        (respuesta) => {
          asignarValorfocoNumeroDeSerie(respuesta.foco);
          asignarErrorSerie(respuesta.error);
        }
      );
    }

    if (tipoPoliza === "DAN") {
      validarRFC(rfc, diccionario.errores).then((respuesta) => {
        asignarValorFocoRFC(respuesta.foco);
        asignarErrorRFC(respuesta.error);
      });
      validarInciso(inciso, diccionario.errores).then((respuesta) => {
        asignarValorFocoInciso(respuesta.foco);
      });
    }

    if (tipoPoliza === "GMM") {
      validarRFC(rfc, diccionario.errores).then((respuesta) => {
        asignarValorFocoRFC(respuesta.foco);
        asignarErrorRFC(respuesta.error);
      });
      validarInciso(inciso, diccionario.errores).then((respuesta) => {
        asignarValorFocoInciso(respuesta.foco);
      });
    }

    setEventoRegistrar(!eventoRegistrar);
  };

  const esVacio = (valor) => valor.length === 0;

  const suscriptionLogic = () => {
    if (
      eventosSubscripcion &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      const evento = eventosSubscripcion.escucha_evento_actualizacion_reporte;
      if (evento.tipoMensaje === 25) {
        // ! Validación para pruebas.
        let valorNotificacion = null;
        if (validNotif === true) {
          valorNotificacion = obtenerValorDeArregloDeStrings(
            evento.dato.descripciones,
            "Exitoso: "
          );
        } else {
          valorNotificacion = "true";
        }
        console.log("Valor de Notif (bandera): ", valorNotificacion);
        if (valorNotificacion === "true") {
          console.log("Llegó la notificación y reedirigo");
          // Una vez llega la notificacion y su valor es true, todo se registro correctamente y procedo a mostrar todas las polizas
          history.push("/mis-polizas", { completo: true });
          asignarValorCargando(false);
        } else {
          asignarValorCargando(false);
          const errorArreglo = obtenerValorDeArregloDeStrings(
            evento.dato.descripciones,
            "Mensaje: "
          );
          asignarValorMensajeAlerta(errorArreglo);
          asignarValorMostrarBarraAlerta(true);
        }
      }
    }
  };

  const registrar = () => {
    persistirNumSeriePoliza();
    const { poliza, numeroDeSerie, inciso, rfc } = valores;

    switch (tipoPoliza) {
      case "AUTR":
        registrarPoliza({
          variables: {
            lineaNegocio: "AUTR",
            numeroPoliza: poliza.split("-")[1],
            // eslint-disable-next-line radix
            cis: parseInt(poliza.split("-")[2]),
            rfc,
            vin: numeroDeSerie.join(""),
            numeroTelefono: usuario,
            agencia: poliza.split("-")[0],
            correo: estadoApp?.informacionContacto?.email || "",
          },
        });
        break;
      case "DAN":
        registrarPoliza({
          variables: {
            lineaNegocio: "DAN",
            numeroPoliza: poliza.split("-")[1],
            cis: inciso,
            rfc,
            vin: numeroDeSerie.join(""),
            numeroTelefono: usuario,
            agencia: poliza.split("-")[0],
            correo: estadoApp?.informacionContacto?.email || "",
          },
        });
        break;
      case "GMM":
        registrarPoliza({
          variables: {
            lineaNegocio: "GMM",
            // numeroPoliza: numPoliza,
            numeroPoliza: poliza,
            cis: inciso,
            rfc,
            vin: numeroDeSerie.join(""),
            numeroTelefono: usuario,
            agencia: "00003",
            correo: estadoApp?.informacionContacto?.email || "",
          },
        });
        break;
      default:
        // eslint-disable-next-line no-useless-return
        return;
    }
  };

  const onMouseLeave = () => setMostrarImagen(false);

  const onMouseEnter = () => console.log("onMouseLeave"); // setMostrarImagen(true);

  useEffect(() => {
    if (tipoPoliza === "GMM") {
      valores.inciso = "1";
    }
  }, [tipoPoliza]);

  useEffect(() => {
    if (valores.poliza.length > 0) {
      if (tipoPoliza === "AUTR") {
        if (esVacio(focoPoliza) && esVacio(focoNumeroDeSerie)) {
          registrar();
          return;
        }
      }
      if (tipoPoliza !== "AUTR") {
        if (esVacio(focoPoliza) && esVacio(focoRFC) && esVacio(focoInciso)) {
          registrar();
        }
      }
    }
  }, [focoPoliza, focoNumeroDeSerie, focoInciso, focoRFC, eventoRegistrar]);

  useEffect(() => {
    if (!enCarga && polizas && polizas.cobranza_consultaPolizasCobranza) {
      asignarValorCargando(false);
      history.push("/mis-polizas", { completo: true });
    } else if (enCarga) {
      asignarValorCargando(true);
    }
  }, [polizas, enCarga]);

  useEffect(() => {
    if (!loading && data && data.cobranza_registraPolizaCliente) {
      if (data?.cobranza_registraPolizaCliente.completado) {
        asignarValorCargando(false);
        if (tipoPoliza === "GMM") {
          asignarValorCargando(true);
          console.log("asigno el loader");
          // suscriptionLogic(); // esto se comento por que las subscripcion de notificaciones no esta funcionando
          // history.push("/mis-polizas", { completo: true });
          asignarValorCargando(false);
          runSuccesLog(3);
          irAMisPolizas();
        } else {
          if (
            data.cobranza_registraPolizaCliente.mensaje !==
            "Se registro poliza exitosamente"
          ) {
            asignarValorCargando(false);
            asignarValorMensajeAlerta(
              data.cobranza_registraPolizaCliente.mensaje
            );
            asignarValorMostrarBarraAlerta(true);
            enfocarError(data.cobranza_registraPolizaCliente.codigo);
            return;
          }
          runSuccesLog(3);
          irAMisPolizas();
        }
      } else {
        asignarValorCargando(false);
        if (data.cobranza_registraPolizaCliente.mensaje !== "Excepcion") {
          asignarValorMensajeAlerta("Ocurrio un error, intentalo de nuevo.");
          asignarValorMostrarBarraAlerta(true);
          if (tipoPoliza === "GMM") {
            enfocarErrorGMM({
              codigo: data.cobranza_registraPolizaCliente.codigo,
              mensaje: data.cobranza_registraPolizaCliente.mensaje,
            });
          } else {
            enfocarError(data.cobranza_registraPolizaCliente.codigo);
          }
        }
      }
    } else if (loading) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    } else if (!loading) {
      asignarValorCargando(false);
    }
  }, [loading, data, eventosSubscripcion]);

  useEffect(() => {
    if (mostrarBarraAlerta) {
      asignarValorCargando(false);
    }
  }, [mostrarBarraAlerta]);

  return mostrarLectorOcr ? (
    <PantallaIngresoDePolizaOcr
      alAceptar={(valorOcr) => {
        asignarValorNumPoliza(valorOcr);
        asignarValorMostrarLectorOcr(false);
      }}
      alCancelar={() => {
        asignarValorMostrarLectorOcr(false);
      }}
    />
  ) : (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Suspense fallback={null}>
        <Alerta
          textoEncabezado={
            tipoPoliza === "AUTR"
              ? diccionario.intruccionesPoliza
              : diccionario.linkInstruccionesPolizaDAN
          }
          textoCuerpoJsx={
            <AlertaImagen
              src={
                // eslint-disable-next-line no-nested-ternary
                tipoPoliza === "AUTR"
                  ? polizaImg
                  : tipoPoliza === "DAN"
                  ? polizaDanosImg
                  : polizaGmm
              }
              alt=""
            />
          }
          mostrarModal={mostrarModalPoliza}
          manejarCierre={() => {
            asignarValorMostrarModalPoliza(false);
          }}
          mostrarIcono={false}
          margenMinimo
        />
        <Alerta
          textoEncabezado={diccionario.intruccionesSerie}
          textoCuerpoJsx={<AlertaImagen src={serieImg} alt="" />}
          mostrarModal={mostrarModalSerie}
          manejarCierre={() => {
            asignarValorMostrarModalSerie(false);
          }}
          mostrarIcono={false}
          margenMinimo
        />
        <Alerta
          textoEncabezado={diccionario.alerta.titulo}
          colorAlerta="rojo"
          textoCuerpo={diccionario.alerta.cuerpo}
          mostrarModal={mostrarModal}
          manejarCierre={() => {
            asignarValorMostrarModal(false);
          }}
          etiquetaBoton={diccionario.alerta.etiquetaBoton}
          funcionLlamadaBoton={() => {
            history.push("/");
            window.location.href = "tel:*434";
          }}
        />
        <Alerta
          textoEncabezado={diccionario.linkInstruccionesRFC}
          textoCuerpoJsx={
            <AlertaImagen
              src={tipoPoliza === "GMM" ? rfcImgGmm : rfcImg}
              alt=""
            />
          }
          mostrarModal={mostrarModalRFC}
          manejarCierre={() => {
            asignarValorMostrarModalRFC(false);
          }}
          mostrarIcono={false}
          margenMinimo
        />
      </Suspense>
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          // history.push(paginaAnterior);
          setMostrarAcordeon(true);
          sessionStorage.removeItem("estadoRedux");
          runCancelLog(3);
        }}
      />
      <Pantalla>
        <BarraAlerta
          // etiqueta="Ocurrio un error, intentalo de nuevo."
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          posicionAbsoluta
        />
        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        {/* <Suspense fallback={null}> */}
        {tipoPoliza === "DAN" && (
          <CamposRegistroDAN
            alCambiarNumeroDePoliza={alCambiarNumeroDePoliza}
            alCambiarInciso={alCambiarInciso}
            focoPoliza={focoPoliza}
            focoInciso={focoInciso}
            poliza={valores.poliza}
            inciso={valores.inciso}
            persistirNumSeriePoliza={persistirNumSeriePoliza}
            asignarValorMostrarModalPoliza={asignarValorMostrarModalPoliza}
            alCambiarRFC={alCambiarRFC}
            focoRFC={focoRFC}
            rfc={valores.rfc}
            asignarValorMostrarModalRFC={asignarValorMostrarModalRFC}
            errorPoliza={errorPoliza}
            errorRFC={errorRFC}
            alCambiarNumeroDePolizaMascara={alCambiarNumeroDePolizaMascara}
            alDesenfocarRFC={alDesenfocarRFC}
            enFocoPolizaMascara={enFocoPolizaMascara}
            enDesenfocarMascara={enDesenfocarMascara}
            focoNumeroDeSerieMascara={focoNumeroDeSerieMascara}
            polizaMascara={valores.polizaMascara}
            imagenMascara={imagenMascara}
            mostrarImagen={mostrarImagen}
            enMouseLeave={onMouseLeave}
            inputRefs={inputRefs}
          />
        )}
        {tipoPoliza === "AUTR" && (
          <CamposRegistroAUTR
            alCambiarNumeroDePoliza={alCambiarNumeroDePoliza}
            alCambiarNumeroDeSerie={alCambiarNumeroDeSerie}
            focoPoliza={focoPoliza}
            focoNumeroDeSerie={focoNumeroDeSerie}
            poliza={valores.poliza}
            numeroDeSerie={valores.numeroDeSerie}
            persistirNumSeriePoliza={persistirNumSeriePoliza}
            asignarValorMostrarModalPoliza={asignarValorMostrarModalPoliza}
            asignarValorMostrarModalSerie={asignarValorMostrarModalSerie}
            errorPoliza={errorPoliza}
            errorSerie={errorSerie}
            alCambiarNumeroDePolizaMascara={alCambiarNumeroDePolizaMascara}
            enFocoPolizaMascara={enFocoPolizaMascara}
            focoNumeroDeSerieMascara={focoNumeroDeSerieMascara}
            polizaMascara={valores.polizaMascara}
            imagenMascara={imagenMascara}
            mostrarImagen={mostrarImagen}
            enMouseEnter={onMouseEnter}
            enMouseLeave={onMouseLeave}
            inputRefs={inputRefs}
          />
        )}
        {tipoPoliza === "GMM" && (
          <CamposRegistroGMM
            alCambiarNumeroDePoliza={alCambiarNumeroDePoliza}
            alCambiarInciso={alCambiarInciso}
            focoPoliza={focoPoliza}
            focoInciso={focoInciso}
            polizaState={valores.poliza}
            incisoState={valores.inciso}
            persistirNumSeriePoliza={persistirNumSeriePoliza}
            asignarValorMostrarModalPoliza={asignarValorMostrarModalPoliza}
            alCambiarRFC={alCambiarRFC}
            focoRFC={focoRFC}
            rfcState={valores.rfc}
            asignarValorMostrarModalRFC={asignarValorMostrarModalRFC}
            errorPoliza={errorPoliza}
            errorRFC={errorRFC}
            alDesenfocarRFC={alDesenfocarRFC}
            enDesenfocarMascara={enDesenfocarMascara}
          />
        )}
        {/* </Suspense> */}
        <SeparadorEspacio />
        <ContenedorBoton className="primer-boton">
          <Boton
            style={{ marginBottom: "0px" }}
            idBoton="btn-enviar"
            etiqueta={diccionario.etiquetaBotonCompletarRegistro}
            tema="estandar"
            enClick={hacerValidaciones}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};
export default PantallaRegistroUsuario;

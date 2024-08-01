/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
/* eslint-disable no-inner-declarations */

import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { v4 } from "uuid";
import moment from "moment";
import "moment/locale/es-mx";
import IconoVisible from "@material-ui/icons/VisibilityRounded";
import IconoNoVisible from "@material-ui/icons/VisibilityOffRounded";
import { loader } from "graphql.macro";
import {
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import Constantes from "../../../recursos/constantes";
import codigosError from "../recursos/codigosError.json";
import {
  AlertaImagen,
  MensajeError,
  Titulo,
  SeparadorEspacio,
  ContenedorBoton,
} from "./PantallaRegistroUsuario.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import CampoTexto from "../../campo-texto";
import PantallaIngresoDePolizaOcr from "../../pantalla-ingreso-de-poliza-ocr";
import { Alerta } from "../../alerta";
import IndicadorCarga from "../../indicador-carga";
import "react-dates/lib/css/_datepicker.css";
import "./estilos.scss";
import polizaImg from "../recursos/poliza.png";
import serieImg from "../recursos/serie.png";
import rfcImg from "../recursos/rfc.png";
import rfcImgGmm from "../../../recursos/imagenes/img-rfc-gmm.jpg";
import polizaGmm from "../../../recursos/imagenes/img-poliza-gmm.jpg";
import polizaDanosImg from "../recursos/polizaDanos.png";
import mascaraPoliza1 from "../../../recursos/imagenes/recursos/mascaraPoliza01.jpg";
import mascaraPoliza2 from "../../../recursos/imagenes/recursos/mascaraPoliza02.jpg";
import mascaraPoliza3 from "../../../recursos/imagenes/recursos/mascaraPoliza03.jpg";
import mascaraPolizaDanio1 from "../../../recursos/imagenes/recursos/mascaraPolizaDaños01.jpg";
import mascaraPolizaDanio2 from "../../../recursos/imagenes/recursos/mascaraPolizaDaños02.jpg";
import mascaraPolizaDanio3 from "../../../recursos/imagenes/recursos/mascaraPolizaDaños03.jpg";
import {
  validarContrasenia,
  validarPoliza,
  validarSerie,
  validarTelefono,
  validarRFC,
  validarInciso,
} from "../../../helpers";
import useGeolocation from "../../../utils/useGeolocation";
import useAlerta from "../../../utils/useAlerta";
import {
  configAlertaGeolocation,
  configAlertaErrorGeolocation,
  diccionario,
} from "./config";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import useAccionesLog from "../../../utils/useAccionesLog";
import FormularioContrasena from "../../pantalla-contrasena-cambiar/pantalla-contrasena-cambiar-componente/FormularioContrasena";

const CamposRegistroAUTR = lazy(() => import("./CamposRegistroAUTR"));
const CamposRegistroDAN = lazy(() => import("./CamposRegistroDAN"));
const CamposRegistroGMM = lazy(() => import("./CamposRegistroGMM"));

const REGISTRAR_USUARIO_DANOS = loader(
  "../../../graphQL/mutation/seguridad/seguridad_registraUsuarioDanos.graphql"
);
const REGISTRAR_USUARIO_AUTOS = loader(
  "../../../graphQL/mutation/seguridad/seguridad_registraUsuarioAutos.graphql"
);
const REGISTRAR_USUARIO_GMM = loader(
  "../../../graphQL/mutation/seguridad/seguridad_registraUsuarioGastosMedicos.graphql"
);

const SUSCRIPCION_NOTIFICACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const INICIAR_SESION = loader(
  "../../../graphQL/mutation/seguridad/iniciar_sesion.graphql"
);

// peticionFetch();
// insertaUsuario({ idUsuario: "4771208693" });

const { nombreDeCookie } = Constantes;

const valores = {
  poliza: "",
  polizaMascara: ["", "", ""],
  inciso: "",
  numeroDeSerie: ["", "", "", ""],
  rfc: "",
  telefono: "",
  contrasenia: "",
  confirmarContrasenia: "",
  validaValores: false,
};
const numSerieCambio = [];
const numPolizaCambio = [];

// !! ======= Definicio del componente
const PantallaRegistroUsuario = (props) => {
  const { tipoPolizaButton, setMostrarAcordeon } = props;
  const inputRefs = {
    input0: useRef(),
    input1: useRef(),
    input2: useRef(),
  };
  const dispatch = useDispatch();
  const geolocation = useGeolocation();
  const alertaGeolocation = useAlerta(configAlertaGeolocation);
  const alertaErrorGeolocation = useAlerta(configAlertaErrorGeolocation);
  const { runEnterLog, runCancelLog, runSuccesLog } = useAccionesLog("");
  const { poliza: polizaParam, rfc: rfcParam } = useParams();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const [cookie, establecerCookie] = useCookies([nombreDeCookie]);
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
  const [NumTelefono, asignarValorNumTelefono] = useState("");

  if (objetoCookie && objetoCookie.Usuario && objetoCookie.access_token) {
    const validado = estadoApp.usuarioValidado;
    if (!validado) {
      history.push("/registro-usuario-sms", {
        telefono: usuario,
      });
    }
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
  const paginaAnterior =
    location && location.state && location.state.paginaAnterior
      ? location.state.paginaAnterior
      : "/registro-usuario";
  const [
    registrarUsuarioDanos,
    { loading: loadingDanos, error: errorDanos, data: dataDanos },
  ] = useLazyQuery(REGISTRAR_USUARIO_DANOS, {
    fetchPolicy: "no-cache",
  });
  const [
    registrarUsuarioAutos,
    { loading: loadingAutos, error: errorAutos, data: dataAutos },
  ] = useLazyQuery(REGISTRAR_USUARIO_AUTOS, {
    fetchPolicy: "no-cache",
  });

  // !! ---------------------------- QUERY GRAPHQL GMM =======================================
  const [
    registrarUsuarioGMM,
    { loading: loadingGMM, error: errorGMM, data: dataGMM },
  ] = useLazyQuery(REGISTRAR_USUARIO_GMM, {
    fetchPolicy: "no-cache",
  });

  //! Suscripcion para las notificaciones
  const { data: eventosSubscripcion } = useSubscription(
    SUSCRIPCION_NOTIFICACIONES,
    {
      variables: { numeroReporte: 0 },
    }
  );

  const [iniciarSesion, { loading, error, data }] = useMutation(INICIAR_SESION);
  const [focoPoliza, asignarValorfocoPoliza] = useState("");
  const [focoNumeroDeSerie, asignarValorfocoNumeroDeSerie] = useState("");
  const [focoNumeroDeSerieMascara, asignarValorfocoNumeroDeSerieMascara] =
    useState("");
  const [focoRFC, asignarValorFocoRFC] = useState("");
  const [focoTelefono, asignarValorFocoTelefono] = useState("");
  const [focoInciso, asignarValorFocoInciso] = useState("");
  const [focoContrasenia, asignarValorFocoContrasenia] = useState("");
  const [focoConfirmarContrasenia, asignarValorFocoConfirmarContrasenia] =
    useState("");
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [allowContrasenia, setAllowContrasenia] = useState(false);
  const [allowTelefono, setAllowTelefono] = useState(false);
  const [allowPoliza, setAllowPoliza] = useState(false);
  const [allowSerie, setAllowSerie] = useState(false);
  const [allowConfirmarContrasenia, setAllowConfirmarContrasenia] =
    useState(false);
  const [allowRFC, setAllowRFC] = useState(false);
  const [allowInciso, setAllowInciso] = useState(false);
  const [eventoRegistrar] = useState(false);
  const [mostrarLectorOcr, asignarValorMostrarLectorOcr] = useState(false);
  const [mostrarModalPoliza, asignarValorMostrarModalPoliza] = useState(false);
  const [mostrarModalSerie, asignarValorMostrarModalSerie] = useState(false);
  const [mostrarModalRFC, asignarValorMostrarModalRFC] = useState(false);
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);
  const [errorPoliza, asignarErrorPoliza] = useState("");
  const [errorSerie, asignarErrorSerie] = useState("");
  const [errorRFC, asignarErrorRFC] = useState("");
  const [errorTelefono, asignarErrorTelefono] = useState("");
  const [mostrarImagen, setMostrarImagen] = useState(false);
  const [imagenMascara, setImagenMascara] = useState("");
  const [errorContrasenia, asignarErrorContrasenia] = useState("");
  const [errorConfirmarContrasenia, asignarErrorConfirmarContrasenia] =
    useState("");
  const [tipoPoliza] = useState(tipoPolizaButton);

  const [contrasenaVisible, asignarContrasenaVisible] = useState(true);
  const [confirmarContrasenaVisible, asignarConfirmarContrasenaVisible] =
    useState(true);

  const [polizaState, asignarPolizaState] = useState(polizaParam || "");
  const [rfcState, asignarRfcState] = useState(rfcParam || "");
  const [incisoState] = "1";

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

  const persistirNumSeriePoliza = () => {
    console.log("Persistiendo...");
    asignarValorNumPoliza(valores.poliza === "" ? "0" : valores.poliza);
    asignarValorNumPolizaEstadoMascara(valores.polizaMascara);
    asignarPolizaState(polizaParam || valores.poliza);
    asignarRfcState(rfcParam || valores.rfc);
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
      (NumPolizaEstadoMascara[0] !== "" &&
        NumPolizaEstadoMascara[1] !== "" &&
        NumPolizaEstadoMascara[2] !== "") ||
      (valores.polizaMascara[0] !== "" &&
        valores.polizaMascara[1] !== "" &&
        valores.polizaMascara[2] !== "")
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
    // ** Esta valdiacion solo es para agregar qeu los campos del formulario esten llenos
    if (tipoPoliza === "AUTR") {
      if (
        tipoPoliza === "AUTR" &&
        valores.poliza !== "" &&
        valores.polizaMascara[0] !== "" &&
        valores.polizaMascara[1] !== "" &&
        valores.polizaMascara[2] !== "" &&
        valores.numeroDeSerie[0] !== "" &&
        valores.numeroDeSerie[1] !== "" &&
        valores.numeroDeSerie[2] !== "" &&
        valores.numeroDeSerie[3] !== "" &&
        valores.telefono !== ""
      ) {
        valores.validaValores = true;
      } else {
        valores.validaValores = false;
      }
    }

    if (tipoPoliza === "DAN") {
      if (
        valores.poliza !== "" &&
        valores.inciso !== "" &&
        valores.rfc !== "" &&
        valores.telefono !== ""
      ) {
        valores.validaValores = true;
      } else {
        valores.validaValores = false;
      }
    }

    if (tipoPoliza === "GMM") {
      if (
        tipoPoliza === "GMM" &&
        valores.poliza !== "" &&
        valores.rfc !== "" &&
        valores.telefono !== ""
      ) {
        valores.validaValores = true;
      } else {
        valores.validaValores = false;
      }
    }
    // **
  };

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
        valores.polizaMascara[2].length === 3 // &&
        // valores.polizaMascara[2].length <= 3
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

  const alCambiarInciso = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.inciso = valor;
    }
  };

  const alCambiarRFC = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.rfc = valor;
    }
  };

  const alCambiarTelefono = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.telefono = valor;
    }
  };

  const alDesenfocarTelefono = (evento) => {
    if (evento) {
      asignarValorNumTelefono(valores.telefono);
      persistirNumSeriePoliza();
    }
  };

  const alDesenfocarRFC = (evento) => {
    if (evento) {
      persistirNumSeriePoliza();
    }
  };

  const alCambiarContrasenia = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.contrasenia = valor;
    }
  };

  const alCambiarConfirmarContrasenia = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.confirmarContrasenia = valor;
    }
  };

  const hacerValidaciones = (paramsState) => {
    const { poliza, inciso, numeroDeSerie, rfc, telefono } = valores;
    console.log("here: ", paramsState, rfc);
    const { nuevaContrasena, repetirNuevaContrasena } = paramsState;
    valores.contrasenia = nuevaContrasena;
    valores.confirmarContrasenia = repetirNuevaContrasena;
    persistirNumSeriePoliza();
    asignarValorMensajeAlerta("");
    asignarValorMostrarBarraAlerta(false);
    setAllowPoliza(false);
    setAllowSerie(false);
    setAllowRFC(false);
    setAllowInciso(false);
    setAllowTelefono(false);
    setAllowContrasenia(false);
    setAllowConfirmarContrasenia(false);

    validarPoliza(poliza, diccionario.errores, tipoPoliza).then((respuesta) => {
      asignarValorfocoPoliza(respuesta.foco);
      asignarErrorPoliza(respuesta.error);
      setAllowPoliza(respuesta.valida);
    });

    if (tipoPoliza === "AUTR") {
      validarSerie(numeroDeSerie.join(""), diccionario.errores).then(
        (respuesta) => {
          asignarValorfocoNumeroDeSerie(respuesta.foco);
          asignarErrorSerie(respuesta.error);
          setAllowSerie(respuesta.valida);
        }
      );
    }

    if (tipoPoliza === "DAN") {
      validarRFC(rfc, diccionario.errores).then((respuesta) => {
        asignarValorFocoRFC(respuesta.foco);
        asignarErrorRFC(respuesta.error);
        setAllowRFC(respuesta.valida);
      });
      validarInciso(inciso, diccionario.errores).then((respuesta) => {
        asignarValorFocoInciso(respuesta.foco);
        setAllowInciso(respuesta.valida);
      });
    }

    if (tipoPoliza === "GMM") {
      validarRFC(rfc, diccionario.errores).then((respuesta) => {
        asignarValorFocoRFC(respuesta.foco);
        asignarErrorRFC(respuesta.error);
        setAllowRFC(respuesta.valida);
      });
      validarInciso(incisoState, diccionario.errores).then((respuesta) => {
        asignarValorFocoInciso(respuesta.foco);
        setAllowInciso(respuesta.valida);
      });
    }

    validarTelefono(telefono, diccionario.errores).then((respuesta) => {
      asignarValorFocoTelefono(respuesta.foco);
      asignarErrorTelefono(respuesta.error);
      setAllowTelefono(respuesta.valida);
    });

    validarContrasenia(nuevaContrasena, diccionario.errores).then(
      (respuesta) => {
        asignarValorFocoContrasenia(respuesta.foco);
        asignarErrorContrasenia(respuesta.error);
        setAllowContrasenia(respuesta.valida);
      }
    );

    if (nuevaContrasena.length > 7) {
      if (nuevaContrasena === repetirNuevaContrasena) {
        asignarValorFocoConfirmarContrasenia("");
        asignarErrorConfirmarContrasenia("");
        setAllowConfirmarContrasenia(true);
      } else {
        asignarValorFocoConfirmarContrasenia("error");
        asignarErrorConfirmarContrasenia(
          diccionario.errores.contrasenaNoCoincide
        );
        setAllowConfirmarContrasenia(false);
      }
    } else {
      asignarValorFocoConfirmarContrasenia("error");
      asignarErrorConfirmarContrasenia(diccionario.errores.campoRequerido);
      setAllowConfirmarContrasenia(false);
    }

    // setEventoRegistrar(!eventoRegistrar);
  };

  // !! =========================== Aqui se realiza la ejecucion del query para registrar la poliza de GMM
  const registrar = () => {
    persistirNumSeriePoliza();
    console.log("Persistiendo");
    const { poliza, inciso, rfc, telefono, contrasenia, confirmarContrasenia } =
      valores;

    // Inicia proceso de obtención de geolocalizacion
    asignarValorCargando(true);

    geolocation
      .hasPermission()
      .then((allowed) => {
        if (!allowed) {
          // No location allowed, ask for it
          asignarValorCargando(false);
          alertaGeolocation.mostrar();
        }
        geolocation
          .getAsyncLocation()
          .then((res) => {
            if (res) {
              // Got it
              geolocation.setGeolocation({
                latitud: res.latitude,
                longitud: res.longitude,
              });
              console.log(geolocation.geolocation);
              asignarValorCargando(false);
              alertaErrorGeolocation.cerrar();
              alertaGeolocation.cerrar();
              switch (tipoPoliza) {
                case "AUTR":
                  registrarUsuarioAutos({
                    variables: {
                      lineaNegocio: "AUTR",
                      numeroPoliza: poliza,
                      vin: valores.numeroDeSerie.join(""),
                      numeroTelefono: telefono,
                      contrasena: `${contrasenia}_1`,
                      contrasenaConfirma: `${confirmarContrasenia}_1`,
                    },
                  });
                  break;

                case "DAN":
                  registrarUsuarioDanos({
                    variables: {
                      lineaNegocio: "DAN",
                      numeroPoliza: `${poliza}-${inciso}`,
                      rfc,
                      numeroTelefono: telefono,
                      contrasena: `${contrasenia}_1`,
                      contrasenaConfirma: `${confirmarContrasenia}_1`,
                    },
                  });
                  break;

                case "GMM":
                  // const numPoliza = `3-${valores.poliza}-1`;
                  // eslint-disable-next-line no-case-declarations
                  const numPoliza = `3-${valores.poliza}-1`.trim();
                  console.log(numPoliza, "rfc: ", rfc);
                  registrarUsuarioGMM({
                    variables: {
                      lineaNegocio: "GMM",
                      numeroPoliza: numPoliza,
                      rfc,
                      numeroTelefono: valores.telefono,
                      contrasena: `${valores.contrasenia}_1`,
                      contrasenaConfirma: `${valores.confirmarContrasenia}_1`,
                    },
                  });

                // eslint-disable-next-line no-fallthrough
                default:
                  break;
              }
            }
          })
          .catch((error1) => {
            asignarValorCargando(false);
            // Mostrar mensaje geolocalizacion necesaria
            console.log(error1);
            alertaGeolocation.cerrar();
            alertaErrorGeolocation.mostrar();
          });
      })
      .catch((error2) => {
        asignarValorCargando(false);
        console.log(error2);
        alertaGeolocation.cerrar();
        alertaErrorGeolocation.mostrar();
      });
  };

  const irARegistroSMS = () => {
    dispatch({
      type: "AGREGAR",
      valor: { vin: "", poliza: "", rfc: "" },
      indice: "datosIngresoPolizaCobranza",
    });
    valores.contrasenia = "";
    valores.confirmarContrasenia = "";
    valores.rfc = "";
    valores.inciso = "";
    valores.poliza = "";
    history.push("/registro-usuario-sms", {
      telefono: valores.telefono,
    });
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
      case "telefono":
        asignarValorFocoTelefono("error");
        break;
      case "VIN":
        asignarValorfocoNumeroDeSerie("error");
        break;
      case "contrasena":
        asignarValorFocoContrasenia("error");
        break;
      case "registro":
        asignarValorMostrarBarraAlerta(true);
        asignarValorMensajeAlerta(diccionario.errores.errorRegistro);
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

  const onMouseLeave = () => setMostrarImagen(false);

  // const onMouseEnter = () => console.log("onMouseLeave"); // setMostrarImagen(true);

  const esVacio = (valor) => valor.length === 0;

  const esCierto = (valor) => valor === true;

  useEffect(() => {
    runEnterLog(3);
  }, []);

  useEffect(() => {
    // ! ERROR
    // eslint-disable-next-line no-constant-condition, no-cond-assign
    if ((location.state = "/ingreso-gmm")) {
      const regex = /(^[0-9a-zA-Z]+$|^$)/;
      setMostrarAcordeon(false);
      console.log("rfcParam: ", rfcParam, ", valores.rfc: ", valores.rfc);
      if (rfcParam) {
        if (
          rfcParam.length < 10 ||
          rfcParam.length > 13 ||
          regex.test(rfcParam) !== true
        ) {
          history.push("/");
        }
        valores.poliza = polizaParam;
        valores.rfc = rfcParam;
        valores.inciso = "1";
      }
    }
  }, []);

  useEffect(() => {
    if (mostrarBarraAlerta === false) {
      if (tipoPoliza === "AUTR") {
        if (
          esVacio(focoPoliza) &&
          esVacio(focoNumeroDeSerie) &&
          esVacio(focoTelefono) &&
          esVacio(focoContrasenia) &&
          esVacio(focoConfirmarContrasenia) &&
          esCierto(allowPoliza) &&
          esCierto(allowSerie) &&
          esCierto(allowTelefono) &&
          esCierto(allowContrasenia) &&
          esCierto(allowConfirmarContrasenia)
        ) {
          registrar();
        }
      } else if (
        esVacio(focoPoliza) &&
        esVacio(focoRFC) &&
        esVacio(focoTelefono) &&
        esVacio(focoInciso) &&
        esVacio(focoContrasenia) &&
        esVacio(focoConfirmarContrasenia) &&
        esCierto(allowPoliza) &&
        esCierto(allowRFC) &&
        esCierto(allowInciso) &&
        esCierto(allowTelefono) &&
        esCierto(allowContrasenia) &&
        esCierto(allowConfirmarContrasenia)
      ) {
        registrar();
      }
    }
  }, [
    focoPoliza,
    focoNumeroDeSerie,
    focoTelefono,
    focoContrasenia,
    focoConfirmarContrasenia,
    focoInciso,
    focoRFC,
    eventoRegistrar,
    allowInciso,
    allowConfirmarContrasenia,
    allowPoliza,
    allowSerie,
    allowTelefono,
    allowRFC,
    allowContrasenia,
  ]);

  useEffect(() => {
    console.log(tipoPoliza);
    if (rfcParam && tipoPoliza === "GMM") {
      valores.poliza = polizaParam;
      valores.rfc = rfcParam;
      valores.inciso = "1";
      console.log("entré aquí");
      return;
    }
    valores.poliza = "";
    valores.inciso = "";
    valores.numeroDeSerie = ["", "", "", ""];
    valores.rfc = "";
    //  asignarValorNumPoliza('');
    //  asignarValorNumSerie(['', '', '', '']);

    dispatch({
      type: "AGREGAR",
      valor: { vin: "", poliza: "", rfc: "" },
      indice: "datosIngresoPolizaCobranza",
    });
    limpiarErrores();
  }, [tipoPoliza]);

  useEffect(() => {
    if (!loading && data) {
      if (
        data.iniciar_sesion &&
        data.iniciar_sesion.dato &&
        data.iniciar_sesion.dato.access_token
      ) {
        // Guardar cookie y redirigir
        const diaHoraDeInicioDeSesion = moment().unix();
        const nuevoObjetoDeInicioDeSesion = JSON.parse(
          JSON.stringify(data.iniciar_sesion.dato)
        );
        nuevoObjetoDeInicioDeSesion.fechaYHoraDeInicioDeSesion =
          diaHoraDeInicioDeSesion;
        establecerCookie(
          nombreDeCookie,
          JSON.stringify(nuevoObjetoDeInicioDeSesion),
          {
            path: "/",
          }
        );
        dispatch({
          type: "AGREGAR",
          valor: {
            data: nuevoObjetoDeInicioDeSesion.NombreAsegurado,
          },
          indice: "NombreUsuarioPerfil",
        });
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: nuevoObjetoDeInicioDeSesion.Telefono,
            email: nuevoObjetoDeInicioDeSesion.CorreoElectronico,
            token: nuevoObjetoDeInicioDeSesion.access_token,
          },
          indice: "informacionContacto",
        });
        asignarValorCargando(false);
        irARegistroSMS();
      } else if (data.iniciar_sesion && data.iniciar_sesion.mensaje) {
        asignarValorMensajeAlerta(data.iniciar_sesion.mensaje);
        asignarValorMostrarBarraAlerta(true);
      }
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    }
  }, [loading, data]);

  useEffect(() => {
    if (mostrarBarraAlerta) {
      asignarValorCargando(false);
      return;
    }
    if (
      !loadingDanos &&
      dataDanos &&
      dataDanos.seguridad_registraUsuarioDanos
    ) {
      if (dataDanos?.seguridad_registraUsuarioDanos.completado) {
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: valores.telefono,
            contrasenia: valores.contrasenia,
          },
          indice: "datosUsuarioCobranza",
        });
        //  Iniciar sesion
        asignarValorCargando(true);
        runSuccesLog(3);
        iniciarSesion({
          variables: {
            usuario: valores.telefono,
            contrasena: `${valores.contrasenia}_1`,
            latitud: "",
            longitud: "",
            plataforma: "HDI Contigo",
          },
        });
      } else {
        asignarValorCargando(false);
        if (dataDanos.seguridad_registraUsuarioDanos.mensaje === "Excepcion") {
          asignarValorMensajeAlerta(diccionario.errores.verificarCampos);
          asignarValorMostrarBarraAlerta(true);
        } else {
          asignarValorMensajeAlerta(
            dataDanos.seguridad_registraUsuarioDanos.mensaje
          );
          asignarValorMostrarBarraAlerta(true);
          enfocarError(dataDanos.seguridad_registraUsuarioDanos.codigo);
        }
      }
    } else if (loadingDanos) {
      asignarValorCargando(true);
    } else if (errorDanos) {
      asignarValorCargando(false);
    } else if (!loadingDanos) {
      asignarValorCargando(false);
    }
  }, [loadingDanos, dataDanos]);

  const suscriptionLogic = () => {
    if (
      eventosSubscripcion &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      const evento = eventosSubscripcion.escucha_evento_actualizacion_reporte;
      console.log(evento);
      if (evento.tipoMensaje === 24) {
        const valorNotificacion = obtenerValorDeArregloDeStrings(
          evento.dato.descripciones,
          "Exitoso: "
        );
        console.log(valorNotificacion);
        if (valorNotificacion === "true") {
          // Una vez llega la notificacion y su valor es el numero de telefono, todo se registro correctamente y procedo al SMS
          runSuccesLog(3);
          iniciarSesion({
            variables: {
              usuario: valores.telefono,
              contrasena: `${valores.contrasenia}_1`,
              latitud: "",
              longitud: "",
              plataforma: "HDI Contigo",
            },
          });
          asignarValorCargando(false);
        } else {
          console.log("No se puede registrar en GMM.");
          asignarValorCargando(false);
          const valorNotificacionRegistro = obtenerValorDeArregloDeStrings(
            evento.dato.descripciones,
            "Mensaje: "
          );
          asignarValorMensajeAlerta(valorNotificacionRegistro);
          asignarValorMostrarBarraAlerta(true);
        }
      }
    }
  };

  useEffect(() => {
    if (
      !loadingGMM &&
      dataGMM &&
      dataGMM.seguridad_registraUsuarioGastosMedicos
    ) {
      if (dataGMM?.seguridad_registraUsuarioGastosMedicos.completado) {
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: valores.telefono,
            contrasenia: valores.contrasenia,
          },
          indice: "datosUsuarioCobranza",
        });
        //  Iniciar sesion
        asignarValorCargando(true);
        // suscriptionLogic(); -- esto se comento por que se suscribe a las notificacion y estan fallando
        //  Iniciar sesion
        runSuccesLog(3);
        iniciarSesion({
          variables: {
            usuario: valores.telefono,
            contrasena: `${valores.contrasenia}_1`,
            latitud: "",
            longitud: "",
            plataforma: "HDI Contigo",
          },
        });
      } else {
        asignarValorCargando(false);
        if (
          dataGMM?.seguridad_registraUsuarioGastosMedicos.mensaje ===
          "Excepcion"
        ) {
          asignarValorMensajeAlerta(diccionario.errores.verificarCampos);
          asignarValorMostrarBarraAlerta(true);
        } else {
          asignarValorMensajeAlerta(
            dataGMM?.seguridad_registraUsuarioGastosMedicos.mensaje
          );
          asignarValorMostrarBarraAlerta(true);
          enfocarError(dataGMM?.seguridad_registraUsuarioGastosMedicos.codigo);
        }
      }
    } else if (loadingGMM) {
      asignarValorCargando(true);
    } else if (errorGMM) {
      asignarValorCargando(false);
      asignarValorMensajeAlerta(diccionario.errores.errorGenerico);
      asignarValorMostrarBarraAlerta(true);
    } else if (!loadingGMM) {
      asignarValorCargando(false);
    }
  }, [loadingGMM, dataGMM, errorGMM, eventosSubscripcion]);

  useEffect(() => {
    if (
      !loadingAutos &&
      dataAutos &&
      dataAutos.seguridad_registraUsuarioAutos
    ) {
      if (dataAutos?.seguridad_registraUsuarioAutos.completado) {
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: valores.telefono,
            contrasenia: valores.contrasenia,
          },
          indice: "datosUsuarioCobranza",
        });
        //  Iniciar sesion
        asignarValorCargando(true);
        runSuccesLog(3);
        iniciarSesion({
          variables: {
            usuario: valores.telefono,
            contrasena: `${valores.contrasenia}_1`,
            latitud: "",
            longitud: "",
            plataforma: "HDI Contigo",
          },
        });
      } else {
        asignarValorCargando(false);
        if (dataAutos.seguridad_registraUsuarioAutos.mensaje === "Excepcion") {
          asignarValorMensajeAlerta(diccionario.errores.verificarCampos);
          asignarValorMostrarBarraAlerta(true);
        } else {
          asignarValorMensajeAlerta(
            dataAutos.seguridad_registraUsuarioAutos.mensaje
          );
          asignarValorMostrarBarraAlerta(true);
          enfocarError(dataAutos.seguridad_registraUsuarioAutos.codigo);
        }
      }
    } else if (loadingAutos) {
      asignarValorCargando(true);
    } else if (errorAutos) {
      asignarValorCargando(false);
      asignarValorMensajeAlerta(diccionario.errores.errorGenerico);
      asignarValorMostrarBarraAlerta(true);
    } else if (!loadingAutos) {
      asignarValorCargando(false);
    }
  }, [loadingAutos, dataAutos, errorAutos]);

  useEffect(() => {
    if (mostrarBarraAlerta) {
      asignarValorCargando(false);
    }
  }, [mostrarBarraAlerta]);

  // const iconoContrasenaNoVisible = <IconoNoVisible />;
  // const iconoContrasenaVisible = <IconoVisible />;

  // !! ============================ Retornamos HTML
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
    // !! Modal para indicar donde encontrar el no. de poliza e inciso ================
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        {...alertaGeolocation}
        funcionLlamadaBoton={() => {
          asignarValorCargando(true);
          alertaGeolocation.cerrar();
        }}
        funcionLlamadaBoton2={() => {
          alertaErrorGeolocation.mostrar();
        }}
      />
      <Alerta
        {...alertaErrorGeolocation}
        funcionLlamadaBoton={() => {
          alertaErrorGeolocation.cerrar();
        }}
      />

      <Alerta
        textoEncabezado={
          tipoPoliza === "AUTR"
            ? diccionario.intruccionesPoliza
            : tipoPoliza === "DAN"
            ? diccionario.linkInstruccionesPolizaDAN
            : diccionario.linkInstruccionesPolizaGMM
        }
        textoCuerpoJsx={
          <AlertaImagen
            src={
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
          console.log("Cerrando...");
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
          console.log("cerrando");
          asignarValorMostrarModalRFC(false);
        }}
        mostrarIcono={false}
        margenMinimo
      />
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          // history.push(paginaAnterior);
          // sessionStorage.removeItem("estadoRedux");
          setMostrarAcordeon(true);
          runCancelLog(3);
          history.push(paginaAnterior);
        }}
      />

      <Pantalla>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          posicionAbsoluta
        />

        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        <Suspense fallback={null}>
          {tipoPoliza === "AUTR" && (
            <CamposRegistroAUTR
              alCambiarNumeroDePoliza={alCambiarNumeroDePoliza}
              alCambiarNumeroDeSerie={alCambiarNumeroDeSerie}
              alCambiarNumeroDePolizaMascara={alCambiarNumeroDePolizaMascara}
              enFocoPolizaMascara={enFocoPolizaMascara}
              enDesenfocarMascara={enDesenfocarMascara}
              focoPoliza={focoPoliza}
              focoNumeroDeSerie={focoNumeroDeSerie}
              focoNumeroDeSerieMascara={focoNumeroDeSerieMascara}
              poliza={valores.poliza}
              polizaMascara={valores.polizaMascara}
              numeroDeSerie={valores.numeroDeSerie}
              persistirNumSeriePoliza={persistirNumSeriePoliza}
              asignarValorMostrarModalPoliza={asignarValorMostrarModalPoliza}
              asignarValorMostrarModalSerie={asignarValorMostrarModalSerie}
              errorPoliza={errorPoliza}
              errorSerie={errorSerie}
              imagenMascara={imagenMascara}
              mostrarImagen={mostrarImagen}
              // enMouseEnter={onMouseEnter}
              enMouseLeave={onMouseLeave}
              inputRefs={inputRefs}
            />
          )}

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

          {tipoPoliza === "GMM" && (
            <CamposRegistroGMM
              alCambiarNumeroDePoliza={alCambiarNumeroDePoliza}
              alCambiarInciso={alCambiarInciso}
              focoPoliza={focoPoliza}
              focoInciso={focoInciso}
              polizaState={polizaState}
              incisoState={incisoState}
              persistirNumSeriePoliza={persistirNumSeriePoliza}
              asignarValorMostrarModalPoliza={asignarValorMostrarModalPoliza}
              alCambiarRFC={alCambiarRFC}
              focoRFC={focoRFC}
              rfcState={rfcState}
              asignarValorMostrarModalRFC={asignarValorMostrarModalRFC}
              errorPoliza={errorPoliza}
              errorRFC={errorRFC}
              alDesenfocarRFC={alDesenfocarRFC}
              enDesenfocarMascara={enDesenfocarMascara}
            />
          )}
        </Suspense>

        <CampoTexto
          id="campoTelefono"
          etiqueta={diccionario.etiquetaTelefono}
          enCambio={alCambiarTelefono}
          enDesenfocar={alDesenfocarTelefono}
          foco={focoTelefono}
          valor={valores.telefono}
          marcador="555 456 5667"
          numeroDeCaracteres={10}
          expresionRegular={/^(\s*|\d+)$/}
        />
        {errorTelefono !== "" && (
          <MensajeError id="errorTelefono">{errorTelefono}</MensajeError>
        )}
        <SeparadorEspacio />
        <FormularioContrasena
          etiquetaContrasena="Nueva contraseña"
          etiquetaRepetirContrasena="Repetir contraseña"
          boton="Completar registro"
          accionBoton={hacerValidaciones}
          nuevaContrasena={valores.contrasenia}
          repetirNuevaContrasena={valores.confirmarContrasenia}
          poliza={valores.poliza}
          validacionAdicional={valores.validaValores}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};
export default PantallaRegistroUsuario;

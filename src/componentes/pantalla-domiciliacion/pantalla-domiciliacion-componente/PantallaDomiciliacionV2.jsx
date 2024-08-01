/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { loader } from "graphql.macro";
import { useQuery, useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router-dom";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  EnvolvedorPantalla,
  Pantalla,
  Contenedor,
  TituloPantalla,
  PieDePagina,
  ContenedorBoton,
  Formulario,
  Mayusculas,
  MensajeError,
  IFrameContainer,
  Informative,
  InformativeText
} from "./PantallaDomiciliacion.styled";
import EncabezadoDomiciliacion from "../../encabezado-domiciliacion";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
import Constantes from "../../../recursos/constantes";
import CampoTexto from "../../campo-texto";
import { FormHelperText, formLabelClasses } from "@mui/material";
import { Select, SelectWitchSearch } from "../../select";
import { Alerta } from "../../alerta";
import {
  configAlertaErrorNombreUsuario,
  configAlertaDomiciliado,
  configAlertaErrorCatalogo
} from "./opciones";
import diccionario from "./diccionario";
import useAlerta from "../../../utils/useAlerta";
import {
  validarTarjetaHabiente,
  validarBanco,
  validarTipoCuenta,
  validarCuentaCLABE,
  validarConfirmarCuentaCLABE
} from "./validaciones";
import useRedirect from "../../../utils/useRedirect";
import { configAlertaError, isSignedError } from "../../../utils/errors";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import "./estilos.scss";
import useAccionesLog from "../../../utils/useAccionesLog";
import Autocomplete from "@mui/material/Autocomplete";
import { themeStepper, buttonStyle } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Box,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectMUI
} from "@mui/material";
import { styled } from "@mui/material/styles";
// ARCHIVOS DE QUERIES

const OBTENER_CAT_BANCOS = loader(
  "../../../graphQL/query/domiciliacion/endoso_catalogoBancos.graphql"
);
const OBTENER_CAT_TIPO_CUENTAS = loader(
  "../../../graphQL/query/domiciliacion/endoso_catalogoTipoCuentas.graphql"
);
const OBTENER_CAT_TIPO_TARJETAS = loader(
  "../../../graphQL/query/domiciliacion/endoso_catalogoTipoTarjetas.graphql"
);
const OBTENER_CAT_INSTRUMENTOS = loader(
  "../../../graphQL/query/domiciliacion/endoso_CatalogoInstrumentosPago.graphql"
);

const CONDUCTO_COBRO_AUTOS = loader(
  "../../../graphQL/query/endoso/endoso_condutoCobroAutos.graphql"
);
const CONDUCTO_COBRO_DANOS = loader(
  "../../../graphQL/query/endoso/endoso_condutoCobroDanos.graphql"
);
const SUSCRIPCION_NOTIFICACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const valores = {
  tarjetaHabiente: "",
  numeroTarjeta: "",
  confirmarNumeroTarjeta: "",
  emisor: "",
  mesTarjeta: "",
  anioTarjeta: "",
  tipoCuenta: "",
  cuentaCLABE: "",
  confirmarCuentaCLABE: "",
  ubicacion: {}
};

// ! PCI v1.0
const tokenize = {
  completado: false,
  nbResponse: "",
  token: "",
  tkn_reference: ""
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaDomiciliacionV2 = () => {
  // const iconoContrasenaNoVisible = <IconoNoVisible />;
  // const iconoContrasenaVisible = <IconoVisible />;

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  }));
  const LargeIcon = styled(CheckCircleRoundedIcon)`
    font-size: 48px;
    color: #65a518; /* Cambia el color según tus necesidades */
  `;

  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  // console.log("estadoApp:", estadoApp);
  const [cargando, asignarValorCargando] = useState(false);
  const location = useLocation();
  const { redirectRoot, redirectMisPolizas, goBack } = useRedirect();
  const {
    runEnterLog,
    runSuccesLog,
    runCancelLog,
    runNoConcludeTransactionLog
  } = useAccionesLog(estadoApp?.informacionContacto.telefono || "");
  const history = useHistory();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    redirectRoot();
  }
  const alertaErrorNombreUsuario = useAlerta(configAlertaErrorNombreUsuario);
  const alertaErrorDomiciliacion = useAlerta(configAlertaError);
  const alertaErrorCatalogo = useAlerta(configAlertaErrorCatalogo);

  let poliza = {};
  let detallePoliza = {};
  let tipo = "Tarjeta";
  let cuentaHabiente = {};
  let nombreUsuario = "";
  let totalDomiciliar;
  var fechaTermino;

  // ESTADO
  const [tipoMensajeAlerta, asignarValorTipoMensajeAlerta] = useState("error");
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [emisor, asignarEmisor] = useState("");
  const [banco, asignarBanco] = useState("");
  const [tipoCuenta, asignarTipoCuenta] = useState("");
  // Estado de catalogos
  const [catalogoBancos, setCatalogoBancos] = useState([]);
  const [catalogoTipoTarjetas, setCatalogoTipoTarjetas] = useState([]);
  const [catalogoTipoCuentas, setCatalogoTipoCuentas] = useState([]);

  // * ==== PCI iFrame =====
  const urlFrame = process.env.REACT_APP_URL_FRAME;
  const [value, setValue] = useState(null); // la lista de bancos...
  const [filteredOptions, setFilteredOptions] = useState([]);
  // ***** Stepper *****
  const steps = ["Tokeniza tu tarjeta", "Completa la información del banco"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [flagStep, setFlagStep] = useState(true);
  const [disabledFrame, setDisableFrame] = useState(false);
  useEffect(() => {
    runEnterLog(1);
  }, []);

  const limpiarCamposTarjeta = () => {
    dispatch({
      type: "AGREGAR",
      valor: {
        data: ""
      },
      indice: "ctNumeroTarjeta"
    });
    dispatch({
      type: "AGREGAR",
      valor: {
        data: ""
      },
      indice: "ctConfirmarNumeroTarjeta"
    });
  };

  const limpiarValores = () => {
    valores.tarjetaHabiente = "";
    valores.numeroTarjeta = "";
    valores.confirmarNumeroTarjeta = "";
    limpiarCamposTarjeta();
    valores.emisor = "";
    valores.mesTarjeta = "";
    valores.anioTarjeta = "";
    valores.tipoCuenta = "";
    valores.cuentaCLABE = "";
    valores.confirmarCuentaCLABE = "";
    valores.ubicacion = {};
  };

  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";
  const rellenarCampos = () => {
    //console.log(cuentaHabiente)
    const {
      // fechaExpiracion, // done
      // idBanco,
      // idTipoBanco,
      idTipoTarjeta,
      nombreTarjetaHabiente, // done
      // numeroTarjeta,
      rfc
    } = cuentaHabiente;

    if (tipo !== "Tarjeta") {
      if (valores.tarjetaHabiente == "") {
        valores.tarjetaHabiente = nombreTarjetaHabiente;
      }
      if (emisor == "" && catalogoTipoTarjetas.length > 0) {
        let tarjeta = catalogoTipoTarjetas.find(
          (el) => el.id == idTipoTarjeta
        )?.nombre;
        asignarEmisor(tarjeta);
        valores.emisor = tarjeta;
      }
      if (banco == "" && catalogoBancos.length > 0) {
        asignarEmisor(banco);
        valores.emisor = banco;
      }
    }
  };

  if (
    !location.state?.poliza &&
    !location.state?.detallePoliza &&
    !location.state.totalDomiciliar
  ) {
    redirectMisPolizas();
  }

  poliza = location.state.poliza;
  detallePoliza = location.state.detallePoliza;
  tipo = location.state.tipo;
  cuentaHabiente = location.state.cuentaHabiente;
  nombreUsuario = detallePoliza.titularPoliza;
  totalDomiciliar = location.state.totalDomiciliar;
  fechaTermino = location.state.fechaTermino;
  const alertaDomiciliado = useAlerta(
    { ...configAlertaDomiciliado },
    (configAlertaDomiciliado.textoCuerpoJsx = `¡Listo! tu siguiente cargo se realizará automáticamente el: ${fechaTermino}`)
  );

  if (cuentaHabiente) {
    rellenarCampos();
  } else {
    if (banco || emisor) {
    } else {
      limpiarValores();
    }
  }

  // TODO: alerta
  useEffect(() => {
    if (tipo !== "Tarjeta") {
      if (nombreUsuario === "") {
        alertaErrorNombreUsuario.mostrar();
      }
      if (!banco || !emisor) {
        limpiarValores();
      }
      console.log("Renderizando nombreUsuario, banco, emisor");
    }
  }, [nombreUsuario, banco, emisor, tipo]);

  // * GRAPHQL QUERIES
  const { data: dataBancos, loading: loadingBancos } = useQuery(
    OBTENER_CAT_BANCOS,
    {
      fetchPolicy: "cache-and-network"
    }
  );
  const { data: dataTipoTarjetas, loading: loadingTipoTarjetas } = useQuery(
    OBTENER_CAT_TIPO_TARJETAS,
    {
      fetchPolicy: "cache-and-network"
    }
  );

  // *** Eventos ***
  const {
    data: eventosSuscription,
    loading: loadingSuscription,
    error: errorSuscription
  } = useSubscription(SUSCRIPCION_NOTIFICACIONES, {
    variables: { numeroReporte: 0 }
  });

  const [
    domiciliarAuto,
    {
      data: dataDomiciliarAuto,
      loading: loadingDomiciliarAuto,
      error: errorDomiciliarAuto
    }
  ] = useLazyQuery(CONDUCTO_COBRO_AUTOS);
  const [
    domiciliarDano,
    {
      data: dataDomiciliarDano,
      loading: loadingDomiciliarDano,
      error: errorDomiciliarDano
    }
  ] = useLazyQuery(CONDUCTO_COBRO_DANOS);

  // ***** Focos *****
  const [focoTarjetaHabiente, asignarValorFocoTarjetaHabiente] = useState("");
  // const [focoTipoTarjeta, asignarValorFocoTipoTarjeta] = useState("");
  const [focoBanco, asignarValorFocoBanco] = useState("");
  const [focoTipoCuenta, asignarValorFocoTipoCuenta] = useState("");
  const [focoCuentaCLABE, asignarValorFocoCuentaCLABE] = useState("");
  const [focoConfirmarCuentaCLABE, asignarValorFocoConfirmarCuentaCLABE] =
    useState("");

  // **** Completados ****

  const [completadoTarjetaHabiente, asignarValorCompletadoTarjetaHabiente] =
    useState("");
  const [completadoTipoTarjeta, asignarValorCompletadoTipoTarjeta] =
    useState("");
  const [completadoBanco, asignarValorCompletadoBanco] = useState("");
  const [completadoTipoCuenta, asignarValorCompletadoTipoCuenta] = useState("");
  const [completadoCuentaCLABE, asignarValorCompletadoCuentaCLABE] =
    useState("");
  const [
    completadoConfirmarCuentaCLABE,
    asignarValorCompletadoConfirmarCuentaCLABE
  ] = useState("");
  // **** Errores ****
  const [errorTarjetaHabiente, asignarErrorTarjetaHabiente] = useState("");
  const [errorTipoTarjeta, asignarErrorTipoTarjeta] = useState(false);
  const [errorBank, setErrorBank] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [errorBanco, asignarErrorBanco] = useState("");
  const [errorTipoCuenta, asignarErrorTipoCuenta] = useState("");
  const [errorCuentaCLABE, asignarErrorCuentaCLABE] = useState("");
  const [errorConfirmarCuentaCLABE, asignarErrorConfirmarCuentaCLABE] =
    useState("");
  // **** token ***
  // const [tokenize, setTokenize] = useState({});
  // TODO: Eventos
  const alCambiarTarjetaHabiente = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.tarjetaHabiente = valor;
    }
  };

  const alCambiarEmisor = (propiedad, e) => {
    valores.emisor = e.target.value;
    console.log("al cambiar emisor:", e.target.value);
    asignarEmisor(e.target.value);
  };

  const alCambiarBanco = (bank) => {
    valores.banco = bank;
    console.log("banco:", bank);
    asignarBanco(bank);
  };

  const alCambiarTipoCuenta = (tipo) => {
    valores.tipoCuenta = tipo;
    asignarTipoCuenta(tipo);
  };

  const alCambiarCuentaCLABE = (evento) => {
    if (evento) {
      valores.cuentaCLABE = evento.target.value;
    }
  };

  const alCambiarConfirmarCuentaCLABE = (evento) => {
    if (evento) {
      valores.confirmarCuentaCLABE = evento.target.value;
    }
  };

  // ******* Validaciones (botón de domiciliación) *******
  const limpiarValidaciones = () => {
    asignarValorCompletadoTarjetaHabiente(false);
    asignarValorCompletadoBanco(false);
    asignarValorCompletadoTipoCuenta(false);
    asignarValorCompletadoCuentaCLABE(false);
    asignarValorCompletadoConfirmarCuentaCLABE(false);
    asignarValorCompletadoTipoTarjeta(false);
  };

  // ! Revolution here!
  const hacerValidaciones = () => {
    // if (tipo === "Tarjeta") {
    //   validacionesTarjeta();
    // } else {
    limpiarValidaciones();
    validarTarjetaHabiente(nombreUsuario, diccionario.errores).then(
      (respuesta) => {
        asignarValorFocoTarjetaHabiente(respuesta.foco);
        asignarErrorTarjetaHabiente(respuesta.error);
        asignarValorCompletadoTarjetaHabiente(respuesta.valida);
      }
    );
    validarBanco(banco, diccionario.errores).then((respuesta) => {
      asignarValorFocoBanco(respuesta.foco);
      asignarValorCompletadoBanco(respuesta.valida);
      asignarErrorBanco(respuesta.error);
    });
    validacionesCLABE();
    //}
  };

  // ! Este no se mueve, creo...
  const validacionesCLABE = () => {
    const { cuentaCLABE, confirmarCuentaCLABE } = valores;
    validarTipoCuenta(tipoCuenta, diccionario.errores).then((respuesta) => {
      asignarValorFocoTipoCuenta(respuesta.foco);
      asignarValorCompletadoTipoCuenta(respuesta.valida);
      asignarErrorTipoCuenta(respuesta.error);
    });
    validarCuentaCLABE(cuentaCLABE, diccionario.errores).then((respuesta) => {
      asignarValorFocoCuentaCLABE(respuesta.foco);
      asignarValorCompletadoCuentaCLABE(respuesta.valida);
      asignarErrorCuentaCLABE(respuesta.error);
    });
    validarConfirmarCuentaCLABE(
      cuentaCLABE,
      confirmarCuentaCLABE,
      diccionario.errores
    ).then((respuesta) => {
      asignarValorFocoConfirmarCuentaCLABE(respuesta.foco);
      asignarValorCompletadoConfirmarCuentaCLABE(respuesta.valida);
      asignarErrorConfirmarCuentaCLABE(respuesta.error);
    });
  };

  // const validacionesTarjeta = () => {
  //   console.log({
  //     banco: banco,
  //     tipoTarjeta: emisor,
  //     token_ref: tokenize.tkn_reference,
  //     token: tokenize.token
  //   });
  //   asignarErrorTipoTarjeta(emisor === "");
  //   setErrorBank(banco === "");
  //   if (tokenize.tkn_reference === "" && tokenize.token === "") {
  //     setErrorCard(true);
  //   } else {
  //     setErrorCard(false);
  //   }
  // };
  // ! DOMICILIACION DAÑOS
  const lanzarDomiciliarDano = (rfc, numeroTelefono, latitud, longitud) => {
    let numeroTarjeta = estadoApp.ctNumeroTarjeta.data;
    let confirmarNumeroTarjeta = estadoApp.ctConfirmarNumeroTarjeta.data;
    const tipoCorregido = tipo === "Tarjeta" ? "TARJETA DE CREDITO" : tipo;
    const variables = {
      variables: {
        tipoEndoso: tipoCorregido,
        numeroReporte: 0,
        numeroPoliza: poliza.poliza,
        certificado: parseInt(poliza.inciso),
        lineaNegocio: poliza.lineaNegocio,
        agencia: poliza.oficina,
        nombreTarjetaHabiente: tokenize.tkn_reference,
        banco: catalogoBancos?.find((b) => b.nombre == banco).id,
        tipoTarjeta:
          catalogoTipoTarjetas?.find((el) => el.nombre == emisor)?.id || "",
        numeroTarjeta: tokenize.token, // ?
        confirmaNumeroTarjeta: tokenize.token, // ?
        fechaExpiracion: "01/99", // ?
        tipoCuenta:
          catalogoTipoCuentas?.find((el) => el.nombre == tipoCuenta)?.id || "",
        cuentaClabe: valores.cuentaCLABE,
        confirmaClabe: valores.confirmarCuentaCLABE,
        rfc,
        domiciliarPago: true,
        latitud: `${longitud}`,
        longitud: `${latitud}`,
        numeroTelefono,
        token: objetoCookie.access_token
      }
    };

    asignarValorCargando(true);
    domiciliarDano(variables);
  };
  // ! DOMICILIACION AUTOS
  const lanzarDomiciliarAuto = (rfc, numeroTelefono, latitud, longitud) => {
    domiciliarAuto({
      variables: {
        tipoEndoso: tipo,
        numeroReporte: 0,
        numeroPoliza: poliza.poliza,
        certificado: parseInt(poliza.inciso),
        lineaNegocio: poliza.lineaNegocio,
        agencia: poliza.oficina,
        nombreTarjetaHabiente: tokenize.tkn_reference, // ?
        banco: catalogoBancos?.find((b) => b.nombre == banco).id,
        tipoTarjeta:
          catalogoTipoTarjetas?.find((el) => el.nombre == emisor)?.id || "",
        numeroTarjeta: tokenize.token, // ?
        confirmaNumeroTarjeta: tokenize.token, // ?
        fechaExpiracion: "01/99", // ?
        tipoCuenta:
          catalogoTipoCuentas?.find((el) => el.nombre == tipoCuenta)?.id || "",
        cuentaClabe: valores.cuentaCLABE,
        confirmaClabe: valores.confirmarCuentaCLABE,
        rfc,
        domiciliarPago: true,
        latitud: `${longitud}`,
        longitud: `${latitud}`,
        numeroTelefono,
        token: objetoCookie.access_token
      }
    });
  };

  // ******* Effects para domiciliación *******

  const arregloCompletadosPorTipo = () => {
    let COMPLETADOS_TARJETA = [
      banco,
      emisor,
      tokenize.token,
      tokenize.tkn_reference
    ];
    let COMPLETADOS_CLABE = [
      completadoTipoCuenta,
      completadoCuentaCLABE,
      completadoConfirmarCuentaCLABE,
      completadoTarjetaHabiente,
      completadoBanco,
      completadoTipoTarjeta
    ];
    if (tipo === "Tarjeta") {
      return COMPLETADOS_TARJETA;
    } else {
      return COMPLETADOS_CLABE;
    }
  };

  useEffect(() => {
    if (tipo !== "Tarjeta") {
      let COMPLETADOS = arregloCompletadosPorTipo();
      if (COMPLETADOS.every((valor) => valor === true)) {
        asignarValorCargando(true);
        let rfc = estadoApp?.campoAlertaCampo?.data;
        let numeroTelefono =
          estadoApp?.informacionContacto?.telefono || usuario;
        let latitud = estadoApp?.geolocalizacion?.latitud;
        let longitud = estadoApp?.geolocalizacion?.longitud;
        // TODO:

        if (poliza.lineaNegocio === "AUTR") {
          lanzarDomiciliarAuto(rfc, numeroTelefono, latitud, longitud);
        } else {
          lanzarDomiciliarDano(rfc, numeroTelefono, latitud, longitud);
        }
      }
    }
  }, [
    completadoTipoCuenta,
    completadoCuentaCLABE,
    completadoConfirmarCuentaCLABE,
    completadoTarjetaHabiente,
    completadoBanco,
    completadoTipoTarjeta,
    tipo
  ]);

  // **** EFFECTS CATALOGOS BANCO Y TARJETAS ****

  useEffect(() => {
    if (!loadingBancos && dataBancos) {
      if (dataBancos?.endoso_catalogoBancos?.dato) {
        // Se obtuvo el catalogo
        let catalogo = [];
        dataBancos.endoso_catalogoBancos.dato.forEach((el) =>
          catalogo.push({ nombre: el.nombreBanco, id: el.idBanco })
        );
        // console.log(catalogo);
        const arrayWithNoDuplicates = catalogo.filter(
          (item, index, self) =>
            index === self.findIndex((i) => i.nombre === item.nombre)
        );
        setFilteredOptions(arrayWithNoDuplicates);
        setCatalogoBancos(arrayWithNoDuplicates);
        if (cuentaHabiente) {
          let banco = catalogo.find(
            (el) => el.id == cuentaHabiente.idBanco
          )?.nombre;
          asignarBanco(banco);
          valores.banco = banco;
        }
      } else {
        // La respuesta viene en null y por lo tanto hubo un error
        alertaErrorCatalogo.mostrar();
        asignarValorMensajeAlerta(diccionario.errores.errorEnCarga);
        asignarValorMostrarBarraAlerta(true);
      }
    } else {
      asignarValorCargando(true);
    }
  }, [dataBancos, loadingBancos]);

  useEffect(() => {
    if (!loadingTipoTarjetas && dataTipoTarjetas) {
      if (dataTipoTarjetas?.endoso_catalogoTipoTarjetas?.dato) {
        // Se obtuvo el catalogo
        let catalogo = [];
        dataTipoTarjetas.endoso_catalogoTipoTarjetas.dato.forEach((el) =>
          catalogo.push({ nombre: el.nombreTipoTarjeta, id: el.idTipoTarjeta })
        );
        setCatalogoTipoTarjetas(catalogo);
        if (cuentaHabiente) {
          let tarjeta = catalogo.find(
            (el) => el.id == cuentaHabiente.idTipoTarjeta
          )?.nombre;
          asignarEmisor(tarjeta);
          valores.emisor = tarjeta;
        }
      } else {
        // La respuesta viene en null y por lo tanto hubo un error
        alertaErrorCatalogo.mostrar();
        asignarValorMensajeAlerta(diccionario.errores.errorEnCarga);
        asignarValorMostrarBarraAlerta(true);
      }
    } else {
      asignarValorCargando(true);
    }
  }, [dataTipoTarjetas, loadingTipoTarjetas]);

  useEffect(() => {
    if (loadingBancos == true || loadingTipoTarjetas == true) {
      asignarValorCargando(true);
    } else {
      asignarValorCargando(false);
    }
  }, [loadingBancos, loadingTipoTarjetas]);

  const revisarDomiciliacionCompletada = () => {
    if (
      eventosSuscription &&
      eventosSuscription.escucha_evento_actualizacion_reporte &&
      eventosSuscription.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      const evento = eventosSuscription.escucha_evento_actualizacion_reporte;
      console.log(evento);
      if (evento.tipoMensaje === 23) {
        const valorNotificacion = obtenerValorDeArregloDeStrings(
          evento.dato.descripciones,
          "Guardado: "
        );
        if (valorNotificacion !== "True") {
          asignarValorCargando(false);
          alertaErrorDomiciliacion.settextoCuerpoJsx(
            "No se pudo generar tu domiciliacion"
          );
          alertaDomiciliado.mostrar();
          const arrayListaDetalle = [
            {
              columna: "causa",
              valor: "error en transaccion - servicios"
            },
            {
              columna: "importe",
              valor: totalDomiciliar || ""
            }
          ];
          runNoConcludeTransactionLog(1, "causa", "", "", arrayListaDetalle);
          return;
        }
        // Una vez llega la notificacion y su valor es True, todo se registro correctamente y procedo a mostrar modal exitoso
        console.log("Evento de notif domiciliación:", evento);
        const listaDetalle = [{ columna: "importe", valor: totalDomiciliar }];
        runSuccesLog(1, listaDetalle);
        console.log("Llego aquí");
        asignarValorCargando(false);
        limpiarValores();
        alertaDomiciliado.mostrar();
      }
    }
  };

  // ******* DOMICILIACIÓN DAÑOS *******
  useEffect(() => {
    console.log("Loading suscription=", loadingSuscription);
    if (!loadingSuscription && eventosSuscription && !errorSuscription) {
      console.log(eventosSuscription);
      revisarDomiciliacionCompletada();
    }
    console.log("Renderizando suscription");
  }, [eventosSuscription, loadingSuscription, errorSuscription]);

  useEffect(() => {
    console.log("Data daños:", dataDomiciliarDano);
    if (!loadingDomiciliarAuto) {
      asignarValorCargando(false);
      if (dataDomiciliarDano) {
        // !!!!!!!!!!!!!!!!!!!!!!!!
        const res = dataDomiciliarDano?.endoso_condutoCobroDanos;
        console.log("A ver, respondeme servicio de daños:", res);
        if (res.completado) {
          asignarValorCargando(false);
          limpiarValores();
          const arrayListaDetalle = [
            {
              columna: "importe",
              valor: totalDomiciliar || ""
            }
          ];
          runSuccesLog(1, arrayListaDetalle);
          alertaDomiciliado.mostrar();
        } else {
          limpiarValores();
          const arrayListaDetalle = [
            {
              columna: "causa",
              valor: "error en transaccion - servicios"
            },
            {
              columna: "importe",
              valor: totalDomiciliar || ""
            }
          ];
          runNoConcludeTransactionLog(1, arrayListaDetalle);
          if (isSignedError(res.mensaje)) {
            alertaErrorDomiciliacion.settextoCuerpoJsx(res.mensaje);
            asignarValorCargando(false);
          }
          alertaErrorDomiciliacion.mostrar();
        }
      } else if(errorDomiciliarDano) {

        console.log('errorDomiciliarDano.message', errorDomiciliarDano.message);

        limpiarValores();
        const arrayListaDetalle = [
          {
            columna: "GeneraEndosoDanos",
            valor: "error en transaccion - servicios"
          },
          {
            columna: "importe",
            valor: errorDomiciliarDano.message || ""
          }
        ];

        runNoConcludeTransactionLog(1, arrayListaDetalle);

        if(isSignedError(errorDomiciliarDano.message)) {
          alertaErrorDomiciliacion.settextoCuerpoJsx(errorDomiciliarDano.message);
          asignarValorCargando(false);
        }

        alertaErrorDomiciliacion.mostrar();
      }
    } else {
      asignarValorCargando(true);
    }
  }, [dataDomiciliarDano, loadingDomiciliarDano, errorDomiciliarDano]);

  // ******* DOMICILIACIÓN AUTOS Y FECHA DE REC PENDIENTE *******

  // ! loading domiciliacion
  useEffect(() => {
    if (!loadingDomiciliarAuto) {
      asignarValorCargando(false);
      if (dataDomiciliarAuto) {
        let res = dataDomiciliarAuto?.endoso_condutoCobroAutos;
        if (dataDomiciliarAuto?.endoso_condutoCobroAutos?.dato) {
          if (res.completado) {
            limpiarValores();
            const arrayListaDetalle = [
              {
                columna: "importe",
                valor: totalDomiciliar || ""
              }
            ];
            runSuccesLog(1, arrayListaDetalle);
            alertaDomiciliado.mostrar();
          } else {
            limpiarValores();
            const arrayListaDetalle = [
              {
                columna: "causa",
                valor: "error en transaccion - servicios"
              },
              {
                columna: "importe",
                valor: totalDomiciliar || ""
              }
            ];
            runNoConcludeTransactionLog(1, arrayListaDetalle);
            if (isSignedError(res.mensaje)) {
              alertaErrorDomiciliacion.settextoCuerpoJsx(res.mensaje);
            }
            alertaErrorDomiciliacion.mostrar();
          }
        } else {
          limpiarValores();
          const listaDetalle = [
            { columna: "importe", valor: totalDomiciliar || "" }
          ];
          runNoConcludeTransactionLog(1, listaDetalle);
          if (isSignedError(res?.mensaje)) {
            alertaErrorDomiciliacion.settextoCuerpoJsx(res.mensaje);
          }
          alertaErrorDomiciliacion.mostrar();
        }
      }
    } else {
      asignarValorCargando(true);
    }
  }, [dataDomiciliarAuto, loadingDomiciliarAuto, errorDomiciliarAuto]);

  // **** handle iFrame ****
  useEffect(() => {
    if (tipo === "Tarjeta") {
      const receiveMessage = (event) => {
        if (event.origin !== urlFrame) return;

        const receivedMessage = event.data;
        console.log(" >>> Mensaje recibido en el padre:", receivedMessage);
        if (receiveMessage) {
          try {
            const parsedMessage = JSON.parse(receivedMessage);
            console.log("Parsed message:", parsedMessage);

            tokenize.completado = parsedMessage.completado;
            tokenize.nbResponse = parsedMessage.nbResponse;
            tokenize.token = parsedMessage.token;
            tokenize.tkn_reference = parsedMessage.tkn_reference;

            if (tokenize.tkn_reference !== "" && tokenize.token !== "") {
              const temporizador = setTimeout(() => {
                // Después de 3 segundos, cambiamos el estado para mostrar un mensaje
                isStepComplete(0);
                setDisableFrame(parsedMessage.completado); // ! hay que ver esto si jala o nel.
              }, 3000);
            }
          } catch (error) {
            console.log("Error al analizar el mensaje JSON:", error);
          }
        }
      };

      window.addEventListener("message", receiveMessage);

      return () => {
        window.removeEventListener("message", receiveMessage);
      };
    }
  }, [tipo]);

  // ***** Handling autocomplete && send info to endosos *****
  useEffect(() => {
    if (activeStep === 2) {
      if (
        banco !== "" &&
        emisor !== "" &&
        tokenize.token !== "" &&
        tokenize.tkn_reference !== ""
      ) {
        asignarValorCargando(true);
        let rfc = estadoApp?.campoAlertaCampo?.data;
        let numeroTelefono =
          estadoApp?.informacionContacto?.telefono || usuario;
        let latitud = estadoApp?.geolocalizacion?.latitud;
        let longitud = estadoApp?.geolocalizacion?.longitud;

        if (poliza.lineaNegocio === "AUTR") {
          console.log("Acá también. AUTR en marchaaaaaa.");
          lanzarDomiciliarAuto(rfc, numeroTelefono, latitud, longitud);
        } else {
          lanzarDomiciliarDano(rfc, numeroTelefono, latitud, longitud);
        }
      }
    }
  }, [activeStep]);

  const isStepComplete = (step) => {
    const validations = {
      0: !!(tokenize.tkn_reference && tokenize.token),
      1: !!(banco && emisor)
    };
    return !validations[step];
  };

  const handleNextStep = () => {
    if (!isStepComplete(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <div height="25px"></div>
            {disabledFrame === false ? (
              <IFrameContainer>
                <iframe
                  id="iFrameHDI"
                  style={{
                    // filter: disabledFrame ? "blur(2px)" : "", // Aplica la clase de desenfoque si disabledFrame es true
                    border: "none",
                    display: "flex",
                    // opacity: disabledFrame ? 0.5 : 1,
                    // cursor: disabledFrame ? "not-allowed" : "auto", // Cambie el cursor si disabledFrame es true
                    // pointerEvents: disabledFrame ? "none" : "auto", // Evite eventos de ratón si disabledFrame es true
                    // backgroundColor: disabledFrame
                    //   ? "rgba(0, 0, 0, 0.2)"
                    //   : "transparent", // Agregue un fondo semitransparente si disabledFrame es true
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  src={urlFrame}
                  title="iframe pci"
                  width="400"
                  height="520"
                  sandbox="allow-same-origin allow-forms allow-scripts"
                />
              </IFrameContainer>
            ) : (
              <>
                <Informative>
                  {" "}
                  <LargeIcon />
                  <InformativeText>
                    {
                      "Se ha guardado la información de tu tarjeta correctamente. Continúa con el proceso."
                    }
                  </InformativeText>
                </Informative>
              </>
            )}
          </>
        );
      case 1:
        return (
          <Box
            display="grid"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <div height="25px"></div>
            <Box
              gridColumn="span 20"
              justifySelf={{ xs: "center", width: 300 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" key={v4()}>
                  {diccionario.etiqueta.tipoTarjeta}
                </InputLabel>
                <SelectMUI
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={emisor}
                  label={diccionario.etiqueta.tipoTarjeta}
                  onChange={(e) => alCambiarEmisor("emisor", e)}
                >
                  {catalogoTipoTarjetas.map((item) => (
                    <MenuItem key={v4()} value={item.nombre}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </SelectMUI>
              </FormControl>
              {errorTipoTarjeta && (
                <FormHelperText>Debes seleccionar una opción.</FormHelperText>
              )}
            </Box>
            <Box gridColumn="span 20" justifySelf={{ xs: "center" }}>
              <>
                <Autocomplete
                  sx={{ width: 300 }}
                  disablePortal
                  id="combo-box-demo"
                  options={catalogoBancos}
                  getOptionLabel={(option) => option.nombre || ""}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    alCambiarBanco(newValue ? newValue.nombre : "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Banco" />
                  )}
                />
                {errorBank && (
                  <FormHelperText>Debe seleccionar una opción.</FormHelperText>
                )}
              </>
            </Box>
          </Box>
        );
      default:
        return "Hubo un error. Intente de nuevo.";
    }
  };

  // **** Obtener título para el front. ****
  const obtenerTitulo = (lineaNegocio) => {
    const cadena = "Completa la información de tu póliza de ";
    if (lineaNegocio === "AUTR") {
      return cadena + "Autos: ";
    }

    return cadena + "Daños: ";
  };
  return (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        {...alertaErrorNombreUsuario}
        manejarCierre={() => {
          goBack();
        }}
        funcionLlamadaBoton={() => {
          goBack();
        }}
      />
      <Alerta
        {...alertaErrorDomiciliacion}
        manejarCierre={() => {
          alertaErrorDomiciliacion.cerrar();
          goBack();
        }}
        funcionLlamadaBoton={() => {
          alertaErrorDomiciliacion.cerrar();
          goBack();
        }}
      />
      <Alerta
        {...alertaDomiciliado}
        manejarCierre={() => {
          alertaDomiciliado.cerrar();
          history.push({
            pathname: "/detalle-poliza",
            state: { domiciliado: true }
          });
        }}
        funcionLlamadaBoton={() => {
          alertaDomiciliado.cerrar();
          // goBack();
          const listaDetalle = [
            { columna: "importe", valor: totalDomiciliar || "no hay" }
          ];
          runCancelLog(1, listaDetalle);
          history.push({
            pathname: "/detalle-poliza",
            state: { domiciliado: true }
          });
        }}
      />
      <Alerta
        {...alertaErrorCatalogo}
        manejarCierre={() => {
          goBack();
        }}
        funcionLlamadaBoton={() => {
          alertaDomiciliado.cerrar();
          goBack();
        }}
      />
      <EncabezadoDomiciliacion poliza={poliza} detallePoliza={detallePoliza} />
      <Pantalla>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo={tipoMensajeAlerta}
          posicionAbsoluta
        />

        <Contenedor>
          <TituloPantalla id="titulo">
            {obtenerTitulo(poliza.lineaNegocio)}
          </TituloPantalla>

          <Formulario>
            {tipo === "Tarjeta" ? (
              <>
                {/* ===================================== 
                    CAMPOS DE DOMICILIACION POR TARJETA
                   =====================================
                */}
                <ThemeProvider theme={themeStepper}>
                  <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={activeStep}>
                      {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Box>
                  {activeStep === steps.length ? (
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Pasos completados. Espere por favor...
                      </Typography>
                    </>
                  ) : (
                    <>{getStepContent(activeStep)}</>
                  )}
                </ThemeProvider>
              </>
            ) : (
              <>
                {/* =================================== 
                    CAMPOS DE DOMICILIACION POR CLABE (CUENTA DE CHEQUES)
                   ===================================
                */}
                <Mayusculas>
                  <CampoTexto
                    id="campoTarjetaHabiente"
                    domiciliacion={true}
                    etiqueta={diccionario.etiqueta.tarjetaHabiente}
                    enCambio={alCambiarTarjetaHabiente}
                    foco={focoTarjetaHabiente}
                    valor={nombreUsuario}
                    editable={false}
                    expresionRegular={/(^[a-zA-Z\s]+$|^$)/}
                  />
                </Mayusculas>
                <MensajeError id="errorTarjetaHabiente">
                  {errorTarjetaHabiente}
                </MensajeError>

                <SelectWitchSearch
                  etiqueta={diccionario.etiqueta.banco}
                  enCambio={alCambiarBanco}
                  foco={focoBanco}
                  valor={banco}
                  index={99}
                  tipo="Mediano"
                  opciones={catalogoBancos}
                  inputholder="Seleccionar"
                />
                <MensajeError id="errorBanco">{errorBanco}</MensajeError>
                <Select
                  etiqueta={diccionario.etiqueta.tipoCuenta}
                  enCambio={alCambiarTipoCuenta}
                  foco={focoTipoCuenta}
                  valor={tipoCuenta}
                  index={98}
                  tipo="Compacto"
                  opciones={catalogoTipoCuentas}
                  inputholder="Seleccionar"
                />
                <MensajeError id="errorTipoCuenta">
                  {errorTipoCuenta}
                </MensajeError>

                <CampoTexto
                  id="CLABE"
                  etiqueta={diccionario.etiqueta.cuentaCLABE}
                  enCambio={alCambiarCuentaCLABE}
                  foco={focoCuentaCLABE}
                  valor={valores.cuentaCLABE}
                  numeroDeCaracteres={18}
                  expresionRegular={/(^[0-9]+$|^$)/}
                />
                <MensajeError>{errorCuentaCLABE}</MensajeError>

                <CampoTexto
                  id="comfirmarCLABE"
                  etiqueta={diccionario.etiqueta.confirmarCuentaClabe}
                  enCambio={alCambiarConfirmarCuentaCLABE}
                  foco={focoConfirmarCuentaCLABE}
                  valor={valores.confirmarCuentaCLABE}
                  numeroDeCaracteres={18}
                  expresionRegular={/(^[0-9]+$|^$)/}
                />
                <MensajeError>{errorConfirmarCuentaCLABE}</MensajeError>
              </>
            )}
          </Formulario>
        </Contenedor>
      </Pantalla>
      {tipo !== "Tarjeta" ? (
        <>
          <PieDePagina>
            <ContenedorBoton>
              <Boton
                etiqueta={diccionario.etiquetaBotonDomiciliar}
                tema="estandar"
                enClick={hacerValidaciones}
              />
            </ContenedorBoton>
          </PieDePagina>
        </>
      ) : (
        <>
          <PieDePagina>
            <ContenedorBoton>
              <ThemeProvider theme={buttonStyle}>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {activeStep !== 0 && (
                    <Button
                      color="inherit"
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBackStep}
                      sx={{ mr: 1 }}
                    >
                      Atrás
                    </Button>
                  )}
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    id="next-button-parent"
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={isStepComplete(activeStep)}
                  >
                    {activeStep === steps.length - 1
                      ? "Domiciliar Pago"
                      : "Siguiente"}
                  </Button>
                </Box>
              </ThemeProvider>
            </ContenedorBoton>
          </PieDePagina>
        </>
      )}
    </EnvolvedorPantalla>
  );
};

export default PantallaDomiciliacionV2;

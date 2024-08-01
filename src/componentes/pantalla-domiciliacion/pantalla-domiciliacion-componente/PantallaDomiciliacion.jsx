/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { loader } from "graphql.macro";
import { useQuery, useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router-dom";
import IconoVisible from "@material-ui/icons/VisibilityRounded";
import IconoNoVisible from "@material-ui/icons/VisibilityOffRounded";
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
  Etiqueta,
  ContenedorFechaTarjeta,
  ContenedorMitad,
  Elemento,
} from "./PantallaDomiciliacion.styled";
import EncabezadoDomiciliacion from "../../encabezado-domiciliacion";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
import Constantes from "../../../recursos/constantes";
import CampoTexto from "../../campo-texto";
import CampoTarjeta from "../../campo-texto/campo-texto-componente/CampoTarjeta";
import { Select, SelectWitchSearch } from "../../select";
import { Alerta } from "../../alerta";
import {
  opcionesMes,
  configAlertaErrorNombreUsuario,
  configAlertaDomiciliado,
  configAlertaErrorCatalogo,
} from "./opciones";
import diccionario from "./diccionario";
import useAlerta from "../../../utils/useAlerta";

import {
  validarTarjetaHabiente,
  validarNumeroTarjeta,
  validarConfirmarNumeroTarjeta,
  identificarTarjeta,
  validarTipoTarjeta,
  validarBanco,
  validarExpiracionTarjeta,
  validarTipoCuenta,
  validarCuentaCLABE,
  validarConfirmarCuentaCLABE,
} from "./validaciones";
import useRedirect from "../../../utils/useRedirect";
import CamposTarjeta from "./CamposTarjeta";
import { configAlertaError, isSignedError } from "../../../utils/errors";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import { EtiquetaNegro } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import "./estilos.scss";
import useAccionesLog from "../../../utils/useAccionesLog";
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
  ubicacion: {},
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaDomiciliacion = () => {
  const iconoContrasenaNoVisible = <IconoNoVisible />;
  const iconoContrasenaVisible = <IconoVisible />;
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  console.log(estadoApp);
  const [cargando, asignarValorCargando] = useState(false);
  const location = useLocation();
  const { redirectRoot, redirectMisPolizas, goBack } = useRedirect();
  const { runEnterLog, runSuccesLog, runCancelLog, runNoConcludeTransactionLog } = useAccionesLog(estadoApp.informacionContacto.telefono || "");
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
  let fechaTermino;

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


  useEffect(() => {
    runEnterLog(1)

    // return () => {
    //   const listaDetalle = [{"columna": "importe" , "valor": totalDomiciliar}];
    //   runCancelLog(1, listaDetalle);
    // }
  }, [])

  const limpiarCamposTarjeta = () => {
    dispatch({
      type: "AGREGAR",
      valor: {
        data: "",
      },
      indice: "ctNumeroTarjeta",
    });
    dispatch({
      type: "AGREGAR",
      valor: {
        data: "",
      },
      indice: "ctConfirmarNumeroTarjeta",
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
      fechaExpiracion, // done
      idBanco,
      idTipoBanco,
      idTipoTarjeta,
      nombreTarjetaHabiente, // done
      numeroTarjeta,
      rfc,
    } = cuentaHabiente;

    if (valores.mesTarjeta == "") {
      valores.mesTarjeta = fechaExpiracion.split("/")[0];
    }
    if (valores.tarjetaHabiente == "") {
      valores.tarjetaHabiente = nombreTarjetaHabiente;
    }
    if (valores.anioTarjeta == "") {
      valores.anioTarjeta = fechaExpiracion.split("/")[1];
    }
    if (emisor == "" && catalogoTipoTarjetas.length > 0) {
      let tarjeta = catalogoTipoTarjetas.find((el) => el.id == idTipoTarjeta)
        ?.nombre;
      asignarEmisor(tarjeta);
      valores.emisor = tarjeta;
    }
    if (banco == "" && catalogoBancos.length > 0) {
      asignarEmisor(banco);
      valores.emisor = banco;
    }
  };


  if (!location.state?.poliza && !location.state?.detallePoliza && !location.state.totalDomiciliar) {
    redirectMisPolizas();
  }

  poliza = location.state.poliza;
  detallePoliza = location.state.detallePoliza;
  tipo = location.state.tipo;
  cuentaHabiente = location.state.cuentaHabiente;
  nombreUsuario = detallePoliza.titularPoliza;
  totalDomiciliar = location.state.totalDomiciliar;
  fechaTermino = location.state.fechaTermino;

  const alertaDomiciliado = useAlerta({...configAlertaDomiciliado}, configAlertaDomiciliado.textoCuerpoJsx = `¡Listo! tu siguiente cargo se realizará automáticamente el: ${fechaTermino}`);

  if (cuentaHabiente) {
    rellenarCampos();
  } else {
    if (banco || emisor) {
      //limpiarValores();
    } else {
      limpiarValores();
    }
  }

  
  useEffect(() => {
    if (nombreUsuario === "") {
      alertaErrorNombreUsuario.mostrar();
    }
    if (!banco || !emisor) {
      limpiarValores();
    }
  }, []);

  // GRAPHQL QUERIES
  const { data: dataBancos, loading: loadingBancos } = useQuery(
    OBTENER_CAT_BANCOS,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const { data: dataTipoTarjetas, loading: loadingTipoTarjetas } = useQuery(
    OBTENER_CAT_TIPO_TARJETAS,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const { data: eventosSuscription, loading: loadingSuscription, error: errorSuscription } = useSubscription(
    SUSCRIPCION_NOTIFICACIONES,
    {
      variables: { numeroReporte: 0 },
    }
  );

  const [
    domiciliarAuto,
    {
      data: dataDomiciliarAuto,
      loading: loadingDomiciliarAuto,
      error: errorDomiciliarAuto,
    },
  ] = useLazyQuery(CONDUCTO_COBRO_AUTOS);
  const [
    domiciliarDano,
    {
      data: dataDomiciliarDano,
      loading: loadingDomiciliarDano,
      error: errorDomiciliarDano,
    },
  ] = useLazyQuery(CONDUCTO_COBRO_DANOS);

  //Focos
  const [focoTarjetaHabiente, asignarValorFocoTarjetaHabiente] = useState("");
  const [focoNumeroTarjeta, asignarValorFocoNumeroTarjeta] = useState("");
  const [
    focoConfirmarNumeroTarjeta,
    asignarValorFocoConfirmarNumeroTarjeta,
  ] = useState("");
  const [focoTipoTarjeta, asignarValorFocoTipoTarjeta] = useState("");
  const [focoBanco, asignarValorFocoBanco] = useState("");
  const [focoMesTarjeta, asignarValorFocoMesTarjeta] = useState("");
  const [focoAnioTarjeta, asignarValorFocoAnioTarjeta] = useState("");
  const [focoFechaTarjeta, asignarValorFocoFechaTarjeta] = useState("");
  const [focoTipoCuenta, asignarValorFocoTipoCuenta] = useState("");
  const [focoCuentaCLABE, asignarValorFocoCuentaCLABE] = useState("");
  const [
    focoConfirmarCuentaCLABE,
    asignarValorFocoConfirmarCuentaCLABE,
  ] = useState("");

  //Completados
  const [
    completadoTarjetaHabiente,
    asignarValorCompletadoTarjetaHabiente,
  ] = useState("");
  const [
    completadoNumeroTarjeta,
    asignarValorCompletadoNumeroTarjeta,
  ] = useState("");
  const [
    completadoConfirmarNumeroTarjeta,
    asignarValorCompletadoConfirmarNumeroTarjeta,
  ] = useState("");
  const [completadoTipoTarjeta, asignarValorCompletadoTipoTarjeta] = useState(
    ""
  );
  const [completadoBanco, asignarValorCompletadoBanco] = useState("");
  const [completadoMesTarjeta, asignarValorCompletadoMesTarjeta] = useState("");
  const [completadoAnioTarjeta, asignarValorCompletadoAnioTarjeta] = useState(
    ""
  );
  const [completadoFechaTarjeta, asignarValorCompletadoFechaTarjeta] = useState(
    ""
  );
  const [completadoTipoCuenta, asignarValorCompletadoTipoCuenta] = useState("");
  const [completadoCuentaCLABE, asignarValorCompletadoCuentaCLABE] = useState(
    ""
  );
  const [
    completadoConfirmarCuentaCLABE,
    asignarValorCompletadoConfirmarCuentaCLABE,
  ] = useState("");

  //Errores
  const [errorTarjetaHabiente, asignarErrorTarjetaHabiente] = useState("");
  const [errorNumeroTarjeta, asignarErrorNumeroTarjeta] = useState("");
  const [
    errorConfirmarNumeroTarjeta,
    asignarErrorConfirmarNumeroTarjeta,
  ] = useState("");
  const [errorTipoTarjeta, asignarErrorTipoTarjeta] = useState("");
  const [errorBanco, asignarErrorBanco] = useState("");
  const [errorFechaTarjeta, asignarErrorFechaTarjeta] = useState("");
  const [errorTipoCuenta, asignarErrorTipoCuenta] = useState("");
  const [errorCuentaCLABE, asignarErrorCuentaCLABE] = useState("");
  const [
    errorConfirmarCuentaCLABE,
    asignarErrorConfirmarCuentaCLABE,
  ] = useState("");

  //Eventos
  const alCambiarTarjetaHabiente = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.tarjetaHabiente = valor;
    }
  };

  const alCambiarEmisor = (emisor) => {
    valores.emisor = emisor;
    asignarEmisor(emisor);
  };

  const alCambiarBanco = (banco) => {
    valores.banco = banco;
    asignarBanco(banco);
  };

  const alCambiarMesTarjeta = (mes) => {
    valores.mesTarjeta = mes;
  };

  const alCambiarAnioTarjeta = (evento) => {
    if (evento) {
      valores.anioTarjeta = evento.target.value;
    }
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

  const limpiarValidaciones = () => {
    asignarValorCompletadoTarjetaHabiente(false);
    asignarValorCompletadoBanco(false);
    asignarValorCompletadoTipoCuenta(false);
    asignarValorCompletadoCuentaCLABE(false);
    asignarValorCompletadoConfirmarCuentaCLABE(false);
    asignarValorCompletadoTipoTarjeta(false);
    asignarValorCompletadoNumeroTarjeta(false);
    asignarValorCompletadoConfirmarNumeroTarjeta(false);
    asignarValorCompletadoMesTarjeta(false);
    asignarValorCompletadoAnioTarjeta(false);
  };

  //Validaciones
  const hacerValidaciones = () => {
    limpiarValidaciones();
    const {
      tarjetaHabiente,
      numeroTarjeta,
      confirmarNumeroTarjeta,
      emisor,
      mesTarjeta,
      anioTarjeta,
    } = valores;
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

    if (tipo === "Tarjeta") {
      validacionesTarjeta();
    } else {
      validacionesCLABE();
    }
  };

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

  const validacionesTarjeta = () => {
    const { mesTarjeta, anioTarjeta } = valores;
    let numeroTarjeta = estadoApp.ctNumeroTarjeta?.data;
    let confirmarNumeroTarjeta = estadoApp.ctConfirmarNumeroTarjeta?.data;
    validarTipoTarjeta(emisor, diccionario.errores).then((respuesta) => {
      asignarValorFocoTipoTarjeta(respuesta.foco);
      asignarValorCompletadoTipoTarjeta(respuesta.valida);
      asignarErrorTipoTarjeta(respuesta.error);
    });
    validarNumeroTarjeta(numeroTarjeta, emisor, diccionario.errores).then(
      (respuesta) => {
        asignarValorFocoNumeroTarjeta(respuesta.foco);
        asignarValorCompletadoNumeroTarjeta(respuesta.valida);
        asignarErrorNumeroTarjeta(respuesta.error);
      }
    );
    validarConfirmarNumeroTarjeta(
      numeroTarjeta,
      confirmarNumeroTarjeta,
      diccionario.errores
    ).then((respuesta) => {
      asignarValorFocoConfirmarNumeroTarjeta(respuesta.foco);
      asignarValorCompletadoConfirmarNumeroTarjeta(respuesta.valida);
      asignarErrorConfirmarNumeroTarjeta(respuesta.error);
    });
    validarExpiracionTarjeta(mesTarjeta, anioTarjeta, diccionario.errores).then(
      (respuesta) => {
        let { mes, anio } = respuesta;
        asignarValorFocoMesTarjeta(mes.foco);
        asignarValorCompletadoMesTarjeta(mes.valida);
        asignarValorFocoAnioTarjeta(anio.foco);
        asignarValorCompletadoAnioTarjeta(anio.valida);
        asignarValorFocoFechaTarjeta(
          mes.foco ? mes.foco : anio.foco ? anio.foco : ""
        );
        asignarErrorFechaTarjeta(
          mes.error ? mes.error : anio.error ? anio.error : ""
        );
      }
    );
  };

  const arregloCompletadosPorTipo = () => {
    let COMPLETADOS_TARJETA = [
      completadoTarjetaHabiente,
      completadoBanco,
      completadoTipoTarjeta,
      completadoNumeroTarjeta,
      completadoConfirmarNumeroTarjeta,
      completadoMesTarjeta,
      completadoAnioTarjeta,
    ];
    let COMPLETADOS_CLABE = [
      completadoTipoCuenta,
      completadoCuentaCLABE,
      completadoConfirmarCuentaCLABE,
      completadoTarjetaHabiente,
      completadoBanco,
    ];
    if (tipo === "Tarjeta") {
      return COMPLETADOS_TARJETA;
    } else {
      return COMPLETADOS_CLABE;
    }
  };

  const lanzarDomiciliarDano = (rfc, numeroTelefono, latitud, longitud) => {
    let numeroTarjeta = estadoApp.ctNumeroTarjeta.data;
    let confirmarNumeroTarjeta = estadoApp.ctConfirmarNumeroTarjeta.data;
    const tipoCorregido = (tipo === "Tarjeta") ? "TARJETA DE CREDITO" : tipo; 
    domiciliarDano({
      variables: {
        tipoEndoso: tipoCorregido,
        numeroReporte: 0,
        numeroPoliza: poliza.poliza,
        certificado: parseInt(poliza.inciso),
        lineaNegocio: poliza.lineaNegocio,
        agencia: poliza.oficina,
        nombreTarjetaHabiente: nombreUsuario,
        banco: catalogoBancos?.find((b) => b.nombre == banco).id,
        tipoTarjeta:
          catalogoTipoTarjetas?.find((el) => el.nombre == emisor)?.id || "",
        numeroTarjeta: numeroTarjeta,
        confirmaNumeroTarjeta: confirmarNumeroTarjeta,
        fechaExpiracion: `${valores.mesTarjeta}${valores.anioTarjeta}`,
        tipoCuenta:
          catalogoTipoCuentas?.find((el) => el.nombre == tipoCuenta)?.id || "",
        cuentaClabe: valores.cuentaCLABE,
        confirmaClabe: valores.confirmarCuentaCLABE,
        rfc,
        domiciliarPago: true,
        latitud: `${longitud}`,
        longitud: `${latitud}`,
        numeroTelefono,
        token: objetoCookie.access_token,
      },
    });
  };
  const lanzarDomiciliarAuto = (rfc, numeroTelefono, latitud, longitud) => {
    let numeroTarjeta = estadoApp.ctNumeroTarjeta.data;
    let confirmarNumeroTarjeta = estadoApp.ctConfirmarNumeroTarjeta.data;
    domiciliarAuto({
      variables: {
        tipoEndoso: tipo,
        numeroReporte: 0,
        numeroPoliza: poliza.poliza,
        certificado: parseInt(poliza.inciso),
        lineaNegocio: poliza.lineaNegocio,
        agencia: poliza.oficina,
        nombreTarjetaHabiente: nombreUsuario,
        banco: catalogoBancos?.find((b) => b.nombre == banco).id,
        tipoTarjeta:
          catalogoTipoTarjetas?.find((el) => el.nombre == emisor)?.id || "",
        numeroTarjeta: numeroTarjeta,
        confirmaNumeroTarjeta: confirmarNumeroTarjeta,
        fechaExpiracion: `${valores.mesTarjeta}${valores.anioTarjeta}`,
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
      },
    });
  };

  useEffect(() => {
    let COMPLETADOS = arregloCompletadosPorTipo();
    if (COMPLETADOS.every((valor) => valor === true)) {
      asignarValorCargando(true);
      let rfc = estadoApp?.campoAlertaCampo?.data;
      let numeroTelefono = estadoApp?.informacionContacto?.telefono || usuario;
      let latitud = estadoApp?.geolocalizacion?.latitud;
      let longitud = estadoApp?.geolocalizacion?.longitud;
      // TODO:

      if (poliza.lineaNegocio === "AUTR") {
        lanzarDomiciliarAuto(rfc, numeroTelefono, latitud, longitud);
      } else {
        lanzarDomiciliarDano(rfc, numeroTelefono, latitud, longitud);
      }
    }
  }, [
    completadoTipoCuenta,
    completadoCuentaCLABE,
    completadoConfirmarCuentaCLABE,
    completadoTarjetaHabiente,
    completadoBanco,
    completadoTipoTarjeta,
    completadoNumeroTarjeta,
    completadoConfirmarNumeroTarjeta,
    completadoMesTarjeta,
    completadoAnioTarjeta,
  ]);

  // EFFECTS CATALOGOS
  useEffect(() => {
    if (!loadingBancos && dataBancos) {
      if (dataBancos?.endoso_catalogoBancos?.dato) {
        // Se obtuvo el catalogo
        let catalogo = [];
        dataBancos.endoso_catalogoBancos.dato.forEach((el) =>
          catalogo.push({ nombre: el.nombreBanco, id: el.idBanco })
        );
        setCatalogoBancos(catalogo);
        if (cuentaHabiente) {
          let banco = catalogo.find((el) => el.id == cuentaHabiente.idBanco)
            ?.nombre;
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
          alertaErrorDomiciliacion.settextoCuerpoJsx("No se pudo generar tu domiciliacion");
          alertaDomiciliado.mostrar();
          const arrayListaDetalle = [
            {
              "columna": "causa",
              "valor": "error en transaccion - servicios"
            },
            {
              "columna": "importe",
              "valor": totalDomiciliar || ""
            }
          ]
          runNoConcludeTransactionLog(1, "causa", "", "", arrayListaDetalle);
          return;
        }

        // Una vez llega la notificacion y su valor es True, todo se registro correctamente y procedo a mostrar modal exitoso
        console.log(evento);
        const listaDetalle = [
          {"columna" : "importe", "valor": totalDomiciliar}
        ]
        runSuccesLog(1, listaDetalle);
        console.log("Llego aquí")
        asignarValorCargando(false);
        limpiarValores();
        alertaDomiciliado.mostrar();
      }
    }
  }
  
  useEffect(() => {
    console.log(loadingSuscription)
    if (!loadingSuscription && eventosSuscription && !errorSuscription) {
        console.log(eventosSuscription);
        revisarDomiciliacionCompletada()
    }
  }, [eventosSuscription, loadingSuscription, errorSuscription]);

  // EFFECTS ENDOSOS
  useEffect(() => {
    if (!loadingDomiciliarDano) {
      asignarValorCargando(true);
    }

    if (loadingDomiciliarDano) {
      asignarValorCargando(true);
    }
  }, [dataDomiciliarDano, loadingDomiciliarDano, errorDomiciliarDano]);

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
                "columna": "importe",
                "valor": totalDomiciliar || ""
              }
            ]
            runSuccesLog(1, arrayListaDetalle);
            alertaDomiciliado.mostrar();
          } else {
            limpiarValores();
            const arrayListaDetalle = [
              {
                "columna": "causa",
                "valor": "error en transaccion - servicios"
              },
              {
                "columna": "importe",
                "valor": totalDomiciliar || ""
              }
            ]
            runNoConcludeTransactionLog(1, arrayListaDetalle);
            if (isSignedError(res.mensaje)) {
              alertaErrorDomiciliacion.settextoCuerpoJsx(res.mensaje);
            }
            alertaErrorDomiciliacion.mostrar();
          }
        } else {
          limpiarValores();
          const listaDetalle = [
            {"columna" : "importe", "valor": totalDomiciliar || ""}
          ]
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

  const maskCharacter = (str, mask, n = 1) => {
    return ("" + str).slice(0, -n).replace(/./g, mask) + ("" + str).slice(-n);
  };

  const obtenerTitulo = (lineaNegocio) => {
    const cadena = "Completa la información de tu póliza de "
    if (lineaNegocio === "AUTR") {
      return cadena + "Autos: ";
    };

    return cadena + "Daños: ";
  }

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
          })
        }}
        funcionLlamadaBoton={() => {
          alertaDomiciliado.cerrar();
          // goBack();
          const listaDetalle = [
            {"columna": "importe", "valor": totalDomiciliar || "no hay"}
          ]
          runCancelLog(1, listaDetalle);
          history.push({
            pathname: "/detalle-poliza",
            state: { domiciliado: true }
          })
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
          <TituloPantalla id="titulo">{obtenerTitulo(poliza.lineaNegocio)}</TituloPantalla>

          <Formulario>
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

            {tipo === "Tarjeta" ? (
              <>
                {/* ===================================== 
                    CAMPOS DE DOMICILIACION POR TARJETA
                   =====================================
                */}
                <Select
                  etiqueta={diccionario.etiqueta.tipoTarjeta}
                  enCambio={alCambiarEmisor}
                  foco={focoTipoTarjeta}
                  valor={emisor}
                  index={98}
                  tipo="Normal"
                  opciones={catalogoTipoTarjetas}
                  inputholder="Seleccionar"
                />
                <MensajeError id="errorTipoTarjeta">
                  {errorTipoTarjeta}
                </MensajeError>

                <CamposTarjeta
                  errorNumeroTarjeta={errorNumeroTarjeta}
                  focoNumeroTarjeta={focoNumeroTarjeta}
                  focoConfirmarNumeroTarjeta={focoConfirmarNumeroTarjeta}
                  errorConfirmarNumeroTarjeta={errorConfirmarNumeroTarjeta}
                />

                <ContenedorFechaTarjeta>
                  <Etiqueta foco={focoFechaTarjeta}>
                    {diccionario.etiqueta.fechaTarjeta}
                  </Etiqueta>

                  <ContenedorMitad style={{marginTop: "10px"}}>
                  <EtiquetaNegro style={{marginBottom: "0px"}}>MM</EtiquetaNegro>
                    <Select
                      // etiqueta="MM"
                      enCambio={alCambiarMesTarjeta}
                      id="fechaTarjetaMes"
                      foco={focoMesTarjeta}
                      valor={valores.mesTarjeta}
                      index={98}
                      tipo="Compacto"
                      opciones={opcionesMes}
                      inputholder=""
                    />
                  </ContenedorMitad>
                  <ContenedorMitad style={{marginTop: "10px"}}>
                    <EtiquetaNegro style={{marginBottom: "0px"}}>AA</EtiquetaNegro>
                    <CampoTexto
                      estilo={{height: "8px", marginTop: "6px"}}
                      id="fechaTarjetaAnio"
                      // etiqueta="AA"
                      enCambio={alCambiarAnioTarjeta}
                      foco={focoAnioTarjeta}
                      valor={valores.anioTarjeta}
                      numeroDeCaracteres={2}
                      expresionRegular={/(^[0-9]+$|^$)/}
                    />
                  </ContenedorMitad>
                </ContenedorFechaTarjeta>
                <MensajeError id="errorFechaTarjeta">
                  {errorFechaTarjeta}
                </MensajeError>
              </>
            ) : (
              <>
                {/* =================================== 
                    CAMPOS DE DOMICILIACION POR CLABE
                   ===================================
                */}
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

      <PieDePagina>
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetaBotonDomiciliar}
            tema="estandar"
            enClick={hacerValidaciones}
          />
        </ContenedorBoton>
      </PieDePagina>
    </EnvolvedorPantalla>
  );
};

export default PantallaDomiciliacion;

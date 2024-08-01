/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";
import "moment/locale/es-mx";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { loader } from "graphql.macro";
import useAlerta from "../../../utils/useAlerta";
import { configAlertaBlindado } from "./configs";
import {
  AlertaImagen,
  ContenedorBoton,
  MensajePequeno,
  Titulo,
  Check,
  ContenedorCheck,
  MensajeCheck,
  ContenedorEnlace,
} from "./PantallaIngresoDePoliza.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import CampoTexto from "../../componentes-v2/campo-texto";
import PantallaIngresoDePolizaOcr from "../../pantalla-ingreso-de-poliza-ocr";
import { Alerta } from "../../alerta";
import IndicadorCarga from "../../indicador-carga";
import "react-dates/lib/css/_datepicker.css";
import "./estilos.scss";
import polizaImg from "../recursos/poliza.png";
import serieImg from "../recursos/serie.png";
import { ContenedorPolizaDanos } from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";

const VALIDACION_POLIZA = loader(
  "../../../graphQL/query/poliza/validar_poliza.graphql"
);

const VALIDACION_POLIZA_GRUA = loader(
  "../../../graphQL/query/grua/valCobAsisGrua.graphql"
);

const VALIDAR_REPORTES_EXISTENTES = loader(
  "../../../graphQL/mutation/reporte/reporte_validarReportesExistentes.graphql"
);

const valores = {
  poliza: "",
  numeroDeSerie: "",
  fechaSiniestro: moment(),
};

const diccionario = {
  encabezadoChoque: "Reportar un choque",
  encabezadoGrua: "Asistencia de grúa",
  encabezadoCristal: "Cambio cristalera",
  etiquetaBotonComenzarChoque: "Reportar choque",
  etiquetaBotonComenzarGrua: "Comenzar reporte",
  etiquetaBotonComenzarCristal: "Buscar Cristaleras",
  titulo: "Ayúdanos a identificar tu póliza de seguro",
  mensajePequeno:
    // "Completar estos datos nos ayudaran a solicitar tu asistencia correctamente.",
    "Proporciona los siguientes datos para comenzar con el reporte de tu siniestro de manera adecuada.",
  mensjaeCheckBox: "Mi vehículo es blindado",
  etiquetaPoliza: "Número de póliza (incluyendo guiones)",
  etiquetaSerie: "Últimos 4 dígitos del número de serie de tu vehículo:",
  etiquetaFecha: "Fecha de siniestro",
  marcadorPoliza: "Ejemplo: 1-2222222-3",
  marcadorSerieVehiculo: "Ejemplo: 1234",
  etiquetaBotonLlamada: "Llamar a HDI *434",
  linkInstruccionesPoliza: "¿Dónde encuentro el número de póliza?",
  linkInstruccionesSerie: "¿Dónde está mi número de serie?",
  intruccionesSerie: "Localiza tu número de serie tal como se ve en el ejemplo",
  intruccionesPoliza:
    "Localiza tu número de póliza tal como se ve en el ejemplo",
  mensajeDeErrorDefault:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  alerta: {
    titulo: "Póliza vencida",
    cuerpo:
      // eslint-disable-next-line max-len
      "No fue posible generar el reporte de tu siniestro por la vigencia de tu póliza. <br />Comunícate con nosotros.",
    etiquetaBoton: "Llámanos",
  },
  alertacoberturaGruaError: {
    textoEncabezado: "No es posible solicitar tu grúa",
    tipoIcono: "trianguloAlerta",
    colorAlerta: "azul",
    etiquetaBoton2: "Salir",
    textoCuerpo: 'Tu póliza no cuenta con la cobertura "Asistencia vial"',
  },
  errores: {
    campoRequerido: "Campo requerido para poder continuar.",
    // oficinaIncorrecta:
    //   "Si eres cliente Autocompara - Santander comunicate al *434",
    formatoIncorrecto: "Por favor revisa que el formato sea correcto.",
  },
  alertaBlindado: {
    textoEncabezado: "No es posible generar tu reporte",
    textoCuerpo:
      "Por las caracteristicas de tu vehiculo el reporte no puede generarse por este medio, ponte en contacto con HDI para que un asesor te ayude con tu reporte",
  },
};

let btnTema = "estandar";
const claseBotonEstandar = "boton-estandar";
const claseBotonDeshabilitado = "boton-deshabilitado";
const iconoCalendario = <CalendarTodayIcon />;
const numSerieCambio = "";
let pantallaReedireccion = "";

const PantallaIngresoDePoliza = (props) => {
  const { error: errorDeProp } = props;

  const btnRef = useRef();

  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);

  const miRef = useRef(null);
  const location = useLocation();
  const alertRegistroTardio = useAlerta(configAlertaBlindado);
  const [mostrarValorModalNuevoReporte, asignarMostrarModalNuevoReporte] =
    useState(false);
  const [NumPolizaEstado, asignarValorNumPoliza] = useState(
    estadoApp.datosIngresoPoliza && estadoApp.datosIngresoPoliza.poliza
      ? estadoApp.datosIngresoPoliza.poliza
      : []
  );
  const [NumSerieEstado, asignarValorNumSerie] = useState(
    estadoApp.datosIngresoPoliza && estadoApp.datosIngresoPoliza.vin
      ? estadoApp.datosIngresoPoliza.vin
      : ""
  );
  const [RedirigirACristaleras, SetRedirigirCristaleras] =
    useState("/cristaleras");

  const params = new URLSearchParams(location.search);
  if (params.get("vin")) {
    const numeroPoliza = params.get("numeroPoliza");
    const vinReq = params.get("vin");
    valores.poliza = numeroPoliza;
    if (vinReq.length > 4) {
      valores.numeroDeSerie = vinReq.slice(-4);
    } else {
      valores.numeroDeSerie = vinReq;
    }
  }

  if (
    NumPolizaEstado !== undefined &&
    (valores.poliza === "" || valores.poliza === undefined)
  ) {
    valores.poliza = NumPolizaEstado;
  }

  if (
    NumSerieEstado !== undefined &&
    (valores.numeroDeSerie === "" || valores.numeroDeSerie === undefined)
  ) {
    valores.numeroDeSerie = NumSerieEstado;
  }

  const [validarPoliza, { loading, error, data }] = useLazyQuery(
    VALIDACION_POLIZA,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const [validarPolizaGrua, { loading: loadingG, error: errorG, data: dataG }] =
    useLazyQuery(VALIDACION_POLIZA_GRUA, {
      fetchPolicy: "cache-and-network",
    });

  const [reportesExistentes, { loading: loadingReportes, data: dataReportes }] =
    useMutation(VALIDAR_REPORTES_EXISTENTES);
  const [focoPoliza, asignarValorfocoPoliza] = useState("");
  const [focoNumeroDeSerie, asignarValorfocoNumeroDeSerie] = useState("");
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [mostrarLectorOcr, asignarValorMostrarLectorOcr] = useState(false);
  const [mostrarModalPoliza, asignarValorMostrarModalPoliza] = useState(false);
  const [mostrarModalBlindado, asignarValorMostrarModalBlindado] =
    useState(false);
  const [mostrarModalCoberturaGruaError, asignarValorModalCoberturaGruaError] =
    useState(false);
  const [mostrarModalSerie, asignarValorMostrarModalSerie] = useState(false);
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);
  const [errorPoliza, asignarErrorPoliza] = useState("");
  const [errorSerie, asignarErrorSerie] = useState("");
  const [encabezado, asignarEncabezado] = useState("");
  const [etiquetaBotonComenzar, asignaretiquetaBotonComenzar] = useState("");
  const history = useHistory();

  const deshabilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.remove(claseBotonEstandar);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.add(claseBotonDeshabilitado);
    }
  };

  const habilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.remove(claseBotonDeshabilitado);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.add(claseBotonEstandar);
    }
  };

  const alCambiarNumeroDePoliza = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.poliza = valor;

      if (valor && valores.numeroDeSerie) {
        habilitarBoton();
        btnTema = "estandar";
      } else {
        deshabilitarBoton();
        btnTema = "deshabilitado";
      }
    }
  };

  const alCambiarNumeroDeSerie = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.numeroDeSerie = valor;

      if (valor && valores.poliza) {
        habilitarBoton();
        btnTema = "estandar";
      } else {
        deshabilitarBoton();
        btnTema = "deshabilitado";
      }
    }
  };

  const alCambiarFecha = (fecha) => {
    valores.fechaSiniestro = fecha;
  };

  const alDarClickEnGenerarReporte = () => {
    const { poliza, numeroDeSerie, fechaSiniestro } = valores;
    let polziaTest = /^[0-9]{1,5}-[0-9]{1,10}-[0-9]{1,5}$/.test(poliza);
    let numeroDeSerieTest = /^[0-9a-zA-Z&Ññ]{1,4}$/.test(numeroDeSerie);
    asignarValorNumPoliza(poliza);
    asignarValorNumSerie(numeroDeSerie);

    if (!poliza) {
      asignarValorfocoPoliza("error");
      asignarErrorPoliza(diccionario.errores.campoRequerido);
    } else if (!polziaTest) {
      asignarValorfocoPoliza("error");
      asignarErrorPoliza(diccionario.errores.formatoIncorrecto);
      asignarValorCargando(false);
    } else {
      asignarValorfocoPoliza("");
      asignarErrorPoliza("");
    }

    if (!numeroDeSerie) {
      asignarValorfocoNumeroDeSerie("error");
      asignarErrorSerie(diccionario.errores.campoRequerido);
    } else if (!numeroDeSerieTest) {
      asignarValorfocoNumeroDeSerie("error");
      asignarErrorSerie(diccionario.errores.formatoIncorrecto);
      asignarValorCargando(false);
    } else {
      asignarValorfocoNumeroDeSerie("");
      asignarErrorSerie("");
    }

    if (polziaTest && numeroDeSerieTest && fechaSiniestro) {
      const vin = numeroDeSerie;
      const fechaOcurrenciaFormat = moment(fechaSiniestro.toDate())
        .utc("America/mexico_city")
        .format();
      const fechaOcurrencia = new Date(fechaOcurrenciaFormat);
      const fechaPasada = moment().isAfter(fechaOcurrencia, "day");
      console.log(fechaOcurrencia);
      dispatch({
        type: "AGREGAR",
        valor: { vin, fechaOcurrencia, poliza, fechaPasada },
        indice: "datosIngresoPoliza",
      });
      validarPoliza({
        variables: { poliza, vin, fechaOcurrencia, codigoError: errorDeProp },
      });
    }
  };

  const evaluarReedireccion = () => {
    if (pantallaReedireccion === "/informacion-complementaria") {
      history.push("/informacion-complementaria");
    } else if (estadoApp.seatedClaim === "cristal") {
      history.push("/cristaleras");
    } else {
      history.push("/cuestionario-reporte");
    }
  };

  useEffect(() => {
    if (
      !loadingReportes &&
      dataReportes &&
      dataReportes.reporte_validarReportesExistentes
    ) {
      const res = dataReportes.reporte_validarReportesExistentes;
      if (res.dato) {
        console.log(res.dato);
        asignarValorCargando(false);
        asignarMostrarModalNuevoReporte(true);
      } else {
        if (
          (estadoApp && estadoApp.seatedClaim === "crash") ||
          estadoApp.seatedClaim === "cristal"
        ) {
          asignarValorCargando(false);
          evaluarReedireccion();
        }
        // ESTE ES EL SERVICIO DE VALIDACION DE COBERTURA DE GRUA
        if (estadoApp && estadoApp.seatedClaim === "tow") {
          let lineaNegocio = "AUTR";
          let agencia = valores.poliza.split("-")[0].split(" ");
          agencia = asignarCerosAgencia(agencia, agencia.toString().length);

          let polizaG = valores.poliza.split("-")[1].split("");
          polizaG = asignarCeros(polizaG, polizaG.length);

          const certificado = valores.poliza.split("-")[2];

          validarPolizaGrua({
            variables: {
              poliza: polizaG,
              agencia: agencia,
              lineaNegocio: lineaNegocio,
              certificado: certificado,
            },
          });
        }
      }
    } else if (loadingReportes) {
      asignarValorCargando(true);
    }
  }, [loadingReportes, dataReportes]);

  const asignarCeros = (texto, longitud) => {
    switch (longitud) {
      case 1:
        return `000000000${texto.join("")}`;
      case 2:
        return `00000000${texto.join("")}`;
      case 3:
        return `0000000${texto.join("")}`;
      case 4:
        return `000000${texto.join("")}`;
      case 5:
        return `00000${texto.join("")}`;
      case 6:
        return `0000${texto.join("")}`;
      case 7:
        return `000${texto.join("")}`;
      case 8:
        return `00${texto.join("")}`;
      case 9:
        return `0${texto.join("")}`;
      case 10:
        return `${texto.join("")}`;
      default:
        return texto.join("");
    }
  };

  const asignarCerosAgencia = (texto, longitud) => {
    switch (longitud) {
      case 1:
        return `0000${texto.join("")}`;
      case 2:
        return `000${texto.join("")}`;
      case 3:
        return `00${texto.join("")}`;
      case 4:
        return `0${texto.join("")}`;
      case 5:
        return `${texto.join("")}`;
      default:
        return texto.join("");
    }
  };

  useEffect(() => {
    if (estadoApp.seatedClaim === "tow") {
      asignarEncabezado(diccionario.encabezadoGrua);
      asignaretiquetaBotonComenzar(diccionario.etiquetaBotonComenzarGrua);
    } else if (estadoApp.seatedClaim === "crash") {
      asignarEncabezado(diccionario.encabezadoChoque);
      asignaretiquetaBotonComenzar(diccionario.etiquetaBotonComenzarChoque);
    } else if (estadoApp.seatedClaim === "cristal") {
      asignarEncabezado(diccionario.encabezadoCristal);
      asignaretiquetaBotonComenzar(diccionario.etiquetaBotonComenzarCristal);
    }
  }, []);

  useEffect(() => {
    if (!loading && data && data.validar_poliza && data.validar_poliza.codigo) {
      dispatch({
        type: "AGREGAR",
        valor: data.validar_poliza.dato,
        indice: "datosPoliza",
      });
      dispatch({
        type: "AGREGAR",
        valor: params.get("vin"),
        indice: "vinPolizaSiniestrada",
      });
      let agencia = valores.poliza.split("-")[0].split(" ");
      //agencia = asignarCerosAgencia(agencia, agencia.toString().length);
      agencia = asignarCerosAgencia(agencia, agencia.toString().length);

      let unicaPoliza = valores.poliza.split("-")[1].split("");
      unicaPoliza = asignarCeros(unicaPoliza, unicaPoliza.length);

      const certificado = valores.poliza.split("-")[2];
      switch (data.validar_poliza.codigo) {
        case "IMPOL20000":
          if (estadoApp.seatedClaim === "cristal") {
            SetRedirigirCristaleras("/cristaleras");
            reportesExistentes({
              variables: {
                lineaNegocio: "AUTR",
                agencia: `${agencia}`,
                certificado: Number(certificado),
                poliza: `${unicaPoliza}`,
              },
            });
            break;
          }
          asignarValorfocoPoliza("");
          asignarValorfocoNumeroDeSerie("");
          dispatch({
            type: "AGREGAR",
            valor: false,
            indice: "semaforoAmarillo",
          });
          if (moment().isAfter(valores.fechaSiniestro, "day")) {
            pantallaReedireccion = "/informacion-complementaria";
            reportesExistentes({
              variables: {
                lineaNegocio: "AUTR",
                agencia: `${agencia}`,
                certificado: Number(certificado),
                poliza: `${unicaPoliza}`,
              },
            });
          } else {
            pantallaReedireccion = "/cuestionario-reporte";
            reportesExistentes({
              variables: {
                lineaNegocio: "AUTR",
                agencia: `${agencia}`,
                certificado: Number(certificado),
                poliza: `${unicaPoliza}`,
              },
            });
          }
          break;
        case "IDPOL10006":
          asignarValorMostrarModal(true);
          break;
        case "IAPOL10001":
          asignarValorfocoPoliza("");
          asignarValorfocoNumeroDeSerie("");
          dispatch({
            type: "AGREGAR",
            valor: true,
            indice: "semaforoAmarillo",
          });
          pantallaReedireccion = "/informacion-complementaria";
          reportesExistentes({
            variables: {
              lineaNegocio: "AUTR",
              agencia: `${agencia}`,
              certificado: Number(certificado),
              poliza: `${unicaPoliza}`,
            },
          });
          break;
        default:
          asignarValorMostrarBarraAlerta(true);
          asignarValorMensajeAlerta(
            data.validar_poliza.mensaje || diccionario.mensajeDeErrorDefault
          );
          break;
      }
      asignarValorCargando(false);
    } else if (
      !loading &&
      data &&
      data.validar_poliza &&
      !data.validar_poliza.completado
    ) {
      asignarValorMostrarBarraAlerta(true);
      asignarValorMensajeAlerta(data.validar_poliza.mensaje);
      switch (errorDeProp) {
        case "IDPOL10002":
        case "IDPOL10006":
          asignarValorfocoPoliza("error");
          break;
        case "IDPOL10003":
        case "IDPOL10004":
        case "IDPOL10005":
          asignarValorfocoNumeroDeSerie("error");
          break;
        default:
          asignarValorfocoPoliza("error");
          asignarValorfocoNumeroDeSerie("error");
      }
      asignarValorCargando(false);
    } else if (error) {
      asignarValorMostrarBarraAlerta(true);
      asignarValorMensajeAlerta(diccionario.mensajeDeErrorDefault);
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    } else {
      asignarValorfocoPoliza("");
      asignarValorfocoNumeroDeSerie("");
    }
  }, [loading, data]);

  useEffect(() => {
    if (!loadingG && dataG) {
      switch (dataG.valCobAsisGrua.codigo) {
        case "IMPOL20000":
          console.log(
            "dataG.valCobAsisGrua.dato.dato: ",
            dataG.valCobAsisGrua.dato.dato
          );

          asignarValorCargando(false);
          history.push("/cuestionario-reporte");
          break;
        case "IDPOL10018":
          asignarValorCargando(false);
          abrirCoberturaGruaModal(true);
          break;
        case "IDPOL10016":
          abrirCoberturaGruaModal(true);
          asignarValorCargando(false);
          break;
        case "IDPOL10007":
          asignarValorCargando(false);
          abrirCoberturaGruaModal(true);
          break;
        case "ERR00001":
          abrirCoberturaGruaModal(true);
          asignarValorCargando(false);
          break;
      }
    } else if (errorG) {
      console.log(errorG, "errorG");
      abrirCoberturaGruaModal(true);
      asignarValorCargando(false);
    } else if (loadingG) {
      console.log(loadingG, "loadingG");
      asignarValorCargando(true);
    }
  }, [loadingG, dataG]);

  const persistirNumSeriePoliza = () => {
    asignarValorNumPoliza(valores.poliza);
    asignarValorNumSerie(valores.numeroDeSerie);
    if (NumPolizaEstado !== "" && valores.poliza !== "") {
      asignarValorNumPoliza(valores.poliza);
      valores.poliza = NumPolizaEstado;
    }

    if (
      valores.numeroDeSerie !== NumSerieEstado &&
      valores.numeroDeSerie !== ""
    ) {
      asignarValorNumSerie(numSerieCambio);
      valores.numeroDeSerie = numSerieCambio;
    }
  };

  const openHelpModal = (type) => {
    persistirNumSeriePoliza();

    if (type === "poliza") {
      asignarValorMostrarModalPoliza(true);
      return;
    }
    asignarValorMostrarModalSerie(true);
  };

  const abrirBlindadoModal = () => {
    asignarValorMostrarModalBlindado(!mostrarModalBlindado);
  };

  const abrirCoberturaGruaModal = () => {
    asignarValorModalCoberturaGruaError(!mostrarModalCoberturaGruaError);
  };

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
      <Alerta
        textoEncabezado=""
        textoCuerpo={`La póliza: ${valores.poliza} ya cuenta con un reporte por atender.`}
        colorAlerta="amarillo"
        tipoIcono="trinaguloAlerta"
        mostrarIcono
        mostrarModal={mostrarValorModalNuevoReporte}
        temaBoton="estandar"
        temaBoton2="simple"
        etiquetaBoton2="Cancelar"
        funcionLlamadaBoton2={() => asignarMostrarModalNuevoReporte(false)}
        manejarCierre={() => asignarMostrarModalNuevoReporte(false)}
      />
      <Alerta
        textoEncabezado={diccionario.intruccionesPoliza}
        textoCuerpoJsx={<AlertaImagen src={polizaImg} alt="" />}
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
          window.location.href = "tel:*434";
        }}
      />
      <Alerta
        {...configAlertaBlindado}
        mostrarModal={mostrarModalBlindado}
        manejarCierre={() => {
          abrirBlindadoModal(false);
        }}
        funcionLlamadaBoton={() => {
          history.push("/");
          window.location.href = "tel:*434";
        }}
        funcionLlamadaBoton2={() => {
          abrirBlindadoModal(false);
        }}
      />
      <Alerta
        {...diccionario.alertacoberturaGruaError}
        mostrarModal={mostrarModalCoberturaGruaError}
        manejarCierre={() => {
          abrirCoberturaGruaModal(false);
        }}
        funcionLlamadaBoton2={() => {
          abrirCoberturaGruaModal(false);
        }}
      />
      <Encabezado
        titulo={encabezado}
        style={{ fontWeight: "bold" }}
        funcionRegresar={() => {
          history.push("/elegir-siniestro");
          sessionStorage.removeItem("estadoRedux");
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
        <MensajePequeno id="mensajePequeno">
          {diccionario.mensajePequeno}
        </MensajePequeno>
        <ContenedorPolizaDanos>
          <CampoTexto
            id="campoPoliza"
            etiqueta={diccionario.etiquetaPoliza}
            expresionRegular={/^[0-9-]*$/}
            enCambio={alCambiarNumeroDePoliza}
            foco={focoPoliza}
            valor={valores.poliza}
            iconoAyuda
            openHelp={() => openHelpModal("poliza")}
            numeroDeCaracteres={22}
            marcador={diccionario.marcadorPoliza}
            mensajeError={errorPoliza}
            referencia={miRef}
          />
        </ContenedorPolizaDanos>
        <ContenedorPolizaDanos>
          <CampoTexto
            id="campoSerie"
            expresionRegular={/^[0-9a-zA-Z&Ññ]*$/}
            numeroDeCaracteres={4}
            marcador={diccionario.marcadorSerieVehiculo}
            etiqueta={diccionario.etiquetaSerie}
            iconoAyuda
            openHelp={() => openHelpModal("serie")}
            enCambio={alCambiarNumeroDeSerie}
            foco={focoNumeroDeSerie}
            valor={valores.numeroDeSerie}
            mensajeError={errorSerie}
          />
        </ContenedorPolizaDanos>
        <CampoTexto
          esCalendario
          etiqueta={diccionario.etiquetaFecha}
          icono={iconoCalendario}
          enCambio={alCambiarFecha}
          fechaCalendario={valores.fechaSiniestro}
          id="campoFecha"
        />
        {(estadoApp.seatedClaim === "tow" ||
          estadoApp.seatedClaim === "cristal") && (
          <ContenedorCheck>
            <Check
              onClick={() => {
                abrirBlindadoModal();
              }}
            />
            <MensajeCheck id="mensajeCheck">
              {diccionario.mensjaeCheckBox}
            </MensajeCheck>
          </ContenedorCheck>
        )}
        <ContenedorEnlace>
          <EnlaceRegistroBienvenida>
            <EnlaceBienvenida
              id="enlaceRegistro"
              enlace
              onClick={() => {
                history.push("/recuperar-poliza", {
                  policy: "AUTR",
                  claim: "crash",
                });
              }}
            >
              No cuento con mi póliza
            </EnlaceBienvenida>
          </EnlaceRegistroBienvenida>
        </ContenedorEnlace>
        <ContenedorBoton>
          <Boton
            ref={btnRef}
            etiqueta={etiquetaBotonComenzar}
            tema={btnTema}
            enClick={alDarClickEnGenerarReporte}
          />
        </ContenedorBoton>

        {/* TBC si quitar el botón */}
        {estadoApp.seatedClaim === "tow" && (
          <ContenedorBoton>
            <Boton
              etiqueta={diccionario.etiquetaBotonLlamada}
              tema="simple"
              enClick={() => {
                window.location.href = "tel:*434";
              }}
            />
          </ContenedorBoton>
        )}
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

PantallaIngresoDePoliza.propTypes = {
  error: PropTypes.oneOf([
    "IDPOL10002",
    "IDPOL10003",
    "IDPOL10004",
    "IDPOL10005",
    "IDPOL10006",
    "",
  ]),
};

PantallaIngresoDePoliza.defaultProps = {
  error: "",
};

export default PantallaIngresoDePoliza;

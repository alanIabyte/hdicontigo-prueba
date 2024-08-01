/* eslint-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import moment from "moment";
import Boton from "../../boton/boton-componente/Boton";
import CampoTexto from "../../componentes-v2/campo-texto";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import {
  AlertaImagen,
  ContenedorBoton,
  MensajePequeno,
  Titulo,
} from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import { EtiquetaNegro } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import {
  ContenedorPolizaDanos,
  SeparadorEspacio,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import { validarRFC } from "../../../helpers";
import { Alerta, AlertaCampo } from "../../alerta";
import polizaImg from "../../../recursos/imagenes/recursos/poliza.png";
import serieImg from "../../../recursos/imagenes/recursos/serie.png";
import useAlerta from "../../../utils/useAlerta";
import { configurarAlerta } from "../../pantalla-detalle-poliza/pantalla-detalle-poliza-componente/utils";
import { MensajeError } from "../../componentes-styled-compartidos/Textos";
import {
  configGpsService,
  diccionario,
} from "./utils";
import {
  EnlaceRegistroBienvenida,
  EnlaceBienvenida,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import ACTIONS_REDUX from "../../../reductores/Actions";
import iconoReloj from "../../../recursos/iconos/RT/Reloj.svg";
import { loader } from "graphql.macro";
import { useLazyQuery, useMutation } from "@apollo/client";
import IndicadorCarga from "../../indicador-carga";
import BarraAlerta from "../../barra-alerta";
import { diccionarioRobo, configFuncionalidadRobo } from "../../../pantallas/pantallas-robo/utils";
import { asignarCerosAgencia, asignarCerosPoliza } from "../../../utils/poliza";
import { usarApi } from "../../../utils/api";

const VALIDACION_POLIZA = loader(
  "../../../graphQL/query/poliza/validar_poliza.graphql"
);

const VALIDAR_REPORTES_EXISTENTES = loader(
  "../../../graphQL/mutation/reporte/reporte_validarReportesExistentes.graphql"
);

const VALIDACION_COBERTURA_POLIZA = loader(
  "../../../graphQL/query/poliza/valCobPoliza.graphql"
);

const iconoCalendario = <CalendarTodayIcon />;

const valores = {
  poliza: "",
  numeroDeSerie: "",
  numeroSerieConsulta: "",
  fechaSiniestro: moment(),
  horaRobo: "",
  rfc: "",
  modeloVehiculo: "",
  nombreAsegurado: "",
};

export const PantallaReportePoliza = () => {
  const location = useLocation();
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

  const history = useHistory();
  const dispatch = useDispatch();
  const estadoApp = useSelector((state) => state);
  const [claim, setClaim] = useState("");
  const [cargando, asignarValorCargando] = useState(false);

  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionarioRobo.reportePoliza.mensajeDeErrorDefault
  );

  // state para controlar la visualización de la modal de poliza vencida
  const [mostrarModalPolizaVencida, asignarValorMostrarModalPolizaVencida] = useState(false);

  // State para controlar la modal que indica que la póliza ya tiene un reporte existente
  const [mostrarModalReporteExistente, asignarMostrarModalReporteExistente] = useState(false);

  // State para controlar la modal que indica al asegurado que no tiene la cobertura
  const [mostrarModalSinCobertura, asignarMostrarModalSinCobertura] = useState(false);

  // !Se asignan titulos por default
  const [title, setTitle] = useState(diccionario.titulos.principal);
  const [subTitle, setSubTitle] = useState(diccionario.titulos.sub);

  const [numeroSerieConsulta, setNumeroSerieConsulta] = useState("");
  const [nombreAsegurado, setNombreAsegurado] = useState("");
  const [modeloVehiculo, setModeloVehiculo] = useState("");

  // !Focos de los campos
  const [focoPoliza, asignarValorfocoPoliza] = useState("");
  const [focoNumeroSerie, asignarValorfocoNumeroSerie] = useState("");
  const [focoFechaSiniestro, setFocoFechaSiniestro] = useState("");
  const [focoHoraRobo, asignarValorfocoHoraRobo] = useState("");

  // !Errores campos
  const [errorPoliza, asignarErrorPoliza] = useState("");
  const [errorSerie, asignarErrorSerie] = useState("");
  const [errorFechaSiniestro, asignarErrorFechaSiniestro] = useState("");
  const [errorHora, asignarErrorHora] = useState("");

  const alertaCampo = useAlerta(configurarAlerta(9));
  const alertaDinamica = useAlerta(configurarAlerta(10));
  const [mostrarModalPoliza, asignarValorMostrarModalPoliza] = useState(false);
  const [mostrarModalSerie, asignarValorMostrarModalSerie] = useState(false);
  const alertGpsService = useAlerta(configGpsService);

  // const [eventoRegistrar, setEventoRegistrar] = useState(false);
  let paginaAnterior;

  const [NumSerieEstado, asignarValorNumSerie] = useState(
    estadoApp.datosReportePoliza && estadoApp.datosReportePoliza.numSerie
      ? estadoApp.datosReportePoliza.numSerie
      : ""
  );

  const [NumPolizaEstado, asignarValorNumPoliza] = useState(
    estadoApp.datosReportePoliza && estadoApp.datosReportePoliza.poliza
      ? estadoApp.datosReportePoliza.poliza
      : ""
  );

  const [
    validarPoliza,
    { loading: loadingValidarPoliza, error: errorValidarPoliza, data: dataValidarPoliza },
  ] = useLazyQuery(
    VALIDACION_POLIZA, { fetchPolicy: "network-only" },
  );

  const [
    reportesExistentes,
    { loading: loadingReportesExistentes, data: dataReportesExistentes, error: errorReportesExistentes },
  ] = useMutation(VALIDAR_REPORTES_EXISTENTES);

  const [
    validarCoberturaPoliza,
    { loading: loadingCoberturaPoliza, error: errorCoberturaPoliza, data: dataCoberturaPoliza },
  ] = useLazyQuery(
    VALIDACION_COBERTURA_POLIZA, { fetchPolicy: "network-only" }
  );

  // !Funciones para validar al cambiar los datos

  const alCambiarFecha = (fecha) => {
    valores.fechaSiniestro = fecha;
  };

  const alCambiarNumeroDePoliza = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.poliza = evento.target.value;
      asignarValorNumPoliza(valor);
      asignarValorfocoPoliza("");
      asignarErrorPoliza("");
    }
  };

  const alCambiarHoraRobo = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.horaRobo = valor;
      asignarValorfocoHoraRobo("");
      asignarErrorHora("");
    }
  };

  const alCambiarNumeroDeSerie = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.numeroDeSerie = evento.target.value;
      asignarValorNumSerie(valor);
      asignarValorfocoNumeroSerie("");
      asignarErrorSerie("");
    }
  };

  const persistirNumSeriePoliza = () => {
    asignarValorNumPoliza(valores.poliza);
    asignarValorNumSerie(valores.numeroDeSerie);
    if (NumPolizaEstado !== "" && valores.poliza !== "") {
      asignarValorNumPoliza(valores.poliza);
      valores.poliza = NumPolizaEstado;
    }

    if (NumSerieEstado !== "" && valores.numeroDeSerie !== "") {
      asignarValorNumSerie(valores.numeroDeSerie);
      valores.numeroDeSerie = NumSerieEstado;
    }
  };

  // !Al iniciar 

  useEffect(() => {
    if (!location?.state?.claim) {
      history.push(location.state.paginaAnterior);
      return;
    }

    if (estadoApp.datosReportePoliza) {
      valores.poliza = estadoApp.datosReportePoliza.poliza || "";
      valores.numeroDeSerie = estadoApp.datosReportePoliza.numSerie || "";
      asignarValorNumPoliza(estadoApp.datosReportePoliza.poliza || "");
      asignarValorNumSerie(estadoApp.datosReportePoliza.numSerie || "");
    }
    
    paginaAnterior = location.state.paginaAnterior;
    setClaim(location.state.claim);

    // !Validar El claim para definir titulo y subtitulo
    setTitle(diccionario.titulos.principalRobo);
    setSubTitle(diccionario.titulos.subRobo);

    // !Validar si hay un recuperarPoliza en el state
    if (location?.state?.recuperarPoliza) {
      const vinState = params.get("vin");
      valores.numeroDeSerie = vinState;
      asignarValorNumSerie(vinState);
    }

    // !Validar si vienen queryParams en la url
    const poliza = params.get("poliza");
    const vin = params.get("vin");
    if (poliza && vin) {
      console.log(poliza, vin);
      valores.numeroDeSerie = vin;
      valores.poliza = poliza;
      asignarValorNumPoliza(poliza);
      asignarValorNumSerie(vin);
    }
    localStorage.removeItem(configFuncionalidadRobo.descripcionRobo.NOMBREAUDIOLS);
  }, []);

   /**
   * 
   * @param codigo string
   * 
   * @description 
   * Valida el codigo recibido y muestra modales de avisos 
   * o redirecciona en caso de que la cobertura este bien
   */
   const validarCodigosCobertura = (codigo) => {
    switch(codigo) {
      case "IMPOL20000":
      case "IMOPO100001":
        asignarValorCargando(false);
        // Todo bien por lo que continuamos con la siguiente página
        dispatch({
          type: ACTIONS_REDUX.AGREGAR,
          indice: "datosReporteRobo",
          indiceExtra: "infoPoliza",
          valor: {
            numeroPoliza: valores.poliza,
            fechaOcurrencia: valores.fechaSiniestro,
            horaRobo: valores.horaRobo,
            numeroSerie: valores.numeroSerieConsulta,
            nombreAsegurado: valores.nombreAsegurado,
            modeloVehiculo: valores.modeloVehiculo,
          },
        });
        history.push({
           pathname: "cuestionario-reportes",
           search: "?tipoReporte=robo",
        });
        break;
      default:
        // Muestra modal de que no hay cobertura
        asignarValorCargando(false);
        asignarMostrarModalSinCobertura(true);
        break;
    }
  }

  /**
   * Función que manda llamar el servicio de validar poliza
   */

  const llamarServicioValidarCobertura = () => {
    let lineaNegocio = "AUTR";
    let agencia = valores.poliza.split("-")[0].split("");
    agencia = asignarCerosAgencia(agencia, agencia.toString().length);

    let polizaG = valores.poliza.split("-")[1].split("");
    polizaG = asignarCerosPoliza(polizaG, polizaG.length);

    const certificado = valores.poliza.split("-")[2];

    console.log("consultando la cobertura");

    /**
     * si no se va a realizar la validación de cobertura se manda directo el código
     * para que simule como que todo paso correctamente sin llamar
     * al servicio
     */
    if (!configFuncionalidadRobo.reportePoliza.validaCobertura) {
      validarCodigosCobertura("IMOPO100001");
    } else {
      // !Aqui va a consultar al back
      validarCoberturaPoliza({
        variables: {
          poliza: polizaG,
          agencia,
          certificado,
          lineaNegocio: lineaNegocio,
          tipoCobertura: 236,
          subEvento: 22
        },
      });
    }
  };

  /**
   * Función para llamar al servicio de reportes existentes
   */
  const llamarServicioReportesExistentes = () => {
    let agencia = valores.poliza.split("-")[0].split("");
    agencia = asignarCerosAgencia(agencia, agencia.toString().length);

    let unicaPoliza = valores.poliza.split("-")[1].split("");
    unicaPoliza = asignarCerosPoliza(unicaPoliza, unicaPoliza.length);

    const certificado = valores.poliza.split("-")[2];

    reportesExistentes({
      variables: {
        lineaNegocio: "AUTR",
        agencia: `${agencia}`,
        certificado: Number(certificado),
        poliza: `${unicaPoliza}`,
      },
    });
  };

  useEffect(() => {
    if (!loadingCoberturaPoliza && dataCoberturaPoliza) {
      if (!!dataCoberturaPoliza.valCobPoliza.dato) {
        validarCodigosCobertura(dataCoberturaPoliza.valCobPoliza.codigo||"");
      } else {
        if (dataCoberturaPoliza.valCobPoliza.mensaje && dataCoberturaPoliza.valCobPoliza.mensaje.includes("Ya existe un reporte")) {
          asignarMostrarModalReporteExistente(true);
        } else {
          asignarMostrarModalSinCobertura(true);
        }
        asignarValorCargando(false);
      }
    } else if (errorCoberturaPoliza) {
      /**
       * Mostrar una alerta de error
       */
      asignarMostrarModalSinCobertura(true);
      asignarValorCargando(false);
    } else if (loadingCoberturaPoliza) {
      asignarValorCargando(true);
    } else if (errorCoberturaPoliza) {
      asignarValorMostrarBarraAlerta(true);
      asignarValorMensajeAlerta(diccionarioRobo.reportePoliza.mensajeDeErrorDefault);
    }
  }, [loadingCoberturaPoliza, dataCoberturaPoliza, errorCoberturaPoliza]);

  useEffect( async () => {
    if (
      !loadingReportesExistentes &&
      dataReportesExistentes &&
      dataReportesExistentes.reporte_validarReportesExistentes
    ) {
      const res = dataReportesExistentes.reporte_validarReportesExistentes;
      if (res.dato) {
        asignarValorCargando(false);
        asignarMostrarModalReporteExistente(true);
      } else {
        // ESTE ES EL SERVICIO DE VALIDACION DE COBERTURA DE GRUA
        if (estadoApp && estadoApp.seatedClaim === "robbery") {
          llamarServicioValidarCobertura();
        }
      }
    } else if (loadingReportesExistentes) {
      asignarValorCargando(true);
    }

    if (errorReportesExistentes) {
      asignarValorMostrarBarraAlerta(true);
      asignarValorMensajeAlerta(diccionarioRobo.reportePoliza.mensajeDeErrorDefault);
    }

    // error
  }, [loadingReportesExistentes, dataReportesExistentes, errorReportesExistentes]);

  /* Efecto para la solicitud de validar poliza */
  useEffect(() => {
    if (!loadingValidarPoliza && dataValidarPoliza && dataValidarPoliza.validar_poliza && dataValidarPoliza.validar_poliza.codigo) {
      switch (dataValidarPoliza.validar_poliza.codigo) {
        case "IMPOL20000":
          setNumeroSerieConsulta(dataValidarPoliza.validar_poliza.dato.vin||"");
          valores.numeroDeSerie = dataValidarPoliza.validar_poliza.dato.vin;
          valores.numeroSerieConsulta = dataValidarPoliza.validar_poliza.dato.vin;
          setNombreAsegurado(dataValidarPoliza.validar_poliza.dato.nombreCompletoAsegurado);
          valores.nombreAsegurado = dataValidarPoliza.validar_poliza.dato.nombreCompletoAsegurado;
          const modeloAuto = dataValidarPoliza.validar_poliza.dato.datosVehiculo.trim().split(",");
          const ultimoDatoModelo = modeloAuto[modeloAuto.length - 1].split(" ");
          setModeloVehiculo(ultimoDatoModelo[ultimoDatoModelo.length-1]||"");
          valores.modeloVehiculo = ultimoDatoModelo[ultimoDatoModelo.length-1]||"";
          asignarValorfocoPoliza("");
          asignarValorfocoHoraRobo("");
          
          if (estadoApp.seatedClaim === "robbery" || estadoApp.seatedClaim === "robo") {
            /**
             * La secuencia es:
             * 1.- se valida la póliza
             * 2.- se validan reportes existentes en la póliza
             * 3.- se valida la cobertura de la póliza
             */
            if (configFuncionalidadRobo.reportePoliza.validarReportesExistentes) {
              // Si este esta activo quiere decir que se van a validar los reportes existentes
              llamarServicioReportesExistentes();
            } else if (configFuncionalidadRobo.reportePoliza.validaCobertura) {
              // si pasa a este caso quiere decir que no se van a validar reportes existentes pero si la cobertura
              llamarServicioValidarCobertura();
            } else {
              // Si llega aquí quiere decir que va omitir las validaciones de reportes existentes y cobertura
              // por lo que s eva a simular que todo correcto
              validarCodigosCobertura("IMOPO100001");
            }
            break;
          }
          break;
        case "IDPOL10006":
          // !Mostrar modal con la info de la póliza vencida
          asignarValorMostrarModalPolizaVencida(true);
          break;
        default:
          asignarValorMostrarBarraAlerta(true);
          asignarValorMensajeAlerta(
            dataValidarPoliza.validar_poliza.mensaje || diccionarioRobo.reportePoliza.mensajeDeErrorDefault
          );
          break;
      }
      asignarValorCargando(false);
    } else if (errorValidarPoliza) {
      asignarValorMostrarBarraAlerta(true);
      asignarValorMensajeAlerta(diccionarioRobo.reportePoliza.mensajeDeErrorDefault);
      asignarValorCargando(false);
    } else if (loadingValidarPoliza) {
      asignarValorCargando(true);
    } else {
      asignarValorfocoPoliza("");
      asignarValorfocoHoraRobo("");
      asignarValorCargando(false);
    }
  }, [loadingValidarPoliza, dataValidarPoliza, errorValidarPoliza]);

  const hacerValidaciones = () => {
    persistirNumSeriePoliza();
    const regexHora = /(?:[01]\d|2[0-3]):(?:[0-5]\d)/;
    const { poliza, numeroDeSerie, horaRobo, fechaSiniestro } = valores;

    if (!valores.poliza) {
      asignarValorfocoPoliza("error");
      asignarErrorPoliza(diccionario.errores.campoRequerido);
      return;
    }

    if (!/^[0-9]{1,5}-*[0-9]{1,10}-*[0-9]{1,5}$/.test(valores.poliza)) {
      asignarValorfocoPoliza("error");
      asignarErrorPoliza("Por favor revisa que el formato sea correcto.");
      return;
    }

    if (!valores.numeroDeSerie || valores.numeroDeSerie.length < 4) {
      asignarValorfocoNumeroSerie("error");
      asignarErrorSerie("Campo requerido para continuar");
      return;
    }

    if (claim === "robbery") {
      if (!regexHora.test(horaRobo) || !horaRobo) {
        asignarValorfocoHoraRobo("error");
        asignarErrorHora(
          "Por favor ingresa una hora valida en formato de 24hrs. Ejemplo: 10:30"
        );
        return;
      }
    }

    // ! Validar fecha previo a envio de servicio
    const fechaOcurrenciaFormat = moment(fechaSiniestro.toDate())
      .utc("America/mexico_city")
      .format();
    const fechaOcurrencia = new Date(fechaOcurrenciaFormat);

    if (claim === "robbery") {

      // !Primero se va a validar la poliza
      validarPoliza({
        variables: {
          poliza: valores.poliza, vin: numeroDeSerie, fechaOcurrencia, codigoError: ""
        }
      });

      // dispatch({
      //   type: ACTIONS_REDUX.AGREGAR,
      //   indice: "datosReporteRobo",
      //   indiceExtra: "infoPoliza",
      //   valor: {
      //     numeroPoliza: poliza,
      //     numeroSerie: numeroDeSerie,
      //     fechaOcurrencia,
      //     horaRobo: valores.horaRobo,
      //   },
      // });
      // history.push({
      //   pathname: "cuestionario-reportes",
      //   search: "?tipoReporte=robo",
      // });
      return;
    }
    // !Se comenta por que no se especifica en la HU
    /* const tieneIntentos = true;
    if (tieneIntentos) {
      // Continuar con el flujo
      // ! Validar datos de póliza y reedirigir
    } else {
      alertaSinIntentos.mostrar();
    } */
  };

  const validarRFCContratante = async () => {
    // asignarValorCargando(true);
    const rfc = await estadoApp?.campoAlertaCampo.data;
    if (rfc) {
      // TODO: Llamar a servicio para encontrar el RFC y verificar la identidad del usuario
      alertaCampo.cerrar();
      alertaDinamica.mostrar();
    }
  };

  return (
    <EnvolvedorPantalla key="pantalla-reporte-identificar">
      {cargando ? <IndicadorCarga /> : null}
      {/* Modal ¿Donde encuentro mi número de póliza? */}
      <Alerta
        textoEncabezado={diccionario.titulos.instruccionesPoliza}
        textoCuerpoJsx={<AlertaImagen src={polizaImg} alt="" />}
        mostrarModal={mostrarModalPoliza}
        manejarCierre={() => {
          asignarValorMostrarModalPoliza(false);
        }}
        mostrarIcono={false}
        margenMinimo
      />
      {/* Modal ¿Donde encuentro mi número de serie? */}
      <Alerta
        textoEncabezado={diccionario.titulos.intruccionesSerie}
        textoCuerpoJsx={<AlertaImagen src={serieImg} alt="" />}
        mostrarModal={mostrarModalSerie}
        manejarCierre={() => {
          asignarValorMostrarModalSerie(false);
        }}
        mostrarIcono={false}
        margenMinimo
      />
      {/* Alerta para mostrar que el asegurado tiene servicio de gps */}
      <Alerta
        {...alertGpsService}
        manejarCierre={() => {
          alertGpsService.cerrar();
        }}
        funcionLlamadaBoton={() => {
          window.open("tel:*434");
        }}
        funcionCerrar={() => {
          console.log("Hola mundi");
        }}
        margenMinimo
      />
      {/* Modal para mostrar cuando la poliza esta vencida */}
      <Alerta
        textoEncabezado="Póliza vencida"
        colorAlerta="rojo"
        textoCuerpo="No fue posible generar el reporte de tu siniestro por la vigencia de tu póliza. <br />Comunícate con nosotros."
        mostrarModal={mostrarModalPolizaVencida}
        manejarCierre={() => {
          asignarValorMostrarModalPolizaVencida(false);
        }}
        etiquetaBoton="Llámanos"
        funcionLlamadaBoton={() => {
          window.location.href = "tel:*434";
        }}
      />
      {/* Modal para mostrar que la póliza tiene un reporte existente */}
      <Alerta
        textoEncabezado=""
        textoCuerpo={`La póliza: ${valores.poliza} ya cuenta con un reporte por atender.`}
        colorAlerta="amarillo"
        tipoIcono="trianguloAlerta"
        mostrarIcono
        mostrarModal={mostrarModalReporteExistente}
        temaBoton="estandar"
        etiquetaBoton="Aceptar"
        funcionLlamadaBoton={() => asignarMostrarModalReporteExistente(false)}
        manejarCierre={() => asignarMostrarModalReporteExistente(false)}
      />
      {/* Modal para mostrar que no tiene la cobertura de robo */}
      <Alerta
        {...diccionarioRobo.reportePoliza.modales.modalSinCobertura}
        mostrarModal={mostrarModalSinCobertura}
        manejarCierre={() => {
          asignarMostrarModalSinCobertura(false);
        }}
        funcionLlamadaBoton={() => {
          asignarMostrarModalSinCobertura(false);
        }}
      />
      <Encabezado
        titulo={
          claim === "robbery"
            ? diccionario.titulos.robo
            : diccionario.titulos.grua
        }
        funcionCerrar={() => {
          history.push("/");
          sessionStorage.removeItem("estadoRedux");
        }}
        estiloBotonRegresar={{}}
      />
      <Pantalla>
        {/* Alerta para mostrar mensajes de error */}
        <BarraAlerta
            etiqueta={mensajeAlerta}
            mostrarAlerta={mostrarBarraAlerta}
            manejarCierre={() => {
              asignarValorMostrarBarraAlerta(false);
            }}
            estilo="error"
            posicionAbsoluta
          />
        <AlertaCampo
          {...alertaCampo}
          manejarCierre={() => {
            alertaCampo.cerrar();
          }}
          funcionLlamadaBoton={() => validarRFCContratante()}
          funcionLlamadaBoton2={() => {
            window.open("tel:*434");
          }}
          nombreCampo="RFC"
          numCaracteresCampo={13}
          regexCampo={/(^[0-9a-zA-Z&Ññ]+$|^$)/}
          validacionesCampo={validarRFC}
          campoMayusculas
        />
        <Titulo id="titulo">{title}</Titulo>
        <MensajePequeno>{subTitle}</MensajePequeno>
        <ContenedorPolizaDanos>
          <CampoTexto
            id="campoPoliza"
            etiqueta="Número de póliza (incluyendo guiones)"
            expresionRegular={/^[0-9-]*$/}
            enCambio={alCambiarNumeroDePoliza}
            foco={focoPoliza}
            valor={valores.poliza}
            iconoAyuda
            numeroDeCaracteres={20}
            openHelp={() => {
              asignarValorMostrarModalPoliza(true);
            }}
          />
        </ContenedorPolizaDanos>
        {errorPoliza !== "" && (
          <MensajeError style={{ marginTop: "20px" }} id="errorPoliza">
            {errorPoliza}
          </MensajeError>
        )}

        <ContenedorPolizaDanos style={{ marginTop: "40px" }}>
          <CampoTexto
            etiqueta="Últimos 4 dígitos de la serie del vehículo"
            iconoAyuda
            enCambio={alCambiarNumeroDeSerie}
            foco={focoNumeroSerie}
            valor={valores.numeroDeSerie}
            id="campoSerie"
            openHelp={() => {
              asignarValorMostrarModalSerie(true);
            }}
          />
        </ContenedorPolizaDanos>
        <MensajeError style={{ marginTop: "20px" }} id="errorNumSerie">
          {errorSerie}
        </MensajeError>

        {claim === "robbery" && (
          <>
            <CampoTexto
              esCalendario
              etiqueta="Fecha de robo"
              icono={iconoCalendario}
              enCambio={alCambiarFecha}
              fechaCalendario={valores.fechaSiniestro}
              id="campoFecha"
            />
            <SeparadorEspacio />

            {<CampoTexto
              esTime
              etiqueta="Hora del robo"
              id="campoHoraRobo"
              icono={iconoReloj}
              enCambio={alCambiarHoraRobo}
              foco={focoHoraRobo}
              times={valores.horaRobo}
              marcador="HH:MM"
            />}
          </>
        )}
        {errorPoliza !== "" && (
          <MensajeError id="errorPoliza" style={{ marginTop: "20px" }}>
            {errorHora}
          </MensajeError>
        )}

        <EnlaceRegistroBienvenida>
          <EnlaceBienvenida
            id="enlaceRegistro"
            enlace
            onClick={() => {
              history.push("/recuperar-poliza", { policy: "AUTR", claim: claim });
            }}
          >
            No cuento con mi póliza
          </EnlaceBienvenida>
        </EnlaceRegistroBienvenida>

        <ContenedorBoton className="primer-boton">
          <Boton
            etiqueta="Comenzar reporte"
            tema="estandar"
            enClick={hacerValidaciones}
          />
        </ContenedorBoton>
        <ContenedorBoton>
          <Boton
            etiqueta="Contacto HDI "
            tema="simple"
            enClick={() => {
              history.push({
                pathname: "/asistencia-hdi",
                state: {
                  tipoAtencion: "robo"
                },
              });
            }}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

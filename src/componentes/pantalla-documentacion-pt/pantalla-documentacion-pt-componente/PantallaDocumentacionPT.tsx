/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import { useLazyQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import IndicadorCarga from "../../indicador-carga";
import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import {
  EnlaceAlerta,
  ParrafoAlerta,
} from "../../pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled";
import ContenedorDocumentacionPT from "./ContenedorDocumentacionPT";
import ListaDocumentos from "./ListaDocumentos";
import {
  IObtenerDocumentos,
  IDatoObtenerDocumentos,
  IGuardarTipoAtencion,
  IEnviarCorreoDocumentacionHDI
} from "../../../interfaces/indemnizacion/Iindemnizacion";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import constantes from "../../../recursos/constantes";
import CampoTexto from "../../campo-texto";
import { ContenedorCampoTexto } from "../../campo-texto/campo-texto-componente/CampoTexto.styled";
import Boton from "../../boton/boton-componente/Boton";
import { MensajeError } from "../../componentes-styled-compartidos/Textos";

const OBTENER_DOCS_REQUERIDOS = loader(
  "../../../graphQL/query/indemnizacion/indemnizacion_obtenerRequisitos.graphql"
);

const GUARDAR_TIPO_ATENCION = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_guardarTipoAtencion.graphql"
);

const ENVIAR_CORREO_DOCUMENTACION_HDI = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_enviar_correo_documentacion_hdi.graphql"
);

const OBTENER_DOC_S3 = loader(
  "../../../graphQL/query/indemnizacion/indemnizacion_obtenerDocumentoS3.graphql"
);

const DERIVAR_PT = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_pt.graphql"
);

const DERIVAR_DG_DP = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_dg_dp.graphql"
);

const configDocumentosNoCompletos = {
  textoEncabezado: "No tengo lo documentos necesarios",
  textoCuerpo:
    "Si no cuentas con todos los documentos necesarios para solicitar la indemnización por pérdida total de tu vehículo, te ofrecemos la opción de solicitar el pago de daños globales. Este pago corresponde <b>APROXIMADAMENTE</b> al 50% del valor comercial del vehículo y requiere menos documentación, lo que te permitirá conservar tu unidad. Contáctanos para conocer los detalles de esta alternativa",
  etiquetaBoton: "Conocer requisitos",
  etiquetaBoton2: "Llamar a HDI",
};

const configConfirmarDaniosGlobales = {
  textoEncabezado: "Daños globales",
  textoCuerpo:
    "Al aceptar, estas indicando que deseas cambiar tu proceso de <b>Indemnización por Pérdida Total</b> al proceso de <b>Indemnización por Daños Globales</b><br /> ¿Seguro que quieres continuar?",
  etiquetaBoton: "Aceptar",
  etiquetaBoton2: "Cancelar",
};

const configAlertaIngresarCorreo = {
  textoEncabezado: "Ingresa tu correo",
  tipoIcono: "email",
  textoCuerpo:
    "",
  // etiquetaBoton: "Enviar",
  nombreCampo: "Correo",
  campoMayusculas: false
};

const configAlertaCorreoEnviado = {
  textoEncabezado: "¡Listo! Te hemos enviado los documentos a tu correo",
  tipoIcono: "email",
  textoCuerpo:
    "",
  etiquetaBoton: "Aceptar",
};

const configConfirmarDanios = {
  textoEncabezado: "Indemnización por daños globales",
  tipoIcono: "danios globales",
  colorAlerta: "rojo",
  etiquetaBoton2: "Siguiente",
};

const configConfirmarDanios2 = {
  textoEncabezado: "Indemnización por daños globales",
  tipoIcono: "danios globales",
  colorAlerta: "rojo",
  etiquetaBoton: "Solicitar pago de daños globales",
  etiquetaBoton2: "Asistencia HDI",
};

const configAlertaConfirmarPT = {
  textoEncabezado: "Indemnización por pérdida total",
  tipoIcono: "perdida total",
  colorAlerta: "rojo",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Conservar mi vehículo",
};

const configAlertaConfirmarParciales = {
  textoEncabezado: "Confirmar pago de daños parciales",
  tipoIcono: "daños parciales",
  colorAlerta: "rojo",
  textoCuerpo:
    "Es importante que sepas que los montos de indemnización y deducible <b>pueden cambiar</b> en el proceso.",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Solicitar reparación",
};

const nombreCookie = constantes.nombreDeCookie;

interface IPushState {
  tipoAtencion: string;
  tipoPersona: string;
}

const valores = {
  campo: "",
};

const PantallaDocumentacionPT = () => {
  const history = useHistory();
  const location = useLocation<IPushState>();
  const params = new URLSearchParams(window.location.search);
  const estadoApp = useSelector((state: IRedux) => state);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  // ! States
  const [tipoPersona, setTipoPersona] = useState("física");
  const [typeDamages, setTypeDamages] = useState("total");
  const [textoBotonAlertaCorreo, setTextoBotonAlertaCorreo] = useState("Enviar");
  const [loadingState, setLoadingState] = useState(true);
  const [docsRequeridos, setDocsRequeridos] = useState<
    IDatoObtenerDocumentos[]
  >([]);
  const [docsHDI, setDocsHDI] = useState<IDatoObtenerDocumentos[]>([]);
  const [errorIngresoCorreo, setErrorIngresoCorreo] = useState<string>("");
  const [errorGeneral, setErrorGeneral] = useState('');

  // ! Alertas
  const alertadocumentosNoCompletos = useAlerta(configDocumentosNoCompletos);
  const alertaConfirmarDaniosGlobales = useAlerta(
    configConfirmarDaniosGlobales
  );
  const alertaIngresarCorreo = useAlerta(configAlertaIngresarCorreo);
  const alertaCorreoEnviado = useAlerta(configAlertaCorreoEnviado);
  const alertaConfirmarDanios = useAlerta(configConfirmarDanios);
  const alertaConfirmarDanios2 = useAlerta(configConfirmarDanios2);
  const alertaConfirmarPT = useAlerta(configAlertaConfirmarPT);
  const alertaConfirmarParciales = useAlerta(configAlertaConfirmarParciales);

  // ! GraphQL
  const [obtenerRequisitos, { data, loading, error }] =
    useLazyQuery<IObtenerDocumentos>(OBTENER_DOCS_REQUERIDOS, {
      fetchPolicy: "no-cache",
    });

  const [
    guardarTipoAtencion,
    {
      data: dataTipoAtencion,
      loading: loadingTipoAtencion,
      error: errorTipoAtencion,
    },
  ] = useMutation<IGuardarTipoAtencion>(GUARDAR_TIPO_ATENCION, {
    fetchPolicy: "no-cache",
  });

  const [
    derivarPT,
    {
      data: dataDerivarPT,
      loading: loadingDerivarPT,
      error: errorDerivarPT
    },
  ] = useMutation<any>(DERIVAR_PT, {
    fetchPolicy: "no-cache",
  });

  const [
    derivarDGDP,
    {
      data: dataDerivarDGDP,
      loading: loadingDerivarDGDP,
      error: errorDerivarDGDP,
    },
  ] = useMutation<any>(DERIVAR_DG_DP, {
    fetchPolicy: "no-cache",
  });

  const [enviarCorreoDocumentacionHdi, { data: dataEnvioCorreo, loading: loadingEnvioCorreo, error: errorEnvioCorreo }] =
    useMutation<IEnviarCorreoDocumentacionHDI>(ENVIAR_CORREO_DOCUMENTACION_HDI,{
      fetchPolicy: "no-cache",
    });

  const [
    descargarDocumentoS3,
    { data: dataDocumentoS3, loading: cargandoDocumentoS3, error: errorDocumentoS3 },
  ] = useLazyQuery(OBTENER_DOC_S3, {
    fetchPolicy: "no-cache",
  });

  // ! Funciones
  const seleccionarPersona = (type: string) => {

    /**
     * Persona fisica   => 1
     * Persona moral    => 2
     * 
     * Pérdida total    => 1
     * Daños globales   => 2
     * Daños parciales  => 3
     * Reporte robo     => 4
     */

    // TODO: Porque el tipoAtencion es en realidad el tipoPersona y viceversa?
    setTipoPersona(type);

    // ! Comienza llamada de servicios para tipo atención PT

    // Cuando se cambia a regimen de persona moral
    if (type === "física" && typeDamages === "total") {
      // TODO: Porque el tipoAtencion es en realidad el tipoPersona y viceversa?
      obtenerRequisitos({
        variables: {
          tipoPersona: 1, // ! tipoAtencion: 1
          tipoAtencion: 1, // ! tipoPersona: 2 (moral)
          token: objetoCookie?.access_token,
        },
      });
      return;
    }

    // Cuando se cambia a regimen de persona física
    if (type === "moral" && typeDamages === "total") {
      obtenerRequisitos({
        variables: {
          tipoPersona: 2, // ! tipoAtencion: 1
          tipoAtencion: 1, // ! tipoPersona: 2 (moral)
          token: objetoCookie?.access_token,
        }, 
      });
      return;
    }

    // ! Comienza llamado de servicios para tipo de atencion de DG

    // Cuando se cambia a regimen de persona moral
    if (type === "física" && typeDamages === "global") {
      obtenerRequisitos({
        variables: {
          tipoPersona: 1,
          tipoAtencion: 2,
          token: objetoCookie?.access_token,
        },
      });
      return;
    }

    // Cuando se cambia a regimen de persona física
    if (type === "moral" && typeDamages === "global") {
      obtenerRequisitos({
        variables: {
          tipoPersona: 2,
          tipoAtencion: 2,
          token: objetoCookie?.access_token,
        },
      });
      return;
    }

    // ! Comienza llamada de servicios para tipo atención DP

    // Cuando se cambia a regimen de persona moral
    if (type === "física" && typeDamages === "parcial") {
      obtenerRequisitos({
        variables: {
          tipoPersona: 1,
          tipoAtencion: 3,
          token: objetoCookie?.access_token,
        },
      });
      return;
    }

    // Cuando se cambia a regimen de persona física
    if (type === "moral" && typeDamages === "parcial") {
      obtenerRequisitos({
        variables: {
          tipoPersona: 2,
          tipoAtencion: 3,
          token: objetoCookie?.access_token,
        },
      });
    }
    
    // Cuando se cambia a regimen de persona fisica
    if (type === "fisica" && typeDamages === "robo") {
      obtenerRequisitos({
        variables: {
          tipoPersona: 1,
          tipoAtencion: 4,
          token: objetoCookie?.access_token,
        },
      });
    }
    
    // Cuando se cambia a regimen de persona moral
    if (type === "moral" && typeDamages === "robo") {
      obtenerRequisitos({
        variables: {
          tipoPersona: 2,
          tipoAtencion: 4,
          token: objetoCookie?.access_token,
        },
      });
    }
  };

  const abrirModalCorreoEnviado = () => {
    alertaConfirmarPT.cerrar();
    alertaConfirmarDanios.cerrar();
    alertaIngresarCorreo.cerrar();
    alertaCorreoEnviado.mostrar();
  };

  useEffect(() => {
    if (!loadingTipoAtencion && errorTipoAtencion) {
      console.log("hay error");
      return;
    }

    if (
      !loadingTipoAtencion &&
      dataTipoAtencion?.indemnizacion_guardarTipoAtencion.completado
    ) {

      // Validar si el pt se manda a derivar al servicio de pt
      if (typeDamages === "total") {
        console.log("Se completa la selección de indemnización y se va a derivar pt");
        derivarPT({
          variables: {
            numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
            token: objetoCookie.access_token,
          }
        });
        return;
      }
      if (typeDamages === "global") {
        // !Se va a mandar a derivar como dg
        console.log("Se completa la selección de daños globales y se va a derivar como daños globales");
        derivarDGDP({
          variables: {
            coberturaPoliza: 6,
            numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
            token: objetoCookie.access_token,
          }
        });
        return;
      }
      
      if (typeDamages === "parcial") {
        // !Se va a mandar a derivar como dg
        console.log("Se completa la selección de daños parciales y se va a derivar como daños parciales");
        derivarDGDP({
          variables: {
            coberturaPoliza: 5,
            numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
            token: objetoCookie.access_token,
          }
        });
        return;
      }

      console.log("No hay typeDamages");
    }

    if (loadingTipoAtencion) {
      setLoadingState(true);
    }

    if (!loadingTipoAtencion) {
      setLoadingState(false);
    }
  }, [dataTipoAtencion, loadingTipoAtencion, errorTipoAtencion]);

  useEffect(() => {
    if (!loadingDerivarPT && dataDerivarPT) {
      // Agregar al localstorage para que se muestre la barra de alerta
      localStorage.setItem('mostrarAlertaIndemnizacion', "1");
      console.log(dataDerivarPT, errorDerivarPT);
      history.push({
        pathname: "pasos-progreso",
        search: `?numeroReporte=${estadoApp.datosReporteCompleto.numeroReporte}`,
      });
    }
    if (loadingDerivarPT) {
      setLoadingState(true);
    }

    if (!loadingDerivarPT) {
      setLoadingState(false);
    }
  }, [dataDerivarPT, loadingDerivarPT, errorDerivarPT]);
  
  useEffect(() => {
    if (!loadingDerivarDGDP && dataDerivarDGDP) {
      // Agregar al localstorage para que se muestre la barra de alerta de reparación
      localStorage.setItem('mostrarAlertaReparacion', "1");
      console.log(dataDerivarDGDP, errorDerivarDGDP);
      history.push({
        pathname: "pasos-progreso",
        search: `?numeroReporte=${estadoApp.datosReporteCompleto.numeroReporte}`,
      });
    }
    if (loadingDerivarDGDP) {
      setLoadingState(true);
    }

    if (!loadingDerivarDGDP) {
      setLoadingState(false);
    }
  }, [dataDerivarDGDP, loadingDerivarDGDP, errorDerivarDGDP]);

  useEffect(() => {

    if (!loadingEnvioCorreo && errorEnvioCorreo) {
      setLoadingState(false);
      return;
    }

    if (
      !loadingEnvioCorreo &&
      dataEnvioCorreo?.enviar_correo_documentacion_hdi.completado
      && dataEnvioCorreo?.enviar_correo_documentacion_hdi.dato === true
    ) {
      abrirModalCorreoEnviado();
      setLoadingState(false);
      setErrorGeneral('');
    }
    else
    {
      if (dataEnvioCorreo?.enviar_correo_documentacion_hdi?.mensaje !== undefined)
      {
        setErrorGeneral(dataEnvioCorreo?.enviar_correo_documentacion_hdi?.mensaje);
      }
      
      setLoadingState(false);
    }

    if (loadingEnvioCorreo) {
      setLoadingState(true);
    }

    valores.campo = '';
  }, [dataEnvioCorreo, errorEnvioCorreo]);

  const cerrarAlerta = () => alertadocumentosNoCompletos.cerrar();
  const cerrarAlertaDaniosGlobales = () =>
    alertaConfirmarDaniosGlobales.cerrar();

  const abrirAlertaDaniosGlobales = () =>
    alertaConfirmarDaniosGlobales.mostrar();

  const cerrarAlertaIngresarCorreo = () => {
    alertaIngresarCorreo.cerrar();
    setErrorIngresoCorreo("");
  };

  const cerrarAlertaCorreoEnviado = () => alertaCorreoEnviado.cerrar();

  const abrirModalDaniosGlobales = () => {
    alertaConfirmarPT.cerrar();
    alertaIngresarCorreo.cerrar();
    alertaCorreoEnviado.cerrar();
    alertaConfirmarDanios.mostrar();
  };

  const abrirModalDaniosGlobales2 = () => {
    alertaConfirmarDanios.cerrar();
    alertaIngresarCorreo.cerrar();
    alertaCorreoEnviado.cerrar();
    alertaConfirmarDanios2.mostrar();
  };

  const abrirModalIngresarCorreo = () => {
    alertaConfirmarPT.cerrar();
    alertaConfirmarDanios.cerrar();
    alertaCorreoEnviado.cerrar();
    alertaIngresarCorreo.mostrar();
    valores.campo = '';
  };

  const comenzarIndemnizacion = () => {
    if (typeDamages === "parcial") {
      alertaConfirmarParciales.mostrar();
      return;
    }

    if (typeDamages === "global") {
      console.log("Se registrará globales");
      guardarTipoAtencion({
        variables: {
          tipoAtencion: 2,
          numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
          numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
          token: objetoCookie.access_token,
        },
      });
      return;
    }
    console.log("Indemnizacion pagos globales");
    alertaConfirmarPT.mostrar();
  };

  const obtenerTipoPersonaInt = (tipoPersonaTexto: string) => {
    if (tipoPersonaTexto === "física") {
      return 1;
    }
    return 2;
  }

  const obtenerTipoAtencionInt = (tipoAtencionTexto: string) => {
    if (tipoAtencionTexto === "total") {
      return 1;
    }
    if (tipoAtencionTexto === "global") {
      return 2;
    }
    if (tipoAtencionTexto === "parcial") {
      return 3;
    }
    if (tipoAtencionTexto === "robo") {
      return 4;
    }
    return 1;
  }

  const obtenerUrlDescargaS3 = (tipoP: number, tipoAtencion: number) =>
  {
    let s3Key;
    if (tipoP === 1 && tipoAtencion === 3)
    {
      s3Key = 'indemnizacion/documentacion-hdi-dp-persona-fisica.zip'
    }
    else if (tipoP === 2 && tipoAtencion === 3)
    {
      s3Key = 'indemnizacion/documentacion-hdi-dp-persona-moral.zip'
    }
    else if (tipoP === 1 && tipoAtencion === 1)
    {
      s3Key = 'indemnizacion/documentacion-hdi-pt-persona-fisica.zip'
    }
    else if (tipoP === 2 && tipoAtencion === 1)
    {
      s3Key = 'indemnizacion/documentacion-hdi-pt-persona-moral.zip'
    }
    else if (tipoP === 1 && tipoAtencion === 2)
    {
      s3Key = 'indemnizacion/documentacion-hdi-dg-persona-fisica.zip'
    }
    else if (tipoP === 2 && tipoAtencion === 2)
    {
      s3Key = 'indemnizacion/documentacion-hdi-dg-persona-moral.zip'
    }

    descargarDocumentoS3({
      variables: {
        url: s3Key,
      },
    });
  }

  //! Efectos
  useEffect(() => {

    const envairCorreoDocumentacionHDI = (key: string) => {

      const { datosReporteCompleto } = estadoApp;

      enviarCorreoDocumentacionHdi({
        variables: {
          urlDescargaDocumentos: key,
          correoElectronico: valores.campo.trim(),
          numeroReporte: datosReporteCompleto.numeroReporte,
          tipoAtencion: obtenerTipoAtencionInt(typeDamages),
          tipoPersona: obtenerTipoPersonaInt(tipoPersona)
        },
      });
    };

    if (
      !cargandoDocumentoS3 &&
      dataDocumentoS3?.obtener_documentos_indemnizacion.completado
    ) {
      envairCorreoDocumentacionHDI(dataDocumentoS3?.obtener_documentos_indemnizacion.dato.url);
    }

    if (cargandoDocumentoS3) {
      setLoadingState(true);
    }
  }, [dataDocumentoS3, cargandoDocumentoS3]);


  useEffect(() => {
    if (params) {
      const tipoAtencion = params.get("tipoAtencion");
      // !TODO: Modificar para tomar un search param y no un state
      // const { tipoAtencion: tipoAtencionState } = location.state;
      if (tipoAtencion === "DP") {
        setTypeDamages("parcial");
        setLoadingState(true);
        obtenerRequisitos({
          variables: {
            tipoAtencion: 3,
            tipoPersona: 1,
            token: objetoCookie?.access_token,
          },
        });
        return;
      }

      if (tipoAtencion === "DG") {
        setTypeDamages("global");
        setLoadingState(true);
        obtenerRequisitos({
          variables: {
            tipoAtencion: 2,
            tipoPersona: 1,
            token: objetoCookie?.access_token,
          },
        });
        return;
      }

      if (tipoAtencion === "PT") {
        setTypeDamages("total");
        // Llamar servicio para obtener documentos para pérdida total y persona fisica
        setLoadingState(true);
        obtenerRequisitos({
          variables: {
            tipoAtencion: 1,
            tipoPersona: 1,
            token: objetoCookie?.access_token,
          },
        });
      }

      if (tipoAtencion === "RT") {
        setTypeDamages("robo");
        // Llamar servicio para obtener documentos de robo y persona fisica
        setLoadingState(true);
        obtenerRequisitos({
          variables: {
            tipoAtencion: 4,
            tipoPersona: 1,
            token: objetoCookie?.access_token,
          },
        });
      }
      console.log("Tipo de atención", tipoAtencion);
    }
  }, []);

  useEffect(() => {
    if (
      (!loading && error) ||
      (!loading && !data?.indemnizacion_obtenerRequisitos?.completado)
    ) {
      setLoadingState(false);
    }

    if (!loading && data?.indemnizacion_obtenerRequisitos?.completado) {
      const resp = data.indemnizacion_obtenerRequisitos.dato;

      const documentacionRequerida = resp.filter(
        (doc) => doc.tipoDocumento === "Requerido"
      );

      const docsHDIFiltrados = resp.filter(
        (doc) => doc.tipoDocumento === "HDI"
      );

      setDocsRequeridos(documentacionRequerida);
      setDocsHDI(docsHDIFiltrados);
      setLoadingState(false);
    }

    if (loading) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [data, loading, error]);

  const onEnviarCorreo = () => {

    if (valores.campo.trim().length <= 1) {
      setErrorIngresoCorreo("error");
      return;
    }

    const expresionRegularCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!expresionRegularCorreo.test(valores.campo)) {
      setErrorIngresoCorreo("error");
      return;
    }

    setErrorIngresoCorreo("");

    const tipoPersonaInt = obtenerTipoPersonaInt(tipoPersona);
    const tipoAtencionInt = obtenerTipoAtencionInt(typeDamages);
    obtenerUrlDescargaS3(tipoPersonaInt, tipoAtencionInt);
    setLoadingState(true);
    cerrarAlertaIngresarCorreo();
  };

  const alcambiarCorreo = (e: any) => {
    if (e) {
      valores.campo = e.target.value;
    }
  }

  const llamarCabina = () => {
    window.location.href = "tel:*434";
  }

  const validarSolicitarDG = () => {
    const proceso = params.get("proceso");
    if (proceso && proceso === "globales") {
      alertaConfirmarDanios2.mostrar();
    } else {
      llamarCabina();
    }
  }

  const redirectRequisitosDG = () => {
    let queryParams = "";
    const proceso = params.get("proceso");
    if (proceso && proceso === "globales") {
      queryParams = "&proceso=globales"
    }
    history.push({
      pathname: "documentacion-indemnizacion",
      search: `?tipoAtencion=DG${queryParams}`,
    });
  }

  return (
    <EnvolvedorPantalla key="pantalla-envolvedor-pt">
      <EncabezadoPolizasSiniestradas
        regresar
        funcionRegresar={() => history.goBack()}
      />
      <Pantalla>
        {loadingState && <IndicadorCarga pantallaCompleta />}

        {/* ALERTAS */}
        <Alerta
          {...alertadocumentosNoCompletos}
          funcionLlamadaBoton={() => {
            cerrarAlerta();
            setTypeDamages("global");
          }}
          funcionLlamadaBoton2={() => {
            window.location.href = "tel:  *434";
          }}
          manejarCierre={() => {
            cerrarAlerta();
          }}
        />
        <Alerta
          {...alertaConfirmarDaniosGlobales}
          funcionLlamadaBoton={() => {
            // cerrarAlerta();
            // TODO: Reedirigir a linea del tiempo
            guardarTipoAtencion({
              variables: {
                tipoAtencion: 2,
                numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
                numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
                token: objetoCookie.access_token,
              },
            });
          }}
          funcionLlamadaBoton2={() => {
            cerrarAlertaDaniosGlobales();
          }}
          manejarCierre={() => {
            cerrarAlertaDaniosGlobales();
          }}
        />

        <Alerta
          {...alertaIngresarCorreo}
          funcionLlamadaBoton2={() => {
            cerrarAlertaIngresarCorreo();
          }}
          manejarCierre={() => {
            cerrarAlertaIngresarCorreo();
          }}
        >
          <ContenedorCampoTexto>
            <CampoTexto
              id="campoUsuario"
              marcador="Ingresa tu correo"
              valor={valores.campo}
              enCambio={alcambiarCorreo}
              foco={errorIngresoCorreo}
            />
          </ContenedorCampoTexto>
          <br />
          {errorIngresoCorreo === "error" && <MensajeError>Correo electrónico no válido</MensajeError>}
          <br />
          <Boton
            etiqueta="Descargar"
            enClick={onEnviarCorreo}
          />
        </Alerta>
        <Alerta
          {...alertaCorreoEnviado}
          funcionLlamadaBoton={() => {
            cerrarAlertaCorreoEnviado();
          }}
          manejarCierre={() => {
            cerrarAlertaCorreoEnviado();
          }}
        />
        <Alerta
          {...alertaConfirmarParciales}
          funcionLlamadaBoton={() => {
            console.log("indemnizacion parciales");
            guardarTipoAtencion({
              variables: {
                tipoAtencion: 3,
                numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
                numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
                token: objetoCookie.access_token,
              },
            });
          }}
          funcionLlamadaBoton2={() => {
            window.location.href = "tel:*434";
          }}
          manejarCierre={alertaConfirmarParciales.cerrar}
        />

        <Alerta
          {...alertaConfirmarPT}
          manejarCierre={alertaConfirmarPT.cerrar}
          funcionLlamadaBoton={() => {
            guardarTipoAtencion({
              variables: {
                tipoAtencion: 1,
                numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
                numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
                token: objetoCookie.access_token,
              },
            });
          }}
          funcionLlamadaBoton2={abrirModalDaniosGlobales}
          tituloArriba
        >
          <div style={{ textAlign: "center" }}>
            <ParrafoAlerta>
              Es importante que sepas que, en este proceso, la compañía
              conservará el vehículo
            </ParrafoAlerta>
            <EnlaceAlerta onClick={abrirModalDaniosGlobales}>
              Ver más información
            </EnlaceAlerta>
            <ParrafoAlerta>
              ¿Deseas confirmar el pago de indemnización por pérdida total?{" "}
            </ParrafoAlerta>
          </div>
        </Alerta>

        <Alerta
          {...alertaConfirmarDanios}
          manejarCierre={alertaConfirmarDanios.cerrar}
          funcionLlamadaBoton2={abrirModalDaniosGlobales2}
          tituloArriba
        >
          <ParrafoAlerta>
            ¿Te falta algún documento para solicitar la indemnización por
            pérdida total? ¿Quieres conservar el vehículo? Tenemos una solución
            para ti: el <b>pago de daños globales.</b>
          </ParrafoAlerta>
          <ParrafoAlerta
            className="enlace"
            onClick={alertaConfirmarDanios.cerrar}
          >
            Regresar a pérdida total
          </ParrafoAlerta>
        </Alerta>
        <Alerta
          {...alertaConfirmarDanios2}
          manejarCierre={alertaConfirmarDanios2.cerrar}
          funcionLlamadaBoton={comenzarIndemnizacion}
          funcionLlamadaBoton2={() => {
            window.location.href = "tel:*434"
          }}
          tituloArriba
        >
          <ParrafoAlerta>
            Este pago equivale aproximadamente al 50% del valor comercial del
            vehículo y requiere menos documentación. ¡Así, podrás conservar tu
            unidad, sin complicaciones adicionales!
          </ParrafoAlerta>
          <ParrafoAlerta>
            Anticípate y{" "}
            <span className="enlace" onClick={redirectRequisitosDG}>
              consulta los requerimientos necesarios
            </span>{" "}
            para llevar este proceso
          </ParrafoAlerta>
        </Alerta>

        {/* Componente normal */}

        <ContenedorDocumentacionPT
          tipoPersona={tipoPersona}
          seleccionarPersona={seleccionarPersona}
          typeDamages={typeDamages}
          abrirAlertaDanosGlobales={validarSolicitarDG}
          alComenzarIndemnizacion={comenzarIndemnizacion}
        >
          {/* Lista de documentos para daños parciales y persona física */}
          <ListaDocumentos
            documentosRequeridos={docsRequeridos}
            documentosHDI={docsHDI}
            key={`documentacion-lista-${tipoPersona}-${typeDamages}`}
          />

          {
            (typeDamages === "parcial") 
              && <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
                  <EnlaceBienvenida
                    id="enlaceRegistro"
                    enlace
                    onClick={() => {
                      abrirModalIngresarCorreo(); 
                    }}
                  >
                    Enviar documentación HDI a mi correo
                  </EnlaceBienvenida>
                </EnlaceRegistroBienvenida>
          }

          {
            (errorGeneral) && <MensajeError>Error al enviar la documentación.</MensajeError>
          }

          {typeDamages === "total" && (
            <>
              <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
                <EnlaceBienvenida
                  enlace
                  onClick={() => alertadocumentosNoCompletos.mostrar()}
                >
                  No tengo la documentación necesaria
                </EnlaceBienvenida>
              </EnlaceRegistroBienvenida>
            </>
          )}
        </ContenedorDocumentacionPT>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaDocumentacionPT;

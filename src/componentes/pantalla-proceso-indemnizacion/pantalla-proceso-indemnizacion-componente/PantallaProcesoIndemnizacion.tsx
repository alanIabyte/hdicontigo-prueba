/* eslint-disable */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { IGuardarTipoAtencion } from "../../../interfaces/indemnizacion/Iindemnizacion";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import constantes from "../../../recursos/constantes";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import AlertaDaniosGlobales from "../../Alerta-danios-globales";
import Boton from "../../boton/boton-componente/Boton";
import {
  EnvolvedorPantalla,
  // Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import { ParrafoAlerta } from "../../pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import { PantallaFondoGris } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import {
  MensajeNormal,
  MensajePequeno,
  TituloMisPolizas,
} from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import LineaProcesoDP from "./LineasProceso/LineaProcesoDP";
import LineaProcesoIndemnizacion from "./LineasProceso/LineaProcesoIndemnizacion";
import "./styles.scss";
import IndicadorCarga from "../../indicador-carga";
import { LineaProcesoRT } from "./LineasProceso/LineaProcesoRT";

const configConfirmarPerdida = {
  textoEncabezado: "Indemnización por pérdida total",
  tipoIcono: "perdida total",
  colorAlerta: "rojo",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Conservar mi vehículo",
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

const GUARDAR_TIPO_ATENCION = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_guardarTipoAtencion.graphql"
);

const DERIVAR_PT = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_pt.graphql"
);

const DERIVAR_DG_DP = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_dg_dp.graphql"
);

const nombreCookie = constantes.nombreDeCookie;

interface ILocation {
  tipoAtencion: string;
}

const PantallaProcesoIndemnizacion = () => {
  const estadoApp = useSelector((state: IRedux) => state);
  const location = useLocation<ILocation>();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  const alertaConfirmarPerdida = useAlerta(configConfirmarPerdida);
  const alertaConfirmarDanios = useAlerta(configConfirmarDanios);
  const alertaConfirmarDanios2 = useAlerta(configConfirmarDanios2);
  const [tipoAtencion, setTipoAtencion] = useState("DP");
  const [loadingState, setLoadingState] = useState(true);

  const history = useHistory();

  const redirect = (site = "timeline") => {
    if (site === "timeline") {
      alertaConfirmarPerdida.mostrar();
      return;
    }

    if (site === "docs") {
      history.push({
        pathname: "/documentacion-indemnizacion",
        search: `?tipoAtencion=${tipoAtencion}`,
      });
      return;
    }

    if (site === "citaAjus") {
      history.push({
        pathname: "/requisitos-reunion-ajustador",
        search: `?tipoAtencion?${tipoAtencion}`,
      });
      return;
    }

    history.push("/asistencia-pt");
  };

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

  const abrirModalDaniosGlobales = () => {
    alertaConfirmarPerdida.cerrar();
    alertaConfirmarDanios.mostrar();
  };

  const abrirModalDaniosGlobales2 = () => {
    alertaConfirmarDanios.cerrar();
    alertaConfirmarDanios2.mostrar();
  };

  const guardarIndemnizacion = (tipoAtencionParam: number) => {
    guardarTipoAtencion({
      variables: {
        tipoAtencion: tipoAtencionParam,
        numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
        numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
        token: objetoCookie.access_token,
      },
    });
  };

  const [
    derivarPT,
    { data: dataDerivarPT, loading: loadingDerivarPT, error: errorDerivarPT },
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

  console.log(location.state);

  useEffect(() => {
    if (location.state && location.state.tipoAtencion) {
      if (location.state.tipoAtencion === "PT") {
        setTipoAtencion("PT");
        return;
      }

      if (location.state.tipoAtencion === "RT") {
        setTipoAtencion("RT");
        return;
      }

      setTipoAtencion("DP");
    }
  }, []);

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
      if (tipoAtencion.toLocaleLowerCase() === "pt") {
        console.log("Se completa la selección de indemnización y se va a derivar pt");
        derivarPT({
          variables: {
            numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
            token: objetoCookie.access_token,
          }
        });
        return;
      }
      if (tipoAtencion.toLocaleLowerCase() === "dg") {
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
      
      if (tipoAtencion.toLocaleLowerCase() === "dp") {
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

  return (
    <EnvolvedorPantalla
      style={{ height: "calc(100vh - 60px)", overflow: "hidden" }}
    >
      <EncabezadoPolizasSiniestradas
        regresar
        funcionRegresar={() => history.goBack()}
      />
      {loadingState && <IndicadorCarga pantallaCompleta />}
      <Alerta
        {...alertaConfirmarPerdida}
        manejarCierre={alertaConfirmarPerdida.cerrar}
        funcionLlamadaBoton={() => guardarIndemnizacion(1)}
        funcionLlamadaBoton2={abrirModalDaniosGlobales}
      >
        <ParrafoAlerta>
          Es importante que sepas que en este proceso la compañía conservará el
          vehículo.{" "}
          <span className="enlace" onClick={abrirModalDaniosGlobales}>
            Ver más información
          </span>
        </ParrafoAlerta>
        <ParrafoAlerta>
          ¿Deseas confirmar el pago de indemnización por pérdida total?
        </ParrafoAlerta>
      </Alerta>
      <AlertaDaniosGlobales
        alertaConfirmarDanios={alertaConfirmarDanios}
        alertaConfirmarDanios2={alertaConfirmarDanios2}
        abrirModalDaniosGlobales2={abrirModalDaniosGlobales2}
        alConfirmarPagoDanios={() => {
          window.location.href = "tel:*434";
        }}
      />
      <PantallaFondoGris style={{ display: "block", position: "relative" }} className="tamanio-movil">
        {/* TITULOS */}
        {tipoAtencion !== "DP" && tipoAtencion !== "RT" && (
          <TituloMisPolizas>Pérdida total de mi vehículo</TituloMisPolizas>
          )}

        {tipoAtencion === "DP" && (
          <TituloMisPolizas>Daños parciales</TituloMisPolizas>
        )}

        {tipoAtencion === "RT" && (
          <TituloMisPolizas>Robo de mi vehículo</TituloMisPolizas>
        )}

        {/* SUBTITULO */}
        {tipoAtencion !== "DP" && tipoAtencion !== "RT" && (
          <MensajePequeno style={{ marginBottom: "0px" }}>
            Recibe tu indemnización en 3 pasos:
          </MensajePequeno>
        )}

        {tipoAtencion === "DP" && (
          <MensajePequeno style={{ marginBottom: "0px" }}>
            Recibe tu indemnización en pocos pasos:
          </MensajePequeno>
        )}

        {tipoAtencion === "RT" && (
          <MensajePequeno style={{ marginBottom: "0px" }}>
            Recibe la indemnización del vehículo robado en pocos pasos:
          </MensajePequeno>
        )}

        {/* CONTENIDO */}

        {tipoAtencion === "DP" && <LineaProcesoDP />}

        {tipoAtencion === "RT" && <LineaProcesoRT />}

        {tipoAtencion !== "DP" && tipoAtencion !== "RT" && <LineaProcesoIndemnizacion />}


        {tipoAtencion !== "DP" && tipoAtencion !== "RT" && (
          <MensajeNormal>
            El tiempo de indemnización puede variar dependiendo cuanto te tome
            reunir la documentación. Anticipate y{" "}
            <span onClick={() => redirect("docs")} className="enlace">
              consulta los requerimientos
            </span>{" "}
            para el trámite.
          </MensajeNormal>
        )}

        {tipoAtencion === "DP" && (
          <MensajeNormal>
            Consulta los documentos y requisitos que debes presentar{" "}
            <span onClick={() => redirect("docs")} className="enlace">
              aquí
            </span>{" "}
          </MensajeNormal>
        )}
        
        {tipoAtencion === "RT" && (
          <>
            <MensajeNormal style={{ marginTop: "4rem" }}>
              Consulta los documentos y requisitos a presentar para iniciar el trámite{" "}
              <span onClick={() => redirect("citaAjus")} className="enlace">
                aquí
              </span>{" "}
            </MensajeNormal>
            <ContenedorBoton style={{ marginTop: "5rem" }}>
              <Boton
                customClass="boton-contacto-hdi"
                etiqueta={"Contacto HDI"}
                tema="simple"
                enClick={() => {
                  window.location.href = "tel:*434";
                }}
                />
            </ContenedorBoton>
          </>
        )}

        {estadoApp?.tipoAtencionIndemnizacion === "No seleccionado" && tipoAtencion === "PT" && (
          <ContenedorBoton>
            <Boton
              etiqueta="Comenzar indemnización"
              enClick={() => redirect("timeline")}
            />
          </ContenedorBoton>
        )}
      </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};

export default PantallaProcesoIndemnizacion;

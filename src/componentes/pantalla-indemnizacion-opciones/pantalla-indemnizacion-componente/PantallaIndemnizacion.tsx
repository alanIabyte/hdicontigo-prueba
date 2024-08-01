/* eslint-disable */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import {
  ContenedorBotones,
  Contenedor,
  Encabezado,
  EnvolvedorIcono,
  TituloAcordeon,
  ParrafoAcordeon,
  ContenidoAcordeon,
} from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import {
  ContenedorBoton,
  MensajePequeno,
} from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import { TituloMisPolizas } from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import IconoProceso from "../../../recursos/iconos/contigo/ico_conoceProceso.svg";
import IconoRequisitos from "../../../recursos/iconos/contigo/ico_conoceRequisitos.svg";
import Boton from "../../boton/boton-componente/Boton";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import { EnlaceAlerta, ParrafoAlerta } from "./PantallaIndemnizacion.styled";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import { IGuardarTipoAtencion } from "../../../interfaces/indemnizacion/Iindemnizacion";
import constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";

const GUARDAR_TIPO_ATENCION = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_guardarTipoAtencion.graphql"
);

const DERIVAR_PT = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_pt.graphql"
);

const DERIVAR_DG_DP = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_dg_dp.graphql"
);

let botones = [
  {
    title: "Conocer el proceso",
    desc: "Conoce los pasos para recibir la indemnización correspondiente  de tu póliza por tu pérdida total.",
    id: "proceso",
    icon: IconoProceso,
  },
  {
    title: "Conocer requisitos",
    desc: "Anticípate y consulta los requerimientos para llevar este proceso",
    id: "requisitos",
    icon: IconoRequisitos,
  },
];

const configAlertaConfirmarPT = {
  textoEncabezado: "Indemnización por pérdida total",
  tipoIcono: "perdida total",
  colorAlerta: "rojo",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Conservar mi vehículo",
};

const configAlertaConfirmarDP = {
  textoEncabezado: "Confirmar pago de daños parciales",
  tipoIcono: "perdida total",
  colorAlerta: "rojo",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Solicitar reparación",
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

const configAlertaToolTipRoboTotalConfirmar = {
  textoEncabezado: "Indemnización por robo total",
  tipoIcono: "robo total",
  colorAlerta: "amarillo",
  etiquetaBoton: "Confirmar",
};

interface IPushState {
  tipoAtencion: string;
}
const nombreCookie = constantes.nombreDeCookie;

const PantallaIndemnizacion = () => {
  const { tipoAtencionIndemnizacion } = useSelector((state: IRedux) => state);
  const history = useHistory();
  const location = useLocation<IPushState>();
  const params = new URLSearchParams(window.location.search);
  const estadoApp = useSelector((state: IRedux) => state);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  const [loadingState, setLoadingState] = useState(true);

  // ! Alertas
  const alertaConfirmarPT = useAlerta(configAlertaConfirmarPT);
  const alertaConfirmarDP = useAlerta(configAlertaConfirmarDP);
  const alertaConfirmarDanios = useAlerta(configConfirmarDanios);
  const alertaConfirmarDanios2 = useAlerta(configConfirmarDanios2);
  const alertaToolTipRoboTotalConfirmar = useAlerta(configAlertaToolTipRoboTotalConfirmar);

  const abrirModalConfirmarIndemnizacionRobo = () => alertaToolTipRoboTotalConfirmar.mostrar();

  // ! States
  const [tipoAtencion, setTipoAtencion] = useState("DG");

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

  // ! Funciones
  const abrirModalDaniosGlobales = () => {
    alertaConfirmarPT.cerrar();
    alertaConfirmarDanios.mostrar();
  };

  const abrirModalDaniosGlobales2 = () => {
    alertaConfirmarDanios.cerrar();
    alertaConfirmarDanios2.mostrar();
  };

  const alertaConfirmarAtencion = () => {
    console.log(tipoAtencion);
    if (tipoAtencion === "PT") {
      alertaConfirmarPT.mostrar();
      return;
    }

    if (tipoAtencion === "DG") {
      alertaConfirmarDanios2.mostrar();
      return;
    }

    if (tipoAtencion === "DP") {
      alertaConfirmarDP.mostrar();
    }

    if (tipoAtencion === "RT") {
      abrirModalConfirmarIndemnizacionRobo();
    }
  };

  const redirect = (id: string) => {
    let proceso = params.get("proceso");
    let queryParam = "";
    if (proceso && proceso === "globales") {
      queryParam = "&proceso=globales"
    }

    if (id === "requisitos") {
      history.push({
        pathname: "documentacion-indemnizacion",
        search: `?tipoAtencion=${tipoAtencion}${queryParam}`,
      });
      return;
    }
    history.push({
      pathname: "conoce-proceso",
      state: {
        tipoAtencion,
        proceso: proceso||""
      },
    });
  };

  const llamarCabina = () => {
    window.location.href = "tel:*434";
  };

  const validarSolicitarDG = () => {
    const proceso = params.get("proceso");
    if (proceso && proceso === "globales") {
      guardarTipoAtencion({
        variables: {
          tipoAtencion: 2,
          numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
          numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
          token: objetoCookie.access_token,
        },
      });
    } else {
      llamarCabina();
    }
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

  useEffect(() => {
    if (params.get("tipoAtencion")) {
      const tipoAtencionParam = params.get("tipoAtencion");
      setTipoAtencion(tipoAtencionParam || "PT");

      if (tipoAtencionParam === "DG" && botones.length === 2) {
        botones.shift();
      }

      if (tipoAtencionParam === "RT") {
        botones[1].desc = "Anticípate y prepara los documentos que debes presentar.";
      }
    }
  }, []);

  return (
    <EnvolvedorPantalla key="envolvedor-pantalla-opciones-indemnizacion">
      {/* TODO: Cambiar encabezado por el de siniestro de vehiculos */}
      <EncabezadoPolizasSiniestradas
        regresar
        funcionRegresar={() => history.goBack()}
      />

      {/* ALERTAS */}
      <Alerta
        {...alertaConfirmarPT}
        manejarCierre={alertaConfirmarPT.cerrar}
        funcionLlamadaBoton={history.goBack}
        funcionLlamadaBoton2={abrirModalDaniosGlobales}
        tituloArriba
      >
        <div style={{ textAlign: "center" }}>
          <ParrafoAlerta>
            Es importante que sepas que, en este proceso, la compañía conservará
            el vehículo
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
        {...alertaConfirmarDP}
        manejarCierre={alertaConfirmarDP.cerrar}
        funcionLlamadaBoton={history.goBack}
        funcionLlamadaBoton2={() => {
          window.location.href = "tel:*434";
        }}
        tituloArriba
      >
        <ParrafoAlerta>
          Es importante que sepas que los montos de indemnización y deducible{" "}
          <b>pueden cambiar</b> en el proceso
        </ParrafoAlerta>
      </Alerta>

      <Alerta
        {...alertaConfirmarDanios}
        manejarCierre={alertaConfirmarDanios.cerrar}
        funcionLlamadaBoton2={abrirModalDaniosGlobales2}
        tituloArriba
      >
        <ParrafoAlerta>
          ¿Te falta algún documento para solicitar la indemnización por pérdida
          total? ¿Quieres conservar el vehículo? Tenemos una solución para ti:
          el <b>pago de daños globales.</b>
        </ParrafoAlerta>
        <ParrafoAlerta
          className="enlace"
          onClick={alertaConfirmarDanios.cerrar}
        >
          {tipoAtencion === "PT"
            ? "Regresar a pérdida total"
            : "Regresar a daños parciales"}
        </ParrafoAlerta>
      </Alerta>
      <Alerta
        {...alertaConfirmarDanios2}
        manejarCierre={alertaConfirmarDanios2.cerrar}
        funcionLlamadaBoton={validarSolicitarDG}
        funcionLlamadaBoton2={redirect}
        tituloArriba
      >
        <ParrafoAlerta>
          Este pago equivale aproximadamente al 50% del valor comercial del
          vehículo y requiere menos documentación. ¡Así, podrás conservar tu
          unidad, sin complicaciones adicionales!
        </ParrafoAlerta>
        <ParrafoAlerta>
          Anticípate y{" "}
          <span className="enlace" onClick={() => redirect("requisitos")}>
            consulta los requerimientos necesarios
          </span>{" "}
          para llevar este proceso
        </ParrafoAlerta>
      </Alerta>

      <Alerta
        {...alertaToolTipRoboTotalConfirmar}
        manejarCierre={alertaToolTipRoboTotalConfirmar.cerrar}
        funcionLlamadaBoton={history.goBack}
      >
        <ParrafoAlerta>
          Es importante que sepas que, al término del proceso de indemnización cederás los derechos del vehículo a HDI Seguros.
        </ParrafoAlerta>
        <br />
        <ParrafoAlerta>
          ¿Deseas confirmar el pago de indemnización de Pérdida Total por Robo?
        </ParrafoAlerta>
      </Alerta>

      {/* Componente normal */}
      <Pantalla>
        {loadingState && <IndicadorCarga pantallaCompleta />}
          {tipoAtencion === "RT" && (
            <TituloMisPolizas>
              ¡Solicita tu proceso de indemnización!
            </TituloMisPolizas>
          )}
          {tipoAtencion !== "RT" && (
            <TituloMisPolizas>
              ¡Comienza tu proceso de indemnización!
          </TituloMisPolizas>
          )}
        {/*
          <MensajePequeno>
            Conoce los pasos para recibir la indemnización correspondiente de tu
            póliza por tu pérdida total
          </MensajePequeno>
        */}
        <MensajePequeno>
          Entérate del proceso y requisitos para realizarlo fácil y rápido
        </MensajePequeno>

        {tipoAtencionIndemnizacion &&
          tipoAtencionIndemnizacion === "No seleccionado" && (
            <ContenedorBotones style={{ gap: "50px" }}>
              {botones.map((boton) => (
                <Contenedor
                  show
                  key={`indemnizacion-${boton.title}`}
                  style={{ padding: "5px" }}
                  onClick={() => redirect(boton.id)}
                >
                  <Encabezado>
                    <EnvolvedorIcono>
                      <img src={boton.icon} alt="" />
                    </EnvolvedorIcono>
                    <ContenidoAcordeon>
                      <TituloAcordeon>{boton.title}</TituloAcordeon>
                      <ParrafoAcordeon>{boton.desc}</ParrafoAcordeon>
                    </ContenidoAcordeon>
                  </Encabezado>
                </Contenedor>
              ))}
            </ContenedorBotones>
          )}

        <ContenedorBoton>
          <Boton
            tema="estandar"
            etiqueta="Solicitar indemnizacion"
            enClick={alertaConfirmarAtencion}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaIndemnizacion;

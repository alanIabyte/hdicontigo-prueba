/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
import { EnlaceAlerta, ParrafoAlerta } from "./PantallaIndemnizacion.styled";

const botones = [
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

const configAlertaDaniosParciales = {
  textoEncabezado: "Confirmar pago de daños parciales",
  tipoIcono: "daños parciales",
  textoCuerpo:
    "Es importante que sepas que los montos de indemnización y deducible <b>pueden cambiar</b> en el proceso.",
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
  etiquetaBoton2: "Contacto HDI",
};

const PantallaIndemnizacion = () => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);

  const alertaConfirmarPT = useAlerta(configAlertaConfirmarPT);
  const alertaConfirmarDanios = useAlerta(configConfirmarDanios);
  const alertaConfirmarDanios2 = useAlerta(configConfirmarDanios2);
  const alertaDaniosParciales = useAlerta(configAlertaDaniosParciales);

  const [tipoAtencion, setTipoAtencion] = useState("PT");

  const abrirModalDaniosGlobales = () => {
    alertaConfirmarPT.cerrar();
    alertaConfirmarDanios.mostrar();
  };

  const abrirModalDaniosGlobales2 = () => {
    alertaConfirmarDanios.cerrar();
    alertaConfirmarDanios2.mostrar();
  };

  const redirect = (id) => {
    if (id === "requisitos") {
      history.push({
        pathname: "documentacion-indemnizacion",
        search: `$tipoAtencion=${tipoAtencion}`,
      });
      return;
    }
    history.push({
      pathname: "conoce-proceso",
      state: {
        tipoAtencion,
      },
    });
  };

  useEffect(() => {
    if (params) {
      const tipoAtencionParam = params.get("tipoAtencion");
      console.log(tipoAtencionParam);
      setTipoAtencion(tipoAtencionParam || "PT");
    }
  }, []);

  return (
    <EnvolvedorPantalla key="envolvedor-pantalla-opciones-indemnizacion">
      {/* TODO: Cambiar encabezado por el de siniestro de vehiculos */}
      <EncabezadoPolizasSiniestradas mostrarMenu />

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
            Quiero conservarlo
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
          ¿Te falta algún documento para solicitar la indemnización por pérdida
          total? ¿Quieres conservar el vehículo? Tenemos una solución para ti:
          el <b>pago de daños globales.</b>
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
          <span className="enlace" onClick={() => redirect("docs")}>
            consulta los requerimientos necesarios
          </span>{" "}
          para llevar este proceso
        </ParrafoAlerta>
      </Alerta>

      <Alerta
        {...alertaDaniosParciales}
        funcionLlamadaBoton={() => console.log("Hola")}
        manejarCierre={() => alertaDaniosParciales.cerrar()}
      />

      {/* Componente normal */}
      <Pantalla>
        <TituloMisPolizas>
          ¡Solicita tu proceso de indmenización! te decimos cómo:
        </TituloMisPolizas>
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

        <ContenedorBoton>
          {tipoAtencion === "DP" && (
            <Boton
              tema="estandar"
              etiqueta="Solicitar indemnizacion"
              enClick={() => alertaDaniosParciales.mostrar()}
            />
          )}

          {tipoAtencion !== "DP" && (
            <Boton
              tema="estandar"
              etiqueta="Solicitar indemnizacion"
              enClick={() => alertaConfirmarPT.mostrar()}
            />
          )}
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaIndemnizacion;

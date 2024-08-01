/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Boton from "../../boton/boton-componente/Boton";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoContenedor from "../../encabezado";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import { PantallaFondoGris } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import { TituloMisPolizas } from "../../pantalla-pago-otra/pantalla-pago-otra-componente/PantallaPagoOtra.styled";
import {
  MensajePequeno,
  MensajeNormal,
} from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { LineaProcesorRobo } from "./lineas-procesos/LineaProcesorRobo";
import { LineaProcesoAsistenciaLegal } from "./lineas-procesos/LineaProcesoAsistenciaLegal";
import { LineaProcesoLegalLiberacionVehiculo } from "./lineas-procesos/LineaProcesoLegalLiberacionVehiculo";
import { SliderPasosRobo } from "./sliders/SliderPasosRobo";
import { SliderPasosAsistenciaLegal } from "./sliders/SliderPasosAsistenciaLegal";
import { SliderPasosLegalVehiculo } from "./sliders/SliderPasosLegalVehiculo";
import { pantallasLineaRobo } from "./utils";
import { ContenedorTimeLine } from "./PantallaPasosQueHacer.styled";
import useRedirect from "../../../utils/useRedirect";
import useValidateLogin from "../../../utils/useValidateLogin";

// ! Este componente esta hecho con condicionales debido a que el flujo de grua puede ser similar. Así podríamos reutilizar el componete

export const PantallaPasosQueHacer = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const claim = params.get("reporte");
  const estadoApp = useSelector((state) => state);
  const [title, setTitle] = useState("");

  // Este state nos ayuda a renderizar la linea de pasos o el slider de pasos deslgosado
  // TODO: Regresar a los pasos, no al slider
  const [pantalla, setPantalla] = useState(pantallasLineaRobo.lineaPasos);

  // Este state nos ayuda para renderizar el paso que el usuario desea conocer a profundidad en el slider
  const [paso, setPaso] = useState(1);

  // Si el usuario accede directamente a la url "conoce-que-hacer" pero no existe un tipo de reporte, lo regresa
  if (!claim) history.goBack();

  /**
   * @summary Esta funcion nos ayuda a reedirigir al usuario al formulario donde puede ingresar su póliza
   * @return {void} realiza una reedirección
   */
  const redirigir = () => {
    if (claim === "robo") {
      const { poliza, numSerie } = estadoApp.datosReportePoliza || {
        poliza: "",
        numSerie: "",
      };
      history.push({
        pathname: `/reporte-identificar`,
        state: {
          claim: "robbery",
          poliza,
          numSerie,
        },
      });
    }
  };

  const redirigirContactoHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoPersona: "f",
        tipoAtencion: "robo",
      },
    });
  };

  /**
   * @summary Esta funcion nos ayuda a determinar si cambiamos el state (porque estamos en el slider) o si regresamos a una página anterior (si estamos en la linea de pasos)
   * @return {void} no retorna nada debido a la reedirección.
   */
  const goBack = () => {
    if (pantalla === pantallasLineaRobo.sliderPasos) {
      setPantalla(pantallasLineaRobo.lineaPasos);
      return;
    }

    history.goBack();
  };

  const { validateUser, user: usuario } = useValidateLogin();

  useEffect(() => {
    if (claim === "robo") {
      setTitle("Reportar robo total");
      // !Validar si el usuario viene sin loguearse eliminar datosReporteRobo del redux
      if (!validateUser || !usuario) {
        dispatch({
          type: "BORRAR",
          indice: "datosReporteRobo",
        });
        dispatch({
          type: "BORRAR",
          indice: "datosReportePoliza",
        });
        console.log("Se eliminó redux del reporte");
      }
      return;
    }
    if (claim === "legal-conductor") {
      setTitle("Liberación del conductor detenido");
      return;
    }
    if (claim === "legal-vehiculo") {
      setTitle("Liberación del vehículo detenido");
      return;
    }

    setTitle("Otra linea");
  }, []);

  return (
    <EnvolvedorPantalla height="100vh">
      <EncabezadoContenedor
        titulo={title}
        funcionRegresar={goBack}
        style={{ height: "100vh" }}
      />
      {/* Validar para mostra */}
      <PantallaFondoGris
        style={
          pantalla === pantallasLineaRobo.lineaPasos
            ? {
                display: "flex",
                justifyContent: "start",
                overflow: "hidden",
                position: "relative",
              }
            : {
                display: "flex",
                alignItems: "flex-start",
                overflow: "hidden",
                overFlowY: "auto",
                position: "relative",
              }
        }
      >
        {pantalla === pantallasLineaRobo.lineaPasos && (
          <>
            {claim === "robo" && (
              <>
                <TituloMisPolizas>¡Estamos contigo!</TituloMisPolizas>
                <MensajePequeno style={{ marginBottom: "5px" }}>
                  Te acompañaremos en cada paso:
                </MensajePequeno>
              </>
            )}

            {claim === "legal-conductor" && (
              <MensajePequeno style={{ marginBottom: "5px" }}>
                El abogado designado gestionará los procedimientos legales para
                liberar al conductor detenido, que incluyen:
              </MensajePequeno>
            )}

            {claim === "legal-vehiculo" && (
              <MensajePequeno style={{ marginBottom: "5px" }}>
                El abogado designado gestionará los procedimientos legales para
                liberar al vehículo detenido, que incluyen:
              </MensajePequeno>
            )}
          </>
        )}

        {/* TODO: Componente que envuelva a la linea del tiempo y al boton? */}
        {claim === "robo" && pantalla === pantallasLineaRobo.lineaPasos && (
          <ContenedorTimeLine id="ContenedorTimeLine">
            <LineaProcesorRobo setPantalla={setPantalla} setPaso={setPaso} />
          </ContenedorTimeLine>
        )}

        {claim === "legal-conductor" &&
          pantalla === pantallasLineaRobo.lineaPasos && (
            <ContenedorTimeLine id="ContenedorTimeLine">
              <LineaProcesoAsistenciaLegal
                setPantalla={setPantalla}
                setPaso={setPaso}
              />
            </ContenedorTimeLine>
          )}

        {claim === "legal-vehiculo" &&
          pantalla === pantallasLineaRobo.lineaPasos && (
            <ContenedorTimeLine id="ContenedorTimeLine">
              <LineaProcesoLegalLiberacionVehiculo
                setPantalla={setPantalla}
                setPaso={setPaso}
              />
            </ContenedorTimeLine>
          )}

        {claim === "robo" && pantalla === pantallasLineaRobo.lineaPasos && (
          <>
            <ContenedorBoton>
              <Boton
                etiqueta="Comenzar reporte"
                enClick={redirigir}
                tema="estandar"
              />
            </ContenedorBoton>
            <Boton
              etiqueta="Contacto HDI"
              enClick={redirigirContactoHDI}
              tema="simple"
            />
          </>
        )}

        {(claim === "legal-conductor" || claim === "legal-vehiculo") &&
          pantalla === pantallasLineaRobo.lineaPasos && (
            <>
              <ContenedorBoton>
                <MensajeNormal>
                  <b>¿Tienes dudas? te apoyamos a resolverlas</b>
                </MensajeNormal>
                <Boton
                  etiqueta="Llamar a HDI"
                  enClick={() => {
                    window.location.href = "tel:8006673144";
                  }}
                  tema="estandar"
                />
              </ContenedorBoton>
            </>
          )}

        {claim === "robo" && pantalla === pantallasLineaRobo.sliderPasos && (
          <SliderPasosRobo
            setPantalla={setPantalla}
            paso={paso}
            setPaso={setPaso}
          />
        )}
        {claim === "legal-conductor" &&
          pantalla === pantallasLineaRobo.sliderPasos && (
            <SliderPasosAsistenciaLegal
              setPantalla={setPantalla}
              paso={paso}
              setPaso={setPaso}
            />
          )}
        {claim === "legal-vehiculo" &&
          pantalla === pantallasLineaRobo.sliderPasos && (
            <SliderPasosLegalVehiculo
              setPantalla={setPantalla}
              paso={paso}
              setPaso={setPaso}
            />
          )}
      </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};

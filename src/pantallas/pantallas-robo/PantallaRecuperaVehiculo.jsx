/* eslint-disable */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
import { EnvolvedorPantalla } from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import { TituloMisPolizas } from "../../componentes/pantalla-pago-otra/pantalla-pago-otra-componente/PantallaPagoOtra.styled";
import { PantallaFondoGris } from "../../componentes/pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import { MensajePequeno } from "../../componentes/pantalla-preguntas-frecuentesPT/PantallaPreguntasFrecuentesPT.styled";
import ImagenFlecha from "../../recursos/iconos/RT/flecha-gris.svg";
import "../../componentes/pantalla-pasos-reporte-robo/pantalla-pasos-reporte-robo-componente/sliders/styles.scss";
import { ContenedorTimeLine, EnlaceInlineTexto } from "../../componentes/pantalla-pasos-reporte-robo/pantalla-pasos-reporte-robo-componente/PantallaPasosReporteRobo.styled";
import EncabezadoContenedor from "../../componentes/encabezado";
import { useHistory } from "react-router-dom";
import { Boton } from "../../componentes";

export const PantallaRecuperaVehiculo = () => {

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const irContactoHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo"
      },
    });
  };

  const irDocumentos = () => {
    history.push({
      pathname: "/requisitos-liberacion-vehiculo"
    });
  };

  return (
    <EnvolvedorPantalla>
      <EncabezadoContenedor
        titulo="Reportar robo total"
        funcionRegresar={goBack}
        style={{height: "100vh"}}
      />
        <PantallaFondoGris
          style={{
            display: "flex",
            justifyContent: "start",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <TituloMisPolizas>Recupera tu vehículo</TituloMisPolizas>
          <MensajePequeno style={{ marginBottom: "5px" }}>
            Tu vehículo ha sido localizado, mantente al tanto para que podamos
            ayudarte a liberarlo.
          </MensajePequeno>
          <ContenedorTimeLine>
            <Timeline
              className="timeline-position"
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                  position: "absolute",
                },
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="color-contenedor-verde">
                    <h6>1</h6>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent className="text-14">
                  Inicio del proceso
                  <div className="contenedor-flex-boton">
                    <MensajePequeno style={{ height: "30px" }}>
                      Un apoderado se contactará contigo para iniciar el proceso de liberación.
                    </MensajePequeno>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="color-contenedor-verde">
                    <h6>2</h6>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent className="text-14">
                  Reúne tus documentos
                  <div className="contenedor-flex-boton">
                    <MensajePequeno style={{ height: "20px" }}>
                      Reúne los <EnlaceInlineTexto onClick={irDocumentos}>documentos necesarios</EnlaceInlineTexto>{" "}
                      para la liberación.
                    </MensajePequeno>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="color-contenedor-verde">
                    <h6>3</h6>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent className="text-14">
                  Entrega los documentos
                  <div className="contenedor-flex-boton">
                    <MensajePequeno style={{ height: "20px" }}>
                      Acude al corralón y entrega tus documentos.
                    </MensajePequeno>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="color-contenedor-verde">
                    <h6>4</h6>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent className="text-14">
                  Continúa tu proceso
                  <div className="contenedor-flex-boton">
                    <MensajePequeno style={{ height: "20px" }}>
                      Sigue las indicaciones de tu apoderado para continuar con tu proceso.
                    </MensajePequeno>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
            <div className="contenedor-flecha-pasos-recupera-vehciulo">
              <img src={ImagenFlecha} alt="" />
            </div>
          </ContenedorTimeLine>
          <Boton
            etiqueta="Contacto HDI"
            enClick={() => {
              irContactoHDI();
            }}
            tema={"simple"}
          />
        </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};

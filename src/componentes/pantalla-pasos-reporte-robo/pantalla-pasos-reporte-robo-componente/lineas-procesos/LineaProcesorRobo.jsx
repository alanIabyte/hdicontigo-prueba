/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/prefer-default-export */
import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { MensajePequeno } from "../../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import IconoReporta from "../../../../recursos/iconos/RT/1-linea.svg";
import IconoGenera from "../../../../recursos/iconos/RT/2-linea.svg";
import IconoSeguimiento from "../../../../recursos/iconos/RT/3-linea.svg";
import IconoLocaliza from "../../../../recursos/iconos/RT/4-linea.svg";
import IconoIndemniza from "../../../../recursos/iconos/RT/5-linea.svg";
import ImagenFlecha from "../../../../recursos/iconos/RT/flecha-gris.svg";
import FlechaVerde from "../../../../recursos/iconos/RT/flecha-verde.svg";
import { pantallasLineaRobo } from "../utils";
import "../sliders/styles.scss";

// ! TODO: Segunda pantalla con slider para describir cada paso
export const LineaProcesorRobo = ({ setPantalla, setPaso }) => {
  const reedirigirPaso = (paso) => {
    setPaso(paso);
    setPantalla(pantallasLineaRobo.sliderPasos);
  };

  return (
    <>
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
            <TimelineDot className="color-contenedor-blanco">
              <img src={IconoReporta} alt="icono-reporta" width={27} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Reporta a las autoridades
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Reporta al 911 desde aquí.
              </MensajePequeno>
              <img
                src={FlechaVerde}
                alt=""
                onClick={() => reedirigirPaso(1)}
                className="elemento-click"
              />
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="color-contenedor-blanco">
              <img src={IconoGenera} alt="icono-reporta" width={40} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Genera tu reporte
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Desde aquí o vía telefónica.
              </MensajePequeno>
              <img
                src={FlechaVerde}
                alt=""
                onClick={() => reedirigirPaso(2)}
                className="elemento-click"
              />
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="color-contenedor-blanco">
              <img src={IconoSeguimiento} alt="" width={35} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            Da segumiento
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "15px" }}>
                Con el acompañamiento de un ajustador.
              </MensajePequeno>
              <img
                src={FlechaVerde}
                alt=""
                onClick={() => reedirigirPaso(3)}
                className="elemento-click"
              />
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="color-contenedor-blanco">
              <img src={IconoLocaliza} alt="" width={35} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Localización de tu vehículo
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Si localizas el vehículo, no olvides avisarnos.
              </MensajePequeno>
              <img
                src={FlechaVerde}
                alt=""
                onClick={() => reedirigirPaso(4)}
                className="elemento-click"
              />
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="color-contenedor-blanco">
              <img src={IconoIndemniza} alt="" width={30} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Recibe tu indemnización
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Luego del proceso, recibe la indemnización del siniestro
                reportado.
              </MensajePequeno>
              <img
                src={FlechaVerde}
                alt=""
                onClick={() => reedirigirPaso(5)}
                className="elemento-click"
              />
            </div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <div className="contenedor-flecha-pasos-reporte-robo">
        <img src={ImagenFlecha} alt="" />
      </div>
    </>
  );
};

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
import IconoDictamenLesiones from "../../../../recursos/iconos/ico_dictamen_lesiones.svg";
import IconoDictamenResponsabilidad from "../../../../recursos/iconos/ico_dictamen_responsabilidad.svg";
import IconoComprobacionResidencia from "../../../../recursos/iconos/ico_comprobacion_residecncia.svg";
import IconoBoletaLiberacion from "../../../../recursos/iconos/ico-boleta_liberacion.svg";
import ImagenFlecha from "../../../../recursos/iconos/RT/flecha-gris.svg";
import FlechaVerde from "../../../../recursos/iconos/RT/flecha-verde.svg";
import Boton from "../../../boton";
import { pantallasLineaRobo } from "../utils";
import "../sliders/styles.scss";

// ! TODO: Segunda pantalla con slider para describir cada paso
export const LineaProcesoAsistenciaLegal = ({ setPantalla, setPaso }) => {
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
              <img src={IconoDictamenLesiones} alt="icono-reporta" width={40} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Dictamen de lesiones
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Es básicamente cuando un medico legista revisa si hay alguna
                herida o lesión debido al accidente.
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
              <img
                src={IconoDictamenResponsabilidad}
                alt="icono-reporta"
                width={40}
              />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Dictamen de responsabilidad
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Expertos investigan a fondo para entender cómo ocurrió el
                accidente.
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
              <img src={IconoComprobacionResidencia} alt="" width={40} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            Comprobación de residencia
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "15px" }}>
                Es para poder asistir a las audiencias en el lugar del accidente
                y continuara el proceso legal.
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
              <img src={IconoBoletaLiberacion} alt="" width={40} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Entrega de boleta de liberación
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Es la firma de un documentó legal que le permite a la persona
                detenida quedar en libertad.
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
      </Timeline>
      <div className="contenedor-flecha-pasos-reporte-legal">
        <img src={ImagenFlecha} alt="" />
      </div>
    </>
  );
};

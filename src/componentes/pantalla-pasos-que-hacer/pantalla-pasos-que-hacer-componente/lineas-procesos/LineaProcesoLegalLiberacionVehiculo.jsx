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
import IconoPuestaDisposicion from "../../../../recursos/iconos/ico-puesta-disposicion.svg";
import IconoAcreditacionVehiculo from "../../../../recursos/iconos/ico_acreditacion_vehiculo.svg";
import IconoInvestigacionCaso from "../../../../recursos/iconos/ico_investigacion_caso.svg";
import IconoResolucionCaso from "../../../../recursos/iconos/ico_resolucion_caso.svg";
import IconoOficioLiberacion from "../../../../recursos/iconos/ico_oficio_liberacion.svg";
import ImagenFlecha from "../../../../recursos/iconos/RT/flecha-gris.svg";
import FlechaVerde from "../../../../recursos/iconos/RT/flecha-verde.svg";
import Boton from "../../../boton";
import { pantallasLineaRobo } from "../utils";
import "../sliders/styles.scss";

// ! TODO: Segunda pantalla con slider para describir cada paso
export const LineaProcesoLegalLiberacionVehiculo = ({
  setPantalla,
  setPaso,
}) => {
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
              <img
                src={IconoPuestaDisposicion}
                alt="icono-reporta"
                width={40}
              />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Puesta a disposición
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                La autoridad que llega al ligar del accidente abre una carpeta
                de investigación.
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
                src={IconoAcreditacionVehiculo}
                alt="icono-reporta"
                width={40}
              />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Acreditación del vehículo
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Es confirmar la propiedad del auto detenido.
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
              <img src={IconoInvestigacionCaso} alt="" width={40} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            Investigación del caso
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "15px" }}>
                Se procede con el protocolo de investigación para el caso.
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
              <img src={IconoResolucionCaso} alt="" width={40} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Resolución del caso
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                Expertos se aseguran de que el auto no este relacionado con
                actividades ilegales.
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
              <img src={IconoOficioLiberacion} alt="" width={40} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="text-14">
            Emisión del Oficio de liberación
            <div className="contenedor-flex-boton">
              <MensajePequeno style={{ height: "0px" }}>
                La autoridad aprueba los informes presentados.
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

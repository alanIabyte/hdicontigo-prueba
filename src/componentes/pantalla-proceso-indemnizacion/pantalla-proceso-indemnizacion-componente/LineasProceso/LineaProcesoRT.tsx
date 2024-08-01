/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/prefer-default-export */
import React from "react";
import "../styles.scss";
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
import IconDocumentosReq from "../../../../recursos/iconos/Insumos PT/ReuneTusDocs.svg";
import IconEntrega from "../../../../recursos/iconos/contigo/Ayudas-linea-tiempo/ico_entrega.svg";
import IconPago from "../../../../recursos/iconos/Insumos PT/Modal pago de indem.svg";
import TimelineConnector from "@mui/lab/TimelineConnector";

interface IProps {
  // setPantalla: React.Dispatch<React.SetStateAction<string>>;
}

// ! TODO: Segunda pantalla con slider para describir cada paso
export const LineaProcesoRT = ({ }: IProps) => {
  // const reedirigirPaso = () => {
  //   setPantalla("menu");
  // };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Timeline
          position="right"
          sx={{
            "& .MuiTimelineItem-root:before": {
              flex: 0,
              padding: 0,
            },
          }}
        >
          <TimelineItem style={{ marginBottom: "1rem" }}>
            <TimelineSeparator>
              <TimelineDot className="color-contenedor-blanco">
                <img src={IconDocumentosReq} alt="icono-docs-requeridos" className="centrar-imagen" />
              </TimelineDot>
              <TimelineConnector className="color-verde-linea" />
            </TimelineSeparator>
            <TimelineContent className="text-14" style={{ paddingTop: "12px" }}>
              Reúne tus documentos.
            </TimelineContent>
          </TimelineItem>

          <TimelineItem style={{ marginBottom: "1rem" }}>
            <TimelineSeparator>
              <TimelineDot className="color-contenedor-blanco">
                <img src={IconEntrega} alt="icono-reporta" className="centrar-imagen tamanio-icono" />
              </TimelineDot>
              <TimelineConnector className="color-verde-linea" />
            </TimelineSeparator>
            <TimelineContent className="text-14">
                Preséntalos en alguna de nuestras oficinas de atención.
            </TimelineContent>
          </TimelineItem>

          <TimelineItem style={{ marginBottom: "1rem" }}>
          <TimelineSeparator>
            <TimelineDot className="color-contenedor-blanco">
              <img src={IconPago} alt="" style={{ width: "40px" }} />
            </TimelineDot>
            <TimelineConnector className="color-verde-linea" />
          </TimelineSeparator>
          <TimelineContent style={{ marginTop: "10px", paddingTop: "12px" }}>
            Recibe tu pago
          </TimelineContent>
        </TimelineItem>
        </Timeline>
        <div className="contenedor-flecha-pequeno" style={{ top: "15px", height: "280px" }}>
          <img src={ImagenFlecha} alt="" />
        </div>
      </div>
    </>
  );
};

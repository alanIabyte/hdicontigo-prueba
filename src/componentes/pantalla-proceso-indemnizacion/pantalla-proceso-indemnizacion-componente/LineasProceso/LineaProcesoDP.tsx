/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import "../styles.scss";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import IconEntrega from "../../../../recursos/iconos/Insumos PT/Modal entrega de docs.svg";
import IconDocumentosReq from "../../../../recursos/iconos/Insumos PT/ReuneTusDocs.svg";
import IconPago from "../../../../recursos/iconos/Insumos PT/Modal pago de indem.svg";

export default function LineaProcesoDP() {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-contenedor-blanco">
            <img src={IconDocumentosReq} alt="" className="centrar-imagen" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="text-14">
          Reúne tus documentos requeridos
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-contenedor-blanco">
            <img src={IconEntrega} alt="" className="centrar-imagen" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="text-14">
          Preséntate en alguna de nuestras oficinas a firmar tu finiquito.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-contenedor-blanco">
            <img src={IconPago} alt="" style={{ width: "40px" }} />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent style={{ marginTop: "10px" }}>
          Recibe tu pago
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

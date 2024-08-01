/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import "../styles.scss";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import IconEntrega from "../../../../recursos/iconos/Insumos PT/Modal entrega de docs.svg";
import IconDocumentosReq from "../../../../recursos/iconos/Insumos PT/ReuneTusDocs.svg";
import IconPago from "../../../../recursos/iconos/Insumos PT/Modal pago de indem.svg";

export default function LineaProcesoIndemnizacion() {
  return (
    <Timeline
      position="right"
      sx={{
        "& .MuiTimelineItem-root:before": {
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
          <TimelineConnector className="color-verde-linea" />
        </TimelineSeparator>
        <TimelineContent className="text-14">
          Reúne tus documentos requeridos requeridos.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-contenedor-blanco">
            <img
              src={IconEntrega}
              alt=""
              className="centrar-imagen tamanio-icono"
            />
          </TimelineDot>
          <TimelineConnector className="color-verde-linea" />
        </TimelineSeparator>
        {/* <TimelineContent className="text-14">
          Entrega los documentos físicamente en nuestras oficinas.
        </TimelineContent> */}
        <TimelineContent className="text-14">
          Entrégalos físicamente en nuestras oficinas.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-contenedor-blanco">
            <img src={IconPago} alt="" style={{ width: "40px" }} />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent style={{ marginTop: "10px" }}>
          Recibe el pago estipulado en la cobertura &quot;Pérdida Total&quot; de
          tu póliza.
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

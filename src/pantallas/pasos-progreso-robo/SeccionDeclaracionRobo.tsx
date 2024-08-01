/* eslint-disable */
/* eslint-disable import/prefer-default-export */
import React from "react";
import {
  EnvolvedorReporteSiniestro,
  ReporteSiniestroValor,
} from "../../componentes/reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";

type IProps = {
  declaracion?: string;
  esAudio: boolean;
}

export const SeccionDeclaracionReporteRobo = ({declaracion, esAudio = false} : IProps) => {
  return (
    <EnvolvedorReporteSiniestro>
      {esAudio ? (
        <>
          <div style={{ width: "100%", marginBottom: "1rem" }}>
            <audio controls src={declaracion} />
          </div>
        </>
      ) : (
        <>
          <ReporteSiniestroValor>{declaracion}</ReporteSiniestroValor>
        </>
      )}
    </EnvolvedorReporteSiniestro>
  );
};

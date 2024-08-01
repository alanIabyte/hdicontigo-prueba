/* eslint-disable import/prefer-default-export */
import React from "react";
import {
  EnvolvedorReporteSiniestro,
  ReporteSiniestroCampo,
  ReporteSiniestroValor,
} from "../../reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";

export const SeccionLocalizacionVehiculo = () => (
  <EnvolvedorReporteSiniestro>
    <ReporteSiniestroCampo>Estatus</ReporteSiniestroCampo>
    <ReporteSiniestroValor>No localizado</ReporteSiniestroValor>
    <ReporteSiniestroCampo>Última actualización: </ReporteSiniestroCampo>
    <ReporteSiniestroValor>DD/MM/YYYY</ReporteSiniestroValor>

    {/* Agregar botón para agendar cita */}
  </EnvolvedorReporteSiniestro>
);

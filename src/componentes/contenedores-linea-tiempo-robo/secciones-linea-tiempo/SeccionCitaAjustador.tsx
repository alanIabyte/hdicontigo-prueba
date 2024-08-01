/* eslint-disable prettier/prettier */
import React from 'react'
import {
  EnvolvedorReporteSiniestro,
  ReporteSiniestroCampo,
  ReporteSiniestroValor,
} from "../../reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";

// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const SeccionCitaAjustador = () => {
  return (
    <EnvolvedorReporteSiniestro>
    <ReporteSiniestroCampo>Estatus de la cita</ReporteSiniestroCampo>
    <ReporteSiniestroValor>Aceptada</ReporteSiniestroValor>
    <ReporteSiniestroCampo>Fecha: </ReporteSiniestroCampo>
    <ReporteSiniestroValor>DD/MM/YYYY</ReporteSiniestroValor>

    <ReporteSiniestroCampo>Hora del reporte: </ReporteSiniestroCampo>
    <ReporteSiniestroValor>HH:MM PM</ReporteSiniestroValor>

    <ReporteSiniestroCampo>Lugar de la cita: </ReporteSiniestroCampo>
    <ReporteSiniestroValor>Dirección</ReporteSiniestroValor>

  </EnvolvedorReporteSiniestro>
  )
}

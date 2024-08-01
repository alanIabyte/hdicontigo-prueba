/* eslint-disable */
/* eslint-disable import/prefer-default-export */
import React from "react";
import {
  EnvolvedorReporteSiniestro,
  ReporteSiniestroCampo,
  ReporteSiniestroValor,
} from "../../componentes/reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";
import { IResumenReporteRobo } from "../../interfaces/Robo/IResumenRobo";

type IProps = {
  resumenRobo: IResumenReporteRobo;
}

export const SeccionResumenReporte = ({ resumenRobo = { ajustador: "", horaReporte: "", numeroReporte: "", numeroReporte911: "" } }: IProps) => (
  <EnvolvedorReporteSiniestro>
    <ReporteSiniestroCampo>Número de reporte</ReporteSiniestroCampo>
    <ReporteSiniestroValor>{resumenRobo.numeroReporte}</ReporteSiniestroValor>
    <ReporteSiniestroCampo>Número de reporte 911</ReporteSiniestroCampo>
    <ReporteSiniestroValor>{resumenRobo.numeroReporte911}</ReporteSiniestroValor>
    <ReporteSiniestroCampo>Hora del reporte</ReporteSiniestroCampo>
    <ReporteSiniestroValor>{resumenRobo.horaReporte}</ReporteSiniestroValor>
    <ReporteSiniestroCampo>Ajustador</ReporteSiniestroCampo>
    <ReporteSiniestroValor>{resumenRobo.ajustador}</ReporteSiniestroValor>
  </EnvolvedorReporteSiniestro>
);

/* eslint-disable prettier/prettier */
import React from 'react'
import {
  EnvolvedorReporteSiniestro,
  ReporteSiniestroCampo,
} from "../../reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";

// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const SeccionResultadoRobo = () => {

  // Puede darse el caso de que la indemnización no proceda debido a que la póliza no esta activa
  return (
    <EnvolvedorReporteSiniestro>
    <ReporteSiniestroCampo>Resultado: Robo total</ReporteSiniestroCampo>

    {/* <ReporteSiniestroCampo>Resultado: El tiempo de verificación de tu siniestro ha concluido, te damos algunas opciones que puedes hacer</ReporteSiniestroCampo> */}

    {/* Botones para solicitar indemnizacion, contacto HDI o conocer detalle de DP o PT */}
  </EnvolvedorReporteSiniestro>
  )
}

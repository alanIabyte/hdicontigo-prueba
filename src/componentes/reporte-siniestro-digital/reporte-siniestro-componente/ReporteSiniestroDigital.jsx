import React from "react";
import PropTypes from "prop-types";
import {
  EnvolvedorReporteSiniestro,
  ReporteSiniestroCampo,
  ReporteSiniestroValor,
} from "./ReporteSiniestro.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import agregarFormatoDeFecha from "../../utilidades-compartidas/agregarFormatoFecha";

const diccionario = {
  numero: "Número de reporte",
  hora: "Hora",
  siniestros: "Siniestros",
  ajustador: "Ajustador",
  horaArribo: "Arribo de ajustador",
};

const ReporteSiniestroDigital = (props) => {
  const { datosReporteSiniestro } = props;
  const numeroReporte = obtenerValorDeArregloDeStrings(
    datosReporteSiniestro,
    "Reporte: "
  );
  const horaSiniestro = obtenerValorDeArregloDeStrings(
    datosReporteSiniestro,
    "Hora: "
  );
  const horaSiniestroFormato = agregarFormatoDeFecha(horaSiniestro);

  const siniestros = obtenerValorDeArregloDeStrings(
    datosReporteSiniestro,
    "Siniestro: "
  );
  return (
    <EnvolvedorReporteSiniestro>
      <ReporteSiniestroCampo>{diccionario.numero}</ReporteSiniestroCampo>
      <ReporteSiniestroValor>{numeroReporte}</ReporteSiniestroValor>
      <ReporteSiniestroCampo>{diccionario.hora}</ReporteSiniestroCampo>
      <ReporteSiniestroValor>{horaSiniestroFormato}</ReporteSiniestroValor>
      <ReporteSiniestroCampo>{diccionario.siniestros}</ReporteSiniestroCampo>
      <ReporteSiniestroValor>{siniestros}</ReporteSiniestroValor>
    </EnvolvedorReporteSiniestro>
  );
};

ReporteSiniestroDigital.defaultProps = {
  datosReporteSiniestro: [],
};

ReporteSiniestroDigital.propTypes = {
  datosReporteSiniestro: PropTypes.arrayOf(PropTypes.string),
};

export default ReporteSiniestroDigital;

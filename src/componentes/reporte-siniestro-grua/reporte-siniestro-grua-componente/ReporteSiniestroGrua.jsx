/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import {
  Envolvedor,
  Campo,
  Valor,
  Circulo,
  Encabezado,
  ContenedorValorCirculo,
} from "./ReporteSiniestroGrua.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";

const diccionario = {
  estatus: "Estatus de asistencia",
  numeroReporte: "Numero del reporte",
  fecha: "Fecha",
  estado: "Estado",
  municipio: "Municipio",
  tipoReporte: "Tipo reporte",
  personaReporta: "Persona que reporta",
  telefono: "Teléfono",
  placas: "Placas del vehículo",
  color: "Color del vehículo",
  declaracion: "Declaración del reporte",
};

const ReporteSiniestroGrua = (props) => {
  const { datos, estatusReporte } = props;

  const estado = datos.data.Estado;
  const numeroReporte = datos.data.NumeroReporte;
  const fecha = datos.data.FechaReporte;
  const municipio = datos.data.Municipio;
  const tipoReporte = "Asistencia Vial";
  const personaReporta = datos.data.QuienReporta;
  const telefono = datos.data.Telefono;
  const declaracion = datos.data.Declacarion;
  const placas = datos.data.Placas;
  const color = datos.data.Color;

  return (
    <Envolvedor>
      <Campo>{diccionario.estatus}</Campo>
      <Encabezado>
        <ContenedorValorCirculo style={{ display: "flex" }}>
          <Circulo estatusReporte={estatusReporte} />
        </ContenedorValorCirculo>
        <Valor style={{ display: "inline" }}> {estatusReporte}</Valor>
      </Encabezado>
      <Campo>{diccionario.numeroReporte}</Campo>
      <Valor>{numeroReporte}</Valor>
      <Campo>{diccionario.fecha}</Campo>
      <Valor>{fecha}</Valor>
      <Campo>{diccionario.estado}</Campo>
      <Valor>{estado.toUpperCase()}</Valor>
      <Campo>{diccionario.municipio}</Campo>
      <Valor>{municipio.toUpperCase()}</Valor>
      <Campo>{diccionario.tipoReporte}</Campo>
      <Valor>{tipoReporte.toUpperCase()}</Valor>
      <Campo>{diccionario.personaReporta}</Campo>
      <Valor>{personaReporta.toUpperCase()}</Valor>
      <Campo>{diccionario.telefono}</Campo>
      <Valor>{telefono.toUpperCase()}</Valor>
      <Campo>{diccionario.placas}</Campo>
      <Valor>{placas.toUpperCase()}</Valor>
      <Campo>{diccionario.color}</Campo>
      <Valor>{color.toUpperCase()}</Valor>
      <Campo>{diccionario.declaracion}</Campo>
      <Valor>{declaracion.toUpperCase()}</Valor>
    </Envolvedor>
  );
};

ReporteSiniestroGrua.defaultProps = {
  datos: {},
  estatusReporte: "",
};

ReporteSiniestroGrua.propTypes = {
  datos: PropTypes.object,
  estatusReporte: PropTypes.string,
};

export default ReporteSiniestroGrua;

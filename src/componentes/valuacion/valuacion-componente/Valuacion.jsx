import React from "react";
import PropTypes from "prop-types";
import {
  EnvolvedorValuacion,
  ValuacionCampo,
  ValuacionValor,
} from "./Valuacion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import agregarFormatoDeFecha from "../../utilidades-compartidas/agregarFormatoFecha";

const diccionario = {
  finalizacionValuacion: "Finalización de valuación",
};

const Valuacion = (props) => {
  const { datosValuacion } = props;

  const fechaValuacion = obtenerValorDeArregloDeStrings(
    datosValuacion,
    "FechaValuacion: "
  );
  const fechaFinValuacion = obtenerValorDeArregloDeStrings(
    datosValuacion,
    "FechaFinValuacion: "
  );

  const fechaValuacionFormato = agregarFormatoDeFecha(fechaValuacion);
  const fechaFinValuacionFormato = agregarFormatoDeFecha(fechaFinValuacion);

  return (
    <EnvolvedorValuacion>
      <ValuacionCampo>{diccionario.finalizacionValuacion}</ValuacionCampo>
      <ValuacionValor>
        {fechaValuacionFormato.isValid
          ? fechaValuacionFormato
          : fechaFinValuacionFormato}
      </ValuacionValor>
    </EnvolvedorValuacion>
  );
};

Valuacion.defaultProps = {
  datosValuacion: ["FechaValuacion: "],
};

Valuacion.propTypes = {
  datosValuacion: PropTypes.arrayOf(PropTypes.string),
};

export default Valuacion;

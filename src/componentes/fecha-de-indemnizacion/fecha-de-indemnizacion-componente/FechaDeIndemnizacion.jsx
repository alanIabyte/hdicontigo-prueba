import React from "react";
import PropTypes from "prop-types";
import {
  EnvolvedorFechaDeIndemnizacion,
  FechaDeIndemnizacionCampo,
  FechaDeIndemnizacionValor,
} from "./FechaDeIndemnizacion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import agregarFormatoDeFecha from "../../utilidades-compartidas/agregarFormatoFecha";

const diccionario = {
  fechaDeIndemnizacion: "Pago programado para el día:",
};

const FechaDeIndemnizacion = (props) => {
  const { datosFechaDeIndemnizacion } = props;

  const fechaDeIndemnizacion = obtenerValorDeArregloDeStrings(
    datosFechaDeIndemnizacion,
    "FechaIndemnización: "
  );

  const fechaDeIndemnizacionFormato =
    agregarFormatoDeFecha(fechaDeIndemnizacion);

  return (
    <EnvolvedorFechaDeIndemnizacion>
      <FechaDeIndemnizacionCampo>
        {diccionario.fechaDeIndemnizacion}
      </FechaDeIndemnizacionCampo>
      <FechaDeIndemnizacionValor>
        {fechaDeIndemnizacionFormato}
      </FechaDeIndemnizacionValor>
    </EnvolvedorFechaDeIndemnizacion>
  );
};

FechaDeIndemnizacion.defaultProps = {
  datosFechaDeIndemnizacion: ["Fechadeindemnizacion:  "],
};

FechaDeIndemnizacion.propTypes = {
  datosFechaDeIndemnizacion: PropTypes.arrayOf(PropTypes.string),
};

export default FechaDeIndemnizacion;

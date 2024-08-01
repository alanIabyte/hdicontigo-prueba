import React from "react";
import PropTypes from "prop-types";
import {
  EnvolvedorIngresoTaller,
  IngresoTallerCampo,
  IngresoTallerValor,
} from "./IngresoTaller.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import agregarFormatoDeFecha from "../../utilidades-compartidas/agregarFormatoFecha";

const diccionario = {
  fechaIngreso: "Fecha de ingreso",
};

const IngresoTaller = (props) => {
  const { datosIngresoTaller } = props;

  const fechaIngreso = obtenerValorDeArregloDeStrings(
    datosIngresoTaller,
    "Fechaingreso: "
  );

  const fechaIngresoFormato = agregarFormatoDeFecha(fechaIngreso);

  return (
    <EnvolvedorIngresoTaller>
      <IngresoTallerCampo>{diccionario.fechaIngreso}</IngresoTallerCampo>
      <IngresoTallerValor>{fechaIngresoFormato}</IngresoTallerValor>
    </EnvolvedorIngresoTaller>
  );
};

IngresoTaller.defaultProps = {
  datosIngresoTaller: ["Fechaingreso:  "],
};

IngresoTaller.propTypes = {
  datosIngresoTaller: PropTypes.arrayOf(PropTypes.string),
};

export default IngresoTaller;

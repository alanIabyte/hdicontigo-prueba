import React from "react";
import PropTypes from "prop-types";
import { EnvolvedorGrua, GruaCampo, GruaValor } from "./Grua.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";

const diccionario = {
  responsable: "Responsable",
};

const Grua = (props) => {
  const { datosGrua } = props;

  const responsable = obtenerValorDeArregloDeStrings(datosGrua, "Proveedor: ");

  return (
    <EnvolvedorGrua>
      <GruaCampo>{diccionario.responsable}</GruaCampo>
      <GruaValor>{responsable}</GruaValor>
    </EnvolvedorGrua>
  );
};

Grua.defaultProps = {
  datosGrua: [],
};

Grua.propTypes = {
  datosGrua: PropTypes.arrayOf(PropTypes.string),
};

export default Grua;

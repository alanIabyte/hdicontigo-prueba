import React from "react";
import PropTypes from "prop-types";
import {
  EnvolvedorTipoDeAtencion,
  TipoDeAtencionValor,
} from "./TipoDeAtencion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";

const TipoDeAtencion = (props) => {
  const { datosTipoDeAtencion } = props;

  const tipoDeAtencion = obtenerValorDeArregloDeStrings(
    datosTipoDeAtencion,
    "Texto: "
  );

  return (
    <EnvolvedorTipoDeAtencion>
      <TipoDeAtencionValor>{tipoDeAtencion}</TipoDeAtencionValor>
    </EnvolvedorTipoDeAtencion>
  );
};

TipoDeAtencion.defaultProps = {
  datosTipoDeAtencion: [],
};

TipoDeAtencion.propTypes = {
  datosTipoDeAtencion: PropTypes.arrayOf(PropTypes.string),
};

export default TipoDeAtencion;

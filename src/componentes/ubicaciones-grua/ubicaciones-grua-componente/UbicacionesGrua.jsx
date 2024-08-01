/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import Ubicacion from "../../ubicacion";
import { Envolvedor, Campo, ContenedorMapa } from "./UbicacionesGrua.styled";

const diccionario = {
  ubicacionActual: "Ubicación actual",
  ubicacionDestino: "Ubicación destino",
};

const UbicacionesGrua = (props) => {
  const { datosUbicacion } = props;

  return (
    <Envolvedor>
      <Campo>{diccionario.ubicacionActual}</Campo>
      <ContenedorMapa>
        <Ubicacion
          datosUbicacion={datosUbicacion.coordenadasIniciales}
        />
      </ContenedorMapa>
      <Campo>{diccionario.ubicacionDestino}</Campo>
      <ContenedorMapa>
        <Ubicacion
          datosUbicacion={datosUbicacion.coordenadasDestino}
        />
      </ContenedorMapa>
    </Envolvedor>
  );
};

UbicacionesGrua.defaultProps = {
  datosUbicacion: {},
};

UbicacionesGrua.propTypes = {
  datosUbicacion: PropTypes.object,
};

export default UbicacionesGrua;

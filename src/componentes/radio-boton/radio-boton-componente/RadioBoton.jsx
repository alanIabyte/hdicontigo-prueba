import React, { useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import {
  CuerpoRadioBoton,
  Etiqueta,
  Opcion,
  RadioBoton,
} from "./RadioBoton.styled";

const RadioBotonComponente = (props) => {
  const { config, alSeleccionar } = props;
  const indiceSeleccionado = config.findIndex(
    (elemento) => elemento.seleccionado
  );
  const [opcionSeleccionada, asignarValorOpcionSeleccionada] =
    useState(indiceSeleccionado);

  const elegirOpcion = (opcion, indice) => {
    asignarValorOpcionSeleccionada(indice);
    alSeleccionar(opcion);
  };

  return (
    <CuerpoRadioBoton id="componenteRadioBoton">
      {config.map((opcion, indice) => (
        <Opcion
          key={v4()}
          onClick={() => {
            elegirOpcion(opcion, indice);
          }}
        >
          <RadioBoton seleccionado={indice === opcionSeleccionada}>
            <div />
          </RadioBoton>
          <Etiqueta>{opcion.etiqueta}</Etiqueta>
        </Opcion>
      ))}
    </CuerpoRadioBoton>
  );
};

RadioBotonComponente.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      valor: PropTypes.string,
      etiqueta: PropTypes.string,
      seleccionado: PropTypes.bool,
    })
  ),
  alSeleccionar: PropTypes.func,
};

RadioBotonComponente.defaultProps = {
  config: {},
  alSeleccionar: () => {},
};

export default RadioBotonComponente;

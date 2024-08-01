import React from "react";
import PropTypes from "prop-types";
import IconoEstrella from "@material-ui/icons/StarRounded";

import {
  EnvolvedorEvaluacion,
  TituloEvaluacion,
  ContenedorCalificacion,
  ContenedorIconoEstrella,
} from "./Evaluacion.styled";

const Evaluacion = (props) => {
  const { titulo, evaluacion, asignarEvaluacion } = props;
  const elementos = [1, 2, 3, 4, 5];

  return (
    <EnvolvedorEvaluacion>
      <TituloEvaluacion>{titulo}</TituloEvaluacion>
      <ContenedorCalificacion>
        {elementos.map((indice) => (
          <ContenedorIconoEstrella
            key={indice}
            marcado={indice <= evaluacion}
            onClick={() => {
              asignarEvaluacion(indice);
            }}
          >
            <IconoEstrella style={{ fontSize: 40 }} />
          </ContenedorIconoEstrella>
        ))}
      </ContenedorCalificacion>
    </EnvolvedorEvaluacion>
  );
};

Evaluacion.propTypes = {
  titulo: PropTypes.string,
  evaluacion: PropTypes.number,
  asignarEvaluacion: PropTypes.func,
};

Evaluacion.defaultProps = {
  titulo: "",
  evaluacion: 0,
  asignarEvaluacion() {},
};

export default Evaluacion;

import React from "react";
import PropTypes from "prop-types";
import {
  CuerpoSeleccionCuestionario,
  PreguntaCuestionario,
  RespuestaCuestionario,
  SeleccionSiCuestionario,
  SeleccionNoCuestionario,
  CampoRequeridoSeleccionCuestionario,
} from "./SeleccionCuestionario.styled";

const SeleccionCuestionario = (props) => {
  const { cambiarEstado, pregunta, respuesta, mostrarMensajeCampoRequerido } =
    props;
  const diccionario = {
    respuestaAfirmativa: "Sí",
    respuestaNegativa: "No",
    mensajeCampoRequerido: "Campo requerido para poder continuar",
  };

  return (
    <CuerpoSeleccionCuestionario id="componentePregunta">
      <PreguntaCuestionario id="textoPregunta">
        {pregunta}
        <RespuestaCuestionario>
          <SeleccionSiCuestionario
            id="botonSi"
            onClick={() => {
              cambiarEstado(true);
            }}
            type="submit"
            activado={respuesta}
          >
            {diccionario.respuestaAfirmativa}
          </SeleccionSiCuestionario>
          <SeleccionNoCuestionario
            id="botonNo"
            onClick={() => {
              cambiarEstado(false);
            }}
            type="submit"
            activado={respuesta}
          >
            {diccionario.respuestaNegativa}
          </SeleccionNoCuestionario>
        </RespuestaCuestionario>
      </PreguntaCuestionario>
      <CampoRequeridoSeleccionCuestionario
        id="error"
        mostrar={mostrarMensajeCampoRequerido}
      >
        {diccionario.mensajeCampoRequerido}
      </CampoRequeridoSeleccionCuestionario>
    </CuerpoSeleccionCuestionario>
  );
};

SeleccionCuestionario.propTypes = {
  cambiarEstado: PropTypes.func,
  mostrarMensajeCampoRequerido: PropTypes.bool,
  pregunta: PropTypes.string,
  respuesta: PropTypes.bool,
};

SeleccionCuestionario.defaultProps = {
  pregunta: "",
  mostrarMensajeCampoRequerido: null,
  respuesta: null,
  cambiarEstado() {},
};

export default SeleccionCuestionario;

/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Contenedor,
  Texto,
  CapsulaSwitch,
  StyledSwitch,
  TextoEstado,
  ContenedorIcono,
} from "./Switch.styled";
import IconoHuella from "../../../recursos/iconos/hdi-c/biometricos/biometrico3.svg";

const Switch = ({
  text,
  onChange,
  selected,
  handleChange,
  texto,
  estilo,
  iconoHuella,
}) => {
  /*
  const cambiarEstado = () => {
    if (estado === true) {
      return;
    } else {
      setEstado(!estado);
      onChange();
    }
  };
  */

  const handleLocalChange = () => {
    handleChange();
    onChange();
  };

  return (
    <Contenedor style={estilo}>
      {iconoHuella && <ContenedorIcono src={IconoHuella} />}
      <Texto>{text}</Texto>
      <CapsulaSwitch activo={selected} onClick={handleLocalChange}>
        <TextoEstado>{texto ? (selected ? "Sí" : "No") : ""}</TextoEstado>
        <StyledSwitch />
      </CapsulaSwitch>
    </Contenedor>
  );
};

Switch.defaultProps = {
  text: "",
  onChange: () => {},
  handleChange: () => {},
  selected: true,
  texto: true,
  estilo: {},
  iconoHuella: false,
};

Switch.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  handleChange: PropTypes.func,
  selected: PropTypes.bool,
  texto: PropTypes.bool,
  estilo: PropTypes.object,
  iconoHuella: PropTypes.bool,
};

export default Switch;

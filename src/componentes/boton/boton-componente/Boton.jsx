/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import PhoneIcono from "@material-ui/icons/PhoneInTalk";
import { EnvolvedorBoton, Icono } from "./Boton.styled";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";

import "./estilos.scss";

const Boton = (props) => {
  const {
    deshabilitado,
    etiqueta,
    tema,
    enClick,
    botonDelgado,
    pequeno,
    tipo,
    idBoton,
    keyDown,
    estilo,
    customClass,
    flot,
    icono,
  } = props;

  const ejecutarEnter = (event) => {
    console.log(event);
    event.preventDefault();
    if (event.key === "Enter") {
      console.log("Enter");
    }
  };

  const flotante = {
    width: "auto",
    position: "fixed",
    marginBottom: "15%",
    right: "5%",
    textAlign: "center",
    height: "auto",
    bottom: 0,
  };

  const mobil = validaDispositivoCelular() ? flotante : { display: "none" };

  return (
    <EnvolvedorBoton
      style={flot ? mobil : estilo}
      onKeyPress={(e) => ejecutarEnter(e)}
      key={v4()}
      className={`boton boton-${tema} ${customClass}`}
      disabled={deshabilitado}
      deshabilitado={deshabilitado}
      type={tipo}
      onClick={enClick}
      botonDelgado={botonDelgado}
      pequeno={pequeno}
      circular={tema}
      id={idBoton}
    >
      {flot && <PhoneIcono fontSize="small" />}
      {icono && <Icono src={icono} />}
      {etiqueta}
    </EnvolvedorBoton>
  );
};

Boton.propTypes = {
  deshabilitado: PropTypes.bool,
  etiqueta: PropTypes.string,
  tema: PropTypes.oneOf([
    "estandar",
    "rojo",
    "simple",
    "simple-gris",
    "deshabilitado",
    "simple-verde",
    "simple-circular",
  ]),
  enClick: PropTypes.func,
  botonDelgado: PropTypes.bool,
  pequeno: PropTypes.bool,
  tipo: PropTypes.string,
  idBoton: PropTypes.string,
  keyDown: PropTypes.func,
  customClass: PropTypes.string,
  flot: PropTypes.bool,
  icono: PropTypes.string,
};

Boton.defaultProps = {
  deshabilitado: false,
  etiqueta: "",
  tema: "estandar",
  enClick() {},
  botonDelgado: false,
  pequeno: false,
  tipo: "button",
  idBoton: "",
  keyDown: () => {},
  customClass: "",
  flot: false,
  icono: "",
};

export default Boton;

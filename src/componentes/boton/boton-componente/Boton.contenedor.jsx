/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Boton from "./Boton";

// const BotonContenedor = ({ etiqueta, tema, enClick, deshabilitado }) => (
//   <Boton
//     etiqueta={etiqueta}
//     tema={tema}
//     enClick={enClick}
//     deshabilitado={deshabilitado}
//   />
// );

class BotonContenedor extends React.Component {
  render() {
    const {
      etiqueta,
      tema,
      enClick,
      deshabilitado,
      pequeno,
      tipo,
      idBoton,
      keyDown,
      estilo,
      icono,
    } = this.props;
    return (
      <Boton
        estilo={estilo}
        keyDown={keyDown}
        etiqueta={etiqueta}
        tema={tema}
        enClick={enClick}
        deshabilitado={deshabilitado}
        pequeno={pequeno}
        tipo={tipo}
        idBoton={idBoton}
        icono={icono}
      />
    );
  }
}

BotonContenedor.propTypes = {
  enClick: PropTypes.func,
  etiqueta: PropTypes.string,
  tema: PropTypes.oneOf([
    "estandar",
    "rojo",
    "simple",
    "simple-gris",
    "deshabilitado",
    "simple-circular",
  ]),
  deshabilitado: PropTypes.bool,
  pequeno: PropTypes.bool,
  tipo: PropTypes.string,
  idBoton: PropTypes.string,
  keyDown: PropTypes.func,
  icono: PropTypes.string,
};

BotonContenedor.defaultProps = {
  etiqueta: "",
  tema: "estandar",
  enClick: null,
  deshabilitado: false,
  pequeno: false,
  tipo: "button",
  idBoton: "",
  icono: "",
  keyDown: () => {},
};

export default BotonContenedor;

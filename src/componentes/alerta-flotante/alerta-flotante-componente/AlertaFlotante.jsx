import React, { useEffect } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import {
  EnvolvedorAlertaFlotante,
  ContenedorTexto,
} from "./AlertaFlotante.styled";

const AlertaFlotante = (props) => {
  const { texto, mostrar, manejarCierre } = props;

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      manejarCierre(false);
    });
  }, []);

  return (
    <EnvolvedorAlertaFlotante key={v4()} mostrar={mostrar}>
      <ContenedorTexto id="textoAlertaFlotante">{texto}</ContenedorTexto>
    </EnvolvedorAlertaFlotante>
  );
};

AlertaFlotante.propTypes = {
  texto: PropTypes.string,
  mostrar: PropTypes.bool,
  manejarCierre: PropTypes.func,
};

AlertaFlotante.defaultProps = {
  texto: "",
  mostrar: false,
  manejarCierre() {},
};

export default AlertaFlotante;

import React from "react";
import PropTypes from "prop-types";
import {
  DocumentacionCampo,
  DocumentacionValor,
  EnvolvedorDocumentacion,
  MensajeDocumentacion,
} from "./Documentacion.styled";

const diccionario = {
  estatus: "Estatus de la documentación:",
  mensaje: "Para ver más detalles del estatus de tu documentación visita",
  liga: "HDI Documenta",
};

const Documentacion = (props) => {
  const { datosDocumentacion } = props;

  const estatus = datosDocumentacion && datosDocumentacion.estatus;
  const liga = datosDocumentacion && datosDocumentacion.linkActual;

  return (
    <EnvolvedorDocumentacion>
      <DocumentacionCampo>{diccionario.estatus}</DocumentacionCampo>
      <DocumentacionValor>{estatus}</DocumentacionValor>
      <MensajeDocumentacion>
        {diccionario.mensaje}{" "}
        <a target="_blank" rel="noreferrer" href={liga}>
          {diccionario.liga}
        </a>
      </MensajeDocumentacion>
    </EnvolvedorDocumentacion>
  );
};

Documentacion.defaultProps = {
  datosDocumentacion: {},
};

Documentacion.propTypes = {
  datosDocumentacion: PropTypes.instanceOf(Object),
};

export default Documentacion;

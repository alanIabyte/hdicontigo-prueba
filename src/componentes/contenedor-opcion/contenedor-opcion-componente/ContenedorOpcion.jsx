import React from "react";
import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  EnvolvedorContenedorOpcion,
  ContenedorElementos,
  Titulo,
  Subtitulo,
  Icono,
  // Indicador,
} from "./ContenedorOpcion.styled";

class ContenedorOpcion extends React.Component {
  render() {
    const { titulo, subtitulo, url, icono } = this.props;
    return (
      <EnvolvedorContenedorOpcion href={url}>
        <Icono> {icono} </Icono>
        <ContenedorElementos>
          <Titulo> {titulo} </Titulo>
          <Subtitulo> {subtitulo} </Subtitulo>
        </ContenedorElementos>
        {/* <Indicador>
          <FontAwesomeIcon icon={faChevronRight} />
        </Indicador> */}
      </EnvolvedorContenedorOpcion>
    );
  }
}

ContenedorOpcion.propTypes = {
  titulo: PropTypes.string,
  subtitulo: PropTypes.string,
  url: PropTypes.string,
  icono: PropTypes.node,
};

ContenedorOpcion.defaultProps = {
  titulo: "",
  subtitulo: "",
  url: "#",
  icono: null,
};

export default ContenedorOpcion;

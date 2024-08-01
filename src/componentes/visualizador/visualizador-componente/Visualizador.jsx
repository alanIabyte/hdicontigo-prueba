/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconoZoom from "@material-ui/icons/ZoomInRounded";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import {
  ContenedorIcono,
  ContenedorImagen,
  EncabezadoModal,
  EnvolvedorModalFoto,
  EnvolvedorVisualizador,
  FooterModal,
  ImagenMiniatura,
  ImagenModal,
  ModalContenedor,
} from "./Visualizador.styled";
import Boton from "../../boton/boton-componente/Boton";

const Visualizador = (props) => {
  const { fotos } = props;
  console.table(fotos);

  const [mostrarFoto, asignarValorMostrarFoto] = useState(null);

  const [imagenActual, setImagenActual] = React.useState(0);
  const cantidad = fotos?.length;

  // Return prematuro para evitar errores
  if (!Array.isArray(fotos) || cantidad === 0) return;

  const siguienteImagen = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
  };

  const anteriorImagen = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
  };

  useEffect(() => {
    if (mostrarFoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mostrarFoto]);

  const ModalFoto = () => (
    <EnvolvedorModalFoto mostrar={mostrarFoto}>
      <ModalContenedor>
        <EncabezadoModal>
          <IconoCerrar
            onClick={() => {
              asignarValorMostrarFoto(null);
            }}
          />
        </EncabezadoModal>
        {mostrarFoto && (
          <ImagenModal src={fotos[imagenActual].url} alt={mostrarFoto.nombre} />
        )}
        <FooterModal>
          <Boton enClick={anteriorImagen} etiqueta="Anterior" pequeno />
          <Boton enClick={siguienteImagen} etiqueta="Siguiente" pequeno />
        </FooterModal>
      </ModalContenedor>
    </EnvolvedorModalFoto>
  );

  return (
    <EnvolvedorVisualizador>
      <ModalFoto />
      {fotos.map((foto) => (
        <ContenedorImagen
          key={foto.nombre}
          onClick={() => {
            asignarValorMostrarFoto(foto);
          }}
        >
          <ContenedorIcono>
            <IconoZoom />
          </ContenedorIcono>
          <ImagenMiniatura src={foto.url} alt={foto.nombre} />
        </ContenedorImagen>
      ))}
    </EnvolvedorVisualizador>
  );
};

Visualizador.propTypes = {
  fotos: PropTypes.arrayOf(PropTypes.object),
};

Visualizador.defaultProps = {
  fotos: [],
};

export default Visualizador;

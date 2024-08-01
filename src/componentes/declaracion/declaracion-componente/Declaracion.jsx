import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import {
  EnvolvedorDeclaracion,
  TextoSeguirLeyendo,
  EnvolvedorModalDeclaracion,
  ModalContenedor,
  EncabezadoModal,
  ContenedorIconoCierre,
} from "./Declaracion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";

const Declaracion = (props) => {
  const { datosDeclaracion } = props;
  const [mostrarDeclaracion, asignarValorMostrarDeclaracion] = useState(false);

  const diccionario = {
    titulo: "Declaración",
    seguirLeyendo: "Seguir leyendo",
  };

  const declaracion = obtenerValorDeArregloDeStrings(
    datosDeclaracion,
    "Texto: "
  );

  // Si la longitud de la declaración es menor a 200 caracteres, mostrarla completa.
  const esDeclaracionCorta = !(declaracion.length > 200);

  useEffect(() => {
    if (mostrarDeclaracion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mostrarDeclaracion]);

  const ModalDeclaracion = () => (
    <EnvolvedorModalDeclaracion mostrar={mostrarDeclaracion}>
      <ModalContenedor>
        <EncabezadoModal>
          {diccionario.titulo}
          <ContenedorIconoCierre
            onClick={() => {
              asignarValorMostrarDeclaracion(false);
            }}
          >
            <IconoCerrar />
          </ContenedorIconoCierre>
        </EncabezadoModal>
        {declaracion}
      </ModalContenedor>
    </EnvolvedorModalDeclaracion>
  );

  return (
    <EnvolvedorDeclaracion>
      <ModalDeclaracion />
      {esDeclaracionCorta ? (
        <>{declaracion}</>
      ) : (
        <>
          {declaracion.substring(0, 135)}...
          <TextoSeguirLeyendo
            onClick={() => {
              asignarValorMostrarDeclaracion(true);
            }}
          >
            {diccionario.seguirLeyendo}
          </TextoSeguirLeyendo>
        </>
      )}
    </EnvolvedorDeclaracion>
  );
};

Declaracion.propTypes = {
  datosDeclaracion: PropTypes.arrayOf(PropTypes.string),
};

Declaracion.defaultProps = {
  datosDeclaracion: [
    // eslint-disable-next-line max-len
    "Texto: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed blandit libero volutpat sed cras ornare arcu. Tellus orci ac auctor augue mauris augue. Interdum velit euismod in pellentesque. Viverra nam libero justo laoreet sit. Posuere ac ut consequat semper viverra nam libero justo. Convallis a cras semper auctor. Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. Nunc mi ipsum faucibus vitae aliquet nec. Duis at consectetur lorem donec. Dictum varius duis at consectetur lorem donec massa sapien. Massa vitae tortor condimentum lacinia quis vel eros donec ac. Nullam eget felis eget nunc lobortis mattis.",
  ],
};

export default Declaracion;

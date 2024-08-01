/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Contenedor,
  Titulo,
  Cerrar,
  ContenedorCobertura,
  Icono,
  TextoCobertura,
} from "./ModalSeccionCobertura.styled";
import IcoCheck from "../../../recursos/iconos/ico_check.png";
import useListaFiltrada from "../../../hooks/useListaFiltrada";

const seccionesCoberturas = {
  "1": "Tratamiento ambulatorio",
  "2": "Hospitalización",
  "3": "Maternidad",
  "4": "Transportación médica",
  "5": "Cobertura  para tratamientos y enfermedades específicas",
  "6": "Otros beneficios",
  "7": "Servicios adicionales"
}

const ModalSeccionCobertura = ({ seccion, cerrar, lineaNegocio, coberturas }) => {

  const [listaFiltrada] = useListaFiltrada(coberturas, seccion, "idSeccion");
  console.log(listaFiltrada);

  return (
    <Modal>
      { lineaNegocio === "GMM" ? (
        <Contenedor>
        <Cerrar onClick={cerrar}>X</Cerrar>
        <Titulo>{seccionesCoberturas[seccion]}</Titulo>
        {listaFiltrada?.map((cobertura) => (
          <ContenedorCobertura>
            <Icono src={IcoCheck} alt="io" />
            <TextoCobertura style={{ color: "#5A5A5A" }}>
              {`${cobertura.cobertura},  ${cobertura.sumaAsegurada}`}
            </TextoCobertura>
          </ContenedorCobertura>
        ))}
        </Contenedor>
      ):(
        <Contenedor>
          <Cerrar onClick={cerrar}>X</Cerrar>
          <Titulo>{seccion.titulo}</Titulo>
          {seccion?.lista?.map((el) => (
            <ContenedorCobertura>
              <Icono src={IcoCheck} alt="io" />
              <TextoCobertura>
                {`${el.cobertura},  ${el.sumaAsegurada}${
                  el.deducible.length > 1 ? "," : ""
                }  ${el.deducible.length > 1 ? el.deducible : ""}`}
              </TextoCobertura>
            </ContenedorCobertura>
          ))}
        </Contenedor>
      ) }
    </Modal>
  );
};

ModalSeccionCobertura.defaultProps = {
  seccion: {},
  cerrar: () => {},
  lineaNegocio: "",
  coberturas: [],
};

//  enClickEnFoto: () => {},
//  enClickEnFoto: PropTypes.func,

ModalSeccionCobertura.propTypes = {
  seccion: PropTypes.instanceOf({}),
  cerrar: PropTypes.func,
  lineaNegocio: PropTypes.string,
  coberturas: PropTypes.instanceOf([])
};

export default ModalSeccionCobertura;

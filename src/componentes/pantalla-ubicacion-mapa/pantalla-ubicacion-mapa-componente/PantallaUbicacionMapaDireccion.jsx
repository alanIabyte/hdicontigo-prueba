/* eslint-disable react/prop-types */
import React from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import Autocomplete from "react-google-autocomplete";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  ContenedorCampoTextoDireccion,
  TituloUbicacionMapa,
  EnvolvedorPantallaDireccion,
} from "./PantallaUbicacionMapa.styled";
import Configuraciones from "../../../servicios/google-maps";
import "./estilos.scss";

const PantallaUbicacionMapaDireccion = (props) => {
  const diccionario = {
    titulo: "Ubicación actual",
  };
  const { alRegresar, direccionPorDefecto } = props;

  const alCambiar = (lugar) => {
    if (lugar && lugar.geometry && lugar.geometry.location) {
      const coordenadas = lugar.geometry.location.lat();
      const coordenadas2 = lugar.geometry.location.lng();
      console.log(coordenadas, coordenadas2);
      const { alCambiarDireccion } = props;
      alCambiarDireccion(lugar);
    }
  };

  const alEnfocar = (event) => {
    event.target.select();
  };

  return (
    <EnvolvedorPantallaDireccion key={v4()}>
      <Pantalla>
        <TituloUbicacionMapa>
          <ChevronLeftRoundedIcon
            id="botonRegresar"
            fontSize="large"
            onClick={alRegresar}
          />
          <div id="titulo">{diccionario.titulo}</div>
        </TituloUbicacionMapa>
        <ContenedorCampoTextoDireccion>
          <Autocomplete
            id="autocompletar"
            apiKey={Configuraciones.apiKey}
            placeholder=""
            inputAutocompleteValue=" "
            onPlaceSelected={alCambiar}
            types={["geocode", "establishment"]}
            componentRestrictions={{ country: "mx" }}
            defaultValue={direccionPorDefecto}
            onFocus={alEnfocar}
            autoFocus
          />
        </ContenedorCampoTextoDireccion>
      </Pantalla>
    </EnvolvedorPantallaDireccion>
  );
};

PantallaUbicacionMapaDireccion.propTypes = {
  alCambiarDireccion: PropTypes.func,
  alRegresar: PropTypes.func,
  direccionPorDefecto: PropTypes.string,
};

PantallaUbicacionMapaDireccion.defaultProps = {
  alCambiarDireccion: null,
  alRegresar: null,
  direccionPorDefecto: "",
};

export default PantallaUbicacionMapaDireccion;

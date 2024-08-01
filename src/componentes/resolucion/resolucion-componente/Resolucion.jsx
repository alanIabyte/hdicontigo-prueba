import React from "react";
import PropTypes from "prop-types";
import {
  EnvolvedorResolucion,
  ResolucionCampo,
  ResolucionValor,
} from "./Resolucion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";

const diccionario = {
  tipo: "Tipo de siniestro",
  causa: "Causa del siniestro",
  dondeSeEncuentra: "El vehículo se encuentra:",
  autoridad: "Autoridad presente",
  responsabilidadAutoridad: "Responsabilidad según la autoridad",
  responsabilidadAjustador: "Responsabilidad según el ajustador",
};

const Resolucion = (props) => {
  const { datosResolucion } = props;

  const tipo = obtenerValorDeArregloDeStrings(
    datosResolucion,
    "TipoSiniestro: "
  );
  const causa = obtenerValorDeArregloDeStrings(
    datosResolucion,
    "CausaSiniestro: "
  );
  const dondeA = obtenerValorDeArregloDeStrings(
    datosResolucion,
    "UbicacionVehiculo: "
  );

  const dondeB = obtenerValorDeArregloDeStrings(
    datosResolucion,
    "UbicaciónVehículo: "
  );

  const dondeSeEncuentra = dondeA || dondeB;

  const autoridad = obtenerValorDeArregloDeStrings(
    datosResolucion,
    "AutoridadPresente: "
  );
  const responsabilidadAutoridad = obtenerValorDeArregloDeStrings(
    datosResolucion,
    "ResponsabilidadAutoridad: "
  );
  const responsabilidadAjustador = obtenerValorDeArregloDeStrings(
    datosResolucion,
    "ResponsabilidadAjustador: "
  );

  return (
    <EnvolvedorResolucion>
      <ResolucionCampo>{diccionario.tipo}</ResolucionCampo>
      <ResolucionValor>{tipo.toUpperCase()}</ResolucionValor>
      <ResolucionCampo>{diccionario.causa}</ResolucionCampo>
      <ResolucionValor>{causa.toUpperCase()}</ResolucionValor>
      <ResolucionCampo>{diccionario.dondeSeEncuentra}</ResolucionCampo>
      <ResolucionValor>{dondeSeEncuentra.toUpperCase()}</ResolucionValor>
      <ResolucionCampo>{diccionario.autoridad}</ResolucionCampo>
      <ResolucionValor>{autoridad.toUpperCase()}</ResolucionValor>
      <ResolucionCampo>{diccionario.responsabilidadAutoridad}</ResolucionCampo>
      <ResolucionValor>
        {responsabilidadAutoridad.toUpperCase()}
      </ResolucionValor>
      <ResolucionCampo>{diccionario.responsabilidadAjustador}</ResolucionCampo>
      <ResolucionValor>
        {responsabilidadAjustador.toUpperCase()}
      </ResolucionValor>
    </EnvolvedorResolucion>
  );
};

Resolucion.defaultProps = {
  datosResolucion: [],
};

Resolucion.propTypes = {
  datosResolucion: PropTypes.arrayOf(PropTypes.string),
};

export default Resolucion;

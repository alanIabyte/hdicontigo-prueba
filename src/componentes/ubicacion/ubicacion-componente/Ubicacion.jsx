/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Map, GoogleApiWrapper, Marker, Circle } from "google-maps-react";
import Configuraciones from "../../../servicios/google-maps";
import {
  EnvolvedorUbicacion,
  UbicacionTexto,
  GoogleMapContenedorCargando,
  ContenedorMapa,
} from "./Ubicacion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import Marcador from "../recursos/marcador.svg";

const Ubicacion = (props) => {
  const { datosUbicacion, google, ubicaiconTextoVerde } = props;
  const estadoApp = useSelector((estado) => estado);

  const latEstado =
    estadoApp && estadoApp.coordenadasIniciales
      ? estadoApp.coordenadasIniciales.lat
      : null;
  const lngEstado =
    estadoApp && estadoApp.coordenadasIniciales
      ? estadoApp.coordenadasIniciales.lng
      : null;
  const ubicacionEstado = estadoApp.ubicacion || "";

  const latDatos = obtenerValorDeArregloDeStrings(
    datosUbicacion,
    "Latitud: "
  ).trim();
  const lngDatos = obtenerValorDeArregloDeStrings(
    datosUbicacion,
    "Longitud: "
  ).trim();

  const taller = obtenerValorDeArregloDeStrings(
    datosUbicacion,
    "esTaller: "
  ).trim();

  const ubicacionCoordenadas = obtenerValorDeArregloDeStrings(
    datosUbicacion,
    "Coordenadas: "
  ).trim();

  const direccionSiniestro = obtenerValorDeArregloDeStrings(
    datosUbicacion,
    "Direccion: "
  );
  let lat = parseFloat(latEstado, 10) || parseFloat(latDatos, 10) || 19.432608;
  let lng = parseFloat(lngEstado, 10) || parseFloat(lngDatos, 10) || -99.133209;
  let ubicacionDireccion = direccionSiniestro || ubicacionEstado;

  if (taller) {
    lat = parseFloat(latDatos) || 19.432608;
    lng = parseFloat(lngDatos) || -99.133209;
    ubicacionDireccion = direccionSiniestro || "";
  }
  const arrayUbicacion = ubicacionCoordenadas.split(",");
  if (!latDatos && arrayUbicacion) {
    lat = parseFloat(arrayUbicacion[0]) || 0;
  }
  if (!lngDatos && arrayUbicacion) {
    lng = parseFloat(arrayUbicacion[1]) || 0;
  }
  const ligaUbicacion = `https://maps.google.com/?q=${lat},${lng}`;

  return (
    <div>
      {lat !== 0 && lng !== 0 && (
        <EnvolvedorUbicacion href={ligaUbicacion} target="_blank">
          <UbicacionTexto colorTexto={ubicaiconTextoVerde}>
            {ubicacionDireccion}
          </UbicacionTexto>
          <ContenedorMapa>
            <Map
              google={google}
              zoom={16}
              initialCenter={{ lat, lng }}
              zoomControl={false}
              fullscreenControl={false}
              streetViewControl={false}
              mapTypeControl={false}
              draggable={false}
            >
              <Circle
                radius={32}
                center={{ lat, lng }}
                fillColor="#036BE4"
                strokeWeight={0}
                fillOpacity={0.15}
              />
              <Marker
                draggable={false}
                position={{ lat, lng }}
                icon={{
                  url: Marcador,
                }}
              />
            </Map>
          </ContenedorMapa>
        </EnvolvedorUbicacion>
      )}

      {lat === 0 && lng === 0 && (
        <div>
          <UbicacionTexto>{ubicacionDireccion}</UbicacionTexto>
        </div>
      )}
    </div>
  );
};

Ubicacion.defaultProps = {
  datosUbicacion: [],
  ubicaiconTextoVerde: false,
};

Ubicacion.propTypes = {
  datosUbicacion: PropTypes.arrayOf(PropTypes.string),
  ubicaiconTextoVerde: PropTypes.bool,
};

export default GoogleApiWrapper({
  ...Configuraciones,
  LoadingContainer: () => (
    <GoogleMapContenedorCargando>Cargando mapa ...</GoogleMapContenedorCargando>
  ),
})(Ubicacion);

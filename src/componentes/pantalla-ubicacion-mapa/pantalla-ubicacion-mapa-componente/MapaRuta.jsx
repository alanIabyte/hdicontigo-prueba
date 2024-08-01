/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import PinDropSharpIcon from "@material-ui/icons/PinDropSharp";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  ContenedorMapa,
  ContenedorFijarUbicacion,
  GoogleMapContenedorLoading,
  ContenedorLocalizacionActual,
} from "./PantallaUbicacionMapa.styled";
import Marcador from "../recursos/marcador.svg";

const dict = {
  mensajeUbicacion: "Fijar ubicación en el mapa",
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MapaRuta(props) {
  const { alDarClickEnFijarUbicacion } = props;

  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);

  const [map, setMap] = React.useState(null);
  const [coorIni, asignarValorCoorIni] = useState(null);
  const [respuestaVisualizacion, asignarValorRespuestaVisualizacion] =
    useState(null);

  const opcionesDeServicioDeDirecciones = {
    destination: estadoApp.coordenadasInicialesDestino,
    origin: estadoApp.coordenadasIniciales,
    travelMode:
      (window.google && window.google.maps.TravelMode.DRIVING) || "DRIVING",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  function getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const getAddress = () => {
    const position = getCoordinates();
    return position;
  };

  const onLoad = React.useCallback(async (mapF) => {
    const {
      coordenadasIniciales: { lat: latI, lng: lngI },
    } = props;

    const x = await getAddress();

    if (
      (!estadoApp && !estadoApp.coordenadasIniciales) ||
      estadoApp.coordenadasIniciales === undefined
    ) {
      dispatch({
        type: "AGREGAR",
        valor: { lat: x.coords.latitude, lng: x.coords.longitude },
        indice: "coordenadasIniciales",
      });
      console.log(x);
    }
    const bounds = new window.google.maps.LatLngBounds(
      estadoApp.coordenadasIniciales
    );
    mapF.fitBounds(bounds);

    setMap(mapF);
  }, []);

  const onUnmount = React.useCallback((mapF) => {
    setMap(null);
  }, []);

  const procesarDirecciones = (respuestaDirecciones) => {
    if (respuestaDirecciones.status === "OK") {
      const {
        request: { origin, destination },
      } = respuestaDirecciones;

      if (
        origin.location.lat() !== estadoApp.coorIniAnt.lat ||
        origin.location.lng() !== estadoApp.coorIniAnt.lng ||
        destination.location.lat() !== estadoApp.coorDestAnt.lat ||
        destination.location.lng() !== estadoApp.coorDestAnt.lng
      ) {
        dispatch({
          type: "AGREGAR",
          valor: {
            lat: origin.location.lat(),
            lng: origin.location.lng(),
          },
          indice: "coorIniAnt",
        });
        dispatch({
          type: "AGREGAR",
          valor: {
            lat: destination.location.lat(),
            lng: destination.location.lng(),
          },
          indice: "coorDestAnt",
        });
        dispatch({
          type: "AGREGAR",
          valor: respuestaDirecciones,
          indice: "respuestaDirecciones",
        });
        asignarValorRespuestaVisualizacion(respuestaDirecciones);
      }
    }
  };

  return isLoaded ? (
    <ContenedorMapa>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={estadoApp.coordenadasIniciales}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          draggable={false}
          position={estadoApp.coordenadasIniciales}
          icon={{
            url: Marcador,
            anchor: {
              x: 12.5,
              y: 12.5,
            },
          }}
        />
        <Marker
          draggable={false}
          position={estadoApp.coordenadasInicialesDestino}
          icon={{
            url: Marcador,
          }}
        />
        <DirectionsService
          options={opcionesDeServicioDeDirecciones}
          callback={procesarDirecciones}
        />
        {estadoApp.respuestaDirecciones && (
          <DirectionsRenderer
            options={{
              directions: estadoApp.respuestaDirecciones,
              polylineOptions: {
                strokeColor: "#79B530",
                strokeOpacity: 1.0,
              },
              markerOptions: {
                visible: false,
              },
            }}
          />
        )}
      </GoogleMap>
      <ContenedorFijarUbicacion onClick={alDarClickEnFijarUbicacion}>
        <PinDropSharpIcon />
        {dict.mensajeUbicacion}
      </ContenedorFijarUbicacion>
    </ContenedorMapa>
  ) : (
    <></>
  );
}

MapaRuta.propTypes = {
  coordenadasIniciales: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  alDarClickEnFijarUbicacion: PropTypes.func,
};

MapaRuta.defaultProps = {
  coordenadasIniciales: { lat: null, lng: null },
  alDarClickEnFijarUbicacion: null,
};

export default React.memo(MapaRuta);

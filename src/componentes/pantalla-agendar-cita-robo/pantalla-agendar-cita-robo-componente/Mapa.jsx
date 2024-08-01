/* eslint-disable react/prop-types, react/jsx-no-bind */
import React from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, Marker, Circle } from "google-maps-react";
import Geocode from "react-geocode";
import PinDropSharpIcon from "@material-ui/icons/PinDropSharp";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import {
  ContenedorMapa,
  ContenedorFijarUbicacion,
  GoogleMapContenedorLoading,
  ContenedorLocalizacionActual,
} from "./PantallaUbicacionMapa.styled";
import Configuraciones from "../../../servicios/google-maps";
import Marcador from "../recursos/marcador.svg";

Geocode.setApiKey(Configuraciones.apiKey);

Geocode.setLanguage("es");
const dict = {
  mensajeUbicacion: "Fijar ubicación en el mapa",
};

// TODO: Cambiar a FC porque los hooks de redux no pueden usarse
class PantallaUbicacionMapa extends React.Component {
  constructor(props) {
    super(props);
    const {
      coordenadasIniciales: { lat, lng },
      gpsActivadoDeProp,
    } = props;
    this.state = {
      gpsActivado: gpsActivadoDeProp,
      posicionMarcador: {
        lat,
        lng,
      },
      localizacionActual: {
        lat,
        lng,
      },
    };
  }

  async componentDidMount() {
    const {
      coordenadasIniciales: { lat: latI, lng: lngI },
    } = this.props;
    if (!latI && !lngI && navigator && navigator.geolocation) {
      this.actualizarLocalizacionGPS();
    } else {
      this.cambiarADireccion(latI, lngI);
    }
  }

  alCambiarPosicion = (props, mapa) => {
    const centro = mapa.getCenter();
    const lat = centro.lat();
    const lng = centro.lng();
    this.setState({
      posicionMarcador: {
        lat,
        lng,
      },
    });
  };

  async cambiarADireccion(lat, lng) {
    const { alCambiarPosicionDeMarcador } = this.props;
    const { gpsActivado } = this.state;

    // Obtén la distancia entre dos puntos usando la API de Distance Matrix
    const { google } = this.props;
    const service = new google.maps.DistanceMatrixService();
    //----
    await Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const direccion = response.results[0].formatted_address;
        const origin = new google.maps.LatLng(21.1432538, -101.6733397);
        const destination = new google.maps.LatLng(lat, lng);
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: "DRIVING", // Puedes cambiar esto según tus necesidades
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          },
          (responseM, status) => {
            if (status === "OK") {
              // Accede a la información de la distancia desde la respuesta
              const distance = responseM.rows[0].elements[0].distance.text;
              alCambiarPosicionDeMarcador(
                { lat, lng },
                direccion,
                gpsActivado,
                null,
                distance
              );
            } else {
              console.error("Error al obtener la distancia:", status);
            }
          }
        );
      },
      (error) => {
        alCambiarPosicionDeMarcador(
          { lat, lng },
          null,
          gpsActivado,
          error,
          null
        );
      }
    );
  }

  async asignarValoresDefault() {
    const lat = 19.432608;
    const lng = -99.133209;
    this.setState({
      gpsActivado: false,
      localizacionActual: {
        lat,
        lng,
      },
    });
    this.cambiarADireccion(lat, lng);
  }

  async asignarValores(lat, lng, gpsActivado) {
    this.setState({
      gpsActivado,
      localizacionActual: {
        lat,
        lng,
      },
    });
    this.cambiarADireccion(lat, lng);
  }

  async alPararMovimiento(props, mapa) {
    const centro = mapa.getCenter();
    const lat = centro.lat();
    const lng = centro.lng();
    this.cambiarADireccion(lat, lng);
  }

  async actualizarLocalizacionGPS() {
    const { accionDeLocalizacionDesactivada } = this.props;
    await navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { coords } = pos;
        this.asignarValores(coords.latitude, coords.longitude, true);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          accionDeLocalizacionDesactivada();
          this.asignarValoresDefault();
        }
      }
    );
  }

  async marcadorMovido(props, marcador) {
    const { position: posicion } = marcador;
    const lat = posicion.lat();
    const lng = posicion.lng();
    this.cambiarADireccion(lat, lng);
  }

  async cambiaGPS() {
    const { gpsActivado } = this.state;
    if (!gpsActivado) {
      this.actualizarLocalizacionGPS();
    }
  }

  render() {
    const {
      google,
      sePuedeMoverMapa,
      sePuedeMoverMarcador,
      alDarClickEnFijarUbicacion,
      activarFijarUbicacion,
    } = this.props;
    const {
      gpsActivado,
      localizacionActual: { lat, lng },
      posicionMarcador: { lat: latM, lng: lngM },
    } = this.state;
    return (
      <ContenedorMapa>
        {lat && lng ? (
          <Map
            google={google}
            zoom={18}
            initialCenter={{ lat, lng }}
            zoomControl={false}
            fullscreenControl={false}
            streetViewControl={false}
            mapTypeControl={false}
            draggable={sePuedeMoverMapa}
            onBoundsChanged={this.alCambiarPosicion}
            onDragend={this.alPararMovimiento.bind(this)}
          >
            <Circle
              radius={32}
              center={{ lat, lng }}
              fillColor="#036BE4"
              strokeWeight={0}
              fillOpacity={0.15}
            />
            <Marker
              draggable={sePuedeMoverMarcador}
              onDragend={this.marcadorMovido.bind(this)}
              position={latM && lngM ? { lat: latM, lng: lngM } : null}
              icon={{
                url: Marcador,
              }}
            />
          </Map>
        ) : (
          <GoogleMapContenedorLoading>
            Cargando mapa ...
          </GoogleMapContenedorLoading>
        )}
        {activarFijarUbicacion ? (
          <ContenedorFijarUbicacion onClick={alDarClickEnFijarUbicacion}>
            <PinDropSharpIcon />
            {dict.mensajeUbicacion}
          </ContenedorFijarUbicacion>
        ) : null}
        {gpsActivado ? (
          <ContenedorLocalizacionActual
            className="localizacionActual"
            gpsActivado
          >
            <GpsFixedIcon />
          </ContenedorLocalizacionActual>
        ) : (
          <ContenedorLocalizacionActual
            className="localizacionActual"
            onClick={this.cambiaGPS.bind(this)}
          >
            <LocationSearchingIcon />
            <span>?</span>
          </ContenedorLocalizacionActual>
        )}
      </ContenedorMapa>
    );
  }
}

PantallaUbicacionMapa.propTypes = {
  activarFijarUbicacion: PropTypes.bool,
  alCambiarPosicionDeMarcador: PropTypes.func,
  alDarClickEnFijarUbicacion: PropTypes.func,
  coordenadasIniciales: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  accionDeLocalizacionDesactivada: PropTypes.func,
  gpsActivadoDeProp: PropTypes.bool,
  sePuedeMoverMapa: PropTypes.bool,
  sePuedeMoverMarcador: PropTypes.bool,
};

PantallaUbicacionMapa.defaultProps = {
  activarFijarUbicacion: true,
  alCambiarPosicionDeMarcador: null,
  alDarClickEnFijarUbicacion: null,
  coordenadasIniciales: { lat: null, lng: null },
  accionDeLocalizacionDesactivada: null,
  gpsActivadoDeProp: false,
  sePuedeMoverMapa: true,
  sePuedeMoverMarcador: true,
};

export default GoogleApiWrapper({
  ...Configuraciones,
  LoadingContainer: () => (
    <GoogleMapContenedorLoading>Cargando mapa ...</GoogleMapContenedorLoading>
  ),
})(PantallaUbicacionMapa);

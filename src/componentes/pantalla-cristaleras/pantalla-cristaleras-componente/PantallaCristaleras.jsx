/* eslint-disable */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/prefer-default-export */
import { useLazyQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../../componentes/componentes-styled-compartidos/Pantalla.styled";
import {
  ContenedorBoton,
  ContenedorValor,
  MensajeError,
  Separador,
  SeparadorBarraProgreso,
  SeparadorEspacio,
  SeparadorLinea,
  // Titulo,
} from "../../pantalla-formulario-informacion-contacto/pantalla-formulario-informacion-contacto/PantallaFormularioInformacionContacto.styled";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Alerta } from "../../alerta";
import Configuraciones from "../../../servicios/google-maps";
import useGeolocation from "../../../utils/useGeolocation";
import { BarraAlerta, Encabezado, IndicadorCarga } from "../..";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import Boton from "../../boton";
import { blue } from "@material-ui/core/colors";

const OBTENER_CRISTALERAS = loader(
  "../../../graphQL/query/cristaleras/cristaleras_obtenerCristalerasCercanas.graphql"
);

const estiloDeContenedor = {
  width: "100%",
  height: "60vh",
};

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // "AIzaSyAJDR4fm1Aus6zGbrPbknusJMkMjED6_kA";

export const PantallaCristaleras = () => {
  const history = useHistory();
  const [mostrarBarraAlerta, setMostrarBarraAlerta] = useState(false);
  const [coordenadasIniciales, setCoordenadasIniciales] = useState({});
  const [cristaleras, setCristaleras] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(false);
  const [selectedCristalera, setSelectedCristalera] = useState({});
  const [NombreCristalera, SetNombreCristal] = useState("");
  const [DireccionCristalera, SetDireccionCristal] = useState("");
  const [seleccionada, SetSeleecionada] = useState(false);

  const [MostrarInfoCristalera, SetMostrarInfoCristalera] = useState(false);
  const [SeleccionoCristalera, SetCristaleraSeleccionada] = useState(false);
  const [obtenerCristaleras, { data, loading, error }] =
    useLazyQuery(OBTENER_CRISTALERAS);

  const {
    getLocation,
    geolocation,
    loading: loadingLocation,
    error: errorLocation,
  } = useGeolocation();

  const handleSelectedShop = (shop) => {
    console.log(shop);
    setSelectedCristalera(shop);
    setSelectedCenter(true);
  };

  const mostrarInformacion = (info) => {
    //guardar dato de nombre y direccion.
    SetNombreCristal(info.nombreComercial);
    SetDireccionCristal(info.direccion);
    SetMostrarInfoCristalera(true);
  };

  const CristaleraSeleccionada = (info) => {
    SetCristaleraSeleccionada(true);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!loading && errorLocation) {
      return;
    }

    if (!loadingLocation && geolocation) {
      let { latitud, longitud } = geolocation;
      if (false) {
        latitud = 20.910883;
        longitud = -100.75153;
      }
      const ubicacionInicial = {
        lat: latitud,
        lng: longitud,
      };
      setCoordenadasIniciales(ubicacionInicial);
      obtenerCristaleras({
        variables: {
          latitud,
          longitud,
        },
      });
    }
  }, [loadingLocation, errorLocation, geolocation]);

  useEffect(() => {
    if (!loading && error) {
      return;
    }

    if (!loading && data?.cristaleras_obtenerCristalerasCercanas.completado) {
      const resp = data?.cristaleras_obtenerCristalerasCercanas.dato;
      setMostrarBarraAlerta(false);
      const coordenadasCristaleras = resp.map((cristaleraState) => {
        const { latitud, longitud, direccion, nombreComercial } =
          cristaleraState;
        const coordenadas = {
          lat: latitud,
          lng: longitud,
          direccion,
          nombreComercial,
        };

        return coordenadas;
      });
      setCristaleras(coordenadasCristaleras);
    }

    if (
      !loading &&
      data &&
      data?.cristaleras_obtenerCristalerasCercanas &&
      !data?.cristaleras_obtenerCristalerasCercanas.completado &&
      data?.cristaleras_obtenerCristalerasCercanas.mensaje !== "Success"
    ) {
      setMostrarBarraAlerta(true);
    }
  }, [data, loading, error]);

  if (loadingLocation) {
    return <IndicadorCarga pantallaCompleta />;
  }

  if (errorLocation) {
    return (
      <div>
        Error al obtener la ubicación. Por favor, asegúrate de que tienes
        habilitada la geolocalización en tu navegador.
      </div>
    );
  }

  return (
    <React.Fragment key="pantalla-cristaleras">
      <EnvolvedorPantalla>
        <Pantalla>
          <Alerta
            textoEncabezado={NombreCristalera}
            textoCuerpoJsx={DireccionCristalera}
            textoCuerpo={"Horarios:"}
            textoCuerpo2={"Lunes a Viernes de 9: 00 am  a 18:00 pm Sabado  de 9:00 am a 13:00 pm"}
            tipoIcono="ubicacion"
            mostrarIcono={true}
            mostrarModal={MostrarInfoCristalera}
            manejarCierre={() => {
              SetMostrarInfoCristalera(false);
            }}
            etiquetaBoton="seleccionar cristalera"
            funcionLlamadaBoton={() => {
              SetSeleecionada(true);
              SetMostrarInfoCristalera(false);
            }}
          />
          <Alerta
            mostrarIcono
            tipoIcono="contigo"
            textoEncabezado={NombreCristalera}
            textoCuerpoJsx={DireccionCristalera}
            mostrarModal={SeleccionoCristalera}
            manejarCierre={() => {
              history.push("/");
            }}
            
            // etiquetaBoton="felicidades"
            // funcionLlamadaBoton={() => {
            //   SetSeleecionada(true);
            //   SetCristaleraSeleccionada(false);
            // }}
          />

          <Encabezado
            titulo="Cristaleras cercanas"
            funcionRegresar={history.goBack}
          />

          <BarraAlerta
            etiqueta="No se ha podido obtener las cristaleras, intenta de nuevo."
            mostrarAlerta={mostrarBarraAlerta}
            manejarCierre={() => {
              setMostrarBarraAlerta(false);
            }}
            estilo="error"
            posicionAbsoluta
          />
          <SeparadorEspacio />
          <BarraProgresoReporte
            progreso={2}
            titulo={"Ubicación Cristalera"}
            numeroElementos={2}
          />
          {cristaleras.length > 0 && (
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                mapContainerStyle={estiloDeContenedor}
                zoom={13}
                center={coordenadasIniciales}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                {cristaleras.map((cristalera, index) => (
                  <Marker
                    position={{ lat: cristalera.lat, lng: cristalera.lng }}
                    key={index}
                    onClick={() => mostrarInformacion(cristalera)}
                  />
                ))}
                {selectedCenter ? (
                  <InfoWindow
                    position={{
                      lat: selectedCristalera.lat,
                      lng: selectedCristalera.lng,
                    }}
                    onCloseClick={() => setSelectedCenter(false)}
                  >
                    <p>{selectedCristalera.direccion}</p>
                  </InfoWindow>
                ) : null}
              </GoogleMap>
              <ContenedorBoton>
                <Boton
                  etiqueta={"Continuar"}
                  tema={ seleccionada ? "estandar" : "andru"}
                  enClick={() => {
                    seleccionada ? SetCristaleraSeleccionada(true) : 
                    SetCristaleraSeleccionada(false);
                  }}
                />
              </ContenedorBoton>
            </LoadScript>
          )}
        </Pantalla>
      </EnvolvedorPantalla>
    </React.Fragment>
  );
};

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Configuraciones from "../../servicios/google-maps";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../componentes/encabezado/encabezado-componente/Encabezado";
import Auto from "./recursos/auto-square.png";
import Persona from "./recursos/persona.svg";

// llamada 2
const OBTENER_COORDENADAS_SINAJUSTADOR = loader(
  "../../graphQL/query/ubicacion-sinAjustador/ubicacion_sinAjustador.graphql"
);
// llamada 1
const OBTENER_REPORTE_TELEFONO = loader(
  "../../graphQL/query/ubicacion-sinAjustador/ObtenerParamDecrip.graphql"
);
const estiloDeContenedor = {
  width: "100%",
  height: "100vh",
};

const PantallaMapeoCompartido = () => {
  const params = useParams();
  const history = useHistory();
  const Datos = params.datos;
  const SubDatos = Datos.split("Tele=");
  const numeroDeReporte = SubDatos[0];
  const numeroTelefono = SubDatos[1];
  if (!numeroDeReporte) {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }

  const [origen, asignarValorOrigen] = useState({
    lat: null,
    lng: null,
  });
  const [destino, asignarValorDestino] = useState({
    lat: null,
    lng: null,
  });
  const [ParamDecrip, { data: datos }] = useLazyQuery(
    OBTENER_REPORTE_TELEFONO,
    {
      variables: {
        numeroReporte: numeroDeReporte,
        telefono: numeroTelefono,
      },
      fetchPolicy: "network-only",
    }
  );
  const [recargar, setRecargar] = useState(false);

  // funcion 2
  const [CoordenasSinAjustador, { data: coordenadas }] = useLazyQuery(
    OBTENER_COORDENADAS_SINAJUSTADOR,
    {
      variables: { numeroReporte: numeroDeReporte, telefono: numeroTelefono },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    // 8 entradas a este punto
    ParamDecrip({
      // 1 entrada a este punto
      variables: {
        numeroReporte: numeroDeReporte,
        telefono: numeroTelefono,
      },
    });
  }, []);

  useEffect(() => {
    if (
      datos &&
      datos.ObtenerParamDecrip &&
      datos.ObtenerParamDecrip.dato &&
      datos.ObtenerParamDecrip.dato.telefono
    ) {
      console.log(datos.ObtenerParamDecrip.dato.telefono);
      // aqui mete un ciclo
      CoordenasSinAjustador({
        variables: {
          numeroReporte: datos.ObtenerParamDecrip.dato.numeroReporte,
          telefono: datos.ObtenerParamDecrip.dato.telefono,
        },
      });
      //--------------------------------------
      setTimeout(() => {
        if (recargar) {
          setRecargar(false);
        } else {
          setRecargar(true);
        }
      }, 10000);
      //---------------------------------------
    }
  }, [datos, recargar]);

  // if (datos) {
  //   setTimeout(() => {
  //     CoordenasSinAjustador({
  //       variables: {
  //         numeroReporte: datos.ObtenerParamDecrip.dato.numeroReporte,
  //         telefono: datos.ObtenerParamDecrip.dato.telefono,
  //       },
  //     });
  //   }, 10000);
  // }
  useEffect(() => {
    if (
      coordenadas &&
      coordenadas.ubicacion_sinAjustador &&
      coordenadas.ubicacion_sinAjustador.dato &&
      coordenadas.ubicacion_sinAjustador.dato.ajustadorLongitud
    ) {
      if (coordenadas.ubicacion_sinAjustador.dato.ajustadorLongitud === 0) {
        history.push({
          pathname: "/",
          state: {
            mostrarAlerta: true,
          },
        });
      }
      asignarValorOrigen({
        lat: Number(coordenadas.ubicacion_sinAjustador.dato.ajustadorLatitud),
        lng: Number(coordenadas.ubicacion_sinAjustador.dato.ajustadorLongitud),
      });
      asignarValorDestino({
        lat: Number(coordenadas.ubicacion_sinAjustador.dato.siniestroLatitud),
        lng: Number(coordenadas.ubicacion_sinAjustador.dato.siniestroLongitud),
      });
    }
    if (
      coordenadas &&
      coordenadas.ubicacion_sinAjustador &&
      coordenadas.ubicacion_sinAjustador.dato === null
    ) {
      history.push({
        pathname: "/",
        state: {
          mostrarAlerta: true,
        },
      });
    }
  }, coordenadas);

  const opcionesDeServicioDeDirecciones = {
    destination: origen,
    origin: destino,
    travelMode:
      (window.google && window.google.maps.TravelMode.DRIVING) || "DRIVING",
  };

  const [respuestaVisualizacion, asignarValorRespuestaVisualizacion] =
    useState(null);
  const procesarDirecciones = (respuestaDirecciones) => {
    if (respuestaDirecciones !== null) {
      if (respuestaDirecciones.status === "OK") {
        if (!respuestaVisualizacion) {
          asignarValorRespuestaVisualizacion(respuestaDirecciones);
        }
      }
    }
  };
  return (
    <>
      <LoadScript googleMapsApiKey={Configuraciones.apiKey}>
        <EnvolvedorPantalla>
          <Encabezado
            titulo="Mapa de seguimiento"
            mostrarBotonCerrar={false}
            funcionRegresar={history.goBack}
          />
          <Pantalla>
            <GoogleMap
              mapContainerStyle={estiloDeContenedor}
              zoom={10}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
              }}
            >
              <Marker
                draggable={false}
                position={origen}
                icon={{
                  url: Auto,
                  anchor: {
                    x: 12.5,
                    y: 12.5,
                  },
                }}
              />
              <Marker
                draggable={false}
                position={destino}
                icon={{
                  url: Persona,
                }}
              />
              <DirectionsService
                options={opcionesDeServicioDeDirecciones}
                callback={procesarDirecciones}
              />
              <DirectionsRenderer
                options={{
                  directions: respuestaVisualizacion,
                  polylineOptions: {
                    strokeColor: "#008d3e",
                    strokeOpacity: 1.0,
                  },
                  markerOptions: {
                    visible: false,
                  },
                }}
              />
            </GoogleMap>
          </Pantalla>
        </EnvolvedorPantalla>
      </LoadScript>
    </>
  );
};

export default PantallaMapeoCompartido;

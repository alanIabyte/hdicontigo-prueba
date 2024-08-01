import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import moment from "moment";
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  Marker,
} from "@react-google-maps/api";
import { useCookies } from "react-cookie";
import {
  ContenedorPie,
  ContenedorPieAjustador,
  ContenedorPieAjustadorHora,
  ContenedorPieAjustadorImagen,
  ContenedorPieAjustadorNombre,
  ContenedorPieAjustadorTexto,
} from "./PantallaSeguimientoMapa.styled";
import Auto from "../recursos/auto-square.png";
import Persona from "../recursos/persona.svg";
import avatar from "../../../recursos/imagenes/default-avatar.png";
import useAccionesLog from "../../../utils/useAccionesLog";
import useValidateLogin from "../../../utils/useValidateLogin";
import constantes from "../../../recursos/constantes";

const OBTENER_UBICACION = loader(
  "../../../graphQL/query/ubicacion-ajustador/obtener_ubicacion_ajustador.graphql"
);

const GUARDAR_IMG_RUTA = loader(
  "../../../graphQL/query/reporte/guardarImgRuta.graphql"
);

const estiloDeContenedor = {
  width: "100%",
  height: "100vh",
  position: "static",
};
const diccionario = {
  horaDeArribo: "Hora estimada de arribo:",
  calculando: "calculando...",
};
const nombreCookie = constantes.nombreDeCookie;

let secuencia = 0;

const PantallaSeguimientoMapa = (props) => {
  const { numeroDeReporte } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const estadoApp = useSelector((estado) => estado);
  const { user } = useValidateLogin();
  const { runSuccesLog } = useAccionesLog(user || "");
  const puntoFinal = estadoApp.coordenadasIniciales;
  const refmap = useRef(null);
  const [dataURL, SetdataURL] = useState("");
  if (numeroDeReporte === 0 || !puntoFinal) {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }
  const nombreAjustadorDeRuta =
    estadoApp.datosAjustador && estadoApp.datosAjustador.nombre
      ? estadoApp.datosAjustador.nombre
      : "";
  const imagenAjustadorDeRuta =
    estadoApp.datosAjustador && estadoApp.datosAjustador.imagen
      ? estadoApp.datosAjustador.imagen
      : avatar;
  const [origen, asignarValorOrigen] = useState({
    lat: null,
    lng: null,
  });
  const [posicionMarcadorAuto, asignarValorPosicionMarcadorAuto] = useState({
    lat: null,
    lng: null,
  });
  const [ubicacionAjustador, { loading, error, data }] = useLazyQuery(
    OBTENER_UBICACION,
    {
      variables: { numeroReporte: numeroDeReporte, index: 0 },
      fetchPolicy: "network-only",
    }
  );
  const [horaArribo, asignarValorHoraArribo] = useState(
    `${diccionario.horaDeArribo} ${diccionario.calculando}`
  );
  const [respuesta, asignarValorRespuesta] = useState(null);
  const [bdra, yacorrio] = useState("");
  const [respuestaVisualizacion, asignarValorRespuestaVisualizacion] =
    useState(null);
  const opcionesDeServicioDeDirecciones = {
    destination: puntoFinal,
    origin: origen,
    travelMode:
      (window.google && window.google.maps.TravelMode.DRIVING) || "DRIVING",
  };
  const [
    guardarImgRuta,
    { loading: loadingImg, error: errorImg, data: dataImg },
  ] = useLazyQuery(GUARDAR_IMG_RUTA);

  useEffect(() => {
    // TODO: Log para guardar cuando se vuelve a pedir la ubicación del ajustador
    runSuccesLog(11);
    ubicacionAjustador({
      variables: {
        numeroReporte: numeroDeReporte,
        index: secuencia,
        token: objetoCookie.access_token,
      },
    });
  }, []);

  if (false) {
    alert(dataImg + errorImg + loadingImg);
  }
  if (false) {
    guardarImgRuta({
      variables: { numeroSiniestro: numeroDeReporte, base64: dataURL },
    });
  }

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(refmap.current, {
      useCORS: true,
      allowTaint: true,
    });
    const imgbase = canvas.toDataURL("image/png");
    SetdataURL(imgbase);
  };

  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data.obtener_ubicacion_ajustador &&
      data.obtener_ubicacion_ajustador.completado
    ) {
      const {
        obtener_ubicacion_ajustador: {
          dato: { latitud, longitud },
        },
      } = data;
      if (latitud && longitud) {
        asignarValorRespuesta(null);
        asignarValorOrigen({
          lat: latitud,
          lng: longitud,
        });
        secuencia += 1;
      } else {
        secuencia = 0;
      }
      // setTimeout(() => {
      //   if (bdra === "bdra") {
      //     handleCaptureClick();
      //     if (dataURL !== null) {
      //       handleCaptureClick();
      //       guardarImgRuta({
      //         variables: {
      //           numeroSiniestro: numeroDeReporte.toString(),
      //           base64: dataURL,
      //         },
      //       });
      //     }
      //   }
      //   yacorrio("bdra");
      // }, 1000);

      setTimeout(() => {
        if (bdra === "bdra") {
          handleCaptureClick();
          if (dataURL !== null) {
            handleCaptureClick();
            guardarImgRuta({
              variables: {
                numeroSiniestro: numeroDeReporte.toString(),
                base64: dataURL,
              },
            });
          }
        }
        yacorrio("apagado");
        runSuccesLog(11);
        ubicacionAjustador({
          variables: {
            numeroReporte: numeroDeReporte,
            index: secuencia,
            token: objetoCookie.access_token,
          },
        });
      }, 5000);
    }
  }, [loading, data]);

  const calcularHoraDeArribo = (respuestaDeServicio) => {
    const { routes } = respuestaDeServicio;
    if (routes && routes.length) {
      const { legs } = routes[0];
      if (legs && legs.length) {
        const {
          duration: { value },
        } = legs[0];
        const tiempoDeLlegada = moment()
          .add(value, "seconds")
          .format("hh:mm a");
        dispatch({
          type: "AGREGAR",
          valor: tiempoDeLlegada,
          indice: "horaArribo",
        });
        asignarValorHoraArribo(
          `${diccionario.horaDeArribo} ${tiempoDeLlegada}`
        );
      }
    }
  };

  const procesarDirecciones = (respuestaDirecciones) => {
    if (respuestaDirecciones !== null) {
      if (respuestaDirecciones.status === "OK") {
        const {
          request: {
            origin: {
              location: { lat, lng },
            },
          },
        } = respuestaDirecciones;
        if (
          lat &&
          lng &&
          posicionMarcadorAuto.lat !== lat() &&
          posicionMarcadorAuto.lng !== lng()
        ) {
          const newPosition = new window.google.maps.LatLng(origen);
          const oldPosition = posicionMarcadorAuto.lat
            ? new window.google.maps.LatLng(posicionMarcadorAuto)
            : newPosition;

          const heading = window.google.maps.geometry.spherical.computeHeading(
            oldPosition,
            newPosition
          );
          const marker = document.querySelector(`[src="${Auto}"]`);

          // TODO: Descomentar el success log
          // runSuccesLog(11);
          console.log(newPosition);
          console.log(oldPosition);
          console.log(heading);

          if (marker) {
            marker.style.transform = `rotate(${heading}deg)`;
            marker.style.transformOrigin = "center";
            marker.parentNode.style.overflow = "visible";
          }
          asignarValorRespuesta(respuestaDirecciones);
          asignarValorRespuestaVisualizacion(respuestaDirecciones);
          calcularHoraDeArribo(respuestaDirecciones);
          asignarValorPosicionMarcadorAuto(origen);
        }
      }
    }
  };

  return (
    <div ref={refmap}>
      <GoogleMap
        mapContainerStyle={estiloDeContenedor}
        clickableIcons={false}
        options={{
          disableDefaultUI: false,
        }}
      >
        {posicionMarcadorAuto.lat && posicionMarcadorAuto.lng && (
          <Marker
            draggable={false}
            position={posicionMarcadorAuto}
            icon={{
              url: Auto,
              anchor: {
                x: 12.5,
                y: 12.5,
              },
            }}
          />
        )}
        <Marker
          draggable={false}
          position={puntoFinal}
          icon={{
            url: Persona,
          }}
        />
        {!respuesta && puntoFinal && puntoFinal.lat && origen && origen.lat && (
          <DirectionsService
            options={opcionesDeServicioDeDirecciones}
            callback={procesarDirecciones}
          />
        )}

        {respuestaVisualizacion && (
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
        )}
      </GoogleMap>
      <ContenedorPie>
        <ContenedorPieAjustador>
          <ContenedorPieAjustadorImagen src={imagenAjustadorDeRuta || ""} />
          <ContenedorPieAjustadorTexto>
            <ContenedorPieAjustadorNombre>
              Tu ajustador es: {nombreAjustadorDeRuta}
            </ContenedorPieAjustadorNombre>
            <ContenedorPieAjustadorHora>
              {horaArribo}
            </ContenedorPieAjustadorHora>
          </ContenedorPieAjustadorTexto>
        </ContenedorPieAjustador>
      </ContenedorPie>
    </div>
  );
};

PantallaSeguimientoMapa.propTypes = {
  numeroDeReporte: PropTypes.number,
};

PantallaSeguimientoMapa.defaultProps = {
  numeroDeReporte: 0,
};

export default PantallaSeguimientoMapa;

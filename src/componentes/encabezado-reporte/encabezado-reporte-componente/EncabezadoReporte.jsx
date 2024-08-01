/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { GoogleApiWrapper } from "google-maps-react";
import moment from "moment";
import "moment/locale/es-mx";
import { useCookies } from "react-cookie";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import {
  EncabezadoReporteContenedor,
  EnvolvedorEncabezadoReporte,
  TituloContenedor,
  SeparadorEncabezadoReporte,
  EnvolvedorPendienteEncabezadoReporte,
  FotoPendienteEncabezadoReporte,
  BarraEsperaEncabezadoReporte,
  LeyendaEncabezadoReporte,
  EnvolvedorAjustadorEncabezadoReporte,
  AjustadorEncabezadoReporte,
  FotoEncabezadoReporte,
  BotonUbicacionEncabezadoReporte,
  BotonIcono,
} from "./EncabezadoReporte.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import Configuraciones from "../../../servicios/google-maps";
import avatar from "../../../recursos/imagenes/default-avatar.png";
import constantes from "../../../recursos/constantes";

const EVENTOS_PASADOS_AJUSTADOR = loader(
  "../../../graphQL/query/reporte/listado_actualizaciones_reporte.graphql"
);

const SUSCRIPCION_AJUSTADOR = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const OBTENER_UBICACION = loader(
  "../../../graphQL/query/ubicacion-ajustador/obtener_ubicacion_ajustador.graphql"
);

const diccionario = {
  titulo: "Número de reporte: ",
  tituloAbreviado: "Reporte: ",
  buscandoAjustador: "Buscando al ajustador más cercano...",
  horaEstimada: "Hora estimada de arribo: ",
  calculando: "calculando...",
  botonUbicacion: "Ver ubicación",
  atendiendoLlegada: "Tu ajustador fue asignado y se encuentra en camino.",
};

const nombreCookie = constantes.nombreDeCookie;

const EncabezadoReporte = (props) => {
  const { google, loaded } = props;
  const location = useLocation();
  const history = useHistory();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const estadoApp = useSelector((estado) => estado);
  let reporteParams = "";
  let reporteRedux = "";
  if (
    location &&
    location.search &&
    location.search.includes("numeroReporte")
  ) {
    const params = new URLSearchParams(location.search);
    reporteParams = parseInt(params.get("numeroReporte"), 10);
  }
  if (estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte) {
    reporteRedux = parseInt(estadoApp.datosReporte.numeroReporte, 10);
  }
  const reporte = reporteParams || reporteRedux;
  const puntoFinal = estadoApp.coordenadasIniciales;
  if (!reporte) {
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
  const horaArriboEstado = estadoApp.horaArribo
    ? estadoApp.horaArribo
    : diccionario.calculando;
  const dispatch = useDispatch();

  const { data } = useSubscription(SUSCRIPCION_AJUSTADOR, {
    variables: { numeroReporte: reporte },
  });
  // dataUbicacionAjustador.dato.latitud &&
  // dataUbicacionAjustador.dato.longitud &&
  const [ubidacionAjus, setUbidacionAjus] = useState({
    latitud: 0,
    longitud: 0,
  });
  const [horaArribo, asignarValorHoraArribo] = useState();
  const [horaArriboPintar, asignarValorHoraArriboPintar] = useState();
  const [nombreAjustador, asignarValorNombreAjustador] = useState(
    nombreAjustadorDeRuta
  );
  const [imagenAjustador, asignarValorImagenAjustador] = useState(
    imagenAjustadorDeRuta
  );

  const [obtenerEventosPasados, { data: eventosPasados }] = useLazyQuery(
    EVENTOS_PASADOS_AJUSTADOR,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [
    ubicacionAjustador,
    {
      loading: loadingUbicacionAjustador,
      error: errorUbicacionAjustador,
      data: dataUbicacionAjustador,
    },
  ] = useLazyQuery(OBTENER_UBICACION, {
    fetchPolicy: "no-cache",
    pollInterval: 10000,
  });

  const alCargarRuta = (errorEnruta, respuesta) => {
    if (!errorEnruta) {
      const { routes } = respuesta;
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
          asignarValorHoraArribo(tiempoDeLlegada);
        }
      }
    }
  };

  const asignarAjustador = (datos) => {
    ubicacionAjustador({
      variables: {
        numeroReporte: reporte,
        index: 0,
        token: objetoCookie.access_token,
      },
    });
    const { descripciones, imagenes } = datos;
    const nombreAjustadorDeRespuesta = obtenerValorDeArregloDeStrings(
      descripciones,
      "NombreAjustador: "
    );
    const nombreSplit = nombreAjustadorDeRespuesta.split("-");
    const imagenAjustadorDeRespuesta = imagenes.length && imagenes[0];
    asignarValorImagenAjustador(imagenAjustadorDeRespuesta || avatar);

    if (nombreSplit.length > 1) {
      if (nombreSplit[1] === "") {
        asignarValorNombreAjustador(nombreSplit[0]);
      } else {
        asignarValorNombreAjustador(nombreSplit[1]);
      }
    } else {
      asignarValorNombreAjustador(nombreAjustadorDeRespuesta);
    }

    dispatch({
      type: "AGREGAR",
      valor: {
        nombre: nombreAjustador,
        imagen: imagenAjustadorDeRespuesta,
      },
      indice: "datosAjustador",
    });
  };
  let fechaNotificacionCreado = "";
  let fechaActual = Date();
  // let DiferenciaHoras = 0;
  let milisegundos = 0;
  let minutos = 0;
  let segundos = 0;
  // let diffHorasConst = 5;
  useEffect(() => {
    if (
      eventosPasados &&
      eventosPasados.listado_actualizaciones_reporte &&
      eventosPasados.listado_actualizaciones_reporte.dato &&
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste
    ) {
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste.forEach(
        (evento) => {
          fechaActual = moment(fechaActual);
          // De momento para identificar el cambio de horario usamos solo el mes 11
          // diffHorasConst =
          //   fechaActual.format("M") >= 11 ||
          //   (fechaActual.format("M") >= 1 && fechaActual.format("M") <= 3)
          //     ? 6
          //     : 5;
          switch (evento.tipoMensaje) {
            case 0:
              fechaNotificacionCreado = moment(evento.creado);

              // DiferenciaHoras = moment
              //   .duration(fechaActual.diff(fechaNotificacionCreado))
              //   .hours();
              milisegundos = moment.duration(
                fechaActual.diff(fechaNotificacionCreado)
              );
              segundos = milisegundos / 1000;
              minutos = segundos / 60;
              if (minutos > 30) {
                history.push({
                  pathname: "/pasos-progreso",
                  search: `?numeroReporte=${reporte}`,
                });
              }
              if (evento.orden === 0) {
                asignarAjustador(evento);
              }
              break;
            default:
          }
        }
      );
    }
  }, [eventosPasados]);

  useEffect(() => {
    if (
      data &&
      data.escucha_evento_actualizacion_reporte &&
      data.escucha_evento_actualizacion_reporte.tipoMensaje === 0 &&
      data.escucha_evento_actualizacion_reporte.dato &&
      data.escucha_evento_actualizacion_reporte.dato.orden === 0
    ) {
      const {
        escucha_evento_actualizacion_reporte: { dato },
      } = data;
      asignarAjustador(dato);
    }
  }, [data]);

  useEffect(() => {
    if (
      nombreAjustador &&
      !loadingUbicacionAjustador &&
      !errorUbicacionAjustador &&
      dataUbicacionAjustador &&
      dataUbicacionAjustador.obtener_ubicacion_ajustador &&
      dataUbicacionAjustador.obtener_ubicacion_ajustador.completado
    ) {
      const {
        obtener_ubicacion_ajustador: {
          dato: { latitud, longitud },
        },
      } = dataUbicacionAjustador;
      if (puntoFinal) {
        const servicioDeDirecciones = new google.maps.DirectionsService();
        servicioDeDirecciones.route(
          {
            origin: { lat: latitud, lng: longitud },
            destination: puntoFinal,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (respuesta, estatus) => {
            if (estatus === google.maps.DirectionsStatus.OK) {
              alCargarRuta(null, respuesta);
            } else {
              alCargarRuta(estatus, respuesta);
            }
          }
        );
        setUbidacionAjus({
          latitud:
            dataUbicacionAjustador.obtener_ubicacion_ajustador.dato.latitud,
          longitud:
            dataUbicacionAjustador.obtener_ubicacion_ajustador.dato.longitud,
        });
      }
    }
  }, [loadingUbicacionAjustador, dataUbicacionAjustador]);

  useEffect(() => {
    if (!(nombreAjustador && reporteParams === reporteRedux)) {
      dispatch({
        type: "BORRAR",
        indice: "datosAjustador",
      });
      const nuevoObjetoDatosReporte = JSON.parse(
        JSON.stringify(estadoApp.datosReporte ? estadoApp.datosReporte : {})
      );
      nuevoObjetoDatosReporte.numeroReporte = reporte;
      dispatch({
        type: "AGREGAR",
        valor: nuevoObjetoDatosReporte,
        indice: "datosReporte",
      });
    }
    obtenerEventosPasados({ variables: { numeroReporte: reporte } });
  }, []);

  const tituloEncabezado = () => {
    if (reporte.length > 15) {
      return (
        <TituloContenedor id="tituloEncabezado">
          {diccionario.tituloAbreviado} {reporte}
        </TituloContenedor>
      );
    }
    return (
      <TituloContenedor id="tituloEncabezado">
        {diccionario.titulo} {reporte}
      </TituloContenedor>
    );
  };

  const regresar = () => {
    history.push("/polizas-siniestradas");
  };

  const abrirPantallaSeguimiento = () => {
    history.push({
      pathname: "/seguimiento-ajustador",
      state: {
        paginaAnterior: location.pathname,
        ajustador: {
          nombre: nombreAjustador,
          imagen: imagenAjustador,
        },
      },
    });
  };
  /**
   * Valida la hora estimada de llegada del ajustador
   */
  const validaHoradearrivoOld = () => {
    if (horaArribo && horaArribo !== diccionario.calculando) {
      asignarValorHoraArriboPintar(diccionario.horaEstimada.concat(horaArribo));
    } else if (
      horaArriboEstado &&
      horaArriboEstado !== diccionario.calculando
    ) {
      asignarValorHoraArriboPintar(
        diccionario.horaEstimada.concat(horaArriboEstado)
      );
    } else {
      asignarValorHoraArriboPintar(diccionario.atendiendoLlegada);
    }
  };

  /**
   * Valida si hay datos de ubicacion, si si hay valida la hora estimada de llegada
   */
  const validaHoraArribo = () => {
    if (ubidacionAjus.latitud === 0 && ubidacionAjus.longitud === 0) {
      asignarValorHoraArriboPintar(diccionario.atendiendoLlegada);
    } else {
      validaHoradearrivoOld();
    }
  };
  useEffect(() => {
    validaHoraArribo();
  }, [horaArriboEstado, horaArribo]);

  return (
    <EnvolvedorEncabezadoReporte key={v4()}>
      {loaded ? (
        <BotonIcono type="button" onClick={regresar}>
          <RegresarIcono fontSize="large" id="botonRegresar" />
        </BotonIcono>
      ) : null}
      {tituloEncabezado()}
      <SeparadorEncabezadoReporte />
      {nombreAjustador && (
        <EnvolvedorAjustadorEncabezadoReporte>
          <FotoEncabezadoReporte id="imagenAjustador" src={imagenAjustador} />

          <AjustadorEncabezadoReporte id="nombreAjustador">
            Tu ajustador es: {nombreAjustador}
          </AjustadorEncabezadoReporte>
          <LeyendaEncabezadoReporte id="horaArribo">
            {`${horaArriboPintar}`}
          </LeyendaEncabezadoReporte>
          {(horaArribo ||
            (horaArriboEstado &&
              ubidacionAjus.latitud !== 0 &&
              ubidacionAjus.longitud !== 0)) && (
            <BotonUbicacionEncabezadoReporte
              id="botonPantallaSeguimiento"
              onClick={abrirPantallaSeguimiento}
            >
              {diccionario.botonUbicacion}
            </BotonUbicacionEncabezadoReporte>
          )}
        </EnvolvedorAjustadorEncabezadoReporte>
      )}
      {!nombreAjustador && (
        <EnvolvedorPendienteEncabezadoReporte>
          <FotoPendienteEncabezadoReporte />
          <BarraEsperaEncabezadoReporte />
          <LeyendaEncabezadoReporte id="buscandoAjustador">
            {diccionario.buscandoAjustador}
          </LeyendaEncabezadoReporte>
        </EnvolvedorPendienteEncabezadoReporte>
      )}
    </EnvolvedorEncabezadoReporte>
  );
};

EncabezadoReporte.defaultProps = {};

EncabezadoReporte.propTypes = {};

const EncabezadoReporteComponente = GoogleApiWrapper({
  ...Configuraciones,
})(EncabezadoReporte);

export default () => (
  <EncabezadoReporteContenedor>
    <EncabezadoReporteComponente />
  </EncabezadoReporteContenedor>
);

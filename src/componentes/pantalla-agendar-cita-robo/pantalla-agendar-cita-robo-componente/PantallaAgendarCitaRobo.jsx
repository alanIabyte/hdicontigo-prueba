/* eslint-disable */
import React, { useState, useEffect, useRef, createRef } from "react";
import { findDOMNode } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
import "moment/locale/es-mx";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  SeparadorEncabezadoCuestionarioReporte,
  TituloCuestionarioReporte,
  CuerpoCuestionarioReporte,
  SeparadorCuestionarioReporte,
  MensajePequeno,
  ContenedorProcesoLegal,
  EnvolvedorProcesoLegal,
  ImagenProcesoLegal,
  TituloSeccion,
  SubTituloSeccion,
  // ----------------------------------------------------------------------------------------
  ContenedorImagen,
  ImagenPerfil,
  NombreAjustador,
  Subtitulo,
} from "./PantallaAgendarCitaRobo.styled";
import {
  ContenedorCampoTextoUbicacionMapa,
  ContenedorCampoTextoUbicacionMapaDestino,
  ContenedorGoogleMap,
  CuerpoUbicacionMapa,
  MensajeError,
  SeparadorEncabezadoUbicacionMapa,
  TituloUbicacionMapa,
} from "./PantallaUbicacionMapa.styled";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import SeleccionCuestionario from "../../seleccion-cuestionario";
import Boton from "../../boton";
import CampoTexto from "../../componentes-v2/campo-texto";
import Constantes from "../../../recursos/constantes";
import Mapa from "./Mapa";
import PantallaDireccion from "./PantallaUbicacionMapaDireccion";
import PantallaMapa from "./PantallaUbicacionMapa";
import avatar from "../../../recursos/imagenes/default-avatar.png";
import carroDefault from "../../../recursos/iconos/hdi-c/mis-poliza/autos.png";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import IconoConductorDetenido from "../../../recursos/iconos/ico_lib_conductor_detenido.svg";
import IconoVehiculoDetenido from "../../../recursos/iconos/ico_lib_vehiculo_detenido.svg";

const valores = {
  poliza: "",
  numeroDeSerie: "",
  fechaSiniestro: moment(),
  ubicacion: "",
  referencias: "",
};

const diccionario = {
  encabezado: "Agendar cita",
  titulo: "Agenda tu cita con tu ajustador:",
  Subtitulo1: "Datos de la cita",
  Subtitulo2: "Ubicación de la cita",
  nombreAjustador: "*Nombre del ajustador*",
  mensajePequeno1: "Será necesario que reúnas los ",
  mensajePequeno2: "siguientes requisitos ",
  mensajePequeno3: "antes de reunirte con tu ajustador.",
  etiquetaBoton: "Solicitar cita",
  etiquetaFecha: "Fecha de siniestro",
  horaCita: {
    marcador: "HH:HH p.m.",
    etiqueta: "Hora de la cita",
  },
  ubicacionCita: {
    etiqueta: "Selecciona la uicación de la cita",
    marcador: "Selecciona la uicación de la cita",
  },
};

const nombreCookie = Constantes.nombreDeCookie;
const iconoCalendario = <CalendarTodayIcon />;

const PantallaAgendarCitaRobo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const btnRef = useRef();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    // history.push("/");
    console.log("No hay cookie");
  }

  //**********************ASIGNACIONES***************************************************************
  const [gpsActivado, asignarGpsActivado] = useState(false);
  const [esAndroid, asignarEsAndroid] = useState(false);
  const [imagenUsuario, asignarValorImagenUsuario] = useState(avatar);
  const [errorImagen, asignarValorErrorImagen] = useState("");
  const [pantalla, asignarValorPantalla] = useState("");
  const [ubicacion, asignarValorUbicacion] = useState("");
  const [focoUbicacion, asignarValorFocoUbicacion] = useState("");
  const [coordenadasIniciales, asignarCoordenadasIniciales] = useState({
    lat:
      estadoApp && estadoApp.coordenadasIniciales
        ? estadoApp.coordenadasIniciales.lat
        : null,
    lng:
      estadoApp && estadoApp.coordenadasIniciales
        ? estadoApp.coordenadasIniciales.lng
        : null,
  });
  const [
    mostrarModalLocalizacionDesactivada,
    asignarValorMostrarModalLocalizacionDesactivada,
  ] = useState(false);
  const valorAnteriorParaUbicacionRef = useRef();

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      asignarEsAndroid(true);
    }
    valorAnteriorParaUbicacionRef.current = ubicacion;
  });

  const valorAnteriorParaUbicacion = valorAnteriorParaUbicacionRef.current;
  //*************************************************************************************************
  //**********************FUNCIONES******************************************************************
  const alCambiarDireccion = (lugar) => {
    const {
      formatted_address: direccion,
      geometry: { location: coordenadas },
    } = lugar;

    if (direccion && direccion !== valorAnteriorParaUbicacion && coordenadas) {
      dispatch({
        type: "AGREGAR",
        valor: {
          lat: estadoApp.coordenadasIniciales
            ? estadoApp.coordenadasIniciales.lat
            : null,
          lng: estadoApp.coordenadasIniciales
            ? estadoApp.coordenadasIniciales.lng
            : null,
        },
        indice: "coorIniAnt",
      });

      dispatch({
        type: "AGREGAR",
        valor: {
          lat: estadoApp.coordenadasInicialesDestino
            ? estadoApp.coordenadasInicialesDestino.lat
            : null,
          lng: estadoApp.coordenadasInicialesDestino
            ? estadoApp.coordenadasInicialesDestino.lng
            : null,
        },
        indice: "coorDestAnt",
      });

      asignarValorUbicacion(direccion);
      asignarCoordenadasIniciales({
        lat: coordenadas.lat(),
        lng: coordenadas.lng(),
      });

      valores.ubicacion = direccion;

      dispatch({
        type: "AGREGAR",
        valor: {
          lat: coordenadas.lat(),
          lng: coordenadas.lng(),
        },
        indice: "coordenadasIniciales",
      });

      asignarValorPantalla("");
    }
  };

  const cambiarPantalla = (pantallaACambiar) => {
    asignarValorPantalla(pantallaACambiar);
  };

  const alCambiarUbicacion = (evento) => {
    if (evento) {
      const valor = evento.target.value;

      valores.ubicacion = valor;
    }
  };

  const alCambiarPosicionDeMarcador = (
    coordenadas,
    direccion,
    gpsActivadoDeComponente,
    error,
    distance
  ) => {
    if (!error) {
      if (direccion !== valorAnteriorParaUbicacion) {
        valores.ubicacion = direccion;
        asignarValorUbicacion(direccion);
        asignarCoordenadasIniciales(coordenadas);
        dispatch({
          type: "AGREGAR",
          valor: coordenadas,
          indice: "coordenadasIniciales",
        });
        asignarGpsActivado(gpsActivadoDeComponente);
      }
    }
  };

  const abrirLocalizacionDesactivada = () => {
    asignarValorMostrarModalLocalizacionDesactivada(true);
  };

  const alDarClickEnFijarUbicacion = () => {
    cambiarPantalla("mapa");
  };

  const alCambiarDireccionMapaCompleto = (direccion, coordenadas) => {
    if (direccion && direccion !== valorAnteriorParaUbicacion && coordenadas) {
      const { lat, lng } = coordenadas;
      valores.ubicacion = direccion;
      asignarValorUbicacion(direccion);
      asignarCoordenadasIniciales({
        lat,
        lng,
      });
      dispatch({
        type: "AGREGAR",
        valor: {
          lat,
          lng,
        },
        indice: "coordenadasIniciales",
      });
      asignarValorPantalla("");
    }
  };
  //**********************FUNCIONES******************************************************************

  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()}>
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.goBack();
        }}
      />
      <Pantalla>
        <TituloCuestionarioReporte id="titulo">
          {diccionario.titulo}
        </TituloCuestionarioReporte>
        <ContenedorImagen
        //onClick={alDarClickEnImagen}
        >
          <ImagenPerfil error={errorImagen} src={imagenUsuario} />
        </ContenedorImagen>
        <NombreAjustador>{diccionario.nombreAjustador}</NombreAjustador>
        <MensajePequeno id="mensajePequeno">
          {diccionario.mensajePequeno1}
          <a target="_blank" rel="noreferrer" href={""}>
            {diccionario.mensajePequeno2}
          </a>
          {diccionario.mensajePequeno3}
        </MensajePequeno>
        <CuerpoCuestionarioReporte>
          <Subtitulo>{diccionario.Subtitulo1}</Subtitulo>
          <CampoTexto
            esCalendario
            etiqueta={diccionario.etiquetaFecha}
            icono={iconoCalendario}
            // enCambio={alCambiarFecha}
            fechaCalendario={valores.fechaSiniestro}
            id="campoFecha"
          />
          <CampoTexto
            id="campoHoraCita"
            expresionRegular={/^[0-9a-zA-Z&Ññ]*$/}
            numeroDeCaracteres={4}
            marcador={diccionario.horaCita.marcador}
            etiqueta={diccionario.horaCita.etiqueta}
            // iconoAyuda
            // openHelp={() => openHelpModal("serie")}
            // enCambio={alCambiarNumeroDeSerie}
            // foco={focoNumeroDeSerie}
            // valor={valores.numeroDeSerie}
            // mensajeError={errorSerie}
          />
          <Subtitulo>{diccionario.Subtitulo2}</Subtitulo>

          <CuerpoUbicacionMapa>
            <ContenedorCampoTextoUbicacionMapa>
              <CampoTexto
                id="campoUbicacionCita"
                etiqueta={diccionario.ubicacionCita.etiqueta}
                valor={valores.ubicacion}
                marcador={diccionario.ubicacionCita.marcador}
                enCambio={alCambiarUbicacion}
                foco={focoUbicacion}
                editable={false}
                enClick={() => {
                  cambiarPantalla("direccion");
                }}
              />
            </ContenedorCampoTextoUbicacionMapa>
            <ContenedorGoogleMap>
              <Mapa
                alCambiarPosicionDeMarcador={alCambiarPosicionDeMarcador}
                alDarClickEnFijarUbicacion={alDarClickEnFijarUbicacion}
                coordenadasIniciales={coordenadasIniciales}
                accionDeLocalizacionDesactivada={abrirLocalizacionDesactivada}
                gpsActivadoDeProp={gpsActivado}
                sePuedeMoverMapa={false}
                sePuedeMoverMarcador={false}
              />
            </ContenedorGoogleMap>
            <Boton
              etiqueta={diccionario.etiquetaBoton}
              tema="estandar"
              enClick={() => {}}
            />
          </CuerpoUbicacionMapa>
        </CuerpoCuestionarioReporte>
      </Pantalla>
    </EnvolvedorPantalla>
  );

  if (pantalla === "direccion") {
    pantallaAMostrar = (
      <PantallaDireccion
        alCambiarDireccion={alCambiarDireccion}
        alRegresar={() => {
          cambiarPantalla("");
        }}
        direccionPorDefecto={valores.ubicacion}
      />
    );
  } else if (pantalla === "mapa") {
    pantallaAMostrar = (
      <PantallaMapa
        accionDeLocalizacionDesactivada={abrirLocalizacionDesactivada}
        alAceptar={alCambiarDireccionMapaCompleto}
        alRegresar={() => {
          cambiarPantalla("");
        }}
        coordenadas={coordenadasIniciales}
      />
    );
  }

  return pantallaAMostrar;
};

export default PantallaAgendarCitaRobo;

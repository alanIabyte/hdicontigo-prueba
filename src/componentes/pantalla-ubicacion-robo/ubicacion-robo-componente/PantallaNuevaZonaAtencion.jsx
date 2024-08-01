/* eslint-disable */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";

import Encabezado from "../../encabezado";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import { Alerta } from "../../alerta";
import Constantes from "../../../recursos/constantes";
import {
  ContenedorCampoTextoUbicacionMapa,
  ContenedorGoogleMap,
  CuerpoUbicacionMapa,
  TituloUbicacionMapa,
} from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/PantallaUbicacionMapa.styled";
import { MensajeError } from "../../componentes-styled-compartidos/Textos";
import Mapa from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/Mapa";
import ACTIONS_REDUX from "../../../reductores/Actions";
import PantallaUbicacionMapaDireccion from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/PantallaUbicacionMapaDireccion";

// ! Que quede claro que YO (JR) NO PROGRAME ESTE COMPONENTE en forma de spaghetti, esta mal hecho pero no me dan tiempo de arreglarlo. Ni modo.

const valores = {
  ubicacion: "",
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaNuevaZonaAtencion = ({ alRegresar }) => {
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);

  const history = useHistory();

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    // history.push("/");
    console.log("No hay cookie");
  }

  const diccionario = {
    tituloBarraProgreso: "Ubicación del robo",
    encabezado: "Selecciona la zona en la que deseas ser atendido",
    titulo: "Selecciona la zona en la que deseas ser atendido",
    etiquetaCampoTexto: "Selecciona la ubicación del robo",
    etiquetaCampoTextoReferencias: "Referencias",
    etiquetaBoton: "Continuar",
    alerta: {
      titulo: "Ubicación desactivada",
      cuerpo:
        // eslint-disable-next-line max-len
        "Parece que tu ubicación está desactivada. Te recomendamos activarla desde las opciones de configuración de tu dispositivo para obtener una localización más precisa.",
      cuerpoAndroid:
        // eslint-disable-next-line max-len
        "Parece que tu ubicación está desactivada. Te recomendamos activarla desde las opciones de configuración de tu dispositivo para obtener una localización más precisa.",
      etiquetaBoton: "Cancelar",
      etiquetaBoton2: "Ir a Ajustes",
      etiquetaBotonAndroid: "Ok",
    },
    errores: {
      campoRequerido: "Campo requerido para poder continuar.",
    },
  };
  const [pantalla, asignarValorPantalla] = useState("");
  const [ubicacion, asignarValorUbicacion] = useState("");
  const [focoUbicacion, asignarValorFocoUbicacion] = useState("");
  const [errorUbicacion, asignarValorErrorUbicacion] = useState("");
  const [
    mostrarModalLocalizacionDesactivada,
    asignarValorMostrarModalLocalizacionDesactivada,
  ] = useState(false);
  const [
    mostrarModalLocalizacionDesactivadaUsuario,
    asignarValorMostrarModalLocalizacionDesactivadaUsuario,
  ] = useState(true);

  const [coordenadasIniciales, asignarCoordenadasIniciales] = useState({
    lat: 
      ( estadoApp && estadoApp.datosReporteRobo &&
      estadoApp.datosReporteRobo.ubicacionAtencionRobo &&
      estadoApp.datosReporteRobo.ubicacionAtencionRobo.lat
      ) ? estadoApp.datosReporteRobo.ubicacionAtencionRobo.lat
        : ( estadoApp && estadoApp.coordenadasInicialesAtencion &&
          estadoApp.coordenadasInicialesAtencion.lat
          ) ? estadoApp.coordenadasInicialesAtencion.lat
            : ( estadoApp && estadoApp.coordenadasIniciales &&
              estadoApp.coordenadasIniciales.lat
              ) ? estadoApp.coordenadasIniciales.lat
                : null,
    lng:
      ( estadoApp && estadoApp.datosReporteRobo &&
        estadoApp.datosReporteRobo.ubicacionAtencionRobo &&
        estadoApp.datosReporteRobo.ubicacionAtencionRobo.lng
        ) ? estadoApp.datosReporteRobo.ubicacionAtencionRobo.lng
          : ( estadoApp && estadoApp.coordenadasInicialesAtencion &&
            estadoApp.coordenadasInicialesAtencion.lng
            ) ? estadoApp.coordenadasInicialesAtencion.lng
              : ( estadoApp && estadoApp.coordenadasIniciales &&
                estadoApp.coordenadasIniciales.lng
                ) ? estadoApp.coordenadasIniciales.lng
                  : null,
  });
  const [gpsActivado, asignarGpsActivado] = useState(false);
  const [esAndroid, asignarEsAndroid] = useState(false);
  const valorAnteriorParaUbicacionRef = useRef();

  const cambiarPantalla = (pantallaACambiar) => {
    asignarValorPantalla(pantallaACambiar);
  };

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      asignarEsAndroid(true);
    }
    valorAnteriorParaUbicacionRef.current = ubicacion;
  });

  useEffect(() => {
    if (estadoApp.datosReporteRobo != null) {
      if (estadoApp.datosReporteRobo &&
        estadoApp.datosReporteRobo.ubicacionAtencionRobo &&
        estadoApp.datosReporteRobo.ubicacionAtencionRobo.direccion
      ) {
        valores.ubicacion = estadoApp.datosReporteRobo.direccion;
      }
    }
  }, []);

  const valorAnteriorParaUbicacion = valorAnteriorParaUbicacionRef.current;

  const validacionRespuestas = () => {
    const { ubicacion: ubicacionDeValores } = valores;

    if (!ubicacionDeValores) {
      asignarValorFocoUbicacion("error");
      asignarValorErrorUbicacion(diccionario.errores.campoRequerido);
    } else {
      asignarValorFocoUbicacion("");
      asignarValorErrorUbicacion("");
    }

    console.log(ubicacionDeValores);

    if (ubicacionDeValores) {
      dispatch({
        type: ACTIONS_REDUX.ACTUALIZAR,
        indice: "datosReporteRobo",
        indiceExtra: "ubicacionAtencionRobo",
        valor: {
          direccion: ubicacionDeValores,
          lat: coordenadasIniciales.lat,
          lng: coordenadasIniciales.lng,
        },
      });
      history.push("/resumen-reportes");
    }
  };

  const alCambiarPosicionDeMarcador = (
    coordenadas,
    direccion,
    gpsActivadoDeComponente,
    error
  ) => {
    if (!error) {
      if (direccion !== valorAnteriorParaUbicacion) {
        valores.ubicacion = direccion;
        asignarValorUbicacion(direccion);
        asignarCoordenadasIniciales(coordenadas);
        dispatch({
          type: "AGREGAR",
          valor: coordenadas,
          indice: "coordenadasInicialesAtencion",
        });
        asignarGpsActivado(gpsActivadoDeComponente);
      }
    }
  };

  const abrirLocalizacionDesactivada = () => {
    asignarValorMostrarModalLocalizacionDesactivada(true);
  };

  const alCambiarUbicacion = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.ubicacion = valor;
    }
  };

  const alCambiarDireccion = (lugar) => {
    const {
      formatted_address: direccion,
      geometry: { location: coordenadas },
    } = lugar;
    if (direccion && direccion !== valorAnteriorParaUbicacion && coordenadas) {
      valores.ubicacion = direccion;
      asignarValorUbicacion(direccion);
      asignarCoordenadasIniciales({
        lat: coordenadas.lat(),
        lng: coordenadas.lng(),
      });
      dispatch({
        type: "AGREGAR",
        valor: {
          lat: coordenadas.lat(),
          lng: coordenadas.lng(),
        },
        indice: "coordenadasInicialesAtencion",
      });
      asignarValorPantalla("");
    }
  };

  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()} id="pantallaUbicacion">
      {esAndroid ? (
        <Alerta
          textoEncabezado={diccionario.alerta.titulo}
          textoCuerpo={diccionario.alerta.cuerpoAndroid}
          mostrarModal={
            mostrarModalLocalizacionDesactivada &&
            mostrarModalLocalizacionDesactivadaUsuario
          }
          manejarCierre={() => {
            asignarValorMostrarModalLocalizacionDesactivada(false);
            asignarValorMostrarModalLocalizacionDesactivadaUsuario(false);
          }}
          mostrarIcono={false}
          estiloBotones="ladoALado"
          etiquetaBoton={diccionario.alerta.etiquetaBotonAndroid}
          temaBoton="estandar"
          funcionLlamadaBoton={() => {
            asignarValorMostrarModalLocalizacionDesactivada(false);
            asignarValorMostrarModalLocalizacionDesactivadaUsuario(false);
          }}
        />
      ) : (
        <Alerta
          textoEncabezado={diccionario.alerta.titulo}
          textoCuerpo={diccionario.alerta.cuerpo}
          mostrarModal={
            mostrarModalLocalizacionDesactivada &&
            mostrarModalLocalizacionDesactivadaUsuario
          }
          manejarCierre={() => {
            asignarValorMostrarModalLocalizacionDesactivada(false);
            asignarValorMostrarModalLocalizacionDesactivadaUsuario(false);
          }}
          mostrarIcono={false}
          estiloBotones="ladoALado"
          etiquetaBoton={diccionario.alerta.etiquetaBoton}
          temaBoton="simple"
          funcionLlamadaBoton={() => {
            asignarValorMostrarModalLocalizacionDesactivada(false);
            asignarValorMostrarModalLocalizacionDesactivadaUsuario(false);
          }}
          etiquetaBoton2={diccionario.alerta.etiquetaBoton2}
          temaBoton2="estandar"
          funcionLlamadaBoton2={() => {
            if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
              window.location.href = "app-settings:";
            } else {
              window.location.href = "App-prefs://prefs:root=Settings";
            }
          }}
        />
      )}
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={alRegresar}
        alertaAmarilla={estadoApp && estadoApp.semaforoAmarillo}
      />
      <Pantalla>
        <TituloUbicacionMapa>{diccionario.titulo}</TituloUbicacionMapa>
        <CuerpoUbicacionMapa>
          <ContenedorCampoTextoUbicacionMapa>
            <CampoTexto
              etiqueta={diccionario.etiquetaCampoTexto}
              valor={valores.ubicacion}
              enCambio={alCambiarUbicacion}
              foco={focoUbicacion}
              editable={false}
              id="campoUbicacionActual"
              enClick={() => {
                cambiarPantalla("direccion");
              }}
            />
          </ContenedorCampoTextoUbicacionMapa>
          {errorUbicacion && (
            <MensajeError style={{ marginTop: "30px" }}>
              {errorUbicacion}
            </MensajeError>
          )}
          <ContenedorGoogleMap>
            <Mapa
              alCambiarPosicionDeMarcador={alCambiarPosicionDeMarcador}
              coordenadasIniciales={coordenadasIniciales}
              accionDeLocalizacionDesactivada={abrirLocalizacionDesactivada}
              gpsActivadoDeProp={gpsActivado}
              sePuedeMoverMapa={false}
              sePuedeMoverMarcador={false}
            />
          </ContenedorGoogleMap>
        </CuerpoUbicacionMapa>
        <Boton
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );

  if (pantalla === "direccion") {
    pantallaAMostrar = (
      <PantallaUbicacionMapaDireccion
        alCambiarDireccion={alCambiarDireccion}
        alRegresar={() => {
          cambiarPantalla("");
        }}
        direccionPorDefecto={valores.ubicacion}
      />
    );
  }
  return pantallaAMostrar;
};

export default PantallaNuevaZonaAtencion;

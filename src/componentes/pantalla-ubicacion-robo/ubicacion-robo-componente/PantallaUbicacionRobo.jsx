/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";

import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import { Alerta } from "../../alerta";
import Constantes from "../../../recursos/constantes";
import {
  ContenedorCampoTextoUbicacionMapa,
  ContenedorGoogleMap,
  CuerpoUbicacionMapa,
  // TituloUbicacionMapa,
} from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/PantallaUbicacionMapa.styled";
import PantallaReferencias from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/PantallaUbicacionMapaReferencias";
import {
  MensajeError,
  TituloPrincipalIzquierda,
} from "../../componentes-styled-compartidos/Textos";
import Mapa from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/Mapa";
import PantallaUbicacionMapa from "../../pantalla-ubicacion-mapa";
import PantallaUbicacionMapaDireccion from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/PantallaUbicacionMapaDireccion";
import SeleccionCuestionario from "../../seleccion-cuestionario";
import { CuerpoCuestionarioReporte } from "../../pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import PantallaNuevaZonaAtencion from "./PantallaNuevaZonaAtencion";
import ACTIONS_REDUX from "../../../reductores/Actions";
import { SeparadorLinea } from "../../pantalla-cuenta/pantalla-cuenta-componente/PantallaCuenta.styled";
import { SeparadorEspacio } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";

// ! Que quede claro que YO (JR) NO PROGRAME ESTE COMPONENTE en forma de spagheti, esta mal hecho pero no me dan tiempo de arreglarlo. Ni modo.

const valores = {
  ubicacion: "",
  referencias: "",
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaUbicacionRobo = () => {
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);

  const location = useLocation();
  const editar =
    location && location.state && location.state.editar
      ? location.state.editar
      : false;

  let barraProgreso;
  let noElementos;
  if (
    estadoApp &&
    (estadoApp.semaforoAmarillo ||
      (estadoApp.datosIngresoPoliza &&
        estadoApp.datosIngresoPoliza.fechaPasada))
  ) {
    barraProgreso = 2;
    noElementos = 3;
  } else {
    barraProgreso = 3;
    noElementos = 4;
  }
  const history = useHistory();

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    // history.push("/");
    console.log("No hay cookie");
  }

  const diccionario = {
    tituloBarraProgreso: "Ubicación del robo",
    encabezado: editar ? "Editar" : "Generando Reporte",
    titulo: "Confirma la ubicación del robo",
    etiquetaCampoTexto: "Selecciona la ubicación del robo",
    etiquetaCampoTextoReferencias: "Referencias",
    etiquetaBoton: editar ? "Guardar cambios" : "Continuar",
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
  const [pregunta1, setPregunta1] = useState(null);
  const [ubicacion, asignarValorUbicacion] = useState("");
  const [focoUbicacion, asignarValorFocoUbicacion] = useState("");
  const [focoReferencias, asignarValorFocoReferencias] = useState("");
  const [errorUbicacion, asignarValorErrorUbicacion] = useState("");
  const [errorReferencias, asignarValorErrorReferencias] = useState("");
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
      estadoApp && estadoApp.coordenadasIniciales
        ? estadoApp.coordenadasIniciales.lat
        : null,
    lng:
      estadoApp && estadoApp.coordenadasIniciales
        ? estadoApp.coordenadasIniciales.lng
        : null,
  });
  const [gpsActivado, asignarGpsActivado] = useState(false);
  const [esAndroid, asignarEsAndroid] = useState(false);
  const [errorPregunta, setErrorPregunta] = useState(null);
  const valorAnteriorParaUbicacionRef = useRef();

  const [coordenadasTemp, setCoordenadasTemp] = useState({lat: null, lng: null});

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      asignarEsAndroid(true);
    }
    valorAnteriorParaUbicacionRef.current = ubicacion;
  });

  useEffect(() => {
    if (estadoApp.datosReporteRobo) {
      // Se agrega validación por si hay una referencia la asignamos
      if (estadoApp.datosReporteRobo.referenciasUbicacionRobo) {
        valores.referencias = estadoApp.datosReporteRobo.referenciasUbicacionRobo||"";
      }

      if (estadoApp.datosReporteRobo.atencionLugarRobo != null) {
        setPregunta1(estadoApp.datosReporteRobo.atencionLugarRobo);
      }

      // Validar si hay una dirección guardada
       if (estadoApp.datosReporteRobo.ubicacionRobo != null) {
         valores.ubicacion = estadoApp.datosReporteRobo.ubicacionRobo.direccion||"";
         setCoordenadasTemp({lat: estadoApp.datosReporteRobo.ubicacionRobo.lat, lng: estadoApp.datosReporteRobo.ubicacionRobo.lng});
      }
    }
  }, []);

  const valorAnteriorParaUbicacion = valorAnteriorParaUbicacionRef.current;

  const validacionRespuestas = () => {
    const { ubicacion: ubicacionDeValores, referencias } = valores;

    if (!ubicacionDeValores) {
      asignarValorFocoUbicacion("error");
      asignarValorErrorUbicacion(diccionario.errores.campoRequerido);
    } else {
      asignarValorFocoUbicacion("");
      asignarValorErrorUbicacion("");
    }

    if (!referencias) {
      asignarValorFocoReferencias("error");
      asignarValorErrorReferencias(diccionario.errores.campoRequerido);
    } else {
      asignarValorFocoReferencias("");
      asignarValorErrorReferencias("");
    }

    if (pregunta1 === null) {
      setErrorPregunta("Campo requerido para poder continuar");
    } else {
      setErrorPregunta(null);
    }

    if (ubicacionDeValores && pregunta1 !== null && referencias) {
      dispatch({
        type: ACTIONS_REDUX.ACTUALIZAR,
        indice: "datosReporteRobo",
        indiceExtra: "ubicacionRobo",
        valor: {
          direccion: ubicacionDeValores,
          lat: coordenadasTemp.lat,
          lng: coordenadasTemp.lng
        },
      });

      dispatch({
        type: ACTIONS_REDUX.ACTUALIZAR,
        indice: "datosReporteRobo",
        indiceExtra: "referenciasUbicacionRobo",
        valor: referencias,
      });
      dispatch({
        type: ACTIONS_REDUX.ACTUALIZAR,
        indice: "datosReporteRobo",
        indiceExtra: "atencionLugarRobo",
        valor: pregunta1,
      });
      setCoordenadasTemp({lat: null, lng: null});
      if (pregunta1) {
        // Si desea atención en el lugar del robo
        dispatch({
          type: ACTIONS_REDUX.ACTUALIZAR,
          indice: "datosReporteRobo",
          indiceExtra: "ubicacionAtencionRobo",
          valor: {
            direccion: ubicacionDeValores,
            lat: coordenadasTemp.lat,
            lng: coordenadasTemp.lng
          }
        });
        history.push("/resumen-reportes");
      } else {
        asignarValorPantalla("nuevaUbicacionAtencion");
      }
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
        setCoordenadasTemp(coordenadas);
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
    setCoordenadasTemp({lat: coordenadas.lat(), lng: coordenadas.lng()})
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
        indice: "coordenadasIniciales",
      });
      asignarValorPantalla("");
    }
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

  const alCambiarReferencias = (texto) => {
    if (texto) {
      valores.referencias = texto;
      asignarValorPantalla("");
    }
  };

  const cambiarPantalla = (pantallaACambiar) => {
    asignarValorPantalla(pantallaACambiar);
  };

  const alDarClickEnFijarUbicacion = () => {
    cambiarPantalla("mapa");
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
        funcionRegresar={() => {
          history.goBack();
        }}
        alertaAmarilla={estadoApp && estadoApp.semaforoAmarillo}
      />
      {!editar && <SeparadorLinea />}
      <Pantalla style={{ paddingTop: "3rem" }}>
        {!editar && (
          <BarraProgresoReporte
            titulo={diccionario.tituloBarraProgreso}
            progreso={barraProgreso}
            numeroElementos={noElementos}
          />
        )}
        <TituloPrincipalIzquierda>
          {diccionario.titulo}
        </TituloPrincipalIzquierda>
        <CuerpoUbicacionMapa>
          <ContenedorCampoTextoUbicacionMapa>
            <CampoTexto
              etiqueta={diccionario.etiquetaCampoTexto}
              valor={valores.ubicacion}
              enCambio={alCambiarUbicacion}
              foco={focoUbicacion}
              editable={false}
              enClick={() => {
                cambiarPantalla("direccion");
              }}
              id="campoUbicacionActual"
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
              alDarClickEnFijarUbicacion={alDarClickEnFijarUbicacion}
              coordenadasIniciales={coordenadasIniciales}
              accionDeLocalizacionDesactivada={abrirLocalizacionDesactivada}
              gpsActivadoDeProp={gpsActivado}
              sePuedeMoverMapa={false}
              sePuedeMoverMarcador={false}
            />
          </ContenedorGoogleMap>
          <ContenedorCampoTextoUbicacionMapa>
            <CampoTexto
              etiqueta={diccionario.etiquetaCampoTextoReferencias}
              valor={valores.referencias}
              foco={focoReferencias}
              esAreaDeTexto
              marcador="Por ejemplo: frente a una casa roja..."
              editable={false}
              enClick={() => {
                cambiarPantalla("referencias");
              }}
              id="campoReferencias"
            />
          </ContenedorCampoTextoUbicacionMapa>
          {errorReferencias && (
            <MensajeError id="errorReferencias" style={{ marginTop: "40px" }}>
              {errorReferencias}
            </MensajeError>
          )}
          <CuerpoCuestionarioReporte style={{ marginTop: "30px" }}>
            <SeleccionCuestionario
              pregunta="¿Deseas ser atendido en el mismo lugar del robo?"
              respuesta={pregunta1}
              cambiarEstado={setPregunta1}
            />

            {errorPregunta && (
              <MensajeError id="errorPregunta" style={{ marginTop: "40px" }}>
                {errorPregunta}
              </MensajeError>
            )}
          </CuerpoCuestionarioReporte>
        </CuerpoUbicacionMapa>
        <Boton
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
        />
        <SeparadorEspacio />
        <Boton
          etiqueta="Contacto HDI"
          enClick={() => {
            history.push({
              pathname: "/asistencia-hdi",
              state: {
                tipoAtencion: "robo"
              },
            });
          }}
          tema="simple"
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
  } else if (pantalla === "referencias") {
    pantallaAMostrar = (
      <PantallaReferencias
        alAceptar={alCambiarReferencias}
        alRegresar={() => {
          cambiarPantalla("");
        }}
      />
    );
  } else if (pantalla === "mapa") {
    pantallaAMostrar = (
      <PantallaUbicacionMapa
        accionDeLocalizacionDesactivada={abrirLocalizacionDesactivada}
        alAceptar={alCambiarDireccionMapaCompleto}
        alRegresar={() => {
          cambiarPantalla("");
        }}
        coordenadas={coordenadasIniciales}
      />
    );
  } else if (pantalla === "nuevaUbicacionAtencion") {
    pantallaAMostrar = (
      <PantallaNuevaZonaAtencion alRegresar={() => cambiarPantalla("")} />
    );
  }

  return pantallaAMostrar;
};

export default PantallaUbicacionRobo;

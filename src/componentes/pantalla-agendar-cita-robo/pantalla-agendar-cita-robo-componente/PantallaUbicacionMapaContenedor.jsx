import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
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
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import Mapa from "./Mapa";
import PantallaDireccion from "./PantallaUbicacionMapaDireccion";
import PantallaReferencias from "./PantallaUbicacionMapaReferencias";
import PantallaMapa from "./PantallaUbicacionMapa";
import { Alerta } from "../../alerta";
import Constantes from "../../../recursos/constantes";
import { SeparadorEspacio } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import MapaRuta from "../../pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/MapaRuta";

const valores = {
  ubicacion: "",
  referencias: "",
};

const valoresDestino = {
  esDestino: false,
  ubicacion: "",
  referencias: "",
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaUbicacionMapaContenedor = () => {
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);

  const location = useLocation();
  const editar =
    location && location.state && location.state.editar
      ? location.state.editar
      : false;

  let barraProgreso;
  let noElementos;

  let paginaAnterior = null;
  if (editar) {
    paginaAnterior = editar ? "resumen-reporte" : "/informacion-complementaria";
  } else if (estadoApp.seatedClaim === "tow") {
    paginaAnterior = "/subir-fotos-grua";
  } else {
    paginaAnterior = "/informacion-complementaria";
  }

  const paginaPosterior = editar ? "resumen-reporte" : "/resumen-reporte";
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

  const diccionarioChoque = {
    tituloBarraProgreso: "Ubicación actual",
    encabezado: editar ? "Editar" : "Generando Reporte",
    titulo: "¿En dónde te encuentras?",
    etiquetaCampoTexto: "Selecciona la ubicación del siniestro",
    marcadorCampoTexto: "",
    etiquetaCampoTextoDestino: "Ubicación de destino",
    marcadorCampoTextoDestino: "",
    etiquetaCampoTextoReferencias: "Referencias",
    marcadorCampoTextoReferencias: "Por ejemplo: frente a una casa roja ...",
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

  const diccionarioGrua = {
    tituloBarraProgreso: "Ubicación del reporte",
    encabezado: editar ? "Editar" : "Asistencia de grúa",
    titulo: "Confirma la ubicación del reporte",
    etiquetaCampoTexto: "Ubicación actual",
    marcadorCampoTexto: "Selecciona tu ubicación",
    etiquetaCampoTextoDestino: "Ubicación de destino",
    marcadorCampoTextoDestino:
      "Especifica la ubicación de donde llevará la grúa tu vehículo",
    etiquetaCampoTextoReferencias: "Referencias",
    marcadorCampoTextoReferencias:
      "Por ejemplo: frente a una casa roja o a lado de un restaurante.",
    etiquetaBoton: editar ? "Guardar cambios" : "Siguiente",
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

  let diccionario = {};

  if (estadoApp && estadoApp.seatedClaim === "crash") {
    diccionario = diccionarioChoque;
  } else if (estadoApp && estadoApp.seatedClaim === "tow") {
    diccionario = diccionarioGrua;
  } else {
    diccionario = diccionarioChoque;
  }

  const [pantalla, asignarValorPantalla] = useState("");
  const [ubicacion, asignarValorUbicacion] = useState("");
  const [focoUbicacion, asignarValorFocoUbicacion] = useState("");
  const [focoUbicacionDestino, asignarValorFocoUbicacionDestino] = useState("");
  const [focoReferencias, asignarValorFocoReferencias] = useState("");
  const [errorUbicacion, asignarValorErrorUbicacion] = useState("");
  const [errorReferencias, asignarValorErrorReferencias] = useState("");
  const [errorUbicacionDestino, asignarValorErrorUbicacionDestino] =
    useState("");
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
  const valorAnteriorParaUbicacionRef = useRef();

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      asignarEsAndroid(true);
    }
    valorAnteriorParaUbicacionRef.current = ubicacion;
  });

  const valorAnteriorParaUbicacion = valorAnteriorParaUbicacionRef.current;

  const validacionRespuestas = () => {
    const { ubicacion: ubicacionDeValores, referencias } = valores;
    const { ubicacion: ubicacionDestino } = valoresDestino;

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

    if (estadoApp.seatedClaim === "tow") {
      if (!ubicacionDeValores) {
        asignarValorFocoUbicacionDestino("error");
        asignarValorErrorUbicacionDestino(diccionario.errores.campoRequerido);
      } else {
        asignarValorFocoUbicacionDestino("");
        asignarValorErrorUbicacionDestino("");
      }
    }

    if (ubicacionDeValores && referencias) {
      dispatch({
        type: "AGREGAR",
        valor: ubicacionDeValores,
        indice: "ubicacion",
      });
      dispatch({
        type: "AGREGAR",
        valor: ubicacionDestino,
        indice: "ubicacionDestino",
      });
      dispatch({
        type: "AGREGAR",
        valor: referencias,
        indice: "referencias",
      });
      dispatch({
        type: "AGREGAR",
        valor: coordenadasIniciales,
        indice: "coordenadasIniciales",
      });
      history.push(paginaPosterior);
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

      if (estadoApp.seatedClaim === "tow" && valoresDestino.esDestino) {
        valoresDestino.ubicacion = valor;
      } else {
        valores.ubicacion = valor;
      }
    }
  };

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

      if (estadoApp.seatedClaim === "tow" && valoresDestino.esDestino) {
        valoresDestino.ubicacion = direccion;

        dispatch({
          type: "AGREGAR",
          valor: {
            lat: coordenadas.lat(),
            lng: coordenadas.lng(),
          },
          indice: "coordenadasInicialesDestino",
        });
      } else {
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
      }
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
          history.push(paginaAnterior);
        }}
        alertaAmarilla={estadoApp && estadoApp.semaforoAmarillo}
      />
      {!editar && <SeparadorEncabezadoUbicacionMapa />}
      <Pantalla>
        {!editar && (
          <BarraProgresoReporte
            grua={estadoApp.seatedClaim === "tow"}
            titulo={diccionario.tituloBarraProgreso}
            progreso={estadoApp.seatedClaim === "tow" ? 4 : barraProgreso}
            numeroElementos={estadoApp.seatedClaim === "tow" ? 5 : noElementos}
          />
        )}
        <TituloUbicacionMapa>{diccionario.titulo}</TituloUbicacionMapa>
        <CuerpoUbicacionMapa>
          <ContenedorCampoTextoUbicacionMapa>
            <CampoTexto
              etiqueta={diccionario.etiquetaCampoTexto}
              valor={valores.ubicacion}
              marcador={diccionario.marcadorCampoTexto}
              enCambio={alCambiarUbicacion}
              foco={focoUbicacion}
              editable={false}
              enClick={() => {
                valoresDestino.esDestino = false;
                cambiarPantalla("direccion");
              }}
              id="campoUbicacionActual"
            />
          </ContenedorCampoTextoUbicacionMapa>
          {errorUbicacion && <MensajeError>{errorUbicacion}</MensajeError>}
          {estadoApp.seatedClaim === "tow" && (
            <>
              <ContenedorCampoTextoUbicacionMapaDestino>
                <CampoTexto
                  etiqueta={diccionario.etiquetaCampoTextoDestino}
                  valor={valoresDestino.ubicacion}
                  marcador={diccionario.marcadorCampoTextoDestino}
                  enCambio={alCambiarUbicacion}
                  foco={focoUbicacionDestino}
                  editable={false}
                  enClick={() => {
                    valoresDestino.esDestino = true;
                    cambiarPantalla("direccion");
                  }}
                  id="campoUbicacionDestino"
                />
              </ContenedorCampoTextoUbicacionMapaDestino>
              {errorUbicacionDestino && (
                <MensajeError>{errorUbicacionDestino}</MensajeError>
              )}
            </>
          )}
          <ContenedorGoogleMap>
            {estadoApp.seatedClaim === "crash" && (
              <Mapa
                alCambiarPosicionDeMarcador={alCambiarPosicionDeMarcador}
                alDarClickEnFijarUbicacion={alDarClickEnFijarUbicacion}
                coordenadasIniciales={coordenadasIniciales}
                accionDeLocalizacionDesactivada={abrirLocalizacionDesactivada}
                gpsActivadoDeProp={gpsActivado}
                sePuedeMoverMapa={false}
                sePuedeMoverMarcador={false}
              />
            )}
            {estadoApp.seatedClaim === "tow" && (
              <MapaRuta
                coordenadasIniciales={coordenadasIniciales}
                alDarClickEnFijarUbicacion={alDarClickEnFijarUbicacion}
              />
            )}
          </ContenedorGoogleMap>
          <ContenedorCampoTextoUbicacionMapa>
            <CampoTexto
              etiqueta={diccionario.etiquetaCampoTextoReferencias}
              marcador={diccionario.marcadorCampoTextoReferencias}
              valor={valores.referencias}
              foco={focoReferencias}
              esAreaDeTexto
              editable={false}
              enClick={() => {
                cambiarPantalla("referencias");
              }}
              id="campoReferencias"
            />
          </ContenedorCampoTextoUbicacionMapa>
          <SeparadorEspacio />
          {errorReferencias && (
            <MensajeError id="errorReferencias">
              {errorReferencias}
            </MensajeError>
          )}
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
      <PantallaDireccion
        alCambiarDireccion={alCambiarDireccion}
        alRegresar={() => {
          cambiarPantalla("");
        }}
        direccionPorDefecto={
          !valoresDestino.esDestino
            ? valores.ubicacion
            : valoresDestino.ubicacion
        }
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

export default PantallaUbicacionMapaContenedor;

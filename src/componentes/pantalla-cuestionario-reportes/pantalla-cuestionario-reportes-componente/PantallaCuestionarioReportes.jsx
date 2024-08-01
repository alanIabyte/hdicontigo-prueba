/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  RECORD_STATUS,
  useAudioRecorder,
} from "@sarafhbk/react-audio-recorder";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import Boton from "../../boton/boton-componente/Boton";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import { Subtitulo3Negritas } from "../../componentes-styled-compartidos/Textos";
import EncabezadoContenedor from "../../encabezado";
import {
  Separador,
  SeparadorLinea,
} from "../../pantalla-cuenta/pantalla-cuenta-componente/PantallaCuenta.styled";
import { TituloCuestionarioReporte } from "../../pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import { PantallaFondoGris } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import { MensajePequeno } from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { ContenedorPreguntas } from "./PantallaCuestionarioComponentes.styled";
import IconoGrabacion from "../../../recursos/iconos/RT/grabacion.svg";
import IconoStop from "../../../recursos/iconos/RT/stop.svg";
import IconoStopDisabled from "../../../recursos/iconos/RT/stop-disabled.svg";
import IconoBasura from "../../../recursos/iconos/RT/basura-azul.svg";
import IconoCheck from "../../../recursos/iconos/RT/Check.svg";

import "./styles.scss";
import IndicadorCarga from "../../indicador-carga";
import { Alerta } from "../../alerta";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS_REDUX from "../../../reductores/Actions";
import useActionsAudio from "../../../utils/useActionsAudio";
import { configFuncionalidadRobo } from "../../../pantallas/pantallas-robo/utils";

const ContenedorNumeroPregunta = (props) => (
  <div className={`semi-circulo-2 color-${props.numero}`}>
    <p>{props.numero}</p>
  </div>
);

const preguntas = [
  {
    id: 1,
    pregunta: "¿Cuándo y a qué hora ocurrió?",
  },
  {
    id: 2,
    pregunta: "¿En dónde ocurrió?",
  },
  {
    id: 3,
    pregunta: "¿Había otros vehículos o terceras personas?",
  },
  {
    id: 4,
    pregunta: "¿Quién fue la última persona en conducir el vehículo?",
  },
  {
    id: 5,
    pregunta: "¿Cómo ocurrió?",
  },
];

let maximaGrabacion = null;
const minutosMin = 1;
const minutosMax = 2;

export const PantallaCuestionarioReportes = () => {
  const history = useHistory();
  const [cargando, asignarValorCargando] = useState(false);

  let sinLimites = false;
  const location = useLocation();

  if (
    location &&
    location.search &&
    location.search.includes("sinLimites")
  ) {
    sinLimites = true;
  }

  const {
    audioResult,
    timer,
    startRecording,
    stopRecording,
    status,
    errorMessage,
  } = useAudioRecorder();

  const dispatch = useDispatch();
  const estadoApp = useSelector((state) => state);
  const { descargarUrlBlob } = useActionsAudio();

  const [continuar, setContinuar] = useState(true);
  const [hayAudio, setHayAudio] = useState(false);
  const [audioGuardado, setAudioGuardado] = useState(false);
  const [puedeParar, setPuedeParar] = useState(false);
  const [audioBlob, setAudioBlob] = useState("");
  const [tiempoGrabado, setTiempoGrabado] = useState("00:00:00");

  const [mostrarAlertaEliminarAudio, setMostrarAlertaEliminarAudio] = useState(false);

  const accionesGrabacion = () => {
      // Cuando el usuario da click al microfono decidimos:
      // Si YA ESTA GRABANDO, quiere decir que debe parar la grabación
      if (status === RECORD_STATUS.RECORDING && puedeParar) {
        setHayAudio(true);
        setTiempoGrabado(new Date(timer * 1000).toISOString().substr(11, 8));
        stopRecording();
        clearTimeout(maximaGrabacion);
        return;
      }
  
      // Pero si el estatus esta inactivo (no graba), iniciamos la grabación
      startRecording();
      setAudioBlob("");
      if (!sinLimites) {
        // !Al iniciarse la grabación se va asignar el estatus en false hasta que
        // !a los 4 min se active para que pueda parar
        setPuedeParar(false);
      } else {
        setPuedeParar(true);
      }
  };

  const redirigir = () => {
    // Guardar en redux el tiempo de la grabación
    let action = ACTIONS_REDUX.AGREGAR;
    if (estadoApp.datosReporteRobo) {
      action = ACTIONS_REDUX.ACTUALIZAR;
    }
    dispatch({
      type: action,
      indice: "datosReporteRobo",
      indiceExtra: "tiempoGrabacion",
      valor: tiempoGrabado,
    });
    history.push("/robo/info-complementaria");
  };

  const guardarAudioLocalStorage = async (blob) => {
    //clearAudioTable();

    const reader = new FileReader();
    reader.onload = function(event) {
      const audioData = event.target.result;
      localStorage.setItem(configFuncionalidadRobo.descripcionRobo.NOMBREAUDIOLS, audioData);
    };
    reader.readAsDataURL(blob);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: mimeString });
  };

  const alAceptarGrabacion = async () => {
    // TODO: Guardar el blob en algun sitio
    if (audioResult) {
      const response = await fetch(audioResult);
      const blobResult = await response.blob();
      guardarAudioLocalStorage(blobResult);
      setContinuar(false);
    }
  };

  const eliminarGrabacion = () => {
    localStorage.removeItem(configFuncionalidadRobo.descripcionRobo.NOMBREAUDIOLS);
    // !Deshabilitar el botón de Continuar
    setHayAudio(false);
    setAudioBlob("");
    setAudioGuardado(false);
    setContinuar(true);
    setMostrarAlertaEliminarAudio(false);
  };

  useEffect(() => {
    setAudioBlob(audioResult);
  }, [audioResult]);

  useEffect(() => {
    // Cuando el status cambie, evaluamos si se esta grabando
    // Si esta grabando colocamos un timeOut para parar la grabación al llegar a 5 min
    if (status === RECORD_STATUS.RECORDING) {
      if (!sinLimites) {
        console.log("con limitaciones");
        
        // !Timeout para asignar el tiempo máximo de grabación
        const tiempoEsperaMaximo = minutosMax * 60 * 1000; // 10 min en milisegundos
        maximaGrabacion = setTimeout(() => {
          setTiempoGrabado(new Date(timer * 1000).toISOString().substr(11, 8));
          stopRecording();
          setHayAudio(true);
          clearTimeout(maximaGrabacion);
        }, tiempoEsperaMaximo);
        
        // !Timeout para asignar un tiempo minimo para que pueda parar la grabación
        const tiempoEspera = minutosMin * 60 * 1000; // 4 minutos en milisegundos
        setTimeout(() => {
          // !Si el usuario para la grabación luego de 4 min
          // !Se habilita el stop
          setPuedeParar(true);
        }, tiempoEspera);
      } else {
        console.log("No habrá limitaciones");
      }
    }
  }, [status]);

  // !Al cargar el componente validamos si hay un audio guardado
  // para mostrarlo
  useEffect(() => {
    const audioData = localStorage.getItem(configFuncionalidadRobo.descripcionRobo.NOMBREAUDIOLS);
    if (audioData) {
      console.log("entra");
      const blob = dataURItoBlob(audioData);
      const blobUrl = URL.createObjectURL(blob);
      console.log(blobUrl);
      setAudioBlob(blobUrl);
      setHayAudio(true);
      setContinuar(false);
    } else {
      console.log("No hay audio guardado");
    }
  }, []);
  return (
    <EnvolvedorPantalla>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        textoEncabezado={"Eliminar audio"}
        textoCuerpo={"Estas apunto de eliminar el audio que grabaste. ¿Deseas continuar?"}
        etiquetaBoton={"Eliminar"}
        temaBoton={"rojo"}
        funcionLlamadaBoton={eliminarGrabacion}
        mostrarModal={mostrarAlertaEliminarAudio}
        manejarCierre={() => {
          setMostrarAlertaEliminarAudio(false);
        }}
      />
      <EncabezadoContenedor
        titulo="Reportar robo total"
        funcionRegresar={history.goBack}
      />
      <PantallaFondoGris style={{ paddingTop: "3rem", height: "calc(100vh - 136px)", overflowX: "hidden", overflowY: "auto" }}>
        <BarraProgresoReporte titulo="Descripción del robo" progreso={1} />
        <SeparadorLinea />
        <TituloCuestionarioReporte style={{ marginTop: "0" }}>
          Cuéntanos qué pasó
        </TituloCuestionarioReporte>
        <MensajePequeno style={{ height: "17px" }}>
          Graba un audio con lo que ocurrió apoyándote de las siguientes
          preguntas
        </MensajePequeno>
        <ContenedorPreguntas numeroPreguntas={preguntas.length}>
          {preguntas.map((pregunta, key) => (
            <div style={{ display: "flex" }} key={key}>
              <ContenedorNumeroPregunta numero={pregunta.id} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                {pregunta.pregunta}
              </MensajePequeno>
            </div>
          ))}
        </ContenedorPreguntas>

        <SeparadorLinea />
        <Subtitulo3Negritas>Descripción de los hechos</Subtitulo3Negritas>

        <Separador />

        <div
          className="contenedor-flex"
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!hayAudio && (
            <>
              <img
                src={ status === RECORD_STATUS.RECORDING ? (puedeParar ? IconoStop : IconoStopDisabled) : IconoGrabacion }
                alt=""
                className="elemento-click"
                onClick={accionesGrabacion}
                width={50}
              />
              <p>{new Date(timer * 1000).toISOString().substr(11, 8)} / 00:0{minutosMax}:00</p>
            </>
          )}

          {errorMessage && <MensajePequeno>{errorMessage}</MensajePequeno>}

          {hayAudio && status !== RECORD_STATUS.RECORDING && (
            <div
              className="contenedor-flex"
              style={{ alignItems: "center", gap: "10px" }}
            >
              <img
                src={IconoBasura}
                onClick={() => {
                  setMostrarAlertaEliminarAudio(true);
                }}
                width={50}
                className="elemento-click"
                alt=""
                style={{ marginBottom: "15px" }}
              />
              <audio controls src={audioBlob} style={{ marginBottom: "15px" }} />
              {!audioGuardado &&
                <img
                  src={IconoCheck}
                  onClick={alAceptarGrabacion}
                  width={50}
                  className="elemento-click"
                  alt=""
                  style={{ marginBottom: "15px" }}
                />
              }
            </div>
          )}
        </div>

        <>
          <ContenedorBoton>
            <Boton
              tema="estandar"
              etiqueta="Continuar"
              deshabilitado={continuar}
              enClick={redirigir}
            />
          </ContenedorBoton>
          <Boton
            tema="simple"
            etiqueta="Contacto HDI"
            enClick={() => {
              history.push({
                pathname: "/asistencia-hdi",
                state: {
                  tipoAtencion: "robo"
                },
              });
            }}/>
        </>
      </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { useSubscription, useLazyQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { loader } from "graphql.macro";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import IconoReproducir from "@material-ui/icons/PlayCircleFilledRounded";
import IconoPausar from "@material-ui/icons/PauseCircleFilledRounded";
import IconoSaltarAnterior from "@material-ui/icons/SkipPreviousRounded";
import IconoSaltarSiguiente from "@material-ui/icons/SkipNextRounded";
import {
  ContenedorBotones,
  ContenedorIcono,
  ContenedorNumero,
  ContenedorRecomendacion,
  ContenedorTitulo,
  MarcaProgreso,
  RecomendacionContenido,
  SeparadorEspacio,
  TextoNumero,
  Titulo,
} from "./PantallaRecomendaciones.styled";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import { Alerta } from "../../alerta";
import IndicadorCarga from "../../indicador-carga";

const SUSCRIPCION_AJUSTADOR = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);
const OBTENER_AUDIOS_RECOMENDACIONES = loader(
  "../../../graphQL/query/s3/obtener_audios_recomendaciones.graphql"
);

const dict = {
  titulo: "Recomendaciones HDI",
  alertaTitulo: "Tu ajustador ha llegado",
  alertaCuerpo:
    // eslint-disable-next-line max-len
    "<p>A partir de este momento podrás dar seguimiento al estatus de tu siniestro.</p>",
  alertaBoton: "Continuar",
  recomendaciones: [
    {
      numero: 1,
      contenido: "¿Hay lesionados? Llama al 911 para reportalo.",
    },
    {
      numero: 2,
      contenido: "Mantén la calma. Evita discutir con los involucrados.",
    },
    {
      numero: 3,
      contenido:
        "No negocies ningún acuerdo con los afectados, espera a tu ajustador.",
    },
    {
      numero: 4,
      contenido:
        "Colabora con la autoridad. <b>no aceptes</b> responsabilidades ni firmes ningún documento.",
    },
    {
      numero: 5,
      contenido:
        "No te muevas del lugar del accidente a menos que exista algún riesgo o la autoridad te lo pida.",
    },
    {
      numero: 6,
      contenido:
        "De ser posible toma fotos de la posición final de los vehículos.",
    },
    {
      numero: 7,
      contenido:
        // eslint-disable-next-line max-len
        "Tu seguridad y la de tus acompañantes es primordial, mantente en un área segura fuera del tráfico vehicular.",
    },
  ],
};

let audioIndice = 0;
let duracion = 0;

const PantallaRecomendaciones = () => {
  const estadoApp = useSelector((estado) => estado);
  const history = useHistory();
  const location = useLocation();

  let numeroReporte;
  if (estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte) {
    numeroReporte = estadoApp.datosReporte.numeroReporte;
  } else if (
    location &&
    location.search &&
    location.search.includes("numeroReporte")
  ) {
    const params = new URLSearchParams(location.search);
    numeroReporte = params.get("numeroReporte");
  } else {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }

  const { data: dataReporte } = useSubscription(SUSCRIPCION_AJUSTADOR, {
    variables: { numeroReporte },
  });

  const [obtenerAudioRecomendaciones, { loading, data: dataRecomendaciones }] =
    useLazyQuery(OBTENER_AUDIOS_RECOMENDACIONES, {
      fetchPolicy: "cache-and-network",
    });

  const [recomendaciones, asignarValorRecomendaciones] = useState([]);
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [reproduciendo, asignarReproduciendo] = useState(false);
  const [audioProgreso, asignarAudioProgreso] = useState(0);
  const [cerrando, asignarValorCerrando] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);

  const intervaloReferencia = useRef();
  const audioReferencia = useRef(recomendaciones[audioIndice]);

  const iniciaTiempo = () => {
    if (audioReferencia && audioReferencia.current) {
      clearInterval(audioReferencia.current);
      intervaloReferencia.current = setInterval(() => {
        if (audioReferencia.current.ended) {
          // eslint-disable-next-line no-use-before-define
          siguienteAudio();
        } else {
          asignarAudioProgreso(audioReferencia.current.currentTime);
        }
      }, [1000]);
      duracion = audioReferencia.current.duration;
    }
  };

  const cambioIndice = (valor) => {
    audioIndice = valor;
    if (audioReferencia && audioReferencia.current) {
      audioReferencia.current.pause();
      audioReferencia.current = recomendaciones[audioIndice];
      asignarAudioProgreso(audioReferencia.current.currentTime);
      audioReferencia.current.currentTime = 0;
      audioReferencia.current.play();
      asignarReproduciendo(true);
      iniciaTiempo();
    }
  };

  const Recomendacion = ({ numero, contenido }) => {
    const despliegaTextoCuerpo = () => ({ __html: contenido });
    const progreso = Math.round((audioProgreso * 100) / duracion);
    return (
      <div>
        <ContenedorRecomendacion
          focus={numero === audioIndice}
          onClick={() => {
            cambioIndice(numero);
          }}
        >
          <MarcaProgreso focus={numero === audioIndice} progreso={progreso} />
          <ContenedorNumero focus={numero === audioIndice}>
            <TextoNumero id={`recNum_${numero}`} focus={numero === audioIndice}>
              {numero}
            </TextoNumero>
          </ContenedorNumero>
          <RecomendacionContenido
            id={`recTexto_${numero}`}
            dangerouslySetInnerHTML={despliegaTextoCuerpo()}
            focus={numero === audioIndice}
          />
        </ContenedorRecomendacion>
        <SeparadorEspacio />
      </div>
    );
  };

  Recomendacion.defaultProps = {
    numero: "",
    contenido: "",
  };

  Recomendacion.propTypes = {
    numero: PropTypes.number,
    contenido: PropTypes.string,
  };

  const siguienteAudio = () => {
    if (audioIndice < recomendaciones.length - 1) {
      cambioIndice(audioIndice + 1);
    } else {
      cambioIndice(0);
      asignarReproduciendo(false);
      asignarAudioProgreso(0);
      if (audioReferencia && audioReferencia.current) {
        audioReferencia.current.pause();
        audioReferencia.current.currentTime = 0;
        audioIndice = 0;
      }
    }
  };

  const anteriorAudio = () => {
    if (audioIndice - 1 < 0) {
      cambioIndice(recomendaciones.length - 1);
    } else {
      cambioIndice(audioIndice - 1);
    }
  };

  const cerrarRecomendaciones = () => {
    asignarReproduciendo(false);
    asignarAudioProgreso(0);
    if (audioReferencia && audioReferencia.current) {
      audioReferencia.current.pause();
      audioReferencia.current.currentTime = 0;
      audioIndice = 0;
    }
    asignarValorCerrando(true);
  };

  useEffect(() => {
    obtenerAudioRecomendaciones();
  }, []);

  useEffect(() => {
    if (cerrando && !reproduciendo) {
      history.push({
        pathname: "/menu-espera",
        search: `?numeroReporte=${numeroReporte}`,
      });
    }
  }, [cerrando, reproduciendo]);

  useEffect(() => {
    if (
      dataReporte &&
      dataReporte.escucha_evento_actualizacion_reporte &&
      dataReporte.escucha_evento_actualizacion_reporte.tipoMensaje &&
      dataReporte.escucha_evento_actualizacion_reporte.tipoMensaje === 1
    ) {
      asignarValorMostrarModal(true);
    }
  }, [dataReporte]);

  useEffect(() => {
    if (
      !loading &&
      dataRecomendaciones &&
      dataRecomendaciones.obtener_audios_recomendaciones
    ) {
      asignarValorRecomendaciones(
        dataRecomendaciones.obtener_audios_recomendaciones.dato.map(
          (recomendacion) => new Audio(recomendacion.url)
        )
      );
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [loading, dataRecomendaciones]);

  useEffect(() => {
    audioReferencia.current = recomendaciones[audioIndice];
  }, [recomendaciones]);

  useLayoutEffect(() => {
    if (audioReferencia && audioReferencia.current) {
      if (reproduciendo) {
        audioReferencia.current.play();
        iniciaTiempo();
      } else {
        audioReferencia.current.pause();
      }
    }
  }, [reproduciendo]);

  return (
    <Pantalla>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        colorAlerta="azul"
        tipoIcono="palomita"
        textoEncabezado={dict.alertaTitulo}
        textoCuerpo={dict.alertaCuerpo}
        mostrarModal={mostrarModal}
        etiquetaBoton={dict.alertaBoton}
        funcionLlamadaBoton={() => {
          history.push({
            pathname: "/pasos-progreso",
            search: `?numeroReporte=${numeroReporte}`,
          });
        }}
        mostrarCierre={false}
      />
      <ContenedorTitulo>
        <Titulo id="titulo">{dict.titulo}</Titulo>
        <ContenedorIcono id="botonCerrar" onClick={cerrarRecomendaciones}>
          <IconoCerrar />
        </ContenedorIcono>
      </ContenedorTitulo>
      {dict.recomendaciones.map((recomendacion) => (
        <Recomendacion
          key={recomendacion.numero}
          numero={recomendacion.numero}
          contenido={recomendacion.contenido}
        />
      ))}
      <ContenedorBotones>
        <IconoSaltarAnterior style={{ fontSize: 32 }} onClick={anteriorAudio} />
        {!reproduciendo ? (
          <IconoReproducir
            style={{ fontSize: 46 }}
            onClick={() => {
              asignarReproduciendo(true);
            }}
          />
        ) : (
          <IconoPausar
            style={{ fontSize: 46 }}
            onClick={() => {
              asignarReproduciendo(false);
            }}
          />
        )}
        <IconoSaltarSiguiente
          style={{ fontSize: 32 }}
          onClick={siguienteAudio}
        />
      </ContenedorBotones>
    </Pantalla>
  );
};

export default PantallaRecomendaciones;

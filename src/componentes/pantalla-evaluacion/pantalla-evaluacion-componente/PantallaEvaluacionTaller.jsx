import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import IconoPunto from "@material-ui/icons/FiberManualRecordRounded";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { loader } from "graphql.macro";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import {
  EncabezadoEvaluacion,
  ImagenEncabezado,
  TituloEvaluacion,
  EnvolvedorNumeroPreguntas,
  ContenedorIconoPunto,
  CuerpoEvaluacion,
  ContenedorExtrasEvaluacion,
  ContenedorPantallaEvaluacion,
} from "./PantallaEvaluacion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import Evaluacion from "../../evaluacion";
import EvaluacionModal from "../../evaluacion-modal";
import Comentarios from "./PantallaEvaluacionComentarios";
import Boton from "../../boton";
import ControladorDeslizador from "./PantallaEvaluacionDeslizador";
import IndicadorCarga from "../../indicador-carga";
import Configuraciones from "../../../servicios/encuestas";
import { Alerta } from "../../alerta";
import Constantes from "../../../recursos/constantes";
import avatarTaller from "../../../recursos/imagenes/avatar-taller.png";
import { TituloMisPolizas } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";

const valores = {
  comentarios: "",
  respuestaComentario: {},
  respuestaEstrellas: [],
  respuestaCalificacion: [],
};

const nombreCookie = Constantes.nombreDeCookie;

const VALIDAR_ENCUESTA = loader(
  "../../../graphQL/query/encuesta/validar_encuesta.graphql"
);

const OBTENER_ENCUESTA = loader(
  "../../../graphQL/query/encuesta/obtener_encuesta.graphql"
);
const ENVIAR_ENCUESTA = loader(
  "../../../graphQL/mutation/encuesta/enviar_encuesta.graphql"
);
const EVENTOS_PASADOS = loader(
  "../../../graphQL/query/reporte/listado_actualizaciones_reporte.graphql"
);

const SKIP_SURVEY = loader(
  "../../../graphQL/mutation/encuesta/encuesta_guardarEstatusEncuesta.graphql"
);

const PantallaEvaluacionTaller = () => {
  const history = useHistory();
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  // const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  let nombreCompleto = "";
  let numeroReporte;
  // const numeroSiniestro = estadoApp.numeroSiniestroReporte || "";

  if (
    location &&
    location.search &&
    location.search.includes("numeroReporte")
  ) {
    const params = new URLSearchParams(location.search);
    numeroReporte = params.get("numeroReporte");
  } else if (estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte) {
    numeroReporte = estadoApp.datosReporte.numeroReporte;
  } else {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }
  const imagenEncabezado = avatarTaller;
  const nombreTallerDefault = "tu taller";
  let nombreTallerEstado;
  if (estadoApp.datosTaller && estadoApp.datosTaller.data) {
    nombreTallerEstado = obtenerValorDeArregloDeStrings(
      estadoApp.datosTaller.data,
      "NombreTaller: "
    );
  }
  if (estadoApp.nombreConductor) {
    nombreCompleto = estadoApp.nombreConductor;
  } else if (
    estadoApp.datosPoliza &&
    estadoApp.datosPoliza.nombreCompletoAsegurado
  ) {
    nombreCompleto = estadoApp.datosPoliza.nombreCompletoAsegurado;
  } else if (objetoCookie && objetoCookie.nombreReporta) {
    nombreCompleto = objetoCookie.nombreReporta;
  } else if (objetoCookie && objetoCookie.NombreAsegurado) {
    nombreCompleto = objetoCookie.NombreAsegurado;
  } else {
    nombreCompleto = "";
  }

  const [pantalla, asignarValorPantalla] = useState("");
  const [preguntasEstrellas, asignarValorPreguntasEstrellas] = useState([]);
  const [preguntaCalificacion, asignarValorPreguntaCalificacion] = useState([]);
  const [evaluaciones, asignarValorEvaluaciones] = useState([]);
  const [preguntaActual, asignarValorPreguntaActual] = useState(0);
  const [cargando, asignarValorCargando] = useState(false);
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [mostrarError, asignarValorMostrarError] = useState(false);
  const [valorModalEncuesta, asignarValorModalEncuesta] = useState(false);
  const [nombreTaller, asignarValorNombreTaller] = useState(
    nombreTallerEstado || nombreTallerDefault
  );

  const cambiarPantalla = (pantallaACambiar) => {
    asignarValorPantalla(pantallaACambiar);
  };

  const [
    validacionEncuesta,
    { data: validarEncuesta, loading: cargandoValidarEncuesta },
  ] = useLazyQuery(VALIDAR_ENCUESTA, { fetchPolicy: "no-cache" });

  const [
    obtenerEventosPasados,
    { data: eventosPasados, loading: esperaEventosPasados },
  ] = useLazyQuery(EVENTOS_PASADOS);

  const { data: encuestaData, loading: esperaEncuesta } = useQuery(
    OBTENER_ENCUESTA,
    {
      variables: { idEncuesta: Configuraciones.evaluacionTallerID },
    }
  );
  const [
    enviarEncuesta,
    {
      data: respuestaEncuesta,
      error: errorEnvioEncuesta,
      loading: esperaEnvio,
    },
  ] = useMutation(ENVIAR_ENCUESTA, { errorPolicy: "all" });

  const [
    skipSurvey,
    {
      data: dataSkipSurvey,
      loading: loadingSkipSurvey,
      error: errorSkipSurvey,
    },
  ] = useMutation(SKIP_SURVEY, { errorPolicy: "all" });

  const diccionario = {
    encabezadoTaller1: "El servicio de ",
    encabezadoTaller2: " ha finalizado.",
    principal: "Califica tu experiencia",
    titulo: "Indica tu nivel de satisfacción con:",
    cuerpo: "Todas las calificaciones son anónimas",
    textoComentario: "Agregar comentario",
    botonEnviar: "Enviar",
    modal: {
      titulo: "Ocurrió un problema",
      cuerpo: "La acción no pudo ser completada",
      boton: "Ok",
    },
  };

  useEffect(() => {
    if (
      cargandoValidarEncuesta ||
      esperaEventosPasados ||
      esperaEncuesta ||
      esperaEnvio
    ) {
      asignarValorCargando(true);
    } else if (
      !cargandoValidarEncuesta &&
      !esperaEventosPasados &&
      !esperaEncuesta &&
      !esperaEnvio
    ) {
      asignarValorCargando(false);
      asignarValorModalEncuesta(true);
    }
  }, [
    cargandoValidarEncuesta,
    esperaEventosPasados,
    esperaEncuesta,
    esperaEnvio,
  ]);

  useEffect(() => {
    if (location.state?.omitida) {
      return;
    }

    if (!location || !location.state || !location.state.evaluadoPreviamente) {
      validacionEncuesta({
        variables: {
          numeroReporte,
          idEncuesta: Configuraciones.evaluacionTallerID,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (
      !cargandoValidarEncuesta &&
      validarEncuesta &&
      validarEncuesta.validar_encuesta &&
      validarEncuesta.validar_encuesta.codigo === "IMENC100007"
    ) {
      history.push({
        pathname: "/pasos-progreso",
        search: `?numeroReporte=${numeroReporte}`,
      });
    }

    if (
      !cargandoValidarEncuesta &&
      validarEncuesta &&
      validarEncuesta.validar_encuesta &&
      validarEncuesta.validar_encuesta.codigo === "IDENC100010"
    ) {
      history.push({
        pathname: "/pasos-progreso",
        search: `?numeroReporte=${numeroReporte}`,
      });
    }
  }, [validarEncuesta, cargandoValidarEncuesta]);

  useEffect(() => {
    if (
      !esperaEnvio &&
      errorEnvioEncuesta &&
      errorEnvioEncuesta.graphQLErrors &&
      errorEnvioEncuesta.graphQLErrors[0] &&
      (errorEnvioEncuesta.graphQLErrors[0].errorType === "ExecutionTimeout" ||
        errorEnvioEncuesta.graphQLErrors[0].message === "Execution timed out.")
    ) {
      validacionEncuesta({
        variables: {
          numeroReporte,
          idEncuesta: Configuraciones.evaluacionAjustadorID,
        },
      });
    } else if (
      !esperaEnvio &&
      respuestaEncuesta &&
      respuestaEncuesta.enviar_encuesta &&
      (respuestaEncuesta.enviar_encuesta.codigo === "IMENC100001" ||
        respuestaEncuesta.enviar_encuesta.mensaje ===
          "La encuesta se encuentra omitida.")
    ) {
      history.push({
        pathname: "/pasos-progreso",
        search: `?numeroReporte=${numeroReporte}`,
      });
    } else if (
      !esperaEnvio &&
      respuestaEncuesta &&
      respuestaEncuesta.enviar_encuesta &&
      !respuestaEncuesta.enviar_encuesta.completado
    ) {
      asignarValorCargando(false);
      asignarValorMostrarModal(false);
      asignarValorModalEncuesta(false);
      asignarValorMostrarError(true);
    }
  }, [respuestaEncuesta, esperaEnvio]);

  useEffect(() => {
    if (nombreTaller === nombreTallerDefault) {
      obtenerEventosPasados({
        variables: { numeroReporte },
      });
    }
  }, []);

  useEffect(() => {
    if (eventosPasados?.listado_actualizaciones_reporte?.dato?.ajuste) {
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste.forEach(
        (evento) => {
          switch (evento.tipoMensaje) {
            case 10:
              {
                const { descripciones } = evento;
                asignarValorNombreTaller(
                  obtenerValorDeArregloDeStrings(
                    descripciones,
                    "NombreTaller: "
                  )
                );
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
      !esperaEncuesta &&
      encuestaData &&
      encuestaData.obtener_encuesta &&
      encuestaData.obtener_encuesta.dato &&
      encuestaData.obtener_encuesta.dato.paginas
    ) {
      const { paginas } = encuestaData.obtener_encuesta.dato;
      const acumuladoPreguntasEstrellas = [];
      const acumuladoEvaluacionEstrellas = [];
      const acumuladoPreguntasCalificacion = [];
      const acumuladoEvaluacionCalificacion = [];
      paginas.forEach((pagina) => {
        pagina.preguntas.forEach((pregunta) => {
          switch (pregunta.tipoDescripcion) {
            case "Estrellas":
              acumuladoPreguntasEstrellas.push(
                pregunta.descripcion.replace("@@Taller", nombreTaller)
              );
              acumuladoEvaluacionEstrellas.push({
                idEP: pregunta.idEP,
                id: pregunta.id,
                preguntaId: pregunta.respuestas[0].preguntaId,
              });
              break;
            case "Calificacion":
              acumuladoPreguntasCalificacion.push(pregunta.descripcion);
              acumuladoEvaluacionCalificacion.push({
                idEP: pregunta.idEP,
                id: pregunta.id,
                preguntaId: pregunta.respuestas[0].preguntaId,
              });
              break;
            case "Abierta":
              valores.respuestaComentario = {
                idEP: pregunta.idEP,
                id: pregunta.id,
                preguntaId: pregunta.respuestas[0].preguntaId,
              };
              break;
            default:
          }
        });
      });
      asignarValorPreguntasEstrellas(acumuladoPreguntasEstrellas);
      asignarValorPreguntaCalificacion(acumuladoPreguntasCalificacion);
      valores.respuestaEstrellas = acumuladoEvaluacionEstrellas;
      valores.respuestaCalificacion = acumuladoEvaluacionCalificacion;
    }
  }, [encuestaData, esperaEncuesta]);

  const dormir = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const alCambiarEvaluacion = async (valor) => {
    // Actualizar valor de las evaluaciones
    const evaluacionesOriginales = [...evaluaciones];
    evaluacionesOriginales[preguntaActual] = valor;
    asignarValorEvaluaciones(evaluacionesOriginales);

    // Agregar el comentario a la respuesta que se mandará al backend de HDI
    const respuestaEvaluacionOriginal = [...valores.respuestaEstrellas];
    respuestaEvaluacionOriginal[preguntaActual] = {
      ...respuestaEvaluacionOriginal[preguntaActual],
      evaluacion: valor,
    };

    valores.respuestaEstrellas = respuestaEvaluacionOriginal;
    await dormir(500);
    if (preguntaActual < preguntasEstrellas.length - 1) {
      asignarValorPreguntaActual(preguntaActual + 1);
    } else if (preguntaActual === preguntasEstrellas.length - 1) {
      // asignarValorPreguntaActual(0);
      cambiarPantalla("comentarios");
    }
  };

  const alCambiarComentarios = (texto) => {
    if (texto) {
      valores.comentarios = texto;

      // Agregar el comentario a la respuesta que se mandará al backend de HDI
      valores.respuestaComentario = {
        ...valores.respuestaComentario,
        comentario: texto,
      };
      asignarValorPantalla("");
    }
  };

  const enviarEvaluacion = () => {
    // Si no se agregó un comentario, enviar objeto vacío
    if (valores.comentarios === "") {
      // valores.respuestaComentario = {};
      cambiarPantalla("comentarios");
      return;
    }

    enviarEncuesta({
      variables: {
        evaluaciones: JSON.stringify(valores.respuestaEstrellas),
        calificaciones: JSON.stringify(valores.respuestaCalificacion),
        comentario: JSON.stringify(valores.respuestaComentario),
        reconocimiento: JSON.stringify({}),
        encuestaId: Configuraciones.evaluacionTallerID,
        evalua: nombreCompleto,
        evaluado: nombreTaller === nombreTallerDefault ? "" : nombreTaller,
        numeroReporte,
      },
    });
  };

  const prepararEvaluacion = () => {
    if (preguntaCalificacion.length !== 0) {
      asignarValorMostrarModal(true);
    } else {
      enviarEvaluacion();
    }
  };

  const alCambiarCalificacion = (calificacion) => {
    if (calificacion) {
      // Actualizar respuesta de la calificacion
      const respuestaCalificacionActualizada = [
        ...valores.respuestaCalificacion,
      ];
      respuestaCalificacionActualizada[0] = {
        ...respuestaCalificacionActualizada[0],
        calificacion,
      };

      valores.respuestaCalificacion = respuestaCalificacionActualizada;
    }

    enviarEvaluacion();
  };

  const habilitarBotonEnvio = () => {
    if (
      evaluaciones.length !== preguntasEstrellas.length ||
      evaluaciones.includes(undefined)
    ) {
      return true;
    }
    return false;
  };

  const reedireccionarOmitir = () => {
    // Estatus de evaluacion:
    /*
      1- Pendiente
      2- Omitido
      3- Contestado
    */
    if (location?.state?.omitida) {
      history.push({
        pathname: "/pasos-progreso",
        search: `?numeroReporte=${numeroReporte}`,
      });
      return;
    }
    skipSurvey({
      variables: {
        idEncuesta: 2,
        estatusEvaluacion: 2,
        numeroReporte: Number(numeroReporte),
        evalua: nombreCompleto,
        evaluado: nombreTallerEstado || "",
        lineaNegocio: "AUTR",
        siniestro: estadoApp.datosNumeroSiniestroGlobal || "",
      },
    });
    history.push({
      pathname: "/pasos-progreso",
      search: `?numeroReporte=${numeroReporte}`,
      state: {
        encuesta: "omitida",
      },
    });
  };

  useEffect(() => {
    if (loadingSkipSurvey) {
      asignarValorCargando(true);
    }

    if (
      !loadingSkipSurvey &&
      !dataSkipSurvey?.encuesta_guardarEstatusEncuesta.codigo === "ERR00001"
    ) {
      asignarValorCargando(false);
      asignarValorMostrarError(true);
      return;
    }

    if (
      dataSkipSurvey?.encuesta_guardarEstatusEncuesta.completado &&
      !loadingSkipSurvey &&
      dataSkipSurvey?.encuesta_guardarEstatusEncuesta.codigo !== "ERR00001"
    ) {
      asignarValorCargando(false);
      history.push({
        pathname: "pasos-progreso",
        search: `?numeroReporte=${numeroReporte}`,
      });
    }
  }, [dataSkipSurvey, loadingSkipSurvey, errorSkipSurvey]);

  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EvaluacionModal
        mostrar={mostrarModal}
        pregunta={preguntaCalificacion[0]}
        asignarCalificacion={alCambiarCalificacion}
      />
      <Alerta
        colorAlerta="rojo"
        textoEncabezado={diccionario.modal.titulo}
        textoCuerpo={diccionario.modal.cuerpo}
        etiquetaBoton={diccionario.modal.boton}
        mostrarModal={mostrarError}
        funcionLlamadaBoton={() => {
          asignarValorMostrarError(false);
        }}
        mostrarCierre={false}
      />
      <Alerta
        mostrarModal={valorModalEncuesta}
        colorAlerta="azul"
        tipoIcono="palomita"
        textoEncabezado={`${estadoApp.NombreUsuarioPerfil.data}, queremos escucharte!`}
        textoCuerpo="Inspíranos a mejorar la atención del centro de reparación contestando la siguiente encuesta: "
        etiquetaBoton="Contestar"
        etiquetaBoton2="Omitir"
        funcionLlamadaBoton={() => asignarValorModalEncuesta(false)}
        funcionLlamadaBoton2={reedireccionarOmitir}
        temaBoton2="simple"
        manejarCierre={() => asignarValorModalEncuesta(false)}
      />
      <ContenedorPantallaEvaluacion>
        <EncabezadoEvaluacion>
          <ImagenEncabezado src={imagenEncabezado} />
          {diccionario.encabezadoTaller1}
          {nombreTaller}
          {diccionario.encabezadoTaller2}
        </EncabezadoEvaluacion>
        <TituloMisPolizas>{diccionario.principal}</TituloMisPolizas>
        <br />
        <TituloEvaluacion>{diccionario.titulo}</TituloEvaluacion>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          totalSlides={preguntasEstrellas.length}
          currentSlide={preguntaActual}
        >
          <Slider moveThreshold={0.6}>
            {preguntasEstrellas.map((valor, indice) => (
              <Slide index={indice}>
                <Evaluacion
                  titulo={valor}
                  evaluacion={evaluaciones[indice]}
                  asignarEvaluacion={alCambiarEvaluacion}
                />
              </Slide>
            ))}
          </Slider>
          <ControladorDeslizador preguntaActual={asignarValorPreguntaActual} />
        </CarouselProvider>
        <EnvolvedorNumeroPreguntas>
          {preguntasEstrellas.map((valor, indice) => (
            <ContenedorIconoPunto
              key={valor}
              marcado={indice === preguntaActual}
            >
              <IconoPunto style={{ fontSize: 12 }} />
            </ContenedorIconoPunto>
          ))}
        </EnvolvedorNumeroPreguntas>
        <CuerpoEvaluacion>{diccionario.cuerpo}</CuerpoEvaluacion>
        <ContenedorExtrasEvaluacion>
          {/* <RenglonExtrasEvaluacionCentrado
            onClick={() => {
              cambiarPantalla("comentarios");
            }}
          >
            <ContenedorIconoExtrasEvaluacion>
              <IconoComentarios style={{ fontSize: 18 }} />
            </ContenedorIconoExtrasEvaluacion>
            {diccionario.textoComentario}
          </RenglonExtrasEvaluacionCentrado> */}
        </ContenedorExtrasEvaluacion>
        <Boton
          etiqueta={diccionario.botonEnviar}
          id="botonEvaluacion"
          enClick={prepararEvaluacion}
          deshabilitado={habilitarBotonEnvio()}
        />
      </ContenedorPantallaEvaluacion>
    </EnvolvedorPantalla>
  );

  if (pantalla === "comentarios") {
    pantallaAMostrar = (
      <Comentarios
        alAceptar={alCambiarComentarios}
        alRegresar={() => {
          cambiarPantalla("");
        }}
      />
    );
  }

  return pantallaAMostrar;
};

export default PantallaEvaluacionTaller;

/* eslint-disable prettier/prettier */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  FondoBlanco,
  TituloPantallaPasosProgreso,
} from "./PantallaPasosProgresoGrua.styled";
import EncabezadoPasosProgreso from "../../encabezado-pasos-progreso";
import Encabezado from "../../encabezado";
import ContenedorReporteGrua from "../../contenedor-reporte-grua";
import IndicadorCarga from "../../indicador-carga";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import { MensajePequeno } from "../../pantalla-registro-poliza/pantalla-registro-poliza-componente/PantallaRegistroPoliza.styled";
import showConfig from "../../../utils/configs";
import Constantes from "../../../recursos/constantes";

const nombreCookie = Constantes.nombreDeCookie;

const EVENTOS_PASADOS = loader(
  "../../../graphQL/query/reporte/listado_actualizaciones_reporte.graphql"
);

const SUSCRIPCION_NOTIFICACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const OBTENER_IMAGENES_REPORTE = loader(
  "../../../graphQL/query/reporte/obtener_imagenes_reporte.graphql"
);

const diccionario = {
  encabezado: "Asistencia de tu <br />",
  titulo: "Seguimiento de tu asistencia",
  subtitulo: "Visualiza el avance de cada etapa de tu siniestro.",
  subtituloLineaTiempo:
    // "Observa el progreso de tu siniestro a medida que avanza por las siguientes etapas",
    "Consulta el progreso de tu asistencia. Se irán habilitando a medida que avancemos en el proceso",
};

const PantallaPasosProgresoGrua = () => {
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const token = objetoCookie && objetoCookie.access_token;
  console.log("token: ", token);

  const [eventos, asignarValorEventos] = useState();
  const [nuevosEventos, asignarValorNuevosEventos] = useState();
  const [cargando, asignarValorCargando] = useState(false);
  const [numeroSiniestroNoti, setNumeroSiniestro] = useState("");
  const [fotosSiniestro, asignarValorFotosSiniestro] = useState([]);

  const datosVehiculo = estadoApp.datosPoliza
    ? estadoApp.datosPoliza.datosVehiculo
    : "";

  let lineaTiempoReporteSiniestro = "";
  if (estadoApp.lineaTiempoReporteSiniestro) {
    lineaTiempoReporteSiniestro = estadoApp.lineaTiempoReporteSiniestro;
  } else {
    lineaTiempoReporteSiniestro = {
      data: {
        NumeroReporte: 0,
        Estado: "",
        Municipio: "",
        Modelo: "",
        QuienReporta: "",
        Telefono: "",
        Declacarion: "",
        Placas: "",
        Color: "",
        CoordenadaOrigen: "",
        CoordenadaDestino: "",
        DireccionOrigen: "",
        DireccionDestino: "",
      },
    };
  }

  let reporteRedux = "";
  if (estadoApp.numeroReporteGrua) {
    reporteRedux = parseInt(estadoApp.numeroReporteGrua, 10);
  } else if (estadoApp.lineaTiempoReporteSiniestro) {
    reporteRedux = parseInt(
      estadoApp.lineaTiempoReporteSiniestro.data.NumeroReporte,
      10
    );
  }

  let telefonoContacto;
  if (estadoApp.informacionVehiculo) {
    telefonoContacto = estadoApp.informacionVehiculo.telefono;
  } else if (estadoApp.lineaTiempoReporteSiniestro) {
    telefonoContacto = estadoApp.lineaTiempoReporteSiniestro.data.Telefono;
  }

  const [
    obtenerEventosPasados,
    {
      data: eventosPasados,
      loading: cargandoEventosPasados,
      error: errorEventosPasados,
    },
  ] = useLazyQuery(EVENTOS_PASADOS, {
    fetchPolicy: "no-cache",
  });

  const [
    obtenerImagenesReporte,
    { loading: cargadoImagenesReporte, data: imagenesReporte },
  ] = useLazyQuery(OBTENER_IMAGENES_REPORTE, {
    fetchPolicy: "cache-and-network",
  });

  const { data: nuevosEventosSuscripcion } = useSubscription(
    SUSCRIPCION_NOTIFICACIONES,
    {
      variables: { numeroReporte: reporteRedux },
    }
  );

  useEffect(() => {
    if (
      !cargandoEventosPasados &&
      eventosPasados &&
      eventosPasados.listado_actualizaciones_reporte &&
      eventosPasados.listado_actualizaciones_reporte.dato &&
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste
    ) {
      asignarValorEventos(
        eventosPasados.listado_actualizaciones_reporte.dato.ajuste
      );
      asignarValorCargando(false);
      eventosPasados.listado_actualizaciones_reporte.dato.ajuste.forEach(
        (evento) => {
          switch (evento.tipoMensaje) {
            case 29:
              console.log(
                "numRep: ",
                eventosPasados.listado_actualizaciones_reporte.numeroReporte
              );
              lineaTiempoReporteSiniestro = {
                NumeroReporte:
                  eventosPasados.listado_actualizaciones_reporte.numeroReporte,
                FechaReporte: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "FechaReporte: "
                ),
                Estado: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Estado: "
                ),
                Municipio: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Municipio: "
                ),
                Modelo: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Modelo: "
                ),
                QuienReporta: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "QuienReporta: "
                ),
                Telefono: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Telefono: "
                ),
                Placas: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Placas: "
                ),
                Color: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Color: "
                ),
                Declacarion: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Declaracion: "
                ),
                CoordenadaOrigen: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "CoordenadaOrigen: "
                ),
                CoordenadaDestino: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "CoordenadaDestino: "
                ),
                DireccionOrigen: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "DireccionOrigen: "
                ),
                DireccionDestino: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "DireccionDestino: "
                ),
              };
              dispatch({
                type: "AGREGAR",
                valor: {
                  data: lineaTiempoReporteSiniestro,
                },
                indice: "lineaTiempoReporteSiniestro",
              });
              dispatch({
                type: "AGREGAR",
                valor: "En progreso",
                indice: "estatusReporte",
              });
              break;
            case 30:
              dispatch({
                type: "AGREGAR",
                valor: obtenerValorDeArregloDeStrings(
                  evento.descripciones,
                  "Estatus Siniestro: "
                ),
                indice: "estatusReporte",
              });
              break;
            default:
          }
        }
      );
    } else if (cargandoEventosPasados) {
      asignarValorCargando(true);
    } else if (errorEventosPasados) {
      asignarValorCargando(false);
    }
  }, [eventosPasados, cargandoEventosPasados, errorEventosPasados]);

  useEffect(() => {
    if (
      nuevosEventosSuscripcion &&
      nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte &&
      nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      const evento =
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte;
      switch (evento.tipoMensaje) {
        case 3:
          const esPerdidaTotal = obtenerValorDeArregloDeStrings(
            evento.dato.descripciones,
            "EsPerdidaTotal: "
          );
          // asignarValorMostrarPerdidaTotal(
          //   esPerdidaTotal.toLowerCase() === "true"
          // );
          break;
        // Al recibir mensaje tipo 10, hay que revisar si previamente se contestó
        //   la encuesta de ajustador; de ser así, mostrar sección Reparación.
        case 10:
          console.log("case 10");
          break;
        default:
      }
      asignarValorNuevosEventos(
        nuevosEventosSuscripcion.escucha_evento_actualizacion_reporte
      );
    }
  }, [nuevosEventosSuscripcion]);

  useEffect(() => {
    if (
      !cargadoImagenesReporte &&
      imagenesReporte &&
      imagenesReporte.obtener_imagenes_reporte &&
      imagenesReporte.obtener_imagenes_reporte.completado
    ) {
      const siniestro = imagenesReporte.obtener_imagenes_reporte.dato.filter(
        (foto) =>
          foto.nombre === "frontal-derecha.jpg" ||
          foto.nombre === "frontal-izquierda.jpg" ||
          foto.nombre === "trasera-derecha.jpg" ||
          foto.nombre === "trasera-izquierda.jpg"
      );
      asignarValorFotosSiniestro(siniestro);
      asignarValorCargando(false);
    } else if (cargadoImagenesReporte) {
      asignarValorCargando(true);
    } else {
      asignarValorCargando(false);
    }
  }, [
    cargadoImagenesReporte,
    imagenesReporte,
    nuevosEventosSuscripcion,
    eventosPasados,
  ]);

  useEffect(() => {
    obtenerEventosPasados({ variables: { numeroReporte: reporteRedux } });
    obtenerImagenesReporte({
      variables: { numeroReporte: reporteRedux, usuario: telefonoContacto },
    });
  }, []);

  return (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      {token ? (
        <>
          <EncabezadoPasosProgreso asistencia />
          <FondoBlanco />
        </>
      ) : (
        <Encabezado
          tituloHtml={`${diccionario.encabezado}<b>${lineaTiempoReporteSiniestro.data.Modelo}</b>`}
          mostrarBotonRegresar={false}
          alturaEncabezadoAuto
        />
      )}
      <Pantalla>
        <TituloPantallaPasosProgreso sticky={token ? 'true' : 'false'}>
          {diccionario.titulo}
        </TituloPantallaPasosProgreso>
        {showConfig.lineaTiempo ? (
          <MensajePequeno style={{ marginBottom: "50px" }}>
            {diccionario.subtituloLineaTiempo}
          </MensajePequeno>
        ) : (
          <MensajePequeno style={{ marginBottom: "50px" }}>
            {diccionario.subtitulo}
          </MensajePequeno>
        )}

        <ContenedorReporteGrua
          temaBoton
          eventosPasados={eventos}
          eventoNuevo={nuevosEventos}
          numeroReportePorDefecto={reporteRedux}
          fotosSiniestro={fotosSiniestro}
          // fotosDocumentos={fotosDocumentos}
          // abrirEtapa={abrirEtapa === "ReporteAjuste"}
          // abrirSeccion={abrirSeccion}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaPasosProgresoGrua;

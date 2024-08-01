/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useSubscription, useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useSelector } from "react-redux";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import { ContenedorOpcion, LogoOpcion } from "./PantallaMenuEspera.styled";
import { Alerta } from "../../alerta";
import EncabezadoReporte from "../../encabezado-reporte";
import IndicadorCarga from "../../indicador-carga";
import Aviso from "../../../recursos/iconos/hdi-c/ajustador/aviso.svg";
import Tips from "../../../recursos/iconos/hdi-c/ajustador/recomendaciones.svg";
import Fotos from "../../../recursos/iconos/hdi-c/ajustador/fotos.svg";
import { Titulo } from "../../pantalla-recomendaciones/pantalla-recomendaciones-componente/PantallaRecomendaciones.styled";

const SUSCRIPCION_AJUSTADOR = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const EVENTOS_PASADOS = loader(
  "../../../graphQL/query/reporte/listado_actualizaciones_reporte.graphql"
);

const diccionario = {
  titulo: "Tu ajustador va en camino, en lo que esperas, puedes:",
  alertaTitulo: "Tu ajustador ha llegado",
  alertaCuerpo:
    // eslint-disable-next-line max-len
    "<p>El ajustador nos ha notificado que ya está contigo.</p><p>A partir de este momento podrás darle seguimiento a la resolución de tu siniestro.</p>",
  alertaBoton: "Continuar",
  menuOpcion1: "Avisar a algún contacto que tuviste un accidente.",
  menuOpcion2:
    "Revisar las recomendaciones que te sugerimos realizar después del accidente.",
  menuOpcion3:
    "Agilizar el proceso de siniestro subiendo fotos y documentación.",
};

const PantallaMenuEspera = () => {
  const estadoApp = useSelector((estado) => estado);
  const history = useHistory();
  const location = useLocation();
  let numeroReporte;
  if (
    location &&
    location.search &&
    location.search.includes("numeroReporte")
  ) {
    const params = new URLSearchParams(location.search);
    numeroReporte = parseInt(params.get("numeroReporte"), 10);
  } else if (estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte) {
    numeroReporte = parseInt(estadoApp.datosReporte.numeroReporte, 10);
  }
  if (!numeroReporte) {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);
  const navegarA = (ruta) => {
    history.push({
      pathname: ruta,
      search: `?numeroReporte=${numeroReporte}`,
    });
  };
  const { data } = useSubscription(SUSCRIPCION_AJUSTADOR, {
    variables: { numeroReporte },
  });

  const [
    obtenerEventosPasados,
    {
      data: eventosPasados,
      loading: loadingEventosPasados,
      error: errorEventosPasados,
    },
  ] = useLazyQuery(EVENTOS_PASADOS, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (
      data &&
      data.escucha_evento_actualizacion_reporte &&
      data.escucha_evento_actualizacion_reporte.tipoMensaje &&
      data.escucha_evento_actualizacion_reporte.tipoMensaje === 1
    ) {
      console.log("entro?");
      asignarValorMostrarModal(true);
    }
  }, [data]);

  useEffect(() => {
    obtenerEventosPasados({
      variables: { numeroReporte },
    });
  }, []);

  useEffect(() => {
    if (!mostrarModal) {
      if (
        eventosPasados &&
        eventosPasados.listado_actualizaciones_reporte &&
        eventosPasados.listado_actualizaciones_reporte.dato &&
        eventosPasados.listado_actualizaciones_reporte.dato.ajuste
      ) {
        console.log("entro?");
        asignarValorCargando(false);
        eventosPasados.listado_actualizaciones_reporte.dato.ajuste.forEach(
          (evento) => {
            switch (evento.tipoMensaje) {
              case 1:
                console.log("llego la notificación y por eso reedirige");
                history.push({
                  pathname: "/pasos-progreso",
                  search: `?numeroReporte=${numeroReporte}`,
                });
                break;
              default:
            }
          }
        );
      } else if (loadingEventosPasados) {
        asignarValorCargando(true);
      } else if (errorEventosPasados) {
        asignarValorCargando(false);
      }
    }
  }, [eventosPasados, loadingEventosPasados, errorEventosPasados]);

  return (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EncabezadoReporte funcionRegresar reporte={numeroReporte} />
      <Pantalla>
        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        <Alerta
          colorAlerta="azul"
          tipoIcono="palomita"
          textoEncabezado={diccionario.alertaTitulo}
          textoCuerpo={diccionario.alertaCuerpo}
          mostrarModal={mostrarModal}
          etiquetaBoton={diccionario.alertaBoton}
          funcionLlamadaBoton={() => {
            history.push({
              pathname: "/pasos-progreso",
              search: `?numeroReporte=${numeroReporte}`,
            });
          }}
          mostrarCierre={false}
        />
        <ContenedorOpcion
          id="botonCompartirSiniestro"
          onClick={() => {
            navegarA("/compartir-siniestro");
          }}
        >
          <LogoOpcion src={Aviso} />
          {diccionario.menuOpcion1}
        </ContenedorOpcion>
        <ContenedorOpcion
          id="botonRecomendaciones"
          onClick={() => {
            navegarA("/recomendaciones");
          }}
        >
          <LogoOpcion src={Tips} />
          {diccionario.menuOpcion2}
        </ContenedorOpcion>
        <ContenedorOpcion
          onClick={() => {
            navegarA("/subir-fotos");
          }}
        >
          <LogoOpcion src={Fotos} />
          {diccionario.menuOpcion3}
        </ContenedorOpcion>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaMenuEspera;

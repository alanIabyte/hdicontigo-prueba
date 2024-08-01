/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import { useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import IndicadorCarga from "../../indicador-carga";
import {
  ContenedorSinElementos,
  ImagenSinElementos,
} from "../../pantalla-informacion-pagos/pantalla-informacion-pagos-componente/PantallaInformacionPagos.styled";
import { Titulo } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import { MensajePequeno } from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import CardPendingSurvey from "./CardPendingSurvey";
import {
  CustomLocation,
  Dato,
  QueryResponse,
} from "./interfaces/IElegirEncuesta";
import { ReactComponent as IconoNoEncuestas } from "../../../recursos/iconos/contigo/ico_encuesta.svg";

const GET_PENDING_SURVEYS = loader(
  "../../../graphQL/query/encuesta/obtenerEncuestasPendientes.graphql"
);

export const PantallaElegirEncuesta: React.FC = () => {
  const history = useHistory();
  const location = useLocation<CustomLocation>();
  const { numeroReporte, numeroSiniestro } = location.state.reporte;

  // States
  const [loading, setLoading] = useState(true);
  const [pendingSurveys, setPendingSurveys] = useState<Dato[]>([]);

  const {
    data,
    loading: loadingQuery,
    error,
  } = useQuery<QueryResponse>(GET_PENDING_SURVEYS, {
    variables: { numeroReporte },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (loadingQuery) {
      setLoading(true);
      return;
    }

    if (error && !loadingQuery) {
      setLoading(false);
      return;
    }

    const resp = data?.encuesta_obtenerEncuestasPendientes;

    if (!resp) {
      setLoading(false);
      return;
    }

    if (!resp?.completado) {
      setLoading(false);
      return;
    }

    if (resp?.completado) {
      setLoading(false);
      // Creamos un set para eliminar las encuestas que podrían estar duplicadas
      const set: Set<any> = new Set(
        resp?.dato.map((encuesta: Dato) => JSON.stringify(encuesta))
      );
      const arrSinDuplicaciones: any[] = Array.from(set).map(
        (encuestas: string) => JSON.parse(encuestas)
      );
      console.log(arrSinDuplicaciones);
      setPendingSurveys(arrSinDuplicaciones);
    }
  }, [data, loadingQuery, error]);

  return (
    <EnvolvedorPantalla key="envolvedor-pantalla-tipoEncuesta">
      {loading && <IndicadorCarga pantallaCompleta />}
      <Encabezado
        titulo="Seleccionar evaluación"
        mostrarBotonCerrar={false}
        mostrarBotonRegresar
        funcionRegresar={() => {
          history.goBack();
        }}
      />
      <Pantalla>
        {loadingQuery ||
          (pendingSurveys.length === 0 && (
            <>
              <Titulo>
                ¡Gracias por tu tiempo y por compartir tus comentarios de HDI
                Contigo!
              </Titulo>
              <ContenedorSinElementos>
                <ImagenSinElementos>
                  <IconoNoEncuestas />
                </ImagenSinElementos>
                <br />
                Actualmente no hay encuestas disponibles
              </ContenedorSinElementos>
            </>
          ))}

        {pendingSurveys.length > 0 && !loadingQuery && (
          <>
            <Titulo>¡Califica nuestro servicio!</Titulo>
            <MensajePequeno>
              Tu opinión es clave para ayudarnos a mejorar tu experiencia.
              Selecciona el servicio que deseas calificar:
            </MensajePequeno>
          </>
        )}

        {pendingSurveys.map((survey, i) => (
          <CardPendingSurvey
            key={`card-pending-survey-${i + 1}`}
            survey={survey}
            reporte={Number(numeroReporte)}
            siniestro={Number(numeroSiniestro)}
          />
        ))}
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

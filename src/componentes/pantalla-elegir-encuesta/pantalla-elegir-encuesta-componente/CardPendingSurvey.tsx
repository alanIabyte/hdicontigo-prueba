/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Contenedor,
  ContenidoAcordeon,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ParrafoAcordeon,
  TituloAcordeon,
} from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import icoAtencion from "../../../recursos/iconos/ico_atencion_ajustador.svg";
import icoReparacion from "../../../recursos/iconos/ico_servicio_taller.svg";
import { Dato } from "./interfaces/IElegirEncuesta";

interface IProps {
  survey: Dato;
  reporte: number;
  siniestro: number;
}

const CardPendingSurvey = ({ survey, reporte, siniestro }: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const reedirigir = () => {
    console.log(siniestro);
    dispatch({
      type: "AGREGAR",
      indice: "numeroSiniestroReporte",
      valor: Number(siniestro),
    });

    if (survey.encuesta === 1) {
      history.push(`/evaluacion-ajustador?numeroReporte=${reporte}`, {
        omitida: true,
      });
      return;
    }

    history.push(`/evaluacion-taller?numeroReporte=${reporte}`, {
      omitida: true,
    });
  };

  const obtenerIcono = (surveyType: number) => {
    if (surveyType === 1) {
      return icoAtencion;
    }

    return icoReparacion;
  };

  return (
    <>
      <Contenedor show onClick={() => reedirigir()}>
        <Encabezado>
          <EnvolvedorIcono>
            <EnvolvedorImagen src={obtenerIcono(survey.encuesta)} />
          </EnvolvedorIcono>
          <ContenidoAcordeon>
            <TituloAcordeon>
              {survey.encuesta === 1
                ? `Atención del ajustador: ${survey.evaluado}`
                : `Servicio de reparación: ${survey.evaluado}`}
            </TituloAcordeon>
            <ParrafoAcordeon>Siniestro: {`${siniestro}`}</ParrafoAcordeon>
          </ContenidoAcordeon>
        </Encabezado>
      </Contenedor>
    </>
  );
};

export default CardPendingSurvey;

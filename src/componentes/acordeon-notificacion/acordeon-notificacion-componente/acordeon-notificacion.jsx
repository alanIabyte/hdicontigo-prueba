/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TituloAcordeon,
  Contenedor,
  Encabezado,
  ContenedorEstatus,
  IndicadorNoLeida,
  FechaNotificacion,
  ContenidoNotificacion,
  IconoEncabezado,
} from "./acordeon-notificacion.styled";
import "./styles.scss";
import ImgHome from "../iconos/inicio.svg";
import moment from "moment";
import "moment/locale/es-mx";
import { obtenerIconoPorTipo, getRedirect } from "./tipos-notificaciones";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useDispatch } from "react-redux";
import useRedirect from "../../../utils/useRedirect";

const NOTIFICACIONES_LEER = loader(
  "../../../graphQL/mutation/notificaciones/notificaciones_leer.graphql"
);

const AcordeonNotificacion = (props) => {
  const {
    id,
    titulo,
    contenido,
    leido,
    tipo,
    infoadicional,
    fechaalta,
    usuario,
    funcValorCargando,
    funcMarcarLeido,
    funcObtenerNotificaciones
  } = props;
  
  const [fechaActual] = useState(moment());

  const validarFechaAlta = (fecha) => {
    const fechaMoment = moment(fecha);

    const diferenciaMinutos = fechaActual.diff(fechaMoment, 'minutes');
    
    const diferenciaHoras = fechaActual.diff(fechaMoment, 'hours');
    const diferenciaDias = fechaActual.diff(fechaMoment, 'days');
    const diferenciaMeses = fechaActual.diff(fechaMoment, 'month');
    const diferenciaAnios = fechaActual.diff(fechaMoment, 'years');
    //Validar Minutos
    if (diferenciaMinutos <= 1) {
      return "Hace un momento";
    } else if (diferenciaMinutos > 1 && diferenciaMinutos < 60) {
      return `Hace ${diferenciaMinutos} minutos`;
    } else if (diferenciaHoras >= 1 && diferenciaHoras < 24) {
      return `Hace ${diferenciaHoras} ${diferenciaHoras==1 ? 'hora': 'horas'}`;
    } else if (diferenciaDias == 1) {
      return `Ayer a las ${fechaMoment.format("h:mm a")}`;
    } else if (diferenciaDias > 1 && diferenciaDias < 7) {
      return `El ${fechaMoment.format('dddd')} pasado`;
    } else if (diferenciaDias >= 7 && diferenciaAnios < 1) {
      return `${fechaMoment.format('D')} de ${fechaMoment.format('MMM')} a las ${fechaMoment.format('h:mm a')}`;
    } else if (diferenciaAnios > 0) {
      return `${fechaMoment.format('D')} de ${fechaMoment.format('MMM')} del ${fechaMoment.format('YYYY')} a las ${fechaMoment.format('h:mm a')}`;
    } else {
      return "n/a";
    }
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const { redirect, redirectPathWithState } = useRedirect();

  const [
    leerNotificacion,
    {
      data: respuestaLeerNotificacion,
      error: errorLeerNotificacion,
      loading: loadingLeerNotificacion,
    },
  ] = useMutation(NOTIFICACIONES_LEER, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (
      !loadingLeerNotificacion &&
      loadingLeerNotificacion.notificaciones_leer &&
      loadingLeerNotificacion.notificaciones_leer.dato
    ) {
      console.log("respuestaLeerNotificacion", respuestaLeerNotificacion);
      console.log("errorLeerNotificacion", errorLeerNotificacion);
    }
  });

  const irPath = async (dataRedirect) => {
    console.log(dataRedirect);
    funcValorCargando(true);
    await leerNotificacion({
      variables: {
        id_noti: id,
        usuario: usuario,
      },
    });
    
    if (dataRedirect === undefined || dataRedirect === "") {
      funcValorCargando(false);
      return;
    }

    let datosPoliza = {};

    if (infoadicional.trim() != "") {
      datosPoliza = JSON.parse(infoadicional);
    }
    switch(dataRedirect.typeData) {
      case "redux":
        await dispatch({
          type: "AGREGAR",
          valor: datosPoliza,
          indice: "informacionPolizaDetalle",
        });
        redirect(dataRedirect.path);
        break;
      case "state":
        //Se agrega la info de la póliza que utilizará el componente para conusltar los datos
        let params = {
          poliza: datosPoliza,
          tipo: datosPoliza.lineaNegocio,
          modo: "Recibos",
        };
        if (dataRedirect.containerShow) {
          params.showContainer = dataRedirect.containerShow;
        }
        await dispatch({
          type: "AGREGAR",
          valor: datosPoliza,
          indice: "informacionPolizaDetalle",
        });
        redirectPathWithState(dataRedirect.path, params);
        break;
      case "queryParams":
        let queryParams = "?";
        Object.keys(datosPoliza).forEach(key => {
          queryParams = `${queryParams}${key}=${datosPoliza[key]}&`;
        });
        const fullPath = dataRedirect.path + (queryParams.slice(0, -1));
        history.push(fullPath);
        break;
      case "noRedirect":
        //Función para obtener nuevamente las notificaciones
        funcObtenerNotificaciones();
        funcValorCargando(false);
        break;
    }
    
  }

  return (
    <Contenedor onClick={() => { irPath(getRedirect(tipo)) }}>
      <Encabezado>
        {obtenerIconoPorTipo(tipo, leido)}
        <ContenidoNotificacion>
          <TituloAcordeon>
            {titulo}
          </TituloAcordeon>
          <div dangerouslySetInnerHTML={{__html: contenido}}></div>
        </ContenidoNotificacion>
      </Encabezado>
      <ContenedorEstatus>
        <FechaNotificacion>{validarFechaAlta(fechaalta)}</FechaNotificacion>
      </ContenedorEstatus>
    </Contenedor>
  );
};

AcordeonNotificacion.defaultProps = {
  id: 0,
  titulo: "N/A",
  contenido: "",
  leido: 0,
  tipo: "",
  infoadicional: "",
  fechaalta: "",
  usuario: "",
  funcValorCargando() {},
  funcMarcarLeido() {},
  funcObtenerNotificaciones() {},
};

AcordeonNotificacion.propTypes = {
  id: PropTypes.number,
  titulo: PropTypes.string,
  contenido: PropTypes.string,
  leido: PropTypes.number,
  tipo: PropTypes.string,
  infoadicional: PropTypes.string,
  fechaalta: PropTypes.string,
  usuario: PropTypes.string,
  funcValorCargando: PropTypes.func,
  funcMarcarLeido: PropTypes.func,
  funcObtenerNotificaciones: PropTypes.func,
};

export default AcordeonNotificacion;

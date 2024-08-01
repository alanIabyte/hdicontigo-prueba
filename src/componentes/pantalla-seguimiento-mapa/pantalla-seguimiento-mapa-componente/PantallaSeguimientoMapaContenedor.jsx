import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSubscription } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import "moment/locale/es-mx";
import CloseIcon from "@material-ui/icons/Close";
import {
  EnvolvedorPantallaAltoCompleto,
  ContenedorCerrar,
  PantallaSeguimiento,
} from "./PantallaSeguimientoMapa.styled";
import PantallaSeguimientoMapa from "./PantallaSeguimientoMapa";
import { Alerta } from "../../alerta";

const SUSCRIPCION_AJUSTADOR = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const diccionario = {
  horaDeArribo: "Hora estimada de arribo:",
  encabezadoAlerta: "Ocurrió un error",
  textoAlerta: "Ocurrió un error al cargar la ruta",
  calculando: "calculando...",
  alertaAjustadorTitulo: "Tu ajustador ha llegado",
  alertaAjustadorCuerpo:
    // eslint-disable-next-line max-len
    "<p>El ajustador nos ha notificado que ya está contigo.</p><p>A partir de este momento podrás darle seguimiento a la resolución de tu siniestro.</p>",
  alertaAjustadorBoton: "Continuar",
};

const PantallaSeguimientoMapaContenedor = () => {
  const location = useLocation();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const reporte =
    estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte
      ? parseInt(estadoApp.datosReporte.numeroReporte, 10)
      : 0;
  const [mostrarModalAlerta, asignarValorMostrarModalAlerta] = useState(false);
  const [mostrarModalAjustador, asignarValorMostrarModalAjustador] =
    useState(false);

  if (reporte === 0) {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }

  const cerrar = () => {
    const {
      state: { paginaAnterior },
    } = location;
    if (paginaAnterior) {
      history.push({
        pathname: paginaAnterior,
      });
    }
  };

  const { data: dataDeLlegadaDeAjustador } = useSubscription(
    SUSCRIPCION_AJUSTADOR,
    {
      variables: { numeroReporte: reporte },
    }
  );

  useEffect(() => {
    if (
      dataDeLlegadaDeAjustador &&
      dataDeLlegadaDeAjustador.escucha_evento_actualizacion_reporte &&
      dataDeLlegadaDeAjustador.escucha_evento_actualizacion_reporte
        .tipoMensaje &&
      dataDeLlegadaDeAjustador.escucha_evento_actualizacion_reporte
        .tipoMensaje === 1
    ) {
      asignarValorMostrarModalAjustador(true);
    }
  }, [dataDeLlegadaDeAjustador]);

  return (
    <EnvolvedorPantallaAltoCompleto key={v4()}>
      <Alerta
        textoEncabezado={diccionario.encabezadoAlerta}
        textoCuerpo={diccionario.textoAlerta}
        mostrarModal={mostrarModalAlerta}
        manejarCierre={() => {
          asignarValorMostrarModalAlerta(false);
        }}
        mostrarIcono={false}
      />
      <Alerta
        colorAlerta="azul"
        tipoIcono="palomita"
        textoEncabezado={diccionario.alertaAjustadorTitulo}
        textoCuerpo={diccionario.alertaAjustadorCuerpo}
        mostrarModal={mostrarModalAjustador}
        etiquetaBoton={diccionario.alertaAjustadorBoton}
        funcionLlamadaBoton={() => {
          history.push("/pasos-progreso");
        }}
        mostrarCierre={false}
      />
      <ContenedorCerrar className="cerrar" onClick={cerrar}>
        <CloseIcon />
      </ContenedorCerrar>
      <PantallaSeguimiento>
        <PantallaSeguimientoMapa numeroDeReporte={reporte} />
      </PantallaSeguimiento>
    </EnvolvedorPantallaAltoCompleto>
  );
};

PantallaSeguimientoMapaContenedor.propTypes = {};

PantallaSeguimientoMapaContenedor.defaultProps = {};

export default PantallaSeguimientoMapaContenedor;

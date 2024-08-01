/* eslint-disable */
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  EnvolvedorPantallaNotificaciones,
  PantallaFondoGris,
  ContenedorNotificaciones,
  TituloNotificaciones,
} from "./pantalla-notificaciones.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
import MenuBottomComponente from "../../menu-bottom";
import AcordeonNotificacion from "../../acordeon-notificacion";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";
import { NotificacionesEstaticas } from "./objetos-estaticos";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import useRedirect from "../../../utils/useRedirect";
import useValidateLogin from "../../../utils/useValidateLogin";

const OBTENER_NOTIFICACIONES = loader(
  "../../../graphQL/query/notificaciones/obtener_lista_notificaciones.graphql"
);

const diccionario = {
  titulo: "Notificaciones",
  mensajeDeErrorDefault: "Ocurrió un error.",
};

const PantallaNotificaciones = () => {
  const [cargando, asignarValorCargando] = useState(true);
  const [verMenuInferior, setVerMenuInferior] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);

  const { redirectRoot } = useRedirect();
  const { validateUser, user: usuario } = useValidateLogin();
  if (!validateUser) {
    redirectRoot();
  }

  const { data, loading, error } = useQuery(OBTENER_NOTIFICACIONES, {
    variables: {usuario:usuario},
    fetchPolicy: "network-only"
  });

  const [obtenerNotificaciones, { data: dataNoti, loading: loadingNoti, error: errorNoti }] = useLazyQuery(OBTENER_NOTIFICACIONES, {
    variables: {usuario:usuario},
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (!loadingNoti && dataNoti && dataNoti.notificaciones_obtenerNotificaciones && dataNoti.notificaciones_obtenerNotificaciones.dato) {
      setNotificaciones(dataNoti.notificaciones_obtenerNotificaciones.dato);
    }
    if (loadingNoti) {
      asignarValorCargando(true);
    }
    if (!loadingNoti) {
      asignarValorCargando(false);
    }
    if (errorNoti) {
      asignarValorMensajeAlerta(errorNoti);
    }
  }, [loadingNoti, dataNoti, errorNoti]);
 
  useEffect(() => {
    if (!loading && data && data.notificaciones_obtenerNotificaciones && data.notificaciones_obtenerNotificaciones.dato) {
      setNotificaciones(data.notificaciones_obtenerNotificaciones.dato);
    }
    if (loading) {
      asignarValorCargando(true);
    }
    if (!loading) {
      asignarValorCargando(false);
    }
    if (error) {
      asignarValorMensajeAlerta(error);
    }
  }, [loading, data, error]);

  useEffect(() => {
    setVerMenuInferior(validaDispositivoCelular());
  }, [verMenuInferior]);


  const valorCargando = (cargando) => {
    asignarValorCargando(cargando);
  }

  const marcarLeido = (id) => {
    const noti_bus_index = notificaciones.findIndex(noti => noti.id === id);
    if (noti_bus_index > -1) {
      const nuevo = notificaciones.map(noti => noti.id === id ? {...noti, leido: 1}: noti);
      setNotificaciones(nuevo);
    }
  }

  return (
    <EnvolvedorPantallaNotificaciones key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EncabezadoPolizasSiniestradas mostrarMenu={!verMenuInferior} />
      <PantallaFondoGris>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          posicionAbsoluta
        />

        <ContenedorNotificaciones>
          <TituloNotificaciones id="titulo">
            {diccionario.titulo}
          </TituloNotificaciones>
          {notificaciones.map((notificacion) => (
            <AcordeonNotificacion
              key={notificacion.id}
              id={notificacion.id}
              titulo={notificacion.titulo}
              contenido={notificacion.contenido}
              leido={notificacion.leido}
              tipo={notificacion.tipo}
              infoadicional={notificacion.infoadicional}
              fechaalta={notificacion.fechaalta}
              usuario={usuario}
              funcValorCargando={valorCargando}
              funcMarcarLeido={marcarLeido}
              funcObtenerNotificaciones={obtenerNotificaciones}
            />
          ))}
          {notificaciones.length < 1 ? <p>No tiene notificaciones</p>: <></>}
        </ContenedorNotificaciones>
      </PantallaFondoGris>
      {verMenuInferior ? <MenuBottomComponente /> : <></>}
    </EnvolvedorPantallaNotificaciones>
  );
};
export default PantallaNotificaciones;

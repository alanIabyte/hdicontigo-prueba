/* eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  ContenedorFondoMenuCompleto,
  ContenedorMenu,
  ConenedorIconosItems,
  IconItem,
  Icono,
  Title,
  ContenedorSubMenu,
  ConenedorIconosItemsCompleto,
  BurbujaNotiCount,
} from "./Menu-bottom.styled";
import { useCookies } from "react-cookie";
import Constantes from "../../../recursos/constantes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import IndicadorCarga from "../../indicador-carga";
import { loader } from "graphql.macro";
import Diccionario from "./Diccionario";

import IconoSiniestros from "./../iconos/mis_siniestros.svg";
import IconoPolizas from "./../iconos/mis_polizas.svg";
import IconoNotificaciones from "./../iconos/notificaciones.svg";
import IconoMasMenos from "./../iconos/mas.svg";

import IconoSiniestrosDisabled from "./../iconos/mis_siniestros_disabled.svg";
import IconoPolizasDisabled from "./../iconos/mis_polizas_disabled.svg";
import IconoNotificacionesDisabled from "./../iconos/notificaciones_disabled.svg";
import IconoMasMenosDisabled from "./../iconos/mas_disabled.svg";

import IconoReportarSiniestro from "./../iconos/reportar_siniestro.svg";
import IconoPagos from "./../iconos/mis_pagos.svg";
import IconoReembolsos from "./../iconos/mis_reembolsos.svg";
import IconoInicio from "./../iconos/inicio.svg";

import IconoReportarSiniestroDisabled from "./../iconos/reportar_siniestro_disabled.svg";
import IconoPagosDisabled from "./../iconos/mis_pagos_disabled.svg";
import IconoReembolsosDisabled from "./../iconos/mis_reembolsos_disabled.svg";
import IconoInicioDisabled from "./../iconos/inicio_disabled.svg";

import IconoMiCuenta from "./../iconos/mi_cuenta.svg";
import IconoContactanos from "./../iconos/contactanos.svg";
import IconoCalificanos from "./../iconos/calificanos.svg";
import IconoCerrarSesion from "./../iconos/cerrar_sesion.svg";
import IconoTerminosCondiciones from "./../iconos/TyC.svg";
import IconoAvisoPrivacidad from "./../iconos/aviso_privacidad.svg";
import IconoFAQ from "../../menu-bottom/iconos/FAQ.svg";

import IconoMiCuentaDisabled from "./../iconos/mi_cuenta_disabled.svg";
import IconoContactanosDisabled from "./../iconos/contactanos_disabled.svg";
import IconoCalificanosDisabled from "./../iconos/calificanos_disabled.svg";

import { showGMM } from "../../../utils/merge_congif";
import showConfig from "../../../utils/configs";

import "./styles.scss";
import useValidateLogin from "../../../utils/useValidateLogin";
import useRedirect from "../../../utils/useRedirect";

const CERRAR_SESION = loader(
  "../../../graphQL/mutation/seguridad/cerrar_sesion.graphql"
);

const NOTIFICACIONES_COUNT = loader(
  "../../../graphQL/query/notificaciones/obtener_count_notificaciones.graphql"
);

const MenuBottomComponente = () => {
  /** States */
  const [menuCompleto, setMenuCompleto] = useState(false);
  const [labelMasMenos, setLabelMasMenos] = useState("Más");

  /** Cookie */
  const { nombreDeCookie, telContactanos } = Constantes;
  const [cookie, setCookie, removerCookie] = useCookies([nombreDeCookie]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cerrarSesionQuery, { loading, error, data }] = useMutation(
    CERRAR_SESION
    );
  const [cargando, asignarValorCargando] = useState(false);
  const estadoApp = useSelector((state) => state);
  const [countNoti, asignarCountNoti] = useState("0");

  const { redirectRoot } = useRedirect();
  const { validateUser, user: usuario } = useValidateLogin();
  if (!validateUser) {
    redirectRoot();
  }

  const [
    obtenerNotificacionesCount,
    {
      data: dataNotiCount,
      loading: loadingNotiCount,
      error: errorNotiCount
    }
  ] = useLazyQuery(NOTIFICACIONES_COUNT, {
    variables: { usuario: usuario },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    obtenerNotificacionesCount();
  }, []);

  useEffect(() => {
    if (!loadingNotiCount &&
      dataNotiCount &&
        dataNotiCount.notificaciones_obtenerNotificacionesCount &&
        dataNotiCount.notificaciones_obtenerNotificacionesCount.dato
    ) {
      const count = dataNotiCount.notificaciones_obtenerNotificacionesCount.dato.notificacionescount;
      if (count >= 0 && count < 10) {
        asignarCountNoti(`${count}`);
      } else {
        asignarCountNoti("9+");
      }
    }
    if (errorNotiCount) {
      console.log(errorNotiCount);
    }
  }, [loadingNotiCount, dataNotiCount, errorNotiCount]);

  const [menu, setMenu] = useState([
    // Inicio
    {
      label: Diccionario.inicio.label,
      paths: [Diccionario.inicio.path],
      icono: IconoInicio,
      iconoDisabled:IconoInicioDisabled,
      ejecutar: "irPath",
    },
    // Mis pagos
    {
      label: Diccionario.misPagos.label,
      paths: [Diccionario.misPagos.path],
      icono: IconoPagos,
      iconoDisabled: IconoPagosDisabled,
      ejecutar: "irPath",
    },
    // Notificaciones
    {
      label: Diccionario.notificaciones.label,
      paths: [Diccionario.notificaciones.path],
      icono: IconoNotificaciones,
      iconoDisabled: IconoNotificacionesDisabled,
      ejecutar: "irPath",
    },
    // Mis Siniestros
    {
      label: Diccionario.misSiniestros.label,
      paths: [Diccionario.misSiniestros.path, Diccionario.misSiniestros.path2],
      icono: IconoSiniestros,
      iconoDisabled: IconoSiniestrosDisabled,
      ejecutar: "irPath",
    },
    // Mis Pólizas
    {
      label: Diccionario.misPolizas.label,
      paths: [Diccionario.misPolizas.path],
      icono: IconoPolizas,
      iconoDisabled: IconoPolizasDisabled,
      ejecutar: "irPath",
    },
    // Reportar Siniestro
    {
      label: Diccionario.reportarSiniestro.label,
      paths: [Diccionario.reportarSiniestro.path],
      icono: IconoReportarSiniestro,
      iconoDisabled: IconoReportarSiniestroDisabled,
      ejecutar: "irPath",
    },
    // Contactanos
    {
      label: Diccionario.contactanos,
      paths: null,
      icono: IconoContactanos,
      iconoDisabled:IconoContactanosDisabled,
      ejecutar: "Contáctanos",
    },
    // Calificanos
    {
      label: Diccionario.calificanos.label,
      paths: [Diccionario.calificanos.path],
      icono: IconoCalificanos,
      iconoDisabled:IconoCalificanosDisabled,
      ejecutar: "irPath",
    },
    // Mi cuenta
    {
      label: Diccionario.miCuenta.label,
      paths: [Diccionario.miCuenta.path],
      icono: IconoMiCuenta,
      iconoDisabled:IconoMiCuentaDisabled,
      ejecutar: "irPath",
    },
    // Mis Reembolsos
    {
      label: Diccionario.misReembolsos.label,
      paths: [Diccionario.misReembolsos.path],
      icono: IconoReembolsos,
      iconoDisabled: IconoReembolsosDisabled,
      ejecutar: "irPath",
    },
    // // Terminos y Condiciones
    // {
    //   label: Diccionario.terminosCondiciones.label,
    //   paths: [Diccionario.terminosCondiciones.path],
    //   icono: IconoTerminosCondiciones,
    //   iconoDisabled:IconoTerminosCondiciones,
    //   ejecutar: "irPath",
    // },
    // Aviso de privacidad
    // {
    //   label: Diccionario.avisoPrivacidad.label,
    //   paths: [Diccionario.avisoPrivacidad.path],
    //   icono: IconoAvisoPrivacidad,
    //   iconoDisabled:IconoAvisoPrivacidad,
    //   ejecutar: "irPath",
    // },
    // Preguntas frecuentes
    {
      label: Diccionario.preguntasFrecuentes.label,
      paths: [Diccionario.preguntasFrecuentes.path],
      icono: IconoFAQ,
      iconoDisabled:IconoFAQ,
      ejecutar: "irPath",
    },
  ]);

  const validarMenuCookie = () => {
    if (cookie[Diccionario.menuCookie]) {
      let menuCookie = cookie[Diccionario.menuCookie];
      let findMenuCookie = Object.assign([], menuCookie);
      let primerItem = menuCookie[0];
      //Validar el path para ver que este correcto
      if (primerItem.paths != null && !primerItem.paths.includes(window.location.pathname)) {
        //Ordenar los items para acomodarlos en orden
        const index = findMenuCookie.findIndex(itm =>  (itm.paths != null && itm.paths.includes(window.location.pathname)));
        if (index > 2) {
          const itemResplado = Object.assign({}, menuCookie[index]);
          menuCookie.splice(index, 1);
          const nuevoMenu = [itemResplado, ...menuCookie];
          setMenu(nuevoMenu);
          setCookie(Diccionario.menuCookie, nuevoMenu);
        } else {
          setMenu(menuCookie);
        }
      } else {
        setMenu(menuCookie);
      }
    } else {
      setCookie(Diccionario.menuCookie, menu);
    }
  }

  /*useEffect(
    validarMenuCookie,
    [cookie]
  );*/

  const cambiarStatusMenuCompleto = () => {
    if (menuCompleto) {
      setLabelMasMenos(Diccionario.mas);
      setMenuCompleto(false);
      return;
    }
    setLabelMasMenos(Diccionario.menos);
    setMenuCompleto(true);
  }

  const contactanos = () => {
    window.location.href = `tel:${telContactanos}`;
  }

  const cerrarSesion = () => {
    const objetoCookie = cookie[nombreDeCookie];
    if (objetoCookie) {
      cerrarSesionQuery({
        variables: {
          usuario: objetoCookie.Usuario,
          token: objetoCookie.access_token,
        },
      });
      dispatch({
        type: "BORRAR",
        indice: "fotoPerfil",
      });
      dispatch({
        type: "BORRAR",
        indice: "informacionContacto",
      });
    } else {
      history.push("/");
      dispatch({
        type: "BORRAR",
        indice: "fotoPerfil",
      });
    }
  };

  const estaActivo = (paths) => {
    return paths != null && paths.includes(window.location.pathname) ? true : false;
  }

  const ejecutar = async (item) => {
    obtenerNotificacionesCount();
    if (item.ejecutar == Diccionario.contactanos) {
      contactanos();
    } else {
      history.push(item.paths[0]);
    }
  }

  const irPath = async (path) => {
    obtenerNotificacionesCount();
    history.push(path);
  }

  const validaRender = (item) => {
    switch (item.label) {
      case Diccionario.misReembolsos.label:
        return true; // showGMM && estadoApp.consultaHome > 0;
      case Diccionario.calificanos.label:
        return showConfig.calificaciones;
      default:
        break;
    }
    return true;
  }

  useEffect(() => {
    if (!loading && data) {
      if (
        (data.cerrar_sesion && data.cerrar_sesion.dato) ||
        !data.cerrar_sesion.completado
      ) {
        // Borrar cookie y redirigir
        removerCookie(nombreDeCookie);
        history.push("/");
      }
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    }
  }, [loading, data,error]);

  return (
    <>
      {cargando ? <IndicadorCarga pantallaCompleta /> : null}
      {menuCompleto ? (
        <>
          <ContenedorFondoMenuCompleto onClick={cambiarStatusMenuCompleto} />
          <ContenedorSubMenu>
            <ConenedorIconosItemsCompleto>
              {menu.map((item, index) => (
                index > 2 && validaRender(item) &&
                <IconItem className="iconoSecundario" onClick={() => { ejecutar(item) }}>
                  <Icono src={item.icono} />
                  <Title className="title">{item.label}</Title>
                </IconItem>
              ))}
              <IconItem className="iconoSecundario" onClick={cerrarSesion}>
                <Icono src={IconoCerrarSesion} />
                <Title>{Diccionario.cerrarSesion}</Title>
              </IconItem>
              {menu.map((item, index) => (
                index > 2 && !item.enable && <IconItem className="iconoSecundario" />
              ))}
            </ConenedorIconosItemsCompleto>
          </ContenedorSubMenu>
        </>
      ) : null}
      <ContenedorMenu>
        <ConenedorIconosItems>
          <IconItem onClick={() => {irPath(menu[0].paths[0])}}>
            <Icono src={menu[0].icono} />
            <Title>{menu[0].label}</Title>
          </IconItem>
          <IconItem onClick={() => {irPath(menu[1].paths[0])}}>
            <Icono src={menu[1].icono} />
            <Title>{menu[1].label}</Title>
          </IconItem>
          {/*<<IconItem onClick={() => {irPath(menu[2].paths[0])}}>*/}
            {/*<Icono src={menu[2].icono} />*/}
          <IconItem onClick={() => {irPath(menu[2].paths[0])}} position="relative">
            {countNoti != "0" ? <BurbujaNotiCount>{countNoti}</BurbujaNotiCount> : <></>}
            <Icono src={menu[2].icono} />
            <Title>{menu[2].label}</Title>
          </IconItem>
          <IconItem onClick={cambiarStatusMenuCompleto}>
            <Icono src={IconoMasMenos} />
            <Title>{labelMasMenos}</Title>
          </IconItem>
        </ConenedorIconosItems>
      </ContenedorMenu>
    </>
  );
};
export default MenuBottomComponente;

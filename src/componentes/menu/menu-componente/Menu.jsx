/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import SalidaIcono from "@material-ui/icons/ExitToApp";
import IconoHamburguesa from "@material-ui/icons/MenuRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  BurbujaNotificaciones,
  Contenedor,
  ContenedorMenu,
  ContenedorMenuEncabezado,
  ContenedorMenuOpcion,
  ContenedorMenuPie,
  ContenedorMenuPieContenido,
  ImgIconoMenu,
  Logo,
  MenuStyled,
  // contenedorLogo
} from "./Menu.styled";
// import logo from "../../../recursos/imagenes/logo-alt-2.png";
import logoContigo from "../../../recursos/iconos/ico-contigo.svg";
import Constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";
import { showGMM } from "../../../utils/merge_congif";
import showConfig from "../../../utils/configs";
// import { TituloMisPolizas } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";

import IconoInicio from "../../menu-bottom/iconos/inicio.svg";
import IconoMiCuenta from "../../menu-bottom/iconos/mi_cuenta.svg";
import IconoMisPolizas from "../../menu-bottom/iconos/mis_polizas.svg";
import IconoMisSiniestros from "../../menu-bottom/iconos/mis_siniestros.svg";
import IconoMisPagos from "../../menu-bottom/iconos/mis_pagos.svg";
import IconoMisReembolsos from "../../menu-bottom/iconos/mis_reembolsos.svg";
import IconoReportarSiniestro from "../../menu-bottom/iconos/reportar_siniestro.svg";
import IconoCalificanos from "../../menu-bottom/iconos/calificanos.svg";
import IconoContactanos from "../../menu-bottom/iconos/contactanos.svg";
import IconoNotificaciones from "../../menu-bottom/iconos/notificaciones.svg";
import IconoTerminosCondiciones from "../../menu-bottom/iconos/TyC.svg";
import IconoAvisoPrivacidad from "../../menu-bottom/iconos/aviso_privacidad.svg";
import IconoFAQ from "../../menu-bottom/iconos/FAQ.svg";

import "./style.css";
import useValidateLogin from "../../../utils/useValidateLogin";
import useRedirect from "../../../utils/useRedirect";
import { Alerta } from "../../alerta";
import useAlerta from "../../../utils/useAlerta";

const diccionario = {
  inicio: "Inicio",
  miCuenta: "Mi Cuenta",
  misPolizas: "Mis Pólizas",
  misSiniestros: "Mis Siniestros",
  misPagos: "Mis Pagos",
  misReembsolsos: "Mis Reembolsos",
  reportarSiniestro: "Reportar Siniestro",
  cerrarSesion: "Cerrar Sesión",
  contactanos: "Contáctanos",
  calificanos: "Califícanos",
  otros: "Otros",
  notificaciones: "Notificaciones",
  terminosCondiciones: "Términos y Condiciones",
  preguntasFrecuentes: "Preguntas frecuentes",
  avisoPrivacidad: "Aviso de Privacidad",
};
const { nombreDeCookie, telContactanos } = Constantes;
const CERRAR_SESION = loader(
  "../../../graphQL/mutation/seguridad/cerrar_sesion.graphql"
);

const NOTIFICACIONES_COUNT = loader(
  "../../../graphQL/query/notificaciones/obtener_count_notificaciones.graphql"
);

const MenuComponente = (props) => {
  const { absoluto, alAbrirOCerrarMenu, abierto } = props;
  const history = useHistory();
  const estadoApp = useSelector((state) => state);
  const dispatch = useDispatch();
  const [mostrarMenu, asignarValorMostrarMenu] = useState(abierto);
  const [cookie, , removerCookie] = useCookies([nombreDeCookie]);
  const [cargando, asignarValorCargando] = useState(false);
  const [cerrarSesionQuery, { loading, error, data }] =
    useMutation(CERRAR_SESION);

  const [countNoti, asignarCountNoti] = useState("0");
  const { redirectRoot } = useRedirect();
  const { validateUser, user: usuario } = useValidateLogin();

  if (!showConfig.showKeycloak) {
    if (!validateUser) {
      redirectRoot();
    }
  }

  const configAlertaContactanos = {
    textoEncabezado: "HDI Contigo",
    tipoIcono: "",
    colorAlerta: "verde",
    textoCuerpoJsx: "Favor de comunicarse al número: +52 (477)-740-2860",
    etiquetaBoton: "Aceptar",
  };

  const alertaContactanos = useAlerta(configAlertaContactanos);

  const mostrarContactanos = () => {
    alertaContactanos.mostrar();
  };

  const abrirMenu = () => {
    asignarValorMostrarMenu(true);
    alAbrirOCerrarMenu(true);
  };
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
    if (showConfig.showKeycloak) {
      console.log("BORRAR: usuarioAutenticado");
      dispatch({
        type: "BORRAR",
        indice: "usuarioAutenticado",
      });
    }
  };
  const cerrarAlDarClickFueraDelMenu = (evento) => {
    evento.preventDefault();
    if (evento.target === evento.currentTarget) {
      alAbrirOCerrarMenu(false);
      asignarValorMostrarMenu(false);
    }
  };
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
  }, [loading, data]);

  const [
    obtenerNotificacionesCount,
    { data: dataNotiCount, loading: loadingNotiCount, error: errorNotiCount },
  ] = useLazyQuery(NOTIFICACIONES_COUNT, {
    variables: { usuario: usuario },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    obtenerNotificacionesCount();
  }, []);

  useEffect(() => {
    if (
      !loadingNotiCount &&
      dataNotiCount &&
      dataNotiCount.notificaciones_obtenerNotificacionesCount &&
      dataNotiCount.notificaciones_obtenerNotificacionesCount.dato
    ) {
      const count =
        dataNotiCount.notificaciones_obtenerNotificacionesCount.dato
          .notificacionescount;
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

  return (
    <>
      <Alerta
        {...alertaContactanos}
        funcionLlamadaBoton={() => {
          alertaContactanos.cerrar();
        }}
        manejarCierre={() => {
          alertaContactanos.cerrar();
        }}
      />
      <Contenedor absoluto={absoluto}>
        {cargando ? <IndicadorCarga pantallaCompleta /> : null}
        <IconoHamburguesa className="hamburguesa" onClick={abrirMenu} />
        <ContenedorMenu
          abierto={mostrarMenu}
          onClick={cerrarAlDarClickFueraDelMenu}
        >
          {/* TODO: Crear un array con todos los botones disponibles */}
          <MenuStyled abierto={mostrarMenu}>
            <ContenedorMenuEncabezado>
              <Logo src={logoContigo} />
              {/* <TituloMisPolizas>HDI</TituloMisPolizas> */}
            </ContenedorMenuEncabezado>
            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/inicio");
              }}
            >
              {diccionario.inicio}
              <ImgIconoMenu src={IconoInicio} />
            </ContenedorMenuOpcion>
            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/mi-cuenta");
              }}
            >
              {diccionario.miCuenta}
              <ImgIconoMenu src={IconoMiCuenta} />
            </ContenedorMenuOpcion>
            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/mis-polizas");
              }}
            >
              {diccionario.misPolizas}
              <ImgIconoMenu src={IconoMisPolizas} />
            </ContenedorMenuOpcion>
            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/polizas-siniestradas");
              }}
            >
              {diccionario.misSiniestros}
              <ImgIconoMenu src={IconoMisSiniestros} />
            </ContenedorMenuOpcion>

            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/pagos");
              }}
            >
              {diccionario.misPagos}
              <ImgIconoMenu src={IconoMisPagos} />
            </ContenedorMenuOpcion>

            {showGMM && estadoApp.consultaHome > 0 && (
              <ContenedorMenuOpcion
                onClick={() => {
                  history.push("/mis-reembolsos");
                }}
              >
                {diccionario.misReembsolsos}
                <ImgIconoMenu src={IconoMisReembolsos} />
              </ContenedorMenuOpcion>
            )}

            <ContenedorMenuOpcion
              onClick={() => {
                history.push({
                  pathname: "/mis-polizas",
                  state: {
                    paginaAnterior: history.location,
                    busqueda: "AUTR",
                  },
                });
              }}
            >
              {diccionario.reportarSiniestro}
              <ImgIconoMenu src={IconoReportarSiniestro} />
            </ContenedorMenuOpcion>
            {showConfig.calificaciones && (
              <ContenedorMenuOpcion
                onClick={() => {
                  history.push("/encuestas");
                }}
              >
                {diccionario.calificanos}
                <ImgIconoMenu src={IconoCalificanos} />
              </ContenedorMenuOpcion>
            )}
            {/* }
            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/otros");
              }}
            >
              {diccionario.otros}
            </ContenedorMenuOpcion>
            { */}
            <ContenedorMenuOpcion
              onClick={() => {
                mostrarContactanos();
              }}
            >
              {diccionario.contactanos}
              <ImgIconoMenu src={IconoContactanos} />
            </ContenedorMenuOpcion>
            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/notificaciones");
              }}
              style={{ position: "relative" }}
            >
              {diccionario.notificaciones}
              <ImgIconoMenu src={IconoNotificaciones} />
              {(countNoti > 0 || countNoti === "9+") && (
                <BurbujaNotificaciones>{countNoti}</BurbujaNotificaciones>
              )}
            </ContenedorMenuOpcion>
            <ContenedorMenuOpcion
              onClick={() => {
                history.push("/preguntas-frecuentes");
              }}
            >
              {diccionario.preguntasFrecuentes}
              <ImgIconoMenu src={IconoFAQ} />
            </ContenedorMenuOpcion>
            {/* <ContenedorMenuOpcion
              onClick={() => {
                history.push("/privacidad");
              }}
            >
              {diccionario.avisoPrivacidad}
              <ImgIconoMenu src={IconoAvisoPrivacidad} />
            </ContenedorMenuOpcion> */}
            <ContenedorMenuPie abierto={mostrarMenu}>
              <ContenedorMenuPieContenido onClick={cerrarSesion}>
                <SalidaIcono className="icono_cerrar_sesion" />
                {diccionario.cerrarSesion}
              </ContenedorMenuPieContenido>
            </ContenedorMenuPie>
          </MenuStyled>
        </ContenedorMenu>
      </Contenedor>
    </>
  );
};
MenuComponente.propTypes = {
  absoluto: PropTypes.bool,
  alAbrirOCerrarMenu: PropTypes.func,
  abierto: PropTypes.bool,
};
MenuComponente.defaultProps = {
  absoluto: false,
  alAbrirOCerrarMenu: () => {},
  abierto: false,
};
export default MenuComponente;

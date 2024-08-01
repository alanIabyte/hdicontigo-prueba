/* eslint-disable */
/* react/jsx-props-no-spreading */
import "./estilos.scss";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es-mx";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import ModalTexto from "../../modal-texto";
import IndicadorCarga from "../../indicador-carga";
import Constantes from "../../../recursos/constantes";
import useAlerta from "../../../utils/useAlerta";
import {
  configAlertaGeolocation,
  configAlertaErrorGeolocation,
  diccionario,
  configAlertaNuevosServicios,
  configAlertaBometricosNoRegistrados,
  configLocalStorage,
} from "./config";
import { isSignedError } from "../../../utils/errors";
import { EnvolvedorPantallaBienvenida } from "./PantallaBienvenida.styled";
import showConfig from "../../../utils/configs";

const Alerta = lazy(() => import("../../alerta/alerta-componente/Alerta"));
const BarraAlerta = lazy(() => import("../../barra-alerta"));
const PantallaPrincipal = lazy(() => import("./PantallaPrincipal"));
const PantallaIngresoUsuario = lazy(() =>
  import(
    "../../pantalla-ingreso-usuario/pantalla-ingreso-usuario-componente/PantallaIngresoUsuario"
  )
);
const PantallaIngresoUsuarioUsernameBiometrico = lazy(() =>
  import(
    "../../pantalla-ingreso-usuario-username-biometrico/pantalla-ingreso-usuario-username-biometrico-componente/PantallaIngresoUsuarioUsernameBiometrico"
  )
);

const valores = {
  usuario: "",
  contrasena: "",
};

const INICIAR_SESION_REPORTE = loader(
  "../../../graphQL/mutation/seguridad/iniciar_sesion_nuevo_reporte.graphql"
);

const ENVIAR_CODIGO_VERIFICACION = loader(
  "../../../graphQL/mutation/seguridad/enviar_codigo_verificacion.graphql"
);

const INICIAR_SESION = loader(
  "../../../graphQL/mutation/seguridad/iniciar_sesion.graphql"
);

const EXISTE_FINGERPRINT = loader(
  "../../../graphQL/mutation/seguridad/ExistFingerPrint.graphql"
);

const INICIAR_SESION_BIOMETRICO = loader(
  "../../../graphQL/mutation/seguridad/FingerprintEntry.graphql"
);

const { nombreDeCookie } = Constantes;

const PantallaBienvenida = (props) => {
  const history = useHistory();
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  const [cargando, asignarValorCargando] = useState(false);
  const [cookie, establecerCookie] = useCookies([nombreDeCookie]);
  const url = new URL(window.location);
  const objetoCookie = cookie[nombreDeCookie];
  if (objetoCookie && objetoCookie.Usuario && objetoCookie.access_token) {
    history.push("/inicio");
  }

  const [
    iniciarSesionReporte,
    { loading: loadingReporte, error: errorReporte, data: dataReporte },
  ] = useMutation(INICIAR_SESION_REPORTE);
  const [
    iniciarSesionVerificacion,
    {
      loading: loadingVerificacion,
      data: dataVerificacion,
      error: errorVerificacion,
    },
  ] = useMutation(ENVIAR_CODIGO_VERIFICACION);

  const [iniciarSesion, { loading, data, error }] = useMutation(INICIAR_SESION);
  const [
    existeFingerprint,
    { loading: loadingExisteF, data: dataExisteF, error: errorExisteF },
  ] = useMutation(EXISTE_FINGERPRINT);
  const [
    iniciarSesionBiometrico,
    {
      loading: loadingBiometrico,
      data: dataBiometrico,
      error: errorBiometrico,
    },
  ] = useMutation(INICIAR_SESION_BIOMETRICO);
  let contrasenaCambiada = false;
  if (
    location &&
    location.state &&
    location.state.notificacionContrasenaCambiada
  ) {
    contrasenaCambiada = true;
  }
  const dispatch = useDispatch();
  const alertaGeolocation = useAlerta(configAlertaGeolocation);
  const alertaServiciosNuevos = useAlerta(configAlertaNuevosServicios);
  const alertaErrorGeolocation = useAlerta(configAlertaErrorGeolocation);
  const alertaBiometricosNoRegistrados = useAlerta(
    configAlertaBometricosNoRegistrados
  );
  const [
    mostrarAlertaBometricosNoRegistrados,
    asignarValorMostrarAlertaBometricosNoRegistrados,
  ] = useState(false);
  const [errorUsuario, asignarErrorUsuario] = useState("");
  const [mostrarTerminos, asignarValorMostrarTerminos] = useState(false);
  const [tituloModal] = useState("");
  const [cuerpoModal] = useState("");
  const [focoUsuario, asignarValorFocoUsuario] = useState("");
  const [focoContrasena, asignarValorFocoContrasena] = useState("");
  const [bloqueoUsuario, setBloqueoUsuario] = useState(false);
  const [intentosRestantes, setIntentosRestantes] = useState(3);

  const [mostrarPantallaIngreso, asignarValorMostrarPantallaIngreso] =
    useState(false);
  const [
    mostrarPantallaIngresoUsernameBiometrico,
    asignarValorMostrarPantallaIngresoUsernameBiometrico,
  ] = useState(false);
  const [mostrarModalError, asignarValorMostrarModalError] = useState(
    location?.state?.mostrarAlerta
  );
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [
    mostrarAlertaContrasenaCambiada,
    asignarValorMostrarAlertaContrasenaCambiada,
  ] = useState(contrasenaCambiada);
  const [registraBiosExistente, asignarValorRegistraBiosExistente] = useState(
    estadoApp && estadoApp.registraBiometricosExistente
      ? estadoApp.registraBiometricosExistente
      : false
  );
  // let count = 0;

  const { alIniciarSesion } = props;
  alIniciarSesion();

  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );

  /*
    Obtener parametros de url
  */
  const params = new URLSearchParams(window.location.search);

  const iniciarSesionValidaBandera = () => {
    const { usuario, contrasena } = valores;
    if (showConfig.showDobleFactor) {
      iniciarSesionVerificacion({
        variables: {
          usuario,
          contrasena,
          latitud: "0000",
          longitud: "0000",
          plataforma: "HDI Contigo",
        },
      });
      return;
    } else {
      iniciarSesion({
        variables: {
          usuario,
          contrasena,
          latitud: "0000",
          longitud: "0000",
          plataforma: "HDI Contigo",
        },
      });
      return;
    }
  };

  const handleEnterLogin = (event) => {
    const { usuario, contrasena } = valores;
    const usuarioUrl = params.get("resb");
    if (window.location.pathname !== "/") {
      // ! Previene que el usuario ejecute el inicio de sesión multiples veces incluso cuando ya esta dentro
      return;
    }
    if (event.keyCode === 13) {
      if (!showConfig.showKeycloak) {
        if (!usuarioUrl) {
          iniciarSesion({
            variables: {
              usuario,
              contrasena,
              latitud: "0000",
              longitud: "0000",
              plataforma: "HDI Contigo",
            },
          });
        }
        if (usuarioUrl) {
          iniciarSesionReporte({
            variables: {
              usuario,
              contrasena,
              latitud: `0000`,
              longitud: `0000`,
              plataforma: "HDI Contigo",
            },
          });
        }
      }
    }
  };

  const validaUsuarioHuella = () => {
    dispatch({
      type: "AGREGAR",
      valor: {
        telefono: valores.usuario,
        email: "",
      },
      indice: "informacionContacto",
    });

    existeFingerprint({
      variables: {
        usuario: valores.usuario,
      },
    });
  };

  const registraBiometricosExistente = () => {
    dispatch({
      type: "AGREGAR",
      valor: true,
      indice: "registraBiometricosExistente",
    });

    asignarValorRegistraBiosExistente(true);
    asignarValorMostrarAlertaBometricosNoRegistrados(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterLogin);
  }, []);

  // Incluso si el dominio no es el actualizado, los valores deben funcionar de la misma manera
  const iniciarSesionSinValidacion = () => {
    const { usuario, contrasena } = valores;
    if (!usuario || !contrasena) {
      return;
    }
    asignarValorCargando(true);
    // navigator.geolocation.getCurrentPosition(successSinValidacion, errorGeo, options)
    iniciarSesionReporte({
      variables: {
        usuario,
        contrasena,
        latitud: `0000`,
        longitud: `0000`,
        plataforma: "HDI Contigo",
      },
    });
  };

  useEffect(() => {
    if (!loadingExisteF && dataExisteF) {
      if (
        dataExisteF.ExistFingerPrint &&
        dataExisteF.ExistFingerPrint.dato &&
        dataExisteF.ExistFingerPrint.completado
      ) {
        dispatch({
          type: "AGREGAR",
          valor: {
            publicKeyCredentialId:
              dataExisteF.ExistFingerPrint.dato.publicKeyCredentialId !== null
                ? dataExisteF.ExistFingerPrint.dato.publicKeyCredentialId
                : "",
            TieneHuella: dataExisteF.ExistFingerPrint.dato.existeHuella,
          },
          indice: "DatosWebAuthn",
        });
        // dispatch({
        //   type: "AGREGAR",
        //   valor: false,
        //   indice: "registraBiometricosExistente",
        // });

        asignarValorMostrarPantallaIngresoUsernameBiometrico(false);
        asignarValorMostrarPantallaIngreso(true);
      } else {
        if (
          dataExisteF.ExistFingerPrint &&
          dataExisteF.ExistFingerPrint.mensaje
        ) {
          switch (dataExisteF.ExistFingerPrint.codigo) {
            case "IDX10009":
              asignarErrorUsuario(dataExisteF.ExistFingerPrint.mensaje);
              console.log(dataExisteF.ExistFingerPrint);
              break;
          }
        }
      }
      asignarValorCargando(false);
      return;
    }
    if (loadingExisteF) {
      asignarValorCargando(true);
      return;
    }
    if (errorExisteF) {
      asignarValorCargando(false);
      asignarErrorUsuario(errorExisteF);
    }
  }, [loadingExisteF, dataExisteF, errorExisteF]);

  useEffect(() => {
    if (!loadingReporte && dataReporte) {
      if (
        dataReporte.iniciar_sesion_nuevo_reporte &&
        dataReporte.iniciar_sesion_nuevo_reporte.dato &&
        dataReporte.iniciar_sesion_nuevo_reporte.dato.access_token
      ) {
        // Guardar cookie y redirigir
        const diaHoraDeInicioDeSesion = moment().unix();
        const nuevoObjetoDeInicioDeSesion = JSON.parse(
          JSON.stringify(dataReporte.iniciar_sesion_nuevo_reporte.dato)
        );
        nuevoObjetoDeInicioDeSesion.fechaYHoraDeInicioDeSesion =
          diaHoraDeInicioDeSesion;
        establecerCookie(
          nombreDeCookie,
          JSON.stringify(nuevoObjetoDeInicioDeSesion),
          {
            path: "/",
          }
        );
        dispatch({
          type: "AGREGAR",
          valor: {
            data: nuevoObjetoDeInicioDeSesion.NombreAsegurado,
          },
          indice: "NombreUsuarioPerfil",
        });
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: nuevoObjetoDeInicioDeSesion.Telefono,
            email: nuevoObjetoDeInicioDeSesion.CorreoElectronico,
          },
          indice: "informacionContacto",
        });
        dispatch({
          type: "AGREGAR",
          valor: dataReporte.iniciar_sesion_nuevo_reporte.dato.Validado,
          indice: "usuarioValidado",
        });
        alIniciarSesion();
        if (!dataReporte.iniciar_sesion_nuevo_reporte.dato.Validado) {
          dispatch({
            type: "AGREGAR",
            valor: valores.contrasena,
            indice: "numeroReporte",
          });
        }
        // ! Descomentar
        localStorage.setItem("fromLogin", true);
        history.push("/inicio");
      } else {
        if (
          dataReporte.iniciar_sesion_nuevo_reporte &&
          dataReporte.iniciar_sesion_nuevo_reporte.mensaje
        ) {
          if (isSignedError(dataReporte.iniciar_sesion_nuevo_reporte.mensaje)) {
            asignarValorMensajeAlerta(
              "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
            );
          }

          asignarValorMensajeAlerta(
            dataReporte.iniciar_sesion_nuevo_reporte.mensaje
          );
          asignarValorMostrarBarraAlerta(true);
        }
        asignarValorFocoUsuario("error");
        asignarValorFocoContrasena("error");
      }
      asignarValorCargando(false);
      return;
    }
    if (loadingReporte) {
      asignarValorCargando(true);
      return;
    }
    if (errorReporte) {
      asignarValorCargando(false);
    }
  }, [loadingReporte, dataReporte]);

  useEffect(() => {
    if (!loadingVerificacion && dataVerificacion) {
      if (
        dataVerificacion.enviar_codigo_verificacion &&
        dataVerificacion.enviar_codigo_verificacion.dato &&
        dataVerificacion.enviar_codigo_verificacion.completado
      ) {
        const dataCodigoVerificacion = {
          codigoVerificacionId:
            dataVerificacion.enviar_codigo_verificacion.dato.codigoId,
          minutosExpiracion:
            dataVerificacion.enviar_codigo_verificacion.dato.minutosExpiracion,
        };

        if (dataCodigoVerificacion.codigoVerificacionId === 0) {
          setBloqueoUsuario(true);
          asignarValorMensajeAlerta(
            diccionario.mensajeUsuarioContraseniaIncorrectos
          );
          setIntentosRestantes(
            intentosRestantes === 0 ? 0 : intentosRestantes - 1
          );
          asignarValorMostrarBarraAlerta(true);
          asignarValorFocoUsuario("error");
          asignarValorFocoContrasena("error");
        } else {
          localStorage.setItem(
            configLocalStorage.codigoId,
            dataCodigoVerificacion.codigoVerificacionId
          );
          localStorage.setItem(configLocalStorage.usuario, valores.usuario);
          localStorage.setItem(
            configLocalStorage.contrasenia,
            valores.contrasena
          );
          history.push("/codigo-verificacion");
          // history.push("/prueba-cookie");
        }
      } else {
        if (
          dataVerificacion.enviar_codigo_verificacion &&
          dataVerificacion.enviar_codigo_verificacion.mensaje
        ) {
          if (
            isSignedError(dataVerificacion.enviar_codigo_verificacion.mensaje)
          ) {
            asignarValorMensajeAlerta(
              "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
            );
          }
          setBloqueoUsuario(true);
          setIntentosRestantes(
            intentosRestantes === 0 ? 0 : intentosRestantes - 1
          );
          asignarValorMensajeAlerta(
            dataVerificacion.enviar_codigo_verificacion.mensaje
          );
          asignarValorMostrarBarraAlerta(true);
        }
        asignarValorFocoUsuario("error");
        asignarValorFocoContrasena("error");
      }

      asignarValorCargando(false);
      return;
    }

    if (loadingVerificacion) {
      asignarValorCargando(true);
      return;
    }
    if (errorVerificacion) {
      asignarValorCargando(false);
      asignarValorMensajeAlerta(
        "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      );
    }
  }, [loadingVerificacion, dataVerificacion, errorVerificacion]);

  useEffect(() => {
    if (!loading && data) {
      if (
        data.iniciar_sesion &&
        data.iniciar_sesion.dato &&
        data.iniciar_sesion.completado
      ) {
        // Guardar cookie y redirigir
        const diaHoraDeInicioDeSesion = moment().unix();
        const nuevoObjetoDeInicioDeSesion = JSON.parse(
          JSON.stringify(data.iniciar_sesion.dato)
        );
        nuevoObjetoDeInicioDeSesion.fechaYHoraDeInicioDeSesion =
          diaHoraDeInicioDeSesion;
        establecerCookie(
          nombreDeCookie,
          JSON.stringify(nuevoObjetoDeInicioDeSesion),
          {
            path: "/",
          }
        );
        dispatch({
          type: "AGREGAR",
          valor: {
            data: nuevoObjetoDeInicioDeSesion.NombreAsegurado,
          },
          indice: "NombreUsuarioPerfil",
        });
        localStorage.setItem(
          "nombreUsuarioPerfil",
          JSON.stringify(nuevoObjetoDeInicioDeSesion.NombreAsegurado)
        );
        localStorage.setItem("fromLogin", true);
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: nuevoObjetoDeInicioDeSesion.Telefono,
            email: nuevoObjetoDeInicioDeSesion.CorreoElectronico,
            token: nuevoObjetoDeInicioDeSesion.access_token,
          },
          indice: "informacionContacto",
        });
        alIniciarSesion();
        dispatch({
          type: "AGREGAR",
          valor: data.iniciar_sesion.dato.Validado,
          indice: "usuarioValidado",
        });
        if (!data.iniciar_sesion.dato.Validado) {
          dispatch({
            type: "AGREGAR",
            valor: localStorage.getItem("contrasenia"),
            indice: "numeroReporte",
          });
          return;
        }
        localStorage.removeItem(configLocalStorage.codigoId);
        localStorage.removeItem(configLocalStorage.contrasenia);
        localStorage.removeItem(configLocalStorage.usuario);
        // !Descomentar
        if (!registraBiosExistente) {
          history.push("/inicio");
        } else {
          history.push("/registro-usuario-biometrico");
        }
      } else {
        if (data.iniciar_sesion && data.iniciar_sesion.mensaje) {
          if (isSignedError(data.iniciar_sesion.mensaje)) {
            asignarValorMensajeAlerta(
              "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
            );
          }
          setBloqueoUsuario(true);
          setIntentosRestantes(
            intentosRestantes === 0 ? 0 : intentosRestantes - 1
          );
          asignarValorMensajeAlerta(data.iniciar_sesion.mensaje);
          asignarValorMostrarBarraAlerta(true);
        }
        asignarValorFocoUsuario("error");
        asignarValorFocoContrasena("error");
      }
      asignarValorCargando(false);
      return;
    }
    if (loading) {
      asignarValorCargando(true);
      return;
    }
    if (error) {
      asignarValorCargando(false);
      asignarValorMensajeAlerta(
        "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      );
    }
  }, [loading, data, error]);

  useEffect(() => {
    if (!loadingBiometrico && dataBiometrico) {
      if (
        dataBiometrico.FingerprintEntry &&
        dataBiometrico.FingerprintEntry.dato &&
        dataBiometrico.FingerprintEntry.completado
      ) {
        // Guardar cookie y redirigir
        const diaHoraDeInicioDeSesion = moment().unix();
        const nuevoObjetoDeInicioDeSesion = JSON.parse(
          JSON.stringify(dataBiometrico.FingerprintEntry.dato)
        );
        nuevoObjetoDeInicioDeSesion.fechaYHoraDeInicioDeSesion =
          diaHoraDeInicioDeSesion;
        establecerCookie(
          nombreDeCookie,
          JSON.stringify(nuevoObjetoDeInicioDeSesion),
          {
            path: "/",
          }
        );
        dispatch({
          type: "AGREGAR",
          valor: {
            data: nuevoObjetoDeInicioDeSesion.NombreAsegurado,
          },
          indice: "NombreUsuarioPerfil",
        });
        localStorage.setItem(
          "nombreUsuarioPerfil",
          JSON.stringify(nuevoObjetoDeInicioDeSesion.NombreAsegurado)
        );
        localStorage.setItem("fromLogin", true);
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: nuevoObjetoDeInicioDeSesion.Telefono,
            email: nuevoObjetoDeInicioDeSesion.CorreoElectronico,
            token: nuevoObjetoDeInicioDeSesion.access_token,
          },
          indice: "informacionContacto",
        });
        alIniciarSesion();
        dispatch({
          type: "AGREGAR",
          valor: dataBiometrico.FingerprintEntry.dato.Validado,
          indice: "usuarioValidado",
        });
        if (!dataBiometrico.FingerprintEntry.dato.Validado) {
          dispatch({
            type: "AGREGAR",
            valor: localStorage.getItem("contrasenia"),
            indice: "numeroReporte",
          });
          return;
        }
        localStorage.removeItem(configLocalStorage.codigoId);
        localStorage.removeItem(configLocalStorage.contrasenia);
        localStorage.removeItem(configLocalStorage.usuario);
        // !Descomentar
        history.push("/inicio");
      } else {
        if (
          dataBiometrico.iniciar_sesion &&
          dataBiometrico.iniciar_sesion.mensaje
        ) {
          if (isSignedError(dataBiometrico.iniciar_sesion.mensaje)) {
            asignarValorMensajeAlerta(
              "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
            );
          }
          setBloqueoUsuario(true);
          setIntentosRestantes(
            intentosRestantes === 0 ? 0 : intentosRestantes - 1
          );
          asignarValorMensajeAlerta(dataBiometrico.iniciar_sesion.mensaje);
          asignarValorMostrarBarraAlerta(true);
        }
        asignarValorFocoUsuario("error");
        asignarValorFocoContrasena("error");
      }
      asignarValorCargando(false);
      return;
    }
    if (loadingBiometrico) {
      asignarValorCargando(true);
      return;
    }
    if (errorBiometrico) {
      asignarValorCargando(false);
      asignarValorMensajeAlerta(
        "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      );
    }
  }, [loadingBiometrico, dataBiometrico, errorBiometrico]);

  useEffect(() => {
    // alert(
    //   "platform: " +
    //     navigator.platform +
    //     " maxTouchPoints: " +
    //     navigator.maxTouchPoints +
    //     " navigator.userAgent: " +
    //     navigator.userAgent
    // );

    // alert(
    //   /iPad|iPhone|iPod/.test(navigator.platform) ||
    //     (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    // );
    sessionStorage.removeItem("estadoRedux");
    dispatch({
      type: "BORRAR_ESTADO",
    });
  }, []);

  const urlReedireccion = [
    "tucompañia",
    "tucompaia",
    "xn--tucompaia-r6a.hdi.com.mx",
    "xn--tucompaia-r6a.testing.hdi.com.mx",
    "xn--tucompaia-r6a.staging.hdi.com.mx",
  ];

  // Se inicializan las variables de usuario y contrasena con los parametros del auto logueo a fin de que sea más facil realizar la
  // reedirección a HDI Contigo
  const obtenerParamsAutoLog = (paramsFunc) => {
    if (!paramsFunc) {
      return;
    }
    const splitParamsUrl = paramsFunc.split("?");
    const resb = splitParamsUrl[0].split(" ").join("+");
    let adi = splitParamsUrl[1].split(" ").join("+");
    // eslint-disable-next-line prefer-destructuring
    adi = adi.split("adi=")[1];
    const usuario = resb;
    const contrasena = adi;
    valores.contrasena = contrasena;
    valores.usuario = usuario;
  };

  useEffect(() => {
    const splitParams = params.get("resb");
    if (urlReedireccion.includes(url.hostname)) {
      if (splitParams) {
        obtenerParamsAutoLog(splitParams);
      }
      console.log(url.hostname);
      alertaServiciosNuevos.mostrar();
      return;
    }

    if (!splitParams) {
      return;
    }
    obtenerParamsAutoLog(splitParams);
    iniciarSesionSinValidacion();
  }, []);

  const reedireccionNuevoDominio = () => {
    const urlBase = "https://hdicontigo.com.mx";
    if (valores.usuario) {
      window.open(
        `${urlBase}/?resb=${valores.usuario}?adi=${valores.contrasena}`
      );
      return;
    }
    window.open("", "_self", "");
    window.close();
    window.open(urlBase);
  };

  return (
    <EnvolvedorPantallaBienvenida key="PantallaBienvenida">
      {cargando ? <IndicadorCarga tema="verde" /> : null}

      <Suspense fallback={null}>
        <Alerta
          {...alertaServiciosNuevos}
          manejarCierre={() => {
            reedireccionNuevoDominio();
          }}
          funcionLlamadaBoton={() => {
            // alertaServiciosNuevos.cerrar();
            reedireccionNuevoDominio();
          }}
        />
        <Alerta
          textoEncabezado={diccionario.alertaLogin.titulo}
          textoCuerpo={diccionario.alertaLogin.cuerpo}
          etiquetaBoton={diccionario.alertaLogin.boton}
          colorAlerta="rojo"
          mostrarModal={mostrarModalError}
          manejarCierre={() => {
            asignarValorMostrarModalError(false);
          }}
          funcionLlamadaBoton={() => {
            asignarValorMostrarModalError(false);
          }}
          mostrarCierre
        />
        <Alerta
          {...alertaGeolocation}
          funcionLlamadaBoton={() => {
            asignarValorCargando(true);
            alertaGeolocation.cerrar();
          }}
          funcionLlamadaBoton2={() => {
            alertaErrorGeolocation.mostrar();
          }}
        />
        <Alerta
          {...alertaErrorGeolocation}
          funcionLlamadaBoton={() => {
            alertaErrorGeolocation.cerrar();
          }}
        />
        <Alerta
          {...alertaBiometricosNoRegistrados}
          mostrarModal={mostrarAlertaBometricosNoRegistrados}
          manejarCierre={() => {
            asignarValorMostrarAlertaBometricosNoRegistrados(false);
          }}
          funcionLlamadaBoton={registraBiometricosExistente}
          funcionLlamadaBoton2={() => {
            dispatch({
              type: "AGREGAR",
              valor: false,
              indice: "registraBiometricosExistente",
            });
            asignarValorMostrarAlertaBometricosNoRegistrados(false);
          }}
        />
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          sinEncabezado
        />
        <BarraAlerta
          etiqueta={diccionario.mensajeAlertaContrasenaCambiada}
          mostrarAlerta={mostrarAlertaContrasenaCambiada}
          manejarCierre={() => {
            asignarValorMostrarAlertaContrasenaCambiada(false);
          }}
          estilo="exitoso"
          sinEncabezado
        />
        <ModalTexto
          titulo={tituloModal}
          texto={cuerpoModal}
          mostrar={mostrarTerminos}
          manejarCierre={asignarValorMostrarTerminos}
        />
      </Suspense>
      {!showConfig.showKeycloak ? (
        <>
          {mostrarPantallaIngreso ? (
            <PantallaIngresoUsuario
              alIniciarSesion={alIniciarSesion}
              iniciarSesionMutation={iniciarSesionValidaBandera}
              asignarValorCargando={asignarValorCargando}
              asignarValorFocoContrasena={asignarValorFocoContrasena}
              asignarValorFocoUsuario={asignarValorFocoUsuario}
              asignarValorMensajeAlerta={asignarValorMensajeAlerta}
              asignarValorMostrarBarraAlerta={asignarValorMostrarBarraAlerta}
              asignarValorMostrarPantallaIngreso={
                asignarValorMostrarPantallaIngreso
              }
              cargando={cargando}
              establecerCookie={establecerCookie}
              focoContrasena={focoContrasena}
              focoUsuario={focoUsuario}
              valores={valores}
              bloqueoUsuario={bloqueoUsuario}
              intentosRestantes={intentosRestantes}
              key="IngresoUsuarioPantalla"
            />
          ) : (
            <PantallaPrincipal
              asignarValorMostrarPantallaIngreso={
                asignarValorMostrarPantallaIngreso
              }
            />
          )}
        </>
      ) : (
        <>
          {mostrarPantallaIngreso ? (
            <PantallaIngresoUsuario
              alIniciarSesion={alIniciarSesion}
              iniciarSesionMutation={iniciarSesionValidaBandera}
              iniciarSesionBiometrico={iniciarSesionBiometrico}
              asignarValorCargando={asignarValorCargando}
              asignarValorFocoContrasena={asignarValorFocoContrasena}
              asignarValorFocoUsuario={asignarValorFocoUsuario}
              asignarValorMensajeAlerta={asignarValorMensajeAlerta}
              asignarValorMostrarBarraAlerta={asignarValorMostrarBarraAlerta}
              asignarValorMostrarPantallaIngreso={
                asignarValorMostrarPantallaIngreso
              }
              asignarValorMostrarAlertaBometricosNoRegistrados={
                asignarValorMostrarAlertaBometricosNoRegistrados
              }
              asignarValorMostrarPantallaIngresoUsernameBiometrico={
                asignarValorMostrarPantallaIngresoUsernameBiometrico
              }
              asignarValorRegistraBiosExistente={
                asignarValorRegistraBiosExistente
              }
              mostrarPantallaIngreso={mostrarPantallaIngreso}
              cargando={cargando}
              establecerCookie={establecerCookie}
              focoContrasena={focoContrasena}
              focoUsuario={focoUsuario}
              valores={valores}
              bloqueoUsuario={bloqueoUsuario}
              intentosRestantes={intentosRestantes}
              registraBiosExistente={registraBiosExistente}
              key="IngresoUsuarioPantalla"
            />
          ) : mostrarPantallaIngresoUsernameBiometrico ? (
            <PantallaIngresoUsuarioUsernameBiometrico
              asignarValorFocoUsuario={asignarValorFocoUsuario}
              asignarValorMostrarPantallaIngreso={
                asignarValorMostrarPantallaIngreso
              }
              asignarValorMostrarPantallaIngresoUsernameBiometrico={
                asignarValorMostrarPantallaIngresoUsernameBiometrico
              }
              asignarValorCargando={asignarValorCargando}
              asignarErrorUsuario={asignarErrorUsuario}
              errorUsuario={errorUsuario}
              validaUsuarioHuella={validaUsuarioHuella}
              cargando={cargando}
              focoContrasena={focoContrasena}
              focoUsuario={focoUsuario}
              valores={valores}
              key="IngresoUsuarioPantalla"
            />
          ) : (
            <PantallaPrincipal
              asignarValorMostrarPantallaIngreso={
                asignarValorMostrarPantallaIngreso
              }
              asignarValorMostrarPantallaIngresoUsernameBiometrico={
                asignarValorMostrarPantallaIngresoUsernameBiometrico
              }
            />
          )}
        </>
      )}
    </EnvolvedorPantallaBienvenida>
  );
};

PantallaBienvenida.propTypes = {
  alIniciarSesion: PropTypes.func,
};

PantallaBienvenida.defaultProps = {
  alIniciarSesion: () => {},
};

export default React.memo(
  PantallaBienvenida,
  (prevProps, nextProps) =>
    prevProps.alIniciarSesion === nextProps.alIniciarSesion
);

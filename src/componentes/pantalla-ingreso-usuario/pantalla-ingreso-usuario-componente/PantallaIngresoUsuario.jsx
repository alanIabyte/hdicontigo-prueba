/* eslint-disable no-console */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */

import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import { useHistory } from "react-router-dom";
import IconoVisible from "@material-ui/icons/VisibilityRounded";
import IconoNoVisible from "@material-ui/icons/VisibilityOffRounded";
import CampoTexto from "../../campo-texto";
import { ContenedorPantallaBienvenida } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import IndicadorCarga from "../../indicador-carga";
import {
  ContenedorLogoBienvenida,
  LogoBienvenida,
  RegresarBoton,
  SeparadorEspacio,
  TituloBienvenidaH1,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import {
  Instrucciones,
  TextoCuerpo,
  ContenedorBoton,
} from "./PantallaIngresoUsuario.styled";
import logoContigo from "../../../recursos/iconos/ico_contigo.svg";
import Boton from "../../boton";
import { MensajeError } from "../../componentes-styled-compartidos/Textos";
import { diccionario } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/config";
import showConfig from "../../../utils/configs";
import { iOSDevice } from "../../../utils/validaDispositivo";
import { webAuthnAuthenticate } from "../../../utils/crear-credenciales-passkey/ObtenerCredencialPasskey";
import IconoFace from "../../../recursos/iconos/hdi-c/biometricos/biometrico-face.svg";
import IconoHuella from "../../../recursos/iconos/hdi-c/biometricos/biomnetrico-huella.svg";

let btnTema = "estandar";
const btn2Tema = "simple-circular";
const claseBotonEstandar = "boton-estandar";
const claseBotonDeshabilitado = "boton-deshabilitado";

const PantallaIngresoUsuario = (props) => {
  const {
    asignarValorMostrarPantallaIngreso,
    asignarValorFocoContrasena,
    asignarValorFocoUsuario,
    asignarValorMostrarAlertaBometricosNoRegistrados,
    asignarValorMostrarPantallaIngresoUsernameBiometrico,
    asignarValorRegistraBiosExistente,
    cargando,
    asignarValorCargando,
    mostrarPantallaIngreso,
    focoUsuario,
    focoContrasena,
    iniciarSesionMutation,
    iniciarSesionBiometrico,
    valores,
    bloqueoUsuario,
    intentosRestantes,
    registraBiosExistente,
  } = props;
  const history = useHistory();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);

  const [errorUsuario, asignarErrorUsuario] = useState("");
  const [seleccionHuella, asignarseleccionHuella] = useState(false);
  const [nuevaContrasenaVisible, asignarNuevaContrasenaVisible] =
    useState(true);
  const [datosWebAuthn, asignarValorDatosWebAuthn] = useState(
    estadoApp && estadoApp.DatosWebAuthn
      ? estadoApp.DatosWebAuthn
      : { publicKeyCredentialId: "", TieneHuella: false }
  );
  const icono = iOSDevice() ? IconoFace : IconoHuella;

  const alDarClickEnEntrar = async () => {
    const { usuario, contrasena } = valores;
    if (usuario && contrasena) {
      let usuarioValido = false;
      asignarValorFocoContrasena("");
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(usuario) ||
        /^\d{10}$/.test(usuario)
      ) {
        usuarioValido = true;
        asignarValorFocoUsuario("");
        asignarErrorUsuario("");
      } else {
        asignarValorFocoUsuario("error");
        asignarErrorUsuario(diccionario.errorUsuario);
      }
      if (usuarioValido) {
        asignarValorFocoUsuario("");
        asignarValorCargando(true);
        // navigator.geolocation.getCurrentPosition(success, errorGeo, options)
        iniciarSesionMutation({
          variables: {
            usuario,
            contrasena,
            // latitud: crd.latitude,
            // longitud: crd.longitude,
            latitud: "0000",
            longitud: "0000",
            plataforma: "HDI Contigo",
          },
        });
      }
    }
  };

  async function autenticarHuella() {
    if (
      datosWebAuthn.publicKeyCredentialId !== "" &&
      datosWebAuthn.TieneHuella
    ) {
      const autenticado = await webAuthnAuthenticate(
        datosWebAuthn.publicKeyCredentialId
      );
      if (autenticado) {
        iniciarSesionBiometrico({
          variables: {
            usuario: valores.usuario,
            publicKeyCredentialId: datosWebAuthn.publicKeyCredentialId,
            plataforma: "HDI Contigo",
          },
        });
      } else {
        dispatch({
          type: "AGREGAR",
          valor: false,
          indice: "registraBiometricosExistente",
        });
        asignarValorRegistraBiosExistente(false);
      }
    } else {
      asignarValorMostrarAlertaBometricosNoRegistrados(true);
    }
  }

  const deshabilitarBoton = () => {
    const elementoBotonDOM = btnRef.current;

    if (elementoBotonDOM && elementoBotonDOM.classList) {
      if (elementoBotonDOM.classList.contains(claseBotonEstandar)) {
        elementoBotonDOM.classList.remove(claseBotonEstandar);
      }

      if (!elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
        elementoBotonDOM.classList.add(claseBotonDeshabilitado);
      }
    }
    //  else {
    //   // Si btnRef.current o sus clases son nulos o indefinidos, imprime un mensaje de error.
    //   console.error(
    //     "La referencia al botón o sus clases es nula (null o undefined)"
    //   );
    // }
  };

  const habilitarBoton = () => {
    const elementoBotonDOM = btnRef.current;

    if (elementoBotonDOM && elementoBotonDOM.classList) {
      if (elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
        elementoBotonDOM.classList.remove(claseBotonDeshabilitado);
      }

      if (!elementoBotonDOM.classList.contains(claseBotonEstandar)) {
        elementoBotonDOM.classList.add(claseBotonEstandar);
      }
    }
    // else {
    //   // Si btnRef.current o sus clases son nulos o indefinidos, imprime un mensaje de error.
    //   console.error(
    //     "La referencia al botón o sus clases es nula (null o undefined)"
    //   );
    // }
  };

  useEffect(() => {
    //  TODO: Llamamos a deshabilitarBoton al montar el componente. Por alguna razón jala así jaja.
    deshabilitarBoton();
  }, []);

  useEffect(() => {
    if (mostrarPantallaIngreso) {
      if (
        datosWebAuthn.publicKeyCredentialId !== "" ||
        datosWebAuthn.TieneHuella
      ) {
        autenticarHuella();
      } else {
        console.log("no tiene huella ");
      }
    }
  }, [mostrarPantallaIngreso]);

  // ...

  const alCambiarUsuario = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.usuario = valor;
      if (valor && valores.contrasena) {
        habilitarBoton();
        btnTema = "estandar";
      } else {
        deshabilitarBoton();
        btnTema = "deshabilitado";
      }
    }
  };

  const alCambiarContrasena = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.contrasena = valor;
      if (valor && valores.usuario) {
        habilitarBoton();
        btnTema = "estandar";
      } else {
        deshabilitarBoton();
        btnTema = "deshabilitado";
      }
    }
  };

  const contrasenaNoVisible = <IconoNoVisible />;
  const contrasenaVisible = <IconoVisible />;

  return (
    <Fragment key={v4()}>
      <ContenedorPantallaBienvenida>
        {cargando ? <IndicadorCarga tema="verde" /> : null}
        <ContenedorLogoBienvenida
          alt="hdi-contigo hdi-tu-compania"
          style={{ marginBottom: "25px", marginTop: "40px" }}
        >
          <LogoBienvenida src={logoContigo} alt="hdi-contigo hdi-tu-compania" />
        </ContenedorLogoBienvenida>
        <RegresarBoton
          type="button"
          onClick={() => {
            if (!showConfig.showKeycloak) {
              asignarValorMostrarPantallaIngreso(false);
            } else {
              asignarValorMostrarPantallaIngreso(false);
              asignarValorMostrarPantallaIngresoUsernameBiometrico(true);
            }
          }}
        >
          <ChevronLeftRoundedIcon id="botonRegresar" fontSize="large" />
        </RegresarBoton>
        <TituloBienvenidaH1 id="tituloIngreso" ingreso>
          {!showConfig.showKeycloak
            ? diccionario.mensajeIngreso
            : diccionario.mensajeBienvenido}
        </TituloBienvenidaH1>
        <TextoCuerpo id="usuarioBiometrico">{valores.usuario}</TextoCuerpo>
        <SeparadorEspacio />
        {!showConfig.showKeycloak ? (
          <>
            <CampoTexto
              id="campoUsuario"
              etiqueta={diccionario.etiquetaUsuario}
              marcador="Ingresa tu número de télefono"
              enCambio={alCambiarUsuario}
              foco={focoUsuario}
              valor={valores.usuario}
            />
            {errorUsuario !== "" && (
              <MensajeError id="errorUsuario">{errorUsuario}</MensajeError>
            )}
          </>
        ) : (
          <></>
        )}
        <SeparadorEspacio />
        {/* {!seleccionHuella && ( */}
        <CampoTexto
          id="campoContrasena"
          etiqueta={diccionario.etiquetaContrasena}
          esContrasena={nuevaContrasenaVisible}
          marcador="Ingresa tu contraseña"
          // eslint-disable-next-line react/jsx-boolean-value
          marginTop={true}
          icono={
            nuevaContrasenaVisible ? contrasenaNoVisible : contrasenaVisible
          }
          enCambio={alCambiarContrasena}
          foco={focoContrasena}
          valor={valores.contrasena}
          enClickIcono={() => {
            asignarNuevaContrasenaVisible(!nuevaContrasenaVisible);
          }}
        />
        {/* )} */}
        {bloqueoUsuario && intentosRestantes > 0 && (
          <MensajeError id="errorUsuario" style={{ marginTop: "15px" }}>
            Intentos de acceso antes de bloquear el usuario: {intentosRestantes}
          </MensajeError>
        )}
        {intentosRestantes === 0 && (
          <MensajeError id="errorUsuario" style={{ marginTop: "15px" }}>
            Usuario bloqueado
          </MensajeError>
        )}
        {/* <Switch
          {...switchDomiciliacion}
          handleChange={handleChangeSwitch}
          estilo={{ justifyContent: "flex-start", paddingTop: "15px" }}
          iconoHuella
          texto={false}
        /> */}
        <Instrucciones
          id="enlaceOlvideContrasena"
          style={{ marginTop: "20px" }}
          enlacePrincipal
          centrado
          onClick={() => {
            history.push("/contrasena-olvidada");
          }}
        >
          {diccionario.linkOlvideContrasena}
        </Instrucciones>
        {!showConfig.showKeycloak ? (
          <Boton
            ref={btnRef}
            etiqueta={diccionario.etiquetaEntrar}
            tema={btnTema}
            id="botonIngresar"
            enClick={() => {
              alDarClickEnEntrar();
            }}
          />
        ) : (
          <>
            <Boton
              ref={btnRef}
              etiqueta={diccionario.etiquetaEntrar}
              tema={btnTema}
              id="botonIngresar"
              enClick={() => {
                alDarClickEnEntrar();
              }}
            />
            <ContenedorBoton>
              {!registraBiosExistente ? (
                <Boton
                  etiqueta={diccionario.etiquetaEntrarHuella2}
                  tema={btn2Tema}
                  id="botonIngresarHuella2"
                  enClick={() => {
                    autenticarHuella();
                  }}
                  icono={icono}
                />
              ) : (
                <></>
              )}
            </ContenedorBoton>
          </>
        )}
      </ContenedorPantallaBienvenida>
    </Fragment>
  );
};

PantallaIngresoUsuario.propTypes = {
  asignarValorMostrarPantallaIngreso: PropTypes.func,
  asignarValorFocoContrasena: PropTypes.func,
  asignarValorFocoUsuario: PropTypes.func,
  asignarValorMostrarAlertaBometricosNoRegistrados: PropTypes.func,
  asignarValorMostrarPantallaIngresoUsernameBiometrico: PropTypes.func,
  asignarValorRegistraBiosExistente: PropTypes.func,
  cargando: PropTypes.bool,
  asignarValorCargando: PropTypes.func,
  focoUsuario: PropTypes.string,
  focoContrasena: PropTypes.string,
  iniciarSesionMutation: PropTypes.func,
  iniciarSesionBiometrico: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  valores: PropTypes.object,
  bloqueoUsuario: PropTypes.bool,
  mostrarPantallaIngreso: PropTypes.bool,
  intentosRestantes: PropTypes.number,
  registraBiosExistente: PropTypes.bool,
};

PantallaIngresoUsuario.defaultProps = {
  asignarValorMostrarPantallaIngreso: () => {},
  asignarValorFocoContrasena: () => {},
  asignarValorFocoUsuario: () => {},
  asignarValorMostrarAlertaBometricosNoRegistrados: () => {},
  asignarValorMostrarPantallaIngresoUsernameBiometrico: () => {},
  asignarValorRegistraBiosExistente: () => {},
  cargando: false,
  asignarValorCargando: () => {},
  focoUsuario: "",
  focoContrasena: "",
  iniciarSesionMutation: () => {},
  iniciarSesionBiometrico: () => {},
  valores: {},
  bloqueoUsuario: false,
  mostrarPantallaIngreso: false,
  intentosRestantes: 3,
  registraBiosExistente: false,
};

export default PantallaIngresoUsuario;

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
/* eslint-disable no-lonely-if */
import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import { v4 } from "uuid";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import {
  Cuerpo,
  ContenedorIcono,
  TextoEncabezado,
  TextoCuerpo,
  ContenedorBotones,
  AlertaContenedorSegundoBoton,
} from "./PantallaRegistroUsuarioBiometrico.styled";
import TrianguloAlerta from "../../../recursos/iconos/hdi-c/domiciliar/cancelar.svg";
import ImagenBiometrico from "../../../recursos/iconos/hdi-c/biometricos/biometrico1.svg";
import Boton from "../../boton";
import { registerSecurityKey } from "../../../utils/crear-credenciales-passkey/CrearCredencialPasskey";
import IndicadorCarga from "../../indicador-carga";
import { Alerta } from "../../alerta";

const REGISTRAR_KEYCREDENTIAL = loader(
  "../../../graphQL/mutation/seguridad/RegisterKeyCredential.graphql"
);

const diccionario = {
  encabezado: "Biometricos",
  encabezadoCuerpo: "Verifica tu identidad",
  cuerpo:
    "Para continuar es necesario que valides tus datos biométricos, ya sea, Huella, Face ID o Patrón.",
};
const configAlertConfirmacion = {
  textoEncabezado: "Información registrada",
  tipoIcono: "palomita",
  colorAlerta: "verde",
  textoCuerpo: "Ahora podrás ingresar con tus datos biometricos a HDI Contigo",
  etiquetaBoton: "Aceptar",
};

const configAlertError = {
  textoEncabezado: "Error",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "verde",
  textoCuerpo: "Hubo un error inténtalo más tarde.",
  etiquetaBoton: "Aceptar",
};

const PantallaRegistroUsuario = () => {
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const history = useHistory();

  const [cargando, asignarValorCargando] = useState(false);
  const [alertaConfirmacion, setAlertaConfirmacion] = useState(false);
  const [alertaError, setAlertaError] = useState(false);
  const [informacionContacto, asignarValorInformacionContacto] = useState(
    estadoApp && estadoApp.informacionContacto
      ? estadoApp.informacionContacto
      : {
          telefono: "",
          email: "",
          token: "",
        }
  );
  const [registrarKeycredential, { data, loading, error }] = useMutation(
    REGISTRAR_KEYCREDENTIAL
  );

  const pedirPasskey = () => {
    const crearCredenciales = async () => {
      try {
        // const publicKeyCredentialId = await registerSecurityKey(telefono);
        const publicKeyCredentialId = await registerSecurityKey(
          informacionContacto.telefono
        );

        if (publicKeyCredentialId) {
          registrarKeycredential({
            variables: {
              usuario: informacionContacto.telefono,
              token: informacionContacto.token,
              publicKeyCredentialId,
            },
          });
        }
      } catch (errorCredentials) {
        console.error(
          "Error registrando la clave de seguridad",
          errorCredentials
        );
      }
    };

    crearCredenciales();
  };

  useEffect(() => {
    if (!loading && data) {
      if (
        data.RegisterKeyCredential &&
        data.RegisterKeyCredential.dato &&
        data.RegisterKeyCredential.completado
      ) {
        dispatch({
          type: "AGREGAR",
          valor: false,
          indice: "registraBiometricosExistente",
        });
        setAlertaConfirmacion(true);
      } else {
        if (data.RegisterKeyCredential && data.RegisterKeyCredential.mensaje) {
          console.log(data.RegisterKeyCredential.mensaje);
          setAlertaError(true);
        }
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
      setAlertaError(false);
      // asignarValorMensajeAlerta(
      //   "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      // );
    }
  }, [loading, data, error]);

  return (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        mostrarBotonRegresar={false}
        titulo={diccionario.encabezado}
        // funcionRegresar={() => {
        // }}
      />
      <Alerta
        {...configAlertConfirmacion}
        mostrarModal={alertaConfirmacion}
        funcionLlamadaBoton={() => {
          history.push("/mis-polizas");
        }}
        manejarCierre={() => {
          history.push("/mis-polizas");
        }}
      />
      <Alerta
        {...configAlertError}
        mostrarModal={alertaError}
        funcionLlamadaBoton={() => {
          setAlertaError(false);
        }}
        manejarCierre={() => {
          setAlertaError(false);
        }}
      />
      <Pantalla id="pantalla">
        <Cuerpo id="cuerpo" margenMinimo>
          <ContenedorIcono id="icono" tipo="contigo">
            <img alt="imagen" src={ImagenBiometrico} />
          </ContenedorIcono>
          <TextoEncabezado id="encabezado">
            {diccionario.encabezadoCuerpo}
          </TextoEncabezado>
          <TextoCuerpo id="texto">{diccionario.cuerpo}</TextoCuerpo>
          <ContenedorBotones id="alertaBotones">
            <Boton
              etiqueta="Continuar"
              tema="estandar"
              enClick={pedirPasskey}
            />
            <AlertaContenedorSegundoBoton>
              <Boton
                etiqueta="En otro momento"
                tema="simple"
                enClick={() => {
                  history.push("/mis-polizas");
                }}
              />
            </AlertaContenedorSegundoBoton>
          </ContenedorBotones>
        </Cuerpo>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};
export default PantallaRegistroUsuario;

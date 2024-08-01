/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { loader } from "graphql.macro";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { v4 } from "uuid";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo,
  ContenedorBoton,
  MensajePequeno,
  MensajeError,
  SeparadorEspacio,
  EnvolvedorFormulario,
  ContenedorCampo,
  InstruccionesSMS,
  CuentaRegresiva,
} from "./PantallaRegistroUsuarioSMS.styled";
import IndicadorCarga from "../../indicador-carga";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import Constantes from "../../../recursos/constantes";
import useAccionesLog from "../../../utils/useAccionesLog";
import { EtiquetaNegro } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import { Alerta } from "../../alerta";
import showConfig from "../../../utils/configs";

const EDITAR_PERFIL = loader(
  "../../../graphQL/mutation/seguridad/editar_perfil.graphql"
);

const diccionario = {
  encabezado: "Registro",
  reenvio: "¡Listo! Te hemos reenviado un SMS.",
  tiempoLimite: "Por favor espera unos segundos más e inténtalo de nuevo.",
  titulo: "Hemos enviado un código de verificación al número con terminación: ",
  formatoNumero: "*** ***",
  etiquetas: {
    codigoSMS: "Ingresa el código que te hemos mandado",
    reenviarSMS: "Volver a enviar el código",
  },
  errores: {
    codigo: "El código no es correcto",
  },
  btnContinuar: "Continuar",
};
const valores = {
  codigo: ["", "", "", ""],
};

const nombreCookie = Constantes.nombreDeCookie;

const ASIGNAR_CREDENCIALES = loader(
  "../../../graphQL/mutation/seguridad/asignacion_credenciales.graphql"
);

const REENVIAR_CODIGO = loader(
  "../../../graphQL/query/seguridad/reenviar_codigo_activacion.graphql"
);

const PantallaRegistroUsuarioSMS = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  // const usuario = objetoCookie ? objetoCookie.Usuario : "usuario";
  const token = objetoCookie ? objetoCookie.access_token : "token";
  const configAlert = {
    textoEncabezado: "Confirmación de registro",
    tipoIcono: "palomita",
    colorAlerta: "verde",
    textoCuerpo: "Tu cuenta ha sido creada.",
    etiquetaBoton: "Continuar",
  };
  const configAlertBiometrico = {
    textoEncabezado: "Ingreso Biométrico",
    tipoIcono: "palomita",
    colorAlerta: "verde",
    textoCuerpo:
      "Recuerda que puedes habilitar el ingreso biométrico en la sección 'Mi cuenta' o al volver a ingresar a la aplicación.",
    etiquetaBoton: "Aceptar",
    etiquetaBoton2: "En otro momento",
  };
  const { telefono } = location.state;
  const [focoCodigo, asignarValorFocoCodigo] = useState("");
  const [errorCodigo, asignarValorErrorCodigo] = useState("");
  const [puedeContinuar, asignarValorPuedeContinuar] = useState(false);
  const [puedeReenviar, asignarValorPuedeReenviar] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);
  const [asignarCredenciales, { data, loading }] =
    useMutation(ASIGNAR_CREDENCIALES);
  const { runCancelLog, runSuccesLog } = useAccionesLog(telefono);
  const [reenviarCodigo, { loadingCodigo, errorCodigoSMS, dataCodigo }] =
    useLazyQuery(REENVIAR_CODIGO, {
      fetchPolicy: "cache-and-network",
    });
  const [mostrarCuenta, asignarValorMostrarCuenta] = useState(false);
  const [cuentaRegresiva, setCuentaRegresiva] = useState("");
  const [alertaCall, setAlertaCall] = useState(false);
  const [alertaCallBiometrico, setAlertaCallBiometrico] = useState(false);
  const [editarPerfil, { loadingE, errorE, dataE }] =
    useMutation(EDITAR_PERFIL);

  useEffect(() => {
    asignarValorPuedeReenviar(!puedeContinuar);
  }, [puedeContinuar]);

  const alCambiarCodigo = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      const { codigo } = valores;
      const indice = Number(evento.target.dataset.indice);
      codigo[indice] = valor;
      valores.codigo = codigo;
      if (valores.codigo.join("").length < 4) {
        asignarValorPuedeReenviar(true);
        asignarValorPuedeContinuar(false);
      }
      if (valores.codigo.join("").length === 4) {
        asignarValorPuedeReenviar(false);
        asignarValorMostrarCuenta(false);
        setCuentaRegresiva("");
        asignarValorPuedeContinuar(true);
      }
    }
  };

  const confirmarCodigo = () => {
    if (puedeContinuar) {
      asignarCredenciales({
        variables: {
          codigoActivacion: valores.codigo.join(""),
          contrasenaNueva: `${estadoApp.datosUsuarioCobranza.contrasenia}`,
          verificarCodigoActivacion: true,
          contrasenaActual: `${estadoApp.datosUsuarioCobranza.contrasenia}_1`,
          token,
          usuario: telefono,
        },
      });
    }
  };

  const confirmaBiometrico = () => {
    setAlertaCallBiometrico(false);
    history.push("/registro-usuario-biometrico");
  };

  const reenviarSMS = () => {
    if (estadoApp.envioSMS !== undefined) {
      if (Date.now() > estadoApp.envioSMS + 60000) {
        setCuentaRegresiva(diccionario.reenvio);
        dispatch({
          type: "AGREGAR",
          valor: Date.now(),
          indice: "envioSMS",
        });
        reenviarCodigo({
          variables: { token, usuario: telefono },
        });
      } else {
        asignarValorMostrarCuenta(true);
        setCuentaRegresiva(diccionario.tiempoLimite);
      }
    } else {
      setCuentaRegresiva(diccionario.reenvio);
      dispatch({
        type: "AGREGAR",
        valor: Date.now(),
        indice: "envioSMS",
      });
      reenviarCodigo({
        variables: { token, usuario: telefono },
      });
    }
  };

  useEffect(() => {
    if (estadoApp.envioSMS !== undefined) {
      if (Date.now() > estadoApp.envioSMS + 60000) {
        reenviarSMS();
      } else {
        // asignarValorMostrarCuenta(true);
      }
    } else {
      reenviarSMS();
    }
    /*
    
    dispatch({
      type: "AGREGAR",
      valor: Date.now(),
      indice: "envioSMS",
    });
    */
  }, []);

  useEffect(() => {
    if (focoCodigo.length > 0) {
      asignarValorCargando(false);
    }
  }, [focoCodigo]);

  useEffect(
    () => () => {
      runCancelLog(3);
    },
    []
  );

  useEffect(() => {
    if (
      !loadingCodigo &&
      dataCodigo &&
      dataCodigo.reenviar_codigo_activacion &&
      dataCodigo.reenviar_codigo_activacion.completado
    ) {
      asignarValorCargando(false);
    } else if (errorCodigoSMS) {
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [dataCodigo, loadingCodigo, errorCodigoSMS]);

  useEffect(() => {
    if (!loading && data) {
      asignarValorCargando(false);
      if (
        data &&
        data.asignacion_credenciales &&
        data.asignacion_credenciales.completado
      ) {
        // console.log("data");
        // console.log(data);
        if (
          data.asignacion_credenciales.dato.respuesta ===
          "Hemos mandado el codigo de activación por sms"
        ) {
          // NOTE: Se ha enviado el sms
        } else if (
          data.asignacion_credenciales.dato.respuesta ===
          "Credenciales asignadas  de forma correcta"
        ) {
          if (!showConfig.showKeycloak) {
            runSuccesLog(3);
            dispatch({
              type: "AGREGAR",
              valor: true,
              indice: "usuarioValidado",
            });
            setAlertaCall(true);
            // history.push("/mis-polizas");
          } else {
            setAlertaCallBiometrico(true);
          }
        }
      } else if (
        data &&
        data.asignacion_credenciales &&
        !data.asignacion_credenciales.completado
      ) {
        asignarValorCargando(true);
        asignarValorFocoCodigo("error");
        const splited = data.asignacion_credenciales.mensaje.split(":");
        if (splited.length > 1) {
          asignarValorErrorCodigo(splited[1]);
        } else {
          asignarValorErrorCodigo(splited[0]);
        }
      }
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading]);
  return (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={diccionario.encabezado}
        mostrarBotonRegresar={false}
      />
      <Alerta
        {...configAlert}
        mostrarModal={alertaCall}
        funcionLlamadaBoton={() => {
          history.push("/mis-polizas");
        }}
        manejarCierre={() => {
          history.push("/mis-polizas");
        }}
      />
      <Alerta
        {...configAlertBiometrico}
        mostrarModal={alertaCallBiometrico}
        funcionLlamadaBoton={confirmaBiometrico}
        funcionLlamadaBoton2={() => {
          history.push("/mis-polizas");
        }}
        manejarCierre={() => {
          history.push("/mis-polizas");
        }}
      />
      <Pantalla>
        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        <MensajePequeno id="mensajePequeno">
          {`${diccionario.formatoNumero} ${telefono.substring(6, 11)}`}
        </MensajePequeno>
        <SeparadorEspacio />
        <EnvolvedorFormulario>
          <ContenedorCampo>
            <EtiquetaNegro>{diccionario.etiquetas.codigoSMS}</EtiquetaNegro>
            <CampoTexto
              // etiqueta={diccionario.etiquetas.codigoSMS}
              esSerie
              enCambio={alCambiarCodigo}
              foco={focoCodigo}
              valores={valores.codigo}
              id="campoCodigoSMS"
            />
            {errorCodigo !== "" && (
              <MensajeError id="errorCodigo">{errorCodigo}</MensajeError>
            )}
            <InstruccionesSMS
              id="enlaceReenviarSMS"
              disabled={puedeReenviar}
              onClick={() => reenviarSMS()}
            >
              {diccionario.etiquetas.reenviarSMS}
            </InstruccionesSMS>
            {mostrarCuenta ? (
              <CuentaRegresiva content={cuentaRegresiva}>
                {cuentaRegresiva}
              </CuentaRegresiva>
            ) : null}
          </ContenedorCampo>
          <SeparadorEspacio />
          <ContenedorBoton>
            <Boton
              etiqueta={diccionario.btnContinuar}
              tema="estandar"
              deshabilitado={!puedeContinuar}
              // deshabilitado={puedeContinuar}
              enClick={confirmarCodigo}
              // enClick={() => {
              //   setAlertaCall(true);
              // }}
            />
          </ContenedorBoton>
        </EnvolvedorFormulario>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};
export default PantallaRegistroUsuarioSMS;

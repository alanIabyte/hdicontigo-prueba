/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import { EtiquetaNegro } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
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
} from "../../pantalla-registro-usuario-sms/pantalla-registro-usuario-sms-component/PantallaRegistroUsuarioSMS.styled";
import { IRespuestaSMS, IValidarCodigo } from "./interfaces/IResponseSMS";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
import { IResultadoBusqueda } from "../../pantalla-recuperar-poliza/pantalla-recuperar-poliza-componente/Interface";

const ENVIAR_CODIGO = loader(
  "../../../graphQL/mutation/busqueda/busqueda_enviarCodigo.graphql"
);

const VALIDAR_CODIGO = loader(
  "../../../graphQL/mutation/busqueda/busqueda_validarCodigo.graphql"
);

export type RecuperarPolizaRsp = {
  phone: string;
  rfc: string;
  esCasa: boolean;
};

type IState = {
  policy?: string;
  datos: RecuperarPolizaRsp;
  policies: IResultadoBusqueda[];
  claim: string;
};

const valores = {
  codigo: "",
};

const PantallaEnviarSMS = () => {
  // States
  const [errorCodigo, setErrorCodigo] = useState("");
  const [puedeReenviar, asignarValorPuedeReenviar] = useState(false);
  const [puedeContinuar, asignarValorPuedeContinuar] = useState(false);
  const [focoCodigo, asignarValorFocoCodigo] = useState("");
  const [codigoIdRespuesta, setCodigoIdRespuesta] = useState<number>();
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [mostrarBarraAlerta, setMostrarBarraAlerta] = useState(false);
  const [estadoCargando, setEstadoCargando] = useState(false);
  const [codigo, setCodigo] = useState(false);

  // Redux state
  const estadoApp = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation<IState>();
  const { datos, policies, claim } = location.state;

  const [enviarSMS, { data, loading, error }] =
    useMutation<IRespuestaSMS>(ENVIAR_CODIGO);

  const [
    validarCodigoMutation,
    {
      data: dataValidarCodigo,
      loading: loadingValidarCodigo,
      error: errorValidarCodigo,
    },
  ] = useMutation<IValidarCodigo>(VALIDAR_CODIGO);

  // Send SMS
  if (!datos.phone) {
    history.goBack();
  }

  const sendSMS = () => {
    // TODO: Llamar servicio para enviar SMS
    asignarValorPuedeReenviar(!puedeReenviar);
    enviarSMS({
      variables: {
        rfc: datos.rfc,
        esCasa: datos.esCasa,
      },
    });
  };

  const validarCodigo = () => {
    setEstadoCargando(true);
    validarCodigoMutation({
      variables: {
        codigoId: codigoIdRespuesta,
        codigo,
      },
    });
  };

  const onChangeValue = (e: any) => {
    const valor = e.target.value;
    setCodigo(e.target.value);
    valores.codigo = e.target.value;
    if (valor.length === 4) {
      asignarValorPuedeContinuar(true);
    }

    // if (valor.length < 4 || !Number.isNaN(valor)) {
    //   asignarValorPuedeContinuar(false);
    // }
  };

  // Al iniciar el componente, enviamos el SMS
  useEffect(() => {
    sendSMS();
  }, []);

  // useEffect para el envio del código SMS
  useEffect(() => {
    if (!loading && !data?.busqueda_enviarCodigo.completado) {
      if (
        data?.busqueda_enviarCodigo.mensaje ===
        "No se ha podido validar el código de verificación."
      ) {
        setMostrarBarraAlerta(true);
        setEstadoCargando(false);
        setMensajeAlerta(
          data?.busqueda_enviarCodigo.mensaje || "Intenta de nuevo."
        );
        asignarValorPuedeReenviar(true);
        return;
      }
    }

    if (!loading && data?.busqueda_enviarCodigo.codigo === "IDOPO100009") {
      setMostrarBarraAlerta(true);
      setEstadoCargando(false);
      setMensajeAlerta(
        data?.busqueda_enviarCodigo.mensaje || "Intenta de nuevo."
      );
      asignarValorPuedeReenviar(true);
      return;
    }

    if (!loading && data?.busqueda_enviarCodigo.completado) {
      const resp = data.busqueda_enviarCodigo.dato;
      console.log(resp);
      const { codigoId, minutosExpiracion } = resp;
      setEstadoCargando(false);
      setCodigoIdRespuesta(codigoId);
      setTimeout(() => {
        asignarValorPuedeReenviar(!puedeReenviar);
      }, 300000);
    }

    if (!loading && error) {
      setEstadoCargando(false);
      setMostrarBarraAlerta(true);
      setMensajeAlerta("Intenta de nuevo.");
    }
  }, [data, loading, error]);

  // useEffect para validar el código SMS
  useEffect(() => {
    if (loadingValidarCodigo) {
      setEstadoCargando(true);
    }

    if (!loadingValidarCodigo && errorValidarCodigo) {
      setEstadoCargando(false);
      setMostrarBarraAlerta(true);
      setMensajeAlerta("No se ha podido validar el código.");
    }

    if (
      !loadingValidarCodigo &&
      dataValidarCodigo?.busqueda_validarCodigo.mensaje ===
        "No se ha podido validar el código de verificación."
    ) {
      setEstadoCargando(false);
      setMostrarBarraAlerta(true);
      setMensajeAlerta("Por favor verifica que el código sea el correcto.");
    }

    if (
      !loadingValidarCodigo &&
      dataValidarCodigo?.busqueda_validarCodigo.completado
    ) {
      setEstadoCargando(false);
      const resp = data?.busqueda_enviarCodigo.dato;
      if (resp) {
        history.push("/seleccionar-poliza-recuperar", { policies, claim });
      }
    }
  }, [dataValidarCodigo, loadingValidarCodigo, errorValidarCodigo]);

  return (
    <EnvolvedorPantalla key="pantalla-enviar-sms">
      {estadoCargando && <IndicadorCarga pantallaCompleta />}
      <Encabezado
        titulo="Buscar póliza"
        funcionCerrar={() => {
          history.goBack();
        }}
      />
      <Pantalla>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            setMostrarBarraAlerta(false);
          }}
          estilo="error"
          posicionAbsoluta
        />
        <Titulo>
          Hemos enviado un código de verificación al número con terminación:
        </Titulo>
        <MensajePequeno>*** *** {datos.phone}</MensajePequeno>

        <SeparadorEspacio />

        <EnvolvedorFormulario>
          <ContenedorCampo>
            <EtiquetaNegro>Ingresa el código:</EtiquetaNegro>
            <CampoTexto
              enCambio={onChangeValue}
              valores={valores.codigo}
              foco={focoCodigo}
              id="campoCodigoSMS"
            />
            {errorCodigo !== "" && (
              <MensajeError id="errorCodigo">{errorCodigo}</MensajeError>
            )}
            <InstruccionesSMS
              id="enlaceReenviarSMS"
              disabled={puedeReenviar}
              onClick={() => sendSMS()}
            >
              Volver a enviar código
            </InstruccionesSMS>
          </ContenedorCampo>
          <SeparadorEspacio />

          <Boton
            etiqueta="Continuar"
            tema="estandar"
            deshabilitado={!puedeContinuar}
            enClick={validarCodigo}
          />
          <Boton
            etiqueta="Llamar a HDI"
            tema="simple"
            enClick={() => {
              window.open("tel:*434");
            }}
          />
        </EnvolvedorFormulario>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaEnviarSMS;

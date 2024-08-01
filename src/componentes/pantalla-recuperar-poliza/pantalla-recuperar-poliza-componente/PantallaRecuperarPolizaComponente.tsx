/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
// su
import { useLazyQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { validarRFC } from "../../../helpers";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import BarraAlerta from "../../barra-alerta";
import Boton from "../../boton/boton-componente/Boton";
import CampoTexto from "../../campo-texto";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import IndicadorCarga from "../../indicador-carga";
import { ParrafoAlerta } from "../../pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled";
import {
  ContenedorBoton,
  MensajePequeno,
  Titulo,
} from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import {
  CampoRFC,
  MensajeError,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import { SeleccionarPolizaComponente } from "../../seleccionar-poliza/seleccionar-poliza-componente/SeleccionarPolizaComponente";
import { IBuscarPolizasRespGrl, IResultadoBusqueda } from "./Interface";
import { diccionario } from "./utils";
import { TextoSeguirLeyendo } from "../../declaracion/declaracion-componente/Declaracion.styled";

const valores = {
  rfc: "",
};

type IState = {
  policy: string;
  claim: string;
};

const BUSCAR_POLIZAS = loader(
  "../../../graphQL/query/busqueda/busqueda_buscarPolizas.graphql"
);

const PantallaRecuperarPolizaComponente = () => {
  const history = useHistory();
  const location = useLocation<IState>();
  const estadoApp = useState((state: any) => state);
  const { claim } = location.state;
  const configSendCodeAlert = {
    textoEncabezado: "Ayudanos a proteger tu información",
    tipoIcono: "",
    textoCuerpo: "",
    etiquetaBoton: "Enviar código",
    etiquetaBoton2: "Llamar a HDI",
    temaBoton2: "simple",
  };

  const configRFCInvalid = {
    textoEncabezado: "RFC Incorrecto",
    tipoIcono: "trianguloAlerta",
    colorAlerta: "rojo",
    textoCuerpo:
      "No encontramos ninguna póliza vinculada al RFC ingresado, considera que es necesario que este haya sido utilizado al emitir la póliza.",
    etiquetaBoton: "Llamar a HDI *434",
    etiquetaBoton2: "Reintentar",
    temaBoton2: "simple",
  };

  const alertSendCode = useAlerta(configSendCodeAlert);
  const [buscarPolizas, { loading, data, error }] =
    useLazyQuery<IBuscarPolizasRespGrl>(BUSCAR_POLIZAS, {
      fetchPolicy: "no-cache",
    });
  const [policyType, setPolicyType] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [foundPolicies, setFoundPolicies] = useState<IResultadoBusqueda[]>([]);
  const [valorFocoRFC, asignarValorFocoRFC] = useState("");
  const [errorRFC, asignarErrorRFC] = useState(false);
  const [partialNumber, setPartialNumber] = useState("");
  const [datos, setDatos] = useState({
    phone: "",
    rfc: "",
    esCasa: false,
  });
  const [puedeContinuar, setPuedeContinuar] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [alertaRFCIncorrecto, setAlertaRFCIncorrecto] = useState(false);
  const [barraAlerta, setBarraAlerta] = useState(false);

  useEffect(() => {
    if (location?.state?.policy) {
      setPolicyType(location?.state?.policy || "");
      setShowInput(true);
    }
  }, []);

  const persistRFC = () => {
    const { rfc } = valores;
    valores.rfc = rfc;
  };

  const onChangeRFC = (event: any) => {
    const { value } = event.target;
    valores.rfc = value;
    if (value.length >= 10 && value.length < 15) {
      setPuedeContinuar(true);
    }

    if (value.length < 10) {
      setPuedeContinuar(false);
    }
  };

  const redirectNotKnownPhone = () => {
    history.push("/seleccionar-numero", { foundPolicies, datos });
  };

  const validate = () => {
    persistRFC();

    // if (validarRFC.length > 0) {
    //   asignarErrorRFC(false);
    //   asignarValorFocoRFC(valores.rfc);
    // }

    // validarRFC(valores.rfc).then((rsp) => {
    //   asignarValorFocoRFC(rsp.foco);
    //   asignarErrorRFC(rsp.error);
    // });

    // TODO: Llamar servicio para recuperar numero de telefono
    datos.rfc = valores.rfc;
    setLoadingState(true);
    buscarPolizas({
      variables: {
        lineaNegocio: "AUTR",
        rfc: valores.rfc,
      },
    });
  };

  useEffect(() => {
    if (!loading && error) {
      console.log("hay error");
      setLoadingState(false);
      setBarraAlerta(true);
      return;
    }

    if (!loading && !data?.busqueda_buscarPolizas.completado) {
      const mensaje = data?.busqueda_buscarPolizas.mensaje;
      if (
        mensaje ===
        "No se encontraron pólizas con los parametros proporcionados."
      ) {
        setLoadingState(false);
        setAlertaRFCIncorrecto(true);
      }
    }

    if (
      !loading &&
      !data?.busqueda_buscarPolizas.completado &&
      data?.busqueda_buscarPolizas.mensaje === "Excepcion"
    ) {
      setLoadingState(false);
      setBarraAlerta(true);
      return;
    }

    if (!loading && data?.busqueda_buscarPolizas.completado) {
      const resp = data.busqueda_buscarPolizas.dato;
      const { telefonoCasa, telefonoOficina } = resp[0];

      if (true) {
        if (telefonoCasa !== "" && !telefonoOficina) {
          setPartialNumber(telefonoCasa);
          setDatos({
            ...datos,
            phone: telefonoCasa,
            esCasa: true,
          });
        }

        if (!telefonoCasa && telefonoOficina !== "") {
          setPartialNumber(telefonoOficina);
          setDatos({
            ...datos,
            phone: telefonoCasa,
            esCasa: false,
          });
        }
      } else {
        const telefonoDebug = "4281034105";
        setPartialNumber(telefonoDebug);
        setDatos({
          ...datos,
          phone: telefonoDebug,
          esCasa: false,
        });
      }

      setFoundPolicies(resp);
      setLoadingState(false);
      // alertSendCode.actualizar(updatedConfig);
      alertSendCode.mostrar();
    }
  }, [loading, data, error]);

  const sendCode = () => {
    history.push("/enviar-sms", {
      datos,
      policies: foundPolicies,
      claim,
    });
  };

  return (
    <>
      {!showInput && (
        <SeleccionarPolizaComponente
          setShowInput={setShowInput}
          setPolicyType={setPolicyType}
        />
      )}

      <Alerta
        {...configRFCInvalid}
        mostrarModal={alertaRFCIncorrecto}
        funcionLlamadaBoton={() => {
          window.location.href = "tel:*434";
        }}
        funcionLlamadaBoton2={() => {
          setAlertaRFCIncorrecto(false);
        }}
        manejarCierre={() => setAlertaRFCIncorrecto(false)}
      />
      <Alerta
        {...alertSendCode}
        funcionLlamadaBoton={() => {
          sendCode();
        }}
        funcionLlamadaBoton2={() => {
          window.location.href = "tel:*434";
        }}
        manejarCierre={() => {
          alertSendCode.cerrar();
        }}
      >
        <br />{" "}
        <ParrafoAlerta>
          Para confirmar que eres tú, te enviaremos un SMS con un código de
          verificación al número telefónico con la siguiente terminación:{" "}
          <b>*** *** {partialNumber}</b>
        </ParrafoAlerta>
        <TextoSeguirLeyendo
          style={{
            textDecorationLine: "underline",
            marginTop: "2rem",
            marginBottom: "2rem",
            fontSize: "19px",
          }}
        >
          No reconozco este número de teléfono
        </TextoSeguirLeyendo>
      </Alerta>

      {showInput && (
        <EnvolvedorPantalla key="pantalla-recuperar-poliza">
          <Encabezado
            titulo="Búscar póliza"
            funcionCerrar={() => {
              history.goBack();
            }}
          />
          <Pantalla>
            <BarraAlerta
              etiqueta="Ha ocurrido un error. Intentalo de nuevo."
              mostrarAlerta={barraAlerta}
              estilo="error"
              manejarCierre={() => {
                setBarraAlerta(false);
              }}
              fijo
            />
            {loadingState && <IndicadorCarga pantallaCompleta />}

            <Titulo>{diccionario.title}</Titulo>
            <MensajePequeno>{diccionario.desc}</MensajePequeno>

            <CampoRFC style={{ marginTop: "20px" }}>
              <CampoTexto
                id="campoRFC"
                domiciliacion
                etiqueta={diccionario.etiquetaRFC}
                enCambio={onChangeRFC}
                foco={valorFocoRFC}
                valor={valores.rfc}
                marcador="Ejemplo: AEFF661115DY2"
                numeroDeCaracteres={13}
                expresionRegular={/(^[0-9a-zA-Z&Ññ]+$|^$)/}
              />
            </CampoRFC>
            {errorRFC && (
              <MensajeError>
                Este campo es obligatorio para poder continuar.
              </MensajeError>
            )}

            <ContenedorBoton className="primer-boton">
              <Boton
                etiqueta="Buscar"
                tema="estandar"
                enClick={validate}
                deshabilitado={!puedeContinuar}
              />
            </ContenedorBoton>

            <Boton
              flot
              etiqueta=" Llamar a HDI "
              tema="estandar"
              enClick={() => {
                window.location.href = "tel:*434";
              }}
            />
          </Pantalla>
        </EnvolvedorPantalla>
      )}
    </>
  );
};

export default PantallaRecuperarPolizaComponente;

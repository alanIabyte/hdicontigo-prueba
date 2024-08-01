/* eslint-disable */
import React, { useState, useEffect, useRef, createRef } from "react";
import { findDOMNode } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { loader } from "graphql.macro";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  TituloCuestionarioReporte,
  MensajePequeno,
  CuerpoCuestionarioReporte,
  Check,
  ContenedorCheck,
  MensajeCheck,
} from "./PantallaCancelarGrua.styled";
import date from "date-and-time";
import IndicadorCarga from "../../indicador-carga";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import Constantes from "../../../recursos/constantes";
import { Alerta } from "../../alerta";

const CANCELAR_GRUA = loader(
  "../../../graphQL/mutation/grua/grua_cancelarReporteGrua.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

const PantallaCuestionarioReporte = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const btnRef = useRef();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    // history.push("/");
    console.log("No hay cookie");
  }

  const [cargando, asignarValorCargando] = useState(false);
  const [mostrarModalBlindado, asignarValorMostrarModalBlindado] =
    useState(false);
  const [mostrarModalCancelado, asignarValorMostrarModalCancelado] =
    useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.selectedOptions !== undefined
        ? estadoApp.cuestionarioReporte.selectedOptions
        : []
      : []
  );

  const diccionario = {
    tituloBarraProgreso: "Cancelar grúa",
    encabezado: "Cancelar grúa",
    mensajeAlerta: "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
    titulo: "Ya no necesitas el servicio.",
    mensajePequeno: "Cuéntanos el motivo que cancelaste la grúa",
    pregunta1: "Encendió el vehículo",
    pregunta2: "Me brindaron ayuda",
    pregunta3: "El tiempo de espera fue demasiado",
    pregunta4: "Por mi seguridad",
    etiquetaBoton: "Continuar",
    configAlertaBlindado: {
      textoEncabezado: "Cancelar grúa",
      tipoIcono: "trianguloAlerta",
      colorAlerta: "azul",
      etiquetaBoton: "Aceptar",
      textoCuerpo:
        "Estas a punto de cancelar la solicitud de tu grúa, y posiblemente cuente como una asistencia de tu póliza. <br><b>¿Quieres continuar?</b>",
      temaBoton: "rojo",
    },
    configAlertaCancelada: {
      textoEncabezado: "Grúa cancelada",
      tipoIcono: "palomita",
      etiquetaBoton: "Aceptar",
      textoCuerpo: "Se canceló la solicitud de tu grúa exitosamente.",
      temaBoton: "estandar",
    },
  };

  let btnTema = "deshabilitado";
  const claseBotonEstandar = "boton-estandar";
  const claseBotonDeshabilitado = "boton-deshabilitado";

  const deshabilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.remove(claseBotonEstandar);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.add(claseBotonDeshabilitado);
    }
  };

  const habilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.remove(claseBotonDeshabilitado);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.add(claseBotonEstandar);
    }
  };

  const [cancelarGruaM, { loading: loadingCG, data: dataCG, error: errorCG }] =
    useMutation(CANCELAR_GRUA);

  function cancelarGrua() {
    abrirBlindadoModal(false);
    asignarValorCargando(true);

    const FechaActual = new Date();
    const HoraActual = date.format(FechaActual, "YYYY/MM/DD HH:mm:ss");

    let motivoCancelacion;
    switch (selectedOptions) {
      case "option1":
        motivoCancelacion = diccionario.pregunta1;
        break;
      case "option2":
        motivoCancelacion = diccionario.pregunta2;
        break;
      case "option3":
        motivoCancelacion = diccionario.pregunta3;
        break;
      case "option4":
        motivoCancelacion = diccionario.pregunta4;
        break;
    }

    cancelarGruaM({
      variables: {
        anio: estadoApp.lineaTiempoReporteSiniestro.data.Modelo,
        marca: estadoApp.lineaTiempoReporteSiniestro.data.Modelo,
        motivoCancelacion: motivoCancelacion,
        horaCancelacion: HoraActual,
        nombreAsegurado:
          estadoApp.lineaTiempoReporteSiniestro.data.QuienReporta,
        numeroReporte: estadoApp.lineaTiempoReporteSiniestro.data.NumeroReporte,
        proveedorAsignado: "",
        numeroSerieVehiculo: "",
        telefonoAsegurado: estadoApp.lineaTiempoReporteSiniestro.data.Telefono,
        tipo: "",
      },
    });
  }

  function gruaCancelada() {
    abrirCanceladoModal(false);
    history.push("/pasos-progreso-grua");
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedOptions(name);
    } else {
      setSelectedOptions([]);
    }
  };

  useEffect(() => {
    if (!selectedOptions.length) {
      deshabilitarBoton();
      btnTema = "deshabilitado";
    } else {
      habilitarBoton();
      btnTema = "estandar";
    }
  }, [selectedOptions]);

  const abrirBlindadoModal = () => {
    asignarValorMostrarModalBlindado(!mostrarModalBlindado);
  };
  const abrirCanceladoModal = () => {
    asignarValorMostrarModalCancelado(!mostrarModalCancelado);
  };

  useEffect(() => {
    if (!loadingCG && dataCG) {
      console.log(dataCG);
      switch (dataCG.grua_cancelarReporteGrua.codigo) {
        case "IMGW10001":
          dispatch({
            type: "AGREGAR",
            valor: "CANCELADO",
            indice: "estatusReporte",
          });
          asignarValorCargando(false);
          abrirCanceladoModal(true);
          break;
        case "ERR00001":
          asignarValorCargando(false);
          break;
        default:
      }
    } else if (errorCG) {
      asignarValorCargando(false);
      asignarValorMostrarModalError(true);
    } else if (loadingCG) {
      asignarValorCargando(true);
    }
  }, [loadingCG, dataCG]);

  return (
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        {...diccionario.configAlertaBlindado}
        mostrarModal={mostrarModalBlindado}
        funcionLlamadaBoton={cancelarGrua}
        manejarCierre={() => {
          abrirBlindadoModal(false);
        }}
      />
      <Alerta
        {...diccionario.configAlertaCancelada}
        mostrarModal={mostrarModalCancelado}
        funcionLlamadaBoton={gruaCancelada}
        manejarCierre={() => {
          abrirCanceladoModal(false);
        }}
      />
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.push("/pasos-progreso-grua");
        }}
      />
      <Pantalla>
        <TituloCuestionarioReporte id="titulo">
          {diccionario.titulo}
        </TituloCuestionarioReporte>
        {/* {estadoApp.seatedClaim === "tow" && ( */}
        <MensajePequeno id="mensajePequeno">
          {diccionario.mensajePequeno}
        </MensajePequeno>
        {/* )} */}
        <CuerpoCuestionarioReporte>
          {/* {estadoApp.seatedClaim === "tow" && ( */}
          <>
            <ContenedorCheck>
              <MensajeCheck>{diccionario.pregunta1}</MensajeCheck>
              <Check
                name="option1"
                checked={selectedOptions.includes("option1")}
                onChange={handleCheckboxChange}
              />
            </ContenedorCheck>
            <ContenedorCheck>
              <MensajeCheck id="mensajeCheck">
                {diccionario.pregunta2}
              </MensajeCheck>
              <Check
                name="option2"
                checked={selectedOptions.includes("option2")}
                onChange={handleCheckboxChange}
              />
            </ContenedorCheck>
            <ContenedorCheck>
              <MensajeCheck>{diccionario.pregunta3}</MensajeCheck>
              <Check
                name="option3"
                checked={selectedOptions.includes("option3")}
                onChange={handleCheckboxChange}
              />
            </ContenedorCheck>
            <ContenedorCheck>
              <MensajeCheck>{diccionario.pregunta4}</MensajeCheck>
              <Check
                name="option4"
                checked={selectedOptions.includes("option4")}
                onChange={handleCheckboxChange}
              />
            </ContenedorCheck>
          </>
          {/* )} */}
        </CuerpoCuestionarioReporte>
        <Boton
          id="botonContinuar"
          ref={btnRef}
          tema={btnTema}
          etiqueta={diccionario.etiquetaBoton}
          enClick={() => {
            abrirBlindadoModal();
          }}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaCuestionarioReporte;

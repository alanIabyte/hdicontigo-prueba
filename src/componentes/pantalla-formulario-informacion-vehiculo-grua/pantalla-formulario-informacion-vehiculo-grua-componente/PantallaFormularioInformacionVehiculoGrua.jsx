/* eslint-disable */
import React, { useState, useEffect, useRef, createRef } from "react";
import { findDOMNode } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  SeparadorEncabezadoCuestionarioReporte,
  TituloCuestionarioReporte,
  CuerpoCuestionarioReporte,
  SeparadorCuestionarioReporte,
  MensajePequeno,
} from "./PantallaFormularioInformacionVehiculoGrua.styled";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import SeleccionCuestionario from "../../seleccion-cuestionario";
import Boton from "../../boton";
// import CampoTexto from "../../campo-texto";
import CampoTexto from "../../componentes-v2/campo-texto";
import Constantes from "../../../recursos/constantes";

const valores = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
};

const diccionario = {
  tituloBarraProgreso: "Causas de la asistencia",
  encabezado: "Asistencia de grúa",
  mensajeAlerta: "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
  titulo: "Completa la información del vehículo",
  mensajePequeno:
    "Para brindarte un servicio óptimo, necesitamos información adicional para enviarte la grúa adecuada a tu situación.",
  pregunta1: "Puede ponerse en neutral",
  pregunta2: "Puede avanzar sobre sus propias llantas",
  pregunta3: "Tiene carga",
  pregunta4: "Está a pie de calle",
  pregunta5: "Está en carretera",
  etiquetaBoton: "Siguiente",
  numeroElementos: 6,
  quienReporta: {
    id: "quienReporta",
    valor: "",
    etiqueta: "Nombre de quién reporta",
    marcador: "Ingresa el nombre de quien reporta",
    mensajeError: "Campo requerido para poder continuar.",
    numeroDeCaracteres: 60,
  },
  telefono: {
    id: "telefono",
    valor: "",
    etiqueta: "Teléfono",
    marcador: "Ejemplo: 47772361903",
    mensajeError: "Campo requerido para poder continuar.",
    numeroDeCaracteres: null,
    numeroDeCaracteres: 10,
  },
  placas: {
    id: "placas",
    valor: "",
    etiqueta: "Placas",
    marcador: "Ejemplo: AUI-PW8-B",
    mensajeError: "Campo requerido para poder continuar.",
    numeroDeCaracteres: null,
    numeroDeCaracteres: 10,
  },
  colorVehiculo: {
    id: "colorVehiculo",
    valor: "",
    etiqueta: "Color del vehículo",
    marcador: "Ingresa el color del vehículo",
    mensajeError: "Campo requerido para poder continuar.",
    numeroDeCaracteres: 60,
  },
  comoOcurrioSiniestro: {
    id: "comoOcurrioSiniestro",
    esAreaDeTexto: true,
    valor: "",
    etiqueta: "¿Como ocurrió el siniestro?",
    marcador: "Compártenos más detalle, por favor.",
    mensajeError: "Campo requerido para poder continuar.",
    numeroDeCaracteres: 250,
    numeroDeRenglones: 6,
  },
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaFormularioInformacionVehiculoGrua = () => {
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

  if (estadoApp.informacionVehiculo) {
    if (
      estadoApp.informacionVehiculo.quienReporta !== "" &&
      estadoApp.informacionVehiculo.quienReporta !== undefined
    ) {
      diccionario.quienReporta.valor =
        estadoApp.informacionVehiculo.quienReporta;
    }
    if (
      estadoApp.informacionVehiculo.telefono !== "" &&
      estadoApp.informacionVehiculo.telefono !== undefined
    ) {
      diccionario.telefono.valor = estadoApp.informacionVehiculo.telefono;
    }
    if (
      estadoApp.informacionVehiculo.placas !== "" &&
      estadoApp.informacionVehiculo.placas !== undefined
    ) {
      diccionario.placas.valor = estadoApp.informacionVehiculo.placas;
    }
    if (
      estadoApp.informacionVehiculo.colorVehiculo !== "" &&
      estadoApp.informacionVehiculo.colorVehiculo !== undefined
    ) {
      diccionario.colorVehiculo.valor =
        estadoApp.informacionVehiculo.colorVehiculo;
    }
    if (
      estadoApp.informacionVehiculo.comoOcurrioSiniestro !== "" &&
      estadoApp.informacionVehiculo.comoOcurrioSiniestro !== undefined
    ) {
      diccionario.comoOcurrioSiniestro.valor =
        estadoApp.informacionVehiculo.comoOcurrioSiniestro;
    }
  }
  const [respuesta1, asignarValorRespuesta1] = useState(
    estadoApp && estadoApp.informacionVehiculo !== undefined
      ? estadoApp.informacionVehiculo.respuesta1
      : null
  );
  const [respuesta2, asignarValorRespuesta2] = useState(
    estadoApp && estadoApp.informacionVehiculo !== undefined
      ? estadoApp.informacionVehiculo.respuesta2
      : null
  );
  const [respuesta3, asignarValorRespuesta3] = useState(
    estadoApp && estadoApp.informacionVehiculo !== undefined
      ? estadoApp.informacionVehiculo.respuesta3
      : null
  );
  const [respuesta4, asignarValorRespuesta4] = useState(
    estadoApp && estadoApp.informacionVehiculo !== undefined
      ? estadoApp.informacionVehiculo.respuesta4
      : null
  );
  const [respuesta5, asignarValorRespuesta5] = useState(
    estadoApp && estadoApp.informacionVehiculo !== undefined
      ? estadoApp.informacionVehiculo.respuesta5
      : null
  );
  const [FvgBtnTema, asignarValorFvgBtnTema] = useState(
    estadoApp && estadoApp.FvgBtnTema !== undefined
      ? estadoApp.FvgBtnTema
      : "deshabilitado"
  );

  if (estadoApp && estadoApp.nombreConductor) {
    valores.nombre = estadoApp.nombreConductor;
    valores.apellidoPaterno = estadoApp.apellidoPaterno;
    valores.apellidoMaterno = estadoApp.apellidoMaterno;
  }

  const [errorQuienReporta, asignaErrorQuienReporta] = useState("");
  const [focoQuienReporta, asignarValorfocoQuienReporta] = useState("");
  const [errorTelefono, asignaErrorTelefono] = useState("null");
  const [focoTelefono, asignarValorfocoTelefono] = useState("");
  const [errorPlacas, asignaErrorPlacas] = useState("");
  const [focoPlacas, asignarValorfocoPlacas] = useState("");
  const [errorColorVehiculo, asignaErrorColorVehiculo] = useState("");
  const [focoColorVehiculo, asignarValorColorVehiculo] = useState("");
  const [errorComoOcurrioSiniestro, asignaErrorComoOcurrioSiniestro] =
    useState(null);
  const [focoComoOcurrioSiniestro, asignarValorComoOcurrioSiniestro] =
    useState("");
  const [mensajeError1, asignarValorMensajeError1] = useState(null);
  const [mensajeError2, asignarValorMensajeError2] = useState(null);
  const [mensajeError3, asignarValorMensajeError3] = useState(null);
  const [mensajeError4, asignarValorMensajeError4] = useState(null);
  const [mensajeError5, asignarValorMensajeError5] = useState(null);

  let btnTema = "deshabilitado";
  const claseBotonEstandar = "boton-estandar";
  const claseBotonDeshabilitado = "boton-deshabilitado";

  const enCambioValidaBoton = (evento) => {
    if (evento) {
      const id = evento.target.id;
      const valor = evento.target.value;
      diccionario[id.split("-")[0]].valor = valor;

      if (
        valor &&
        diccionario.quienReporta.valor &&
        diccionario.telefono.valor &&
        diccionario.placas.valor &&
        diccionario.colorVehiculo.valor &&
        diccionario.comoOcurrioSiniestro.valor &&
        (respuesta1 !== null ||
          respuesta2 !== null ||
          respuesta3 !== null ||
          respuesta4 !== null ||
          respuesta5 !== null)
      ) {
        if (FvgBtnTema !== "estandar") {
          habilitarBoton();
          btnTema = "estandar";
        }
      } else {
        if (FvgBtnTema !== "deshabilitado") {
          deshabilitarBoton();
          btnTema = "deshabilitado";
        }
      }
      dispatch({
        type: "AGREGAR",
        valor: FvgBtnTema,
        indice: "FvgBtnTema",
      });
    }
  };

  const validacionRespuestas = () => {
    if (diccionario.quienReporta.valor === "") {
      asignarValorfocoQuienReporta("error");
      asignaErrorQuienReporta(diccionario.quienReporta.mensajeError);
    } else {
      asignarValorfocoQuienReporta("");
      asignaErrorQuienReporta("");
    }
    if (diccionario.telefono.valor === "") {
      asignarValorfocoTelefono("error");
      asignaErrorTelefono(diccionario.telefono.mensajeError);
    } else {
      asignarValorfocoTelefono("");
      asignaErrorTelefono("");
    }
    if (diccionario.placas.valor === "") {
      asignarValorfocoPlacas("error");
      asignaErrorPlacas(diccionario.placas.mensajeError);
    } else {
      asignarValorfocoPlacas("");
      asignaErrorPlacas("");
    }
    if (diccionario.colorVehiculo.valor === "") {
      asignarValorColorVehiculo("error");
      asignaErrorColorVehiculo(diccionario.colorVehiculo.mensajeError);
    } else {
      asignarValorColorVehiculo("");
      asignaErrorColorVehiculo("");
    }
    if (diccionario.comoOcurrioSiniestro.valor === "") {
      asignarValorComoOcurrioSiniestro("error");
      asignaErrorComoOcurrioSiniestro(diccionario.colorVehiculo.mensajeError);
    } else {
      asignarValorComoOcurrioSiniestro("");
      asignaErrorComoOcurrioSiniestro("");
    }
    if (respuesta1 === null || respuesta1 === undefined) {
      asignarValorMensajeError1(true);
    } else {
      asignarValorMensajeError1(false);
    }
    if (respuesta2 === null || respuesta2 === undefined) {
      asignarValorMensajeError2(true);
    } else {
      asignarValorMensajeError2(false);
    }
    if (respuesta3 === null || respuesta3 === undefined) {
      asignarValorMensajeError3(true);
    } else {
      asignarValorMensajeError3(false);
    }
    if (respuesta4 === null || respuesta4 === undefined) {
      asignarValorMensajeError4(true);
    } else {
      asignarValorMensajeError4(false);
    }
    if (respuesta5 === null || respuesta5 === undefined) {
      asignarValorMensajeError5(true);
    } else {
      asignarValorMensajeError5(false);
    }

    if (
      diccionario.quienReporta.valor.trim().length > 0 &&
      diccionario.telefono.valor.trim().length > 0 &&
      diccionario.placas.valor.trim().length > 0 &&
      diccionario.colorVehiculo.valor.trim().length > 0 &&
      diccionario.comoOcurrioSiniestro.valor.trim().length > 0 &&
      respuesta1 !== null &&
      respuesta2 !== null &&
      respuesta3 !== null &&
      respuesta4 !== null &&
      respuesta5 !== null
    ) {
      const quienReporta = diccionario.quienReporta.valor;
      const telefono = diccionario.telefono.valor;
      const placas = diccionario.placas.valor;
      const colorVehiculo = diccionario.colorVehiculo.valor;
      const comoOcurrioSiniestro = diccionario.comoOcurrioSiniestro.valor;
      const arregloRespuestas = [
        respuesta1,
        respuesta2,
        respuesta3,
        respuesta4,
        respuesta5,
      ];

      dispatch({
        type: "AGREGAR",
        valor: {
          quienReporta,
          telefono,
          placas,
          colorVehiculo,
          comoOcurrioSiniestro,
          respuesta1,
          respuesta2,
          respuesta3,
          respuesta4,
          respuesta5,
          arregloRespuestas,
        },
        indice: "informacionVehiculo",
      });

      if (estadoApp && estadoApp.patallaReporte) {
        history.push("/resumen-reporte");
      } else {
        history.push("/subir-fotos-grua");
      }
    }
  };

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

  useEffect(() => {
    if (
      diccionario.quienReporta.valor &&
      diccionario.telefono.valor &&
      diccionario.placas.valor &&
      diccionario.colorVehiculo.valor &&
      diccionario.comoOcurrioSiniestro.valor &&
      (respuesta1 !== null ||
        respuesta2 !== null ||
        respuesta3 !== null ||
        respuesta4 !== null ||
        respuesta5 !== null)
    ) {
      if (FvgBtnTema !== "estandar") {
        habilitarBoton();
        btnTema = "estandar";
        asignarValorFvgBtnTema("estandar");
      }
      dispatch({
        type: "AGREGAR",
        valor: FvgBtnTema,
        indice: "FvgBtnTema",
      });
    }
  }, [respuesta1, respuesta2, respuesta3, respuesta4, respuesta5]);

  return (
    <EnvolvedorPantalla key={v4()}>
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          if (estadoApp && estadoApp.patallaReporte) {
            history.push("/resumen-reporte");
          } else {
            history.push("/cuestionario-reporte");
          }
        }}
      />

      <SeparadorEncabezadoCuestionarioReporte />
      <Pantalla>
        <BarraProgresoReporte
          grua={estadoApp.seatedClaim === "tow"}
          titulo={diccionario.tituloBarraProgreso}
          progreso={2}
          numeroElementos={diccionario.numeroElementos}
        />
        <TituloCuestionarioReporte id="titulo">
          {diccionario.titulo}
        </TituloCuestionarioReporte>
        <CuerpoCuestionarioReporte>
          <CampoTexto
            id={diccionario.quienReporta.id}
            valor={diccionario.quienReporta.valor}
            etiqueta={diccionario.quienReporta.etiqueta}
            marcador={diccionario.quienReporta.marcador}
            foco={focoQuienReporta}
            mensajeError={errorQuienReporta}
            numeroDeCaracteres={diccionario.quienReporta.numeroDeCaracteres}
            enCambio={enCambioValidaBoton}
          />
          <CampoTexto
            id={diccionario.telefono.id}
            valor={diccionario.telefono.valor}
            etiqueta={diccionario.telefono.etiqueta}
            marcador={diccionario.telefono.marcador}
            foco={focoTelefono}
            mensajeError={errorTelefono}
            numeroDeCaracteres={diccionario.telefono.numeroDeCaracteres}
            enCambio={enCambioValidaBoton}
          />
          <CampoTexto
            id={diccionario.placas.id}
            valor={diccionario.placas.valor}
            etiqueta={diccionario.placas.etiqueta}
            marcador={diccionario.placas.marcador}
            foco={focoPlacas}
            mensajeError={errorPlacas}
            numeroDeCaracteres={diccionario.placas.numeroDeCaracteres}
            enCambio={enCambioValidaBoton}
          />
          <CampoTexto
            id={diccionario.colorVehiculo.id}
            valor={diccionario.colorVehiculo.valor}
            etiqueta={diccionario.colorVehiculo.etiqueta}
            marcador={diccionario.colorVehiculo.marcador}
            foco={focoColorVehiculo}
            mensajeError={errorColorVehiculo}
            numeroDeCaracteres={diccionario.colorVehiculo.numeroDeCaracteres}
            enCambio={enCambioValidaBoton}
          />
          <CampoTexto
            id={diccionario.comoOcurrioSiniestro.id}
            valor={diccionario.comoOcurrioSiniestro.valor}
            etiqueta={diccionario.comoOcurrioSiniestro.etiqueta}
            marcador={diccionario.comoOcurrioSiniestro.marcador}
            foco={focoComoOcurrioSiniestro}
            mensajeError={errorComoOcurrioSiniestro}
            numeroDeRenglones={
              diccionario.comoOcurrioSiniestro.numeroDeRenglones
            }
            numeroDeCaracteres={
              diccionario.comoOcurrioSiniestro.numeroDeCaracteres
            }
            esAreaDeTexto
            enCambio={enCambioValidaBoton}
          />
          <MensajePequeno id="mensajePequeno">
            {diccionario.mensajePequeno}
          </MensajePequeno>
          <SeleccionCuestionario
            pregunta={diccionario.pregunta1}
            respuesta={respuesta1}
            cambiarEstado={asignarValorRespuesta1}
            mostrarMensajeCampoRequerido={mensajeError1}
          />
          <SeleccionCuestionario
            pregunta={diccionario.pregunta2}
            respuesta={respuesta2}
            cambiarEstado={asignarValorRespuesta2}
            mostrarMensajeCampoRequerido={mensajeError2}
          />
          <SeleccionCuestionario
            pregunta={diccionario.pregunta3}
            respuesta={respuesta3}
            cambiarEstado={asignarValorRespuesta3}
            mostrarMensajeCampoRequerido={mensajeError3}
          />
          <SeleccionCuestionario
            pregunta={diccionario.pregunta4}
            respuesta={respuesta4}
            cambiarEstado={asignarValorRespuesta4}
            mostrarMensajeCampoRequerido={mensajeError4}
          />
          <SeleccionCuestionario
            pregunta={diccionario.pregunta5}
            respuesta={respuesta5}
            cambiarEstado={asignarValorRespuesta5}
            mostrarMensajeCampoRequerido={mensajeError5}
          />
          <SeparadorCuestionarioReporte />
        </CuerpoCuestionarioReporte>
        <Boton
          id="botonContinuar"
          ref={btnRef}
          tema={FvgBtnTema}
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaFormularioInformacionVehiculoGrua;

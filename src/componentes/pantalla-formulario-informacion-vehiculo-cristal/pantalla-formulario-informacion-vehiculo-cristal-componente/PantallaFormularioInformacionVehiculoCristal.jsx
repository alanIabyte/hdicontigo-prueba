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
} from "./PantallaFormularioInformacionVehiculoCristal.styled";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import SeleccionCuestionario from "../../seleccion-cuestionario";
import Boton from "../../boton";
import CampoTexto from "../../componentes-v2/campo-texto";
import Constantes from "../../../recursos/constantes";
// import { Select } from "../../select";

const valores = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
};

const diccionario = {
  tituloBarraProgreso: "Causas de la asistencia",
  encabezado: "Cambio de cristal",
  mensajeAlerta: "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
  titulo: "Ayúdanos a completar la siguinete información",
  mensajePequeno:
    "Para brindarte un servicio óptimo, necesitamos información adicional para enviarte la grúa adecuada a tu situación.",
  pregunta1: "Puede ponerse en neutral",
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
  const [errorComoOcurrioSiniestro, asignaErrorComoOcurrioSiniestro] =
    useState(null);
  const [focoComoOcurrioSiniestro, asignarValorComoOcurrioSiniestro] =
    useState("");
  const [mensajeError1, asignarValorMensajeError1] = useState(null);

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
        diccionario.comoOcurrioSiniestro.valor &&
        respuesta1 !== null
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

    if (
      diccionario.quienReporta.valor.trim().length > 0 &&
      diccionario.comoOcurrioSiniestro.valor.trim().length > 0 &&
      respuesta1 !== null
    ) {
      const quienReporta = diccionario.quienReporta.valor;
      const comoOcurrioSiniestro = diccionario.comoOcurrioSiniestro.valor;
      const arregloRespuestas = [respuesta1];

      dispatch({
        type: "AGREGAR",
        valor: {
          quienReporta,
          comoOcurrioSiniestro,
          respuesta1,
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
      respuesta1 !== null
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
  }, [respuesta1]);

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
          {/* <Select /> */}
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

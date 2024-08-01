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
  ContenedorProcesoLegal,
  EnvolvedorProcesoLegal,
  ImagenProcesoLegal,
  TituloSeccion,
  SubTituloSeccion,
} from "./ConoceProcesosLegalComponente.styled";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import SeleccionCuestionario from "../../seleccion-cuestionario";
import Boton from "../../boton";
// import CampoTexto from "../../campo-texto";
import CampoTexto from "../../componentes-v2/campo-texto";
import Constantes from "../../../recursos/constantes";
import carroDefault from "../../../recursos/iconos/hdi-c/mis-poliza/autos.png";
import IconoConductorDetenido from "../../../recursos/iconos/ico_lib_conductor_detenido.svg";
import IconoVehiculoDetenido from "../../../recursos/iconos/ico_lib_vehiculo_detenido.svg";

const valores = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
};

const diccionario = {
  tituloBarraProgreso: "Causas de la asistencia",
  encabezado: "Conocer proceso legal",
  mensajeAlerta: "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
  titulo: "Procesos legales",
  mensajePequeno:
    "Conoce los pasos que estarán llevándose a cabo para la liberación del conductor detenido y del auto.",
  pregunta1: "Puede ponerse en neutral",
  pregunta2: "Puede avanzar sobre sus propias llantas",
  pregunta3: "Tiene carga",
  pregunta4: "Está a pie de calle",
  pregunta5: "Está en carretera",
  etiquetaBoton: "Llamar a HDI",
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

  return (
    <EnvolvedorPantalla key={v4()}>
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.goBack();
        }}
      />
      <Pantalla>
        <TituloCuestionarioReporte id="titulo">
          {diccionario.titulo}
        </TituloCuestionarioReporte>
        <MensajePequeno id="mensajePequeno">
          {diccionario.mensajePequeno}
        </MensajePequeno>
        <CuerpoCuestionarioReporte>
          <ContenedorProcesoLegal
            onClick={() => {
              history.push({
                pathname: "conoce-que-hacer-n",
                search: "?reporte=legal-conductor",
              });
            }}
          >
            <EnvolvedorProcesoLegal>
              <ImagenProcesoLegal src={IconoConductorDetenido} />
              <TituloSeccion>Liberación del conductor detenido</TituloSeccion>
              <SubTituloSeccion>Conocer proceso legal</SubTituloSeccion>
            </EnvolvedorProcesoLegal>
          </ContenedorProcesoLegal>
          <ContenedorProcesoLegal
            style={{ paddingBottom: "40%" }}
            onClick={() => {
              history.push({
                pathname: "conoce-que-hacer-n",
                search: "?reporte=legal-vehiculo",
              });
            }}
          >
            <EnvolvedorProcesoLegal>
              <ImagenProcesoLegal src={IconoVehiculoDetenido} />
              <TituloSeccion>Liberación del vehículo detenido</TituloSeccion>
              <SubTituloSeccion>Conocer proceso legal</SubTituloSeccion>
            </EnvolvedorProcesoLegal>
          </ContenedorProcesoLegal>
        </CuerpoCuestionarioReporte>
        {/* <Boton
          id="botonContinuar"
          ref={btnRef}
          tema={FvgBtnTema}
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
        /> */}
        <Boton
          etiqueta={diccionario.etiquetaBoton}
          tema="simple"
          enClick={() => {
            window.location.href = "tel:*8006673144";
          }}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaFormularioInformacionVehiculoGrua;

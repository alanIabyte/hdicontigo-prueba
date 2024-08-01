import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { v4 } from "uuid";
// import { MensajePequeno, Titulo } from "./PantallaSolicitudReembolso.styled";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import { Titulo1 } from "../../componentes-styled-compartidos/Textos";
import { Encabezado } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import Constantes from "../../../recursos/constantes";

const diccionario = {
  encabezado: "Solicitar reembolso",
  titulo: "Ayúdanos a localizar tu póliza correctamente",
  mensajePequeno: "Selecciona a la persona afectada",
  etiquetaPoliza: "Número de póliza",
  etiquetaFecha: "Fecha de siniestro",
  marcadorPoliza: "Marcador opcional",
  etiquetaBotonComenzar: "Solicitar reembolso",
  etiquetaBotonLlamada: "Llamar a HDI *434",
  linkInstruccionesPoliza: "¿Dónde encuentro el número de póliza?",
  linkInstruccionesSerie: "¿Dónde está mi número de serie?",
  mensajeDeErrorDefault: "Ocurrió un error",
  alerta: {
    titulo: "Póliza no vigente",
    cuerpo:
      // eslint-disable-next-line max-len
      "La póliza que intentas reportar presenta problemas de vigencia.<br /><br />No te preocupes, comunícate con nosotros para continuar tu atención.",
    etiquetaBoton: "Llamar a HDI *434",
  },
  errores: {
    campoRequerido: "Campo requerido para poder continuar.",
    // oficinaIncorrecta:
    //   "Si eres cliente Autocompara - Santander comunicate al *434",
    formatoIncorrecto: "Por favor revisa que el formato sea correcto.",
  },
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaSolicitudReembolso = () => {
  const history = useHistory();
  const location = useLocation();
  const paginaAnterior =
    location && location.state && location.state.paginaAnterior
      ? location.state.paginaAnterior
      : "/";

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }

  return (
    <>
      <EnvolvedorPantalla key={v4()}>
        <Encabezado
          titulo={diccionario.encabezado}
          funcionRegresar={() => {
            history.push(paginaAnterior);
            sessionStorage.removeItem("estadoRedux");
          }}
        />

        <Titulo1>{diccionario.titulo}</Titulo1>

        <Pantalla>
          <p>Pantalla de reembolso</p>
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

export default PantallaSolicitudReembolso;

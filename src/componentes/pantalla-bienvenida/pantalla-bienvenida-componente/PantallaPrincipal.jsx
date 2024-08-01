/* eslint-disable react/prop-types */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Boton from "../../boton/boton-componente/Boton";
import { diccionario } from "./config";
import {
  ContenedorLogoBienvenida,
  ContenedorPantallaBienvenida,
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
  LogoBienvenida,
  PieDePaginaBienvenida,
  SeparadorBienvenida,
  SeparadorEspacio,
  TituloBienvenidaH1,
} from "./PantallaBienvenida.styled";
import logoContigo from "../../../recursos/iconos/ico_contigo.svg";
import showConfig from "../../../utils/configs";

const PantallaPrincipal = ({
  asignarValorMostrarPantallaIngreso,
  asignarValorMostrarPantallaIngresoUsernameBiometrico,
}) => {
  const history = useHistory();
  const urlAviso = process.env.REACT_APP_URL_FRAME_AVISO_PRIVACIDAD;

  const navegarAvisoPrivacidad = () => {
    // window.location.href = urlAviso;
    window.open(urlAviso, "_blank");
  };

  return (
    <ContenedorPantallaBienvenida>
      <TituloBienvenidaH1 id="tituloBienvenida">
        {diccionario.mensajeBienvenida}
      </TituloBienvenidaH1>
      <ContenedorLogoBienvenida>
        <LogoBienvenida src={logoContigo} alt="hdi-contigo hdi-tu-compania" />
      </ContenedorLogoBienvenida>
      <Boton
        etiqueta={diccionario.etiquetaReportar}
        tema="rojo"
        id="botonReportar"
        enClick={() => {
          history.push("/elegir-siniestro");
        }}
      />
      <SeparadorEspacio />
      <Boton
        etiqueta={diccionario.etiquetaIngresar}
        tema="simple-verde"
        id="botonIngresar"
        enClick={() => {
          if (!showConfig.showKeycloak) {
            asignarValorMostrarPantallaIngreso(true);
          } else {
            asignarValorMostrarPantallaIngresoUsernameBiometrico(true);
          }
        }}
      />
      <EnlaceRegistroBienvenida>
        <EnlaceBienvenida
          id="enlaceRegistro"
          enlace
          onClick={() => {
            history.push("/registro-usuario");
          }}
        >
          {diccionario.mensajeRegistro}
        </EnlaceBienvenida>
      </EnlaceRegistroBienvenida>
      <PieDePaginaBienvenida>
        <Link to="/terminos" className="navlink">
          {diccionario.terminos}
        </Link>
        <SeparadorBienvenida />
        <Link to="/" className="navlink" onClick={navegarAvisoPrivacidad}>
          {diccionario.aviso}
        </Link>
      </PieDePaginaBienvenida>
    </ContenedorPantallaBienvenida>
  );
};

export default PantallaPrincipal;

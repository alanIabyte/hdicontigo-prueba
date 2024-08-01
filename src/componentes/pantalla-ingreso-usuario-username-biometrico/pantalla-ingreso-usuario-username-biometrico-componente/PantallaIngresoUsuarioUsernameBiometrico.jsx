/* eslint-disable no-console */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useRef, useEffect } from "react";
// import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import CampoTexto from "../../campo-texto";
import { ContenedorPantallaBienvenida } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import IndicadorCarga from "../../indicador-carga";
import {
  ContenedorLogoBienvenida,
  LogoBienvenida,
  RegresarBoton,
  SeparadorEspacio,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import logoContigo from "../../../recursos/iconos/ico_contigo.svg";
import Boton from "../../boton";
import { MensajeError } from "../../componentes-styled-compartidos/Textos";
import { diccionario } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/config";

let btnTema = "estandar";
const claseBotonEstandar = "boton-estandar";
const claseBotonDeshabilitado = "boton-deshabilitado";

const PantallaIngresoUsuarioUsernameBiometrico = (props) => {
  const {
    asignarValorMostrarPantallaIngresoUsernameBiometrico,
    asignarValorMostrarPantallaIngreso,
    asignarValorFocoUsuario,
    asignarValorCargando,
    asignarErrorUsuario,
    errorUsuario,
    validaUsuarioHuella,
    cargando,
    focoUsuario,
    valores,
  } = props;
  const btnRef = useRef();

  const alDarClickEnEntrar = async () => {
    const { usuario } = valores;
    if (usuario) {
      let usuarioValido = false;
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(usuario) ||
        /^\d{10}$/.test(usuario)
      ) {
        usuarioValido = true;
        asignarValorFocoUsuario("");
        asignarErrorUsuario("");
      } else {
        asignarValorFocoUsuario("error");
        asignarErrorUsuario(diccionario.errorUsuario);
      }
      if (usuarioValido) {
        validaUsuarioHuella();
      }
    }
  };

  const deshabilitarBoton = () => {
    const elementoBotonDOM = btnRef.current;

    if (elementoBotonDOM && elementoBotonDOM.classList) {
      if (elementoBotonDOM.classList.contains(claseBotonEstandar)) {
        elementoBotonDOM.classList.remove(claseBotonEstandar);
      }

      if (!elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
        elementoBotonDOM.classList.add(claseBotonDeshabilitado);
      }
    }
  };

  const habilitarBoton = () => {
    const elementoBotonDOM = btnRef.current;

    if (elementoBotonDOM && elementoBotonDOM.classList) {
      if (elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
        elementoBotonDOM.classList.remove(claseBotonDeshabilitado);
      }

      if (!elementoBotonDOM.classList.contains(claseBotonEstandar)) {
        elementoBotonDOM.classList.add(claseBotonEstandar);
      }
    }
  };

  useEffect(() => {
    deshabilitarBoton();
  }, []);

  const alCambiarUsuario = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.usuario = valor;
      if (valor) {
        habilitarBoton();
        btnTema = "estandar";
      } else {
        deshabilitarBoton();
        btnTema = "deshabilitado";
      }
    }
  };

  return (
    <Fragment key={v4()}>
      <ContenedorPantallaBienvenida>
        {cargando ? <IndicadorCarga tema="verde" /> : null}
        <ContenedorLogoBienvenida
          alt="hdi-contigo hdi-tu-compania"
          style={{ marginBottom: "25px", marginTop: "40px" }}
        >
          <LogoBienvenida src={logoContigo} alt="hdi-contigo hdi-tu-compania" />
        </ContenedorLogoBienvenida>
        <RegresarBoton
          type="button"
          onClick={() => {
            asignarValorMostrarPantallaIngresoUsernameBiometrico(false);
          }}
        >
          <ChevronLeftRoundedIcon id="botonRegresar" fontSize="large" />
        </RegresarBoton>
        {/* <TituloBienvenidaH1 id="tituloIngreso" ingreso>
          {diccionario.mensajeIngreso}
        </TituloBienvenidaH1> */}
        <SeparadorEspacio />
        <CampoTexto
          id="campoUsuario"
          etiqueta={diccionario.etiquetaUsuario}
          marcador="Ingresa tu número de télefono"
          enCambio={alCambiarUsuario}
          foco={focoUsuario}
          valor={valores.usuario}
        />
        {errorUsuario !== "" && (
          <MensajeError id="errorUsuario" style={{ marginTop: "13px" }}>
            {errorUsuario}
          </MensajeError>
        )}
        <SeparadorEspacio style={{ paddingBottom: "27%" }} />

        <Boton
          ref={btnRef}
          etiqueta={diccionario.etiquetaEntrarHuella}
          tema={btnTema}
          id="botonIngresarHuella"
          enClick={() => {
            alDarClickEnEntrar();
          }}
        />
      </ContenedorPantallaBienvenida>
    </Fragment>
  );
};

PantallaIngresoUsuarioUsernameBiometrico.propTypes = {
  asignarValorMostrarPantallaIngresoUsernameBiometrico: PropTypes.func,
  asignarValorMostrarPantallaIngreso: PropTypes.func,
  asignarValorFocoUsuario: PropTypes.func,
  asignarValorCargando: PropTypes.func,
  asignarErrorUsuario: PropTypes.func,
  errorUsuario: PropTypes.bool,
  validaUsuarioHuella: PropTypes.func,
  cargando: PropTypes.bool,
  focoUsuario: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  valores: PropTypes.object,
};

PantallaIngresoUsuarioUsernameBiometrico.defaultProps = {
  asignarValorMostrarPantallaIngresoUsernameBiometrico: () => {},
  asignarValorMostrarPantallaIngreso: () => {},
  asignarValorFocoUsuario: () => {},
  asignarValorCargando: () => {},
  asignarErrorUsuario: () => {},
  validaUsuarioHuella: () => {},
  errorUsuario: false,
  cargando: false,
  focoUsuario: "",
  valores: {},
};

export default PantallaIngresoUsuarioUsernameBiometrico;

/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import IconoNoVisible from "@material-ui/icons/VisibilityOffRounded";
import IconoVisible from "@material-ui/icons/VisibilityRounded";
import IconoPalomita from "@material-ui/icons/CheckRounded";
import {
  Caracteristica,
  ContenedorBoton,
  ContenedorCaracteristicas,
  ContenedorFormulario,
  IconoCaracteristica,
  MensajeError,
  SeparadorEspacio,
  TituloCaracteristicas,
} from "./PantallaContrasenaCambiar.styled";
import diccionario from "./Diccionario";
import CampoTexto from "../../campo-texto";
import Boton from "../../boton";

const valores = {
  nuevaContrasena: "",
  repetirNuevaContrasena: "",
  ochoCaracteresRegla: false,
  letraMayusculaRegla: false,
  letraMinusculaRegla: false,
  unNumeroRegla: false,
  caracterEspecialRegla: false,
};

const FormularioContrasena = (props) => {
  const isMounted = useRef(true);
  const {
    etiquetaContrasena,
    etiquetaRepetirContrasena,
    boton,
    accionBoton,
    nuevaContrasena,
    repetirNuevaContrasena,
    poliza,
    validacionAdicional,
  } = props;

  if (nuevaContrasena && repetirNuevaContrasena) {
    valores.nuevaContrasena = nuevaContrasena;
    valores.repetirNuevaContrasena = repetirNuevaContrasena;
  }

  const [botonDeshabilitado, asignarValorBotonDeshabilitado] = useState(true);
  const [ochoCaracteresRegla, asignarOchoCaracteresRegla] = useState(
    valores.ochoCaracteresRegla
  );
  const [letraMayusculaRegla, asignarLetraMayusculaRegla] = useState(
    valores.letraMayusculaRegla
  );
  const [letraMinusculaRegla, asignarLetraMinusculaRegla] = useState(
    valores.letraMinusculaRegla
  );
  const [unNumeroRegla, asignarUnNumeroRegla] = useState(valores.unNumeroRegla);
  const [caracterEspecialRegla, asignarCaracterEspecialRegla] = useState(
    valores.caracterEspecialRegla
  );
  const [mostrarCaracteristicas, asignarMostrarCaracteristicas] =
    useState(true);
  const [errorCoincidencia, asignarErrorCoincidencia] = useState(false);
  const [enfoqueRepetir, asignarEnfoqueRepetir] = useState(false);
  const [focoNuevaContrasena, asignarFocoNuevaContrasena] = useState("");
  const [focoRepetirContrasena, asignarFocoRepetirContrasena] = useState("");
  const [nuevaContrasenaVisible, asignarNuevaContrasenaVisible] =
    useState(true);
  const [repetirContrasenaVisible, asignarRepetirContrasenaVisible] =
    useState(true);

  const contrasenaNoVisible = <IconoNoVisible />;
  const contrasenaVisible = <IconoVisible />;

  const validarCoincidencia = () => {
    if (
      valores.nuevaContrasena !== "" &&
      valores.repetirNuevaContrasena !== ""
    ) {
      if (valores.nuevaContrasena !== valores.repetirNuevaContrasena) {
        asignarValorBotonDeshabilitado(true);
        asignarErrorCoincidencia(true);
        asignarFocoRepetirContrasena("error");
      } else {
        asignarErrorCoincidencia(false);
        if (
          ochoCaracteresRegla &&
          letraMayusculaRegla &&
          letraMinusculaRegla &&
          unNumeroRegla &&
          caracterEspecialRegla
        ) {
          asignarFocoRepetirContrasena("enfocado");

          if (validacionAdicional === null) {
            asignarValorBotonDeshabilitado(false);
          } else if (validacionAdicional) {
            asignarValorBotonDeshabilitado(false);
          } else {
            asignarValorBotonDeshabilitado(true);
          }
        } else {
          asignarFocoRepetirContrasena("error");
        }
      }
    }
  };

  useEffect(() => {
    if (
      ochoCaracteresRegla &&
      letraMayusculaRegla &&
      letraMinusculaRegla &&
      unNumeroRegla &&
      caracterEspecialRegla
    ) {
      asignarFocoNuevaContrasena("enfocado");
      asignarMostrarCaracteristicas(false);
      validarCoincidencia();
    } else {
      asignarFocoNuevaContrasena("");
      if (
        valores.nuevaContrasena !== "" &&
        valores.nuevaContrasena !== valores.repetirNuevaContrasena
      ) {
        asignarFocoNuevaContrasena("error");
      }
      asignarMostrarCaracteristicas(true);
    }
  }, [
    ochoCaracteresRegla,
    letraMayusculaRegla,
    letraMinusculaRegla,
    unNumeroRegla,
    caracterEspecialRegla,
  ]);

  const alCambiarRepetirNuevaContrasena = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.repetirNuevaContrasena = valor;
      validarCoincidencia();
      asignarEnfoqueRepetir(true);
    }
  };

  const alCambiarNuevaContrasena = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      asignarOchoCaracteresRegla(false);
      asignarLetraMayusculaRegla(false);
      asignarLetraMinusculaRegla(false);
      asignarUnNumeroRegla(false);
      asignarCaracterEspecialRegla(false);
      if (valor.length >= 8) {
        valores.ochoCaracteresRegla = true;
        asignarOchoCaracteresRegla(true);
      }
      for (let i = 0; i < valor.length; i += 1) {
        // console.log(valor.charCodeAt(i));
        if (valor.charCodeAt(i) >= 65 && valor.charCodeAt(i) <= 90) {
          valores.letraMayusculaRegla = true;
          asignarLetraMayusculaRegla(true);
        } else if (valor.charCodeAt(i) >= 97 && valor.charCodeAt(i) <= 122) {
          valores.letraMinusculaRegla = true;
          asignarLetraMinusculaRegla(true);
        } else if (valor.charCodeAt(i) >= 48 && valor.charCodeAt(i) <= 57) {
          valores.unNumeroRegla = true;
          asignarUnNumeroRegla(true);
        } else if (
          /^(?=.*?[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|\\]).$/g.test(
            valor.substring(i, i + 1)
          )
        ) {
          valores.caracterEspecialRegla = true;
          asignarCaracterEspecialRegla(true);
        }
      }
      valores.nuevaContrasena = valor;
      asignarEnfoqueRepetir(false);
      validarCoincidencia();
    }
  };

  const FuncionBoton = () => {
    accionBoton(valores);
    valores.nuevaContrasena = "";
    valores.repetirNuevaContrasena = "";
  };

  useEffect(() => {
    if (isMounted.current) {
      validarCoincidencia();
    }
    return () => {
      if (poliza.length === 0) {
        valores.nuevaContrasena = "";
        valores.repetirNuevaContrasena = "";
        valores.ochoCaracteresRegla = false;
        valores.letraMayusculaRegla = false;
        valores.letraMinusculaRegla = false;
        valores.unNumeroRegla = false;
        valores.caracterEspecialRegla = false;
      }
    };
  }, []);

  return (
    <ContenedorFormulario>
      <CampoTexto
        id="campoContrasena"
        etiqueta={etiquetaContrasena}
        valor={valores.nuevaContrasena}
        numeroDeCaracteres={18}
        enCambio={alCambiarNuevaContrasena}
        esContrasena={nuevaContrasenaVisible}
        // conteoDeCaracteresArriba
        icono={nuevaContrasenaVisible ? contrasenaNoVisible : contrasenaVisible}
        enClickIcono={() => {
          asignarNuevaContrasenaVisible(!nuevaContrasenaVisible);
        }}
        foco={focoNuevaContrasena}
      />
      {mostrarCaracteristicas && (
        <ContenedorCaracteristicas style={{ marginTop: "20px" }}>
          <TituloCaracteristicas>
            {diccionario.caracteristicasContrasena}:
          </TituloCaracteristicas>
          <Caracteristica
            aprobada={ochoCaracteresRegla}
            noAprobada={ochoCaracteresRegla}
          >
            {ochoCaracteresRegla && (
              <IconoCaracteristica>
                <IconoPalomita />
              </IconoCaracteristica>
            )}
            {diccionario.ochoCaracteres}
          </Caracteristica>
          <Caracteristica
            aprobada={letraMayusculaRegla}
            noAprobada={letraMayusculaRegla}
          >
            {letraMayusculaRegla && (
              <IconoCaracteristica>
                <IconoPalomita />
              </IconoCaracteristica>
            )}
            {diccionario.letraMayuscula}
          </Caracteristica>
          <Caracteristica
            aprobada={letraMinusculaRegla}
            noAprobada={letraMinusculaRegla}
          >
            {letraMinusculaRegla && (
              <IconoCaracteristica>
                <IconoPalomita />
              </IconoCaracteristica>
            )}
            {diccionario.letraMinuscula}
          </Caracteristica>
          <Caracteristica aprobada={unNumeroRegla} noAprobada={unNumeroRegla}>
            {unNumeroRegla && (
              <IconoCaracteristica>
                <IconoPalomita />
              </IconoCaracteristica>
            )}
            {diccionario.unNumero}
          </Caracteristica>
          <Caracteristica
            aprobada={caracterEspecialRegla}
            noAprobada={caracterEspecialRegla}
          >
            {caracterEspecialRegla && (
              <IconoCaracteristica>
                <IconoPalomita />
              </IconoCaracteristica>
            )}
            {diccionario.caracterEspecial}
          </Caracteristica>
        </ContenedorCaracteristicas>
      )}
      <SeparadorEspacio />
      <CampoTexto
        id="campoRepetirNuevaContrasena"
        etiqueta={etiquetaRepetirContrasena}
        valor={valores.repetirNuevaContrasena}
        numeroDeCaracteres={18}
        enCambio={alCambiarRepetirNuevaContrasena}
        esContrasena={repetirContrasenaVisible}
        icono={
          repetirContrasenaVisible ? contrasenaNoVisible : contrasenaVisible
        }
        enClickIcono={() => {
          asignarRepetirContrasenaVisible(!repetirContrasenaVisible);
        }}
        autoenfoque={enfoqueRepetir}
        foco={focoRepetirContrasena}
      />
      {errorCoincidencia && (
        <MensajeError id="errorCoincidencia" style={{ marginTop: "20px" }}>
          {diccionario.errorCoincidencia}
        </MensajeError>
      )}
      <ContenedorBoton>
        <Boton
          etiqueta={boton}
          tema="estandar"
          enClick={FuncionBoton}
          deshabilitado={botonDeshabilitado}
        />
      </ContenedorBoton>
    </ContenedorFormulario>
  );
};

FormularioContrasena.propTypes = {
  poliza: PropTypes.string,
  validacionAdicional: PropTypes.bool,
  nuevaContrasena: PropTypes.string,
  repetirNuevaContrasena: PropTypes.string,
  etiquetaContrasena: PropTypes.string,
  etiquetaRepetirContrasena: PropTypes.string,
  boton: PropTypes.string,
  accionBoton: PropTypes.func,
};

FormularioContrasena.defaultProps = {
  validacionAdicional: null,
  poliza: "",
  nuevaContrasena: "",
  repetirNuevaContrasena: "",
  etiquetaContrasena: "",
  etiquetaRepetirContrasena: "",
  boton: "",
  accionBoton() {},
};

export default FormularioContrasena;

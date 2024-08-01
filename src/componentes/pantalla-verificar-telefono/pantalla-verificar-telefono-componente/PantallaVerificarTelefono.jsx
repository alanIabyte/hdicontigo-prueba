import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import {
  ContenedorBoton,
  ContenedorValorTelefono,
  CuerpoIngresaCodigo,
  CuerpoVerificarTelefono,
  LinkNoEnviado,
} from "./PantallaVerificarTelefono.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import IndicadorCarga from "../../indicador-carga";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import Constantes from "../../../recursos/constantes";

let codigo = ["", "", "", ""];

const nombreCookie = Constantes.nombreDeCookie;

const ASIGNAR_CREDENCIALES = loader(
  "../../../graphQL/mutation/seguridad/asignacion_credenciales.graphql"
);

let accion = "";

const PantallaVerificarTelefono = (props) => {
  const history = useHistory();
  const { telefono } = props;
  const [pantalla, asignarValorPantalla] = useState("");
  const [focoCodigo, asignarValorFocoCodigo] = useState("");
  const [cargando, asignarValorCargando] = useState(false);

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const usuario = objetoCookie ? objetoCookie.Usuario : "usuario";
  const token = objetoCookie ? objetoCookie.access_token : "token";

  const telefonoMascara = `*** *** ${telefono.substring(6, 10)}`;
  const diccionario = {
    encabezadoEnviar: "Verificación de teléfono",
    cuerpoEnviar:
      "Te enviaremos un SMS con un código de verificación al número con la siguiente terminación:",
    etiquetaBoton: "Continuar",
    encabezadoIngreso: "Código de verificación",
    cuerpoIngreso: "Ingresa el código de 4 dígitos que te hemos enviado.",
    linkNoEnviado: "No recibí ningún código. Reenviar código",
  };

  const [asignarCredenciales, { data, loading }] =
    useMutation(ASIGNAR_CREDENCIALES);

  const enviarPeticion = (enviarCodigo) => {
    asignarCredenciales({
      variables: {
        codigoActivacion: enviarCodigo ? "" : codigo.join(""),
        contrasenaNueva: "contrasenaNueva",
        verificarCodigoActivacion: enviarCodigo,
        contrasenaActual: "contrasenaActual",
        token,
        usuario,
      },
    });
  };

  const enviarCodigo = () => {
    accion = "envioCodigo";
    enviarPeticion(true);
  };

  const confirmarCodigo = () => {
    accion = "confirmarCodigo";
    let serieCompleta = true;
    for (let i = 0; i < codigo.length; i += 1) {
      if (!codigo[i]) {
        serieCompleta = false;
      }
    }

    if (!serieCompleta) {
      asignarValorFocoCodigo("error");
    } else {
      enviarPeticion(false);
    }
  };
  const reenviarCodigo = () => {
    accion = "reenviarCodigo";
    enviarPeticion(true);
  };

  const alCambiarCodigo = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      const numeroCodigo = codigo;
      const indice = Number(evento.target.dataset.indice);
      numeroCodigo[indice] = valor;
      codigo = numeroCodigo;
    }
  };

  const siguientePaso = () => {
    switch (accion) {
      case "envioCodigo":
        asignarValorPantalla("enviado");
        break;
      case "confirmarCodigo":
        history.push({
          pathname: "/polizas-siniestradas",
          state: { notificacionContrasenaRestablecida: true },
        });
        break;
      case "reenviarCodigo":
        asignarValorPantalla("enviado");
        break;
      default:
    }
  };

  useEffect(() => {
    if (!loading && data) {
      asignarValorCargando(false);
      if (
        data &&
        data.asignacion_credenciales &&
        data.asignacion_credenciales.completado
      ) {
        siguientePaso();
      }
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading]);

  const envioCodigo = (
    <EnvolvedorPantalla key={v4()} id="PantallaVerificarTelefono">
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={diccionario.encabezadoEnviar}
        mostrarBotonRegresar={false}
      />
      <Pantalla>
        <CuerpoVerificarTelefono>
          {diccionario.cuerpoEnviar}
        </CuerpoVerificarTelefono>
        <ContenedorValorTelefono>{telefonoMascara}</ContenedorValorTelefono>
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetaBoton}
            tema="estandar"
            enClick={enviarCodigo}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );

  const ingresoCodigo = (
    <EnvolvedorPantalla key={v4()} id="PantallaIngresoCodigo">
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={diccionario.encabezadoIngreso}
        mostrarBotonRegresar={false}
      />
      <Pantalla>
        <CuerpoIngresaCodigo>{diccionario.cuerpoIngreso}</CuerpoIngresaCodigo>
        <CampoTexto
          esSerie
          enCambio={alCambiarCodigo}
          foco={focoCodigo}
          valores={codigo}
          id="campoCodigo"
        />
        <LinkNoEnviado id="enlaceNoEnviado" onClick={reenviarCodigo}>
          {diccionario.linkNoEnviado}
        </LinkNoEnviado>
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetaBoton}
            tema="estandar"
            enClick={confirmarCodigo}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );

  if (pantalla === "enviado") {
    return ingresoCodigo;
  }

  return envioCodigo;
};

PantallaVerificarTelefono.propTypes = {
  telefono: PropTypes.string,
};

PantallaVerificarTelefono.defaultProps = {
  telefono: "5555555555",
};
export default PantallaVerificarTelefono;

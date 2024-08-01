import React, { useState, useEffect, memo } from "react";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import {
  ContenedorLogo,
  ContenedorRestablecerContrasenaEnviada,
  ContenedorTitulo,
  CuerpoContrasenaRestablecida,
  EncabezadoRestablecerContrasenaEnviada,
  EnlaceContrasenaRestablecida,
  ImagenContrasenaRestablecida,
  LogoPantalla,
  Titulo,
  TituloMensajeContrasenaRestablecida,
} from "./PantallaContrasenaCambiar.styled";
import diccionario from "./Diccionario";
import FormularioContrasena from "./FormularioContrasena";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import IndicadorCarga from "../../indicador-carga";
import logo from "../../../recursos/imagenes/logo-alt-2.png";
import imagenEnviado from "../../../recursos/imagenes/contrasena_cambiada.png";
import Constantes from "../../../recursos/constantes";

const CAMBIAR_CREDENCIALES = loader(
  "../../../graphQL/mutation/seguridad/cambiar_credenciales.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

const PantallaContrasenaRestablecer = () => {
  const history = useHistory();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  let token = "";
  let usuario = "";
  // eslint-disable-next-line no-restricted-globals
  if (location.search) {
    // eslint-disable-next-line no-restricted-globals
    const parametros = location.search.split("&");
    token = obtenerValorDeArregloDeStrings(parametros, "token:");
    usuario =
      obtenerValorDeArregloDeStrings(parametros, "correo:") ||
      obtenerValorDeArregloDeStrings(parametros, "usuario:");
  } else {
    token = objetoCookie ? objetoCookie.access_token : "acces_token";
    usuario = objetoCookie ? objetoCookie.Usuario : "usuario";
  }

  const [pantalla, asignarValorPantalla] = useState(
    "PantallaContrasenaEstablecer"
  );
  const [cargando, asignarValorCargando] = useState(false);

  const [restablecerContrasena, { data, loading }] =
    useMutation(CAMBIAR_CREDENCIALES);

  useEffect(() => {
    if (!loading && data) {
      asignarValorCargando(false);
      if (
        data &&
        data.cambiar_credenciales &&
        data.cambiar_credenciales.completado
      ) {
        asignarValorPantalla("PantallaContrasenaRestablecida");
      }
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading]);

  const enviarPeticion = (variables) => {
    restablecerContrasena({
      variables: {
        contrasena: variables.nuevaContrasena,
        tipo: "password",
        esTemporal: false,
        token,
        usuario,
      },
    });
  };

  // Formulario para el ingreso de la nueva contraseña
  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()} id="PantallaContrasenaRestablecer">
      {cargando ? <IndicadorCarga /> : null}
      <Pantalla>
        <ContenedorTitulo>
          <Titulo>{diccionario.tituloRestablecer}</Titulo>
        </ContenedorTitulo>
        <ContenedorLogo>
          <LogoPantalla src={logo} />
        </ContenedorLogo>
        <FormularioContrasena
          etiquetaContrasena={diccionario.etiquetaNuevaContrasena}
          etiquetaRepetirContrasena={diccionario.etiquetaRepetirNuevaContrasena}
          boton={diccionario.botonRestablecer}
          accionBoton={enviarPeticion}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );

  // Pantalla para el ingreso del código de verificación
  if (pantalla === "PantallaContrasenaRestablecida") {
    pantallaAMostrar = (
      <EnvolvedorPantalla key={v4()} id="PantallaContrasenaOlvidadaEnviada">
        <Pantalla>
          <ContenedorRestablecerContrasenaEnviada>
            <EncabezadoRestablecerContrasenaEnviada>
              <TituloMensajeContrasenaRestablecida>
                {diccionario.tituloContrasenaEstablecida}
              </TituloMensajeContrasenaRestablecida>
            </EncabezadoRestablecerContrasenaEnviada>
            <ImagenContrasenaRestablecida src={imagenEnviado} />
            <CuerpoContrasenaRestablecida>
              {diccionario.cuerpoContrasenaEstablecida}
            </CuerpoContrasenaRestablecida>
            <EnlaceContrasenaRestablecida
              onClick={() => {
                history.push("/");
              }}
            >
              {diccionario.enlaceContrasenaEstablecida}
            </EnlaceContrasenaRestablecida>
          </ContenedorRestablecerContrasenaEnviada>
        </Pantalla>
      </EnvolvedorPantalla>
    );
  }

  return pantallaAMostrar;
};

export default memo(PantallaContrasenaRestablecer);

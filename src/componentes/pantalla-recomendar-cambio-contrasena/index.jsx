/* eslint-disable */
import React, { useState } from "react";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import {
  ContenedorOmitir,
  Cuerpo,
  LigaOmitir,
  Contenedor,
  Image,
} from "./index.styled";
import diccionario from "./diccionario.json";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../componentes-styled-compartidos/Pantalla.styled";
import iconKey from "../../recursos/iconos/ico_key.png";

import Encabezado from "../encabezado";
import Constantes from "../../recursos/constantes";

const nombreCookie = Constantes.nombreDeCookie;

const PantallaRecomendarCambioContrasena = () => {
  const history = useHistory();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const validado = objetoCookie ? objetoCookie.Validado : false;
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const usuario = objetoCookie ? objetoCookie.Usuario : "5555555555";
  const token = objetoCookie ? objetoCookie.access_token : "token";
  const telefonoMascara = `*** *** ${usuario.substring(6, 10)}`;

  return (
    <EnvolvedorPantalla key={v4()} id="PantallaRecomendarEstablecerContrasena">
      <Encabezado
        titulo={diccionario.tituloEstablecer}
        mostrarBotonRegresar={false}
      />
      <Contenedor>
        <Image src={iconKey} />
        <Cuerpo>{diccionario.cuerpo}</Cuerpo>
        <ContenedorOmitir
          onClick={() => {
            history.push("/inicio");
          }}
        >
          <LigaOmitir>Aceptar</LigaOmitir>
        </ContenedorOmitir>

      </Contenedor>
    </EnvolvedorPantalla>
  );
};

export default PantallaRecomendarCambioContrasena;

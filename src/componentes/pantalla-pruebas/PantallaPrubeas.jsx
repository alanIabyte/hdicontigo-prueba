/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  MensajePequeno,
  Contenedor,
  ContenedorFormasPago,
  ContenedorIcono,
  FormaPago,
  NombreFormaPago,
  DescripcionFormaPago,
} from "./PantallaTransaccionMitec.styled";
import EncabezadoGrande from "../encabezado-grande";
import CampoTarjeta from "../campo-texto/campo-texto-componente/CampoTarjeta";
import useCampoTexto from "../../utils/useCampoTexto";

const PantallaPruebas = () => {
  const input = useCampoTexto(
    "pruebaNumeroTarjeta",
    "",
    16,
    null,
    "Número de tarjeta",
    /^[0-9*]*$/
  );
  const ctConfirmarNumeroTarjeta = useCampoTexto(
    "pruebaConfirmarTarjeta",
    "",
    16,
    null,
    "Confirmar numero de tarjeta",
    /^[0-9*]*$/
  );

  return (
    <EnvolvedorPantallaPolizas key={1}>
      <EncabezadoGrande mostrarBack />

      <PantallaFondoBlanco>
        <Contenedor>
          {/*
            <iframe src={url} className="iframe" id="mitecIframe" />
            */}
          <CampoTarjeta {...input} />
          <CampoTarjeta {...ctConfirmarNumeroTarjeta} />
        </Contenedor>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaPruebas;

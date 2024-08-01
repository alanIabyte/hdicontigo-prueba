/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
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
  IconosFormaPago,
  Logo,
  ContenedorRef,
  Subtitulo,
  Parrafo,
  Espacio,
} from "./PantallaPagoOtraBancos.styled";
import Referencia from "../referencia-componente/Referencia";
import EncabezadoGrande from "../../encabezado-grande";
import IndicadorCarga from "../../indicador-carga";
import Constantes from "../../../recursos/constantes";
import { ReactComponent as IconoTarjeta } from "../../../recursos/iconos/ico_pago_tarjeta.svg";
import { ReactComponent as IconoTelefono } from "../../../recursos/iconos/ico_pago_telefono.svg";
import LogoBBVA from "../../../recursos/imagenes/logo_bbva.png";
import LogoHSBC from "../../../recursos/imagenes/logo_hsbc.png";
import LogoOxxo from "../../../recursos/imagenes/logo_oxxo.png";
import LogoBara from "../../../recursos/imagenes/logo_bara.png";
import LogoSantander from "../../../recursos/imagenes/logo_santander.png";

const diccionario = {
  titulo: "Bancos / Cajeros automáticos",
  subtituloTransferencia:
    "Pago por transferencia electrónica a cuenta CLABE (SPEI o TEF)",
  parr1:
    "Se deberá indicar en el campo de concepto de pago la referencia correspondiente, además indicar el importe exacto del recibo.",
  parr2: () => (
    <>
      En caso de que Santander le solicite una referencia numérica, ingresar{" "}
      <b>9999</b>.
    </>
  ),
  subtituloBancos: "Opciones de pago en bancos",
};

const PantallaPagoOtraBancos = () => {
  const history = useHistory();
  const { telContactanos } = Constantes;
  const location = useLocation();
  let referencias;

  if (location.state.referencias) {
    referencias = location.state.referencias;
  } else {
    history.push("/mis-polizas");
  }

  const pagarBancosCajeros = () => {
    history.push("/pago-otra");
  };

  const pagarAutoservicio = () => {
    history.push("/pago-otra");
  };

  const descargarFormatoPago = () => {
    console.log("DESCARGAR FORMATO");
  };

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      <EncabezadoGrande mostrarBack />
      <PantallaFondoBlanco>
        <Contenedor>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>

          <ContenedorRef>
            <Subtitulo>{diccionario.subtituloTransferencia}</Subtitulo>
            <Parrafo>{diccionario.parr1}</Parrafo>
            <Parrafo>{diccionario.parr2()}</Parrafo>

            <Espacio />

            {referencias.datosReferenciasClabe.map((referencia) => (
              <Referencia referencia={referencia} tipo="CLABE" />
            ))}
          </ContenedorRef>

          <ContenedorRef>
            <Subtitulo>{diccionario.subtituloBancos}</Subtitulo>
            {referencias.datosReferencias.map((referencia) => (
              <Referencia referencia={referencia} tipo="CONVENIO" />
            ))}
          </ContenedorRef>
        </Contenedor>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaPagoOtraBancos;

/*
      <PieDePagina>
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.descargarFormato}
            tema="deshabilitado"
            deshabilitado
            enClick={descargarFormatoPago}
          />
        </ContenedorBoton>
      </PieDePagina>
*/

/*  eslint-disable */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CampoTarjeta from "../../campo-texto/campo-texto-componente/CampoTarjeta";
import { MensajeError } from "./PantallaDomiciliacion.styled";
import useCampoTexto from "../../../utils/useCampoTexto";

const CamposTarjeta = ({
  errorNumeroTarjeta,
  errorConfirmarNumeroTarjeta,
  focoConfirmarNumeroTarjeta,
  focoNumeroTarjeta,
}) => {
  const estadoApp = useSelector((estado) => estado);

  const ctNumeroTarjeta = useCampoTexto(
    "ctNumeroTarjeta",
    estadoApp.ctNumeroTarjeta?.data || "",
    16,
    null,
    "Número de tarjeta de crédito",
    /^[0-9*]*$/
  );
  const ctConfirmarNumeroTarjeta = useCampoTexto(
    "ctConfirmarNumeroTarjeta",
    estadoApp.ctConfirmarNumeroTarjeta?.data || "",
    16,
    null,
    "Confirmar número de tarjeta de crédito",
    /^[0-9*]*$/
  );

  useEffect(() => {
    ctNumeroTarjeta.highlight(focoNumeroTarjeta);
  }, [focoNumeroTarjeta]);

  useEffect(() => {
    ctConfirmarNumeroTarjeta.highlight(focoConfirmarNumeroTarjeta);
  }, [focoConfirmarNumeroTarjeta]);

  return (
    <>
      <CampoTarjeta {...ctNumeroTarjeta} />
      <MensajeError id="errorNumeroTarjeta">{errorNumeroTarjeta}</MensajeError>

      <CampoTarjeta {...ctConfirmarNumeroTarjeta} />
      <MensajeError id="errorNumeroTarjeta">
        {errorConfirmarNumeroTarjeta}
      </MensajeError>
    </>
  );
};

export default CamposTarjeta;

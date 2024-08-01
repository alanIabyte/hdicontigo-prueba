/* eslint-disable */
import React from "react";
import { Wrapper, Texto, Icono } from "./DetalleCuentaHabiente.styled";
import IcoLapiz from "../../../recursos/iconos/ico_lapiz.png";

const DetalleCuentaHabiente = ({ cuentahabiente, callback }) => {
  return (
    <Wrapper show={cuentahabiente != null} onClick={callback}>
      <Texto>{`Tarjeta ${cuentahabiente?.numeroTarjeta}`}</Texto>
      <Icono src={IcoLapiz} alt="ico" />
    </Wrapper>
  );
};

export default DetalleCuentaHabiente;

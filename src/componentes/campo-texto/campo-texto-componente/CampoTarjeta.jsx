/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  ContenedorCampoTexto,
  CampoTextoStyled,
  Etiqueta,
} from "./CampoTextoTarjeta.styled";

const CampoTarjeta = ({
  value,
  onChange,
  regex,
  highlight,
  highlightType,
  onBlur,
  onKeyPress,
  maxLength,
  asPassword,
  label,
  stateName,
}) => {
  const maskCharacter = (str, mask, n = 1) => {
    return ("" + str).slice(0, -n).replace(/./g, mask) + ("" + str).slice(-n);
  };

  return (
    <ContenedorCampoTexto>
      <Etiqueta foco={highlightType}>{label}</Etiqueta>
      <CampoTextoStyled
        onFocus={() => {
          highlight("enfocado");
        }}
        type="text"
        value={value.length > 0 ? maskCharacter(value, "*", 4) : value}
        onBlur={onBlur}
        onChange={onChange}
        onKeyPress={onKeyPress}
        foco={highlightType}
        pattern={`${regex}`}
        maxLength={maxLength}
      />
    </ContenedorCampoTexto>
  );
};

export default CampoTarjeta;

/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { alpha, styled as styledMUI } from "@mui/material/styles";
import TextField from "@material-ui/core/TextField/TextField";
import {
  Parrafo,
  Subtitulo2,
  TituloSeccion,
  Subtitulo3
} from "../../componentes-styled-compartidos/Textos";

const ContenedorLabel = styled.label`
  cursor: pointer;
  width: 400px;
`;

const Contenedor = styled.div`
  width: 100%;
  height: 80px;
  display: grid;
  grid-template-columns: 90% auto;
  background-color: ${(props) => (props.validado ? "#4AA73E33" : "")};
  background-color: ${(props) =>
    props.amarillo && !props.validado ? "#f8c808f7" : ""};
  justify-content: flex-start;
  align-items: center;
  border: ${(props) =>
    props.validado ? "1px solid #4AA73E" : "1px solid #cccc"};
  border: ${(props) =>
    props.amarillo && !props.validado
      ? "1px solid #f8c808f7"
      : "1px solid#cccc"};
  border: ${(props) => !props.amarillo && !props.validado && "1px solid#cccc"};
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  p {
    color: ${(props) => (props.validado ? "#5a5a5a" : "black")};
  }

  div {
    color: ${(props) =>
      props.validado ? "#006729" : "var(--color-negro-normal)"};
    /* color: var(--color-negro-normal); */
  }

  ::placeholder {
    color: var(--color-gris-claro);
  }

  .cruz-eliminar {
    cursor: pointer;
    display: ${(props) => (props.validado ? "block" : "none")};
  }
`;

const BotonEliminarPoliza = styled(Parrafo)`
  color: var(--color-gris-medio);
  font-size: 25px;
  transition: all 0.3s ease;
  justify-self: flex-end;
  margin-right: 20px;
  /* cursor: pointer; */
  &:active {
    color: var(--color-negro-normal);
  }
`;

const ContenedorInputs = styled.form`
  width: 90%;
  height: 80px;
`;

const Encabezado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  box-sizing: border-box;
`;

const EncabezadoTitulo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const ContenidoAcordeon = styled.div`
  width: 100%;
  display: grid;
  margin-left: 15px;
  grid-template-rows: 2;
  grid-column-start: 2;
  grid-column-end: 3;
`;

const TituloAcordeon = styled(Subtitulo2)`
  font-size: 15px;
  font-weight: 700;
`;

const LabelInput = styled.label`
  font-family: var(--fuente-proxima-regular);
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: var(--color-negro-normal);
  font-size: 15px;
  font-weight: 700;
`;

const ParrafoAcordeon = styled.p`
  font-family: var(--fuente-proxima-regular);
  color: black;
  opacity: 0.7;
  margin: 0;
`;

const InputArchivos = styled.input`
  font-family: var(--fuente-proxima-regular);
  color: black;
  opacity: 0.7;
  margin: 0;
  display: none;
`;
const Separador = styled(TituloSeccion)`
  color: var(--color-gris-medio);
  text-align: left;
  width: 100%;
  text-overflow: ellipsis;
  white-space: pre;
`;

const SeparadorLinea = styled.div`
  width: 100%;
  border: solid 0.1px var(--fondo-gris);
  margin-top: 5px;
  margin-bottom: 15px;
`;

const Seccion = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 31px;
`;

const ContenedorBotonFactura = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const ContenedorFacturas = styled.form`
  width: 100%;
  height: 80px;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  text-align: left;
  color: var(--color-marca-normal);
`;
const ContenedorRegresar = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  align-items: center;
  width: auto;
  margin-top: 10px;
  cursor: pointer;
  ${MensajePequeno} {
    margin: 0;
    height: auto;
    width: auto;
    color: var(--color-verde-normal);
  }
`;
const ContenedorParaBoton = styled.div`
  width: 100%;
  min-height: calc(100%);
  display: flex;
  align-items: center;
  /* box-sizing: border-box; */
  /* & > div:last-of-type {
    margin-bottom: 100px;
  } */
  ${".icono-regresar"} {
    margin-left: -8px !important;
    padding-left: 0px !important;
    color: var(--color-marca-normal);
  }
`;

const CustomTextField = styledMUI((props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    color: "black",
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow"
    ]),
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha("#65a518", 0.25)} 0 0 0 2px`,
      borderColor: "#65a518"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  }
}));

const Espacio = styled.div`
  height: ${(props) => (props.tamano ? props.tamano : "20px")};
`;

export {
  Contenedor,
  Encabezado,
  ContenidoAcordeon,
  TituloAcordeon,
  ParrafoAcordeon,
  LabelInput,
  InputArchivos,
  ContenedorInputs,
  EncabezadoTitulo,
  ContenedorLabel,
  BotonEliminarPoliza,
  Separador,
  SeparadorLinea,
  Seccion,
  ContenedorBotonFactura,
  ContenedorFacturas,
  ContenedorRegresar,
  MensajePequeno,
  ContenedorParaBoton,
  CustomTextField,
  Espacio,
};

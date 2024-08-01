/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Parrafo, Subtitulo2 } from "../../componentes-styled-compartidos/Textos";

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
  background-color: ${(props) => (props.amarillo && !props.validado ? "#f8c808f7" : "")};
  justify-content: flex-start;
  align-items: center;
  border: ${(props) =>
    props.validado ? "1px solid #4AA73E" : "1px solid #cccc"};
  border: ${(props) => props.amarillo && !props.validado ? "1px solid #f8c808f7" : "1px solid#cccc"};
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
    display: ${(props) =>
      props.validado ? "block" : "none"};
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
  width: 100%;
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
  BotonEliminarPoliza
};

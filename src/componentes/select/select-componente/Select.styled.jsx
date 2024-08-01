/* eslint-disable */
import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const Contenedor = styled.div`
  width: 100%;
  margin-top: 22px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 20px;
  grid-template-rows: auto auto;
  ${".icono"} {
    width: 12px;
    height: 12px;
    grid-column: 2;
    grid-row: 2;
    align-self: center;
    margin-right: 12px;
  }
`;

//  TODO: PONER QUE SI ES DE MES SEA MÁS CHIQUITO

const Etiqueta = styled(Leyenda)`
  width: 100%;
  margin: 0 0 6px 4px;
  text-align: left;
  grid-column: 1/3;
  grid-row: 1;
  color: ${(props) => {
    const { foco } = props;
    if (foco === "enfocado") {
      return "var(--color-marca-normal)";
    }
    if (foco === "error") {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-medio)";
  }};
`;

const Campo = styled.div`
  grid-column: 1/3;
  grid-row: 2;
  cursor: pointer;
  outline: none;
  width: calc(100% - 45px);
  height: 19px;
  padding: 10px;
  padding-right: 35px;
  border-radius: 4px;
  border: solid 1px;
  background-color: var(--color-blanco-normal);
  font-family: var(--fuente-proxima-regular);
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-gris-medio);
  border-color: ${(props) => {
    const { foco } = props;
    if (foco === "enfocado") {
      return "var(--color-marca-normal)";
    }
    if (foco === "error") {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-claro)";
  }};
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const IconoTarjeta = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const ContenedorOpciones = styled.div`
  width: 100%;
  grid-column: 1/3;
  border-radius: 4px;
  border: solid 1px var(--color-gris-claro);
  position: absolute;
  background-color: var(--color-blanco-normal);
  z-index: ${(props) => props.index};
  max-height: ${(props) =>
    props.tipo === "Compacto"
      ? "140px"
      : props.tipo === "Mediano"
      ? "400px"
      : "fit-content"};
  overflow-y: auto;
  top: ${(props) =>
    props.tipo === "Compacto"
      ? "-100%"
      : props.tipo === "Mediano"
      ? "-100%"
      : "0"};
`;

const Opcion = styled.div`
  font-family: var(--fuente-proxima-regular);
  color: var(--color-gris-medio);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  max-width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-gris-normal);
  }
`;

const BusquedaOpciones = styled.input`
  font-family: var(--fuente-proxima-regular);
  color: var(--color-gris-medio);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  max-width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  outline: var(--color-marca-normal);
  font-size: 16px;
  text-transform: uppercase;
  &::-webkit-input-placeholder {
    /* WebKit browsers */
    text-transform: none;
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    text-transform: none;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    text-transform: none;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    text-transform: none;
  }
  &::placeholder {
    /* Recent browsers */
    text-transform: none;
  }
`;

export {
  Contenedor,
  Etiqueta,
  Campo,
  IconoTarjeta,
  ContenedorOpciones,
  Opcion,
  BusquedaOpciones,
};

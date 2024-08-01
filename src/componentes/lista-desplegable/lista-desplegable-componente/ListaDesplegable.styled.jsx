import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const Contenedor = styled(Leyenda)`
  position: relative;
  width: 100%;
`;

const ContenedorListaDesplegable = styled.div``;

const CajaListaDesplegable = styled.div`
  width: 200px;
  position: relative;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  color: var(--color-negro-normal);
  width: calc(100% - 45px);
  height: 18px;
  padding: 13px 35px 8px 10px;
  border-radius: 4px;
  border: solid 1px;
  background-color: var(--color-blanco-normal);
  border-color: var(--color-gris-claro);
`;

const SeleccionListaDesplegable = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
`;

const OpcionListaDesplegable = styled.div`
  border: solid 1px;
  border-color: var(--color-gris-claro);
  display: block;
  position: absolute;
  width: 100%;
  background-color: var(--color-blanco-normal);
  height: 150px;
  margin: 5px 0 9px;
  border-radius: 4px;
  overflow: scroll;
  display: ${(props) => (props.despliegaOpciones ? "block" : "none")};
  z-index: 1;
`;

const Opcion = styled.div`
  padding: 12px 0px 12px 10px;
  ${({ seleccionado }) =>
    seleccionado &&
    `
      background-color: rgba(0, 108, 48, 0.1);
    `}
`;

const FlechaListaDesplegable = styled.div`
  width: 30px;
  height: 100%;
  margin: 0;
  padding: 0;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
`;

const Flecha = styled.div`
  position: absolute;
  top: 18px;
  left: 12px;
  width: 0;
  height: 0;
  ${({ despliegaOpciones }) =>
    !despliegaOpciones &&
    `
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid var(--color-marca-normal);
  `}
  ${({ despliegaOpciones }) =>
    despliegaOpciones &&
    `
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 7px solid var(--color-marca-normal);
  `}
`;

const Etiqueta = styled(Leyenda)`
  width: 100%;
  margin: 0 0 6px 4px;
  text-align: left;
  color: "var(--color-gris-medio)";
`;

export {
  CajaListaDesplegable,
  Contenedor,
  ContenedorListaDesplegable,
  Etiqueta,
  Flecha,
  FlechaListaDesplegable,
  Opcion,
  OpcionListaDesplegable,
  SeleccionListaDesplegable,
};

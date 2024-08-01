/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { CuerpoLiga } from "../../componentes-styled-compartidos/Textos";

const Instrucciones = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  text-align: ${(props) => (props.centrado ? "center !important" : "")};
  margin: 10px 0 65px;
  text-align: left;
  color: ${(props) =>
    props.enlacePrincipal
      ? "var(--color-verde-enlace)"
      : "var(--color-negro-puro)"};
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
    font-weight: 700;
  }
`;

export { Instrucciones };

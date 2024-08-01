/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

const BarraAlertaIcono = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-width: 50px;
  text-align: center;
`;
const BarraAlertaContenedor = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

const Hipervinculo = styled.a`
  &:link {
    color: var(--texto-blanco);
    background-color: transparent;
    text-decoration: underline;
  }
  &:visited {
    color: var(--texto-blanco);
    background-color: transparent;
    text-decoration: none;
  }
  &:hover {
    color: var(--texto-blanco);
    background-color: transparent;
    text-decoration: underline;
  }
  &:active {
    color: var(--texto-blanco);
    background-color: transparent;
    text-decoration: underline;
  }
`;

const BarraAlertaCierre = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-width: 50px;
  text-align: center;
`;

const Espacio = styled.div`
  height: ${(props) => (props.tamano ? props.tamano : "20px")};
`;

export {
  BarraAlertaIcono,
  BarraAlertaContenedor,
  Hipervinculo,
  BarraAlertaCierre,
  Espacio,
};

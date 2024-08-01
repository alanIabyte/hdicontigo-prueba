/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { Subtitulo2 } from "../../componentes-styled-compartidos/Textos";

export const ParrafoPoliza = styled.p`
  font-family: var(--fuente-proxima-regular);
  font-size: 14px;
  color: black;
  opacity: 0.7;
  margin: 0;
`;

export const TituloPoliza = styled(Subtitulo2)`
  font-size: 16px;
  font-weight: 600;
  span {
    font-weight: 400;
  }
`;

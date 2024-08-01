/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

const ContenedorPasos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContenedorPaso = styled(ContenedorPasos)`
  flex-direction: row;
  gap: 40px;
`;

export { ContenedorPasos, ContenedorPaso };

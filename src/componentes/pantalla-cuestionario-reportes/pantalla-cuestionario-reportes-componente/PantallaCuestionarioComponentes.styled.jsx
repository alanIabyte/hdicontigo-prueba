/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

const ContenedorPreguntas = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.numeroPreguntas}, 1fr)`};
  align-content: start;
`;

export { ContenedorPreguntas };

/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import styled from "styled-components";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";

const ContenedorBottom = styled.div`
  width: 100%;
  position: absolute;
  top: 430px;
  padding: 20px;
`;

const ContenedorRequisitos = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.numeroRequisitos}, 1fr)`};
  grid-gap: 30px;
  align-content: start;
  margin-top: 1.5rem;
`;

const PantallaFondoGrisRobo = styled(Pantalla)`
  background-color: var(--color-blanco-normal);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: column;
  border-radius: 0px;
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export {
  ContenedorBottom,
  ContenedorRequisitos,
  PantallaFondoGrisRobo,
}
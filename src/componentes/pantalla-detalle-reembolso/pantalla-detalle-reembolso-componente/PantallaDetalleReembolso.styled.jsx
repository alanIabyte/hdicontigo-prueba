/* eslint-disable */
import styled from "styled-components";
import { Subtitulo3Negritas, Titulo1 } from "../../componentes-styled-compartidos/Textos";

const ContenedorDividido = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Contenedor2Secciones = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextoIzquierdo = styled(Titulo1)`
  font-size: 17px;
  color: var(--color-negro-normal);
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

const TextoDerecha = styled(Subtitulo3Negritas)`
  font-size: 14px;
  color: var(--color-gris-medio);
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

export {
  ContenedorDividido,
  TextoIzquierdo,
  Contenedor2Secciones,
  TextoDerecha 
};

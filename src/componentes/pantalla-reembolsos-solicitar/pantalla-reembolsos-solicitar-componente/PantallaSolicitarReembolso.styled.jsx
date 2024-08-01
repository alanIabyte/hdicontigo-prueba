/* eslint-disable */
import styled from "styled-components";
import { Subtitulo2 } from "../../componentes-styled-compartidos/Textos";
const ContenedorPolizas = styled.div`
  width: 100%;
  min-height: calc(100% + 0px);
  & > div:last-of-type {
    margin-bottom: 100px;
  }
  ${({ polizas }) =>
    polizas &&
    `
    & > div:last-of-type {
      padding-bottom: 100px;
    }
  `}
`;

const Contenedor = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: flex-start;
  border: 1px solid #cccc;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--fondo-blanco-normal);

  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

const Encabezado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
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

const ParrafoAcordeon = styled.p`
  font-family: var(--fuente-proxima-regular);
  color: black;
  opacity: 0.7;
  margin: 0;
`;

const Contenido = styled.div`
  width: auto;
  padding: 15px 24px;
  grid-gap: 5px;
  border-top: 1px solid var(--color-gris-normal);
`;

// eslint-disable-next-line prettier/prettier
export {
  ContenedorPolizas,
  Contenedor,
  ContenidoAcordeon,
  TituloAcordeon,
  ParrafoAcordeon,
  Contenido,
  Encabezado,
};

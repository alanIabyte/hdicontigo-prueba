/* eslint-disable */
import styled from "styled-components"

const ContenedorInputFile = styled.div`
  border: solid 1px var(--color-gris-claro);
  padding: 10px 14px;
  display: flex;
  flex-flow: column;
  border-radius: 5px;
  cursor: pointer;
  padding-bottom: 20  px;

  font-family: var(--fuente-proxima-regular);
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  color: var(--color-gris-medio);
`;

const ContenedorTextoEtiqueta = styled.div`
  width: 100%;
  font-size: 14px;
  display: inline;
  margin-bottom: 5px;
  z-index: 1;
  text-align: left;
  color: #006729;

  font-family: var(--fuente-proxima-regular);
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
`;

const CampoFile = styled.input`
  display: none;
`;

export {
  ContenedorInputFile,
  ContenedorTextoEtiqueta,
  CampoFile
}
import styled from "styled-components";
import { Subtitulo3 } from "../../componentes-styled-compartidos/Textos";

const SeccionPasosProgreso = styled.div`
  margin-left: 10px;
  margin-right: 12px;
`;

const EncabezadoPasosProgreso = styled.div`
  display: flex;
  margin: 15px 0;
`;

const ContenedorIconoCirculo = styled.div`
  color: ${(props) =>
    props.opcional ? "var(--color-gris-claro)" : "var(--color-marca-normal)"};
  margin-right: 10px;
  display: flex;
`;

const CuerpoPasosProgreso = styled.div`
  margin-left: 26px;
`;

const TituloSeccionPasosProgreso = styled(Subtitulo3)`
  color: ${(props) =>
    props.opcional ? "var(--color-gris-claro)" : "var(--color-negro-normal)"};
  font-family: var(--fuente-proxima-bold);
`;

const ContenedorIconoVerMas = styled.button`
  background: none;
  border: none;
  color: var(--color-gris-claro);
  cursor: pointer;
  font: inherit;
  margin-left: auto;
  outline: inherit;
  padding: 0;
`;

export {
  SeccionPasosProgreso,
  EncabezadoPasosProgreso,
  ContenedorIconoCirculo,
  CuerpoPasosProgreso,
  TituloSeccionPasosProgreso,
  ContenedorIconoVerMas,
};

import styled from "styled-components";
import {
  Subtitulo3,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorEncabezadoPasosProgreso = styled.div`
  align-items: center;
  background-color: var(--color-blanco-puro);
  /* border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px; */
  color: var(--color-verde-normal);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 24px 80% 24px;
  justify-items: center;
  min-height: 103px;
  padding: 0 18px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: ${(props) => (props.seAbrioMenu ? "4" : "3")};
`;

const ContenedorTexto = styled(Leyenda)`
  align-items: center;
  color: var(--color-verde-normal);
  display: flex;
  flex-direction: column;
`;

const TextoModeloEncabezado = styled(Subtitulo3)`
  color: var(--color-verde-normal);
  font-weight: 700;
  padding-top: 10px;
  text-align: center;
`;

export {
  ContenedorTexto,
  EnvolvedorEncabezadoPasosProgreso,
  TextoModeloEncabezado,
};

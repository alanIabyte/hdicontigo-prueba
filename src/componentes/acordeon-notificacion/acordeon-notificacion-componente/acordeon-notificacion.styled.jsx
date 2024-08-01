/* eslint-disable */
import styled from "styled-components";
import {
  Subtitulo2Negritas,
  Subtitulo3,
  Parrafo,
} from "../../componentes-styled-compartidos/Textos";

const Contenedor = styled.div`
  border-bottom: 2px solid var(--fondo-gris-claro);
  transition: all 0.3s ease;
  margin-bottom: 20px;
  padding: 14px 0;
  background-color: var(--fondo-gris-normal);
`;

const Encabezado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: rcw;
  align-items: flex-start;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 5px;
`;

const IconoEncabezado = styled.img`
  width: 60px;
  height: 60px;
  margin-top: -10px;
`;

const TituloAcordeon = styled(Subtitulo2Negritas)`
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const SubTituloAcordeon = styled(Subtitulo3)``;

const ContenedorEstatus = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0 5px 0;
`;

const FechaNotificacion = styled(Subtitulo3)`
  padding: 0;
  margin: 0;
  margin-left: auto;
`;

const ContenidoNotificacion = styled(Parrafo)``;

export {
  Contenedor,
  Encabezado,
  TituloAcordeon,
  SubTituloAcordeon,
  ContenedorEstatus,
  FechaNotificacion,
  ContenidoNotificacion,
  IconoEncabezado,
};

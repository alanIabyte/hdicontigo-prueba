/* eslint-disable */
import styled from "styled-components";
import { Leyenda, ParrafoNegritas } from "../../componentes/componentes-styled-compartidos/Textos";

const ContenedorPrincipalBusquedaTalleres = styled.div`
  width: 100%;
  height: auto;
  border: solid 2px var(--color-verde-normal);
  background-color: var(--fondo-gris-ligero);
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
`;

const ContenedorHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
`;

const IconoHeader = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 30px;
`;

const ContenedorTexto = styled(Leyenda)`
  align-items: center;
  color: var(--color-negro-puro);
  font-size: 16px;
  margin-top: 0.75rem;
`;

const EncabezadoEncontrarTaller = styled.div`
  display: flex;
  align-items: flex-end;
  flex-flow: column;
  height: auto;
  padding: 0.75rem 1.6rem;
  width: 100%;
  background-color: var(--color-blanco-normal);
  box-shadow: 0 3px 3px 0 var(--color-gris-claro);
  color: var(--color-marca-normal);
  width: 100%;
  z-index: 2;
`;

const TextoVerdeEncontrarTaller = styled(ParrafoNegritas)`
  width: 100%;
  margin: 2rem auto;
  color: var(--color-marca-normal);
  width: auto;
`;

const ContentMapT = styled.div`
  height: 300px;
  position: relative;
  width: 100%;
`;

export {
  ContenedorPrincipalBusquedaTalleres,
  ContenedorHeader,
  IconoHeader,
  ContenedorTexto,
  EncabezadoEncontrarTaller,
  TextoVerdeEncontrarTaller,
  ContentMapT
}

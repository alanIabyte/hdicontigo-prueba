/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { Leyenda } from "../componentes-styled-compartidos/Textos";

const ContenedorPantallaBienvenida = styled.div`
  align-items: center;
  background-color: var(--fondo-blanco-normal);
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 24px;
  position: relative;
  top: -18px;
  width: 100%;
`;

const EtiquetaNegro = styled(Leyenda)`
  width: 100%;
  display: inline;
  font-size: 14px;
  text-align: left;
  color: var(--color-negro-puro);
  margin-bottom: 10px;
  margin-top: 30px;
`;

export { ContenedorPantallaBienvenida, EtiquetaNegro };

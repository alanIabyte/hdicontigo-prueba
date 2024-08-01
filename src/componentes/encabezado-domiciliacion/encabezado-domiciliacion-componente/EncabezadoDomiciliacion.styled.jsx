import styled from "styled-components";
import {
  Leyenda,
  Subtitulo1,
} from "../../componentes-styled-compartidos/Textos";
import fondo from "../../../recursos/imagenes/fondo-encabezado.png";

const Encabezado = styled.div`
  background-color: var(--color-blanco-normal);
  /* background-image: url(${fondo}); */
  box-shadow: 0 4px 8px 0 var(--color-gris-medio);
  color: var(--color-verde-normal);
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-template-rows: auto auto;
  grid-row-gap: 20px;
  z-index: 90;
  padding: 40px 24px;
  box-sizing: border-box;
`;

const ContenedorIcono = styled.div`
  grid-column: 1;
  grid-row: 1;
  /* background-color: var(--fondo-verde); */
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  justify-content: center;
  transition: all 0.3s ease;
  ${".icono"} {
    transform: scale(1.3);
  }
  &:active {
    background-color: var(--fondo-verde-oscuro);
  }
`;

const Titulo = styled(Subtitulo1)`
  grid-column: 2;
  grid-row: 1;
  color: var(--color-verde-normal);
  font-family: var(--fuente-proxima-regular);
  text-align: center;
`;

const ContenedorDetalle = styled.div`
  grid-column: 1/4;
  grid-row: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const LineaNegocio = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(--fuente-proxima-bold);
  color: var(--color-verde-normal);
  ${".icono"} {
    transform: scale(1.5);
    margin-right: 12px;
    color: var(--color-verde-normal);
  }
`;

const NumeroPoliza = styled(Leyenda)`
  color: var(--color-verde-normal);
  font-size: 18px;
  font-weight: 700;
`;

export {
  ContenedorIcono,
  Titulo,
  Encabezado,
  LineaNegocio,
  NumeroPoliza,
  ContenedorDetalle,
};

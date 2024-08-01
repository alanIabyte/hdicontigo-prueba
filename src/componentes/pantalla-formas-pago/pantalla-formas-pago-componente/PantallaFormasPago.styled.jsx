import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo3,
  Leyenda,
  Subtitulo3Negritas,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
  height: calc(100% - 56px);
`;

const PantallaFondoBlanco = styled(Pantalla)`
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: calc(100% - 118px);
  overflow: scroll;
  overflow-x: hidden;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const Contenedor = styled.div`
  width: 100%;
  height: calc(100%);
  box-sizing: border-box;
  & > div:last-of-type {
    margin-bottom: 100px;
  }
`;

const TituloMisPolizas = styled(Titulo3)`
  margin-bottom: 28px;
  margin-top: 40px;
`;

const ContenedorFormasPago = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const FormaPago = styled.div`
  width: 100%;
  border: 1px solid var(--color-gris-claro);
  border-radius: 6px;
  padding: 16px 24px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 28px;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  background-color: var(--color-blanco-normal);
  cursor: pointer;
  user-select: none;
  width: 100%;
  &:hover {
    box-shadow: 0 2px 20px 0 rgba(49, 49, 49, 0.09);
  }
  &:active {
    transform: scale(0.96);
  }
  filter: ${(props) => (props.deshabilitada ? "grayscale(100%)" : "none")};
  opacity: ${(props) => (props.deshabilitada ? "0.6" : "1")};
  pointer-events: ${(props) => (props.deshabilitada ? "none" : "visible")};
`;

const ContenedorIcono = styled.div`
  grid-column: 1;
  grid-row: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  ${".icono"} {
    width: 44px;
  }
`;

const DescripcionFormaPago = styled(Leyenda)`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gris-medio);
  line-height: 1.5;
  grid-row: 2;
  grid-column: 2/3;
  display: flex;
`;

const NombreFormaPago = styled(Subtitulo3Negritas)`
  font-size: 16px;
  color: var(--color-negro-normal);
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-column: 2/3;
  grid-row: 1;
  display: flex;
  align-items: flex-start;
`;

export {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  Contenedor,
  TituloMisPolizas,
  ContenedorFormasPago,
  ContenedorIcono,
  MensajePequeno,
  NombreFormaPago,
  FormaPago,
  DescripcionFormaPago,
};

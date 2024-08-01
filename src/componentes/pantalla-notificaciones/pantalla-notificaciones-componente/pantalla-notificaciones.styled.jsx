import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import { Titulo3 } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaNotificaciones = styled(EnvolvedorPantalla)`
  height: calc(100%);
  position: relative;
`;

const PantallaFondoGris = styled(Pantalla)`
  background-color: var(--fondo-gris-ligero);
  border-radius: 0px;
  height: calc(100% - 170px);
  overflow: scroll;
  overflow-x: hidden;
`;

const ContenedorNotificaciones = styled.div`
  width: 100%;
  min-height: calc(100% + 0px);
  & > div:last-of-type {
    margin-bottom: 100px;
  }
  ${({ notificaciones }) =>
    notificaciones &&
    `
    & > div:last-of-type {
      padding-bottom: 100px;
    }
  `}
`;

const TituloNotificaciones = styled(Titulo3)`
  margin-bottom: 15px;
  margin-top: 30px;
`;

export {
  EnvolvedorPantallaNotificaciones,
  PantallaFondoGris,
  ContenedorNotificaciones,
  TituloNotificaciones,
};

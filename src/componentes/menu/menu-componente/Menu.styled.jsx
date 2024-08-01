import styled from "styled-components";
import { Cuerpo } from "../../componentes-styled-compartidos/Textos";

const Contenedor = styled.div`
  ${({ absoluto }) =>
    absoluto &&
    `
    .hamburguesa {
      position: absolute;
      top: 10%;
      left: 16px;
      z-index: 1;
    }
  `}
`;

const ContenedorMenu = styled.div`
  height: 100vh;
  width: ${(props) => (props.abierto ? "100%" : "0%")};
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-x: hidden;
`;

const MenuStyled = styled.div`
  height: 100vh;
  overflow-y: auto;
  width: ${(props) => (props.abierto ? "70%" : "0%")};
  background-color: var(--fondo-blanco-normal);
  transition: all 0.2s linear;
`;

const ContenedorMenuEncabezado = styled.div`
  display: block;
  height: 90px;
  border-bottom: solid 1px var(--fondo-gris);
`;

const ContenedorMenuOpcion = styled(Cuerpo)`
  padding: 16px 35px;
  color: var(--color-gris-medio);
  display: block;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

const ImgIconoMenu = styled.img`
  width: 100%;
  max-width: 35px;
  height: auto;
`;

const ContenedorMenuPie = styled.div`
  border-top: solid 1px var(--fondo-gris);
  position: absolute;
  background-color: #fff !important;
  bottom: 0;
  width: ${(props) => (props.abierto ? "70%" : "0%")};
  transition: all 0.2s linear;
  color: var(--color-gris-medio);
  cursor: pointer;
  svg {
    float: left;
    margin-top: -3px;
    margin-right: 15px;
    color: var(--color-gris-medio);
  }
`;

const ContenedorMenuPieContenido = styled(Cuerpo)`
  margin: 16px 35px;
  width: 100%;
`;

const Logo = styled.img`
  width: 146px;
  margin: 36px;
`;

const contenedorLogo = styled.div`
  margin: 36px;
`;

const BurbujaNotificaciones = styled.div`
  position: absolute;
  padding: 0.2rem 0.3rem;
  background-color: red;
  top: 10px;
  right: 35px;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  font-family: var(--fuente-montserrat-regular);
`;

export {
  Contenedor,
  ContenedorMenu,
  ContenedorMenuEncabezado,
  ContenedorMenuOpcion,
  ImgIconoMenu,
  ContenedorMenuPie,
  ContenedorMenuPieContenido,
  Logo,
  MenuStyled,
  contenedorLogo,
  BurbujaNotificaciones,
};

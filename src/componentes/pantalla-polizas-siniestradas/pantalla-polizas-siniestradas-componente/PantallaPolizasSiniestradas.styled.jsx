/* eslint-disable */
import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo1,
  Subtitulo3,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const PantallaFondoGris = styled(Pantalla)`
  background-color: var(--fondo-gris-ligero);
  border-radius: 0px;
  height: calc(100% - 171px);
  overflow: scroll;
`;

const ContenedorPolizasSiniestradas = styled.div`
  width: 100%;
  height: calc(100% + 170px);
  ${({ polizas }) =>
    polizas &&
    `
    & > div:last-of-type {
      padding-bottom: 100px;
    }
  `}
`;

const TituloPolizasSiniestradas = styled(Titulo3)`
  margin-bottom: 15px;
  margin-top: 20px;
`;

const ContenedorBuscadorPolizasSiniestradas = styled.div`
  background-color: var(--fondo-blanco-normal);
  border: none;
  border-radius: 50px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: var(--color-gris-claro);
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
`;

const BuscadorPolizasSiniestradas = styled.input`
  border: none;
  outline: none;
  padding-left: 9px;
  width: 100%;

  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

const ContenedorPolizaSiniestrada = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
`;

const PieDePaginaPolizasSiniestradas = styled.div`
  background-color: var(--fondo-gris-ligero);
  box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.16);
  width: 100%;
  position: absolute;
  ${(props) => (props.bottomSinBar === "1" ? "bottom: 44px;" : "bottom: 0;")}
`;

const ContenedorBoton = styled.div`
  margin: 20px 24px;
`;

const ContenedorSubidaDeFotosCompleto = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-x: hidden;
`;

const ContenedorSubidaDeFotos = styled.div`
  background-color: var(--color-blanco-normal);
  width: 100%;
  height: 225px;
  border-radius: 16px 16px 0 0;
  ${(props) => (props.bottomSinBar === "1" ? "padding: 41px 0 15px 0;" : "padding: 41px 0 0;")}
  position: absolute;
  ${(props) => (props.bottomSinBar === "1" ? "bottom: 44px;" : "bottom: 0;")}
`;

const ContenedorBotonSubidaDeFotos = styled.div`
  padding: 64px 11% 0 11%;
  button {
    min-height: 38px;
  }
`;

const ContenedorOpcionSubidaDeFotos = styled.div`
  padding: 16px 11%;
  cursor: pointer;
  svg {
    color: var(--color-gris-medio);
    width: 16px;
    float: left;
    margin-top: -3px;
    margin-right: 14px;
  }
`;

const ContenedorOpcionSubidaDeFotosTexto = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  font-family: var(--fuente-proxima-bold);
`;

const Archivo = styled.input`
  display: none;
`;

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
  height: 100%;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const ContenedorSinSiniestros = styled(Subtitulo1)`
  align-items: center;
  color: var(--color-gris-claro);
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  text-align: center;
`;

export {
  Archivo,
  BuscadorPolizasSiniestradas,
  ContenedorBoton,
  ContenedorBotonSubidaDeFotos,
  ContenedorBuscadorPolizasSiniestradas,
  ContenedorOpcionSubidaDeFotos,
  ContenedorOpcionSubidaDeFotosTexto,
  ContenedorPolizaSiniestrada,
  ContenedorPolizasSiniestradas,
  ContenedorSubidaDeFotos,
  ContenedorSubidaDeFotosCompleto,
  EnvolvedorPantallaPolizas,
  MensajeError,
  PantallaFondoGris,
  PieDePaginaPolizasSiniestradas,
  TituloPolizasSiniestradas,
  ContenedorSinSiniestros,
};

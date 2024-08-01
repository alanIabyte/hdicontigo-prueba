import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo1,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
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

const ContenedorPolizas = styled.div`
  width: 100%;
  min-height: calc(100% + 0px);
  & > div:last-of-type {
    margin-bottom: 100px;
  }
  ${({ polizas }) =>
    polizas &&
    `
    & > div:last-of-type {
      padding-bottom: 100px;
    }
  `}
`;

const TituloMisPolizas = styled(Titulo3)`
  margin-bottom: 15px;
  margin-top: 30px;
`;

const ContenedorBuscadorPolizas = styled.div`
  background-color: var(--fondo-blanco-normal);
  border: none;
  border-radius: 50px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: var(--color-gris-claro);
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
`;

const BuscadorPolizas = styled.input`
  border: none;
  outline: none;
  padding-left: 9px;
  width: 100%;

  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

const PieDePaginaMisPolizas = styled.div`
  background-color: var(--fondo-gris-ligero);
  width: 100%;
  position: absolute;
  bottom: 0;
  @media screen and (max-width: 578px) {
    position: absolute;
  }
`;

const ContenedorBoton = styled.div`
  margin: 20px 24px;
`;

const ContenedorPoliza = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
`;

const ContenedorSinSiniestros = styled(Subtitulo1)`
  align-items: center;
  color: var(--color-gris-claro);
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  text-align: center;
`;

const ImagenSinSiniestros = styled.img`
  height: 94px;
  margin-bottom: 30px;
  width: 94px;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-negro-puro);
`;

export {
  EnvolvedorPantallaPolizas,
  PantallaFondoGris,
  ContenedorPolizas,
  TituloMisPolizas,
  ContenedorBuscadorPolizas,
  BuscadorPolizas,
  PieDePaginaMisPolizas,
  ContenedorBoton,
  ContenedorPoliza,
  ContenedorSinSiniestros,
  ImagenSinSiniestros,
  MensajePequeno,
};

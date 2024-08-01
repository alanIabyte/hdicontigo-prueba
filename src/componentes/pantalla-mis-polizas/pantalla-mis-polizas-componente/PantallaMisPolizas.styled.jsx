import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo1,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
  height: calc(100% - 56px);
`;

const PantallaFondoGris = styled(Pantalla)`
  /* background-color: var(--fondo-gris-ligero); */
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: calc(100% - 115px);
  overflow: scroll;
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
  margin-top: 20px;
`;

const ContenedorBuscadorPolizas = styled.div`
  background-color: var(--fondo-blanco-normal);
  border: 2px solid #cccc;
  height: 45px;
  border-radius: 7px;
  /* box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); */
  color: var(--color-gris-claro);
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  position: relative;
`;

const EtiquetaBuscador = styled(Leyenda)`
  position: absolute;
  font-size: 14px;
  left: 19px;
  display: inline;
  margin-top: 3px;
  font-weight: 700;
  margin-bottom: 10px;
  z-index: 1;
  text-align: left;
  color: #006729;
  @media (max-width: 380px) and (min-width: 320px) {
    font-size: 8px;
  }
  @media (max-width: 380px) and (min-width: 355px) {
    font-size: 10px;
  }
  @media (max-width: 440px) and (min-width: 400px) {
    font-size: 12px;
  }
`;

const BuscadorPolizas = styled.input`
  border: none;
  padding-top: 15px;
  outline: none;
  padding-left: 9px;
  width: 100%;

  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

const PieDePaginaMisPolizas = styled.div`
  /* background-color: var(--fondo-gris-ligero); */
  width: 100%;
  position: absolute;
  ${(props) => (props.bottomSinBar === "1" ? "bottom: 44px;" : "bottom: 0;")}
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
  EtiquetaBuscador,
};

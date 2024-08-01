import styled from "styled-components";
import {
  BotonGrande,
  Leyenda,
  CuerpoLiga,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaBienvenida = styled.div`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

const ImagenBienvenida = styled.img`
  width: 100%;
`;

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

const ContenedorLogoBienvenida = styled.div`
  height: 101px;
  margin-top: 70px;
  margin-bottom: 90px;
  max-width: 140px;
  padding-bottom: 40px;
  width: 100%;
`;

const LogoBienvenida = styled.img`
  width: 100%;
`;

const TituloBienvenidaH1 = styled.h1`
  background: none;
  border: 0;
  color: var(--color-gris-medio);
  outline: inherit;
  padding-bottom: 20px;
  padding-top: 25px;
  text-align: center;
  margin-top: ${(props) => (props.ingreso ? "-46px" : "")};
  font-family: var(--fuente-montserrat-bold);
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  color: var(--color-negro-normal);
`;

const TituloBienvenida = styled(BotonGrande)`
  background: none;
  border: 0;
  color: var(--color-gris-medio);
  outline: inherit;
  padding-bottom: 20px;
  padding-top: 25px;
  text-align: center;
  margin-top: ${(props) => (props.ingreso ? "-46px" : "")};
`;

const PieDePaginaBienvenida = styled(Leyenda)`
  align-items: center;
  color: var(--color-azul-normal);
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

const SeparadorBienvenida = styled.div`
  background-color: var(--color-gris-claro);
  border: solid 0px var(--color-gris-claro);
  height: 24px;
  width: 1px;
`;

const EnlaceBienvenida = styled.a`
  color: ${(props) => (props.enlace ? "#003960" : "var(--color-negro-puro)")};
  cursor: pointer;
  text-decoration: none;
  text-align: left !important;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
    font-weight: 700;
  }
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  height: 20px;
`;

const Instrucciones = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 10px 0 65px;
  text-align: left;
  color: var(--texto-azul);
  font-size: 14px;
`;

const RegresarBoton = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
  align-self: flex-start;
  margin-top: 24px;
  svg {
    color: var(--color-negro-normal);
    transform: scale(0.9);
  }
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const EnlaceRegistroBienvenida = styled(PieDePaginaBienvenida)`
  cursor: pointer;
`;

export {
  ContenedorLogoBienvenida,
  ContenedorPantallaBienvenida,
  EnlaceBienvenida,
  EnvolvedorPantallaBienvenida,
  ImagenBienvenida,
  Instrucciones,
  LogoBienvenida,
  MensajeError,
  PieDePaginaBienvenida,
  RegresarBoton,
  SeparadorBienvenida,
  SeparadorEspacio,
  TituloBienvenida,
  EnlaceRegistroBienvenida,
  TituloBienvenidaH1,
};

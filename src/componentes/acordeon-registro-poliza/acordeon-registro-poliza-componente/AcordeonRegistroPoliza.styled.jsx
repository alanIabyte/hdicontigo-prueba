import styled from "styled-components";
import { Subtitulo2 } from "../../componentes-styled-compartidos/Textos";

const ContenedorBotones = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 80px);
  grid-gap: 50px;
`;

const Contenedor = styled.div`
  width: 100%;
  height: 100px;
  display: ${(props) => (props.show ? "grid" : "none")};
  grid-template-columns: repeat(2, auto);
  justify-content: flex-start;
  border: 1px solid #cccc;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--fondo-blanco-normal);

  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

const Encabezado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  box-sizing: border-box;
`;

const EnvolvedorIcono = styled.div`
  display: flex;
  align-items: center;
`;

const EnvolvedorImagen = styled.img`
  width: 45px;
`;

const ContenidoAcordeon = styled.div`
  width: 100%;
  display: grid;
  margin-left: 15px;
  grid-template-rows: 2;
  grid-column-start: 2;
  grid-column-end: 3;
`;

const TituloAcordeon = styled(Subtitulo2)`
  font-size: 19px;
  font-weight: 700;
  span {
    font-weight: 400;
  }
  @media (max-width: 280px) {
    font-size: 11px;
  }
`;

const ParrafoAcordeon = styled.p`
  font-family: var(--fuente-proxima-regular);
  font-size: 17px;
  color: black;
  opacity: 0.7;
  margin: 0;

  @media (max-width: 280px) {
    font-size: 11px;
  }
`;

const Contenido = styled.div`
  width: auto;
  padding: 15px 24px;
  grid-gap: 5px;
  border-top: 1px solid var(--color-gris-normal);
`;

export {
  ContenedorBotones,
  Contenedor,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ContenidoAcordeon,
  TituloAcordeon,
  ParrafoAcordeon,
  Contenido,
};

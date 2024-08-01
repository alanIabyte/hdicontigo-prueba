import styled from "styled-components";
import {
  Subtitulo2,
  Titulo3,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorBotones = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, minmax(80px, auto));
  grid-gap: 20px;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  text-align: left;
  color: var(--color-marca-normal);
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 10px;
  text-align: left;
`;

const Contenedor = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-content: center;
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
  // position: absolute;
  // left: 140px;
  // top: 169px;
  width: 31px;
  margin-left: 15px;
`;

const ContenidoAcordeon = styled.div`
  width: 100%;
  display: grid;
  margin-left: 30px;
  grid-template-rows: 2;
  grid-column-start: 2;
  grid-column-end: 3;
`;

const TituloAcordeon = styled(Subtitulo2)`
  font-size: 15px;
  font-weight: 700;
`;

const ParrafoAcordeon = styled.p`
  font-family: var(--fuente-proxima-regular);
  color: black;
  opacity: 0.7;
  margin: 0;
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
  MensajePequeno,
  Titulo,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ContenidoAcordeon,
  TituloAcordeon,
  ParrafoAcordeon,
  Contenido,
};

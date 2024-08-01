import styled from "styled-components";
import {
  Leyenda,
  BotonDescarga,
} from "../../componentes-styled-compartidos/Textos";

const BotonTaller = styled(BotonDescarga)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 18px;
`;

const ContenedorTaller = styled.div`
  width: 100%;
`;

const EnvolvedorTaller = styled.div`
  width: 100%;
`;

const NombreTaller = styled(Leyenda)`
  color: var(--color-gris-medio);
  margin-bottom: 10px;
`;

const UbicacionTaller = styled.a`
  widht: 100%;
  text-decoration: none;
`;

const UbicacionTallerTexto = styled(Leyenda)`
  margin-top: 8px;
  color: var(--texto-azul);
  cursor: pointer;
`;

const ContenedorQR = styled.div`
  padding: 35px 0 25px 0;
  display: flex;
  flex-flow: column;
`;

const ImgQR = styled.img`
  max-width: 70%;
  margin: auto;
`;

export {
  BotonTaller,
  ContenedorTaller,
  EnvolvedorTaller,
  NombreTaller,
  UbicacionTaller,
  UbicacionTallerTexto,
  ContenedorQR,
  ImgQR,
};

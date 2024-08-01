import styled from "styled-components";
import {
  Titulo3,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const TituloMenuEspera = styled(Titulo3)`
  margin-bottom: 60px;
  margin-top: 20px;
`;

const ContenedorOpcion = styled(Subtitulo3)`
  width: 100%;
  cursor: pointer;
  align-items: center;
  border-radius: 4px;
  border: solid 1px var(--color-gris-claro);
  box-shadow: 0 3px 10px 0 rgba(48, 55, 56, 0.15);
  display: flex;
  font-family: var(--fuente-proxima-bold);
  margin-bottom: 30px;
  padding: 20px;
  /* @media (min-width: 319px) {
    width: 260px;
  }

  @media (min-width: 374px) {
    width: 280px;
  } */
`;

const LogoOpcion = styled.img`
  float: left;
  padding-right: 18px;
`;

export { TituloMenuEspera, ContenedorOpcion, LogoOpcion };

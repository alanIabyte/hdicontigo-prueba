/* eslint-disable */
import styled from "styled-components";
import { Pantalla } from "../componentes-styled-compartidos/Pantalla.styled";
import { Leyenda, Subtitulo3 } from "../componentes-styled-compartidos/Textos";

const Contenedor = styled(Pantalla)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  margin-top: 50px;
  width: 70px;
`;

const Cuerpo = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
  width: 100%;
  font-size: 24px;
`;

const ContenedorOmitir = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 30px;
  border-radius: 5px;
  background-color: ${(props) => (props.light ? "#FFFFFF" : "#f2f2f2")};
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 5px 0;
  &:hover {
    background-color: ${(props) => (props.light ? "#FFFFFF" : "#eaeaea")};
  }
`;

const LigaOmitir = styled(Leyenda)`
  color: var(--texto-azul);
  font-size: 18px;
`;

export { ContenedorOmitir, Cuerpo, LigaOmitir, Contenedor, Image };

import styled from "styled-components";
import {
  Subtitulo3,
  Titulo3,
} from "../../componentes-styled-compartidos/Textos";

const FondoBlanco = styled.div`
  background-color: var(--fondo-blanco-normal);
  height: 175px;
  max-width: var(--ancho-maximo-movil);
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const TituloPantallaPasosProgreso = styled(Titulo3)`
  margin-right: auto;
  position: ${(props) => (props.sticky === "true" ? "sticky" : "none")};
  top: 130px;
  background-color: var(--fondo-blanco-normal);
  z-index: 1;
`;

const SubtituloPantallaPasosProgreso = styled(Subtitulo3)`
  margin-top: 35px;
  color: var(--color-gris-medio);
  margin-bottom: 35px;
`;

export {
  FondoBlanco,
  TituloPantallaPasosProgreso,
  SubtituloPantallaPasosProgreso,
};

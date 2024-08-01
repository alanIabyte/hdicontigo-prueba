import styled from "styled-components";
import {
  Leyenda,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorDocumentacion = styled.div``;

const DocumentacionCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const DocumentacionValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

const MensajeDocumentacion = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  a {
    color: var(--texto-azul);
    text-decoration: none;
  }
`;

export {
  DocumentacionCampo,
  DocumentacionValor,
  EnvolvedorDocumentacion,
  MensajeDocumentacion,
};

import styled from "styled-components";
import {
  Subtitulo1,
  Subtitulo3,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorDeclaracion = styled(Subtitulo3)`
  color: var(--color-gris-medio);
`;

const TextoSeguirLeyendo = styled(Leyenda)`
  margin-top: 8px;
  color: var(--texto-azul);
  cursor: pointer;
`;

const EnvolvedorModalDeclaracion = styled.div`
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.mostrar ? "block" : "none")};
  height: 100%;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const ModalContenedor = styled.div`
  background-color: var(--fondo-blanco-normal);
  border-radius: 25px;
  border: none;
  margin: 5% auto;
  max-height: 80%;
  max-width: calc(var(--ancho-maximo-movil) - 90px);
  width: calc(100% - 90px);
  overflow-y: scroll;
  padding: 0 20px;
  padding-bottom: 40px;
`;

const EncabezadoModal = styled(Subtitulo1)`
  align-items: center;
  background-color: var(--fondo-blanco-normal);
  display: flex;
  font-family: var(--fuente-proxima-bold);
  justify-content: space-between;
  margin-bottom: 20px;
  padding-top: 20px;
  position: sticky;
  top: 0;
`;

const ContenedorIconoCierre = styled.button`
  color: var(--texto-oscuro);
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  &:focus {
    outline: none;
  }
`;

export {
  EnvolvedorDeclaracion,
  TextoSeguirLeyendo,
  EnvolvedorModalDeclaracion,
  ModalContenedor,
  EncabezadoModal,
  ContenedorIconoCierre,
};

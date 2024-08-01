import styled from "styled-components";
import {
  Parrafo,
  Subtitulo1,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorModalTexto = styled.div`
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
  margin: 5vh auto;
  max-height: 90vh;
  max-width: 70%; /* Cambia esto según tus necesidades */
  width: calc(100% - 40px); /* 20px de cada lado para el padding */
  overflow-y: scroll;
  padding: 0 20px; /* Ajusta el padding según tus necesidades */
  text-align: center;
  display: grid; /* Utiliza flexbox para centrar vertical y horizontalmente */
  justify-content: center;
  align-items: center;
`;

const EncabezadoModal = styled(Subtitulo1)`
  align-items: center;
  background-color: var(--fondo-blanco-normal);
  display: flex;
  font-family: var(--fuente-proxima-bold);
  justify-content: center; /* Cambiado a "center" para centrar verticalmente */
  margin-bottom: 5px;
  padding-top: 20px;
  position: sticky;
  top: 0;
  text-align: center;
`;

const ContenedorModal = styled.div`
  align-items: center;
  background-color: var(--fondo-blanco-normal);
  display: flex;
  flex-direction: column; /* Mantén "column" para apilar elementos verticalmente */
  font-family: var(--fuente-proxima-bold);
  justify-content: center; /* Cambiado a "center" para centrar verticalmente */
  margin-bottom: 5px;
  padding-top: 30px;
  position: sticky;
  top: 0;
  text-align: center;
`;

const SubtituloModal = styled(EncabezadoModal)`
  padding-top: 0;
  font-size: 14px;
  margin-bottom: 10px;
`;

const ParrafoModal = styled(Parrafo)`
  font-size: 14px;
`;

const ElementoListaModal = styled.li`
  margin-bottom: 20px;
`;

const ListaModal = styled.ol`
  list-style: ${(props) => (props.romano ? "upper-roman" : "")};
`;

const CuerpoModal = styled(Subtitulo3)`
  b,
  strong,
  h1,
  h2,
  h3 {
    font-family: var(--fuente-proxima-bold);
    font-size: 16px;
  }
  color: var(--color-gris-medio);
  padding: 10px;
`;

const PiePaginaModal = styled.div`
  background-color: var(--fondo-blanco-normal);
  bottom: 0px;
  padding: 20px 0;
  position: sticky;
`;

const LigaDescargaModal = styled.a`
  text-decoration: none;
`;

export {
  EnvolvedorModalTexto,
  ModalContenedor,
  EncabezadoModal,
  CuerpoModal,
  PiePaginaModal,
  LigaDescargaModal,
  SubtituloModal,
  ParrafoModal,
  ContenedorModal,
  ListaModal,
  ElementoListaModal,
};

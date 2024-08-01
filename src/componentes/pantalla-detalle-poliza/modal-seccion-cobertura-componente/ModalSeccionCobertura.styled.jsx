import styled from "styled-components";
import {
  Leyenda,
  Titulo3,
  Subtitulo2,
} from "../../componentes-styled-compartidos/Textos";

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contenedor = styled.div`
  background-color: var(--color-blanco-normal);
  padding: 25px;
  padding-top: 40px;
  padding-bottom: 35px;
  position: relative;
  background-color: var(--fondo-blanco-normal);
  border-radius: 5px;
  border: none;
  margin: 5% auto;
  max-width: calc(var(--ancho-maximo-movil) - 90px);
  width: calc(100% - 90px);
  max-height: 94%;
  box-sizing: border-box;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Cerrar = styled(Subtitulo2)`
  color: var(--color-negro-normal);
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  cursor: pointer;
`;

const Titulo = styled(Titulo3)`
  color: var(--color-negro-normal);
  font-size: 16px;
  margin-bottom: 28px;
`;

const ContenedorCobertura = styled(Titulo3)`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
  align-items: center;
`;

const Icono = styled.img`
  width: 10px;
  height: 10px;
`;

const TextoCobertura = styled(Leyenda)`
  color: var(--color-gris-claro);
  font-size: 14px;
  margin-left: 12px;
  line-height: 1.5;
`;

export {
  TextoCobertura,
  Modal,
  Contenedor,
  Cerrar,
  Titulo,
  ContenedorCobertura,
  Icono,
};

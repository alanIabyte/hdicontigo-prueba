import styled from "styled-components";
import { Subtitulo1 } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorEvaluacionModal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
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

const ContenedorModal = styled.div`
  background-color: var(--fondo-blanco-normal);
  border-radius: 25px;
  border: none;
  margin: 0 auto;
  max-height: 90vh;
  max-width: calc(var(--ancho-maximo-movil) - 90px);
  width: calc(100% - 90px);
  overflow-y: scroll;
  padding: 40px 16px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const EncabezadoPregunta = styled(Subtitulo1)`
  font-family: var(--fuente-proxima-bold);
  text-align: center;
`;

const ContenedorCarrusel = styled.div`
  margin: 50px 0;
`;

const ContenedorDiapositivas = styled.div`
  height: 85px;
`;

const Diapositiva = styled.div`
  align-items: center;
  border: ${(props) =>
    props.isSelected ? "solid 1px var(--fondo-gris);" : ""};
  border-radius: ${(props) => (props.isSelected ? "16px" : "")};
  box-shadow: ${(props) =>
    props.isSelected ? "0 3px 6px 0 rgba(0, 0, 0, 0.16);" : ""};
  color: ${(props) =>
    props.isSelected
      ? "var(--color-marca-normal);"
      : "var(--color-gris-claro);"};
  display: flex;
  font-family: ${(props) =>
    props.isSelected
      ? "var(--fuente-montserrat-bold);"
      : "var(--fuente-montserrat-regular);"};
  font-size: 26px;
  height: 80px;
  justify-content: center;
  width: 70px;
`;

export {
  EnvolvedorEvaluacionModal,
  ContenedorModal,
  EncabezadoPregunta,
  ContenedorCarrusel,
  ContenedorDiapositivas,
  Diapositiva,
};

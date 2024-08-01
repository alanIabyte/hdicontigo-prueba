import styled from "styled-components";
import { Subtitulo1 } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorEvaluacion = styled(Subtitulo1)`
  border-radius: 16px;
  border: solid 1px var(--fondo-gris);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 214px;
  text-align: center;
  width: 100%;
`;

const TituloEvaluacion = styled(Subtitulo1)`
  margin-bottom: 20px;
  font-family: var(--fuente-proxima-bold);
`;

const ContenedorCalificacion = styled.div`
  display: flex;
  justify-content: center;
`;

const ContenedorIconoEstrella = styled.div`
  color: ${(props) =>
    props.marcado ? "var(--color-alerta-normal)" : "var(--fondo-gris)"};
`;

export {
  EnvolvedorEvaluacion,
  TituloEvaluacion,
  ContenedorCalificacion,
  ContenedorIconoEstrella,
};

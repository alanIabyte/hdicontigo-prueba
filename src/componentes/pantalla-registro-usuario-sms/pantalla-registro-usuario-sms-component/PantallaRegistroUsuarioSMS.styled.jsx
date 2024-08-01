import styled from "styled-components";
import {
  Leyenda,
  Titulo3,
  Subtitulo3,
  CuerpoLiga,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorCampo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
`;

const EnvolvedorFormulario = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 10px;
  text-align: left;
`;

const InstruccionesSMS = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 25% 0 20%;
  text-align: center;
  color: ${(props) =>
    props.disabled ? "var(--color-azul-enlace)" : "var(--texto-gris)"};
  pointer-events: ${(props) => (props.disabled ? "all" : "none")};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CuentaRegresiva = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 10px 0 50px;
  text-align: left;
  color: ${(props) =>
    props.content === "Por favor espera unos segundos más e inténtalo de nuevo."
      ? "var(--texto-gris)"
      : "var(--color-exitoso-normal)"};
  pointer-events: none;
`;

const ContenedorBoton = styled.div`
  width: 100%;
  margin-bottom: 14px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  height: 20px;
`;

export {
  ContenedorBoton,
  InstruccionesSMS,
  MensajeError,
  MensajePequeno,
  Titulo,
  SeparadorEspacio,
  EnvolvedorFormulario,
  ContenedorCampo,
  CuentaRegresiva,
};

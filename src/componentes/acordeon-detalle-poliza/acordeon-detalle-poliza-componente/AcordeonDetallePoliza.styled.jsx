import styled from "styled-components";
import { Subtitulo2 } from "../../componentes-styled-compartidos/Textos";

const Contenedor = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  border: 2px solid var(--color-marca-normal);
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
`;
const Encabezado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  box-sizing: border-box;
  cursor: pointer;
`;

const EnvolvedorIcono = styled.div`
  display: flex;
  align-items: center;
`;

const TituloAcordeon = styled(Subtitulo2)`
  margin-left: 12px;
`;

const Manejador = styled.div`
  margin-left: auto;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  ${".arrow-icono"} {
    transform: ${(props) => (props.abierto ? "rotate(180deg)" : "none")};
  }
`;

const Contenido = styled.div`
  padding: 15px 24px;
  border-top: 1px solid var(--color-gris-normal);
`;

export {
  Contenedor,
  Encabezado,
  EnvolvedorIcono,
  TituloAcordeon,
  Manejador,
  Contenido,
};

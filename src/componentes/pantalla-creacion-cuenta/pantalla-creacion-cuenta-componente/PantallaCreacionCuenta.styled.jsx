import styled from "styled-components";
import {
  Leyenda,
  Titulo3,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorBoton = styled.div`
  width: 100%;
  margin-bottom: 14px;
`;

const ContenedorValor = styled(Leyenda)`
  width: 100%;
  font-size: 16px;
  background-color: var(--color-gris-normal);
  min-height: 19px;
  padding: 10px;
  padding-top: 13px;
  padding-right: 35px;
  border-radius: 4px;
  color: var(--color-gris-medio);
`;

const EtiquetaValor = styled(Leyenda)`
  width: 100%;
  text-align: left;
  color: var(--color-gris-medio);
  margin-bottom: 8px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-negro-puro);
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  margin-top: 25px;
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 10px;
  text-align: left;
  text-transform: ${(props) => (props.upper ? "uppercase" : "none")};
`;

export {
  ContenedorBoton,
  ContenedorValor,
  EtiquetaValor,
  MensajeError,
  MensajePequeno,
  SeparadorEspacio,
  Titulo,
};

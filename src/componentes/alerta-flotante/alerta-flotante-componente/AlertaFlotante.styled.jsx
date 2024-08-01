import styled from "styled-components";
import { Subtitulo3 } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorAlertaFlotante = styled.div`
  display: ${(props) => (props.mostrar ? "block" : "none")};
  position: absolute;
  right: 11px;
  top: 70px;
  width: 71%;
  z-index: 2;
`;

const ContenedorTexto = styled(Subtitulo3)`
  background-color: var(--fondo-alerta-flotante);
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(67, 86, 100, 0.29);
  padding: 18px;
`;

export { EnvolvedorAlertaFlotante, ContenedorTexto };

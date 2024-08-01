import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const Envolvedor = styled.div``;

const Campo = styled(Leyenda)`
  color: var(--color-negro-normal);
  font-family: var(--fuente-proxima-bold);
`;
const ContenedorMapa = styled.div`
  width: "100%";
  height: "100%";
  margin-bottom: 10px;
`;

export { Envolvedor, Campo, ContenedorMapa };

import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorResolucion = styled.div``;

const ResolucionCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const ResolucionValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

export { EnvolvedorResolucion, ResolucionCampo, ResolucionValor };

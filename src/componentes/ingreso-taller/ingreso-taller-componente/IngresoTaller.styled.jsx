import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorIngresoTaller = styled.div``;

const IngresoTallerCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const IngresoTallerValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

export { EnvolvedorIngresoTaller, IngresoTallerCampo, IngresoTallerValor };

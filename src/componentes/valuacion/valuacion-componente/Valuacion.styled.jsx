import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorValuacion = styled.div``;

const ValuacionCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const ValuacionValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

export { EnvolvedorValuacion, ValuacionCampo, ValuacionValor };

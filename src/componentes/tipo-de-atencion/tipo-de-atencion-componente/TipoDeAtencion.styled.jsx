import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorTipoDeAtencion = styled.div``;

const TipoDeAtencionValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

export { EnvolvedorTipoDeAtencion, TipoDeAtencionValor };

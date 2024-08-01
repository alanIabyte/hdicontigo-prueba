import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorGrua = styled.div``;

const GruaCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const GruaValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

export { EnvolvedorGrua, GruaCampo, GruaValor };

import styled from "styled-components";
import {
  ParrafoNegritas,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorReferencia = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, auto);
  border-bottom: 1px solid var(--fondo-gris);
`;

const Banco = styled(ParrafoNegritas)`
  grid-column: 1/3;
  grid-row: 1;
  color: var(--color-gris-medio);
`;

const Renglon = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 5px 0;
`;

const Propiedad = styled(Leyenda)`
  grid-column: 1;
  color: var(--color-gris-medio);
`;

const Valor = styled(Leyenda)`
  grid-column: 2;
  text-align: end;
  color: var(--color-gris-medio);
`;

export { ContenedorReferencia, Banco, Propiedad, Valor, Renglon };

import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorFechaDeIndemnizacion = styled.div``;

const FechaDeIndemnizacionCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const FechaDeIndemnizacionValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

export {
  EnvolvedorFechaDeIndemnizacion,
  FechaDeIndemnizacionCampo,
  FechaDeIndemnizacionValor,
};

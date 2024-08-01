import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorReporteSiniestro = styled.div``;

const ReporteSiniestroCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const ReporteSiniestroValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

export {
  EnvolvedorReporteSiniestro,
  ReporteSiniestroCampo,
  ReporteSiniestroValor,
};

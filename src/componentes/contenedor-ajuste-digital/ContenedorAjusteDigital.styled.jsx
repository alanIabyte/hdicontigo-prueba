import styled from "styled-components";

import {
  Leyenda,
  BotonDescarga,
} from "../componentes-styled-compartidos/Textos";

const EnvolvedorReporteSiniestroDigital = styled.div``;

const ReporteSiniestroValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 10px;
  margin-top: 3px;
`;
const BotonAjusteDigital = styled(BotonDescarga)`
  background-color: var(--color-marca-normal);
  border: none;
  color: var(--texto-blanco);
  font-family: var(--fuente-proxima-bold);
  margin-bottom: 5px;
  width: auto;
`;
const BotonCabina = styled(BotonDescarga)`
  background-color: #ffffff;
  border: none;
  color: var(--texto-negro);
  font-family: var(--fuente-proxima-bold);
  width: auto;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: black;
  border: none;
  color: var(--texto-negro);
  font-family: var(--fuente-proxima-bold);
  width: auto;
`;
export {
  EnvolvedorReporteSiniestroDigital,
  ReporteSiniestroValor,
  BotonAjusteDigital,
  BotonCabina,
};

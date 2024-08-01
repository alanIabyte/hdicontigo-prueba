import styled from "styled-components";
import {
  Leyenda,
  Subtitulo1,
  Subtitulo3,
  BotonDescarga,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPagoDeducible = styled.div``;

const PagoDeducibleCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const PagoDeducibleMonto = styled(Subtitulo1)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 11px;
  margin-top: 3px;
`;

const PagoDeducibleReferencia = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  margin-top: 7px;
`;

const BotonDescargaPagoDeducible = styled(BotonDescarga)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

const BotonPagoEnLinea = styled(BotonDescarga)`
  background-color: var(--color-marca-normal);
  border: none;
  color: var(--texto-blanco);
  font-family: var(--fuente-proxima-bold);
  margin-bottom: 25px;
  width: auto;
`;

const PagoDeducibleFormasPago = styled(Subtitulo3)`
  color: var(--texto-azul);
  margin-top: 7px;
`;

const PagoDeducibleValor = styled(Leyenda)`
  color: var(--color-gris-medio);
  font-family: var(--fuente-proxima-bold);
  margin-bottom: 10px;
  margin-top: 4px;
`;

export {
  EnvolvedorPagoDeducible,
  PagoDeducibleCampo,
  PagoDeducibleMonto,
  PagoDeducibleReferencia,
  BotonDescargaPagoDeducible,
  BotonPagoEnLinea,
  PagoDeducibleFormasPago,
  PagoDeducibleValor,
};

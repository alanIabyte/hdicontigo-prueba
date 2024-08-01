import styled from "styled-components";
import {
  Titulo3,
  Subtitulo3,
  Subtitulo3Negritas,
  Cuerpo,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaCuestionarioReporte = styled.div``;

const SeparadorEncabezadoCuestionarioReporte = styled.div`
  background-color: var(--fondo-gris-claro);
  height: 1px;
  position: relative;
  top: 50px;
  width: 100%;
  z-index: 1;
`;

const TituloCuestionarioReporte = styled(Titulo3)`
  height: 54px;
  margin: 31px 0px 0px;
  text-align: left;
  width: 100%;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 0px 0px 30px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const CuerpoCuestionarioReporte = styled(Cuerpo)`
  color: var(--color-gris-medio);
  padding-bottom: 40px;
  width: 100%;

  b {
    font-family: var(--fuente-proxima-bold);
  }
`;

const SeparadorCuestionarioReporte = styled.div`
  background-color: var(--fondo-gris);
  height: 1px;
  margin: 5px 0px;
  width: 100%;
`;

const ContenedorCampoTextoCuestionarioReporte = styled.div`
  display: ${(props) =>
    props.esUsuario || props.esUsuario === null ? "none" : "block"};
  margin-bottom: 19px;
`;

const ContenedorCheck = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 70px;
  margin-top: 0px;
`;

const Check = styled.input.attrs({ type: "checkbox" })`
  accent-color: var(--color-marca-normal);
  width: 35.99px;
  height: 35.99px;
  margin-bottom: 5px;
  margin-top: -1px;
  border-radius: 6px;
`;

const MensajeCheck = styled(Subtitulo3Negritas)`
  width: 100%;
  text-align: left;
`;

export {
  EnvolvedorPantallaCuestionarioReporte,
  SeparadorEncabezadoCuestionarioReporte,
  TituloCuestionarioReporte,
  MensajePequeno,
  CuerpoCuestionarioReporte,
  SeparadorCuestionarioReporte,
  ContenedorCampoTextoCuestionarioReporte,
  Check,
  ContenedorCheck,
  MensajeCheck,
};

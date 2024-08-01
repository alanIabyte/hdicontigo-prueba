import styled from "styled-components";
import {
  Titulo3,
  Subtitulo3,
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
  margin-top: 31px;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

const MensajePequeno = styled(Subtitulo3)`
  font-weight: bold;
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

export {
  EnvolvedorPantallaCuestionarioReporte,
  SeparadorEncabezadoCuestionarioReporte,
  TituloCuestionarioReporte,
  MensajePequeno,
  CuerpoCuestionarioReporte,
  SeparadorCuestionarioReporte,
  ContenedorCampoTextoCuestionarioReporte,
};

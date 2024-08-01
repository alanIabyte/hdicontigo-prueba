import styled from "styled-components";
import {
  Cuerpo,
  MensajeError,
} from "../../componentes-styled-compartidos/Textos";

const CuerpoSeleccionCuestionario = styled.div``;

const PreguntaCuestionario = styled(Cuerpo)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  @media (max-width: 280px) {
    font-size: 13px;
    margin-top: 5%;
  }
`;

const RespuestaCuestionario = styled(Cuerpo)`
  display: flex;
`;

const SeleccionSiCuestionario = styled.button`
  width: 36px;
  font-family: inherit;
  height: 36px;
  border-radius: 6px;
  font-size: inherit;
  border: ${(props) =>
    props.activado ? "none" : "solid 1px var(--fondo-gris-medio)"};
  background-color: ${(props) =>
    props.activado
      ? "var(--color-marca-normal)"
      : "var(--fondo-blanco-normal)"};
  color: ${(props) => (props.activado ? "var(--texto-blanco)" : "inherit")};
  margin-left: 16px;
  padding: 0;
`;

const SeleccionNoCuestionario = styled.button`
  width: 36px;
  font-family: inherit;
  height: 36px;
  border-radius: 6px;
  font-size: inherit;
  border: ${(props) =>
    props.activado === false ? "none" : "solid 1px var(--fondo-gris-medio)"};
  background-color: ${(props) =>
    props.activado === false
      ? "var(--color-gris-medio)"
      : "var(--fondo-blanco-normal)"};
  color: ${(props) =>
    props.activado === false ? "var(--texto-blanco)" : "inherit"};
  margin-left: 16px;
  padding: 0;
`;

const CampoRequeridoSeleccionCuestionario = styled(MensajeError)`
  display: ${(props) => (props.mostrar ? "block" : "none")};
  margin-bottom: 10px;
`;

export {
  CuerpoSeleccionCuestionario,
  PreguntaCuestionario,
  RespuestaCuestionario,
  SeleccionSiCuestionario,
  SeleccionNoCuestionario,
  CampoRequeridoSeleccionCuestionario,
};

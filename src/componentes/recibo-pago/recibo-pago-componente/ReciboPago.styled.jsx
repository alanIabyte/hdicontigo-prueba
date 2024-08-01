/* eslint-disable */
import styled from "styled-components";
import {
  Subtitulo2Negritas,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const TarjetaPoliza = styled.div`
  width: 100%;
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: repeat(5, auto);
  // opacity: ${(props) => (props.estatus === "PAGADO" ? 0.5 : 1)};
  opacity: ${(props) => (props.estatus === "PAGADO" ? 1 : 1)};
  margin-bottom: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
  transform: ${(props) => (props.seleccionado ? "scale(0.96)" : "none")};
  border: ${(props) =>
    props.seleccionado
      ? "1px solid var(--color-marca-normal)"
      : "1px solid var(--color-gris-claro)"};
  box-shadow: ${(props) =>
    props.seleccionado ? "0 2px 20px 0 rgba(38, 196, 104, 0.18)" : "none"};
  &:hover {
    box-shadow: ${(props) =>
      props.seleccionado
        ? "0 2px 20px 0 rgba(38, 196, 104, 0.18)"
        : "0 2px 20px 0 rgba(49, 49, 49, 0.18)"};
  }
`;

const ContenedorIcono = styled.div`
  margin-right: 10px;
  grid-row: 1;
  grid-column: 1;
  ${".disable"} {
    filter: grayscale(100%);
  }
`;

const TituloRecibo = styled(Subtitulo2Negritas)`
  display: flex;
  align-items: center;
  grid-row: 1;
  grid-column: 2;
  user-select: none;
`;

const Costo = styled(Subtitulo2Negritas)`
  display: flex;
  align-items: center;
  grid-row: 1;
  grid-column: 3;
  margin-left: auto;
  color: var(--color-gris-medio);
`;

const NumeroPoliza = styled(Leyenda)`
  grid-column: 1/3;
  grid-row: 2;
  margin: 5px 0;
`;

const VigenciaRecibo = styled(Leyenda)`
  grid-column: 1/3;
  grid-row: 3;
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const NumeroRecibo = styled(Leyenda)`
  grid-column: 1/3;
  grid-row: 2;
  display: flex;
  align-items: center;
`;

const TextoFactura = styled(Leyenda)`
  grid-column: 3;
  grid-row: 3;
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: var(--color-azul-normal);
  font-size: 12px;
`;

const EstatusRecibo = styled(Leyenda)`
  grid-column: 3;
  grid-row: ${(props) => (props.colorEstatus === "GRIS" ? "2" : "2/4")};
  font-size: 12px;
  padding: 6px 5px;
  border-radius: 4px;
  margin-right: 8px;
  text-transform: lowercase;
  text-align: center;
  width: fit-content;
  height: fit-content;
  margin: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  user-select: none;
  &::first-letter {
    text-transform: uppercase;
  }
  background-color: ${(props) => {
    const { colorEstatus } = props;
    if (colorEstatus === "VERDE") {
      return "var(--color-marca-normal)";
    }
    if (colorEstatus === "AMARILLO") {
      return "var(--color-alerta-normal)";
    }
    if (colorEstatus === "ROJO") {
      return "var(--color-error-normal)";
    }
    if (colorEstatus === "GRIS") {
      return "var(--fondo-gris-claro)";
    }
    if (colorEstatus === "GRIS") {
      return "var(--fondo-gris-claro)";
    }
    return "var(--fondo-gris-claro)";
  }};
  color: ${(props) =>
    props.colorEstatus === "AMARILLO"
      ? "var(--color-negro-normal)"
      : "var(--color-blanco-normal)"};
`;

const Check = styled.input.attrs({ type: "checkbox" })`
  accent-color: var(--color-marca-normal);
  margin-left: 0;
  margin-right: 8px;
`;

const ContenedorSeleccion = styled(Leyenda)`
  grid-column: 1/3;
  grid-row: 5;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const Default = styled.div``;

export {
  TarjetaPoliza,
  TituloRecibo,
  Costo,
  ContenedorIcono,
  NumeroPoliza,
  NumeroRecibo,
  EstatusRecibo,
  Default,
  VigenciaRecibo,
  ContenedorSeleccion,
  Check,
  TextoFactura,
};

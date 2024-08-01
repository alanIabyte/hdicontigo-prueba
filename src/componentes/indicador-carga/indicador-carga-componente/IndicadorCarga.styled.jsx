import styled from "styled-components";
import { Titulo3 } from "../../componentes-styled-compartidos/Textos";

const IndicadorCarga = styled.div`
  &,
  &:before,
  &:after {
    border-radius: 50%;
    opacity: 1;
  }
  & {
    /* color: ${(props) =>
      props.tema === "estandar"
        ? "var(--color-blanco-normal)"
        : "var(--color-marca-normal)"}; */
    color: var(--color-marca-normal);
    font-size: 11px;
    text-indent: -99999em;
    margin: 0 auto;
    position: relative;
    width: 10em;
    height: 10em;
    box-shadow: inset 0 0 0 1em;
    transform: scale(0.55);
  }
  &:before,
  &:after {
    position: absolute;
    content: "";
  }
  &:before {
    width: 5.2em;
    height: 10.2em;
    background-color: ${(props) =>
      props.tema === "estandar"
        ? "var(--fondo-negro)"
        : "var(--fondo-blanco-normal)"};
    border-radius: 10.2em 0 0 10.2em;
    top: -0.1em;
    left: -0.1em;
    -webkit-transform-origin: 5.1em 5.1em;
    transform-origin: 5.1em 5.1em;
    -webkit-animation: cargador 2s infinite ease 1.5s;
    animation: cargador 2s infinite ease 1.5s;
  }
  &:after {
    width: 5.2em;
    height: 10.2em;
    background-color: ${(props) =>
      props.tema === "estandar"
        ? "var(--fondo-negro)"
        : "var(--fondo-blanco-normal)"};
    border-radius: 0 10.2em 10.2em 0;
    top: -0.1em;
    left: 4.9em;
    -webkit-transform-origin: 0.1em 5.1em;
    transform-origin: 0.1em 5.1em;
    -webkit-animation: cargador 2s infinite ease;
    animation: cargador 2s infinite ease;
  }
  @-webkit-keyframes cargador {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes cargador {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
const PantallaCarga = styled.div`
  width: 100%;
  height: ${(props) => {
    if (props.pantallaCompleta) {
      return "100vh";
    }
    if (props.tema === "verde-pequeno") {
      return "245px";
    }
    return "100%";
  }};
  position: ${(props) =>
    props.tema === "verde-pequeno" ? "absolute" : "fixed"};
  top: ${(props) => {
    if (props.pantallaCompleta) {
      return "-1px";
    }
    if (props.tema === "verde-pequeno") {
      return "auto";
    }
    return "0px";
  }};
  bottom: ${(props) => (props.tema === "verde-pequeno" ? "0px" : "auto")};
  opacity: ${(props) => (props.tema === "estandar" ? "0.7" : "1")};
  background-color: ${(props) =>
    props.tema === "estandar"
      ? "var(--fondo-negro)"
      : "var(--fondo-blanco-normal)"};
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  left: ${(props) => (props.pantallaCompleta ? "0px" : "auto")};
`;

const TextoCarga = styled(Titulo3)`
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: ${(props) =>
    props.tema === "estandar" ? "rgba(256, 256, 256, 1)" : "rgba(0, 0, 0, 1)"};
`;

export { IndicadorCarga, TextoCarga, PantallaCarga };

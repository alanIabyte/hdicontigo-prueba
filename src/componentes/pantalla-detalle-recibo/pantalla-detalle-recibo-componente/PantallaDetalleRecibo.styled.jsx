/* eslint-disable */
import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo2,
  Subtitulo3,
  Subtitulo2Negritas,
  Leyenda,
  LeyendaNegritas,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
  height: calc(100% - 125px);
`;

const PantallaFondoBlanco = styled(Pantalla)`
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: calc(100% - 118px);
  overflow: scroll;
  overflow-x: hidden;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const Contenedor = styled.div`
  width: 100%;
  height: calc(100%);
  box-sizing: border-box;
  & > div:last-of-type {
    margin-bottom: 100px;
  }
`;

const TituloMisPolizas = styled(Titulo3)`
  margin-bottom: 28px;
  margin-top: 40px;
`;

const InformacionRecibo = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto 1fr auto;
  box-sizing: border-box;
  // opacity: ${(props) => (props.estatus === "PAGADO" ? 0.5 : 1)};
  opacity: ${(props) => (props.estatus === "PAGADO" ? 1 : 1)};
  margin-bottom: 16px;
  &:hover {
    // box-shadow: 0 2px 20px 0 rgba(49, 49, 49, 0.18);
  }
`;

const ContenedorBoton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px 32px 24px 32px;
  box-sizing: border-box;
  background-color: var(--color-blanco-normal);
`;

const ContenedorDobleBotones = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px 32px 24px 32px;
  box-sizing: border-box;
  background-color: var(--color-blanco-normal);
  border: 1px solid red;
`;

const TituloRecibo = styled(Subtitulo2Negritas)`
  display: flex;
  align-items: center;
  grid-row: 1;
  grid-column: 2;
  user-select: none;
`;

const Costo = styled(Subtitulo2)`
  display: flex;
  align-items: center;
  grid-row: 1;
  grid-column: 3;
  margin-left: auto;
`;

const ContenedorIcono = styled.div`
  margin-right: 20px;
  grid-row: 1;
  grid-column: 1;
  ${".disable"} {
    // filter: grayscale(100%);
    transform: scale(1.6);
  }
  ${".icono"} {
    transform: scale(1.6);
  }
`;

const Valor = styled(LeyendaNegritas)`
  grid-column: 1/4;
  grid-row: 2;
  margin: 5px 0;
  font-weight: 500;
  line-height: 20px;
`;

const Descripcion = styled(Leyenda)`
  grid-column: 1/4;
  grid-row: 2;
  margin: 5px 0;
  color: var(--color-gris-medio);
  font-weight: 600;
`;

const Informacion = styled.div`
  grid-column: 1/4;
  margin: 16px 0 0 0;
`;

const EstatusRecibo = styled(Leyenda)`
  grid-column: 1/3;
  font-size: 12px;
  padding: 6px 5px;
  border-radius: 4px;
  margin-right: 8px;
  margin-top: 16px;
  text-transform: lowercase;
  text-align: center;
  width: fit-content;
  margin-right: auto;
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
    if (colorEstatus === "PAGADO") {
      return "var(--fondo-gris-claro)";
    }
    if (colorEstatus === "PAGADA") {
      return "var(--fondo-gris-claro)";
    }
    return "var(--fondo-gris-claro)";
  }};
  color: ${(props) =>
    props.colorEstatus === "AMARILLO"
      ? "var(--color-negro-normal)"
      : "var(--color-blanco-normal)"};
`;

export {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  MensajePequeno,
  Contenedor,
  InformacionRecibo,
  TituloRecibo,
  ContenedorIcono,
  Costo,
  Informacion,
  Descripcion,
  Valor,
  ContenedorBoton,
  EstatusRecibo,
  ContenedorDobleBotones,
};

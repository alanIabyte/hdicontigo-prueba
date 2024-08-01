import styled from "styled-components";

const EnvolvedorBarraAlerta = styled.div`
  background-color: ${(props) => {
    if (props.estilo === "error") {
      return "var(--color-error-normal)";
    }
    if (props.estilo === "notificacion") {
      return "var(--color-azul-normal)";
    }
    if (props.estilo === "exitoso") {
      return "var(--color-exitoso-normal)";
    }
    return "var(--color-alerta-normal)";
  }};
  color: ${(props) =>
    props.estilo === "error" ||
    props.estilo === "notificacion" ||
    props.estilo === "exitoso"
      ? "var(--texto-blanco)"
      : "var(--texto-negro)"};
  display: ${(props) => (props.mostrar ? "block" : "none")};
  font-family: var(--fuente-proxima-regular);
  margin: 0 auto;
  max-width: var(--ancho-maximo-movil);
  overflow: auto;
  overflow: hidden;
  padding: 17px 0 17px;
  position: ${(props) => (props.posicionAbsoluta ? "absolute" : "fixed")};
  left: ${(props) => (props.posicionAbsoluta ? "0" : "")};
  top: ${(props) => {
    if (props.sinEncabezado) {
      return "0";
    }
    if (props.encabezadoAlto) {
      return "130px";
    }
    return "80px";
  }};
  width: 100%;
  z-index: 3;
  ${({ fijo }) =>
    fijo &&
    `
    left: auto;
    margin-left: -24px;
  `}
`;

const BarraAlertaContenedor = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

const BarraAlertaIcono = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-width: 50px;
  text-align: center;
`;

const BarraAlertaTexto = styled.span`
  font-size: 16px;
  line-height: 19px;
  flex-grow: 2;

  b {
    font-family: var(--fuente-proxima-bold);
  }
`;

const BarraAlertaCierre = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-width: 50px;
  text-align: center;
`;

export {
  EnvolvedorBarraAlerta,
  BarraAlertaContenedor,
  BarraAlertaIcono,
  BarraAlertaTexto,
  BarraAlertaCierre,
};

import styled from "styled-components";
import { Titulo3, Parrafo } from "../../componentes-styled-compartidos/Textos";

const Cuerpo = styled.div`
  color: var(--texto-negro);
  padding-bottom: ${(props) => (props.margenMinimo ? "5%" : "25%")};
  padding-top: ${(props) => (props.margenMinimo ? "5%" : "25%")};
  text-align: center;
`;

const ContenedorIcono = styled.div`
  display: block;
  margin-top: 25%;
  margin-bottom: 20%;
  margin-left: auto;
  margin-right: auto;
  /* TODO: Pendiente por probar esta alineación */
  width: ${(props) => {
    // props.tipo === "contigo" ? "" : "50%";
    if (props.color === "contigo") {
      return "";
    }
    return "50%";
  }};
  color: ${(props) => {
    if (props.color === "rojo") {
      return "var(--icono-rojo)";
    }
    if (props.color === "amarillo") {
      return "var(--icono-amarillo)";
    }
    if (props.color === "verde") {
      return "var(--color-marca-normal)";
    }
    return "var(--color-azul-normal)";
  }};
`;

const TextoEncabezado = styled(Titulo3)`
  margin-bottom: 20px;
  margin-top: 15px;
  color: var(--color-negro-puro);
`;

const TextoCuerpo = styled(Parrafo)`
  margin-bottom: 30px;
  color: var(--color-negro-puro);

  b {
    font-family: var(--fuente-proxima-bold);
  }
`;

const ContenedorBotones = styled.div`
  margin-top: 25%;
  ${({ estiloBotones }) =>
    estiloBotones === "ladoALado" &&
    `
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    align-items: center;
    button {
      width: 45%;
      min-width: auto;
      margin: 0;
    }
    div {
      margin: 0;
      width: 45%;
      button{
        width: 100%;
      }
    }
  `}
`;

const AlertaContenedorSegundoBoton = styled.div`
  margin-top: 20px;
`;

export {
  Cuerpo,
  ContenedorIcono,
  TextoEncabezado,
  TextoCuerpo,
  ContenedorBotones,
  AlertaContenedorSegundoBoton,
};

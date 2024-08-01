/* eslint-disable */
import styled from "styled-components";
import { Titulo3, Parrafo } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorAlerta = styled.div`
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.show ? "block" : "none")};
  font-size: 15px;
  height: 100%;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const AlertaContenedor = styled.div`
  background-color: var(--fondo-blanco-normal);
  border-radius: 25px;
  border: none;
  margin: 5% auto;
  padding: 20px;
  max-width: calc(var(--ancho-maximo-movil) - 90px);
  width: calc(100% - 90px);
`;

const AlertaEncabezado = styled.div`
  position: relative;
`;

const AlertaCuerpo = styled.div`
  color: var(--texto-negro);
  padding-bottom: ${(props) => (props.margenMinimo ? "5%" : "25%")};
  padding-top: ${(props) => (props.margenMinimo ? "5%" : "25%")};
  text-align: center;
`;

const AlertaBotonCierre = styled.button`
  background-color: transparent;
  border: 0;
  color: var(--texto-blanco);
  cursor: pointer;
  float: right;
  height: 30px;
  padding-right: 8px;
  position: absolute;
  right: 0px;
  top: 0px;
  &:focus {
    outline: none;
  }
`;

const AlertaCierreContenedorIcono = styled.div`
  color: var(--texto-oscuro);
`;

const AlertaContenedorIcono = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* TODO: Pendiente por probar esta alineación */
  width: ${(props) => {props.tipo === "contigo" ? "" : "50%" }};
  color: ${(props) => {
    if (props.color === "rojo") {
      return "var(--icono-rojo)";
    }
    if (props.color === "amarillo") {
      return "var(--icono-amarillo)";
    }
    if (props.color === "verde"){
      return "var(--color-marca-normal)";
    }
    return "var(--color-azul-normal)";
  }};
`;

const AlertaTextoEncabezado = styled(Titulo3)`
  margin-bottom: 20px;
  margin-top: 15px;
  color: var(--color-negro-puro);
`;

const AlertaTextoCuerpo = styled(Parrafo)`
  margin-bottom: 30px;
  color: var(--color-negro-puro);

  b {
    font-family: var(--fuente-proxima-bold);
  }
`;

const AlertaEnlace = styled.a`
  text-decoration: none;
  color: var(--color-azul-enlace);
  &:hover {
    text-decoration: underline;
  }
`;

const AlertaContenedorSegundoBoton = styled.div`
  margin-top: 20px;
`;

const ContenedorBotones = styled.div`
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

export {
  AlertaBotonCierre,
  AlertaCierreContenedorIcono,
  AlertaContenedor,
  AlertaContenedorIcono,
  AlertaContenedorSegundoBoton,
  AlertaCuerpo,
  AlertaEncabezado,
  AlertaTextoCuerpo,
  AlertaTextoEncabezado,
  ContenedorBotones,
  EnvolvedorAlerta,
  AlertaEnlace,
};

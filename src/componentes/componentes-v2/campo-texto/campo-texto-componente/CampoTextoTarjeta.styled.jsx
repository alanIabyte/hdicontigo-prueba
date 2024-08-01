import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const ContenedorCampoTexto = styled(Leyenda)`
  width: 100%;
  display: inline-block;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  input {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    font-family: var(--fuente-proxima-regular);
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: var(--color-negro-normal);
  }
`;

const ContenedorIconoAyuda = styled.img`
  position: absolute;
  cursor: pointer;
  color: var(--color-marca-normal);
  z-index: 9;
  right: 10px;
  top: 20px;
`;

const ContenedorIconoReloj = styled.img`
  position: absolute;
  cursor: pointer;
  color: var(--color-marca-normal);
  z-index: 9;
  right: 12px;
  top: 20px;
  width: 20px;
  height: 20px;
`;

const CampoTextoStyled = styled.input`
  outline: none;
  width: calc(100% - 45px);
  height: 19px;
  padding: 10px;
  padding-right: 35px;
  border-radius: 4px;
  border: solid 1px;
  background-color: var(--color-blanco-normal);
  border-color: ${(props) => {
    const { foco } = props;
    if (foco === "enfocado") {
      return "var(--color-marca-normal)";
    }
    if (foco === "error") {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-claro)";
  }};
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const Icono = styled.div`
  width: 100%;
  margin-top: -32px;
  svg {
    transform: scale(0.8);
    float: right;
    padding-right: 13px;
    color: var(--color-marca-normal);
  }
`;

const EnvolvedorCampoTexto = styled.div`
  width: 100%;
  margin-bottom: 0px;
  border: 1px solid red;
  margin: 22px 0;
`;

const Etiqueta = styled(Leyenda)`
  width: 100%;
  margin: 0 0 6px 4px;
  text-align: left;
  color: ${(props) => {
    const { foco } = props;
    if (foco === "enfocado") {
      return "var(--color-marca-normal)";
    }
    if (foco === "error") {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-medio)";
  }};
`;

const ContenedorEtiquetaArriba = styled.div`
  width: 100%;
  display: flex;
`;

export {
  ContenedorEtiquetaArriba,
  CampoTextoStyled,
  ContenedorCampoTexto,
  EnvolvedorCampoTexto,
  Etiqueta,
  Icono,
  ContenedorIconoAyuda,
  ContenedorIconoReloj,
};

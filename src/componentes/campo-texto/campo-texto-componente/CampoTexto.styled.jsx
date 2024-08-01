import styled from "styled-components";
import {
  BotonMediano,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorCampoTexto = styled(Leyenda)`
  width: 100%;
  height: 50px;
  input,
  textarea {
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

const CampoTextoStyled = styled.input`
  outline: none;
  width: calc(100% - 45px);
  line-height: 20px;
  height: 30px;
  padding: 12px;
  padding-right: 35px;
  border-radius: 4px;
  border: solid 1px;
  padding-top: 18px;
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
  ::placeholder {
    text-transform: none;
  }
  -moz-appearance: textfield;
`;

const CampoAreadeTextoStyled = styled.textarea`
  outline: none;
  width: calc(100% - 45px);
  padding: 10px;
  padding-right: 35px;
  border-radius: 4px;
  border: solid 1px;
  background-color: var(--color-blanco-normal);
  padding: 22px;
  padding-left: 12px;
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

const EnvolvedorBoton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px 0;
`;

const Boton = styled(BotonMediano)`
  border-radius: 19px;
  cursor: pointer;
  display: block;
  width: 42%;
  float: left;
  padding: 10px 0px;
  text-align: center;
  background-color: ${(props) =>
    props.tema === "estandar"
      ? "var(--color-marca-normal)"
      : "var(--fondo-blanco-normal)"};
  border: solid 1px var(--color-marca-normal);
  color: ${(props) =>
    props.tema === "estandar"
      ? "var(--texto-blanco)"
      : "var(--color-marca-normal)"};
`;

const EnvolvedorCampoTexto = styled.div`
  width: 100%;
  margin-top: ${(props) => (props.marginTop ? "10px" : "")};
  margin-bottom: ${(props) => (props.esAreaDeTexto ? "-5px" : "0px")};
`;

const Etiqueta = styled(Leyenda)`
  position: absolute;
  font-size: 14px;
  left: "16px";
  left: ${(props) => (props.domiciliacion ? "13px" : "36px")};
  display: inline;
  margin-top: 10px;
  margin-bottom: 10px;
  z-index: 1;
  text-align: left;
  color: #006729;
  @media (max-width: 240px) {
    font-size: 12px;
    margin-bottom: 5%;
  }
`;

const ContenedorSerie = styled.div`
  width: 100%;
`;

const ContenedorMascara = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const Conteo = styled(Leyenda)`
  width: 100%;
  text-align: right;
  color: var(--color-gris-claro);
`;

const ContenedorEtiquetaArriba = styled.div`
  width: 100%;
  display: flex;
`;

const Separador = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-right: 10px;
`;

export {
  Boton,
  ContenedorEtiquetaArriba,
  CampoAreadeTextoStyled,
  CampoTextoStyled,
  ContenedorCampoTexto,
  ContenedorSerie,
  ContenedorMascara,
  Conteo,
  EnvolvedorBoton,
  EnvolvedorCampoTexto,
  Etiqueta,
  Icono,
  Separador,
};

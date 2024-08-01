import styled from "styled-components";
import { Subtitulo1 } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorEncabezado = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: ${(props) => {
    if (props.alturaEncabezadoAuto) {
      return "auto";
    }
    return "80px;";
  }};
  background-color: var(--color-blanco-normal);
  box-shadow: 0 3px 3px 0 var(--color-gris-claro);
  color: var(--color-marca-normal);
  z-index: 2;
`;

const TituloContenedor = styled(Subtitulo1)`
  color: var(--color-verde-normal);
  height: ${(props) => {
    if (props.alturaEncabezadoAuto) {
      return "auto";
    }
    return "22px;";
  }};
  margin-bottom: 19px;
  position: relative;
  text-align: center;
  width: 100%;
  svg {
    float: right;
  }
  @media (max-width: 280px) {
    font-size: 15px;
  }
`;

const ContenedorIconoAlerta = styled.button`
  background: none;
  border: none;
  color: var(--color-negro-puro);
  margin-bottom: 19px;
  margin-right: 16px;
  outline: inherit;
  padding: 0;
  position: absolute;
  right: 0px;
  top: 38px;
`;

const BotonIcono = styled.button`
  align-items: center;
  background-color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  left: 0;
  margin-bottom: 19px;
  margin-left: 16px;
  position: absolute;
  width: 40px;
  z-index: 2;
  top: 38px;
  svg {
    color: var(--color-marca-normal);
    transform: scale(1.2);
  }
`;

export {
  EnvolvedorEncabezado,
  TituloContenedor,
  ContenedorIconoAlerta,
  BotonIcono,
};

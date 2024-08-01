import styled from "styled-components";
import {
  Subtitulo3,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorFotoContenedor = styled.div`
  width: calc(100% - 30px);
  font-weight: bold;
  border-radius: 6px;
  border: ${(props) => {
    if (props.estatus === "exito" || props.estatus === "precarga") {
      return "solid 1px var(--fondo-exitoso)";
    }
    if (props.estatus === "error") {
      return "solid 1px var(--fondo-error)";
    }
    return "solid 1px var(--fondo-gris-claro)";
  }};
  background-color: ${(props) => {
    if (props.estatus === "exito") {
      return "rgba(74, 167, 62, 0.2)";
    }
    return "transparent";
  }};
  color: ${(props) => {
    if (props.estatus === "exito") {
      return "var(--fondo-exitoso)";
    }
    if (props.estatus === "error") {
      return "var(--fondo-error)";
    }
    return "inherit";
  }};
  padding: 0 15px;
  display: flex;
  margin-bottom: 15px;
  position: relative;
  & > svg {
    float: right;
    align-self: center;
    position: absolute;
    right: 15px;
  }
`;

const FotoContenedorTitulo = styled(Subtitulo3)`
  color: ${(props) => {
    if (props.estatus === "exito") {
      return "var(--fondo-exitoso)";
    }
    if (props.estatus === "error") {
      return "var(--fondo-error)";
    }
    return "var(--color-negro-normal)";
  }};
  font-family: var(--fuente-proxima-bold);
  width: 100%;
  margin-bottom: 5px;
`;

const FotoContenedorSubtitulo = styled(Leyenda)`
  width: 100%;
  color: ${(props) => {
    if (props.estatus === "error") {
      return "var(--fondo-error)";
    }
    return "var(--color-gris-medio)";
  }};
`;

const ImagenFotoContenedor = styled.div`
  width: 58px;
  height: 58px;
  position: relative;
  float: left;
  align-self: center;
`;

const ImagenFoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => {
    if (props.porDefecto) {
      return "contain";
    }
    return "cover";
  }};
  object-position: center;
`;

const ImagenFotoSombra = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  svg {
    position: absolute;
    top: 17px;
    left: 17px;
    color: var(--color-blanco-normal);
  }
`;

const FotoContenedorTextos = styled.div`
  width: ${(props) => (props.conImagen ? "188px" : "260px")};
  margin-top: 15px;
  margin-left: 16px;
  margin-bottom: 15px;
  svg {
    color: var(--color-gris-medio);
    transform: scale(0.65);
    margin-top: -5px;
    margin-left: -5px;
    float: left;
  }
`;

const Cargador = styled.div`
  width: 130px;
  height: 3px;
  border-radius: 10px;
  background-color: var(--fondo-gris);
  margin-top: 9px;
  margin-bottom: 9px;
  div {
    width: ${(props) => props.porcentaje}%;
    height: 100%;
    background-color: var(--color-azul-normal);
  }
`;

export {
  Cargador,
  EnvolvedorFotoContenedor,
  ImagenFoto,
  ImagenFotoContenedor,
  ImagenFotoSombra,
  FotoContenedorTextos,
  FotoContenedorTitulo,
  FotoContenedorSubtitulo,
};

import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorUbicacion = styled.a`
  text-decoration: none;
`;

const UbicacionTexto = styled(Leyenda)`
  color: ${(props) => {
    if (props.colorTexto) {
      return "var(--color-verde-enlace)";
    }
    return "var(--texto-azul)";
  }};
  margin-top: 10px;
`;

const GoogleMapContenedorCargando = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContenedorMapa = styled.div`
  position: relative;
  height: 120px;
  width: 277px;
  left: 0;
  & > div:first-child {
    height: 120px !important;
    left: 0;
  }
`;

export {
  EnvolvedorUbicacion,
  UbicacionTexto,
  GoogleMapContenedorCargando,
  ContenedorMapa,
};

import styled from "styled-components";
import {
  BotonMediano,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorBarraProgresoReporte = styled.div`
  height: 52px;
  width: 100%;
  padding: 0;
`;

const EncabezadoBarraProgreso = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 5px;
`;

const NumeroBarraProgreso = styled(Leyenda)`
  color: var(--color-gris-claro);
`;

const TituloBarraProgreso = styled(BotonMediano)`
  background: none;
  border: none;
  color: inherit;
  color: var(--color-gris-templado);
  text-transform: ${(props) => {
    if (!props.grua) {
      return "uppercase";
    }
    return "none";
  }};
  @media (min-width: 319px) and (max-width: 332px) {
    font-size: 12px;
  }
`;

const BaseBarraProgreso = styled.div`
  background-color: var(--color-gris-progreso);
  border-radius: 2px;
  height: 4px;
  width: 100%;
`;

const BarraProgreso = styled.div`
  background-color: var(--color-verde-progreso);
  border-radius: 2px;
  height: 4px;
  width: ${(props) => {
    const { progreso, noElementos } = props;
    const porcentajeProgreso = (progreso / noElementos) * 100;
    return `${porcentajeProgreso}%`;
  }};
`;

export {
  EnvolvedorBarraProgresoReporte,
  EncabezadoBarraProgreso,
  NumeroBarraProgreso,
  TituloBarraProgreso,
  BaseBarraProgreso,
  BarraProgreso,
};

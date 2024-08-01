import styled from "styled-components";
import {
  Subtitulo3Negritas,
  Leyenda,
} from "../../../componentes-styled-compartidos/Textos";

const EnvolvedorRecibo = styled.div`
  display: ${(props) => (props.mostrar ? "block" : "none")};
  cursor: pointer;
`;
const Recibo = styled.div`
  background-color: var(--color-blanco-normal);
  border: 1px solid var(--fondo-gris-claro);
  border-radius: 6px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  grid-template-rows: auto;
  padding: 10px 20px;
  margin-bottom: 16px;
`;

const ContenedorIcono = styled.div`
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContenedorInformacion = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
`;
const NumeroPoliza = styled(Subtitulo3Negritas)`
  accent-color: var(--color-marca-normal);
  ::-moz-selection {
    background: var(--color-exitoso-normal);
  }

  ::selection {
    background: var(--color-exitoso-normal);
  }
`;

const BotonVer = styled.div`
  max-width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-gris-medio);
  font-family: var(--fuente-proxima-regular);
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  ${".icono"} {
    margin-right: 5px;
  }
  &:active {
    color: var(--color-gris-medio);
    ${".icono"} {
      color: var(--color-gris-medio);
    }
  }
  &:hover {
    color: var(--color-exitoso-normal);
    ${".icono"} {
      color: var(--color-exitoso-normal);
    }
  }
`;

const Vigencia = styled(Leyenda)`
  margin-top: 6px;
  margin-bottom: 3px;
  color: var(--color-gris-claro);
`;

export {
  Recibo,
  ContenedorIcono,
  ContenedorInformacion,
  NumeroPoliza,
  BotonVer,
  EnvolvedorRecibo,
  Vigencia,
};

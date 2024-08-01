import styled from "styled-components";
import {
  Leyenda,
  BotonDescarga,
} from "../../componentes-styled-compartidos/Textos";

const BotonLesionado = styled(BotonDescarga)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

const ContenedorLesionado = styled.div`
  width: 100%;
`;

const EnvolvedorLesionados = styled.div`
  width: 100%;
`;

const NombreLesionado = styled(Leyenda)`
  color: var(--color-gris-medio);
  margin-bottom: 10px;
`;

export {
  BotonLesionado,
  ContenedorLesionado,
  EnvolvedorLesionados,
  NombreLesionado,
};

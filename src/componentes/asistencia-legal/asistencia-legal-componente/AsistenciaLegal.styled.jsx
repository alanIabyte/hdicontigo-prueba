import styled from "styled-components";
import {
  Leyenda,
  BotonDescarga,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorAsistenciaLegal = styled.div``;

const AsistenciaLegalCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const AsistenciaLegalValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

const AsistenciaLegalValorLista = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-top: 3px;
`;

const BotonDescargaAsistenciaLegal = styled(BotonDescarga)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  text-decoration: underline;
  margin-bottom: 20px;
  margin-top: 3px;
`;

const ContenedorLink = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 35px;
  margin-bottom: 25px;
`;

const EnlaceProcesoLegal = styled.a`
  color: var(--color-azul-enlace);
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  text-align: left !important;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
    font-weight: 700;
  }
`;

const ContenedorBoton = styled.div`
  display: flex;
  align-items: left;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
`;

export {
  AsistenciaLegalCampo,
  AsistenciaLegalValor,
  AsistenciaLegalValorLista,
  BotonDescargaAsistenciaLegal,
  EnvolvedorAsistenciaLegal,
  ContenedorLink,
  EnlaceProcesoLegal,
  ContenedorBoton,
};

import styled from "styled-components";
import {
  Leyenda,
  Subtitulo1,
  Subtitulo3,
  Subtitulo3Negritas,
} from "../../componentes-styled-compartidos/Textos";

const BotonGarantias = styled.div`
  margin-top: 15px;
  width: 240px;
`;

const ContenedorFotos = styled.div`
  margin-left: 0;
`;

const ContenedorImagenGarantia = styled.img`
  margin-top: 15px;
`;

const ContenedorTaller = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Cuerpo = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  margin-top: 20px;
  text-align: rigth;
  margin-bottom: 20px;
  width: 100%;
  font-size: 14px;
`;

const EnvolvedorEntrega = styled.div``;

const LigaUbicacion = styled(Leyenda)`
  color: var(--texto-azul);
  margin-top: 10px;
`;

const NombreTaller = styled(Subtitulo3Negritas)`
  font-size: 16px;
`;

const SeparadorEspacio = styled.div`
  margin-top: 20px;
`;

const TituloFotos = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const ContenedorIconoCierre = styled.div`
  color: var(--texto-oscuro);
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  &:focus {
    outline: none;
  }
`;

const EncabezadoModal = styled.div`
  align-items: center;
  background-color: var(--fondo-blanco-normal);
  display: flex;
  font-family: var(--fuente-proxima-bold);
  justify-content: space-between;
  margin-bottom: 36px;
  padding-top: 16px;
  position: sticky;
  top: 0;
`;

const TituloModal = styled(Subtitulo1)`
  font-family: var(--fuente-proxima-bold);
`;

const EnvolvedorModalGarantias = styled.div`
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.mostrar ? "block" : "none")};
  height: 100%;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const ModalContenedor = styled.div`
  background-color: var(--fondo-blanco-normal);
  border-radius: 25px;
  border: none;
  margin: 0 auto;
  max-height: 90vh;
  max-width: calc(var(--ancho-maximo-movil) - 90px);
  width: calc(100% - 90px);
  overflow-y: scroll;
  padding: 0 20px 20px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const TituloGarantia = styled(Subtitulo3Negritas)`
  color: var(--color-gris-medio);
`;

const CuerpoGarantia = styled(Subtitulo3)`
  color: var(--color-gris-medio);
`;

export {
  BotonGarantias,
  ContenedorFotos,
  ContenedorIconoCierre,
  ContenedorImagenGarantia,
  ContenedorTaller,
  Cuerpo,
  EncabezadoModal,
  EnvolvedorEntrega,
  EnvolvedorModalGarantias,
  LigaUbicacion,
  ModalContenedor,
  NombreTaller,
  SeparadorEspacio,
  TituloFotos,
  TituloGarantia,
  CuerpoGarantia,
  TituloModal,
};

import styled from "styled-components";
import {
  Subtitulo3,
  Titulo3,
  TituloSeccion,
} from "../../componentes-styled-compartidos/Textos";

const TituloPantallaConfirmacionCuenta = styled(Titulo3)`
  margin-top: 25px;
`;

const CuerpoPantallaConfirmacionCuenta = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  margin-top: 10px;
  b {
    font-family: var(--fuente-proxima-bold);
  }
`;

const ContenedorDatosUsuario = styled.div`
  align-items: center;
  background-color: var(--color-blanco-normal);
  border-radius: 6px;
  border: solid 1px var(--color-gris-claro);
  display: flex;
  flex-direction: column;
  margin-bottom: 87px;
  margin-top: 59px;
  min-height: 297px;
  padding: 20px 17px 11px;
  text-align: center;
  width: 100%;
`;

const NombreCampo = styled(TituloSeccion)`
  color: var(--color-gris-medio);
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const RespuestaCampo = styled(TituloSeccion)`
  color: var(--fondo-verde-claro);
  text-transform: none;
`;

const InfoExtraCampo = styled(Subtitulo3)`
  color: var(--color-gris-claro);
  margin-bottom: 12px;
  margin-top: 12px;
`;

const SeparadorDatosUsuario = styled.div`
  background-color: var(--color-blanco-normal);
  border: solid 1px var(--fondo-gris);
  margin: 25px 0 20px;
  width: 90%;
`;

const ContenedorRespuesta = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const ContenedorIconoOjo = styled.button`
  background: none;
  border: none;
  color: var(--color-marca-normal);
  cursor: pointer;
  font: inherit;
  outline: inherit;
  padding: 0;
  position: absolute;
  right: 0;
`;

export {
  TituloPantallaConfirmacionCuenta,
  CuerpoPantallaConfirmacionCuenta,
  ContenedorDatosUsuario,
  NombreCampo,
  RespuestaCampo,
  InfoExtraCampo,
  SeparadorDatosUsuario,
  ContenedorRespuesta,
  ContenedorIconoOjo,
};

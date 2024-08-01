import styled from "styled-components";
import {
  Titulo3,
  Cuerpo,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";

const EnvolvedorPantallaUbicacionMapa = styled.div``;

const SeparadorEncabezadoUbicacionMapa = styled.div`
  background-color: var(--fondo-gris-claro);
  height: 1px;
  position: relative;
  top: 50px;
  width: 100%;
  z-index: 1;
`;

const TituloUbicacionMapa = styled(Titulo3)`
  height: 54px;
  margin-bottom: 10px;
  margin-top: 18px;
  text-align: left;
  width: 100%;
  color: var(--color-verde-normal);
  div,
  svg {
    float: left;
  }
  svg {
    margin-right: 5px;
    cursor: pointer;
  }
`;

const TituloUbicacionMapaCompleto = styled(TituloUbicacionMapa)`
  position: absolute;
  z-index: 1000;
  top: 0;
  margin-top: 26px;
  width: 85%;
  svg {
    position: absolute;
    z-index: 1000;
    top: 8px;
    margin-left: 10px;
  }
  div:first-child {
    position: absolute;
  }
  input {
    padding-left: 40px;
    padding-right: 20px;
    width: calc(100% - 60px);
  }
`;

const CuerpoUbicacionMapa = styled(Cuerpo)`
  color: var(--color-gris-medio);
  padding-bottom: 20px;
  width: 100%;
`;

const CuerpoUbicacionMapaCompleto = styled(CuerpoUbicacionMapa)`
  padding-bottom: 0px;
`;

const ContenedorCampoTextoUbicacionMapa = styled.div`
  display: inherit;
`;

const ContenedorCampoTextoUbicacionMapaDestino = styled.div`
  display: inherit;
  margin-top: 20px;
`;

const ContenedorCampoTextoDireccion = styled.div`
  display: inherit;
  width: 100%;
  margin-top: -12px;
  input {
    font-family: var(--fuente-proxima-regular);
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: var(--color-negro-normal);
    outline: none;
    width: 100% !important;
    padding: 10px;
    border-radius: 4px;
    border: solid 1px;
    background-color: var(--color-blanco-normal);
    border-color: var(--color-gris-claro);
    &:focus {
      border-color: var(--color-marca-normal);
    }
  }
`;

const ContenedorGoogleMap = styled.div`
  height: 250px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ContenedorGoogleMapCompleto = styled.div`
  height: 100vh;
  margin-top: -10px;
  div:first-child {
    height: 100vh;
    & > div:first-child {
      height: 100vh !important;
      left: 5.5%;
    }
  }
  .localizacionActual {
    bottom: 88px;
  }
  button {
    position: absolute;
    width: 87%;
    bottom: 60px;
  }
`;

const ContenedorMapa = styled.div`
  position: absolute;
  height: 250px;
  margin: 0 auto;
  width: 91%;
  left: 0;
  & > div:first-child {
    height: 250px !important;
    left: 5.5%;
  }
`;

const ContenedorFijarUbicacion = styled(Leyenda)`
  width: 197px;
  height: 32px;
  border-radius: 6px;
  background-color: var(--fondo-blanco-normal);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 8px;
  left: 15px;
  cursor: pointer;
  svg {
    transform: scale(0.6);
    float: right;
    color: var(--color-negro-normal);
    margin-left: -5px;
  }
`;

const ContenedorLocalizacionActual = styled(Leyenda)`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: var(--fondo-blanco-normal);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 8px;
  right: 20px;
  cursor: pointer;
  color: var(--color-error-normal);
  font-size: 9px;
  font-weight: bold;
  svg {
    transform: scale(0.75);
    position: absolute;
    color: ${(props) =>
      props.gpsActivado
        ? "var(--color-azul-normal)"
        : "var(--color-error-normal)"};
  }
  span {
    padding-left: 1px;
  }
`;

const GoogleMapContenedorLoading = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 15px;
  color: var(--color-error-normal);
`;

const EnvolvedorPantallaDireccion = styled(EnvolvedorPantalla)`
  min-height: 700px;
  align-items: flex-start;
`;

const CuerpoReferencias = styled(Cuerpo)`
  width: 100%;
  margin-top: -12px;
`;

export {
  ContenedorCampoTextoDireccion,
  ContenedorCampoTextoUbicacionMapa,
  ContenedorCampoTextoUbicacionMapaDestino,
  ContenedorFijarUbicacion,
  ContenedorGoogleMap,
  ContenedorGoogleMapCompleto,
  ContenedorLocalizacionActual,
  ContenedorMapa,
  CuerpoReferencias,
  CuerpoUbicacionMapa,
  CuerpoUbicacionMapaCompleto,
  EnvolvedorPantallaDireccion,
  EnvolvedorPantallaUbicacionMapa,
  GoogleMapContenedorLoading,
  MensajeError,
  SeparadorEncabezadoUbicacionMapa,
  TituloUbicacionMapa,
  TituloUbicacionMapaCompleto,
};

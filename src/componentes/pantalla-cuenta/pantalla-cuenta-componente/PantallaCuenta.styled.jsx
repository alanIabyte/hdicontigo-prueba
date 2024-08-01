/* eslint-disable */
import styled from "styled-components";
import {
  Leyenda,
  Parrafo,
  TituloSeccion,
  Subtitulo3,
  Cuerpo,
} from "../../componentes-styled-compartidos/Textos";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";

const EnvolvedorPantallaCuenta = styled(EnvolvedorPantalla)`
  height: 100%;
  #carga {
    left: 0;
    top: 0;
  }
`;

const PantallaCuenta = styled(Pantalla)`
  height: calc(100% - 128px);
  display: block;
`;

const ContenedorParrafo = styled.div`
  width: 100%;
  margin-bottom: 19px;
  svg {
    float: right;
    margin-top: 4px;
  }
  #campoDia,
  #campoMes,
  #campoAno {
    float: left;
    height: 100px;
  }
  #campoDia input,
  #campoMes input,
  #campoAno input {
    padding-right: 10px;
    width: calc(100% - 20px);
  }
  #campoDia {
    width: 15%;
    margin-right: 5%;
  }
  #campoMes {
    width: 40%;
    margin-right: 5%;
  }
  #campoAno {
    width: 35%;
  }
`;

const Etiqueta = styled(Leyenda)`
  color: var(--color-gris-claro);
`;

const LigaEditar = styled(Leyenda)`
  display: flex;
  justify-content: flex-end;
  color: var(--color-azul-enlace);
  text-align: right;
  font-size: 16px;
  width: 100%;
  position: relative;
  svg {
    transform: scale(0.67);
    position: absolute;
    right: 0;
    top: -4px;
  }
`;

const ContenedorTextoEditar = styled.div`
  width: 100%;
  margin-right: 26px;
`;

const Seccion = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 31px;
`;

const SeccionEditar = styled(Seccion)`
  margin-top: 40px;
`;

const SeccionEditarPrimera = styled(Seccion)`
  margin-top: 10px;
`;

const Separador = styled(TituloSeccion)`
  color: var(--color-gris-medio);
  text-align: left;
  width: 100%;
  text-overflow: ellipsis;
  white-space: pre;
  text-transform: none;
`;

const SeparadorLinea = styled.div`
  width: 100%;
  border: solid 0.1px var(--fondo-gris);
  margin-top: 5px;
  margin-bottom: 15px;
`;

const SeparadorLineaEditar = styled(SeparadorLinea)`
  margin-bottom: 20px;
`;

const Valor = styled(Parrafo)`
  width: 100%;
  color: var(--color-gris-medio);
  margin-top: 6px;
  overflow-wrap: anywhere;
`;

const ContenedorImagen = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 22px;
  svg {
    color: var(--color-azul-normal);
    margin-left: -18px;
  }
`;

const ImagenPerfil = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  ${({ error }) =>
    error &&
    `
    border: solid 1px var(--color-error-normal);
  `}
`;

const LigaEtiqueta = styled(Parrafo)`
  color: var(--color-gris-medio);
  margin-top: 6px;
  float: left;
`;

const ContenedorSubidaDeFotosCompleto = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-x: hidden;
`;

const ContenedorSubidaDeFotos = styled.div`
  background-color: var(--color-blanco-normal);
  width: 100%;
  height: 225px;
  border-radius: 16px 16px 0 0;
  ${(props) => (props.bottomSinBar === "1" ? "padding: 41px 0 15px 0;" : "padding: 41px 0 30px;")}
  position: absolute;
  ${(props) => (props.bottomSinBar === "1" ? "bottom: 40px;" : "bottom: 0;")}
`;

const ContenedorBotonSubidaDeFotos = styled.div`
  padding: 64px 11% 0 11%;
  button {
    min-height: 38px;
  }
`;

const ContenedorOpcionSubidaDeFotos = styled.div`
  padding: 16px 11%;
  cursor: pointer;
  svg {
    color: var(--color-gris-medio);
    width: 16px;
    float: left;
    margin-top: -3px;
    margin-right: 14px;
  }
`;

const ContenedorOpcionSubidaDeFotosTexto = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  font-family: var(--fuente-proxima-bold);
`;

const Archivo = styled.input`
  display: none;
`;

const MensajeErrorImagen = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
  text-align: center;
  margin-top: 10px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const SeparadorTransparente = styled(Leyenda)`
  height: 15px;
  width: 100%;
`;

const ContenedorBotones = styled.div`
  height: 96px;
  bottom: 0;
  margin-left: -24px;
  padding: 20px 0;
  width: calc(100% + 48px);
  background: var(--fondo-blanco-normal);
  button {
    min-height: auto !important;
    width: calc(100% - 46px);
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

const CuentaMensaje = styled(Cuerpo)`
  width: 100%;
  color: var(--color-gris-medio);
`;

const ContenedorListaDesplegable = styled(Cuerpo)`
  width: 40%;
  margin-right: 5%;
  float: left;
`;

export {
  Archivo,
  ContenedorBotones,
  ContenedorBotonSubidaDeFotos,
  ContenedorImagen,
  ContenedorListaDesplegable,
  ContenedorOpcionSubidaDeFotos,
  ContenedorOpcionSubidaDeFotosTexto,
  ContenedorParrafo,
  ContenedorSubidaDeFotos,
  ContenedorSubidaDeFotosCompleto,
  ContenedorTextoEditar,
  CuentaMensaje,
  EnvolvedorPantallaCuenta,
  Etiqueta,
  ImagenPerfil,
  LigaEditar,
  LigaEtiqueta,
  MensajeError,
  MensajeErrorImagen,
  PantallaCuenta,
  Seccion,
  SeccionEditar,
  SeccionEditarPrimera,
  Separador,
  SeparadorLinea,
  SeparadorLineaEditar,
  SeparadorTransparente,
  Valor,
};

import styled from "styled-components";
import { Etiqueta } from "../../campo-texto/campo-texto-componente/CampoTexto.styled";
import {
  Leyenda,
  Titulo3,
  Subtitulo3,
  CuerpoLiga,
} from "../../componentes-styled-compartidos/Textos";

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-negro-puro);
`;

const ContenedorInputIcono = styled.div`
  width: 100%;
`;

const ContenedorIcono = styled.div`
  position: absolute;
`;

const ContenedorCamara = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 10px;
  text-align: left;
`;

const Instrucciones = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 10px 0 50px;
  text-align: left;
  color: var(--color-negro-puro);
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
    font-weight: 700;
  }
`;

const ContenedorBoton = styled.div`
  width: 100%;
  margin-bottom: 14px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 15px;
  color: var(--color-error-normal);
`;

const AlertaImagen = styled.img`
  width: 100%;
`;

const CampoRFC = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;
  * {
    text-transform: uppercase !important;
  }
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  height: 20px;
`;

const EnvolvedorGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto;
  grid-gap: 0px;
`;

const ContenedorPolizaDanos = styled.div`
  width: 100%;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContenedorEtiquetasDanos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ContenedorInciso = styled.div`
  position: relative;
  width: 88px;
`;

const EtiquetaInciso = styled(Etiqueta)`
  left: 10px;
`;

const ContenedorNumPoliza = styled.div`
  width: calc(95% - 88px);
  position: relative;
`;

const ImagenSuperpuesta = styled.img`
  position: absolute;
  top: -151px; /* Ajusta la posición de la imagen según tu diseño */
  left: 50%; /* Centra la imagen horizontalmente */
  transform: translateX(-50%);
  width: 100%;
  height: 150px;
  display: ${({ mostrar }) => (mostrar ? "block" : "none")};
`;

export {
  AlertaImagen,
  ContenedorBoton,
  ContenedorCamara,
  Instrucciones,
  MensajeError,
  MensajePequeno,
  Titulo,
  CampoRFC,
  SeparadorEspacio,
  ContenedorPolizaDanos,
  ContenedorEtiquetasDanos,
  ContenedorInciso,
  ContenedorNumPoliza,
  EtiquetaInciso,
  ContenedorInputIcono,
  ContenedorIcono,
  EnvolvedorGrid,
  ImagenSuperpuesta,
};

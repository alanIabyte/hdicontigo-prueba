// Styled components
// y otro
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
  * {
    text-transform: uppercase !important;
  }
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  height: 20px;
`;

const ContenedorPolizaDanos = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-end;
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
  ContenedorInciso,
  ContenedorNumPoliza,
  EtiquetaInciso,
  ContenedorInputIcono,
  ContenedorIcono,
};

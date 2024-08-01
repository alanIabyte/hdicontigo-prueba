import styled from "styled-components";
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
  color: var(--color-gris-medio);
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
  color: var(--texto-azul);
`;

const ContenedorBoton = styled.div`
  width: 100%;
  margin-bottom: 14px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const AlertaImagen = styled.img`
  width: 100%;
`;

export {
  AlertaImagen,
  ContenedorBoton,
  ContenedorCamara,
  Instrucciones,
  MensajeError,
  MensajePequeno,
  Titulo,
};

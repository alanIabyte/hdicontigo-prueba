import styled from "styled-components";
import {
  Titulo3,
  Subtitulo1,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const CuerpoContrasenaOlvidada = styled(Subtitulo3)`
  color: var(--color-negro-puro);
  margin-bottom: 60px;
`;

const ContenedorBoton = styled.div`
  margin-top: 260px;
  width: 100%;
`;

const ContenedorContrasenaEnviada = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 120px;
  margin-top: 40px;
`;

const EncabezadoContrasenaEnviada = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TituloMensajeEnviado = styled(Titulo3)``;

const ImagenEnviado = styled.img`
  margin-bottom: 40px;
  margin-top: 120px;
  width: 120px;
`;

const CuerpoEnviado = styled(Subtitulo1)`
  color: var(--color-gris-medio);
  margin-bottom: 120px;
  text-align: center;
`;

const EnlaceEnviado = styled(Subtitulo3)`
  color: var(--color-azul-enlace);
`;

export {
  CuerpoContrasenaOlvidada,
  ContenedorBoton,
  ContenedorContrasenaEnviada,
  EncabezadoContrasenaEnviada,
  TituloMensajeEnviado,
  ImagenEnviado,
  CuerpoEnviado,
  EnlaceEnviado,
};

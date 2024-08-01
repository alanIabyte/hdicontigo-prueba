import styled from "styled-components";
import {
  CuerpoLiga,
  Subtitulo1,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorBoton = styled.div`
  margin-top: 260px;
  width: 100%;
`;

const ContenedorValorTelefono = styled(Subtitulo1)`
  width: 100%;
  display: flex;
  padding: 23px;
  justify-content: space-around;
  border-radius: 6px;
  background-color: var(--color-gris-normal);
  letter-spacing: 5px;
`;

const CuerpoVerificarTelefono = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  margin-top: 45px;
  margin-bottom: 20px;
  width: 100%;
`;

const CuerpoIngresaCodigo = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  margin-top: 45px;
  width: 100%;
`;

const LinkNoEnviado = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 10px 0 50px;
  text-align: left;
  color: var(--texto-azul);
`;

export {
  ContenedorBoton,
  ContenedorValorTelefono,
  CuerpoIngresaCodigo,
  CuerpoVerificarTelefono,
  LinkNoEnviado,
};

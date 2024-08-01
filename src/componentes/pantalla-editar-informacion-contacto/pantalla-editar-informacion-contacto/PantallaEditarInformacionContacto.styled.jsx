import styled from "styled-components";
import {
  Leyenda,
  Subtitulo3,
  Titulo3,
  TituloSeccion,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorBoton = styled.div`
  width: 100%;
  margin-bottom: 14px;
  margin-top: 44px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const Separador = styled(TituloSeccion)`
  color: var(--color-gris-medio);
  text-align: left;
  width: 100%;
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const SeparadorLinea = styled.div`
  width: 100%;
  border: solid 0.1px var(--fondo-gris);
  margin-top: 5px;
  margin-bottom: 30px;
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 10px;
  text-align: left;
`;

const ContenedorValor = styled(Leyenda)`
  width: 100%;
  font-size: 16px;
  background-color: var(--color-gris-normal);
  min-height: 19px;
  padding: 10px;
  padding-top: 13px;
  padding-right: 35px;
  border-radius: 4px;
  color: var(--color-gris-medio);
  overflow: scroll;
  overflow-wrap: anywhere;
`;

export {
  ContenedorBoton,
  ContenedorValor,
  MensajeError,
  MensajePequeno,
  Separador,
  Titulo,
  SeparadorLinea,
  SeparadorEspacio,
};

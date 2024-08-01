import styled from "styled-components";
import {
  Subtitulo3,
  Leyenda,
  Parrafo,
  Titulo3,
  TituloSeccion,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorBoton = styled.div`
  width: 100%;
  margin-bottom: 14px;
  margin-top: 44px;
`;

const ContenedorParrafo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Etiqueta = styled(Parrafo)`
  color: var(--color-gris-medio);
`;

const LinkEditar = styled(Leyenda)`
  display: flex;
  justify-content: flex-end;
  color: var(--color-verde-enlace);
  text-align: right;
  font-size: 16px;
  width: 100%;
`;

const ContenedorTextoEditar = styled.div`
  margin-right: 8px;
  cursor: pointer;
`;

const Seccion = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Separador = styled(TituloSeccion)`
  font-weight: bold;
  color: var(--color-gris-oscuro);
  text-align: left;
  width: 100%;
  text-overflow: ellipsis;
  white-space: pre;
  text-transform: ${(props) => {
    if (props.claim === "tow") {
      return "uppercase";
    }
    return "none";
  }};
`;

const SeparadorBarraProgreso = styled.div`
  background-color: var(--fondo-gris-claro);
  height: 1px;
  position: relative;
  top: 50px;
  width: 100%;
  z-index: 1;
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const SeparadorLinea = styled.div`
  width: 100%;
  border: solid 0.1px var(--fondo-gris);
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 10px;
  text-align: left;
`;

const Valor = styled(Subtitulo3)`
  font-family: var(--fuente-proxima-bold);
  color: var(--texto-oscuro);
  text-align: right;
  width: 200px;
  white-space: pre-wrap;
`;

export {
  ContenedorBoton,
  ContenedorParrafo,
  Etiqueta,
  LinkEditar,
  ContenedorTextoEditar,
  Seccion,
  Separador,
  SeparadorBarraProgreso,
  SeparadorEspacio,
  SeparadorLinea,
  Titulo,
  Valor,
};

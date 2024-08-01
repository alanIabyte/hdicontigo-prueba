import styled from "styled-components";
import {
  Titulo3,
  Subtitulo2,
  Subtitulo3Negritas,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorBotones = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
  width: 100%;
`;

const ContenedorIcono = styled.div`
  color: var(--texto-oscuro);
  float: right;
  margin-top: 20px;
`;

const ContenedorNumero = styled.div`
  background-color: ${(props) =>
    props.focus ? "var(--color-blanco-normal)" : "var(--color-verde-normal)"};
  border-radius: 50%;
  margin-right: 20px;
  width: 100%;
  max-width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const ContenedorRecomendacion = styled.div`
  display: flex;
  border: 1px solid;
  border-color: ${(props) =>
    props.focus ? "var(--color-azul-normal)" : "var(--color-gris-claro)"};
  background: ${(props) =>
    props.focus ? "var(--color-azul-claro)" : "var(--color-blanco-normal)"};
  border-radius: 5px;
  padding: 15px 15px 15px 10px;
  position: relative;
  width: 532px;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const MarcaProgreso = styled.div`
  width: ${(props) => (props.focus ? `${props.progreso}%` : "0%")};
  background-color: var(--color-azul-normal);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
`;

const ContenedorTitulo = styled.div`
  width: 100%;
`;

const RecomendacionContenido = styled(Subtitulo2)`
  color: ${(props) =>
    props.focus ? "var(--color-blanco-normal)" : "var(--color-gris-medio)"};
  z-index: 2;

  b {
    font-family: var(--fuente-proxima-bold);
  }
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const TextoNumero = styled(Subtitulo3Negritas)`
  color: ${(props) =>
    props.focus ? "var(--color-azul-normal)" : "var(--color-blanco-normal)"};
  font-size: 22px;
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  margin-bottom: 30px;
  margin-top: 20px;
  float: left;
`;

export {
  ContenedorBotones,
  ContenedorIcono,
  ContenedorNumero,
  ContenedorRecomendacion,
  ContenedorTitulo,
  MarcaProgreso,
  RecomendacionContenido,
  SeparadorEspacio,
  TextoNumero,
  Titulo,
};

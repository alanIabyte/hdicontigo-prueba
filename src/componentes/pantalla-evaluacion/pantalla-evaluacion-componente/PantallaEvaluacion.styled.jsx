import styled from "styled-components";
import {
  Titulo3,
  Cuerpo,
  Subtitulo3,
  TituloSeccion,
} from "../../componentes-styled-compartidos/Textos";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";

const EncabezadoEvaluacion = styled(Subtitulo3)`
  align-items: center;
  background-color: var(--color-marca-normal);
  border-radius: 8px;
  border: solid 1px var(--fondo-gris);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: var(--texto-blanco);
  display: flex;
  padding: 10px 16px;
  width: 100%;
`;

const ImagenEncabezado = styled.img`
  border-radius: 31px;
  height: 62px;
  margin-right: 15px;
  object-fit: cover;
  width: 62px;
`;

const TituloEvaluacion = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 140px;
  opacity: 0.8;
  text-align: center;
`;

const EnvolvedorNumeroPreguntas = styled.div`
  display: flex;
  margin-top: 15px;
  width: 100%;
  justify-content: center;
`;

const ContenedorIconoPunto = styled.div`
  margin: 0 7px;
  color: ${(props) =>
    props.marcado ? "var(--fondo-verde-claro)" : "var(--fondo-gris)"};
`;

const CuerpoEvaluacion = styled(Subtitulo3)`
  color: var(--color-gris-claro);
  margin-top: 20px;
`;

const ContenedorExtrasEvaluacion = styled(Subtitulo3)`
  margin-bottom: 50px;
  margin-top: 87px;
  color: var(--color-azul-normal);
  width: 100%;
`;

const RenglonExtrasEvaluacion = styled.div`
  display: flex;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 230px;
`;

const RenglonExtrasEvaluacionCentrado = styled(RenglonExtrasEvaluacion)`
  justify-content: center;
`;

const ContenedorIconoExtrasEvaluacion = styled.div`
  margin-right: 12px;
`;

const ContenedorCampoTextoComentarios = styled.div`
  display: inherit;
`;

const TituloEvaluacionSubpantalla = styled(Titulo3)`
  display: flex;
  height: 54px;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 18px;
  text-align: left;
  width: 100%;
`;

const EnvolvedorEvaluacionSubpantalla = styled(EnvolvedorPantalla)`
  align-items: flex-start;
  min-height: 700px;
`;

const CuerpoEvaluacionSubpantalla = styled(Cuerpo)`
  color: var(--color-gris-medio);
  padding-bottom: 40px;
  width: 100%;
`;

const ContenedorReconocimientos = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Reconocimiento = styled(TituloSeccion)`
  align-items: center;
  color: var(--color-gris-medio);
  display: flex;
  flex-direction: column;
  font-family: var(--fuente-montserrat-bold);
  margin-top: 37px;
  text-transform: none;
`;

const ImagenReconocimiento = styled.img`
  height: 115px;
  width: 90px;
`;

const ContenedorPantallaEvaluacion = styled(Pantalla)`
  margin-top: 0px;
  .carousel li {
    height: 220px;
    padding: 0px !important;
  }
`;

export {
  EncabezadoEvaluacion,
  ImagenEncabezado,
  TituloEvaluacion,
  EnvolvedorNumeroPreguntas,
  ContenedorIconoPunto,
  CuerpoEvaluacion,
  ContenedorExtrasEvaluacion,
  RenglonExtrasEvaluacion,
  RenglonExtrasEvaluacionCentrado,
  ContenedorIconoExtrasEvaluacion,
  EnvolvedorEvaluacionSubpantalla,
  TituloEvaluacionSubpantalla,
  CuerpoEvaluacionSubpantalla,
  ContenedorCampoTextoComentarios,
  ContenedorReconocimientos,
  Reconocimiento,
  ImagenReconocimiento,
  ContenedorPantallaEvaluacion,
};

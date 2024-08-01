/* eslint-disable */
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
  margin: 0px 0px 30px;
  text-align: left;
  color: var(--color-gris-medio);
  @media (max-width: 280px) {
    font-size: 13px;
    height: auto;
    margin: 5%;
  }
`;

const ContenedorCamara = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 0px;
  text-align: left;
  @media (max-width: 280px) {
    font-size: 12px;
    margin: 5%;
    height: 10%;
  }
`;

const Instrucciones = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 15px 0px 50px;
  text-align: left;
  color: ${(props) =>
    props.enlace ? "var(--color-azul-enlace)" : "var(--color-negro-puro)"};
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

const ContenedorEnlace = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: -30px;
  color: var(--color-error-normal);
`;

const AlertaImagen = styled.img`
  width: 100%;
`;

const ContenedorRow = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-top: 0px;
`;

const ContenedorCheck = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 0px;
`;

const Check = styled.input.attrs({ type: "checkbox" })`
  accent-color: var(--color-marca-normal);
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
  margin-top: -1px;
`;

const MensajeCheck = styled(Subtitulo3)`
  width: 100%;
  text-align: left;
  margin-left: 5px;
`;

export {
  AlertaImagen,
  ContenedorBoton,
  ContenedorCamara,
  Instrucciones,
  MensajeError,
  MensajePequeno,
  Titulo,
  Check,
  ContenedorCheck,
  MensajeCheck,
  ContenedorEnlace,
  ContenedorRow,
};

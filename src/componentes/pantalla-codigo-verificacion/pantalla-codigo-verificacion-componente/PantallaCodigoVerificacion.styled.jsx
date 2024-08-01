/* eslint-disable */
import styled from "styled-components";
import {
  EnvolvedorPantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import { EnvolvedorEncabezado } from "../../encabezado/encabezado-componente/Encabezado.styled";
import { CuerpoLiga, Subtitulo3, Titulo3 } from "../../componentes-styled-compartidos/Textos";
import { ContenedorCampo, EnvolvedorFormulario } from "../../pantalla-registro-usuario-sms/pantalla-registro-usuario-sms-component/PantallaRegistroUsuarioSMS.styled";

const EnvolvedorPantallaCodigo = styled(EnvolvedorPantalla)`
  heigth: calc(100% - 56px);
`;

const EncabezadoCodigoVerificacionContent = styled(EnvolvedorEncabezado)`
  align-items: center !important;
`;

const TituloCodigoVerificacion = styled(Titulo3)``;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 20px 0px 33px;
  text-align: left;
  color: var(--color-negro-puro);
`;

const ContenedorCampoCodigoVerificacion = styled(ContenedorCampo)`
  flex-direction: row;
  margin-top: 1rem;
  justify-content: center;
`;

const EnvolvedorFormularioCodigoVerificacion = styled(EnvolvedorFormulario)`
  justify-content: flex-start;
  min-height: 55vh;
`;

const CampoCodigo = styled.input`
  max-width: 50px !important;
  height: 62px;
  font-family: var(--fuente-proxima-regular);
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: var(--color-negro-normal);
  text-align: center;
  outline: none;
  line-height: 20px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  background-color: var(--color-blanco-normal);
  border-color: var(--color-gris-claro);
  
  &:focus {
    border-color: var(--color-marca-normal);
  }
`;

const EnlaceVolverEnviar = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 30px 0 50px;
  text-align: left;
  font-size: 14px;
  color: ${(props) =>
    props.disabled ? "var(--color-azul-enlace)" : "var(--texto-gris)"};
  pointer-events: ${(props) => (props.disabled ? "all" : "none")};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export {
  EnvolvedorPantallaCodigo,
  EncabezadoCodigoVerificacionContent,
  TituloCodigoVerificacion,
  MensajePequeno,
  ContenedorCampoCodigoVerificacion,
  EnvolvedorFormularioCodigoVerificacion,
  CampoCodigo,
  EnlaceVolverEnviar
};
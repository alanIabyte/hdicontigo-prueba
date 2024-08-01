import styled from "styled-components";
import {
  Titulo3,
  Subtitulo2Negritas,
} from "../../componentes-styled-compartidos/Textos";

const PantallaCredencial = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 16px;
  background-color: var(--color-blanco-normal);
  padding: 24px;
  /* height: calc(100% - 115px); */
`;

const Titulo = styled(Titulo3)`
  width: 100%;
  height: 54px;
  margin: 31px 0px 10px;
  text-align: left;
`;

const TituloBanner = styled(Subtitulo2Negritas)`
  font-weight: bold;
`;

const ContenedorCarrusel = styled.div`
  margin: 50px 0;
  :global(.carousel .control-dots .dot) {
    color: var(--color-verde-normal);
  }
`;

const LogoTamano = styled.img`
  width: 30% !important;
`;

const EnvolvedorLogo = styled.div`
  display: flex;
  justify-content: center;
`;

const EnvolvedorField = styled.fieldset`
  font-family: var(--fuente-proxima-regular);
  background-color: var(--fondo-blanco-normal);
  border-radius: 7px;
  margin: 6px 0;
  padding: 0;
  margin-bottom: 16px;
  border-top: ${(props) => {
    if (props.color === "verde") {
      return "15px solid #65a518";
    }
    if (props.color === "azul") {
      return " 24px solid #1777bd";
    }
    return "15px solid #ffffff";
  }};
  border-right: 1px solid var(--color-gris-claro);
  border-bottom: 15px solid
    ${(props) => {
      if (props.color === "verde") {
        return "#65a518";
      }
      if (props.color === "azul") {
        return "#1777bd";
      }
      return "#ffffff";
    }};

  border-left: 1px solid var(--color-gris-claro);
`;

const Leyenda = styled.legend`
  border-style: none;
  text-align: center;
  text-align: -moz-right;

  @media (min-width: 360px) {
    padding: 0.22rem;
  }
  @media (min-width: 410px) {
    padding: 0.1rem;
  }
  @media (min-width: 440px) {
    padding: 0;
  }

  background-color: ${(props) => {
    if (props.color === "azul") {
      return "#1777bd";
    }
    return "#ffffff";
  }};
  color: ${(props) => {
    if (props.color === "azul") {
      return "#ffffff";
    }
    return "#000000 ";
  }};
`;

const EnvolvedorIdentificacion = styled.div`
  display: grid;
  grid-template-columns: 65px 1fr;
  grid-template-rows: auto;
  grid-gap: 15px;
  padding: 16px;
  box-sizing: border-box;
`;

const EnvolvedorFotografia = styled.div`
  grid-column: 1;
  box-sizing: border-box;
  height: 65px;
  width: 65px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: solid 0.4px var(--fondo-gris);
  box-sizing: border-box;
`;

const EnvolvedorDependientes = styled.div`
  display: grid;
  grid-template-columns: 65px 1fr;
  grid-template-rows: auto;
  padding: 10px;
  box-sizing: border-box;
`;
const EnvolvedorImagen = styled.img`
  width: 45px;
`;

const FotografiaUsuario = styled.img`
  border-radius: 6px;
  width: 65px;
  height: 65px;
  transition: all 0.3s ease;
  &:active {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.14);
  }
`;

const EnvolvedorDatosTitular = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: start;
  font-size: 20px;
`;

const EnvolvedorDatos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: start;
  padding: 16px;
`;

const EnvolvedorCentrar = styled.div`
  align-items: center;
  text-align: center;
`;

const NombreTitulo = styled.div`
  font-family: var(--fuente-proxima-bold);
  white-space: pre-wrap;
`;
const CuerpoTexto = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.4px;
  color: var(--color-negro-normal);
`;

const SeparadorLinea = styled.div`
  width: 100%;
  border: solid 0.4px var(--fondo-gris);
  margin-top: 5px;
  margin-bottom: 15px;
`;
const Espacio = styled.div`
  height: ${(props) => (props.tamano ? props.tamano : "20px")};
`;

const Scrollbar = styled(PantallaCredencial)`
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: 520px;

  @media screen and (min-width: 390px) {
    height: 650px;
  }
  overflow: scroll;
  overflow-x: hidden;

  @media screen and (min-width: 360px) {
    font-size: 0.7rem;
  }

  @media screen and (min-width: 410px) {
    font-size: 0.9rem;
  }
  @media screen and (min-width: 440px) {
    font-size: 1rem;
  }

  @media (min-width: 840px) {
    font-size: 1rem;
  }
`;

const NotFound = styled.div`
  top: 50%;
  margin: 0;
  position: absolute;
`;

const TablaInformativa = styled.table`
  align-items: center;
  text-align: left;
  width: 100%;

  &.td {
    width: 45%;
    padding: 6px;
  }
`;

const TablaCabecera = styled.table`
  border: none;
  color: var(--color-blanco-normal);

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  td {
    display: table-cell;
  }

  .centrar {
    text-align: center;
  }
`;

const TablaTitular = styled.table`
  .nombreTitular {
    text-align: left;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .cell {
    border: 1px solid;
    border-color: #65a518;
    border-radius: 0.3em;
  }

  .centrar {
    text-align: center;
  }
  td {
    display: table-cell;
  }
`;

const TablaDependientes = styled.table`
  .dependientes-container {
    text-align: left;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .tbody-container {
    display: block;
    max-height: 300px;
    overflow-y: scroll;
  }

  .centrar {
    text-align: center;
  }
`;

const SpanUnderline = styled.span`
  text-decoration: underline;
  text-decoration-color: #adadad;
`;

const TituloNegritas = styled.span`
  font-weight: bold;
  vertical-align: ${(props) => (props.alinear ? props.alinear : "baseline")};
`;

const ContainerImgTxt = styled.div`
  overflow: hidden;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const ImageResize = styled.div`
  float: left;
  margin-right: 10px;
`;

// const ContenedorBoton = styled.div`
//   margin: 10px 24px;
// `;

const Datos = styled.div`
  overflow: hidden;
  white-space: normal;
  white-space: pre-wrap;
`;

const Hipervinculo = styled.a`
  &:link {
    color: #1777bd;
    background-color: transparent;
    text-decoration: none;
  }
  &:visited {
    color: #1777bd;
    background-color: transparent;
    text-decoration: none;
  }
  &:hover {
    color: #1777bd;
    background-color: transparent;
    text-decoration: underline;
  }
  &:active {
    color: #1777bd;
    background-color: transparent;
    text-decoration: underline;
  }
`;

export {
  PantallaCredencial,
  Titulo,
  ContenedorCarrusel,
  EnvolvedorDependientes,
  EnvolvedorIdentificacion,
  EnvolvedorFotografia,
  EnvolvedorImagen,
  EnvolvedorCentrar,
  EnvolvedorField,
  FotografiaUsuario,
  EnvolvedorDatosTitular,
  EnvolvedorDatos,
  NombreTitulo,
  CuerpoTexto,
  SeparadorLinea,
  LogoTamano,
  TituloBanner,
  Espacio,
  Leyenda,
  Scrollbar,
  NotFound,
  TablaInformativa,
  TablaCabecera,
  TablaTitular,
  SpanUnderline,
  TituloNegritas,
  TablaDependientes,
  EnvolvedorLogo,
  Datos,
  Hipervinculo,
  ContainerImgTxt,
  ImageResize,
};

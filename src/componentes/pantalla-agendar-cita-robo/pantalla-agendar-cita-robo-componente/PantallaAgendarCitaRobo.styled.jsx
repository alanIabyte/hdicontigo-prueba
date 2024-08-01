import styled from "styled-components";
import {
  Titulo3,
  Subtitulo2Negritas,
  Subtitulo3,
  Cuerpo,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaCuestionarioReporte = styled.div``;

const SeparadorEncabezadoCuestionarioReporte = styled.div`
  background-color: var(--fondo-gris-claro);
  height: 1px;
  position: relative;
  top: 50px;
  width: 100%;
  z-index: 1;
`;

const TituloCuestionarioReporte = styled(Titulo3)`
  height: 54px;
  margin-top: 31px;
  margin-bottom: 0px;
  text-align: left;
  width: 100%;
`;

const MensajePequeno = styled(Subtitulo3)`
  font-weight: bold;
  width: 100%;
  height: 40px;
  margin: 0px 0px 30px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const NombreAjustador = styled(Subtitulo2Negritas)`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Subtitulo = styled(Subtitulo2Negritas)`
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CuerpoCuestionarioReporte = styled(Cuerpo)`
  color: var(--color-gris-medio);
  padding-bottom: 20px;
  width: 100%;

  b {
    font-family: var(--fuente-proxima-bold);
  }
`;

const SeparadorCuestionarioReporte = styled.div`
  background-color: var(--fondo-gris);
  height: 1px;
  margin: 5px 0px;
  width: 100%;
`;

const ContenedorCampoTextoCuestionarioReporte = styled.div`
  display: ${(props) =>
    props.esUsuario || props.esUsuario === null ? "none" : "block"};
  margin-bottom: 19px;
`;

const ContenedorProcesoLegal = styled.div`
  padding-top: 6px;
  padding-bottom: 30px;
`;

const EnvolvedorProcesoLegal = styled.div`
  background-color: var(--fondo-blanco-normal);
  border-radius: 12px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14);
  padding: 21px;
  padding-bottom: 21px;
  column-gap: 15px;
  grid-template-columns: 65px auto;
  display: grid;
`;

const ImagenProcesoLegal = styled.img`
  width: 65px;
  height: 65px;
  object-fit: cover;
  object-position: center;
  border: ${(props) =>
    props.error ? "solid 1px var(--color-error-normal)" : "none"};
  border-radius: 6px;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

const TituloSeccion = styled(Subtitulo3)`
  font-family: var(--fuente-proxima-bold);
`;

const SubTituloSeccion = styled(Subtitulo3)``;
// -----------------------------------------------------------------------------------------------------------------
const ContenedorImagen = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
  svg {
    color: var(--color-azul-normal);
    margin-left: -18px;
  }
`;

const ImagenPerfil = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  ${({ error }) =>
    error &&
    `
    border: solid 1px var(--color-error-normal);
  `}
`;

export {
  EnvolvedorPantallaCuestionarioReporte,
  SeparadorEncabezadoCuestionarioReporte,
  TituloCuestionarioReporte,
  MensajePequeno,
  CuerpoCuestionarioReporte,
  SeparadorCuestionarioReporte,
  ContenedorCampoTextoCuestionarioReporte,
  ContenedorProcesoLegal,
  EnvolvedorProcesoLegal,
  ImagenProcesoLegal,
  TituloSeccion,
  SubTituloSeccion,
  // -----------------------------------------------------------------------------------------------------------------
  ContenedorImagen,
  ImagenPerfil,
  NombreAjustador,
  Subtitulo,
};

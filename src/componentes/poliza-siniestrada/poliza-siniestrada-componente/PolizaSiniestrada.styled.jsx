import styled from "styled-components";
import {
  Subtitulo3,
  MensajeError,
  Leyenda,
  BotonDescarga,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPolizaSiniestrada = styled.div`
  background-color: var(--fondo-blanco-normal);
  border-radius: 12px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14);
  padding: 15px;
  padding-bottom: 5px;
  column-gap: 15px;
  grid-template-columns: 65px auto;
  display: grid;
`;
const ImagenCarro = styled.img`
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
  text-transform: uppercase;
`;

const NumeroPoliza = styled(Subtitulo3)``;

const VigenciaPoliza = styled(MensajeError)`
  color: var(--color-gris-claro);
  grid-column: 1 / 3;
  margin-top: 15px;
  text-transform: capitalize;
`;
const BotonRegistraSin = styled(BotonDescarga)`
  background-color: var(--color-error-normal);
  border: none;
  color: var(--texto-blanco) !important;
  font-family: var(--fuente-proxima-bold);
  width: auto;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: black;
  border: none;
  color: var(--texto-negro);
  font-family: var(--fuente-proxima-bold);
  width: auto;
  float: right;
`;
const SeparadorSiniestros = styled.div`
  background-color: var(--fondo-gris);
  grid-column: 1 / 3;
  height: 1px;
  margin-left: -15px;
  margin-top: 16px;
  width: calc(100% + 30px);
`;

const ContenedorSiniestros = styled.div`
  grid-column: 1 / 3;
  margin-top: 5px;
`;

const EncabezadoSiniestros = styled.div`
  align-items: center;
  display: flex;
`;

const TextoSiniestros = styled(Leyenda)`
  color: var(--color-gris-fuerte);
  margin-right: 5px;
`;

const NumeroSiniestros = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
`;

const ContenedorIconoFlecha = styled.div`
  color: var(--color-gris-medio);
  margin-left: auto;
`;

const Siniestro = styled.div`
  column-gap: 15px;
  display: grid;
  grid-template-columns: 34px auto;
  padding-bottom: 15px;
  padding-top: 15px;
`;

const ImagenPortapapeles = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  width: 40px;
`;

const ContenedorBoton = styled.div`
  grid-column: 3 / 3;
  grid-row: 1 / 3;
`;

const FechaSiniestro = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

export {
  EnvolvedorPolizaSiniestrada,
  ImagenCarro,
  TituloSeccion,
  NumeroPoliza,
  VigenciaPoliza,
  SeparadorSiniestros,
  ContenedorSiniestros,
  EncabezadoSiniestros,
  TextoSiniestros,
  NumeroSiniestros,
  ContenedorIconoFlecha,
  Siniestro,
  ImagenPortapapeles,
  FechaSiniestro,
  BotonRegistraSin,
  ContenedorBoton,
};

import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo3,
  Leyenda,
  Subtitulo3Negritas,
  BotonPequeno,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
  height: 100%;
`;
const PantallaFondoBlanco = styled(Pantalla)`
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: calc(100% - 170px);
  overflow: scroll;
  overflow-x: hidden;
`;
const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 20px 0px 13px 0px;
  text-align: left;
  color: var(--color-negro-puro);
`;

const Contenedor = styled.div`
  width: 100%;
  min-height: calc(100%);
  box-sizing: border-box;
  & > div:last-of-type {
    margin-bottom: 100px;
  }
  ${".icono-regresar"} {
    margin-left: -8px !important;
    padding-left: 0px !important;
    color: var(--color-verde-normal);
  }
`;

const ContenedorRegresar = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  align-items: center;
  width: auto;
  margin-top: 10px;
  cursor: pointer;
  ${MensajePequeno} {
    margin: 0;
    height: auto;
    width: auto;
    color: var(--color-verde-normal);
  }
`;

const TituloMisPolizas = styled(Titulo3)`
  margin-bottom: 8px;
  margin-top: 10px;
`;

const NumeroPoliza = styled(Titulo3)`
  margin-bottom: 15px;
  font-size: ${(props) => (props.pequeno ? "14px" : "18px ")};
  color: ${(props) =>
    props.pequeno ? "var(--color-gris-medio)" : "var(--color-negro-normal)"};
  font-family: ${(props) =>
    props.pequeno
      ? "var(--fuente-montserrat-semibold)"
      : "var(--fuente-montserrat-bold)"};
`;

const ContenedorBuscadorPolizas = styled.div`
  background-color: var(--fondo-blanco-normal);
  border: none;
  border-radius: 50px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: var(--color-gris-claro);
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
`;

const BuscadorPolizas = styled.input`
  border: none;
  outline: none;
  padding-left: 9px;
  width: 100%;
  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

const PieDePaginaMisPolizas = styled.div`
  background-color: var(--fondo-gris-ligero);
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const ContenedorBoton = styled.div`
  margin: 20px 24px;
`;
const ContenedorPoliza = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
`;
const Propiedad = styled(Leyenda)`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gris-medio);
  line-height: 1.5;
`;

const Valor = styled(Subtitulo3Negritas)`
  font-size: ${(props) => (props.grande ? "20px" : "14px")};
  color: var(--color-negro-puro);
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

const GrupoDetalle = styled.div`
  margin-bottom: 10px;
`;

const CirculoEstatusPoliza = styled.span`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50px;
  display: inline-flex;
  background-color: ${(props) => {
    const { estatus } = props;
    if (
      estatus === "Activa" ||
      estatus === "Procesando" ||
      estatus === "Procesado" ||
      estatus === "Activo"
    ) {
      return "var(--color-marca-normal)";
    }
    if (estatus === "Pendiente de pago" || estatus === "En proceso") {
      return "var(--color-alerta-normal)";
    }
    if (estatus === "Cancelada" || estatus === "Negado") {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-normal)";
  }};
`;

const ColorAlterno = styled(Leyenda)`
  font-size: 14px;
  color: var(--color-negro-puro);
  line-height: 1.5;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ValoresColorAlterno = styled.div`
  > :nth-child(even) {
    background-color: var(--color-gris-normal);
  }
`;

const BotonPagar = styled(BotonPequeno)`
  display: block;
  background-color: ${(props) =>
    props.deshabilitado
      ? "var(--color-gris-claro)"
      : "var(--color-marca-normal)"};
  border: 0;
  appearance: none;
  color: var(--color-blanco-normal);
  padding: 8px 12px;
  border-radius: 50px;
  margin-top: 8px;
  cursor: pointer;
  pointer-events: ${(props) => (props.deshabilitado ? "none" : "all")};
`;

const BotonVer = styled(BotonPequeno)`
  display: block;
  background-color: transparent;
  border: 0;
  appearance: none;
  padding: ${(props) =>
    props.compact ? "3px 0px 6px 0px" : "8px 12px 8px 0px"};
  color: var(--texto-azul);
  font-family: var(--fuente-proxima-regular);
  font-size: 16px;
  font-weight: normal;
  margin-top: ${(props) => (props.compact ? "0px" : "8px")};
  cursor: pointer;
`;

const BotonDescargarPoliza = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
`;

const TextoPoliza = styled(Leyenda)`
  font-size: 14px;
  color: var(--color-gris-medio);
`;

const BotonDescargaPolizaIcono = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: var(--fuente-proxima-regular);
  font-size: 14px;
  color: var(--color-azul-normal);
  font-weight: normal;
  ${".icono"} {
    margin-left: 8px;
  }
`;

const BotonBase = styled.button`
  font-family: var(--fuente-proxima-regular);
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  outline: none;
  border: 0;
  appearance: none;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  ${".ico"} {
    margin-right: 5px;
  }
  &:active {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.14);
  }
`;

const BotonReportarSiniestro = styled(BotonBase)`
  font-size: 12px;
  color: var(--color-blanco-normal);
  background-color: var(--color-error-normal);
  padding: 5px 10px;
  border-radius: 10px;
`;

const BotonSolicitarReembolso = styled(BotonReportarSiniestro)`
  background-color: #006729;
  cursor: pointer;
  margin-left: auto;
`;

export {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  Contenedor,
  TituloMisPolizas,
  ContenedorBuscadorPolizas,
  BuscadorPolizas,
  PieDePaginaMisPolizas,
  ContenedorBoton,
  ContenedorPoliza,
  MensajePequeno,
  Propiedad,
  Valor,
  GrupoDetalle,
  CirculoEstatusPoliza,
  ValoresColorAlterno,
  ColorAlterno,
  BotonPagar,
  BotonVer,
  ContenedorRegresar,
  NumeroPoliza,
  BotonDescargarPoliza,
  BotonDescargaPolizaIcono,
  TextoPoliza,
  BotonSolicitarReembolso,
};

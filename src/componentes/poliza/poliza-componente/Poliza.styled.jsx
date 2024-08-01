import styled from "styled-components";
import { Leyenda, Parrafo } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPoliza = styled.div`
  background-color: var(--fondo-blanco-normal);
  border-radius: 7px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  margin: 6px 0;
  margin-bottom: 16px;
  cursor: pointer;
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
  margin: auto;
`;
const FotografiaPoliza = styled.img`
  border-radius: 6px;
  width: 65px;
  height: 65px;
  transition: all 0.3s ease;
  &:active {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.14);
  }
`;
const EnvolvedorDatosIdentificacion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const NombrePoliza = styled.div`
  font-family: var(--fuente-proxima-bold);
  white-space: pre-wrap;
  @media (max-width: 280px) {
    font-size: 11px;
  }
`;
const NumeroPoliza = styled(Parrafo)`
  color: var(--color-gris-medio);
  @media (max-width: 280px) {
    font-size: 11px;
  }
`;
const BotonEliminarPoliza = styled(Parrafo)`
  color: var(--color-gris-medio);
  font-size: 18px;
  margin: 0;
  margin-bottom: -50px;
  margin-left: auto;
  margin-top: -10px;
  grid-column: 2;
  padding: 12px;
  padding-top: 0px;
  padding-bottom: 0px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:active {
    color: var(--color-negro-normal);
  }
`;
const EstatusPoliza = styled(Leyenda)`
  width: 55px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  background-color: ${(props) => {
    const { estatus } = props;
    if (estatus === "Activa" || estatus === "Activo") {
      return "var(--color-verde-normal)";
    }
    if (estatus === "Pendiente de pago") {
      return "var(--color-alerta-normal)";
    }
    if (estatus === "Cancelada") {
      return "var(--color-error-normal)";
    }
    if (estatus === "Vencida") {
      return "var(--color-gris-medio)";
    }
    return "var(--color-gris-normal)";
  }};
  color: ${(props) =>
    props.estatus === "Pendiente"
      ? "var(--color-negro-normal)"
      : "var(--color-blanco-normal)"};
  padding: 3px 5px;
  border-radius: 4px;
  margin-right: 8px;
`;
const EnvolvedorEstado = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
`;
const TextoClaro = styled(Leyenda)`
  font-size: 12px;
  color: var(--color-gris-medio);
  width: ${(props) => (props.completo ? "100%" : "auto")};
  margin: ${(props) => (props.completo ? "10px 0px 0px 0px" : "0px")};
  margin-right: ${(props) => (props.margen ? "10px" : "0px")};
`;
const PiePoliza = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--fondo-gris);
  padding: 10px 16px 18px 16px;
  box-sizing: border-box;
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
const BotonVerDetalle = styled(BotonBase)`
  font-size: 14px;
  color: var(--color-marca-normal);
  background-color: var(--color-blanco-normal);
  cursor: pointer;
`;
const BotonReportarSiniestro = styled(BotonBase)`
  font-size: 12px;
  background-color: ${(props) =>
    props.reporte ? "var(--fondo-rojo)" : "var(--color-marca-normal)"};
  color: var(--color-blanco-normal);
  /* background-color: var(--color-error-normal); */
  padding: 5px 17px;
  border-radius: 5px;
  cursor: pointer;
`;

const BotonPagar = styled(BotonReportarSiniestro)`
  font-size: 14px;
  color: var(--color-gris-claro);
  background-color: var(--color-blanco-normal);
  cursor: pointer;
  pointer-events: ${(props) => (props.deshabilitado ? "none" : "all")};
  ${".ico"} {
    filter: grayscale(100%);
    opacity: 0.5;
  }
`;

const BotonSolicitarReembolso = styled(BotonReportarSiniestro)`
  background-color: #006729;
  cursor: pointer;
  margin-left: auto;
`;

const DiasGracia = styled(Leyenda)`
  font-size: 14px;
  color: var(--texto-rojo);
`;

export {
  EnvolvedorPoliza,
  EnvolvedorIdentificacion,
  EnvolvedorFotografia,
  FotografiaPoliza,
  EnvolvedorDatosIdentificacion,
  NombrePoliza,
  NumeroPoliza,
  EnvolvedorEstado,
  TextoClaro,
  EstatusPoliza,
  PiePoliza,
  BotonVerDetalle,
  BotonReportarSiniestro,
  BotonSolicitarReembolso,
  BotonEliminarPoliza,
  DiasGracia,
  BotonPagar,
};

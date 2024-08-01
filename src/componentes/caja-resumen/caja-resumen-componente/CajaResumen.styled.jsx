import styled from "styled-components";
import {
  Leyenda,
  Parrafo,
  ParrafoNegritas,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPoliza = styled.div`
  cursor: pointer;
  background-color: var(--fondo-blanco-normal);
  border-radius: 7px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  /* border: 1px solid var(--color-gris-medio); */
  box-sizing: border-box;
  margin: 6px 0;
  margin-bottom: 16px;
`;
const EnvolvedorIdentificacion = styled.div`
  display: grid;
  grid-template-columns: 65px 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  padding: 18px;
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
  background-color: var(--fondo-gris);
  border-radius: 6px;
  box-sizing: border-box;
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

const DatoPoliza = styled(Parrafo)`
  color: var(--color-negro-puro);
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 260px) {
    font-size: 12px;
  }
`;

const EnvolvedorDatosIdentificacion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.compacto ? "flex-start" : "space-between"};
  grid-column: 2;
  box-sizing: border-box;
  ${DatoPoliza} {
    height: ${(props) => (props.compacto ? "90%" : "auto")};
  }
`;
const NombrePoliza = styled.div`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-verde-normal);
  white-space: pre-wrap;
`;

const TextoVerde = styled(ParrafoNegritas)`
  margin-right: 5px;
  color: var(--color-marca-normal);
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
  font-size: 12px;
  background-color: ${(props) => {
    const { estatus } = props;
    if (estatus === "Activa") {
      return "var(--color-marca-normal)";
    }
    if (estatus === "Pendiente de pago") {
      return "var(--color-alerta-normal)";
    }
    if (estatus === "Cancelada") {
      return "var(--color-error-normal)";
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
  color: var(--color-gris-claro);
  background-color: var(--color-blanco-normal);
`;
const BotonReportarSiniestro = styled(BotonBase)`
  font-size: 12px;
  color: var(--color-blanco-normal);
  background-color: var(--color-error-normal);
  padding: 5px 10px;
  border-radius: 10px;
`;
export {
  EnvolvedorPoliza,
  EnvolvedorIdentificacion,
  EnvolvedorFotografia,
  FotografiaPoliza,
  EnvolvedorDatosIdentificacion,
  NombrePoliza,
  EnvolvedorEstado,
  TextoClaro,
  EstatusPoliza,
  PiePoliza,
  BotonVerDetalle,
  BotonReportarSiniestro,
  BotonEliminarPoliza,
  DatoPoliza,
  TextoVerde,
};

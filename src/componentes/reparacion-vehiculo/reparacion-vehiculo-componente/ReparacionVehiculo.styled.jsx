import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorReparacionVehiculo = styled.div``;

const ReparacionVehiculoCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const ReparacionVehiculoValor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

const TituloReparacion = styled(Leyenda)`
  color: var(--color-gris-medio);
  margin-bottom: 18px;
`;

const SemaforoRefacciones = styled(Leyenda)`
  color: var(--color-gris-medio);
  font-family: var(--fuente-proxima-bold);
  margin-bottom: 18px;
`;

const Semaforo = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.semaforo === 0
      ? "var(--color-alerta-normal)"
      : "var(--fondo-exitoso)"};
  float: left;
  margin-right: 8px;
  margin-top: 1px;
`;

const FechaPromesaContenedor = styled.div`
  height: 36px;
  margin: 10px 13px 10px 38px;
  padding: 7px 11px 6px 12px;
  border-radius: 6px;
  background-color: var(--color-gris-normal);
`;

const FechaPromesaCampo = styled(Leyenda)`
  color: var(--color-gris-medio);
  margin-bottom: 4px;
`;

const FechaPromesaValor = styled(Leyenda)`
  color: var(--color-gris-medio);
  font-family: var(--fuente-proxima-bold);
`;

export {
  EnvolvedorReparacionVehiculo,
  FechaPromesaCampo,
  FechaPromesaContenedor,
  FechaPromesaValor,
  ReparacionVehiculoCampo,
  ReparacionVehiculoValor,
  Semaforo,
  SemaforoRefacciones,
  TituloReparacion,
};

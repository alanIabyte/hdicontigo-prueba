import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const Envolvedor = styled.div``;

const Campo = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const Valor = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 3px;
`;

const ContenedorValorCirculo = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
  margin-bottom: 20px;
  margin-top: 0px;
  margin-right: 5px;
`;

const Circulo = styled.div`
  background: ${(props) => {
    if (props.estatusReporte === "En progreso") {
      return "var(--fondo-alerta-flotante);";
    }
    if (props.estatusReporte === "Cancelada") {
      return "var(--fondo-error)";
    }
    return "var(--fondo-alerta-flotante";
  }};
  border-radius: 50%;
  width: 10px;
  height: 10px;
`;

const Encabezado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export {
  Envolvedor,
  Campo,
  Valor,
  Circulo,
  Encabezado,
  ContenedorValorCirculo,
};

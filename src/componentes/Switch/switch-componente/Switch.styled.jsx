import styled from "styled-components";
import {
  Leyenda,
  LeyendaNegritas,
} from "../../componentes-styled-compartidos/Textos";

const Contenedor = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Texto = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const TextoEstado = styled(LeyendaNegritas)`
  width: 26px;
  user-select: none;
`;

const CapsulaSwitch = styled.div`
  background-color: ${(props) =>
    props.activo ? "var(--color-marca-normal)" : "var(--color-gris-claro)"};
  width: 60px;
  height: 30px;
  border-radius: 100px;
  display: flex;
  flex-direction: ${(props) => (props.activo ? "row-reverse" : "row")};
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  cursor: pointer;
  ${TextoEstado} {
    text-align: ${(props) => (!props.activo ? "right" : "left")};
    color: ${(props) =>
      props.activo ? "var(--color-blanco-normal)" : "var(--color-gris-medio)"};
  }
`;

const StyledSwitch = styled.div`
  background-color: var(--color-blanco-normal);
  width: 27px;
  height: 26px;
  border-radius: 100%;
  box-sizing: border-box;
  margin: 2px;
`;

const ContenedorIcono = styled.img`
  color: var(--color-marca-normal);
  z-index: 9;
  left: 10px;
  top: 20px;
  width: 30px;
  height: 30px;
  margin-right: 12px;
`;

export {
  Contenedor,
  Texto,
  CapsulaSwitch,
  StyledSwitch,
  TextoEstado,
  ContenedorIcono,
};

/**
 `
*/

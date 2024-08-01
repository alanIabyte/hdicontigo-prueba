import styled from "styled-components";
import { BotonGrande } from "../../componentes-styled-compartidos/Textos";

const Contenedor = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Boton = styled(BotonGrande)`
  display: flex;
  justify-content: center;
  font-size: 14px;
  width: 50%;
  border-radius: 3px;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "var(--color-marca-normal)" : "var(--fondo-blanco-medio)"};
  border: ${(props) =>
    props.active
      ? "1px solid var(--color-marca-normal)"
      : "1.5px solid var(--color-gris-medio)"};
  color: ${(props) =>
    props.active
      ? "var(--fondo-blanco-normal) !important"
      : "#5A5A5A !important"};
  ${".grupobtn-icono"} {
    /* margin-right: 10px; */
  }
  opacity: ${(props) => (props.active ? "" : "0.7")};
`;

export { Contenedor, Boton };

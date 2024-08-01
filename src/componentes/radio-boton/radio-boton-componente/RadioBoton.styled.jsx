import styled from "styled-components";
import { Cuerpo } from "../../componentes-styled-compartidos/Textos";

const CuerpoRadioBoton = styled.div`
  margin-top: 7px;
`;

const Opcion = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Etiqueta = styled(Cuerpo)``;

const RadioBoton = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) =>
    props.seleccionado
      ? "var(--color-marca-normal)"
      : "var(--fondo-blanco-normal)"};
  border-radius: 50%;
  float: left;
  margin-right: 13px;
  cursor: pointer;
  margin-top: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ seleccionado }) =>
    !seleccionado &&
    `
    div {
      width: 19px;
      height: 18px;
      background-color: var(--fondo-blanco-normal);
      border-radius: 50%;
      border: solid 1px var(--fondo-gris-medio)
    }
  `}
  ${({ seleccionado }) =>
    seleccionado &&
    `
    div {
      width: 40%;
      height: 40%;
      background-color: var(--fondo-blanco-normal);
      border-radius: 50%;
    }
  `}
`;

export { CuerpoRadioBoton, Etiqueta, Opcion, RadioBoton };

import styled from "styled-components";

const EnvolvedorEncabezadoSimple = styled.div`
  background-color: var(--color-blanco-normal);
  box-shadow: 0 4px 8px 0 var(--color-gris-claro);
  color: var(--color-marca-normal);
  display: flex;
  text-align: start;
  padding: 20px;
  width: 100%;
  z-index: ${(props) => (props.seAbrioMenu ? "4" : "3")};
`;

export default EnvolvedorEncabezadoSimple;

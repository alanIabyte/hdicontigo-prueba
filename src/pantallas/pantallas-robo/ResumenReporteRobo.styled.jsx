/* eslint-disable */
import styled from "styled-components"

const ContenedorChecboxRobo = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 0px;
`;

const TextoCheckRobo = styled.div`
  width: 100%;
  text-align: left;
`;

const CheckRobo = styled.input.attrs({ type: "checkbox" })`
  accent-color: var(--color-marca-normal);
  margin-top: 20px;
  border-radius: 6px;
  width: 20px;
  height: 20px;
`;

export {
  ContenedorChecboxRobo,
  TextoCheckRobo,
  CheckRobo,
}

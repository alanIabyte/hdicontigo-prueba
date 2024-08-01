import styled from "styled-components";

const Contenedor = styled.div`
  width: 100%;
  min-height: calc(100%);
  display: flex;
  align-items: center;
  /* box-sizing: border-box; */
  /* & > div:last-of-type {
    margin-bottom: 100px;
  } */
  ${".icono-regresar"} {
    margin-left: -8px !important;
    padding-left: 0px !important;
    color: var(--color-marca-normal);
  }
`;

export default Contenedor;

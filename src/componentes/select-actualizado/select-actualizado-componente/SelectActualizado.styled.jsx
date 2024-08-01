import styled from "styled-components";

const ContenedorSelect = styled.select`
  width: 100%;
  margin-top: 22px;
  /* -webkit-appearance: menulist-button; */
  line-height: 50px;
  height: 50px;
  position: relative;
  display: grid;
  ${".icono"} {
    width: 12px;
    height: 12px;
    grid-column: 2;
    grid-row: 2;
    align-self: center;
    margin-right: 12px;
  }
`;

const OptionSelect = styled.option`
  font-family: var(--fuente-proxima-regular);
  color: var(--color-gris-medio);
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  max-width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-gris-normal);
  }
`;

export { ContenedorSelect, OptionSelect };

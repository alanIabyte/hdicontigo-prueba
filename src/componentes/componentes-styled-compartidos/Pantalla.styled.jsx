import styled from "styled-components";

const EnvolvedorPantalla = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  height: ${(props) => (props.height ? props.height : "")};
`;

const EnvolvedorPantallaResponsive = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Pantalla = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 16px;
  background-color: var(--color-blanco-normal);
  margin-top: -16px;
  padding: 24px;
  /* height: calc(100% - 115px); */
`;

export { EnvolvedorPantalla, Pantalla, EnvolvedorPantallaResponsive };

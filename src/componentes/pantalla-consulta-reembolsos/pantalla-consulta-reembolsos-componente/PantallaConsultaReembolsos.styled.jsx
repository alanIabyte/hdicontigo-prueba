import styled from "styled-components";

const EnvolvedorPantalla = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
`;

const ContenedorBuscadorPolizas = styled.div`
  width: 100%;
  background-color: var(--fondo-blanco-normal);
  border: none;
  border-radius: 50px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: var(--color-gris-claro);
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
`;

const BuscadorPolizas = styled.input`
  border: none;
  outline: none;
  padding-left: 9px;
  width: 100%;

  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

export {
  EnvolvedorPantalla,
  Pantalla,
  ContenedorBuscadorPolizas,
  BuscadorPolizas,
};

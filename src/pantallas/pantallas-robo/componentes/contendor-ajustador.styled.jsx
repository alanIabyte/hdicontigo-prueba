/* eslint-disable */
import styled from "styled-components";

const EnvolvedorPrincipalCitaAjustador = styled.div`
  margin-bottom: 1.3rem;
  min-height: 4rem;
  width: 100%;
  padding: 24px;
  box-shadow: 0 3px 3px 0 var(--color-gris-claro);
`;

const EnvolvedorEncabezadoSeguimientoRoboTotalAjustador = styled.div`
  column-gap: 15px;
  display: grid;
  grid-template-columns: 50px 90%;
  grid-template-rows: 20px 20px;
  row-gap: 9px;
  width: 100%;
  margin-top: 30px;
`;

const BotonAgendarCita = styled.button`
  background-color: var(--color-marca-normal);
  border-radius: 5px;
  border: none;
  color: var(--texto-blanco);
  font-family: var(--fuente-montserrat-regular);
  font-size: 12px;
  width: 110px;
  height: 35px;
  margin-top: 15px;
  cursor: pointer;
`;

export {
  EnvolvedorPrincipalCitaAjustador,
  EnvolvedorEncabezadoSeguimientoRoboTotalAjustador,
  BotonAgendarCita,
};

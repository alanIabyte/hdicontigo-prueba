/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

const ContenedorForm = styled.form`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-rows: repeat(3, auto);
  row-gap: 20px;
  /* flex-direction: column; */
  /* justify-content: flex-start; */
`;

const SelectInput = styled.select`
  border: 0px;
  border-radius: 5px;
  height: 35px;
`;

export {
  ContenedorForm,
  SelectInput
};

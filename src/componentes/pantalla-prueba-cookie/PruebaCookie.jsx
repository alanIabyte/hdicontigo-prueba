/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import { useCookies } from 'react-cookie'

export const PruebaCookie = () => {
  const [cookies] = useCookies(['hdi-data']);
  const cookieValue = cookies['hdi-data'];

  console.log("Valor de la cookie 'hdi-data':", cookieValue);
  return (
    <>
      <div>{cookieValue.Usuario}</div>
      <div>Hola</div>
    </>
  )
}

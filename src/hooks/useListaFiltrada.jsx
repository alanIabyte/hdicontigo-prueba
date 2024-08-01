/* eslint-disable */
import { useState } from "react";

const useListaFiltrada = (lista, filtro, propiedad) => {
  const listaState = lista.filter((item) => item[propiedad] === filtro);

  return [listaState];
};

export default useListaFiltrada;

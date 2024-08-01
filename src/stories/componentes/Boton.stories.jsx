/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { Boton } from "../../componentes";

export default {
  title: "Componentes/Boton",
  component: Boton,
};

const Modelo = (args) => (
  <div className="appS">
    <Boton {...args} />
  </div>
);

export const Estandar = Modelo.bind({});
Estandar.args = {
  etiqueta: "Boton etiqueta",
  tema: "estandar",
};

export const Rojo = Modelo.bind({});
Rojo.args = {
  etiqueta: "Boton etiqueta",
  tema: "rojo",
};

export const Simple = Modelo.bind({});
Simple.args = {
  etiqueta: "Boton etiqueta",
  tema: "simple",
};

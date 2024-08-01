/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { Evaluacion } from "../../componentes";

export default {
  title: "Componentes/Evaluación Ajustador",
  component: Evaluacion,
};

const Modelo = (args) => (
  <div className="appS">
    <Evaluacion {...args} />
  </div>
);

export const Default = Modelo.bind({});
Default.args = {};

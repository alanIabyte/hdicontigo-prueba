/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { IndicadorCarga } from "../../componentes";

export default {
  title: "Componentes/IndicadorCarga",
  component: IndicadorCarga,
};

const Modelo = (args) => (
  <div className="appS">
    <IndicadorCarga {...args} />
  </div>
);

export const Default = Modelo.bind({});
Default.args = {};

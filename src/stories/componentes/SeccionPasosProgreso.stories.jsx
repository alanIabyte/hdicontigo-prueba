/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { SeccionPasosProgreso } from "../../componentes";

export default {
  title: "Componentes/Pasos progreso componente",
  component: SeccionPasosProgreso,
};

const Modelo = (args) => (
  <div className="appS">
    <SeccionPasosProgreso {...args} />
  </div>
);

export const Default = Modelo.bind({});

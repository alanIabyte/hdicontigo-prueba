/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { PantallaIngresoDePolizaOcr } from "../../componentes";

export default {
  title: "Pantallas/Pantalla ingreso de poliza OCR",
  component: PantallaIngresoDePolizaOcr,
};

const Modelo = (args) => (
  <div className="app">
    <PantallaIngresoDePolizaOcr {...args} />
  </div>
);

export const Default = Modelo.bind({});
Default.args = {};

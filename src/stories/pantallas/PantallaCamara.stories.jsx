/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../../recursos/estilos/estilos.scss";
import { PantallaCamara } from "../../componentes";

export default {
  title: "Pantallas/Pantalla cámara",
  component: PantallaCamara,
};

const Modelo = (args) => (
  <Router>
    <div className="app">
      <PantallaCamara {...args} />
    </div>
  </Router>
);

export const Default = Modelo.bind({});
Default.args = {};

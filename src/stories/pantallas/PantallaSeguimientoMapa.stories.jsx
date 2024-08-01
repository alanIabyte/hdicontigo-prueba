/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../../recursos/estilos/estilos.scss";
import { PantallaSeguimientoMapa } from "../../componentes";

export default {
  title: "Pantallas/Pantalla seguimiento mapa",
  component: PantallaSeguimientoMapa,
};

const Modelo = (args) => (
  <div className="app">
    <Router>
      <PantallaSeguimientoMapa {...args} />
    </Router>
  </div>
);

export const Default = Modelo.bind({});
Default.args = {
  puntoInicial: { lat: 20.674383259956645, lng: -103.37771722759224 },
  puntoFinal: { lat: 20.645712254961907, lng: -103.41642686395167 },
};

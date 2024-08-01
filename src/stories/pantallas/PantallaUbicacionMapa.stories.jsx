/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reductor from "../../reductores/index";
import "../../recursos/estilos/estilos.scss";
import { PantallaUbicacionMapa } from "../../componentes";

export default {
  title: "Pantallas/Pantalla ubicacion mapa",
  component: PantallaUbicacionMapa,
};

const deposito = createStore(reductor);

const Modelo = (args) => (
  <div className="app">
    <Router>
      <Provider store={deposito}>
        <PantallaUbicacionMapa {...args} />
      </Provider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});
Default.args = {};

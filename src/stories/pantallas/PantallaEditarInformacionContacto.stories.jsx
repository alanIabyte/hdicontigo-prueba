/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reductor from "../../reductores/index";
import "../../recursos/estilos/estilos.scss";
import { PantallaEditarInformacionContacto } from "../../componentes";

export default {
  title: "Pantallas/Pantalla editar información contacto",
  component: PantallaEditarInformacionContacto,
};

const deposito = createStore(reductor);

const ModeloEditarInformacionContacto = (args) => (
  <div className="app">
    <Router>
      <Provider store={deposito}>
        <PantallaEditarInformacionContacto {...args} />
      </Provider>
    </Router>
  </div>
);

export const Default = ModeloEditarInformacionContacto.bind({});
Default.args = {};

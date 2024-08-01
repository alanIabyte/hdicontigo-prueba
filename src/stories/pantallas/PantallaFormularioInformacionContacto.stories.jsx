/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reductor from "../../reductores/index";
import "../../recursos/estilos/estilos.scss";
import { PantallaFormularioInformacionContacto } from "../../componentes";

export default {
  title: "Pantallas/Pantalla formulario informacion contacto",
  component: PantallaFormularioInformacionContacto,
};

const deposito = createStore(reductor);

const ModeloFormularioInformacionContacto = (args) => (
  <div className="app">
    <Router>
      <Provider store={deposito}>
        <PantallaFormularioInformacionContacto {...args} />
      </Provider>
    </Router>
  </div>
);

export const Default = ModeloFormularioInformacionContacto.bind({});
Default.args = {};

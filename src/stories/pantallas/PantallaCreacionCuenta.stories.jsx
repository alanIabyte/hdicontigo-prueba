/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import reductor from "../../reductores/index";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaCreacionCuenta } from "../../componentes";

export default {
  title: "Pantallas/Pantalla creación de cuenta",
  component: PantallaCreacionCuenta,
};

const deposito = createStore(reductor);

const ModeloCreacionCuenta = (args) => (
  <div className="app">
    <Router>
      <Provider store={deposito}>
        <ApolloProvider client={Cliente}>
          <PantallaCreacionCuenta {...args} />
        </ApolloProvider>
      </Provider>
    </Router>
  </div>
);

export const Default = ModeloCreacionCuenta.bind({});
Default.args = {};

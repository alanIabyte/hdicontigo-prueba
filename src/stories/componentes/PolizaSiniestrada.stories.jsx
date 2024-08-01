/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import reductor from "../../reductores/index";
import "../../recursos/estilos/estilos.scss";
import { PolizaSiniestrada } from "../../componentes";

export default {
  title: "Componentes/Poliza Siniestrada",
  component: PolizaSiniestrada,
};

const deposito = createStore(reductor);

const Modelo = (args) => (
  <div className="appS">
    <Router>
      <Provider store={deposito}>
        <ApolloProvider client={Cliente}>
          <PolizaSiniestrada {...args} />
        </ApolloProvider>
      </Provider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});
Default.args = {};

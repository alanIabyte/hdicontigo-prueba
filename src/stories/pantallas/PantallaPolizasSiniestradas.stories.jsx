/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import reductor from "../../reductores/index";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaPolizasSiniestradas } from "../../componentes";

export default {
  title: "Pantallas/Pantalla polizas siniestradas",
  component: PantallaPolizasSiniestradas,
};

const deposito = createStore(reductor);

const ModeloPasosProgreso = (args) => (
  <div className="app">
    <Router>
      <Provider store={deposito}>
        <ApolloProvider client={Cliente}>
          <PantallaPolizasSiniestradas {...args} />
        </ApolloProvider>
      </Provider>
    </Router>
  </div>
);

export const Default = ModeloPasosProgreso.bind({});

/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import reductor from "../../reductores/index";
import "../../recursos/estilos/estilos.scss";
import { Encabezado } from "../../componentes";

export default {
  title: "Componentes/Encabezado",
  component: Encabezado,
};

const deposito = createStore(reductor);

const Modelo = (args) => (
  <div className="appS">
    <Router>
      <Provider store={deposito}>
        <ApolloProvider client={Cliente}>
          <Encabezado {...args} />
        </ApolloProvider>
      </Provider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});
Default.args = {
  titulo: "Titulo Encabezado",
};

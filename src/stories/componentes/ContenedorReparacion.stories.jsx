/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reductor from "../../reductores/index";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { ContenedorReparacion } from "../../componentes";

export default {
  title: "Componentes/Pasos progreso reparación/Contenedor reparación",
  component: ContenedorReparacion,
};

const deposito = createStore(reductor);

const Modelo = (args) => (
  <div className="appS">
    <Router>
      <Provider store={deposito}>
        <ApolloProvider client={Cliente}>
          <ContenedorReparacion {...args} />
        </ApolloProvider>
      </Provider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});

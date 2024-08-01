/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { Lesionados } from "../../componentes";

export default {
  title: "Componentes/Pasos progreso/Lesionados",
  component: Lesionados,
};

const Modelo = (args) => (
  <div className="appS">
    <Router>
      <ApolloProvider client={Cliente}>
        <Lesionados {...args} />
      </ApolloProvider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});

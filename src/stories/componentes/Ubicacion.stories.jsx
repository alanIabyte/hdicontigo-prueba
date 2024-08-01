/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { Ubicacion } from "../../componentes";

export default {
  title: "Componentes/Pasos progreso/Ubicacion",
  component: Ubicacion,
};

const Modelo = (args) => (
  <div className="appS">
    <Router>
      <ApolloProvider client={Cliente}>
        <Ubicacion {...args} />
      </ApolloProvider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});

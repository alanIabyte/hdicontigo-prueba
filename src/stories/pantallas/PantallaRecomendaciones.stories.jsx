/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaRecomendaciones } from "../../componentes";

export default {
  title: "Pantallas/Pantalla recomendaciones",
  component: PantallaRecomendaciones,
};

const ModeloRecomendaciones = (args) => (
  <div className="app">
    <Router>
      <ApolloProvider client={Cliente}>
        <PantallaRecomendaciones {...args} />
      </ApolloProvider>
    </Router>
  </div>
);

export const Default = ModeloRecomendaciones.bind({});
Default.args = {};

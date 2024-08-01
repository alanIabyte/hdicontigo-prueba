/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaMenuEspera } from "../../componentes";

export default {
  title: "Pantallas/Pantalla menú en espera de ajustador ",
  component: PantallaMenuEspera,
};

const ModeloCuestionarioReporte = (args) => (
  <div className="app">
    <Router>
      <ApolloProvider client={Cliente}>
        <PantallaMenuEspera {...args} />
      </ApolloProvider>
    </Router>
  </div>
);

export const Default = ModeloCuestionarioReporte.bind({});
Default.args = {
  reporte: "XXXXXXXX",
};

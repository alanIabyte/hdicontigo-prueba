/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaSubirFotosDocumentos } from "../../componentes";

export default {
  title: "Pantallas/Pantalla subir fotos y documentos",
  component: PantallaSubirFotosDocumentos,
};

const Modelo = (args) => (
  <div className="app">
    <Router>
      <ApolloProvider client={Cliente}>
        <PantallaSubirFotosDocumentos {...args} />
      </ApolloProvider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});
Default.args = {};

/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaPasosProgreso } from "../../componentes";

export default {
  title: "Pantallas/Pantalla pasos para progreso",
  component: PantallaPasosProgreso,
};

const ModeloPasosProgreso = (args) => (
  <ApolloProvider client={Cliente}>
    <div className="app">
      <PantallaPasosProgreso {...args} />
    </div>
  </ApolloProvider>
);

export const Default = ModeloPasosProgreso.bind({});

/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import { PantallaContrasenaRestablecer } from "../../componentes";

export default {
  title: "Pantallas/Pantalla restablecer contraseña",
  component: PantallaContrasenaRestablecer,
};

const ModeloRestablecerContrasena = (args) => (
  <div className="app">
    <ApolloProvider client={Cliente}>
      <PantallaContrasenaRestablecer {...args} />
    </ApolloProvider>
  </div>
);

export const Default = ModeloRestablecerContrasena.bind({});
Default.args = {};

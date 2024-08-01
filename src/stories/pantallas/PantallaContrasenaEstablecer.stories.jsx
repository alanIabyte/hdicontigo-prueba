/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import { PantallaContrasenaEstablecer } from "../../componentes";

export default {
  title: "Pantallas/Pantalla establecer contraseña",
  component: PantallaContrasenaEstablecer,
};

const ModeloRestablecerContrasena = (args) => (
  <div className="app">
    <ApolloProvider client={Cliente}>
      <PantallaContrasenaEstablecer {...args} />
    </ApolloProvider>
  </div>
);

export const Default = ModeloRestablecerContrasena.bind({});
Default.args = {};

/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import { PantallaContrasenaOlvidada } from "../../componentes";

export default {
  title: "Pantallas/Pantalla contraseña olvidada",
  component: PantallaContrasenaOlvidada,
};

const ModeloBienvenida = (args) => (
  <div className="app">
    <ApolloProvider client={Cliente}>
      <PantallaContrasenaOlvidada {...args} />
    </ApolloProvider>
  </div>
);

export const Default = ModeloBienvenida.bind({});
Default.args = {};

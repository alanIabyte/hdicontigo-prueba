/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { CookiesProvider } from "react-cookie";
import "../../recursos/estilos/estilos.scss";
import { PantallaBienvenida } from "../../componentes";

export default {
  title: "Pantallas/Pantalla bienvenida",
  component: PantallaBienvenida,
};

const ModeloBienvenida = (args) => (
  <CookiesProvider>
    <div className="app">
      <PantallaBienvenida {...args} />
    </div>
  </CookiesProvider>
);

export const Default = ModeloBienvenida.bind({});
Default.args = {};

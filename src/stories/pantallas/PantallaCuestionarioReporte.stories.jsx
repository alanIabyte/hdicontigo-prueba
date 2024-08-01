/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reductor from "../../reductores/index";
import { PantallaCuestionarioReporte } from "../../componentes";

export default {
  title: "Pantallas/Pantalla cuestionario reporte",
  component: PantallaCuestionarioReporte,
};

const deposito = createStore(reductor);

const ModeloCuestionarioReporte = (args) => (
  <div className="app">
    <Provider store={deposito}>
      <PantallaCuestionarioReporte {...args} />
    </Provider>
  </div>
);

export const Default = ModeloCuestionarioReporte.bind({});
Default.args = {
  usuario: "Carlos",
};

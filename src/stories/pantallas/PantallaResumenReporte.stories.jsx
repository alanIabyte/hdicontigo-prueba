/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import reductor from "../../reductores/index";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaResumenReporte } from "../../componentes";

export default {
  title: "Pantallas/Pantalla reporte resumen",
  component: PantallaResumenReporte,
};

const deposito = createStore(reductor);

const ModeloResumenReporte = (args) => (
  <div className="app">
    <Router>
      <Provider store={deposito}>
        <ApolloProvider client={Cliente}>
          <PantallaResumenReporte {...args} />
        </ApolloProvider>
      </Provider>
    </Router>
  </div>
);

export const Default = ModeloResumenReporte.bind({});
Default.args = {
  asistenciaRapida: false,
};

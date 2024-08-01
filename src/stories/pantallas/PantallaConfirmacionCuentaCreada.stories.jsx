/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import reductor from "../../reductores/index";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaConfirmacionCuentaCreada } from "../../componentes";

export default {
  title: "Pantallas/Pantalla confirmación de cuenta creada",
  component: PantallaConfirmacionCuentaCreada,
};

const deposito = createStore(reductor);

const ModeloCuestionarioReporte = (args) => (
  <div className="app">
    <Router>
      <Provider store={deposito}>
        <ApolloProvider client={Cliente}>
          <PantallaConfirmacionCuentaCreada {...args} />
        </ApolloProvider>
      </Provider>
    </Router>
  </div>
);

export const Default = ModeloCuestionarioReporte.bind({});
Default.args = {
  reporte: "123456",
  correoElectronico: "correo@gmail.com",
  nombreUsuario: "Paulina",
  telefono: "555 454 23 23",
};

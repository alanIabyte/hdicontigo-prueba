/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reductor from "../../reductores/index";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { PantallaIngresoDePoliza } from "../../componentes";

export default {
  title: "Pantallas/Pantalla ingreso de poliza",
  component: PantallaIngresoDePoliza,
};

const deposito = createStore(reductor);

const ModeloIngresoDePoliza = (args) => (
  <Provider store={deposito}>
    <ApolloProvider client={Cliente}>
      <div className="app">
        <PantallaIngresoDePoliza {...args} />
      </div>
    </ApolloProvider>
  </Provider>
);

export const Default = ModeloIngresoDePoliza.bind({});
Default.args = {};

/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Cliente from "../../servicios/apollo";
import "../../recursos/estilos/estilos.scss";
import { ReporteSiniestro } from "../../componentes";

export default {
  title: "Componentes/  Pasos progreso/Reporte siniestro",
  component: ReporteSiniestro,
};

const Modelo = (args) => (
  <div className="appS">
    <Router>
      <ApolloProvider client={Cliente}>
        <ReporteSiniestro {...args} />
      </ApolloProvider>
    </Router>
  </div>
);

export const Default = Modelo.bind({});
Default.args = {
  numeroReporte: "12345678",
  horaSiniestro: "8:52 P.M.",
  siniestros: "XXXXXXXXXXX",
  nombreAjustador: "Esteban Martínez",
  horaArribo: "9:21 P.M.",
};

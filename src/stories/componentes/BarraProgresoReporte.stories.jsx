/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { BarraProgresoReporte } from "../../componentes";

export default {
  title: "Componentes/Barra progreso reporte",
  component: BarraProgresoReporte,
};

const Modelo = (args) => (
  <div className="appS">
    <BarraProgresoReporte {...args} />
  </div>
);

export const PrimeraPantalla = Modelo.bind({});
PrimeraPantalla.args = {
  progreso: 1,
  titulo: "Datos del siniestro",
};

export const PantallaFinal = Modelo.bind({});
PantallaFinal.args = {
  progreso: 4,
  titulo: "Confirmación de datos",
};

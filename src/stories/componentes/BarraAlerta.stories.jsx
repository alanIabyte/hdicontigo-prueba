/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { BarraAlerta } from "../../componentes";

export default {
  title: "Componentes/Barra alerta",
  component: BarraAlerta,
};

const Modelo = (args) => (
  <div className="appS">
    <BarraAlerta {...args} />
  </div>
);

export const EstiloRojo = Modelo.bind({});
EstiloRojo.args = {
  etiqueta: "El número de póliza ingresado no existe.",
  mostrarAlerta: true,
  estilo: "error",
  manejarCierre: () => {
    alert("cierra");
  },
};

export const EstiloAlerta = Modelo.bind({});
EstiloAlerta.args = {
  etiqueta: "El número de póliza ingresado no existe.",
  mostrarAlerta: true,
  estilo: "alerta",
  manejarCierre: () => {
    alert("cierra");
  },
};

export const EstiloAzul = Modelo.bind({});
EstiloAzul.args = {
  etiqueta: "Tu pase está listo y ahora puedes descargarlo.",
  mostrarAlerta: true,
  estilo: "notificacion",
  manejarCierre: () => {
    alert("cierra");
  },
};

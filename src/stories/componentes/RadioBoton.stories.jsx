/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import RadioBoton from "../../componentes/radio-boton";

export default {
  title: "Componentes/Radio Botón",
  component: RadioBoton,
};

const Modelo = (args) => (
  <div className="appS">
    <RadioBoton {...args} />
  </div>
);

export const Default = Modelo.bind({});
Default.args = {
  config: [
    {
      value: 0,
      etiqueta: "test 1",
      seleccionado: true,
    },
    {
      value: 1,
      etiqueta: "test 2",
      seleccionado: false,
    },
  ],
};

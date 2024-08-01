/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import ListaDesplegable from "../../componentes/lista-desplegable";

export default {
  title: "Componentes/Lista Desplegable",
  component: ListaDesplegable,
};

const Modelo = (args) => (
  <div className="appS">
    <ListaDesplegable {...args} />
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

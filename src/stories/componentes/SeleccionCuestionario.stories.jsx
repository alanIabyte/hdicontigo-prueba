/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import SeleccionCuestionario from "../../componentes/seleccion-cuestionario";

export default {
  title: "Componentes/Selección cuestionario",
  component: SeleccionCuestionario,
};

const Modelo = (args) => (
  <div className="appS">
    <SeleccionCuestionario {...args} />
  </div>
);

export const Default = Modelo.bind({});
Default.args = {
  pregunta: "¿Esto es una pregunta de ejemplo?",
  cambiarEstado: () => {},
  respuesta: true,
};

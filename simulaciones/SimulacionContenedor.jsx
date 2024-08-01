import React from "react";
import { v4 } from "uuid";

const SimulacionContenedor = () => (
  <div key={v4()}>Soy un contenedor simulado</div>
);

export default SimulacionContenedor;

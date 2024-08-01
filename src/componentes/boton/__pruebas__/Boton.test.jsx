import React from "react";
import renderer from "react-test-renderer";
import Boton from "../boton-componente/Boton";
import SimulacionBotonDefault from "../__simulaciones__/Boton.simulacion";

describe("#Boton", () => {
  it("se despliega correctamente", () => {
    const { etiqueta, tema } = SimulacionBotonDefault;
    const arbol = renderer
      .create(<Boton etiqueta={etiqueta} tema={tema} />)
      .toJSON();
    expect(arbol).toMatchSnapshot();
  });
});

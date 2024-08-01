import React from "react";
import renderer from "react-test-renderer";
import FotoContenedor from "../foto-contenedor-componente/FotoContenedor";
import FotoContenedorSimulacion from "../__simulaciones__/FotoContenedor.simulacion";

describe("FotoContenedor", () => {
  it("se despliega correctamente", () => {
    const { reporte } = FotoContenedorSimulacion;
    const tree = renderer.create(<FotoContenedor reporte={reporte} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

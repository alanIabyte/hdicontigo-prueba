import React from "react";
import renderer from "react-test-renderer";
import FechaDeIndemnizacion from "../fecha-de-indemnizacion-componente/FechaDeIndemnizacion";

describe("FechaDeIndemnizacion", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<FechaDeIndemnizacion />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

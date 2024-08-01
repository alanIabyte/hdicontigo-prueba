import React from "react";
import renderer from "react-test-renderer";
import Ubicacion from "../ubicacion-componente/Ubicacion";

describe("Ubicacion", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<Ubicacion />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

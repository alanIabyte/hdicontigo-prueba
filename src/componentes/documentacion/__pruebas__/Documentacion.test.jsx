import React from "react";
import renderer from "react-test-renderer";
import Documentacion from "../documentacion-componente/Documentacion";

describe("Documentacion", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<Documentacion />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

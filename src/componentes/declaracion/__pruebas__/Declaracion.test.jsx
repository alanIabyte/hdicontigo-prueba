import React from "react";
import renderer from "react-test-renderer";
import Declaracion from "../declaracion-componente/Declaracion";

describe("#Declaracion", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<Declaracion />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

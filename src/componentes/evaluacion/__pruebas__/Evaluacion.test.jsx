import React from "react";
import renderer from "react-test-renderer";
import Evaluacion from "../evaluacion-componente/Evaluacion";

describe("#Evaluacion", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<Evaluacion />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import IngresoTaller from "../ingreso-taller-componente/IngresoTaller";

describe("IngresoTaller", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<IngresoTaller />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

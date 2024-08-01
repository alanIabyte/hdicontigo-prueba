/* eslint-disable max-len */
import React from "react";
import renderer from "react-test-renderer";
import PantallaCamara from "../pantalla-camara-componente/PantallaCamara";

describe("PantallaCamara", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<PantallaCamara />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

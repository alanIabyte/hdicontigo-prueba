/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import renderer from "react-test-renderer";
import RadioBoton from "../radio-boton-componente/RadioBoton";
import config from "../__simulaciones__/RadioBoton.simulacion";

describe("Radio Boton", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<RadioBoton config={config} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

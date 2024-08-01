/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import renderer from "react-test-renderer";
import ListaDesplegable from "../lista-desplegable-componente/ListaDesplegable";
import config from "../__simulaciones__/ListaDesplegable.simulacion";

describe("Lista Desplegable", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<ListaDesplegable config={config} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

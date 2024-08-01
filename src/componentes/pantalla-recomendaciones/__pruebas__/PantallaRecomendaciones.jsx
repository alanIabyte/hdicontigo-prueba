/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import PantallaRecomendaciones from "../pantalla-recomendaciones-componente/PantallaRecomendaciones";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({}),
  useHistory: jest.fn().mockReturnValue({}),
}));

describe("PantallaRecomendaciones", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<PantallaRecomendaciones />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

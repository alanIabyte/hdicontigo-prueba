/* eslint-disable max-len */
import React from "react";
import renderer from "react-test-renderer";
import PantallaEditarInformacionContacto from "../pantalla-editar-informacion-contacto/PantallaEditarInformacionContacto";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({}),
  useHistory: jest.fn().mockReturnValue({}),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockReturnValue({}),
  useDispatch: jest.fn().mockReturnValue({}),
}));

describe("PantallaEditarInformacionContacto", () => {
  it("se despliega correctamente", () => {
    const tree = renderer
      .create(<PantallaEditarInformacionContacto />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

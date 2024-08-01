import React from "react";
import renderer from "react-test-renderer";
import PantallaVerificarTelefono from "../pantalla-verificar-telefono-componente/PantallaVerificarTelefono";

jest.mock("@apollo/react-hooks", () => ({
  useMutation: jest.fn().mockReturnValue([{}, { loading: false }]),
}));

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({}),
  useHistory: () => ({
    push: jest.fn().mockReturnValue({}),
  }),
}));

describe("#PantallaVerificarTelefono", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<PantallaVerificarTelefono />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

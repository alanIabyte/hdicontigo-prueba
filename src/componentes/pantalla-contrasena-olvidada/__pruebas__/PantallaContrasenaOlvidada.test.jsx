import React from "react";
import renderer from "react-test-renderer";
import PantallaContrasenaOlvidada from "../pantalla-contrasena-olvidada-componente/PantallaContrasenaOlvidada";

jest.mock("@apollo/react-hooks", () => ({
  useMutation: jest.fn().mockReturnValue([{}, { loading: false }]),
}));

describe("#PantallaContrasenaOlvidada", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<PantallaContrasenaOlvidada />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

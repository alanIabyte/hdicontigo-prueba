import React from "react";
import renderer from "react-test-renderer";
import PolizaSiniestrada from "../poliza-siniestrada-componente/PolizaSiniestrada";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockReturnValue({}),
}));

describe("#PolizaSiniestrada", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<PolizaSiniestrada />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

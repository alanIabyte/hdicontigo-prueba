import React from "react";
import renderer from "react-test-renderer";
import BarraAlerta from "../barra-alerta-componente/BarraAlerta";

describe("#BarraAlerta", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<BarraAlerta />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

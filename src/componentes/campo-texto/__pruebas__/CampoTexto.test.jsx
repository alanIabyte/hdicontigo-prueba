/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import renderer from "react-test-renderer";
import CampoTexto from "../campo-texto-componente/CampoTexto";
import {
  CampoTextoRegular,
  CampoTextoCalendario,
  CampoTextoSerie,
  CampoTextoArea,
} from "../__simulaciones__/CampoTexto.simulacion";

describe("CampoTexto", () => {
  it("se despliega correctamente campo de texto regular", () => {
    const tree = renderer
      .create(<CampoTexto {...CampoTextoRegular} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("se despliega correctamente campo de texto calendario", () => {
    jest.spyOn(Date, "now").mockReturnValueOnce(new Date(2021, 0, 1).getTime());
    const tree = renderer
      .create(<CampoTexto {...CampoTextoCalendario} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("se despliega correctamente campo de texto serie", () => {
    const tree = renderer.create(<CampoTexto {...CampoTextoSerie} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("se despliega correctamente campo de texto de area", () => {
    const tree = renderer.create(<CampoTexto {...CampoTextoArea} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

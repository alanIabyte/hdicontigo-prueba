/* eslint-disable max-len */
import React from "react";
import renderer from "react-test-renderer";
import PantallaIngresoDePolizaOcr from "../pantalla-ingreso-de-poliza-ocr-componente/PantallaIngresoDePolizaOcr";

describe("PantallaIngresoDePolizaOcr", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<PantallaIngresoDePolizaOcr />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

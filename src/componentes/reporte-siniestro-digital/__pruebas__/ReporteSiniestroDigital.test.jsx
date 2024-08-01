import React from "react";
import renderer from "react-test-renderer";
import ReporteSiniestroDigital from "../reporte-siniestro-componente/ReporteSiniestroDigital";

describe("#ReporteSiniestroDigital", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<ReporteSiniestroDigital />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import ReporteSiniestro from "../reporte-siniestro-componente/ReporteSiniestro";

describe("#ReporteSiniestro", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<ReporteSiniestro />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

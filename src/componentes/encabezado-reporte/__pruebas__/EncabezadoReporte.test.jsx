import React from "react";
import renderer from "react-test-renderer";
import EncabezadoReporte from "../encabezado-reporte-componente/EncabezadoReporte";
import EncabezadoReporteSimulacion from "../__simulaciones__/EncabezadoReporte.simulacion";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({}),
  useHistory: jest.fn().mockReturnValue({}),
}));

jest.mock("@apollo/react-hooks", () => ({
  useSubscription: jest.fn().mockReturnValue({}),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockReturnValue({}),
  useDispatch: jest.fn().mockReturnValue({}),
}));

describe("#EncabezadoReporte", () => {
  it("se despliega correctamente", () => {
    const { reporte } = EncabezadoReporteSimulacion;
    const tree = renderer
      .create(<EncabezadoReporte reporte={reporte} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  jest.mock("@apollo/react-hooks", () => ({
    useSubscription: jest.fn().mockReturnValue({
      data: "Something",
    }),
  }));

  it("se despliega con ajustador asignado", () => {
    const { reporte } = EncabezadoReporteSimulacion;
    const tree = renderer
      .create(<EncabezadoReporte reporte={reporte} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

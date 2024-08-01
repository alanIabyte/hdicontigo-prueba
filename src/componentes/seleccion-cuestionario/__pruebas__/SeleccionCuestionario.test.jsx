/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import renderer from "react-test-renderer";
import SeleccionCuestionario from "../seleccion-cuestionario-componente/SeleccionCuestionario";
import {
  SeleccionCuestionarioVacio,
  SeleccionCuestionarioConRespuesta,
} from "../__simulaciones__/SeleccionCuestionario.simulacion";

describe("#Seleccion Cuestionario", () => {
  it("se despliega correctamente sin respuesta", () => {
    const tree = renderer
      .create(<SeleccionCuestionario {...SeleccionCuestionarioVacio} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("se despliega correctamente con respuesta", () => {
    const tree = renderer
      .create(<SeleccionCuestionario {...SeleccionCuestionarioConRespuesta} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

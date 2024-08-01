import React from "react";
import renderer from "react-test-renderer";
import ContenedorOpcion from "../contenedor-opcion-componente/ContenedorOpcion";
import ContenedorOpcionSimulacion from "../__simulaciones__/ContenedorOpcion.simulacion";

describe("ContenedorOpcion", () => {
  it("se despliega correctamente", () => {
    const { titulo, subtitulo, url, icono } = ContenedorOpcionSimulacion;
    const tree = renderer
      .create(
        <ContenedorOpcion
          titulo={titulo}
          subtitulo={subtitulo}
          url={url}
          icono={icono}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

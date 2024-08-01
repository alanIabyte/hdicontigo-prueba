import React from "react";
import renderer from "react-test-renderer";
import ModalTexto from "../modal-texto-componente/ModalTexto";

describe("#ModalTexto", () => {
  it("se despliega correctamente", () => {
    const tree = renderer.create(<ModalTexto />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

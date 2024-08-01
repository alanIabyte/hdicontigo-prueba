import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reductor from "../../../reductores/index";
import EncabezadoPolizasSiniestradas from "../encabezado-polizas-siniestradas-componente/EncabezadoPolizasSiniestradas";

const deposito = createStore(reductor);

jest.mock("react-cookie", () => ({
  useCookies: jest.fn().mockReturnValue([{}]),
}));

jest.mock("@apollo/react-hooks", () => ({
  useMutation: jest
    .fn()
    .mockReturnValue([{}, { loading: false, called: false }]),
  useQuery: jest.fn().mockReturnValue({}),
  useLazyQuery: jest.fn().mockReturnValue([{}, {}]),
}));

describe("#EncabezadoPolizasSiniestradas", () => {
  it("se despliega correctamente", () => {
    const tree = renderer
      .create(
        <Provider store={deposito}>
          <EncabezadoPolizasSiniestradas />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

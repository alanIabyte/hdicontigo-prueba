import ApiProcesador from "../Api";
import ApiSimulacion from "./Api.simulacion";

describe("prueba constructor", () => {
  it("asigna parametros correctamente", () => {
    const apiProcesador = new ApiProcesador(ApiSimulacion);
    expect(apiProcesador).toBeDefined();
    expect(apiProcesador.respuesta).toBeDefined();
  });
});

describe("prueba funcionalidad", () => {
  let apiProcesador;
  beforeEach(() => {
    apiProcesador = new ApiProcesador(ApiSimulacion);
  });

  it("regresa el primer elemento", () => {
    const primerValor = apiProcesador.regresaPrimerValor();
    expect(primerValor).toEqual(ApiSimulacion[0]);
  });
});

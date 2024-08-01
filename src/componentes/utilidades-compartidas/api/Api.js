/* eslint-disable class-methods-use-this */

const errores = {
  respuestVacia: "La respuesta está vacía",
};

class ApiProcesador {
  constructor(respuesta) {
    this.respuesta = respuesta;
  }

  validarRespuesta(respuesta) {
    if (!respuesta) {
      throw new TypeError(errores.respuestVacia);
    }
  }

  regresaPrimerValor() {
    this.validarRespuesta(this.respuesta);
    return this.respuesta[0];
  }
}

export default ApiProcesador;

/* eslint-disable */

const construirRespuesta = (foco, error, valida) => {
  return {
    foco,
    error,
    valida,
  };
};

const tipoTarjeta = (emisor, valida) => {
  return {
    emisor,
    valida,
  };
};

const respuestaExpiracion = (respuestaMes, respuestAnio) => {
  return {
    mes: respuestaMes,
    anio: respuestAnio,
  };
};

const validarPoliza = (poliza, errores, tipoPoliza) => {
  return new Promise((resolve, reject) => {
    if (!poliza) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (
      !/^[0-9]{1,5}-*[0-9]{1,10}-*[0-9]{1,5}$/.test(poliza) ||
      poliza.length < 3
    ) {
      resolve(construirRespuesta("error", errores.formatoIncorrecto, false));
    } else if (tipoPoliza === "AUTR") {
      if (poliza.split("-").length === 3) {
        resolve(construirRespuesta("", "", true));
      } else {
        resolve(construirRespuesta("error", errores.formatoIncorrecto, false));
      }
    } else if (tipoPoliza === "DAN") {
      if (poliza.split("-").length === 2) {
        resolve(construirRespuesta("", "", true));
      } else {
        resolve(construirRespuesta("error", errores.formatoIncorrecto, false));
      }
    } else if (tipoPoliza === "") {
      reject(construirRespuesta("error", errores.formatoIncorrecto, false));
    }
    resolve(construirRespuesta("error", errores.formatoIncorrecto, true));
  });
};

const validarContrasenia = (contrasenia, errores) => {
  return new Promise((resolve, reject) => {
    if (!contrasenia) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (contrasenia.length < 8) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/g.test(
        contrasenia
      )
    ) {
      resolve(construirRespuesta("error", errores.contrasenaReglas, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.contrasenaReglas, false));
  });
};

const validarSerie = (serie, errores) => {
  return new Promise((resolve, reject) => {
    if (!serie) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (serie.length < 4) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarTelefono = (telefono, errores) => {
  return new Promise((resolve, reject) => {
    if (!telefono) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (telefono.length < 10) {
      resolve(construirRespuesta("error", errores.telefonoIncompleto, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarInciso = (inciso, errores) => {
  return new Promise((resolve, reject) => {
    if (!inciso) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (inciso.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarTarjetaHabiente = (tarjetaHabiente, errores) => {
  return new Promise((resolve, reject) => {
    if (!tarjetaHabiente) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (tarjetaHabiente.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (tarjetaHabiente.split(" ").length < 2) {
      resolve(construirRespuesta("error", errores.nombreIncompleto, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarNumeroTarjeta = (valor, emisor, errores) => {
  return new Promise((resolve, reject) => {
    if (!valor) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (valor.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    }

    if (emisor === "") {
      // EMISOR NO IDENTIFICADO
      if (valor.length < 13) {
        resolve(
          construirRespuesta("error", errores.numeroTarjetaIncompleto, false)
        );
      } else {
        resolve(construirRespuesta("", "", true));
      }
    }

    if (emisor === "VISA") {
      // VISA DEBE TEBER 13 O 16 DIGITOS
      if (valor.length === 13 || valor.length === 16) {
        resolve(construirRespuesta("", "", true));
      } else {
        resolve(construirRespuesta("error", errores.formatoIncorrecto, false));
      }
    }

    if (emisor === "MASTERD CARD") {
      // MASTERCARD DEBE TEBER 16 DIGITOS
      if (valor.length === 16) {
        resolve(construirRespuesta("", "", true));
      } else {
        resolve(construirRespuesta("error", errores.formatoIncorrecto, false));
      }
    }

    if (emisor === "AMERICAN EXPRESS") {
      // AMEX DEBE TEBER 15 DIGITOS
      if (valor.length === 15) {
        resolve(construirRespuesta("", "", true));
      } else {
        resolve(construirRespuesta("error", errores.formatoIncorrecto, false));
      }
    } else {
      if (!valor) {
        resolve(construirRespuesta("error", errores.campoRequerido, false));
      } else if (valor.length === 0) {
        resolve(construirRespuesta("error", errores.campoRequerido, false));
      } else {
        resolve(construirRespuesta("", "", true));
      }
    }

    if(valor.test(/^[0-9]*$/)){
      resolve(construirRespuesta("", "", true));
    } else {
      resolve(construirRespuesta("error", errores.soloNumeros, false));
    }

    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const identificarTarjeta = (valor, errores) => {
  return new Promise((resolve, reject) => {
    if (valor.startsWith("4")) {
      // 13 o 16
      resolve(tipoTarjeta("VISA", true));
    }
    if (
      valor.match(
        /^(?:5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]|27[01][0-9]|2720)/
      )
    ) {
      //16
      resolve(tipoTarjeta("MASTERCARD", true));
    }
    if (valor.startsWith("34") || valor.startsWith("37")) {
      //15
      resolve(tipoTarjeta("AMEX", true));
    }
    resolve(tipoTarjeta("", false));
  });
};

const validarConfirmarNumeroTarjeta = (numeroTarjeta, confirmar, errores) => {
  return new Promise((resolve, reject) => {
    if (!confirmar) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (confirmar.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (confirmar !== numeroTarjeta) {
      resolve(
        construirRespuesta("error", errores.numeroTarjetaNoCoincide, false)
      );
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarTipoTarjeta = (emisor, errores) => {
  return new Promise((resolve, reject) => {
    if (!emisor) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (emisor.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (emisor === "") {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarBanco = (banco, errores) => {
  return new Promise((resolve, reject) => {
    if (!banco) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (banco.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (banco === "") {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarExpiracionTarjeta = (mes, anio, errores) => {
  return new Promise((resolve, reject) => {
    let respuestaMes = {
      foco: "error",
      error: errores.campoRequerido,
      valida: false,
    };
    let respuestaAnio = {
      foco: "error",
      error: errores.campoRequerido,
      valida: false,
    };
    let currentYear = parseInt(
      new Date().getFullYear().toString().substr(2, 2)
    );
    let currentMonth = parseInt(new Date().getMonth() + 1);
    if (!mes || mes.length === 0) {
      respuestaMes = {
        foco: "error",
        error: errores.campoRequerido,
        valida: false,
      };
    } else if (mes.length < 2) {
      respuestaMes = {
        foco: "error",
        error: errores.formatoIncorrecto,
        valida: false,
      };
    } else {
      respuestaMes = {
        foco: "",
        error: "",
        valida: true,
      };
    }
    if (!anio || anio.length === 0) {
      respuestaAnio = {
        foco: "error",
        error: errores.campoRequerido,
        valida: false,
      };
    } else if (anio.length < 2) {
      respuestaAnio = {
        foco: "error",
        error: errores.formatoIncorrecto,
        valida: false,
      };
    } else if (parseInt(anio) < currentYear) {
      respuestaAnio = {
        foco: "error",
        error: errores.seleccionarAnioActual,
        valida: false,
      };
    } else if (parseInt(anio) === currentYear && parseInt(mes) < currentMonth) {
      respuestaAnio = {
        foco: "error",
        error: errores.seleccionarAnioActual,
        valida: false,
      };
      respuestaMes = {
        foco: "error",
        error: errores.seleccionarAnioActual,
        valida: false,
      };
    } else {
      respuestaAnio = {
        foco: "",
        error: "",
        valida: true,
      };
    }
    resolve(respuestaExpiracion(respuestaMes, respuestaAnio));
  });
};

const validarTipoCuenta = (cuenta, errores) => {
  return new Promise((resolve, reject) => {
    if (!cuenta) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (cuenta.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (cuenta === "") {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarCuentaCLABE = (cuenta, errores) => {
  return new Promise((resolve, reject) => {
    if (!cuenta) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (cuenta.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (cuenta === "") {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (cuenta.length < 18) {
      resolve(construirRespuesta("error", errores.CLABEIncompleta, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const validarConfirmarCuentaCLABE = (CLABE, confirmar, errores) => {
  return new Promise((resolve, reject) => {
    if (!confirmar) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (confirmar.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (confirmar !== CLABE) {
      resolve(construirRespuesta("error", errores.CLABENoCoincide, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

export {
  validarTarjetaHabiente,
  validarNumeroTarjeta,
  validarConfirmarNumeroTarjeta,
  identificarTarjeta,
  validarTipoTarjeta,
  validarBanco,
  validarExpiracionTarjeta,
  validarTipoCuenta,
  validarCuentaCLABE,
  validarConfirmarCuentaCLABE,
};

/* eslint-disable */

const errores = {
  errorEnCarga: "Hubo un error, inténtalo de nuevo",
  verificarCampos:
    "Favor de verificar tus datos y que estás seleccionando el tipo de póliza correcta.",
  campoRequerido: "Campo requerido para poder continuar.",
  nombreIncompleto: "Por favor introduce tu nombre completo",
  numeroTarjetaIncompleto: "Por favor introduce el número completo",
  formatoIncorrecto: "Por favor revisa que el formato sea correcto.",
  numeroTarjetaNoCoincide: "Los números de tarjeta no coinciden",
  seleccionarAnioActual: "Introduce una tarjeta que no haya expirado",
  CLABEIncompleta: "La cuenta CLABE debe contener 18 dígitos",
  CLABENoCoincide: "Los números de CLABE no coinciden",
};


const construirRespuesta = (foco, error, valida) => {
  return {
    foco,
    error,
    valida,
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
        // console.log("regresando true")
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
    } else if (tipoPoliza === "GMM") {
      console.log(poliza);
      if (poliza) {
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
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,}$/g.test(
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

const validateHour = (hour, errores) => {
  const regex = /(?:[01]\d|2[0-3]):(?:[0-5]\d)/;
  return new Promise((resolve, reject) => {
    if (!regex.test(hour)) {
      resolve(construirRespuesta("error", errores.hora, false));
    } else if (hour.length < 5) {
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

const validarRFC = (rfc) => {
  return new Promise((resolve, reject) => {
    if (!rfc) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (rfc.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (rfc.length < 9) { // * Cambio
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const hasPendingReceipts = (list) => {
  return list?.some((receipt) => receipt.checkPagar == true);
};

function valDate(date) {
  let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

  // Matching the date through regular expression      
  if (date.match(dateformat)) {
      let operator = date.split('/');

      // Extract the string into month, date and year      
      let datepart = [];
      if (operator.length > 1) {
          datepart = date.split('/');
      }
      let day = parseInt(datepart[0]);
      let month = parseInt(datepart[1]);
      let year = parseInt(datepart[2]);

      // Create a list of days of a month      
      let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month == 1 || month > 2) {
          if (day > ListofDays[month - 1]) {
              //to check if the date is out of range
              console.log("Invalid date")     
              return false;
          }
      } else if (month == 2) {
          let leapYear = false;
          if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
          if ((leapYear == false) && (day >= 29)) {
              console.log("Invalid date")
              return false;
          }
          else
              if ((leapYear == true) && (day > 29)) {
                  console.log('Invalid date format!');
                  return false;
              }
      }
  } else {
      console.log("Invalid date format!");
      return false;
  }
  return "Valid date";
}


export {
  validarContrasenia,
  validarPoliza,
  validarSerie,
  validarTelefono,
  validarRFC,
  validarInciso,
  hasPendingReceipts,
  valDate,
  validateHour,
};

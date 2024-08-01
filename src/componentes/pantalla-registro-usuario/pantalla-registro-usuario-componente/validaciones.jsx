/* eslint-disable */

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
      if(poliza.length > 2) {
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

const validarRFC = (rfc, errores) => {
  return new Promise((resolve, reject) => {
    if (!rfc) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (rfc.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (rfc.length < 12) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

export {
  validarContrasenia,
  validarPoliza,
  validarSerie,
  validarTelefono,
  validarRFC,
  validarInciso,
};

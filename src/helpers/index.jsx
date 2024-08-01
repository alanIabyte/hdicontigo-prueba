import {
  validarPoliza,
  validarSerie,
  validarTelefono,
  validarRFC,
  validarInciso,
  validarContrasenia,
  valDate,
} from "./validaciones/validaciones";
import {
  convertirYDescargar,
  iniciarDescargaPDF,
} from "./obtenerPDF/convertirYDescargar";
import darFormatoFecha from "./formatearFecha/formatearFecha";
import getBase64 from "./obtenerBase64/obtenerBase64";
import asignarCerosPoliza from "./asignarCeros/asignarCerosPoliza";
import asignarCerosAgencia from "./asignarCeros/asignarCerosAgencia";

export {
  validarContrasenia,
  validarPoliza,
  validarSerie,
  validarTelefono,
  validarRFC,
  validarInciso,
  convertirYDescargar,
  darFormatoFecha,
  iniciarDescargaPDF,
  getBase64,
  asignarCerosPoliza,
  asignarCerosAgencia,
  valDate,
};

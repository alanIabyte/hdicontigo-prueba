const diccionario = {
  titulo: "Otras formas de pago",
  descripcionPantalla: "Tienes más opciones para hacer tu pago",
  descargarFormato: "Descargar formato de pago",
  mensajeDeErrorDefault:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  formas: {
    bancos: "Bancos / Cajeros automáticos",
    tiendas: "Tiendas de autoservicio",
  },
};

const configAlertaError = {
  textoEncabezado: "Ocurrió un error",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpoJsx:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  etiquetaBoton: "Aceptar",
};

export { configAlertaError, diccionario };

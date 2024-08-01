const opcionesMes = [
  { nombre: "01" },
  { nombre: "02" },
  { nombre: "03" },
  { nombre: "04" },
  { nombre: "05" },
  { nombre: "06" },
  { nombre: "07" },
  { nombre: "08" },
  { nombre: "09" },
  { nombre: "10" },
  { nombre: "11" },
  { nombre: "12" },
];

const opcionesTipoCuenta = [
  { nombre: "Cuenta de cheques" },
  { nombre: "Cuenta maestra" },
];

const configAlertaErrorNombreUsuario = {
  textoEncabezado: "Ocurrió un error con tu nombre de usuario",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpoJsx: "Por favor, inténtalo más tarde.",
  etiquetaBoton: "Aceptar",
};

const configAlertaErrorCatalogo = {
  textoEncabezado: "Ocurrió un error al obtener el listado de opciones",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpoJsx: "Por favor, inténtalo de nuevo más tarde.",
  etiquetaBoton: "Aceptar",
};

const configAlertaDomiciliado = {
  textoEncabezado: "Pago programado",
  tipoIcono: "pagoProgramado",
  colorAlerta: "azul",
  textoCuerpoJsx:
    "¡Listo!, tu siguiente cargo se realizará de manera automática.",
  etiquetaBoton: "Aceptar",
};

export {
  opcionesMes,
  opcionesTipoCuenta,
  configAlertaErrorNombreUsuario,
  configAlertaDomiciliado,
  configAlertaErrorCatalogo,
};

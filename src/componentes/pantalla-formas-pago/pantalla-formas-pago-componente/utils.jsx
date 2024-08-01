const diccionario = {
  titulo: "Elige tu forma de pago",
  descripcionPantalla: "Elige la forma de pago que desees",
  alerta: {
    titulo: "No fue posible realizar el pago",
    cuerpo: "Tienes recibos pendientes, consulta cuales son",
    etiquetaBoton: "Aquí",
  },
  alertaLigaPago: {
    titulo: "Ha ocurrido un error",
    etiquetaBoton: "Aceptar",
  },
  formas: {
    telefono: "Por teléfono",
    telefonoDesc: "HDI *434",
    tarjeta: "Por tarjeta",
    tarjetaDesc: "de crédito o débito",
    otra: "Otras formas",
    otraDesc: "de pago",
  },
};

const configAlertaRecibos = {
  textoEncabezado: diccionario.alerta.titulo,
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpo: diccionario.alerta.cuerpo,
  etiquetaBoton: diccionario.alerta.etiquetaBoton,
};

const configAlertaLigasPago = {
  textoEncabezado: diccionario.alertaLigaPago.titulo,
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  etiquetaBoton: diccionario.alertaLigaPago.etiquetaBoton,
};

export { diccionario, configAlertaLigasPago, configAlertaRecibos };

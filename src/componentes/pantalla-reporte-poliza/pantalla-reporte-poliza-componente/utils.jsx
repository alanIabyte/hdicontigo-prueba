const configAlertaSinIntentos = {
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoEncabezado: "No es posible utiizar grúa",
  textoCuerpoJsx:
    "Tus solicitudes de grúa 2/2 están agotadas, para más información comunícate a HDI *434",
  etiquetaBoton: "Llamar a HDI *434",
};

const configGpsService = {
  tipoIcono: "ubicacion",
  colorAlerta: "amarillo",
  textoEncabezado: "Cuentas con servicio de GPS",
  textoCuerpoJsx:
    "Tu póliza cuenta con servicio de localización GPS para tu vehículo, selecciona continuar para activar tu servicio con el proveedor. Regresa para seguir con la generación de tu reporte.",
  etiquetaBoton: "Continuar",
};

const diccionario = {
  titulos: {
    busqueda: "Ayúdanos a buscar tu póliza",
    robo: "Reporte de robo",
    grua: "Reporte de grúa",
    principal: "Identifica la póliza de tu vehículo",
    principalRobo: "Ayudanos a identificar tu póliza de seguro",
    sub: "Estos datos nos ayudarán a identificarte y crear tu reporte con éxito.",
    subRobo: "Esto nos ayudara a reportar tu siniestro correctamente.",
    intruccionesSerie: "¿Donde encuentro mi número de serie?",
    instruccionesPoliza: "¿Donde encuentro mi número de póliza?",
  },
  errores: {
    campoRequerido: "Campo Requerido para continuar",
    hora: "Por favor ingresa una hora valida en formato de 24hrs.",
  },
};

export { configAlertaSinIntentos, configGpsService, diccionario };

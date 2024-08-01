const diccionario = {
  mensajeBienvenida: "Te damos la bienvenida",
  mensajeDeErrorDefault: "Ocurrió un error",
  mensajeAlertaContrasenaCambiada:
    "Tu contraseña ha sido actualizada con éxito.",
  mensajeIngreso: "Ingresar",
  terminos: "Términos y condiciones",
  aviso: "Aviso de privacidad",
  etiquetaReportar: "Reportar un siniestro",
  etiquetaIngresar: "Ingresar",
  etiquetaEntrar: "Entrar",
  etiquetaUsuario: "Teléfono",
  etiquetaContrasena: "Contraseña",
  linkOlvideContrasena: "Olvidé mi contraseña",
  errorUsuario:
    "Teléfono debe tener 10 dígitos o formato de correo electrónico erróneo.",
  alertaLogin: {
    titulo: "Ocurrió un problema",
    // eslint-disable-next-line max-len
    cuerpo:
      "Para seguir usando la aplicación debes iniciar sesión. También puedes reportar un siniestro sin iniciar sesión.",
    boton: "Continuar",
  },
  mensajeRegistro: "Regístrate aquí",
  errores: {
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
  },
};

const configAlertaGeolocation = {
  textoEncabezado: "Geolocalizacion",
  tipoIcono: "ubicacion",
  colorAlerta: "azul",
  textoCuerpo:
    "Para mantener la seguridad de tu cuenta, por favor permite la geolocalización mientras usas la app.",
  etiquetaBoton: "Permitir",
  etiquetaBoton2: "No permitir",
  temaBoton2: "simple",
};
const configAlertaErrorGeolocation = {
  textoEncabezado: "Geolocalización",
  tipoIcono: "ubicacion",
  colorAlerta: "rojo",
  textoCuerpo: "Es necesario permitir la geolocalización para usar la app.",
  etiquetaBoton: "Aceptar",
};

export { configAlertaGeolocation, configAlertaErrorGeolocation, diccionario };

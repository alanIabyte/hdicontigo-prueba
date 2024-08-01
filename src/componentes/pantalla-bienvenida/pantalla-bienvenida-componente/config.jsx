const diccionario = {
  mensajeBienvenida: "Te damos la bienvenida a",
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
  errorUsuario: "Teléfono debe tener 10 dígitos",
  alertaLogin: {
    titulo: "Ocurrió un problema",
    // eslint-disable-next-line max-len
    cuerpo:
      "Para seguir usando la aplicación debes iniciar sesión. También puedes reportar un siniestro sin iniciar sesión.",
    boton: "Continuar",
  },
  mensajeRegistro: "Regístrate aquí",
  mensajeUsuarioContraseniaIncorrectos: "Usuario o Contraseña incorrectos",
  mensajeHuella: "Regístra Huella",
  etiquetaEntrarHuella: "Entrar",
  etiquetaEntrarHuella2: "Usar Biometricos",
  mensajeBienvenido: "¡Bienvenido!",
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

const configAlertaNuevosServicios = {
  textoEncabezado: "¡Bienvenido!",
  tipoIcono: "contigo",
  colorAlerta: "azul",
  textoCuerpo:
    "Te informamos que los servicios de HDI TU COMPAÑÍA estarán disponibles en HDI Contigo.",
  textoCuerpoJsx: "Navega en ella para conocer más.",
  etiquetaBoton: "Aceptar",
};

const configAlertaBometricosNoRegistrados = {
  textoEncabezado: "Biométricos aun no registrados",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "rojo",
  textoCuerpo:
    "En este momento se registrarán tus datos biometricos. Para continuar con este proceso es necesario verificar tu contraseña, ¿Estás de acuerdo de continuar con este proceso?",
  etiquetaBoton: "Continuar",
  etiquetaBoton2: "En otro momento",
};

const configLocalStorage = {
  usuario: "usuario",
  contrasenia: "contrasenia",
  codigoId: "codigoId",
};

export {
  configAlertaGeolocation,
  configAlertaErrorGeolocation,
  diccionario,
  configAlertaNuevosServicios,
  configAlertaBometricosNoRegistrados,
  configLocalStorage,
};

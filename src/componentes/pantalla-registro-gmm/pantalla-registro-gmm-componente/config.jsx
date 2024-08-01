// Config for screen
// Por si acaso
const diccionario = {
  encabezado: "Registro",
  titulo: "Ayúdanos a registrarte correctamente",
  mensajePequeno: "Estos datos nos ayudarán a registrar tu póliza de seguro",
  etiquetaPoliza: "Número de póliza (incluyendo guiones)",
  etiquetaPolizaGMM: "Número de póliza",
  etiquetaSerie: "Últimos 4 dígitos del número de serie de tu vehículo:",
  etiquetaRFC: "RFC",
  etiquetaTelefono: "Teléfono",
  etiquetaContrasenia: "Contraseña",
  etiquetaConfirmarContrasenia: "Confirmar contraseña",
  etiquetaInciso: "Inciso",
  marcadorPoliza: "Marcador opcional",
  etiquetaBotonCompletarRegistro: "Completar registro",
  etiquetaValidar: "Verificar campos",
  linkInstruccionesPoliza: "¿Dónde encuentro el número de póliza?",
  intruccionesPoliza:
    "Localiza tu número de póliza tal como se ve en el ejemplo",
  linkInstruccionesPolizaDAN: "¿Dónde encuentro el número de póliza e inciso?",
  linkInstruccionesPolizaGMM: "¿Dónde encuentro el número de póliza e inciso?",
  linkInstruccionesSerie: "¿Dónde está mi número de serie?",
  intruccionesSerie: "Localiza tu número de serie tal como se ve en el ejemplo",
  linkInstruccionesRFC: "¿Dónde encuentro mi RFC?",
  mensajeDeErrorDefault:
    "OTu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  validarCampos: "Validar campos",
  alerta: {
    titulo: "Póliza no vigente",
    cuerpo:
      // eslint-disable-next-line max-len
      "La póliza que intentas reportar presenta problemas de vigencia.<br /><br />No te preocupes, comunícate con nosotros para continuar tu atención.",
    etiquetaBoton: "Llamar a HDI *434",
  },
  errores: {
    verificarCampos:
      "Favor de verificar tus datos y que estás seleccionando el tipo de póliza correcta.",
    errorRegistro: "Ocurrio un problema al generar el usuario.",
    errorGenerico: "Hubo un error, inténtalo de nuevo más tarde",
    campoRequerido: "Campo requerido para poder continuar.",
    formatoIncorrecto: "Por favor revisa que el formato sea correcto.",
    contrasenaNoCoincide: "Las contraseñas no coinciden.",
    contrasenaNumCaracteres:
      "La contraseña debe contener al menos 8 caracteres.",
    contrasenaReglas:
      "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales",
    rfcIncompleto: "Tu RFC debe contener al menos 12 caracteres.",
    telefonoIncompleto: "Introduce tu teléfono a 10 dígitos.",
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

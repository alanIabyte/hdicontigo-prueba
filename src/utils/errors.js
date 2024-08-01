/*
    Configuración genérica para un alert de error.
    Ej.
    const alertaError = useAlerta(configAlertaError);
*/
const configAlertaError = {
  textoEncabezado: "Ocurrió un error",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpoJsx:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  etiquetaBoton: "Aceptar",
};

/*
    Si el servicio regrese alguno de los siguientes
    mensajes de error hay que mostrarlo al usuario,
    de lo contrario, se sugiere mostrar: 
        "La solicitud no pudo ser procesada, por favor contacte a su agente".
*/
const signedErrors = [
  "El producto de transporte no se puede domiciliar, contacte a su asesor HDI.",
  "Object reference not set to an instance of an object.",
  "An error occurred while sending the request. Unable to read data from the transport connection: Connection reset by peer.",
  "No se pudo iniciar sersion: ('Connection aborted.', ConnectionResetError(104, 'Connection reset by peer'))",
];

/* 
    Evalúa si dicho mensaje de servicio está registrado.
    Ej. 
    isSignedError(res.mensaje)
*/

const isSignedError = (message) => signedErrors.includes(message);

export { signedErrors, isSignedError, configAlertaError };

/* eslint-disable */
const diccionario = {
    titulo: "Ingresa la siguiente informacion",
    etiquetaBotonDomiciliar: "Domiciliar pago",
    etiqueta: {
      fechaTarjeta: "Fecha de expiración de tarjeta (MM/AA)",
      tarjetaHabiente: "Nombre de tarjetahabiente",
      banco: "Banco",
      numeroTarjeta: "Número de tarjeta",
      confirmarNumeroTarjeta: "Confirmar número de tarjeta",
      tipoTarjeta: "Tipo de tarjeta de crédito",
      banco: "Banco",
      expiracion: "Fecha de expiración de tarjeta (MM/AA)",
      tipoCuenta: "Tipo de cuenta",
      cuentaCLABE: "Cuenta CLABE (18 dígitos)",
      confirmarCuentaClabe: "Confirmar cuenta CLABE (18 dígitos)",
    },
    errores: {
      errorEnCarga: "Hubo un error, inténtalo de nuevo",
      verificarCampos:
        "Favor de verificar tus datos y que estás seleccionando el tipo de póliza correcta.",
      campoRequerido: "Campo requerido para poder continuar.",
      nombreIncompleto: "Por favor introduce tu nombre completo",
      numeroTarjetaIncompleto: "Por favor introduce el número completo",
      formatoIncorrecto: "Por favor revisa que el formato sea correcto.",
      soloNumeros: "Por favor introduce solo números",
      numeroTarjetaNoCoincide: "Los números de tarjeta no coinciden",
      seleccionarAnioActual: "Introduce una tarjeta que no haya expirado",
      CLABEIncompleta: "La cuenta CLABE debe contener 18 dígitos",
      CLABENoCoincide: "Los números de CLABE no coinciden",
      errorDomiciliacion: {
          titulo : "Ocurrió un error",
          texto: "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
          etiquetaBoton : "Aceptar"
      }
    },
    alerta: {
      titulo: "Ubicación desactivada",
      cuerpo:
        // eslint-disable-next-line max-len
        "Parece que tu ubicación está desactivada. Te recomendamos activarla desde las opciones de configuración de tu dispositivo para obtener una localización más precisa.",
      cuerpoAndroid:
        // eslint-disable-next-line max-len
        "Parece que tu ubicación está desactivada. Te recomendamos activarla desde las opciones de configuración de tu dispositivo para obtener una localización más precisa.",
      etiquetaBoton: "Cancelar",
      etiquetaBoton2: "Ir a Ajustes",
      etiquetaBotonAndroid: "Ok",
    },
    domiciliado: {
        titulo : "Pago domiciliado",
        texto: "Gracias, tu siguiente cargo se realizará de manera automática.",
        etiquetaBoton : "Aceptar"
    }
  };

  export default diccionario;
/* eslint-disable */
export const keysValores = {
  telefono: "telefono",
  email: "email",
  color: "color",
  caracteristicas: "caracteristicas",
  folio: "folio",
  razonDuplicado: "razonDuplicado",
  nombreConductor: "nombreConductor",
};

// Esta interfaz nos permite acceder y modificar el obj "valores" mediante clave-valor, utilizando un hashtable
export interface IObjectKeys {
  [key: string]: string | number | undefined | boolean | null;
}

export interface IValores extends IObjectKeys {
  telefono: string;
  email: string;
  color: string;
  caracteristicas: string;
  folio?: string;
  razonDuplicado?: string;
  nombreConductor?: string;
}

export interface IErroresValores {
  errorTelefono: boolean;
  errorEmail: boolean;
  errorColor: boolean;
  errorCaracteristicas: boolean;
}

export interface IValoresVehiculoEncontrado extends IObjectKeys {
  estado: string;
  ciudad: string;
  descripcion: string;
  notificado: boolean | null;
  fiscalia: string;
  corralon: boolean | null;
  nombreCorralon: string;
  declaracion: boolean | null;
}

export interface ILocationPantallaMenuEsperaRobo {
  mostrarVentanaServicioGPS: boolean;
}

export interface IRespuestaProveedores {
  mensaje: string;
  codigo: string;
  completado: boolean;
  dato: null | IDatoRespuestaProveedores;
};

export interface IDatoRespuestaProveedores {
  contactos: IContactoProveedor[];
  descripcion_Vehiculo: string;
  nombreProveedorGPS: string;
  titularPoliza: string;
};

export interface IContactoProveedor {
  alias: string;
  numeroTelefono: string;
};

// Diccionario para las pantallas de Robo
export const diccionarioRobo = {
  reportePoliza: {
    mensajeDeErrorDefault: "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
    modales: {
      modalSinCobertura: {
        textoEncabezado: "No es posible reportar el robo",
        tipoIcono: "trianguloAlerta",
        colorAlerta: "rojo",
        etiquetaBoton: "Salir",
        textoCuerpo: 'Tu póliza no cuenta con la cobertura "Asistencia por Robo"',
        temaBoton: "rojo"
      }
    }
  },
  resumenReporte: {
    textoErrorGenerarReporte: "Hubo un error al generar el reporte. Por favor. Intentelo más tarde.",
    errorGuardarAudio: "Hubo un error al guardar el audio. Por favor. Intentelo más tarde."
  }
};

// Configuraciones para habilitar y deshabilitar funcionalidades de las pantallas
export const configFuncionalidadRobo = {
  descripcionRobo: {
    NOMBREAUDIOLS: "audioBlob"
  },
  reportePoliza: {
    validarReportesExistentes: true,
    validaCobertura: true,
  },
  resumenReporte: {
    simularSubirAudio: false,
    localAudio: false,
    urlAudio: "https://hdi-media-dev.s3.us-east-1.amazonaws.com/robo/4776500531/1234/audio/grabacion-31_01_2024_16_41.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJHMEUCIQDHeQVqZ51qAtAZi71hNy7rRo%2FfqZTg83h3vjz5AdL6%2FgIgLc%2FOvKU2%2FXOErNSVwCEuoEMsvMfvVvCXjQvmASKz03Yq%2BwIIYhACGgwxMDc4NzYxOTM2MzEiDGMHGvY2ziBWTn0h8SrYAjsXHlDeQKVaov%2FLMdC0OAr4nF03fgHLo3WnSNPRB9CR2Y3R%2BfPs%2BKwa1N77Uxj2PoTQq6Xv6M%2FDl3yj98%2FBRWAyZ8n93kqouer4NzKBCSfB24JGWeYzJV9FgZxjHOQbj3bNsAC9JAmjNBGYUL3ceGHDUygvUtwh3J2gQAANWIenGZ7QjNZgsRCw75PdI1twBeh9g9eFxc%2F9Py43oo1D18koscUcj%2B1r8MxtNEPjHEEI%2BKxX%2FmczfdICNWPjehcltDemiWC1WijBnIMbgUR%2FCrYjSy198CnO32FrEmdPPEIQzwBVyu3m56aVODAq7cnLofPczYS2yNEVCjHuK1MzKDHN1896%2FM3WjXznut6EpTkJ765A7z9do5pcK2g5%2BVSMqM2TJAz3X9Rk5%2BDf8ifNeOt5ccZCmRsMJqrWbmkLTjVh2vpLL6W7mO2rQtElFezzI5ThIoGHu%2B9sMPT7qK4GOrMCJ3Hg5fgZlpqPW0Mc12wnMq7IH6WQujbwDkXTqEw%2FAz%2FFFqWVFbXd3c153VThegLYEHUHKrl7qfV7GI%2Bqw7caw3o%2Fpnstqikw5WNGQ4H8C6OtFQohpMiVqCmZOYHTyXg5yPasAMExdfWDBnIqSQHc8SKUWtdesZ%2FhwtYV9OS2XWr8%2F9Ma4FdpN1rev%2BZ94cVHZbW1HnOh77X2G%2FPHrF2qUVM4QaIwAg2Jq6j0uTlgB5fhu1BLBeUmOYpfF9%2BC%2BIghIy709mmwb9o0XUtQrLw1RNB3ixBzp4hK%2FCxf9%2F2mGAiOIqO3dtcODi4h6E0tRPX2p1k2fAGU28M1ipy7chrEK2O231I4biiLj%2FL0i1TaK5x6fa%2BMxAAFh%2FBzbDMcxfHeSdDQs2HsZhxFVyFnI8yr78Bqjw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240212T162956Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIARSHPMCVP2OB3ORQR%2F20240212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=79c226c419236f82c8917ccd724a5b817f4ec62b45b7f4963f6c55470540c4e7",
  },
  menuEsperaRobo: {
    validarProveedoresLocal: false,
    respuestaSatisfactoria: true,
    validaAccesoReporte: true,
    redireccionar30Min: true,
    respuestaProveedoresSi: {
      "mensaje": "Success.",
      "codigo": "IMOPO100001",
      "completado": true,
      "dato": {
        "titularPoliza": "JOSÉ ARMANDO HERNÁNDEZ JUÁREZ",
        "descripcion_Vehiculo": "HONDA HR-V TOURING L4 2.0L 155 CP 5 PUERTAS AUT BA AA 2024",
        "nombreProveedorGPS": "Encontrack",
        "contactos": [
          {
            "numeroTelefono": "5543235085",
            "alias": "WhatsApp"
          },
          {
            "numeroTelefono": "5553370900",
            "alias": "Opcion 1"
          },
          {
            "numeroTelefono": "8000013625",
            "alias": "Opcion 2"
          }
        ]
      }
    },
    respuestaProveedoreNo: {
      "mensaje": "No se encontró póliza con los parámetros ingresados.",
      "codigo": "IDOPO100001",
      "completado": false,
      "dato": null
    }
  },
  vehiculoRecuperado: {
    simularReportar: false,
    respuestaSatisfactoria: true
  }
};

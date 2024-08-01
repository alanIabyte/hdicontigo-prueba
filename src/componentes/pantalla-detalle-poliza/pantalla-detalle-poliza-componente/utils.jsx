/* eslint-disable */
import React from "react";
import { ReactComponent as IconoVer } from "../../../recursos/iconos/ico_ojo.svg";
import {
  ValoresColorAlterno,
  ColorAlterno,
} from "./PantallaDetallePoliza.styled";

const diccionario = {
  titulo: "Detalle de la póliza",
  descripcionPantalla: "Elige la sección de tu póliza que quieres consultar",
  regresar: "Regresar",
  domiciliarPago: "¿Quieres domiciliar tu pago?",
  descargar: "Descargar",
  pagarDeducible: "Pagar deducible",
  acordeones: {
    descargaPoliza: "Descarga tu póliza",
    informacion: "Información de la póliza",
    vehiculo: "Información del vehículo",
    bien: "Datos del bien asegurado",
    paquete: "Paquete",
    coberturasPorSeccion: "Coberturas por sección",
    coberturas: "Coberturas",
    condiciones: "Condiciones especiales",
    pagos: "Información de pagos",
    asegurados: "Asegurado (s)",
    credencial: "Ver credencial digital",
    plan: "Producto",
    reembolso: "Reembolsos",
    dolaresDAN: "*Si tu póliza está emitida en dólares, el cargo se realizará en moneda nacional al tipo de cambio del día de cobro."
  },
  acordeonInformacion: {
    numeroPoliza: "Número",
    vigenciaPoliza: "Vigencia",
    agente: "Agente",
    estatusPoliza: "Estatus",
  },
  acordeonVehiculo: {
    marca: "Marca",
    numeroSerie: "Número de serie",
    color: "Color",
    placas: "Placas",
  },
  acordeonBien: {
    descripcion: "Descripción",
    tipo: "Tipo",
  },
  acordeonPaquete: {
    paquete: "Paquete",
    modulos: "Módulos",
  },
  acordeonPagos: {
    pagarProximoRecibo: "Paga tus recibos",
    pagarProximoEndoso: "Paga tus endosos",
    noPendiente: "No tienes pago pendiente",
  },
  verRecibosPagos: "Ver recibos pendientes",
  verEndososPagos: "Ver recibos de endosos / Pagos",
  verEndosos: "Ver endosos",
  verRecibos: "Ver recibos",
  modal: {
    etapa1: {
      titulo: "Geolocalización",
      mensaje: "¿Permites que HDI Contigo acceda a tu ubicación?",
      boton1: "Permitir",
      boton2: "No permitir",
    },
    etapa2: {
      titulo: "Domiciliar pago",
      mensaje: "¿Eres el contratantede la póliza?",
      boton1: "Sí, soy el contratente",
      boton2: "No soy el contratante",
    },
    etapa3: {
      titulo: "Atención",
      mensaje:
        "Solo el contratante de la póliza puede realizar la domiciliación de pago",
      boton1: "Aceptar",
    },
    etapa4: {
      titulo: "Domiciliar pago",
      mensaje: "Ingresa el RFC que aparece en tu póliza de seguro",
      boton1: "Continuar",
    },
    etapa9: {
      titulo: "Buscar póliza",
      mensaje: "Escribe tu RFC para poder encontrar tu póliza.",
      boton1: "Buscar",
      boton2: "Llamar a HDI *434",
    },
    etapa10: {
      titulo: "Bienvenido",
      mensaje: "**",
      boton1: "Continuar",
      boton2: "No soy yo",
    },
    errorUbicacion: {
      titulo: "Geolocalizacion",
      mensaje: "Por favor, permite la ubicación en tu dispositivo",
      boton1: "Aceptar",
    },
    errorDescarga: {
      titulo: "Descarga de póliza",
      mensaje:
        "Tu póliza no se encuentra disponible en estos momentos, por favor contacta a tu agente.",
      boton1: "Aceptar",
    },
    errorRFC: {
      titulo: "Domiciliar pago",
      mensaje:
        "El RFC no coincide con el del contrantante, por favor inténtalo de nuevo",
      boton1: "Aceptar",
    },
    errorServicioRFC: {
      titulo: "Domiciliar pago",
      mensaje: "Ocurrió un error, por favor inténtalo de nuevo",
      boton1: "Aceptar",
    },
  },
};

const construirRespuesta = (foco, error, valida) => {
  return {
    foco,
    error,
    valida,
  };
};

const errores = {
  errorEnCarga: "Hubo un error, inténtalo de nuevo",
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
};

const validarRFC = (rfc) => {
  return new Promise((resolve, reject) => {
    if (!rfc) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (rfc.length === 0) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else if (rfc.length < 10) {
      resolve(construirRespuesta("error", errores.campoRequerido, false));
    } else {
      resolve(construirRespuesta("", "", true));
    }
    reject(construirRespuesta("error", errores.campoRequerido, false));
  });
};

const obtenerLeyendaAdeudo = (leyenda) => {
  console.log(leyenda);
  if (leyenda === null) {
    return;
  }
  let formatoLeyenda = leyenda.replace("$", "").replaceAll(",", "");
  if (parseFloat(formatoLeyenda) > 1) {
    return leyenda;
  } else {
    return diccionario.acordeonPagos.noPendiente;
  }
};

const setObjetoAlerta = (
  tipoIcono,
  colorAlerta,
  textoEncabezado,
  textoCuerpoJsx,
  etiquetaBoton,
  etiquetaBoton2
) => {
  return {
    tipoIcono,
    colorAlerta,
    textoEncabezado,
    textoCuerpoJsx,
    etiquetaBoton,
    etiquetaBoton2,
    temaBoton2: etiquetaBoton2 != null ? "simple" : null,
  };
};

const configurarAlerta = (etapaModal) => {
  switch (etapaModal) {
    case 1:
      return setObjetoAlerta(
        "ubicacion",
        "azul",
        diccionario.modal.etapa1.titulo,
        diccionario.modal.etapa1.mensaje,
        diccionario.modal.etapa1.boton1,
        diccionario.modal.etapa1.boton2
      );
    case 2:
      return setObjetoAlerta(
        "ubicacion",
        "azul",
        diccionario.modal.etapa2.titulo,
        diccionario.modal.etapa2.mensaje,
        diccionario.modal.etapa2.boton1,
        diccionario.modal.etapa2.boton2
      );
    case 3: // Error no es contratente
      return setObjetoAlerta(
        "alerta",
        "amarillo",
        diccionario.modal.etapa3.titulo,
        diccionario.modal.etapa3.mensaje,
        diccionario.modal.etapa3.boton1,
        ""
      );
    case 4: // Es contratante, debe ingresar RFC
      return setObjetoAlerta(
        "pago",
        "azul",
        diccionario.modal.etapa4.titulo,
        diccionario.modal.etapa4.mensaje,
        diccionario.modal.etapa4.boton1,
        ""
      );
    case 5: // Denegó ubicacion
      return setObjetoAlerta(
        "alerta",
        "amarillo",
        diccionario.modal.errorUbicacion.titulo,
        diccionario.modal.errorUbicacion.mensaje,
        diccionario.modal.errorUbicacion.boton1,
        ""
      );
    case 6: // Error al descargar poliza
      return setObjetoAlerta(
        "trianguloAlerta",
        "rojo",
        diccionario.modal.errorDescarga.titulo,
        diccionario.modal.errorDescarga.mensaje,
        diccionario.modal.errorDescarga.boton1,
        ""
      );
    case 7: // EL RFC no es del contratante
      return setObjetoAlerta(
        "trianguloAlerta",
        "rojo",
        diccionario.modal.errorRFC.titulo,
        diccionario.modal.errorRFC.mensaje,
        diccionario.modal.errorRFC.boton1,
        ""
      );
      break;
    case 8: // Error de servicio de validacion de RFC
      return setObjetoAlerta(
        "trianguloAlerta",
        "rojo",
        diccionario.modal.errorServicioRFC.titulo,
        diccionario.modal.errorServicioRFC.mensaje,
        diccionario.modal.errorServicioRFC.boton1,
        ""
      );
    case 9: //Buscar póliza mediante RFC
      return setObjetoAlerta(
        "",
        "",
        diccionario.modal.etapa9.titulo,
        diccionario.modal.etapa9.mensaje,
        diccionario.modal.etapa9.boton1,
        diccionario.modal.etapa9.boton2,
        ""
      );
    case 10: //El usuario fue encontrado mediante RFC, verificamos su identidad
      return setObjetoAlerta(
        "",
        "",
        diccionario.modal.etapa10.titulo,
        diccionario.modal.etapa10.mensaje,
        diccionario.modal.etapa10.boton1,
        diccionario.modal.etapa10.boton2,
        ""
      );
  }
};

const configAlertaCuentaHabiente = {
  textoEncabezado: "Ocurrió un error",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpoJsx: "Por favor, inténtalo más tarde.",
  etiquetaBoton: "Aceptar",
};

const configAlertaError = {
  textoEncabezado: "Ocurrió un error",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpoJsx:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  etiquetaBoton: "Aceptar",
};

const configAlertaErrorCancelacion = {
  textoEncabezado: "Ocurrió un error",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  textoCuerpoJsx:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  etiquetaBoton: "Aceptar",
};

const configAlertaCancelado = {
  textoEncabezado: "Cancelación completada",
  tipoIcono: "domiciliacionCancelada",
  colorAlerta: "estandar",
  textoCuerpoJsx: "Se ha cancelado la domiciliación de tu pago",
  etiquetaBoton: "Aceptar",
};

const configAlertaConfirmarCancelar = {
  textoEncabezado: "¿Estás seguro de cancelar la domiciliación?",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  etiquetaBoton: "Estoy seguro",
  etiquetaBoton2: "No, quiero regresar",
  temaBoton2: "simple",
};

const configAlertaRecibosPendientes = {
  textoEncabezado: "No es posible cancelar la domiciliación",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  etiquetaBoton: "Aceptar",
  textoCuerpoJsx:
    "Tienes pagos pendientes, para cancelar la domiciliación tienes que ponerte al corriente con tus pagos.",
};

const configAlertaNoHTC = {
  textoEncabezado: "No es posible cancelar la domiciliación",
  tipoIcono: "trianguloAlerta",
  colorAlerta: "amarillo",
  etiquetaBoton: "Aceptar",
  textoCuerpoJsx: "Por favor, contacta a tu agente",
};

const configAlertaRFCCancelar = () =>
  setObjetoAlerta(
    "pago",
    "azul",
    diccionario.modal.etapa4.titulo,
    diccionario.modal.etapa4.mensaje,
    diccionario.modal.etapa4.boton1,
    ""
  );

const coberturasPorLineaNegocio = (lineaNegocio, detalle, callback) => {
  switch (lineaNegocio) {
    case "AUTR":
      return {
        titulo: () => diccionario.acordeones.coberturas,
        listado: () => (
          <ValoresColorAlterno>
            {detalle?.coberturas?.map((cobertura) => (
              <ColorAlterno key={cobertura.cobertura}>
                {`${cobertura.cobertura},  ${cobertura.sumaAsegurada}${
                  cobertura.deducible.length > 1 ? "," : ""
                }  ${
                  cobertura.deducible.length > 1
                    ? cobertura.deducible + " deducible."
                    : ""
                }`}
              </ColorAlterno>
            ))}
          </ValoresColorAlterno>
        ),
      };
    case "DAN":
      return {
        titulo: () => diccionario.acordeones.coberturasPorSeccion,
        listado: () => (
          <ValoresColorAlterno>
            {detalle?.seccionesCoberturas?.map((seccion) => (
              <ColorAlterno
                key={seccion.idSeccion}
                onClick={() => callback(seccion)}
              >
                {seccion.seccion}
                <IconoVer />
              </ColorAlterno>
            ))}
          </ValoresColorAlterno>
        ),
      };
  }
};

export {
  validarRFC,
  obtenerLeyendaAdeudo,
  diccionario,
  configurarAlerta,
  configAlertaCuentaHabiente,
  configAlertaError,
  configAlertaConfirmarCancelar,
  configAlertaRFCCancelar,
  configAlertaErrorCancelacion,
  configAlertaCancelado,
  coberturasPorLineaNegocio,
  configAlertaRecibosPendientes,
  configAlertaNoHTC,
};

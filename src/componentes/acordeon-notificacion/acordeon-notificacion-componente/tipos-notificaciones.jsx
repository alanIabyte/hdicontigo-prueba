/* eslint-disable */
import IconoPago from "../iconos/Pago.svg";
import IconoPagoGris from "../iconos/Pago gris.svg";

import IconoTarjeta from "../iconos/Tarjeta.svg";
import IconoTarjetaGris from "../iconos/Tarjeta gris.svg";

import IconoHome from "../iconos/inicio.svg";
import IconoHomeDisabled from "../iconos/inicio_disabled.svg";

import IconoContrasenia from "../iconos/Contraseña.svg";
import IconoContraseniaDisabled from "../iconos/Contraseña gris.svg";

import IconoPoliza from "../iconos/Póliza.svg";
import IconoPolizaDisabled from "../iconos/Póliza gris.svg";

import IconoAjustador from "../iconos/Ajustador.svg";
import IconoAjustadorDisabled from "../iconos/Ajustador gris.svg";

import IconoPase from "../iconos/pase generado.svg";
import IconoPaseGris from "../iconos/pase generado gris.svg";

import IconoValuacionVehiculo from "../iconos/valuacion de tu vehiculo.svg";
import IconoValuacionVehiculoGris from "../iconos/valuacion de tu vehiculo gris.svg";

import IconoPagoDeducible from "../iconos/pago de deducible.svg";
import IconoPagoDeducibleDisabled from "../iconos/pago de deducilbe gris.svg";

import IconoIndemnizacion from "../iconos/indemnizacion de tu vehiculo.svg";
import IconoIndemnizacionDisabled from "../iconos/indemnizacion de tu vehiculo gris.svg";

import IconoRequisitosPendientes from "../iconos/requisitos pendientes.svg";
import IconoRequisitosPendientesDisabled from "../iconos/requisitos pendientes gris.svg";

import IconoEstatusIndemnizacion from "../iconos/Estatus de indemnización.svg";
import IconoEstatusIndemnizacionDisabled from "../iconos/Estatus de indemnización gris.svg";

import IconoPagoIndemnizacionRealizado from "../iconos/Pago de indemnización realizado.svg";
import IconoPagoIndemnizacionRealizadoDisabled from "../iconos/Pago de indemnización realizado gris.svg";

import IconoConductorDetenido from "../../../recursos/iconos/ico_lib_conductor_detenido.svg";
import IconoConductorDetenidoDisable from "../../../recursos/iconos/ico_lib_conductor_detenido_disable.svg";

import { IconoEncabezado } from "./acordeon-notificacion.styled";

const tiposNotis = {
  polizaPendientePago: "noti/estastusPagos/PolPendPago",
  polizaCancelada: "noti/estastusPagos/PolCancelada",
  noCancelarDomiciliacion: "noti/domiciliacion/noCancelarDomiciliacion",
  errorCobroTarjeta: "noti/domiciliacion/errorCobroTarjeta",
  pagoAplicado: "noti/domiciliacion/pagoAplicado",
  modDatosTarjeta: "noti/domiciliacion/modiDatosTarjeta",
  nuevaContrasenia: "noti/cambiarContrasenia/nuevaContrasenia",
  reporteGenerado: "noti/reporteSiniestro/reporteGenerado",
  reporteGeneradoAsistenciaLegal: "noti/reporteSiniestro/asistenciaLegal/reporteGenerado",
  reporteNoGenerado: "noti/reporteSiniestro/reporteNoGenerado",
  ajustadroAsignado: "noti/asignacionAjustador/ajustadroAsignado",
  ajustadorLlego: "noti/asignacionAjustador/ajustadorLlego",
  paseGenerado: "noti/seguimientoAjuste/paseGenerado",
  valuaciónVehiculo: "noti/seguimientoRep/valuaciónVehiculo",
  puedeRealizarPago: "noti/seguimientoRep/puedeRealizarPago",
  indemnizacionVehiculo: "noti/procesoIndemnizacion/indemnizacionVehiculo",
  requisitosPendientes: "noti/procesoIndemnizacion/requisitosPendientes",
  estatusIndemnizacion: "noti/procesoIndemnizacion/estatusIndemnizacion",
  pagoRealizado: "noti/procesoIndemnizacion/pagoRealizado",
}

const tipos = [
  {
    icono: IconoPago,
    iconoDisabled: IconoPagoGris,
    redirect: true,
    tipos: [
      tiposNotis.polizaPendientePago,
      tiposNotis.polizaCancelada,
    ],
  },
  {
    icono: IconoTarjeta,
    iconoDisabled: IconoTarjetaGris,
    tipos: [
      tiposNotis.noCancelarDomiciliacion,
      tiposNotis.errorCobroTarjeta,
      tiposNotis.pagoAplicado,
      tiposNotis.modDatosTarjeta,
    ],
  },
  {
    icono: IconoContrasenia,
    iconoDisabled: IconoContraseniaDisabled,
    tipos: [
      tiposNotis.nuevaContrasenia,
    ],
  },
  {
    icono: IconoPoliza,
    iconoDisabled: IconoPolizaDisabled,
    tipos: [
      tiposNotis.reporteGenerado,
      tiposNotis.reporteNoGenerado,
    ],
  },
  {
    icono: IconoConductorDetenido,
    iconoDisabled: IconoConductorDetenidoDisable,
    tipos: [
      tiposNotis.reporteGeneradoAsistenciaLegal,
      tiposNotis.reporteNoGenerado,
    ],
  },
  {
    icono: IconoAjustador,
    iconoDisabled: IconoAjustadorDisabled,
    tipos: [
      tiposNotis.ajustadroAsignado,
      tiposNotis.ajustadorLlego,
    ],
  },
  {
    icono: IconoPase,
    iconoDisabled: IconoPaseGris,
    tipos: [
      tiposNotis.paseGenerado
    ],
  },
  {
    icono: IconoValuacionVehiculo,
    iconoDisabled: IconoValuacionVehiculoGris,
    tipos: [
      tiposNotis.valuaciónVehiculo
    ],
  },
  {
    icono: IconoPagoDeducible,
    iconoDisabled: IconoPagoDeducibleDisabled,
    tipos: [
      tiposNotis.puedeRealizarPago
    ],
  },
  {
    icono: IconoIndemnizacion,
    iconoDisabled: IconoIndemnizacionDisabled,
    tipos: [
      tiposNotis.indemnizacionVehiculo
    ],
  },
  {
    icono: IconoRequisitosPendientes,
    iconoDisabled: IconoRequisitosPendientesDisabled,
    tipos: [
      tiposNotis.requisitosPendientes
    ],
  },
  {
    icono: IconoEstatusIndemnizacion,
    iconoDisabled: IconoEstatusIndemnizacionDisabled,
    tipos: [
      tiposNotis.estatusIndemnizacion
    ],
  },
  {
    icono: IconoPagoIndemnizacionRealizado,
    iconoDisabled: IconoPagoIndemnizacionRealizadoDisabled,
    tipos: [
      tiposNotis.pagoRealizado
    ],
  },
]

const redirectUrls = [
  {
    path: "/informacion-pagos",
    typeData: "state",
    tipos: [
      tiposNotis.polizaPendientePago,
    ]
  },
  {
    path: "/detalle-poliza",
    typeData: "state",
    tipos: [
      tiposNotis.polizaCancelada,
    ],
    containerShow: "informacionPoliza",
  },
  {
    path: "/detalle-poliza",
    typeData: "state",
    tipos: [
      tiposNotis.errorCobroTarjeta,
      tiposNotis.modDatosTarjeta,
      tiposNotis.pagoAplicado,
      tiposNotis.noCancelarDomiciliacion,
    ],
    containerShow: "informacionPagos",
  },
  {
    path: "/pasos-progreso",
    typeData: "queryParams",
    tipos: [
      tiposNotis.reporteGenerado,
      tiposNotis.ajustadroAsignado,
      tiposNotis.ajustadorLlego,
      tiposNotis.reporteGeneradoAsistenciaLegal,
    ]
  },
  //Opcion para abrir cierta sección de los dropdowns
  {
    path: "/pasos-progreso",
    typeData: "queryParams",
    tipos: [
      tiposNotis.paseGenerado
    ]
  },
  {
    path: "",
    typeData: "noRedirect",
    tipos: [
      tiposNotis.nuevaContrasenia
    ]
  },
]

const obtenerIconoPorTipo = (tipo, leido) => {
  //Busqueda del icono por el tipo de notifiación
  let resultadoBusqueda = tipos.filter(bus => bus.tipos.includes(tipo))[0];
  if (resultadoBusqueda != undefined) {
    const icono = leido ? resultadoBusqueda.iconoDisabled : resultadoBusqueda.icono;
    return <IconoEncabezado src={icono} width="50px" margin="0 15px"/>;
  } else {
    const icono = leido ? IconoHomeDisabled : IconoHome;
    return <IconoEncabezado src={icono} />;
  }
}

const getRedirect = (tipo) => {
  let resultadoBusqueda = redirectUrls.filter(bus => bus.tipos.includes(tipo))[0];

  if (resultadoBusqueda != undefined) {
    return resultadoBusqueda;
  }
  return "";
}

export {
  obtenerIconoPorTipo,
  getRedirect,
}
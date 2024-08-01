/* eslint-disable */
import {Alerta, AlertaCampo} from "./alerta";
import AlertaFlotante from "./alerta-flotante";
import AsistenciaLegal from "./asistencia-legal";
import BarraAlerta from "./barra-alerta";
import BarraProgresoReporte from "./barra-progreso-reporte";
import Boton from "./boton";
import ContenedorPerdidaTotal from "./contenedor-perdida-total";
import ContenedorReparacion from "./contenedor-reparacion";
import ContenedorReporteAjuste from "./contenedor-reporte-ajuste";
import Declaracion from "./declaracion";
import Documentacion from "./documentacion";
import Encabezado from "./encabezado";
import EncabezadoPasosProgreso from "./encabezado-pasos-progreso";
import EncabezadoPolizasSiniestradas from "./encabezado-polizas-siniestradas";
import EncabezadoReporte from "./encabezado-reporte";
import Entrega from "./entrega";
import Evaluacion from "./evaluacion";
import EvaluacionModal from "./evaluacion-modal";
import FechaDeIndeminizacion from "./fecha-de-indemnizacion";
import Grua from "./grua";
import IndicadorCarga from "./indicador-carga";
import IngresoTaller from "./ingreso-taller";
import Lesionados from "./lesionados";
import PagoDeducible from "./pago-deducible";
import PantallaBienvenida from "./pantalla-bienvenida";
import PantallaCamara from "./pantalla-camara";
import PantallaBienvenidaGMM from "./pantalla-bienvenida-gmm";
import PantallaCompartirSiniestro from "./pantalla-compartir-siniestro";
import PantallaConfirmacionCuentaCreada from "./pantalla-confirmacion-cuenta-creada";
import PantallaContrasenaOlvidada from "./pantalla-contrasena-olvidada";
import PantallaCreacionCuenta from "./pantalla-creacion-cuenta";
import PantallaCuenta from "./pantalla-cuenta";
import PantallaCuestionarioReporte from "./pantalla-cuestionario-reporte";
import PantallaEditarInformacionContacto from "./pantalla-editar-informacion-contacto";
import {
  PantallaEvaluacionTaller,
  PantallaEvaluacionAjustador,
} from "./pantalla-evaluacion";
import PantallaFormularioInformacionContacto from "./pantalla-formulario-informacion-contacto";
import PantallaIngresoDePoliza from "./pantalla-ingreso-de-poliza";
import PantallaIngresoDePolizaOcr from "./pantalla-ingreso-de-poliza-ocr";
import PantallaMenuEspera from "./pantalla-menu-espera";
import PantallaPasosProgreso from "./pantalla-pasos-progreso";
import PantallaPolizasSiniestradas from "./pantalla-polizas-siniestradas";
import PantallaRecomendaciones from "./pantalla-recomendaciones";
import {
  PantallaContrasenaCambiar,
  PantallaContrasenaEstablecer,
  PantallaContrasenaRestablecer,
  PantallaContrasenaPagoDeducible,
} from "./pantalla-contrasena-cambiar";
import PantallaResumenReporte from "./pantalla-resumen-reporte";
import PantallaSeguimientoMapa from "./pantalla-seguimiento-mapa";
import PantallaSubirFotosDocumentos from "./pantalla-subir-fotos-documentos";
import PantallaUbicacionMapa from "./pantalla-ubicacion-mapa";
import PantallaVerificarTelefono from "./pantalla-verificar-telefono";
import PolizaSiniestrada from "./poliza-siniestrada";
import ReparacionVehiculo from "./reparacion-vehiculo";
import ReporteSiniestro from "./reporte-siniestro";
import Resolucion from "./resolucion";
import SeccionPasosProgreso from "./seccion-pasos-progreso";
import Taller from "./taller";
import TipoDeAtencion from "./tipo-de-atencion";
import Ubicacion from "./ubicacion";
import Valuacion from "./valuacion";
import Visualizador from "./visualizador";
import AcordeonPantallaPoliza from "./acordeon-detalle-poliza";
import PantallaRegistroUsuario from "./pantalla-registro-usuario";
import PantallaRegistroUsuarioSMS from "./pantalla-registro-usuario-sms";
import PantallaMisPolizas from "./pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas";
import PantallaMisReembolsos from "./pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos";
import PantallaDetalleReembolso from "./pantalla-detalle-reembolso";
import PantallaReembolsoDescarga from "./pantalla-reembolso-descarga";
import PantallaConsultaReembolsos from "./pantalla-consulta-reembolsos";
import PantallaResumenReembolso from "./pantalla-resumen-reembolso-version-dos";
import Poliza from "./poliza";
import CajaResumen from "./caja-resumen";
import PantallaDetallePoliza from "./pantalla-detalle-poliza";
import PantallaInformacionPagos from "./pantalla-informacion-pagos";
import PantallaRegistroPoliza from "./pantalla-registro-poliza";
import PantallaPagos from "./pantalla-pagos";
import PantallaDetalleRecibo from "./pantalla-detalle-recibo";
import PantallaFormasPago from "./pantalla-formas-pago";
import PantallaInicio from "./pantalla-inicio";
import PantallaPagoOtra from "./pantalla-pago-otra/pantalla-pago-otra-componente/PantallaPagoOtra";
import PantallaPagoOtraBancos from "./pantalla-pago-otra-bancos";
import PantallaPagoOtraTiendas from "./pantalla-pago-otra-tiendas";
import PantallaRecibosFormaPago from "./pantalla-recibos-forma-pago";
import PantallaInformacionRecibosEndosos from "./pantalla-informacion-recibos-endosos";
import PantallaFormasDomiciliacion from "./pantalla-formas-domiciliacion";
import PantallaDomiciliacion from "./pantalla-domiciliacion";
import PantallaSolicitudReembolso from "./pantalla-solicitud-reembolso";
import EncabezadoDomiciliacion from "./encabezado-domiciliacion";
import { Select, SelectWitchSearch } from "./select";
import PantallaTransaccionMitec from "./pantalla-transaccion-mitec/pantalla-transaccion-mitec-componente/PantallaTransaccionMitec";
import PantallaPruebas from "./pantalla-pruebas/PantallaPrubeas";
import CampoTarjeta from "./campo-texto/campo-texto-componente/CampoTarjeta";
import Switch from "./Switch/";
import PantallaRecomendarCambioContrasena from "./pantalla-recomendar-cambio-contrasena";
import PantallaBotonMedica from "./pantalla-boton-medica";

export {
  Alerta,
  AlertaCampo,
  AlertaFlotante,
  AsistenciaLegal,
  BarraAlerta,
  BarraProgresoReporte,
  Boton,
  ContenedorPerdidaTotal,
  ContenedorReparacion,
  ContenedorReporteAjuste,
  Declaracion,
  Documentacion,
  Encabezado,
  EncabezadoPasosProgreso,
  EncabezadoPolizasSiniestradas,
  EncabezadoReporte,
  Entrega,
  Evaluacion,
  EvaluacionModal,
  FechaDeIndeminizacion,
  Grua,
  IndicadorCarga,
  IngresoTaller,
  Lesionados,
  PagoDeducible,
  PantallaBienvenida,
  PantallaBienvenidaGMM,
  PantallaCamara,
  PantallaCompartirSiniestro,
  PantallaConfirmacionCuentaCreada,
  PantallaContrasenaOlvidada,
  PantallaCreacionCuenta,
  PantallaCuenta,
  PantallaCuestionarioReporte,
  PantallaEditarInformacionContacto,
  PantallaEvaluacionAjustador,
  PantallaEvaluacionTaller,
  PantallaFormularioInformacionContacto,
  PantallaIngresoDePoliza,
  PantallaIngresoDePolizaOcr,
  PantallaMenuEspera,
  PantallaPasosProgreso,
  PantallaPolizasSiniestradas,
  PantallaRecomendaciones,
  PantallaContrasenaCambiar,
  PantallaContrasenaEstablecer,
  PantallaContrasenaPagoDeducible,
  PantallaContrasenaRestablecer,
  PantallaResumenReporte,
  PantallaSeguimientoMapa,
  PantallaSubirFotosDocumentos,
  PantallaUbicacionMapa,
  PantallaVerificarTelefono,
  PolizaSiniestrada,
  ReparacionVehiculo,
  ReporteSiniestro,
  Resolucion,
  SeccionPasosProgreso,
  Taller,
  TipoDeAtencion,
  Ubicacion,
  Valuacion,
  Visualizador,
  AcordeonPantallaPoliza,
  PantallaRegistroUsuario,
  PantallaRegistroUsuarioSMS,
  PantallaMisPolizas,
  PantallaMisReembolsos,
  PantallaReembolsoDescarga,
  PantallaConsultaReembolsos,
  PantallaDetalleReembolso,
  PantallaResumenReembolso,
  Poliza,
  PantallaDetallePoliza,
  PantallaInformacionPagos,
  PantallaRegistroPoliza,
  PantallaPagos,
  PantallaDetalleRecibo,
  PantallaFormasPago,
  PantallaInicio,
  PantallaBotonMedica,
  CajaResumen,
  PantallaPagoOtra,
  PantallaPagoOtraBancos,
  PantallaPagoOtraTiendas,
  PantallaRecibosFormaPago,
  PantallaInformacionRecibosEndosos,
  PantallaFormasDomiciliacion,
  PantallaDomiciliacion,
  PantallaSolicitudReembolso,
  EncabezadoDomiciliacion,
  Select,
  PantallaTransaccionMitec,
  PantallaPruebas,
  CampoTarjeta,
  Switch,
  SelectWitchSearch,
  PantallaRecomendarCambioContrasena,
};

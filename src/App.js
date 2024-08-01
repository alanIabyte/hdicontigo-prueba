/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { instanceOf } from "prop-types";
import moment from "moment";
import "moment/locale/es-mx";
import { withCookies, Cookies, useCookies } from "react-cookie";
import {
  useHistory,
  Switch,
  Route,
  HashRouter,
  useLocation,
} from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { v4 } from "uuid";
import { Button } from "@material-ui/core";
import { loader } from "graphql.macro";
import { Alerta } from "./componentes";
import Constantes from "./recursos/constantes";
import IndicadorCarga from "./componentes/indicador-carga";
import * as serviceWorker from "./serviceWorkerRegistration";
import AcordeonRegistroPoliza from "./componentes/acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza";
import Ubicacion from "./componentes/pantalla-ubicacion/Ubicacion";
import PantallaIsometrico from "./componentes/pantalla-isometrico/PantallaIsometrico";
import PantallaBienvenida from "./componentes/pantalla-bienvenida";

import PantallaRegistroGMM from "./componentes/pantalla-registro-gmm";
import PantallaRecuperarPolizaComponente from "./componentes/pantalla-recuperar-poliza";
import PantallaEnviarSMS from "./componentes/pantalla-enviar-sms/pantalla-enviar-sms-componente/PantallaEnviarSMS";
import PantallaSeleccionarNumero from "./componentes/pantalla-seleccionar-numero";
import PantallaElegirEncuesta from "./componentes/pantalla-elegir-encuesta";
import PantallaPreguntasFrecuentesPT from "./componentes/pantalla-preguntas-frecuentesPT/PantallaPreguntasFrecuentesPT";
import PantallaDocumentacionPT from "./componentes/pantalla-documentacion-pt";
import IndemnizacionVehiculo from "./componentes/componente-indemnizacion-vehiculo";
import PantallaIndemnizacion from "./componentes/pantalla-indemnizacion-opciones";
import PantallaProcesoIndemnizacion from "./componentes/pantalla-proceso-indemnizacion";
import PantallaAsistenciaHDI from "./componentes/pantalla-asistencia-hdi";
import { PantallaSeleccionarPolizaRecuperada } from "./componentes/pantalla-recuperar-poliza/pantalla-seleccionar-poliza/PantallaSeleccionarPolizaRecuperada";
import {
  PantallaMenuEsperaRobo,
  PantallaRoboInfoExtra,
  PantallaVehiculoLocalizado,
  ResumenReporteRobo,
} from "./pantallas/pantallas-robo";
import PantallaCristaleras from "./componentes/pantalla-cristaleras";
import PantallaUbicacionRobo from "./componentes/pantalla-ubicacion-robo";
import { PruebaCookie } from "./componentes/pantalla-prueba-cookie/PruebaCookie";
import PantallaCredencialGmm from "./componentes/pantalla-credencial-gmm";
import PantallaBusquedaTalleres from "./pantallas/pantalla-talleres-busqueda/PantallaBusquedaTalleres";
import PantallaError from "./pantallas/pantalla-error/PantallaError";
import PantallaCodigoVerificacion from "./componentes/pantalla-codigo-verificacion";
import PantallaRequisitosReunionAjustador from "./pantallas/pantallas-robo/PantallaRequisitosReunionAjustador";
import { PantallaRecuperaVehiculo } from "./pantallas/pantallas-robo/PantallaRecuperaVehiculo";
import PantallaRequisitosLiberacionVehiculo from "./pantallas/pantallas-robo/PantallaRequisitosLiberacionVehiculo";

const AcordeonElegirSiniestro = lazy(() =>
  import("./componentes/acordeon-elegir-siniestro")
);

const PantallaBienvenidaGMM = lazy(() =>
  import("./componentes/pantalla-bienvenida-gmm")
);

// const PantallaBienvenida = lazy(() =>
//   import("./componentes/pantalla-bienvenida")
// );

const PantallaCompartirSiniestro = lazy(() =>
  import("./componentes/pantalla-compartir-siniestro")
);

const PantallaConfirmacionCuentaCreada = lazy(() =>
  import("./componentes/pantalla-confirmacion-cuenta-creada")
);

const PantallaContrasenaOlvidada = lazy(() =>
  import("./componentes/pantalla-contrasena-olvidada")
);

const PantallaCreacionCuenta = lazy(() =>
  import("./componentes/pantalla-creacion-cuenta")
);

const PantallaCuenta = lazy(() => import("./componentes/pantalla-cuenta"));

const PantallaCuestionarioReporte = lazy(() =>
  import("./componentes/pantalla-cuestionario-reporte")
);

const PantallaEditarInformacionContacto = lazy(() =>
  import("./componentes/pantalla-editar-informacion-contacto")
);

const PantallaEvaluacionAjustador = lazy(() =>
  import(
    "./componentes/pantalla-evaluacion/pantalla-evaluacion-componente/PantallaEvaluacionAjustador"
  )
);

const PantallaEvaluacionTaller = lazy(() =>
  import(
    "./componentes/pantalla-evaluacion/pantalla-evaluacion-componente/PantallaEvaluacionTaller"
  )
);

const PantallaFormularioInformacionContacto = lazy(() =>
  import("./componentes/pantalla-formulario-informacion-contacto")
);

const PantallaFormularioInformacionVehiculoGrua = lazy(() =>
  import("./componentes/pantalla-formulario-informacion-vehiculo-grua")
);

const PantallaFormularioInformacionVehiculoCristal = lazy(() =>
  import("./componentes/pantalla-formulario-informacion-vehiculo-cristal")
);

const PantallaIngresoDePoliza = lazy(() =>
  import("./componentes/pantalla-ingreso-de-poliza")
);

const PantallaMenuEspera = lazy(() =>
  import("./componentes/pantalla-menu-espera")
);

const PantallaPasosProgreso = lazy(() =>
  import("./componentes/pantalla-pasos-progreso")
);

const PantallaPasosProgresoGrua = lazy(() =>
  import("./componentes/pantalla-pasos-progreso-grua")
);

const PantallaCancelarGrua = lazy(() =>
  import("./componentes/pantalla-cancelar-grua")
);

const PantallaPolizasSiniestradas = lazy(() =>
  import("./componentes/pantalla-polizas-siniestradas")
);

const PantallaRecomendaciones = lazy(() =>
  import("./componentes/pantalla-recomendaciones")
);

const PantallaContrasenaCambiar = lazy(() =>
  import(
    "./componentes/pantalla-contrasena-cambiar/pantalla-contrasena-cambiar-componente/PantallaContrasenaCambiar"
  )
);

const PantallaContrasenaEstablecer = lazy(() =>
  import(
    "./componentes/pantalla-contrasena-cambiar/pantalla-contrasena-cambiar-componente/PantallaContrasenaEstablecer"
  )
);

const PantallaContrasenaPagoDeducible = lazy(() =>
  import(
    "./componentes/pantalla-contrasena-cambiar/pantalla-contrasena-cambiar-componente/PantallaContrasenaPagoDeducible"
  )
);

const PantallaContrasenaRestablecer = lazy(() =>
  import(
    "./componentes/pantalla-contrasena-cambiar/pantalla-contrasena-cambiar-componente/PantallaContrasenaRestablecer"
  )
);

const PantallaResumenReporte = lazy(() =>
  import("./componentes/pantalla-resumen-reporte")
);

const PantallaSeguimientoMapa = lazy(() =>
  import("./componentes/pantalla-seguimiento-mapa")
);

const PantallaSubirFotosDocumentos = lazy(() =>
  import("./componentes/pantalla-subir-fotos-documentos")
);

const PantallaSubirFotosGrua = lazy(() =>
  import("./componentes/pantalla-subir-fotos-grua")
);

const PantallaSubirFotosRobo = lazy(() =>
  import("./componentes/pantalla-subir-fotos-robo")
);

const PantallaUbicacionMapa = lazy(() =>
  import("./componentes/pantalla-ubicacion-mapa")
);

const PantallaVerificarTelefono = lazy(() =>
  import("./componentes/pantalla-verificar-telefono")
);

const PantallaRegistroUsuarioSMS = lazy(() =>
  import("./componentes/pantalla-registro-usuario-sms")
);

const PantallaRegistroUsuarioBiometrico = lazy(() =>
  import("./componentes/pantalla-registro-usuario-biometrico")
);

const PantallaInformacionPagos = lazy(() =>
  import("./componentes/pantalla-informacion-pagos")
);

const PantallaPagos = lazy(() => import("./componentes/pantalla-pagos"));

const PantallaDetalleRecibo = lazy(() =>
  import("./componentes/pantalla-detalle-recibo")
);

const PantallaFormasPago = lazy(() =>
  import("./componentes/pantalla-formas-pago")
);

const PantallaInicio = lazy(() => import("./componentes/pantalla-inicio"));

const PantallaPagoOtra = lazy(() => import("./componentes/pantalla-pago-otra"));

const PantallaPagoOtraBancos = lazy(() =>
  import("./componentes/pantalla-pago-otra-bancos")
);

const PantallaPagoOtraTiendas = lazy(() =>
  import("./componentes/pantalla-pago-otra-tiendas")
);

const PantallaRecibosFormaPago = lazy(() =>
  import("./componentes/pantalla-recibos-forma-pago")
);

const PantallaInformacionRecibosEndosos = lazy(() =>
  import("./componentes/pantalla-informacion-recibos-endosos")
);

const PantallaFormasDomiciliacion = lazy(() =>
  import("./componentes/pantalla-formas-domiciliacion")
);

const PantallaSolicitudReembolso = lazy(() =>
  import("./componentes/pantalla-solicitud-reembolso")
);

const PantallaDomiciliacion = lazy(() =>
  import("./componentes/pantalla-domiciliacion")
);

const PantallaMisReembolsos = lazy(() =>
  import("./componentes/pantalla-mis-reembolsos")
);

const PantallaResumenReembolso = lazy(() =>
  import("./componentes/pantalla-resumen-reembolso")
);

const PantallaResumenReembolsoV2 = lazy(() =>
  import("./componentes/pantalla-resumen-reembolso-version-dos")
);

const PantallaDetalleReembolso = lazy(() =>
  import("./componentes/pantalla-detalle-reembolso")
);

const PantallaRecomendarCambioContrasena = lazy(() =>
  import("./componentes/pantalla-recomendar-cambio-contrasena")
);

const PantallaTransaccionMitec = lazy(() =>
  import("./componentes/pantalla-transaccion-mitec")
);

const PantallaBotonMedica = lazy(() =>
  import("./componentes/pantalla-boton-medica")
);

const PantallaMisPolizas = lazy(() =>
  import("./componentes/pantalla-mis-polizas")
);

const PantallaDetallePoliza = lazy(() =>
  import("./componentes/pantalla-detalle-poliza")
);

const PantallaEncuestas = lazy(() =>
  import("./componentes/pantalla-encuestas")
);

const PantallaTerminos = lazy(() =>
  import("./componentes/pantalla-terminos-condiciones")
);

const PantallaPrivacidad = lazy(() =>
  import("./componentes/pantalla-privacidad")
);

const PantallaOtrasOpciones = lazy(() =>
  import("./componentes/pantalla-otras-opciones")
);

const PantallaReporteIdentificarPoliza = lazy(() =>
  import("./componentes/pantalla-reporte-poliza")
);

const PantallaNotificaciones = lazy(() =>
  import("./componentes/pantalla-notificaciones")
);

const PantallaPasosReporteRobo = lazy(() =>
  import("./componentes/pantalla-pasos-reporte-robo")
);

const PantallaAgendarCitaRobo = lazy(() =>
  import("./componentes/pantalla-agendar-cita-robo")
);

const PantallaPasosQueHacer = lazy(() =>
  import("./componentes/pantalla-pasos-que-hacer")
);

const PantallaConoceProcesosLegalComponente = lazy(() =>
  import("./componentes/conoce-procesos-legal")
);

const PantallaPreguntasFrecuentesMenu = lazy(() =>
  import("./componentes/pantalla-preguntas-frecuentes-menu")
);

const PantallaCuestionarioReportes = lazy(() =>
  import("./componentes/pantalla-cuestionario-reportes")
);

const PantallaMapeo = lazy(() =>
  import("./pantallas/pantalla-mapeo-compartido/PantallaMapeoCompartido")
);

const { nombreDeCookie } = Constantes;

const CERRAR_SESION = loader(
  "./graphQL/mutation/seguridad/cerrar_sesion.graphql"
);

const REFRESCAR_TOKEN = loader(
  "./graphQL/mutation/seguridad/refrescar_token.graphql"
);

const diccionario = {
  encabezadoModal: "Cierre de sesión automático",
  cuerpoModal1: "<p>Por seguridad tu sesión se cerrará automáticamente en ",
  cuerpoModal2:
    " minutos.</p> <p><strong>¿Deseas extender el tiempo de actividad o cerrar sesión?</strong></p>",
  etiquetaBoton1: "Extender tiempo",
  etiquetaBoton2: "Cerrar sesión",
  encabezadoModalRefrescado: "Nueva actualización HDI Contigo",
  cuerpoModalRefrescado:
    "Hemos trabajado en nuevas funcionalidades y/o ajustes, para seguir brindándote el mejor servicio.",
  etiquetaBotonRefrescado: "Aceptar",
};

let intervaloTiempo = null;

const App = (props) => {
  const history = useHistory();
  const { cookies } = props;
  const cookie = useCookies(["hdi-data"]);
  const dispatch = useDispatch();
  const estadoApp = useSelector((state) => state);
  const location = useLocation();
  // const { rfc } = useParams();
  const [mostrarModalAlerta, asignarValorMostrarModalAlerta] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);
  const [tiempoRestante] = useState("2");
  // const tiempoRestante = useTiempoRestante(tiempoRestanteVariable);
  const [mostrarModalDeRefrescado, asignarValorMostrarModalDeRefrescado] =
    useState(false);
  const [esperarWorker, asignarValorEsperarWorker] = useState(null);

  const alActualizarseServiceWorker = (registration) => {
    asignarValorMostrarModalDeRefrescado(true);
    asignarValorEsperarWorker(registration.waiting);
  };

  const recargarAplicacion = () => {
    if (esperarWorker) {
      esperarWorker.postMessage({ type: "SKIP_WAITING" });
    }
    asignarValorMostrarModalDeRefrescado(false);
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: alActualizarseServiceWorker });
    history.listen(() => {
      // Revisar actualizaciones al cambiar de pantalla
      asignarValorCargando(false);
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((reg) => reg.update()));
    });
  }, []);

  const [cerrarSesionQuery, { loading, error, data }] =
    useMutation(CERRAR_SESION);
  const [
    refrescarSesionQuery,
    { loading: loadingRefrescar, error: errorRefrescar, data: dataRefrescar },
  ] = useMutation(REFRESCAR_TOKEN);

  const monitoreoDeSesion = () => {
    const objetoCookie = cookies.get(nombreDeCookie);
    if (intervaloTiempo) {
      clearTimeout(intervaloTiempo);
    }
    if (objetoCookie) {
      intervaloTiempo = setInterval(() => {
        const objetoCookieActualizado = cookies.get(nombreDeCookie);
        if (objetoCookieActualizado) {
          const diaHoraDeInicioDeSesion =
            objetoCookieActualizado.fechaYHoraDeInicioDeSesion;
          const diaHoraDeExpiracion =
            diaHoraDeInicioDeSesion + objetoCookieActualizado.expires_in;
          const diaHoraActual = moment().unix();
          if (diaHoraActual >= diaHoraDeExpiracion - 120) {
            const tiempoRestanteCalculo = diaHoraDeExpiracion - diaHoraActual;
            if (tiempoRestanteCalculo < 0) {
              asignarValorMostrarModalAlerta(false);
              cookies.remove(nombreDeCookie);
              dispatch({
                type: "BORRAR",
                indice: "fotoPerfil",
              });
              history.push("/");
              if (intervaloTiempo) {
                clearTimeout(intervaloTiempo);
              }
            } else {
              const tiempoFormateado = moment
                .utc(tiempoRestanteCalculo * 1000)
                .format("mm:ss");
              // asignarValorTiempoRestante(tiempoFormateado);
              asignarValorMostrarModalAlerta(true);
            }
          }
        } else {
          history.push("/");
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const objetoCookie = cookies.get(nombreDeCookie);
    if (objetoCookie) {
      monitoreoDeSesion();
    }
    return () => clearTimeout(intervaloTiempo);
  }, []);

  const cerrarSesion = () => {
    const objetoCookie = cookies.get(nombreDeCookie);
    if (objetoCookie) {
      asignarValorMostrarModalAlerta(false);
      clearTimeout(intervaloTiempo);
      cerrarSesionQuery({
        variables: {
          usuario: objetoCookie.Usuario,
          token: objetoCookie.access_token,
        },
      });
    }
  };

  const refrescarToken = () => {
    const objetoCookie = cookies.get(nombreDeCookie);
    if (objetoCookie) {
      asignarValorMostrarModalAlerta(false);
      asignarValorCargando(false);
      clearTimeout(intervaloTiempo);
      refrescarSesionQuery({
        variables: {
          token: objetoCookie.refresh_token,
        },
      });
    }
  };

  useEffect(() => {
    // Comprobamos si estamos dentro de un iframe
    if (window.self !== window.top) {
      window.location.href = "https://hdicontigo.com.mx/";
      // Si estamos en un iframe, redireccionamos a otra página o mostramos un mensaje
      // Por ejemplo:
      // window.location.href = 'https://www.example.com/error-page';
      // O mostrar un mensaje en la página:
      // alert('Esta página no puede ser mostrada en un iframe.');
    }
  }, []);

  useEffect(() => {
    if (!loading && data) {
      if (
        (data.cerrar_sesion && data.cerrar_sesion.dato) ||
        !data.cerrar_sesion.completado
      ) {
        // Borrar cookie y redirigir

        cookies.remove(nombreDeCookie);
        dispatch({
          type: "BORRAR",
          indice: "informacionContacto",
        });
        history.push("/");
      }
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    }
  }, [loading, data]);

  useEffect(() => {
    if (!loadingRefrescar && dataRefrescar) {
      if (dataRefrescar.refrescar_token && dataRefrescar.refrescar_token.dato) {
        // Guardar cookie y redirigir
        asignarValorCargando(false);
        const diaHoraDeInicioDeSesion = moment().unix();
        const nuevoObjetoDeInicioDeSesion = JSON.parse(
          JSON.stringify(dataRefrescar.refrescar_token.dato)
        );
        const antiguoObjetoDeInicioDeSesion = JSON.parse(
          JSON.stringify(cookies.get(nombreDeCookie))
        );
        antiguoObjetoDeInicioDeSesion.fechaYHoraDeInicioDeSesion =
          diaHoraDeInicioDeSesion;
        antiguoObjetoDeInicioDeSesion.access_token =
          nuevoObjetoDeInicioDeSesion.access_token;
        antiguoObjetoDeInicioDeSesion.refresh_token =
          nuevoObjetoDeInicioDeSesion.refresh_token;
        antiguoObjetoDeInicioDeSesion.expires_in =
          nuevoObjetoDeInicioDeSesion.expires_in;
        cookies.remove(nombreDeCookie);
        cookies.set(
          nombreDeCookie,
          JSON.stringify(antiguoObjetoDeInicioDeSesion),
          {
            path: "/",
          }
        );
        // window.location.reload();
        monitoreoDeSesion();
      } else {
        // Borrar cookie y redirigir
        cookies.remove(nombreDeCookie);
        history.push("/");
      }
      asignarValorCargando(false);
    } else if (loadingRefrescar) {
      // asignarValorCargando(true);
    } else if (errorRefrescar) {
      asignarValorCargando(false);
      // Borrar cookie y redirigir
      cookies.remove(nombreDeCookie);
      history.push("/");
    }
  }, [loadingRefrescar, dataRefrescar]);

  const [validaLocal, setValidaLocal] = useState(false);

  useEffect(() => {
    if (window.location.host.includes("localhost:3000")) {
      // La ruta es localhost:3000
      console.log("Estás en localhost:3000");
      setValidaLocal(true);
    }
  }, []);

  return (
    <div className="app">
      {validaLocal && (
        <Button
          style={{
            position: "fixed",
            bottom: "0",
            right: "0",
            zIndex: "99999",
          }}
          onClick={() => {
            console.log("Estado de la app", estadoApp);
            console.log("State", location.state);
            console.log("Session", cookie);
          }}
        >
          Ver estado APP
        </Button>
      )}
      <Alerta
        key="alerta-tiempo"
        textoEncabezado={diccionario.encabezadoModal}
        colorAlerta="amarillo"
        // eslint-disable-next-line max-len
        textoCuerpo={`${diccionario.cuerpoModal1}${tiempoRestante}${diccionario.cuerpoModal2}`}
        mostrarModal={mostrarModalAlerta}
        manejarCierre={() => {
          asignarValorMostrarModalAlerta(false);
        }}
        etiquetaBoton={diccionario.etiquetaBoton1}
        funcionLlamadaBoton={() => {
          refrescarToken();
        }}
        etiquetaBoton2={diccionario.etiquetaBoton2}
        funcionLlamadaBoton2={() => {
          cerrarSesion();
        }}
        temaBoton2="simple"
        mostrarCierre={false}
      />
      <Suspense fallback={null} key={v4()}>
        <Alerta
          textoEncabezado={diccionario.encabezadoModalRefrescado}
          colorAlerta="amarillo"
          tipoIcono="trianguloAlerta"
          textoCuerpo={diccionario.cuerpoModalRefrescado}
          mostrarModal={mostrarModalDeRefrescado}
          manejarCierre={() => {
            asignarValorMostrarModalAlerta(false);
          }}
          etiquetaBoton={diccionario.etiquetaBotonRefrescado}
          funcionLlamadaBoton={() => {
            recargarAplicacion();
          }}
          mostrarCierre={false}
        />
        {/* {cargando ? <IndicadorCarga pantallaCompleta /> : null} */}
        <Switch>
          <Route exact path="/">
            <PantallaBienvenida alIniciarSesion={monitoreoDeSesion} />
          </Route>
          <Route exact path="/codigo-verificacion">
            <PantallaCodigoVerificacion alIniciarSesion={monitoreoDeSesion} />
          </Route>
          <Suspense fallback={null}>
            <Route path="/pantalla-ubicaciob">
              <Ubicacion />
            </Route>
            {/* ESTO ES UNA PRUEBA PORQUE AL MATAR LA APP MATA TODO  */}
            <Route path="/prueba-cookie">
              <PruebaCookie />
            </Route>
            <Route path="/ingreso-gmm">
              <PantallaBienvenidaGMM />
            </Route>
            <Route path="/ingreso-gmm/:poliza/:rfc">
              <PantallaBienvenidaGMM />
            </Route>
            <Route path="/registro-gmm">
              <PantallaRegistroGMM />
            </Route>
            <Route path="/registro-gmm/:poliza/:rfc">
              <PantallaRegistroGMM />
            </Route>
            <Route path="/hospitales-consultorios">
              <PantallaBotonMedica />
            </Route>
            <Route path="/contrasena-olvidada">
              <PantallaContrasenaOlvidada />
            </Route>
            <Route path="/contrasena-cambiar">
              <PantallaContrasenaCambiar />
            </Route>
            <Route path="/contrasena-establecer">
              <PantallaContrasenaEstablecer />
            </Route>
            <Route path="/contrasena-pago-deducible">
              <PantallaContrasenaPagoDeducible />
            </Route>
            <Route path="/restablecer-contrasena">
              <PantallaContrasenaRestablecer />
            </Route>
            <Route path="/ingreso-poliza">
              <PantallaIngresoDePoliza />
            </Route>
            <Route path="/reporte-identificar">
              <PantallaReporteIdentificarPoliza />
            </Route>
            <Route path="/enviar-sms">
              <PantallaEnviarSMS />
            </Route>
            <Route path="/seleccionar-numero">
              <PantallaSeleccionarNumero />
            </Route>
            <Route path="/recuperar-poliza">
              <PantallaRecuperarPolizaComponente />
            </Route>
            <Route path="/solicitud-reembolso">
              <PantallaSolicitudReembolso />
            </Route>
            <Route path="/cuestionario-reporte">
              <PantallaCuestionarioReporte />
            </Route>
            <Route path="/informacion-complementaria">
              <PantallaFormularioInformacionContacto />
            </Route>
            <Route path="/informacion-complementaria-vehiculo-grua">
              <PantallaFormularioInformacionVehiculoGrua />
            </Route>
            <Route path="/informacion-complementaria-vehiculo-cristal">
              <PantallaFormularioInformacionVehiculoCristal />
            </Route>
            <Route path="/subir-fotos-grua">
              <PantallaSubirFotosGrua />
            </Route>
            <Route path="/subir-fotos-robo">
              <PantallaSubirFotosRobo />
            </Route>
            <Route exact path="/ubicacion">
              <PantallaUbicacionMapa />
            </Route>
            <Route path="/creacion-cuenta">
              <PantallaCreacionCuenta />
            </Route>
            <Route path="/resumen-reporte">
              <PantallaResumenReporte />
            </Route>
            <Route path="/editar-informacion-complementaria">
              <PantallaEditarInformacionContacto />
            </Route>
            <Route path="/cuenta-creada">
              <PantallaConfirmacionCuentaCreada />
            </Route>
            <Route path="/menu-espera">
              <PantallaMenuEspera />
            </Route>
            <Route path="/recomendaciones">
              <PantallaRecomendaciones />
            </Route>
            <Route path="/compartir-siniestro">
              <PantallaCompartirSiniestro />
            </Route>
            <Route path="/seguimiento-ajustador">
              <PantallaSeguimientoMapa />
            </Route>
            <Route path="/subir-fotos">
              <PantallaSubirFotosDocumentos />
            </Route>
            <Route path="/pasos-progreso">
              <PantallaPasosProgreso />
            </Route>
            <Route path="/pasos-progreso-grua">
              <PantallaPasosProgresoGrua />
            </Route>
            <Route path="/cancelar-grua">
              <PantallaCancelarGrua />
            </Route>
            <Route path="/evaluacion-ajustador">
              <PantallaEvaluacionAjustador />
            </Route>
            <Route path="/evaluacion-taller">
              <PantallaEvaluacionTaller />
            </Route>
            <Route path="/polizas-siniestradas">
              <PantallaPolizasSiniestradas />
            </Route>
            <Route path="/verificar-telefono">
              <PantallaVerificarTelefono />
            </Route>
            <Route path="/mi-cuenta">
              <PantallaCuenta />
            </Route>
            <Route path="/registro-usuario/:poliza/:rfc">
              <AcordeonRegistroPoliza />
            </Route>
            <Route path="/registro-usuario">
              <AcordeonRegistroPoliza />
            </Route>
            <Route path="/registro-usuario-sms">
              <PantallaRegistroUsuarioSMS />
            </Route>
            <Route path="/registro-usuario-biometrico">
              <PantallaRegistroUsuarioBiometrico />
            </Route>
            <Route path="/mis-polizas">
              <PantallaMisPolizas />
            </Route>
            <Route path="/mis-reembolsos">
              <PantallaMisReembolsos />
            </Route>
            <Route path="/resumen-reembolso">
              <PantallaResumenReembolso />
            </Route>
            <Route path="/resumen-reembolso-v2">
              <PantallaResumenReembolsoV2 />
            </Route>
            <Route path="/detalle-reembolso">
              <PantallaDetalleReembolso />
            </Route>
            <Route path="/detalle-poliza">
              <PantallaDetallePoliza />
            </Route>
            <Route path="/informacion-pagos">
              <PantallaInformacionPagos />
            </Route>
            <Route path="/registro-poliza">
              {/* <PantallaRegistroPoliza /> */}
              <AcordeonRegistroPoliza pantalla="registro-poliza" />
            </Route>
            <Route path="/pagos">
              <PantallaPagos />
            </Route>
            <Route path="/detalle-recibo">
              <PantallaDetalleRecibo />
            </Route>
            <Route path="/formas-pago">
              <PantallaFormasPago />
            </Route>
            <Route path="/formas-domiciliacion">
              <PantallaFormasDomiciliacion />
            </Route>
            <Route path="/inicio">
              <PantallaInicio />
            </Route>
            <Route path="/pago-otra">
              <PantallaPagoOtra />
            </Route>
            <Route path="/pago-otra-bancos">
              <PantallaPagoOtraBancos />
            </Route>
            <Route path="/pago-otra-tiendas">
              <PantallaPagoOtraTiendas />
            </Route>
            <Route path="/recibos-forma-pago">
              <PantallaRecibosFormaPago />
            </Route>
            <Route path="/informacion-recibos-endosos">
              <PantallaInformacionRecibosEndosos />
            </Route>
            <Route path="/domiciliacion">
              <PantallaDomiciliacion />
            </Route>
            <Route path="/transaccion-mitec">
              <PantallaTransaccionMitec />
            </Route>
            <Route path="/recomendar-contrasena">
              <PantallaRecomendarCambioContrasena />
            </Route>
            <Route path="/elegir-siniestro">
              <AcordeonElegirSiniestro />
            </Route>
            <Route path="/encuestas">
              <PantallaEncuestas />
            </Route>
            <Route path="/elegir-encuesta">
              <PantallaElegirEncuesta />
            </Route>
            <Route path="/terminos">
              <PantallaTerminos />
            </Route>
            <Route path="/privacidad">
              <PantallaPrivacidad />
            </Route>
            <Route path="/otros">
              <PantallaOtrasOpciones />
            </Route>
            <Route path="/notificaciones">
              <PantallaNotificaciones />
            </Route>
            <Route path="/preguntas-frecuentes">
              <PantallaPreguntasFrecuentesPT />
            </Route>
            <Route path="/preguntas-menu">
              <PantallaPreguntasFrecuentesMenu />
            </Route>
            <Route path="/documentacion-indemnizacion">
              <PantallaDocumentacionPT />
            </Route>
            <Route path="/indemnizacion-vehiculo">
              <IndemnizacionVehiculo />
            </Route>
            <Route path="/indemnizacion-opciones">
              <PantallaIndemnizacion />
            </Route>
            <Route path="/conoce-proceso">
              <PantallaProcesoIndemnizacion />
            </Route>
            <Route path="/asistencia-hdi">
              <PantallaAsistenciaHDI />
            </Route>
            <Route path="/seleccionar-poliza-recuperar">
              <PantallaSeleccionarPolizaRecuperada />
            </Route>

            <Route path="/encontrar-taller">
              <PantallaBusquedaTalleres />
            </Route>

            <Route path="/conoce-procesos-legal">
              <PantallaConoceProcesosLegalComponente />
            </Route>

            {/* Rutas para flujo de robo */}
            <Route path="/conoce-que-hacer">
              <PantallaPasosReporteRobo />
            </Route>

            <Route path="/conoce-que-hacer-n">
              <PantallaPasosQueHacer />
            </Route>

            <Route path="/cuestionario-reportes">
              <PantallaCuestionarioReportes />
            </Route>

            <Route path="/robo/info-complementaria">
              <PantallaRoboInfoExtra />
            </Route>

            <Route path="/ubicacion-robo">
              <PantallaUbicacionRobo />
            </Route>

            <Route path="/vehiculo-encontrado">
              <PantallaVehiculoLocalizado />
            </Route>

            <Route path="/resumen-reportes">
              <ResumenReporteRobo />
            </Route>

            <Route path="/menu-espera-robo">
              <PantallaMenuEsperaRobo />
            </Route>

            <Route path="/agendar-cita-robo">
              <PantallaAgendarCitaRobo />
            </Route>

            <Route path="/recupera-vehiculo">
              <PantallaRecuperaVehiculo />
            </Route>

            <Route path="/requisitos-liberacion-vehiculo">
              <PantallaRequisitosLiberacionVehiculo />
            </Route>

            <Route path="/requisitos-reunion-ajustador">
              <PantallaRequisitosReunionAjustador />
            </Route>

            {/* Terminan Rutas para flujo de robo */}

            {/* Pantalla para credencial digital */}
            <Route path="/credencial-gmm">
              <PantallaCredencialGmm />
            </Route>

            {/* Ruta para cristaleras */}
            <Route path="/cristaleras">
              <PantallaCristaleras />
            </Route>

            {/* <Route path="/isometrico">
              <PantallaIsometrico />
            </Route> */}
            {/* <Route path="**">
              <Redirect to="/" />
            </Route> */}

            <Route path="/pagina-de-error">
              <PantallaError />
            </Route>

            <Route path="/mapeo-compartido/:datos">
              <PantallaMapeo />
            </Route>
          </Suspense>
        </Switch>
      </Suspense>
    </div>
  );
};

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(App);

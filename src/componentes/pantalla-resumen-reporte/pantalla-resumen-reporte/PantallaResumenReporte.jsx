/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import {
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/react-hooks";
import moment from "moment";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import IndicadorCarga from "../../indicador-carga";
import Configuraciones from "../../../servicios/configuraciones";
import {
  ContenedorBoton,
  ContenedorParrafo,
  Etiqueta,
  LinkEditar,
  ContenedorTextoEditar,
  Seccion,
  Separador,
  SeparadorBarraProgreso,
  SeparadorEspacio,
  SeparadorLinea,
  Titulo,
  Valor,
} from "./PantallaResumenReporte.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import Boton from "../../boton";
import { Alerta } from "../../alerta";
import "./estilos.scss";
import Constantes from "../../../recursos/constantes";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import useNotificaciones from "../../../utils/useNotificaciones";

const CREAR_REPORTE_ASYNC = loader(
  "../../../graphQL/mutation/reporte/generar_reporte_async.graphql"
);

const GENERA_REPORTE_GRUA = loader(
  "../../../graphQL/mutation/grua/grua_generarReporteGrua.graphql"
);

const GRUA_INSERTAR_CUESTIONARIO_ASISTENCIA = loader(
  "../../../graphQL/query/grua/grua_InsertarCuestionarioAsistencia.graphql"
);

const SUSCRIPCION_ACTUALIZACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const { nombreDeCookie } = Constantes;

let count = 0;

const PantallaResumenReporte = () => {
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreDeCookie]);
  const [
    gruaInsertaCuestionarioAsistencia,
    { loading: loadingG, error: errorG, data: dataG },
  ] = useLazyQuery(GRUA_INSERTAR_CUESTIONARIO_ASISTENCIA, {
    fetchPolicy: "network-only",
  });
  const [crearReporte, { loading, error, data }] =
    useMutation(CREAR_REPORTE_ASYNC);
  const [
    crearReporteGrua,
    { loading: loadingRG, error: errorRG, data: dataRG },
  ] = useMutation(GENERA_REPORTE_GRUA, {
    fetchPolicy: "network-only",
  });
  const paginaAnterior = "/ubicacion";

  const [mostrarModalError, asignarValorMostrarModalError] = useState(false);
  const [mostrarModalExitoso, asignarValorMostrarModalExitoso] =
    useState(false);

  const [
    mostrarModalAsistenciaRapida,
    asignarValorMostrarModalAsistenciaRapida,
  ] = useState(false);
  const [
    mostrarModalGruaVerificacionInformacion,
    asignarValorGruaVerificacionInformacion,
  ] = useState(false);
  const [mostrarModalGruaExito, asignarValorGruaExito] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);
  const [numeroReporte, asignarValorNumeroReporte] = useState("");
  const [,] = useState("");
  const [
    numeroReporteActualizaciones,
    asignarValorNumeroReporteActualizaciones,
  ] = useState("");
  const { crearNotificacion } = useNotificaciones();

  const { data: nuevosEventos } = useSubscription(SUSCRIPCION_ACTUALIZACIONES, {
    variables: { numeroReporte: numeroReporteActualizaciones },
  });

  let barraProgreso;
  let noElementos;
  if (
    estadoApp &&
    (estadoApp.semaforoAmarillo ||
      (estadoApp.datosIngresoPoliza &&
        estadoApp.datosIngresoPoliza.fechaPasada))
  ) {
    barraProgreso = 3;
    noElementos = 3;
  } else {
    barraProgreso = 4;
    noElementos = 4;
  }

  let nombreUsuario =
    estadoApp.datosPoliza && estadoApp.datosPoliza.nombreCompletoAsegurado
      ? estadoApp.datosPoliza.nombreCompletoAsegurado
      : "";
  if (
    estadoApp.cuestionarioReporte &&
    estadoApp.cuestionarioReporte.respuesta6 === false
  ) {
    nombreUsuario = `${estadoApp.nombreConductor}|${estadoApp.apellidoPaterno}|${estadoApp.apellidoMaterno}`;
  }

  const environment = process.env.REACT_APP_API_URL;
  console.log("environment", environment);

  const diccionario = {
    encabezado: "Generando reporte",
    encabezadoGrua: "Asistencia grúa",
    barraProgresoTitulo: "Confirmación de datos",
    barraProgresoTituloGrua: "Resumen del reporte",
    titulo: "Verifica la información de tu reporte",
    separadorPoliza: "Datos de la póliza",
    separadorInfo: "Info. Complementaria",
    separadorUbicacion: "Ubicación",
    separadorPolizaGrua: "Información de la póliza",
    etiquetaBotonContinuar: "Generar reporte",
    etiquetaBotonContinuarGrua: "Continuar",
    editar: "Editar",
    etiquetas: {
      poliza: "Número de póliza",
      fecha: "Fecha del siniestro",
      vehiculo: "Modelo del vehículo",
      telefono: "Teléfono",
      email: "Correo electrónico",
      color: "Color del vehículo",
      placas: "Placas del vechículo",
      ubicacion: "Ubicación",
      referencias: "Referencias",
    },
    gruaInformacionReporte: {
      separadorInfo: "Información del reporte",
      etiquetas: {
        quienReporta: "Quien reporta",
        telefono: "Teléfono",
        placas: "Placas del vehículo",
        color: "Color del vehículo",
        declaraicon: "Declaración del siniestro",
      },
    },
    gruaInformacioubicacion: {
      separadorUbicacion: "Información de ubicación",
      etiquetas: {
        ubicacionActual: "Ubicación actual",
        ubicaciónDestino: "Ubicación destino",
      },
    },
    gruaAlertaVerificaInformacion: {
      textoEncabezado: "Importante",
      colorAlerta: "verde",
      textoCuerpo:
        "Antes de crear el reporte, asegúrate de que los datos que proporcionaste sean correctos, ya que, esto es esencial para que el proveedor pueda brindarte el servicio.",
      tipoIcono: "trianguloAlerta",
      etiquetaBoton: "Generar reporte",
    },
    gruaExitoso: {
      textoEncabezado: "Reporte generado",
      colorAlerta: "verde",
      textoCuerpo: `Tu reporte se ha generado exitosamente.  le proporcionamos su número de referencia: <br><br>  ${numeroReporteActualizaciones}.`,
      // textoCuerpoJsx: `Tu reporte se ha generado exitosamente.  te proporcionamos su número de referencia: ${numeroReporteActualizaciones}  Descarga el volante para que el proveedor te brinde el servicio.`,
      tipoIcono: "palomita",
      etiquetaBoton: "Aceptar",
    },
    error: {
      titulo: "Ocurrió un problema",
      cuerpo:
        "No pudimos generar tu reporte, te sugerimos intentarlo de nuevo.",
      boton: "Intentar nuevamente",
      boton2: "Llamar a HDI *434",
    },
    exitoso: {
      titulo: "Reporte generado",
      cuerpo: `Gracias, ${nombreUsuario.replace(
        "|",
        " "
      )}. Este es tu número de reporte: ${numeroReporte}`,
      boton: "Aceptar",
    },
    asistenciaRapida: {
      titulo: "Asistencia rápida",
      /* eslint-disable max-len */
      cuerpo: `${nombreUsuario.replace(
        "|",
        " "
      )}, tu siniestro fue elegido para ser atendido por nuestra herramienta Ajustador Digital, donde te brindaremos resolución de tu siniestro en menos de 2 horas hábiles.`,
      boton: "Continuar",
    },
  };

  const quienReportaInfoVehiculo =
    estadoApp.informacionVehiculo && estadoApp.informacionVehiculo.quienReporta
      ? estadoApp.informacionVehiculo.quienReporta
      : "";
  const telefonoInfoVehiculo =
    estadoApp.informacionVehiculo && estadoApp.informacionVehiculo.telefono
      ? estadoApp.informacionVehiculo.telefono
      : "";
  const placasInfoVehiculo =
    estadoApp.informacionVehiculo && estadoApp.informacionVehiculo.placas
      ? estadoApp.informacionVehiculo.placas
      : "";
  const colorVehiculoInfoVehiculo =
    estadoApp.informacionVehiculo && estadoApp.informacionVehiculo.colorVehiculo
      ? estadoApp.informacionVehiculo.colorVehiculo
      : "";
  const comoOcurrioSiniestroInfoVehiculo =
    estadoApp.informacionVehiculo &&
    estadoApp.informacionVehiculo.comoOcurrioSiniestro
      ? estadoApp.informacionVehiculo.comoOcurrioSiniestro
      : "";

  const poliza = estadoApp.datosIngresoPoliza
    ? estadoApp.datosIngresoPoliza.poliza
    : "";

  /* eslint-disable no-unused-vars */
  const arregloRespuestas =
    estadoApp.informacionVehiculo &&
    estadoApp.informacionVehiculo.arregloRespuestas
      ? estadoApp.informacionVehiculo.arregloRespuestas
      : [];

  const telefonoContacto = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.telefono
    : "";

  const fechaOcurrencia = estadoApp.datosIngresoPoliza
    ? estadoApp.datosIngresoPoliza.fechaOcurrencia
    : "";

  const datosVehiculo = estadoApp.datosPoliza
    ? estadoApp.datosPoliza.datosVehiculo
    : "";

  const emailContacto = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.email
    : "";

  const colorVehiculo = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.color
    : "";

  const placasVehiculo = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.placas
    : "";

  const continuarLineaTiempo = () => {
    history.push("/pasos-progreso-grua");
  };

  const reporteGeneradoGrua = () => {
    crearReporteGrua({
      variables: {
        fechaOcurrencia: estadoApp.datosIngresoPoliza.fechaOcurrencia,
        vin: estadoApp.datosPoliza.vin,
        color: estadoApp.informacionVehiculo.colorVehiculo,
        placas: estadoApp.informacionVehiculo.placas
          ? estadoApp.informacionVehiculo.placas
          : "",
        linkFotosVehiculo: "",
        numeroCertificado: 1,
        lineaNegocio: estadoApp.datosPoliza.lineaNegocio,
        nombreCompletoReporta: estadoApp.informacionVehiculo.quienReporta,
        reportaConductor: true,
        reportaAsegurado: true,
        telefonoAsegurado: estadoApp.informacionVehiculo.telefono,
        longitud: estadoApp.coordenadasIniciales.lng,
        latitud: estadoApp.coordenadasIniciales.lat,
        referencia: estadoApp.referencias,
        esTradicional: true,
        declaracion: estadoApp.informacionVehiculo.comoOcurrioSiniestro,
        longitudD: estadoApp.coordenadasInicialesDestino.lng,
        latitudD: estadoApp.coordenadasInicialesDestino.lat,
        carretera: estadoApp.informacionVehiculo.respuesta5 ? 1 : 0,
        tipoFalla: estadoApp.tipoFalla,
        direccionOrigen: estadoApp.ubicacion,
        direccionDestino: estadoApp.ubicacionDestino,
        idSubEvento: 1,
        funcionaNeutral: estadoApp.informacionVehiculo.respuesta1,
        vehiculoAvanza: estadoApp.informacionVehiculo.respuesta2,
        tieneCarga: estadoApp.informacionVehiculo.respuesta3,
        aPieDeCalle: estadoApp.informacionVehiculo.respuesta4,
        enTramoCarretero: estadoApp.informacionVehiculo.respuesta5,
      },
    });
  };

  const validarGrua = () => {
    asignarValorGruaVerificacionInformacion(true);
  };

  const onClickEditarInfo = () => {
    dispatch({
      type: "AGREGAR",
      valor: true,
      indice: "patallaReporte",
    });

    history.push(
      estadoApp.seatedClaim === "tow"
        ? "/informacion-complementaria-vehiculo-grua"
        : "/editar-informacion-complementaria"
    );
  };

  const generarReporte = () => {
    let esTradicional = false;

    if (
      estadoApp.datosIngresoPoliza &&
      estadoApp.datosIngresoPoliza.fechaPasada
    ) {
      // Si el accidente ocurrió en un día previo, el cuestionario y el
      // estado del semáforo se ignoran, el ajustador debe ser digital.
      esTradicional = false;
    } else if (
      estadoApp.semaforoAmarillo ||
      (estadoApp.cuestionarioReporte &&
        (estadoApp.cuestionarioReporte.respuesta1 ||
          estadoApp.cuestionarioReporte.respuesta2 ||
          estadoApp.cuestionarioReporte.respuesta3 ||
          estadoApp.cuestionarioReporte.respuesta4 ||
          // estadoApp.cuestionarioReporte.respuesta5 ||
          estadoApp.cuestionarioReporte.respuesta7 ||
          !estadoApp.cuestionarioReporte.respuesta8 ||
          estadoApp.datosPoliza.contieneModulos))
    ) {
      // Si el incidente fue hoy, y las primeras cinco respuestas del cuestionario son SÍ o el usuario
      // se saltó el cuestionario por ser semáforo amarillo, se usará el ajustador tradicional.
      esTradicional = true;
    }

    if (estadoApp.seatedClaim === "tow") {
      validarGrua();
    }
    if (estadoApp.seatedClaim === "crash") {
      crearReporte({
        variables: {
          esTradicional,
          idSubEvento: 9,
          reportaConductor: estadoApp.cuestionarioReporte
            ? estadoApp.cuestionarioReporte.respuesta6
            : true,
          nombreCompletoReporta: nombreUsuario,
          fechaOcurrencia: estadoApp.datosIngresoPoliza.fechaOcurrencia,
          vin: estadoApp.datosPoliza.vin,
          color: estadoApp.informacionContacto.color,
          placas: estadoApp.informacionContacto.placas
            ? estadoApp.informacionContacto.placas
            : "",
          numeroCertificado: 1,
          telefonoAsegurado: estadoApp.informacionContacto.telefono,
          correo: estadoApp.informacionContacto.email
            ? estadoApp.informacionContacto.email
            : "",
          longitud: estadoApp.coordenadasIniciales.lng,
          latitud: estadoApp.coordenadasIniciales.lat,
          lineaNegocio: estadoApp.datosPoliza.lineaNegocio,
          reportaAsegurado: estadoApp.cuestionarioReporte
            ? estadoApp.cuestionarioReporte.respuesta6
            : true,
          referencia: estadoApp.referencias,
        },
      });
    }
  };

  const pasoSiguiente = () => {
    const objetoCookie = cookie[nombreDeCookie];
    if (
      !estadoApp.datosReporte.usuarioRegistrado &&
      !(
        objetoCookie &&
        estadoApp.informacionContacto.telefono === objetoCookie.Telefono
      )
    ) {
      history.push("/creacion-cuenta");
    } else if (estadoApp.datosReporte.esTradicional) {
      if (estadoApp.seatedClaim === "tow") {
        history.push("/pasos-progreso-grua");
      }
      else {
        history.push("/menu-espera");
      }
    } else if (!estadoApp.datosReporte.esTradicional) {
      asignarValorMostrarModalAsistenciaRapida(true);
    }
  };

  const ligaAjustadorDigital = () => {
    if (
      estadoApp &&
      estadoApp.datosReporte &&
      estadoApp.datosReporte.urlAjustadorDigital
    ) {
      window.location.replace(estadoApp.datosReporte.urlAjustadorDigital);
    }
    history.push("/");
  };

  // ---------------- METODOS PARA SUBIR LAS FOTOS ------------------
  const cargarImagenes = async () => {
    if (
      estadoApp.datosImagenesEstado &&
      estadoApp.datosImagenesEstado.length > 0
    ) {
      const copiaArreglo = [...estadoApp.datosImagenesEstado];
      asignarValorCargando(true);
      for (let i = 0; i < estadoApp.datosImagenesEstado.length; i += 1) {
        const {
          imagen,
          error: errorEnObjeto,
          nombreImagen,
          seCargoAServidor,
        } = estadoApp.datosImagenesEstado[i];
        if (imagen && !errorEnObjeto && !seCargoAServidor) {
          // eslint-disable-next-line no-await-in-loop
          const response = await cargaImagenAServidor(imagen, nombreImagen);
          const { completado, error: errorEncarga } = response;
          if (!errorEncarga && completado) {
            copiaArreglo[i].seCargoAServidor = true;
          }
        }
      }
    }
    asignarValorCargando(false);
    asignarValorGruaExito(true);
  };

  const cargaImagenAServidor = async (imagenBase64, nombreImagen) => {
    const imagenBase64Datos = await fetch(imagenBase64);
    const imagenBlob = await imagenBase64Datos.blob();
    if (imagenBlob) {
      const respuestaServidor = await fetch(
        `${Configuraciones.api}/reporte/imagen/${estadoApp.numeroReporteGrua}/${estadoApp.informacionVehiculo.telefono}/${nombreImagen}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
          },
          body: imagenBlob,
        }
      )
        .then((respuesta) => respuesta.json())
        .then((respuesta) => respuesta)
        .catch((errorEnRespuesta) => ({ error: errorEnRespuesta }));
      return respuestaServidor;
    }
    return null;
  };

  useEffect(() => {
    if (
      !loading &&
      data &&
      data.generar_reporte_async &&
      data.generar_reporte_async.completado
    ) {
      asignarValorNumeroReporteActualizaciones(data.generar_reporte_async.dato);
      const nombreConductor = estadoApp.nombreConductor || "";
      const apellidoPaterno = estadoApp.apellidoPaterno || "";
      const apellidoMaterno = estadoApp.apellidoMaterno || "";

      const nombreCompleto = `${apellidoPaterno} ${apellidoMaterno} ${nombreConductor}`;
      crearNotificacion(
        "Reporte generado",
        `Gracias ${nombreCompleto} hemos generado tu reporte con éxito <b>${data.generar_reporte_async.dato}</b>`,
        "noti/reporteSiniestro/reporteGenerado",
        `{"numeroReporte": ${data.generar_reporte_async.dato}}`,
        estadoApp.informacionContacto.telefono
      );
    } else if (error) {
      asignarValorCargando(false);
      asignarValorMostrarModalError(true);
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, numeroReporte, loading]);

  /* Efecto para insertar el reprote de grua */
  useEffect(() => {
    if (!loadingRG && dataRG) {
      if (dataRG.grua_generarReporteGrua.completado) {
        switch (dataRG.grua_generarReporteGrua.codigo) {
          case "IMGW10001":
            dispatch({
              type: "AGREGAR",
              valor: dataRG.grua_generarReporteGrua.dato,
              indice: "numeroReporteGrua",
            });
            asignarValorNumeroReporteActualizaciones(
              dataRG.grua_generarReporteGrua.dato
            );
            break;
          case "ERR00001":
            asignarValorCargando(false);
            break;
          default:
        }
      } else {
        asignarValorCargando(false);
        asignarValorGruaVerificacionInformacion(false);
        asignarValorMostrarModalError(true);
      }
    } else if (errorRG) {
      asignarValorCargando(false);
      asignarValorGruaVerificacionInformacion(false);
      asignarValorMostrarModalError(true);
    } else if (loadingRG) {
      asignarValorCargando(true);
    }
  }, [loadingRG, dataRG]);

  /* Este efecto se usa para insertar las preguntas del cuestionario 
  cuando termina da paso a insertar el reporte */
  useEffect(() => {
    if (!loadingG && dataG) {
      switch (dataG.grua_InsertarCuestionarioAsistencia.codigo) {
        case "IMPOL20000":
          if (count >= 0 && count <= 4) {
            gruaInsertaCuestionarioAsistencia({
              variables: {
                // rep_num: numeroReporteGrua,
                rep_num: estadoApp.numeroReporteGrua,
                num_preg: count,
                valor: arregloRespuestas[count - 1] ? 1 : 0,
              },
            });
          } else if (count === 5) {
            // AQUI TERMINA EL CICLO
            gruaInsertaCuestionarioAsistencia({
              variables: {
                // rep_num: numeroReporteGrua,
                rep_num: estadoApp.numeroReporteGrua,
                num_preg: count,
                valor: arregloRespuestas[count - 1] ? 1 : 0,
              },
            });
            // ///// MOVER ESTO AL SIGUIENTE PROCESO QUE INSERTARA EL REPORTE
            asignarValorCargando(false);
            asignarValorGruaExito(true);
            // /////////////////////////////////////////////////////////////////
          }

          break;
        case "ERR00001":
          asignarValorCargando(false);
          break;
        default:
      }
    } else if (errorG) {
      console.log(errorG, "errorG");
      asignarValorCargando(false);
    } else if (loadingG) {
      if (count === 0) {
        asignarValorCargando(true);
      }
      // setCount((x) => x + 1);
      count = count += 1;
    }
  }, [loadingG, dataG]);

  useEffect(() => {
    console.log(`Nuevos Eventos resumen: ${JSON.stringify(nuevosEventos)}`);
    if (
      nuevosEventos &&
      nuevosEventos.escucha_evento_actualizacion_reporte &&
      nuevosEventos.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      console.log(nuevosEventos);
      const datosNuevoEvento =
        nuevosEventos.escucha_evento_actualizacion_reporte;
      switch (datosNuevoEvento.tipoMensaje) {
        case 20:
          {
            const numeroReporteMensaje = obtenerValorDeArregloDeStrings(
              datosNuevoEvento.dato.descripciones,
              "NumeroReporte: "
            ).trim();
            if (numeroReporteMensaje) {
              const esTradicional = obtenerValorDeArregloDeStrings(
                datosNuevoEvento.dato.descripciones,
                "EsTradicional: "
              ).trim();
              const usuarioRegistrado = obtenerValorDeArregloDeStrings(
                datosNuevoEvento.dato.descripciones,
                "UsuarioRegistrado: "
              ).trim();
              const urlAjustadorDigital = obtenerValorDeArregloDeStrings(
                datosNuevoEvento.dato.descripciones,
                "UrlAjustadorDigital: "
              ).trim();
              const respuesta = {
                esTradicional: esTradicional === "True",
                numeroReporte: numeroReporteMensaje,
                urlAjustadorDigital,
                usuarioRegistrado: usuarioRegistrado.toLowerCase() === "true",
              };
              dispatch({
                type: "AGREGAR",
                valor: respuesta,
                indice: "datosReporte",
              });
              asignarValorCargando(false);
              asignarValorNumeroReporte(numeroReporteMensaje);
              asignarValorMostrarModalExitoso(true);
              asignarValorGruaVerificacionInformacion(false);
            } else {
              asignarValorCargando(false);
              asignarValorMostrarModalError(true);
            }
          }
          break;
        case 29:
          {
            const numeroReporteMensaje = datosNuevoEvento.numeroReporte;
            if (numeroReporteMensaje) {
              if (environment === "QA") {
                asignarValorCargando(false);
                asignarValorGruaExito(true);
              } else {
                cargarImagenes();
              }
            } else {
              asignarValorCargando(false);
              asignarValorMostrarModalError(true);
            }
          }
          break;
        default:
      }
    }
  }, [nuevosEventos]);

  return (
    <EnvolvedorPantalla key={v4()} id="pantallaResumenReporte">
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        textoEncabezado={diccionario.error.titulo}
        colorAlerta="rojo"
        textoCuerpo={diccionario.error.cuerpo}
        mostrarModal={mostrarModalError}
        etiquetaBoton={diccionario.error.boton}
        funcionLlamadaBoton={() => {
          asignarValorMostrarModalError(false);
        }}
        etiquetaBoton2={diccionario.error.boton2}
        funcionLlamadaBoton2={() => {
          window.location.href = "tel:*434";
        }}
        temaBoton2="simple"
        mostrarCierre={false}
      />
      <Alerta
        textoEncabezado={diccionario.exitoso.titulo}
        colorAlerta="verde"
        textoCuerpo={diccionario.exitoso.cuerpo}
        tipoIcono="palomita"
        mostrarModal={mostrarModalExitoso}
        mostrarCierre={false}
        etiquetaBoton={diccionario.exitoso.boton}
        funcionLlamadaBoton={pasoSiguiente}
      />
      <Alerta
        textoEncabezado={diccionario.asistenciaRapida.titulo}
        colorAlerta="azul"
        textoCuerpo={diccionario.asistenciaRapida.cuerpo}
        mostrarModal={
          mostrarModalAsistenciaRapida ||
          (estadoApp &&
            estadoApp.datosReporte &&
            estadoApp.datosReporte.asistenciaRapida)
        }
        mostrarCierre={false}
        etiquetaBoton={diccionario.asistenciaRapida.boton}
        funcionLlamadaBoton={ligaAjustadorDigital}
      />
      <Alerta
        {...diccionario.gruaAlertaVerificaInformacion}
        mostrarModal={mostrarModalGruaVerificacionInformacion}
        funcionLlamadaBoton={reporteGeneradoGrua}
        manejarCierre={() => asignarValorGruaVerificacionInformacion(false)}
      />
      <Alerta
        {...diccionario.gruaExitoso}
        mostrarModal={mostrarModalGruaExito}
        funcionLlamadaBoton={continuarLineaTiempo}
        mostrarCierre={false}
      />
      <Encabezado
        titulo={
          estadoApp.seatedClaim === "tow"
            ? diccionario.encabezadoGrua
            : diccionario.encabezado
        }
        funcionRegresar={() => {
          history.push(paginaAnterior);
        }}
        alertaAmarilla={estadoApp && estadoApp.semaforoAmarillo}
      />
      <SeparadorBarraProgreso />
      <Pantalla>
        <BarraProgresoReporte
          grua={estadoApp.seatedClaim === "tow"}
          progreso={estadoApp.seatedClaim === "tow" ? 5 : barraProgreso}
          numeroElementos={estadoApp.seatedClaim === "tow" ? 5 : noElementos}
          titulo={
            estadoApp.seatedClaim === "tow"
              ? diccionario.barraProgresoTituloGrua
              : diccionario.barraProgresoTitulo
          }
        />
        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        <SeparadorEspacio />
        <Seccion>
          <Separador
            id="separadorPoliza"
            claim={estadoApp.seatedClaim === "tow"}
          >
            {estadoApp.seatedClaim === "tow" && diccionario.separadorPolizaGrua}
            {estadoApp.seatedClaim === "crash" && diccionario.separadorPoliza}
          </Separador>
        </Seccion>
        <SeparadorLinea />
        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">
            {diccionario.etiquetas.poliza}
          </Etiqueta>
          <Valor id="valorPoliza">{poliza}</Valor>
        </ContenedorParrafo>
        {estadoApp.seatedClaim === "crash" && (
          <ContenedorParrafo>
            <Etiqueta id="etiquetaFecha">
              {diccionario.etiquetas.fecha}
            </Etiqueta>
            <Valor id="valorFecha">
              {moment(fechaOcurrencia).format("DD/MM/YY")}
            </Valor>
          </ContenedorParrafo>
        )}
        <ContenedorParrafo>
          <Etiqueta id="etiquetaVehiculo">
            {diccionario.etiquetas.vehiculo}
          </Etiqueta>
          <Valor id="valorVehiculo">{datosVehiculo}</Valor>
        </ContenedorParrafo>
        <SeparadorEspacio />
        <Seccion>
          <Separador id="separadorInfo" claim={estadoApp.seatedClaim === "tow"}>
            {estadoApp.seatedClaim === "tow" &&
              diccionario.gruaInformacionReporte.separadorInfo}
            {estadoApp.seatedClaim === "crash" && diccionario.separadorInfo}
          </Separador>
          <LinkEditar id="editarInfo" onClick={onClickEditarInfo}>
            <ContenedorTextoEditar>{diccionario.editar}</ContenedorTextoEditar>
            <EditRoundedIcon style={{ fontSize: 16 }} />
          </LinkEditar>
        </Seccion>
        <SeparadorLinea />
        {estadoApp.seatedClaim === "crash" && (
          <>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaTelefono">
                {diccionario.etiquetas.telefono}
              </Etiqueta>
              <Valor id="valorTelefono">{telefonoContacto}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaEmail">
                {diccionario.etiquetas.email}
              </Etiqueta>
              <Valor id="valorEmail">{emailContacto}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaColor">
                {diccionario.etiquetas.color}
              </Etiqueta>
              <Valor id="valorColor">{colorVehiculo}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaPlacas">
                {diccionario.etiquetas.placas}
              </Etiqueta>
              <Valor id="valorPlacas">{placasVehiculo}</Valor>
            </ContenedorParrafo>
          </>
        )}
        {estadoApp.seatedClaim === "tow" && (
          <>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaQuienReporta">
                {diccionario.gruaInformacionReporte.etiquetas.quienReporta}
              </Etiqueta>
              <Valor id="valorQuienReportaGrua">
                {quienReportaInfoVehiculo}
              </Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaTelefonoGrua">
                {diccionario.gruaInformacionReporte.etiquetas.telefono}
              </Etiqueta>
              <Valor id="valorTelefonoGrua">{telefonoInfoVehiculo}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaPlacasGrua">
                {diccionario.gruaInformacionReporte.etiquetas.placas}
              </Etiqueta>
              <Valor id="valorPlacasGrua">{placasInfoVehiculo}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaColorGrua">
                {diccionario.gruaInformacionReporte.etiquetas.color}
              </Etiqueta>
              <Valor id="valorColorGrua">{colorVehiculoInfoVehiculo}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaDeclaracion">
                {diccionario.gruaInformacionReporte.etiquetas.declaraicon}
              </Etiqueta>
              <Valor id="valorDeclaracion">
                {comoOcurrioSiniestroInfoVehiculo}
              </Valor>
            </ContenedorParrafo>
          </>
        )}
        <SeparadorEspacio />
        <Seccion>
          <Separador
            id="separadorUbicacion"
            claim={estadoApp.seatedClaim === "tow"}
          >
            {estadoApp.seatedClaim === "tow" &&
              diccionario.gruaInformacioubicacion.separadorUbicacion}
            {estadoApp.seatedClaim === "crash" &&
              diccionario.separadorUbicacion}
          </Separador>
          <LinkEditar
            id="editarUbicacion"
            onClick={() => {
              history.push({
                pathname: "/ubicacion",
                state: {
                  editar: true,
                },
              });
            }}
          >
            <ContenedorTextoEditar>{diccionario.editar}</ContenedorTextoEditar>
            <EditRoundedIcon style={{ fontSize: 16 }} />
          </LinkEditar>
        </Seccion>
        <SeparadorLinea />
        {estadoApp.seatedClaim === "crash" && (
          <>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaUbicacion">
                {diccionario.etiquetas.ubicacion}
              </Etiqueta>
              <Valor id="valorUbicacion">{estadoApp.ubicacion}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaReferencias">
                {diccionario.etiquetas.referencias}
              </Etiqueta>
              <Valor id="valorReferencias">{estadoApp.referencias}</Valor>
            </ContenedorParrafo>
          </>
        )}
        {estadoApp.seatedClaim === "tow" && (
          <>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaUbicacionActual">
                {diccionario.gruaInformacioubicacion.etiquetas.ubicacionActual}
              </Etiqueta>
              <Valor id="valorUbicacion">{estadoApp.ubicacion}</Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaUbicacionDestino">
                {diccionario.gruaInformacioubicacion.etiquetas.ubicaciónDestino}
              </Etiqueta>
              <Valor id="valorUbicacionDestino">
                {estadoApp.ubicacionDestino}
              </Valor>
            </ContenedorParrafo>
            <ContenedorParrafo>
              <Etiqueta id="etiquetaReferencias">
                {diccionario.etiquetas.referencias}
              </Etiqueta>
              <Valor id="valorReferencias">{estadoApp.referencias}</Valor>
            </ContenedorParrafo>
          </>
        )}
        <ContenedorBoton>
          <Boton
            etiqueta={
              estadoApp.seatedClaim === "tow"
                ? diccionario.etiquetaBotonContinuarGrua
                : diccionario.etiquetaBotonContinuar
            }
            tema="estandar"
            enClick={generarReporte}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaResumenReporte;

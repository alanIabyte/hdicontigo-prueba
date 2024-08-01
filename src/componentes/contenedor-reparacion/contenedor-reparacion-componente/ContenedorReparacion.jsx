/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useDispatch, useSelector } from "react-redux";
import showConfig from "../../../utils/configs";
import IngresoTaller from "../../ingreso-taller";
import Valuacion from "../../valuacion";
import PagoDeducible from "../../pago-deducible";
import ReparacionVehiculo from "../../reparacion-vehiculo";
import Entrega from "../../entrega";
import BarraAlerta from "../../barra-alerta";
import {
  EnvolvedorReparacion,
  SeparadorReparacion,
  SeparadorSeccionesOpcionales,
  Secciones,
  ContenedorSecciones,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
} from "./ContenedorReparacion.styled";
import Configuraciones from "../../../servicios/encuestas";
import Seccion from "../../seccion-pasos-progreso";
import Constantes from "../../../recursos/constantes";
import obtenerDeducibles from "../../utilidades-compartidas/obtenerArregloDeDeducibles";

const diccionario = {
  ingresoTaller: "Ingreso al centro de reparación",
  valuacion: "Valuación",
  pagoDeducible: "Deducible",
  reparacionVehiculo: "Reparación del vehículo",
  entrega: "Entrega",
  botonEtapa2: "2. Reparación",
  alertaIngresoTaller: "Tu vehículo ha ingresado al centro de reparación.",
  alertaValuacion: "La valuación de tu vehículo ha finalizado.",
  alertaPagoDeducible:
    "Ya puedes realizar el pago del deducible para la reparación de tu vehículo.",
  alertaReparacionVehiculo: "La fecha promesa de reparación se ha actualizado.",
  alertaPagoDeducibleRealizado:
    "El pago del deducible para la reparación de tu vehículo ha sido generado.",
  alertaTaller: "Reparación del vehículo actualizado.",
  alertaEntrega: ", ¡tu vehículo está listo! Ya puedes ir a recogerlo.",
};

const VALIDAR_ENCUESTA = loader(
  "../../../graphQL/query/encuesta/validar_encuesta.graphql"
);
const EVENTOS_OBTENER_LINEA_REPARACION = loader(
  "../../../graphQL/query/reparacion/obtener_linea_tiempo_reparacion.graphql"
);
const nombreCookie = Constantes.nombreDeCookie;

const ContenedorReparacion = (props) => {
  const { temaBoton, abrirEtapa, abrirSeccion } = props;
  // eslint-disable-next-line react/destructuring-assignment
  // console.log(props.eventosPasados)
  const history = useHistory();
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const { numeroReportePorDefecto } = props;
  const [
    validacionEncuesta,
    { data: validarEncuesta, loading: cargandoValidarEncuesta },
  ] = useLazyQuery(VALIDAR_ENCUESTA, { fetchPolicy: "no-cache" });

  const [urlMitDeducible, setUrlMitDeducible] = useState("");

  const [datosIngresoTaller, asignarValorDatosIngresoTaller] = useState(
    estadoApp.datosIngresoTaller && estadoApp.datosIngresoTaller.data
      ? estadoApp.datosIngresoTaller.data
      : []
  );
  const [datosValuacion, asignarValorDatosValuacion] = useState(
    estadoApp.datosValuacion && estadoApp.datosValuacion.data
      ? estadoApp.datosValuacion.data
      : []
  );
  const [datosPagoDeducible, asignarValorDatosPagoDeducible] = useState(
    estadoApp.datosPagoDeducible && estadoApp.datosPagoDeducible.data
      ? estadoApp.datosPagoDeducible.data
      : []
  );
  const [
    datosPagoDeduciblePagado,
    asignarValorDatosPagoDeduciblePagado,
  ] = useState(
    estadoApp.datosPagoDeduciblePagado &&
      estadoApp.datosPagoDeduciblePagado.data
      ? estadoApp.datosPagoDeduciblePagado.data
      : []
  );
  const [
    datosReparacionDelVehiculo,
    asignarValorDatosReparacionDelVehiculo,
  ] = useState(
    estadoApp.datosReparacionDelVehiculo &&
      estadoApp.datosReparacionDelVehiculo.data
      ? estadoApp.datosReparacionDelVehiculo.data
      : []
  );
  const [datosEntrega, asignarValorDatosEntrega] = useState(
    estadoApp.datosEntrega && estadoApp.datosEntrega.data
      ? estadoApp.datosEntrega.data
      : []
  );
  const [imagenesEntrega, asignarValorImagenesEntrega] = useState(
    estadoApp.datosEntrega && estadoApp.datosEntrega.imagenes
      ? estadoApp.datosEntrega.imagenes
      : []
  );
  const [llamarLineaTiempo] = useLazyQuery(EVENTOS_OBTENER_LINEA_REPARACION, {
    variables: { numeroReportePorDefecto },
    fetchPolicy: "cache-and-network",
  });
  const [
    mostrarBarraAlertaIngresoTaller,
    asignarValorMostrarBarraAlertaIngresoTaller,
  ] = useState(false);
  const [
    mostrarBarraAlertaValuacion,
    asignarValorMostrarBarraAlertaValuacion,
  ] = useState(false);
  const [
    mostrarBarraAlertaPagoDeducible,
    asignarValorMostrarBarraAlertaPagoDeducible,
  ] = useState(false);
  const [
    mostrarBarraAlertaPagoDeducibleRealizado,
    asignarValorMostrarBarraAlertaPagoDeducibleRealizado,
  ] = useState(false);
  const [
    mostrarBarraAlertaReparacionDelVehiculo,
    asignarValorMostrarBarraAlertaReparacionDelVehiculo,
  ] = useState(false);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const nombreUsuario =
    objetoCookie && objetoCookie.NombreAsegurado
      ? objetoCookie.NombreAsegurado
      : "Usuario";
  const [
    mostrarBarraAlertaEntrega,
    asignarValorMostrarBarraAlertaEntrega,
  ] = useState(false);

  const evaluarMostrarBarraAlertaIngresoTaller = (datos) => {
    if (
      estadoApp.datosIngresoTaller &&
      JSON.stringify(datos) !==
        JSON.stringify(estadoApp.datosIngresoTaller.data)
    ) {
      asignarValorMostrarBarraAlertaIngresoTaller(true);
    }
  };

  const evaluarMostrarBarraAlertaValuacion = (datos) => {
    if (
      estadoApp.datosValuacion &&
      JSON.stringify(datos) !== JSON.stringify(estadoApp.datosValuacion.data)
    ) {
      asignarValorMostrarBarraAlertaValuacion(true);
    }
  };

  const evaluarMostrarBarraAlertaPagoDeducible = (datos) => {
    if (
      estadoApp.datosPagoDeducible &&
      JSON.stringify(datos) !==
        JSON.stringify(estadoApp.datosPagoDeducible.data)
    ) {
      asignarValorMostrarBarraAlertaPagoDeducible(true);
    }
  };

  const evaluarMostrarBarraAlertaPagoDeducibleRealizado = (datos) => {
    if (
      estadoApp.datosPagoDeduciblePagado &&
      JSON.stringify(datos) !==
        JSON.stringify(estadoApp.datosPagoDeduciblePagado.data)
    ) {
      asignarValorMostrarBarraAlertaPagoDeducibleRealizado(true);
    }
  };

  const evaluarMostrarBarraAlertaReparacionDelVehiculo = (datos) => {
    if (
      estadoApp.datosReparacionDelVehiculo &&
      JSON.stringify(datos) !==
        JSON.stringify(estadoApp.datosReparacionDelVehiculo.data)
    ) {
      asignarValorMostrarBarraAlertaReparacionDelVehiculo(true);
    }
  };

  const evaluarMostrarBarraAlertaEntrega = (datos) => {
    if (
      estadoApp.datosEntrega &&
      JSON.stringify(datos) !== JSON.stringify(estadoApp.datosEntrega.data)
    ) {
      asignarValorMostrarBarraAlertaEntrega(true);
    }
  };

  // !Efecto para observar cambios de la propiedad urlMit desde redux
  useEffect(() => {
    console.log(estadoApp.datosCobranzaMit);
    if (estadoApp && estadoApp.datosCobranzaMit && estadoApp.datosCobranzaMit.urlTransaccion) {
      setUrlMitDeducible(estadoApp.datosCobranzaMit.urlTransaccion);
    }
  }, [estadoApp.datosCobranzaMit]);

  useEffect(() => {
    const { eventosPasados } = props;
    if (eventosPasados.length) {
      const imagenesEntregaTmp =
        imagenesEntrega.length === 0 ? [] : imagenesEntrega;
      eventosPasados.forEach((evento) => {
        switch (evento.tipoMensaje) {
          case 13:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosIngresoTaller",
            });
            evaluarMostrarBarraAlertaIngresoTaller(evento.descripciones);
            asignarValorDatosIngresoTaller(evento.descripciones);
            sessionStorage.setItem("ShowQR", "false");
            break;
          case 14:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosValuacion",
            });
            evaluarMostrarBarraAlertaValuacion(evento.descripciones);
            asignarValorDatosValuacion(evento.descripciones);
            break;
          case 15:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosPagoDeducible",
            });
            // !La query para obtener url de deducible se hace en el componente de Valuación
            // !y se obtiene en este componente en un effect que apunta al redux
            evaluarMostrarBarraAlertaPagoDeducible(evento.descripciones);
            asignarValorDatosPagoDeducible(evento.descripciones);
            break;
          case 16:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosReparacionDelVehiculo",
            });
            evaluarMostrarBarraAlertaReparacionDelVehiculo(
              evento.descripciones
            );
            asignarValorDatosReparacionDelVehiculo(evento.descripciones);
            break;
          case 17:
            if (imagenesEntregaTmp.length > 0){
              return;
            }
            evento.imagenes.forEach((foto) => {
              imagenesEntregaTmp.push({ url: foto });
            });
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
                imagenes: imagenesEntregaTmp,
              },
              indice: "datosEntrega",
            });
            asignarValorDatosEntrega(evento.descripciones);
            asignarValorImagenesEntrega(imagenesEntregaTmp);
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones.concat(datosReparacionDelVehiculo),
              },
              indice: "datosReparacionDelVehiculo",
            });
            evaluarMostrarBarraAlertaEntrega(evento.descripciones);
            asignarValorDatosReparacionDelVehiculo(
              evento.descripciones.concat(datosReparacionDelVehiculo)
            );
            break;
          case 18:
            // ! 18 Corresponde a los datos de entrega del vehiculo
            validacionEncuesta({
              variables: {
                numeroReporte: numeroReportePorDefecto,
                idEncuesta: Configuraciones.evaluacionTallerID,
              },
            });
            asignarValorDatosEntrega(evento.descripciones);

            break;
          case 19:
            evaluarMostrarBarraAlertaPagoDeducibleRealizado(
              evento.descripciones
            );
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosPagoDeduciblePagado",
            });
            asignarValorDatosPagoDeduciblePagado(evento.descripciones);
            break;
          default:
        }
      });
    }
  }, []);

  useEffect(() => {
    validacionEncuesta({
      variables: {
        numeroReporte: numeroReportePorDefecto,
        idEncuesta: Configuraciones.evaluacionTallerID,
      },
    });
  }, []);

  useEffect(() => {

    if (
      !cargandoValidarEncuesta &&
      validarEncuesta &&
      validarEncuesta.validar_encuesta &&
      validarEncuesta.validar_encuesta.mensaje === "La encuesta se encuentra omitida."
    ) {
      return;
    }

    if (
      !cargandoValidarEncuesta &&
      validarEncuesta &&
      validarEncuesta.validar_encuesta &&
      validarEncuesta.validar_encuesta.codigo !== "IDENC100010"
    ) {
      history.push({
        pathname: "/evaluacion-taller",
        search: `?numeroReporte=${numeroReportePorDefecto}`,
      });
    }
  }, [validarEncuesta, cargandoValidarEncuesta]);

  useEffect(() => {
    const { eventoNuevo } = props;
    if (eventoNuevo && eventoNuevo.tipoMensaje) {
      const datosNuevoEvento = eventoNuevo;
      const imagenesEntregaTmp = [];
      console.log("Evento nuevo ==============", datosNuevoEvento);
      switch (datosNuevoEvento.tipoMensaje) {
        case 13:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosIngresoTaller",
          });
          asignarValorDatosIngresoTaller(datosNuevoEvento.dato.descripciones);
          asignarValorMostrarBarraAlertaIngresoTaller(true);
          sessionStorage.setItem("ShowQR", "false");
          break;
        case 14:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosValuacion",
          });
          asignarValorDatosValuacion(datosNuevoEvento.dato.descripciones);
          asignarValorMostrarBarraAlertaValuacion(true);
          break;
        case 15:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosPagoDeducible",
          });
          asignarValorDatosPagoDeducible(datosNuevoEvento.dato.descripciones);
          asignarValorMostrarBarraAlertaPagoDeducible(true);
          break;
        case 16:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosReparacionDelVehiculo",
          });
          asignarValorDatosReparacionDelVehiculo(
            datosNuevoEvento.dato.descripciones
          );
          asignarValorMostrarBarraAlertaReparacionDelVehiculo(true);
          break;
        case 17:
          if (imagenesEntregaTmp.length > 0) {
            return;
          }
          datosNuevoEvento.dato.imagenes.forEach((foto) => {
            imagenesEntregaTmp.push({ url: foto });
          });
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
              imagenes: imagenesEntregaTmp,
            },
            indice: "datosEntrega",
          });
          asignarValorDatosEntrega(datosNuevoEvento.dato.descripciones);
          asignarValorImagenesEntrega(imagenesEntregaTmp);
          asignarValorMostrarBarraAlertaEntrega(true);
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones.concat(
                datosReparacionDelVehiculo
              ),
            },
            indice: "datosReparacionDelVehiculo",
          });
          asignarValorDatosReparacionDelVehiculo(
            datosNuevoEvento.dato.descripciones.concat(
              datosReparacionDelVehiculo
            )
          );
          break;
        case 18:
          validacionEncuesta({
            variables: {
              numeroReporte: numeroReportePorDefecto,
              idEncuesta: Configuraciones.evaluacionTallerID,
            },
          });
          break;
        case 19:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosPagoDeduciblePagado",
          });
          asignarValorDatosPagoDeduciblePagado(
            datosNuevoEvento.dato.descripciones
          );
          asignarValorMostrarBarraAlertaPagoDeducibleRealizado(true);
          break;
        default:
      }
    }
  }, []);

  const [desplegarSecciones, asignarValorDesplegarSecciones] = useState(
    abrirEtapa
  );

  const asignarDesplegarSecciones = () => {
    asignarValorDesplegarSecciones(!desplegarSecciones);
    // mostrarSecciones = !desplegarSecciones;
    if (!desplegarSecciones) {
      // !Se comenta por que ya se obtiene la linea del tiempo por parámetros
      // llamarLineaTiempo({
      //   variables: { numeroReporte: numeroReportePorDefecto, token: objetoCookie.access_token },
      // });
    }
  };

  return (
    <EnvolvedorReparacion>
      <BarraAlerta
        etiqueta={diccionario.alertaIngresoTaller}
        mostrarAlerta={mostrarBarraAlertaIngresoTaller}
        estilo="notificacion"
        manejarCierre={() => {
          asignarValorMostrarBarraAlertaIngresoTaller(false);
        }}
        fijo
      />
      <BarraAlerta
        etiqueta={diccionario.alertaValuacion}
        mostrarAlerta={mostrarBarraAlertaValuacion}
        estilo="notificacion"
        manejarCierre={() => {
          asignarValorMostrarBarraAlertaValuacion(false);
        }}
        fijo
      />
      <BarraAlerta
        etiqueta={diccionario.alertaPagoDeducible}
        mostrarAlerta={mostrarBarraAlertaPagoDeducible}
        estilo="notificacion"
        manejarCierre={() => {
          asignarValorMostrarBarraAlertaPagoDeducible(false);
        }}
        fijo
      />
      <BarraAlerta
        etiqueta={diccionario.alertaPagoDeducibleRealizado}
        mostrarAlerta={mostrarBarraAlertaPagoDeducibleRealizado}
        estilo="notificacion"
        manejarCierre={() => {
          asignarValorMostrarBarraAlertaPagoDeducibleRealizado(false);
        }}
        fijo
      />
      <BarraAlerta
        etiqueta={diccionario.alertaReparacionVehiculo}
        mostrarAlerta={mostrarBarraAlertaReparacionDelVehiculo}
        estilo="notificacion"
        manejarCierre={() => {
          asignarValorMostrarBarraAlertaReparacionDelVehiculo(false);
        }}
        fijo
      />
      <BarraAlerta
        etiqueta={`${nombreUsuario}${diccionario.alertaEntrega}`}
        mostrarAlerta={mostrarBarraAlertaEntrega}
        estilo="notificacion"
        manejarCierre={() => {
          asignarValorMostrarBarraAlertaEntrega(false);
        }}
        fijo
      />      
      <BotonDesplegarSecciones desplegado={desplegarSecciones} tema={temaBoton}>
        <ContenedorElementosMenuDesplegable onClick={asignarDesplegarSecciones}>
          {showConfig.lineaTiempo ? "3. Reparación" : diccionario.botonEtapa2}
          {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
        </ContenedorElementosMenuDesplegable>
      </BotonDesplegarSecciones>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <SeparadorReparacion />
        <Secciones desplegado={desplegarSecciones}>
          { !showConfig.lineaTiempo || showConfig.showRobo && (
            <>
            
              <Seccion
                titulo={diccionario.ingresoTaller}
                pendiente={datosIngresoTaller.length === 0}
                abrirSeccion={abrirSeccion === "IngresoCentroReparacion"}
              >
                <IngresoTaller datosIngresoTaller={datosIngresoTaller} />
              </Seccion>

              <Seccion
                titulo={diccionario.valuacion}
                pendiente={datosValuacion.length === 0}
                abrirSeccion={abrirSeccion === "Valuacion"}
              >
                <Valuacion datosValuacion={datosValuacion} />
              </Seccion>

              <SeparadorSeccionesOpcionales />

              <Seccion
                titulo={diccionario.pagoDeducible}
                pendiente={
                  datosPagoDeducible.length === 0 &&
                  datosPagoDeduciblePagado.length === 0
                }
                opcional={
                  datosPagoDeducible.length === 0 &&
                  datosPagoDeduciblePagado.length === 0
                }
                abrirSeccion={abrirSeccion === "Deducible"}
              >
                { obtenerDeducibles(datosPagoDeducible).length === 1 ? (
                  <PagoDeducible datosPagoDeducible={datosPagoDeducible} urlPagoMit={urlMitDeducible} datosPagoDeduciblePagado={datosPagoDeduciblePagado} />
                ) : (obtenerDeducibles(datosPagoDeducible).length > 1) ? (
                  obtenerDeducibles(datosPagoDeducible).map((deducible) => (
                    <PagoDeducible datosPagoDeducible={deducible} datosPagoDeduciblePagado={datosPagoDeduciblePagado} />
                  ))
                ) : null}
              </Seccion>

              <SeparadorSeccionesOpcionales />

            </>
          )}
              <Seccion
                titulo={diccionario.reparacionVehiculo}
                pendiente={datosReparacionDelVehiculo.length === 0}
                abrirSeccion={abrirSeccion === "ReparacionVehiculo"}
              >
                <ReparacionVehiculo
                  datosReparacionVehiculo={datosReparacionDelVehiculo}
                />
              </Seccion>
          <Seccion
            style={{ marginLeft: "0" }}
            titulo={diccionario.entrega}
            pendiente={datosEntrega.length === 0}
            abrirSeccion={abrirSeccion === "Entrega"}
          >
            <Entrega imagenes={imagenesEntrega} />
          </Seccion>
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReparacion>
  );
};

ContenedorReparacion.defaultProps = {
  eventosPasados: [],
  eventoNuevo: {},
  numeroReportePorDefecto: 0,
  temaBoton: "",
  abrirEtapa: false,
  abrirSeccion: "",
};

ContenedorReparacion.propTypes = {
  eventosPasados: PropTypes.instanceOf(Array),
  eventoNuevo: PropTypes.instanceOf(Object),
  numeroReportePorDefecto: PropTypes.number,
  temaBoton: PropTypes.oneOf(["blanco", ""]),
  abrirEtapa: PropTypes.bool,
  abrirSeccion: PropTypes.string,
};

export default ContenedorReparacion;

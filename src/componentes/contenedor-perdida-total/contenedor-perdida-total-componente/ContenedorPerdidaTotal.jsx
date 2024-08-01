import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import Documentacion from "../../documentacion";
import FechaDeIndemnizacion from "../../fecha-de-indemnizacion";
import BarraAlerta from "../../barra-alerta";
import {
  EnvolvedorReparacion,
  SeparadorReparacion,
  Secciones,
  ContenedorSecciones,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
} from "./ContenedorPerdidaTotal.styled";
import Seccion from "../../seccion-pasos-progreso";
import constantes from "../../../recursos/constantes";

const diccionario = {
  documentacion: "Documentación",
  fechaDeIndemnizacion: "Fecha de indemnización",
  botonEtapa3: "3. Pérdida total",
  alertaDocumentacion:
    "El estatus del proceso de documentación se ha actualizado.",
  alertaFechaDeIndemnizacion: "La fecha de indemnización ha sido programada.",
};

const nombreCookie = constantes.nombreDeCookie;

const OBTENER_DOCUMENTACION = loader(
  "../../../graphQL/query/checklist/documentacion.graphql"
);

const ContenedorPerdidaTotal = (props) => {
  const { temaBoton, numeroReportePorDefecto, abrirEtapa, abrirSeccion } =
    props;
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const estadoApp = useSelector((estado) => estado);

  const [obtenerDocumentacion, { loading, data }] = useLazyQuery(
    OBTENER_DOCUMENTACION
  );

  const [datosDocumentacion, asignarValorDatosDocumentacion] = useState(
    estadoApp.datosDocumentacion && estadoApp.datosDocumentacion.data
      ? estadoApp.datosDocumentacion.data
      : {}
  );
  const [datosFechaDeIndemnizacion, asignarValorDatosFechaDeIndemnizacion] =
    useState(
      estadoApp.datosFechaDeIndemnizacion &&
        estadoApp.datosFechaDeIndemnizacion.data
        ? estadoApp.datosFechaDeIndemnizacion.data
        : []
    );
  const [
    mostrarBarraAlertaFechaDeIndemnizacion,
    asignarValorMostrarBarraAlertaFechaDeIndemnizacion,
  ] = useState(false);

  const evaluarMostrarBarraAlertaFechaDeIndemnizacion = (datos) => {
    if (
      estadoApp.datosFechaDeIndemnizacion &&
      JSON.stringify(datos) !==
        JSON.stringify(estadoApp.datosFechaDeIndemnizacion.data)
    ) {
      asignarValorMostrarBarraAlertaFechaDeIndemnizacion(true);
    }
  };

  useEffect(() => {
    const { eventosPasados } = props;
    if (eventosPasados.length) {
      eventosPasados.forEach((evento) => {
        switch (evento.tipoMensaje) {
          case 21:
            dispatch({
              type: "AGREGAR",
              valor: {
                data: evento.descripciones,
              },
              indice: "datosFechaDeIndemnizacion",
            });
            evaluarMostrarBarraAlertaFechaDeIndemnizacion(evento.descripciones);
            asignarValorDatosFechaDeIndemnizacion(evento.descripciones);
            break;
          default:
        }
      });
    }
  }, []);

  useEffect(() => {
    const { eventoNuevo } = props;
    if (eventoNuevo && eventoNuevo.tipoMensaje) {
      const datosNuevoEvento = eventoNuevo;
      switch (datosNuevoEvento.tipoMensaje) {
        case 21:
          dispatch({
            type: "AGREGAR",
            valor: {
              data: datosNuevoEvento.dato.descripciones,
            },
            indice: "datosFechaDeIndemnizacion",
          });
          asignarValorDatosFechaDeIndemnizacion(
            datosNuevoEvento.dato.descripciones
          );
          asignarValorMostrarBarraAlertaFechaDeIndemnizacion(true);
          break;
        default:
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && data) {
      if (
        data &&
        data.obtener_documentacion_siniestro &&
        data.obtener_documentacion_siniestro.dato
      ) {
        dispatch({
          type: "AGREGAR",
          valor: {
            data: data.obtener_documentacion_siniestro.dato,
          },
          indice: "datosDocumentacion",
        });
        asignarValorDatosDocumentacion(
          data.obtener_documentacion_siniestro.dato
        );
      }
    }
  }, [loading, data]);

  const [desplegarSecciones, asignarValorDesplegarSecciones] =
    useState(abrirEtapa);

  const asignarDesplegarSecciones = () => {
    asignarValorDesplegarSecciones(!desplegarSecciones);
    // mostrarSecciones = !desplegarSecciones;
    if (!desplegarSecciones) {
      obtenerDocumentacion({
        variables: {
          numeroReporte: numeroReportePorDefecto,
          token: objetoCookie.access_token,
        },
      });
    }
  };

  return (
    <EnvolvedorReparacion>
      <BarraAlerta
        etiqueta={diccionario.alertaFechaDeIndemnizacion}
        mostrarAlerta={mostrarBarraAlertaFechaDeIndemnizacion}
        estilo="notificacion"
        manejarCierre={() => {
          asignarValorMostrarBarraAlertaFechaDeIndemnizacion(false);
        }}
        fijo
      />
      <BotonDesplegarSecciones desplegado={desplegarSecciones} tema={temaBoton}>
        <ContenedorElementosMenuDesplegable onClick={asignarDesplegarSecciones}>
          {diccionario.botonEtapa3}
          {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
        </ContenedorElementosMenuDesplegable>
      </BotonDesplegarSecciones>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <SeparadorReparacion />
        <Secciones desplegado={desplegarSecciones}>
          <Seccion
            titulo={diccionario.documentacion}
            pendiente={Object.entries(datosDocumentacion).length === 0}
            abrirSeccion={abrirSeccion === "Documentacion"}
          >
            <Documentacion datosDocumentacion={datosDocumentacion} />
          </Seccion>
          {/* TODO: La sección de fecha de indemnización fue deshabilitada temporalmente 
                    en lo que se establece el servicio para realizarla. */}
          {false && (
            <Seccion
              titulo={diccionario.fechaDeIndemnizacion}
              pendiente={datosFechaDeIndemnizacion.length === 0}
              abrirSeccion={abrirSeccion === "FechaIndemnizacion"}
            >
              <FechaDeIndemnizacion
                datosFechaDeIndemnizacion={datosFechaDeIndemnizacion}
              />
            </Seccion>
          )}
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReparacion>
  );
};

ContenedorPerdidaTotal.defaultProps = {
  eventosPasados: [],
  eventoNuevo: {},
  numeroReportePorDefecto: 0,
  temaBoton: "",
  abrirEtapa: false,
  abrirSeccion: "",
};

ContenedorPerdidaTotal.propTypes = {
  eventosPasados: PropTypes.instanceOf(Array),
  eventoNuevo: PropTypes.instanceOf(Object),
  numeroReportePorDefecto: PropTypes.number,
  temaBoton: PropTypes.oneOf(["blanco", ""]),
  abrirEtapa: PropTypes.bool,
  abrirSeccion: PropTypes.string,
};

export default ContenedorPerdidaTotal;

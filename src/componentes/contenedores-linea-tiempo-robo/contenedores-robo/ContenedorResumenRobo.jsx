/* eslint-disable */
import React, { useEffect, useState } from "react";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import {
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
  ContenedorSecciones,
  EnvolvedorReporteAjuste,
  Secciones,
} from "../../contenedor-reporte-ajuste/contenedor-reporte-ajuste-componente/ContenedorReporteAjuste.styled";
import Seccion from "../../seccion-pasos-progreso";
import { SeccionResumenReporte } from "../../../pantallas/pasos-progreso-robo/SeccionResumenReporte";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import { SeccionDeclaracionReporteRobo } from "../../../pantallas/pasos-progreso-robo/SeccionDeclaracionRobo";
import agregarFormatoDeFecha from "../../utilidades-compartidas/agregarFormatoFecha";
import Ubicacion from "../../ubicacion";
import constantes from "../../../recursos/constantes";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";

const nombreCookie = constantes.nombreDeCookie;

export const ContenedorResumenRobo = ({ eventos = [], numeroReportePorDefecto = 0, declaracion = "", esAudio = false} ) => {

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  const [desplegarSecciones, setDesplegarSecciones] = useState(false);

  const asignarDesplegarSecciones = () => {
    setDesplegarSecciones(!desplegarSecciones);
  };

  /**
   * Obtenemos la info de la notificación 31 para distribuir en la sección de
   * resumen de robo
   */
  const [resumenPendiente, asignarResumenPendiente] = useState(true);
  const [resumenRobo, asignarResumenRobo] = useState({
    ajustador: "",
    horaReporte: "",
    numeroReporte: "",
    numeroReporte911: "",
  });

  const [ubicacionRoboPendiente, asignarUbicacionRoboPendiente] = useState(true);
  const [datosUbicacion, asignarDatosUbicacion] = useState([]);

  const [declaracionPendiente, asignarDeclaracionPendiente] = useState(true);

  useEffect(() => {
    if (declaracion != "") {
      asignarDeclaracionPendiente(false);
    }
  },[declaracion, esAudio]);

  useEffect(() => {
    // !Obtener info del resumen
    const siniestroRobo = eventos.find((evento) => evento.tipoMensaje === 31);
    if (siniestroRobo != null) {

      asignarResumenPendiente(false);

      const ajustador = obtenerValorDeArregloDeStrings(
        siniestroRobo.descripciones,
        "Ajustador: "
      );

      const horaReporteString = obtenerValorDeArregloDeStrings(
        siniestroRobo.descripciones,
        "Hora: "
      );

      const horaReporte = agregarFormatoDeFecha(horaReporteString).toString();

      const numeroReporte = obtenerValorDeArregloDeStrings(
        siniestroRobo.descripciones,
        "Reporte: "
      );

      const numeroReporte911 = obtenerValorDeArregloDeStrings(
        siniestroRobo.descripciones,
        "Reporte911: "
      );

      asignarResumenRobo({ ajustador, horaReporte, numeroReporte, numeroReporte911 });
    }

    // !Obtener info de la ubicación
    const ubicacionRobo = eventos.find((evento) => evento.tipoMensaje === 32);
    if (ubicacionRobo != null) {
      asignarUbicacionRoboPendiente(false);
      asignarDatosUbicacion(ubicacionRobo.descripciones);
    }

  }, [eventos]);

  return (
    <EnvolvedorReporteAjuste style={{ marginBottom: "1rem" }}>
      <div style={{ position: "static" }}>
        <BotonDesplegarSecciones desplegado={desplegarSecciones} tema="blanco">
          <ContenedorElementosMenuDesplegable
            onClick={asignarDesplegarSecciones}
            desplegado={desplegarSecciones}
          >
            1. Resumen de robo
            {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
          </ContenedorElementosMenuDesplegable>
        </BotonDesplegarSecciones>
      </div>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <Secciones desplegado={desplegarSecciones}>
          {/* Esta sección contiene un resumen del reporte de robo */}
          <Seccion titulo="Reporte" pendiente={resumenPendiente} abrirSeccion>
            <SeccionResumenReporte resumenRobo={resumenRobo} />
          </Seccion>

          {/* Ubicación del robo */}
          <Seccion titulo="Ubicación del robo" pendiente={ubicacionRoboPendiente} abrirSeccion>
            <Ubicacion datosUbicacion={datosUbicacion}></Ubicacion>
          </Seccion>

          {/* Fotos del robo */}
          {/* <Seccion
            titulo="Fotos del lugar del robo"
            pendiente={false}
            abrirSeccion
          >
            <SeccionResumenReporte resumenRobo={resumenRobo} />
          </Seccion> */}

          {/* Declaración grabada */}
          <Seccion titulo="Declaración" pendiente={declaracionPendiente} abrirSeccion>
            <SeccionDeclaracionReporteRobo declaracion={declaracion} esAudio={esAudio}/>
          </Seccion>
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReporteAjuste>
  );
};

/* eslint-disable */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Boton from "../../../boton/boton-componente/Boton";
import { IEventosNotificaciones } from "../../../../interfaces/Graphql/IEventosNotificaciones";
import obtenerValorDeArregloDeStrings from "../../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import { BotonDesplegarSecciones, EnvolvedorReporteAjuste } from "../../../contenedor-reporte-ajuste/contenedor-reporte-ajuste-componente/ContenedorReporteAjuste.styled";
import { ContenedorElementosMenuDesplegable, ContenedorSecciones, Secciones } from "../../../pantalla-preguntas-frecuentesPT/PantallaPreguntasFrecuentesPT.styled";
import Seccion from "../../../seccion-pasos-progreso";
import { EnvolvedorReporteSiniestro, ReporteSiniestroCampo } from "../../../reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";
import { ReporteSiniestroValor } from "../../../contenedor-ajuste-digital/ContenedorAjusteDigital.styled";

interface IProps {
  eventos: IEventosNotificaciones[];
  numeroReporte: String;
}

const ContenedorLocalizacionRobo = (props: IProps) => {

  const { eventos, numeroReporte } = props;

  const history = useHistory();

  const [desplegarSecciones, setDesplegarSecciones] = useState(false);

  const [localizado, setLocalizado] = useState<string>("false");
  const [recuperado, setRecuperado] = useState<string>("false");
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>("");

  const asignarDesplegarSecciones = () => {
    setDesplegarSecciones(!desplegarSecciones);
  };

  useEffect(() => {
    // !34 es la notificación de localización
    const notiLocalizacion = eventos.find((evento: IEventosNotificaciones) => evento.tipoMensaje === 34);
    if (notiLocalizacion != null) {
      const isLocalizado = obtenerValorDeArregloDeStrings(
        notiLocalizacion.descripciones,
        "Localizado: "
      );
      
      const isRecuperado = obtenerValorDeArregloDeStrings(
        notiLocalizacion.descripciones,
        "Recuperado: "
      );

      const ultimaActualizacion = obtenerValorDeArregloDeStrings(
        notiLocalizacion.descripciones,
        "UltimaActualizacion: "
      );

      setLocalizado(isLocalizado.toLowerCase());
      setRecuperado(isRecuperado.toLowerCase());
      setUltimaActualizacion(ultimaActualizacion);
    }
  }, []);

  const formatoUltimaActualizacion = (fecha: string) => {
    if (fecha === "") {
      return "---";
    }
    const fechaActual = moment(fecha);
    return fechaActual.format('DD/MM/YYYY hh:mm');
  }

  const redireccionNotificarVehiculoLocalizado = () => {
    history.push({
      pathname: "/vehiculo-encontrado",
      search: `numeroReporte=${numeroReporte}`,
      state: {
        regreso: `pasos-progreso?numeroReporte=${numeroReporte}`
      }
    });
  };

  const redireccionRecuperarMiVehiculo = () => {
    history.push({
      pathname: "/recupera-vehiculo"
    });
  };

  return (
    <EnvolvedorReporteAjuste style={{ marginBottom: "1rem" }}>
      <div style={{ position: "static" }}>
        <BotonDesplegarSecciones desplegado={desplegarSecciones} tema="blanco">
          <ContenedorElementosMenuDesplegable
            onClick={asignarDesplegarSecciones}
            desplegado={desplegarSecciones}
          >
            2. Localización
            {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
          </ContenedorElementosMenuDesplegable>
        </BotonDesplegarSecciones>
      </div>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <Secciones desplegado={desplegarSecciones}>
          {/* Esta sección contiene un resumen del reporte de robo */}
          <Seccion
            titulo="Localización del vehículo"
            pendiente={false}
            abrirSeccion
          >
            <EnvolvedorReporteSiniestro>
              <ReporteSiniestroValor style={{ display: "flex", alignItems: "center" }}>
                {localizado === "true" ? (
                  <>
                    <div style={{width: "10px", height:"10px", borderRadius: "50%", background: "green", marginRight: "15px"}}></div>
                    Localizado
                  </>
                ) : (
                  <>
                    <div style={{width: "10px", height:"10px", borderRadius: "50%", background: "red", marginRight: "15px"}}></div>
                    No localizado
                  </>
                )}
              </ReporteSiniestroValor>
              <ReporteSiniestroValor style={{ display: "flex", alignItems: "center" }}>
                {recuperado === "true" ? (
                  <>
                    <div style={{width: "10px", height:"10px", borderRadius: "50%", background: "green", marginRight: "15px"}}></div>
                    Recuperado
                  </>
                ) : (
                  <>
                    <div style={{width: "10px", height:"10px", borderRadius: "50%", background: "red", marginRight: "15px"}}></div>
                    No recuperado
                  </>
                )}
              </ReporteSiniestroValor>
              <ReporteSiniestroCampo style={{ marginTop: "1rem" }}>Última actualización: </ReporteSiniestroCampo>
              <ReporteSiniestroValor style={{ marginBottom: "1rem" }}>{formatoUltimaActualizacion(ultimaActualizacion)}</ReporteSiniestroValor>
              {localizado === "false" ? (
                <div style={{ width: "100%", margin: "1.3rem 0" }}>
                  <Boton
                    etiqueta="Notificar localización"
                    enClick={() => {
                      redireccionNotificarVehiculoLocalizado();
                    }}
                    tema={"simple"}
                  />
                </div>
              ) : <></>}
              {localizado === "true" && recuperado === "false" ? (
                <>
                  <div style={{ width: "100%", margin: "1.3rem 0" }}>
                    <Boton
                      etiqueta="Recuperar mi vehículo"
                      enClick={() => {
                        redireccionRecuperarMiVehiculo();
                      }}
                      tema={"simple"}
                    />
                  </div>
                </>
              ): <></>}
            </EnvolvedorReporteSiniestro>
            {/* <SeccionLocalizacionVehiculo /> */}
          </Seccion>
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReporteAjuste>
  );
};

export default ContenedorLocalizacionRobo;
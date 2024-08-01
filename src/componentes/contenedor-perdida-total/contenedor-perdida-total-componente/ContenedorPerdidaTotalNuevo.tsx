/* eslint-disable */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
import Timeline from "@mui/lab/Timeline";
import { useLazyQuery, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import {
  EnvolvedorReparacion,
  Secciones,
  ContenedorSecciones,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
} from "./ContenedorPerdidaTotal.styled";
import Seccion from "../../seccion-pasos-progreso";
import { SeparadorEspacio } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import { ReporteSiniestroCampo } from "../../reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";
import Boton from "../../boton/boton-componente/Boton";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import { IDatoObtenerLigaDocumenta, IObtenerLigaDocumenta } from "../../../interfaces/indemnizacion/Iindemnizacion";
import constantes from "../../../recursos/constantes";
import { OverridableStringUnion } from "@material-ui/types";
import IndicadorCarga from "../../indicador-carga";
import agregarFormatoDeFecha from "../../utilidades-compartidas/agregarFormatoFecha";
import IcoHelp from "../../../recursos/iconos/Insumos PT/help.svg";
import { EnvolvedorImagen } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import { EnlaceAlerta, ParrafoAlerta } from "../../pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled";

let mostrarSecciones = false;

const OBTENER_LIGA_DOCUMENTA = loader(
  "../../../graphQL/query/checklist/documentacion.graphql"
);

const diccionario = {
  documentacion: "Documentación",
  fechaDeIndemnizacion: "Fecha de indemnización",
  botonEtapa3: "3. Pérdida total",
  alertaDocumentacion:
    "El estatus del proceso de documentación se ha actualizado.",
  alertaFechaDeIndemnizacion: "La fecha de indemnización ha sido programada.",
};

const nombreCookie = constantes.nombreDeCookie;

interface IColoresTimeline {
  color?: any;
  variant?: any;
  className?: string;
}

interface IPropsTimeline {
  esRobo: boolean;
}

function TimeLine(props: IPropsTimeline) {

  const { esRobo } = props;

  const history = useHistory();

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  const estadoApp = useSelector((state: IRedux) => state);
  const { datosReporteCompleto } = estadoApp;

  const configAlertaRedireccion = {
    textoEncabezado: "HDI Documenta",
    tipoIcono: "",
    colorAlerta: "amarillo",
    textoCuerpoJsx:
      "Estas a punto de ser redirigido a la plataforma  de HDI Documenta",
    etiquetaBoton: "Ir a HDI Documenta",
  };

  const configAlertaReuneDocumentos = {
    textoEncabezado: "Reúne tus documentos",
    tipoIcono: "requeridos",
    textoCuerpo:
      "En tu proceso debes haber reunido todos los documentos para procesar tu solicitud de indemnización. Podrás ahorrarte tiempo y esfuerzo con la opción de escanear los documentos y subirlos a HDI Documenta para ayudarte a revisar estén completos y correctos antes de presentarlos físicamente.",
    etiquetaBoton: "Subir documentos",
    etiquetaBoton2: "Ver documentos"
  };
  
  const configAlertaEntregaDocumentos = {
    textoEncabezado: "Entrega de documentos",
    tipoIcono: "entrega",
    textoCuerpo:
      "Para proceder al pago de tu finiquito y los formatos necesarios, es indispensable que te presentes personalmente en alguna de nuestras oficinas con los documentos originales. Te ayudaremos a ubicar la oficina más cercana a tu dirección.",
    etiquetaBoton: "Ubicar oficinas de atención",
    etiquetaBoton2: "Contacto HDI"
  };
  
  const configAlertaPagoIndemnizacion = {
    textoEncabezado: "Pago de indemnización",
    tipoIcono: "pago",
    textoCuerpo:
      "Después de recibir y revisar tus documentos en nuestra oficina más cercana, procederemos a realizar el pago correspondiente a la indemnización establecida en tu póliza de seguro, la cual tiene un valor indicado en \"TIPO DE VALOR\". Te mantendremos informado en todo momento sobre el estatus del proceso. Estamos disponibles para ayudarte en todo momento.",
  };

  const [ligaDocumenta, setLigaDocumenta] = useState<IDatoObtenerLigaDocumenta | undefined>(undefined);
  const [estatusIndemnizacion, setEstatusIndemnizacion] = useState<string>("Pendiente");

  const { data, loading, error } = useQuery<IObtenerLigaDocumenta>(
    OBTENER_LIGA_DOCUMENTA,
    {
      variables: {
        numeroReporte: datosReporteCompleto.numeroReporte,
        token: objetoCookie.access_token,
      },
    }
  );

  const alertaRedireccion = useAlerta(configAlertaRedireccion);
  const alertaReuneDocumentos = useAlerta(configAlertaReuneDocumentos);
  const alertaEntregaDocumentos = useAlerta(configAlertaEntregaDocumentos);
  const alertaPagoIndemnizacion = useAlerta(configAlertaPagoIndemnizacion);

  const redirect = (route: string = "preguntas") => {
    let param = "global";
    if (esRobo) {
      param = "robo";
    } else {
      if (estadoApp.tipoAtencionIndemnizacion === "PT") {
        param = "total";
      } else if (estadoApp.tipoAtencionIndemnizacion === "DP") {
        param = "parcial";
      }
    }
    if (route === "preguntas") {
      history.push({
        pathname: "/preguntas-frecuentes",
        search: "?preguntas="+(esRobo ? "RT" : estadoApp.tipoAtencionIndemnizacion||"PT"),
        state: {
          tipoPersona: "f",
          tipoAtencion: param,
        },
      });
      return;
    }

    if (route === "contacto") {
      history.push({
        pathname: "asistencia-hdi",
        state: {
          tipoPersona: "f",
          tipoAtencion: param,
        },
      });
      return;
    }

    history.push({
      pathname: "documentacion-indemnizacion",
      search: "?tipoAtencion="+(esRobo ? "RT" : estadoApp.tipoAtencionIndemnizacion||"PT"),
    });
  };

  const redirigirHDIDocumenta = () => {
    alertaRedireccion.mostrar();
  };

  const abrirLigaDocumenta = () => {
    if (ligaDocumenta != undefined && ligaDocumenta?.linkActual && ligaDocumenta.linkActual != "") {
      window.open(ligaDocumenta.linkActual);
      alertaRedireccion.cerrar()
    }
  };
  
  const validarEstatusDocumentos = (estatus: string = "") => {
    if (estatus === "Expediente creado") {
      return "Pendiente";
    }
    return estatus;
  };

  const mostrarBotonSubirDocumentos = (porcentaje: string) => {
    const porcen = parseFloat(porcentaje);
    if (porcen < 100) {
      return true;
    }
    return false;
  };

  /**
   * Los estatus de los colores serán:
   * 0.- Color gris => Etapa deshabilitada
   * 1.- Color blanco => Etapa activa
   * 2.- Color verde => Etapa completada
   */
  const listaColores = ["color-gris-linea", "color-blanco-linea", "color-verde-linea"];

  const [reuneDocumentos, setReuneDocumentos] = useState<string>("");
  const [lineaReuneDocumentos, setLineaReuneDocumentos] = useState<string>("");
  const [entregaDocumentos, setEntregaDocumentos] = useState<string>("");
  const [lineaEntregaDocumentos, setLineaEntregaDocumentos] = useState<string>("");
  const [pagoIndemnizacion, setPagoIndemnizacion] = useState<string>(listaColores[0]);

  const timeLineInicial = () => {
    setReuneDocumentos(listaColores[0]);
    setLineaReuneDocumentos(listaColores[0]);
    setEntregaDocumentos(listaColores[0]);
    setLineaEntregaDocumentos(listaColores[0]);
    setPagoIndemnizacion(listaColores[0]);
  }

  const colorTimeline = () => {

    /**
     * Si el procentaje de carga de documentos es menor a 100
     */
    if (parseFloat(ligaDocumenta?.porcentajeDocumentos||"") < 100) {
      // ! Quiere decir que no se han subido todos los documentos por lo tanto
      // ! reune documentos se deja en blanco y las demás deshabilitadas
      setReuneDocumentos(listaColores[1]);
      setLineaReuneDocumentos(listaColores[0]);

      setEntregaDocumentos(listaColores[0]);
      setLineaEntregaDocumentos(listaColores[0]);
      return; 
    }

    /**
     * Si el porcentaje es cien entonces el primer paso se asigna color verde
     * y el de entrega de documentos el punto se deja blanco y la linea gris
     */
    if (estadoApp?.tipoAtencionIndemnizacion === "PT") {
      if (!ligaDocumenta?.oficinaCita || ligaDocumenta?.oficinaCita === "Aun sin cita" || ligaDocumenta?.oficinaCita === "") {
        setReuneDocumentos(listaColores[2]);
        setLineaReuneDocumentos(listaColores[2]);
        
        setEntregaDocumentos(listaColores[1]);
        setLineaEntregaDocumentos(listaColores[0]);
        return;
      }
    }

    setReuneDocumentos(listaColores[2]);
    setLineaReuneDocumentos(listaColores[2]);

    setEntregaDocumentos(listaColores[2]);
    setLineaEntregaDocumentos(listaColores[2]);

    
    if (estadoApp?.pagoIndemnizacion?.pagoAplicado) {
      setPagoIndemnizacion(listaColores[2]);
      setEstatusIndemnizacion("Completado");
      return;
    }
    
    setPagoIndemnizacion(listaColores[1]);
    setEstatusIndemnizacion("Pendiente");
  };

  const validaMostrarBotonAgendarCita = (porcentaje: string = "0", estatus: string = "") => {
    return porcentaje === "100.00" && estatus === "Pendiente cita cliente";
    // return estatus.toLowerCase().includes("aprobado");
  }

  useEffect(() => {
    if (!loading && error) {
      console.error("hay error al obtener datos de la documentación del siniestro");
    }

    if (
      !loading &&
      data?.obtener_documentacion_siniestro &&
      data?.obtener_documentacion_siniestro?.completado
    ) {
      if (false) {
        let paso = 3;
        switch(paso) {
          case 1:
            setLigaDocumenta({
              coberturaPoliza: "Perdida Total",
              estatus: "Expediente creado",
              fechaAltaClienteUnix: "",
              linkActual: "https://blueservicessc-sandbox.com/HDI2/APIHDI/ligacliente.php?idlink=523",
              metodoPago: "N/A",
              porcentajeDocumentos: "0",
              tipoAsegurado: "Asegurado",
              tipoTramite: "Tradicional",
              fechaCita: "Aun sin cita",
              oficinaCita: "Aun sin cita"
            });
            break;
          case 2:
            setLigaDocumenta({
              coberturaPoliza: "Perdida Total",
              estatus: "Aprobado",
              fechaAltaClienteUnix: "",
              linkActual: "https://blueservicessc-sandbox.com/HDI2/APIHDI/ligacliente.php?idlink=523",
              metodoPago: "N/A",
              porcentajeDocumentos: "100",
              tipoAsegurado: "Asegurado",
              tipoTramite: "Tradicional",
              fechaCita: "Aun sin cita",
              oficinaCita: "Aun sin cita"
            });
            break;
          case 3:
            setLigaDocumenta({
              coberturaPoliza: "Perdida Total",
              estatus: "Aprobado",
              fechaAltaClienteUnix: "",
              linkActual: "https://blueservicessc-sandbox.com/HDI2/APIHDI/ligacliente.php?idlink=523",
              metodoPago: "N/A",
              porcentajeDocumentos: "100",
              tipoAsegurado: "Asegurado",
              tipoTramite: "Tradicional",
              fechaCita: "2023-10-08T12:00:40",
              oficinaCita: "Oficina 1"
            })
            break;
        }
      } else {
        setLigaDocumenta(data?.obtener_documentacion_siniestro?.dato);
      }
    }
  }, [data, loading, error]);
  
  useEffect(() => {
    colorTimeline();
  }, [ligaDocumenta]);

  useEffect(() => {
    timeLineInicial();
  }, []);

  const acomodarDatosFecha = (fecha: string) => {
    const dtSeparado = fecha.split(" ");
    const fechaSeparada = dtSeparado[0].split("/");

    return `${fechaSeparada[2]}/${fechaSeparada[1]}/${fechaSeparada[0]} ${dtSeparado[1]}`;
  }

  return (
    <>
      <Alerta
        {...alertaReuneDocumentos}
        funcionLlamadaBoton={() => {
          alertaRedireccion.mostrar();
        }}
        funcionLlamadaBoton2={() => {
          history.push({
            pathname: "documentacion-indemnizacion",
            search: `?tipoAtencion=${(esRobo ? "RT" : estadoApp.tipoAtencionIndemnizacion||"PT")}`,
          })
        }}
        manejarCierre={() => { alertaReuneDocumentos.cerrar(); }}
        tituloArriba
      />
      <Alerta
        {...alertaRedireccion}
        funcionLlamadaBoton={() => { abrirLigaDocumenta() }}
        manejarCierre={() => alertaRedireccion.cerrar() }
      />
      <Alerta
        {...alertaEntregaDocumentos}
        funcionLlamadaBoton={() => { console.log("Abirir mapa"); }}
        funcionLlamadaBoton2={() => {
          redirect("contacto")
        }}
        manejarCierre={() => alertaEntregaDocumentos.cerrar() }
      />
      <Alerta
        {...alertaPagoIndemnizacion}
        manejarCierre={() => alertaPagoIndemnizacion.cerrar() }
        tituloArriba
      >
      <ParrafoAlerta>
        Si tienes duda, revisa la sección:
      </ParrafoAlerta>
      <EnlaceAlerta onClick={() => {
        redirect("preguntas");
      }}>
        Preguntas frecuentes
      </EnlaceAlerta>
      </Alerta>
      <Timeline
        sx={{
          "& .MuiTimelineItem-root:before": {
            flex: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={reuneDocumentos} />
            <TimelineConnector className={lineaReuneDocumentos}/>
          </TimelineSeparator>
          <div className="">
            <TimelineContent>
              {" "}
              <b>Reúne tus documentos</b>
              <EnvolvedorImagen
                src={IcoHelp}
                style={{ width: "15px", cursor: "pointer" }}
                onClick={() => { alertaReuneDocumentos.mostrar(); }}
              />
            </TimelineContent>
            <TimelineContent>Estatus: {validarEstatusDocumentos(ligaDocumenta?.estatus)}</TimelineContent>
            <TimelineContent>
              Porcentaje: <span style={{ color: "#65A518" }}>{ligaDocumenta?.porcentajeDocumentos}%</span>{" "}
            </TimelineContent>
            {mostrarBotonSubirDocumentos(ligaDocumenta?.porcentajeDocumentos||"") && (
              <>
                <TimelineContent>
                  <Boton
                    etiqueta="Subir documentos"
                    tema="simple"
                    enClick={redirigirHDIDocumenta}
                  />
                </TimelineContent>
                <TimelineContent
                  className="enlace"
                  onClick={() => redirect("documentos")}
                >
                  Ver documentos necesarios
                </TimelineContent>
              </>
            )}
          </div>
        </TimelineItem>
        {estadoApp.tipoAtencionIndemnizacion === "PT" && 
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={entregaDocumentos} />
              <TimelineConnector className={lineaEntregaDocumentos} />
            </TimelineSeparator>
            <div className="">
              <TimelineContent>
                <b>Entrega de Documentos</b>
                <EnvolvedorImagen
                  src={IcoHelp}
                  style={{ width: "15px", cursor: "pointer" }}
                  onClick={() => { alertaEntregaDocumentos.mostrar(); }}
                />
              </TimelineContent>
              <TimelineContent>Estatus: <b>{!ligaDocumenta?.fechaCita || ligaDocumenta?.fechaCita === "Aun sin cita" ? "Pendiente" : "Recibido"}</b></TimelineContent>
              <TimelineContent>
                Fecha de cita: 
                <b>{!ligaDocumenta?.fechaCita || ligaDocumenta?.fechaCita === "Aun sin cita" ?
                  ligaDocumenta?.fechaCita
                  :
                  agregarFormatoDeFecha(acomodarDatosFecha(ligaDocumenta?.fechaCita)||"")}
                </b>
              </TimelineContent>
              <TimelineContent>
                Oficina que recibió: <b>{ligaDocumenta?.oficinaCita}</b>
              </TimelineContent>
              {validaMostrarBotonAgendarCita(ligaDocumenta?.porcentajeDocumentos, ligaDocumenta?.estatus) && (
                <TimelineContent>
                  <Boton
                    etiqueta="Agendar cita"
                    tema="simple"
                    enClick={redirigirHDIDocumenta}
                  />
                </TimelineContent>
              )}
            </div>
          </TimelineItem>
        }
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={pagoIndemnizacion} />
          </TimelineSeparator>
          <div className="">
            <TimelineContent>
              <b>Pago de indemnización</b>
              <EnvolvedorImagen
                src={IcoHelp}
                style={{ width: "15px", cursor: "pointer" }}
                onClick={() => { alertaPagoIndemnizacion.mostrar() }}
              />
            </TimelineContent>
            <TimelineContent>Estatus: { estatusIndemnizacion }</TimelineContent>
          </div>
        </TimelineItem>
      </Timeline>
    </>
  );
}

interface IPropsTest {
  esRobo: boolean;
}

const ContenedorTest = (props: IPropsTest) => {

  const { esRobo } = props;

  const history = useHistory();
  const estadoApp = useSelector((estado: IRedux) => estado);

  const redirect = (route: string = "preguntas") => {
    if (route === "preguntas") {
      history.push("asistencia-pt");
      return;
    }

    if (route === "contacto") {
      let tipoAtencionParam = esRobo ? "robo" : "total";
      switch(estadoApp.tipoAtencionIndemnizacion) {
        case "DG":
            tipoAtencionParam = "global"
            break;
        case "DP":
          tipoAtencionParam = "parcial"
          break;
      }
      history.push({
        pathname: "asistencia-hdi",
        state: {
          tipoPersona: "f",
          tipoAtencion: tipoAtencionParam,
        },
      });
      return;
    }

    history.push({
      pathname: "documentacion-indemnizacion",
      search: "?tipoAtencion=PT",
    });
  };

  return (
    <>
      {/* <ReporteSiniestroCampo>
        <b>Estatus:</b> Reúne tus documentos
      </ReporteSiniestroCampo> */}
      <ReporteSiniestroCampo
        className="enlace text-14"
        onClick={() => redirect("contacto")}
      >
        Contacto HDI
      </ReporteSiniestroCampo>
      <TimeLine esRobo={esRobo}/>
    </>
  );
};

interface IPropsPrincipal {
  temaBoton: string;
  esRobo: boolean;
}

const ContenedorPerdidaTotalNuevo = (props: IPropsPrincipal) => {
  const { temaBoton, esRobo } = props;
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado: IRedux) => estado);

  const [desplegarSecciones, asignarValorDesplegarSecciones] =
    useState(mostrarSecciones);

  const asignarDesplegarSecciones = () => {
    asignarValorDesplegarSecciones(!desplegarSecciones);
    mostrarSecciones = !desplegarSecciones;
    if (!desplegarSecciones) {
      // obtenerDocumentacion({
      //   variables: { numeroReporte: numeroReportePorDefecto },
      // });
    }
  };

  /**
   * Si se muestra este componente es por que ya hay un tipo de atención
   * PT o DP
   */

  const [titulo, setTitulo] = useState<string>("3.");
  const [num, setNum] = useState<number>(3);

  useEffect(() => {
    if (esRobo) {
      setNum(4);
      if (estadoApp.tipoAtencionIndemnizacion === "PT") {
        setTitulo("Indemnización: Robo total");
      } else {
        setTitulo("Indemnización");
      }
    } else {
      setNum(3);
      if (estadoApp.tipoAtencionIndemnizacion === "PT") {
        setTitulo("Pérdida total");
      } else if (estadoApp.tipoAtencionIndemnizacion === "DP") {
        setTitulo("Indemnización: daños parciales");
      } else if (estadoApp.tipoAtencionIndemnizacion === "DG") {
        setTitulo("Indemnización: daños globales");
      }
    }
  }, []);

  return (
    <EnvolvedorReparacion>
      <BotonDesplegarSecciones desplegado={desplegarSecciones} tema={temaBoton}>
        <ContenedorElementosMenuDesplegable onClick={asignarDesplegarSecciones}>
          {`${num}. ${titulo}`}
          {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
        </ContenedorElementosMenuDesplegable>
      </BotonDesplegarSecciones>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <SeparadorEspacio />
        <Secciones desplegado={desplegarSecciones}>
          <Seccion titulo="Proceso de indemnización" pendiente={false}>
            <ContenedorTest esRobo={esRobo} />
          </Seccion>
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReparacion>
  );
};

ContenedorPerdidaTotalNuevo.defaultProps = {
  temaBoton: "",
  esRobo: false
};

ContenedorPerdidaTotalNuevo.propTypes = {
  temaBoton: PropTypes.oneOf(["blanco", ""]),
  esRobo: PropTypes.string,
};

export default ContenedorPerdidaTotalNuevo;

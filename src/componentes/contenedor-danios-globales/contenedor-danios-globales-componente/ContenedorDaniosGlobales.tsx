/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useHistory } from "react-router-dom";
import {
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
  ContenedorSecciones,
  EnvolvedorReparacion,
  Secciones,
} from "../../contenedor-reparacion/contenedor-reparacion-componente/ContenedorReparacion.styled";
import { SeparadorEspacio } from "../../entrega/entrega-componente/Entrega.styled";
import Seccion from "../../seccion-pasos-progreso";
import { ReporteSiniestroCampo } from "../../reporte-siniestro/reporte-siniestro-componente/ReporteSiniestro.styled";
import {
  DocumentacionCampo,
  DocumentacionValor,
} from "../../documentacion/documentacion-componente/Documentacion.styled";
import "./ContenedorDaniosGlobales.scss";
import Boton from "../../boton/boton-componente/Boton";

let mostrarSecciones = false;

function LineaTiempoDocumentos() {
  const history = useHistory();

  const redirect = (route: string = "preguntas") => {
    if (route === "preguntas") {
      history.push("preguntas-frecuentes", { tipoAtencion: "PT" });
      return;
    }

    history.push({
      pathname: "documentacion-indemnizacion",
      search: "?tipoAtencion=PT",
    });
  };
  return (
    <Timeline
      sx={{
        "& .MuiTimelineItem-root:before": {
          flex: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-verde-linea" />
          <TimelineConnector className="color-verde-linea" />
        </TimelineSeparator>
        <div>
          <TimelineContent>
            {" "}
            <b>Reúne tus documentos</b>
          </TimelineContent>
          <TimelineContent>Estatus: Pendiente</TimelineContent>
          <TimelineContent>
            Porcentaje: <span style={{ color: "#65A518" }}>0%</span>{" "}
          </TimelineContent>
          <TimelineContent>
            <Boton etiqueta="Subir documentos" tema="simple" />
          </TimelineContent>
          <TimelineContent
            className="enlace"
            onClick={() => redirect("documentos")}
          >
            Ver documentos necesarios
          </TimelineContent>
        </div>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-verde-linea" />
          <TimelineConnector className="color-verde-linea" />
        </TimelineSeparator>
        <div>
          <TimelineContent>
            <b>Entrega de Documentos</b>
          </TimelineContent>
          <TimelineContent>Estatus: Pendiente</TimelineContent>
          <TimelineContent>
            Oficina que recibió: <b>Nombre oficina</b>
          </TimelineContent>
        </div>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="color-verde-linea" />
        </TimelineSeparator>
        <div>
          <TimelineContent>
            <b>Pago de indemnización</b>
          </TimelineContent>
          <TimelineContent>Estatus: Pendiente</TimelineContent>
          <TimelineContent>Fecha estimada: DD/MM/YYYY</TimelineContent>
        </div>
      </TimelineItem>
    </Timeline>
  );
}

const ContenedorProcesoIndemnizacion = () => {
  const history = useHistory();

  const redirect = (route: string = "preguntas") => {
    if (route === "preguntas") {
      //! El tipo de atencion puede cambiar dependiendo del servicio
      history.push("preguntas-frecuentes", { tipoAtencion: "PT" });
      return;
    }

    history.push({
      pathname: "documentacion-indemnizacion",
      search: "?tipoAtencion=PT",
    });
  };

  return (
    <>
      <ReporteSiniestroCampo>
        <b>Estatus:</b> Reúne tus documentos
      </ReporteSiniestroCampo>
      <ReporteSiniestroCampo
        className="enlace text-14"
        onClick={() => redirect("preguntas")}
      >
        Preguntas frecuentes
      </ReporteSiniestroCampo>
      <LineaTiempoDocumentos />
    </>
  );
};

const ContenedorDaniosGlobales = (props: { temaBoton: string }) => {
  const { temaBoton } = props;

  const [desplegarSecciones, asignarValorDesplegarSecciones] =
    useState(mostrarSecciones);

  const asignarDesplegarSecciones = () => {
    asignarValorDesplegarSecciones(!desplegarSecciones);
    mostrarSecciones = !desplegarSecciones;
  };

  return (
    <EnvolvedorReparacion>
      <BotonDesplegarSecciones desplegado={desplegarSecciones} tema={temaBoton}>
        <ContenedorElementosMenuDesplegable onClick={asignarDesplegarSecciones}>
          3. Daños globales
          {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
        </ContenedorElementosMenuDesplegable>
      </BotonDesplegarSecciones>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <SeparadorEspacio />
        <Secciones desplegado={desplegarSecciones}>
          <Seccion titulo="Proceso de indemnizacion" pendiente={false}>
            <ContenedorProcesoIndemnizacion />
          </Seccion>
          <Seccion titulo="Resúmen de indemnizacion" pendiente={false}>
            <>
              <DocumentacionCampo>Monto indemnización:</DocumentacionCampo>
              <DocumentacionValor>$0, 000.000 MXN</DocumentacionValor>

              <DocumentacionCampo>Monto deducible:</DocumentacionCampo>
              <DocumentacionValor>$0, 000.000 MXN</DocumentacionValor>

              <DocumentacionCampo>Monto a pagar:</DocumentacionCampo>
              <DocumentacionValor>$0, 000.000 MXN</DocumentacionValor>
            </>
          </Seccion>
          <Seccion titulo="Método de pago" pendiente={false}>
            <>
              <DocumentacionCampo>Método seleccionado:</DocumentacionCampo>
              <DocumentacionValor>Transferencia</DocumentacionValor>

              <DocumentacionCampo>Número de transferencia:</DocumentacionCampo>
              <DocumentacionValor>NNNNNNNNNNNNN</DocumentacionValor>
            </>
          </Seccion>
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReparacion>
  );
};

export default ContenedorDaniosGlobales;

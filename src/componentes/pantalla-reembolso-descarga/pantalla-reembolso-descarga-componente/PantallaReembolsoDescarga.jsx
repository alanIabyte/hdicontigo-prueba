import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { loader } from "graphql.macro";
import { v4 } from "uuid";
import { useQuery } from "@apollo/react-hooks";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  MensajePequeno,
  Titulo,
} from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import BotonContenedor from "../../boton/boton-componente/Boton.contenedor";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import IndicadorCarga from "../../indicador-carga";
import { ContenedorRegresar } from "../../pantalla-detalle-poliza/pantalla-detalle-poliza-componente/PantallaDetallePoliza.styled";
import Contenedor from "./PantallaReembolsoDescarga.styed";

const diccionario = {
  titulo: "Descargar documentos para reembolso",
  mensaje:
    "Descarga y completa los siguientes documentos. Súbelos al momento de solicitar tu reembolso.",
  opciones: {
    bancarios: "Formulario de transferencia bancaria (Obligatorio)",
    reembolso: "Formulario de reembolso (Obligatorio)", // Evento médico
    reclamacion: "Formulario de reclamación (Obligatorio)",
  },
};

export const PantallaReembolsoDescarga = ({
  establecerEstadoPantalla,
  establecerEstadoOpciones,
}) => {
  const OBTENER_DOCS_REEMBOLSO = loader(
    "../../../graphQL/query/poliza/gmm_obtenerFormatosReembolso.graphql"
  );
  let documentosReembolso;

  const { data, loading } = useQuery(OBTENER_DOCS_REEMBOLSO);

  const convertirYDescargar = (documento) => {
    const binaryString = window.atob(documento.base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const newBlob = new Blob([bytes.buffer], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
    }
    const dataBlob = window.URL.createObjectURL(newBlob);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = dataBlob;
    link.download = documento.nombre;
    link.click();
    window.URL.revokeObjectURL(dataBlob);
    link.remove();
  };

  const obtenerDocumento = (categoria) => {
    if (categoria === "pago") {
      convertirYDescargar(documentosReembolso[0]);
    } else if (categoria === "medicos") {
      convertirYDescargar(documentosReembolso[1]);
    } else {
      convertirYDescargar(documentosReembolso[2]);
    }
  };

  useEffect(() => {
    if (!loading && data.gmm_obtenerFormatosReembolso.completado) {
      documentosReembolso = data.gmm_obtenerFormatosReembolso.dato.documentos;
    }
  }, [data, loading]);

  return (
    <EnvolvedorPantalla key={v4()}>
      {loading && !data && <IndicadorCarga />}

      <EncabezadoPolizasSiniestradas
        regresar
        funcionRegresar={() => {
          establecerEstadoPantalla(true);
          establecerEstadoOpciones("");
        }}
      />
      <Contenedor>
        <ContenedorRegresar
          onClick={() => {
            establecerEstadoPantalla(true);
            establecerEstadoOpciones("");
          }}
        >
          <RegresarIcono className="icono-regresar" />
          <MensajePequeno>Regresar</MensajePequeno>
        </ContenedorRegresar>
      </Contenedor>
      <Pantalla>
        <Titulo>{diccionario.titulo}</Titulo>
        <MensajePequeno>{diccionario.mensaje}</MensajePequeno>

        <Titulo
          style={{ fontWeight: "normal", fontSize: 15, marginRight: "auto" }}
        >
          {diccionario.opciones.bancarios}
        </Titulo>
        <BotonContenedor
          etiqueta="Descargar documento"
          tema="simple-gris"
          enClick={() => obtenerDocumento("pago")}
          pequeno
        />

        <Titulo
          style={{ fontWeight: "normal", fontSize: 15, marginRight: "auto" }}
        >
          {diccionario.opciones.reembolso}
        </Titulo>
        <BotonContenedor
          etiqueta="Descargar documento"
          tema="simple-gris"
          enClick={() => obtenerDocumento("medicos")}
          pequeno
          style={{ maringRight: "auto" }}
        />

        <Titulo
          style={{ fontWeight: "normal", fontSize: 15, marginRight: "auto" }}
        >
          {diccionario.opciones.reclamacion}
        </Titulo>
        <BotonContenedor
          etiqueta="Descargar documento"
          tema="simple-gris"
          enClick={() => obtenerDocumento("bancarios")}
          pequeno
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

PantallaReembolsoDescarga.propTypes = {
  establecerEstadoPantalla: PropTypes.func,
  establecerEstadoOpciones: PropTypes.func,
};

PantallaReembolsoDescarga.defaultProps = {
  establecerEstadoPantalla: () => {},
  establecerEstadoOpciones: () => {},
};

export default PantallaReembolsoDescarga;

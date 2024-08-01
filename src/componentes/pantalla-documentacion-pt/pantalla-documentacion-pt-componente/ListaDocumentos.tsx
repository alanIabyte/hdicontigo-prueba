/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Boton, IndicadorCarga } from "../..";
import { IDatoObtenerDocumentos } from "../../../interfaces/indemnizacion/Iindemnizacion";
import useAlerta from "../../../utils/useAlerta";
import AcordeonPantallaPoliza from "../../acordeon-detalle-poliza";
import { Alerta } from "../../alerta";
import {
  ColorAlterno,
  ValoresColorAlterno,
} from "../../pantalla-detalle-poliza/pantalla-detalle-poliza-componente/PantallaDetallePoliza.styled";
import "./styles.scss";
import svgInfoGris from "../../../recursos/iconos/info-gris.svg";

const OBTENER_DOC_S3 = loader(
  "../../../graphQL/query/indemnizacion/indemnizacion_obtenerDocumentoS3.graphql"
);

interface IProps {
  documentosRequeridos: IDatoObtenerDocumentos[];
  documentosHDI: IDatoObtenerDocumentos[];
}

const configAlertaDocInfo = {
  textoEncabezado: "",
  tipoIcono: "",
  colorAlerta: "",
  textoCuerpo: "",
};

const ListaDocumentos = ({ documentosRequeridos, documentosHDI }: IProps) => {
  // ! GraphQL
  const [
    descargarDocumentoS3,
    { data: dataDocumentoS3, loading: cargandoDocumentoS3 },
  ] = useLazyQuery(OBTENER_DOC_S3, {
    fetchPolicy: "no-cache",
  });

  const [requisitoActual, setRequisitoActual] = useState({
    index: 0,
    tipoDocumento: "",
    url: ""
  });

  const modalInfoDoc = useAlerta(configAlertaDocInfo);
  const [loadingState, setLoadingState] = useState(false);

  const convertirTextoConEnlaces = (texto: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = texto.split(" ");

    let resultado = "";

    parts.forEach((part, index) => {
      if (part.match(urlRegex)) {
        // Si la parte es una URL, crea un enlace
        resultado += ` <a key="${index}" href="${part}" target="_blank">${part}</a>`;
      } else {
        // Si no es una URL, muestra el texto normal
        resultado += ` ${part}`;
      }
    });

    return resultado;
  }

  const abrirModalDoc = (doc: IDatoObtenerDocumentos, index: number) => {

    const nuevaInfo = {
      ...configAlertaDocInfo,
      textoEncabezado: doc.nombre,
      textoCuerpo: convertirTextoConEnlaces(doc.descripcion),
    };
    setRequisitoActual({
      index,
      tipoDocumento: doc.tipoDocumento,
      url: doc.url
    });

    modalInfoDoc.actualizar(nuevaInfo);
    modalInfoDoc.mostrar();
  };

  const esUltimoElemento = () => {
    if (requisitoActual.tipoDocumento === "Requerido") {
      return requisitoActual.index === documentosRequeridos.length - 1;
    }

    return requisitoActual.index === documentosHDI.length - 1;
  };

  const accionesSliderRequisitos = (accion: string) => {
    let indexNuevoRequisito: number = 0;
    if (accion === "siguiente") {
      indexNuevoRequisito = requisitoActual.index + 1;
    }

    let urlActual = ""

    if (accion === "anterior") {
      indexNuevoRequisito =
        requisitoActual.index > 0 ? requisitoActual.index - 1 : 0;
    }
    const nuevoRequisito: any = {
      ...configAlertaDocInfo,
    };

    if (requisitoActual.tipoDocumento === "Requerido") {
      nuevoRequisito.textoCuerpo =
        convertirTextoConEnlaces(documentosRequeridos[indexNuevoRequisito].descripcion);
      nuevoRequisito.textoEncabezado =
        documentosRequeridos[indexNuevoRequisito].nombre;
      urlActual = documentosRequeridos[indexNuevoRequisito].url;
    }

    if (requisitoActual.tipoDocumento === "HDI") {
      nuevoRequisito.textoCuerpo =
        convertirTextoConEnlaces(documentosHDI[indexNuevoRequisito].descripcion);
      nuevoRequisito.textoEncabezado =
        documentosHDI[indexNuevoRequisito].nombre;
      urlActual = documentosHDI[indexNuevoRequisito].url;
    }

    setRequisitoActual({
      ...requisitoActual,
      index: indexNuevoRequisito,
      url: urlActual,
    });

    modalInfoDoc.actualizar(nuevoRequisito);
    modalInfoDoc.mostrar();
  };

  const accionDescargarDocumento = () => {
    setLoadingState(true);
    descargarDocumentoS3({
      variables: {
        url: requisitoActual.url,
      },
    });
  };

  useEffect(() => {

    const getUrlFile = async () => {
      const response = await fetch(
        dataDocumentoS3?.obtener_documentos_indemnizacion.dato.url
      );

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      const fileName = dataDocumentoS3?.obtener_documentos_indemnizacion.dato.nombre;
      const type = dataDocumentoS3?.obtener_documentos_indemnizacion.dato.type;

      a.href = blobUrl;
      a.download = `${fileName}.${type}`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(blobUrl);
      setLoadingState(false);
    };

    if (cargandoDocumentoS3) {
      return;
    }

    if (
      !cargandoDocumentoS3 &&
      dataDocumentoS3?.obtener_documentos_indemnizacion.completado
    ) {
      getUrlFile();
    }

    if (cargandoDocumentoS3) {
      setLoadingState(true);
    }
  }, [dataDocumentoS3, cargandoDocumentoS3]);

  const docTieneUrl = () => requisitoActual.url.trim() !== "";

  return (
    <>
      {loadingState && <IndicadorCarga pantallaCompleta />}
      <Alerta {...modalInfoDoc} manejarCierre={modalInfoDoc.cerrar}>
        {
            docTieneUrl() ?
            <div className="download-button">
              <Boton
                etiqueta="Descargar"
                pequeno
                enClick={() => accionDescargarDocumento()}
              />
            </div>
            :
            <div className="contenedor-flex">
              <Boton
                etiqueta="Anterior"
                pequeno
                enClick={() => accionesSliderRequisitos("anterior")}
                deshabilitado={requisitoActual.index === 0}
              />
              <Boton
                etiqueta="Siguiente"
                pequeno
                enClick={() => accionesSliderRequisitos("siguiente")}
                deshabilitado={esUltimoElemento()}
              />
            </div>
          }
      </Alerta>
      <AcordeonPantallaPoliza show titulo="Documentos requeridos">
        <ValoresColorAlterno>
          {documentosRequeridos.map((documento, index) => (
            <ColorAlterno
              onClick={() => abrirModalDoc(documento, index)}
              style={{ cursor: "pointer" }}
            >
              {documento.nombre}
              <img src={svgInfoGris} alt="" />
            </ColorAlterno>
          ))}
        </ValoresColorAlterno>
      </AcordeonPantallaPoliza>
      <AcordeonPantallaPoliza show titulo="Documentación HDI">
        <ValoresColorAlterno>
          {documentosHDI.map((documento, index) => (
            <ColorAlterno
              onClick={() => abrirModalDoc(documento, index)}
              style={{ cursor: "pointer" }}
            >
              {documento.nombre}
              <img src={svgInfoGris} alt="" />
            </ColorAlterno>
          ))}
        </ValoresColorAlterno>
      </AcordeonPantallaPoliza>
    </>
  );
};

export default ListaDocumentos;

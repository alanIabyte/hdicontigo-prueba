import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import constantes from "../../../recursos/constantes";
import Configuraciones from "../../../servicios/configuraciones";
import { Alerta } from "../../alerta";
import BotonContenedor from "../../boton";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import { Subtitulo2Negritas } from "../../componentes-styled-compartidos/Textos";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import IndicadorCarga from "../../indicador-carga";
import {
  GrupoDetalle,
  Propiedad,
} from "../../pantalla-detalle-poliza/pantalla-detalle-poliza-componente/PantallaDetallePoliza.styled";
import {
  MensajePequeno,
  Titulo,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";

const diccionario = {
  titulo: "Resumen y envio",
  subtitulo:
    "Revisa que toda la información esté correcta antes de enviar tu reembolso.",
  documentoNoSubido: "Documento no agregado.",
};

const SOLICITAR_REEMBOLSO = loader(
  "../../../graphQL/query/poliza/gmm_solicitarReembolso.graphql"
);

const SUBIR_IMAGENES_REEMBOLSO = loader(
  "../../../graphQL/query/reembolsos/gmm_solicitarReembolsoDoc.graphql"
);

const OBTENER_IMAGENES_REEMBOLSO = loader(
  "../../../graphQL/query/reembolsos/obtener_imagenes_reembolso.graphql"
);

const nombreCookie = constantes.nombreDeCookie;

const PantallaResumenReembolso = () => {
  const history = useHistory();
  const location = useLocation();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const token = objetoCookie && objetoCookie.access_token;

  const [info, setInfo] = useState({});
  const [xmlFactura, setXmlFactura] = useState({});
  const [infoPdfFactura, setInfoPdfFactura] = useState({});
  const [infoBancaria, setInfoBancaria] = useState({});
  const [infoMedica, setInfoMedica] = useState({});
  const [adicional, setAdicional] = useState({});
  const [numPoliza, setNumPoliza] = useState("");
  const [documentacionMutation, setDocumentacionMutation] = useState([]);
  const [valorCargando, asignarValorCargando] = useState(false);
  const [deshabilitarBoton, asignarDeshabilitarBoton] = useState(false);
  const [mostrarModalReedireccion, setMostrarModalReedireccion] =
    useState(false);
  const [mostrarAlertaError, setMostrarAlertaError] = useState(false);

  const [realizarSolicitud, { loading, error, data }] =
    useLazyQuery(SOLICITAR_REEMBOLSO);

  const [
    obtenerImagenesReembolso,
    {
      loading: cargandoImagenesReembolso,
      data: imagenesReembolso,
      error: errorReembolso,
    },
  ] = useLazyQuery(OBTENER_IMAGENES_REEMBOLSO, {
    fetchPolicy: "cache-and-network",
  });

  const [
    subirDocumentos,
    {
      loading: loadingSubirDocs,
      data: dataDocsReembolso,
      error: errorDocsReembolso,
    },
  ] = useLazyQuery(SUBIR_IMAGENES_REEMBOLSO, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (location.state) {
      const { poliza, documentacion, numeroPoliza } = location.state;
      setInfo(poliza);
      const { xmlFactura: xmlFactura1, otros } = documentacion;
      console.log(xmlFactura1, otros);

      // infoAsegurado = poliza.nombre;
      setXmlFactura(xmlFactura1);
      setNumPoliza(numeroPoliza);

      setDocumentacionMutation(otros);
      otros.forEach((documento) => {
        if (documento.tipoDocumento === "BANK") {
          setInfoBancaria(documento);
        } else if (documento.tipoDocumento === "MEDICAL") {
          setInfoMedica(documento);
        } else if (documento.tipoDocumento === "BILL") {
          setInfoPdfFactura(documento);
        } else {
          setAdicional(documento);
        }
      });
    } else {
      history.push("/inicio");
    }
  }, []);

  const eliminarCorchetes = (texto) =>
    texto.replaceAll("[", "").replaceAll("]", "");

  const cargaImagenAServidor = async (doc) => {
    const imagenBase64Datos = await fetch(doc.base64);
    const imagenBlob = await imagenBase64Datos.blob();
    const nombreActualizado = doc.nombre.split(" ").join("");
    console.log(eliminarCorchetes(nombreActualizado));

    if (imagenBlob) {
      const respuestaServidor = await fetch(
        // eslint-disable-next-line max-len
        `${Configuraciones.api}/reembolsos/${numPoliza}/${
          info.idAsegurado
        }/0/${eliminarCorchetes(nombreActualizado)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            authorization: token,
          },
          body: imagenBlob,
        }
      )
        .then((respuesta) => respuesta.json())
        // eslint-disable-next-line no-return-assign, no-param-reassign
        .then((respuesta) => (doc.base64 = respuesta.dato))
        .catch((errorEnRespuesta) => ({ error: errorEnRespuesta }));
      if (respuestaServidor?.error) {
        console.log("Error");
      } else {
        console.log(doc);
        return respuestaServidor;
      }
      console.log(respuestaServidor);
      return respuestaServidor;
    }
    // asignarValorErrorImagen(diccionario.textoError2);
    return null;
  };

  const cargarXmlAServidor = async (base64) => {
    const nombreActualizado = xmlFactura.nombre.split(" ").join("");
    if (base64) {
      const respuestaServidor = await fetch(
        // eslint-disable-next-line max-len

        `${Configuraciones.api}/reembolsos/${numPoliza}/${info.idAsegurado}/0/${nombreActualizado}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            authorization: token,
          },
          body: base64,
        }
      );
      // .then(respuesta => respuesta.json())
      // .then(respuesta => console.log(respuesta.dato))
      // .then(respuesta => xmlFactura.base64 = respuesta.dato)
      // // .catch(errorEnRespuesta => ({ error: errorEnRespuesta }));
      // .catch(errorEnRespuesta => console.log(errorEnRespuesta))
      const resp = await respuestaServidor.json();
      // console.log(resp);
      xmlFactura.base64 = resp.dato;
      if (resp?.error) {
        console.log("Error");
      } else {
        // asignarValorErrorImagen("");
        console.log(xmlFactura);
        return respuestaServidor;
      }
      console.log(respuestaServidor);
      return respuestaServidor;
    }
    // asignarValorErrorImagen(diccionario.textoError2);
    return null;
  };

  const eliminarCeros = (poliza) => poliza.slice(4, 10);

  const ejecutarSolicitudQuery = () => {
    const objetoDoc = {
      nombre: "",
      base64: "",
      extension: "",
      tipoDocumento: "",
    };

    realizarSolicitud({
      // eslint-disable-next-line object-shorthand
      variables: {
        idPoliza: eliminarCeros(numPoliza),
        idAsegurado: info.idAsegurado.toString(),
        xmlFactura: xmlFactura.base64,
        folio: "",
        claimId: "",
        // documentacion: documentacionMutation,
        documentacion: [objetoDoc],
      },
    });
  };

  const reedirigir = () => {
    history.push("/mis-reembolsos", {
      numeroPoliza: numPoliza,
      paginaAnterior: "/resumen-reembolso",
    });
  };

  const ejecutarMutation = async () => {
    console.log("almost there. Keep pushing");
    const xmlString = xmlFactura.base64;
    console.log(xmlString);
    asignarValorCargando(true);
    // console.log(xmlString);
    await cargarXmlAServidor(xmlString, xmlFactura.nombre);
    await documentacionMutation.forEach(async (doc) => {
      await cargaImagenAServidor(doc);
    });
    // asignarValorCargando(false);

    setTimeout(() => {
      obtenerImagenesReembolso({
        variables: {
          numeroPoliza: numPoliza,
          beneficiario: info.idAsegurado.toString(),
        },
      });
    }, 1500);

    setTimeout(() => {
      ejecutarSolicitudQuery();
    }, 3000);
  };

  const asignarUrlFirmada = (imagenReembolso) => {
    const extension = imagenReembolso.nombre.split(".")[1];

    if (extension === "xml") {
      xmlFactura.base64 = imagenReembolso.url;
    } else {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < documentacionMutation.length; i++) {
        if (
          documentacionMutation[i].nombre.split(" ").join("") ===
          eliminarCorchetes(imagenReembolso.nombre)
        ) {
          documentacionMutation[i].base64 = imagenReembolso.url;
        }
      }
    }
  };

  useEffect(() => {
    if (
      !cargandoImagenesReembolso &&
      imagenesReembolso &&
      imagenesReembolso.obtener_imagenes_reembolso.dato
    ) {
      const res = imagenesReembolso.obtener_imagenes_reembolso.dato;
      if (res) {
        // eslint-disable-next-line array-callback-return
        res.map((imagen) => {
          asignarUrlFirmada(imagen);
        });

        //! Despues de obtener las imagenes y asignar el url, ejecutar el query para reembolso
        // ejecutarMutation();
      }
    }

    if (!cargandoImagenesReembolso && errorReembolso) {
      asignarValorCargando(false);
      setMostrarAlertaError(true);
    }
  }, [cargandoImagenesReembolso, imagenesReembolso, errorReembolso]);

  useEffect(() => {
    if (!loading && error) {
      console.log("hay error");
      asignarValorCargando(false);
      setMostrarAlertaError(true);
      return;
    }

    if (!loading && data) {
      // // console.log(data);
      if (
        data.gmm_solicitarReembolso &&
        data.gmm_solicitarReembolso.completado &&
        data.gmm_solicitarReembolso.dato
      ) {
        asignarValorCargando(true);
        const res = data.gmm_solicitarReembolso.dato;
        subirDocumentos({
          variables: {
            idPoliza: eliminarCeros(numPoliza),
            idAsegurado: info.idAsegurado.toString(),
            xmlFactura: "",
            folio: res.folio,
            claimId: res.claimId,
            documentacion: documentacionMutation,
            // documentacion: [objetoDoc],
          },
        });
      } else {
        setMostrarAlertaError(true);
        asignarValorCargando(false);
        // eslint-disable-next-line no-useless-return
        return;
      }
      // ! Subir documentos restantes
    }
  }, [loading, data, error]);

  useEffect(() => {
    if (
      !loadingSubirDocs &&
      dataDocsReembolso &&
      dataDocsReembolso.gmm_solicitarReembolsoDoc
    ) {
      const resp = dataDocsReembolso.gmm_solicitarReembolsoDoc;
      if (resp.completado) {
        asignarValorCargando(false);
        setMostrarAlertaError(false);
        asignarDeshabilitarBoton(true);
        setMostrarModalReedireccion(true);
      }
    }

    if (!loadingSubirDocs && errorDocsReembolso) {
      asignarValorCargando(false);
      setMostrarAlertaError(true);
    }
  }, [loadingSubirDocs, dataDocsReembolso, errorDocsReembolso]);

  return (
    <EnvolvedorPantalla key={v4()}>
      <EncabezadoPolizasSiniestradas />
      {mostrarModalReedireccion && (
        <Alerta
          mostrarModal={mostrarModalReedireccion}
          colorAlerta="azul"
          textoEncabezado="Solicitud de reembolso enviada correctamente"
          tipoIcono="palomita"
          etiquetaBoton="Aceptar"
          temaBoton="estandar"
          manejarCierre={() => reedirigir()}
          funcionLlamadaBoton={() => reedirigir()}
        />
      )}

      {mostrarAlertaError && (
        <Alerta
          mostrarModal={mostrarAlertaError}
          colorAlerta="rojo"
          textoEncabezado="Oh no! Se produjo un error. Intentalo de nuevo"
          temaBoton="estandar"
          etiquetaBoton="Aceptar"
          tipoIcono="alerta"
          manejarCierre={() => setMostrarAlertaError(false)}
          funcionLlamadaBoton={() => setMostrarAlertaError(false)}
        />
      )}
      <Pantalla>
        {valorCargando ? <IndicadorCarga /> : null}

        <Titulo>{diccionario.titulo}</Titulo>
        <MensajePequeno>{diccionario.subtitulo}</MensajePequeno>

        <GrupoDetalle
          style={{ display: "flex", width: "100%", flexDirection: "column" }}
        >
          <Subtitulo2Negritas style={{ textAlign: "left" }}>
            Asegurado
          </Subtitulo2Negritas>
          <Propiedad>{info.nombre}</Propiedad>

          <Subtitulo2Negritas style={{ textAlign: "left", marginTop: "20px" }}>
            Número de póliza
          </Subtitulo2Negritas>
          <Propiedad>{numPoliza}</Propiedad>

          <Subtitulo2Negritas style={{ textAlign: "left", marginTop: "20px" }}>
            Facturas
          </Subtitulo2Negritas>
          <Propiedad>{xmlFactura.nombre}</Propiedad>
          <Propiedad>{infoPdfFactura.nombre}</Propiedad>

          <Subtitulo2Negritas style={{ textAlign: "left", marginTop: "20px" }}>
            Información bancaria
          </Subtitulo2Negritas>
          <Propiedad>
            {Object.keys(infoBancaria).length === 0
              ? diccionario.documentoNoSubido
              : infoBancaria.nombre}
          </Propiedad>

          <Subtitulo2Negritas style={{ textAlign: "left", marginTop: "20px" }}>
            Información medica
          </Subtitulo2Negritas>
          <Propiedad>
            {Object.keys(infoMedica).length === 0
              ? diccionario.documentoNoSubido
              : infoMedica.nombre}
          </Propiedad>

          <Subtitulo2Negritas style={{ textAlign: "left", marginTop: "20px" }}>
            Información adicional
          </Subtitulo2Negritas>
          <Propiedad style={{ marginBottom: "40px" }}>
            {Object.keys(adicional).length === 0
              ? diccionario.documentoNoSubido
              : adicional.nombre}
          </Propiedad>

          <BotonContenedor
            etiqueta="Enviar solicitud de reembolso"
            enClick={() => ejecutarMutation(numPoliza)}
            deshabilitado={deshabilitarBoton}
            tema="estandar"
            tipo="button"
          />
        </GrupoDetalle>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaResumenReembolso;

/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
// import _ from "lodash";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import moment from "moment";
import constantes from "../../../recursos/constantes";
import Configuraciones from "../../../servicios/configuraciones";
import { Alerta } from "../../alerta";
import BotonContenedor from "../../boton";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
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
import {
  AcordeonContenedorFacturas,
  Encabezado,
  TituloAcordeon,
  Manejador,
  Contenido,
  SeparadorLinea,
  Titulo2,
  Valor,
  Pantalla,
} from "./ResumenReembolsoV2.styled";

// TODO: Ejemplo de regreso de info reembolso.
const archivo = {
  data: {
    status: false,
    doctosCorrectos: [
      {
        folio: 114,
        claimId: "dd29db45-e56d-40bd-a857-24ddc0fabbc2",
        idDocumento: 365,
        id: 1,
        message: null,
      },
    ],
    doctosIncorrectos: [],
  },
  success: true,
  message: "Success",
  code: "IMPOGM10001",
  exc: null,
  appName: null,
  hostName: null,
  procces: null,
  structureData: {},
};

// TODO: Diccionario.
const diccionario = {
  titulo: "Resumen y envío",
  subtitulo:
    "Revisa que toda la información esté correcta antes de enviar tu reembolso.",
  documentoNoSubido: "Documento no agregado.",
};
// TODO: Queries
const SOLICITAR_REEMBOLSO = loader(
  "../../../graphQL/query/reembolsos/gmm_solicitarReembolsoV2.graphql"
);

const SUBIR_IMAGENES_REEMBOLSO = loader(
  "../../../graphQL/query/reembolsos/gmm_solicitarReembolsoDocsV2.graphql"
);

const OBTENER_IMAGENES_REEMBOLSO = loader(
  "../../../graphQL/query/reembolsos/obtener_imagenes_reembolso.graphql"
);

const nombreCookie = constantes.nombreDeCookie;

const PantallaResumenReembolsoV2 = () => {
  const history = useHistory();
  const location = useLocation();
  const { numeroPoliza, poliza, listaReembolsos } = location.state;
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const token = objetoCookie && objetoCookie.access_token;
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }

  const [numPoliza, setNumPoliza] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [original, setOriginal] = useState([]);
  const [copiaLista, setCopiaLista] = useState([]); // copia del original.
  const [ids, setIds] = useState([]);
  const [listaFacturas, setListaFacturas] = useState([]); // Para visualización.
  const [info, setInfo] = useState({}); // Para visualización de la parte de arriba.
  const [infoReclamacion, setReclamacion] = useState({});
  // ! No borrar estos
  const [valorCargando, asignarValorCargando] = useState(false);
  const [deshabilitarBoton, asignarDeshabilitarBoton] = useState(false);
  const [mostrarModalReedireccion, setMostrarModalReedireccion] =
    useState(false);
  const [mostrarAlertaError, setMostrarAlertaError] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // TODO: GraphQL queries.
  const [
    realizarSolicitud,
    { loading: loadingSolicitud, error: errorSolicitud, data: dataSolicitud },
  ] = useLazyQuery(SOLICITAR_REEMBOLSO, {
    fetchPolicy: "cache-and-network",
  });

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
  // TODO: Se setean los valores para los documentos...
  useEffect(() => {
    if (!location.state) {
      history.push("/inicio");
    }
  }, [location.state]);

  useEffect(() => {
    // const newArray = deepClone(listaReembolsos); // _.cloneDeep(listaReembolsos);
    const newArray = JSON.parse(JSON.stringify(listaReembolsos));
    console.log("ARR >>>:", newArray);
    setOriginal(newArray);

    const listaInmutable = newArray.map((obj) => ({
      ...obj,
      documentacion: obj.documentacion.map((doc) => ({ ...doc })),
    }));

    setCopiaLista(listaInmutable);
    setIds(newArray.map((item) => item.id));
    setInfo(poliza);
    setNumPoliza(numeroPoliza);
    setCorreoElectronico(listaInmutable[0].correo);
    const objReclamacion = newArray.flatMap((item) =>
      item.documentacion.filter((doc) => doc.tipoDocumento === "MEDICAL")
    );
    if (objReclamacion.length > 0) {
      setReclamacion(objReclamacion[0]);
    } else {
      setReclamacion({});
    }

    const arrayDocumentos = newArray.map((item) => ({
      ...item,
      documentacion: item.documentacion.filter(
        (doc) => doc.tipoDocumento !== "MEDICAL"
        // && (doc.tipoDocumento !== "OTHERS" || doc.nombre !== "")
      ),
    }));
    setListaFacturas(arrayDocumentos); // Para visualización
  }, [listaReembolsos]);

  const eliminarCorchetes = (texto) =>
    texto.replaceAll("[", "").replaceAll("]", "");

  const cargarXmlAServidor = async (doc, id) => {
    // console.log(doc, "id: ", id);
    const nombreActualizado = doc.nombre.split(" ").join("");
    const respuestaServidor = await fetch(
      // eslint-disable-next-line max-len
      `${Configuraciones.api}/reembolsos/${numPoliza}/${info.idAsegurado}/${id}/${nombreActualizado}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          authorization: token,
        },
        body: doc.base64,
      }
    );
    const resp = await respuestaServidor.json();
    // eslint-disable-next-line no-return-assign, no-param-reassign
    doc.base64 = resp.dato;
    if (resp?.error) {
      console.log("Error: ", resp?.error);
    } else {
      return respuestaServidor;
    }
    return respuestaServidor;
  };

  const cargaImagenAServidor = async (id, doc) => {
    if (doc.extension === ".xml") {
      cargarXmlAServidor(doc, id);
    } else {
      const b64 = await fetch(doc.base64);
      // Esto es para cuando la primera vez lo hace, si ya está, entonces se salta el método.
      const blob = await b64.blob();
      const nombreActualizado = doc.nombre.split(" ").join("");
      if (blob) {
        const respuestaServidor = await fetch(
          // eslint-disable-next-line max-len
          `${Configuraciones.api}/reembolsos/${numPoliza}/${
            info.idAsegurado
          }/${id}/${eliminarCorchetes(nombreActualizado)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
              authorization: token,
            },
            body: blob,
          }
        )
          .then((respuesta) => respuesta.json())
          // eslint-disable-next-line no-return-assign, no-param-reassign
          .then((respuesta) => (doc.base64 = respuesta.dato))
          .catch((errorEnRespuesta) => ({ error: errorEnRespuesta }));
        if (respuestaServidor?.error) {
          console.log("Error: ", respuestaServidor.error);
        } else {
          return respuestaServidor;
        }
        return respuestaServidor;
      }
    }
    return null;
  };

  const eliminarCeros = (pol) => pol.slice(4, 10);

  function formatearFecha(fecha) {
    return moment(fecha).format("YYYY-MM-DDHH:mm:ss");
  }

  // TODO: Método para guardar el json en S3 Bucket... (método 2 por si falla el GraphQL).
  const mandarJsonS3 = async (json) => {
    try {
      const fecha = formatearFecha(new Date());
      const nombreActualizado = `json${fecha}.json`;
      const respuestaServidor = await fetch(
        `${Configuraciones.api}/reembolsos/${numPoliza}/${info.idAsegurado}/0/${nombreActualizado}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            authorization: token,
          },
          body: json,
        }
      );

      const resp = await respuestaServidor.json();

      if (resp?.error) {
        console.log("Error:", resp.error);
      }

      return resp.dato || respuestaServidor;
    } catch (error) {
      console.error("Error durante la solicitud:", error);
      throw error; // Propagar el error hacia arriba
    }
  };

  // TODO: Se pide la solicitud del reembolso.
  const ejecutarSolicitudQuery = async () => {
    // A ver, traerme los datos ya con las url puestas y no con el base64 completo.

    const copiaListaInmutable = copiaLista.map((obj) => ({
      ...obj,
      documentacion: obj.documentacion.map((doc) => ({ ...doc })),
    }));
    console.log("Copia lista:", copiaListaInmutable);
    const documentosXML = copiaListaInmutable.flatMap((obj) =>
      obj.documentacion
        .filter((doc) => doc.extension === ".xml")
        .map((doc) => ({ id: obj.id, documentacion: doc, correo: doc.correo }))
    );
    console.log("Antes docsXML: ", documentosXML);
    const nuevoArr = documentosXML.map((item) => ({
      id: item.id.toString(),
      idPoliza: numPoliza.toString(),
      idAsegurado: info.idAsegurado,
      xmlFactura: item.documentacion.base64,
      correoElectronico: item.id === 1 ? copiaListaInmutable[0].correo : "",
      folio: "",
      claimId: "",
      documentacion: [],
    }));
    console.log("««« Petición de XML »»»", nuevoArr);
    // * Se hace la petición para obtener la info de las solicitudes.
    realizarSolicitud({
      variables: {
        documentos: nuevoArr,
      },
    });
  };

  // ! Se cambió a como estaba antes. No le muevas.
  const reedirigir = () => {
    history.push("/mis-reembolsos", {
      numeroPoliza: numPoliza,
      paginaAnterior: "/resumen-reembolso",
    });
  };

  const ejecutarMutation = async () => {
    try {
      asignarValorCargando(true);
      console.log("Sincronizando información, espere...");

      // Carga asíncrona de imágenes
      await Promise.all(
        copiaLista.flatMap((item) =>
          item.documentacion.map(async (doc) => {
            if (!doc.base64.includes("https://")) {
              // Cargar solo si no es una URL
              // console.log("entró aquí: ", doc);
              await cargaImagenAServidor(item.id, doc);
            }
          })
        )
      );

      // Obtener imágenes después de la carga
      await Promise.all(
        ids.map(async (item) => {
          await obtenerImagenesReembolso({
            variables: {
              numeroPoliza: numPoliza,
              beneficiario: info.idAsegurado.toString(),
              factura: item,
            },
          });
        })
      );

      // Esperar antes de ejecutar la solicitud del reembolso
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Ejecutar la solicitud del reembolso
      await ejecutarSolicitudQuery();
    } catch (error) {
      console.error("Error durante la ejecución de la mutación:", error);
      // Manejar el error según sea necesario
    }
  };

  // TODO: Asignación de la URL a cada objeto de la lista.
  const asignarUrlFirmada = (imgReem) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < copiaLista.length; i++) {
      const { documentacion } = copiaLista[i];
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < documentacion.length; j++) {
        if (
          documentacion[j].nombre.split(" ").join("") ===
          eliminarCorchetes(imgReem.nombre)
        ) {
          documentacion[j].base64 = imgReem.url;
        }
      }
    }
  };

  // TODO: Cargar las imágenes de reembolso.
  useEffect(() => {
    if (
      !cargandoImagenesReembolso &&
      imagenesReembolso &&
      imagenesReembolso.obtener_imagenes_reembolso.dato
    ) {
      const res = imagenesReembolso.obtener_imagenes_reembolso.dato;
      if (res) {
        console.log("Server subir docs: ", res);
        // eslint-disable-next-line array-callback-return
        res.map((imagen) => {
          asignarUrlFirmada(imagen);
        });
      }
    }

    if (!cargandoImagenesReembolso && errorReembolso) {
      console.log("Error al subir al server docs: ", errorReembolso);
      asignarValorCargando(false);
      setMostrarAlertaError(true);
    }
  }, [cargandoImagenesReembolso, imagenesReembolso, errorReembolso]);

  // ! Se suben los docs después de subir los XML.
  useEffect(() => {
    if (!loadingSolicitud && errorSolicitud) {
      console.log("Error en subir los xml al servidor.", errorSolicitud);
      asignarValorCargando(false);
      setMostrarAlertaError(true);
      return;
    }

    if (!loadingSolicitud && dataSolicitud) {
      if (
        dataSolicitud.gmm_solicitarReembolsoV2 &&
        dataSolicitud.gmm_solicitarReembolsoV2.completado &&
        dataSolicitud.gmm_solicitarReembolsoV2.dato
      ) {
        // asignarValorCargando(true);
        const res = dataSolicitud.gmm_solicitarReembolsoV2.dato;
        console.log("«« Response for solicitud XML »»", res);
        if (res.doctosCorrectos.length > 0) {
          // TODO: Esta cosa está bien drogradicta, así que cuidado.
          // Vamos a limpiar la copiaLista.
          const updatedArr = copiaLista.map((array) => {
            const filteredDocumentacion = array.documentacion.filter(
              (doc) => !(doc.extension === ".xml" || doc.nombre === "")
            );
            return { ...array, documentacion: filteredDocumentacion };
          });
          /* 
        "some" - Regresa un si o un no. Es un boolean.
        Si lo encuentra, entonces se usa el método "find" - 
        el que nos apoya a traernos toda la info si los IDs coinciden.
        */
          const resultDocs = res.doctosCorrectos
            .filter((item) =>
              updatedArr.some((doc) => doc.id.toString() === item.id)
            )
            .map((item) => {
              const matchingArr = updatedArr.find(
                (doc) => doc.id.toString() === item.id
              );

              if (matchingArr) {
                matchingArr.documentacion.forEach((j) => {
                  if (j.tipoDocumento === "CFDI") {
                    // eslint-disable-next-line no-return-assign, no-param-reassign
                    j.tipoDocumento = "BILL";
                  } else if (j.tipoDocumento === "REEMBOLSO") {
                    // este va a cambiar.
                    // eslint-disable-next-line no-return-assign, no-param-reassign
                    j.tipoDocumento = "OTHERS";
                  }
                });
              }
              // Crear un nuevo objeto sin la propiedad "__typename"
              const { __typename, ...restItem } = item;
              return {
                ...restItem,
                idPoliza: eliminarCeros(numPoliza),
                idAsegurado: info.idAsegurado,
                xmlFactura: "",
                correoElectronico: "",
                documentacion: matchingArr.documentacion, // solo docs, no con id.
              };
            });

          const objJson = mandarJsonS3(
            JSON.stringify({
              documentos: resultDocs,
            })
          );
          // Accedemos al promise.
          objJson
            .then((resultado) => {
              console.log("La URL del JSON:", resultado.toString());
              subirDocumentos({
                variables: {
                  urlJson: resultado.toString(),
                },
              });
            })
            .catch((error) => {
              console.error(error); // Manejo de errores si la promesa es rechazada
              setMostrarAlertaError(true);
              asignarValorCargando(false);
            });
        } else {
          setMostrarAlertaError(true);
          asignarValorCargando(false);
        }
      } else {
        console.log(
          "«« Response for solicitud XML (Error) »»",
          dataSolicitud.gmm_solicitarReembolsoV2.completado
        );
        setMostrarAlertaError(true);
        asignarValorCargando(false);
        // eslint-disable-next-line no-useless-return
        return;
      }
    }
  }, [loadingSolicitud, dataSolicitud, errorSolicitud]);

  // TODO: Subimos documentos

  useEffect(() => {
    if (
      // !loadingSubirDocs &&
      dataDocsReembolso &&
      dataDocsReembolso.gmm_solicitarReembolsoDocsV2
    ) {
      const resp = dataDocsReembolso.gmm_solicitarReembolsoDocsV2;
      console.log("Line 518 - Response for Docs Reeembolsos >> ", resp);
      if (resp.completado === true) {
        if (resp?.dato.doctosCorrectos.length > 0) {
          // * Desactivar lo demás.
          asignarValorCargando(false);
          setMostrarAlertaError(false);
          // * Activar redirección.
          asignarDeshabilitarBoton(true);
          setMostrarModalReedireccion(true);
        }
      } else {
        asignarValorCargando(false);
        setMostrarAlertaError(true);
      }
    }

    if (!loadingSubirDocs && errorDocsReembolso) {
      console.log("Error al subir los docs de reembolso", errorDocsReembolso);
      asignarValorCargando(false);
      setMostrarAlertaError(true);
    }
  }, [loadingSubirDocs, dataDocsReembolso, errorDocsReembolso]);

  const cambioTipoDocumento = (item) => {
    let titulo = "";
    switch (item) {
      case "BILL":
        titulo = "Factura en XML";
        break;
      case "CFDI":
        titulo = "Factura en PDF (CFDI)";
        break;
      case "BANK":
        titulo = "Cuenta bancaria";
        break;
      case "OTHERS":
        titulo = "Documentación adicional";
        break;
      case "MEDICAL":
        titulo = "Documento de reclamación";
        break;
      case "REEMBOLSO":
        titulo = "Documento de reembolso";
        break;
      default:
        titulo = "";
        break;
    }
    return titulo;
  };

  // TODO: Función para el acordión.
  const handleSectionClick = (sectionIndex) => {
    setActiveSection((prevActiveSection) =>
      prevActiveSection === sectionIndex ? null : sectionIndex
    );
  };

  return (
    <EnvolvedorPantalla key={v4()}>
      <EncabezadoPolizasSiniestradas />
      {mostrarModalReedireccion && (
        <Alerta
          mostrarModal={mostrarModalReedireccion}
          colorAlerta="azul"
          textoEncabezado="Solicitud de reembolso enviada correctamente."
          textoCuerpo="La respuesta a tu reembolso será en un plazo de 10 días hábiles."
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
          textoEncabezado="¡Oh no! Se produjo un error. Inténtalo de nuevo."
          temaBoton="estandar"
          etiquetaBoton="Aceptar"
          tipoIcono="alerta"
          manejarCierre={() => setMostrarAlertaError(false)}
          funcionLlamadaBoton={() => setMostrarAlertaError(false)}
        />
      )}

      <Pantalla>
        {valorCargando ? <IndicadorCarga pantallaCompleta="true" /> : null}
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
            Correo Electrónico
          </Subtitulo2Negritas>
          <Propiedad>{correoElectronico}</Propiedad>

          <Subtitulo2Negritas style={{ textAlign: "left", marginTop: "20px" }}>
            Formulario de reclamación
          </Subtitulo2Negritas>
          <Propiedad>
            {Object.keys(infoReclamacion).length === 0
              ? diccionario.documentoNoSubido
              : infoReclamacion.nombre}
          </Propiedad>
          <Titulo2
            style={{
              fontWeight: "normal",
              fontSize: 15,
              width: "auto",
            }}
          >
            Facturas agregadas
          </Titulo2>
          <SeparadorLinea />
        </GrupoDetalle>
        {listaFacturas.map((e) => (
          <>
            <AcordeonContenedorFacturas key={v4()} show="true">
              <Encabezado onClick={() => handleSectionClick(e.id)} key={v4()}>
                <TituloAcordeon key={v4()}>Factura no. {e.id}</TituloAcordeon>
                <Manejador key={v4()} abierto={activeSection === e.id}>
                  <KeyboardArrowDown
                    className="arrow-icono"
                    width={20}
                    key={v4()}
                  />
                </Manejador>
              </Encabezado>
              {activeSection === e.id ? (
                <Contenido>
                  {e.documentacion.map((item) => (
                    <>
                      <GrupoDetalle key={v4()}>
                        <Propiedad key={v4()}>
                          {cambioTipoDocumento(item.tipoDocumento)}
                        </Propiedad>
                        <Valor>
                          {item.nombre === ""
                            ? "Documento no agregado"
                            : item.nombre}
                        </Valor>
                      </GrupoDetalle>
                    </>
                  ))}
                </Contenido>
              ) : null}
            </AcordeonContenedorFacturas>
          </>
        ))}
        <BotonContenedor
          etiqueta="Enviar solicitud de reembolso"
          enClick={ejecutarMutation}
          deshabilitado={deshabilitarBoton}
          tema="estandar"
          tipo="button"
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaResumenReembolsoV2;

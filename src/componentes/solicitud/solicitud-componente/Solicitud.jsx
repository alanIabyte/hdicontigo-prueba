/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import Alerta from "../../alerta/alerta-componente/Alerta";
import BotonContenedor from "../../boton/boton-componente/Boton.contenedor";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  MensajePequeno,
  Titulo,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import { ContenedorInputs } from "./Solicitud.styled";
import SolicitudModal from "./SolicitudModal";
import Diccionario from "./diccionario";
import { getBase64 } from "../../../helpers";
import SolicitudInput from "./SolicitudInput";

const diccionario = {
  titulo: "Solicitar Reembolso",
  documentos: {
    facturas: "Facturas*",
    bancaria: "Informacion bancaria*",
    medica: "Documentacion medica",
    adicional: "Documentos adicionales",
  },
  boton: "Enviar solicitud de reembolso",
};

const Solicitud = (props) => {
  const history = useHistory();
  const { poliza, numeroPoliza } = props;

  const [mensajeAlerta, establecerMensajeAlerta] = useState("");
  const [estadoAlerta, asignarEstadoAlerta] = useState(true);
  const [estadoVerdeFactura, establecerEstadoVerdeFactura] = useState(false);
  const [estadoAmarilloFactura, establecerEstadoAmarilloFactura] =
    useState(false);
  const [estadoVerdeBancaria, establecerEstadoVerdeBancaria] = useState(false);
  const [estadoVerdeMedica, establecerEstadoVerdeMedica] = useState(false);
  const [estadoVerdeAdicional, establecerEstadoVerdeAdicional] =
    useState(false);
  const [archivosEstado, setArchivosEstado] = useState([]);

  const [estadoModalReedireccion, establecerEstadoModalReedireccion] =
    useState(false);
  const [estadoModalEliminarDocumento, setEstadoModalEliminarDocumento] =
    useState(false);
  const [estadoArchivosFactura, establecerEstadoArchivosFactura] = useState([]);
  const [estadoAlertaError, establecerEstadoAlertaError] = useState(false);
  const [alertaValidaDocumentos, setAlertaValidaDocumentos] = useState(false);
  const [alertaSoloUnArchivo, setAlertaSoloUnArchivo] = useState(false);
  const [inputFile, setInputFile] = useState();
  const fileInputFacturas = useRef();
  const fileInputBancaria = useRef();
  const fileInputMedica = useRef();
  const fileInputAdicional = useRef();

  const inputsRenderizado = [
    {
      nameInput: "facturas",
      acepta: ".xml, .pdf",
      tituloAcordeon: "Facturas*",
      descripcion: "Agregar un archivo xml y pdf",
      titulo: diccionario.documentos.facturas,
      validado: estadoVerdeFactura,
      faltante: estadoAmarilloFactura,
      ref: fileInputFacturas,
      multiple: true,
    },
    {
      nameInput: "bancaria",
      acepta: ".jpg, .pdf",
      tituloAcordeon: "Informacion bancaria*",
      descripcion: "Agregar un archivo pdf",
      titulo: diccionario.documentos.bancaria,
      validado: estadoVerdeBancaria,
      ref: fileInputBancaria,
      multiple: false,
    },
    {
      nameInput: "medica",
      acepta: ".pdf",
      tituloAcordeon: "Documentacion medica",
      descripcion: "Agregar un archivo pdf",
      titulo: diccionario.documentos.medica,
      validado: estadoVerdeMedica,
      ref: fileInputMedica,
      multiple: false,
    },
    {
      nameInput: "adicional",
      acepta: ".pdf",
      tituloAcordeon: "Documentos adicionales",
      descripcion: "Agregar un archivo pdf",
      titulo: diccionario.documentos.adicional,
      validado: estadoVerdeAdicional,
      ref: fileInputAdicional,
      multiple: false,
    },
  ];

  const cambiarEstadoValidacion = (e) => {
    // if (e.target.id === "facturas") {
    //   // if (e.target)
    //   console.log(e.target);
    //   establecerEstadoVerdeFactura(true);
    // } else if (e.target.id === "bancaria") {
    //   establecerEstadoVerdeBancaria(true);
    // } else if (e.target.id === "medica") {
    //   establecerEstadoVerdeMedica(true);
    // } else if (e.target.id === "adicional") {
    //   establecerEstadoVerdeAdicional(true);
    // }
    switch (e.target.id) {
      case "facturas":
        establecerEstadoVerdeFactura(true);
        break;
      case "bancaria":
        establecerEstadoVerdeBancaria(true);
        break;
      case "medica":
        establecerEstadoVerdeMedica(true);
        break;
      case "adicional":
        establecerEstadoVerdeAdicional(true);
        break;
      default:
        break;
    }
  };

  const eliminarValidacion = (id) => {
    switch (id) {
      case "facturas":
        establecerEstadoVerdeFactura(false);
        establecerEstadoAmarilloFactura(false);
        break;
      case "bancaria":
        establecerEstadoVerdeBancaria(false);
        break;
      case "medica":
        establecerEstadoVerdeBancaria(false);
        break;
      case "adicional":
        establecerEstadoVerdeAdicional(false);
        break;
      default:
        break;
    }
    // if (id === "facturas") {
    //   establecerEstadoVerdeFactura(false);
    //   establecerEstadoAmarilloFactura(false);
    // } else if (id === "bancaria") {
    //   establecerEstadoVerdeBancaria(false);
    // } else if (id === "medica") {
    //   establecerEstadoVerdeMedica(false);
    // } else if (id === "adicional") {
    //   establecerEstadoVerdeAdicional(false);
    // }
  };

  const obtenerObjetoDocumento = async (documento, id) => {
    const nombre = documento[0].name;
    const extension = `.${nombre.split(".")[nombre.split(".").length - 1]}`;

    let base64;
    if (id === "facturas" && extension === ".xml") {
      base64 = await getBase64(documento[0], "xml");
      // console.log(base64);
    } else {
      base64 = await getBase64(documento[0]);
    }

    const objetoDocumento = {
      nombre,
      base64,
      extension,
      tipoDocumento: "",
    };

    if (id === "facturas") {
      objetoDocumento.tipoDocumento = "BILL";
    } else if (id === "bancaria") {
      objetoDocumento.tipoDocumento = "BANK";
    } else if (id === "medica") {
      objetoDocumento.tipoDocumento = "MEDICAL";
    } else {
      objetoDocumento.tipoDocumento = "OTHERS";
    }

    // console.log(objetoDocumento);
    return objetoDocumento;
  };

  // ! Aun no esta implementado, NO realizar cambios!!
  const obtenerObjetoDocumentos = async (documentos, id) => {
    let objetoDocs;

    // eslint-disable-next-line prefer-const
    objetoDocs = documentos.map(async (documento) => {
      const nombre = documento.name;
      const extension = `.${nombre.split(".")[nombre.split(".").length - 1]}`;

      const base64 = await getBase64(documento, extension);

      const objetoDocumento = {
        nombre,
        base64,
        extension,
        tipoDocumento: "",
        idDocumento: 0,
      };

      if (id === "bancaria") {
        objetoDocumento.tipoDocumento = "BANK";
        objetoDocumento.idDocumento = 1;
      } else if (id === "medica") {
        objetoDocumento.tipoDocumento = "MEDICAL";
        objetoDocumento.idDocumento = 2;
      } else {
        objetoDocumento.tipoDocumento = "OTHERS";
        objetoDocumento.idDocumento = 3;
      }

      return objetoDocumento;
    });

    return objetoDocs;
  };

  const cancelarBorradoArchivo = () => {
    setEstadoModalEliminarDocumento(false);
    setInputFile();
  };

  const modalParaEliminar = (inputRef) => {
    setEstadoModalEliminarDocumento(true);
    setInputFile(inputRef);
  };

  const eliminarArchivo = (inputRef) => {
    // setEstadoModalEliminarDocumento(true);
    console.log(inputFile);
    if (inputRef === "facturas") {
      establecerEstadoArchivosFactura([]);
      const nuevoArray = archivosEstado.filter(
        (archivo) => archivo.tipoDocumento !== "BILL"
      );
      setArchivosEstado(nuevoArray);
    } else if (inputRef === "bancaria") {
      const nuevoArray = archivosEstado.filter(
        (archivo) => archivo.tipoDocumento !== "BANK"
      );
      setArchivosEstado(nuevoArray);
      // console.log("bancaria");
    } else if (inputRef === "medica") {
      const nuevoArray = archivosEstado.filter(
        (archivo) => archivo.tipoDocumento !== "MEDICAL"
      );
      setArchivosEstado(nuevoArray);
    } else {
      const nuevoArray = archivosEstado.filter(
        (archivo) => archivo.tipoDocumento !== "OTHERS"
      );
      setArchivosEstado(nuevoArray);
      // console.log("adicional");
    }
    setEstadoModalEliminarDocumento(false);
    eliminarValidacion(inputRef);
  };

  // eslint-disable-next-line consistent-return
  const validarExtensionRef = async (e, referencia) => {
    const allowedExtensions = /(.jpg|.pdf|.xml)$/i;
    const { files, id } = e.target;
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    if (!allowedExtensions.exec(referencia.current.value)) {
      establecerMensajeAlerta(
        // "Solo se permiten archivos con extensiones .jpg, .jpeg, .png, .pdf o .xml"
        "Solo se permiten archivos con extensiones .pdf"
      );
      establecerEstadoAlertaError(true);
      return false;
    }

    // TODO: Descomentar para agregar multiples archivos
    // if (files.length >= 2 && e.target.id !== "facturas") {
    //   console.log("mas de 2");
    //   setArchivosEstado([...archivosEstado, chosenFiles]);
    //   let nuevosDocs;
    //   Promise.all(
    //     nuevosDocs = await obtenerObjetoDocumentos(chosenFiles, e.target.id)
    //   );
    //   console.log(nuevosDocs);
    //   nuevosDocs.forEach((nuevoDoc) => {
    //     setArchivosEstado([...archivosEstado, nuevoDoc]);
    //   });
    //   return;
    // }

    if (e.target.id === "facturas") {
      chosenFiles.forEach((file) => {
        const extensionFile = file.type.split("/")[1];
        const documentoIgual = estadoArchivosFactura.filter(
          (archivo) => archivo.type.split("/")[1] === extensionFile
        )[0];
        if (!documentoIgual) {
          establecerEstadoArchivosFactura([...estadoArchivosFactura, file]);
          if (estadoArchivosFactura.length >= 1) {
            establecerEstadoAmarilloFactura(false);
            cambiarEstadoValidacion(e);
          }
        } else {
          setAlertaSoloUnArchivo(true);
        }
      });
      establecerEstadoAmarilloFactura(true);
    }

    const documento = await obtenerObjetoDocumento(files, id);
    setArchivosEstado([...archivosEstado, documento]);

    // console.log(archivosEstado);
    if (e.target.id !== "facturas") {
      cambiarEstadoValidacion(e);
    }
  };

  const reedirigirPantallaResumen = () => {
    setAlertaValidaDocumentos(false);

    const xmlFactura = archivosEstado.filter(
      (archivo) =>
        archivo.tipoDocumento === "BILL" && archivo.extension === ".xml"
    )[0];

    const pdfFactura = archivosEstado.filter(
      (archivo) =>
        archivo.tipoDocumento === "BILL" && archivo.extension === ".pdf"
    )[0];

    // xmlFactura = xmlFactura[0];
    const otros = archivosEstado.filter(
      (archivo) => archivo.tipoDocumento !== "BILL"
    );

    otros.push(pdfFactura);

    const documentacion = {
      xmlFactura,
      otros,
    };
    history.push({
      pathname: "/resumen-reembolso",
      state: {
        poliza,
        documentacion,
        numeroPoliza,
      },
    });
  };

  const validarArchivos = async (e) => {
    e.preventDefault();
    // archivosEstado.length === 0 ||
    if (!estadoVerdeFactura || !estadoVerdeBancaria) {
      establecerMensajeAlerta(
        "Oops! Debes subir todos los archivos obligatorios o la factura restante (xml o pdf)"
      );
      establecerEstadoAlertaError(true);
      return;
    }

    if (!estadoVerdeAdicional) {
      setAlertaValidaDocumentos(true);
      return;
    }

    reedirigirPantallaResumen();
  };

  const reedireccionDescarga = () => {
    props.establecerEstadoPantalla(false);
    props.establecerEstadoOpciones("descargar");
  };

  return (
    <EnvolvedorPantalla>
      {estadoModalReedireccion && (
        <Alerta
          colorAlerta="azul"
          tipoIcono="palomita"
          textoEncabezado={Diccionario.domiciliado.titulo}
          textoCuerpoJsx={Diccionario.domiciliado.texto}
          mostrarModal={estadoModalReedireccion}
          manejarCierre={() => {
            establecerEstadoModalReedireccion(false);
          }}
          mostrarIcono
          etiquetaBoton={Diccionario.domiciliado.etiquetaBoton}
          funcionLlamadaBoton={() => {
            establecerEstadoModalReedireccion(false);
            props.establecerEstadoPantalla(false);
            props.establecerEstadoOpciones("consultar");
          }}
          temaBoton="estandar"
        />
      )}

      {estadoModalEliminarDocumento && (
        <Alerta
          colorAlerta="azul"
          tipoIcono="palomita"
          textoEncabezado="¿Quieres borrar este documento?"
          textoCuerpo="Una vez eliminado este documento no podrás recuperarlo."
          mostrarIcono={false}
          mostrarModal={estadoModalEliminarDocumento}
          etiquetaBoton="Eliminar"
          funcionLlamadaBoton={() => eliminarArchivo(inputFile)}
          etiquetaBoton2="Cancelar"
          funcionLlamadaBoton2={() => cancelarBorradoArchivo()}
          temaBoton2="simple"
        />
      )}

      {alertaValidaDocumentos && (
        <Alerta
          colorAlerta="amarillo"
          tipoIcono="alerta"
          textoEncabezado="Valida tus documentos"
          textoCuerpo="No has cargado archivos en la sección de documentos adicionales. ¿Deseas continuar?"
          mostrarIcono
          mostrarModal
          manejarCierre={() => setAlertaValidaDocumentos(false)}
          etiquetaBoton="Cancelar"
          etiquetaBoton2="Continuar"
          temaBoton="simple"
          temaBoton2="estandar"
          funcionLlamadaBoton={() => setAlertaValidaDocumentos(false)}
          funcionLlamadaBoton2={() => {
            reedirigirPantallaResumen();
          }}
        />
      )}

      {estadoAlertaError && (
        <Alerta
          colorAlerta="rojo"
          tipoIcono="alerta"
          mostrarModal={estadoAlertaError}
          textoEncabezado={mensajeAlerta}
          mostrarIcono
          manejarCierre={() => establecerEstadoAlertaError(false)}
        />
      )}

      {alertaSoloUnArchivo && (
        <Alerta
          colorAlerta="rojo"
          tipoIcono="alerta"
          textoEncabezado="Solo se admite un archivo por formato (ejemplo.xml o ejemplo.pdf)."
          mostrarModal={alertaSoloUnArchivo}
          mostrarIcono
          manejarCierre={() => setAlertaSoloUnArchivo(false)}
        />
      )}

      <Pantalla>
        {estadoAlerta && (
          <SolicitudModal
            titulo="Aviso legal sobre tu reembolso en línea"
            subtitulo=""
            mostrar={estadoAlerta}
            asignarEstadoAlerta={asignarEstadoAlerta}
            textoBoton="Aceptar"
          />
        )}

        <Titulo>{diccionario.titulo}</Titulo>
        <MensajePequeno>
          Es importante contar con la factura en{" "}
          <span style={{ fontWeight: 900 }}>formato xml</span> y los{" "}
          <span style={{ fontWeight: 900 }}>documentos impresos</span> y
          firmados por el por el titular de la póliza. Si no cuentas con los
          documentos puedes{" "}
          <span
            style={{ color: "#1489FF", cursor: "pointer" }}
            onClick={() => reedireccionDescarga()}
            role="button"
          >
            descargarlos aquí.
          </span>
        </MensajePequeno>

        <ContenedorInputs onSubmit={(e) => validarArchivos(e)}>
          {inputsRenderizado.map((renderizado) => (
            <SolicitudInput
              key={v4()}
              titulo={renderizado.titulo}
              estadoVerdeValidado={renderizado.validado}
              estadoAmarillo={renderizado.faltante && renderizado.faltante}
              inputRef={renderizado.ref}
              nameInput={renderizado.nameInput}
              acepta={renderizado.acepta}
              validarExtensionRef={validarExtensionRef}
              tituloAcordeon={renderizado.tituloAcordeon}
              descripcion={renderizado.descripcion}
              multiple={renderizado.multiple}
              eliminarArchivo={modalParaEliminar}
            />
          ))}

          <BotonContenedor etiqueta="Siguiente" tema="estandar" tipo="submit" />
        </ContenedorInputs>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

Solicitud.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  poliza: PropTypes.object,
  numeroPoliza: PropTypes.string,
  establecerEstadoPantalla: PropTypes.func,
  establecerEstadoOpciones: PropTypes.func,
};

Solicitud.defaultProps = {
  poliza: {},
  numeroPoliza: "",
  establecerEstadoPantalla: () => {},
  establecerEstadoOpciones: () => {},
};

export default Solicitud;

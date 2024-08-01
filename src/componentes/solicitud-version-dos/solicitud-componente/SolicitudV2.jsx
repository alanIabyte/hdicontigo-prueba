/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import Alerta from "../../alerta/alerta-componente/Alerta";
import BotonContenedor from "../../boton/boton-componente/Boton.contenedor";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import IconHelp from "../../../recursos/iconos/ico_help.svg";
import { Titulo } from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import {
  MensajePequeno,
  ContenedorInputs,
  ContenedorRegresar,
  ContenedorParaBoton,
  // eslint-disable-next-line import/named
  CustomTextField,
  ContenidoAcordeon,
  TituloAcordeon,
  Espacio,
} from "./SolicitudV2.styled";
import {
  EnvolvedorIcono,
  EnvolvedorImagen,
} from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";

import SolicitudModal from "./SolicitudModalV2";
import Diccionario from "./diccionarioV2.jsx";
import { getBase64 } from "../../../helpers";
import SolicitudInput from "./SolicitudInputV2";

const diccionario = {
  // titulo: "factura no. ",
  documentos: {
    facturas: "Documentación requerida",
    adicional: "Documentación opcional",
  },
  boton: "Enviar solicitud de reembolso",
};

const SolicitudV2 = ({
  listaReembolsos, // Lista completa de reembolsos para búsquedas, etc.
  flagFactura, // Bandera para saber si es agregar (false) o editar (true).
  handleMenuReembolsos, // Manipulación de la vista lista/agregar y editar.
  handleFactura, // Actualización de la lista original de reembolsos.
  idFactura, // Objeto a editar.
  establecerEstadoPantalla,
  establecerEstadoOpciones,
}) => {
  const [noFactura, setNoFactura] = useState(0);
  const [titulo, setTitulo] = useState("");
  // * Mensajes de alerta.
  const [mensajeAlerta, establecerMensajeAlerta] = useState("");
  const [estadoAlerta, asignarEstadoAlerta] = useState(true);
  // * Estados de cada input.
  const [estadoVerdeXml, establecerEstadoVerdeXml] = useState(false);
  // const [estadoAmarilloXml, establecerEstadoAmarilloXml] = useState(false);
  const [estadoVerdeCFDI, establecerEstadoVerdeCFDI] = useState(false);
  const [estadoVerdeReclamacion, establecerEstadoVerdeReclamacion] =
    useState(false);
  const [estadoVerdeReembolso, establecerEstadoVerdeReembolso] =
    useState(false);
  const [estadoVerdeBancaria, establecerEstadoVerdeBancaria] = useState(false);
  const [estadoVerdeAdicional, establecerEstadoVerdeAdicional] =
    useState(false);
  // * Arreglo de objeto tipo documento.
  const [documentacion, setDocumentacion] = useState([]);
  // * Modal para redireccionar/eliminar.
  const [estadoModalReedireccion, establecerEstadoModalReedireccion] =
    useState(false);
  const [estadoModalEliminarDocumento, setEstadoModalEliminarDocumento] =
    useState(false);
  const [estadoAlertaError, establecerEstadoAlertaError] = useState(false);
  // * Validaciones
  const [alertaValidaDocumentos, setAlertaValidaDocumentos] = useState(false);
  const [alertaSoloUnArchivo, setAlertaSoloUnArchivo] = useState(false);
  const [availableButton, setAvailableButton] = useState(true);
  // * eliminar un input file.
  const [inputFile, setInputFile] = useState();
  // * Correo electrónico
  const [correo, setCorreo] = useState("");
  // TODO: Objetos para cada input type file.

  const [etiquetaBoton, setEtiquetaBoton] = useState("");
  // * UseRef por cada input.
  const fileInputXml = useRef();
  const fileInputCfdi = useRef();
  const fileInputReclamacion = useRef(); // Medical.
  const fileInputReembolso = useRef();
  const fileInputBancaria = useRef();
  const fileInputOthers = useRef();

  // * Modal para el correo electrónico
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState({
    titulo: "",
    descripcion: "",
  });

  const mostralModalAyuda = (input) => {
    setMostrarModal(true);
    if (input === "mail") {
      setMensajeModal({
        titulo: "Correo electrónico",
        descripcion:
          "El correo electrónico es el medio por el cual recibirás información importante relacionado con tu reembolso. Asegúrate de ingresar una dirección de correo electrónico correcta y vigente.",
      });
    }
  };
  const [isValidMail, setIsValidName] = useState(false);
  const handleEmail = (event) => {
    const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    setIsValidName(reg.test(event.target.value));
    setCorreo(event.target.value);
  };

  // * Lista de inputs.
  const inputsRenderizado = [
    {
      nameInput: "xml",
      acepta: ".xml",
      tituloAcordeon: "Factura en XML",
      descripcion: "Agrega un archivo XML",
      titulo: "",
      validado: estadoVerdeXml,
      // faltante: estadoAmarilloXml,
      ref: fileInputXml,
      multiple: false,
      tipoInput: "file",
    },
    {
      nameInput: "cfdi",
      acepta: ".pdf",
      tituloAcordeon: "Factura en PDF (CFDI)",
      descripcion: "Agrega un archivo CFDI",
      titulo: "",
      validado: estadoVerdeCFDI,
      ref: fileInputCfdi,
      multiple: false,
      tipoInput: "file",
    },
    {
      nameInput: "bancaria",
      acepta: ".pdf",
      tituloAcordeon: "Estado de cuenta",
      descripcion: "Agrega un archivo pdf",
      titulo: "",
      validado: estadoVerdeBancaria,
      ref: fileInputBancaria,
      multiple: false,
      tipoInput: "file",
    },
    {
      nameInput: "adicional",
      acepta: ".pdf, .jpg",
      tituloAcordeon: "Documentación adicional",
      descripcion: "Agrega un archivo pdf",
      titulo: diccionario.documentos.adicional,
      validado: estadoVerdeAdicional,
      ref: fileInputOthers,
      multiple: false,
      tipoInput: "file",
    },
  ];
  const [inputs, setInputs] = useState(inputsRenderizado);

  const agregarInputReclamacion = () => {
    inputsRenderizado.splice(0, 0, {
      nameInput: "reclamacion",
      tipoInput: "file",
      acepta: ".pdf",
      tituloAcordeon: "Formulario de reclamación",
      descripcion: "Agrega un archivo pdf",
      titulo: diccionario.documentos.facturas, // este traería el título por defecto.
      validado: estadoVerdeReclamacion,
      ref: fileInputReclamacion,
      multiple: false,
    });
    setInputs(inputsRenderizado);
  };

  const agregarInputReembolso = () => {
    inputsRenderizado.splice(1, 0, {
      nameInput: "reembolso",
      tipoInput: "file",
      acepta: ".pdf",
      tituloAcordeon: "Formulario de reembolso",
      descripcion: "Agrega un archivo pdf",
      titulo: "",
      validado: estadoVerdeReembolso,
      ref: fileInputReembolso,
      multiple: false,
    });
    setInputs(inputsRenderizado);
  };

  // ! DEBO HACER ALGO DE ESO AQUÍ
  const cambiarEstadoValidacion = (id) => {
    console.log("Cambiando estado validación (true) a input: ", id);
    // console.log("inputs: ", inputs);
    inputs.find((obj) => obj.nameInput === id).validado = true;
    if (id !== "adicional") {
      inputs.find((obj) => obj.nameInput === id).multiple = true;
    }
    // Cambiamos el valor de los state.
    switch (id) {
      case "xml":
        establecerEstadoVerdeXml(true);
        break;
      case "cfdi":
        establecerEstadoVerdeCFDI(true);
        break;
      case "reclamacion":
        establecerEstadoVerdeReclamacion(true);
        break;
      case "adicional":
        establecerEstadoVerdeAdicional(true);
        break;
      case "bancaria":
        establecerEstadoVerdeBancaria(true);
        break;
      case "reembolso":
        establecerEstadoVerdeReembolso(true);
        break;
      default:
        break;
    }
  };

  const eliminarValidacion = (id) => {
    // Cambiamos el valor del objeto.
    inputs.find((obj) => obj.nameInput === id.toString()).validado = false;
    if (id !== "adicional") {
      inputs.find((obj) => obj.nameInput === id).multiple = false;
    }
    // Cambiamos el valor de los state.
    switch (id) {
      case "xml":
        establecerEstadoVerdeXml(false);
        break;
      case "cfdi":
        establecerEstadoVerdeCFDI(false);
        break;
      case "reclamacion":
        establecerEstadoVerdeReclamacion(false);
        break;
      case "adicional":
        establecerEstadoVerdeAdicional(false);
        break;
      case "bancaria":
        establecerEstadoVerdeBancaria(false);
        break;
      case "reembolso":
        establecerEstadoVerdeReembolso(false);
        break;
      default:
        break;
    }
  };

  // *** Validación para el botón de agregar/editar factura. ***
  useEffect(() => {
    const shouldDisableButton =
      (idFactura === 1 &&
        !(estadoVerdeXml && estadoVerdeCFDI && estadoVerdeReclamacion)) ||
      (idFactura !== 1 && !(estadoVerdeXml && estadoVerdeCFDI));

    setAvailableButton(shouldDisableButton);
  }, [estadoVerdeXml, estadoVerdeCFDI, estadoVerdeReclamacion, idFactura]);

  const cambioTipoDocumento = (item) => {
    const tipos = {
      BILL: "xml",
      CFDI: "cfdi",
      OTHERS: "adicional",
      MEDICAL: "reclamacion",
      BANK: "bancaria",
      REEMBOLSO: "reembolso",
      default: "",
    };
    // eslint-disable-next-line no-bitwise
    return tipos[item] || tipos.default;
  };

  useEffect(() => {
    /* 
    TODO: Método que servirá para agregado o editado. 
    1. Si es true, significa que se debe hacer un editado.
    2. Si es editado, entonces buscamos si el objeto a editar no está vacío. Si es así, 
       entonces hariamos todo el tema del editado...
    3. Caso contrario, solo se visualizarían los inputsRenderizado.
    */
    console.log("flag", flagFactura, "LISTA: ", listaReembolsos);
    if (flagFactura === true) {
      setTitulo("Editar factura no. ");
      setEtiquetaBoton("Guardar cambios");
      asignarEstadoAlerta(false);
      if (idFactura !== 0) {
        if (idFactura === 1) {
          setCorreo(listaReembolsos[0].correo);
          agregarInputReclamacion();
          agregarInputReembolso();
        } else {
          asignarEstadoAlerta(false);
        }
        setNoFactura(idFactura);
        inputsRenderizado[0].titulo = diccionario.documentos.facturas; // Le damos el título.
        if (listaReembolsos.length > 0) {
          const findObject = listaReembolsos.find(
            (item) => item.id === idFactura
          );
          if (findObject !== undefined) {
            findObject.documentacion.forEach((e) => {
              // * Aquí cambia su estado boolean.
              if (e.nombre !== "") {
                cambiarEstadoValidacion(cambioTipoDocumento(e.tipoDocumento));
              }
            });
            setDocumentacion(findObject.documentacion); // lo pre-llenamos
          }
        }
      } else if (listaReembolsos.length === 0) {
        agregarInputReclamacion();
        agregarInputReembolso();
      }
    } else {
      if (listaReembolsos.length === 0) {
        agregarInputReclamacion();
        agregarInputReembolso();
      } else {
        asignarEstadoAlerta(false);
        inputsRenderizado[0].titulo = diccionario.documentos.facturas; // Le damos el título.
      }
      setTitulo("Agregar factura no. ");
      setEtiquetaBoton("Agregar factura");
      setNoFactura(listaReembolsos.length + 1);
    }
  }, [flagFactura]);

  const obtenerObjetoDocumento = async (documento, id) => {
    const nombre = documento[0].name;
    const extension = `.${nombre.split(".")[nombre.split(".").length - 1]}`;

    let base64;
    if (id === "xml" && extension === ".xml") {
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
    // * xml y pdf en conjunto.
    if (id === "xml") {
      objetoDocumento.tipoDocumento = "BILL";
    } else if (id === "cfdi") {
      objetoDocumento.tipoDocumento = "CFDI";
    } else if (id === "bancaria") {
      objetoDocumento.tipoDocumento = "BANK"; //  *****
    } else if (id === "adicional") {
      objetoDocumento.tipoDocumento = "OTHERS";
    } else if (id === "reclamacion") {
      objetoDocumento.tipoDocumento = "MEDICAL";
    } else if (id === "reembolso") {
      objetoDocumento.tipoDocumento = "REEMBOLSO";
    } else {
      // ! no se está usando.
      objetoDocumento.tipoDocumento = "OTHERS";
    }
    return objetoDocumento;
  };

  const cancelarBorradoArchivo = () => {
    setEstadoModalEliminarDocumento(false);
    setInputFile();
  };

  const modalParaEliminar = (inputRef) => {
    setEstadoModalEliminarDocumento(true);
    setInputFile(inputRef);
    console.log("Input eliminado:", inputRef);
  };

  const eliminarArchivo = (inputRef) => {
    // setEstadoModalEliminarDocumento(true);
    console.log("Se elimina el archivo:", inputRef);
    // console.log("↺ Documentación:", documentacion);
    if (inputRef === "xml") {
      // establecerEstadoArchivosFactura([]);
      const nuevoArray = documentacion.filter(
        (archivo) => archivo.tipoDocumento !== "BILL"
      );
      setDocumentacion(nuevoArray);
    } else if (inputRef === "cfdi") {
      const nuevoArray = documentacion.filter(
        (archivo) => archivo.tipoDocumento !== "CFDI"
      );
      setDocumentacion(nuevoArray);
    } else if (inputRef === "bancaria") {
      console.log("bancaria");
      const nuevoArray = documentacion.filter(
        (archivo) => archivo.tipoDocumento !== "BANK"
      );
      setDocumentacion(nuevoArray);
    } else if (inputRef === "reclamacion") {
      const nuevoArray = documentacion.filter(
        (archivo) => archivo.tipoDocumento !== "MEDICAL"
      );
      setDocumentacion(nuevoArray);
    } else if (inputRef === "adicional") {
      const nuevoArray = documentacion.filter(
        (archivo) => archivo.tipoDocumento !== "OTHERS"
      );
      setDocumentacion(nuevoArray);
    }
    setEstadoModalEliminarDocumento(false);
    eliminarValidacion(inputRef);
  };

  // eslint-disable-next-line consistent-return
  const validarExtensionRef = async (e, referencia) => {
    const allowedExtensions = /(.jpg|.pdf|.xml)$/i;
    console.log("Target::", e.target);
    console.log("Current::", referencia.current.value);
    const { files, id } = e.target;
    // const chosenFiles = Array.prototype.slice.call(e.target.files);
    if (!allowedExtensions.exec(referencia.current.value)) {
      establecerMensajeAlerta(
        // "Solo se permiten archivos con extensiones .jpg, .jpeg, .png, .pdf o .xml"
        "Solo se permiten archivos con extensiones .pdf o .jpg"
      );
      establecerEstadoAlertaError(true);
      return false;
    }

    // TODO: Descomentar para agregar multiples archivos
    // if (files.length >= 2 && e.target.id !== "facturas") {
    //   console.log("mas de 2");
    //   setdocumentacion([...documentacion, chosenFiles]);
    //   let nuevosDocs;
    //   Promise.all(
    //     nuevosDocs = await obtenerObjetoDocumentos(chosenFiles, e.target.id)
    //   );
    //   console.log(nuevosDocs);
    //   nuevosDocs.forEach((nuevoDoc) => {
    //     setdocumentacion([...documentacion, nuevoDoc]);
    //   });
    //   return;
    // }

    // if (e.target.id === "facturas") {
    //   chosenFiles.forEach((file) => {
    //     const extensionFile = file.type.split("/")[1];
    //     const documentoIgual = estadoArchivosFactura.filter(
    //       (archivo) => archivo.type.split("/")[1] === extensionFile
    //     )[0];
    //     if (!documentoIgual) {
    //       establecerEstadoArchivosFactura([...estadoArchivosFactura, file]);
    //       if (estadoArchivosFactura.length >= 1) {
    // establecerEstadoAmarilloXml(false);
    //         cambiarEstadoValidacion(e);
    //       }
    //     } else {
    //       setAlertaSoloUnArchivo(true);
    //     }
    //   });
    // establecerEstadoAmarilloXml(true);
    // }

    // * Aquí es donde se hace el guardado el arreglo de documentos.
    const documento = await obtenerObjetoDocumento(files, id);
    // console.log("Documentos: ", documento);
    setDocumentacion([...documentacion, documento]);
    cambiarEstadoValidacion(e.target.id);
  };

  const reedirigirPantallaResumen = () => {
    setAlertaValidaDocumentos(false);
    let id = 0;
    if (flagFactura === false) {
      if (listaReembolsos === 0) {
        id = 1;
      } else {
        id = listaReembolsos.length + 1;
      }
    } else {
      id = idFactura;
    }
    // console.log(idFactura, "idFactura: ", id);
    const diccionarioDocs = {
      id,
      correo,
      documentacion,
    };

    let nuevoReembolso = [];
    // Aplica tanto en agregado/editado.
    const isInArray = diccionarioDocs.documentacion.find(
      (elem) => elem.tipoDocumento === "OTHERS"
    );
    if (isInArray === undefined) {
      diccionarioDocs.documentacion.push({
        nombre: "",
        base64: "",
        extension: "",
        tipoDocumento: "OTHERS",
      });
    }
    // TODO: Movimiento para agregado y editado.
    if (flagFactura === false) {
      nuevoReembolso = [...listaReembolsos, diccionarioDocs];
    } else {
      // ** Para el tema del others... **
      const findElements = diccionarioDocs.documentacion.filter(
        (item) => item.tipoDocumento === "OTHERS"
      );
      const finder = findElements.filter((x) => x.nombre !== "");
      if (finder.length > 0) {
        const newArray = diccionarioDocs.documentacion.filter(
          (item) => item.nombre !== ""
        );
        diccionarioDocs.documentacion = newArray;
      }
      // ** Se hace el intercambio o se agrega dependiendo que haya sido.**
      nuevoReembolso = listaReembolsos.slice();
      const existingObj = nuevoReembolso.find(
        (item) => item.id === diccionarioDocs.id
      );
      if (existingObj) {
        Object.assign(existingObj, diccionarioDocs);
      } else {
        nuevoReembolso.push(diccionarioDocs);
      }
    }
    console.log("Documentación agregada/editada =>", diccionarioDocs);
    console.log("Nueva lista de documentos a enviar =>", nuevoReembolso);
    handleMenuReembolsos(); // Hacemos cambio de visualización.
    handleFactura(nuevoReembolso); // Actualizamos la lista.
  };

  // TODO: Agregar factura
  const validarArchivos = async (e) => {
    e.preventDefault();
    if (idFactura === 1) {
      if (!estadoVerdeXml || !estadoVerdeCFDI || !estadoVerdeReclamacion) {
        establecerMensajeAlerta(
          "Oops! Debes subir todos los archivos obligatorios o la factura restante (xml y pdf)"
        );
        establecerEstadoAlertaError(true);
        return;
      }
    } else if (!estadoVerdeXml || !estadoVerdeCFDI) {
      establecerMensajeAlerta(
        "Oops! Debes subir todos los archivos obligatorios o la factura restante (xml y pdf)"
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
    establecerEstadoPantalla(false);
    establecerEstadoOpciones("descargar");
  };

  return (
    <>
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
              // props.establecerEstadoPantalla(false);
              // props.establecerEstadoOpciones("consultar");
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
          {mostrarModal && ( // !!!
            <SolicitudModal
              key={v4()}
              titulo={mensajeModal.titulo}
              subtitulo={mensajeModal.descripcion}
              asignarEstadoAlerta={setMostrarModal}
              textoBoton="Aceptar"
              tipo="button"
            />
          )}
          <>
            <ContenedorParaBoton>
              <ContenedorRegresar onClick={() => handleMenuReembolsos()}>
                <RegresarIcono className="icono-regresar" />
                <MensajePequeno>Regresar a facturas agregadas</MensajePequeno>
              </ContenedorRegresar>
            </ContenedorParaBoton>

            <Titulo>{titulo + noFactura}</Titulo>
            <MensajePequeno>
              Descarga y completa documentos necesarios. Si no cuentas con
              ellos, puedes{" "}
              <span
                style={{ color: "#1489FF", cursor: "pointer" }}
                onClick={() => reedireccionDescarga()}
                role="button"
              >
                descargarlos aquí.
              </span>{" "}
              Sube los documentos para agregar tu factura.
            </MensajePequeno>
            {/* Correo electrónico aqui */}
            {idFactura === 1 && (
              <ContenidoAcordeon>
                <Espacio tamano="30px" />
                <div style={{ display: "flex" }}>
                  <TituloAcordeon> Correo electrónico</TituloAcordeon>
                  <EnvolvedorIcono>
                    <EnvolvedorImagen
                      src={IconHelp}
                      style={{
                        cursor: "pointer",
                        width: "20px",
                        marginBottom: "15px",
                      }}
                      onClick={() => mostralModalAyuda("mail")}
                    />{" "}
                  </EnvolvedorIcono>
                </div>
                <div
                  style={{
                    display: "grid",
                    width: "100%",
                  }}
                >
                  <CustomTextField
                    id="filled-basic"
                    label="example@domain.com"
                    variant="filled"
                    value={correo}
                    onChange={(event) => handleEmail(event)}
                    error={!isValidMail}
                    helperText={!isValidMail ? "Agrega un correo válido" : ""}
                    // style={{ marginTop: 11 }}
                  />
                </div>
              </ContenidoAcordeon>
            )}
            <ContenedorInputs onSubmit={(e) => validarArchivos(e)}>
              {inputs.map((renderizado) => (
                <SolicitudInput
                  key={v4()}
                  tipoInput={renderizado.tipoInput}
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

              <BotonContenedor
                etiqueta={etiquetaBoton}
                tema="estandar"
                tipo="submit"
                deshabilitado={availableButton}
              />
            </ContenedorInputs>
          </>
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

SolicitudV2.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  listaReembolsos: PropTypes.arrayOf(PropTypes.object),
  // numeroPoliza: PropTypes.string,
  flagFactura: PropTypes.bool,
  handleMenuReembolsos: PropTypes.func,
  handleFactura: PropTypes.func,
  idFactura: PropTypes.number,
  establecerEstadoPantalla: PropTypes.func,
  establecerEstadoOpciones: PropTypes.func,
};

SolicitudV2.defaultProps = {
  listaReembolsos: [],
  flagFactura: true,
  handleMenuReembolsos: () => {},
  handleFactura: () => {},
  idFactura: 0,
  establecerEstadoPantalla: () => {},
  establecerEstadoOpciones: () => {},
};

export default SolicitudV2;

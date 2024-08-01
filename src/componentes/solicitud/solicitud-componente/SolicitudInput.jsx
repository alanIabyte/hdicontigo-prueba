/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import {
  EnvolvedorIcono,
  EnvolvedorImagen,
  Titulo,
} from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import {
  BotonEliminarPoliza,
  Contenedor,
  ContenedorLabel,
  ContenidoAcordeon,
  Encabezado,
  EncabezadoTitulo,
  InputArchivos,
  ParrafoAcordeon,
  TituloAcordeon,
} from "./Solicitud.styled";
import IconHelp from "../../../recursos/iconos/ico_help.svg";
// import Alerta from "../../alerta";
import SolicitudModal from "./SolicitudModal";

const SolicitudInput = (props) => {
  const {
    titulo,
    estadoVerdeValidado,
    estadoAmarillo,
    inputRef,
    nameInput,
    acepta,
    validarExtensionRef,
    tituloAcordeon,
    descripcion,
    eliminarArchivo,
  } = props;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState({
    titulo: "",
    descripcion: "",
  });

  const mostrarModalAyuda = (tipoInput) => {
    // console.log(tipoInput);
    setMostrarModal(true);
    if (tipoInput === "facturas") {
      setMensajeModal({
        titulo: "Facturas",
        descripcion:
          "Selecciona y carga la factura detallada para el reembolso. Incluye aquí documentos con formato XML y PDF",
      });
    } else if (tipoInput === "bancaria") {
      setMensajeModal({
        titulo: "Información bancaria",
        descripcion:
          "Selecciona y carga el formulario de solicitud de reembolso",
      });
    } else if (tipoInput === "medica") {
      setMensajeModal({
        titulo: "Documentación médica",
        descripcion:
          "Selecciona y carga la documentación médica para el análisis del reembolso. Esta información puede ser: formulario de reclamación, reportes médicos, prescripciones, resultados de laboratorios, así como exámenes de diagnóstico.",
      });
    } else {
      setMensajeModal({
        titulo: "Documentos adicionales",
        descripcion:
          "Selecciona la documentación adicional relacionada con el reembolso. Esta información puede ser: formulario de reclamación, garantía de pago, prueba de pago de deducible, así como información de otro seguro.",
      });
    }
  };

  return (
    <>
      {mostrarModal && (
        <SolicitudModal
          key={v4()}
          titulo={mensajeModal.titulo}
          subtitulo={mensajeModal.descripcion}
          asignarEstadoAlerta={setMostrarModal}
          textoBoton="Aceptar"
          tipo="button"
        />
      )}

      <EncabezadoTitulo>
        <Titulo style={{ fontWeight: "normal", fontSize: 15, width: "auto" }}>
          {titulo}
        </Titulo>
        <EnvolvedorIcono>
          {" "}
          <EnvolvedorImagen
            src={IconHelp}
            style={{ cursor: "pointer", width: "20px", marginBottom: "15px" }}
            onClick={() => mostrarModalAyuda(nameInput)}
          />{" "}
        </EnvolvedorIcono>
      </EncabezadoTitulo>
      <Contenedor
        show
        key={v4()}
        htmlFor={nameInput}
        validado={estadoVerdeValidado}
        amarillo={estadoAmarillo}
      >
        <ContenedorLabel>
          <Encabezado>
            <ContenidoAcordeon>
              <TituloAcordeon>{tituloAcordeon}</TituloAcordeon>
              <ParrafoAcordeon>{descripcion}</ParrafoAcordeon>
              <InputArchivos
                type="file"
                name={nameInput}
                id={nameInput}
                accept={acepta}
                ref={inputRef}
                onChange={(e) => validarExtensionRef(e, inputRef)}
              />
            </ContenidoAcordeon>
          </Encabezado>
        </ContenedorLabel>
        <BotonEliminarPoliza
          className="cruz-eliminar"
          onClick={() => eliminarArchivo(inputRef.current.attributes[2].textContent)}
        >
          X
        </BotonEliminarPoliza>
      </Contenedor>
    </>
  );
};

SolicitudInput.propTypes = {
  titulo: PropTypes.string,
  estadoVerdeValidado: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  // eslint-disable-next-line react/require-default-props
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  nameInput: PropTypes.string,
  acepta: PropTypes.string,
  validarExtensionRef: PropTypes.func,
  tituloAcordeon: PropTypes.string,
  descripcion: PropTypes.string,
  eliminarArchivo: PropTypes.func,
};

SolicitudInput.defaultProps = {
  titulo: "",
  estadoVerdeValidado: false,
  nameInput: "",
  acepta: ".pdf",
  validarExtensionRef: () => {},
  tituloAcordeon: "",
  descripcion: "",
  eliminarArchivo: () => {},
};

export default SolicitudInput;

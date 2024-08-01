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
  Titulo
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
  SeparadorLinea,
  TituloAcordeon
} from "./SolicitudV2.styled";
import IconHelp from "../../../recursos/iconos/ico_help.svg";
// import Alerta from "../../alerta";
import SolicitudModal from "./SolicitudModalV2";

const SolicitudInputV2 = (props) => {
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
    multiple,
    tipoInput
  } = props;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState({
    titulo: "",
    descripcion: ""
  });

  const mostrarModalAyuda = (tpInput) => {
    // console.log(tpInput);
    setMostrarModal(true);
    if (tpInput === "xml") {
      setMensajeModal({
        titulo: "Factura en XML",
        descripcion:
          "Selecciona y carga la factura detallada para el reembolso. Incluye aquí el documento con formato XML."
      });
    } else if (tpInput === "cfdi") {
      setMensajeModal({
        titulo: "Factura en PDF (CFDI)",
        descripcion:
          "Selecciona el factura detallada para el reembolso. Incluye aquí el documento con formato PDF."
      });
    } else if (tpInput === "reclamacion") {
      setMensajeModal({
        titulo: "Formulario de reclamación",
        descripcion:
          "Selecciona el formulario de reclamación previamente llenado y firmado. Este documento sólo se subirá en la primer factura."
      });
    }
    else if (tpInput === "bancaria") {
      setMensajeModal({
        titulo: "Estado de cuenta",
        descripcion:
          "Seleciona el estado de cuenta bancaria que contenga la cuenta CLABE a nombre del beneficiario de tu rembolso no mayor a tres meses de su emisión (se requiere presentar solo una vez y en caso de cuenta bancaria). A partir de la segunda reclamación del mismo diagnóstico sólo es necesario presentar la solicitud de reembolso con la información bancaria correspondiente",
      });
    }
    else if (tpInput === "reembolso") {
      setMensajeModal({
        titulo: "Estado de cuenta",
        descripcion:
          "Selecciona y carga el formulario de solicitud de reembolso",
      });
    }
    else if (tpInput === "adicional") {
      setMensajeModal({
        titulo: "Documentación adicional",
        descripcion:
          "Selecciona la documentación adicional relacionada con el reembolso. Esta información puede ser: reportes médicos, prescripciones, resultados de laboratorios, así como exámenes de diagnóstico, garantía de pago, prueba de pago de deducible, etc."
      });
    }
    else if (tpInput === "correo") {
      setMensajeModal({
        titulo: "Correo electronico",
        descripcion:
          "El correo electrónico es el medio por el cual recibirás información importante relacionado con tu reembolso. Asegúrate de ingresar una dirección de correo electrónico correcta y vigente."
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
      {titulo === "" ? (
        <></>
      ) : (
        <>
          <EncabezadoTitulo>
            <Titulo
              style={{
                fontWeight: "normal",
                fontSize: 15,
                width: "auto"
              }}
            >
              {titulo}
            </Titulo>
          </EncabezadoTitulo>
          <SeparadorLinea />
        </>
      )}

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
              <ParrafoAcordeon style={{ color: "#828282" }}>
                {descripcion}
              </ParrafoAcordeon>
              <InputArchivos
                type={tipoInput}
                name={nameInput}
                id={nameInput}
                accept={acepta}
                ref={inputRef}
                onChange={(e) => validarExtensionRef(e, inputRef)}
                disabled={multiple}
              />
            </ContenidoAcordeon>
          </Encabezado>
        </ContenedorLabel>
        {estadoVerdeValidado === false ? (
          <EnvolvedorIcono>
            {" "}
            <EnvolvedorImagen
              src={IconHelp}
              style={{
                cursor: "pointer",
                width: "20px",
                marginBottom: "15px"
              }}
              onClick={() => mostrarModalAyuda(nameInput)}
            />{" "}
          </EnvolvedorIcono>
        ) : (
          <BotonEliminarPoliza
            className="cruz-eliminar"
            onClick={() =>
              eliminarArchivo(inputRef.current.attributes[2].textContent)
            }
          >
            X
          </BotonEliminarPoliza>
        )}
      </Contenedor>
    </>
  );
};

SolicitudInputV2.propTypes = {
  titulo: PropTypes.string,
  estadoVerdeValidado: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  // eslint-disable-next-line react/require-default-props
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
  ]),
  nameInput: PropTypes.string,
  acepta: PropTypes.string,
  validarExtensionRef: PropTypes.func,
  tituloAcordeon: PropTypes.string,
  descripcion: PropTypes.string,
  eliminarArchivo: PropTypes.func
};

SolicitudInputV2.defaultProps = {
  titulo: "",
  estadoVerdeValidado: false,
  nameInput: "",
  acepta: ".pdf",
  validarExtensionRef: () => {},
  tituloAcordeon: "",
  descripcion: "",
  eliminarArchivo: () => {}
};

export default SolicitudInputV2;

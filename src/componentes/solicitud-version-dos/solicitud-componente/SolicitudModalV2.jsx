/* eslint-disable no-console */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import {
  EnvolvedorModalTexto,
  ModalContenedor,
  EncabezadoModal,
  CuerpoModal,
  PiePaginaModal,
  SubtituloModal,
  ParrafoModal,
  ContenedorModal,
  ListaModal,
  ElementoListaModal,
} from "./SolicitudModalV2.styled";

import Boton from "../../boton";

const diccionario = {
  parrafo1: "Solicitud de reembolso de gastos médicos en línea.",
  parrafo2:
    "El solicitante debe leer y aceptar previamente que HDI Seguros, S.A de C.V ('HDI') le permita el acceso a su portal electrónico para solicitud directa de reembolsos de gastos médicos ('Formulario de Solicitud de Reembolso').",
  parrafo3:
    "Yo (de manera individual y/o en representacion de la entidad que este sometido el reembolso) manifiesto lo siguiente: ",
  clausulas: [
    "He revisado y comprendo el contenido, propósito y alcance de este Formulario de Solicitud de Reembolso.",
    "Certifico que toda la información y documentación que se proporciona con relación a este Formulario de Solicitud de Reembolso son actuales, seguras, verdaderas y completas.",
    "Al hacer clic en <<Aceptar>>, confirmo que toda la información proporcionada con relación a este Formulario de Solicitud de Reembolso refleja con exactitud mi petición y/o el del(los) titular(es) de la póliza.",
    "Comprendo y acepto que, al enviar electrónicamente este Formulario de Solicitud de Reembolso, no implica por esta única acción, obligación alguna para mí, mis representados o para HDI, bajo cualquier ley o reglamentación aplicable, salvo los compromisos expresos a que se refiere exclusivamente el presente Formulario de Solicitud de Reembolso.",
  ],
  parrafoFraude:
    "Cualquier persona que, a sabiendas y con la intención de defraudar o engañar a cualquier institución de seguros mediante: ",
  clausulaFraude: [
    "la presentación de una solicitud para contratar una póliza de seguro, o para un reembolso de gastos médicos, que contenga información materialmente falsa u,",
    "oculte o distorsione información acerca de cualquier hecho material, presumiblemente comete un acto fraudulento que puede ser sancionado bajo la legislación penal aplicable.",
  ],
  parrafo4:
    "En caso de dudas, comentarios o aclaraciones, se puede comunicar con HDI para obtener mayor información sobre el contenido del presente documento y sus alcances.",
  parrafo5:
    "La recepción de la presente Solicitud de Reembolso de Gastos Médicos está expresamente condicionada a la aceptación, por parte de Usted, de todos los términos y condiciones contenidos en este documento.",
  parrafo6:
    "Por lo anterior, si los términos y condiciones anteriores son aceptables para Usted, indique su conformidad haciendo clic en el botón <<Aceptar>> que se encuentra a continuación.",
  parrafo7:
    "En caso contrario no se otorgará acceso para llenado y envío de esta Solicitud.",
};

const SolicitudModalV2 = (props) => {
  const { titulo, textoBoton, asignarEstadoAlerta, subtitulo, tipo } = props; // asignarEstadoAlerta

  const { clausulas, clausulaFraude } = diccionario;
  const [mostrarModal, establecerMostrarModal] = useState(true);

  return (
    <>
      {tipo === "aviso" ? (
        <EnvolvedorModalTexto mostrar={mostrarModal} key={v4()}>
          <ModalContenedor id="modal-contenedor">
            <ContenedorModal>
              <EncabezadoModal>{titulo}</EncabezadoModal>
              <SubtituloModal>{subtitulo}</SubtituloModal>
            </ContenedorModal>
            <CuerpoModal>
              <ParrafoModal>{diccionario.parrafo1}</ParrafoModal>
              <ParrafoModal>{diccionario.parrafo2}</ParrafoModal>
              <ParrafoModal>{diccionario.parrafo3}</ParrafoModal>
              <ListaModal romano>
                {clausulas.map((clausula) => (
                  <ElementoListaModal key={v4()}>{clausula}</ElementoListaModal>
                ))}
              </ListaModal>
              <ParrafoModal>{diccionario.parrafoFraude}</ParrafoModal>
              <ListaModal romano={false}>
                {clausulaFraude.map((clausula) => (
                  <ElementoListaModal key={v4()}>{clausula}</ElementoListaModal>
                ))}
              </ListaModal>
              <ParrafoModal>{diccionario.parrafo4}</ParrafoModal>
              <ParrafoModal>{diccionario.parrafo5}</ParrafoModal>
              <ParrafoModal>{diccionario.parrafo6}</ParrafoModal>
              <ParrafoModal>{diccionario.parrafo7}</ParrafoModal>
            </CuerpoModal>
            <PiePaginaModal>
              <Boton
                etiqueta={textoBoton}
                enClick={() => {
                  asignarEstadoAlerta(false);
                  establecerMostrarModal(false);
                }}
              />
            </PiePaginaModal>
          </ModalContenedor>
        </EnvolvedorModalTexto>
      ) : (
        <EnvolvedorModalTexto mostrar={mostrarModal} key={v4()}>
          <ModalContenedor id="modal-contenedor">
            <ContenedorModal>
              <EncabezadoModal>{titulo}</EncabezadoModal>
            </ContenedorModal>
            <CuerpoModal>
              <ParrafoModal>{subtitulo}</ParrafoModal>
            </CuerpoModal>
            <PiePaginaModal>
              <Boton
                etiqueta={textoBoton}
                enClick={() => {
                  asignarEstadoAlerta(false);
                  establecerMostrarModal(false);
                }}
              />
            </PiePaginaModal>
          </ModalContenedor>
        </EnvolvedorModalTexto>
      )}
    </>
  );
};

SolicitudModalV2.propTypes = {
  titulo: PropTypes.string,
  tipo: PropTypes.string,
  // texto: PropTypes.string,
  // mostrar: PropTypes.bool,
  asignarEstadoAlerta: PropTypes.func,
  textoBoton: PropTypes.string,
  subtitulo: PropTypes.string,
};

SolicitudModalV2.defaultProps = {
  titulo: "",
  tipo: "aviso",
  // texto: "",
  // mostrar: false,
  asignarEstadoAlerta() {},
  textoBoton: "",
  subtitulo: "",
};

export default SolicitudModalV2;

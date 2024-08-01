/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { v4 } from "uuid";
import CampoTexto from "../../campo-texto";
import { diccionario } from "./config";
import {
  CampoRFC,
  ContenedorInciso,
  ContenedorNumPoliza,
  ContenedorPolizaDanos,
  EtiquetaInciso,
  Instrucciones,
  MensajeError,
} from "./PantallaRegistroUsuario.styled";

const CamposRegistroGMM = ({
  alCambiarNumeroDePoliza,
  alCambiarInciso,
  focoPoliza,
  focoInciso,
  polizaState,
  incisoState,
  persistirNumSeriePoliza,
  asignarValorMostrarModalPoliza,
  alCambiarRFC,
  focoRFC,
  rfcState,
  asignarValorMostrarModalRFC,
  errorPoliza,
  errorRFC,
  alDesenfocarRFC,
  enDesenfocarMascara,
}) => {
  let token;

  const openHelpModal = (type) => {
    persistirNumSeriePoliza();

    if (type === "poliza") {
      asignarValorMostrarModalPoliza(true);
      return;
    }
    asignarValorMostrarModalRFC(true);
  };

  return (
    <React.Fragment key={v4()}>
      <ContenedorPolizaDanos>
        <CampoTexto
          id="campoPoliza"
          etiqueta={diccionario.etiquetaPolizaGMM}
          // expresionRegular={/^[0-9]*$/}
          enDesenfocar={enDesenfocarMascara}
          enCambio={alCambiarNumeroDePoliza}
          foco={focoPoliza}
          numeroDeCaracteres={6}
          valor={polizaState}
          iconoAyuda
          openHelp={() => openHelpModal("poliza")}
        />
      </ContenedorPolizaDanos>

      {errorPoliza !== "" && (
        <MensajeError id="errorPoliza">{errorPoliza}</MensajeError>
      )}

      <CampoRFC>
        <CampoTexto
          id="campoRFC"
          etiqueta={diccionario.etiquetaRFC}
          enCambio={alCambiarRFC}
          enDesenfocar={alDesenfocarRFC}
          foco={focoRFC}
          valor={rfcState}
          iconoAyuda
          openHelp={openHelpModal}
          numeroDeCaracteres={13}
          expresionRegular={/(^[0-9a-zA-Z]+$|^$)/}
        />
        <MensajeError id="errorRFC">{errorRFC}</MensajeError>
      </CampoRFC>
    </React.Fragment>
  );
};

export default CamposRegistroGMM;

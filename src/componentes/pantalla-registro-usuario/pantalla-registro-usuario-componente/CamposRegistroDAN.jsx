/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { v4 } from "uuid";
import CampoTexto from "../../campo-texto";
import { EtiquetaNegro } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import { EnvolvedorImagen } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import { diccionario } from "./config";
import {
  CampoRFC,
  ContenedorInciso,
  ContenedorNumPoliza,
  ContenedorPolizaDanos,
  ContenedorEtiquetasDanos,
  EtiquetaInciso,
  Instrucciones,
  MensajeError,
  ImagenSuperpuesta,
} from "./PantallaRegistroUsuario.styled";
import IconHelp from "../../../recursos/iconos/ico_help.svg";

const CamposRegistroDAN = ({
  alCambiarNumeroDePoliza,
  alCambiarInciso,
  focoPoliza,
  focoInciso,
  poliza,
  inciso,
  persistirNumSeriePoliza,
  asignarValorMostrarModalPoliza,
  alCambiarRFC,
  focoRFC,
  rfc,
  asignarValorMostrarModalRFC,
  errorPoliza,
  errorRFC,
  alCambiarNumeroDePolizaMascara,
  alDesenfocarRFC,
  enFocoPolizaMascara,
  enDesenfocarMascara,
  enMouseEnter,
  enMouseLeave,
  focoNumeroDeSerieMascara,
  polizaMascara,
  imagenMascara,
  inputRefs,
  mostrarImagen,
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
      {/* <ContenedorPolizaDanos>
        <ContenedorNumPoliza>
          <CampoTexto
            id="campoPoliza"
            etiqueta={diccionario.etiquetaPoliza}
            expresionRegular={/^[0-9-]*$/}
            enCambio={alCambiarNumeroDePoliza}
            foco={focoPoliza}
            valor={poliza}
            iconoAyuda
            marcador="Ejemplo: 123456789"
            openHelp={() => openHelpModal("poliza")}
            numeroDeCaracteres={20}
          />
        </ContenedorNumPoliza>
        <ContenedorInciso>
          <EtiquetaInciso>{diccionario.etiquetaInciso}</EtiquetaInciso>
          <CampoTexto
            id="campoInciso"
            enCambio={alCambiarInciso}
            foco={focoInciso}
            valor={inciso}
            marcador="1"
            numeroDeCaracteres={5}
            expresionRegular={/^(\s*|\d+)$/}
          />
        </ContenedorInciso>
      </ContenedorPolizaDanos> */}
      <ContenedorEtiquetasDanos>
        <EtiquetaNegro style={{ minWidth: "70%", width: "68%" }}>
          {diccionario.etiquetaPoliza}
        </EtiquetaNegro>
        <EtiquetaNegro style={{ minWidth: "30%", width: "32%" }}>
          {diccionario.etiquetaInciso}
        </EtiquetaNegro>
      </ContenedorEtiquetasDanos>
      <ContenedorPolizaDanos
        onMouseEnter={enMouseEnter}
        onMouseLeave={enMouseLeave}
      >
        <CampoTexto
          esMascaraPoliza
          iconoAyuda
          openHelp={() => openHelpModal("poliza")}
          enCambio={alCambiarNumeroDePolizaMascara}
          enFoco={enFocoPolizaMascara}
          enDesenfocar={enDesenfocarMascara}
          foco={focoNumeroDeSerieMascara}
          valores={polizaMascara}
          id="campoPolizaMascara"
          inputRefs={inputRefs}
        />
        <ImagenSuperpuesta
          mostrar={mostrarImagen}
          src={imagenMascara}
          alt="Imagen"
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
          valor={rfc}
          iconoAyuda
          marcador="Ejemplo: AEFF661115DY2"
          openHelp={() => openHelpModal("RFC")}
          numeroDeCaracteres={13}
          expresionRegular={/(^[0-9a-zA-Z&Ññ]+$|^$)/}
        />
      </CampoRFC>
      <MensajeError id="errorRFC">{errorRFC}</MensajeError>
    </React.Fragment>
  );
};

export default CamposRegistroDAN;

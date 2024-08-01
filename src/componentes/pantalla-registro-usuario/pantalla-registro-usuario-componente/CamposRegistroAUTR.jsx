/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { v4 } from "uuid";
import "./estilos.scss";
import IconoLupa from "@material-ui/icons/SearchRounded";
import CampoTexto from "../../campo-texto";
import { EtiquetaNegro } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import { diccionario } from "./config";
import {
  ContenedorIcono,
  ContenedorInputIcono,
  ContenedorNumPoliza,
  ContenedorPolizaDanos,
  Instrucciones,
  MensajeError,
  ImagenSuperpuesta,
} from "./PantallaRegistroUsuario.styled";

const getIcon = (icono, actionIcon) => {
  if (icono === "lupa") {
    return (
      <IconoLupa
        onClick={actionIcon}
        style={{
          fontSize: 20,
          cursor: "pointer",
          display: "inline",
          position: "absolute",
          bottom: "437px",
          right: "40px",
        }}
      />
    );
  }

  return "";
};

const CamposRegistroAUTR = ({
  alCambiarNumeroDePoliza,
  alCambiarNumeroDeSerie,
  alCambiarNumeroDePolizaMascara,
  enFocoPolizaMascara,
  enDesenfocarMascara,
  enMouseEnter,
  enMouseLeave,
  focoPoliza,
  focoNumeroDeSerie,
  focoNumeroDeSerieMascara,
  poliza,
  polizaMascara,
  numeroDeSerie,
  persistirNumSeriePoliza,
  asignarValorMostrarModalPoliza,
  asignarValorMostrarModalSerie,
  errorPoliza,
  errorSerie,
  imagenMascara,
  mostrarImagen,
  inputRefs,
  icono = "",
  actionIcon = () => {},
}) => {
  let token;

  const openHelpModal = (type) => {
    persistirNumSeriePoliza();

    if (type === "poliza") {
      asignarValorMostrarModalPoliza(true);
      return;
    }
    asignarValorMostrarModalSerie(true);
  };

  return (
    <React.Fragment key={v4()}>
      {/* <ContenedorPolizaDanos>
        <CampoTexto
          id="campoPoliza"
          etiqueta={diccionario.etiquetaPoliza}
          expresionRegular={/^[0-9-]*$/}
          enCambio={alCambiarNumeroDePoliza}
          foco={focoPoliza}
          valor={poliza}
          iconoAyuda
          openHelp={() => openHelpModal("poliza")}
          numeroDeCaracteres={20}
        />
      </ContenedorPolizaDanos>
      {errorPoliza !== "" && (
        <MensajeError id="errorPoliza">{errorPoliza}</MensajeError>
      )} */}
      <EtiquetaNegro>{diccionario.etiquetaPoliza}</EtiquetaNegro>
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

      <EtiquetaNegro>{diccionario.etiquetaSerie}</EtiquetaNegro>
      <ContenedorPolizaDanos>
        <CampoTexto
          esSerie
          iconoAyuda
          openHelp={() => openHelpModal()}
          // etiqueta={diccionario.etiquetaSerie}
          enCambio={alCambiarNumeroDeSerie}
          foco={focoNumeroDeSerie}
          valores={numeroDeSerie}
          id="campoSerie"
        />
      </ContenedorPolizaDanos>
      <MensajeError id="errorSerie" style={{ marginBottom: "30px" }}>
        {errorSerie}
      </MensajeError>
    </React.Fragment>
  );
};

export default CamposRegistroAUTR;

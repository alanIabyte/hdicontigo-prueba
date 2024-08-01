import React, { useState } from "react";
import PropTypes from "prop-types";
import IconoAlerta from "@material-ui/icons/WarningRounded";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import CerrarIcono from "@material-ui/icons/CloseRounded";
import AlertaFlotante from "../../alerta-flotante";
import {
  BotonIcono,
  EnvolvedorEncabezado,
  TituloContenedor,
  ContenedorIconoAlerta,
} from "./Encabezado.styled";

const diccionario = {
  alertaSemaforoAmarillo:
    "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
};

const Encabezado = (props) => {
  const {
    titulo,
    tituloHtml,
    alertaAmarilla,
    funcionRegresar,
    mostrarBotonRegresar,
    funcionCerrar,
    mostrarBotonCerrar,
    alturaEncabezadoAuto,
    estiloBotonRegresar,
  } = props;

  const [mostrarAlertaFlotante, asignarValorMostrarAlertaFlotante] =
    useState(false);

  const despliegaTextoTitulo = () => ({ __html: tituloHtml });

  return (
    <EnvolvedorEncabezado
      key="Encabezado"
      alturaEncabezadoAuto={alturaEncabezadoAuto}
    >
      {mostrarBotonRegresar && (
        <BotonIcono
          type="button"
          onClick={funcionRegresar}
          style={estiloBotonRegresar}
        >
          <RegresarIcono fontSize="large" id="botonRegresar" />
        </BotonIcono>
      )}
      {mostrarBotonCerrar && (
        <BotonIcono
          type="button"
          onClick={funcionCerrar}
          style={{ alignItems: "left" }}
        >
          <CerrarIcono id="botonCerrar" />
        </BotonIcono>
      )}
      {tituloHtml ? (
        <TituloContenedor
          id="tituloEncabezado"
          dangerouslySetInnerHTML={despliegaTextoTitulo()}
          alturaEncabezadoAuto={alturaEncabezadoAuto}
        />
      ) : (
        <TituloContenedor id="tituloEncabezado">{titulo} </TituloContenedor>
      )}
      {alertaAmarilla && (
        <>
          <ContenedorIconoAlerta
            onClick={() => {
              asignarValorMostrarAlertaFlotante(!mostrarAlertaFlotante);
            }}
          >
            <IconoAlerta />
          </ContenedorIconoAlerta>
          <AlertaFlotante
            texto={diccionario.alertaSemaforoAmarillo}
            mostrar={mostrarAlertaFlotante}
            manejarCierre={asignarValorMostrarAlertaFlotante}
          />
        </>
      )}
    </EnvolvedorEncabezado>
  );
};

Encabezado.propTypes = {
  titulo: PropTypes.string,
  tituloHtml: PropTypes.string,
  alertaAmarilla: PropTypes.bool,
  funcionRegresar: PropTypes.func,
  mostrarBotonRegresar: PropTypes.bool,
  mostrarBotonCerrar: PropTypes.bool,
  funcionCerrar: PropTypes.func,
  alturaEncabezadoAuto: PropTypes.bool,
  estiloBotonRegresar: PropTypes.objectOf({}),
};

Encabezado.defaultProps = {
  titulo: "",
  tituloHtml: "",
  alertaAmarilla: false,
  mostrarBotonRegresar: true,
  funcionRegresar() {},
  mostrarBotonCerrar: true,
  funcionCerrar() {},
  alturaEncabezadoAuto: false,
  estiloBotonRegresar: {},
};

export default Encabezado;

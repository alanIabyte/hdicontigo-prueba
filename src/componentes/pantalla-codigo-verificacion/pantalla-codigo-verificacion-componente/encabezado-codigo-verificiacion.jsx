/* eslint-disable */
import React from "react";
import { BotonIcono, EnvolvedorEncabezado, TituloContenedor } from "../../encabezado/encabezado-componente/Encabezado.styled";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import {
  EncabezadoCodigoVerificacionContent
} from "./PantallaCodigoVerificacion.styled";
import { useHistory } from "react-router";

const EncabezadoCodigoVerificacion = () => {

  const history = useHistory();

  return (
    <>
      <EncabezadoCodigoVerificacionContent key="Encabezado Codigo Verificacion" id="envolvedorEncabezadoCodigoVerificacion">
        <BotonIcono type="button" onClick={history.goBack}>
          <RegresarIcono id="botonRegresar" fontSize="large" />
        </BotonIcono>
        <TituloContenedor id="tituloEncabezadoCodioVerificacion">
          Código de verificación
        </TituloContenedor>
      </EncabezadoCodigoVerificacionContent>
    </>
  );
};

export default EncabezadoCodigoVerificacion;

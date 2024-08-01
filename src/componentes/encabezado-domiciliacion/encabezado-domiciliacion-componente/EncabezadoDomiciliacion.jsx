/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import {
  Titulo,
  ContenedorIcono,
  Encabezado,
  LineaNegocio,
  ContenedorDetalle,
  NumeroPoliza,
} from "./EncabezadoDomiciliacion.styled";

//Iconos
import { ReactComponent as IconoAutoBlanco } from "../../../recursos/iconos/contigo/ico_autos_white-bg.svg";
import { ReactComponent as IconoDanoBlanco } from "../../../recursos/iconos/contigo/ico_daños.svg";

const diccionario = {
  alertaSemaforoAmarillo:
    "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
};

const EncabezadoDomiciliacion = ({ poliza, detallePoliza }) => {
  const history = useHistory();

  const regresar = () => {
    history.goBack();
  };

  const obtenerLineaNegocio = () => {
    if (poliza.lineaNegocio === "AUTR") {
      return (
        <>
          {" "}
          <IconoAutoBlanco className="icono" /> HDI auto{" "}
        </>
      );
    }
    return (
      <>
        {" "}
        <IconoDanoBlanco className="icono" /> HDI daños{" "}
      </>
    );
  };

  return (
    <Encabezado className="encabezadoDomiciliacion">
      <ContenedorIcono onClick={regresar}>
        <RegresarIcono className="icono" />
      </ContenedorIcono>
      <Titulo>Domiciliar</Titulo>

      <ContenedorDetalle>
        <NumeroPoliza>Número de póliza: {poliza.polizaFormato}</NumeroPoliza>
      </ContenedorDetalle>
    </Encabezado>
  );
};

EncabezadoDomiciliacion.propTypes = {
  poliza: PropTypes.object,
  detallePoliza: PropTypes.object,
};

EncabezadoDomiciliacion.defaultProps = {
  poliza: [],
  detallePoliza: [],
};

export default EncabezadoDomiciliacion;

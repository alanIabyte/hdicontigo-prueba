/* eslint-disable */
import React, { useEffect, useState } from "react";
import { AjustadorEncabezadoReporte, BarraEsperaEncabezadoReporte, BotonUbicacionEncabezadoReporte, EnvolvedorAjustadorEncabezadoReporte, EnvolvedorEncabezadoReporte, EnvolvedorPendienteEncabezadoReporte, FotoEncabezadoReporte, FotoPendienteEncabezadoReporte, LeyendaEncabezadoReporte, SeparadorEncabezadoReporte, TituloContenedor } from "../../../componentes/encabezado-reporte/encabezado-reporte-componente/EncabezadoReporte.styled";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import constantes from "../../../recursos/constantes";
import { useSelector } from "react-redux";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import { Envolvedor } from "../../../componentes/ubicaciones-grua/ubicaciones-grua-componente/UbicacionesGrua.styled";
import { Separador } from "../../../componentes/pantalla-cuenta/pantalla-cuenta-componente/PantallaCuenta.styled";
import avatar from "../../../recursos/imagenes/default-avatar.png";
import { BotonAgendarCita, EnvolvedorEncabezadoSeguimientoRoboTotalAjustador, EnvolvedorPrincipalCitaAjustador } from "./contendor-ajustador.styled";

interface IProps {
  poliza?: string;
  vin?: string;
  numeroReporte: string;
  imagenAjustador: string;
  nombreAjustador: string;
}

const nombreCookie = constantes.nombreDeCookie;

const diccionario = {
  contenedorAjustador: {
    titulo: "Número de reporte: ",
    tituloAbreviado: "Reporte: "
  }
}

const style = { position: "relative", top: "0" };

const ContenedorAjustador = (props: IProps) => {

  const {
    numeroReporte: numReporte,
    imagenAjustador,
    nombreAjustador,
  } = props;

  const tituloEncabezado = () => {
    if (numReporte.length > 15) {
      return (
        <TituloContenedor style={{ ...style }} id="tituloEncabezado">
          {diccionario.contenedorAjustador.tituloAbreviado} {numReporte}
        </TituloContenedor>
      );
    }
    return (
      <TituloContenedor style={style} id="tituloEncabezado">
        {diccionario.contenedorAjustador.titulo} {numReporte}
      </TituloContenedor>
    );
  };

  return (
    <EnvolvedorPrincipalCitaAjustador key={v4()}>
      {tituloEncabezado()}
      <SeparadorEncabezadoReporte />
      {nombreAjustador && (
        <EnvolvedorEncabezadoSeguimientoRoboTotalAjustador>
          <FotoEncabezadoReporte id="imagenAjustador" src={imagenAjustador} style={{ width: "45px", height: "45px" }} />
          <AjustadorEncabezadoReporte id="nombreAjustador">
              Tu ajustador es: {nombreAjustador}
          </AjustadorEncabezadoReporte>
          {/* <BotonAgendarCita id="boton de agendar cita">
            Agendar cita
          </BotonAgendarCita> */}
        </EnvolvedorEncabezadoSeguimientoRoboTotalAjustador>
      )}
      {!nombreAjustador && (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <EnvolvedorPendienteEncabezadoReporte
            style={{
              marginTop: "20px",
              width: "70%"
            }}
            >
            <FotoPendienteEncabezadoReporte />
            <BarraEsperaEncabezadoReporte />
            <LeyendaEncabezadoReporte id="buscandoAjustador">
              {"Buscando al ajustador más cercano..."}
            </LeyendaEncabezadoReporte>
          </EnvolvedorPendienteEncabezadoReporte>
        </div>
      )}
    </EnvolvedorPrincipalCitaAjustador>
  );
};

ContenedorAjustador.propTypes = {};

ContenedorAjustador.defaultProps = {};

export default ContenedorAjustador;

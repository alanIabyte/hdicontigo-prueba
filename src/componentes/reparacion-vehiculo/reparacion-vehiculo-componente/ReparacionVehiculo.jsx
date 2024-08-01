import React from "react";
import PropTypes from "prop-types";
import {
  EnvolvedorReparacionVehiculo,
  FechaPromesaCampo,
  FechaPromesaContenedor,
  FechaPromesaValor,
  ReparacionVehiculoCampo,
  ReparacionVehiculoValor,
  Semaforo,
  SemaforoRefacciones,
  TituloReparacion,
} from "./ReparacionVehiculo.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import agregarFormatoDeFecha from "../../utilidades-compartidas/agregarFormatoFecha";

const diccionario = {
  finReparacion: "Fin de reparación",
  mensaje: "El proceso de reparación ha iniciado",
  tituloRefacciones: "Refacciones",
  fechaPromesa: "Fecha promesa",
};

const ReparacionVehiculo = (props) => {
  const { datosReparacionVehiculo } = props;

  const fechaPromesa = obtenerValorDeArregloDeStrings(
    datosReparacionVehiculo,
    "FechaPromesaEntrega: "
  );

  const fechaPromesaFormato = agregarFormatoDeFecha(fechaPromesa);

  const semaforo = parseInt(
    obtenerValorDeArregloDeStrings(datosReparacionVehiculo, "Semáforo: "),
    10
  );

  const fechaFinDeReparacion = obtenerValorDeArregloDeStrings(
    datosReparacionVehiculo,
    "FechaDisponibleEntrega: "
  );

  const fechaFinDeReparacionFormato =
    agregarFormatoDeFecha(fechaFinDeReparacion);

  console.log(
    fechaPromesa,
    semaforo,
    fechaFinDeReparacion,
    fechaFinDeReparacionFormato
  );
  return (
    <EnvolvedorReparacionVehiculo>
      {fechaFinDeReparacion === "" && (
        <div>
          <TituloReparacion>{diccionario.mensaje}</TituloReparacion>
          <SemaforoRefacciones>
            <Semaforo semaforo={semaforo} />
            {diccionario.tituloRefacciones}
          </SemaforoRefacciones>
          <FechaPromesaContenedor>
            <FechaPromesaCampo>{diccionario.fechaPromesa}</FechaPromesaCampo>
            <FechaPromesaValor>{fechaPromesaFormato}</FechaPromesaValor>
          </FechaPromesaContenedor>
        </div>
      )}
      {fechaFinDeReparacion !== "" && (
        <div>
          <ReparacionVehiculoCampo>
            {diccionario.finReparacion}
          </ReparacionVehiculoCampo>
          <ReparacionVehiculoValor>
            {fechaFinDeReparacionFormato}
          </ReparacionVehiculoValor>
        </div>
      )}
    </EnvolvedorReparacionVehiculo>
  );
};

ReparacionVehiculo.defaultProps = {
  datosReparacionVehiculo: [],
};

ReparacionVehiculo.propTypes = {
  datosReparacionVehiculo: PropTypes.arrayOf(PropTypes.string),
};

export default ReparacionVehiculo;

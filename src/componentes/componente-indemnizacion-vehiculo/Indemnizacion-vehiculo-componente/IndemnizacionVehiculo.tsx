/* eslint-disable arrow-body-style */
import React from "react";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import { MensajePequeno } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import { TituloMisPolizas } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import {
  ContenedorPaso,
  ContenedorPasos,
} from "./IndemnizacionVehiculo.styled";
import IconoPrueba from "../../../recursos/iconos/hdi-c/detalle/autos/paquetes.svg";

const IndemnizacionVehiculo = () => {
  return (
    <EnvolvedorPantalla>
      <EncabezadoPolizasSiniestradas mostrarMenu />
      <Pantalla>
        <TituloMisPolizas>Indeminzación de mi vehículo</TituloMisPolizas>
        <MensajePequeno>Recibe tu indemnización en pocos pasos:</MensajePequeno>
        <ContenedorPasos>
          <ContenedorPaso>
            <img src={IconoPrueba} alt="" />
            <p>Hola</p>
          </ContenedorPaso>
        </ContenedorPasos>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default IndemnizacionVehiculo;

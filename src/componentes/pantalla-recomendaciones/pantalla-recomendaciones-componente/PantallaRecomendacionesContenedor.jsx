import React from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoReporte from "../../encabezado-reporte";
import Recomendaciones from "./PantallaRecomendaciones";

const PantallaRecomendacionesContenedor = () => {
  const estadoApp = useSelector((estado) => estado);
  const numeroReporte =
    estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte
      ? estadoApp.datosReporte.numeroReporte
      : 0;

  return (
    <EnvolvedorPantalla key={v4()} id="pantallaRecomendaciones">
      <EncabezadoReporte reporte={numeroReporte} />
      <Recomendaciones />
    </EnvolvedorPantalla>
  );
};

export default PantallaRecomendacionesContenedor;

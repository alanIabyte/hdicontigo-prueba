import React, { useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import IconoAlerta from "@material-ui/icons/ReportProblemRounded";
import AlertaFlotante from "../../alerta-flotante";
import {
  ContenedorTexto,
  EnvolvedorEncabezadoPasosProgreso,
  TextoModeloEncabezado,
} from "./EncabezadoPasosProgreso.styled";
import Menu from "../../menu";

const diccionario = {
  titulo: "El siniestro de tu",
  vehiculoDefault: "Vehículo",
  alertaSemaforoAmarillo:
    "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
};

const EncabezadoPasosProgreso = () => {
  const estadoApp = useSelector((estado) => estado);
  const semaforoAmarillo =
    estadoApp && estadoApp.semaforoAmarillo
      ? estadoApp.semaforoAmarillo
      : false;
  let datosVehiculo = diccionario.vehiculoDefault;

  if (estadoApp && estadoApp.datosVehiculo) {
    datosVehiculo = estadoApp.datosVehiculo.data;
  } else if (
    estadoApp &&
    estadoApp.datosPoliza &&
    estadoApp.datosPoliza.datosVehiculo
  ) {
    datosVehiculo = estadoApp.datosPoliza.datosVehiculo;
  }

  const [mostrarAlertaFlotante, asignarValorMostrarAlertaFlotante] =
    useState(false);
  const [seAbrioMenu, asignarValorSeAbrioMenu] = useState(false);

  // Si el texto es demasiado largo, truncarlo para mostrar solo el inicio y el final
  const largoTexto = datosVehiculo.length;
  if (largoTexto > 64) {
    datosVehiculo = `${datosVehiculo.substring(
      0,
      60
    )}...${datosVehiculo.substring(largoTexto - 4, largoTexto)}`;
  }
  const alAbrirOCerrarMenu = (seAbrio) => {
    asignarValorSeAbrioMenu(seAbrio);
  };

  return (
    <EnvolvedorEncabezadoPasosProgreso key={v4()} seAbrioMenu={seAbrioMenu}>
      <Menu alAbrirOCerrarMenu={alAbrirOCerrarMenu} abierto={seAbrioMenu} />
      <ContenedorTexto>
        {diccionario.titulo}
        <TextoModeloEncabezado>{datosVehiculo}</TextoModeloEncabezado>
      </ContenedorTexto>
      {semaforoAmarillo && (
        <>
          <IconoAlerta
            onClick={() => {
              asignarValorMostrarAlertaFlotante(!mostrarAlertaFlotante);
            }}
          />
          <AlertaFlotante
            texto={diccionario.alertaSemaforoAmarillo}
            mostrar={mostrarAlertaFlotante}
            manejarCierre={asignarValorMostrarAlertaFlotante}
          />
        </>
      )}
    </EnvolvedorEncabezadoPasosProgreso>
  );
};

export default EncabezadoPasosProgreso;

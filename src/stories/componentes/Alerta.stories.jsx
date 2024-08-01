/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import "../../recursos/estilos/estilos.scss";
import { Alerta } from "../../componentes";

export default {
  title: "Componentes/Alerta",
  component: Alerta,
};

const Modelo = (args) => (
  <div className="appS">
    <Alerta {...args} />
  </div>
);

export const EstiloRojo = Modelo.bind({});
EstiloRojo.args = {
  textoEncabezado: "Aviso importante!",
  colorAlerta: "rojo",
  textoCuerpo:
    // eslint-disable-next-line max-len
    "La póliza que intentas reportar presenta problemas de vigencia.<br /><br />No te preocupes, comunícate con nosotros para continuar tu atención.",
  mostrarCierre: true,
  mostrarModal: true,
  manejarCierre: () => {
    alert("cierra");
  },
  etiquetaBoton: "Llamar a cabina *434",
  funcionLlamadaBoton: () => {
    alert("llama");
  },
};

export const EstiloAmarillo = Modelo.bind({});
EstiloAmarillo.args = {
  textoEncabezado: "Aviso importante!",
  colorAlerta: "amarillo",
  textoCuerpo:
    // eslint-disable-next-line max-len
    "La póliza que intentas reportar presenta problemas de vigencia.<br /><br />No te preocupes, comunícate con nosotros para continuar tu atención.",
  mostrarCierre: true,
  mostrarModal: true,
  manejarCierre: () => {
    alert("cierra");
  },
  etiquetaBoton: "Llamar a cabina *434",
  funcionLlamadaBoton: () => {
    alert("llama");
  },
};

export const EstiloDosBotones = Modelo.bind({});
EstiloDosBotones.args = {
  textoEncabezado: "Ocurrió un problema",
  colorAlerta: "rojo",
  textoCuerpo:
    "Tu reporte no ha podido ser generado, te sugerimos intentarlo de nuevo",
  mostrarCierre: true,
  mostrarModal: true,
  manejarCierre: () => {
    alert("cierra");
  },
  etiquetaBoton: "Intentar nuevamente",
  temaBoton: "estandar",
  funcionLlamadaBoton: () => {
    alert("Intenta nuevamente");
  },
  etiquetaBoton2: "Llamar a HDI *434",
  temaBoton2: "simple",
  funcionLlamadaBoton2: () => {
    window.location.href = "tel:*434";
  },
};

export const IconoPalomita = Modelo.bind({});
IconoPalomita.args = {
  textoEncabezado: "Asistencia rápida",
  colorAlerta: "azul",
  tipoIcono: "palomita",
  textoCuerpo:
    // eslint-disable-next-line max-len
    "Usuario, tu siniestro fue elegido para ser atendido por nuestra herramienta <b>Ajustador Digital</b>, donde te brindaremos resolución de tu siniestro en menos de 2 horas hábiles.",
  mostrarCierre: false,
  mostrarModal: true,
  etiquetaBoton: "Continuar",
  temaBoton: "estandar",
  funcionLlamadaBoton: () => {
    alert("continuar");
  },
};

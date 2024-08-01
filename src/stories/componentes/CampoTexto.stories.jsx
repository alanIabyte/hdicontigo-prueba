/* eslint-disable react/jsx-props-no-spreading, no-alert */
import React from "react";
import moment from "moment";
import "moment/locale/es-mx";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import "../../recursos/estilos/estilos.scss";
import CampoTexto from "../../componentes/campo-texto";

export default {
  title: "Componentes/Campo Texto",
  component: CampoTexto,
};

const Modelo = (args) => (
  <div className="appS">
    <CampoTexto {...args} />
  </div>
);

export const Default = Modelo.bind({});
Default.args = {
  etiqueta: "Campo etiqueta",
};

export const ConIcono = Modelo.bind({});
ConIcono.args = {
  etiqueta: "Campo etiqueta",
  icono: <CameraAltIcon />,
};

export const NumeroDeSerie = Modelo.bind({});
NumeroDeSerie.args = {
  etiqueta: "Campo etiqueta",
  esSerie: true,
};

export const Calendario = Modelo.bind({});
Calendario.args = {
  etiqueta: "Campo etiqueta",
  esCalendario: true,
  fechaCalendario: moment(),
};

export const AreaDeTexto = Modelo.bind({});
AreaDeTexto.args = {
  etiqueta: "Campo etiqueta",
  esAreaDeTexto: true,
};

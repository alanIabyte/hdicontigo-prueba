import React from "react";
import moment from "moment";
import "moment/locale/es-mx";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const CampoTextoRegular = {
  etiqueta: "etiqueta campo regular",
  icono: <CameraAltIcon />,
};

const CampoTextoCalendario = {
  etiqueta: "etiqueta campo calendario",
  icono: <CalendarTodayIcon />,
  esCalendario: true,
  fechaCalendario: moment("01-01-2021"),
};

const CampoTextoSerie = {
  etiqueta: "etiqueta campo serie",
  esSerie: true,
};

const CampoTextoArea = {
  etiqueta: "etiqueta campo serie",
  esAreaDeTexto: true,
};

export {
  CampoTextoRegular,
  CampoTextoCalendario,
  CampoTextoSerie,
  CampoTextoArea,
};

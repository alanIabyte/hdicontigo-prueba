// Esta función setea el formato de la fecha.
// Ejemplo de fecha SIN formato 2021-04-30T20:59:10.275Z"
// Formato de output DD/MMM/YYYY HH:mm"
import moment from "moment";
import "moment/locale/es-mx";

const agregarFormatoDeFecha = (fecha) => {
  moment.locale("es-mx", {
    monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dec".split("_"),
  });

  let fechaFormato = moment();

  if (fecha.includes("T")) {
    fechaFormato = moment(fecha).local().utc().format("DD/MMM/YYYY HH:mm");
  } else {
    fechaFormato = moment(fecha, "YYYY-MM-DD HH:mm:ss").format(
      "DD/MMM/YYYY HH:mm"
    );
  }
  // console.log("En la conversion ConFormato", fechaFormato);
  return fechaFormato;
};

export default agregarFormatoDeFecha;

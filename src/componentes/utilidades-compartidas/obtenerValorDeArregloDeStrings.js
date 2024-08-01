// Esta función obtene el valor de un campo en un arreglo de strings.
// Por ejemplo, datos=["Reporte: 123","Hora: 12:42 P.M."] nombreCampo="Reporte: "
const obtenerValorDeArregloDeStrings = (datos, nombreCampo) => {
  if (datos && datos.length > 0) {
    const camposUnidos = datos.join("~");
    const camposSeparados = camposUnidos.split(nombreCampo)[1];
    if (camposSeparados) {
      return camposSeparados.split("~")[0];
    }
  }
  return "";
};

export default obtenerValorDeArregloDeStrings;

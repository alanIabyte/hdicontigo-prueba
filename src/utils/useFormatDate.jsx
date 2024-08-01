/* eslint-disable */

const useFormatDate = () => {

  const agregarCeroDelante = (numero) => {
    return numero < 10 ? '0' + numero : numero;
  }

  const obtenerFechaFormateada = (fechaInicial = null) => {
    const fecha = fechaInicial === null || fechaInicial === "" ? new Date() : new Date(fecha);
    const dia = agregarCeroDelante(fecha.getDate());
    const mes = agregarCeroDelante(fecha.getMonth() + 1);
    const anio = fecha.getFullYear();
    const hora = agregarCeroDelante(fecha.getHours());
    const minuto = agregarCeroDelante(fecha.getMinutes());
  
    return `${dia}_${mes}_${anio}_${hora}_${minuto}`;
  }

  const obtenerFechaFormatoString = (formato = "dd_mm_aaaa_hh_mm", fecha = null) => {
    switch(formato) {
      case "dd_mm_aaaa_hh_mm":
        return obtenerFechaFormateada(fecha);
      default:
        return obtenerFechaFormateada(fecha);
    }
  }

  return {
    obtenerFechaFormatoString,
  };

}

export default useFormatDate;
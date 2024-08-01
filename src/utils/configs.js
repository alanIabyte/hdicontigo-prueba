/* eslint-disable */
const showConfig = {
  showDomiciliacion: true,
  showPagos: true,
  showBotonReembolsos: true,
  showSegimientoGruas: true,
  domiciliacionDAN: true,
  calificaciones: true,
  fase2: false,
  lineaTiempo: true,
  showDaniosGlobales: true,
  showDobleFactor: false, // !Se apaga funcionalidad (petición de froy y juan 08/03/2024)
  ShowCristaleras: true,
  showRobo: true,
  showPagoDeducible: false, //(Apagar esta funcionalidad cuando se suba a pr) solo para tenerlo en cuenta por que ese no debe irse a pr paro genaro
  showKeycloak: true, // solo para demo ingreso biometrico
};

export default showConfig;

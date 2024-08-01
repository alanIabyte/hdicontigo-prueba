/* eslint-disable */
/*
    Esta función retorna un arreglo de deducibles dado un arreglo
    de strings como el siguiente:
    [
        "Referencia: 522004233166791208",
        "Monto: 2110.0",
        "CuentaClabe: 012225004534523369  ",
        "ConvenioCIE: 1026380",
        "Banco: BBVA Bancomer",
        "ArchivoBase64: BASE64...",
        "Extension: .pdf",
        "UrlPagoEnLinea: https://portalasegurado.testing.hdi.com.mx/",
        "Cobertura: DAÑOS MATERIALES",
    
        "Referencia: 522004233166791208",
        "Monto: 12000.0",
        "CuentaClabe: 012225004534523369  ",
        "ConvenioCIE: 1026380",
        "Banco: BBVA Bancomer",
        "ArchivoBase64: BASE64...",
        "Extension: .pdf",
        "UrlPagoEnLinea: https://portalasegurado.testing.hdi.com.mx/",
        "Cobertura: RESPONSABILIDAD CIVIL LUC.",
    
        "Referencia: 522004233166791208",
        "Monto: 12000.0",
        "CuentaClabe: 012225004534523369  ",
        "ConvenioCIE: 1026380",
        "Banco: BBVA Bancomer",
        "ArchivoBase64: BASE64...",
        "Extension: .pdf",
        "UrlPagoEnLinea: https://portalasegurado.testing.hdi.com.mx/",
        "Cobertura: RESPONSABILIDAD CIVIL LUC.",
    ];


*/

const obtenerDeducibles = (datos) => {
  const matches = [];
  const deducibles = [];
  if (datos.length === 0) {
    return [];
  } else {
    // Obtiene los indices de inicio de deducible:
    // NOTA: Cada deducible empieza con una referencia.
    datos?.forEach((el, index) => {
      if (el.startsWith("Referencia")) {
        matches.push(index);
      }
    });

    // Itera cada inicio obteniendo sus props consecuentes
    // NOTA: Un deducible tiene 8 props en total.
    matches?.forEach((match) => {
      let obj = "";
      const finish = match + 8;
      for (let i = match; i <= finish; i++) {
        obj += datos[i] + ",";
      }
      deducibles.push(obj);
    });
    return deducibles;
  }
};

export default obtenerDeducibles;

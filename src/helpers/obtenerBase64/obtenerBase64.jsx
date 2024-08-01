/* eslint-disable */
const eliminarExpresiones = (tipoArchivo = "pdf", base64) => {
  let regex; 
  if (tipoArchivo === "xml") {
    regex = new RegExp('xmlFactura: ');      
    return base64.replace(regex, "");
  } else {
    regex = new RegExp('data:application/pdf;base64,');      
    return base64.replace(regex, "");
  }
};

const getBase64 = (file, tipoArchivo = "pdf") => {
  const reader = new FileReader();
  console.log(tipoArchivo);
  return new Promise((resolve, reject) => {
    if (tipoArchivo === "xml") {
      reader.readAsText(file);
      reader.onloadend = (event) => {
        const readerData = event.target.result;
        const parser = new DOMParser();

        // Se reemplazan comillas dobles por simples debido a errores en el back
        const outputXmlStr = readerData.replace(/("|')/g, "'");
        let finalXmlString = outputXmlStr.replaceAll(/>\s*/g, '>');
        finalXmlString = finalXmlString.replaceAll(/\s*</g, '<');
        finalXmlString = finalXmlString.replace(/(\r\n|\n|\r)/gm, "");
        const final = parser.parseFromString(finalXmlString, "application/xml"); 
        // resolve(eliminarExpresiones("xml", finalXmlString));
        console.log(final);
        resolve(new XMLSerializer().serializeToString(final));
      };
    } else {
      reader.readAsDataURL(file);
      // reader.onload = () => resolve(eliminarExpresiones("pdf", reader.result));
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
    }
  });
};

export default getBase64;

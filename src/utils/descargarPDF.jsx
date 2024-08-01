/* eslint-disable */
import { iOSDevice, isSafari } from "../utils/validaDispositivo";

const descargarPDF = (base64, nombre, tipo) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = nombre + `.${tipo}`;
      const linkSource = `data:application/${tipo};base64,${base64}`;
      if (iOSDevice()) {
        iOSDownload(base64, fileName, linkSource);
      } else {
        deviceDownload(fileName, linkSource);
      }
      resolve(200);
    } catch (error) {
      console.log("Error al descargar: " + error);
      reject(500);
    }
  });
};

const deviceDownload = (fileName, linkSource) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.target = "_blank";
  downloadLink.click();
};

const iOSDownload = (base64, fileName, linkSource) => {
  var contentType = "application/pdf";
  var hrefUrl = "";
  var blob = "";
  var iOSVersion = navigator.userAgent
    .match(/OS [\d_]+/i)[0]
    .substr(3)
    .split("_")
    .map((n) => parseInt(n));
  var binary = atob(base64.replace(/\s/g, ""));
  var len = binary.length;
  var buffer = new ArrayBuffer(len);
  var view = new Uint8Array(buffer);
  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  // TODO: Creamos el link para la descarga en iOS dependiendo de su versionamiento.
  var linkElement = document.createElement("a");
  // * Ya sea iOS con versión menor o sea PC o Android.
  if (iOSDevice() && isSafari() && iOSVersion[0] <= 12) {
    blob = linkSource;
    hrefUrl = blob;
  } else {
    // * Si es iOS y Safari lo que se usa, pero su versión es mayor a la 12...
    if (iOSDevice() && isSafari()) {
      contentType = "application/octet-stream";
    }
    blob = new Blob([view], { type: contentType });
    hrefUrl = window.URL.createObjectURL(blob);
  }
  linkElement.setAttribute("href", hrefUrl);
  linkElement.setAttribute("target", "_blank");

  if ((iOSDevice() && (iOSVersion[0] > 12 || !isSafari())) || !iOSDevice()) {
    linkElement.setAttribute("download", fileName);
  }
  var clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: false
  });
  linkElement.dispatchEvent(clickEvent);
};

export default descargarPDF;

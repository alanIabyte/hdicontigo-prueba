/* eslint-disable prefer-promise-reject-errors */
const convertirYDescargar = (documento) => {
  const binaryString = window.atob(documento.base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const newBlob = new Blob([bytes.buffer], { type: "application/pdf" });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
  }
  const dataBlob = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = dataBlob;
  link.download = documento.nombre;
  link.click();
  window.URL.revokeObjectURL(dataBlob);
  link.remove();
};

const iniciarDescargaPDF = (base64, nombre, tipo) =>
  new Promise((resolve, reject) => {
    try {
      const linkSource = `data:application/${tipo};base64,${base64}`;
      const downloadLink = document.createElement("a");
      const fileName = `${nombre}.${tipo}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      resolve(200);
    } catch (error) {
      reject(500);
    }
  });

export { convertirYDescargar, iniciarDescargaPDF };

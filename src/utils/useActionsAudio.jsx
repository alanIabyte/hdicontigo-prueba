/* eslint-disable */

const useActionsAudio = () => {

  const descargarUrlBlob = (url) => {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => {
        return blob;
      })
      .catch(() => {
        return null;
      });
  }
  
  return {
    descargarUrlBlob
  };

};

export default useActionsAudio;

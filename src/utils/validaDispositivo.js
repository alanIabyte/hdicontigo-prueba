/* eslint-disable  */
/* import/prefer-default-export */
const validaDispositivoCelular = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
};

const iOSDevice = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const isSafari = () => {
  return (
    navigator.vendor &&
    navigator.vendor.includes("Apple") &&
    /\sSafari\//.test(navigator.userAgent)
  );
};

export { validaDispositivoCelular, iOSDevice, isSafari };

/* eslint-disable */
import { useState } from "react";

const useAlerta = (config) => {
  const [colorAlerta, setcolorAlerta] = useState(config.colorAlerta);
  const [estiloBotones, setestiloBotones] = useState(config.estiloBotones);
  const [etiquetaBoton, setetiquetaBoton] = useState(config.etiquetaBoton);
  const [etiquetaBoton2, setetiquetaBoton2] = useState(config.etiquetaBoton2);
  const [mostrarCierre, setmostrarCierre] = useState(config.mostrarCierre);
  const [mostrarIcono, setmostrarIcono] = useState(config.mostrarIcono);
  const [mostrarModal, setmostrarModal] = useState(config.mostrarModal);
  const [temaBoton, settemaBoton] = useState(config.temaBoton);
  const [temaBoton2, settemaBoton2] = useState(config.temaBoton2);
  const [textoCuerpo, settextoCuerpo] = useState(config.textoCuerpo);
  const [textoCuerpoJsx, settextoCuerpoJsx] = useState(config.textoCuerpoJsx);
  const [textoEncabezado, settextoEncabezado] = useState(
    config.textoEncabezado
  );
  const [tipoIcono, settipoIcono] = useState(config.tipoIcono);
  const [bottomLink, setBottomLink] = useState("");
  const [bottomLinkOnClick, setBottomLinkOnClick] = useState(() => {});
  const [margenMinimo, setmargenMinimo] = useState(config.margenMinimo);

  const actualizar = (config) => {
    setcolorAlerta(config?.colorAlerta);
    setestiloBotones(config?.estiloBotones);
    setetiquetaBoton(config?.etiquetaBoton);
    setetiquetaBoton2(config?.etiquetaBoton2);
    setmostrarCierre(config?.mostrarCierre);
    setmostrarIcono(config?.mostrarIcono);
    setmostrarModal(config?.mostrarModal);
    settemaBoton(config?.temaBoton);
    settemaBoton2(config?.temaBoton2);
    settextoCuerpo(config?.textoCuerpo);
    settextoCuerpoJsx(config?.textoCuerpoJsx);
    settextoEncabezado(config?.textoEncabezado);
    settipoIcono(config?.tipoIcono);
    setmargenMinimo(config?.margenMinimo);
    setBottomLink(config?.bottomLink);
    setBottomLinkOnClick(config?.bottomLinkOnClick);
  }

  const mostrar = () => {
    setmostrarModal(true)
  }

  const cerrar = () => {
   setmostrarModal(false); 
  }

  return {
    colorAlerta,
    estiloBotones,
    etiquetaBoton,
    etiquetaBoton2,
    mostrarCierre,
    mostrarIcono,
    mostrarModal,
    temaBoton,
    temaBoton2,
    textoCuerpo,
    textoCuerpoJsx,
    textoEncabezado,
    tipoIcono,
    margenMinimo,
    setcolorAlerta,
    setestiloBotones,
    setetiquetaBoton,
    setetiquetaBoton2,
    setmostrarCierre,
    setmostrarIcono,
    settemaBoton,
    settemaBoton2,
    settextoCuerpo,
    settextoCuerpoJsx,
    settextoEncabezado,
    settipoIcono,
    setmargenMinimo,
    actualizar,
    mostrar,
    cerrar,
    bottomLink,
    bottomLinkOnClick,
  };
};

export default useAlerta;

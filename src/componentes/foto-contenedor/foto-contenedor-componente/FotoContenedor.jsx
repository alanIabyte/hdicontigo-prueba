import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import {
  EnvolvedorFotoContenedor,
  ImagenFoto,
  ImagenFotoContenedor,
  ImagenFotoSombra,
  FotoContenedorTextos,
  FotoContenedorTitulo,
  FotoContenedorSubtitulo,
} from "./FotoContenedor.styled";

const FotoContenedor = (props) => {
  const diccionario = {
    texto: "Tomar foto",
    textoExito: "Reemplazar foto",
    textoError1: "Carga fallida, reintentar",
    textoError2: "La foto superó el límite de 3 MB, reintentar con otra",
  };
  const {
    imagen,
    imagenPorDefecto,
    titulo,
    alPresentarError,
    alDarClickEnZoom,
    alCargarseExitosamente,
    seCargoAServidor,
  } = props;
  const [imagenAUtilizar, asignarValorImagenAUtilizar] =
    useState(imagenPorDefecto);
  const [cargando, asignarValorCargando] = useState(imagen);
  const [estatus, asignarValorEstatus] = useState();
  const [textoEstatus, asignarValorTextoEstatus] = useState(diccionario.texto);
  const limiteTamanoArchivo = 3145728;

  const actualizarComponente = () => {
    const stringBase64Imagen = imagen.split("base64,")[1];
    const tamanoArchivo = atob(stringBase64Imagen).length;
    const esDeTamanoAdecuado = tamanoArchivo <= limiteTamanoArchivo;
    if (esDeTamanoAdecuado) {
      asignarValorImagenAUtilizar(imagen);
      asignarValorEstatus(seCargoAServidor ? "exito" : "precarga");
      asignarValorTextoEstatus(diccionario.textoExito);
      alCargarseExitosamente();
    } else {
      asignarValorEstatus("error");
      asignarValorTextoEstatus(diccionario.textoError2);
      alPresentarError();
    }
    asignarValorCargando(false);
  };

  useEffect(() => {
    if (imagen) {
      actualizarComponente();
    }
    return null;
  }, []);

  const alDarClickEnContenedor = () => {
    const { alDarClick } = props;
    alDarClick();
  };

  let icon = null;
  if (estatus === "error") {
    icon = <ErrorIcon />;
  } else if (estatus === "exito") {
    icon = <CheckCircleIcon />;
  }

  return (
    <EnvolvedorFotoContenedor
      estatus={estatus}
      key={v4()}
      onClick={alDarClickEnContenedor}
    >
      {imagenAUtilizar ? (
        <ImagenFotoContenedor>
          <ImagenFoto
            porDefecto={!imagen && imagenPorDefecto}
            src={imagenAUtilizar}
          />
          {imagen && estatus === "exito" ? (
            <ImagenFotoSombra onClick={alDarClickEnZoom}>
              <ZoomInIcon />
            </ImagenFotoSombra>
          ) : null}
        </ImagenFotoContenedor>
      ) : null}
      <FotoContenedorTextos conImagen={imagenAUtilizar}>
        <FotoContenedorTitulo estatus={estatus}>{titulo}</FotoContenedorTitulo>
        {!cargando ? <CameraAltIcon /> : null}
        {!cargando ? (
          <FotoContenedorSubtitulo estatus={estatus}>
            {textoEstatus}
          </FotoContenedorSubtitulo>
        ) : null}
      </FotoContenedorTextos>
      {estatus === "" ? null : icon}
    </EnvolvedorFotoContenedor>
  );
};

FotoContenedor.defaultProps = {
  alCargarseExitosamente: () => null,
  alDarClick: () => null,
  alDarClickEnZoom: () => null,
  alPresentarError: () => null,
  imagen: "",
  imagenPorDefecto: "",
  seCargoAServidor: false,
  titulo: "",
};

FotoContenedor.propTypes = {
  alCargarseExitosamente: PropTypes.func,
  alDarClick: PropTypes.func,
  alDarClickEnZoom: PropTypes.func,
  alPresentarError: PropTypes.func,
  imagen: PropTypes.string,
  imagenPorDefecto: PropTypes.string,
  seCargoAServidor: PropTypes.bool,
  titulo: PropTypes.string,
};

export default FotoContenedor;

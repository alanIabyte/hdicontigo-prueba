import React from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";
import { v4 } from "uuid";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Encabezado from "../../encabezado";
import {
  Archivo,
  BotonCamara,
  BotonCancelar,
  BotonConfirmar,
  ContenedorBoton,
  ContenedorBotonCamara,
  ContenedorImagen,
  ContenedorOpciones,
  ContenedorPantallaCamara,
  ContenedorSeleccion,
  ContenedorWebCam,
  EnvolvedorPantallaCamara,
} from "./PantallaCamara.styled";
import "./estilos.scss";

class PantallaCamara extends React.Component {
  constructor() {
    super();
    this.state = {
      opciones: "",
      imagen: "",
      archivoSeleccionado: null,
    };
    this.configuracionCamara = {
      facingMode: "environment",
    };
    this.webcamRef = React.createRef();
    this.imagenRef = React.createRef();
    this.archivoRef = React.createRef();
    this.alSeleccionarArchivo = this.alSeleccionarArchivo.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  cancelar = () => {
    this.setState({
      imagen: "",
      opciones: null,
    });
  };

  aceptar = () => {
    const { alAceptar } = this.props;
    const { imagen } = this.state;
    alAceptar(imagen);
  };

  capturar = () => {
    const imagenRec = this.webcamRef.current.getScreenshot();
    this.cortarImagen(imagenRec, (url) => {
      this.setState({
        imagen: url,
        opciones: (
          <ContenedorOpciones>
            <BotonCancelar onClick={this.cancelar}>
              <CloseRoundedIcon />
            </BotonCancelar>
            <BotonConfirmar onClick={this.aceptar}>
              <CheckRoundedIcon />
            </BotonConfirmar>
          </ContenedorOpciones>
        ),
      });
    });
  };

  cortarImagen = (imagenBase64, funcionALlamar) => {
    const img = new Image();
    img.src = imagenBase64;
    img.onload = () => {
      // Generar área de corte
      // Se hace cálculo de proporción de pixeles mediante la altura
      const proporcionPixeles =
        img.height / this.imagenRef.current.offsetHeight;
      const anchoProporcional =
        this.imagenRef.current.offsetWidth * proporcionPixeles;
      const calculoMitadDeAncho = img.width / 2;
      const areaDeCortado = {
        arriba: 0,
        abajo: img.height,
        izquierda: calculoMitadDeAncho - anchoProporcional / 2,
        derecha: calculoMitadDeAncho + anchoProporcional / 2,
      };
      const canvas = document.createElement("canvas");
      canvas.width = this.imagenRef.current.offsetWidth;
      canvas.height = this.imagenRef.current.offsetHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        areaDeCortado.izquierda,
        areaDeCortado.arriba,
        anchoProporcional,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      funcionALlamar(canvas.toDataURL("image/jpeg"));
    };
  };

  regresar = () => {
    const { alCerrar } = this.props;
    alCerrar();
  };

  alDarClickEnContenedor = () => {
    this.archivoRef.current.click();
  };

  convertirABase64 = (archivo) =>
    new Promise((resuelve, rechaza) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resuelve(lector.result);
      lector.onerror = (error) => rechaza(error);
    });

  async alSeleccionarArchivo(e) {
    if (!e.target.files || e.target.files.length === 0) {
      this.setState({
        archivoSeleccionado: null,
      });
      return null;
    }
    const regex = new RegExp("image/");
    if (!regex.test(e.target.files[0].type)) {
      return null;
    }
    const archivoEnBase64 = await this.convertirABase64(e.target.files[0]);
    const { alAceptar } = this.props;
    alAceptar(archivoEnBase64);
    this.setState({
      archivoSeleccionado: archivoEnBase64,
    });
    return null;
  }

  render() {
    const { imagen, opciones, archivoSeleccionado } = this.state;
    const { titulo } = this.props;

    return (
      <EnvolvedorPantallaCamara key={v4()}>
        <Encabezado titulo={titulo} funcionRegresar={this.regresar} />
        <ContenedorPantallaCamara>
          <ContenedorWebCam key={v4()}>
            <ContenedorImagen ref={this.imagenRef}>
              {!imagen && (
                <Webcam
                  className="camara"
                  audio={false}
                  ref={this.webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={this.configuracionCamara}
                  screenshotQuality={1}
                />
              )}
              {imagen && (
                <img src={imagen} alt="screenshot" className="camara" />
              )}
            </ContenedorImagen>
            <ContenedorBoton>
              {!imagen && (
                <ContenedorOpciones onClick={this.alDarClickEnContenedor}>
                  <Archivo
                    ref={this.archivoRef}
                    type="file"
                    onChange={this.alSeleccionarArchivo}
                    accept="image/*"
                  />
                  <ContenedorSeleccion src={archivoSeleccionado} />
                </ContenedorOpciones>
              )}
              {!imagen && (
                <ContenedorBotonCamara>
                  <BotonCamara onClick={this.capturar}>
                    {this.etiquetaBoton}
                  </BotonCamara>
                </ContenedorBotonCamara>
              )}
              {opciones}
            </ContenedorBoton>
          </ContenedorWebCam>
        </ContenedorPantallaCamara>
      </EnvolvedorPantallaCamara>
    );
  }
}

PantallaCamara.propTypes = {
  alCerrar: PropTypes.func,
  alAceptar: PropTypes.func,
  titulo: PropTypes.string,
};

PantallaCamara.defaultProps = {
  alCerrar: () => null,
  alAceptar: () => null,
  titulo: "",
};

export default PantallaCamara;

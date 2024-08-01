import React from "react";
import PropTypes from "prop-types";
import { createWorker } from "tesseract.js";
import Webcam from "react-webcam";
import { v4 } from "uuid";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Encabezado from "../../encabezado";
import {
  BotonCamara,
  BotonCancelar,
  BotonConfirmar,
  ContenedorBoton,
  ContenedorBotonCamara,
  ContenedorMensaje,
  ContenedorOpciones,
  ContenedorPantallaIngresoDePolizaOcr,
  ContenedorWebCam,
  ContenidoMensaje,
  EnvolvedorInstruccionesPantallaIngresoDePolizaOcr,
  EnvolvedorPantallaIngresoDePolizaOcr,
  MarcoContenedor,
  MarcoArriba,
  MarcoIzquierdo,
  MarcoAbajo,
  MarcoDerecho,
} from "./PantallaIngresoDePolizaOcr.styled";

const diccionario = {
  instrucciones: "Coloca el número de póliza completo dentro del recuadro",
  procesando: "Procesando",
  resultadoNoSatisfactorio: "No se ha detectado ningún número.",
  titulo: "Escanear Póliza",
};

class PantallaIngresoDePolizaOcr extends React.Component {
  constructor() {
    super();
    this.state = {
      resultadoSatisfactorio: false,
      mensajeDeProcesamiento: "",
      resultado: "",
      recImagen: "",
    };

    this.videoConstraints = {
      facingMode: "environment",
    };
    this.webcamRef = React.createRef();
    this.actualizaProgreso = this.actualizaProgreso.bind(this);
    this.capturar = this.capturar.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.aceptar = this.aceptar.bind(this);
    this.instrucciones = diccionario.instrucciones;
    this.etiquetaBoton = "";
  }

  componentDidMount() {
    this.worker = createWorker({
      logger: (m) => this.actualizaProgreso(m),
    });
  }

  cancelar() {
    const { alCancelar } = this.props;
    this.setState({
      resultado: "",
      mensajeDeProcesamiento: "",
      resultadoSatisfactorio: false,
      recImagen: "",
    });
    alCancelar();
  }

  aceptar() {
    const { alAceptar } = this.props;
    const { resultado } = this.state;
    alAceptar(resultado);
  }

  actualizaProgreso(m) {
    const maximoPorcentage = 1;
    const decimales = 2;

    if (m.status === "recognizing text") {
      const value = (m.progress / maximoPorcentage) * 100;
      this.setState({
        mensajeDeProcesamiento: `${diccionario.procesando} ${value.toFixed(
          decimales
        )} %...`,
      });
    }
  }

  async procesarOCR(src) {
    await this.worker.load();
    await this.worker.loadLanguage("eng");
    await this.worker.initialize("eng");

    const {
      data: { text },
    } = await this.worker.recognize(src);
    const txt = text.toUpperCase();
    const matches = txt.matchAll("LIZA");
    let res = "";
    let terminado = false;

    for (const match of matches) {
      res = txt.substr(match.index + 5, 21);
      res = res.trim();
      res = res.replace(".", "-");
      const des = res.split(" ")[0];
      if (des.length > 0) {
        res = des;
      }

      if (res.match("[0-9]{1,4}-*[0-9]{1,6}-*[0-9]{1,2}")) {
        res = res.replace(/[^0-9-]/g, "");
        this.setState({
          resultado: `${res}`,
          resultadoSatisfactorio: true,
        });
        terminado = true;
        break;
      }
    }

    if (!terminado) {
      this.setState({
        resultado: diccionario.resultadoNoSatisfactorio,
        resultadoSatisfactorio: false,
      });
    }
  }

  capturar() {
    const imagenRec = this.webcamRef.current.getScreenshot();
    this.setState({
      recImagen: imagenRec,
    });
    this.procesarOCR(imagenRec);
  }

  render() {
    const {
      recImagen,
      resultado,
      resultadoSatisfactorio,
      mensajeDeProcesamiento,
    } = this.state;

    return (
      <EnvolvedorPantallaIngresoDePolizaOcr key={v4()}>
        <Encabezado
          titulo={diccionario.titulo}
          funcionRegresar={this.cancelar}
        />
        <EnvolvedorInstruccionesPantallaIngresoDePolizaOcr>
          {this.instrucciones}
        </EnvolvedorInstruccionesPantallaIngresoDePolizaOcr>
        <ContenedorPantallaIngresoDePolizaOcr>
          <ContenedorWebCam key={v4()}>
            {!recImagen && (
              <Webcam
                className="web-cam-estandar"
                audio={false}
                ref={this.webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={this.videoConstraints}
              />
            )}
            {recImagen && (
              <img
                src={recImagen}
                alt="screenshot"
                className="web-cam-estandar"
              />
            )}
            <ContenedorBoton>
              {!recImagen && (
                <ContenedorBotonCamara>
                  <BotonCamara onClick={this.capturar}>
                    {this.etiquetaBoton}
                  </BotonCamara>
                </ContenedorBotonCamara>
              )}
              {resultado && !resultadoSatisfactorio && (
                <ContenedorOpciones>
                  <BotonCancelar onClick={this.cancelar}>
                    <CloseRoundedIcon />
                  </BotonCancelar>
                </ContenedorOpciones>
              )}
              {resultado && resultadoSatisfactorio && (
                <ContenedorOpciones>
                  <BotonCancelar onClick={this.cancelar}>
                    <CloseRoundedIcon />
                  </BotonCancelar>
                  <BotonConfirmar onClick={this.aceptar}>
                    <CheckRoundedIcon />
                  </BotonConfirmar>
                </ContenedorOpciones>
              )}
            </ContenedorBoton>
            <MarcoContenedor>
              <MarcoArriba />
              <MarcoIzquierdo />
              <MarcoAbajo />
              <MarcoDerecho />
            </MarcoContenedor>
            <ContenedorMensaje>
              <ContenidoMensaje>
                {resultado || mensajeDeProcesamiento}
              </ContenidoMensaje>
            </ContenedorMensaje>
          </ContenedorWebCam>
        </ContenedorPantallaIngresoDePolizaOcr>
      </EnvolvedorPantallaIngresoDePolizaOcr>
    );
  }
}

PantallaIngresoDePolizaOcr.propTypes = {
  alCancelar: PropTypes.func,
  alAceptar: PropTypes.func,
};

PantallaIngresoDePolizaOcr.defaultProps = {
  alCancelar: null,
  alAceptar: null,
};

export default PantallaIngresoDePolizaOcr;

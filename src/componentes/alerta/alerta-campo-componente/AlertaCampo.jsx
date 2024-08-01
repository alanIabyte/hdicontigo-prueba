/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";
import {
  AlertaBotonCierre,
  AlertaCierreContenedorIcono,
  AlertaContenedor,
  AlertaContenedorIcono,
  AlertaContenedorSegundoBoton,
  AlertaCuerpo,
  AlertaEncabezado,
  AlertaTextoCuerpo,
  AlertaTextoEncabezado,
  ContenedorBotones,
  EnvolvedorAlerta,
  MensajeError,
  CampoMayusculas,
} from "./Alerta.styled";
import Boton from "../../boton";
import TrianguloAlerta from "../recursos/triangulo-alerta.svg";
import IconoUbicacion from "../../../recursos/iconos/hdi-c/domiciliar/ubicacion.svg";
import IconoPago from "../../../recursos/iconos/hdi-c/domiciliar/domiciliar.svg";
import CampoTexto from "../../campo-texto";

const valores = {
  campo: "",
};

const AlertaCampo = (props) => {
  const [focoCampo, asignarValorFocoCampo] = useState("");
  const [errorCampo, asignarValorErrorCampo] = useState("");
  const [completadoCampo, asignarValorCompletadoCampo] = useState("");

  const {
    colorAlerta,
    estiloBotones,
    etiquetaBoton,
    etiquetaBoton2,
    funcionLlamadaBoton,
    funcionLlamadaBoton2,
    manejarCierre,
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
    nombreCampo,
    numCaracteresCampo,
    regexCampo,
    validacionesCampo,
    campoMayusculas,
  } = props;

  let icono = null;
  let encabezado = null;
  const dispatch = useDispatch();

  if (mostrarIcono) {
    if (tipoIcono === "palomita") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono" color={colorAlerta}>
          <CheckCircleRoundedIcon style={{ fontSize: 70 }} />
        </AlertaContenedorIcono>
      );
    } else if (tipoIcono === "trianguloAlerta") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={TrianguloAlerta} />
        </AlertaContenedorIcono>
      );
    } else if (tipoIcono === "ubicacion") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono" color={colorAlerta} style={{width: "60px"}}>
          <img alt="imagen-alerta" src={IconoUbicacion} />
        </AlertaContenedorIcono>
      );
    } else if (tipoIcono === "pago") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono" color={colorAlerta}>
          <img alt="imagen-alerta" src={IconoPago} />
        </AlertaContenedorIcono>
      );
    } else {
      icono = (
        <AlertaContenedorIcono id="alertaIcono" color={colorAlerta}>
          <ErrorRoundedIcon style={{ fontSize: 70 }} />
        </AlertaContenedorIcono>
      );
    }
  }

  if (mostrarCierre) {
    encabezado = (
      <AlertaEncabezado>
        <AlertaBotonCierre
          id="alertaBotonCierre"
          type="submit"
          onClick={() => {
            manejarCierre(false);
          }}
        >
          <AlertaCierreContenedorIcono>
            <CloseRoundedIcon />
          </AlertaCierreContenedorIcono>
        </AlertaBotonCierre>
      </AlertaEncabezado>
    );
  }

  const alCambiarCampo = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.campo = valor;
    }
  };

  const despliegaTextoCuerpo = () => ({ __html: textoCuerpo });

  const validarCampo1 = () => {
    validacionesCampo(valores.campo).then((respuesta) => {
      asignarValorFocoCampo(respuesta.foco);
      asignarValorCompletadoCampo(respuesta.valida);
      asignarValorErrorCampo(respuesta.error);
    });
  };

  useEffect(() => {
    if (completadoCampo) {
      dispatch({
        type: "AGREGAR",
        valor: {
          data: valores.campo,
        },
        indice: "campoAlertaCampo",
      });
      console.log("Valor campo:", valores.campo);
      valores.campo = "";
      funcionLlamadaBoton();
    }
  }, [completadoCampo]);

  return (
    <EnvolvedorAlerta key={v4()} className="modal" show={mostrarModal}>
      <AlertaContenedor id="alertaCuerpo">
        {encabezado}
        <AlertaCuerpo margenMinimo={margenMinimo}>
          {icono}
          <AlertaTextoEncabezado id="alertaEncabezado">
            {textoEncabezado}
          </AlertaTextoEncabezado>
          {textoCuerpo ? (
            <AlertaTextoCuerpo
              id="alertaTexto"
              dangerouslySetInnerHTML={despliegaTextoCuerpo()}
            />
          ) : (
            <AlertaTextoCuerpo id="alertaTexto">
              {textoCuerpoJsx}
            </AlertaTextoCuerpo>
          )}

          {campoMayusculas ? (
            <CampoMayusculas>
              <CampoTexto
                id="campo1Alerta"
                // etiqueta={nombreCampo}
                enCambio={alCambiarCampo}
                foco={focoCampo}
                valor={valores.campo}
                numeroDeCaracteres={numCaracteresCampo}
                expresionRegular={regexCampo}
              />
            </CampoMayusculas>
          ) : (
            <CampoTexto
              id="campo1Alerta"
              etiqueta={nombreCampo}
              enCambio={alCambiarCampo}
              foco={focoCampo}
              valor={valores.campo}
              numeroDeCaracteres={numCaracteresCampo}
              expresionRegular={regexCampo}
            />
          )}
          <MensajeError id="errorCampo" style={{ marginTop: "20px" }}>{errorCampo}</MensajeError>

          <ContenedorBotones id="alertaBotones" estiloBotones={estiloBotones}>
            {etiquetaBoton && (
              <Boton
                etiqueta={etiquetaBoton}
                tema={temaBoton}
                enClick={validarCampo1}
              />
            )}
            {etiquetaBoton2 && (
              <AlertaContenedorSegundoBoton>
                <Boton
                  etiqueta={etiquetaBoton2}
                  tema={temaBoton2}
                  enClick={funcionLlamadaBoton2}
                />
              </AlertaContenedorSegundoBoton>
            )}
          </ContenedorBotones>
        </AlertaCuerpo>
      </AlertaContenedor>
    </EnvolvedorAlerta>
  );
};

AlertaCampo.propTypes = {
  colorAlerta: PropTypes.oneOf(["rojo", "amarillo", "azul"]),
  estiloBotones: PropTypes.oneOf(["ladoALado", ""]),
  etiquetaBoton: PropTypes.string,
  etiquetaBoton2: PropTypes.string,
  funcionLlamadaBoton: PropTypes.func,
  funcionLlamadaBoton2: PropTypes.func,
  manejarCierre: PropTypes.func,
  mostrarCierre: PropTypes.bool,
  mostrarIcono: PropTypes.bool,
  mostrarModal: PropTypes.bool,
  temaBoton: PropTypes.oneOf(["estandar", "rojo", "simple"]),
  temaBoton2: PropTypes.oneOf(["estandar", "rojo", "simple"]),
  textoCuerpo: PropTypes.string,
  textoCuerpoJsx: PropTypes.node,
  textoEncabezado: PropTypes.string,
  tipoIcono: PropTypes.oneOf([
    "alerta",
    "palomita",
    "trianguloAlerta, ubicacion, pago",
  ]),
  margenMinimo: PropTypes.bool,
  campoMayusculas: PropTypes.bool,
  nombreCampo: PropTypes.string,
  numCaracteresCampo: PropTypes.number,
  regexCampo: PropTypes.any,
  validacionesCampo: PropTypes.func,
};

AlertaCampo.defaultProps = {
  colorAlerta: "amarillo",
  estiloBotones: "",
  etiquetaBoton: "",
  etiquetaBoton2: "",
  funcionLlamadaBoton() {},
  funcionLlamadaBoton2() {},
  manejarCierre() {},
  mostrarCierre: true,
  mostrarIcono: true,
  mostrarModal: false,
  temaBoton: "estandar",
  temaBoton2: "estandar",
  textoCuerpo: "",
  textoCuerpoJsx: null,
  textoEncabezado: "",
  tipoIcono: "alerta",
  margenMinimo: false,
  campoMayusculas: false,
  nombreCampo: "RFC",
  numCaracteresCampo: 13,
  regexCampo: /(^[0-9a-zA-Z&Ññ]+$|^$)/,
  validacionesCampo: () => {},
};

export default AlertaCampo;

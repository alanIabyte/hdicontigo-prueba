/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
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
  AlertaEnlace,
  AlertaTextoCuerpo,
  AlertaTextoEncabezado,
  ContenedorBotones,
  EnvolvedorAlerta,
} from "./Alerta.styled";
import Boton from "../../boton";
import TrianguloAlerta from "../../../recursos/iconos/hdi-c/domiciliar/cancelar.svg";
import IconoDomiciliacionCancelada from "../../../recursos/iconos/hdi-c/domiciliar/cancelada.svg";
import IconoUbicacion from "../../../recursos/iconos/hdi-c/domiciliar/ubicacion.svg";
import IconoContigo from "../../../recursos/iconos/ico_contigo.svg";
import IconoPagoProgramado from "../../../recursos/iconos/hdi-c/domiciliar/domiciliado.svg";
import IconoDaniosGlobales from "../../../recursos/iconos/contigo/ico_daniosGlobales.svg"
import IconoPerdidaTotal from "../../../recursos/iconos/contigo/ico_pt.svg"
import Icono911 from "../../../recursos/iconos/RT/1-modal.svg";
import IconoAyudaValuacion from "../../../recursos/iconos/contigo/ico_ayuda_valuacion.svg";
import IconoEmail from "../../../recursos/iconos/ico_mail.svg";
import IconoRequeridos from "../../../recursos/iconos/contigo/Ayudas-linea-tiempo/ico_requeridos.svg";
import IconoPago from "../../../recursos/iconos/contigo/Ayudas-linea-tiempo/ico_pago.svg";
import IconoEntrega from "../../../recursos/iconos/contigo/Ayudas-linea-tiempo/ico_entrega.svg";
import IconoRoboTotal from "../../../recursos/iconos/RT/robo-total.svg";

import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";



const Alerta = (props) => {
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
    textoCuerpo2,
    textoCuerpoJsx,
    textoEncabezado,
    tipoIcono,
    margenMinimo,
    bottomLink,
    bottomLinkOnClick,
    children,
    tituloArriba
  } = props;

  let icono = null;
  let encabezado = null;

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
    } else if(tipoIcono === "ubicacion") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono" color={colorAlerta}>
          <img alt="imagen-alerta" src={IconoUbicacion} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "contigo"){
      icono = (
        <AlertaContenedorIcono id="alertaIcono" color={colorAlerta} tipo="contigo">
          <img alt="imagen-alerta" src={IconoContigo} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "pagoProgramado"){
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={IconoPagoProgramado} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "domiciliacionCancelada"){
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={IconoDomiciliacionCancelada} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "danios globales") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={IconoDaniosGlobales} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "perdida total") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={IconoPerdidaTotal} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "requeridos"){
      icono = (
        <AlertaContenedorIcono id="alertaRequeridos">
          <img alt="image-alerta" src={IconoRequeridos} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "pago"){
      icono = (
        <AlertaContenedorIcono id="alertaPago">
          <img alt="image-alerta" src={IconoPago} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "entrega"){
      icono = (
        <AlertaContenedorIcono id="alertaEntrega">
          <img alt="image-alerta" src={IconoEntrega} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "") {
      icono = (<AlertaContenedorIcono />);
    } else if (tipoIcono === "911") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={Icono911} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "ayudaValuacion") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={IconoAyudaValuacion} />
        </AlertaContenedorIcono>
      )
    }
    else if (tipoIcono === "email") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="imagen-alerta" src={IconoEmail} />
        </AlertaContenedorIcono>
      )
    } else if (tipoIcono === "robo total") {
      icono = (
        <AlertaContenedorIcono id="alertaIcono">
          <img alt="image-alerta" src={IconoRoboTotal}/>
        </AlertaContenedorIcono>
      )
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

  const despliegaTextoCuerpo = () => ({ __html: textoCuerpo });

  return (
    <EnvolvedorAlerta key={v4()} className="modal" show={mostrarModal}>
      <AlertaContenedor id="alertaCuerpo">
        {encabezado}
        <AlertaCuerpo margenMinimo={margenMinimo}>
          {tituloArriba && (
            <AlertaTextoEncabezado id="alertaEncabezado">
              {textoEncabezado}
            </AlertaTextoEncabezado>
          )}
          {icono}
          {!tituloArriba && (
            <AlertaTextoEncabezado id="alertaEncabezado">
              {textoEncabezado}
            </AlertaTextoEncabezado>
          )}
          {textoCuerpo && !textoCuerpo2 ? (
            <AlertaTextoCuerpo
              id="alertaTexto"
              dangerouslySetInnerHTML={despliegaTextoCuerpo()}
            />
          ) : (
            <AlertaTextoCuerpo id="alertaTexto">
              {textoCuerpoJsx}
            </AlertaTextoCuerpo>
          )}

          {
            textoCuerpo2 && (
              <>
                <AlertaTextoCuerpo
                  id="alertaTexto"
                  dangerouslySetInnerHTML={despliegaTextoCuerpo()}
                />

                <AlertaTextoCuerpo
                  id="alertaTexto"
                 
                >
                  {textoCuerpo2}
                </AlertaTextoCuerpo>
              </>
            )
          }

          { children && (
            <>
              {children}
            </>
          )}

          { bottomLink !== "" && (
            <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
              <EnlaceBienvenida
                id="enlaceNoReconocer"
                enlace
                onClick={() => {
                  bottomLinkOnClick()
                }}
              >
                {bottomLink}
              </EnlaceBienvenida>
            </EnlaceRegistroBienvenida>
          )}

          <ContenedorBotones id="alertaBotones" estiloBotones={estiloBotones}>
            {etiquetaBoton && (
              <Boton
                etiqueta={etiquetaBoton}
                tema={temaBoton}
                enClick={funcionLlamadaBoton}
              />
            )}
            {etiquetaBoton2 && (
              <AlertaContenedorSegundoBoton>
                <Boton
                  etiqueta={etiquetaBoton2}
                  tema="simple"
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

Alerta.propTypes = {
  colorAlerta: PropTypes.oneOf(["rojo", "amarillo", "azul", "verde"]),
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
  textoCuerpo2: PropTypes.string,
  textoCuerpoJsx: PropTypes.node,
  textoEncabezado: PropTypes.string,
  tipoIcono: PropTypes.oneOf(["alerta", "palomita", "trianguloAlerta", "ubicacion", "contigo", "911", "pagoProgramado"]),
  margenMinimo: PropTypes.bool,
  children: PropTypes.node,
  tituloArriba: PropTypes.bool,
  esSlider: PropTypes.bool
};

Alerta.defaultProps = {
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
  textoCuerpo2: "",
  textoCuerpoJsx: null,
  textoEncabezado: "",
  tipoIcono: "alerta",
  margenMinimo: false,
  tituloArriba: false,
  esSlider: false
};

export default Alerta;

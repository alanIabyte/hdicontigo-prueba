/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, lazy } from "react";
// import PropTypes from "prop-types";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import "pure-react-carousel/dist/react-carousel.es.css";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import Boton from "../../boton";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import useAlerta from "../../../utils/useAlerta";
// import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
// import { Wrapper, CarouselWrapper } from "./Carousel.styled";
import {
  Scrollbar,
  PantallaCredencial,
  Espacio,
} from "./PantallaCredencialGmm.styled";
import descargarPDF from "../../../utils/descargarPDF";
// import CredencialDelante from "./CredencialDelante";
import CredencialReverso from "./CredencialReverso";
import IndicadorCarga from "../../indicador-carga";
// import pdf from "../recursos/pdf";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Constantes from "../../../recursos/constantes";
import DelanteCredencial from "./DelanteCredencial";
import configAlertaError from "../recursos/utils";

const nombreCookie = Constantes.nombreDeCookie;

const diccionario = {
  titulo: "Credencial digital",
  botonDescarga: "Descargar credencial",
};

const PantallaCredencialGmm = () => {
  const history = useHistory();
  const location = useLocation();
  const [cargando, asignarValorCargando] = useState(false);
  const {
    poliza: polizaLocation,
    detalle: detalleLocation,
    base64: base64Location,
  } = location.state;
  const [noPoliza] = useState(polizaLocation);
  const [polizaDetalle] = useState(detalleLocation);
  const [archivoBase64] = useState(base64Location);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  // const [activarBoton, setActivarBoton] = useState(false);
  const alertaError = useAlerta(configAlertaError);

  const Alerta = lazy(() => import("../../alerta/alerta-componente/Alerta"));

  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  useEffect(() => {
    if (!location.state) {
      history.push("/inicio");
    }
  }, [location.state]);

  // * Método para descarga
  const descargaArchivo = () => {
    asignarValorCargando(true);
    if (archivoBase64?.status === true && archivoBase64?.code === 200) {
      descargarPDF(
        archivoBase64?.fileBase64,
        `Credencial-${polizaDetalle?.poliza.numeroPoliza}`,
        "pdf"
      ).then((res) => {
        console.log(res);
        if (res === 200) {
          asignarValorCargando(false);
        } else {
          alertaError.mostrar();
          asignarValorCargando(false);
        }
      });
    } else {
      alertaError.mostrar();
      asignarValorCargando(false);
    }
  };
  return (
    <>
      <EnvolvedorPantalla>
        {cargando ? <IndicadorCarga /> : null}
        <Alerta
          {...alertaError}
          manejarCierre={() => {
            alertaError.cerrar();
          }}
          funcionLlamadaBoton={() => {
            alertaError.cerrar();
          }}
        />
        <Encabezado
          titulo={diccionario.titulo}
          mostrarBotonRegresar
          funcionCerrar={history.goBack}
        />
        <PantallaCredencial>
          {/* <CarouselWrapper className="carousel-container">
            <CarouselProvider
              visibleSlides={1}
              totalSlides={2}
              step={1}
              currentSlide={currentSlide}
              naturalSlideWidth={100}
              naturalSlideHeight={120}
              isIntrinsicHeight
            >
              <Wrapper>
                <Slider className="slide">
                  <Slide index={0}>
                    <CredencialDelante
                      key={v4()}
                      data={noPoliza}
                      detalle={polizaDetalle}
                    />
                  </Slide>
                  <Slide index={1}>
                    <CredencialReverso key={v4()} />
                  </Slide>
                </Slider>
                <div className="controls">
                  <DotGroup className="dot-group" />
                </div>
              </Wrapper>
            </CarouselProvider>
          </CarouselWrapper> */}
          <Scrollbar>
            <DelanteCredencial
              key={v4()}
              infoPoliza={noPoliza}
              infoDetalle={polizaDetalle}
            />
            <Espacio tamano="10px" />
            <CredencialReverso key={v4()} />
          </Scrollbar>
          <Boton
            etiqueta={diccionario.botonDescarga}
            tema="estandar"
            enClick={descargaArchivo}
            // deshabilitado={activarBoton}
          />
        </PantallaCredencial>
      </EnvolvedorPantalla>
    </>
  );
};

export default PantallaCredencialGmm;

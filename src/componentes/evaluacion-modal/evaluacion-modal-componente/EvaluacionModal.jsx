/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  EnvolvedorEvaluacionModal,
  ContenedorModal,
  EncabezadoPregunta,
  ContenedorCarrusel,
  ContenedorDiapositivas,
  Diapositiva,
} from "./EvaluacionModal.styled";
import Boton from "../../boton";

const valores = {
  calificacion: 10,
};

const PantallaEvaluacionModal = ({
  pregunta,
  mostrar,
  asignarCalificacion,
}) => {
  const calificaciones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const diccionario = {
    etiquetaBoton: "Enviar",
  };

  const itemPersonalizado = (item, props) => (
    <ContenedorDiapositivas>
      <item.type {...item.props} {...props} />
    </ContenedorDiapositivas>
  );

  return (
    <EnvolvedorEvaluacionModal key={v4()} mostrar={mostrar}>
      <ContenedorModal>
        <EncabezadoPregunta>{pregunta}</EncabezadoPregunta>
        <ContenedorCarrusel>
          <Carousel
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode
            autoPlay={false}
            centerSlidePercentage={25}
            selectedItem={10}
            swipeable
            onClickItem={(item) => {
              valores.calificacion = item;
            }}
            renderItem={itemPersonalizado}
          >
            {calificaciones.map((valor) => (
              <Diapositiva>{valor}</Diapositiva>
            ))}
          </Carousel>
        </ContenedorCarrusel>
        <Boton
          etiqueta={diccionario.etiquetaBoton}
          enClick={() => {
            asignarCalificacion(valores.calificacion);
          }}
        />
      </ContenedorModal>
    </EnvolvedorEvaluacionModal>
  );
};

PantallaEvaluacionModal.propTypes = {
  pregunta: PropTypes.string,
  mostrar: PropTypes.bool,
  asignarCalificacion: PropTypes.func,
};

PantallaEvaluacionModal.defaultProps = {
  pregunta: "",
  mostrar: false,
  asignarCalificacion() {},
};

export default PantallaEvaluacionModal;

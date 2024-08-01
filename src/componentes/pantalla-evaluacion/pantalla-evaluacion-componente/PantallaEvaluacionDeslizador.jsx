/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { WithStore } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const PantallaEvaluacion = (props) => {
  const { currentSlide, preguntaActual } = props;

  useEffect(() => {
    preguntaActual(currentSlide);
  }, [currentSlide]);

  return <></>;
};

export default WithStore(PantallaEvaluacion, (state) => ({
  currentSlide: state.currentSlide,
}));

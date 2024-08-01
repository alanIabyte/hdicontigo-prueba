/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import React from "react";
import Slider from "react-slick";
// import { ImagenModal } from "./Visualizador.styled";

function SliderComponent({ imagenes }) {
	// Variables y Estados
	// const [imagenActual, setImagenActual] = React.useState(0);
	const cantidad = imagenes?.length;

	// Return prematuro para evitar errores
	if (!Array.isArray(imagenes) || cantidad === 0) return;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: cantidad,
    slidesToScroll: 1,
  }

	return (
		<Slider {...settings}>
			{imagenes.map((imagen, index) => (
        <div key={index}>
          <img src={imagen.url}/>
        </div>
      ))}
		</Slider>
	);
}

export default SliderComponent;
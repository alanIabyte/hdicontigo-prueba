import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  TituloUbicacionMapaCompleto,
  CuerpoUbicacionMapaCompleto,
  ContenedorGoogleMapCompleto,
} from "./PantallaUbicacionMapa.styled";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import Mapa from "./Mapa";

const valores = {
  ubicacion: "",
};

const PantallaUbicacionMapa = (props) => {
  const diccionario = {
    etiquetaBoton: "Confirmar ubicación",
  };
  const {
    accionDeLocalizacionDesactivada,
    alRegresar,
    alAceptar,
    coordenadas: { lat, lng },
  } = props;
  const [ubicacion, asignarValorUbicacion] = useState("");
  const [focoUbicacion, asignarValorFocoUbicacion] = useState("");
  const [coordenadasIniciales, asignarCoordenadasIniciales] = useState({
    lat,
    lng,
  });
  const [gpsActivado, asignarGpsActivado] = useState(false);
  const valorAnteriorParaUbicacionRef = useRef();
  useEffect(() => {
    valorAnteriorParaUbicacionRef.current = ubicacion;
  });

  const valorAnteriorParaUbicacion = valorAnteriorParaUbicacionRef.current;

  const validacionRespuestas = () => {
    const { ubicacion: ubicacionDeValores } = valores;

    if (!ubicacionDeValores) {
      asignarValorFocoUbicacion("error");
    } else {
      asignarValorFocoUbicacion("");
    }

    if (ubicacionDeValores) {
      alAceptar(ubicacionDeValores, coordenadasIniciales);
    }
  };

  const alCambiarPosicionDeMarcador = (
    coordenadas,
    direccion,
    gpsActivadoDeComponente,
    error
  ) => {
    if (!error) {
      if (direccion !== valorAnteriorParaUbicacion) {
        valores.ubicacion = direccion;
        asignarValorUbicacion(direccion);
        asignarCoordenadasIniciales(coordenadas);
        asignarGpsActivado(gpsActivadoDeComponente);
      }
    }
  };

  const alCambiarUbicacion = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.ubicacion = valor;
    }
  };

  return (
    <EnvolvedorPantalla key={v4()}>
      <Pantalla>
        <TituloUbicacionMapaCompleto>
          <ChevronLeftRoundedIcon onClick={alRegresar} />
          <CampoTexto
            etiqueta={diccionario.etiquetaCampoTexto}
            valor={valores.ubicacion}
            enCambio={alCambiarUbicacion}
            foco={focoUbicacion}
            editable={false}
            id="campoUbicacionActual"
          />
        </TituloUbicacionMapaCompleto>
        <CuerpoUbicacionMapaCompleto>
          <ContenedorGoogleMapCompleto>
            <Mapa
              alCambiarPosicionDeMarcador={alCambiarPosicionDeMarcador}
              coordenadasIniciales={coordenadasIniciales}
              accionDeLocalizacionDesactivada={accionDeLocalizacionDesactivada}
              gpsActivadoDeProp={gpsActivado}
              activarFijarUbicacion={false}
            />
            <Boton
              etiqueta={diccionario.etiquetaBoton}
              enClick={validacionRespuestas}
            />
          </ContenedorGoogleMapCompleto>
        </CuerpoUbicacionMapaCompleto>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

PantallaUbicacionMapa.propTypes = {
  accionDeLocalizacionDesactivada: PropTypes.func,
  alRegresar: PropTypes.func,
  alAceptar: PropTypes.func,
  coordenadas: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

PantallaUbicacionMapa.defaultProps = {
  accionDeLocalizacionDesactivada: null,
  alRegresar: null,
  alAceptar: null,
  coordenadas: { lat: null, lng: null },
};

export default PantallaUbicacionMapa;

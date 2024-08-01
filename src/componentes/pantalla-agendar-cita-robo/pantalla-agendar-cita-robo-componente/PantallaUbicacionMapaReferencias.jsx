/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  ContenedorCampoTextoUbicacionMapa,
  TituloUbicacionMapa,
  EnvolvedorPantallaDireccion,
  CuerpoUbicacionMapa,
  MensajeError,
  CuerpoReferencias,
} from "./PantallaUbicacionMapa.styled";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import { SeparadorEspacio } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";

const valores = {
  referencias: "",
};

const PantallaUbicacionMapaDireccion = (props) => {
  const diccionario = {
    titulo: "Referencias",
    etiquetaBoton: "Continuar",
    campoRequerido: "Campo requerido para poder continuar.",
    instrucciones:
      // eslint-disable-next-line max-len
      'Describe las características de tu ubicación, para que el ajustador te encuentre lo antes posible. Ejemplo: Estoy en la esquina del restaurante "El Faro", frente a una casa amarilla con fachada blanca.',
  };
  const { alRegresar, alAceptar } = props;
  const [focoReferencias, asignarValorFocoReferencias] = useState("");
  const [errorReferencias, asignarErrorReferencias] = useState("");

  const alCambiarReferencias = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.referencias = valor;
    }
  };

  const validacionRespuestas = () => {
    const { referencias } = valores;

    if (!referencias) {
      asignarValorFocoReferencias("error");
      asignarErrorReferencias(diccionario.campoRequerido);
    } else {
      asignarValorFocoReferencias("");
      asignarErrorReferencias("");
    }

    if (referencias) {
      alAceptar(referencias);
    }
  };

  return (
    <EnvolvedorPantallaDireccion key={v4()}>
      <Pantalla>
        <TituloUbicacionMapa>
          <ChevronLeftRoundedIcon
            id="botonRegresar"
            fontSize="large"
            onClick={alRegresar}
          />
          <div id="titulo">{diccionario.titulo}</div>
        </TituloUbicacionMapa>
        <CuerpoUbicacionMapa>
          <ContenedorCampoTextoUbicacionMapa>
            <CuerpoReferencias id="leyendaInstrucciones">
              {diccionario.instrucciones}
            </CuerpoReferencias>
            <SeparadorEspacio />
            <CampoTexto
              etiqueta={diccionario.etiquetaCampoTextoReferencias}
              valor={valores.referencias}
              enCambio={alCambiarReferencias}
              foco={focoReferencias}
              esAreaDeTexto
              numeroDeRenglones={8}
              numeroDeCaracteres={225}
              conteoDeCaracteres
              id="campoReferencias"
            />
            {errorReferencias !== "" && (
              <MensajeError id="errorReferencias">
                {errorReferencias}
              </MensajeError>
            )}
          </ContenedorCampoTextoUbicacionMapa>
        </CuerpoUbicacionMapa>
        <Boton
          estilo={{ marginTop: "95px" }}
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
        />
      </Pantalla>
    </EnvolvedorPantallaDireccion>
  );
};

PantallaUbicacionMapaDireccion.propTypes = {
  alRegresar: PropTypes.func,
  alAceptar: PropTypes.func,
};

PantallaUbicacionMapaDireccion.defaultProps = {
  alRegresar: null,
  alAceptar: null,
};

export default PantallaUbicacionMapaDireccion;

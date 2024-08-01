import React, { useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  EnvolvedorEvaluacionSubpantalla,
  TituloEvaluacionSubpantalla,
  CuerpoEvaluacionSubpantalla,
  ContenedorReconocimientos,
  Reconocimiento,
  ImagenReconocimiento,
} from "./PantallaEvaluacion.styled";
import Boton from "../../boton";
import dudas from "../../../recursos/imagenes/dudas.png";
import dudasColor from "../../../recursos/imagenes/dudas_color.png";
import rapido from "../../../recursos/imagenes/rapido.png";
import rapidoColor from "../../../recursos/imagenes/rapido_color.png";
import atento from "../../../recursos/imagenes/atento.png";
import atentoColor from "../../../recursos/imagenes/atento_color.png";

const PantallaEvaluacionReconocimientos = (props) => {
  const { alRegresar, alAceptar, valorInicial } = props;
  const [reconocimiento, asignarValorReconocimiento] = useState(valorInicial);
  const diccionario = {
    titulo: "Reconocimiento",
    rapido: "Súper rápido",
    dudas: "Resolvió todas mis dudas",
    atento: "Muy atento",
    etiquetaBoton: "Otorgar reconocimiento",
  };

  const marcarReconocimiento = (tipoReconocimiento) => {
    if (reconocimiento === tipoReconocimiento) {
      asignarValorReconocimiento("");
    } else {
      asignarValorReconocimiento(tipoReconocimiento);
    }
  };

  return (
    <EnvolvedorEvaluacionSubpantalla key={v4()}>
      <Pantalla>
        <TituloEvaluacionSubpantalla>
          <div id="titulo">{diccionario.titulo}</div>
          <IconoCerrar id="botonCerrar" onClick={alRegresar} />
        </TituloEvaluacionSubpantalla>
        <CuerpoEvaluacionSubpantalla>
          <ContenedorReconocimientos>
            <Reconocimiento onClick={() => marcarReconocimiento("rapido")}>
              <ImagenReconocimiento
                src={reconocimiento === "rapido" ? rapidoColor : rapido}
              />
              {diccionario.rapido}
            </Reconocimiento>
            <Reconocimiento onClick={() => marcarReconocimiento("dudas")}>
              <ImagenReconocimiento
                src={reconocimiento === "dudas" ? dudasColor : dudas}
              />
              {diccionario.dudas}
            </Reconocimiento>
            <Reconocimiento onClick={() => marcarReconocimiento("atento")}>
              <ImagenReconocimiento
                src={reconocimiento === "atento" ? atentoColor : atento}
              />
              {diccionario.atento}
            </Reconocimiento>
          </ContenedorReconocimientos>
        </CuerpoEvaluacionSubpantalla>
        <Boton
          etiqueta={diccionario.etiquetaBoton}
          enClick={() => {
            alAceptar(reconocimiento);
          }}
          deshabilitado={reconocimiento === valorInicial}
        />
      </Pantalla>
    </EnvolvedorEvaluacionSubpantalla>
  );
};

PantallaEvaluacionReconocimientos.propTypes = {
  alRegresar: PropTypes.func,
  alAceptar: PropTypes.func,
  valorInicial: PropTypes.string,
};

PantallaEvaluacionReconocimientos.defaultProps = {
  alRegresar: null,
  alAceptar: null,
  valorInicial: "",
};

export default PantallaEvaluacionReconocimientos;

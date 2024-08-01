import React, { useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  EnvolvedorEvaluacionSubpantalla,
  TituloEvaluacionSubpantalla,
  CuerpoEvaluacionSubpantalla,
  ContenedorCampoTextoComentarios,
} from "./PantallaEvaluacion.styled";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";

const valores = {
  comentarios: "",
};

const PantallaEvaluacionComentarios = (props) => {
  const { alRegresar, alAceptar } = props;
  const [botonDeshabilitado, asignarValorBotonDeshabilitado] = useState(true);
  const diccionario = {
    titulo: "Comentario",
    etiquetaBoton: "Agregar comentario",
  };

  const alCambiarComentarios = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      if (valor === "") {
        asignarValorBotonDeshabilitado(true);
      } else {
        asignarValorBotonDeshabilitado(false);
      }
      valores.comentarios = valor;
    }
  };

  const validacionRespuestas = () => {
    const { comentarios } = valores;

    if (comentarios) {
      alAceptar(comentarios);
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
          <ContenedorCampoTextoComentarios>
            <CampoTexto
              valor={valores.comentarios}
              enCambio={alCambiarComentarios}
              esAreaDeTexto
              numeroDeRenglones={8}
              numeroDeCaracteres={500}
              conteoDeCaracteres
              id="campoComentarios"
              autoenfoque
            />
          </ContenedorCampoTextoComentarios>
        </CuerpoEvaluacionSubpantalla>
        <Boton
          estilo={{ marginTop: "30px" }}
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
          deshabilitado={botonDeshabilitado}
        />
      </Pantalla>
    </EnvolvedorEvaluacionSubpantalla>
  );
};

PantallaEvaluacionComentarios.propTypes = {
  alRegresar: PropTypes.func,
  alAceptar: PropTypes.func,
};

PantallaEvaluacionComentarios.defaultProps = {
  alRegresar: null,
  alAceptar: null,
};

export default PantallaEvaluacionComentarios;

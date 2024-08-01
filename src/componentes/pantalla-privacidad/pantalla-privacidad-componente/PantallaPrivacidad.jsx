/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-fragments */
import React from "react";
import { useHistory } from "react-router-dom";
import privacidad from "../../../recursos/paginas/AvisoDePrivacidad";
import terminos from "../../../recursos/paginas/TerminosYCondiciones";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import {
  CuerpoModal,
  EnvolvedorModalTexto,
  ModalContenedor,
} from "../../modal-texto/modal-texto-componente/ModalTexto.styled";
import { Titulo } from "../../pantalla-creacion-cuenta/pantalla-creacion-cuenta-componente/PantallaCreacionCuenta.styled";

const PantallaTerminosPrivacidad = () => {
  const history = useHistory();
  const despliegaTextoCuerpo = () => ({ __html: privacidad });

  return (
    <React.Fragment>
      <Encabezado
        titulo="Aviso de privacidad"
        mostrarBotonRegresar
        funcionCerrar={history.goBack}
      />
      <div style={{ padding: "20px" }}>
        <Titulo upper>Aviso de privacidad</Titulo>
        <CuerpoModal
          dangerouslySetInnerHTML={despliegaTextoCuerpo()}
          style={{ textAlign: "justify" }}
        />
      </div>
    </React.Fragment>
  );
};

export default PantallaTerminosPrivacidad;

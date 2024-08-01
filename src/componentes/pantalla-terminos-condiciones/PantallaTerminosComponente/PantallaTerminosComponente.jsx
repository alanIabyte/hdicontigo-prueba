/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-fragments */
import React from "react";
import { useHistory } from "react-router-dom";
import terminos from "../../../recursos/paginas/TerminosYCondiciones";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import { CuerpoModal } from "../../modal-texto/modal-texto-componente/ModalTexto.styled";
import { Titulo } from "../../pantalla-creacion-cuenta/pantalla-creacion-cuenta-componente/PantallaCreacionCuenta.styled";

const PantallaTerminosComponente = () => {
  const history = useHistory();

  const despliegaTextoCuerpo = () => ({ __html: terminos });

  return (
    <React.Fragment>
      <Encabezado
        titulo="Términos y condiciones"
        mostrarBotonRegresar
        funcionCerrar={history.goBack}
      />
      <div style={{ padding: "20px" }}>
        <Titulo upper style={{ marginBottom: "30px" }}>
          Términos y condiciones de uso de medios electrónicos{" "}
        </Titulo>
        <CuerpoModal
          dangerouslySetInnerHTML={despliegaTextoCuerpo()}
          style={{ textAlign: "justify" }}
        />
      </div>
    </React.Fragment>
  );
};

export default PantallaTerminosComponente;

/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useRedirect from "../../../utils/useRedirect";
import useValidateLogin from "../../../utils/useValidateLogin";
import { EnvolvedorPantalla, Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import "./estilos.scss";

const PantallaOtrasOpciones = () => {

  const history = useHistory();
  const { redirectRoot } = useRedirect();
  const { validateUser, user } = useValidateLogin();
  if (!validateUser || !user || user === "0") {
    redirectRoot();
  }

  return (
    <>
      <Encabezado
          titulo="Otros"
          mostrarBotonCerrar
          funcionCerrar={() => history.push("/inicio")}
      />
      <EnvolvedorPantalla>
        <Pantalla style={{marginTop: "20px"}}>
            <div className="otros-container">
              <Link to="/terminos" className="navlink">
                Términos y condiciones
              </Link>

              <Link to="/privacidad" className="navlink" style={{ marginTop: "10px"}}>
                Privacidad
              </Link>
            </div>
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  )
};

export default PantallaOtrasOpciones;

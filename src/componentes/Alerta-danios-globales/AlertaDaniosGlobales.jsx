/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import React from 'react'
import { useHistory } from 'react-router-dom';
import Alerta from '../alerta/alerta-componente/Alerta';
import { ParrafoAlerta } from '../pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled';
import "./style.scss";

export const AlertaDaniosGlobales = ({ alertaConfirmarDanios, alertaConfirmarDanios2, abrirModalDaniosGlobales2, alConfirmarPagoDanios, bieneDG = false }) => {
  const history = useHistory();

  const redirect = (tipoRedireccion = "documentacion") => {

    if (tipoRedireccion === "asistencia") {
      // history.push("")
      window.location.href = "tel: *434";
      return;
    }

    let queryParam = "";
    if (bieneDG) {
      queryParam = "&proceso=globales"
    }

    history.push({
      pathname: "/documentacion-indemnizacion",
      search: `?tipoAtencion=DG${queryParam}`
      // state: {
      //   tipoAtencion: "presencial"
      // }
    });
  }


  return (
    <>
      <Alerta
        {...alertaConfirmarDanios}
        manejarCierre={alertaConfirmarDanios.cerrar}
        funcionLlamadaBoton2={abrirModalDaniosGlobales2}
        tituloArriba
      >
        <ParrafoAlerta>
          ¿Te falta algún documento para solicitar la indemnización por pérdida
          total? ¿Quieres conservar el vehículo? Tenemos una solución para ti:
          el <b>pago de daños globales.</b>
        </ParrafoAlerta>
        <ParrafoAlerta
          className="enlace"
          onClick={alertaConfirmarDanios.cerrar}
        >
          Regresar a pérdida total
        </ParrafoAlerta>
      </Alerta>
      <Alerta
        {...alertaConfirmarDanios2}
        manejarCierre={alertaConfirmarDanios2.cerrar}
        funcionLlamadaBoton2={() => redirect("asistencia")}
        funcionLlamadaBoton={() => alConfirmarPagoDanios(2)}
        tituloArriba
      >
        <ParrafoAlerta>
          Este pago equivale aproximadamente al 50% del valor comercial del
          vehículo y requiere menos documentación. ¡Así, podrás conservar tu
          unidad, sin complicaciones adicionales!
        </ParrafoAlerta>
        <ParrafoAlerta>
          Anticípate y{" "}
          <span className="enlace" onClick={redirect}>
            consulta los requerimientos necesarios
          </span>{" "}
          para llevar este proceso
        </ParrafoAlerta>
      </Alerta>
    </>
  )
};

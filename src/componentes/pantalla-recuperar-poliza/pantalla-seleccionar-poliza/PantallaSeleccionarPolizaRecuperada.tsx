/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ContenedorBotones,
  Contenedor,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ContenidoAcordeon,
} from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoContenedor from "../../encabezado";
import { Titulo } from "../../pantalla-registro-usuario-sms/pantalla-registro-usuario-sms-component/PantallaRegistroUsuarioSMS.styled";
import { IResultadoBusqueda } from "../pantalla-recuperar-poliza-componente/Interface";
import useValidateLogin from "../../../utils/useValidateLogin";
import {
  ParrafoPoliza,
  TituloPoliza,
} from "./SeleccionarPolizaRecuperada.styled";
import IcoAuto from "../../../recursos/iconos/contigo/ico_autos_white-bg.svg";

interface IState {
  policies: IResultadoBusqueda[];
  tipoSiniestro: string;
}

export interface IRedux {
  seatedClaim: string;
}

export const PantallaSeleccionarPolizaRecuperada = () => {
  const location = useLocation<IState>();
  const { policies, tipoSiniestro } = location.state;
  const history = useHistory();
  const { validateUser } = useValidateLogin();
  const estadoApp = useSelector((state: IRedux) => state);

  if (!policies) {
    history.push("/elegir-siniestro");
  }

  /**
   *
   * @summary La funcion elimina un número de caracteres indefinido segun el string y el caracter que envies
   * @param {string} str - Es el string base del que se van a eliminar los caracteres
   * @param {string} stringEliminar - Es el caracter que se va a eliminar del string HASTA QUE ENCUENTRE UN VALOR DIFERENTE
   * @return {string} resultado - Es el string limpio de los caracteres de stringEliminar solo hasta encontrar un caracter diferente
   */
  function recuperarString(str: string, stringEliminar: string): string {
    // Inicializar una variable booleana para indicar si se ha encontrado un número diferente de cero.
    let numeroEncontrado = false;

    // Recorrer el string de entrada y construir una nueva cadena de salida.
    let resultado = "";
    for (let i = 0; i < str.length; i++) {
      // Si el caracter es diferente de cero, añadirlo al resultado y cambiar el indicador de número encontrado.
      if (str[i] !== stringEliminar && !numeroEncontrado) {
        resultado += str[i];
        numeroEncontrado = true;
      }
      // Si el caracter es diferente de cero o ya se ha encontrado un número diferente de cero, añadirlo al resultado.
      else if (str[i] !== stringEliminar || numeroEncontrado) {
        resultado += str[i];
      }
    }

    // Si el resultado es una cadena vacía, devolver '0'.
    if (resultado === "") {
      return "0";
    }
    // En otro caso, devolver el resultado.
    else {
      return resultado;
    }
  }

  const redirectSiniestro = (policy: IResultadoBusqueda) => {
    const { inciso, numeroSerie, agenciaId, polizaId } = policy;
    // Limpiamos las variables para que el servicio las acepte
    const agenciaNueva = recuperarString(agenciaId, "0");
    const polizaSinCeros = recuperarString(polizaId, "0");
    const polizaEnviar = `${agenciaNueva}-${polizaSinCeros}-${inciso}`;
    const numeroSerieLimpio = recuperarString(numeroSerie, "*");

    // Redirigimos con datos pre-cargados
    history.push("/elegir-siniestro", {
      polizaRecuperada: polizaEnviar,
      claimRecuperar: estadoApp.seatedClaim,
      numeroSerieLimpio,
      vin: numeroSerieLimpio,
    });
  };

  return (
    <>
      <EnvolvedorPantalla>
        <EncabezadoContenedor
          titulo="Registro"
          funcionRegresar={() => {
            history.push("/elegir-siniestro");
            sessionStorage.removeItem("estadoRedux");
          }}
        />
        <Pantalla>
          <Titulo>Selecciona la póliza para generar tu reporte</Titulo>
          <ContenedorBotones>
            {policies.map((policy) => (
              <Contenedor
                show
                key={policy.numeroSerie}
                onClick={() => redirectSiniestro(policy)}
              >
                <Encabezado>
                  <EnvolvedorIcono style={{ padding: "10px" }}>
                    <EnvolvedorImagen src={IcoAuto} style={{ width: "40px" }} />
                  </EnvolvedorIcono>
                  <ContenidoAcordeon>
                    <TituloPoliza>{policy.descripcionVehiculo}</TituloPoliza>
                    <ParrafoPoliza>Póliza: {policy.polizaId}</ParrafoPoliza>
                  </ContenidoAcordeon>
                </Encabezado>
              </Contenedor>
            ))}
          </ContenedorBotones>
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

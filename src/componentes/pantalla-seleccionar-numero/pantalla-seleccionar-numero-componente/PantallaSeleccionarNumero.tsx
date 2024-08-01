/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import { Titulo } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import {
  ContenedorBoton,
  MensajePequeno,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import {
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  ParrafoAcordeon,
  Encabezado as EncabezadoContenedor,
} from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import Boton from "../../boton/boton-componente/Boton";
import "./styles.scss";
import { IResultadoBusqueda } from "../../pantalla-recuperar-poliza/pantalla-recuperar-poliza-componente/Interface";
import { RecuperarPolizaRsp } from "../../pantalla-enviar-sms/pantalla-enviar-sms-componente/PantallaEnviarSMS";

const diccionario = {
  title: "No reconozco el número de telefono",
  subtitle:
    "Encontramos más números de teléfono vinculados al RFC que nos compartiste, selecciona con cuál deseas continuar.",
};

interface CustomStateLocation {
  foundPolicies: IResultadoBusqueda[];
  policyType?: string;
  datos: RecuperarPolizaRsp;
}

export const PantallaSeleccionarNumero = () => {
  const location = useLocation<CustomStateLocation>();
  const { foundPolicies, policyType, datos } = location.state;
  const history = useHistory();

  // Once the user select one radio option, the state will be filled
  const [selectedPhone, setSelectedPhone] = useState("");

  // ! The "enmascarado" variable is just for the standby of the backend services. It´ll be replace by the return number from server side
  const sendCode = () => {
    // TODO: Se requiere el tipo de póliza?
    history.push("/enviar-sms", {
      phone: selectedPhone,
      datos,
      policy: policyType || "",
    });
  };

  const onSelectedPhone = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSelectedPhone(value);
  };

  return (
    <>
      <EnvolvedorPantalla key="envolvedor-pantalla-numeros">
        <Encabezado
          titulo="Buscar póliza"
          mostrarBotonRegresar
          funcionRegresar={() => history.goBack()}
          mostrarBotonCerrar={false}
        />
        <Pantalla>
          <Titulo>{diccionario.title}</Titulo>
          <MensajePequeno>{diccionario.subtitle}</MensajePequeno>

          <ContenedorBotones>
            {foundPolicies.map((policy) => (
              <Contenedor
                show
                key={`contenedor-${policy.telefonoCasa}`}
                onChange={onSelectedPhone}
              >
                <ContenidoAcordeon>
                  <EncabezadoContenedor>
                    <input
                      type="radio"
                      value={policy.telefonoCasa}
                      name="phone"
                      id={`phone-${policy.telefonoCasa}`}
                      className="custom-radio box-shadow"
                    />
                    <label htmlFor={`phone-${policy.telefonoCasa}`}>
                      <ParrafoAcordeon
                        className="marginLeft"
                        style={{ marginLeft: "20px" }}
                      >
                        <b>*** *** {policy.telefonoCasa}</b>
                      </ParrafoAcordeon>
                    </label>
                  </EncabezadoContenedor>
                </ContenidoAcordeon>
              </Contenedor>
            ))}
          </ContenedorBotones>
          <ContenedorBoton>
            <Boton
              etiqueta="Enviar código"
              enClick={() => {
                sendCode();
              }}
            />
          </ContenedorBoton>
          <Boton
            flot
            etiqueta=" Llamar a HDI "
            tema="estandar"
            enClick={() => {
              window.location.href = "tel:*434";
            }}
          />
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

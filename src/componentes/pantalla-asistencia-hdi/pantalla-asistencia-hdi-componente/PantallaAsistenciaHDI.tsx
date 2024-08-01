/* eslint-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import {
  PantallaFondoGris,
  TituloMisPolizas,
} from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import {
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ParrafoAcordeon,
  TituloAcordeon,
} from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import { MensajePequeno } from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import IconChat from "../../../recursos/iconos/contigo/ico_chat.svg";
import IconPhone from "../../../recursos/iconos/contigo/ico_phone.svg";
import IconQuestion from "../../../recursos/iconos/contigo/ico_question.svg";

const botones = [
  {
    title: "Llámanos",
    desc: "Uno de nuestros asesores te brindará solución personalizada y rápida.",
    icon: IconPhone,
  },
  // {
  //   title: "Chatea con un asesor",
  //   desc: "Chatea con nosotros para ayuda en tiempo real y respuestas a tus dudas.",
  //   icon: IconChat,
  // },
  {
    title: "Preguntas frecuentes",
    desc: "Encuentra respuestas rápidas a preguntas comunes.",
    icon: IconQuestion,
  },
];

type IPushState = {
  tipoPersona: string;
  tipoAtencion: string;
};

const PantallaAsistenciaHDI = () => {
  const history = useHistory();
  const location = useLocation<IPushState>();
  const params = new URLSearchParams(window.location.search);

  const [tipoAtencion, setTipoAtencion] = useState("");

  const redirect = (button: string) => {
    if (button === "Llámanos") {
      window.location.href = "tel: *434";
      return;
    }

    if (button === "Preguntas frecuentes") {
      if (tipoAtencion === "robo") {
        history.push({
          pathname: "preguntas-frecuentes",
          state: {
            tipoAtencion
          }
        })
      } else {
        history.push({
          pathname: "preguntas-frecuentes",
          state: {
            tipoAtencion,
          },
        });
      }
    }
  };

  useEffect(() => {
    console.log("Esto esta en el state", location.state);
    if (location.state.tipoAtencion) {
      setTipoAtencion(location.state.tipoAtencion);
    }
  }, []);

  return (
    <EnvolvedorPantalla style={{ overflow: "hidden" }}>
      <EncabezadoPolizasSiniestradas
        regresar
        funcionRegresar={history.goBack}
      />
      <PantallaFondoGris style={{ overflow: "hidden" }}>
        <TituloMisPolizas>Contacto HDI</TituloMisPolizas>
        <MensajePequeno>
          Nuestro compromiso es brindarte la mejor atención y solución a tus
          necesidades. Elige la opción que desees:
        </MensajePequeno>
        <MensajePequeno>
          Llamadas disponibles de <b>9am a 9pm (GMT-6, CDMX).</b>
        </MensajePequeno>

        <ContenedorBotones>
          {botones.map((button) => (
            <Contenedor
              show
              key={button.title}
              onClick={() => redirect(button.title)}
            >
              <Encabezado>
                <EnvolvedorIcono>
                  <EnvolvedorImagen
                    src={button.icon}
                    style={{ position: "static" }}
                  />
                </EnvolvedorIcono>
                <ContenidoAcordeon>
                  <TituloAcordeon>{button.title}</TituloAcordeon>
                  <ParrafoAcordeon>{button.desc}</ParrafoAcordeon>
                </ContenidoAcordeon>
              </Encabezado>
            </Contenedor>
          ))}
        </ContenedorBotones>
      </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};

export default PantallaAsistenciaHDI;
